#!/usr/bin/env python3
"""Materializează textul canonic Biblia Emanus pentru cele 29 de cărți overlay.

Sursa este o ramură Git explicită care conține JSON-urile auditate Biblia Emanus.
Scriptul copiază numai cele 29 de coduri canonice necesare overlay-urilor și
refuză orice capitol care nu este BE + published + public + review aprobat.

Nu materializează deuterocanonice, texte etiopiene sau Qumran.
"""

from __future__ import annotations

import argparse
import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "packages" / "shared" / "src" / "bible" / "generated" / "vtCanonicalText"

BOOKS = [
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

APPROVED_FIELDS = (
    "aiSourceLanguage",
    "aiRomanianLanguage",
    "aiTheologicalContext",
    "omissionAddition",
    "benchmarkComparison",
    "copyrightDistance",
    "criticalIssues",
)


def git_show(ref: str, path: str) -> str:
    proc = subprocess.run(
        ["git", "show", f"{ref}:{path}"],
        cwd=ROOT,
        text=True,
        capture_output=True,
    )
    if proc.returncode != 0:
        raise SystemExit(f"Nu pot citi {ref}:{path}\n{proc.stderr}")
    return proc.stdout


def validate(raw: dict, code: str, chapter: int) -> list[str]:
    if raw.get("translation") != "BE":
        raise SystemExit(f"{code}.{chapter}: translation != BE")
    if raw.get("bookId") != code or raw.get("chapter") != chapter:
        raise SystemExit(f"{code}.{chapter}: identificare invalidă")
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

    verses = raw.get("verses")
    if not isinstance(verses, list) or not verses:
        raise SystemExit(f"{code}.{chapter}: lipsesc versetele")

    texts: list[str] = []
    for expected, verse in enumerate(verses, start=1):
        if verse.get("number") != expected:
            raise SystemExit(f"{code}.{chapter}:{expected}: numerotare discontinuă")
        text = verse.get("text")
        if not isinstance(text, str) or not text.strip():
            raise SystemExit(f"{code}.{chapter}:{expected}: text gol")
        texts.append(text)
    return texts


def ts_string(value: str) -> str:
    return json.dumps(value, ensure_ascii=False)


def symbol(book_id: str) -> str:
    return book_id.upper().replace("-", "_") + "_TEXT"


def write_book(ref: str, book_id: str, code: str, name: str, order: int, chapters: int) -> tuple[str, int]:
    chapter_texts: dict[int, list[str]] = {}
    total = 0
    for chapter in range(1, chapters + 1):
        path = f"docs/data/biblia-emanus/{code}.{chapter}.json"
        raw = json.loads(git_show(ref, path))
        texts = validate(raw, code, chapter)
        chapter_texts[chapter] = texts
        total += len(texts)

    const_name = symbol(book_id)
    lines = [
        "// GENERATED de scripts/materialize-vt-overlay-texts.py.",
        f"// Sursă: Biblia Emanus {code}, {chapters} capitole; nu edita manual.",
        "",
        f"export const {const_name}: Readonly<Record<number, readonly string[]>> = {{",
    ]
    for chapter, texts in chapter_texts.items():
        lines.append(f"  {chapter}: [")
        for text in texts:
            lines.append(f"    {ts_string(text)},")
        lines.append("  ],")
    lines += ["}", ""]

    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / f"{book_id}Text.ts").write_text("\n".join(lines), encoding="utf-8")
    return const_name, total


def write_index(entries: list[tuple[str, str, str, int, int, int]]) -> None:
    lines = ["// GENERATED de scripts/materialize-vt-overlay-texts.py."]
    for book_id, _code, _name, _order, _chapters, _verses in entries:
        const_name = symbol(book_id)
        lines.append(f'import {{ {const_name} }} from "./{book_id}Text.js"')
    lines += [
        "",
        "export interface CanonicalOverlayTextBook {",
        "  bookId: string",
        "  bibleEmanusBookId: string",
        "  name: string",
        "  order: number",
        "  chapterCount: number",
        "  verseCount: number",
        "  chapters: Readonly<Record<number, readonly string[]>>",
        "}",
        "",
        "export const VT_CANONICAL_TEXT_BOOKS: readonly CanonicalOverlayTextBook[] = [",
    ]
    for book_id, code, name, order, chapters, verses in entries:
        lines.append(
            "  { "
            f"bookId: {ts_string(book_id)}, bibleEmanusBookId: {ts_string(code)}, name: {ts_string(name)}, "
            f"order: {order}, chapterCount: {chapters}, verseCount: {verses}, chapters: {symbol(book_id)}"
            " },"
        )
    lines += [
        "] as const",
        "",
        "export const VT_CANONICAL_TEXT_BY_BOOK = new Map(",
        "  VT_CANONICAL_TEXT_BOOKS.map((book) => [book.bookId, book] as const),",
        ")",
        "",
    ]
    (OUT / "index.ts").write_text("\n".join(lines), encoding="utf-8")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--source-ref", required=True)
    args = parser.parse_args()

    entries = []
    total_chapters = 0
    total_verses = 0
    for book in BOOKS:
        book_id, code, name, order, chapters = book
        const_name, verses = write_book(args.source_ref, *book)
        del const_name
        entries.append((*book, verses))
        total_chapters += chapters
        total_verses += verses
    write_index(entries)

    if total_chapters != 637:
        raise SystemExit(f"Capitole materializate {total_chapters}, se așteptau 637")

    print(
        f"Biblia Emanus overlay text OK: {len(entries)}/29 cărți, "
        f"{total_chapters}/637 capitole, {total_verses} versete auditate."
    )


if __name__ == "__main__":
    main()
