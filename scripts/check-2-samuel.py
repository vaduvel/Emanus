#!/usr/bin/env python3
"""Poarta deterministă pentru Biblia explicată — 2 Samuel."""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BIBLE = ROOT / "packages" / "shared" / "src" / "bible"
DATA = BIBLE / "data" / "2-samuel"
TRANSCRIPT = ROOT / ".research" / "poonen-through-the-bible-OT" / "transcripts" / "samuel-2.txt"
CHAPTER_FILES = [
    BIBLE / "samuel2_1_4.ts",
    BIBLE / "samuel2_5_8.ts",
    BIBLE / "samuel2_9_12.ts",
    BIBLE / "samuel2_13_16.ts",
    BIBLE / "samuel2_17_20.ts",
    BIBLE / "samuel2_21_24.ts",
]
PASSAGE_RE = re.compile(r"samuel2Passage\((\d+),\s*(\d+),\s*(\d+)\)")


def require(condition: bool, message: str) -> None:
    if not condition:
        raise SystemExit(f"[2 Samuel] EROARE: {message}")


def read(path: Path) -> str:
    require(path.exists(), f"lipsește {path.relative_to(ROOT)}")
    return path.read_text(encoding="utf-8")


def main() -> None:
    transcript = read(TRANSCRIPT).lower()
    for phrase in (
        "love your enemies",
        "shall i go",
        "bullock cart",
        "concerned about god's house",
        "dead dog",
        "you are the man",
        "absalom stole the hearts",
        "i will not offer to the lord",
    ):
        require(phrase in transcript, f"lipsește ancora Poonen: {phrase}")

    source_counts: dict[int, int] = {}
    total_verses = 0
    for chapter in range(1, 25):
        data = json.loads(read(DATA / f"2SA.{chapter}.json"))
        require(data.get("translation") == "BE", f"2SA.{chapter} nu este Biblia Emanus")
        require(data.get("bookId") == "2SA", f"2SA.{chapter} are bookId greșit")
        require(data.get("chapter") == chapter, f"2SA.{chapter} declară alt capitol")
        verses = data.get("verses")
        require(isinstance(verses, list) and verses, f"2SA.{chapter} nu are versete")
        for index, verse in enumerate(verses, start=1):
            require(verse.get("number") == index, f"2SA.{chapter}:{index} numerotare discontinuă")
            require(isinstance(verse.get("text"), str) and verse["text"].strip(), f"2SA.{chapter}:{index} text gol")
        source_counts[chapter] = len(verses)
        total_verses += len(verses)

    combined = "\n".join(read(path) for path in CHAPTER_FILES)
    total_units = 0
    for chapter in range(1, 25):
        require(f"export const SAMUEL2_{chapter}" in combined, f"lipsește explicația capitolului {chapter}")
        require(f"status: SAMUEL2_STATUSES[{chapter}]" in combined, f"capitolul {chapter} nu este în registrul editorial")
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

    publication = read(BIBLE / "samuel2Publication.ts")
    book = read(BIBLE / "samuel2.ts")
    rules = read(ROOT / "docs" / "biblia-explicata" / "2-SAMUEL-SOURCE-RULES.md")
    require("length: 24" in publication, "registrul nu generează 24 de stări")
    require("SAMUEL2_24" in book and "chapters: [" in book, "cartea nu conține toate capitolele")
    require("Poonen" in rules and "WLC-OSHB" in rules, "regula surselor este incompletă")

    safety_phrases = (
        "nu o învinovățește pe femeie",
        "refuzul explicit",
        "nu oferă sinuciderea drept ieșire legitimă",
        "nu autorizează uciderea urmașilor",
        "nu autorizează cuceriri religioase moderne",
    )
    for phrase in safety_phrases:
        require(phrase in combined.lower(), f"lipsește protecția editorială: {phrase}")

    require(total_verses == 695, f"total versete {total_verses}, așteptat 695")
    require(total_units == 57, f"total unități {total_units}, așteptat 57")
    print(f"2 Samuel OK: 24 capitole, {total_verses} versete Biblia Emanus, {total_units} unități, toate in_review.")


if __name__ == "__main__":
    main()
