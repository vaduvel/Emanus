#!/usr/bin/env python3
from __future__ import annotations

import argparse
import importlib.util
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
VALIDATOR_PATH = ROOT / "scripts/check-biblia-emanus.py"
SPEC = importlib.util.spec_from_file_location("biblia_emanus_validator", VALIDATOR_PATH)
assert SPEC is not None and SPEC.loader is not None
validator = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(validator)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("chapter", type=int)
    args = parser.parse_args()
    if not 1 <= args.chapter <= 16:
        raise SystemExit("Romans chapter must be 1-16")

    manifest = validator.load_json(validator.MANIFEST_PATH)
    paths = validator.validate_manifest(manifest)
    source_data = validator.validate_source_lock(
        validator.load_json(paths["sourceLock"])
    )
    chapter_path = validator.DATA_DIR / f"ROM.{args.chapter}.json"
    data = validator.load_json(chapter_path)
    book = source_data["books"]["ROM"]
    base_id = book["baseLockId"]
    original_id = book["originalLockId"]
    supplemental_ids = book.get("supplementalOriginalLockIds", [])
    benchmark_ids = book["benchmarkLockIds"]
    rules = source_data["rules"]

    print(f"=== ROMANI {args.chapter} — RAPORT SEMANTIC ===")
    print(f"status={data['status']} public={data['public']} verses={len(data['verses'])}")
    print(f"base={base_id} original={original_id} supplemental={','.join(supplemental_ids)}")
    print()

    for verse in data["verses"]:
        number = verse["number"]
        direct = (args.chapter, number)
        original_refs = validator.source_references_for_target(
            original_id, "ROM", args.chapter, number, rules
        )
        original_text = " | ".join(
            source_data["texts"][original_id][reference]
            for reference in original_refs
            if reference in source_data["texts"][original_id]
        )
        supplemental = []
        for lock_id in supplemental_ids:
            refs = validator.source_references_for_target(
                lock_id, "ROM", args.chapter, number, rules
            )
            values = [
                source_data["texts"][lock_id][reference]
                for reference in refs
                if reference in source_data["texts"][lock_id]
            ]
            supplemental.append(f"{lock_id}: {' | '.join(values)}")
        benchmarks = [
            f"{lock_id}: {source_data['texts'][lock_id].get(direct, '[LIPSĂ]')}"
            for lock_id in benchmark_ids
        ]
        print(f"--- {args.chapter}:{number}")
        print(f"BE: {verse['text']}")
        print(f"SBLGNT: {original_text}")
        print(f"WEBU: {source_data['texts'][base_id].get(direct, '[LIPSĂ]')}")
        for value in supplemental:
            print(value)
        for value in benchmarks:
            print(value)

    print("\n=== EDITORIAL NOTES ===")
    print(json.dumps(data.get("editorialNotes", []), ensure_ascii=False, indent=2))
    print("\n=== REFERENCE NOTES ===")
    print(json.dumps(data.get("referenceNotes", []), ensure_ascii=False, indent=2))
    print("\n=== CURRENT AUDIT ===")
    print(json.dumps(data.get("audit", {}), ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
