#!/usr/bin/env python3
"""Build the non-approving, source-locked review queue for the Emanus NT.

The queue deliberately contains only hashes and verse references for the
locked sources.  It is a worklist for an editor, not evidence that a verse
has been reviewed or approved.
"""

from __future__ import annotations

import hashlib
import importlib.util
import json
import argparse
from pathlib import Path
from types import ModuleType
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs" / "data" / "biblia-emanus"
OUTPUT = ROOT / "docs" / "biblia-emanus" / "NT-EDITORIAL-REVIEW-QUEUE.json"
NT_BOOKS = {
    "MAT", "MRK", "LUK", "JHN", "ACT", "ROM", "1CO", "2CO", "GAL", "EPH",
    "PHP", "COL", "1TH", "2TH", "1TI", "2TI", "TIT", "PHM", "HEB", "JAS",
    "1PE", "2PE", "1JN", "2JN", "3JN", "JUD", "REV",
}


def load_validator() -> ModuleType:
    path = ROOT / "scripts" / "check-biblia-emanus.py"
    spec = importlib.util.spec_from_file_location("biblia_emanus_validator", path)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Nu pot încărca {path}")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def digest(value: str) -> str:
    return "sha256:" + hashlib.sha256(value.encode("utf-8")).hexdigest()


def source_record(
    validator: ModuleType,
    source_data: dict[str, Any],
    lock_id: str,
    book_id: str,
    chapter: int,
    verse: int,
) -> dict[str, Any]:
    references = validator.source_references_for_target(
        lock_id, book_id, chapter, verse, source_data["rules"]
    )
    missing = [reference for reference in references if reference not in source_data["texts"][lock_id]]
    result = {
        "lockId": lock_id,
        "references": [f"{source_chapter}:{source_verse}" for source_chapter, source_verse in references],
    }
    if missing:
        # A source lacuna is evidence to be resolved, not something that may be
        # silently filled by an unrelated Romanian benchmark.
        result["availability"] = "missing-in-pinned-source"
        result["missingReferences"] = [
            f"{source_chapter}:{source_verse}" for source_chapter, source_verse in missing
        ]
    else:
        text = "\n".join(source_data["texts"][lock_id][reference] for reference in references)
        result["textDigest"] = digest(text)
    return result


def build_queue(validator: ModuleType) -> dict[str, Any]:
    manifest = validator.load_json(validator.MANIFEST_PATH)
    paths = validator.validate_manifest(manifest)
    source_data = validator.validate_source_lock(validator.load_json(paths["sourceLock"]))
    ledger = validator.validate_ledger(
        validator.load_json(paths["sourceLedger"]), source_data
    )
    validator.validate_source_coverage(ledger, source_data)

    verses: list[dict[str, Any]] = []
    chapters = 0
    for chapter_id in sorted(ledger, key=lambda value: validator.chapter_sort_key(DATA / f"{value}.json")):
        book_id, chapter_text = chapter_id.split(".")
        if book_id not in NT_BOOKS:
            continue
        chapter = int(chapter_text)
        data = validator.load_json(DATA / f"{chapter_id}.json")
        book = source_data["books"][book_id]
        chapters += 1
        for item in data["verses"]:
            number = item["number"]
            reference = f"{book_id}.{chapter}.{number}"
            sources = {
                "sblgnt": source_record(
                    validator, source_data, book["originalLockId"], book_id, chapter, number
                ),
                "webu": source_record(
                    validator, source_data, book["baseLockId"], book_id, chapter, number
                ),
                "benchmarks": {
                    source_data["files"][lock_id]["benchmarkId"]: source_record(
                        validator, source_data, lock_id, book_id, chapter, number
                    )
                    for lock_id in book["benchmarkLockIds"]
                },
                "externalBenchmarks": [
                    {
                        "id": benchmark_id,
                        "references": [f"{chapter}:{number}"],
                        "consultationRequired": True,
                    }
                    for benchmark_id in book["externalBenchmarkIds"]
                ],
            }
            verses.append(
                {
                    "reference": reference,
                    "textDigest": digest(item["text"]),
                    "status": "pending",
                    "sources": sources,
                }
            )

    if chapters != 260 or len(verses) != 7941:
        raise RuntimeError(
            f"Inventar NT incomplet: {chapters} capitole și {len(verses)} versete"
        )
    queue_digest = digest(
        "\n".join(f"{item['reference']}:{item['textDigest']}" for item in verses)
    )
    return {
        "schemaVersion": 1,
        "translation": "BE",
        "status": "in_review",
        "purpose": "worklist-only; this document is not an editorial approval",
        "sourceSnapshotSha256": source_data["snapshotSha256ByBook"]["MAT"],
        "chapters": chapters,
        "verses": verses,
        "queueDigest": queue_digest,
    }


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Construiește coada editorială NT fără a aproba vreun verset."
    )
    parser.add_argument("--output", type=Path, default=OUTPUT)
    parser.add_argument("--check", action="store_true", help="verifică ieșirea existentă fără s-o rescrie")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    validator = load_validator()
    queue = build_queue(validator)
    rendered = json.dumps(queue, ensure_ascii=False, indent=2) + "\n"
    if args.check:
        if not args.output.is_file() or args.output.read_text(encoding="utf-8") != rendered:
            print("[nt-editorial-review-queue] EROARE: coada nu corespunde corpusului și surselor fixate")
            return 1
    else:
        args.output.write_text(rendered, encoding="utf-8")
    print(
        "[nt-editorial-review-queue] "
        f"OK: {queue['chapters']} capitole / {len(queue['verses'])} versete"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
