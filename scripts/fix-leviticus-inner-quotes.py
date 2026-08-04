#!/usr/bin/env python3
from __future__ import annotations

import json
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs" / "data" / "biblia-emanus"

changed = []
for path in sorted(DATA.glob("LEV.*.json")):
    data = json.loads(path.read_text(encoding="utf-8"))
    verses = data["verses"]
    full = " ".join(v["text"] for v in verses)

    while full.count("»") > full.count("«"):
        fixed = False
        for verse in reversed(verses):
            pos = verse["text"].rfind("»")
            if pos >= 0:
                verse["text"] = verse["text"][:pos] + verse["text"][pos + 1:]
                fixed = True
                break
        if not fixed:
            raise SystemExit(f"{path.name}: nu pot elimina ghilimeaua interioară în plus")
        full = " ".join(v["text"] for v in verses)

    if full.count("«") > full.count("»"):
        raise SystemExit(f"{path.name}: ghilimea interioară deschisă fără context sigur pentru închidere")

    if full.count("„") == full.count("”") + 1:
        verses[-1]["text"] += "”"
        full = " ".join(v["text"] for v in verses)
    if full.count("„") != full.count("”"):
        raise SystemExit(f"{path.name}: ghilimele românești dezechilibrate")

    raw = unicodedata.normalize("NFC", json.dumps(data, ensure_ascii=False, indent=2) + "\n")
    old = path.read_text(encoding="utf-8")
    if raw != old:
        path.write_text(raw, encoding="utf-8")
        changed.append(path.name)

print("Fișiere corectate:", ", ".join(changed) if changed else "niciunul")
