#!/usr/bin/env python3
"""Explicitly hold the draft NT out of publication while it is under review.

This is deliberately the inverse of ``seal-biblia-emanus.py``.  It provides a
reproducible, checked migration from the historical ``published/public``
metadata to the only honest state while the per-verse editorial register is
absent: ``in_review`` / ``public: false``.  It never creates approval evidence
and cannot promote a chapter.
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "docs" / "data" / "biblia-emanus"
MANIFEST_PATH = DATA_DIR / "manifest.json"
NT_BOOK_IDS = {
    "MAT", "MRK", "LUK", "JHN", "ACT", "ROM", "1CO", "2CO", "GAL", "EPH",
    "PHP", "COL", "1TH", "2TH", "1TI", "2TI", "TIT", "PHM", "HEB", "JAS",
    "1PE", "2PE", "1JN", "2JN", "3JN", "JUD", "REV",
}


class WithholdError(Exception):
    """The on-disk state is not the explicit withheld state."""


def load_json(path: Path) -> dict[str, Any]:
    try:
        value = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as error:
        raise WithholdError(f"nu pot citi {path}: {error}") from error
    if not isinstance(value, dict):
        raise WithholdError(f"{path}: rădăcina trebuie să fie obiect JSON")
    return value


def write_json(path: Path, value: dict[str, Any]) -> None:
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def chapter_records(data_dir: Path) -> list[tuple[Path, dict[str, Any]]]:
    records: list[tuple[Path, dict[str, Any]]] = []
    for path in sorted(data_dir.glob("*.json")):
        data = load_json(path)
        if isinstance(data.get("bookId"), str) and isinstance(data.get("chapter"), int):
            records.append((path, data))
    return records


def expected_nt_chapters(data_dir: Path) -> set[str]:
    versification = load_json(data_dir / "nt-versification.json")
    books = versification.get("books")
    if not isinstance(books, list):
        raise WithholdError("nt-versification.json: lista cărților lipsește")
    expected: set[str] = set()
    for book in books:
        if not isinstance(book, dict) or book.get("id") not in NT_BOOK_IDS:
            raise WithholdError("nt-versification.json: carte NT invalidă")
        chapters = book.get("chapters")
        if not isinstance(chapters, list):
            raise WithholdError(f"nt-versification.json: capitole invalide pentru {book['id']}")
        for chapter in chapters:
            if not isinstance(chapter, dict) or not isinstance(chapter.get("number"), int):
                raise WithholdError(f"nt-versification.json: număr de capitol invalid pentru {book['id']}")
            expected.add(f"{book['id']}.{chapter['number']}")
    if len(expected) != 260:
        raise WithholdError("nt-versification.json: Noul Testament trebuie să aibă exact 260 de capitole")
    return expected


def target_manifest(records: list[tuple[Path, dict[str, Any]]], manifest: dict[str, Any]) -> dict[str, Any]:
    result = dict(manifest)
    nt_verses = sum(
        len(data.get("verses", []))
        for _, data in records
        if data.get("bookId") in NT_BOOK_IDS
    )
    if nt_verses != 7941:
        raise WithholdError(f"Noul Testament are {nt_verses} versete, nu 7941")
    result["newTestament"] = {
        "books": 27,
        "chapters": 260,
        "verses": nt_verses,
        "status": "in_review",
        "public": False,
    }
    approved = sum(data.get("status") in {"approved", "published"} for _, data in records)
    published = sum(data.get("status") == "published" for _, data in records)
    progress = dict(result.get("progress") or {})
    progress["chaptersApproved"] = approved
    progress["chaptersPublished"] = published
    result["progress"] = progress
    result["public"] = published > 0
    return result


def verify(data_dir: Path = DATA_DIR) -> int:
    records = chapter_records(data_dir)
    expected = expected_nt_chapters(data_dir)
    nt_records = {
        f"{data['bookId']}.{data['chapter']}": data
        for _, data in records
        if data.get("bookId") in NT_BOOK_IDS
    }
    if set(nt_records) != expected:
        missing = sorted(expected.difference(nt_records))
        extra = sorted(set(nt_records).difference(expected))
        raise WithholdError(f"corpus NT incomplet (lipsesc={missing[:3]}, suplimentare={extra[:3]})")
    unsafe = [
        chapter_id
        for chapter_id, data in sorted(nt_records.items())
        if data.get("status") != "in_review" or data.get("public") is not False
    ]
    if unsafe:
        raise WithholdError(
            "capitolele NT trebuie reținute ca in_review/public=false: " + ", ".join(unsafe[:8])
        )

    manifest = load_json(data_dir / "manifest.json")
    expected_manifest = target_manifest(records, manifest)
    for key in ("newTestament", "progress", "public"):
        if manifest.get(key) != expected_manifest.get(key):
            raise WithholdError(f"manifest.json: {key} nu corespunde stării withheld a NT")
    return len(nt_records)


def apply(data_dir: Path = DATA_DIR) -> int:
    records = chapter_records(data_dir)
    expected = expected_nt_chapters(data_dir)
    nt_records = [
        (path, data)
        for path, data in records
        if data.get("bookId") in NT_BOOK_IDS
    ]
    actual = {f"{data['bookId']}.{data['chapter']}" for _, data in nt_records}
    if actual != expected:
        raise WithholdError("nu aplic reținerea pe un corpus NT incomplet")
    for path, data in nt_records:
        if data.get("status") != "in_review" or data.get("public") is not False:
            data["status"] = "in_review"
            data["public"] = False
            write_json(path, data)

    updated_records = chapter_records(data_dir)
    manifest = load_json(data_dir / "manifest.json")
    expected_manifest = target_manifest(updated_records, manifest)
    if manifest != expected_manifest:
        write_json(data_dir / "manifest.json", expected_manifest)
    return verify(data_dir)


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Retrage explicit Noul Testament neaprobat din starea published/public."
    )
    parser.add_argument("--apply", action="store_true", help="scrie starea in_review/public=false")
    parser.add_argument("--check", action="store_true", help="verifică starea withheld fără să scrie")
    args = parser.parse_args()
    if args.apply == args.check:
        parser.error("alege exact una dintre --apply sau --check")
    try:
        count = apply() if args.apply else verify()
    except WithholdError as error:
        print(f"[biblia-emanus-nt-withheld] EROARE: {error}", file=sys.stderr)
        return 1
    action = "reținut" if args.apply else "validat ca reținut"
    print(f"[biblia-emanus-nt-withheld] OK: {count} capitole NT {action}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
