#!/usr/bin/env python3
"""Extract early works using CCEL's static numbered Jubilees pages.

The modern CCEL page renders verse numbers outside the text nodes used by
BeautifulSoup. The static ``files/jubilee`` pages preserve the numbers in the
text stream and therefore support reproducible unit extraction.
"""
from __future__ import annotations

import importlib.util
import json
import re
from pathlib import Path
from typing import Any

SCRIPT = Path(__file__).with_name("extract-pr40-early-works.py")
spec = importlib.util.spec_from_file_location("early_source_v1", SCRIPT)
if spec is None or spec.loader is None:
    raise SystemExit(f"Cannot load {SCRIPT}")
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)

module.WORKS["JUB"]["url"] = (
    "https://www.ccel.org/c/charles/otpseudepig/files/jubilee/{chapter}.htm"
)
module.BARE_NUMBER_RE = re.compile(r"^([1-9][0-9]{0,2})\s*[.)]?$", re.S)


def validate_verses(book_id: str, chapter: int, verses: list[dict[str, Any]]) -> list[str]:
    if not verses:
        return ["NO_TEXT"]
    issues: list[str] = []
    numbers = [int(item["number"]) for item in verses]
    if len(numbers) != len(set(numbers)):
        issues.append("DUPLICATE_VERSE_NUMBERS")
    if any(current <= previous for previous, current in zip(numbers, numbers[1:])):
        issues.append("REVERSED_OR_DUPLICATE_VERSE_NUMBERS")
    if numbers[0] != 1:
        issues.append("FIRST_VERSE_IS_NOT_ONE")
    if any(not str(item.get("text", "")).strip() for item in verses):
        issues.append("EMPTY_VERSE")
    combined = " ".join(str(item["text"]) for item in verses)
    if any(marker in combined.casefold() for marker in ("send feedback", "cookie", "privacy policy", "chapter:")):
        issues.append("NAVIGATION_LEAK")
    if len(combined) < 20:
        issues.append("IMPLAUSIBLY_SHORT")
    if book_id == "DID" and len(verses) != 1:
        issues.append("DIDASCALIA_MUST_BE_SINGLE_PROSE_UNIT")
    return issues


module.validate_verses = validate_verses
module.main()

report = json.loads(module.REPORT.read_text(encoding="utf-8"))
source_gaps: list[dict[str, Any]] = []
for path in sorted(module.OUT.glob("*.json")):
    document = json.loads(path.read_text(encoding="utf-8"))
    numbers = [int(item["number"]) for item in document.get("verses", [])]
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
