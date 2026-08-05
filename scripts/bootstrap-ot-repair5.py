#!/usr/bin/env python3
"""Build a clean OT/deuterocanon candidate on top of main.

This script is executed by a controlled GitHub Actions workflow. It imports only
Bible corpus files from the quarantined PR #40 branch, never application code.
It preserves every chapter already published on main (GEN-JOS and the complete
NT), withdraws unsupported Ethiopian/Qumran placeholders, and marks newly
imported material in_review until the permanent gates approve it.
"""
from __future__ import annotations

import hashlib
import json
import re
import shutil
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
MAIN_DATA = ROOT / "docs" / "data" / "biblia-emanus"
QUARANTINE = ROOT / ".repair-source" / "docs" / "data" / "biblia-emanus"
REPORT_DIR = ROOT / "docs" / "biblia-emanus"

CANONICAL_IMPORT = {
    "JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB",
    "PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO",
    "OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL",
}
DEUTEROCANON = {"TOB","JDT","ESG","WIS","SIR","BAR","1MA","2MA","3MA","1ES","MAN","PS2"}
QUARANTINED = {"ENO","JUB","4BA","DID","GEN_APO","COMM_REG","WAR_SCR","HAB_COM","HODAYOT","SABB_SAC","TEMP_SCR","ADD_PSA","GIANTS"}


def load(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def dump(path: Path, obj: Any) -> None:
    path.write_text(json.dumps(obj, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def chapter_files(path: Path):
    for file in sorted(path.glob("*.json")):
        if file.name in {"manifest.json", "source-ledger.json", "source-lock.json", "onomastics.json", "nt-versification.json"}:
            continue
        if re.match(r"^[1-3A-Z_]+\.\d+\.json$", file.name):
            yield file


def digest(verses: list[dict[str, Any]]) -> str:
    value = "\n".join(str(v.get("text", "")) for v in verses)
    return hashlib.sha256(value.encode("utf-8")).hexdigest()


def main() -> None:
    if not QUARANTINE.exists():
        raise SystemExit(f"Missing quarantined source: {QUARANTINE}")

    imported = {"canonical": 0, "deuterocanon": 0, "quarantined": 0}
    quarantine_catalog: list[dict[str, Any]] = []

    for source_file in chapter_files(QUARANTINE):
        doc = load(source_file)
        book_id = str(doc.get("bookId", ""))
        if book_id in QUARANTINED:
            imported["quarantined"] += 1
            quarantine_catalog.append({
                "file": source_file.name,
                "bookId": book_id,
                "chapter": doc.get("chapter", doc.get("chapterNumber")),
                "reason": "unsupported-or-placeholder-source",
            })
            continue
        if book_id not in CANONICAL_IMPORT | DEUTEROCANON:
            continue

        target = MAIN_DATA / source_file.name
        if target.exists():
            # Never overwrite corpus already published on main.
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
            imported["canonical"] += 1
        else:
            doc["category"] = "Deuterocanon / Apocrife istorice"
            imported["deuterocanon"] += 1

        dump(target, doc)

    REPORT_DIR.mkdir(parents=True, exist_ok=True)
    dump(REPORT_DIR / "PR40-QUARANTINED-CATALOG.json", {
        "sourcePr": 40,
        "policy": "Ethiopian and Qumran candidates were not copied into the public Bible corpus because the source branch contains placeholders or unsupported provenance.",
        "items": quarantine_catalog,
    })
    dump(REPORT_DIR / "OT-REPAIR5-BOOTSTRAP.json", imported)
    print(json.dumps(imported, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
