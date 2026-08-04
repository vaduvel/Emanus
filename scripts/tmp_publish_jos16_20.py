#!/usr/bin/env python3
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs" / "data" / "biblia-emanus"
LEDGER = DATA / "source-ledger.json"
MANIFEST = DATA / "manifest.json"
AUDIT = ROOT / "docs" / "biblia-emanus" / "IOSUA-AUDIT.md"


def load(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def save(path: Path, data):
    path.write_text(json.dumps(data, ensure_ascii=False, separators=(",", ":")) + "\n", encoding="utf-8")


ledger = load(LEDGER)
entries = {
    "JOS.16": {
        "expectedVerses": 10,
        "englishUrl": "https://ebible.org/engwebp/JOS16.htm",
        "hebrewUrl": "https://ebible.org/hboWLC/JOS16.htm",
        "textualVariantReview": ["JOS.16.6"],
    },
    "JOS.17": {
        "expectedVerses": 18,
        "englishUrl": "https://ebible.org/engwebp/JOS17.htm",
        "hebrewUrl": "https://ebible.org/hboWLC/JOS17.htm",
        "textualVariantReview": ["JOS.17.11", "JOS.17.18"],
    },
    "JOS.18": {
        "expectedVerses": 28,
        "englishUrl": "https://ebible.org/engwebp/JOS18.htm",
        "hebrewUrl": "https://ebible.org/hboWLC/JOS18.htm",
        "textualVariantReview": ["JOS.18.17"],
    },
    "JOS.19": {
        "expectedVerses": 51,
        "englishUrl": "https://ebible.org/engwebp/JOS19.htm",
        "hebrewUrl": "https://ebible.org/hboWLC/JOS19.htm",
        "textualVariantReview": ["JOS.19.2", "JOS.19.13", "JOS.19.34", "JOS.19.47"],
    },
    "JOS.20": {
        "expectedVerses": 9,
        "englishUrl": "https://ebible.org/engwebp/JOS20.htm",
        "hebrewUrl": "https://ebible.org/hboWLC/JOS20.htm",
        "textualVariantReview": ["JOS.20.4", "JOS.20.6"],
    },
}
ledger["chapters"].update(entries)
ledger["verifiedOn"] = "2026-08-04"
save(LEDGER, ledger)

manifest = load(MANIFEST)
for chapter in range(16, 21):
    chapter_id = f"JOS.{chapter}"
    if chapter_id not in manifest["draftedChapters"]:
        manifest["draftedChapters"].append(chapter_id)
manifest["progress"].update(
    chaptersDrafted=70,
    versesDrafted=2063,
    chaptersApproved=70,
    chaptersPublished=70,
)
save(MANIFEST, manifest)

audit = AUDIT.read_text(encoding="utf-8").rstrip()
marker = "## Extindere — Iosua 16–20"
if marker not in audit:
    audit += """

## Extindere — Iosua 16–20

- hotarele lui Efraim, Manase și Beniamin sunt păstrate fără modernizarea sau armonizarea artificială a topografiei;
- `mas-oved` este redat prin „muncă silnică”, nu printr-un termen fiscal care ar ascunde constrângerea;
- dreptul fiicelor lui Țelofhad la moștenire este păstrat explicit;
- `sheloshet hannafet` din Iosua 17:11 rămâne „cele trei înălțimi”, cu alternativele textuale documentate;
- descrierea țării la Șilo este consemnată ca document organizat după cetăți, fără transformarea sorților într-o tehnică universală de decizie;
- totalurile cetăților și toponimele dificile din Iosua 19 sunt păstrate chiar când nu pot fi armonizate simplu;
- `go'el haddam` este „răzbunătorul sângelui”, termen juridic și familial, nu o aprobare a răzbunării private;
- cetățile de refugiu disting uciderea neintenționată de omorul deliberat și cer judecată publică înaintea adunării;
- forma mai scurtă a unor tradiții grecești pentru Iosua 20:4–6 este documentată, iar textul principal urmează textul masoretic.
""".rstrip()
AUDIT.write_text(audit + "\n", encoding="utf-8")
