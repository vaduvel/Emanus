#!/usr/bin/env python3
"""Run the publication-only editorial evidence gate for the New Testament."""

from __future__ import annotations

import importlib.util
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def load_module(name: str, path: Path):
    spec = importlib.util.spec_from_file_location(name, path)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Nu pot încărca {path.name}")
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module


def main() -> int:
    validator = load_module("biblia_emanus_validator_for_nt_editorial", ROOT / "scripts" / "check-biblia-emanus.py")
    gate = load_module("nt_editorial_gate_for_cli", ROOT / "scripts" / "nt_editorial_gate.py")
    try:
        manifest = validator.load_json(validator.MANIFEST_PATH)
        paths = validator.validate_manifest(manifest)
        source_data = validator.validate_source_lock(validator.load_json(paths["sourceLock"]))
        ledger = validator.validate_ledger(validator.load_json(paths["sourceLedger"]), source_data)
        validator.validate_source_coverage(ledger, source_data)
        bound_source_data = gate.bind_source_reference_mapper(
            source_data,
            lambda lock_id, book_id, chapter, verse: validator.source_references_for_target(
                lock_id, book_id, chapter, verse, source_data["rules"]
            ),
        )
        summary = gate.validate_nt_editorial_approval(
            validator.DATA_DIR,
            bound_source_data,
            ledger,
        )
    except (validator.ValidationError, gate.EditorialGateError) as error:
        print(f"[biblia-emanus-nt-editorial] EROARE: {error}", file=sys.stderr)
        return 1
    print(
        "[biblia-emanus-nt-editorial] OK: "
        f"{summary.verses} dovezi individuale, digest={summary.corpus_digest}"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
