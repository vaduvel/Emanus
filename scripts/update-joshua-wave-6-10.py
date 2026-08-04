#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path("docs/data/biblia-emanus")
EXPECTED = {6: 27, 7: 26, 8: 35, 9: 27, 10: 43}
VARIANTS = {
    6: [],
    7: [],
    8: ["JOS.8.13", "JOS.8.17", "JOS.8.30"],
    9: ["JOS.9.4"],
    10: ["JOS.10.15"],
}

for chapter, expected in EXPECTED.items():
    path = ROOT / f"JOS.{chapter}.json"
    data = json.loads(path.read_text(encoding="utf-8"))
    verses = data.get("verses", [])
    if len(verses) != expected:
        raise SystemExit(f"JOS.{chapter}: expected {expected} verses, got {len(verses)}")
    if [verse.get("number") for verse in verses] != list(range(1, expected + 1)):
        raise SystemExit(f"JOS.{chapter}: verse numbering is not continuous")
    if data.get("status") != "published" or data.get("public") is not True:
        raise SystemExit(f"JOS.{chapter}: chapter is not published")

ledger_path = ROOT / "source-ledger.json"
ledger = json.loads(ledger_path.read_text(encoding="utf-8"))
for chapter, expected in EXPECTED.items():
    record = {
        "expectedVerses": expected,
        "englishUrl": f"https://ebible.org/engwebp/JOS{chapter:02d}.htm",
        "hebrewUrl": f"https://ebible.org/hboWLC/JOS{chapter:02d}.htm",
    }
    if VARIANTS[chapter]:
        record["textualVariantReview"] = VARIANTS[chapter]
    ledger["chapters"][f"JOS.{chapter}"] = record
ledger["verifiedOn"] = "2026-08-04"
ledger_path.write_text(json.dumps(ledger, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

manifest_path = ROOT / "manifest.json"
manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
for chapter in EXPECTED:
    chapter_id = f"JOS.{chapter}"
    if chapter_id not in manifest["draftedChapters"]:
        manifest["draftedChapters"].append(chapter_id)
manifest["progress"]["chaptersDrafted"] = 60
manifest["progress"]["versesDrafted"] = 1789
manifest["progress"]["chaptersApproved"] = 60
manifest["progress"]["chaptersPublished"] = 60
manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
