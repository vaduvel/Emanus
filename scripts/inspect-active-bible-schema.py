#!/usr/bin/env python3
from __future__ import annotations

import json
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs" / "data" / "biblia-emanus"
OUT = ROOT / "docs" / "biblia-emanus" / "OT-REPAIR5-ACTIVE-SCHEMA.json"


def load(name: str) -> dict[str, Any]:
    return json.loads((DATA / name).read_text(encoding="utf-8"))


def sample_dict(value: Any) -> Any:
    if isinstance(value, dict):
        return {k: sample_dict(v) for k, v in value.items()}
    if isinstance(value, list):
        return [sample_dict(value[0])] if value else []
    return value


def main() -> None:
    manifest = load("manifest.json")
    ledger = load("source-ledger.json")
    lock = load("source-lock.json")
    chapter = load("JOS.1.json")
    payload = {
        "manifestKeys": list(manifest.keys()),
        "manifestProgress": manifest.get("progress"),
        "manifestNewTestament": manifest.get("newTestament"),
        "ledgerKeys": list(ledger.keys()),
        "ledgerPolicy": ledger.get("policy"),
        "ledgerSampleGEN1": ledger.get("chapters", {}).get("GEN.1"),
        "ledgerSampleJOS1": ledger.get("chapters", {}).get("JOS.1"),
        "sourceLockKeys": list(lock.keys()),
        "sourceLockPolicy": lock.get("policy"),
        "sourceLockFiles": lock.get("files"),
        "sourceLockBookJOS": lock.get("books", {}).get("JOS"),
        "sourceLockRules": lock.get("versificationRules"),
        "chapterShape": sample_dict(chapter),
    }
    OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(payload, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
