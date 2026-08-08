#!/usr/bin/env python3
"""Build a fresh verse-by-verse review packet for one still-unpromoted OT book.

The Romanian candidate comes from docs/data/biblia-emanus-candidates. WEBU and
WLC are supplied as freshly downloaded archives. Product versification follows
WEBU. When WLC has the same total verse count but different chapter boundaries,
its references are aligned by absolute verse ordinal and preserved explicitly.
No inherited review/approval flag is copied into the fresh packet.
"""

from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path
from typing import Any

from ot_repair5_common import book_sequences, parse_usfm_zip

ROOT = Path(__file__).resolve().parents[1]
CANDIDATES = ROOT / "docs/data/biblia-emanus-candidates"
OUT_ROOT = ROOT / "docs/biblia-explicata/ot-reaudit"

BOOKS: dict[str, tuple[str, int]] = {
    "JDG": ("Judecători", 21),
    "RUT": ("Rut", 4),
    "1SA": ("1 Samuel", 31),
    "2SA": ("2 Samuel", 24),
    "1KI": ("1 Împărați", 22),
    "2KI": ("2 Împărați", 25),
    "1CH": ("1 Cronici", 29),
    "2CH": ("2 Cronici", 36),
    "EZR": ("Ezra", 10),
    "NEH": ("Neemia", 13),
    "EST": ("Estera", 10),
    "JOB": ("Iov", 42),
    "PSA": ("Psalmii", 150),
    "PRO": ("Proverbele", 31),
    "ECC": ("Eclesiastul", 12),
    "SNG": ("Cântarea Cântărilor", 8),
    "ISA": ("Isaia", 66),
    "JER": ("Ieremia", 52),
    "LAM": ("Plângerile", 5),
    "EZK": ("Ezechiel", 48),
    "DAN": ("Daniel", 12),
}


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def text_digest(chapters: list[dict[str, Any]]) -> str:
    rows: list[str] = []
    for chapter in chapters:
        rows.extend(str(v["candidateRo"]) for v in chapter["verses"])
    return hashlib.sha256("\n".join(rows).encode("utf-8")).hexdigest()


def load_candidate(book: str, expected_chapters: int) -> list[dict[str, Any]]:
    chapters: list[dict[str, Any]] = []
    for chapter in range(1, expected_chapters + 1):
        path = CANDIDATES / f"{book}.{chapter}.json"
        if not path.exists():
            raise SystemExit(f"{book}: missing candidate {path.relative_to(ROOT)}")
        doc = json.loads(path.read_text(encoding="utf-8"))
        if doc.get("bookId") != book:
            raise SystemExit(f"{path.name}: bookId mismatch")
        verses = doc.get("verses", [])
        numbers = [int(v.get("number", 0)) for v in verses]
        if numbers != list(range(1, len(verses) + 1)):
            raise SystemExit(f"{path.name}: non-contiguous candidate verse sequence")
        chapters.append(
            {
                "chapter": chapter,
                "verses": [
                    {
                        "verse": int(v["number"]),
                        "candidateRo": str(v.get("text", "")).strip(),
                    }
                    for v in verses
                ],
            }
        )
    return chapters


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--book", required=True, choices=sorted(BOOKS))
    parser.add_argument("--webu-zip", required=True)
    parser.add_argument("--wlc-zip", required=True)
    args = parser.parse_args()

    code = args.book.upper()
    name, expected_chapters = BOOKS[code]
    webu_path = Path(args.webu_zip)
    wlc_path = Path(args.wlc_zip)
    candidate = load_candidate(code, expected_chapters)

    webu = parse_usfm_zip(webu_path)
    wlc = parse_usfm_zip(wlc_path)
    webu_book = book_sequences(webu).get(code, [])
    wlc_book = book_sequences(wlc).get(code, [])

    candidate_count = sum(len(c["verses"]) for c in candidate)
    if len(webu_book) != candidate_count:
        raise SystemExit(f"{code}: candidate={candidate_count}, current WEBU={len(webu_book)}")
    if len(wlc_book) != candidate_count:
        raise SystemExit(
            f"{code}: candidate={candidate_count}, current WLC={len(wlc_book)}; "
            "explicit versification reconciliation required before semantic review"
        )

    mappings: list[dict[str, str]] = []
    ordinal = 0
    chapter_packets: list[dict[str, Any]] = []
    for chapter in candidate:
        chapter_no = int(chapter["chapter"])
        rows: list[dict[str, Any]] = []
        for item in chapter["verses"]:
            verse_no = int(item["verse"])
            webu_text = webu.get((code, chapter_no, verse_no))
            if webu_text is None:
                raise SystemExit(f"{code} {chapter_no}:{verse_no}: current WEBU reference missing")
            wlc_key, wlc_text = wlc_book[ordinal]
            ordinal += 1
            wlc_ref = f"{wlc_key[1]}:{wlc_key[2]}"
            product_ref = f"{chapter_no}:{verse_no}"
            if wlc_ref != product_ref:
                mappings.append({"productRef": product_ref, "WLCRef": wlc_ref})
            rows.append(
                {
                    "verse": verse_no,
                    "productRef": product_ref,
                    "candidateRo": item["candidateRo"],
                    "WEBU": webu_text,
                    "WLCRef": wlc_ref,
                    "WLC": wlc_text,
                    "review": {
                        "status": "pending",
                        "severity": None,
                        "issue": None,
                        "proposedRo": None,
                    },
                }
            )
        chapter_packets.append(
            {
                "chapter": chapter_no,
                "verseCount": len(rows),
                "verses": rows,
                "chapterReview": {"status": "pending", "reviewedVerses": 0, "issues": []},
            }
        )

    packet = {
        "schemaVersion": 1,
        "bookId": code,
        "bookName": name,
        "translationTarget": "BE",
        "status": "fresh-source-semantic-review-pending",
        "candidateStage": "temporary-editorial",
        "sourcePolicy": {
            "WEBU": "public-domain bridge and product versification",
            "WLC": "Hebrew source authority",
            "inheritedApprovalsAccepted": False,
        },
        "sourceArchives": {
            "WEBU": {"path": str(webu_path), "sha256": sha256(webu_path)},
            "WLC": {"path": str(wlc_path), "sha256": sha256(wlc_path)},
        },
        "candidateDigest": text_digest(candidate),
        "totals": {
            "chapters": expected_chapters,
            "verses": candidate_count,
            "WEBUVerses": len(webu_book),
            "WLCVerses": len(wlc_book),
        },
        "versification": {
            "productBase": "WEBU",
            "WLCAlignment": "identity" if not mappings else "absolute-verse-ordinal-across-book",
            "mappedRefs": len(mappings),
            "approval": "identity" if not mappings else "manual-boundary-review-required",
            "mappings": mappings,
        },
        "chapters": chapter_packets,
    }

    OUT_ROOT.mkdir(parents=True, exist_ok=True)
    out = OUT_ROOT / f"{code}-FRESH-SOURCE-REAUDIT.json"
    out.write_text(json.dumps(packet, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(
        f"{code}: fresh packet {expected_chapters} chapters / {candidate_count} verses; "
        f"WLC remaps={len(mappings)}; candidateDigest={packet['candidateDigest']}"
    )


if __name__ == "__main__":
    main()
