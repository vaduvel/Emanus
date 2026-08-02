#!/usr/bin/env python3
"""Poarta structurală și de proveniență pentru Filimon."""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BIBLE = ROOT / "packages" / "shared" / "src" / "bible"
SOURCE = ROOT / "docs" / "data" / "filimon-poonen-source.json"


def main() -> int:
    errors: list[str] = []
    text = (BIBLE / "filimon.ts").read_text(encoding="utf-8")
    verse_text = (BIBLE / "filimonText.ts").read_text(encoding="utf-8")
    helper = (BIBLE / "filimonHelpers.ts").read_text(encoding="utf-8")
    publication = (BIBLE / "filimonPublication.ts").read_text(encoding="utf-8")
    index = (BIBLE / "index.ts").read_text(encoding="utf-8")

    ranges = [(int(a), int(b)) for a, b in re.findall(r"verses:\s*\[(\d+),\s*(\d+)\]", text)]
    if ranges != [(1, 3), (4, 7), (8, 16), (17, 22), (23, 25)]:
        errors.append(f"Filimon: intervale neașteptate {ranges}")
    if '1: "in_review"' not in publication:
        errors.append("Filimon 1 trebuie să rămână in_review")
    if "status: filimonStatus(1)" not in helper:
        errors.append("Starea Filimon nu este citită din registrul editorial")
    if "filimonPassage(from, to)" not in helper:
        errors.append("Textul biblic Filimon nu este separat de explicație")

    verses = re.findall(r'^\s*"(.*)",\s*$', verse_text, re.MULTILINE)
    if len(verses) != 26 or verses[0] != "":
        errors.append(f"filimonText.ts trebuie să aibă indice zero + 25 versete; găsite {len(verses)}")
    if "teaching:" in verse_text or "forYourHeart:" in verse_text:
        errors.append("Explicația a intrat în stratul textului biblic")
    if not re.search(r"BIBLE_BOOKS:\s*BibleBook\[\]\s*=\s*\[[^\]]*\bFILIMON\b", index):
        errors.append("Filimon lipsește din BIBLE_BOOKS")

    try:
        source = json.loads(SOURCE.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        errors.append(f"Sursa Filimon nu poate fi citită: {exc}")
        source = {}
    if source.get("verseCount") != 25:
        errors.append("Manifestul Filimon nu confirmă 25 de versete")
    poonen = source.get("poonen", {})
    if "cfcindia.com/verse-by-verse" not in str(poonen.get("officialSeriesUrl", "")):
        errors.append("Lipsește seria oficială Poonen")
    if "word4alltime.com" not in str(poonen.get("supportingTranscriptUrl", "")):
        errors.append("Lipsește transcrierea Poonen folosită")
    if list(ROOT.glob(".research/filimon-poonen/**/*.txt")):
        errors.append("Transcrierile locale nu trebuie versionate")

    print(f"Poarta Filimon: {len(ranges)} unități, {max(len(verses) - 1, 0)} versete.")
    if errors:
        for error in errors:
            print(f"::error title=Poarta Filimon::{error}")
        return 1
    print("Verificarea Filimon a trecut.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
