#!/usr/bin/env python3
"""Poarta structurală și editorială pentru Filipeni."""
from __future__ import annotations
import json, re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BIBLE = ROOT / "packages" / "shared" / "src" / "bible"
DATA = ROOT / "docs" / "data"
EXPECTED_RANGES = {
    1: [(1, 2), (3, 11), (12, 18), (19, 26), (27, 30)],
    2: [(1, 4), (5, 11), (12, 18), (19, 24), (25, 30)],
    3: [(1, 6), (7, 11), (12, 16), (17, 21)],
    4: [(1, 3), (4, 9), (10, 13), (14, 20), (21, 23)],
}
VERSE_COUNTS = [30, 30, 21, 23]
REQUIRED_GUARDS = [
    "nu justifică sclavia, exploatarea ori controlul exercitat de oameni",
    "nu trebuie confundată cu abuzul familial",
    "nu justifică ura etnică, antisemitismul",
    "ajutorul profesionist poate fi primit",
    "nu promite succes în orice ambiție",
    "fără a pune în pericol hrana, locuința, tratamentul",
]

def fail(message: str) -> None:
    safe = message.replace("%", "%25").replace("\r", "%0D").replace("\n", "%0A")
    print(f"::error title=Poarta Filipeni::{safe}")

def main() -> int:
    errors: list[str] = []
    index = (BIBLE / "index.ts").read_text(encoding="utf-8")
    helper = (BIBLE / "filipeniHelpers.ts").read_text(encoding="utf-8")
    publication = (BIBLE / "filipeniPublication.ts").read_text(encoding="utf-8")
    source = (BIBLE / "filipeniSource.ts").read_text(encoding="utf-8")
    chapter_texts: list[str] = []
    total_units = 0

    for number in range(1, 5):
        path = BIBLE / ("filipeni.ts" if number == 1 else f"filipeni{number}.ts")
        if not path.exists():
            errors.append(f"Filipeni {number}: fișier lipsă")
            continue
        text = path.read_text(encoding="utf-8")
        chapter_texts.append(text)
        marker = rf"(?:export )?const FILIPENI_{number} = filipeniChapter"
        if not re.search(marker, text):
            errors.append(f"Filipeni {number}: declarație lipsă")
        found = [(int(a), int(b)) for a, b in re.findall(r"verses:\s*\[(\d+),\s*(\d+)\]", text)]
        total_units += len(found)
        if found != EXPECTED_RANGES[number]:
            errors.append(f"Filipeni {number}: intervale {found}")
        for field in ("title", "summary", "literaryContext", "historicalContext", "units", "prayer"):
            if not re.search(rf"\b{field}\s*:", text):
                errors.append(f"Filipeni {number}: lipsește {field}")

    statuses = {int(n): s for n, s in re.findall(r'^\s*(\d+):\s*"(draft|in_review|published)",', publication, re.M)}
    if sorted(statuses) != list(range(1, 5)) or any(value != "in_review" for value in statuses.values()):
        errors.append("Toate cele 4 capitole trebuie să fie in_review")

    cfg = json.loads((DATA / "filipeni-rccv-import.json").read_text(encoding="utf-8"))
    manifest = json.loads((DATA / "filipeni-poonen-source.json").read_text(encoding="utf-8"))
    if cfg.get("bookId") != "PHP" or cfg.get("verseCounts") != VERSE_COUNTS or sum(VERSE_COUNTS) != 104:
        errors.append("Configurația RCCV Filipeni este incompletă")
    episodes = manifest.get("episodes", [])
    if len(episodes) != 4 or episodes[0].get("range") != "Filipeni 1:1-2:7" or episodes[-1].get("range") != "Filipeni 3:17-4:23":
        errors.append("Manifestul trebuie să conțină cele 4 episoade oficiale")
    if cfg.get("sourceSha256") not in source:
        errors.append("SHA-ul RCCV lipsește din metadata")
    if "https://www.cfcindia.com/verse-by-verse/Philippians" not in source:
        errors.append("Pagina oficială CFC lipsește")
    if "status: filipeniStatus(input.number)" not in helper:
        errors.append("Starea nu vine din registrul editorial")
    if 'import { FILIPENI } from "./filipeni.js"' not in index:
        errors.append("Filipeni nu este importat în catalog")
    if not re.search(r"BIBLE_BOOKS:\s*BibleBook\[\]\s*=\s*\[[^\]]*\bEFESENI,\s*FILIPENI,\s*(?:COLOSENI,\s*)?TIT\b", index):
        errors.append("Filipeni nu este în poziția canonică din BIBLE_BOOKS")

    book = (BIBLE / "filipeni.ts").read_text(encoding="utf-8")
    match = re.search(r"export const FILIPENI: BibleBook = \{.*?chapters:\s*\[(.*?)\]\s*,?\n\}", book, re.S)
    assembled = [int(x) for x in re.findall(r"\bFILIPENI_(\d+)\b", match.group(1))] if match else []
    if assembled != list(range(1, 5)):
        errors.append(f"Ordinea capitolelor este {assembled}")

    package = (ROOT / "packages" / "shared" / "package.json").read_text(encoding="utf-8")
    root_package = (ROOT / "package.json").read_text(encoding="utf-8")
    if "filipeni-rccv-import.json" not in package:
        errors.append("Textul RCCV Filipeni nu este materializat la build")
    if '"check:filipeni": "python3 scripts/check-filipeni.py"' not in root_package:
        errors.append("Comanda check:filipeni lipsește")
    if (ROOT / ".github" / "workflows" / "research-filipeni.yml").exists():
        errors.append("Workflow-ul temporar research-filipeni.yml trebuie eliminat")

    lowered = "\n".join(chapter_texts).lower()
    for phrase in REQUIRED_GUARDS:
        if phrase.lower() not in lowered:
            errors.append(f"Lipsește protecția editorială: {phrase}")

    print(f"Poarta Filipeni: 4 capitole, {total_units} unități, 104 versete RCCV și 4 episoade CFC.")
    if total_units != 19:
        errors.append(f"Total neașteptat de unități: {total_units}")
    if errors:
        for error in errors:
            print(f"- {error}")
            fail(error)
        return 1
    print("Verificarea structurală și editorială Filipeni a trecut.")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
