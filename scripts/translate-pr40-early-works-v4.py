#!/usr/bin/env python3
"""Run the early-work pipeline and recover pathologically truncated long units.

The normal pipeline translates source units through two independent Marian
models and then selects the strongest complete candidate. Very long prose can
still contain one pathological beam output even though the source was split
correctly. This final wrapper detects only severe length loss or runaway token
repetition, retranslates the affected verified source unit with much smaller
segments, recursively splits any still-degenerate segment, and fails closed if
source coverage is not restored. The regular multilingual publication audit
runs after this script and remains authoritative.
"""
from __future__ import annotations

import gc
import hashlib
import json
import os
import re
import runpy
from pathlib import Path
from typing import Any

import torch
from huggingface_hub import HfApi
from transformers import MarianMTModel, MarianTokenizer

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "docs" / "data" / "biblia-emanus-early-source-candidates"
CANDIDATES = ROOT / "docs" / "data" / "biblia-emanus-early-romanian-candidates"
MODEL_ID = "Helsinki-NLP/opus-mt-tc-big-en-ro"
SENTENCE_BREAK = re.compile(r"(?<=[.!?;:])\s+")
NUMBER_TOKEN = re.compile(r"\d+(?:[.,]\d+)?")
WORD_TOKEN = re.compile(r"\w+", re.UNICODE)


def sha_text(value: str) -> str:
    return hashlib.sha256(value.encode("utf-8")).hexdigest()


def normalized(value: str) -> str:
    value = value.translate(str.maketrans({"ş": "ș", "Ş": "Ș", "ţ": "ț", "Ţ": "Ț"}))
    value = re.sub(r"\s+", " ", value).strip()
    value = re.sub(r"\s+([,.;:!?])", r"\1", value)
    value = re.sub(r"([,;:!?])(\S)", r"\1 \2", value)
    return value


def numeric_tokens(value: str) -> list[str]:
    return NUMBER_TOKEN.findall(value)


def maximum_identical_word_run(value: str) -> int:
    words = [word.lower() for word in WORD_TOKEN.findall(value)]
    longest = 0
    current = 0
    previous: str | None = None
    for word in words:
        if word == previous:
            current += 1
        else:
            previous = word
            current = 1
        longest = max(longest, current)
    return longest


def length_ratio(source: str, target: str) -> float:
    return len(target.split()) / max(len(source.split()), 1)


def severely_degenerate(source: str, target: str) -> bool:
    ratio = length_ratio(source, target)
    return not target or ratio < 0.55 or ratio > 2.2 or maximum_identical_word_run(target) >= 5


def pack_segments(tokenizer: MarianTokenizer, text: str, limit: int) -> list[str]:
    sentences = [part.strip() for part in SENTENCE_BREAK.split(text) if part.strip()]
    if not sentences:
        sentences = [text]
    segments: list[str] = []
    current = ""
    for sentence in sentences:
        candidate = f"{current} {sentence}".strip()
        if len(tokenizer.encode(candidate, add_special_tokens=True)) <= limit:
            current = candidate
            continue
        if current:
            segments.append(current)
            current = ""
        if len(tokenizer.encode(sentence, add_special_tokens=True)) <= limit:
            current = sentence
            continue
        part = ""
        for word in sentence.split():
            candidate = f"{part} {word}".strip()
            if part and len(tokenizer.encode(candidate, add_special_tokens=True)) > limit:
                segments.append(part)
                part = word
            else:
                part = candidate
        if part:
            current = part
    if current:
        segments.append(current)
    if not segments or " ".join(segments).split() != text.split():
        raise RuntimeError("Long-unit recovery segmentation changed verified source words")
    return segments


def generate(
    tokenizer: MarianTokenizer,
    model: MarianMTModel,
    source_segments: list[str],
    batch_size: int = 8,
) -> list[str]:
    translated: list[str] = []
    for index in range(0, len(source_segments), batch_size):
        batch = source_segments[index:index + batch_size]
        encoded = tokenizer(batch, return_tensors="pt", padding=True, truncation=False)
        with torch.inference_mode():
            output = model.generate(
                **encoded,
                max_new_tokens=384,
                num_beams=4,
                length_penalty=1.0,
                repetition_penalty=1.08,
                no_repeat_ngram_size=4,
                early_stopping=True,
            )
        translated.extend(
            normalized(value)
            for value in tokenizer.batch_decode(output, skip_special_tokens=True)
        )
    return translated


def retry_parts(tokenizer: MarianTokenizer, source: str) -> list[str]:
    token_count = len(tokenizer.encode(source, add_special_tokens=True))
    smaller_limit = max(36, min(80, token_count // 2))
    parts = pack_segments(tokenizer, source, smaller_limit)
    if len(parts) > 1:
        return parts
    words = source.split()
    if len(words) < 2:
        return [source]
    midpoint = len(words) // 2
    return [" ".join(words[:midpoint]), " ".join(words[midpoint:])]


def translate_reliably(
    tokenizer: MarianTokenizer,
    model: MarianMTModel,
    source: str,
    depth: int = 0,
) -> str:
    target = generate(tokenizer, model, [source], batch_size=1)[0]
    if not severely_degenerate(source, target):
        return target
    if depth >= 6 or len(source.split()) < 8:
        raise RuntimeError(
            "Long-unit recovery could not produce a complete segment: "
            f"depth={depth} sourceWords={len(source.split())} "
            f"targetWords={len(target.split())} repeatedRun={maximum_identical_word_run(target)}"
        )
    parts = retry_parts(tokenizer, source)
    if len(parts) < 2 or " ".join(parts).split() != source.split():
        raise RuntimeError("Long-unit recursive split did not preserve source words")
    return normalized(" ".join(
        translate_reliably(tokenizer, model, part, depth + 1)
        for part in parts
    ))


def recover_unit(
    tokenizer: MarianTokenizer,
    model: MarianMTModel,
    source: str,
) -> tuple[str, int, int]:
    source_segments = pack_segments(tokenizer, source, limit=120)
    initial_targets = generate(tokenizer, model, source_segments)
    if len(initial_targets) != len(source_segments):
        raise RuntimeError("Long-unit recovery segment count mismatch")

    repaired_segments: list[str] = []
    recursive_repairs = 0
    for source_segment, target_segment in zip(source_segments, initial_targets):
        if severely_degenerate(source_segment, target_segment):
            target_segment = translate_reliably(tokenizer, model, source_segment, depth=0)
            recursive_repairs += 1
        repaired_segments.append(target_segment)

    recovered = normalized(" ".join(repaired_segments))
    ratio = length_ratio(source, recovered)
    if ratio < 0.65 or ratio > 2.0:
        raise RuntimeError(
            f"Recovered long unit still has unsafe coverage ratio {ratio:.4f}"
        )
    if maximum_identical_word_run(recovered) >= 5:
        raise RuntimeError("Recovered long unit still contains runaway repetition")
    if numeric_tokens(source) != numeric_tokens(recovered):
        raise RuntimeError(
            "Recovered long unit changed numeric tokens; "
            f"source={numeric_tokens(source)} target={numeric_tokens(recovered)}"
        )
    return recovered, len(source_segments), recursive_repairs


def selected_books() -> set[str]:
    raw = os.environ.get("PR40_BOOKS", "").strip()
    return {item.strip() for item in raw.split(",") if item.strip()} if raw else {"ENO", "JUB", "DID", "4BA"}


def recover_pathological_units() -> dict[str, Any]:
    if "DID" not in selected_books():
        return {"examined": 0, "recovered": []}

    source_documents = {
        (str(document["bookId"]), int(document["chapter"])): document
        for path in SOURCE.glob("*.json")
        for document in [json.loads(path.read_text(encoding="utf-8"))]
        if document.get("bookId") == "DID"
    }
    candidates: list[tuple[Path, dict[str, Any], dict[str, Any], str]] = []
    examined = 0
    for path in sorted(CANDIDATES.glob("DID.*.json")):
        document = json.loads(path.read_text(encoding="utf-8"))
        source_document = source_documents.get(("DID", int(document["chapter"])))
        if source_document is None:
            raise RuntimeError(f"{path.name}: verified Didascalia source is missing")
        source_by_number = {
            int(verse["number"]): str(verse["text"]).strip()
            for verse in source_document.get("verses", [])
        }
        for verse in document.get("verses", []):
            examined += 1
            number = int(verse["number"])
            source = source_by_number.get(number)
            if source is None:
                raise RuntimeError(f"DID.{document['chapter']}:{number}: source unit is missing")
            target = str(verse.get("text") or "").strip()
            if severely_degenerate(source, target):
                candidates.append((path, document, verse, source))

    if not candidates:
        return {"examined": examined, "recovered": []}

    revision = str(HfApi().model_info(MODEL_ID).sha)
    tokenizer = MarianTokenizer.from_pretrained(MODEL_ID, revision=revision)
    model = MarianMTModel.from_pretrained(MODEL_ID, revision=revision)
    model.eval()

    recovered_rows: list[dict[str, Any]] = []
    changed_documents: dict[Path, dict[str, Any]] = {}
    for path, document, verse, source in candidates:
        old_target = str(verse.get("text") or "")
        recovered, segment_count, recursive_repairs = recover_unit(tokenizer, model, source)
        verse["text"] = recovered
        reference = f"DID.{document['chapter']}:{verse['number']}"
        document.setdefault("audit", {})["longUnitRecovery"] = {
            "reference": reference,
            "reason": "severe-length-loss-or-runaway-repetition",
            "model": {"id": MODEL_ID, "revision": revision},
            "sourceDigest": sha_text(source),
            "previousTargetDigest": sha_text(old_target),
            "recoveredTargetDigest": sha_text(recovered),
            "segmentTokenLimit": 120,
            "segments": segment_count,
            "recursiveRepairs": recursive_repairs,
            "sourceWords": len(source.split()),
            "targetWords": len(recovered.split()),
            "coverageRatio": round(length_ratio(source, recovered), 6),
        }
        changed_documents[path] = document
        recovered_rows.append(document["audit"]["longUnitRecovery"])

    for path, document in changed_documents.items():
        path.write_text(
            json.dumps(document, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )

    del model, tokenizer
    gc.collect()
    return {"examined": examined, "recovered": recovered_rows}


runpy.run_path(
    str(Path(__file__).with_name("translate-pr40-early-works-v3.py")),
    run_name="__main__",
)
print(json.dumps({"longUnitRecovery": recover_pathological_units()}, ensure_ascii=False, indent=2))
