#!/usr/bin/env python3
"""Poarta structurală și editorială pentru Biblia explicată: Tit."""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BIBLE = ROOT / "packages" / "shared" / "src" / "bible"
EXPECTED_RANGES = {
    1: [(1, 4), (5, 9), (10, 14), (15, 16)],
    2: [(1, 5), (6, 10), (11, 14), (15, 15)],
    3: [(1, 2), (3, 7), (8, 11), (12, 15)],
}
PROHIBITED = {
    r"faptele (?:ne )?mântuiesc": "mântuire prin merite",
    r"supunere absolută": "autoritate omenească absolutizată",
    r"abuzul trebuie ascuns": "ascunderea abuzului",
    r"sclavia este voia lui dumnezeu": "justificarea sclaviei",
}


def fail(message: str) -> None:
    safe = message.replace("%", "%25").replace("\r", "%0D").replace("\n", "%0A")
    print(f"::error title=Poarta Tit::{safe}")


def main() -> int:
    errors: list[str] = []
    book = (BIBLE / "tit.ts").read_text(encoding="utf-8")
    text = (BIBLE / "titText.ts").read_text(encoding="utf-8")
    helper = (BIBLE / "titHelpers.ts").read_text(encoding="utf-8")
    publication = (BIBLE / "titPublication.ts").read_text(encoding="utf-8")
    source = (BIBLE / "titSource.ts").read_text(encoding="utf-8")
    index = (BIBLE / "index.ts").read_text(encoding="utf-8")

    declarations = [int(n) for n in re.findall(r"export const TIT_(\d+) = titChapter", book)]
    if declarations != [1, 2, 3]:
        errors.append(f"tit.ts: capitole declarate {declarations}; se așteptau [1, 2, 3]")

    for number, expected in EXPECTED_RANGES.items():
        marker = f"export const TIT_{number} = titChapter"
        start = book.find(marker)
        end = book.find("export const TIT_", start + len(marker))
        if end < 0:
            end = book.find("export const TIT: BibleBook", start)
        block = book[start:end]
        ranges = [(int(a), int(b)) for a, b in re.findall(r"verses:\s*\[(\d+),\s*(\d+)\]", block)]
        if ranges != expected:
            errors.append(f"Tit {number}: intervale {ranges}; se așteptau {expected}")
        if f"number: {number}" not in block:
            errors.append(f"Tit {number}: număr de capitol lipsă")
        for field in ("title", "summary", "literaryContext", "historicalContext", "units", "prayer"):
            if not re.search(rf"\b{field}\s*:", block):
                errors.append(f"Tit {number}: lipsește {field}")

    chapter_blocks = re.findall(r'\n  \[\n    "",\n(.*?)\n  \],', text, flags=re.S)
    counts = [len(re.findall(r'^    "', block, flags=re.M)) for block in chapter_blocks]
    if counts != [16, 15, 15]:
        errors.append(f"titText.ts: număr de versete detectat {counts}; se așteptau [16, 15, 15]")
    if "teaching:" in text or "forYourHeart:" in text:
        errors.append("titText.ts: explicația a intrat în stratul Scripturii")

    statuses = {
        int(number): status
        for number, status in re.findall(r'^\s*(\d+):\s*"(draft|in_review|published)",', publication, re.M)
    }
    if statuses != {1: "in_review", 2: "in_review", 3: "in_review"}:
        errors.append(f"titPublication.ts: stări neașteptate {statuses}")

    if "status: titStatus(input.number)" not in helper:
        errors.append("titHelpers.ts: starea nu vine din registrul editorial")
    if 'import { TIT } from "./tit.js"' not in index or not re.search(
        r"BIBLE_BOOKS:\s*BibleBook\[\]\s*=\s*\[[^\]]*\bTIT\b", index
    ):
        errors.append("bible/index.ts: Tit nu este conectat în catalog")
    if "rawTranscriptCommitted: false" not in source:
        errors.append("titSource.ts: lipsește interdicția transcrierii brute")

    lowered = book.lower()
    for pattern, label in PROHIBITED.items():
        if re.search(pattern, lowered):
            errors.append(f"tit.ts: formulare interzisă — {label}")

    if 'id: `tit-${input.number}-${from}-${to}`' not in helper:
        errors.append("titHelpers.ts: schema ID-urilor de unitate s-a schimbat")

    print("Poarta Tit: 3 capitole, 46 versete, 12 unități, toate in_review.")
    if errors:
        for error in errors:
            print(f"- {error}")
            fail(error)
        return 1
    print("Verificarea structurală și editorială Tit a trecut.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
