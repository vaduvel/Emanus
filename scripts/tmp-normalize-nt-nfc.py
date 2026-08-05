#!/usr/bin/env python3
from __future__ import annotations

import re
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs/data/biblia-emanus"
NT_IDS = {
    "MAT", "MRK", "LUK", "JHN", "ACT", "ROM", "1CO", "2CO", "GAL",
    "EPH", "PHP", "COL", "1TH", "2TH", "1TI", "2TI", "TIT", "PHM",
    "HEB", "JAS", "1PE", "2PE", "1JN", "2JN", "3JN", "JUD", "REV",
}
CHAPTER = re.compile(r"^([A-Z0-9]{3})\.([1-9][0-9]*)\.json$")


def main() -> int:
    checked = 0
    changed = []
    for path in sorted(DATA.glob("*.json")):
        match = CHAPTER.match(path.name)
        if not match or match.group(1) not in NT_IDS:
            continue
        checked += 1
        raw = path.read_text(encoding="utf-8")
        normalized = unicodedata.normalize("NFC", raw)
        if normalized != raw:
            path.write_text(normalized, encoding="utf-8")
            changed.append(path.stem)
    print(f"[nt-nfc] checked={checked} normalized={len(changed)} chapters={','.join(changed)}")
    if checked != 260:
        raise RuntimeError(f"expected 260 NT chapters, found {checked}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
