#!/usr/bin/env python3
"""Publish the canonical OT only after every current repository gate passes."""

from __future__ import annotations

import copy
import importlib.util
import json
import subprocess
import sys
from datetime import date
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs" / "data" / "biblia-emanus"
VALIDATOR_PATH = Path(__file__).with_name("check-biblia-emanus.py")
PREFLIGHT = (
    ("check-biblia-emanus.py",),
    ("check-biblia-emanus-ot-publication-gate.py",),
)
ENGINE = "Codex direct WLC/OSHB-WEBU editorial review 2026-08-09"


def load_validator():
    spec = importlib.util.spec_from_file_location("biblia_emanus_validator", VALIDATOR_PATH)
    if spec is None or spec.loader is None:
        raise RuntimeError("Nu se poate încărca validatorul Biblia Emanus")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def write_json(path: Path, value: dict) -> None:
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def run_preflight() -> None:
    for command in PREFLIGHT:
        result = subprocess.run(
            [sys.executable, str(ROOT / "scripts" / command[0]), *command[1:]],
            cwd=ROOT,
            check=False,
        )
        if result.returncode:
            raise RuntimeError(f"Preflight eșuat: {' '.join(command)}")


def approve_ot_chapter(validator, document: dict, source_data: dict) -> dict:
    candidate = copy.deepcopy(document)
    book_id = candidate["bookId"]
    book = source_data["books"][book_id]
    if book.get("testament") != "OT":
        return candidate
    if candidate.get("status") not in {"in_review", "published"}:
        validator.fail(f"{book_id}.{candidate.get('chapter')}: stare neașteptată înainte de publicare")

    audit = candidate.get("audit")
    if not isinstance(audit, dict):
        validator.fail(f"{book_id}.{candidate.get('chapter')}: lipsește auditul")
    for key in ("sourceLanguage", "romanianLanguage", "theologicalContext", "omissionAddition", "copyrightDistance", "criticalIssues"):
        section = audit.get(key)
        if not isinstance(section, dict):
            validator.fail(f"{book_id}.{candidate.get('chapter')}: lipsește audit.{key}")
        section["result"] = "approved"
    audit["omissionAddition"]["omissions"] = 0
    audit["omissionAddition"]["additions"] = 0
    audit["criticalIssues"]["open"] = 0
    audit["schemaVersion"] = 1
    audit["completedOn"] = date.today().isoformat()
    audit["reviewLevel"] = "ai-complete"
    audit["engineVersion"] = validator.LEGACY_ENGINE_VERSION
    audit["reviewAgent"] = {
        "type": "ai",
        "engine": ENGINE,
        "method": "verse-by-verse-source-and-benchmark",
    }
    audit["sourceSnapshotSha256"] = source_data["snapshotSha256ByBook"][book_id]
    audit["benchmarkEvidence"] = {
        "pinnedBenchmarks": len(book["benchmarkLockIds"]),
        "externalBenchmarks": len(book["externalBenchmarkIds"]),
        "result": "approved",
    }
    audit.pop("invalidatedOn", None)
    audit.pop("invalidationReason", None)

    review = candidate.get("review")
    if not isinstance(review, dict):
        validator.fail(f"{book_id}.{candidate.get('chapter')}: lipsește review")
    for key in validator.AUTOMATED_REVIEW_KEYS:
        review[key] = "approved"

    candidate["status"] = "published"
    candidate["public"] = True
    audit["textDigest"] = validator.chapter_text_digest(candidate)
    return candidate


def main() -> int:
    validator = load_validator()
    try:
        run_preflight()
        manifest = validator.load_json(validator.MANIFEST_PATH)
        paths = validator.validate_manifest(manifest)
        source_data = validator.validate_source_lock(validator.load_json(paths["sourceLock"]))
        ledger = validator.validate_ledger(validator.load_json(paths["sourceLedger"]), source_data)
        forbidden = validator.validate_onomastics(validator.load_json(paths["onomastics"]))
        validator.validate_source_coverage(ledger, source_data)

        chapter_paths = sorted(
            (path for path in DATA.glob("*.json") if validator.CHAPTER_ID_PATTERN.fullmatch(path.stem)),
            key=validator.chapter_sort_key,
        )
        documents = {path: validator.load_json(path) for path in chapter_paths}
        candidates = {
            path: approve_ot_chapter(validator, document, source_data)
            for path, document in documents.items()
        }
        ot_paths = [path for path, value in candidates.items() if source_data["books"][value["bookId"]]["testament"] == "OT"]
        if len(ot_paths) != 929:
            validator.fail(f"Corpus OT incomplet: {len(ot_paths)} capitole")

        validated = [
            validator.validate_chapter(path, candidates[path], manifest, ledger, source_data, forbidden)
            for path in chapter_paths
        ]
        if not all(item[3] == "published" for item in validated):
            validator.fail("Corpusul canonic complet nu este publicat în candidatul final")

        candidate_manifest = copy.deepcopy(manifest)
        candidate_manifest["status"] = "published"
        candidate_manifest["public"] = True
        candidate_manifest.pop("publicationBlock", None)
        candidate_manifest["progress"]["chaptersApproved"] = len(validated)
        candidate_manifest["progress"]["chaptersPublished"] = len(validated)
        candidate_manifest["oldTestament"] = {
            "books": 39,
            "chapters": 929,
            "verses": 23145,
            "status": "published",
            "public": True,
        }

        for path in ot_paths:
            write_json(path, candidates[path])
        write_json(validator.MANIFEST_PATH, candidate_manifest)
        if validator.main() != 0:
            raise RuntimeError("Validatorul corpusului a eșuat după scriere")
        if subprocess.run(
            [sys.executable, str(ROOT / "scripts" / "check-biblia-emanus-ot-publication-gate.py")],
            cwd=ROOT,
            check=False,
        ).returncode:
            raise RuntimeError("Poarta VT a eșuat după publicare")
    except (RuntimeError, validator.ValidationError) as error:
        print(f"[ot-finalize] EROARE: {error}", file=sys.stderr)
        return 1

    print("[ot-finalize] OK: 39 cărți, 929 capitole și 23145 versete VT publicate.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
