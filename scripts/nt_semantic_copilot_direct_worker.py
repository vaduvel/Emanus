#!/usr/bin/env python3
from __future__ import annotations

import importlib.util
import json
import subprocess
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
# Explicitly avoid auto-selection: GPT-5 mini is currently a zero-multiplier paid-plan
# Copilot model and remains sufficient for a two-pass transcript-grounded review.
base.MODEL = "gpt-5-mini"
original_load_rows = base.load_rows


def ensure_direct() -> dict[str, Any]:
    subprocess.run(["node", "scripts/materialize-nt-direct-transcript-coverage.mjs"], cwd=ROOT, check=True)
    data = json.loads(DIRECT_PATH.read_text(encoding="utf-8"))
    if data.get("schema") != "emanus-nt-direct-transcript-coverage-v1":
        raise RuntimeError("Unexpected direct transcript coverage schema")
    return data


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
            pseudo = {
                "id": f"direct-transcript-{unit['id']}",
                "sourceUrl": item["officialSourceUrl"],
                "officialSeriesUrl": item["officialSourceUrl"],
                "transcriptRepresentationUrl": item["transcriptRepresentationUrl"],
                "_transcriptUrl": item["transcriptRepresentationUrl"],
                "sourceTitle": item["transcriptTitle"],
                "locator": item["transcriptRange"],
                "evidenceKind": "direct-containing-vbv-transcript-range",
                "verificationLevel": item["verification"],
                "coverageEvidenceSha256": item["coverageEvidenceSha256"],
            }
            if key in by_key:
                row = by_key[key]
                known = {
                    str(r.get("_transcriptUrl") or r.get("transcriptRepresentationUrl") or r.get("sourceUrl"))
                    for r in row["transcriptRecords"]
                }
                if item["transcriptRepresentationUrl"] not in known:
                    row["transcriptRecords"].append(pseudo)
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
                    "transcriptRecords": [pseudo],
                }
    result = sorted(by_key.values(), key=lambda row: (int(row["chapter"]), str(row["unitId"])))
    print(f"semantic review {book_id}: {len(result)} transcript-addressable pending units after direct-range coverage", flush=True)
    return result


base.load_rows = load_rows_with_direct

if __name__ == "__main__":
    raise SystemExit(base.main())
