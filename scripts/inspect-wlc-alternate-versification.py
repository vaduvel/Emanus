#!/usr/bin/env python3
"""Inspect WLC USFM alternate chapter/verse markers for canonical candidates."""
from __future__ import annotations

import json
import re
import zipfile
from collections import defaultdict
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
CANDIDATES = ROOT / "docs" / "data" / "biblia-emanus-candidates"
WLC = CANDIDATES / "sources" / "hboWLC_usfm.zip"
OUT = ROOT / "docs" / "biblia-emanus" / "PR40-WLC-ALTERNATE-VERSIFICATION.json"
CANONICAL = {
    "JDG", "RUT", "1SA", "2SA", "1KI", "2KI", "1CH", "2CH", "EZR", "NEH",
    "EST", "JOB", "PSA", "PRO", "ECC", "SNG", "ISA", "JER", "LAM", "EZK",
    "DAN", "HOS", "JOL", "AMO", "OBA", "JON", "MIC", "NAM", "HAB", "ZEP",
    "HAG", "ZEC", "MAL",
}


def target_references() -> dict[str, list[tuple[int, int]]]:
    result: dict[str, list[tuple[int, int]]] = defaultdict(list)
    for path in sorted(CANDIDATES.glob("*.json")):
        if path.name == "manifest.json":
            continue
        document = json.loads(path.read_text(encoding="utf-8"))
        book = str(document.get("bookId", ""))
        if book not in CANONICAL:
            continue
        chapter = int(document.get("chapter", document.get("chapterNumber", 0)))
        result[book].extend((chapter, int(verse["number"])) for verse in document.get("verses", []))
    return {book: sorted(values) for book, values in result.items()}


def main() -> None:
    targets = target_references()
    records: dict[str, Any] = {}
    with zipfile.ZipFile(WLC) as archive:
        for filename in sorted(archive.namelist()):
            if not filename.lower().endswith((".usfm", ".sfm")):
                continue
            text = archive.read(filename).decode("utf-8-sig")
            id_match = re.search(r"(?m)^\\id\s+([0-9A-Z]{3})\b", text)
            if not id_match or id_match.group(1) not in CANONICAL:
                continue
            book = id_match.group(1)
            chapter: int | None = None
            refs: list[tuple[int, int]] = []
            marker_lines: list[dict[str, Any]] = []
            pending_context: list[str] = []
            lines = text.splitlines()
            for index, line in enumerate(lines, start=1):
                chapter_match = re.match(r"^\\c\s+([0-9]+)\b", line)
                if chapter_match:
                    chapter = int(chapter_match.group(1))
                verse_match = re.match(r"^\\v\s+([0-9]+)(?:-[0-9]+)?\b", line)
                if verse_match and chapter is not None:
                    refs.append((chapter, int(verse_match.group(1))))
                if re.search(r"\\(?:ca|va|vp)\b", line):
                    marker_lines.append(
                        {
                            "line": index,
                            "text": line,
                            "context": lines[max(0, index - 3):min(len(lines), index + 2)],
                        }
                    )
            target = targets.get(book, [])
            if refs != target or marker_lines:
                records[book] = {
                    "file": filename,
                    "targetTotal": len(target),
                    "wlcTotal": len(refs),
                    "totalDifference": len(target) - len(refs),
                    "targetOnly": [f"{c}:{v}" for c, v in sorted(set(target) - set(refs))],
                    "wlcOnly": [f"{c}:{v}" for c, v in sorted(set(refs) - set(target))],
                    "alternateMarkerCount": len(marker_lines),
                    "alternateMarkers": marker_lines,
                }

    payload = {
        "schemaVersion": 1,
        "source": str(WLC.relative_to(ROOT)),
        "booksWithDifferentReferencesOrMarkers": len(records),
        "booksWithDifferentTotals": [
            book for book, record in records.items() if record["totalDifference"] != 0
        ],
        "booksWithAlternateMarkers": [
            book for book, record in records.items() if record["alternateMarkerCount"]
        ],
        "books": records,
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({
        "booksWithDifferentReferencesOrMarkers": payload["booksWithDifferentReferencesOrMarkers"],
        "booksWithDifferentTotals": payload["booksWithDifferentTotals"],
        "booksWithAlternateMarkers": payload["booksWithAlternateMarkers"],
    }, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
