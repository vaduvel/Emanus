#!/usr/bin/env python3
"""Sanitize the recoverable OT candidate scope.

Keeps the 33 remaining canonical OT books plus Prayer of Manasseh and Psalm 151.
Fabricated deuterocanon candidates are removed from the candidate corpus and
recorded in a quarantine ledger. All inherited approval/provenance claims are
reset and replaced with honest pinned-source metadata.
"""
from __future__ import annotations

import hashlib
import json
import re
import unicodedata
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs" / "data" / "biblia-emanus-candidates"
OUT = ROOT / "docs" / "biblia-emanus"
SOURCES = DATA / "sources"

CANONICAL = {
    "JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB",
    "PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO",
    "OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL",
}
SUPPLEMENTS = {"MAN", "PS2"}
REMOVE = {"TOB","JDT","ESG","WIS","SIR","BAR","1MA","2MA","3MA","1ES"}


def load(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def dump(path: Path, obj: Any) -> None:
    path.write_text(json.dumps(obj, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def sha(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def text_digest(verses: list[dict[str, Any]]) -> str:
    raw = "\n".join(str(v.get("text", "")) for v in verses)
    return hashlib.sha256(raw.encode("utf-8")).hexdigest()


def clean_text(text: str) -> str:
    replacements = {
        "ş": "ș", "Ş": "Ș", "ţ": "ț", "Ţ": "Ț",
        "Ișit-am": "Ieșit-am",
        "uidea": "Iudeea",
        "str strămoșești": "strămoșești",
    }
    for old, new in replacements.items():
        text = text.replace(old, new)
    text = unicodedata.normalize("NFC", text)
    text = re.sub(r"[ \t]+", " ", text).strip()
    return text


def main() -> None:
    source_meta = {
        "webbe": {
            "id": "eng-webbe",
            "name": "World English Bible British Edition with Deuterocanon",
            "license": "Public Domain",
            "snapshot": "sources/eng-webbe_usfm.zip",
            "sha256": sha(SOURCES / "eng-webbe_usfm.zip"),
            "role": "public-domain bridge and versification control",
        },
        "wlc": {
            "id": "hebwlc",
            "name": "Westminster Leningrad Codex",
            "license": "Public Domain",
            "snapshot": "sources/hebwlc_usfm.zip",
            "sha256": sha(SOURCES / "hebwlc_usfm.zip"),
            "role": "Hebrew authority for canonical Old Testament",
        },
        "btf": {
            "id": "ronbtf",
            "name": "Biblia Traducerea Fidelă",
            "license": "Public Domain",
            "snapshot": "sources/ronbtf_usfm.zip",
            "sha256": sha(SOURCES / "ronbtf_usfm.zip"),
            "role": "Romanian comparison-only benchmark",
        },
    }

    removed = []
    kept = {"canonicalChapters": 0, "supplementChapters": 0, "verses": 0}
    books: dict[str, dict[str, Any]] = {}

    for path in sorted(DATA.glob("*.json")):
        if path.name == "manifest.json":
            continue
        doc = load(path)
        book = str(doc.get("bookId", ""))
        if book in REMOVE:
            removed.append({
                "file": path.name,
                "bookId": book,
                "chapter": doc.get("chapter", doc.get("chapterNumber")),
                "reason": "fabricated-repeated-text-in-pr40",
            })
            path.unlink()
            continue
        if book not in CANONICAL | SUPPLEMENTS:
            continue

        verses = doc.get("verses", [])
        for verse in verses:
            verse["text"] = clean_text(str(verse.get("text", "")))

        doc["status"] = "in_review"
        doc["public"] = False
        doc["category"] = "Vechiul Testament Protocanonic" if book in CANONICAL else "Suplimente istorice necanonice"
        doc["source"] = {
            "policy": "independent-verification-of-inherited-romanian-candidate",
            "bridge": source_meta["webbe"],
            "originalAuthority": source_meta["wlc"] if book in CANONICAL else {
                "id": "septuagint-derived-tradition",
                "name": "Greek textual tradition; exact critical edition not stored",
                "role": "external textual authority pending specialist apparatus",
            },
            "romanianBenchmark": source_meta["btf"] if book in CANONICAL else None,
            "exactTextCopied": False,
        }
        if doc["source"]["romanianBenchmark"] is None:
            del doc["source"]["romanianBenchmark"]

        doc["review"] = {
            "sourceCoverage": "pending",
            "romanianLanguage": "pending",
            "semanticAlignment": "pending",
            "theologicalContext": "pending",
            "versification": "pending",
            "copyrightDistance": "pending",
            "criticalIssues": "pending",
        }
        doc["audit"] = {
            "engineVersion": "5.0.0",
            "reviewLevel": "source-backed-candidate",
            "reviewAgent": {
                "type": "automated-adversarial-audit",
                "engine": "biblia-emanus-ot-repair5",
                "method": "WEBBE/WLC/BTF pinned-source comparison; no inherited approval retained",
            },
            "textDigest": text_digest(verses),
            "sourceSnapshots": {
                key: value["sha256"] for key, value in source_meta.items()
                if key != "btf" or book in CANONICAL
            },
        }
        doc["editorialNotes"] = []
        dump(path, doc)

        group = "canonical" if book in CANONICAL else "supplement"
        item = books.setdefault(book, {
            "bookId": book,
            "bookName": doc.get("bookName"),
            "group": group,
            "chapters": 0,
            "verses": 0,
            "status": "in_review",
            "public": False,
        })
        item["chapters"] += 1
        item["verses"] += len(verses)
        kept["verses"] += len(verses)
        if book in CANONICAL:
            kept["canonicalChapters"] += 1
        else:
            kept["supplementChapters"] += 1

    manifest = {
        "schemaVersion": 2,
        "sourcePr": 40,
        "baseBranch": "main",
        "runtimeEnabled": False,
        "publicationAllowed": False,
        "scope": {
            "canonicalOldTestamentRemaining": sorted(CANONICAL),
            "historicalSupplements": sorted(SUPPLEMENTS),
            "excludedFabricatedBooks": sorted(REMOVE),
        },
        "sources": source_meta,
        "books": sorted(books.values(), key=lambda value: value["bookId"]),
        "progress": kept,
    }
    dump(DATA / "manifest.json", manifest)
    OUT.mkdir(parents=True, exist_ok=True)
    dump(OUT / "OT-REPAIR5-FABRICATED-DEUTEROCANON-QUARANTINE.json", {
        "sourcePr": 40,
        "books": sorted(REMOVE),
        "chapters": removed,
        "policy": "Removed from candidate and runtime corpus. Must be translated again from a pinned real source before reconsideration.",
    })
    print(json.dumps({"kept": kept, "removedChapters": len(removed)}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
