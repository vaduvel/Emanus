#!/usr/bin/env python3
"""Extrage un raport compact pentru review-ul manual al versificației Osea."""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "docs/biblia-explicata/minor-prophets-reaudit/HOS-FRESH-SOURCE-REAUDIT.json"
OUT = ROOT / "docs/biblia-explicata/minor-prophets-reaudit/HOS-VERSIFICATION-BOUNDARIES.json"

WANTED = {
    "1:9", "1:10", "1:11", "2:1", "2:2",
    "11:11", "11:12", "12:1", "12:2",
    "13:15", "13:16", "14:1", "14:2",
}


def main() -> None:
    packet = json.loads(SOURCE.read_text(encoding="utf-8"))
    rows = []
    for chapter in packet["chapters"]:
        for verse in chapter["verses"]:
            if verse["productRef"] not in WANTED:
                continue
            rows.append(
                {
                    "productRef": verse["productRef"],
                    "candidateRo": verse["candidateRo"],
                    "WEBURef": verse["WEBU"]["ref"],
                    "WEBUText": verse["WEBU"]["text"],
                    "WLCRef": verse["WLC"]["ref"],
                    "WLCText": verse["WLC"]["text"],
                }
            )
    if {row["productRef"] for row in rows} != WANTED:
        missing = sorted(WANTED - {row["productRef"] for row in rows})
        raise SystemExit(f"Lipsesc ferestre Osea: {missing}")
    rows.sort(key=lambda row: tuple(map(int, row["productRef"].split(":"))))
    report = {
        "bookId": "HOS",
        "status": "manual-versification-review",
        "sourcePacket": str(SOURCE.relative_to(ROOT)).replace("\\", "/"),
        "reviewTargets": ["1→2", "11→12", "13→14"],
        "rows": rows,
    }
    OUT.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Osea boundary report: {len(rows)} rows -> {OUT}")


if __name__ == "__main__":
    main()
