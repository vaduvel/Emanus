#!/usr/bin/env python3
from __future__ import annotations

import importlib.util
import json
import os
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OLD = Path(os.environ.get("OLD_PIPELINE", "/tmp/old_pipeline.py"))
SPEC = importlib.util.spec_from_file_location("old_nt_pipeline", OLD)
assert SPEC and SPEC.loader
old = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = old
SPEC.loader.exec_module(old)

REFS = [
    ("MAT", 6, 13),
    ("JHN", 1, 18),
    ("JHN", 1, 20),
    ("JHN", 1, 27),
    ("JHN", 1, 30),
    ("LUK", 2, 12),
    ("LUK", 2, 17),
    ("LUK", 10, 11),
    ("1JN", 5, 3),
    ("1JN", 5, 12),
    ("1JN", 5, 16),
    ("1JN", 5, 17),
    ("1PE", 3, 8),
    ("REV", 16, 2),
]

manifest = old.validator.load_json(old.validator.MANIFEST_PATH)
paths = old.validator.validate_manifest(manifest)
source_data = old.validator.validate_source_lock(old.validator.load_json(paths["sourceLock"]))

records = []
for book_id, chapter, verse in REFS:
    data = old.validator.load_json(old.DATA_DIR / f"{book_id}.{chapter}.json")
    current = next(item["text"] for item in data["verses"] if item["number"] == verse)
    book = source_data["books"][book_id]
    source = old.clean_source(old.source_text(source_data, book["baseLockId"], book_id, chapter, verse))
    benchmarks = [
        source_data["texts"][lock_id].get((chapter, verse), "")
        for lock_id in book["benchmarkLockIds"]
    ]
    records.append({
        "ref": f"{book_id}.{chapter}.{verse}",
        "source": source,
        "current": current,
        "benchmarks": benchmarks,
    })

from transformers import AutoModelForSeq2SeqLM, AutoTokenizer
import torch

model_id = "facebook/nllb-200-distilled-600M"
tokenizer = AutoTokenizer.from_pretrained(model_id, src_lang="eng_Latn")
model = AutoModelForSeq2SeqLM.from_pretrained(model_id)
model.eval()
texts = [record["source"] for record in records]
with torch.inference_mode():
    encoded = tokenizer(texts, return_tensors="pt", padding=True, truncation=True, max_length=512)
    generated = model.generate(
        **encoded,
        forced_bos_token_id=tokenizer.convert_tokens_to_ids("ron_Latn"),
        num_beams=5,
        max_new_tokens=256,
        early_stopping=True,
    )
translations = tokenizer.batch_decode(generated, skip_special_tokens=True)
for record, translated in zip(records, translations):
    record["nllb"] = old.modernize(translated)

out = ROOT / "tmp-nt-nllb-sample"
out.mkdir(exist_ok=True)
(out / "sample.json").write_text(json.dumps(records, ensure_ascii=False, indent=2), encoding="utf-8")
for record in records:
    print("\n", record["ref"])
    print("EN:", record["source"])
    print("CURRENT:", record["current"])
    print("NLLB:", record["nllb"])
    print("BENCH:", " | ".join(record["benchmarks"]))
