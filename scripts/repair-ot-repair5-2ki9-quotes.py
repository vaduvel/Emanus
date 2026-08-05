#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PATH = ROOT / "docs" / "data" / "biblia-emanus-candidates" / "2KI.9.json"


def main() -> None:
    doc = json.loads(PATH.read_text(encoding="utf-8"))
    verse = next(v for v in doc["verses"] if int(v["number"]) == 10)
    verse["text"] = "„Câinii o vor mânca pe Izabela pe ogorul din Izreel și nu va fi nimeni care s-o îngroape.” Apoi tânărul a deschis ușa și a fugit."
    notes = [n for n in doc.get("editorialNotes", []) if n.get("term") != "repair5-atomic-quotation"]
    notes.append({
        "verse": 10,
        "term": "repair5-atomic-quotation",
        "decision": "Citatul profetic a fost făcut autonom și echilibrat în fișierul versetului, fără schimbarea sensului.",
        "resolutionStatus": "resolved"
    })
    doc["editorialNotes"] = notes
    raw = "\n".join(str(v.get("text", "")) for v in doc["verses"])
    doc.setdefault("audit", {})["textDigest"] = hashlib.sha256(raw.encode("utf-8")).hexdigest()
    PATH.write_text(json.dumps(doc, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
