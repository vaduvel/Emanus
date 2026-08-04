#!/usr/bin/env python3
from __future__ import annotations
import json
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs" / "data" / "biblia-emanus"

for path in sorted(DATA.glob("LEV.*.json")):
    data = json.loads(path.read_text(encoding="utf-8"))
    verses = data["verses"]
    full = " ".join(v["text"] for v in verses)
    opens, closes = full.count("„"), full.count("”")
    if opens == closes + 1:
        verses[-1]["text"] += "”"
    elif closes == opens + 1 and verses[-1]["text"].endswith("”"):
        verses[-1]["text"] = verses[-1]["text"][:-1]
    elif opens != closes:
        raise SystemExit(f"{path.name}: dezechilibru complex {opens}/{closes}")
    for verse in verses:
        verse["text"] = verse["text"].replace("DOMNULui", "DOMNULUI").replace("DOMNULUi", "DOMNULUI")
        if any(token in verse["text"] for token in ["The LORD", "the LORD", " (text revizuit", " să pleceing"]):
            raise SystemExit(f"{path.name}:{verse['number']}: contaminare engleză")
    raw = json.dumps(data, ensure_ascii=False, indent=2) + "\n"
    path.write_text(unicodedata.normalize("NFC", raw), encoding="utf-8")
print("Ghilimelele și contaminarea Leviticului au fost verificate.")
