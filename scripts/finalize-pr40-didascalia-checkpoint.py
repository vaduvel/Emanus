#!/usr/bin/env python3
"""Finish Didascalia from a saved first-pass checkpoint and fail closed."""
from __future__ import annotations

import argparse
import gc
import hashlib
import json
import os
import re
import subprocess
import sys
from collections import Counter
from pathlib import Path
from typing import Any

import torch
from huggingface_hub import HfApi
from transformers import MarianMTModel, MarianTokenizer

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "docs" / "data" / "biblia-emanus-early-source-candidates"
CANDIDATES = ROOT / "docs" / "data" / "biblia-emanus-early-romanian-candidates"
AUDITED = ROOT / "docs" / "data" / "biblia-emanus-early-audited"
MODEL_ID = "Helsinki-NLP/opus-mt-tc-big-en-ro"
SENTENCE_BREAK = re.compile(r"(?<=[.!?;:])\s+")
NUMBER_TOKEN = re.compile(r"\d+(?:[.,]\d+)?")
WORD_TOKEN = re.compile(r"\w+", re.UNICODE)
QUOTE_GLYPHS = '\"“”„«»'
QUOTE_RE = re.compile(f"[{re.escape(QUOTE_GLYPHS)}]")


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
    longest = current = 0
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
    sentences = [part.strip() for part in SENTENCE_BREAK.split(text) if part.strip()] or [text]
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
        raise RuntimeError("Didascalia recovery segmentation changed verified source words")
    return segments


def generate(tokenizer: MarianTokenizer, model: MarianMTModel, source_segments: list[str], batch_size: int = 8) -> list[str]:
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
        translated.extend(normalized(value) for value in tokenizer.batch_decode(output, skip_special_tokens=True))
    return translated


def retry_parts(tokenizer: MarianTokenizer, source: str) -> list[str]:
    token_count = len(tokenizer.encode(source, add_special_tokens=True))
    parts = pack_segments(tokenizer, source, max(36, min(80, token_count // 2)))
    if len(parts) > 1:
        return parts
    words = source.split()
    if len(words) < 2:
        return [source]
    midpoint = len(words) // 2
    return [" ".join(words[:midpoint]), " ".join(words[midpoint:])]


def translate_reliably(tokenizer: MarianTokenizer, model: MarianMTModel, source: str, depth: int = 0) -> str:
    target = generate(tokenizer, model, [source], batch_size=1)[0]
    if not severely_degenerate(source, target):
        return target
    if depth >= 6 or len(source.split()) < 8:
        raise RuntimeError(
            "Didascalia long-unit recovery failed: "
            f"depth={depth} sourceWords={len(source.split())} "
            f"targetWords={len(target.split())} repeatedRun={maximum_identical_word_run(target)}"
        )
    parts = retry_parts(tokenizer, source)
    if len(parts) < 2 or " ".join(parts).split() != source.split():
        raise RuntimeError("Didascalia recursive split did not preserve source words")
    return normalized(" ".join(translate_reliably(tokenizer, model, part, depth + 1) for part in parts))


def recover_unit(tokenizer: MarianTokenizer, model: MarianMTModel, source: str) -> tuple[str, int, int]:
    source_segments = pack_segments(tokenizer, source, limit=120)
    initial_targets = generate(tokenizer, model, source_segments)
    if len(initial_targets) != len(source_segments):
        raise RuntimeError("Didascalia recovery segment count mismatch")
    repaired_segments: list[str] = []
    recursive_repairs = 0
    for source_segment, target_segment in zip(source_segments, initial_targets):
        if severely_degenerate(source_segment, target_segment):
            target_segment = translate_reliably(tokenizer, model, source_segment)
            recursive_repairs += 1
        repaired_segments.append(target_segment)
    recovered = normalized(" ".join(repaired_segments))
    ratio = length_ratio(source, recovered)
    if ratio < 0.65 or ratio > 2.0:
        raise RuntimeError(f"Recovered Didascalia unit has unsafe coverage ratio {ratio:.4f}")
    if maximum_identical_word_run(recovered) >= 5:
        raise RuntimeError("Recovered Didascalia unit still contains runaway repetition")
    if numeric_tokens(source) != numeric_tokens(recovered):
        raise RuntimeError(
            "Recovered Didascalia unit changed numeric tokens; "
            f"source={numeric_tokens(source)} target={numeric_tokens(recovered)}"
        )
    return recovered, len(source_segments), recursive_repairs


def source_documents() -> dict[int, dict[str, Any]]:
    documents: dict[int, dict[str, Any]] = {}
    for path in sorted(SOURCE.glob("DID.*.json")):
        document = json.loads(path.read_text(encoding="utf-8"))
        if document.get("bookId") != "DID" or document.get("status") != "source_verified":
            raise RuntimeError(f"Invalid Didascalia source checkpoint: {path.name}")
        documents[int(document["chapter"])] = document
    if sorted(documents) != list(range(1, 44)):
        raise RuntimeError(f"Expected Didascalia chapters 1-43, found {sorted(documents)}")
    return documents


def recover_pathological_units() -> dict[str, Any]:
    sources = source_documents()
    paths = sorted(CANDIDATES.glob("DID.*.json"))
    if len(paths) != 43:
        raise RuntimeError(f"Expected 43 Didascalia candidate chapters, found {len(paths)}")
    candidates: list[tuple[Path, dict[str, Any], dict[str, Any], str]] = []
    examined = 0
    for path in paths:
        document = json.loads(path.read_text(encoding="utf-8"))
        source_by_number = {
            int(verse["number"]): str(verse["text"]).strip()
            for verse in sources[int(document["chapter"])].get("verses", [])
        }
        for verse in document.get("verses", []):
            examined += 1
            source = source_by_number.get(int(verse["number"]))
            if source is None:
                raise RuntimeError(f"DID.{document['chapter']}:{verse['number']}: source unit missing")
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
    changed: dict[Path, dict[str, Any]] = {}
    for path, document, verse, source in candidates:
        previous = str(verse.get("text") or "")
        recovered, segment_count, recursive_repairs = recover_unit(tokenizer, model, source)
        verse["text"] = recovered
        record = {
            "reference": f"DID.{document['chapter']}:{verse['number']}",
            "reason": "severe-length-loss-or-runaway-repetition",
            "model": {"id": MODEL_ID, "revision": revision},
            "sourceDigest": sha_text(source),
            "previousTargetDigest": sha_text(previous),
            "recoveredTargetDigest": sha_text(recovered),
            "segments": segment_count,
            "recursiveRepairs": recursive_repairs,
            "sourceWords": len(source.split()),
            "targetWords": len(recovered.split()),
            "coverageRatio": round(length_ratio(source, recovered), 6),
        }
        document.setdefault("audit", {}).setdefault("longUnitRecovery", []).append(record)
        changed[path] = document
        recovered_rows.append(record)
    for path, document in changed.items():
        path.write_text(json.dumps(document, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    del model, tokenizer
    gc.collect()
    return {"examined": examined, "recovered": recovered_rows}


def quote_counts(value: str) -> dict[str, int]:
    return {glyph: value.count(glyph) for glyph in QUOTE_GLYPHS if value.count(glyph)}


def has_unbalanced_quotes(value: str) -> bool:
    return (
        value.count('\"') % 2 != 0
        or value.count("«") != value.count("»")
        or value.count("„") + value.count("“") != value.count("”")
    )


def repair_source_impossible_quotes() -> dict[str, Any]:
    sources = source_documents()
    repaired_rows: list[dict[str, Any]] = []
    examined = 0
    for path in sorted(CANDIDATES.glob("DID.*.json")):
        document = json.loads(path.read_text(encoding="utf-8"))
        source_by_number = {
            int(verse["number"]): str(verse["text"]).strip()
            for verse in sources[int(document["chapter"])].get("verses", [])
        }
        changed = False
        for verse in document.get("verses", []):
            examined += 1
            target = str(verse.get("text") or "").strip()
            if not has_unbalanced_quotes(target):
                continue
            source = source_by_number[int(verse["number"])]
            reference = f"DID.{document['chapter']}:{verse['number']}"
            if quote_counts(source):
                raise RuntimeError(
                    f"{reference}: target quotes unbalanced but source contains quotes; refusing to guess"
                )
            removed = Counter(QUOTE_RE.findall(target))
            repaired = normalized(QUOTE_RE.sub("", target))
            if not repaired or has_unbalanced_quotes(repaired) or quote_counts(repaired):
                raise RuntimeError(f"{reference}: source-aware quote repair failed")
            verse["text"] = repaired
            record = {
                "reference": reference,
                "reason": "source-impossible-unbalanced-quote-glyphs",
                "sourceDigest": sha_text(source),
                "previousTargetDigest": sha_text(target),
                "repairedTargetDigest": sha_text(repaired),
                "removedQuoteGlyphs": dict(sorted(removed.items())),
            }
            document.setdefault("audit", {}).setdefault("sourceAwareQuoteRecovery", []).append(record)
            repaired_rows.append(record)
            changed = True
        if changed:
            path.write_text(json.dumps(document, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return {"examined": examined, "repaired": repaired_rows}


def verify_checkpoint() -> None:
    source_documents()
    candidates = sorted(CANDIDATES.glob("DID.*.json"))
    if len(candidates) != 43:
        raise RuntimeError(f"Didascalia checkpoint must contain 43 candidates, found {len(candidates)}")
    for path in candidates:
        document = json.loads(path.read_text(encoding="utf-8"))
        if document.get("bookId") != "DID" or not document.get("verses"):
            raise RuntimeError(f"Invalid Didascalia checkpoint document: {path.name}")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--batch-size", type=int, default=24)
    args = parser.parse_args()
    os.environ["PR40_BOOKS"] = "DID"
    verify_checkpoint()
    subprocess.run(
        [
            sys.executable,
            str(ROOT / "scripts" / "refine-pr40-translation-candidates.py"),
            "--collection",
            "early",
            "--batch-size",
            str(args.batch_size),
        ],
        check=True,
    )
    recovery = recover_pathological_units()
    quotes = repair_source_impossible_quotes()
    subprocess.run(
        [
            sys.executable,
            str(ROOT / "scripts" / "run-with-pinned-hf.py"),
            str(ROOT / "scripts" / "audit-pr40-english-romanian-v3.py"),
            "--collection",
            "early",
            "--batch-size",
            "64",
        ],
        check=True,
    )
    audited = sorted(AUDITED.glob("DID.*.json"))
    if len(audited) != 43:
        raise RuntimeError(f"Expected 43 audited Didascalia chapters, found {len(audited)}")
    for path in audited:
        document = json.loads(path.read_text(encoding="utf-8"))
        if document.get("status") != "published" or document.get("public") is not True or document.get("runtimeEnabled") is not True:
            raise RuntimeError(f"Didascalia audit did not publish {path.name}")
    print(json.dumps({"didascaliaFinalized": True, "chapters": 43, "recovery": recovery, "quotes": quotes}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
