#!/usr/bin/env python3
"""Poarta structurala si editoriala pentru Evanghelia dupa Luca."""

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
    6: [(1, 11), (12, 19), (20, 26), (27, 38), (39, 49)],
    7: [(1, 10), (11, 17), (18, 35), (36, 50)],
    8: [(1, 15), (16, 25), (26, 39), (40, 48), (49, 56)],
    9: [(1, 17), (18, 27), (28, 36), (37, 48), (49, 62)],
    10: [(1, 16), (17, 24), (25, 37), (38, 42)],
    11: [(1, 4), (5, 13), (14, 26), (27, 36), (37, 54)],
    12: [(1, 7), (8, 13), (14, 21), (22, 30), (31, 41), (42, 59)],
    13: [(1, 9), (10, 17), (18, 30), (31, 35)],
    14: [(1, 6), (7, 14), (15, 24), (25, 27), (28, 35)],
    15: [(1, 10), (11, 24), (25, 32)],
    16: [(1, 12), (13, 18), (19, 31)],
    17: [(1, 10), (11, 19), (20, 25), (26, 37)],
    18: [(1, 8), (9, 14), (15, 23), (24, 30), (31, 43)],
    19: [(1, 10), (11, 27), (28, 40), (41, 48)],
    20: [(1, 8), (9, 18), (19, 26), (27, 40), (41, 47)],
    21: [(1, 4), (5, 19), (20, 28), (29, 38)],
    22: [(1, 20), (21, 30), (31, 38), (39, 46), (47, 53), (54, 62), (63, 71)],
    23: [(1, 25), (26, 43), (44, 46), (47, 56)],
    24: [(1, 12), (13, 35), (36, 49), (50, 53)],
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
    "luca6.ts": [
        "o victimă poate pune limite",
        "dragostea nu cere întoarcerea într-un mediu nesigur",
        "nu interzice discernământul sau protejarea celui vulnerabil",
    ],
    "luca7.ts": [
        "nu devine o promisiune că fiecare cerere medicală va primi imediat același răspuns",
        "nu justifică oprirea tratamentului",
    ],
    "luca8.ts": [
        "nu ne permite să numim orice boală mintală",
        "nu promite că orice boală va fi vindecată imediat",
        "nu justifică oprirea tratamentului",
    ],
    "luca9.ts": [
        "o victimă poate căuta protecție",
        "nu facem diagnostice spirituale de la distanță",
        "nu oprim tratamentul",
    ],
    "luca11.ts": [
        "nu ne autorizează să etichetăm orice boală",
        "nu înlocuim evaluarea medicală ori psihologică",
    ],
    "luca12.ts": [
        "anxietate clinică",
        "nu trebuie folosit ca să rușineze",
    ],
    "luca13.ts": [
        "nu ne autorizează să atribuim automat bolile fizice",
        "nu înlocuim medicina",
    ],
    "luca14.ts": [
        "nu devine o promisiune că orice boală va dispărea imediat",
        "omul bolnav nu trebuie acuzat",
    ],
    "luca15.ts": [
        "limitele necesare",
        "acces nelimitat la victimă",
    ],
    "luca16.ts": [
        "nu trebuie folosit ca să oblige o victimă să rămână într-un pericol imediat",
        "separarea pentru siguranță",
    ],
    "luca17.ts": [
        "o victimă poate ierta înaintea lui dumnezeu",
        "nu justifică oprirea tratamentului",
    ],
    "luca18.ts": [
        "nu cere unei victime să rămână singură",
        "nu justifică oprirea tratamentului",
    ],
    "luca20.ts": [
        "protejarea victimei",
    ],
    "luca21.ts": [
        "nu trebuie folosit pentru a justifica violența",
        "credința nu te obligă să rămâi într-un pericol evitabil",
    ],
    "luca22.ts": [
        "nu interzice fuga, protejarea copilului, chemarea poliției",
        "omul în criză suicidară are nevoie imediată",
    ],
    "luca23.ts": [
        "nu obligă victima să restaureze imediat încrederea",
        "omul aflat în pericol să-și facă rău are nevoie de ajutor imediat",
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
    source_meta = (BIBLE / "lucaSource.ts").read_text(encoding="utf-8")
    import_config = json.loads((DATA / "luca-rccv-import.json").read_text(encoding="utf-8"))
    source_manifest = json.loads((DATA / "luca-poonen-source.json").read_text(encoding="utf-8"))

    files = {1: BIBLE / "luca.ts"}
    files.update({number: BIBLE / f"luca{number}.ts" for number in range(2, 25)})
    markers = {1: "const LUCA_1 = lucaChapter"}
    markers.update({number: f"export const LUCA_{number} = lucaChapter" for number in range(2, 25)})

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
    youtube = source_manifest.get("youtubePlaylist", {})
    if youtube.get("id") != "PL3myepmxcTQSnSKfFkN-4cNo4kl9B0ILf" or youtube.get("clipCount") != 96:
        errors.append("luca-poonen-source.json: indexul YouTube trebuie sa declare cele 96 de pasaje")
    if source_manifest.get("publicationStatus") != "in_review":
        errors.append("luca-poonen-source.json: starea trebuie sa fie in_review")

    if import_config.get("sourceSha256") not in source_meta:
        errors.append("lucaSource.ts: SHA-ul RCCV nu corespunde configuratiei de import")
    if import_config.get("sourceUrl", "").replace("raw.githubusercontent.com", "github.com").replace(
        "/seven1m/open-bibles/", "/seven1m/open-bibles/blob/"
    ) not in source_meta:
        errors.append("lucaSource.ts: sursa RCCV nu este fixata la commitul configurat")
    if "pe baza studiilor verse-by-verse și a transcrierilor Zac Poonen" not in source_meta:
        errors.append("lucaSource.ts: politica editoriala nu declara corect sursa explicatiilor")
    if "fără interpretări doctrinare inventate de Emanus" not in source_meta:
        errors.append("lucaSource.ts: lipseste interdictia doctrinei inventate")

    if "status: lucaStatus(input.number)" not in helper:
        errors.append("lucaHelpers.ts: starea nu vine din registrul editorial")
    if 'import { LUCA as LUCA_BASE } from "./luca.js"' not in index:
        errors.append("bible/index.ts: baza Luca nu este importata")
    for number in range(2, 25):
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
        expected = list(range(2, 25))
        if assembled != expected:
            errors.append(f"bible/index.ts: ordinea capitolelor Luca este {assembled}; se astepta {expected}")
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
        f"Poarta Luca: 24 capitole active, {total_units} unitati, "
        "1151 versete RCCV configurate, 24 episoade CFC si 96 pasaje YouTube indexate."
    )
    if total_units != 112:
        errors.append(f"Luca: total neasteptat de unitati: {total_units}; se asteptau 112")
    if errors:
        for error in errors:
            print(f"- {error}")
            fail(error)
        return 1
    print("Verificarea structurala si editoriala Luca a trecut.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
