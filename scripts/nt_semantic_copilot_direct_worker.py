#!/usr/bin/env python3
from __future__ import annotations

import importlib.util
import json
import os
import subprocess
import sys
import time
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
BASE_PATH = ROOT / "scripts/nt_semantic_copilot_worker.py"
DIRECT_PATH = ROOT / "docs/data/biblia-explicata/nt-direct-transcript-coverage.json"

spec = importlib.util.spec_from_file_location("emanus_semantic_base_direct", BASE_PATH)
if spec is None or spec.loader is None:
    raise RuntimeError("Cannot load semantic base worker")
base = importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)
base.MODEL = "auto"
original_load_rows = base.load_rows


def call_copilot_default(prompt: str, retries: int = 3) -> dict[str, Any]:
    token = os.environ.get("GITHUB_TOKEN")
    if not token:
        raise RuntimeError("GITHUB_TOKEN missing")
    env = os.environ.copy()
    env.update({"GITHUB_TOKEN": token, "COPILOT_GITHUB_TOKEN": token, "NO_COLOR": "1"})
    command = [
        "copilot", "-p", prompt, "-s",
        "--no-ask-user", "--no-custom-instructions", "--no-auto-update", "--no-remote",
        "--deny-tool=shell", "--deny-tool=write", "--log-level", "error",
    ]
    last = "unknown"
    for attempt in range(1, retries + 1):
        try:
            proc = subprocess.run(command, cwd=ROOT, env=env, text=True, capture_output=True, timeout=base.TIMEOUT)
            if proc.returncode == 0:
                return base.extract_json(proc.stdout)
            last = f"exit={proc.returncode}; stderr={proc.stderr[-2500:]}"
        except subprocess.TimeoutExpired:
            last = f"timeout={base.TIMEOUT}s"
        except Exception as exc:
            last = repr(exc)
        if attempt < retries:
            time.sleep(min(12, 2**attempt))
    raise RuntimeError(f"Copilot semantic review failed after {retries} attempts: {last}")


base.call_copilot = call_copilot_default


def ensure_direct() -> dict[str, Any]:
    subprocess.run(["node", "scripts/materialize-nt-direct-transcript-coverage.mjs"], cwd=ROOT, check=True)
    data = json.loads(DIRECT_PATH.read_text(encoding="utf-8"))
    if data.get("schema") not in {
        "emanus-nt-direct-transcript-coverage-v1",
        "emanus-nt-direct-transcript-coverage-v2",
        "emanus-nt-direct-transcript-coverage-v3",
    }:
        raise RuntimeError("Unexpected direct transcript coverage schema")
    return data


def representation_records(item: dict[str, Any], unit_id: str) -> list[dict[str, Any]]:
    reps=item.get("transcriptRepresentations")
    if not isinstance(reps,list) or not reps:
        reps=[{
            "transcriptRepresentationUrl":item["transcriptRepresentationUrl"],
            "transcriptTitle":item["transcriptTitle"],
            "transcriptRange":item["transcriptRange"],
        }]
    records=[]
    for index,rep in enumerate(reps,start=1):
        url=str(rep.get("transcriptRepresentationUrl") or "")
        locator=str(rep.get("transcriptRange") or "")
        if not url.startswith("https://") or not locator:
            raise RuntimeError(f"{unit_id}: malformed transcript representation #{index}")
        records.append({
            "id":f"direct-transcript-{unit_id}-{index}",
            "sourceUrl":item["officialSourceUrl"],
            "officialSeriesUrl":item["officialSourceUrl"],
            "transcriptRepresentationUrl":url,
            "_transcriptUrl":url,
            "sourceTitle":str(rep.get("transcriptTitle") or ""),
            "locator":locator,
            "evidenceKind":"direct-contiguous-vbv-transcript-coverage" if len(reps)>1 else "direct-containing-vbv-transcript-range",
            "verificationLevel":item["verification"],
            "coverageEvidenceSha256":item["coverageEvidenceSha256"],
        })
    return records


def load_rows_with_direct(book_id: str) -> list[dict[str, Any]]:
    direct = ensure_direct()
    rows = original_load_rows(book_id)
    by_key = {(str(row["bookId"]), int(row["chapter"]), str(row["unitId"])): row for row in rows}
    coverage = {
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
            item = coverage.get(key)
            if not item:
                continue
            pseudos=representation_records(item,str(unit["id"]))
            if key in by_key:
                row = by_key[key]
                known = {
                    str(r.get("_transcriptUrl") or r.get("transcriptRepresentationUrl") or r.get("sourceUrl"))
                    for r in row["transcriptRecords"]
                }
                for pseudo in pseudos:
                    if pseudo["transcriptRepresentationUrl"] not in known:
                        row["transcriptRecords"].append(pseudo)
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


def requested_book(argv: list[str]) -> str | None:
    if "--book" not in argv:
        return None
    index = argv.index("--book")
    return argv[index + 1] if index + 1 < len(argv) else None


if __name__ == "__main__":
    book = requested_book(sys.argv)
    if book:
        ensure_direct()
        hash_output = Path("/tmp") / f"semantic-transcript-hashes-{book}.json"
        subprocess.run(
            [
                "python3",
                "scripts/materialize_nt_transcript_hash_index.py",
                "--book",
                book,
                "--output",
                str(hash_output),
            ],
            cwd=ROOT,
            check=True,
        )
    raise SystemExit(base.main())
