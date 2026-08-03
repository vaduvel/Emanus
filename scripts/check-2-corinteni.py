#!/usr/bin/env python3
"""Poarta structurală și editorială pentru 2 Corinteni."""
from __future__ import annotations
import json, re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BIBLE = ROOT / "packages" / "shared" / "src" / "bible"
DATA = ROOT / "docs" / "data"
EXPECTED_RANGES = {1: [(1, 7), (8, 11), (12, 22), (23, 24)], 2: [(1, 4), (5, 11), (12, 17)], 3: [(1, 6), (7, 11), (12, 18)], 4: [(1, 6), (7, 12), (13, 18)], 5: [(1, 10), (11, 15), (16, 21)], 6: [(1, 10), (11, 13), (14, 18)], 7: [(1, 5), (6, 10), (11, 16)], 8: [(1, 9), (10, 15), (16, 24)], 9: [(1, 5), (6, 11), (12, 15)], 10: [(1, 6), (7, 11), (12, 18)], 11: [(1, 6), (7, 15), (16, 21), (22, 33)], 12: [(1, 10), (11, 18), (19, 21)], 13: [(1, 4), (5, 10), (11, 14)]}
VERSE_COUNTS = [24,17,18,18,21,18,16,24,15,18,33,21,14]
REQUIRED_GUARDS = [
    "nu cere unei victime să renunțe la siguranță sau dreptate",
    "nu autorizează manipularea, amenințarea ori abuzul spiritual",
    "nu obligă o victimă să rămână într-un abuz",
    "nu poate folosi aceste versete pentru presiune, datorii, manipulare financiară",
    "textul nu autorizează etichetarea oamenilor ca dușmani spirituali",
    "nicio chemare la supunere nu autorizează controlul, degradarea, violența sau exploatarea",
    "nu justifică oprirea tratamentului medical",
    "nu autorizează anchete secrete, umilire publică",
]

def fail(message: str) -> None:
    safe = message.replace("%", "%25").replace("\r", "%0D").replace("\n", "%0A")
    print(f"::error title=Poarta 2 Corinteni::{safe}")

def main() -> int:
    errors: list[str] = []
    index = (BIBLE / "index.ts").read_text(encoding="utf-8")
    helper = (BIBLE / "doiCorinteniHelpers.ts").read_text(encoding="utf-8")
    publication = (BIBLE / "doiCorinteniPublication.ts").read_text(encoding="utf-8")
    source = (BIBLE / "doiCorinteniSource.ts").read_text(encoding="utf-8")
    total_units = 0
    chapter_texts: list[str] = []
    for number in range(1, 14):
        path = BIBLE / ("doiCorinteni.ts" if number == 1 else f"doiCorinteni{number}.ts")
        if not path.exists():
            errors.append(f"2 Corinteni {number}: fișier lipsă")
            continue
        text = path.read_text(encoding="utf-8")
        chapter_texts.append(text)
        marker = rf"(?:export )?const DOI_CORINTENI_{number} = doiCorinteniChapter"
        if not re.search(marker, text):
            errors.append(f"2 Corinteni {number}: declarație lipsă")
        found = [(int(a), int(b)) for a,b in re.findall(r"verses:\s*\[(\d+),\s*(\d+)\]", text)]
        total_units += len(found)
        if found != EXPECTED_RANGES[number]:
            errors.append(f"2 Corinteni {number}: intervale {found}")
        for field in ("title","summary","literaryContext","historicalContext","units","prayer"):
            if not re.search(rf"\b{field}\s*:", text):
                errors.append(f"2 Corinteni {number}: lipsește {field}")
    statuses = {int(n):s for n,s in re.findall(r'^\s*(\d+):\s*"(draft|in_review|published)",', publication, re.M)}
    if sorted(statuses) != list(range(1,14)) or any(v != "in_review" for v in statuses.values()):
        errors.append("Toate cele 13 capitole trebuie să fie in_review")
    cfg = json.loads((DATA / "2-corinteni-rccv-import.json").read_text(encoding="utf-8"))
    manifest = json.loads((DATA / "2-corinteni-poonen-source.json").read_text(encoding="utf-8"))
    if cfg.get("bookId") != "2CO" or sum(cfg.get("verseCounts", [])) != 257:
        errors.append("Configurația RCCV 2 Corinteni este incompletă")
    if len(manifest.get("episodes", [])) != 12:
        errors.append("Manifestul trebuie să conțină 12 episoade")
    if cfg.get("sourceSha256") not in source:
        errors.append("SHA-ul RCCV lipsește din metadata")
    if "https://www.cfcindia.com/verse-by-verse/2-Corinthians" not in source:
        errors.append("Pagina oficială CFC lipsește")
    if "status: doiCorinteniStatus(input.number)" not in helper:
        errors.append("Starea nu vine din registrul editorial")
    if 'import { DOI_CORINTENI } from "./doiCorinteni.js"' not in index:
        errors.append("2 Corinteni nu este importat în catalog")
    if not re.search(r"BIBLE_BOOKS:\s*BibleBook\[\]\s*=\s*\[[^\]]*\bDOI_CORINTENI\b", index):
        errors.append("2 Corinteni nu este în BIBLE_BOOKS")
    book = (BIBLE / "doiCorinteni.ts").read_text(encoding="utf-8")
    match = re.search(r"export const DOI_CORINTENI: BibleBook = \{.*?chapters:\s*\[(.*?)\]\s*,?\n\}", book, re.S)
    assembled = [int(x) for x in re.findall(r"\bDOI_CORINTENI_(\d+)\b", match.group(1))] if match else []
    if assembled != list(range(1,14)):
        errors.append(f"Ordinea capitolelor este {assembled}")
    package = (ROOT / "packages" / "shared" / "package.json").read_text(encoding="utf-8")
    if "2-corinteni-rccv-import.json" not in package:
        errors.append("Textul RCCV 2 Corinteni nu este materializat la build")
    if (ROOT / ".github" / "workflows" / "research-2-corinteni.yml").exists():
        errors.append("Workflow-ul temporar research-2-corinteni.yml trebuie eliminat")
    lowered = "\n".join(chapter_texts).lower()
    for phrase in REQUIRED_GUARDS:
        if phrase.lower() not in lowered:
            errors.append(f"Lipsește protecția editorială: {phrase}")
    print(f"Poarta 2 Corinteni: 13 capitole, {total_units} unități, 257 versete RCCV și 12 episoade CFC.")
    if total_units != 41:
        errors.append(f"Total neașteptat de unități: {total_units}")
    if errors:
        for error in errors:
            print(f"- {error}")
            fail(error)
        return 1
    print("Verificarea structurală și editorială 2 Corinteni a trecut.")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
