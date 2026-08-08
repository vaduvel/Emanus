#!/usr/bin/env python3
"""Build a fresh verse-by-verse review packet for one still-unpromoted OT book.

The Romanian candidate comes from docs/data/biblia-emanus-candidates. WEBU and
WLC are supplied as freshly downloaded archives. Product versification follows
WEBU. When WLC has the same total verse count but different chapter boundaries,
its references are aligned by absolute verse ordinal and preserved explicitly.
For books whose Masoretic versification splits or moves verses relative to
WEBU, an explicit book map is required and every WLC verse must be consumed
exactly once. No inherited review/approval flag is copied into the fresh packet.
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


def explicit_wlc_refs(book: str, chapter: int, verse: int) -> list[tuple[int, int]] | None:
    """Return explicit WLC refs for one WEBU/product ref when a book needs it.

    1 Samuel follows the common Christian/WEBU numbering in the product while
    the Masoretic/WLC numbering has two documented differences:

    * WEBU 20:42 includes material numbered WLC 20:42 and 21:1; therefore
      WEBU 21:1-15 correspond to WLC 21:2-16.
    * WEBU 23:29 is WLC 24:1; therefore WEBU 24:1-22 correspond to WLC 24:2-23.

    Returning None means the book has no explicit map and should use the
    generic identity/ordinal path.
    """
    if book != "1SA":
        return None
    if chapter == 20 and verse == 42:
        return [(20, 42), (21, 1)]
    if chapter == 21:
        return [(21, verse + 1)]
    if chapter == 23 and verse == 29:
        return [(24, 1)]
    if chapter == 24:
        return [(24, verse + 1)]
    return [(chapter, verse)]


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

    uses_explicit_map = explicit_wlc_refs(code, 1, 1) is not None
    if not uses_explicit_map and len(wlc_book) != candidate_count:
        raise SystemExit(
            f"{code}: candidate={candidate_count}, current WLC={len(wlc_book)}; "
            "explicit versification reconciliation required before semantic review"
        )

    mappings: list[dict[str, str]] = []
    ordinal = 0
    used_wlc_refs: list[tuple[str, int, int]] = []
    chapter_packets: list[dict[str, Any]] = []
    for chapter in candidate:
        chapter_no = int(chapter["chapter"])
        rows: list[dict[str, Any]] = []
        for item in chapter["verses"]:
            verse_no = int(item["verse"])
            webu_text = webu.get((code, chapter_no, verse_no))
            if webu_text is None:
                raise SystemExit(f"{code} {chapter_no}:{verse_no}: current WEBU reference missing")

            product_ref = f"{chapter_no}:{verse_no}"
            explicit_refs = explicit_wlc_refs(code, chapter_no, verse_no)
            if explicit_refs is not None:
                wlc_keys = [(code, ch, v) for ch, v in explicit_refs]
                missing = [key for key in wlc_keys if key not in wlc]
                if missing:
                    raise SystemExit(f"{code} {product_ref}: explicit WLC refs missing: {missing}")
                wlc_text = " ".join(str(wlc[key]).strip() for key in wlc_keys if str(wlc[key]).strip())
                wlc_ref = "+".join(f"{key[1]}:{key[2]}" for key in wlc_keys)
                used_wlc_refs.extend(wlc_keys)
            else:
                wlc_key, wlc_text = wlc_book[ordinal]
                ordinal += 1
                wlc_ref = f"{wlc_key[1]}:{wlc_key[2]}"
                used_wlc_refs.append(wlc_key)

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

    expected_wlc_refs = {key for key, _text in wlc_book}
    used_set = set(used_wlc_refs)
    if len(used_wlc_refs) != len(used_set):
        duplicates = sorted({key for key in used_wlc_refs if used_wlc_refs.count(key) > 1})
        raise SystemExit(f"{code}: WLC mapping reuses refs: {duplicates}")
    if used_set != expected_wlc_refs:
        missing = sorted(expected_wlc_refs - used_set)
        extra = sorted(used_set - expected_wlc_refs)
        raise SystemExit(f"{code}: WLC mapping is not exhaustive; missing={missing}, extra={extra}")

    if uses_explicit_map:
        alignment = "explicit-book-versification-map"
        approval = "explicit-map-source-verified"
    elif mappings:
        alignment = "absolute-verse-ordinal-across-book"
        approval = "manual-boundary-review-required"
    else:
        alignment = "identity"
        approval = "identity"

    packet = {
        "schemaVersion": 2,
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
            "WLCRefsConsumed": len(used_wlc_refs),
        },
        "versification": {
            "productBase": "WEBU",
            "WLCAlignment": alignment,
            "mappedRefs": len(mappings),
            "approval": approval,
            "mappings": mappings,
        },
        "chapters": chapter_packets,
    }

    OUT_ROOT.mkdir(parents=True, exist_ok=True)
    out = OUT_ROOT / f"{code}-FRESH-SOURCE-REAUDIT.json"
    out.write_text(json.dumps(packet, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(
        f"{code}: fresh packet {expected_chapters} chapters / {candidate_count} verses; "
        f"WLC source verses={len(wlc_book)}; WLC refs consumed={len(used_wlc_refs)}; "
        f"mapped product refs={len(mappings)}; candidateDigest={packet['candidateDigest']}"
    )


if __name__ == "__main__":
    main()
