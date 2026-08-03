#!/usr/bin/env python3
"""Poarta structurala si editoriala pentru volumele Luca deja scrise."""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BIBLE = ROOT / "packages" / "shared" / "src" / "bible"
DATA = ROOT / "docs" / "data"
EXPECTED_RANGES = {
    1: [(1, 4), (5, 25), (26, 38), (39, 56), (57, 66), (67, 80)],
    2: [(1, 7), (8, 20), (21, 38), (39, 40), (41, 52)],
    3: [(1, 6), (7, 14), (15, 20), (21, 22), (23, 38)],
    4: [(1, 13), (14, 19), (20, 30), (31, 37), (38, 44)],
    5: [(1, 11), (12, 16), (17, 26), (27, 32), (33, 39)],
}
REQUIRED_GUARDS = {
    "luca4.ts": [
        "ajutorului medical",
        "nu ne autorizează să diagnosticăm de la distanță",
        "nu ne dă dreptul să promitem fiecărui om o vindecare imediată",
    ],
    "luca5.ts": [
        "nu promite că fiecare boală va dispărea imediat",
        "nu ne permite să diagnosticăm astfel suferința altuia",
    ],
}


def fail(message: str) -> None:
    safe = message.replace("%", "%25").replace("\r", "%0D").replace("\n", "%0A")
    print(f"::error title=Poarta Luca::{safe}")


def chapter_block(path: Path, marker: str) -> str:
    content = path.read_text(encoding="utf-8")
    start = content.find(marker)
    if start < 0:
        return ""
    return content[start:]


def main() -> int:
    errors: list[str] = []
    index = (BIBLE / "index.ts").read_text(encoding="utf-8")
    helper = (BIBLE / "lucaHelpers.ts").read_text(encoding="utf-8")
    publication = (BIBLE / "lucaPublication.ts").read_text(encoding="utf-8")
    import_config = json.loads((DATA / "luca-rccv-import.json").read_text(encoding="utf-8"))
    source_manifest = json.loads((DATA / "luca-poonen-source.json").read_text(encoding="utf-8"))

    files = {
        1: BIBLE / "luca.ts",
        2: BIBLE / "luca2.ts",
        3: BIBLE / "luca3.ts",
        4: BIBLE / "luca4.ts",
        5: BIBLE / "luca5.ts",
    }
    markers = {
        1: "const LUCA_1 = lucaChapter",
        2: "export const LUCA_2 = lucaChapter",
        3: "export const LUCA_3 = lucaChapter",
        4: "export const LUCA_4 = lucaChapter",
        5: "export const LUCA_5 = lucaChapter",
    }
    total_units = 0
    for number, path in files.items():
        if not path.exists():
            errors.append(f"Luca {number}: fisier lipsa")
            continue
        block = chapter_block(path, markers[number])
        if not block:
            errors.append(f"Luca {number}: declaratia capitolului lipseste")
            continue
        ranges = [(int(a), int(b)) for a, b in re.findall(r"verses:\s*\[(\d+),\s*(\d+)\]", block)]
        total_units += len(ranges)
        if ranges != EXPECTED_RANGES[number]:
            errors.append(f"Luca {number}: intervale {ranges}; se asteptau {EXPECTED_RANGES[number]}")
        for field in ("title", "summary", "literaryContext", "historicalContext", "units", "prayer"):
            if not re.search(rf"\b{field}\s*:", block):
                errors.append(f"Luca {number}: lipseste {field}")

    statuses = {
        int(number): status
        for number, status in re.findall(r'^\s*(\d+):\s*"(draft|in_review|published)",', publication, re.M)
    }
    if len(statuses) != 24 or any(status != "in_review" for status in statuses.values()):
        errors.append("lucaPublication.ts: toate cele 24 de capitole trebuie sa ramana in_review")

    if import_config.get("bookId") != "LUK" or len(import_config.get("verseCounts", [])) != 24:
        errors.append("luca-rccv-import.json: configuratie incompleta")
    if sum(import_config.get("verseCounts", [])) != 1151:
        errors.append("luca-rccv-import.json: totalul trebuie sa fie 1151 de versete")
    if len(source_manifest.get("episodes", [])) != 24:
        errors.append("luca-poonen-source.json: trebuie sa contina 24 de episoade")
    if source_manifest.get("publicationStatus") != "in_review":
        errors.append("luca-poonen-source.json: starea trebuie sa fie in_review")

    if "status: lucaStatus(input.number)" not in helper:
        errors.append("lucaHelpers.ts: starea nu vine din registrul editorial")
    if 'import { LUCA as LUCA_BASE } from "./luca.js"' not in index:
        errors.append("bible/index.ts: baza Luca nu este importata")
    for number in range(2, 6):
        if f'import {{ LUCA_{number} }} from "./luca{number}.js"' not in index:
            errors.append(f"bible/index.ts: Luca {number} nu este importat")
    luca_block_match = re.search(
        r"export const LUCA: BibleBook = \{.*?chapters:\s*\[(.*?)\]\s*,?\n\}",
        index,
        flags=re.S,
    )
    if not luca_block_match:
        errors.append("bible/index.ts: blocul de asamblare Luca lipseste")
    else:
        block = luca_block_match.group(1)
        assembled = [int(number) for number in re.findall(r"\bLUCA_(\d+)\b", block)]
        if assembled != [2, 3, 4, 5]:
            errors.append(f"bible/index.ts: ordinea capitolelor Luca este {assembled}")
        if "...LUCA_BASE.chapters" not in block:
            errors.append("bible/index.ts: Luca 1 nu vine din LUCA_BASE")
    if not re.search(r"BIBLE_BOOKS:\s*BibleBook\[\]\s*=\s*\[[^\]]*\bLUCA\b", index):
        errors.append("bible/index.ts: Luca nu este conectat in catalog")

    lowered = "\n".join(path.read_text(encoding="utf-8").lower() for path in files.values())
    for phrase in ("explicatie originala emanus", "transcriere integrala", "status: \"published\""):
        if phrase in lowered:
            errors.append(f"Luca: formulare interzisa detectata: {phrase}")

    for filename, phrases in REQUIRED_GUARDS.items():
        text = (BIBLE / filename).read_text(encoding="utf-8").lower()
        for phrase in phrases:
            if phrase.lower() not in text:
                errors.append(f"{filename}: lipseste protectia editoriala {phrase!r}")

    print(
        f"Poarta Luca: 5 capitole active, {total_units} unitati, "
        "1151 versete RCCV configurate, 24 episoade sursa."
    )
    if errors:
        for error in errors:
            print(f"- {error}")
            fail(error)
        return 1
    print("Verificarea structurala si editoriala Luca a trecut.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
