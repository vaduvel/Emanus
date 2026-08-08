#!/usr/bin/env python3
"""Promote the remaining canonical OT using the official OSHB WLC verse map.

This wrapper does not invent a home-grown 1:1 mapping. It pins the Open
Scriptures morphhb repository, runs its own ``--remapVerses`` conversion, turns
the resulting word arrays into deterministic USFM, and then invokes the normal
Biblia Emanus promotion engine. Both the raw eBible WLC archive and the exact
remapping inputs are embedded in the final snapshot and source-lock.
"""
from __future__ import annotations

import hashlib
import importlib.util
import json
import shutil
import subprocess
import zipfile
from pathlib import Path
from types import ModuleType
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
BASE_SCRIPT = ROOT / "scripts" / "promote-pr40-canonical-ot.py"
SOURCES = ROOT / "docs" / "data" / "biblia-emanus-candidates" / "sources"
ACTIVE = ROOT / "docs" / "data" / "biblia-emanus"
CACHE = ROOT / ".cache" / "morphhb-remap"
REPOSITORY = "https://github.com/openscriptures/morphhb.git"
COMMIT = "3d15126fb1ef74867fc1434be1942e837932691f"
DERIVED_ZIP = SOURCES / "hboWLC-oshb-kjv-remapped_usfm.zip"

BOOK_IDS: dict[str, str] = {
    "Genesis": "GEN", "Exodus": "EXO", "Leviticus": "LEV", "Numbers": "NUM",
    "Deuteronomy": "DEU", "Joshua": "JOS", "Judges": "JDG", "Ruth": "RUT",
    "I Samuel": "1SA", "II Samuel": "2SA", "I Kings": "1KI", "II Kings": "2KI",
    "I Chronicles": "1CH", "II Chronicles": "2CH", "Ezra": "EZR", "Nehemiah": "NEH",
    "Esther": "EST", "Job": "JOB", "Psalms": "PSA", "Proverbs": "PRO",
    "Ecclesiastes": "ECC", "Song of Solomon": "SNG", "Isaiah": "ISA",
    "Jeremiah": "JER", "Lamentations": "LAM", "Ezekiel": "EZK", "Daniel": "DAN",
    "Hosea": "HOS", "Joel": "JOL", "Amos": "AMO", "Obadiah": "OBA",
    "Jonah": "JON", "Micah": "MIC", "Nahum": "NAM", "Habakkuk": "HAB",
    "Zephaniah": "ZEP", "Haggai": "HAG", "Zechariah": "ZEC", "Malachi": "MAL",
}


def load_base() -> ModuleType:
    spec = importlib.util.spec_from_file_location("canonical_promotion_v2", BASE_SCRIPT)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Cannot load {BASE_SCRIPT}")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def clone_and_remap() -> Path:
    if CACHE.exists():
        shutil.rmtree(CACHE)
    CACHE.parent.mkdir(parents=True, exist_ok=True)
    subprocess.check_call(["git", "clone", "--no-checkout", REPOSITORY, str(CACHE)])
    subprocess.check_call(["git", "checkout", COMMIT], cwd=CACHE)
    subprocess.check_call(
        ["python3", "morphhbXML-to-JSON.py", "--remapVerses", "--splitByBook"],
        cwd=CACHE,
    )
    output = CACHE / "json" / "remapped"
    if not output.is_dir():
        raise RuntimeError("Official Open Scriptures remapper produced no output directory")
    return output


def hebrew_text(words: Any, reference: str) -> str:
    if not isinstance(words, list) or not words:
        raise RuntimeError(f"{reference}: empty remapped verse")
    tokens: list[str] = []
    for index, word in enumerate(words, start=1):
        if not isinstance(word, list) or not word or not isinstance(word[0], str):
            raise RuntimeError(f"{reference}: malformed word {index}")
        token = word[0].strip()
        if token:
            tokens.append(token)
    if not tokens:
        raise RuntimeError(f"{reference}: no Hebrew tokens")
    return " ".join(tokens)


def deterministic_zip(entries: dict[str, bytes]) -> None:
    DERIVED_ZIP.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(DERIVED_ZIP, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as archive:
        for name in sorted(entries):
            info = zipfile.ZipInfo(name, date_time=(2026, 8, 5, 0, 0, 0))
            info.compress_type = zipfile.ZIP_DEFLATED
            info.external_attr = 0o100644 << 16
            archive.writestr(info, entries[name])


def build_remapped_usfm(output: Path) -> dict[str, Any]:
    entries: dict[str, bytes] = {}
    totals: dict[str, dict[str, int]] = {}
    for book_name, book_id in BOOK_IDS.items():
        filename = book_name.replace(" ", "").lower() + ".json"
        path = output / filename
        if not path.is_file():
            raise RuntimeError(f"Official remapper lacks {filename} for {book_id}")
        chapters = json.loads(path.read_text(encoding="utf-8"))
        if not isinstance(chapters, list) or not chapters:
            raise RuntimeError(f"{book_id}: malformed remapped book")
        lines = [f"\\id {book_id}", f"\\h {book_name}"]
        verse_total = 0
        for chapter_number, verses in enumerate(chapters, start=1):
            if not isinstance(verses, list) or not verses:
                raise RuntimeError(f"{book_id}.{chapter_number}: empty remapped chapter")
            lines.append(f"\\c {chapter_number}")
            for verse_number, words in enumerate(verses, start=1):
                text = hebrew_text(words, f"{book_id}.{chapter_number}:{verse_number}")
                lines.append(f"\\v {verse_number} {text}")
                verse_total += 1
        raw = ("\n".join(lines) + "\n").encode("utf-8")
        entries[f"usfm/{book_id}.usfm"] = raw
        totals[book_id] = {"chapters": len(chapters), "verses": verse_total}

    verse_map = (CACHE / "wlc" / "VerseMap.xml").read_bytes()
    converter = (CACHE / "morphhbXML-to-JSON.py").read_bytes()
    entries["provenance/VerseMap.xml"] = verse_map
    entries["provenance/morphhbXML-to-JSON.py"] = converter
    entries["provenance/morphhb-commit.txt"] = (COMMIT + "\n").encode("ascii")
    entries["provenance/remap-manifest.json"] = (
        json.dumps(
            {
                "repository": REPOSITORY,
                "commit": COMMIT,
                "command": "python3 morphhbXML-to-JSON.py --remapVerses --splitByBook",
                "verseMapSha256": hashlib.sha256(verse_map).hexdigest(),
                "converterSha256": hashlib.sha256(converter).hexdigest(),
                "books": totals,
            },
            ensure_ascii=False,
            indent=2,
        )
        + "\n"
    ).encode("utf-8")
    deterministic_zip(entries)
    return {
        "sha256": hashlib.sha256(DERIVED_ZIP.read_bytes()).hexdigest(),
        "verseMapSha256": hashlib.sha256(verse_map).hexdigest(),
        "converterSha256": hashlib.sha256(converter).hexdigest(),
        "books": totals,
    }


def postprocess_provenance(base: ModuleType, provenance: dict[str, Any]) -> None:
    lock_path = ACTIVE / "source-lock.json"
    lock = json.loads(lock_path.read_text(encoding="utf-8"))
    lock.setdefault("derivations", {})["hboWLC-oshb-kjv-remapped-r5"] = {
        "kind": "versification-remap",
        "repository": REPOSITORY,
        "commit": COMMIT,
        "command": "python3 morphhbXML-to-JSON.py --remapVerses --splitByBook",
        "derivedArchive": DERIVED_ZIP.name,
        "derivedArchiveSha256": provenance["sha256"],
        "verseMapSha256": provenance["verseMapSha256"],
        "converterSha256": provenance["converterSha256"],
        "rawWlcSourceId": "hboWLC-raw-r5",
        "textPolicy": "Only verse boundaries are remapped; Hebrew word arrays come from the pinned OSHB WLC XML.",
    }
    lock_path.write_text(json.dumps(lock, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    for path in sorted(ACTIVE.glob("*.json")):
        if not path.stem.split(".", 1)[0] in base.CANONICAL:
            continue
        if not path.stem.split(".", 1)[-1].isdigit():
            continue
        doc = json.loads(path.read_text(encoding="utf-8"))
        hebrew = doc.get("source", {}).get("hebrew")
        if not isinstance(hebrew, dict):
            continue
        hebrew.update(
            {
                "version": "WLC-OSHB — official Open Scriptures English-versification remap",
                "passageUrl": f"https://github.com/openscriptures/morphhb/tree/{COMMIT}/wlc",
                "rawLockId": f"WLC-RAW-R5-{doc['bookId']}",
                "derivationId": "hboWLC-oshb-kjv-remapped-r5",
            }
        )
        path.write_text(json.dumps(doc, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main() -> None:
    output = clone_and_remap()
    provenance = build_remapped_usfm(output)
    base = load_base()
    base.SNAPSHOT_NAME = "ot-repair5-canonical-oshb-remapped-usfm.zip"
    base.SNAPSHOT_ID = "ot-repair5-canonical-oshb-remapped"
    base.SOURCE_SPECS["hebrew"] = {
        "zip": DERIVED_ZIP.name,
        "sourceId": "hboWLC-oshb-kjv-remapped-r5",
        "language": "he",
        "role": "original",
        "lockPrefix": "WLC-OSHB-REMAP-R5",
        "folder": "wlc-remapped",
        "upstreamUrl": f"https://github.com/openscriptures/morphhb/tree/{COMMIT}",
        "textLicense": "Public Domain",
        "annotationLicense": "CC BY 4.0",
    }
    base.SOURCE_SPECS["hebrewRaw"] = {
        "zip": "hboWLC_usfm.zip",
        "sourceId": "hboWLC-raw-r5",
        "language": "he",
        "role": "supplemental-witness",
        "lockPrefix": "WLC-RAW-R5",
        "folder": "wlc-raw",
        "upstreamUrl": "https://ebible.org/Scriptures/hboWLC_usfm.zip",
        "textLicense": "Public Domain",
        "annotationLicense": "CC BY 4.0",
    }
    result = base.main()
    if result not in {None, 0}:
        raise SystemExit(result)
    postprocess_provenance(base, provenance)
    validator = base.load_validator()
    final = validator.main()
    if final != 0:
        raise SystemExit(final)
    print(
        json.dumps(
            {
                "publicationReady": True,
                "officialRemapCommit": COMMIT,
                "derivedArchive": str(DERIVED_ZIP.relative_to(ROOT)),
                **provenance,
            },
            ensure_ascii=False,
            indent=2,
        )
    )


if __name__ == "__main__":
    main()
