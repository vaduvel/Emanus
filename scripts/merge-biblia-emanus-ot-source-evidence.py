#!/usr/bin/env python3
"""Merge separately generated OT evidence shards only when they prove the full canon."""
from __future__ import annotations

import argparse
import importlib.util
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
GATE_PATH = Path(__file__).with_name("check-biblia-emanus-ot-source-evidence.py")
spec = importlib.util.spec_from_file_location("ot_evidence_gate", GATE_PATH)
assert spec and spec.loader
gate = importlib.util.module_from_spec(spec)
sys.modules[spec.name] = gate
spec.loader.exec_module(gate)


def load_records(paths: list[Path]) -> dict[str, dict[str, object]]:
    records: dict[str, dict[str, object]] = {}
    for path in paths:
        try:
            lines = path.read_text(encoding="utf-8").splitlines()
        except OSError as error:
            raise ValueError(f"nu pot citi shardul {path}: {error}") from error
        for line_number, line in enumerate(lines, 1):
            if not line.strip():
                continue
            try:
                record = json.loads(line)
            except json.JSONDecodeError as error:
                raise ValueError(f"{path}:{line_number}: JSON invalid: {error.msg}") from error
            reference = record.get("reference") if isinstance(record, dict) else None
            if not isinstance(reference, str):
                raise ValueError(f"{path}:{line_number}: record fără referință")
            if reference in records:
                raise ValueError(f"referință duplicată între sharduri: {reference}")
            records[reference] = record
    return records


def main() -> int:
    parser = argparse.ArgumentParser(description="Unește numai dovezi VT complete și validate.")
    parser.add_argument("--input", action="append", required=True, type=Path, help="Shard JSONL, repetabil")
    parser.add_argument(
        "--output",
        type=Path,
        default=ROOT / gate.DATA_RELATIVE_PATH / gate.DEFAULT_EVIDENCE_NAME,
        help="Artefactul final JSONL",
    )
    args = parser.parse_args()
    try:
        records = load_records(args.input)
        data = ROOT / gate.DATA_RELATIVE_PATH
        lock = gate.load_json_object(data / "source-lock.json", "source-lock.json")
        ledger = gate.load_json_object(data / "source-ledger.json", "source-ledger.json")
        targets = gate._load_target_verses(data, lock, ledger, gate.PRODUCTION_CONTRACT)
        contexts = gate._build_contexts(data, lock, targets)
        expected = [context.reference for context in contexts]
        if set(records) != set(expected):
            missing = [ref for ref in expected if ref not in records]
            extra = sorted(set(records).difference(expected))
            raise ValueError(f"canon incomplet: lipsă={missing[:8]}, suplimentare={extra[:8]}")
        ordered = [records[context.reference] for context in contexts]
        for index, (record, context) in enumerate(zip(ordered, contexts), 1):
            gate.validate_record(record, context, index)
    except (ValueError, gate.ValidationError) as error:
        print(f"[merge-ot-evidence] EROARE: {error}", file=sys.stderr)
        return 1

    args.output.parent.mkdir(parents=True, exist_ok=True)
    temporary = args.output.with_suffix(args.output.suffix + ".tmp")
    temporary.write_text(
        "".join(json.dumps(record, ensure_ascii=False, sort_keys=True) + "\n" for record in ordered),
        encoding="utf-8",
    )
    temporary.replace(args.output)
    print(f"[merge-ot-evidence] OK: {len(ordered)} versete în ordine canonică")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
