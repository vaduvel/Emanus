#!/usr/bin/env python3
from __future__ import annotations

import importlib.util
import json
import os
import subprocess
import time
import urllib.error
import urllib.request
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
BASE_WORKER = ROOT / "scripts/nt_semantic_copilot_worker.py"
DIRECT_COVERAGE = ROOT / "docs/data/biblia-explicata/nt-direct-transcript-coverage.json"
MODEL = os.environ.get("NT_SEMANTIC_GITHUB_MODEL", "openai/gpt-4.1")
ENDPOINT = "https://models.github.ai/inference/chat/completions"
API_VERSION = "2026-03-10"

spec = importlib.util.spec_from_file_location("emanus_semantic_base", BASE_WORKER)
if spec is None or spec.loader is None:
    raise RuntimeError("Cannot load semantic base worker")
base = importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)
base.MODEL = f"github-models:{MODEL}"
original_load_rows = base.load_rows


def ensure_direct_coverage() -> dict[str, Any]:
    subprocess.run(["node", "scripts/materialize-nt-direct-transcript-coverage.mjs"], cwd=ROOT, check=True)
    data = json.loads(DIRECT_COVERAGE.read_text(encoding="utf-8"))
    if data.get("schema") not in {
        "emanus-nt-direct-transcript-coverage-v1",
        "emanus-nt-direct-transcript-coverage-v2",
        "emanus-nt-direct-transcript-coverage-v3",
    }:
        raise RuntimeError("Unexpected direct transcript coverage schema")
    return data


def representation_records(coverage: dict[str, Any], unit_id: str) -> list[dict[str, Any]]:
    reps = coverage.get("transcriptRepresentations")
    if not isinstance(reps, list) or not reps:
        reps = [{
            "transcriptRepresentationUrl": coverage["transcriptRepresentationUrl"],
            "transcriptTitle": coverage["transcriptTitle"],
            "transcriptRange": coverage["transcriptRange"],
        }]
    result=[]
    for index, rep in enumerate(reps, start=1):
        url=str(rep.get("transcriptRepresentationUrl") or "")
        locator=str(rep.get("transcriptRange") or "")
        if not url.startswith("https://") or not locator:
            raise RuntimeError(f"{unit_id}: malformed transcript representation #{index}")
        result.append({
            "id": f"direct-transcript-{unit_id}-{index}",
            "sourceUrl": coverage["officialSourceUrl"],
            "officialSeriesUrl": coverage["officialSourceUrl"],
            "transcriptRepresentationUrl": url,
            "_transcriptUrl": url,
            "sourceTitle": str(rep.get("transcriptTitle") or ""),
            "locator": locator,
            "evidenceKind": "direct-contiguous-vbv-transcript-coverage" if len(reps)>1 else "direct-containing-vbv-transcript-range",
            "verificationLevel": coverage["verification"],
            "coverageEvidenceSha256": coverage["coverageEvidenceSha256"],
        })
    return result


def load_rows_with_direct(book_id: str) -> list[dict[str, Any]]:
    direct = ensure_direct_coverage()
    rows = original_load_rows(book_id)
    by_key = {(str(row["bookId"]), int(row["chapter"]), str(row["unitId"])): row for row in rows}
    coverage_by_key = {
        (str(item["bookId"]), int(item["chapter"]), str(item["unitId"])): item
        for item in direct.get("entries", [])
        if item.get("bookId") == book_id
    }
    book = base.get_book(book_id)
    frozen = base.existing_review_keys()
    for chapter in book.get("chapters", []):
        for unit in chapter.get("units", []):
            key = (book_id, int(chapter["number"]), str(unit["id"]))
            if key in frozen or unit.get("sourceFidelity", {}).get("reviewState") == "reviewed-against-raw-transcript":
                continue
            coverage = coverage_by_key.get(key)
            if not coverage:
                continue
            pseudos=representation_records(coverage,str(unit["id"]))
            if key in by_key:
                existing = by_key[key]
                known = {
                    str(record.get("_transcriptUrl") or record.get("transcriptRepresentationUrl") or record.get("sourceUrl"))
                    for record in existing["transcriptRecords"]
                }
                for pseudo in pseudos:
                    if pseudo["transcriptRepresentationUrl"] not in known:
                        existing["transcriptRecords"].append(pseudo)
                        known.add(pseudo["transcriptRepresentationUrl"])
            else:
                by_key[key] = {
                    "bookId": book_id,
                    "chapter": chapter["number"],
                    "unitId": unit["id"],
                    "ref": unit["ref"],
                    "heading": unit.get("heading", ""),
                    "text": unit.get("text", ""),
                    "teaching": unit.get("teaching", ""),
                    "forYourHeart": unit.get("forYourHeart"),
                    "sourceFidelity": unit.get("sourceFidelity", {}),
                    "transcriptRecords": pseudos,
                }
    result = sorted(by_key.values(), key=lambda row: (int(row["chapter"]), str(row["unitId"])))
    print(f"semantic review {book_id}: {len(result)} transcript-addressable pending units after strict direct coverage", flush=True)
    return result


base.load_rows = load_rows_with_direct


def call_model(prompt: str, retries: int = 6) -> dict:
    token = os.environ.get("GITHUB_TOKEN")
    if not token:
        raise RuntimeError("GITHUB_TOKEN missing")
    payload = json.dumps(
        {
            "model": MODEL,
            "messages": [
                {
                    "role": "system",
                    "content": "You are a strict source-fidelity editorial reviewer. Follow the user's Romanian instructions exactly and return only valid JSON.",
                },
                {"role": "user", "content": prompt},
            ],
            "temperature": 0.1,
        },
        ensure_ascii=False,
    ).encode("utf-8")
    last = "unknown"
    for attempt in range(1, retries + 1):
        request = urllib.request.Request(
            ENDPOINT,
            data=payload,
            method="POST",
            headers={
                "Accept": "application/vnd.github+json",
                "Authorization": f"Bearer {token}",
                "X-GitHub-Api-Version": API_VERSION,
                "Content-Type": "application/json",
                "User-Agent": "Emanus-NT-Semantic-Review/1.0",
            },
        )
        try:
            with urllib.request.urlopen(request, timeout=base.TIMEOUT) as response:
                data = json.loads(response.read().decode("utf-8"))
            content = data.get("choices", [{}])[0].get("message", {}).get("content")
            if not isinstance(content, str) or not content.strip():
                raise RuntimeError(f"GitHub Models returned no message content: {data}")
            return base.extract_json(content)
        except urllib.error.HTTPError as exc:
            body = exc.read().decode("utf-8", errors="replace")
            last = f"HTTP {exc.code}: {body[-1800:]}"
            if exc.code not in (408, 409, 429, 500, 502, 503, 504):
                break
            retry_after = exc.headers.get("Retry-After")
            if retry_after and retry_after.isdigit():
                delay = min(60, int(retry_after))
            else:
                delay = min(60, 3 * attempt * attempt)
            time.sleep(delay)
        except Exception as exc:
            last = repr(exc)
            if attempt < retries:
                time.sleep(min(30, 2**attempt))
    raise RuntimeError(f"GitHub Models semantic review failed after {retries} attempts: {last}")


base.call_copilot = call_model

if __name__ == "__main__":
    raise SystemExit(base.main())
