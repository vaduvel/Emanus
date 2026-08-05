#!/usr/bin/env python3
"""Import the remote NT corpus into a clean branch based on current main.

This is a temporary migration helper. It preserves the six published OT books,
adds the complete 27-book NT work corpus, and upgrades the validator so draft
placeholders are allowed only while a chapter is draft/in_review. Publication
still rejects every unresolved marker.
"""
from __future__ import annotations

import json
import re
import subprocess
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
SOURCE_REF = "origin/codex/biblia-emanus-new-testament"
NT_BOOKS = (
    "MAT", "MRK", "LUK", "JHN", "ACT", "ROM", "1CO", "2CO", "GAL",
    "EPH", "PHP", "COL", "1TH", "2TH", "1TI", "2TI", "TIT", "PHM",
    "HEB", "JAS", "1PE", "2PE", "1JN", "2JN", "3JN", "JUD", "REV",
)
NT_CHAPTER_RE = re.compile(
    r"^docs/data/biblia-emanus/(?:" + "|".join(map(re.escape, NT_BOOKS)) + r")\.[1-9][0-9]*\.json$"
)

COPY_PATHS = [
    "docs/data/biblia-emanus/nt-versification.json",
    "docs/data/biblia-emanus/sources/nt-sblgnt-1.2.zip",
    "docs/biblia-emanus/NT-EDITORIAL-STANDARD.md",
    "docs/biblia-emanus/NT-TEXTUAL-VARIANTS.md",
    "scripts/build-biblia-emanus-nt-sources.py",
    "scripts/check-biblia-emanus.py",
    "scripts/check-biblia-emanus-book.py",
    "scripts/check-biblia-emanus-versification.py",
    "scripts/materialize-biblia-emanus-nt.py",
    "scripts/prepare-biblia-emanus-nt.py",
    "scripts/seal-biblia-emanus.py",
    "scripts/test_biblia_emanus.py",
    "scripts/test_biblia_emanus_nt.py",
    "scripts/test_materialize_biblia_emanus_nt.py",
]


def git_bytes(path: str) -> bytes:
    return subprocess.check_output(["git", "show", f"{SOURCE_REF}:{path}"], cwd=ROOT)


def copy_from_source(path: str) -> None:
    target = ROOT / path
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_bytes(git_bytes(path))


def read_json(path: Path) -> dict[str, Any]:
    data = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(data, dict):
        raise RuntimeError(f"{path} must contain a JSON object")
    return data


def write_json(path: Path, data: Any) -> None:
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def must_replace(text: str, old: str, new: str, owner: str) -> str:
    if old not in text:
        raise RuntimeError(f"Expected patch marker missing in {owner}: {old[:120]!r}")
    return text.replace(old, new)


def merge_onomastics() -> None:
    target_path = ROOT / "docs/data/biblia-emanus/onomastics.json"
    current = read_json(target_path)
    incoming = json.loads(git_bytes("docs/data/biblia-emanus/onomastics.json").decode("utf-8"))
    by_name: dict[str, dict[str, Any]] = {}
    for entry in [*current.get("entries", []), *incoming.get("entries", [])]:
        canonical = entry.get("canonical")
        if not isinstance(canonical, str) or not canonical:
            continue
        existing = by_name.setdefault(canonical, {"canonical": canonical, "forbiddenForms": []})
        forms = existing["forbiddenForms"]
        for form in entry.get("forbiddenForms", []):
            if isinstance(form, str) and form and form not in forms and form != canonical:
                forms.append(form)
    current["entries"] = sorted(by_name.values(), key=lambda item: item["canonical"].casefold())
    write_json(target_path, current)


def patch_validator() -> None:
    path = ROOT / "scripts/check-biblia-emanus.py"
    text = path.read_text(encoding="utf-8")
    text = text.replace('"GEN": "Geneza", "EXO": "Exod",', '"GEN": "Geneza", "EXO": "Exodul",')
    text = text.replace(
        '"baseText": "World English Bible, Protestant Edition",',
        '"baseText": "World English Bible Updated, Protestant Edition",',
    )
    text = text.replace('english.get("version") != "WEB-Protestant"', 'english.get("version") != "WEBU-Protestant"')
    text = must_replace(
        text,
        '    validate_no_editorial_placeholders(data, path.name)\n    if data.get("translation") != "BE":',
        '    status_hint = data.get("status")\n    if status_hint in {"approved", "published"}:\n        validate_no_editorial_placeholders(data, path.name)\n    if data.get("translation") != "BE":',
        str(path),
    )
    text = must_replace(
        text,
        '    full_text = " ".join(combined_text)\n    if not ROMANIAN_DIACRITICS.intersection(full_text):',
        '    full_text = " ".join(combined_text)\n    placeholder_draft = (\n        status in {"draft", "in_review"}\n        and any(FORBIDDEN_EDITORIAL_MARKERS.search(value) for value in combined_text)\n    )\n    if not placeholder_draft and not ROMANIAN_DIACRITICS.intersection(full_text):',
        str(path),
    )
    text = must_replace(
        text,
        '    compared_verses = validate_pinned_benchmark_comparison(path, data, source_data)',
        '    compared_verses = (\n        0 if placeholder_draft else validate_pinned_benchmark_comparison(path, data, source_data)\n    )',
        str(path),
    )
    old_nt_gate = '''            if nt_status != {
                "books": 27,
                "chapters": 260,
                "verses": nt_verses,
                "status": "published",
                "public": True,
            }:
                fail("manifest.json: starea Noului Testament nu corespunde corpusului validat")
            if any(item[3] != "published" for item in nt_validated):
                fail("manifest.json: Noul Testament nu poate fi declarat complet cu capitole nepublicate")'''
    new_nt_gate = '''            nt_all_published = all(item[3] == "published" for item in nt_validated)
            expected_nt_status = {
                "books": 27,
                "chapters": 260,
                "verses": nt_verses,
                "status": "published" if nt_all_published else "in_review",
                "public": nt_all_published,
            }
            if nt_status != expected_nt_status:
                fail("manifest.json: starea Noului Testament nu corespunde corpusului validat")'''
    text = must_replace(text, old_nt_gate, new_nt_gate, str(path))
    path.write_text(text, encoding="utf-8")


def patch_prepare_script() -> None:
    path = ROOT / "scripts/prepare-biblia-emanus-nt.py"
    text = path.read_text(encoding="utf-8")
    old = '''    texts: dict[str, dict[tuple[int, int], str]] = {}
    for lock_id, record in files.items():
        with zipfile.ZipFile(SOURCES / "ot-gen-jos-usfm.zip") as old_archive:
            texts[lock_id] = validator.parse_locked_source(
                old_archive.read(record["archivePath"]), lock_id, record
            )'''
    new = '''    texts: dict[str, dict[tuple[int, int], str]] = {}
    legacy_snapshot_path = DATA / old_lock["snapshot"]["path"]
    with zipfile.ZipFile(legacy_snapshot_path) as old_archive:
        for lock_id, record in files.items():
            texts[lock_id] = validator.parse_locked_source(
                old_archive.read(record["archivePath"]), lock_id, record
            )'''
    text = must_replace(text, old, new, str(path))
    text = text.replace('"WEB-Protestant"', '"WEBU-Protestant"')
    path.write_text(text, encoding="utf-8")


def normalize_nt_chapters(paths: list[str]) -> tuple[int, int]:
    translated = 0
    placeholders = 0
    for relative in paths:
        path = ROOT / relative
        chapter = read_json(path)
        source = chapter.get("source")
        if isinstance(source, dict) and isinstance(source.get("english"), dict):
            source["english"]["version"] = "WEBU-Protestant"
        verse_texts = [verse.get("text", "") for verse in chapter.get("verses", []) if isinstance(verse, dict)]
        if verse_texts and all(text == "DE TRADUS" for text in verse_texts):
            placeholders += 1
        else:
            translated += 1
        write_json(path, chapter)
    if translated != 139 or placeholders != 121:
        raise RuntimeError(
            f"Unexpected NT corpus classification: translated={translated}, placeholders={placeholders}"
        )
    return translated, placeholders


def update_package_scripts() -> None:
    path = ROOT / "package.json"
    package = read_json(path)
    scripts = package.setdefault("scripts", {})
    scripts["check:biblia-emanus-versification"] = "python3 scripts/check-biblia-emanus-versification.py"
    scripts["check:biblia-emanus-book"] = "python3 scripts/check-biblia-emanus-book.py"
    scripts["test:biblia-emanus"] = (
        "python3 -m unittest scripts/test_biblia_emanus.py "
        "scripts/test_biblia_emanus_nt.py scripts/test_materialize_biblia_emanus_nt.py"
    )
    scripts["materialize:biblia-emanus-nt"] = "python3 scripts/materialize-biblia-emanus-nt.py"
    scripts["check:biblia-emanus-nt-materialized"] = (
        "python3 scripts/materialize-biblia-emanus-nt.py --check"
    )
    write_json(path, package)


def main() -> int:
    for path in COPY_PATHS:
        copy_from_source(path)

    listing = subprocess.check_output(
        ["git", "ls-tree", "-r", "--name-only", SOURCE_REF, "docs/data/biblia-emanus"],
        cwd=ROOT,
        text=True,
    ).splitlines()
    chapter_paths = sorted(path for path in listing if NT_CHAPTER_RE.match(path))
    if len(chapter_paths) != 260:
        raise RuntimeError(f"Expected 260 NT chapter files, found {len(chapter_paths)}")
    for path in chapter_paths:
        copy_from_source(path)

    merge_onomastics()
    patch_validator()
    patch_prepare_script()
    translated, placeholders = normalize_nt_chapters(chapter_paths)
    update_package_scripts()
    print(
        f"[nt-audit3-import] imported 260 chapters: {translated} translated, "
        f"{placeholders} placeholders kept strictly in_review"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
