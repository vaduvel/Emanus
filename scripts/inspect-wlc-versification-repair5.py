#!/usr/bin/env python3
from __future__ import annotations

import json
from collections import defaultdict
from pathlib import Path

from ot_repair5_common import parse_usfm_zip

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs" / "data" / "biblia-emanus-candidates"
OUT = ROOT / "docs" / "biblia-emanus" / "OT-REPAIR5-WLC-CHAPTER-DIFFERENCES.json"
CANONICAL = {
    "JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB",
    "PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO",
    "OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL",
}


def main() -> None:
    wlc = parse_usfm_zip(DATA / "sources" / "hboWLC_usfm.zip")
    target: dict[tuple[str, int], list[int]] = defaultdict(list)
    source: dict[tuple[str, int], list[int]] = defaultdict(list)
    for path in sorted(DATA.glob("*.json")):
        if path.name == "manifest.json":
            continue
        doc = json.loads(path.read_text(encoding="utf-8"))
        book = str(doc.get("bookId", ""))
        if book not in CANONICAL:
            continue
        chapter = int(doc.get("chapter", doc.get("chapterNumber", 0)))
        target[(book, chapter)] = [int(v["number"]) for v in doc.get("verses", [])]
    for (book, chapter, verse) in wlc:
        if book in CANONICAL:
            source[(book, chapter)].append(verse)

    differences = []
    for key in sorted(set(target) | set(source)):
        t = sorted(target.get(key, []))
        s = sorted(source.get(key, []))
        if t != s:
            book, chapter = key
            differences.append({
                "bookId": book,
                "chapter": chapter,
                "targetCount": len(t),
                "sourceCount": len(s),
                "targetNumbers": t,
                "sourceNumbers": s,
                "missingExactInWlc": sorted(set(t) - set(s)),
                "extraExactInWlc": sorted(set(s) - set(t)),
                "countDifference": len(t) - len(s),
            })
    payload = {
        "schemaVersion": 2,
        "sourceId": "hboWLC",
        "differenceCount": len(differences),
        "differences": differences,
    }
    OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(payload, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
