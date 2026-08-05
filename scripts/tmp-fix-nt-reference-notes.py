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


def write(path: Path, data: dict) -> None:
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main() -> int:
    ledger = json.loads((DATA / "source-ledger.json").read_text(encoding="utf-8"))["chapters"]
    removed = 0
    created = 0
    touched = []
    for path in sorted(DATA.glob("*.json")):
        match = CHAPTER.match(path.name)
        if not match or match.group(1) not in NT_IDS:
            continue
        chapter_id = path.stem
        data = json.loads(path.read_text(encoding="utf-8"))
        expected = set(ledger[chapter_id].get("referenceNoteNumbers", []))
        reference_notes = data.get("referenceNotes", [])
        valid_reference_notes = []
        editorial_notes = data.setdefault("editorialNotes", [])
        editorial_verses = {
            note.get("verse")
            for note in editorial_notes
            if isinstance(note, dict) and isinstance(note.get("verse"), int)
        }
        changed = False
        for note in reference_notes:
            number = note.get("number") if isinstance(note, dict) else None
            if number in expected:
                valid_reference_notes.append(note)
                continue
            if not isinstance(number, int):
                raise RuntimeError(f"{chapter_id}: invalid reference note without numeric reference")
            removed += 1
            changed = True
            if number in editorial_verses:
                continue
            reason = str(note.get("reason", "")).strip()
            status = str(note.get("status", "textual-variant")).strip()
            traditional = str(note.get("traditionalReading", "")).strip()
            term = (
                "segmentare de versificație SBLGNT / numerotare tradițională"
                if "versification" in status or "segmentation" in status
                else "variantă textuală SBLGNT / Textus Receptus"
            )
            editorial = {
                "verse": number,
                "term": term,
                "decision": "Textul principal urmează SBLGNT; lectura sau segmentarea tradițională rămâne documentată editorial.",
                "reason": reason or "Diferența trebuie revizuită în aparatul critic înainte de publicare.",
                "reviewRequired": True,
                "resolutionStatus": "pending",
            }
            if traditional:
                editorial["alternatives"] = [traditional]
            editorial_notes.append(editorial)
            editorial_verses.add(number)
            created += 1
        if changed:
            data["referenceNotes"] = valid_reference_notes
            editorial_notes.sort(key=lambda item: (item.get("verse", 0), item.get("term", "")))
            write(path, data)
            touched.append(chapter_id)
    print(
        f"[nt-reference-notes] removed={removed} createdEditorial={created} "
        f"chapters={','.join(touched)}"
    )
    if removed != 20:
        raise RuntimeError(f"expected 20 invalid reference notes, found {removed}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
