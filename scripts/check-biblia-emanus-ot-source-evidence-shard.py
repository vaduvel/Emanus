#!/usr/bin/env python3
"""Validate one complete OT book evidence shard before it is merged."""

from __future__ import annotations

import argparse
import importlib.util
import json
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
GATE_PATH = Path(__file__).with_name("check-biblia-emanus-ot-source-evidence.py")
SPEC = importlib.util.spec_from_file_location("ot_evidence_gate", GATE_PATH)
assert SPEC and SPEC.loader
GATE = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = GATE
SPEC.loader.exec_module(GATE)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--book", required=True, choices=[book for book, _ in GATE.CANONICAL_OT_CHAPTERS])
    parser.add_argument("--input", required=True, type=Path)
    args = parser.parse_args()
    try:
        data = ROOT / GATE.DATA_RELATIVE_PATH
        lock = GATE.load_json_object(data / "source-lock.json", "source-lock.json")
        ledger = GATE.load_json_object(data / "source-ledger.json", "source-ledger.json")
        contexts = [
            context for context in GATE._build_contexts(
                data, lock, GATE._load_target_verses(data, lock, ledger, GATE.PRODUCTION_CONTRACT)
            ) if context.reference.startswith(args.book + ".")
        ]
        rows = [json.loads(line) for line in args.input.read_text(encoding="utf-8").splitlines() if line.strip()]
        if len(rows) != len(contexts):
            raise GATE.ValidationError(f"{args.book}: {len(rows)} recorduri, necesare {len(contexts)}")
        references = [row.get("reference") if isinstance(row, dict) else None for row in rows]
        expected = [context.reference for context in contexts]
        if references != expected:
            raise GATE.ValidationError(f"{args.book}: ordinea sau acoperirea versetelor nu corespunde canonului")
        for number, (row, context) in enumerate(zip(rows, contexts, strict=True), 1):
            GATE.validate_record(row, context, number)
    except (OSError, json.JSONDecodeError, GATE.ValidationError) as error:
        print(f"[ot-evidence-shard] EROARE: {error}", file=sys.stderr)
        return 1
    print(f"[ot-evidence-shard] OK: {args.book}, {len(contexts)} versete aprobate")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
