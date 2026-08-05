#!/usr/bin/env python3
from __future__ import annotations

import importlib.util
import json
from difflib import SequenceMatcher
from pathlib import Path
from statistics import median

ROOT = Path(__file__).resolve().parents[1]
VALIDATOR_PATH = ROOT / "scripts/check-biblia-emanus.py"
SPEC = importlib.util.spec_from_file_location("biblia_emanus_validator", VALIDATOR_PATH)
assert SPEC is not None and SPEC.loader is not None
validator = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(validator)

NT_IDS = set(validator.NT_CHAPTER_COUNTS)


def main() -> int:
    manifest = validator.load_json(validator.MANIFEST_PATH)
    paths = validator.validate_manifest(manifest)
    source_data = validator.validate_source_lock(validator.load_json(paths["sourceLock"]))
    thresholds = source_data["thresholds"]
    minimum_words = int(thresholds["minimumWordsForTokenOverlap"])
    issues: list[dict] = []
    checked_verses = 0

    for path in sorted(validator.DATA_DIR.glob("*.json"), key=validator.chapter_sort_key):
        try:
            book_id, _chapter_text = path.stem.split(".")
        except ValueError:
            continue
        if book_id not in NT_IDS:
            continue
        data = validator.load_json(path)
        verses = data.get("verses", [])
        if not verses or all(verse.get("text") == "DE TRADUS" for verse in verses):
            continue
        book = source_data["books"][book_id]
        lock_ids = book["benchmarkLockIds"]
        chapter = data["chapter"]
        emanus_chapter: list[str] = []
        benchmark_chapters: dict[str, list[str]] = {lock_id: [] for lock_id in lock_ids}

        for verse in verses:
            checked_verses += 1
            reference = (chapter, verse["number"])
            emanus = validator.normalize_for_comparison(verse["text"])
            benchmark_texts = [
                validator.normalize_for_comparison(source_data["texts"][lock_id][reference])
                for lock_id in lock_ids
            ]
            benchmark_lengths = [len(value.split()) for value in benchmark_texts]
            expected_length = median(benchmark_lengths)
            length_ratio = len(emanus.split()) / max(1, expected_length)
            overlap = None
            if len(emanus.split()) >= minimum_words:
                emanus_tokens = set(emanus.split())
                scores = []
                for benchmark_text in benchmark_texts:
                    benchmark_tokens = set(benchmark_text.split())
                    union = emanus_tokens | benchmark_tokens
                    scores.append(len(emanus_tokens & benchmark_tokens) / max(1, len(union)))
                overlap = max(scores)
            length_bad = not (
                thresholds["minimumLengthRatio"]
                <= length_ratio
                <= thresholds["maximumLengthRatio"]
            )
            overlap_bad = overlap is not None and overlap < thresholds["minimumRomanianTokenOverlap"]
            if length_bad or overlap_bad:
                issues.append({
                    "reference": f"{path.stem}.{verse['number']}",
                    "lengthRatio": round(length_ratio, 3),
                    "maxTokenOverlap": None if overlap is None else round(overlap, 3),
                    "emanus": verse["text"],
                    "benchmarks": {
                        lock_id: source_data["texts"][lock_id][reference]
                        for lock_id in lock_ids
                    },
                })
            emanus_chapter.append(emanus)
            for lock_id, benchmark_text in zip(lock_ids, benchmark_texts):
                benchmark_chapters[lock_id].append(benchmark_text)

        normalized_emanus = " ".join(emanus_chapter)
        for lock_id, values in benchmark_chapters.items():
            similarity = SequenceMatcher(None, normalized_emanus, " ".join(values)).ratio()
            if similarity > thresholds["maximumChapterSequenceSimilarity"]:
                issues.append({
                    "reference": path.stem,
                    "chapterSimilarity": round(similarity, 4),
                    "benchmark": lock_id,
                    "kind": "possible-systematic-copying",
                })

    print(json.dumps({"checkedVerses": checked_verses, "issues": issues}, ensure_ascii=False, indent=2))
    return 1 if issues else 0


if __name__ == "__main__":
    raise SystemExit(main())
