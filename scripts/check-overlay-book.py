#!/usr/bin/env python3
from __future__ import annotations

import argparse
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--file", required=True)
    parser.add_argument("--chapters", required=True, type=int)
    parser.add_argument("--book-id", required=True)
    parser.add_argument("--transcript", required=True)
    parser.add_argument("--anchor", action="append", default=[])
    args = parser.parse_args()

    path = ROOT / args.file
    transcript_path = ROOT / args.transcript
    if not path.exists():
        raise SystemExit(f"lipsește overlay-ul: {args.file}")
    if not transcript_path.exists():
        raise SystemExit(f"lipsește transcriptul: {args.transcript}")

    content = path.read_text(encoding="utf-8")
    transcript = transcript_path.read_text(encoding="utf-8").lower()
    if f'bibleEmanusBookId: "{args.book_id}"' not in content:
        raise SystemExit(f"lipsește bookId Biblia Emanus: {args.book_id}")
    if f", {args.chapters}, focused)" not in content and f", {args.chapters}," not in content:
        if f", {args.chapters})" not in content:
            raise SystemExit(f"nu se poate confirma numărul de capitole: {args.chapters}")
    if 'status: "in_review"' not in content:
        raise SystemExit("overlay-ul nu este in_review")
    for anchor in args.anchor:
        if anchor.lower() not in transcript:
            raise SystemExit(f"lipsește ancora Poonen: {anchor}")
    focused = len(re.findall(r"\n\s{2}(\d+): \{", content))
    print(f"Overlay OK: {args.book_id}, {args.chapters} capitole structurale, {focused} capitole focalizate din transcript.")


if __name__ == "__main__":
    main()
