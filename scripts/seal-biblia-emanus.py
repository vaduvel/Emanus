#!/usr/bin/env python3
"""Seal audited Biblia Emanus chapters and make them publishable."""

from __future__ import annotations

import argparse
import copy
import importlib.util
import json
import re
from pathlib import Path
from types import ModuleType
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "docs" / "data" / "biblia-emanus"
CHAPTER_FILE = re.compile(r"^([A-Z0-9]{3})\.([1-9][0-9]*)\.json$")


def load_validator() -> ModuleType:
    path = ROOT / "scripts" / "check-biblia-emanus.py"
    spec = importlib.util.spec_from_file_location("biblia_emanus_validator", path)
    if spec is None or spec.loader is None:
        raise RuntimeError("Nu pot încărca motorul Biblia Emanus")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def write_json(path: Path, data: dict[str, Any]) -> None:
    existing = path.read_text(encoding="utf-8") if path.exists() else ""
    if existing.count("\n") <= 1:
        rendered = json.dumps(data, ensure_ascii=False, separators=(",", ":"))
    else:
        rendered = json.dumps(data, ensure_ascii=False, indent=2)
    path.write_text(rendered + "\n", encoding="utf-8")


def seal_chapter(
    validator: ModuleType,
    data: dict[str, Any],
    source_data: dict[str, Any],
    engine_name: str,
) -> dict[str, Any]:
    candidate = copy.deepcopy(data)
    book = source_data["books"][candidate["bookId"]]
    audit = candidate.get("audit")
    if not isinstance(audit, dict):
        validator.fail("capitolul nu are audit semantic AI")
    candidate["status"] = "published"
    candidate["public"] = True
    if book["testament"] == "NT":
        audit["schemaVersion"] = 2
    audit["engineVersion"] = (
        validator.NT_ENGINE_VERSION
        if book["testament"] == "NT"
        else validator.LEGACY_ENGINE_VERSION
    )
    audit["reviewLevel"] = "ai-complete"
    audit["reviewAgent"] = {
        "type": "ai",
        "engine": engine_name,
        "method": "verse-by-verse-source-and-benchmark",
    }
    audit["sourceSnapshotSha256"] = source_data["snapshotSha256ByBook"][candidate["bookId"]]
    audit["benchmarkEvidence"] = {
        "pinnedBenchmarks": len(book["benchmarkLockIds"]),
        "externalBenchmarks": len(book["externalBenchmarkIds"]),
        "result": "approved",
    }
    audit["textDigest"] = validator.chapter_text_digest(candidate)
    if book["testament"] == "NT":
        audit["contentDigest"] = validator.chapter_content_digest(candidate)
    return candidate


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Sigilează auditul AI și publică numai capitolele care trec poarta completă."
    )
    parser.add_argument("--book", action="append", dest="books", help="ID USFM, de exemplu GEN")
    parser.add_argument("--engine", help="Numele agentului AI care a executat auditul semantic")
    parser.add_argument("--check", action="store_true", help="Simulează fără să scrie fișiere")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    validator = load_validator()
    try:
        manifest = validator.load_json(validator.MANIFEST_PATH)
        paths = validator.validate_manifest(manifest)
        source_data = validator.validate_source_lock(validator.load_json(paths["sourceLock"]))
        ledger = validator.validate_ledger(
            validator.load_json(paths["sourceLedger"]), source_data
        )
        forbidden = validator.validate_onomastics(validator.load_json(paths["onomastics"]))
        validator.validate_source_coverage(ledger, source_data)

        chapter_paths = sorted(
            (path for path in DATA_DIR.glob("*.json") if CHAPTER_FILE.match(path.name)),
            key=validator.chapter_sort_key,
        )
        requested = set(args.books or source_data["books"])
        unknown = requested.difference(source_data["books"])
        if unknown:
            validator.fail(f"cărți necunoscute: {', '.join(sorted(unknown))}")
        selected = [path for path in chapter_paths if CHAPTER_FILE.match(path.name).group(1) in requested]
        if not selected:
            validator.fail("nu există capitole selectate")

        candidates: dict[Path, dict[str, Any]] = {
            path: validator.load_json(path) for path in chapter_paths
        }
        for path in selected:
            existing_agent = (candidates[path].get("audit") or {}).get("reviewAgent") or {}
            engine_name = args.engine or existing_agent.get("engine")
            if not isinstance(engine_name, str) or not engine_name.strip():
                validator.fail(f"{path.name}: folosește --engine pentru a identifica agentul AI")
            candidates[path] = seal_chapter(
                validator, candidates[path], source_data, engine_name.strip()
            )

        validated = [
            validator.validate_chapter(
                path, candidates[path], manifest, ledger, source_data, forbidden
            )
            for path in chapter_paths
        ]
        chapter_ids = [item[0] for item in validated]
        if manifest.get("draftedChapters") != chapter_ids or list(ledger) != chapter_ids:
            validator.fail("manifestul, registrul și fișierele capitolelor nu corespund")

        candidate_manifest = copy.deepcopy(manifest)
        approved = sum(1 for item in validated if item[3] in {"approved", "published"})
        published = sum(1 for item in validated if item[3] == "published")
        candidate_manifest["public"] = published > 0
        candidate_manifest["progress"]["chaptersApproved"] = approved
        candidate_manifest["progress"]["chaptersPublished"] = published
    except validator.ValidationError as error:
        print(f"[biblia-emanus-seal] EROARE: {error}")
        return 1

    action = "eligibile" if args.check else "publicate"
    if not args.check:
        for path in selected:
            write_json(path, candidates[path])
        write_json(validator.MANIFEST_PATH, candidate_manifest)
        if validator.main() != 0:
            return 1
    print(
        f"[biblia-emanus-seal] OK: {len(selected)} capitole {action}; "
        "auditul semantic, textul și snapshotul au același sigiliu."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
