#!/usr/bin/env python3
"""Run the audited early-work pipeline and preserve source number boundaries.

The v2 postprocessor removes machine-inserted spaces in thousands tokens. A
comma-separated chronology such as ``325, 386`` must not be collapsed into the
single token ``325,386``. This wrapper repairs only compact forms whose spaced
form is present in the verified source, then requires exact numeric-token
identity for every generated Jubilees unit.
"""
from __future__ import annotations

import json
import os
import re
import runpy
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "docs" / "data" / "biblia-emanus-early-source-candidates"
CANDIDATES = ROOT / "docs" / "data" / "biblia-emanus-early-romanian-candidates"
COMPACT_COMMA_NUMBER = re.compile(r"(?<!\d)(\d+),(\d{3})(?!\d)")
NUMBER_TOKEN = re.compile(r"\d+(?:[.,]\d+)?")


def numeric_tokens(value: str) -> list[str]:
    return NUMBER_TOKEN.findall(value)


def source_aware_number_boundaries() -> int:
    selected = {
        item.strip()
        for item in os.environ.get("PR40_BOOKS", "").split(",")
        if item.strip()
    }
    if selected and "JUB" not in selected:
        return 0

    source_docs = {
        (str(document["bookId"]), int(document["chapter"])): document
        for path in SOURCE.glob("*.json")
        for document in [json.loads(path.read_text(encoding="utf-8"))]
        if document.get("bookId") == "JUB"
    }
    changed = 0
    for path in sorted(CANDIDATES.glob("JUB.*.json")):
        candidate = json.loads(path.read_text(encoding="utf-8"))
        key = ("JUB", int(candidate["chapter"]))
        source = source_docs.get(key)
        if source is None:
            raise RuntimeError(f"{path.name}: verified Jubilees source is missing")
        source_by_number = {
            int(verse["number"]): str(verse["text"])
            for verse in source.get("verses", [])
        }
        file_changed = False
        for verse in candidate.get("verses", []):
            number = int(verse["number"])
            source_text = source_by_number.get(number)
            if source_text is None:
                raise RuntimeError(f"JUB.{key[1]}:{number}: source unit is missing")
            target = str(verse.get("text") or "")

            def restore(match: re.Match[str]) -> str:
                compact = match.group(0)
                spaced = f"{match.group(1)}, {match.group(2)}"
                if spaced in source_text and compact not in source_text:
                    return spaced
                return compact

            repaired = COMPACT_COMMA_NUMBER.sub(restore, target)
            if repaired != target:
                verse["text"] = repaired
                file_changed = True
            if numeric_tokens(source_text) != numeric_tokens(repaired):
                raise RuntimeError(
                    f"JUB.{key[1]}:{number}: numeric tokens still differ after "
                    f"source-aware formatting; source={numeric_tokens(source_text)} "
                    f"target={numeric_tokens(repaired)}"
                )
        if file_changed:
            path.write_text(
                json.dumps(candidate, ensure_ascii=False, indent=2) + "\n",
                encoding="utf-8",
            )
            changed += 1
    return changed


runpy.run_path(
    str(Path(__file__).with_name("translate-pr40-early-works-v2.py")),
    run_name="__main__",
)
print(
    json.dumps(
        {"sourceAwareJubileesNumberFiles": source_aware_number_boundaries()},
        ensure_ascii=False,
    )
)
