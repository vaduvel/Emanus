#!/usr/bin/env python3
"""Poarta deterministă pentru Biblia explicată — 1 Samuel."""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BIBLE = ROOT / "packages" / "shared" / "src" / "bible"
DATA = BIBLE / "data" / "1-samuel"
TRANSCRIPT = ROOT / ".research" / "poonen-through-the-bible-OT" / "transcripts" / "samuel-1.txt"
CHAPTER_FILES = [
    BIBLE / "samuel1_1.ts",
    BIBLE / "samuel1_2_4.ts",
    BIBLE / "samuel1_5_8.ts",
    BIBLE / "samuel1_9_12.ts",
    BIBLE / "samuel1_13_16.ts",
    BIBLE / "samuel1_17_20.ts",
    BIBLE / "samuel1_21_24.ts",
    BIBLE / "samuel1_25_28.ts",
    BIBLE / "samuel1_29_31.ts",
]
PASSAGE_RE = re.compile(r"samuel1Passage\((\d+),\s*(\d+),\s*(\d+)\)")


def require(condition: bool, message: str) -> None:
    if not condition:
        raise SystemExit(f"[1 Samuel] EROARE: {message}")


def read(path: Path) -> str:
    require(path.exists(), f"lipsește {path.relative_to(ROOT)}")
    return path.read_text(encoding="utf-8")


def main() -> None:
    transcript = read(TRANSCRIPT).lower()
    for phrase in (
        "speak lord",
        "those who honor me",
        "obedience is better than sacrifice",
        "god looks at the heart",
        "goliath",
        "jonathan",
        "strengthened himself in the lord",
    ):
        require(phrase in transcript, f"lipsește ancora Poonen: {phrase}")

    source_counts: dict[int, int] = {}
    total_verses = 0
    for chapter in range(1, 32):
        data = json.loads(read(DATA / f"1SA.{chapter}.json"))
        require(data.get("translation") == "BE", f"1SA.{chapter} nu este Biblia Emanus")
        require(data.get("bookId") == "1SA", f"1SA.{chapter} are bookId greșit")
        require(data.get("chapter") == chapter, f"1SA.{chapter} declară alt capitol")
        verses = data.get("verses")
        require(isinstance(verses, list) and verses, f"1SA.{chapter} nu are versete")
        for index, verse in enumerate(verses, start=1):
            require(verse.get("number") == index, f"1SA.{chapter}:{index} numerotare discontinuă")
            require(isinstance(verse.get("text"), str) and verse["text"].strip(), f"1SA.{chapter}:{index} text gol")
        source_counts[chapter] = len(verses)
        total_verses += len(verses)

    combined = "\n".join(read(path) for path in CHAPTER_FILES)
    total_units = 0
    for chapter in range(1, 32):
        require(f"export const SAMUEL1_{chapter}" in combined, f"lipsește explicația capitolului {chapter}")
        require(f"status: SAMUEL1_STATUSES[{chapter}]" in combined, f"capitolul {chapter} nu este în registrul editorial")
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

    publication = read(BIBLE / "samuel1Publication.ts")
    book = read(BIBLE / "samuel1.ts")
    rules = read(ROOT / "docs" / "biblia-explicata" / "1-SAMUEL-SOURCE-RULES.md")
    require("length: 31" in publication, "registrul nu generează 31 de stări")
    require("chapters: [" in book and "SAMUEL1_31" in book, "cartea nu conține toate capitolele")
    require("Poonen" in rules and "WLC-OSHB" in rules, "regula surselor este incompletă")
    require("nu justifică sinuciderea" in combined, "lipsește protecția din capitolul 31")
    require("nu autorizează contactarea morților" in combined, "lipsește protecția din capitolul 28")
    require(total_verses == 810, f"total versete {total_verses}, așteptat 810")
    require(total_units == 60, f"total unități {total_units}, așteptat 60")

    print(f"1 Samuel OK: 31 capitole, {total_verses} versete Biblia Emanus, {total_units} unități, toate in_review.")


if __name__ == "__main__":
    main()
