#!/usr/bin/env python3
"""Build an isolated OT/deuterocanon candidate set on top of main.

Only Bible data is imported from quarantined PR #40. Existing public corpus on
main is never overwritten. Newly imported chapters live outside the runtime
corpus and cannot become public until a later promotion step passes all gates.
"""
from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
PUBLIC_DATA = ROOT / "docs" / "data" / "biblia-emanus"
CANDIDATE_DATA = ROOT / "docs" / "data" / "biblia-emanus-candidates"
QUARANTINE = ROOT / ".repair-source" / "docs" / "data" / "biblia-emanus"
REPORT_DIR = ROOT / "docs" / "biblia-emanus"

CANONICAL_IMPORT = {
    "JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB",
    "PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO",
    "OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL",
}
DEUTEROCANON = {"TOB","JDT","ESG","WIS","SIR","BAR","1MA","2MA","3MA","1ES","MAN","PS2"}
QUARANTINED = {"ENO","JUB","4BA","DID","GEN_APO","COMM_REG","WAR_SCR","HAB_COM","HODAYOT","SABB_SAC","TEMP_SCR","ADD_PSA","GIANTS"}
META_FILES = {"manifest.json", "source-ledger.json", "source-lock.json", "onomastics.json", "nt-versification.json"}


def load(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def dump(path: Path, obj: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(obj, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def chapter_files(path: Path):
    for file in sorted(path.glob("*.json")):
        if file.name in META_FILES:
            continue
        if re.match(r"^[1-3A-Z_]+\.\d+\.json$", file.name):
            yield file


def digest(verses: list[dict[str, Any]]) -> str:
    value = "\n".join(str(v.get("text", "")) for v in verses)
    return hashlib.sha256(value.encode("utf-8")).hexdigest()


def main() -> None:
    if not QUARANTINE.exists():
        raise SystemExit(f"Missing quarantined source: {QUARANTINE}")

    if CANDIDATE_DATA.exists():
        for old in CANDIDATE_DATA.glob("*.json"):
            old.unlink()
    CANDIDATE_DATA.mkdir(parents=True, exist_ok=True)

    imported = {"canonicalChapters": 0, "deuterocanonChapters": 0, "quarantinedChapters": 0}
    quarantine_catalog: list[dict[str, Any]] = []
    candidate_books: dict[str, dict[str, Any]] = {}

    for source_file in chapter_files(QUARANTINE):
        doc = load(source_file)
        book_id = str(doc.get("bookId", ""))
        chapter = doc.get("chapter", doc.get("chapterNumber"))

        if book_id in QUARANTINED:
            imported["quarantinedChapters"] += 1
            quarantine_catalog.append({
                "file": source_file.name,
                "bookId": book_id,
                "chapter": chapter,
                "reason": "unsupported-or-placeholder-source",
            })
            continue
        if book_id not in CANONICAL_IMPORT | DEUTEROCANON:
            continue
        if (PUBLIC_DATA / source_file.name).exists():
            # Never duplicate or overwrite corpus already present on main.
            continue

        doc["status"] = "in_review"
        doc["public"] = False
        review = doc.setdefault("review", {})
        for key in (
            "aiSourceLanguage", "aiRomanianLanguage", "aiTheologicalContext",
            "omissionAddition", "benchmarkComparison", "copyrightDistance", "criticalIssues",
        ):
            review[key] = "pending"

        audit = doc.setdefault("audit", {})
        audit["reviewLevel"] = "quarantined-candidate"
        audit["reviewAgent"] = {
            "type": "automated-import",
            "engine": "biblia-emanus-ot-repair5",
            "method": "imported-from-pr40-pending-independent-verification",
        }
        audit["textDigest"] = digest(doc.get("verses", []))
        audit.pop("sourceSnapshotSha256", None)
        audit.pop("benchmarkEvidence", None)

        if book_id in CANONICAL_IMPORT:
            doc["category"] = "Vechiul Testament Protocanonic"
            imported["canonicalChapters"] += 1
            group = "canonical"
        else:
            doc["category"] = "Deuterocanon / Apocrife istorice"
            imported["deuterocanonChapters"] += 1
            group = "deuterocanon"

        verses = doc.get("verses", [])
        stats = candidate_books.setdefault(book_id, {
            "bookId": book_id,
            "bookName": doc.get("bookName"),
            "group": group,
            "chapters": 0,
            "verses": 0,
            "status": "in_review",
            "public": False,
        })
        stats["chapters"] += 1
        stats["verses"] += len(verses)
        dump(CANDIDATE_DATA / source_file.name, doc)

    candidate_manifest = {
        "schemaVersion": 1,
        "sourcePr": 40,
        "baseBranch": "main",
        "runtimeEnabled": False,
        "publicationAllowed": False,
        "books": sorted(candidate_books.values(), key=lambda x: x["bookId"]),
        "progress": imported,
    }
    dump(CANDIDATE_DATA / "manifest.json", candidate_manifest)
    dump(REPORT_DIR / "PR40-QUARANTINED-CATALOG.json", {
        "sourcePr": 40,
        "policy": "Ethiopian and Qumran candidates were not copied into the public Bible corpus because the source branch contains placeholders or unsupported provenance.",
        "items": quarantine_catalog,
    })
    dump(REPORT_DIR / "OT-REPAIR5-BOOTSTRAP.json", imported)
    print(json.dumps(imported, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
