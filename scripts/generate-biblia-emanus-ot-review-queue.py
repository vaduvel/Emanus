#!/usr/bin/env python3
"""Create a hash-bound, unresolved review queue for the canonical OT.

The queue is deliberately not publication evidence. It gives a reviewer or an
AI review run the exact Romanian, Hebrew and WEBU bindings for every verse,
without allowing generated placeholders to be mistaken for approved verdicts.
"""

from __future__ import annotations

import argparse
import importlib.util
import json
import sys
from pathlib import Path
from types import ModuleType


ROOT = Path(__file__).resolve().parents[1]
GATE_PATH = Path(__file__).with_name("check-biblia-emanus-ot-source-evidence.py")


def load_gate() -> ModuleType:
    spec = importlib.util.spec_from_file_location("ot_source_evidence_gate", GATE_PATH)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Nu pot încărca poarta: {GATE_PATH}")
    module = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = module
    spec.loader.exec_module(module)
    return module


gate = load_gate()


def queue_record(context: object) -> dict[str, object]:
    """Render one unresolved task from a source-locked verse context."""

    reference = context.reference
    texts = {
        "romanian": {"sha256": gate.text_digest(context.romanian)},
        "hebrew": {
            "lockId": context.hebrew_lock_id,
            "references": list(context.hebrew_references),
            "sha256": gate.text_digest(context.hebrew_payload),
        },
        "webu": {
            "lockId": context.webu_lock_id,
            "references": list(context.webu_references),
            "sha256": gate.text_digest(context.webu_payload),
        },
    }
    return {
        "schemaVersion": 1,
        "recordType": "ot-verse-review-queue",
        "reference": reference,
        "texts": texts,
        "bindingSha256": gate.binding_digest(reference, texts),
        "status": "unresolved",
        "requiredChecks": ["omissions", "additions", "meaning", "names", "numbers", "negations"],
        "romanian": context.romanian,
        "hebrewPayload": context.hebrew_payload,
        "webuPayload": context.webu_payload,
    }


def generate(root: Path, output: Path, book_ids: set[str] | None = None) -> int:
    """Generate the canonical queue, optionally restricted to whole books."""

    root = root.resolve()
    data_dir = root / gate.DATA_RELATIVE_PATH
    source_lock = gate.load_json_object(data_dir / "source-lock.json", "source-lock.json")
    ledger = gate.load_json_object(data_dir / "source-ledger.json", "source-ledger.json")
    targets = gate._load_target_verses(
        data_dir, source_lock, ledger, gate.PRODUCTION_CONTRACT
    )
    contexts = gate._build_contexts(data_dir, source_lock, targets)
    output.parent.mkdir(parents=True, exist_ok=True)
    selected = [
        context for context in contexts
        if book_ids is None or context.reference.split(".", 1)[0] in book_ids
    ]
    if not selected:
        raise gate.ValidationError("selecția nu conține versete canonice")
    with output.open("w", encoding="utf-8", newline="\n") as handle:
        for context in selected:
            handle.write(json.dumps(queue_record(context), ensure_ascii=False, sort_keys=True))
            handle.write("\n")
    return len(selected)


def parse_args(argv: list[str]) -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Generează coada nerezolvată de revizie per-verset pentru VT canonic."
    )
    parser.add_argument("--root", type=Path, default=ROOT)
    parser.add_argument(
        "--book",
        action="append",
        choices=[book_id for book_id, _ in gate.CANONICAL_OT_CHAPTERS],
        help="Restrânge coada la o carte canonică; poate fi repetat.",
    )
    parser.add_argument(
        "--output",
        type=Path,
        required=True,
        help="Fișier JSONL de ieșire; nu este un artefact de publicare.",
    )
    return parser.parse_args(argv)


def main(argv: list[str] | None = None) -> int:
    args = parse_args(sys.argv[1:] if argv is None else argv)
    output = args.output if args.output.is_absolute() else args.root / args.output
    try:
        count = generate(args.root, output, set(args.book) if args.book else None)
    except gate.ValidationError as error:
        print(f"[ot-review-queue] EROARE: {error}", file=sys.stderr)
        return 1
    print(f"[ot-review-queue] OK: {count} versete în {output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
