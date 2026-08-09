#!/usr/bin/env python3
"""Calibrate an Ollama reviewer on source-bound OT controls before a bulk pass.

The calibration mixes untouched verses with deliberately introduced defects.
It never writes publication evidence and returns a non-zero status unless the
model catches every controlled defect and approves every untouched control.
"""

from __future__ import annotations

import argparse
import importlib.util
import json
import sys
from dataclasses import replace
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def load_module(name: str, path: Path):
    spec = importlib.util.spec_from_file_location(name, path)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Nu se poate încărca {path}")
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module


GATE = load_module("ot_source_gate_calibration", ROOT / "scripts" / "check-biblia-emanus-ot-source-evidence.py")
REVIEWER = load_module("ot_reviewer_calibration", ROOT / "scripts" / "review-biblia-emanus-ot-with-ollama.py")


def parse_args(argv: list[str]) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--model", default="qwen3:8b")
    parser.add_argument("--batch-size", type=int, default=4)
    return parser.parse_args(argv)


def contexts_by_reference() -> dict[str, object]:
    data = ROOT / GATE.DATA_RELATIVE_PATH
    lock = GATE.load_json_object(data / "source-lock.json", "source-lock.json")
    ledger = GATE.load_json_object(data / "source-ledger.json", "source-ledger.json")
    contexts = GATE._build_contexts(
        data, lock, ledger and GATE._load_target_verses(data, lock, ledger, GATE.PRODUCTION_CONTRACT)
    )
    return {context.reference: context for context in contexts}


def fixture(contexts: dict[str, object]) -> list[tuple[str, object, bool, str]]:
    # Each mutation affects a feature the reviewer must catch from the supplied controls.
    cases = [
        ("GEN.5.18", True, "untouched number control"),
        ("DEU.17.4", True, "untouched omission control"),
        ("PSA.119.15", True, "untouched meaning control"),
        ("JOB.37.8", True, "untouched imagery control"),
        ("NEH.12.11", True, "untouched proper-name control"),
        ("GEN.5.18", False, "changed 162 to 152"),
        ("DEU.17.4", False, "removed diligent inquiry"),
        ("PSA.119.15", False, "reversed meditation into rejection"),
        ("JOB.37.8", False, "reversed animals taking cover"),
        ("NEH.12.11", False, "changed Jonathan to Ioram"),
    ]
    mutations = {
        ("GEN.5.18", "changed 162 to 152"): "Iared a trăit 152 de ani și a avut un fiu, pe Enoh.",
        ("DEU.17.4", "removed diligent inquiry"): "și ți se va da de știre și vei auzi. Dacă este adevărat și sigur că urâciunea aceasta a fost săvârșită în Israel,",
        ("PSA.119.15", "reversed meditation into rejection"): "Respinge poruncile Tale și nu voi privi la cărările Tale.",
        ("JOB.37.8", "reversed animals taking cover"): "Fiara sălbatică iese din peșteră și nu rămâne în vizuina ei.",
        ("NEH.12.11", "changed Jonathan to Ioram"): "Ioiada a născut pe Ioram, și Ioram a născut pe Iadua.",
    }
    items: list[tuple[str, object, bool, str]] = []
    for reference, should_approve, label in cases:
        context = contexts[reference]
        changed = mutations.get((reference, label))
        items.append((f"{reference}::{label}", replace(context, romanian=changed) if changed else context, should_approve, label))
    return items


def main(argv: list[str] | None = None) -> int:
    args = parse_args(argv or sys.argv[1:])
    cases = fixture(contexts_by_reference())
    results = []
    try:
        for key, context, expected, label in cases:
            verdict = REVIEWER.ask_compact_batch(args.model, [context])[context.reference]
            actual = verdict.get("approved") is True
            results.append({"case": key, "expectedApproved": expected, "actualApproved": actual, "passed": actual is expected, "rationale": verdict.get("rationale")})
    except Exception as error:
        print(json.dumps({
            "model": args.model,
            "passed": False,
            "error": f"răspuns de evaluator neutilizabil: {error}",
            "results": [],
        }, ensure_ascii=False, indent=2))
        return 1
    report = {"model": args.model, "passed": all(item["passed"] for item in results), "results": results}
    print(json.dumps(report, ensure_ascii=False, indent=2))
    return 0 if report["passed"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
