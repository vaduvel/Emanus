#!/usr/bin/env python3
"""Construiește un pachet de re-audit sursă-verset pentru un profet mic.

Pachetul este numai material de review: candidat românesc + WEBU + WLC din
snapshotul nou. Nu aprobă și nu modifică traducerea.
"""

from __future__ import annotations

import argparse
import ast
import hashlib
import json
import re
import zipfile
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
    # WLC pune frecvent textul în markeri \\w cu atribute morfologice.
    while WORD_PAYLOAD.search(text):
        text = WORD_PAYLOAD.sub(lambda m: m.group(1), text)
    text = ATTRIBUTE_BLOCK.sub("", text)
    text = USFM_MARKER.sub(" ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def parse_usfm(data: bytes) -> dict[int, dict[int, dict[str, str]]]:
    text = data.decode("utf-8-sig")
    chapters: dict[int, dict[int, dict[str, str]]] = {}
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
        web_member = book_lock["WEBU"]["snapshotMember"]
        wlc_member = book_lock["WLC"]["snapshotMember"]
        web_bytes = archive.read(web_member)
        wlc_bytes = archive.read(wlc_member)

    if sha256_bytes(web_bytes) != book_lock["WEBU"]["sha256"]:
        raise SystemExit(f"{code}: WEBU member SHA mismatch")
    if sha256_bytes(wlc_bytes) != book_lock["WLC"]["sha256"]:
        raise SystemExit(f"{code}: WLC member SHA mismatch")

    web = parse_usfm(web_bytes)
    wlc = parse_usfm(wlc_bytes)
    candidate = parse_generated(GENERATED_ROOT / f"{file_id}Text.ts")

    if sorted(candidate) != list(range(1, expected_chapters + 1)):
        raise SystemExit(f"{code}: candidatul românesc nu are {expected_chapters} capitole")

    chapters = []
    total_verses = 0
    source_mismatches = []
    for chapter_no in range(1, expected_chapters + 1):
        ro_verses = candidate[chapter_no]
        web_chapter = web.get(chapter_no, {})
        wlc_chapter = wlc.get(chapter_no, {})
        verse_rows = []
        for verse_no, ro_text in enumerate(ro_verses, start=1):
            web_row = web_chapter.get(verse_no)
            wlc_row = wlc_chapter.get(verse_no)
            if not web_row or not wlc_row:
                source_mismatches.append(
                    {
                        "chapter": chapter_no,
                        "verse": verse_no,
                        "missingWEBU": not bool(web_row),
                        "missingWLC": not bool(wlc_row),
                    }
                )
            verse_rows.append(
                {
                    "verse": verse_no,
                    "candidateRo": ro_text,
                    "WEBU": web_row,
                    "WLC": wlc_row,
                    "review": {
                        "status": "pending",
                        "issues": [],
                    },
                }
            )
        extras_web = sorted(set(web_chapter) - set(range(1, len(ro_verses) + 1)))
        extras_wlc = sorted(set(wlc_chapter) - set(range(1, len(ro_verses) + 1)))
        if extras_web or extras_wlc:
            source_mismatches.append(
                {
                    "chapter": chapter_no,
                    "extraWEBUVerses": extras_web,
                    "extraWLCVerses": extras_wlc,
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
        total_verses += len(ro_verses)

    packet = {
        "schemaVersion": 1,
        "bookId": code,
        "bookName": book_lock["name"],
        "translationTarget": "BE",
        "status": "fresh-source-reaudit-pending",
        "candidateStage": "temporary-editorial",
        "sourceLock": str(LOCK_PATH.relative_to(ROOT)).replace("\\", "/"),
        "sourceSnapshotSha256": lock["snapshot"]["sha256"],
        "sourceMembers": {
            "WEBU": book_lock["WEBU"],
            "WLC": book_lock["WLC"],
        },
        "totals": {
            "chapters": expected_chapters,
            "verses": total_verses,
            "sourceAlignmentIssues": len(source_mismatches),
        },
        "sourceAlignmentIssues": source_mismatches,
        "chapters": chapters,
    }

    OUT_ROOT.mkdir(parents=True, exist_ok=True)
    out = OUT_ROOT / f"{code}-FRESH-SOURCE-REAUDIT.json"
    out.write_text(json.dumps(packet, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(
        f"{code} re-audit packet: {expected_chapters} capitole / {total_verses} versete / "
        f"source alignment issues={len(source_mismatches)} -> {out}"
    )
    if source_mismatches:
        raise SystemExit(f"{code}: alinieri WEBU/WLC neclare; vezi pachetul")


if __name__ == "__main__":
    main()
