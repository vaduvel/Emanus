#!/usr/bin/env python3
"""Materialize the sealed Biblia Emanus NT corpus for the TypeScript app."""

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "docs" / "data" / "biblia-emanus"
VERSIFICATION_PATH = DATA_DIR / "nt-versification.json"
OUTPUT_PATH = ROOT / "packages" / "shared" / "src" / "bible" / "bibliaEmanusNt.generated.ts"


class MaterializationError(Exception):
    pass


def load_json(path: Path) -> dict[str, Any]:
    try:
        value = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as error:
        raise MaterializationError(f"Nu pot citi {path}: {error}") from error
    if not isinstance(value, dict):
        raise MaterializationError(f"{path}: rădăcina trebuie să fie obiect JSON")
    return value


def build_payload(
    data_dir: Path = DATA_DIR,
    versification_path: Path = VERSIFICATION_PATH,
) -> dict[str, dict[str, dict[str, Any]]]:
    versification = load_json(versification_path)
    totals = versification.get("totals")
    books = versification.get("books")
    if not isinstance(totals, dict) or not isinstance(books, list):
        raise MaterializationError("Versificația NT este incompletă")
    if (totals.get("books"), totals.get("chapters"), totals.get("versesWithMainText")) != (
        27,
        260,
        7941,
    ):
        raise MaterializationError("Versificația NT nu mai are totalurile canonice fixate")

    payload: dict[str, dict[str, dict[str, Any]]] = {}
    chapter_total = 0
    verse_total = 0
    for book in books:
        if not isinstance(book, dict) or not isinstance(book.get("id"), str):
            raise MaterializationError("Carte invalidă în versificația NT")
        book_id = book["id"]
        chapters = book.get("chapters")
        if not isinstance(chapters, list):
            raise MaterializationError(f"{book_id}: lista capitolelor lipsește")
        rendered_chapters: dict[str, dict[str, Any]] = {}
        for expected in chapters:
            if not isinstance(expected, dict) or not isinstance(expected.get("number"), int):
                raise MaterializationError(f"{book_id}: capitol invalid în versificație")
            number = expected["number"]
            chapter = load_json(data_dir / f"{book_id}.{number}.json")
            if chapter.get("status") != "published" or chapter.get("public") is not True:
                raise MaterializationError(
                    f"{book_id}.{number}: materializarea acceptă numai capitole published/public"
                )
            if (
                chapter.get("translation") != "BE"
                or chapter.get("bookId") != book_id
                or chapter.get("chapter") != number
            ):
                raise MaterializationError(f"{book_id}.{number}: identitate invalidă")
            verses = chapter.get("verses")
            expected_numbers = expected.get("verseNumbers")
            if not isinstance(verses, list) or not isinstance(expected_numbers, list):
                raise MaterializationError(f"{book_id}.{number}: versetele lipsesc")
            actual_numbers = [verse.get("number") for verse in verses if isinstance(verse, dict)]
            if actual_numbers != expected_numbers:
                raise MaterializationError(
                    f"{book_id}.{number}: numerotarea nu corespunde versificației"
                )
            verse_map: dict[str, str] = {}
            textual_statuses: dict[str, str] = {}
            for verse in verses:
                text = verse.get("text")
                if not isinstance(text, str) or not text.strip():
                    raise MaterializationError(
                        f"{book_id}.{number}.{verse.get('number')}: text invalid"
                    )
                key = str(verse["number"])
                verse_map[key] = text
                if isinstance(verse.get("textualStatus"), str):
                    textual_statuses[key] = verse["textualStatus"]

            notes: list[dict[str, Any]] = []
            for note in chapter.get("referenceNotes", []):
                if not isinstance(note, dict):
                    raise MaterializationError(f"{book_id}.{number}: referenceNote invalidă")
                item = {
                    "verse": note.get("number"),
                    "kind": "absent-from-critical-main-text",
                    "note": note.get("displayNote"),
                }
                if note.get("traditionalReading"):
                    item["traditionalReading"] = note["traditionalReading"]
                notes.append(item)
            for note in chapter.get("editorialNotes", []):
                if not isinstance(note, dict) or note.get("reviewRequired") is not True:
                    continue
                item = {
                    "verse": note.get("verse"),
                    "kind": "textual-variant",
                    "note": note.get("decision"),
                }
                if note.get("reason"):
                    item["reason"] = note["reason"]
                notes.append(item)

            rendered_chapters[str(number)] = {
                "verses": verse_map,
                "textualStatuses": textual_statuses,
                "notes": notes,
                "alternateEndings": chapter.get("alternateEndings", []),
            }
            chapter_total += 1
            verse_total += len(verse_map)
        payload[book_id] = rendered_chapters

    if len(payload) != 27 or chapter_total != 260 or verse_total != 7941:
        raise MaterializationError(
            f"Corpus incomplet: {len(payload)} cărți, {chapter_total} capitole, {verse_total} versete"
        )
    return payload


def render_typescript(payload: dict[str, dict[str, dict[str, Any]]]) -> str:
    body = json.dumps(payload, ensure_ascii=False, sort_keys=False, separators=(",", ":"))
    return (
        "// Generated by scripts/materialize-biblia-emanus-nt.py. Do not edit.\n"
        "import type { BibliaEmanusCorpus } from \"./bibliaEmanus.js\"\n"
        "export const BIBLIA_EMANUS_TRANSLATION = \"Biblia Emanus (BE)\"\n"
        "export const BIBLIA_EMANUS_NT_TEXT: BibliaEmanusCorpus = "
        + body
        + "\n"
    )


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true", help="Verifică fișierul generat fără să îl scrie")
    parser.add_argument("--output", type=Path, default=OUTPUT_PATH)
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    try:
        rendered = render_typescript(build_payload())
    except MaterializationError as error:
        print(f"[biblia-emanus-nt-materialize] EROARE: {error}")
        return 1
    if args.check:
        if not args.output.is_file() or args.output.read_text(encoding="utf-8") != rendered:
            print("[biblia-emanus-nt-materialize] EROARE: sursa TypeScript nu corespunde corpusului sigilat")
            return 1
    else:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(rendered, encoding="utf-8")
    print("[biblia-emanus-nt-materialize] OK: 27 cărți, 260 capitole, 7941 versete")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
