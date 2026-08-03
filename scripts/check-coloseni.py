#!/usr/bin/env python3
"""Poarta structurală și editorială pentru Coloseni."""
from __future__ import annotations
import json, re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BIBLE = ROOT / "packages" / "shared" / "src" / "bible"
DATA = ROOT / "docs" / "data"
EXPECTED_RANGES = {
    1: [(1, 8), (9, 14), (15, 20), (21, 23), (24, 29)],
    2: [(1, 3), (4, 7), (8, 15), (16, 19), (20, 23)],
    3: [(1, 4), (5, 7), (8, 11), (12, 14), (15, 17), (18, 19), (20, 21), (22, 25)],
    4: [(1, 1), (2, 6), (7, 9), (10, 18)],
}
VERSE_COUNTS = [29, 23, 25, 18]
REQUIRED_GUARDS = [
    "nu obligă o victimă să rămână în abuz",
    "textul nu autorizează controlul, degradarea, violența, coerciția sexuală",
    "pasajul nu justifică sclavia, traficul de persoane",
    "textul nu justifică înfometarea, tulburările alimentare",
    "iertarea creștină nu înseamnă negarea răului",
    "nicio afirmație spirituală nu poate anula consimțământul, siguranța, legea, îngrijirea medicală",
    "protejarea copilului și raportarea abuzului",
]

def fail(message: str) -> None:
    safe = message.replace("%", "%25").replace("\r", "%0D").replace("\n", "%0A")
    print(f"::error title=Poarta Coloseni::{safe}")

def main() -> int:
    errors: list[str] = []
    index = (BIBLE / "index.ts").read_text(encoding="utf-8")
    helper = (BIBLE / "coloseniHelpers.ts").read_text(encoding="utf-8")
    publication = (BIBLE / "coloseniPublication.ts").read_text(encoding="utf-8")
    source = (BIBLE / "coloseniSource.ts").read_text(encoding="utf-8")
    chapter_texts: list[str] = []
    total_units = 0

    for number in range(1, 5):
        path = BIBLE / ("coloseni.ts" if number == 1 else f"coloseni{number}.ts")
        if not path.exists():
            errors.append(f"Coloseni {number}: fișier lipsă")
            continue
        text = path.read_text(encoding="utf-8")
        chapter_texts.append(text)
        marker = rf"(?:export )?const COLOSENI_{number} = coloseniChapter"
        if not re.search(marker, text):
            errors.append(f"Coloseni {number}: declarație lipsă")
        found = [(int(a), int(b)) for a, b in re.findall(r"verses:\s*\[(\d+),\s*(\d+)\]", text)]
        total_units += len(found)
        if found != EXPECTED_RANGES[number]:
            errors.append(f"Coloseni {number}: intervale {found}")
        for field in ("title", "summary", "literaryContext", "historicalContext", "units", "prayer"):
            if not re.search(rf"\b{field}\s*:", text):
                errors.append(f"Coloseni {number}: lipsește {field}")

    statuses = {int(n): s for n, s in re.findall(r'^\s*(\d+):\s*"(draft|in_review|published)",', publication, re.M)}
    if sorted(statuses) != list(range(1, 5)) or any(value != "in_review" for value in statuses.values()):
        errors.append("Toate cele 4 capitole trebuie să fie in_review")

    cfg = json.loads((DATA / "coloseni-rccv-import.json").read_text(encoding="utf-8"))
    manifest = json.loads((DATA / "coloseni-poonen-source.json").read_text(encoding="utf-8"))
    if cfg.get("bookId") != "COL" or cfg.get("verseCounts") != VERSE_COUNTS or sum(VERSE_COUNTS) != 95:
        errors.append("Configurația RCCV Coloseni este incompletă")
    episodes = manifest.get("episodes", [])
    if len(episodes) != 4 or episodes[0].get("range") != "Coloseni 1:1-1:25" or episodes[-1].get("range") != "Coloseni 3:14-4:18":
        errors.append("Manifestul trebuie să conțină cele 4 episoade oficiale")
    if cfg.get("sourceSha256") not in source:
        errors.append("SHA-ul RCCV lipsește din metadata")
    if "https://www.cfcindia.com/verse-by-verse/Colossians" not in source:
        errors.append("Pagina oficială CFC lipsește")
    if "status: coloseniStatus(input.number)" not in helper:
        errors.append("Starea nu vine din registrul editorial")
    if 'import { COLOSENI } from "./coloseni.js"' not in index:
        errors.append("Coloseni nu este importat în catalog")
    if not re.search(r"BIBLE_BOOKS:\s*BibleBook\[\]\s*=\s*\[[^\]]*\bEFESENI,\s*FILIPENI,\s*COLOSENI,\s*TIT\b", index):
        errors.append("Coloseni nu este în poziția canonică din BIBLE_BOOKS")

    book = (BIBLE / "coloseni.ts").read_text(encoding="utf-8")
    match = re.search(r"export const COLOSENI: BibleBook = \{.*?chapters:\s*\[(.*?)\]\s*,?\n\}", book, re.S)
    assembled = [int(x) for x in re.findall(r"\bCOLOSENI_(\d+)\b", match.group(1))] if match else []
    if assembled != list(range(1, 5)):
        errors.append(f"Ordinea capitolelor este {assembled}")

    package = (ROOT / "packages" / "shared" / "package.json").read_text(encoding="utf-8")
    root_package = (ROOT / "package.json").read_text(encoding="utf-8")
    if "coloseni-rccv-import.json" not in package:
        errors.append("Textul RCCV Coloseni nu este materializat la build")
    if '"check:coloseni": "python3 scripts/check-coloseni.py"' not in root_package:
        errors.append("Comanda check:coloseni lipsește")
    if (ROOT / ".github" / "workflows" / "research-coloseni.yml").exists():
        errors.append("Workflow-ul temporar research-coloseni.yml trebuie eliminat")
    if (ROOT / ".github" / "workflows" / "integrate-coloseni.yml").exists():
        errors.append("Workflow-ul temporar integrate-coloseni.yml trebuie eliminat")

    lowered = "\n".join(chapter_texts).lower()
    for phrase in REQUIRED_GUARDS:
        if phrase.lower() not in lowered:
            errors.append(f"Lipsește protecția editorială: {phrase}")

    print(f"Poarta Coloseni: 4 capitole, {total_units} unități, 95 versete RCCV și 4 episoade CFC.")
    if total_units != 22:
        errors.append(f"Total neașteptat de unități: {total_units}")
    if errors:
        for error in errors:
            print(f"- {error}")
            fail(error)
        return 1
    print("Verificarea structurală și editorială Coloseni a trecut.")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
