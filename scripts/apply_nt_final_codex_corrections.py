#!/usr/bin/env python3
from __future__ import annotations

import argparse
import importlib.util
import json
import unicodedata
from pathlib import Path
from types import ModuleType
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs" / "data" / "biblia-emanus"
DEFAULT_LEDGER = ROOT / "docs/biblia-emanus/nt-final-review/nt-final-codex-corrections.json"


def load_validator() -> ModuleType:
    path = ROOT / "scripts" / "check-biblia-emanus.py"
    spec = importlib.util.spec_from_file_location("be_validator_final_fixes", path)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Nu pot încărca {path}")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def write_json(path: Path, value: dict[str, Any]) -> None:
    rendered = json.dumps(value, ensure_ascii=False, indent=2) + "\n"
    path.write_text(unicodedata.normalize("NFC", rendered), encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--ledger", type=Path, default=DEFAULT_LEDGER)
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()

    validator = load_validator()
    ledger = json.loads(args.ledger.read_text(encoding="utf-8"))
    reviewed_on = ledger["reviewedOn"]
    changed: dict[Path, dict[str, Any]] = {}
    known_finals: dict[str, set[str]] = {}
    for item in ledger["corrections"]:
        known_finals.setdefault(item["reference"], set()).add(item["finalText"])

    for correction in ledger["corrections"]:
        book, chapter, verse = correction["reference"].split(".")
        path = DATA / f"{book}.{chapter}.json"
        document = changed.setdefault(path, json.loads(path.read_text(encoding="utf-8")))
        target = next(item for item in document["verses"] if item["number"] == int(verse))
        if target["text"] == correction["finalText"]:
            continue
        if target["text"] == correction["currentText"]:
            target["text"] = correction["finalText"]
            notes = document.setdefault("editorialNotes", [])
            notes.append({
                "verse": int(verse),
                "term": f"revizie finală: {correction['sourceAnchor']}",
                "decision": correction["finalText"],
                "reason": correction["reason"],
                "reviewRequired": True,
                "resolutionStatus": "resolved",
                "resolutionReason": "Corectat și retrimis porții finale verset-cu-verset.",
            })
            continue
        if target["text"] in known_finals[correction["reference"]]:
            continue
        raise RuntimeError(
            f"{correction['reference']}: textul curent nu corespunde ledgerului; "
            "corecția nu este aplicată automat"
        )

    for path, document in changed.items():
        audit = document["audit"]
        audit["completedOn"] = reviewed_on
        audit["reviewAgent"] = {
            "type": "ai",
            "engine": "Codex / GPT-5.6 Sol",
            "runId": f"emanus-nt-final-verse-review-{reviewed_on}-{document['bookId'].lower()}-{document['chapter']}",
            "method": "verse-by-verse-source-and-benchmark-final-gate",
        }
        audit["textDigest"] = validator.chapter_text_digest(document)
        audit["contentDigest"] = validator.chapter_content_digest(document)
        if not args.check:
            write_json(path, document)
        print(f"[nt-final-corrections] {'ar verifica' if args.check else 'actualizat'} {path.name}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
