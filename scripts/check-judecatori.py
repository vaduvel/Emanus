#!/usr/bin/env python3
"""Poarta determinista pentru valul Biblia explicata — Judecatori."""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BIBLE = ROOT / "packages" / "shared" / "src" / "bible"
DATA = BIBLE / "data" / "judecatori"
EXPECTED_CHAPTERS = 21
EXPECTED_VERSES = 618
EXPECTED_UNITS = 78
UNIT_RE = re.compile(r"verses:\s*\[(\d+),\s*(\d+)\]")


def require(condition: bool, message: str) -> None:
    if not condition:
        raise SystemExit(f"[Judecatori] EROARE: {message}")


def read(path: Path) -> str:
    require(path.exists(), f"lipseste fisierul {path.relative_to(ROOT)}")
    return path.read_text(encoding="utf-8")


def main() -> None:
    total_verses = 0
    total_units = 0

    for chapter in range(1, EXPECTED_CHAPTERS + 1):
        source_path = DATA / f"JDG.{chapter}.json"
        source = json.loads(read(source_path))
        require(source.get("translation") == "BE", f"JDG.{chapter} nu foloseste Biblia Emanus")
        require(source.get("bookId") == "JDG", f"JDG.{chapter} are bookId gresit")
        require(source.get("chapter") == chapter, f"JDG.{chapter} declara alt capitol")

        verses = source.get("verses")
        require(isinstance(verses, list) and verses, f"JDG.{chapter} nu are versete")
        for index, verse in enumerate(verses, start=1):
            require(verse.get("number") == index, f"JDG.{chapter}:{index} numerotare discontinua")
            require(isinstance(verse.get("text"), str) and verse["text"].strip(), f"JDG.{chapter}:{index} text gol")
        total_verses += len(verses)

        chapter_path = BIBLE / f"judecatori{chapter}.ts"
        content = read(chapter_path)
        require(f"number: {chapter}," in content, f"judecatori{chapter}.ts nu declara numarul corect")
        require(
            f"status: judecatoriStatus({chapter})" in content,
            f"judecatori{chapter}.ts nu foloseste registrul editorial",
        )
        for field in ("title:", "summary:", "literaryContext:", "historicalContext:", "units:", "prayer:"):
            require(field in content, f"judecatori{chapter}.ts nu contine {field}")

        ranges = [(int(start), int(end)) for start, end in UNIT_RE.findall(content)]
        require(ranges, f"judecatori{chapter}.ts nu are unitati")
        expected_next = 1
        for start, end in ranges:
            require(start == expected_next, f"Judecatori {chapter}: se astepta unitate de la {expected_next}, gasit {start}")
            require(end >= start, f"Judecatori {chapter}: interval invers {start}-{end}")
            expected_next = end + 1
        require(
            expected_next == len(verses) + 1,
            f"Judecatori {chapter}: acoperirea se opreste la {expected_next - 1} din {len(verses)}",
        )
        total_units += len(ranges)

    require(total_verses == EXPECTED_VERSES, f"total versete {total_verses}, asteptat {EXPECTED_VERSES}")
    require(total_units == EXPECTED_UNITS, f"total unitati {total_units}, asteptat {EXPECTED_UNITS}")

    text_registry = read(BIBLE / "judecatoriText.ts")
    publication = read(BIBLE / "judecatoriPublication.ts")
    book = read(BIBLE / "judecatori.ts")
    catalog = read(BIBLE / "index.ts")

    for chapter in range(1, EXPECTED_CHAPTERS + 1):
        require(f"JDG.{chapter}.json" in text_registry, f"sursa JDG.{chapter}.json nu este cablata")
        require(
            re.search(rf"\b{chapter}:\s*\"in_review\"", publication) is not None,
            f"capitolul {chapter} nu este in_review",
        )
        require(f"JUDECATORI_{chapter}" in book, f"capitolul {chapter} lipseste din carte")

    require('import { JUDECATORI } from "./judecatori.js"' in catalog, "Judecatori nu este importata in catalog")
    require("IOSUA,\n  JUDECATORI,\n  MATEI" in catalog, "Judecatori nu este asezata dupa Iosua")

    safety_checks = {
        11: ("nu spune că Dumnezeu a cerut", "sacrific"),
        16: ("nu este model pentru sinucidere", "ajutor"),
        19: ("nu este vina ta", "violență sexuală"),
        21: ("Consimțământul", "răpirea"),
    }
    for chapter, phrases in safety_checks.items():
        content = read(BIBLE / f"judecatori{chapter}.ts")
        for phrase in phrases:
            require(phrase.lower() in content.lower(), f"Judecatori {chapter} nu contine protectia: {phrase}")

    print(
        f"Judecatori OK: {EXPECTED_CHAPTERS} capitole, {total_verses} versete Biblia Emanus, "
        f"{total_units} unitati explicate, toate in_review."
    )


if __name__ == "__main__":
    main()
