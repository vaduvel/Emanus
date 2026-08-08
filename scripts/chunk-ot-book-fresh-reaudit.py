#!/usr/bin/env python3
"""Create compact read-only review chunks from a committed OT fresh-source packet.

Chunks intentionally omit the raw WLC text to keep human/AI screening readable.
The full WLC text remains preserved in the source packet and can be reopened for
any suspicious verse; each compact row keeps the exact WLC reference.
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REAUDIT_ROOT = ROOT / "docs/biblia-explicata/ot-reaudit"


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--book", required=True)
    parser.add_argument("--size", type=int, default=12)
    args = parser.parse_args()
    if args.size < 1:
        raise SystemExit("chunk size must be positive")
    code = args.book.upper()
    packet_path = REAUDIT_ROOT / f"{code}-FRESH-SOURCE-REAUDIT.json"
    packet = json.loads(packet_path.read_text(encoding="utf-8"))
    out_root = REAUDIT_ROOT / code / "chunks"
    out_root.mkdir(parents=True, exist_ok=True)

    count = 0
    for chapter in packet["chapters"]:
        chapter_no = int(chapter["chapter"])
        verses = chapter["verses"]
        for index in range(0, len(verses), args.size):
            rows = verses[index : index + args.size]
            first = int(rows[0]["verse"])
            last = int(rows[-1]["verse"])
            out = {
                "schemaVersion": 2,
                "bookId": code,
                "bookName": packet["bookName"],
                "chapter": chapter_no,
                "range": f"{chapter_no}:{first}-{last}",
                "sourcePacket": str(packet_path.relative_to(ROOT)).replace("\\", "/"),
                "rawWLCStoredInSourcePacket": True,
                "rows": [
                    {
                        "verse": row["verse"],
                        "candidateRo": row["candidateRo"],
                        "WEBU": row["WEBU"],
                        "WLCRef": row["WLCRef"],
                    }
                    for row in rows
                ],
            }
            path = out_root / f"{chapter_no:03d}-{first:03d}-{last:03d}.json"
            path.write_text(json.dumps(out, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
            count += 1
    print(f"{code}: {count} compact review chunks")


if __name__ == "__main__":
    main()
