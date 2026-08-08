#!/usr/bin/env python3
"""Materializează textul biblic de lucru pentru toate cele 29 de cărți overlay VT.

Judecători–Daniel sunt Biblia Emanus stabilă din sursa canonică istorică.
Pentru Osea–Maleahi, fiecare carte trece automat la Biblia Emanus numai dacă
toate capitolele ei canonice există în worktree și sunt `BE/published/public`
cu review complet aprobat. Altfel, cartea rămâne explicit `temporary-editorial`
și textul provizoriu este citit din candidatul legacy.
"""

from __future__ import annotations

import argparse
import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs" / "data" / "biblia-emanus"
OUT = ROOT / "packages" / "shared" / "src" / "bible" / "generated" / "vtCanonicalText"

ESTABLISHED_BE_BOOKS = [
    ("judecatori", "JDG", "Judecători", 7, 21),
    ("imparati2", "2KI", "2 Împărați", 12, 25),
    ("cronici1", "1CH", "1 Cronici", 13, 29),
    ("cronici2", "2CH", "2 Cronici", 14, 36),
    ("ezra", "EZR", "Ezra", 15, 10),
    ("neemia", "NEH", "Neemia", 16, 13),
    ("estera", "EST", "Estera", 17, 10),
    ("iov", "JOB", "Iov", 18, 42),
    ("psalmi", "PSA", "Psalmii", 19, 150),
    ("proverbe", "PRO", "Proverbele", 20, 31),
    ("eclesiastul", "ECC", "Eclesiastul", 21, 12),
    ("cantarea-cantarilor", "SNG", "Cântarea Cântărilor", 22, 8),
    ("isaia", "ISA", "Isaia", 23, 66),
    ("ieremia", "JER", "Ieremia", 24, 52),
    ("plangerile", "LAM", "Plângerile lui Ieremia", 25, 5),
    ("ezechiel", "EZK", "Ezechiel", 26, 48),
    ("daniel", "DAN", "Daniel", 27, 12),
]

MINOR_PROPHETS = [
    ("osea", "HOS", "Osea", 28, 14),
    ("ioel", "JOL", "Ioel", 29, 3),
    ("amos", "AMO", "Amos", 30, 9),
    ("obadia", "OBA", "Obadia", 31, 1),
    ("iona", "JON", "Iona", 32, 4),
    ("mica", "MIC", "Mica", 33, 7),
    ("naum", "NAM", "Naum", 34, 3),
    ("habacuc", "HAB", "Habacuc", 35, 3),
    ("tefania", "ZEP", "Țefania", 36, 3),
    ("hagai", "HAG", "Hagai", 37, 2),
    ("zaharia", "ZEC", "Zaharia", 38, 14),
    ("maleahi", "MAL", "Maleahi", 39, 4),
]

OVERLAY_BOOK_IDS = {"imparati2": "2-imparati", "cronici1": "1-cronici", "cronici2": "2-cronici"}
APPROVED_FIELDS = ("aiSourceLanguage", "aiRomanianLanguage", "aiTheologicalContext", "omissionAddition", "benchmarkComparison", "copyrightDistance", "criticalIssues")
TEMP_LABEL = "Text biblic provizoriu pentru lucru editorial — de înlocuit cu Biblia Emanus"
BE_LABEL = "Biblia Emanus"


def git_show(ref: str, path: str) -> str:
    proc = subprocess.run(["git", "show", f"{ref}:{path}"], cwd=ROOT, text=True, capture_output=True)
    if proc.returncode != 0:
        raise SystemExit(f"Nu pot citi {ref}:{path}\n{proc.stderr}")
    return proc.stdout


def read_ref_json(ref: str, code: str, chapter: int) -> dict:
    return json.loads(git_show(ref, f"docs/data/biblia-emanus/{code}.{chapter}.json"))


def read_local_json(code: str, chapter: int) -> dict:
    path = DATA / f"{code}.{chapter}.json"
    if not path.is_file():
        raise SystemExit(f"{code}.{chapter}: lipsește capitolul canonic local")
    return json.loads(path.read_text(encoding="utf-8"))


def read_verses(raw: dict, code: str, chapter: int) -> list[str]:
    raw_chapter = raw.get("chapter", raw.get("chapterNumber"))
    if raw.get("bookId") != code or raw_chapter != chapter:
        raise SystemExit(f"{code}.{chapter}: identificare invalidă")
    verses = raw.get("verses")
    if not isinstance(verses, list) or not verses:
        raise SystemExit(f"{code}.{chapter}: lipsesc versetele")
    texts: list[str] = []
    for expected, verse in enumerate(verses, start=1):
        if not isinstance(verse, dict) or verse.get("number") != expected:
            raise SystemExit(f"{code}.{chapter}:{expected}: numerotare discontinuă")
        text = verse.get("text")
        if not isinstance(text, str) or not text.strip():
            raise SystemExit(f"{code}.{chapter}:{expected}: text gol")
        texts.append(text.strip())
    return texts


def validate_be(raw: dict, code: str, chapter: int) -> list[str]:
    if raw.get("translation") != "BE":
        raise SystemExit(f"{code}.{chapter}: translation != BE")
    if raw.get("status") != "published" or raw.get("public") is not True:
        raise SystemExit(f"{code}.{chapter}: nu este published/public")
    review = raw.get("review") or {}
    missing = [field for field in APPROVED_FIELDS if review.get(field) != "approved"]
    if missing:
        raise SystemExit(f"{code}.{chapter}: review neaprobat: {', '.join(missing)}")
    source = raw.get("source") or {}
    if (source.get("english") or {}).get("version") != "WEBU-Protestant":
        raise SystemExit(f"{code}.{chapter}: sursa engleză nu este WEBU-Protestant")
    if (source.get("hebrew") or {}).get("version") != "WLC-OSHB":
        raise SystemExit(f"{code}.{chapter}: sursa ebraică nu este WLC-OSHB")
    return read_verses(raw, code, chapter)


def validate_temp(raw: dict, code: str, chapter: int) -> list[str]:
    if raw.get("status") not in (None, "draft", "in_review", "published"):
        raise SystemExit(f"{code}.{chapter}: status necunoscut pentru textul provizoriu")
    return read_verses(raw, code, chapter)


def local_be_ready(code: str, chapters: int) -> bool:
    if not all((DATA / f"{code}.{chapter}.json").is_file() for chapter in range(1, chapters + 1)):
        return False
    try:
        for chapter in range(1, chapters + 1):
            validate_be(read_local_json(code, chapter), code, chapter)
    except SystemExit:
        return False
    return True


def ts_string(value: str) -> str:
    return json.dumps(value, ensure_ascii=False)


def symbol(book_id: str) -> str:
    return book_id.upper().replace("-", "_") + "_TEXT"


def overlay_book_id(file_book_id: str) -> str:
    return OVERLAY_BOOK_IDS.get(file_book_id, file_book_id)


def write_book(ref: str, book_id: str, code: str, chapters: int, *, temporary: bool, local: bool) -> int:
    chapter_texts: dict[int, list[str]] = {}
    total = 0
    validator = validate_temp if temporary else validate_be
    for chapter in range(1, chapters + 1):
        raw = read_local_json(code, chapter) if local else read_ref_json(ref, code, chapter)
        texts = validator(raw, code, chapter)
        chapter_texts[chapter] = texts
        total += len(texts)

    label = TEMP_LABEL if temporary else BE_LABEL
    lines = ["// GENERATED de scripts/materialize-vt-overlay-texts.py.", f"// Sursă de lucru: {label}; {code}, {chapters} capitole; nu edita manual.", "", f"export const {symbol(book_id)}: Readonly<Record<number, readonly string[]>> = {{"]
    for chapter, texts in chapter_texts.items():
        lines.append(f"  {chapter}: [")
        lines.extend(f"    {ts_string(text)}," for text in texts)
        lines.append("  ],")
    lines += ["}", ""]
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / f"{book_id}Text.ts").write_text("\n".join(lines), encoding="utf-8")
    return total


def write_index(entries: list[tuple[str, str, str, int, int, int, bool]]) -> None:
    lines = ["// GENERATED de scripts/materialize-vt-overlay-texts.py."]
    for book_id, *_ in entries:
        lines.append(f'import {{ {symbol(book_id)} }} from "./{book_id}Text.js"')
    lines += ["", 'export type OverlayTextStage = "biblia-emanus" | "temporary-editorial"', "", "export interface CanonicalOverlayTextBook {", "  bookId: string", "  bibleEmanusBookId: string", "  name: string", "  order: number", "  chapterCount: number", "  verseCount: number", "  chapters: Readonly<Record<number, readonly string[]>>", "  textStage: OverlayTextStage", "  translationLabel: string", "}", "", "export const VT_CANONICAL_TEXT_BOOKS: readonly CanonicalOverlayTextBook[] = ["]
    for book_id, code, name, order, chapters, verses, temporary in entries:
        stage = "temporary-editorial" if temporary else "biblia-emanus"
        label = TEMP_LABEL if temporary else BE_LABEL
        lines.append(f"  {{ bookId: {ts_string(overlay_book_id(book_id))}, bibleEmanusBookId: {ts_string(code)}, name: {ts_string(name)}, order: {order}, chapterCount: {chapters}, verseCount: {verses}, chapters: {symbol(book_id)}, textStage: {ts_string(stage)}, translationLabel: {ts_string(label)} }},")
    lines += ["] as const", "", "export const VT_CANONICAL_TEXT_BY_BOOK = new Map(", "  VT_CANONICAL_TEXT_BOOKS.map((book) => [book.bookId, book] as const),", ")", "", "export const VT_TEMPORARY_TEXT_BOOKS = VT_CANONICAL_TEXT_BOOKS.filter(", '  (book) => book.textStage === "temporary-editorial",', ")", "", "export const VT_CANONICAL_TEXT_BLOCKED = [] as const", ""]
    (OUT / "index.ts").write_text("\n".join(lines), encoding="utf-8")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--source-ref", required=True)
    args = parser.parse_args()
    entries: list[tuple[str, str, str, int, int, int, bool]] = []
    total_chapters = total_verses = 0

    for book_id, code, name, order, chapters in ESTABLISHED_BE_BOOKS:
        verses = write_book(args.source_ref, book_id, code, chapters, temporary=False, local=False)
        entries.append((book_id, code, name, order, chapters, verses, False))
        total_chapters += chapters
        total_verses += verses

    for book_id, code, name, order, chapters in MINOR_PROPHETS:
        promoted = local_be_ready(code, chapters)
        verses = write_book(args.source_ref, book_id, code, chapters, temporary=not promoted, local=promoted)
        entries.append((book_id, code, name, order, chapters, verses, not promoted))
        total_chapters += chapters
        total_verses += verses

    write_index(entries)
    if len(entries) != 29 or total_chapters != 637:
        raise SystemExit(f"Materializare invalidă: {len(entries)}/29 cărți / {total_chapters}/637 capitole")
    be_count = sum(1 for entry in entries if not entry[-1])
    temp_count = len(entries) - be_count
    print(f"VT work text OK: 29/29 cărți, {total_chapters}/637 capitole, {total_verses} versete; {be_count} cărți Biblia Emanus validate + {temp_count} cărți cu text editorial provizoriu.")


if __name__ == "__main__":
    main()
