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


def main() -> int:
    ledger = json.loads((DATA / "source-ledger.json").read_text(encoding="utf-8"))["chapters"]
    invalid = []
    missing = []
    checked = 0
    for path in sorted(DATA.glob("*.json")):
        match = CHAPTER.match(path.name)
        if not match or match.group(1) not in NT_IDS:
            continue
        checked += 1
        chapter_id = path.stem
        data = json.loads(path.read_text(encoding="utf-8"))
        expected = set(ledger[chapter_id].get("referenceNoteNumbers", []))
        notes = data.get("referenceNotes", [])
        actual = {
            note.get("number")
            for note in notes
            if isinstance(note, dict) and isinstance(note.get("number"), int)
        }
        editorial_verses = {
            note.get("verse")
            for note in data.get("editorialNotes", [])
            if isinstance(note, dict) and isinstance(note.get("verse"), int)
        }
        for index, note in enumerate(notes, start=1):
            number = note.get("number") if isinstance(note, dict) else None
            if number not in expected:
                invalid.append({
                    "chapter": chapter_id,
                    "index": index,
                    "number": number,
                    "status": note.get("status") if isinstance(note, dict) else None,
                    "duplicatedInEditorialNotes": number in editorial_verses,
                    "reason": note.get("reason") if isinstance(note, dict) else None,
                })
        for number in sorted(expected - actual):
            missing.append({"chapter": chapter_id, "number": number})
    print(json.dumps({"checked": checked, "invalid": invalid, "missing": missing}, ensure_ascii=False, indent=2))
    return 1 if invalid or missing else 0


if __name__ == "__main__":
    raise SystemExit(main())
