#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "docs" / "data" / "biblia-emanus"
GENERATED_ROOT = ROOT / "packages" / "shared" / "src" / "bible" / "generated"
INDEX_OUTPUT = GENERATED_ROOT / "publishedEmanusOtText.ts"
BOOK_OUTPUT_DIR = GENERATED_ROOT / "publishedEmanusOtText"

CANONICAL_CODES = [
    "GEN", "EXO", "LEV", "NUM", "DEU", "JOS", "JDG", "RUT", "1SA", "2SA",
    "1KI", "2KI", "1CH", "2CH", "EZR", "NEH", "EST", "JOB", "PSA", "PRO",
    "ECC", "SNG", "ISA", "JER", "LAM", "EZK", "DAN", "HOS", "JOL", "AMO",
    "OBA", "JON", "MIC", "NAM", "HAB", "ZEP", "HAG", "ZEC", "MAL",
]
BOOK_SLUGS = {
    "GEN": "geneza", "EXO": "exod", "LEV": "levitic", "NUM": "numeri", "DEU": "deuteronom",
    "JOS": "iosua", "JDG": "judecatori", "RUT": "rut", "1SA": "samuel1", "2SA": "samuel2",
    "1KI": "imparati1", "2KI": "imparati2", "1CH": "cronici1", "2CH": "cronici2", "EZR": "ezra",
    "NEH": "neemia", "EST": "estera", "JOB": "iov", "PSA": "psalmi", "PRO": "proverbe",
    "ECC": "eclesiastul", "SNG": "cantareaCantarilor", "ISA": "isaia", "JER": "ieremia",
    "LAM": "plangerile", "EZK": "ezechiel", "DAN": "daniel", "HOS": "osea", "JOL": "ioel",
    "AMO": "amos", "OBA": "obadia", "JON": "iona", "MIC": "mica", "NAM": "naum",
    "HAB": "habacuc", "ZEP": "tefania", "HAG": "hagai", "ZEC": "zaharia", "MAL": "maleahi",
}
EXPECTED_BOOKS = 39
EXPECTED_CHAPTERS = 929
EXPECTED_VERSES = 23145
FILE_RE = re.compile(r"^([0-9A-Z]+)\.(\d+)\.json$")


def load_corpus() -> list[dict]:
    files_by_code: dict[str, dict[int, Path]] = {code: {} for code in CANONICAL_CODES}
    for path in SOURCE_DIR.glob("*.json"):
        match = FILE_RE.match(path.name)
        if not match:
            continue
        code, chapter_raw = match.groups()
        if code in files_by_code:
            files_by_code[code][int(chapter_raw)] = path

    books: list[dict] = []
    total_chapters = 0
    total_verses = 0
    for order, code in enumerate(CANONICAL_CODES, start=1):
        chapter_paths = files_by_code[code]
        if not chapter_paths:
            raise SystemExit(f"[VT Emanus runtime] lipsește cartea {code}")

        chapters: dict[int, list[str]] = {}
        book_name: str | None = None
        for expected_chapter, chapter_number in enumerate(sorted(chapter_paths), start=1):
            if chapter_number != expected_chapter:
                raise SystemExit(
                    f"[VT Emanus runtime] {code}: capitole necontinue; așteptat {expected_chapter}, găsit {chapter_number}"
                )
            data = json.loads(chapter_paths[chapter_number].read_text(encoding="utf-8"))
            if data.get("translation") != "BE":
                raise SystemExit(f"[VT Emanus runtime] {code}.{chapter_number}: translation != BE")
            if data.get("status") != "published" or data.get("public") is not True:
                raise SystemExit(f"[VT Emanus runtime] {code}.{chapter_number}: capitolul nu este publicat")
            if data.get("bookId") != code or data.get("chapter") != chapter_number:
                raise SystemExit(f"[VT Emanus runtime] {code}.{chapter_number}: metadata de identificare invalidă")

            current_name = data.get("bookName")
            if not isinstance(current_name, str) or not current_name.strip():
                raise SystemExit(f"[VT Emanus runtime] {code}.{chapter_number}: bookName lipsă")
            if book_name is None:
                book_name = current_name
            elif book_name != current_name:
                raise SystemExit(f"[VT Emanus runtime] {code}: bookName inconsistent")

            raw_verses = data.get("verses")
            if not isinstance(raw_verses, list) or not raw_verses:
                raise SystemExit(f"[VT Emanus runtime] {code}.{chapter_number}: verses lipsă")

            verse_texts: list[str] = []
            for expected_verse, verse in enumerate(raw_verses, start=1):
                if not isinstance(verse, dict) or verse.get("number") != expected_verse:
                    raise SystemExit(f"[VT Emanus runtime] {code}.{chapter_number}:{expected_verse}: verset invalid")
                text = verse.get("text")
                if not isinstance(text, str) or not text.strip():
                    raise SystemExit(f"[VT Emanus runtime] {code}.{chapter_number}:{expected_verse}: text gol")
                verse_texts.append(text.strip())

            chapters[chapter_number] = verse_texts
            total_chapters += 1
            total_verses += len(verse_texts)

        books.append({"order": order, "code": code, "name": book_name, "chapters": chapters})

    if len(books) != EXPECTED_BOOKS:
        raise SystemExit(f"[VT Emanus runtime] cărți {len(books)}/{EXPECTED_BOOKS}")
    if total_chapters != EXPECTED_CHAPTERS:
        raise SystemExit(f"[VT Emanus runtime] capitole {total_chapters}/{EXPECTED_CHAPTERS}")
    if total_verses != EXPECTED_VERSES:
        raise SystemExit(f"[VT Emanus runtime] versete {total_verses}/{EXPECTED_VERSES}")
    return books


def ts_string(value: str) -> str:
    return json.dumps(value, ensure_ascii=False)


def render_book(book: dict) -> str:
    lines = [
        "// GENERATED FILE. Source of truth: docs/data/biblia-emanus/*.json",
        'import type { PublishedEmanusOtTextBook } from "../publishedEmanusOtText.js"',
        "",
        "export const EMANUS_TEXT_BOOK: PublishedEmanusOtTextBook = {",
        f"  order: {book['order']},",
        f"  code: {ts_string(book['code'])},",
        f"  name: {ts_string(book['name'])},",
        "  chapters: {",
    ]
    for chapter_number, verses in book["chapters"].items():
        rendered_verses = ", ".join(ts_string(v) for v in verses)
        lines.append(f"    {chapter_number}: [{rendered_verses}],")
    lines.extend(["  },", "}", ""])
    return "\n".join(lines)


def render_index(books: list[dict]) -> str:
    lines = [
        "// GENERATED FILE. Source of truth: docs/data/biblia-emanus/*.json",
        "// Textul este împărțit per carte pentru chunking PWA sub limita Workbox.",
    ]
    for book in books:
        slug = BOOK_SLUGS[book["code"]]
        lines.append(f'import {{ EMANUS_TEXT_BOOK as book{book["order"]:02d} }} from "./publishedEmanusOtText/{slug}.js"')
    lines.extend([
        "",
        "export interface PublishedEmanusOtTextBook {",
        "  order: number",
        "  code: string",
        "  name: string",
        "  chapters: Readonly<Record<number, readonly string[]>>",
        "}",
        "",
        f"export const PUBLISHED_EMANUS_OT_BOOK_COUNT = {EXPECTED_BOOKS} as const",
        f"export const PUBLISHED_EMANUS_OT_CHAPTER_COUNT = {EXPECTED_CHAPTERS} as const",
        f"export const PUBLISHED_EMANUS_OT_VERSE_COUNT = {EXPECTED_VERSES} as const",
        "",
        "export const PUBLISHED_EMANUS_OT_TEXT_BY_ORDER: ReadonlyMap<number, PublishedEmanusOtTextBook> = new Map<number, PublishedEmanusOtTextBook>([",
    ])
    for book in books:
        lines.append(f"  [{book['order']}, book{book['order']:02d}],")
    lines.extend(["])", ""])
    return "\n".join(lines)


def expected_outputs(books: list[dict]) -> dict[Path, str]:
    outputs = {INDEX_OUTPUT: render_index(books)}
    for book in books:
        outputs[BOOK_OUTPUT_DIR / f"{BOOK_SLUGS[book['code']]}.ts"] = render_book(book)
    return outputs


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    books = load_corpus()
    outputs = expected_outputs(books)

    if args.check:
        for path, rendered in outputs.items():
            if not path.exists():
                raise SystemExit(f"[VT Emanus runtime] lipsește {path.relative_to(ROOT)}")
            if path.read_text(encoding="utf-8") != rendered:
                raise SystemExit(f"[VT Emanus runtime] {path.relative_to(ROOT)} nu corespunde corpusului publicat")
        actual_book_files = set(BOOK_OUTPUT_DIR.glob("*.ts")) if BOOK_OUTPUT_DIR.exists() else set()
        expected_book_files = {path for path in outputs if path.parent == BOOK_OUTPUT_DIR}
        if actual_book_files != expected_book_files:
            raise SystemExit("[VT Emanus runtime] setul de module per carte nu corespunde canonului de 39 de cărți")
        print(f"VT Emanus runtime materialization OK: {EXPECTED_BOOKS} books / {EXPECTED_CHAPTERS} chapters / {EXPECTED_VERSES} verses")
        return

    GENERATED_ROOT.mkdir(parents=True, exist_ok=True)
    if BOOK_OUTPUT_DIR.exists():
        shutil.rmtree(BOOK_OUTPUT_DIR)
    BOOK_OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    for path, rendered in outputs.items():
        path.write_text(rendered, encoding="utf-8")
    print(
        f"Materialized VT Emanus runtime: {EXPECTED_BOOKS} books / {EXPECTED_CHAPTERS} chapters / {EXPECTED_VERSES} verses "
        f"as 39 book modules + index"
    )


if __name__ == "__main__":
    main()
