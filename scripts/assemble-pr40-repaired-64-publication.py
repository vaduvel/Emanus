#!/usr/bin/env python3
"""Assemble the repaired 64-work PR40 corpus using audited artifact boundaries.

The historical 64-work inventory remains scope evidence, but deuterocanonical
and early-work chapter counts are derived from their audited artifacts. This
prevents placeholder-era counts (for example ESG=6) from blocking a newer,
fully audited artifact (ESG=10).
"""
from __future__ import annotations

import importlib.util
import sys
from pathlib import Path
from typing import Any

BASE_PATH = Path(__file__).with_name("assemble-pr40-final-publication.py")
spec = importlib.util.spec_from_file_location("pr40_final_base", BASE_PATH)
if spec is None or spec.loader is None:
    raise SystemExit(f"Cannot load {BASE_PATH}")
base = importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)


def cli_path(flag: str) -> Path:
    try:
        index = sys.argv.index(flag)
        return Path(sys.argv[index + 1])
    except (ValueError, IndexError) as error:
        raise RuntimeError(f"Missing required {flag} argument") from error


def artifact_chapter_count(prior: Path, current: Path, collection: str, book_id: str) -> int:
    artifact = base.final_artifact(prior, current, collection, book_id)
    if collection == "deuterocanon":
        source = artifact / "data" / "biblia-emanus-deuterocanon-audited"
    elif collection == "early":
        source = artifact / "data" / "biblia-emanus-early-audited"
    else:
        raise RuntimeError(f"Unsupported chapter collection: {collection}")
    paths = sorted(source.glob(f"{book_id}.*.json"))
    chapters: list[int] = []
    for path in paths:
        suffix = path.stem.rsplit(".", 1)
        if len(suffix) == 2 and suffix[1].isdigit():
            chapters.append(int(suffix[1]))
    if not chapters:
        raise RuntimeError(f"{book_id}: audited artifact contains no chapter files")
    chapters = sorted(set(chapters))
    expected = list(range(1, chapters[-1] + 1))
    if chapters != expected:
        raise RuntimeError(f"{book_id}: audited chapters are not contiguous: {chapters}")
    return chapters[-1]


def audited_expected_chapters() -> dict[str, int]:
    prior = cli_path("--prior")
    current = cli_path("--current")
    inventory: dict[str, Any] = base.read_json(base.INVENTORY_PATH)
    if int(inventory.get("bookCount", 0)) != 64:
        raise RuntimeError("Pinned PR40 inventory no longer contains exactly 64 works")
    expected = {
        str(item["bookId"]): int(item["chapterCount"])
        for item in inventory["books"]
    }
    for book_id in sorted(base.DEUTEROCANON):
        expected[book_id] = artifact_chapter_count(prior, current, "deuterocanon", book_id)
    for book_id in sorted(base.EARLY):
        expected[book_id] = artifact_chapter_count(prior, current, "early", book_id)
    return expected


base.expected_chapters = audited_expected_chapters

if __name__ == "__main__":
    base.main()
