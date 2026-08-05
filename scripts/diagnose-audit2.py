#!/usr/bin/env python3
"""Report every deterministic length, overlap, and sequence failure in one pass."""
from __future__ import annotations

import importlib.util
import json
from difflib import SequenceMatcher
from pathlib import Path
from statistics import median

ROOT = Path(__file__).resolve().parents[1]
VALIDATOR_PATH = ROOT / "scripts" / "check-biblia-emanus.py"
SPEC = importlib.util.spec_from_file_location("biblia_emanus_validator", VALIDATOR_PATH)
assert SPEC is not None and SPEC.loader is not None
validator = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(validator)

manifest = validator.load_json(validator.MANIFEST_PATH)
paths = validator.validate_manifest(manifest)
source_data = validator.validate_source_lock(validator.load_json(paths["sourceLock"]))
ledger = validator.validate_ledger(validator.load_json(paths["sourceLedger"]), source_data)
validator.validate_source_coverage(ledger, source_data)

failures: list[str] = []
for path in sorted(
    validator.DATA_DIR.glob("*.json"),
    key=validator.chapter_sort_key,
):
    if path.name in {"manifest.json", "source-lock.json", "source-ledger.json", "onomastics.json"}:
        continue
    data = json.loads(path.read_text(encoding="utf-8"))
    book = source_data["books"].get(data.get("bookId"))
    if not book:
        continue
    lock_ids = book["benchmarkLockIds"]
    thresholds = source_data["thresholds"]
    minimum_words = int(thresholds["minimumWordsForTokenOverlap"])
    chapter_texts = {lock_id: [] for lock_id in lock_ids}
    emanus_chapter: list[str] = []
    for verse in data["verses"]:
        reference = (data["chapter"], verse["number"])
        emanus = validator.normalize_for_comparison(verse["text"])
        benchmarks = [
            validator.normalize_for_comparison(source_data["texts"][lock_id][reference])
            for lock_id in lock_ids
        ]
        expected_length = median(len(value.split()) for value in benchmarks)
        ratio = len(emanus.split()) / expected_length
        if not thresholds["minimumLengthRatio"] <= ratio <= thresholds["maximumLengthRatio"]:
            failures.append(
                f"{path.name}:{verse['number']} LENGTH={ratio:.3f}\n"
                f"  BE: {verse['text']}\n"
                + "\n".join(
                    f"  {lock_id}: {source_data['texts'][lock_id][reference]}"
                    for lock_id in lock_ids
                )
            )
        if len(emanus.split()) >= minimum_words:
            tokens = set(emanus.split())
            overlaps = []
            for benchmark in benchmarks:
                btokens = set(benchmark.split())
                overlaps.append(len(tokens & btokens) / max(1, len(tokens | btokens)))
            if max(overlaps) < thresholds["minimumRomanianTokenOverlap"]:
                failures.append(
                    f"{path.name}:{verse['number']} OVERLAP={max(overlaps):.3f}\n"
                    f"  BE: {verse['text']}\n"
                    + "\n".join(
                        f"  {lock_id}: {source_data['texts'][lock_id][reference]}"
                        for lock_id in lock_ids
                    )
                )
        emanus_chapter.append(emanus)
        for lock_id, benchmark in zip(lock_ids, benchmarks):
            chapter_texts[lock_id].append(benchmark)
    normalized = " ".join(emanus_chapter)
    for lock_id, values in chapter_texts.items():
        similarity = SequenceMatcher(None, normalized, " ".join(values)).ratio()
        if similarity > thresholds["maximumChapterSequenceSimilarity"]:
            failures.append(f"{path.name} SIMILARITY {lock_id}={similarity:.4f}")

if failures:
    print(f"[audit2-diagnostic] {len(failures)} probleme deterministe:")
    print("\n\n".join(failures))
    raise SystemExit(1)
print("[audit2-diagnostic] Nu există probleme deterministe.")
