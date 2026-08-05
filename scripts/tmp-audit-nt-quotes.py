#!/usr/bin/env python3
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs/data/biblia-emanus"
NT_IDS = {
    "MAT", "MRK", "LUK", "JHN", "ACT", "ROM", "1CO", "2CO", "GAL",
    "EPH", "PHP", "COL", "1TH", "2TH", "1TI", "2TI", "TIT", "PHM",
    "HEB", "JAS", "1PE", "2PE", "1JN", "2JN", "3JN", "JUD", "REV",
}
CHAPTER = re.compile(r"^([A-Z0-9]{3})\.([1-9][0-9]*)\.json$")
PAIRS = {"„": "”", "«": "»"}


def inspect(text: str) -> tuple[int, list[str], bool]:
    stack: list[str] = []
    negative = False
    for char in text:
        if char in PAIRS:
            stack.append(PAIRS[char])
        elif char in {"”", "»"}:
            if not stack or stack[-1] != char:
                negative = True
            else:
                stack.pop()
    return len(stack), stack, negative


def main() -> int:
    issues = []
    checked = 0
    for path in sorted(DATA.glob("*.json")):
        match = CHAPTER.match(path.name)
        if not match or match.group(1) not in NT_IDS:
            continue
        data = json.loads(path.read_text(encoding="utf-8"))
        texts = [item["text"] for item in data.get("verses", [])]
        if not texts or all(text == "DE TRADUS" for text in texts):
            continue
        checked += 1
        full = " ".join(texts)
        depth, stack, negative = inspect(full)
        if depth or negative or full.count("„") != full.count("”") or full.count("«") != full.count("»"):
            quote_verses = [
                item["number"] for item in data["verses"]
                if any(char in item["text"] for char in "„”«»")
            ]
            issues.append({
                "chapter": path.stem,
                "outer": [full.count("„"), full.count("”")],
                "inner": [full.count("«"), full.count("»")],
                "unclosed": stack,
                "invalidClosingOrder": negative,
                "quoteVerseRange": [min(quote_verses), max(quote_verses)] if quote_verses else [],
                "lastVerse": data["verses"][-1]["text"],
            })
    print(json.dumps({"checked": checked, "issues": issues}, ensure_ascii=False, indent=2))
    return 1 if issues else 0


if __name__ == "__main__":
    raise SystemExit(main())
