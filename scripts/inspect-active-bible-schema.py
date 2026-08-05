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


def main() -> None:
    manifest = load("manifest.json")
    ledger = load("source-ledger.json")
    lock = load("source-lock.json")
    jos = load("JOS.1.json")
    jos_book = lock["books"]["JOS"]
    ids = [jos_book["baseLockId"], jos_book["originalLockId"], *jos_book.get("benchmarkLockIds", [])]
    payload = {
        "manifestWithoutDraftedChapters": {k: v for k, v in manifest.items() if k != "draftedChapters"},
        "manifestDraftedChapterCount": len(manifest.get("draftedChapters", [])),
        "ledgerTop": {k: v for k, v in ledger.items() if k != "chapters"},
        "ledgerJOS1": ledger["chapters"]["JOS.1"],
        "lockTopWithoutCollections": {
            k: v for k, v in lock.items()
            if k not in {"files", "books", "versificationRules", "artifacts"}
        },
        "lockSnapshots": lock.get("snapshots"),
        "lockArtifacts": lock.get("artifacts"),
        "lockBookJOS": jos_book,
        "lockFilesJOS": {lock_id: lock["files"][lock_id] for lock_id in ids},
        "lockRulesJOS": [r for r in lock.get("versificationRules", []) if r.get("bookId") == "JOS"],
        "chapterJOS1": jos,
    }
    OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(payload, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
