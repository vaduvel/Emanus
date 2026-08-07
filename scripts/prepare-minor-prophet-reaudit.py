#!/usr/bin/env python3
"""Construiește un pachet de re-audit sursă-verset pentru un profet mic.

Candidatul românesc și WEBU folosesc versificația de produs. WLC poate muta
versete peste granițe de capitol (de ex. Osea). De aceea WLC este aliniat prin
ordinea absolută a versetelor în carte, iar ref-ul masoretic real este păstrat
explicit pentru fiecare rând. Scriptul nu aprobă și nu modifică traducerea.
"""

from __future__ import annotations

import argparse
import ast
import hashlib
import json
import re
import zipfile
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LOCK_PATH = ROOT / "docs/data/biblia-emanus/minor-prophets-source-lock.json"
OUT_ROOT = ROOT / "docs/biblia-explicata/minor-prophets-reaudit"
GENERATED_ROOT = ROOT / "packages/shared/src/bible/generated/vtCanonicalText"

BOOK_FILES = {
    "HOS": ("osea", 14),
    "JOL": ("ioel", 3),
    "AMO": ("amos", 9),
    "OBA": ("obadia", 1),
    "JON": ("iona", 4),
    "MIC": ("mica", 7),
    "NAM": ("naum", 3),
    "HAB": ("habacuc", 3),
    "ZEP": ("tefania", 3),
    "HAG": ("hagai", 2),
    "ZEC": ("zaharia", 14),
    "MAL": ("maleahi", 4),
}

TS_ARRAY = re.compile(r"^\s*(\d+): \[$")
TS_STRING = re.compile(r"^\s*(\"(?:\\.|[^\"\\])*\"),$")
CHAPTER_MARKER = re.compile(r"^\\c\s+(\d+)\b")
VERSE_MARKER = re.compile(r"^\\v\s+(\d+)(?:[-–](\d+))?\s*(.*)$")
USFM_MARKER = re.compile(r"\\[a-zA-Z0-9+]+\*?(?:\s+)?")
WORD_PAYLOAD = re.compile(r"\\w\s+([^|\\]+)(?:\|[^\\]*)?\\w\*")
NOTE_BLOCK = re.compile(r"\\(?:f|x)\s.*?\\(?:f|x)\*", re.DOTALL)
ATTRIBUTE_BLOCK = re.compile(r"\|[^\\]+")
STRONG = re.compile(r'strong="(H\d+)"')


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def parse_generated(path: Path) -> dict[int, list[str]]:
    chapters: dict[int, list[str]] = {}
    current: int | None = None
    for raw_line in path.read_text(encoding="utf-8").splitlines():
        start = TS_ARRAY.match(raw_line)
        if start:
            current = int(start.group(1))
            chapters[current] = []
            continue
        if current is not None and raw_line.strip() == "],":
            current = None
            continue
        if current is not None:
            match = TS_STRING.match(raw_line)
            if not match:
                raise SystemExit(f"{path}: linie TS neașteptată în capitolul {current}: {raw_line!r}")
            chapters[current].append(ast.literal_eval(match.group(1)))
    return chapters


def normalize_usfm_text(raw: str) -> str:
    text = raw.strip()
    text = NOTE_BLOCK.sub(" ", text)
    while WORD_PAYLOAD.search(text):
        text = WORD_PAYLOAD.sub(lambda m: m.group(1), text)
    text = ATTRIBUTE_BLOCK.sub("", text)
    text = USFM_MARKER.sub(" ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def parse_usfm(data: bytes) -> dict[int, dict[int, dict[str, object]]]:
    text = data.decode("utf-8-sig")
    chapters: dict[int, dict[int, dict[str, object]]] = {}
    chapter: int | None = None
    verse: int | None = None
    raw_parts: list[str] = []

    def flush() -> None:
        nonlocal raw_parts
        if chapter is None or verse is None:
            raw_parts = []
            return
        raw = "\n".join(raw_parts).strip()
        chapters.setdefault(chapter, {})[verse] = {
            "raw": raw,
            "text": normalize_usfm_text(raw),
            "strongs": STRONG.findall(raw),
        }
        raw_parts = []

    for line in text.splitlines():
        c = CHAPTER_MARKER.match(line)
        if c:
            flush()
            chapter = int(c.group(1))
            verse = None
            continue
        v = VERSE_MARKER.match(line)
        if v:
            flush()
            if chapter is None:
                raise SystemExit("USFM: verset înainte de capitol")
            verse = int(v.group(1))
            raw_parts = [v.group(3)]
            continue
        if verse is not None and not line.startswith("\\c "):
            raw_parts.append(line)
    flush()
    return chapters


def flatten(source: dict[int, dict[int, dict[str, object]]]) -> list[tuple[int, int, dict[str, object]]]:
    rows: list[tuple[int, int, dict[str, object]]] = []
    for chapter in sorted(source):
        for verse in sorted(source[chapter]):
            rows.append((chapter, verse, source[chapter][verse]))
    return rows


def strong_overlap(a: list[str], b: list[str]) -> dict[str, object]:
    ca, cb = Counter(a), Counter(b)
    shared = sum((ca & cb).values())
    denom = max(1, min(sum(ca.values()), sum(cb.values())))
    return {
        "sharedTokens": shared,
        "smallerSideTokens": denom,
        "ratio": round(shared / denom, 3),
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--book", required=True, choices=sorted(BOOK_FILES))
    args = parser.parse_args()

    code = args.book
    file_id, expected_chapters = BOOK_FILES[code]
    lock = json.loads(LOCK_PATH.read_text(encoding="utf-8"))
    snapshot_path = ROOT / lock["snapshot"]["path"]
    actual_snapshot_sha = sha256_bytes(snapshot_path.read_bytes())
    if actual_snapshot_sha != lock["snapshot"]["sha256"]:
        raise SystemExit(f"Snapshot SHA mismatch: {actual_snapshot_sha} != {lock['snapshot']['sha256']}")

    book_lock = next((book for book in lock["books"] if book["bookId"] == code), None)
    if not book_lock:
        raise SystemExit(f"{code}: lipsește din source-lock")

    with zipfile.ZipFile(snapshot_path) as archive:
        web_bytes = archive.read(book_lock["WEBU"]["snapshotMember"])
        wlc_bytes = archive.read(book_lock["WLC"]["snapshotMember"])

    if sha256_bytes(web_bytes) != book_lock["WEBU"]["sha256"]:
        raise SystemExit(f"{code}: WEBU member SHA mismatch")
    if sha256_bytes(wlc_bytes) != book_lock["WLC"]["sha256"]:
        raise SystemExit(f"{code}: WLC member SHA mismatch")

    web = parse_usfm(web_bytes)
    wlc = parse_usfm(wlc_bytes)
    candidate = parse_generated(GENERATED_ROOT / f"{file_id}Text.ts")

    if sorted(candidate) != list(range(1, expected_chapters + 1)):
        raise SystemExit(f"{code}: candidatul românesc nu are {expected_chapters} capitole")

    candidate_count = sum(len(v) for v in candidate.values())
    web_flat = flatten(web)
    wlc_flat = flatten(wlc)
    if len(web_flat) != candidate_count:
        raise SystemExit(f"{code}: WEBU are {len(web_flat)} versete, candidatul are {candidate_count}")
    if len(wlc_flat) != candidate_count:
        raise SystemExit(f"{code}: WLC are {len(wlc_flat)} versete, candidatul are {candidate_count}")

    # WEBU trebuie să fie în exact aceeași versificație cu produsul; altfel ref-urile
    # utilizatorului nu mai au o bază stabilă.
    for chapter_no, ro_verses in candidate.items():
        web_numbers = sorted(web.get(chapter_no, {}))
        expected = list(range(1, len(ro_verses) + 1))
        if web_numbers != expected:
            raise SystemExit(
                f"{code} {chapter_no}: WEBU versification mismatch: {web_numbers} != {expected}"
            )

    chapters = []
    versification_mappings = []
    ordinal = 0
    for chapter_no in range(1, expected_chapters + 1):
        verse_rows = []
        ro_verses = candidate[chapter_no]
        for verse_no, ro_text in enumerate(ro_verses, start=1):
            web_row = web[chapter_no][verse_no]
            wlc_chapter, wlc_verse, wlc_row = wlc_flat[ordinal]
            ordinal += 1
            direct = wlc_chapter == chapter_no and wlc_verse == verse_no
            if not direct:
                versification_mappings.append(
                    {
                        "productRef": f"{chapter_no}:{verse_no}",
                        "WLCRef": f"{wlc_chapter}:{wlc_verse}",
                    }
                )
            verse_rows.append(
                {
                    "verse": verse_no,
                    "productRef": f"{chapter_no}:{verse_no}",
                    "candidateRo": ro_text,
                    "WEBU": {
                        "ref": f"{chapter_no}:{verse_no}",
                        **web_row,
                    },
                    "WLC": {
                        "ref": f"{wlc_chapter}:{wlc_verse}",
                        **wlc_row,
                    },
                    "sourceSignatureEvidence": strong_overlap(
                        list(web_row.get("strongs", [])), list(wlc_row.get("strongs", []))
                    ),
                    "review": {"status": "pending", "issues": []},
                }
            )
        chapters.append(
            {
                "chapter": chapter_no,
                "verseCount": len(ro_verses),
                "review": {"status": "pending", "reviewedVerses": 0, "issues": []},
                "verses": verse_rows,
            }
        )

    # Diagnostic: alinierile mutate trebuie totuși să aibă semnal lexical între
    # WEBU Strong's și WLC Strong's. Nu folosim această măsură ca audit semantic.
    weak_shifted = []
    for chapter in chapters:
        for row in chapter["verses"]:
            if row["WEBU"]["ref"] != row["WLC"]["ref"]:
                evidence = row["sourceSignatureEvidence"]
                if evidence["sharedTokens"] == 0:
                    weak_shifted.append(
                        {
                            "productRef": row["productRef"],
                            "WLCRef": row["WLC"]["ref"],
                            "evidence": evidence,
                        }
                    )
    if weak_shifted:
        raise SystemExit(
            f"{code}: {len(weak_shifted)} mapări WLC mutate fără niciun Strong comun: "
            + json.dumps(weak_shifted, ensure_ascii=False)
        )

    packet = {
        "schemaVersion": 2,
        "bookId": code,
        "bookName": book_lock["name"],
        "translationTarget": "BE",
        "status": "fresh-source-reaudit-ready",
        "candidateStage": "temporary-editorial",
        "sourceLock": str(LOCK_PATH.relative_to(ROOT)).replace("\\", "/"),
        "sourceSnapshotSha256": lock["snapshot"]["sha256"],
        "sourceMembers": {"WEBU": book_lock["WEBU"], "WLC": book_lock["WLC"]},
        "versification": {
            "productBase": "WEBU",
            "WLCAlignment": "absolute-verse-ordinal-across-book",
            "note": "WLC păstrează referința masoretică reală per verset; mapările neidentice sunt enumerate explicit.",
            "mappedRefs": len(versification_mappings),
            "mappings": versification_mappings,
        },
        "totals": {
            "chapters": expected_chapters,
            "verses": candidate_count,
            "WEBUVerses": len(web_flat),
            "WLCVerses": len(wlc_flat),
            "sourceAlignmentIssues": 0,
        },
        "chapters": chapters,
    }

    OUT_ROOT.mkdir(parents=True, exist_ok=True)
    out = OUT_ROOT / f"{code}-FRESH-SOURCE-REAUDIT.json"
    out.write_text(json.dumps(packet, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(
        f"{code} READY: {expected_chapters} capitole / {candidate_count} versete / "
        f"WEBU={len(web_flat)} / WLC={len(wlc_flat)} / WLC remaps={len(versification_mappings)} / issues=0"
    )
    if versification_mappings:
        print("Versification boundary remaps:")
        print(json.dumps(versification_mappings, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
