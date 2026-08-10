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


def load_rows_with_direct(book_id: str) -> list[dict[str, Any]]:
    ensure_direct_coverage()
    rows = original_load_rows(book_id)
    by_key = {(str(row["bookId"]), int(row["chapter"]), str(row["unitId"])): row for row in rows}

    direct = json.loads(DIRECT.read_text(encoding="utf-8"))
    if direct.get("schema") != "emanus-nt-direct-transcript-coverage-v1":
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
            pseudo = {
                "id": f"direct-transcript-{unit['id']}",
                "sourceUrl": coverage["officialSourceUrl"],
                "officialSeriesUrl": coverage["officialSourceUrl"],
                "transcriptRepresentationUrl": coverage["transcriptRepresentationUrl"],
                "_transcriptUrl": coverage["transcriptRepresentationUrl"],
                "sourceTitle": coverage["transcriptTitle"],
                "locator": coverage["transcriptRange"],
                "evidenceKind": "direct-containing-vbv-transcript-range",
                "verificationLevel": coverage["verification"],
                "coverageEvidenceSha256": coverage["coverageEvidenceSha256"],
            }
            if key in by_key:
                existing = by_key[key]
                known = {str(r.get("_transcriptUrl") or r.get("transcriptRepresentationUrl") or r.get("sourceUrl")) for r in existing["transcriptRecords"]}
                if coverage["transcriptRepresentationUrl"] not in known:
                    existing["transcriptRecords"].append(pseudo)
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
    return sorted(by_key.values(), key=lambda row: (int(row["chapter"]), int(row.get("verseStart", 0)), str(row["unitId"])))


base.load_rows = load_rows_with_direct

if __name__ == "__main__":
    raise SystemExit(base.main())
