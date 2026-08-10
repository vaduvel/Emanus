#!/usr/bin/env python3
from __future__ import annotations

import importlib.util
import json
import subprocess
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
DIRECT = ROOT / "docs/data/biblia-explicata/nt-direct-transcript-coverage.json"
GM_PATH = ROOT / "scripts/nt_semantic_github_models_worker.py"

spec = importlib.util.spec_from_file_location("emanus_gm_semantic", GM_PATH)
if spec is None or spec.loader is None:
    raise RuntimeError("Cannot load GitHub Models semantic worker")
gm = importlib.util.module_from_spec(spec)
spec.loader.exec_module(gm)
base = gm.base
original_load_rows = base.load_rows


def ensure_direct_coverage() -> None:
    subprocess.run(["node", "scripts/materialize-nt-direct-transcript-coverage.mjs"], cwd=ROOT, check=True)


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
        title=str(rep.get("transcriptTitle") or "")
        locator=str(rep.get("transcriptRange") or "")
        if not url.startswith("https://") or not locator:
            raise RuntimeError(f"{unit_id}: malformed transcript representation #{index}")
        result.append({
            "id": f"direct-transcript-{unit_id}-{index}",
            "sourceUrl": coverage["officialSourceUrl"],
            "officialSeriesUrl": coverage["officialSourceUrl"],
            "transcriptRepresentationUrl": url,
            "_transcriptUrl": url,
            "sourceTitle": title,
            "locator": locator,
            "evidenceKind": "direct-contiguous-vbv-transcript-coverage" if len(reps)>1 else "direct-containing-vbv-transcript-range",
            "verificationLevel": coverage["verification"],
            "coverageEvidenceSha256": coverage["coverageEvidenceSha256"],
        })
    return result


def load_rows_with_direct(book_id: str) -> list[dict[str, Any]]:
    ensure_direct_coverage()
    rows = original_load_rows(book_id)
    by_key = {(str(row["bookId"]), int(row["chapter"]), str(row["unitId"])): row for row in rows}

    direct = json.loads(DIRECT.read_text(encoding="utf-8"))
    if direct.get("schema") not in {
        "emanus-nt-direct-transcript-coverage-v1",
        "emanus-nt-direct-transcript-coverage-v2",
        "emanus-nt-direct-transcript-coverage-v3",
    }:
        raise RuntimeError("Unexpected direct transcript coverage schema")
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
                    str(r.get("_transcriptUrl") or r.get("transcriptRepresentationUrl") or r.get("sourceUrl"))
                    for r in existing["transcriptRecords"]
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
    result=sorted(
        by_key.values(),
        key=lambda row: (int(row["chapter"]), int(row.get("verseStart", 0)), str(row["unitId"])),
    )
    print(f"semantic review {book_id}: {len(result)} transcript-addressable pending units after strict direct coverage", flush=True)
    return result


base.load_rows = load_rows_with_direct

if __name__ == "__main__":
    raise SystemExit(base.main())
