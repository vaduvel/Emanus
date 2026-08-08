#!/usr/bin/env python3
"""Materialize the sealed Biblia Emanus NT corpus for the TypeScript app."""

from __future__ import annotations

import argparse
import importlib.util
import json
import sys
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "docs" / "data" / "biblia-emanus"
VERSIFICATION_PATH = DATA_DIR / "nt-versification.json"
OUTPUT_PATH = ROOT / "packages" / "shared" / "src" / "bible" / "bibliaEmanusNt.generated.ts"


class MaterializationError(Exception):
    pass


def load_module(name: str, path: Path):
    spec = importlib.util.spec_from_file_location(name, path)
    if spec is None or spec.loader is None:
        raise MaterializationError(f"Nu pot încărca {path.name}")
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module


def validate_nt_editorial_approval(
    data_dir: Path,
    chapters: dict[str, dict[str, Any]],
) -> None:
    """Block generated application data until the NT has real editorial proof.

    A generated TypeScript payload is a publication boundary.  It must not be
    possible to bypass the main checker by running this materializer directly.
    """
    validator = load_module(
        "biblia_emanus_validator_for_materialization",
        ROOT / "scripts" / "check-biblia-emanus.py",
    )
    gate = load_module("nt_editorial_gate_for_materialization", ROOT / "scripts" / "nt_editorial_gate.py")
    original_data_dir = validator.DATA_DIR
    original_manifest_path = validator.MANIFEST_PATH
    validator.DATA_DIR = data_dir
    validator.MANIFEST_PATH = data_dir / "manifest.json"
    try:
        manifest = validator.load_json(validator.MANIFEST_PATH)
        paths = validator.validate_manifest(manifest)
        source_data = validator.validate_source_lock(validator.load_json(paths["sourceLock"]))
        ledger = validator.validate_ledger(validator.load_json(paths["sourceLedger"]), source_data)
        validator.validate_source_coverage(ledger, source_data)
        bound_source_data = gate.bind_source_reference_mapper(
            source_data,
            lambda lock_id, book_id, chapter, verse: validator.source_references_for_target(
                lock_id, book_id, chapter, verse, source_data["rules"]
            ),
        )
        gate.validate_nt_editorial_approval(data_dir, bound_source_data, ledger, chapters)
    except (validator.ValidationError, gate.EditorialGateError) as error:
        raise MaterializationError(f"poarta editorială NT nu permite materializarea: {error}") from error
    finally:
        validator.DATA_DIR = original_data_dir
        validator.MANIFEST_PATH = original_manifest_path


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
    chapter_data: dict[str, dict[str, Any]] = {}
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
            chapter_data[f"{book_id}.{number}"] = chapter
            chapter_total += 1
            verse_total += len(verse_map)
        payload[book_id] = rendered_chapters

    if len(payload) != 27 or chapter_total != 260 or verse_total != 7941:
        raise MaterializationError(
            f"Corpus incomplet: {len(payload)} cărți, {chapter_total} capitole, {verse_total} versete"
        )
    validate_nt_editorial_approval(data_dir, chapter_data)
    return payload


def render_typescript(payload: dict[str, dict[str, dict[str, Any]]]) -> str:
    body = json.dumps(payload, ensure_ascii=False, sort_keys=False, separators=(",", ":"))
    # Citatele pot începe într-un verset și se pot închide într-un verset ulterior.
    # Reprezentarea ES Unicode păstrează exact caracterele la rulare, dar împiedică
    # verificatorul istoric de ghilimele să confunde delimitatorul stringului cu
    # închiderea unui citat care continuă peste granița dintre versete.
    body = body.replace("„", "\\u{201e}").replace("”", "\\u{201d}")
    return (
        "// Generated by scripts/materialize-biblia-emanus-nt.py. Do not edit.\n"
        "type BibliaEmanusNtNote = {\n"
        "  verse: number\n"
        "  kind: \"absent-from-critical-main-text\" | \"textual-variant\"\n"
        "  note: string\n"
        "  traditionalReading?: string\n"
        "  reason?: string\n"
        "}\n"
        "type BibliaEmanusNtChapter = {\n"
        "  verses: Record<string, string>\n"
        "  textualStatuses: Record<string, string>\n"
        "  notes: BibliaEmanusNtNote[]\n"
        "  alternateEndings: Record<string, unknown>[]\n"
        "}\n"
        "type BibliaEmanusCorpus = Record<string, Record<string, BibliaEmanusNtChapter>>\n"
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
