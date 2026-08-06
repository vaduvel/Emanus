#!/usr/bin/env python3
"""Poarta deterministă pentru Biblia explicată — 1 Împărați."""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BIBLE = ROOT / "packages" / "shared" / "src" / "bible"
DATA = BIBLE / "data" / "1-imparati"
TRANSCRIPT = ROOT / ".research" / "poonen-through-the-bible-OT" / "transcripts" / "kings-1.txt"
CHAPTER_FILES = [
    BIBLE / "imparati1_1_4.ts",
    BIBLE / "imparati1_5_8.ts",
    BIBLE / "imparati1_9_12.ts",
    BIBLE / "imparati1_13_16.ts",
    BIBLE / "imparati1_17_19.ts",
    BIBLE / "imparati1_20_22.ts",
]
PASSAGE_RE = re.compile(r"imparati1Passage\((\d+),\s*(\d+),\s*(\d+)\)")


def require(condition: bool, message: str) -> None:
    if not condition:
        raise SystemExit(f"[1 Împărați] EROARE: {message}")


def read(path: Path) -> str:
    require(path.exists(), f"lipsește {path.relative_to(ROOT)}")
    return path.read_text(encoding="utf-8")


def main() -> None:
    transcript = read(TRANSCRIPT).lower()
    for phrase in (
        "adonijah",
        "wisdom",
        "queen of sheba",
        "jeroboam",
        "elijah",
        "naboth",
        "micaiah",
    ):
        require(phrase in transcript, f"lipsește ancora Poonen: {phrase}")

    source_counts: dict[int, int] = {}
    total_verses = 0
    for chapter in range(1, 23):
        data = json.loads(read(DATA / f"1KI.{chapter}.json"))
        require(data.get("translation") == "BE", f"1KI.{chapter} nu este Biblia Emanus")
        require(data.get("bookId") == "1KI", f"1KI.{chapter} are bookId greșit")
        require(data.get("chapter") == chapter, f"1KI.{chapter} declară alt capitol")
        verses = data.get("verses")
        require(isinstance(verses, list) and verses, f"1KI.{chapter} nu are versete")
        for index, verse in enumerate(verses, start=1):
            require(verse.get("number") == index, f"1KI.{chapter}:{index} numerotare discontinuă")
            require(isinstance(verse.get("text"), str) and verse["text"].strip(), f"1KI.{chapter}:{index} text gol")
        source_counts[chapter] = len(verses)
        total_verses += len(verses)

    combined = "\n".join(read(path) for path in CHAPTER_FILES)
    combined_lower = combined.lower()
    total_units = 0

    for chapter in range(1, 23):
        require(f"export const IMPARATI1_{chapter}" in combined, f"lipsește explicația capitolului {chapter}")
        require(f"status: IMPARATI1_STATUSES[{chapter}]" in combined, f"capitolul {chapter} nu este în registrul editorial")
        ranges = [
            (int(start), int(end))
            for declared, start, end in PASSAGE_RE.findall(combined)
            if int(declared) == chapter
        ]
        require(ranges, f"capitolul {chapter} nu are unități")
        expected = 1
        for start, end in ranges:
            require(start == expected, f"capitolul {chapter}: se aștepta versetul {expected}, găsit {start}")
            require(end >= start, f"capitolul {chapter}: interval invers {start}-{end}")
            expected = end + 1
        require(expected == source_counts[chapter] + 1, f"capitolul {chapter}: acoperire până la {expected - 1} din {source_counts[chapter]}")
        total_units += len(ranges)

    publication = read(BIBLE / "imparati1Publication.ts")
    book = read(BIBLE / "imparati1.ts")
    rules = read(ROOT / "docs" / "biblia-explicata" / "1-IMPARATI-SOURCE-RULES.md")
    require("length: 22" in publication, "registrul nu generează 22 de stări")
    require("IMPARATI1_22" in book and "chapters: [" in book, "cartea nu conține toate capitolele")
    require("Poonen" in rules and "WLC-OSHB" in rules, "regula surselor este incompletă")

    for phrase in (
        "nu autorizează violență religioasă modernă",
        "nu este prezentată ca ieșire legitimă",
        "nu autorizează liderii creștini să elimine fizic rivalii",
        "nu oferă o formulă simplă",
        "nu lăsa unei voci religioase",
    ):
        require(phrase in combined_lower, f"lipsește protecția editorială: {phrase}")

    require(total_verses == 816, f"total versete {total_verses}, așteptat 816")
    require(total_units == 44, f"total unități {total_units}, așteptat 44")
    print(f"1 Împărați OK: 22 capitole, {total_verses} versete Biblia Emanus, {total_units} unități, toate in_review.")


if __name__ == "__main__":
    main()
