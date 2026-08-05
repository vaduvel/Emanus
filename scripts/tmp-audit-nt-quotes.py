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
CLOSERS = set(PAIRS.values())


def inspect(verses: list[dict]) -> tuple[list[dict], list[dict]]:
    stack: list[dict] = []
    invalid: list[dict] = []
    for verse in verses:
        text = verse["text"]
        for offset, char in enumerate(text):
            if char in PAIRS:
                stack.append({
                    "expected": PAIRS[char],
                    "opening": char,
                    "verse": verse["number"],
                    "offset": offset,
                    "text": text,
                })
            elif char in CLOSERS:
                if not stack or stack[-1]["expected"] != char:
                    invalid.append({
                        "closing": char,
                        "verse": verse["number"],
                        "offset": offset,
                        "expectedAtTop": stack[-1]["expected"] if stack else None,
                        "text": text,
                    })
                else:
                    stack.pop()
    return invalid, stack


def main() -> int:
    issues = []
    checked = 0
    for path in sorted(DATA.glob("*.json")):
        match = CHAPTER.match(path.name)
        if not match or match.group(1) not in NT_IDS:
            continue
        data = json.loads(path.read_text(encoding="utf-8"))
        verses = data.get("verses", [])
        texts = [item["text"] for item in verses]
        if not texts or all(text == "DE TRADUS" for text in texts):
            continue
        checked += 1
        full = " ".join(texts)
        invalid, unclosed = inspect(verses)
        count_mismatch = (
            full.count("„") != full.count("”")
            or full.count("«") != full.count("»")
        )
        if invalid or unclosed or count_mismatch:
            issues.append({
                "chapter": path.stem,
                "outer": [full.count("„"), full.count("”")],
                "inner": [full.count("«"), full.count("»")],
                "invalidClosings": invalid,
                "unclosedOpenings": unclosed,
            })
    print(json.dumps({"checked": checked, "issues": issues}, ensure_ascii=False, indent=2))
    return 1 if issues else 0


if __name__ == "__main__":
    raise SystemExit(main())
