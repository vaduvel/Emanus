#!/usr/bin/env python3
"""Create a hash-bound multilingual semantic screening artifact for the OT.

This is deliberately a *screening* pass, not a publication gate.  A sentence
embedding can prioritise verses whose Romanian rendering is unexpectedly far
from the aligned WEBU control, but it cannot establish faithfulness to Hebrew
or approve doctrine.  The strict per-verse source-evidence gate remains the
only publication gate.
"""

from __future__ import annotations

import argparse
import hashlib
import importlib.util
import json
import sys
from collections import Counter
from datetime import date
from pathlib import Path
from typing import Any

import numpy as np
from sentence_transformers import SentenceTransformer

GATE_PATH = Path(__file__).with_name("check-biblia-emanus-ot-source-evidence.py")
GATE_SPEC = importlib.util.spec_from_file_location("ot_source_evidence_gate", GATE_PATH)
if GATE_SPEC is None or GATE_SPEC.loader is None:  # pragma: no cover - impossible in repo
    raise RuntimeError(f"Nu se poate încărca poarta: {GATE_PATH}")
GATE = importlib.util.module_from_spec(GATE_SPEC)
sys.modules[GATE_SPEC.name] = GATE
GATE_SPEC.loader.exec_module(GATE)

DATA_RELATIVE_PATH = GATE.DATA_RELATIVE_PATH
PRODUCTION_CONTRACT = GATE.PRODUCTION_CONTRACT
ROOT = GATE.ROOT
_build_contexts = GATE._build_contexts
binding_digest = GATE.binding_digest
load_json_object = GATE.load_json_object
text_digest = GATE.text_digest


MODEL_NAME = "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2"
SCHEMA_VERSION = 1
DEFAULT_OUTPUT = "ot-semantic-screening.jsonl"


def parse_args(argv: list[str]) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--data-dir", type=Path, default=ROOT / DATA_RELATIVE_PATH)
    parser.add_argument("--output", type=Path)
    parser.add_argument("--model", default=MODEL_NAME)
    parser.add_argument("--batch-size", type=int, default=96)
    parser.add_argument(
        "--review-threshold",
        type=float,
        default=0.42,
        help="scores below this value are queued for source review (default: 0.42)",
    )
    return parser.parse_args(argv)


def model_revision(model: SentenceTransformer, fallback: str) -> str:
    """Return a stable model identity when the model exposes a revision."""

    config = getattr(model, "_model_config", None)
    if isinstance(config, dict) and isinstance(config.get("revision"), str):
        return config["revision"]
    return fallback


def output_record(
    context: Any,
    score: float,
    *,
    model_name: str,
    model_revision_value: str,
    threshold: float,
) -> dict[str, Any]:
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
    score = round(float(score), 6)
    return {
        "schemaVersion": SCHEMA_VERSION,
        "recordType": "ot-verse-semantic-screening",
        "reference": context.reference,
        "bindingSha256": binding_digest(context.reference, texts),
        "sourceHashes": {
            "romanian": text_digest(context.romanian),
            "hebrewPayload": text_digest(context.hebrew_payload),
            "webuPayload": text_digest(context.webu_payload),
        },
        "model": {"name": model_name, "revision": model_revision_value},
        "webuSimilarity": score,
        "classification": "review" if score < threshold else "screened",
        "reviewThreshold": threshold,
        "screeningOnly": True,
        "publicationEvidence": False,
        "generatedAt": date.today().isoformat(),
    }


def write_jsonl(path: Path, records: list[dict[str, Any]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    payload = "".join(
        json.dumps(record, ensure_ascii=False, sort_keys=True, separators=(",", ":")) + "\n"
        for record in records
    )
    path.write_text(payload, encoding="utf-8")


def main(argv: list[str] | None = None) -> int:
    args = parse_args(argv or sys.argv[1:])
    if not 0 < args.review_threshold < 1:
        raise SystemExit("--review-threshold trebuie să fie între 0 și 1")
    if args.batch_size < 1:
        raise SystemExit("--batch-size trebuie să fie pozitiv")

    data_dir = args.data_dir.resolve()
    source_lock = load_json_object(data_dir / "source-lock.json", "source-lock.json")
    ledger = load_json_object(data_dir / "source-ledger.json", "source-ledger.json")
    targets = GATE._load_target_verses(data_dir, source_lock, ledger, PRODUCTION_CONTRACT)
    if len(targets) != PRODUCTION_CONTRACT.expected_verse_count:
        raise SystemExit(f"Corpus OT incomplet: {len(targets)} versete")
    contexts = _build_contexts(data_dir, source_lock, targets)
    if len(contexts) != PRODUCTION_CONTRACT.expected_verse_count:
        raise SystemExit(f"Context sursă incomplet: {len(contexts)} versete")

    model = SentenceTransformer(args.model)
    romanian = model.encode(
        [context.romanian for context in contexts],
        batch_size=args.batch_size,
        normalize_embeddings=True,
        show_progress_bar=True,
    )
    webu = model.encode(
        [context.webu_payload for context in contexts],
        batch_size=args.batch_size,
        normalize_embeddings=True,
        show_progress_bar=True,
    )
    scores = np.sum(romanian * webu, axis=1)
    revision = model_revision(model, "unspecified")
    records = [
        output_record(
            context,
            score,
            model_name=args.model,
            model_revision_value=revision,
            threshold=args.review_threshold,
        )
        for context, score in zip(contexts, scores, strict=True)
    ]
    output = args.output or data_dir / DEFAULT_OUTPUT
    write_jsonl(output, records)

    classes = Counter(record["classification"] for record in records)
    report = {
        "verses": len(records),
        "output": str(output),
        "artifactSha256": hashlib.sha256(output.read_bytes()).hexdigest(),
        "min": round(float(np.min(scores)), 6),
        "median": round(float(np.median(scores)), 6),
        "mean": round(float(np.mean(scores)), 6),
        "review": classes["review"],
        "screened": classes["screened"],
        "publicationEvidence": False,
    }
    print(json.dumps(report, ensure_ascii=False, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
