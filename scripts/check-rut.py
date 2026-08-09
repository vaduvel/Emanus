#!/usr/bin/env python3
"""Poarta deterministă pentru valul Biblia explicată — Rut."""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BIBLE = ROOT / "packages" / "shared" / "src" / "bible"
DATA = BIBLE / "data" / "rut"
TRANSCRIPT = ROOT / ".research" / "poonen-through-the-bible-OT" / "transcripts" / "judges-ruth.txt"
EXPECTED_COUNTS = {1: 22, 2: 23, 3: 18, 4: 22}
PASSAGE_RE = re.compile(r"rutPassage\((\d+),\s*(\d+),\s*(\d+)\)")


def require(condition: bool, message: str) -> None:
    if not condition:
        raise SystemExit(f"[Rut] EROARE: {message}")


def read(path: Path) -> str:
    require(path.exists(), f"lipsește {path.relative_to(ROOT)}")
    return path.read_text(encoding="utf-8")


def main() -> None:
    transcript = read(TRANSCRIPT)
    for phrase in (
        "now the book of Ruth",
        "your God is my God",
        "she went looking for God",
        "Boaz was such a kind man",
        "those who honor me",
    ):
        require(phrase.lower() in transcript.lower(), f"transcriptul nu conține ancora: {phrase}")

    total_verses = 0
    total_units = 0
    total_words = 0

    for chapter, expected_count in EXPECTED_COUNTS.items():
        source = json.loads(read(DATA / f"RUT.{chapter}.json"))
        require(source.get("translation") == "BE", f"RUT.{chapter} nu este Biblia Emanus")
        require(source.get("bookId") == "RUT", f"RUT.{chapter} are bookId greșit")
        require(source.get("chapter") == chapter, f"RUT.{chapter} declară alt capitol")
        verses = source.get("verses")
        require(isinstance(verses, list), f"RUT.{chapter} nu are lista de versete")
        require(len(verses) == expected_count, f"RUT.{chapter} are {len(verses)} versete, așteptat {expected_count}")
        for number, verse in enumerate(verses, start=1):
            require(verse.get("number") == number, f"RUT.{chapter}:{number} numerotare discontinuă")
            require(isinstance(verse.get("text"), str) and verse["text"].strip(), f"RUT.{chapter}:{number} text gol")
        total_verses += len(verses)

        content = read(BIBLE / f"rut{chapter}.ts")
        require("Transcript Poonen:" in content, f"rut{chapter}.ts nu declară ancora transcriptului")
        require(f"number: {chapter}," in content, f"rut{chapter}.ts nu declară numărul corect")
        require(f"status: RUT_STATUSES[{chapter}]" in content, f"rut{chapter}.ts nu folosește registrul editorial")

        ranges = []
        for declared_chapter, start, end in PASSAGE_RE.findall(content):
            require(int(declared_chapter) == chapter, f"rut{chapter}.ts folosește text din alt capitol")
            ranges.append((int(start), int(end)))
        require(ranges, f"rut{chapter}.ts nu are unități")
        expected_start = 1
        for start, end in ranges:
            require(start == expected_start, f"Rut {chapter}: se aștepta începutul {expected_start}, găsit {start}")
            require(end >= start, f"Rut {chapter}: interval invers {start}-{end}")
            expected_start = end + 1
        require(expected_start == expected_count + 1, f"Rut {chapter}: acoperirea se oprește la {expected_start - 1}")
        total_units += len(ranges)

        for original in re.findall(r'original:\s*"([^"]+)"', content):
            require(any("\u0590" <= char <= "\u05ff" for char in original), f"Rut {chapter}: nota lexicală nu conține ebraică")
            total_words += 1

    publication = read(BIBLE / "rutPublication.ts")
    book = read(BIBLE / "rut.ts")
    catalog = read(BIBLE / "index.ts")
    source_rules = read(ROOT / "docs" / "biblia-explicata" / "RUT-SOURCE-RULES.md")

    for chapter in EXPECTED_COUNTS:
        require(re.search(rf"\b{chapter}:\s*\"in_review\"", publication) is not None, f"Rut {chapter} nu este in_review")
        require(f"RUT_{chapter}" in book, f"Rut {chapter} lipsește din carte")

    require('import { RUT } from "./rut.js"' in catalog, "Rut nu este importată în catalog")
    require("IOSUA,\n  RUT,\n  MATEI" in catalog, "Rut nu este așezată după Iosua")
    require("WLC-OSHB" in source_rules and "Poonen" in source_rules, "regula surselor este incompletă")
    require(total_verses == 85, f"total versete {total_verses}, așteptat 85")
    require(total_units == 12, f"total unități {total_units}, așteptat 12")
    require(total_words >= 6, f"prea puține note ebraice: {total_words}")

    print(f"Rut OK: 4 capitole, {total_verses} versete Biblia Emanus, {total_units} unități, {total_words} note ebraice.")


if __name__ == "__main__":
    main()
