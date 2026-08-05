#!/usr/bin/env python3
from __future__ import annotations

import json
import re
import subprocess
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs/data/biblia-emanus"
DOCS = ROOT / "docs/biblia-emanus"

SOURCES = {
    "EXO": {
        "name": "Exodul",
        "chapters": 40,
        "commit": "6f5bf9f1d73193d5f76da8c3e302310d35d985d5",
        "audit": "EXODUL-AUDIT.md",
    },
    "LEV": {
        "name": "Leviticul",
        "chapters": 27,
        "commit": "196b6fc203512f0705f379d934bf3f545e592b68",
        "audit": "LEVITICUL-AUDIT.md",
    },
    "NUM": {
        "name": "Numeri",
        "chapters": 36,
        "commit": "06bff6f4217604b7119dee03ef333cba04743497",
        "audit": "NUMERI-AUDIT.md",
    },
    "DEU": {
        "name": "Deuteronomul",
        "chapters": 34,
        "commit": "1301c21079c44923cf9bcec93c499ca0e5dab4f4",
        "audit": "DEUTERONOMUL-AUDIT.md",
    },
}

BOOK_ORDER = {"GEN": 1, "EXO": 2, "LEV": 3, "NUM": 4, "DEU": 5}
EXPECTED_CHAPTERS = {"GEN": 50, "EXO": 40, "LEV": 27, "NUM": 36, "DEU": 34}
CHAPTER_RE = re.compile(r"^([A-Z0-9]{3})\.([1-9][0-9]*)\.json$")


def git_bytes(commit: str, path: str) -> bytes:
    return subprocess.check_output(["git", "show", f"{commit}:{path}"], cwd=ROOT)


def git_json(commit: str, path: str) -> dict:
    return json.loads(git_bytes(commit, path).decode("utf-8"))


def write_from_commit(commit: str, path: str) -> None:
    destination = ROOT / path
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_bytes(git_bytes(commit, path))


def chapter_key(chapter_id: str) -> tuple[int, int]:
    book, chapter = chapter_id.split(".")
    return BOOK_ORDER[book], int(chapter)


def integrate_files() -> None:
    for book_id, source in SOURCES.items():
        commit = source["commit"]
        for chapter in range(1, source["chapters"] + 1):
            path = f"docs/data/biblia-emanus/{book_id}.{chapter}.json"
            write_from_commit(commit, path)
        write_from_commit(commit, f"docs/biblia-emanus/{source['audit']}")


def integrate_ledger() -> None:
    ledger_path = DATA / "source-ledger.json"
    ledger = json.loads(ledger_path.read_text(encoding="utf-8"))
    chapters = dict(ledger["chapters"])

    for book_id, source in SOURCES.items():
        source_ledger = git_json(source["commit"], "docs/data/biblia-emanus/source-ledger.json")
        imported = {
            chapter_id: metadata
            for chapter_id, metadata in source_ledger["chapters"].items()
            if chapter_id.startswith(f"{book_id}.")
        }
        if len(imported) != source["chapters"]:
            raise RuntimeError(
                f"{book_id}: ledgerul sursă are {len(imported)} capitole, așteptate {source['chapters']}"
            )
        chapters.update(imported)

    ledger["chapters"] = dict(sorted(chapters.items(), key=lambda item: chapter_key(item[0])))
    ledger_path.write_text(json.dumps(ledger, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def integrate_validator() -> None:
    validator_path = ROOT / "scripts/check-biblia-emanus.py"
    text = validator_path.read_text(encoding="utf-8")
    old_names = 'BOOK_NAMES = {"GEN": "Geneza"}'
    old_order = 'BOOK_ORDER = {"GEN": 1}'
    new_names = 'BOOK_NAMES = {"GEN": "Geneza", "EXO": "Exodul", "LEV": "Leviticul", "NUM": "Numeri", "DEU": "Deuteronomul"}'
    new_order = 'BOOK_ORDER = {"GEN": 1, "EXO": 2, "LEV": 3, "NUM": 4, "DEU": 5}'

    if old_names not in text or old_order not in text:
        raise RuntimeError("Validatorul de bază nu mai are configurația Geneza așteptată")

    text = text.replace(old_names, new_names, 1).replace(old_order, new_order, 1)
    validator_path.write_text(text, encoding="utf-8")


def rebuild_manifest() -> tuple[int, int]:
    manifest_path = DATA / "manifest.json"
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    chapter_ids: list[str] = []
    verse_total = 0
    counts: Counter[str] = Counter()

    for path in DATA.glob("*.json"):
        match = CHAPTER_RE.match(path.name)
        if not match:
            continue
        book_id, chapter = match.groups()
        if book_id not in BOOK_ORDER:
            continue
        payload = json.loads(path.read_text(encoding="utf-8"))
        chapter_id = f"{book_id}.{int(chapter)}"
        if payload.get("status") != "published" or payload.get("public") is not True:
            raise RuntimeError(f"{chapter_id} nu este publicat integral")
        chapter_ids.append(chapter_id)
        counts[book_id] += 1
        verse_total += len(payload.get("verses", []))

    if dict(counts) != EXPECTED_CHAPTERS:
        raise RuntimeError(f"Număr capitole neașteptat: {dict(counts)}")

    chapter_ids.sort(key=chapter_key)
    manifest["progress"].update(
        {
            "chaptersDrafted": len(chapter_ids),
            "versesDrafted": verse_total,
            "chaptersApproved": len(chapter_ids),
            "chaptersPublished": len(chapter_ids),
        }
    )
    manifest["draftedChapters"] = chapter_ids
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return len(chapter_ids), verse_total


def write_integration_record(chapter_total: int, verse_total: int) -> None:
    lines = [
        "# Integrare editorială — Pentateuh",
        "",
        "Acest branch unește numai livrările auditate și validate individual pentru Geneza, Exodul, Leviticul, Numeri și Deuteronomul.",
        "",
        f"- capitole publicate: {chapter_total};",
        f"- versete publicate: {verse_total};",
        "- toate capitolele au cele șapte porți aprobate;",
        "- manifestul și source ledger-ul au fost reconstruite ca uniune canonică;",
        "- validatorul recunoaște ordinea GEN, EXO, LEV, NUM, DEU;",
        "- traducerile românești de control rămân exclusiv comparison-only;",
        "- niciun PR-sursă nu a fost merguit.",
        "",
        "## Commituri-sursă",
        "",
    ]
    for book_id, source in SOURCES.items():
        lines.append(f"- {source['name']} ({book_id}): `{source['commit']}`")
    lines.append("")
    (DOCS / "PENTATEUH-INTEGRATION.md").write_text("\n".join(lines), encoding="utf-8")


def main() -> None:
    integrate_files()
    integrate_ledger()
    integrate_validator()
    chapter_total, verse_total = rebuild_manifest()
    if chapter_total != 187 or verse_total != 5852:
        raise RuntimeError(
            f"Total Pentateuh neașteptat: {chapter_total} capitole, {verse_total} versete"
        )
    write_integration_record(chapter_total, verse_total)
    subprocess.run(["python3", "scripts/check-biblia-emanus.py"], cwd=ROOT, check=True)
    print(f"Pentateuh integrat: {chapter_total} capitole, {verse_total} versete.")


if __name__ == "__main__":
    main()
