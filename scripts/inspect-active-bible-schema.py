#!/usr/bin/env python3
from __future__ import annotations

import json
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs" / "data" / "biblia-emanus"
OUT = ROOT / "docs" / "biblia-emanus" / "schema-templates"


def load(name: str) -> dict[str, Any]:
    return json.loads((DATA / name).read_text(encoding="utf-8"))


def write(name: str, value: Any) -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / name).write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main() -> None:
    manifest = load("manifest.json")
    ledger = load("source-ledger.json")
    lock = load("source-lock.json")
    jos = load("JOS.1.json")
    jos_book = lock["books"]["JOS"]
    ids = [jos_book["baseLockId"], jos_book["originalLockId"], *jos_book.get("benchmarkLockIds", [])]

    write("manifest-top.json", {k: v for k, v in manifest.items() if k != "draftedChapters"})
    write("ledger-top.json", {k: v for k, v in ledger.items() if k != "chapters"})
    write("ledger-jos1.json", ledger["chapters"]["JOS.1"])
    write("source-lock-top.json", {
        k: v for k, v in lock.items()
        if k not in {"files", "books", "versificationRules", "artifacts"}
    })
    write("source-lock-snapshots.json", lock.get("snapshots"))
    write("source-lock-artifacts.json", lock.get("artifacts"))
    write("source-lock-jos-book.json", jos_book)
    write("source-lock-jos-files.json", {lock_id: lock["files"][lock_id] for lock_id in ids})
    write("source-lock-jos-rules.json", [r for r in lock.get("versificationRules", []) if r.get("bookId") == "JOS"])
    write("chapter-jos1.json", jos)
    print(f"Wrote compact templates to {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
