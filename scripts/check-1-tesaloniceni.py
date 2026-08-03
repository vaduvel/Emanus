#!/usr/bin/env python3
"""Poarta structurală și editorială pentru 1 Tesaloniceni."""
from __future__ import annotations
import json, re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BIBLE = ROOT / "packages" / "shared" / "src" / "bible"
DATA = ROOT / "docs" / "data"
EXPECTED_RANGES = {
    1: [(1, 3), (4, 5), (6, 8), (9, 10)],
    2: [(1, 4), (5, 8), (9, 12), (13, 16), (17, 20)],
    3: [(1, 5), (6, 10), (11, 13)],
    4: [(1, 2), (3, 8), (9, 12), (13, 18)],
    5: [(1, 5), (6, 11), (12, 15), (16, 18), (19, 22), (23, 24), (25, 28)],
}
VERSE_COUNTS = [10, 20, 13, 18, 28]
REQUIRED_GUARDS = [
    "nu autorizează liderii să controleze conștiința",
    "nu justifică antisemitismul",
    "nu obligă o victimă să rămână în abuz",
    "nu justifică abuzul sexual, coerciția sau încălcarea consimțământului",
    "durerea nu trebuie purtată singur",
    "profețiile trebuie cercetate",
]

def fail(message: str) -> None:
    safe = message.replace("%", "%25").replace("\r", "%0D").replace("\n", "%0A")
    print(f"::error title=Poarta 1 Tesaloniceni::{safe}")

def main() -> int:
    errors: list[str] = []
    index = (BIBLE / "index.ts").read_text(encoding="utf-8")
    helper = (BIBLE / "unuTesaloniceniHelpers.ts").read_text(encoding="utf-8")
    publication = (BIBLE / "unuTesaloniceniPublication.ts").read_text(encoding="utf-8")
    source = (BIBLE / "unuTesaloniceniSource.ts").read_text(encoding="utf-8")
    chapter_texts: list[str] = []
    total_units = 0

    for number in range(1, 6):
        path = BIBLE / ("unuTesaloniceni.ts" if number == 1 else f"unuTesaloniceni{number}.ts")
        if not path.exists():
            errors.append(f"1 Tesaloniceni {number}: fișier lipsă")
            continue
        text = path.read_text(encoding="utf-8")
        chapter_texts.append(text)
        marker = rf"(?:export )?const UNU_TESALONICENI_{number} = unuTesaloniceniChapter"
        if not re.search(marker, text):
            errors.append(f"1 Tesaloniceni {number}: declarație lipsă")
        found = [(int(a), int(b)) for a, b in re.findall(r"verses:\s*\[(\d+),\s*(\d+)\]", text)]
        total_units += len(found)
        if found != EXPECTED_RANGES[number]:
            errors.append(f"1 Tesaloniceni {number}: intervale {found}")
        for field in ("title", "summary", "literaryContext", "historicalContext", "units", "prayer"):
            if not re.search(rf"\b{field}\s*:", text):
                errors.append(f"1 Tesaloniceni {number}: lipsește {field}")

    statuses = {int(n): s for n, s in re.findall(r'^\s*(\d+):\s*"(draft|in_review|published)",', publication, re.M)}
    if sorted(statuses) != list(range(1, 6)) or any(value != "in_review" for value in statuses.values()):
        errors.append("Toate cele 5 capitole trebuie să fie in_review")

    cfg = json.loads((DATA / "1-tesaloniceni-rccv-import.json").read_text(encoding="utf-8"))
    manifest = json.loads((DATA / "1-tesaloniceni-poonen-source.json").read_text(encoding="utf-8"))
    if cfg.get("bookId") != "1TH" or cfg.get("verseCounts") != VERSE_COUNTS or sum(VERSE_COUNTS) != 89:
        errors.append("Configurația RCCV 1 Tesaloniceni este incompletă")
    episodes = manifest.get("episodes", [])
    if len(episodes) != 2 or episodes[0].get("range") != "1 Tesaloniceni 1:1-3:13" or episodes[-1].get("range") != "1 Tesaloniceni 3:12-5:28":
        errors.append("Manifestul trebuie să conțină cele 2 episoade oficiale")
    if cfg.get("sourceSha256") not in source:
        errors.append("SHA-ul RCCV lipsește din metadata")
    if "https://www.cfcindia.com/verse-by-verse/1-Thessalonians" not in source:
        errors.append("Pagina oficială CFC lipsește")
    if "status: unuTesaloniceniStatus(input.number)" not in helper:
        errors.append("Starea nu vine din registrul editorial")
    if 'import { UNU_TESALONICENI } from "./unuTesaloniceni.js"' not in index:
        errors.append("1 Tesaloniceni nu este importat în catalog")
    if not re.search(r"BIBLE_BOOKS:\s*BibleBook\[\]\s*=\s*\[[^\]]*\bCOLOSENI,\s*UNU_TESALONICENI\b", index):
        errors.append("1 Tesaloniceni nu este după Coloseni în BIBLE_BOOKS")

    book = (BIBLE / "unuTesaloniceni.ts").read_text(encoding="utf-8")
    match = re.search(r"export const UNU_TESALONICENI: BibleBook = \{.*?chapters:\s*\[(.*?)\]\s*,?\n\s*\]\s*,?\n\}", book, re.S)
    assembled = [int(x) for x in re.findall(r"\bUNU_TESALONICENI_(\d+)\b", match.group(1))] if match else []
    if assembled != list(range(1, 6)):
        errors.append(f"Ordinea capitolelor este {assembled}")

    package = (ROOT / "packages" / "shared" / "package.json").read_text(encoding="utf-8")
    root_package = (ROOT / "package.json").read_text(encoding="utf-8")
    if "1-tesaloniceni-rccv-import.json" not in package:
        errors.append("Textul RCCV 1 Tesaloniceni nu este materializat la build")
    if '"check:1-tesaloniceni": "python3 scripts/check-1-tesaloniceni.py"' not in root_package:
        errors.append("Comanda check:1-tesaloniceni lipsește")
    if (ROOT / ".github" / "workflows" / "research-1-tesaloniceni.yml").exists():
        errors.append("Workflow-ul temporar research-1-tesaloniceni.yml trebuie eliminat")

    lowered = "\n".join(chapter_texts).lower()
    for phrase in REQUIRED_GUARDS:
        if phrase.lower() not in lowered:
            errors.append(f"Lipsește protecția editorială: {phrase}")

    print(f"Poarta 1 Tesaloniceni: 5 capitole, {total_units} unități, 89 versete RCCV și 2 episoade CFC.")
    if total_units != 23:
        errors.append(f"Total neașteptat de unități: {total_units}")
    if errors:
        for error in errors:
            print(f"- {error}")
            fail(error)
        return 1
    print("Verificarea structurală și editorială 1 Tesaloniceni a trecut.")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
