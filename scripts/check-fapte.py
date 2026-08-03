#!/usr/bin/env python3
"""Poarta structurală și editorială pentru Faptele Apostolilor."""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BIBLE = ROOT / "packages" / "shared" / "src" / "bible"
DATA = ROOT / "docs" / "data"

EXPECTED_RANGES = {
    1: [(1, 5), (6, 11), (12, 14), (15, 26)],
    2: [(1, 13), (14, 21), (22, 36), (37, 47)],
    3: [(1, 10), (11, 16), (17, 26)],
    4: [(1, 12), (13, 22), (23, 31), (32, 37)],
    5: [(1, 11), (12, 16), (17, 32), (33, 42)],
    6: [(1, 7), (8, 15)],
    7: [(1, 8), (9, 16), (17, 29), (30, 43), (44, 53), (54, 60)],
    8: [(1, 8), (9, 25), (26, 40)],
    9: [(1, 9), (10, 19), (20, 31), (32, 43)],
    10: [(1, 8), (9, 23), (24, 33), (34, 48)],
    11: [(1, 18), (19, 26), (27, 30)],
    12: [(1, 5), (6, 19), (20, 25)],
    13: [(1, 12), (13, 25), (26, 41), (42, 52)],
    14: [(1, 7), (8, 18), (19, 28)],
    15: [(1, 11), (12, 21), (22, 35), (36, 41)],
    16: [(1, 10), (11, 15), (16, 24), (25, 40)],
    17: [(1, 9), (10, 15), (16, 34)],
    18: [(1, 11), (12, 17), (18, 28)],
    19: [(1, 10), (11, 20), (21, 41)],
    20: [(1, 12), (13, 24), (25, 38)],
    21: [(1, 16), (17, 26), (27, 40)],
    22: [(1, 11), (12, 21), (22, 30)],
    23: [(1, 11), (12, 22), (23, 35)],
    24: [(1, 9), (10, 21), (22, 27)],
    25: [(1, 12), (13, 22), (23, 27)],
    26: [(1, 11), (12, 23), (24, 32)],
    27: [(1, 12), (13, 26), (27, 44)],
    28: [(1, 10), (11, 22), (23, 31)],
}

REQUIRED_GUARDS = [
    "criză suicidară are nevoie imediată de protecție",
    "nu ne dă dreptul să promitem tuturor o vindecare imediată",
    "oprirea tratamentului medical",
    "nu cere însă să rămâi într-un pericol evitabil sau într-un abuz",
    "nu permite manipularea financiară",
    "poate merge împreună cu medicină",
    "nu cere victimei să refuze protecția",
    "iertarea nu declară violența acceptabilă și nu oprește dreptatea",
    "nu ne dau dreptul să promitem fiecărui bolnav o vindecare imediată",
    "nu justifică oprirea tratamentului",
    "omul aflat în pericol suicidar are nevoie imediată",
    "iertarea nu anulează dreptul de a cere răspundere legală",
    "nu ne autorizează să etichetăm bolile mintale",
    "credința nu obligă victima să rămână",
]


def fail(message: str) -> None:
    safe = message.replace("%", "%25").replace("\r", "%0D").replace("\n", "%0A")
    print(f"::error title=Poarta Fapte::{safe}")


def chapter_block(path: Path, marker: str) -> str:
    content = path.read_text(encoding="utf-8")
    start = content.find(marker)
    return "" if start < 0 else content[start:]


def main() -> int:
    errors: list[str] = []
    index = (BIBLE / "index.ts").read_text(encoding="utf-8")
    helper = (BIBLE / "fapteHelpers.ts").read_text(encoding="utf-8")
    publication = (BIBLE / "faptePublication.ts").read_text(encoding="utf-8")
    source_meta = (BIBLE / "fapteSource.ts").read_text(encoding="utf-8")
    book = (BIBLE / "fapte.ts").read_text(encoding="utf-8")
    import_config = json.loads((DATA / "fapte-rccv-import.json").read_text(encoding="utf-8"))
    source_manifest = json.loads((DATA / "fapte-poonen-source.json").read_text(encoding="utf-8"))

    files = {1: BIBLE / "fapte.ts"}
    files.update({number: BIBLE / f"fapte{number}.ts" for number in range(2, 29)})
    markers = {1: "const FAPTE_1 = fapteChapter"}
    markers.update({number: f"export const FAPTE_{number} = fapteChapter" for number in range(2, 29)})

    total_units = 0
    chapter_contents: list[str] = []
    for number, path in files.items():
        if not path.exists():
            errors.append(f"Fapte {number}: fișier lipsă")
            continue
        content = path.read_text(encoding="utf-8")
        chapter_contents.append(content)
        block = chapter_block(path, markers[number])
        if not block:
            errors.append(f"Fapte {number}: declarația capitolului lipsește")
            continue
        ranges = [(int(a), int(b)) for a, b in re.findall(r"verses:\s*\[(\d+),\s*(\d+)\]", block)]
        total_units += len(ranges)
        if ranges != EXPECTED_RANGES[number]:
            errors.append(f"Fapte {number}: intervale {ranges}; se așteptau {EXPECTED_RANGES[number]}")
        for field in ("title", "summary", "literaryContext", "historicalContext", "units", "prayer"):
            if not re.search(rf"\b{field}\s*:", block):
                errors.append(f"Fapte {number}: lipsește {field}")

    statuses = {
        int(number): status
        for number, status in re.findall(r'^\s*(\d+):\s*"(draft|in_review|published)",', publication, re.M)
    }
    if len(statuses) != 28 or any(status != "in_review" for status in statuses.values()):
        errors.append("faptePublication.ts: toate cele 28 de capitole trebuie să rămână in_review")

    if import_config.get("bookId") != "ACT" or len(import_config.get("verseCounts", [])) != 28:
        errors.append("fapte-rccv-import.json: configurație incompletă")
    if sum(import_config.get("verseCounts", [])) != 1007:
        errors.append("fapte-rccv-import.json: totalul trebuie să fie 1007 versete")
    if len(source_manifest.get("episodes", [])) != 14:
        errors.append("fapte-poonen-source.json: trebuie să conțină 14 episoade")
    if source_manifest.get("publicationStatus") != "in_review":
        errors.append("fapte-poonen-source.json: starea trebuie să fie in_review")

    if import_config.get("sourceSha256") not in source_meta:
        errors.append("fapteSource.ts: SHA-ul RCCV nu corespunde configurației de import")
    if "https://www.cfcindia.com/verse-by-verse/Acts" not in source_meta:
        errors.append("fapteSource.ts: pagina oficială CFC lipsește")
    if "pe baza studiilor verse-by-verse și a transcrierilor Zac Poonen" not in source_meta:
        errors.append("fapteSource.ts: politica editorială nu declară corect sursa explicațiilor")
    if "fără interpretări doctrinare inventate de Emanus" not in source_meta:
        errors.append("fapteSource.ts: lipsește interdicția doctrinei inventate")

    if "status: fapteStatus(input.number)" not in helper:
        errors.append("fapteHelpers.ts: starea nu vine din registrul editorial")
    if 'import { FAPTE } from "./fapte.js"' not in index:
        errors.append("bible/index.ts: Fapte nu este importat")
    if not re.search(r"BIBLE_BOOKS:\s*BibleBook\[\]\s*=\s*\[[^\]]*\bFAPTE\b", index):
        errors.append("bible/index.ts: Fapte nu este conectat în catalog")

    for number in range(2, 29):
        if f'import {{ FAPTE_{number} }} from "./fapte{number}.js"' not in book:
            errors.append(f"fapte.ts: importul FAPTE_{number} lipsește")

    book_match = re.search(
        r"export const FAPTE: BibleBook = \{.*?chapters:\s*\[(.*?)\]\s*,?\n\}",
        book,
        re.S,
    )
    if not book_match:
        errors.append("fapte.ts: cartea Fapte nu este asamblată")
    else:
        assembled = [int(number) for number in re.findall(r"\bFAPTE_(\d+)\b", book_match.group(1))]
        expected = list(range(1, 29))
        if assembled != expected:
            errors.append(f"fapte.ts: ordinea capitolelor este {assembled}; se aștepta {expected}")

    shared_package = (ROOT / "packages" / "shared" / "package.json").read_text(encoding="utf-8")
    if "fapte-rccv-import.json" not in shared_package:
        errors.append("packages/shared/package.json: textul RCCV Fapte nu este materializat la build")

    for workflow in ("research-fapte.yml", "finalize-fapte.yml"):
        if (ROOT / ".github" / "workflows" / workflow).exists():
            errors.append(f"workflow-ul temporar {workflow} trebuie eliminat")

    lowered = "\n".join(chapter_contents).lower()
    for phrase in ("explicație originală emanus", "transcriere integrală", 'status: "published"'):
        if phrase in lowered:
            errors.append(f"Fapte: formulare interzisă detectată: {phrase}")
    for phrase in REQUIRED_GUARDS:
        if phrase.lower() not in lowered:
            errors.append(f"Fapte: lipsește protecția editorială {phrase!r}")

    print(
        f"Poarta Fapte: 28 capitole active, {total_units} unități, "
        "1007 versete RCCV configurate și 14 episoade CFC."
    )
    if total_units != 95:
        errors.append(f"Fapte: total neașteptat de unități: {total_units}; se așteptau 95")

    if errors:
        for error in errors:
            print(f"- {error}")
            fail(error)
        return 1

    print("Verificarea structurală și editorială Fapte a trecut.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
