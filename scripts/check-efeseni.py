#!/usr/bin/env python3
"""Poarta structurală și editorială pentru Efeseni."""
from __future__ import annotations
import json, re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BIBLE = ROOT / "packages" / "shared" / "src" / "bible"
DATA = ROOT / "docs" / "data"
EXPECTED_RANGES = {
    1: [(1, 6), (7, 10), (11, 14), (15, 23)],
    2: [(1, 7), (8, 10), (11, 18), (19, 22)],
    3: [(1, 7), (8, 13), (14, 21)],
    4: [(1, 6), (7, 16), (17, 24), (25, 32)],
    5: [(1, 7), (8, 14), (15, 21), (22, 33)],
    6: [(1, 4), (5, 9), (10, 17), (18, 24)],
}
VERSE_COUNTS = [23, 22, 21, 32, 33, 24]
REQUIRED_GUARDS = [
    "nu obligă o victimă să rămână într-un abuz",
    "nu autorizează controlul, degradarea, violența, coerciția sexuală, izolarea sau exploatarea financiară",
    "nu justifică oprirea tratamentului medical",
    "lupta nu este împotriva oamenilor",
    "nu autorizează anchete secrete",
    "raportarea răului",
]

def fail(message: str) -> None:
    safe = message.replace("%", "%25").replace("\r", "%0D").replace("\n", "%0A")
    print(f"::error title=Poarta Efeseni::{safe}")

def main() -> int:
    errors: list[str] = []
    index = (BIBLE / "index.ts").read_text(encoding="utf-8")
    helper = (BIBLE / "efeseniHelpers.ts").read_text(encoding="utf-8")
    publication = (BIBLE / "efeseniPublication.ts").read_text(encoding="utf-8")
    source = (BIBLE / "efeseniSource.ts").read_text(encoding="utf-8")
    chapter_texts: list[str] = []
    total_units = 0

    for number in range(1, 7):
        path = BIBLE / ("efeseni.ts" if number == 1 else f"efeseni{number}.ts")
        if not path.exists():
            errors.append(f"Efeseni {number}: fișier lipsă")
            continue
        text = path.read_text(encoding="utf-8")
        chapter_texts.append(text)
        marker = rf"(?:export )?const EFESENI_{number} = efeseniChapter"
        if not re.search(marker, text):
            errors.append(f"Efeseni {number}: declarație lipsă")
        found = [(int(a), int(b)) for a, b in re.findall(r"verses:\s*\[(\d+),\s*(\d+)\]", text)]
        total_units += len(found)
        if found != EXPECTED_RANGES[number]:
            errors.append(f"Efeseni {number}: intervale {found}")
        for field in ("title", "summary", "literaryContext", "historicalContext", "units", "prayer"):
            if not re.search(rf"\b{field}\s*:", text):
                errors.append(f"Efeseni {number}: lipsește {field}")

    statuses = {int(n): s for n, s in re.findall(r'^\s*(\d+):\s*"(draft|in_review|published)",', publication, re.M)}
    if sorted(statuses) != list(range(1, 7)) or any(value != "in_review" for value in statuses.values()):
        errors.append("Toate cele 6 capitole trebuie să fie in_review")

    cfg = json.loads((DATA / "efeseni-rccv-import.json").read_text(encoding="utf-8"))
    manifest = json.loads((DATA / "efeseni-poonen-source.json").read_text(encoding="utf-8"))
    if cfg.get("bookId") != "EPH" or cfg.get("verseCounts") != VERSE_COUNTS or sum(VERSE_COUNTS) != 155:
        errors.append("Configurația RCCV Efeseni este incompletă")
    episodes = manifest.get("episodes", [])
    if len(episodes) != 7 or episodes[0].get("range") != "Efeseni 1:1-1:17" or episodes[-1].get("range") != "Efeseni 6:12-6:24":
        errors.append("Manifestul trebuie să conțină cele 7 episoade oficiale")
    if cfg.get("sourceSha256") not in source:
        errors.append("SHA-ul RCCV lipsește din metadata")
    if "https://www.cfcindia.com/verse-by-verse/Ephesians" not in source:
        errors.append("Pagina oficială CFC lipsește")
    if "status: efeseniStatus(input.number)" not in helper:
        errors.append("Starea nu vine din registrul editorial")
    if 'import { EFESENI } from "./efeseni.js"' not in index:
        errors.append("Efeseni nu este importat în catalog")
    if not re.search(r"BIBLE_BOOKS:\s*BibleBook\[\]\s*=\s*\[[^\]]*\bGALATENI,\s*EFESENI,\s*[^\]]*\bTIT\b", index):
        errors.append("Efeseni nu este în poziția canonică din BIBLE_BOOKS")

    book = (BIBLE / "efeseni.ts").read_text(encoding="utf-8")
    match = re.search(r"export const EFESENI: BibleBook = \{.*?chapters:\s*\[(.*?)\]\s*,?\n\}", book, re.S)
    assembled = [int(x) for x in re.findall(r"\bEFESENI_(\d+)\b", match.group(1))] if match else []
    if assembled != list(range(1, 7)):
        errors.append(f"Ordinea capitolelor este {assembled}")

    package = (ROOT / "packages" / "shared" / "package.json").read_text(encoding="utf-8")
    root_package = (ROOT / "package.json").read_text(encoding="utf-8")
    if "efeseni-rccv-import.json" not in package:
        errors.append("Textul RCCV Efeseni nu este materializat la build")
    if '"check:efeseni": "python3 scripts/check-efeseni.py"' not in root_package:
        errors.append("Comanda check:efeseni lipsește")
    if (ROOT / ".github" / "workflows" / "research-efeseni.yml").exists():
        errors.append("Workflow-ul temporar research-efeseni.yml trebuie eliminat")

    lowered = "\n".join(chapter_texts).lower()
    for phrase in REQUIRED_GUARDS:
        if phrase.lower() not in lowered:
            errors.append(f"Lipsește protecția editorială: {phrase}")

    print(f"Poarta Efeseni: 6 capitole, {total_units} unități, 155 versete RCCV și 7 episoade CFC.")
    if total_units != 23:
        errors.append(f"Total neașteptat de unități: {total_units}")
    if errors:
        for error in errors:
            print(f"- {error}")
            fail(error)
        return 1
    print("Verificarea structurală și editorială Efeseni a trecut.")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
