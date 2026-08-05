#!/usr/bin/env python3
from __future__ import annotations

import importlib.util
import json
import math
import os
import sys
from pathlib import Path

import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

ROOT = Path(__file__).resolve().parents[1]
OLD = Path(os.environ.get("OLD_PIPELINE", "scripts/tmp-old-pipeline.generated.py"))
SPEC = importlib.util.spec_from_file_location("old_nt_pipeline", OLD)
assert SPEC and SPEC.loader
old = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = old
SPEC.loader.exec_module(old)

REFS = [
    "MAT.5.3", "MAT.6.22", "MAT.6.33", "MAT.22.21",
    "1CO.9.24", "1JN.3.12", "2CO.1.17", "HEB.2.6", "JAS.4.14",
    "JHN.7.19", "JHN.11.44", "JHN.12.34", "JHN.13.21", "JHN.16.17",
    "JHN.18.35", "JHN.19.21", "JHN.21.15", "JHN.21.16", "JHN.21.17",
    "LUK.2.17", "ACT.27.31", "REV.16.2",
]

manifest = old.validator.load_json(old.validator.MANIFEST_PATH)
paths = old.validator.validate_manifest(manifest)
source_data = old.validator.validate_source_lock(old.validator.load_json(paths["sourceLock"]))

def get_btf(book: str, chapter: int, verse: int) -> str:
    info = source_data["books"][book]
    lock = next(x for x in info["benchmarkLockIds"] if x.startswith("BTF-"))
    return source_data["texts"][lock].get((chapter, verse), "")

model_id = "readerbench/RoGPT2-base"
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(model_id)
model.eval()
if tokenizer.pad_token_id is None:
    tokenizer.pad_token = tokenizer.eos_token

@torch.inference_mode()
def score(text: str) -> dict:
    encoded = tokenizer(text, return_tensors="pt", truncation=True, max_length=512)
    ids = encoded["input_ids"]
    if ids.shape[1] < 2:
        return {"loss": 999.0, "ppl": 1e9, "tokens": int(ids.shape[1])}
    outputs = model(**encoded, labels=ids)
    loss = float(outputs.loss)
    return {"loss": loss, "ppl": float(math.exp(min(loss, 20))), "tokens": int(ids.shape[1])}

records = []
for ref in REFS:
    book, chapter_s, verse_s = ref.split(".")
    chapter, verse = int(chapter_s), int(verse_s)
    data = old.validator.load_json(old.DATA_DIR / f"{book}.{chapter}.json")
    current = next(x["text"] for x in data["verses"] if x["number"] == verse)
    btf = get_btf(book, chapter, verse)
    records.append({"ref": ref, "current": current, "currentScore": score(current), "btf": btf, "btfScore": score(btf)})

out = ROOT / "tmp-nt-rogpt2-sample"
out.mkdir(exist_ok=True)
(out / "sample.json").write_text(json.dumps(records, ensure_ascii=False, indent=2), encoding="utf-8")
for item in records:
    print("\n", item["ref"], "current", round(item["currentScore"]["loss"], 3), "btf", round(item["btfScore"]["loss"], 3))
    print("CURRENT:", item["current"])
    print("BTF:", item["btf"])
