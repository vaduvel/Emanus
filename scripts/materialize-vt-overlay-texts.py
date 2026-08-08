#!/usr/bin/env python3
"""Materializează textul biblic de lucru pentru toate cele 29 de cărți overlay VT.

Cele 17 cărți overlay Judecători–Daniel și Osea folosesc numai capitole validate
explicit ca Biblia Emanus (`translation: BE`, published/public și review complet
aprobat). Osea este citită din corpusul canonic al ramurii curente, deoarece
fresh-source auditul HOS 1–14 și snapshotul său sunt acum parte din acest PR.

Ioel–Maleahi folosesc temporar textul biblic existent în corpusul de lucru.
Acest text NU este etichetat Biblia Emanus și NU este release text: este păstrat
strict ca suport editorial pentru ca explicațiile să poată fi finalizate fără a
bloca lucrul după traducerea BE. Când Biblia Emanus este gata, se înlocuiește
numai matricea de versete; explicațiile nu trebuie rescrise.

Nu materializează deuterocanonice, texte etiopiene sau Qumran.
"""

from __future__ import annotations

import argparse
import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "packages" / "shared" / "src" / "bible" / "generated" / "vtCanonicalText"

BE_BOOKS = [
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
]

TEMP_BOOKS = [
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

# Numele fișierelor au fost create înainte ca ID-urile canonice ale reader-ului
# să fie fixate. Păstrăm fișierele stabile, dar catalogul trebuie să folosească
# exact aceleași ID-uri ca overlay-urile și VT_EXPLAINED_COVERAGE.
OVERLAY_BOOK_IDS = {
    "imparati2": "2-imparati",
    "cronici1": "1-cronici",
    "cronici2": "2-cronici",
}

APPROVED_FIELDS = (
    "aiSourceLanguage",
    "aiRomanianLanguage",
    "aiTheologicalContext",
    "omissionAddition",
    "benchmarkComparison",
    "copyrightDistance",
    "criticalIssues",
)

TEMP_LABEL = "Text biblic provizoriu pentru lucru editorial — de înlocuit cu Biblia Emanus"
BE_LABEL = "Biblia Emanus"


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


def read_source_json(ref: str, code: str, chapter: int) -> dict:
    relative = f"docs/data/biblia-emanus/{code}.{chapter}.json"
    if code == "HOS":
        # Osea a fost promovată pe baza fresh-source auditului din această ramură.
        # Citirea din worktree permite workflow-ului să valideze/materializeze textul
        # canonic înainte de commitul botului, fără a recădea pe candidatul legacy.
        path = ROOT / relative
        if not path.is_file():
            raise SystemExit(f"{code}.{chapter}: lipsește corpusul canonic local {relative}")
        return json.loads(path.read_text(encoding="utf-8"))
    return json.loads(git_show(ref, relative))


def read_verses(raw: dict, code: str, chapter: int) -> list[str]:
    raw_chapter = raw.get("chapter", raw.get("chapterNumber"))
    if raw.get("bookId") != code or raw_chapter != chapter:
        raise SystemExit(f"{code}.{chapter}: identificare invalidă")

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
    # Pentru textul de lucru cerem numai integritate structurală. Nu pretindem
    # că este Biblia Emanus și nu îl lăsăm să poarte eticheta BE.
    if raw.get("status") not in (None, "draft", "in_review", "published"):
        raise SystemExit(f"{code}.{chapter}: status necunoscut pentru textul provizoriu")
    return read_verses(raw, code, chapter)


def ts_string(value: str) -> str:
    return json.dumps(value, ensure_ascii=False)


def symbol(book_id: str) -> str:
    return book_id.upper().replace("-", "_") + "_TEXT"


def overlay_book_id(file_book_id: str) -> str:
    return OVERLAY_BOOK_IDS.get(file_book_id, file_book_id)


def write_book(
    ref: str,
    book_id: str,
    code: str,
    name: str,
    order: int,
    chapters: int,
    *,
    temporary: bool,
) -> int:
    del name, order
    chapter_texts: dict[int, list[str]] = {}
    total = 0
    validator = validate_temp if temporary else validate_be

    for chapter in range(1, chapters + 1):
        raw = read_source_json(ref, code, chapter)
        texts = validator(raw, code, chapter)
        chapter_texts[chapter] = texts
        total += len(texts)

    source_label = TEMP_LABEL if temporary else BE_LABEL
    lines = [
        "// GENERATED de scripts/materialize-vt-overlay-texts.py.",
        f"// Sursă de lucru: {source_label}; {code}, {chapters} capitole; nu edita manual.",
        "",
        f"export const {symbol(book_id)}: Readonly<Record<number, readonly string[]>> = {{",
    ]
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
    lines += [
        "",
        'export type OverlayTextStage = "biblia-emanus" | "temporary-editorial"',
        "",
        "export interface CanonicalOverlayTextBook {",
        "  bookId: string",
        "  bibleEmanusBookId: string",
        "  name: string",
        "  order: number",
        "  chapterCount: number",
        "  verseCount: number",
        "  chapters: Readonly<Record<number, readonly string[]>>",
        "  textStage: OverlayTextStage",
        "  translationLabel: string",
        "}",
        "",
        "export const VT_CANONICAL_TEXT_BOOKS: readonly CanonicalOverlayTextBook[] = [",
    ]

    for book_id, code, name, order, chapters, verses, temporary in entries:
        stage = "temporary-editorial" if temporary else "biblia-emanus"
        label = TEMP_LABEL if temporary else BE_LABEL
        reader_id = overlay_book_id(book_id)
        lines.append(
            f"  {{ bookId: {ts_string(reader_id)}, bibleEmanusBookId: {ts_string(code)}, "
            f"name: {ts_string(name)}, order: {order}, chapterCount: {chapters}, "
            f"verseCount: {verses}, chapters: {symbol(book_id)}, "
            f"textStage: {ts_string(stage)}, translationLabel: {ts_string(label)} }},"
        )

    lines += [
        "] as const",
        "",
        "export const VT_CANONICAL_TEXT_BY_BOOK = new Map(",
        "  VT_CANONICAL_TEXT_BOOKS.map((book) => [book.bookId, book] as const),",
        ")",
        "",
        "export const VT_TEMPORARY_TEXT_BOOKS = VT_CANONICAL_TEXT_BOOKS.filter(",
        '  (book) => book.textStage === "temporary-editorial",',
        ")",
        "",
        "// Compatibilitate cu consumatorii vechi: nu mai există blocaje de lucru.",
        "export const VT_CANONICAL_TEXT_BLOCKED = [] as const",
        "",
    ]
    (OUT / "index.ts").write_text("\n".join(lines), encoding="utf-8")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--source-ref", required=True)
    args = parser.parse_args()

    entries: list[tuple[str, str, str, int, int, int, bool]] = []
    total_chapters = 0
    total_verses = 0

    for book in BE_BOOKS:
        verses = write_book(args.source_ref, *book, temporary=False)
        entries.append((*book, verses, False))
        total_chapters += book[4]
        total_verses += verses

    for book in TEMP_BOOKS:
        verses = write_book(args.source_ref, *book, temporary=True)
        entries.append((*book, verses, True))
        total_chapters += book[4]
        total_verses += verses

    write_index(entries)

    if len(entries) != 29 or total_chapters != 637:
        raise SystemExit(
            f"Materializare invalidă: {len(entries)}/29 cărți / {total_chapters}/637 capitole"
        )

    print(
        f"VT work text OK: 29/29 cărți, {total_chapters}/637 capitole, {total_verses} versete; "
        "18 cărți Biblia Emanus validate + 11 cărți cu text editorial provizoriu."
    )


if __name__ == "__main__":
    main()
