#!/usr/bin/env python3
"""Run canonical promotion with both OSHB remap fixes composed.

Two independent upstream conditions must be handled together:

* the official remapper may leave empty *trailing* chapter containers when a
  Hebrew chapter is folded into the preceding English-versification chapter;
* eBible archives contain front matter such as ``FRT`` with no verses.

Only trailing empty remap containers are removed. Interior empty chapters are
fatal. Archive loading accepts only the exact canonical book identifiers and
therefore never attempts to parse front matter as Scripture.
"""
from __future__ import annotations

import importlib.util
import json
import re
import zipfile
from pathlib import Path
from types import ModuleType
from typing import Any

SCRIPT = Path(__file__).with_name("promote-pr40-canonical-ot-v3.py")
spec = importlib.util.spec_from_file_location("canonical_v3", SCRIPT)
if spec is None or spec.loader is None:
    raise SystemExit(f"Cannot load {SCRIPT}")
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)
_original_build = module.build_remapped_usfm


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


module.load_base = load_base
module.build_remapped_usfm = build_remapped_usfm
module.main()
