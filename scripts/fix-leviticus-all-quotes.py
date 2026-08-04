#!/usr/bin/env python3
from __future__ import annotations

import json
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs" / "data" / "biblia-emanus"
changed: list[str] = []

for path in sorted(DATA.glob("LEV.*.json")):
    data = json.loads(path.read_text(encoding="utf-8"))
    verses = data["verses"]

    def full_text() -> str:
        return " ".join(verse["text"] for verse in verses)

    text = full_text()

    # Remove only surplus inner closing quotes, starting with the final occurrence.
    while text.count("»") > text.count("«"):
        for verse in reversed(verses):
            pos = verse["text"].rfind("»")
            if pos >= 0:
                verse["text"] = verse["text"][:pos] + verse["text"][pos + 1:]
                break
        text = full_text()

    # Close a genuinely unclosed inner quotation at chapter end, before the final outer quote.
    while text.count("«") > text.count("»"):
        last = verses[-1]["text"]
        if last.endswith("”"):
            verses[-1]["text"] = last[:-1] + "»”"
        else:
            verses[-1]["text"] = last + "»"
        text = full_text()

    # Balance Romanian outer quotation marks at chapter level.
    while text.count("”") > text.count("„"):
        for verse in reversed(verses):
            pos = verse["text"].rfind("”")
            if pos >= 0:
                verse["text"] = verse["text"][:pos] + verse["text"][pos + 1:]
                break
        text = full_text()

    while text.count("„") > text.count("”"):
        verses[-1]["text"] += "”"
        text = full_text()

    if text.count("„") != text.count("”") or text.count("«") != text.count("»"):
        raise SystemExit(f"{path.name}: ghilimele încă dezechilibrate")

    raw = unicodedata.normalize("NFC", json.dumps(data, ensure_ascii=False, indent=2) + "\n")
    old = path.read_text(encoding="utf-8")
    if raw != old:
        path.write_text(raw, encoding="utf-8")
        changed.append(path.name)

print("Fișiere corectate:", ", ".join(changed) if changed else "niciunul")
