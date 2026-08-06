#!/usr/bin/env python3
"""Run v4 and remove source-impossible unmatched Romanian quote glyphs.

The public-domain Harden source used for Didascalia contains no typographic
quote glyphs in the two affected units. Marian can nevertheless emit an
isolated closing Romanian/French quote while translating reported speech.
This wrapper repairs only such source-impossible, structurally unbalanced
quote artifacts. Balanced quotations are preserved, and the script fails
closed whenever the verified source itself contains quote glyphs.
"""
from __future__ import annotations

import hashlib
import json
import os
import re
import runpy
from collections import Counter
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "docs" / "data" / "biblia-emanus-early-source-candidates"
CANDIDATES = ROOT / "docs" / "data" / "biblia-emanus-early-romanian-candidates"
QUOTE_GLYPHS = '"“”„«»'
QUOTE_RE = re.compile(f"[{re.escape(QUOTE_GLYPHS)}]")


def sha_text(value: str) -> str:
    return hashlib.sha256(value.encode("utf-8")).hexdigest()


def selected_books() -> set[str]:
    raw = os.environ.get("PR40_BOOKS", "").strip()
    return {item.strip() for item in raw.split(",") if item.strip()} if raw else {"ENO", "JUB", "DID", "4BA"}


def quote_counts(value: str) -> dict[str, int]:
    return {glyph: value.count(glyph) for glyph in QUOTE_GLYPHS if value.count(glyph)}


def has_unbalanced_quotes(value: str) -> bool:
    return (
        value.count('"') % 2 != 0
        or value.count('«') != value.count('»')
        or value.count('„') + value.count('“') != value.count('”')
    )


def normalize_after_quote_removal(value: str) -> str:
    value = re.sub(r"\s+", " ", value).strip()
    value = re.sub(r"\s+([,.;:!?])", r"\1", value)
    value = re.sub(r"([,;:!?])(\S)", r"\1 \2", value)
    return value


def repair_source_impossible_quotes() -> dict[str, Any]:
    if "DID" not in selected_books():
        return {"examined": 0, "repaired": []}

    source_documents = {
        int(document["chapter"]): document
        for path in SOURCE.glob("DID.*.json")
        for document in [json.loads(path.read_text(encoding="utf-8"))]
    }
    examined = 0
    repaired_rows: list[dict[str, Any]] = []

    for path in sorted(CANDIDATES.glob("DID.*.json")):
        document = json.loads(path.read_text(encoding="utf-8"))
        chapter = int(document["chapter"])
        source_document = source_documents.get(chapter)
        if source_document is None:
            raise RuntimeError(f"{path.name}: verified Didascalia source is missing")
        source_by_number = {
            int(verse["number"]): str(verse["text"]).strip()
            for verse in source_document.get("verses", [])
        }
        changed = False
        document_repairs: list[dict[str, Any]] = []

        for verse in document.get("verses", []):
            examined += 1
            number = int(verse["number"])
            source = source_by_number.get(number)
            if source is None:
                raise RuntimeError(f"DID.{chapter}:{number}: verified source unit is missing")
            target = str(verse.get("text") or "").strip()
            if not has_unbalanced_quotes(target):
                continue

            reference = f"DID.{chapter}:{number}"
            source_quotes = quote_counts(source)
            if source_quotes:
                raise RuntimeError(
                    f"{reference}: target quotes are unbalanced but verified source "
                    f"contains quote glyphs {source_quotes}; refusing to guess"
                )

            removed = Counter(QUOTE_RE.findall(target))
            repaired = normalize_after_quote_removal(QUOTE_RE.sub("", target))
            if not repaired or has_unbalanced_quotes(repaired) or quote_counts(repaired):
                raise RuntimeError(f"{reference}: source-aware quote repair did not close cleanly")

            verse["text"] = repaired
            row = {
                "reference": reference,
                "reason": "source-impossible-unbalanced-quote-glyphs",
                "sourceDigest": sha_text(source),
                "previousTargetDigest": sha_text(target),
                "repairedTargetDigest": sha_text(repaired),
                "removedQuoteGlyphs": dict(sorted(removed.items())),
            }
            document_repairs.append(row)
            repaired_rows.append(row)
            changed = True

        if changed:
            document.setdefault("audit", {})["sourceAwareQuoteRecovery"] = document_repairs
            path.write_text(
                json.dumps(document, ensure_ascii=False, indent=2) + "\n",
                encoding="utf-8",
            )

    unresolved: list[str] = []
    for path in sorted(CANDIDATES.glob("DID.*.json")):
        document = json.loads(path.read_text(encoding="utf-8"))
        for verse in document.get("verses", []):
            target = str(verse.get("text") or "")
            if has_unbalanced_quotes(target):
                unresolved.append(f"DID.{document['chapter']}:{verse['number']}")
    if unresolved:
        raise RuntimeError(f"Unbalanced Didascalia quotes remain after repair: {unresolved}")

    return {"examined": examined, "repaired": repaired_rows}


runpy.run_path(
    str(Path(__file__).with_name("translate-pr40-early-works-v4.py")),
    run_name="__main__",
)
print(json.dumps({"sourceAwareQuoteRecovery": repair_source_impossible_quotes()}, ensure_ascii=False, indent=2))
