#!/usr/bin/env python3
"""Poarta structurală și editorială pentru Romani."""
from __future__ import annotations
import json, re
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
BIBLE = ROOT / "packages" / "shared" / "src" / "bible"
DATA = ROOT / "docs" / "data"
EXPECTED_RANGES = {1: [(1, 7), (8, 17), (18, 23), (24, 32)], 2: [(1, 11), (12, 16), (17, 24), (25, 29)], 3: [(1, 8), (9, 20), (21, 26), (27, 31)], 4: [(1, 8), (9, 12), (13, 17), (18, 25)], 5: [(1, 5), (6, 11), (12, 17), (18, 21)], 6: [(1, 4), (5, 11), (12, 14), (15, 23)], 7: [(1, 6), (7, 13), (14, 20), (21, 25)], 8: [(1, 4), (5, 11), (12, 17), (18, 25), (26, 30), (31, 39)], 9: [(1, 5), (6, 13), (14, 21), (22, 29), (30, 33)], 10: [(1, 4), (5, 13), (14, 17), (18, 21)], 11: [(1, 10), (11, 16), (17, 24), (25, 32), (33, 36)], 12: [(1, 2), (3, 8), (9, 13), (14, 21)], 13: [(1, 7), (8, 10), (11, 14)], 14: [(1, 4), (5, 12), (13, 18), (19, 23)], 15: [(1, 6), (7, 13), (14, 21), (22, 29), (30, 33)], 16: [(1, 16), (17, 20), (21, 24), (25, 27)]}

def fail(message: str) -> None:
    safe = message.replace("%", "%25").replace("\r", "%0D").replace("\n", "%0A")
    print(f"::error title=Poarta Romani::{safe}")

def main() -> int:
    errors: list[str] = []
    index = (BIBLE / "index.ts").read_text(encoding="utf-8")
    helper = (BIBLE / "romaniHelpers.ts").read_text(encoding="utf-8")
    publication = (BIBLE / "romaniPublication.ts").read_text(encoding="utf-8")
    source = (BIBLE / "romaniSource.ts").read_text(encoding="utf-8")
    total_units = 0
    chapter_texts = []
    for number in range(1, 17):
        path = BIBLE / ("romani.ts" if number == 1 else f"romani{number}.ts")
        if not path.exists():
            errors.append(f"Romani {number}: fișier lipsă")
            continue
        text = path.read_text(encoding="utf-8")
        chapter_texts.append(text)
        marker = rf"(?:export )?const ROMANI_{number} = romaniChapter"
        if not re.search(marker, text): errors.append(f"Romani {number}: declarație lipsă")
        ranges_found = [(int(a), int(b)) for a,b in re.findall(r"verses:\s*\[(\d+),\s*(\d+)\]", text)]
        total_units += len(ranges_found)
        if ranges_found != EXPECTED_RANGES[number]: errors.append(f"Romani {number}: intervale {ranges_found}")
        for field in ("title", "summary", "literaryContext", "historicalContext", "units", "prayer"):
            if not re.search(rf"\b{field}\s*:", text): errors.append(f"Romani {number}: lipsește {field}")
    statuses = {int(n):s for n,s in re.findall(r'^\s*(\d+):\s*"(draft|in_review|published)",', publication, re.M)}
    if sorted(statuses) != list(range(1,17)) or any(v != "in_review" for v in statuses.values()): errors.append("Toate cele 16 capitole trebuie să fie in_review")
    cfg = json.loads((DATA / "romani-rccv-import.json").read_text(encoding="utf-8"))
    manifest = json.loads((DATA / "romani-poonen-source.json").read_text(encoding="utf-8"))
    if cfg.get("bookId") != "ROM" or sum(cfg.get("verseCounts", [])) != 433: errors.append("Configurația RCCV Romani este incompletă")
    if len(manifest.get("episodes", [])) != 15: errors.append("Manifestul trebuie să conțină 15 episoade")
    if cfg.get("sourceSha256") not in source: errors.append("SHA-ul RCCV lipsește din metadata")
    if "https://www.cfcindia.com/verse-by-verse/Romans" not in source: errors.append("Pagina oficială CFC lipsește")
    if "status: romaniStatus(input.number)" not in helper: errors.append("Starea nu vine din registrul editorial")
    if 'import { ROMANI } from "./romani.js"' not in index: errors.append("Romani nu este importat în catalog")
    if not re.search(r"BIBLE_BOOKS:\s*BibleBook\[\]\s*=\s*\[[^\]]*\bROMANI\b", index): errors.append("Romani nu este în BIBLE_BOOKS")
    book = (BIBLE / "romani.ts").read_text(encoding="utf-8")
    m = re.search(r"export const ROMANI: BibleBook = \{.*?chapters:\s*\[(.*?)\]\s*,?\n\}", book, re.S)
    assembled = [int(x) for x in re.findall(r"\bROMANI_(\d+)\b", m.group(1))] if m else []
    if assembled != list(range(1,17)): errors.append(f"Ordinea capitolelor Romani este {assembled}")
    package = (ROOT / "packages" / "shared" / "package.json").read_text(encoding="utf-8")
    if "romani-rccv-import.json" not in package: errors.append("Textul RCCV Romani nu este materializat la build")
    if (ROOT / ".github" / "workflows" / "research-romani.yml").exists(): errors.append("Workflow-ul temporar research-romani.yml trebuie eliminat")
    lowered = "\n".join(chapter_texts).lower()
    guards = ["nu autorizează disprețul, violența sau dezumanizarea", "nu justifică oprirea tratamentului medical", "a nu întoarce rău pentru rău nu înseamnă să numim abuzul acceptabil", "raportarea abuzului și folosirea protecției legale nu contrazic credința"]
    for phrase in guards:
        if phrase.lower() not in lowered: errors.append(f"Lipsește protecția editorială: {phrase}")
    print(f"Poarta Romani: 16 capitole, {total_units} unități, 433 versete RCCV și 15 episoade CFC.")
    if total_units != 68: errors.append(f"Total neașteptat de unități: {total_units}")
    if errors:
        for e in errors: print(f"- {e}"); fail(e)
        return 1
    print("Verificarea structurală și editorială Romani a trecut.")
    return 0
if __name__ == "__main__": raise SystemExit(main())
