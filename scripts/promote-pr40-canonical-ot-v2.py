#!/usr/bin/env python3
"""Canonical OT promotion v2: ignore non-book USFM payloads.

The upstream archives legitimately contain front matter, glossary and metadata
files with ``\\id`` markers but no verses. The publication snapshot must include
only the exact 33 canonical books being promoted.
"""
from __future__ import annotations

import importlib.util
import re
import zipfile
from pathlib import Path
from typing import Any

SCRIPT = Path(__file__).with_name("promote-pr40-canonical-ot.py")
spec = importlib.util.spec_from_file_location("pr40_canonical_v1", SCRIPT)
if spec is None or spec.loader is None:
    raise SystemExit(f"Cannot load {SCRIPT}")
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


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
            if book_id not in module.CANONICAL:
                continue
            if book_id in books:
                raise RuntimeError(f"{path.name}: duplicate canonical book {book_id}")
            books[book_id] = {
                "name": Path(name).name,
                "raw": raw,
                "verses": module.parse_usfm(raw, f"{path.name}:{name}"),
            }
    return books


module.archive_books = archive_books
module.main()
