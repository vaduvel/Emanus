#!/usr/bin/env python3
from __future__ import annotations

import importlib.util
import json
import subprocess
import sys
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
# Explicit supported CLI model. Transcript hashing runs before any model call so
# manual review remains reproducible even if the external request quota is exhausted.
base.MODEL = "claude-haiku-4.5"
original_load_rows = base.load_rows


def ensure_direct() -> dict[str, Any]:
    subprocess.run(["node", "scripts/materialize-nt-direct-transcript-coverage.mjs"], cwd=ROOT, check=True)
    data = json.loads(DIRECT_PATH.read_text(encoding="utf-8"))
    if data.get("schema") not in {"emanus-nt-direct-transcript-coverage-v1", "emanus-nt-direct-transcript-coverage-v2"}:
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
