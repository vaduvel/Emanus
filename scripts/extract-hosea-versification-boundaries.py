#!/usr/bin/env python3
"""Extrage trei rapoarte compacte pentru review-ul manual al versificației Osea."""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "docs/biblia-explicata/minor-prophets-reaudit/HOS-FRESH-SOURCE-REAUDIT.json"
OUT_DIR = ROOT / "docs/biblia-explicata/minor-prophets-reaudit"

GROUPS = {
    "1-2": {"1:9", "1:10", "1:11", "2:1", "2:2", "2:23", "3:1"},
    "11-12": {"11:11", "11:12", "12:1", "12:2", "12:14", "13:1"},
    "13-14": {"13:15", "13:16", "14:1", "14:2", "14:9"},
}


def row_for(verse: dict) -> dict:
    return {
        "productRef": verse["productRef"],
        "candidateRo": verse["candidateRo"],
        "WEBURef": verse["WEBU"]["ref"],
        "WEBUText": verse["WEBU"]["text"],
        "WLCRef": verse["WLC"]["ref"],
        "WLCText": verse["WLC"]["text"],
    }


def main() -> None:
    packet = json.loads(SOURCE.read_text(encoding="utf-8"))
    by_ref = {
        verse["productRef"]: verse
        for chapter in packet["chapters"]
        for verse in chapter["verses"]
    }
    for label, wanted in GROUPS.items():
        missing = sorted(wanted - set(by_ref))
        if missing:
            raise SystemExit(f"Osea {label}: lipsesc refs {missing}")
        rows = [row_for(by_ref[ref]) for ref in wanted]
        rows.sort(key=lambda row: tuple(map(int, row["productRef"].split(":"))))
        out = OUT_DIR / f"HOS-VERSIFICATION-{label}.json"
        out.write_text(
            json.dumps(
                {
                    "bookId": "HOS",
                    "status": "manual-versification-review",
                    "sourcePacket": str(SOURCE.relative_to(ROOT)).replace("\\", "/"),
                    "boundary": label,
                    "rows": rows,
                },
                ensure_ascii=False,
                indent=2,
            )
            + "\n",
            encoding="utf-8",
        )
        print(f"Osea boundary {label}: {len(rows)} checkpoints -> {out}")


if __name__ == "__main__":
    main()
