#!/usr/bin/env python3
"""Validate the hash-bound OT semantic-screening artifact without an ML runtime.

The artifact is intentionally not publication evidence.  This checker only
ensures that every screening row still points to the exact Romanian, Hebrew,
and WEBU text now stored in the repository.  Consequently, a textual repair
forces a fresh screening pass before its report can be relied upon.
"""

from __future__ import annotations

import argparse
import importlib.util
import json
import sys
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
GATE_PATH = ROOT / "scripts" / "check-biblia-emanus-ot-source-evidence.py"
SPEC = importlib.util.spec_from_file_location("ot_source_evidence_gate", GATE_PATH)
if SPEC is None or SPEC.loader is None:  # pragma: no cover - repository invariant
    raise RuntimeError(f"Nu se poate încărca poarta: {GATE_PATH}")
GATE = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = GATE
SPEC.loader.exec_module(GATE)

REQUIRED_KEYS = {
    "schemaVersion", "recordType", "reference", "bindingSha256", "sourceHashes",
    "model", "webuSimilarity", "classification", "reviewThreshold", "screeningOnly",
    "publicationEvidence", "generatedAt",
}


def fail(message: str) -> None:
    raise SystemExit(f"[ot-semantic-screening] EROARE: {message}")


def parse_args(argv: list[str]) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=ROOT)
    parser.add_argument("--artifact", type=Path)
    return parser.parse_args(argv)


def load_records(path: Path) -> list[dict[str, Any]]:
    try:
        lines = path.read_text(encoding="utf-8").splitlines()
    except FileNotFoundError:
        fail(f"lipsește artefactul: {path}")
    records: list[dict[str, Any]] = []
    for number, line in enumerate(lines, start=1):
        if not line:
            fail(f"linie goală la {number}")
        try:
            record = json.loads(line)
        except json.JSONDecodeError as error:
            fail(f"JSON invalid la linia {number}: {error.msg}")
        if not isinstance(record, dict):
            fail(f"linia {number} nu este obiect JSON")
        records.append(record)
    return records


def expected_hashes(context: Any) -> tuple[str, dict[str, str]]:
    texts = {
        "romanian": context.romanian,
        "hebrew": {
            "lockId": context.hebrew_lock_id,
            "references": list(context.hebrew_references),
            "payload": context.hebrew_payload,
        },
        "webu": {
            "lockId": context.webu_lock_id,
            "references": list(context.webu_references),
            "payload": context.webu_payload,
        },
    }
    return GATE.binding_digest(context.reference, texts), {
        "romanian": GATE.text_digest(context.romanian),
        "hebrewPayload": GATE.text_digest(context.hebrew_payload),
        "webuPayload": GATE.text_digest(context.webu_payload),
    }


def validate_record(record: dict[str, Any], context: Any, number: int) -> None:
    owner = f"linia {number} ({context.reference})"
    if set(record) != REQUIRED_KEYS:
        fail(f"{owner}: schema invalidă")
    if record.get("schemaVersion") != 1 or record.get("recordType") != "ot-verse-semantic-screening":
        fail(f"{owner}: schemaVersion sau recordType invalid")
    if record.get("reference") != context.reference:
        fail(f"{owner}: referință nealiniată")
    if record.get("screeningOnly") is not True or record.get("publicationEvidence") is not False:
        fail(f"{owner}: artefactul nu este marcat explicit ca screening neeligibil pentru publicare")
    threshold = record.get("reviewThreshold")
    score = record.get("webuSimilarity")
    if not isinstance(threshold, (float, int)) or not 0 < float(threshold) < 1:
        fail(f"{owner}: prag invalid")
    if not isinstance(score, (float, int)) or not -1 <= float(score) <= 1:
        fail(f"{owner}: scor invalid")
    expected_classification = "review" if float(score) < float(threshold) else "screened"
    if record.get("classification") != expected_classification:
        fail(f"{owner}: clasificare incompatibilă cu scorul")
    model = record.get("model")
    if not isinstance(model, dict) or set(model) != {"name", "revision"}:
        fail(f"{owner}: identificator de model invalid")
    if not all(isinstance(model[key], str) and model[key].strip() for key in model):
        fail(f"{owner}: identificator de model incomplet")
    expected_binding, hashes = expected_hashes(context)
    if record.get("bindingSha256") != expected_binding:
        fail(f"{owner}: bindingSha256 este stale")
    if record.get("sourceHashes") != hashes:
        fail(f"{owner}: hash-urile surselor sunt stale")


def main(argv: list[str] | None = None) -> int:
    args = parse_args(argv or sys.argv[1:])
    root = args.root.resolve()
    data_dir = root / GATE.DATA_RELATIVE_PATH
    artifact = args.artifact or data_dir / "ot-semantic-screening.jsonl"
    if not artifact.is_absolute():
        artifact = root / artifact
    source_lock = GATE.load_json_object(data_dir / "source-lock.json", "source-lock.json")
    ledger = GATE.load_json_object(data_dir / "source-ledger.json", "source-ledger.json")
    targets = GATE._load_target_verses(data_dir, source_lock, ledger, GATE.PRODUCTION_CONTRACT)
    contexts = GATE._build_contexts(data_dir, source_lock, targets)
    records = load_records(artifact)
    if len(records) != len(contexts):
        fail(f"acoperire incompletă: {len(records)} din {len(contexts)} versete")
    for number, (record, context) in enumerate(zip(records, contexts, strict=True), start=1):
        validate_record(record, context, number)
    review_count = sum(record["classification"] == "review" for record in records)
    print(
        f"[ot-semantic-screening] OK: {len(records)} versete legate de surse; "
        f"{review_count} în coada de verificare; nu este dovadă de publicare."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
