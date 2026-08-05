#!/usr/bin/env python3
"""Calibrate early-work extraction without hiding source lacunae.

Jubilees uses bracketed chapter headings on CCEL. The selected Charles/Kraft
transcriptions also contain explicit numbering gaps. We preserve and report
those gaps rather than renumbering or inventing text. Duplicates, reversed
numbering, empty text, navigation leaks, and implausibly short chapters remain
blocking.
"""
from __future__ import annotations

import importlib.util
import json
import re
from pathlib import Path
from typing import Any

SCRIPT = Path(__file__).with_name("extract-pr40-early-works.py")
spec = importlib.util.spec_from_file_location("pr40_early_v1", SCRIPT)
if spec is None or spec.loader is None:
    raise SystemExit(f"Cannot load {SCRIPT}")
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)

module.BARE_NUMBER_RE = re.compile(r"^([1-9][0-9]{0,2})\s*[.)]?$", re.S)


def find_text_start(lines: list[str], chapter: int) -> int:
    """Choose the real chapter body, never the repeated CCEL navigation label."""
    candidates: list[int] = []
    pattern = re.compile(rf"^chapter\s+{chapter}$", re.I)
    for index, line in enumerate(lines):
        normalized = module.clean(line).strip("[]#* ")
        if pattern.fullmatch(normalized):
            candidates.append(index)
    if not candidates:
        samples = [line for line in lines if "chapter" in line.casefold()][:20]
        raise RuntimeError(f"chapter heading {chapter!r} not found; samples={samples!r}")

    # The true heading is followed by verse 1. The navigation occurrence is
    # followed by a list of chapter links and must never be selected.
    for index in candidates:
        for probe in lines[index + 1 : index + 20]:
            if module.heading_chapter(probe) is not None:
                break
            verse_match = module.VERSE_RE.match(probe)
            bare_match = module.BARE_NUMBER_RE.fullmatch(probe)
            if verse_match and int(verse_match.group(1)) == 1:
                return index + 1
            if bare_match and int(bare_match.group(1)) == 1:
                return index + 1
    raise RuntimeError(
        f"chapter heading {chapter!r} found but no following verse 1; candidates={candidates!r}"
    )


def validate_verses(book_id: str, chapter: int, verses: list[dict[str, Any]]) -> list[str]:
    issues: list[str] = []
    if not verses:
        return ["NO_TEXT"]
    numbers = [int(verse["number"]) for verse in verses]
    if len(numbers) != len(set(numbers)):
        issues.append("DUPLICATE_VERSE_NUMBERS")
    if any(current <= previous for previous, current in zip(numbers, numbers[1:])):
        issues.append("REVERSED_OR_DUPLICATE_VERSE_NUMBERS")
    if numbers[0] != 1:
        issues.append("FIRST_VERSE_IS_NOT_ONE")
    if any(not str(verse.get("text", "")).strip() for verse in verses):
        issues.append("EMPTY_VERSE")
    combined = " ".join(str(verse["text"]) for verse in verses)
    if any(
        marker in combined.casefold()
        for marker in ("send feedback", "cookie", "privacy policy", "chapter:")
    ):
        issues.append("NAVIGATION_LEAK")
    if len(combined) < 20:
        issues.append("IMPLAUSIBLY_SHORT")
    if book_id == "DID" and len(verses) != 1:
        issues.append("DIDASCALIA_MUST_BE_SINGLE_PROSE_UNIT")
    return issues


module.find_text_start = find_text_start
module.validate_verses = validate_verses
module.main()

report = json.loads(module.REPORT.read_text(encoding="utf-8"))
source_gaps: list[dict[str, Any]] = []
for path in sorted(module.OUT.glob("*.json")):
    document = json.loads(path.read_text(encoding="utf-8"))
    numbers = [int(verse["number"]) for verse in document.get("verses", [])]
    if not numbers:
        continue
    gaps = sorted(set(range(1, max(numbers) + 1)) - set(numbers))
    document.setdefault("audit", {})["sourceMissingVerseNumbers"] = gaps
    document["audit"]["numberingPolicy"] = (
        "Preserve source numbering; never close a gap by renumbering or invented text."
    )
    path.write_text(
        json.dumps(document, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    if gaps:
        book_id, chapter_text = path.stem.split(".", 1)
        source_gaps.append(
            {
                "bookId": book_id,
                "chapter": int(chapter_text),
                "missingVerseNumbers": gaps,
                "status": "explicit-source-gap-requires-secondary-witness",
            }
        )

report["sourceNumberingGaps"] = source_gaps
report["summary"]["sourceNumberingGapChapters"] = len(source_gaps)
report["summary"]["sourceExtractionReady"] = not report.get("blocking")
module.REPORT.write_text(
    json.dumps(report, ensure_ascii=False, indent=2) + "\n",
    encoding="utf-8",
)
print(
    json.dumps(
        {"summary": report["summary"], "sourceNumberingGaps": source_gaps},
        ensure_ascii=False,
        indent=2,
    )
)