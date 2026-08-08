#!/usr/bin/env python3
"""Normalizează candidatul canonic Osea la Unicode NFC și reface digesturile auditului.

Acest pas rulează după materializarea HOS.1–HOS.14 și înainte de validatorul
Biblia Emanus. Nu schimbă sensul sau textul editorial; normalizează doar forma
Unicode și leagă din nou audit.textDigest de textul efectiv serializat.
"""

from __future__ import annotations

import importlib.util
import json
import unicodedata
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs/data/biblia-emanus"


def fail(message: str) -> None:
    raise SystemExit(f"Osea NFC normalization failed: {message}")


def load_validator():
    path = ROOT / "scripts/check-biblia-emanus.py"
    spec = importlib.util.spec_from_file_location("biblia_emanus_validator", path)
    if spec is None or spec.loader is None:
        fail("nu pot încărca validatorul Biblia Emanus")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def nfc(value: Any) -> Any:
    if isinstance(value, str):
        return unicodedata.normalize("NFC", value)
    if isinstance(value, list):
        return [nfc(item) for item in value]
    if isinstance(value, dict):
        return {nfc(key): nfc(item) for key, item in value.items()}
    return value


def write_json(path: Path, value: dict[str, Any]) -> None:
    serialized = json.dumps(value, ensure_ascii=False, indent=2)
    serialized = unicodedata.normalize("NFC", serialized)
    path.write_text(serialized + "\n", encoding="utf-8")


def main() -> None:
    validator = load_validator()
    changed = 0

    for chapter in range(1, 15):
        path = DATA / f"HOS.{chapter}.json"
        if not path.is_file():
            fail(f"lipsește {path.relative_to(ROOT)}")

        raw = path.read_text(encoding="utf-8")
        try:
            data = json.loads(raw)
        except json.JSONDecodeError as exc:
            fail(f"{path.name}: JSON invalid: {exc}")
        if not isinstance(data, dict):
            fail(f"{path.name}: rădăcina JSON nu este obiect")

        normalized = nfc(data)
        audit = normalized.get("audit")
        if not isinstance(audit, dict):
            fail(f"{path.name}: lipsește auditul")
        audit["textDigest"] = validator.chapter_text_digest(normalized)

        before = raw
        write_json(path, normalized)
        after = path.read_text(encoding="utf-8")
        if unicodedata.normalize("NFC", after) != after:
            fail(f"{path.name}: fișierul a rămas non-NFC după normalizare")
        if before != after:
            changed += 1

    print(f"Osea NFC normalization OK: 14/14 capitole; fișiere rescrise={changed}.")


if __name__ == "__main__":
    main()
