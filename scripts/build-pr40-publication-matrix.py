#!/usr/bin/env python3
"""Build the publication strategy and source ledger for every work found in PR #40."""
from __future__ import annotations

import hashlib
import json
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
INVENTORY = ROOT / "docs" / "biblia-emanus" / "PR40-EXACT-BOOK-INVENTORY.json"
OUT = ROOT / "docs" / "biblia-emanus" / "PR40-PUBLICATION-MATRIX.json"

CANONICAL = {
    "GEN", "EXO", "LEV", "NUM", "DEU", "JOS", "JDG", "RUT", "1SA", "2SA",
    "1KI", "2KI", "1CH", "2CH", "EZR", "NEH", "EST", "JOB", "PSA", "PRO",
    "ECC", "SNG", "ISA", "JER", "LAM", "EZK", "DAN", "HOS", "JOL", "AMO",
    "OBA", "JON", "MIC", "NAM", "HAB", "ZEP", "HAG", "ZEC", "MAL",
}
DEUTEROCANON = {
    "1ES", "1MA", "2MA", "3MA", "BAR", "ESG", "JDT", "MAN", "PS2", "SIR",
    "TOB", "WIS",
}
ETHIOPIAN_AND_EARLY = {"4BA", "DID", "ENO", "JUB"}
QUMRAN = {
    "ADD_PSA", "COMM_REG", "GEN_APO", "GIANTS", "HAB_COM", "HODAYOT",
    "SABB_SAC", "TEMP_SCR", "WAR_SCR",
}

COMMON_GATES = [
    "source-snapshot-sha256",
    "structural-coverage",
    "romanian-text-integrity",
    "semantic-cross-check",
    "explicit-gaps-and-reconstructions",
    "copyright-and-attribution",
    "atomic-collection-publication",
]


def source(id_: str, role: str, url: str, license_: str) -> dict[str, str]:
    return {"id": id_, "role": role, "url": url, "license": license_}


def sources_for(book_id: str) -> tuple[str, str, str, list[dict[str, str]]]:
    if book_id in CANONICAL:
        return (
            "canon-66",
            "complete-book",
            "repair-and-promote-existing-romanian-candidate",
            [
                source("engwebp", "public-domain bridge", "https://ebible.org/Scriptures/engwebp_usfm.zip", "Public Domain"),
                source("hboWLC", "Hebrew authority", "https://ebible.org/Scriptures/hboWLC_usfm.zip", "Public Domain text; CC BY 4.0 annotations"),
                source("ronbtf", "Romanian benchmark", "https://ebible.org/Scriptures/ronbtf_usfm.zip", "Public Domain"),
                source("ron1924", "Romanian benchmark", "https://ebible.org/Scriptures/ron1924_usfm.zip", "Public Domain"),
            ],
        )
    if book_id in DEUTEROCANON:
        return (
            "deuterocanon",
            "complete-book",
            "rebuild-from-public-domain-romanian-and-septuagint",
            [
                source("biblia-1914", "Romanian public-domain base", "https://ro.wikisource.org/wiki/Biblia_1914", "Public Domain"),
                source("eng-webbe", "English bridge and versification", "https://ebible.org/Scriptures/eng-webbe_usfm.zip", "Public Domain"),
                source("grcbrent", "Greek Septuagint authority", "https://ebible.org/Scriptures/grcbrent_usfm.zip", "Public Domain"),
                source("grclxx", "Greek Septuagint cross-check", "https://ebible.org/Scriptures/grclxx_usfm.zip", "Public Domain"),
            ],
        )
    if book_id == "ENO":
        return (
            "ethiopian-and-early-christian",
            "complete-book",
            "new-romanian-translation-from-two-public-domain-english-witnesses",
            [
                source("charles-1917-enoch", "English base translated from Ge'ez", "https://www.gutenberg.org/ebooks/77935", "Public Domain"),
                source("laurence-1883-enoch", "Independent English witness", "https://www.gutenberg.org/ebooks/77815", "Public Domain"),
            ],
        )
    if book_id == "DID":
        return (
            "ethiopian-and-early-christian",
            "complete-book",
            "new-romanian-translation-from-public-domain-geez-translation",
            [
                source("harden-1920-didascalia", "English base translated from Ge'ez", "https://commons.wikimedia.org/wiki/File:The_Ethiopic_Didascalia_(IA_cu31924096083336).pdf", "Public Domain"),
            ],
        )
    if book_id == "JUB":
        return (
            "ethiopian-and-early-christian",
            "complete-book",
            "new-romanian-translation-from-public-domain-critical-era-translation",
            [
                source("charles-1913-jubilees", "English public-domain base", "https://archive.org/details/apocryphapseudep02char", "Public Domain"),
            ],
        )
    if book_id == "4BA":
        return (
            "ethiopian-and-early-christian",
            "complete-book",
            "new-romanian-translation-from-public-domain-critical-era-translation",
            [
                source("charles-1913-rest-of-words-of-baruch", "English public-domain base", "https://archive.org/details/apocryphapseudep02char", "Public Domain"),
            ],
        )
    if book_id in QUMRAN:
        return (
            "qumran-judean-desert",
            "fragment-edition",
            "independent-transcription-and-translation-from-manuscript-images",
            [
                source("iaa-leon-levy-dss", "Manuscript image authority", "https://www.deadseascrolls.org.il/", "Ancient text; record reuse terms per manuscript image set"),
                source("etcbc-dss", "Noncommercial verification only", "https://github.com/ETCBC/dss", "CC BY-NC 4.0; cannot be the commercial publication source"),
            ],
        )
    raise ValueError(f"Unclassified PR40 book: {book_id}")


def main() -> None:
    raw = INVENTORY.read_bytes()
    inventory: dict[str, Any] = json.loads(raw)
    books = []
    for item in inventory["books"]:
        book_id = item["bookId"]
        collection, publish_form, strategy, sources = sources_for(book_id)
        if book_id in CANONICAL:
            source_status = "source-ready"
        elif book_id in DEUTEROCANON:
            source_status = "source-ready-rebuild-required"
        elif book_id in ETHIOPIAN_AND_EARLY:
            source_status = "source-ready-translation-required"
        else:
            source_status = "independent-transcription-required"
        name = next(iter(item.get("bookNames", {})), book_id)
        books.append({
            "bookId": book_id,
            "name": name,
            "pr40Chapters": item["chapterCount"],
            "pr40Units": item["verseCount"],
            "collection": collection,
            "publishForm": publish_form,
            "sourceStatus": source_status,
            "rebuildStrategy": strategy,
            "pr40PlaceholderHits": sum(item.get("placeholderHits", {}).values()),
            "pr40TextUniquenessRatio": item.get("textUniquenessRatio"),
            "sources": sources,
            "publicationGate": COMMON_GATES,
        })

    payload = {
        "schemaVersion": 1,
        "sourcePr": 40,
        "generatedFromInventorySha256": hashlib.sha256(raw).hexdigest(),
        "counts": {
            "books": len(books),
            "canon": len(CANONICAL),
            "deuterocanon": len(DEUTEROCANON),
            "ethiopianAndEarlyChristian": len(ETHIOPIAN_AND_EARLY),
            "qumran": len(QUMRAN),
        },
        "policy": {
            "allPr40TitlesRetained": True,
            "fabricatedTextRetained": False,
            "fragmentaryWorksMayOnlyPublishAsFragments": True,
            "collectionLabelsRequired": True,
            "noncommercialVerificationDataMayNotBecomePublicationText": True,
        },
        "books": sorted(books, key=lambda value: (value["collection"], value["bookId"])),
    }
    OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(payload["counts"], ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
