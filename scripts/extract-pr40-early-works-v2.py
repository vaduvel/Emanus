#!/usr/bin/env python3
"""Calibrate early-work extraction without hiding source lacunae.

CCEL's Jubilees pages encode each verse as a paragraph after ``[Chapter N]``;
the verse number is presentation metadata rather than text. This wrapper turns
those paragraphs into numbered source units before applying the same strict
structural gates used for the other works.
"""
from __future__ import annotations

import importlib.util
import json
import re
from pathlib import Path
from typing import Any

from bs4 import BeautifulSoup, Tag

SCRIPT = Path(__file__).with_name("extract-pr40-early-works.py")
spec = importlib.util.spec_from_file_location("pr40_early_v1", SCRIPT)
if spec is None or spec.loader is None:
    raise SystemExit(f"Cannot load {SCRIPT}")
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)

module.BARE_NUMBER_RE = re.compile(r"^([1-9][0-9]{0,2})\s*[.)]?$", re.S)
_original_visible_lines = module.visible_lines


def visible_lines(html: str) -> list[str]:
    """Return synthetic numbered lines for a CCEL Jubilees chapter.

    The exact body heading is an ``h5`` and every following body ``p`` is one
    verse. Navigation links are not paragraphs. The source credit terminates
    the chapter and is excluded.
    """
    soup = BeautifulSoup(html, "html.parser")
    headings = [
        node
        for node in soup.find_all("h5")
        if re.fullmatch(r"\[\s*Chapter\s+[0-9]+\s*\]", module.clean(node.get_text(" ", strip=True)), re.I)
    ]
    if headings:
        if len(headings) != 1:
            raise RuntimeError(f"CCEL Jubilees page has {len(headings)} exact chapter headings")
        heading = headings[0]
        paragraphs: list[str] = []
        for node in heading.find_all_next():
            if not isinstance(node, Tag):
                continue
            if node is not heading and node.name in {"h1", "h2", "h3", "h4", "h5"}:
                break
            if node.name != "p":
                continue
            text = module.clean(node.get_text(" ", strip=True))
            if not text:
                continue
            folded = text.casefold()
            if folded.startswith("from the apocrypha and pseudepigrapha"):
                break
            if folded.startswith("chapter:") or folded in module.STOP_MARKERS:
                break
            paragraphs.append(text)
        if not paragraphs:
            raise RuntimeError("CCEL Jubilees chapter heading found without body paragraphs")
        heading_text = module.clean(heading.get_text(" ", strip=True))
        return [heading_text, *[f"{index}. {text}" for index, text in enumerate(paragraphs, start=1)]]
    return _original_visible_lines(html)


def find_text_start(lines: list[str], chapter: int) -> int:
    pattern = re.compile(rf"^chapter\s+{chapter}$", re.I)
    candidates = [
        index
        for index, line in enumerate(lines)
        if pattern.fullmatch(module.clean(line).strip("[]#* "))
    ]
    if len(candidates) != 1:
        samples = [line for line in lines if "chapter" in line.casefold()][:20]
        raise RuntimeError(
            f"expected one exact chapter heading {chapter!r}; candidates={candidates!r}; samples={samples!r}"
        )
    return candidates[0] + 1


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
    if any(marker in combined.casefold() for marker in ("send feedback", "cookie", "privacy policy", "chapter:")):
        issues.append("NAVIGATION_LEAK")
    if len(combined) < 20:
        issues.append("IMPLAUSIBLY_SHORT")
    if book_id == "DID" and len(verses) != 1:
        issues.append("DIDASCALIA_MUST_BE_SINGLE_PROSE_UNIT")
    return issues


module.visible_lines = visible_lines
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
    path.write_text(json.dumps(document, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
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
module.REPORT.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(json.dumps({"summary": report["summary"], "sourceNumberingGaps": source_gaps}, ensure_ascii=False, indent=2))
