#!/usr/bin/env python3
"""Run canonical promotion with all source and content fixes composed.

The inherited candidates first receive the audited omission repairs and Psalm
superscription normalization. The official OSHB remap then supplies Hebrew
verse boundaries, while archive loading excludes non-canonical front matter.
"""
from __future__ import annotations

import hashlib
import importlib.util
import json
import re
import runpy
import zipfile
from pathlib import Path
from types import ModuleType
from typing import Any

CONTENT_FIXES = Path(__file__).with_name("apply-pr40-canonical-content-fixes.py")
runpy.run_path(str(CONTENT_FIXES), run_name="__main__")

SCRIPT = Path(__file__).with_name("promote-pr40-canonical-ot-v3.py")
spec = importlib.util.spec_from_file_location("canonical_v3", SCRIPT)
if spec is None or spec.loader is None:
    raise SystemExit(f"Cannot load {SCRIPT}")
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)
_original_build = module.build_remapped_usfm
_original_postprocess = module.postprocess_provenance


class _SourceSpecsWithoutRawBookLocks(dict[str, dict[str, Any]]):
    """Ignore v3's per-book raw-WLC spec while retaining normal specs."""

    def __setitem__(self, key: str, value: dict[str, Any]) -> None:
        if key == "hebrewRaw":
            return
        super().__setitem__(key, value)


def load_base() -> ModuleType:
    base_spec = importlib.util.spec_from_file_location(
        "canonical_promotion_base_filtered",
        module.BASE_SCRIPT,
    )
    if base_spec is None or base_spec.loader is None:
        raise RuntimeError(f"Cannot load {module.BASE_SCRIPT}")
    base = importlib.util.module_from_spec(base_spec)
    base_spec.loader.exec_module(base)

    def archive_books(path: Path) -> dict[str, dict[str, Any]]:
        books: dict[str, dict[str, Any]] = {}
        with zipfile.ZipFile(path) as archive:
            for name in sorted(archive.namelist()):
                if not name.lower().endswith((".usfm", ".sfm")):
                    continue
                raw = archive.read(name)
                text = raw.decode("utf-8-sig")
                match = re.search(r"(?m)^\\id\s+([0-9A-Z]{3})\b", text)
                if not match:
                    continue
                book_id = match.group(1)
                if book_id not in base.CANONICAL:
                    continue
                if book_id in books:
                    raise RuntimeError(f"{path.name}: duplicate canonical book {book_id}")
                books[book_id] = {
                    "name": Path(name).name,
                    "raw": raw,
                    "verses": base.parse_usfm(raw, f"{path.name}:{name}"),
                }
        return books

    base.archive_books = archive_books
    base.SOURCE_SPECS = _SourceSpecsWithoutRawBookLocks(base.SOURCE_SPECS)
    return base


def build_remapped_usfm(output: Path):
    removed: dict[str, list[int]] = {}
    for path in sorted(output.glob("*.json")):
        chapters = json.loads(path.read_text(encoding="utf-8"))
        if not isinstance(chapters, list):
            continue
        if any(not isinstance(chapter, list) for chapter in chapters):
            raise RuntimeError(f"{path.name}: malformed chapter container")

        removed_here: list[int] = []
        while chapters and chapters[-1] == []:
            removed_here.append(len(chapters))
            chapters.pop()
        if any(chapter == [] for chapter in chapters):
            raise RuntimeError(f"{path.name}: interior empty remap chapter")
        if removed_here:
            removed[path.name] = sorted(removed_here)
            path.write_text(json.dumps(chapters, ensure_ascii=False), encoding="utf-8")

    result = _original_build(output)
    result["removedTrailingEmptyChapterContainers"] = removed
    return result


def postprocess_provenance(base: ModuleType, provenance: dict[str, Any]) -> None:
    _original_postprocess(base, provenance)
    raw_archive = module.SOURCES / "hboWLC_usfm.zip"
    if not raw_archive.is_file():
        raise RuntimeError(f"Missing raw WLC provenance archive {raw_archive}")
    lock_path = module.ACTIVE / "source-lock.json"
    lock = json.loads(lock_path.read_text(encoding="utf-8"))
    lock.setdefault("upstreamArtifacts", {})["hboWLC-raw-r5"] = {
        "url": "https://ebible.org/Scriptures/hboWLC_usfm.zip",
        "archiveDate": base.TODAY,
        "sha256": hashlib.sha256(raw_archive.read_bytes()).hexdigest(),
        "language": "he",
        "textLicense": "Public Domain",
        "annotationLicense": "CC BY 4.0",
        "snapshotId": base.SNAPSHOT_ID,
        "archiveEmbedded": False,
        "role": "raw-input-to-official-remap",
    }
    lock_path.write_text(
        json.dumps(lock, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


module.load_base = load_base
module.build_remapped_usfm = build_remapped_usfm
module.postprocess_provenance = postprocess_provenance
module.main()
