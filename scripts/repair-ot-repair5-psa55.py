#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PATH = ROOT / "docs" / "data" / "biblia-emanus-candidates" / "PSA.55.json"


def digest(verses: list[dict]) -> str:
    return hashlib.sha256("\n".join(str(v.get("text", "")) for v in verses).encode("utf-8")).hexdigest()


def main() -> None:
    doc = json.loads(PATH.read_text(encoding="utf-8"))
    verse = next(v for v in doc["verses"] if int(v["number"]) == 20)
    old = str(verse["text"])
    verse["text"] = "El își întinde mâinile împotriva celor care trăiau în pace cu el și își încalcă legământul."
    notes = [n for n in doc.get("editorialNotes", []) if n.get("term") != "repair5-number-agreement"]
    notes.append({
        "verse": 20,
        "term": "repair5-number-agreement",
        "decision": "Subiectul ebraic și lectura WEBBE sunt la singular; pluralul moștenit schimba referentul.",
        "previousTextDigest": hashlib.sha256(old.encode("utf-8")).hexdigest(),
        "resolutionStatus": "resolved"
    })
    doc["editorialNotes"] = notes
    doc.setdefault("audit", {})["textDigest"] = digest(doc["verses"])
    PATH.write_text(json.dumps(doc, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
