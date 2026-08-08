#!/usr/bin/env python3
"""Split one generic OT fresh-source review packet into one compact JSON file per chapter."""

from __future__ import annotations

import argparse
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REAUDIT_ROOT = ROOT / "docs/biblia-explicata/ot-reaudit"


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--book", required=True)
    args = parser.parse_args()
    code = args.book.upper()

    source = REAUDIT_ROOT / f"{code}-FRESH-SOURCE-REAUDIT.json"
    packet = json.loads(source.read_text(encoding="utf-8"))
    if packet.get("bookId") != code:
        raise SystemExit(f"Book mismatch: {packet.get('bookId')} != {code}")

    out_dir = REAUDIT_ROOT / code
    out_dir.mkdir(parents=True, exist_ok=True)
    for chapter in packet["chapters"]:
        out = {
            "schemaVersion": 1,
            "bookId": code,
            "bookName": packet["bookName"],
            "chapter": chapter["chapter"],
            "status": "fresh-semantic-review-pending",
            "candidateStage": packet["candidateStage"],
            "sourcePacket": str(source.relative_to(ROOT)).replace("\\", "/"),
            "verseCount": chapter["verseCount"],
            "versification": packet["versification"],
            "verses": chapter["verses"],
            "chapterReview": {"status": "pending", "reviewedVerses": 0, "issues": []},
        }
        path = out_dir / f"{int(chapter['chapter']):03d}.json"
        path.write_text(json.dumps(out, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"{code} {chapter['chapter']}: {chapter['verseCount']} verses -> {path}")


if __name__ == "__main__":
    main()
