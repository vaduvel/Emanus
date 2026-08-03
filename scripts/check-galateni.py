#!/usr/bin/env python3
"""Poarta structurală și editorială pentru Galateni."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BIBLE = ROOT / "packages" / "shared" / "src" / "bible"
DATA = ROOT / "docs" / "data"
EXPECTED_RANGES = {
    1: [(1, 5), (6, 10), (11, 17), (18, 24)],
    2: [(1, 10), (11, 16), (17, 21)],
    3: [(1, 9), (10, 14), (15, 22), (23, 29)],
    4: [(1, 7), (8, 20), (21, 31)],
    5: [(1, 6), (7, 15), (16, 21), (22, 26)],
    6: [(1, 5), (6, 10), (11, 18)],
}
VERSE_COUNTS = [24, 21, 29, 31, 26, 18]
REQUIRED_GUARDS = [
    "nu autorizează umilirea publică, controlul sau atacul personal",
    "interzice folosirea lor pentru superioritate, excludere, exploatare sau abuz",
    "nu autorizează alungarea, disprețuirea sau dezumanizarea oamenilor",
    "nu îi autorizează pe credincioși la violență, ură sau răzbunare",
    "refuzarea îngrijirii medicale",
    "restaurarea nu cere unei victime să ascundă abuzul",
    "nu autorizează presiune financiară",
]


def fail(message: str) -> None:
    safe = message.replace("%", "%25").replace("\r", "%0D").replace("\n", "%0A")
    print(f"::error title=Poarta Galateni::{safe}")


def main() -> int:
    errors: list[str] = []
    index = (BIBLE / "index.ts").read_text(encoding="utf-8")
    helper = (BIBLE / "galateniHelpers.ts").read_text(encoding="utf-8")
    publication = (BIBLE / "galateniPublication.ts").read_text(encoding="utf-8")
    source = (BIBLE / "galateniSource.ts").read_text(encoding="utf-8")
    total_units = 0
    chapter_texts: list[str] = []

    for number in range(1, 7):
        path = BIBLE / ("galateni.ts" if number == 1 else f"galateni{number}.ts")
        if not path.exists():
            errors.append(f"Galateni {number}: fișier lipsă")
            continue
        text = path.read_text(encoding="utf-8")
        chapter_texts.append(text)
        marker = rf"(?:export )?const GALATENI_{number} = galateniChapter"
        if not re.search(marker, text):
            errors.append(f"Galateni {number}: declarație lipsă")
        found = [(int(a), int(b)) for a, b in re.findall(r"verses:\s*\[(\d+),\s*(\d+)\]", text)]
        total_units += len(found)
        if found != EXPECTED_RANGES[number]:
            errors.append(f"Galateni {number}: intervale {found}")
        for field in ("title", "summary", "literaryContext", "historicalContext", "units", "prayer"):
            if not re.search(rf"\b{field}\s*:", text):
                errors.append(f"Galateni {number}: lipsește {field}")

    statuses = {int(n): s for n, s in re.findall(r'^\s*(\d+):\s*"(draft|in_review|published)",', publication, re.M)}
    if sorted(statuses) != list(range(1, 7)) or any(value != "in_review" for value in statuses.values()):
        errors.append("Toate cele 6 capitole trebuie să fie in_review")

    cfg = json.loads((DATA / "galateni-rccv-import.json").read_text(encoding="utf-8"))
    manifest = json.loads((DATA / "galateni-poonen-source.json").read_text(encoding="utf-8"))
    if cfg.get("bookId") != "GAL" or cfg.get("verseCounts") != VERSE_COUNTS or sum(VERSE_COUNTS) != 149:
        errors.append("Configurația RCCV Galateni este incompletă")
    if len(manifest.get("episodes", [])) != 4:
        errors.append("Manifestul trebuie să conțină 4 episoade")
    if cfg.get("sourceSha256") not in source:
        errors.append("SHA-ul RCCV lipsește din metadata")
    if "https://www.cfcindia.com/verse-by-verse/Galatians" not in source:
        errors.append("Pagina oficială CFC lipsește")
    if "status: galateniStatus(input.number)" not in helper:
        errors.append("Starea nu vine din registrul editorial")
    if 'import { GALATENI } from "./galateni.js"' not in index:
        errors.append("Galateni nu este importat în catalog")
    if not re.search(r"BIBLE_BOOKS:\s*BibleBook\[\]\s*=\s*\[[^\]]*\bGALATENI\b", index):
        errors.append("Galateni nu este în BIBLE_BOOKS")

    book = (BIBLE / "galateni.ts").read_text(encoding="utf-8")
    match = re.search(r"export const GALATENI: BibleBook = \{.*?chapters:\s*\[(.*?)\]\s*,?\n\}", book, re.S)
    assembled = [int(value) for value in re.findall(r"\bGALATENI_(\d+)\b", match.group(1))] if match else []
    if assembled != list(range(1, 7)):
        errors.append(f"Ordinea capitolelor este {assembled}")

    package = (ROOT / "packages" / "shared" / "package.json").read_text(encoding="utf-8")
    if "galateni-rccv-import.json" not in package:
        errors.append("Textul RCCV Galateni nu este materializat la build")
    if (ROOT / ".github" / "workflows" / "research-galateni.yml").exists():
        errors.append("Workflow-ul temporar research-galateni.yml trebuie eliminat")

    lowered = "\n".join(chapter_texts).lower()
    for phrase in REQUIRED_GUARDS:
        if phrase.lower() not in lowered:
            errors.append(f"Lipsește protecția editorială: {phrase}")

    print(f"Poarta Galateni: 6 capitole, {total_units} unități, 149 versete RCCV și 4 episoade CFC.")
    if total_units != 21:
        errors.append(f"Total neașteptat de unități: {total_units}")

    if errors:
        for error in errors:
            print(f"- {error}")
            fail(error)
        return 1

    print("Verificarea structurală și editorială Galateni a trecut.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
