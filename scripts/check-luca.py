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

    files = {1: BIBLE / "luca.ts", 2: BIBLE / "luca2.ts"}
    markers = {1: "const LUCA_1 = lucaChapter", 2: "export const LUCA_2 = lucaChapter"}
    total_units = 0
    for number, path in files.items():
        if not path.exists():
            errors.append(f"Luca {number}: fisier lipsa")
            continue
        block = chapter_block(path, markers[number])
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
    if 'import { LUCA_2 } from "./luca2.js"' not in index:
        errors.append("bible/index.ts: Luca 2 nu este importat")
    if not re.search(r"BIBLE_BOOKS:\s*BibleBook\[\]\s*=\s*\[[^\]]*\bLUCA\b", index):
        errors.append("bible/index.ts: Luca nu este conectat in catalog")

    lowered = "\n".join(path.read_text(encoding="utf-8").lower() for path in files.values())
    for phrase in ("explicatie originala emanus", "transcriere integrala", "status: \"published\""):
        if phrase in lowered:
            errors.append(f"Luca: formulare interzisa detectata: {phrase}")

    print(f"Poarta Luca: 2 capitole active, {total_units} unitati, 1151 versete RCCV configurate, 24 episoade sursa.")
    if errors:
        for error in errors:
            print(f"- {error}")
            fail(error)
        return 1
    print("Verificarea structurala si editoriala Luca a trecut.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
