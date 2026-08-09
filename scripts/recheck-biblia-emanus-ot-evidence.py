#!/usr/bin/env python3
"""Recheck only unresolved OT evidence with the detailed six-dimension prompt."""
from __future__ import annotations

import argparse
import importlib.util
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
GATE_PATH = Path(__file__).with_name("check-biblia-emanus-ot-source-evidence.py")
REVIEWER_PATH = Path(__file__).with_name("review-biblia-emanus-ot-with-ollama.py")


def load_module(name: str, path: Path):
    spec = importlib.util.spec_from_file_location(name, path)
    assert spec and spec.loader
    module = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = module
    spec.loader.exec_module(module)
    return module


gate = load_module("ot_evidence_gate", GATE_PATH)
reviewer = load_module("ot_evidence_reviewer", REVIEWER_PATH)


def unresolved_references(paths: list[Path]) -> list[str]:
    references: list[str] = []
    seen: set[str] = set()
    for path in paths:
        for line_number, line in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
            if not line.strip():
                continue
            record = json.loads(line)
            reference = record.get("reference")
            if not isinstance(reference, str):
                raise ValueError(f"{path}:{line_number}: reference invalid")
            if reference in seen:
                raise ValueError(f"referință repetată între sharduri: {reference}")
            seen.add(reference)
            if record.get("status") != "approved":
                references.append(reference)
    return references


def main() -> int:
    parser = argparse.ArgumentParser(description="Reevaluează numai verdicturile VT neclare.")
    parser.add_argument("--input", action="append", required=True, type=Path)
    parser.add_argument("--output", required=True, type=Path)
    parser.add_argument("--model", default="gemma3:4b")
    parser.add_argument("--mode", choices=("compact", "detailed"), default="compact")
    args = parser.parse_args()
    try:
        references = unresolved_references(args.input)
        data = ROOT / gate.DATA_RELATIVE_PATH
        lock = gate.load_json_object(data / "source-lock.json", "source-lock.json")
        ledger = gate.load_json_object(data / "source-ledger.json", "source-ledger.json")
        targets = gate._load_target_verses(data, lock, ledger, gate.PRODUCTION_CONTRACT)
        contexts = {
            context.reference: context
            for context in gate._build_contexts(data, lock, targets)
        }
        missing = [reference for reference in references if reference not in contexts]
        if missing:
            raise ValueError(f"referințe în afara canonului: {missing[:8]}")
        if args.output.exists() and args.output.read_text(encoding="utf-8").strip():
            raise ValueError("ieșirea trebuie să fie un fișier nou sau gol")
        args.output.parent.mkdir(parents=True, exist_ok=True)
        with args.output.open("a", encoding="utf-8") as out:
            for index, reference in enumerate(references, 1):
                context = contexts[reference]
                try:
                    result = (
                        reviewer.compact_record(context, reviewer.ask_compact(args.model, context), args.model)
                        if args.mode == "compact"
                        else reviewer.record(context, reviewer.ask(args.model, context), args.model)
                    )
                except Exception as error:
                    print(f"[recheck-ot-evidence] {reference}: {error}", file=sys.stderr)
                    return 1
                out.write(json.dumps(result, ensure_ascii=False, sort_keys=True) + "\n")
                out.flush()
                print(f"{index}/{len(references)} {reference} {result['status']}", flush=True)
    except (OSError, ValueError, gate.ValidationError, json.JSONDecodeError) as error:
        print(f"[recheck-ot-evidence] EROARE: {error}", file=sys.stderr)
        return 1
    print(f"[recheck-ot-evidence] OK: {len(references)} verdicturi reevaluate")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
