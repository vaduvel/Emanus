#!/usr/bin/env python3
"""Temporary parallel completion and audit pipeline for Biblia Emanus NT."""
from __future__ import annotations

import argparse
import copy
import gc
import hashlib
import importlib.util
import json
import math
import re
import shutil
import sys
import unicodedata
from dataclasses import dataclass
from datetime import date
from difflib import SequenceMatcher
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "docs" / "data" / "biblia-emanus"
VALIDATOR_PATH = ROOT / "scripts" / "check-biblia-emanus.py"
SPEC = importlib.util.spec_from_file_location("biblia_emanus_validator", VALIDATOR_PATH)
assert SPEC is not None and SPEC.loader is not None
validator = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(validator)

GROUPS: dict[str, list[str]] = {
    "g01-mat": ["MAT"],
    "g02-mrk": ["MRK"],
    "g03-luk": ["LUK"],
    "g04-jhn": ["JHN"],
    "g05-act": ["ACT"],
    "g06-rom-1co": ["ROM", "1CO"],
    "g07-2co-gal-eph": ["2CO", "GAL", "EPH"],
    "g08-php-col-th": ["PHP", "COL", "1TH", "2TH"],
    "g09-pastoral": ["1TI", "2TI", "TIT", "PHM"],
    "g10-heb-jas": ["HEB", "JAS"],
    "g11-catholic": ["1PE", "2PE", "1JN", "2JN", "3JN", "JUD"],
    "g12-rev": ["REV"],
}

PRIMARY_MODEL = "Helsinki-NLP/opus-mt-en-ro"
PRIMARY_REVISION = "96e8fea9e44dae942c2e8a9078dc1615dd871ed9"
SECONDARY_MODEL = "Helsinki-NLP/opus-mt-tc-big-en-ro"
SECONDARY_REVISION = "659fa2f20c185abeaf92382d3bf7578bf4e462dd"
EMBEDDING_MODEL = "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2"
AUDIT_ENGINE = (
    "biblia-emanus-nt-ensemble-3.0/"
    "opus-mt-en-ro@96e8fea+opus-mt-tc-big-en-ro@659fa2f+multilingual-minilm"
)
PLACEHOLDER = re.compile(r"\bDE (?:TRADUS|DOCUMENTAT|VERIFICAT)\b|\b(?:TODO|TBD|FIXME)\b|<placeholder>")
CHAPTER_FILE = re.compile(r"^([A-Z0-9]{3})\.([1-9][0-9]*)\.json$")
FORBIDDEN_SEDILLA = str.maketrans({"ş": "ș", "ţ": "ț", "Ş": "Ș", "Ţ": "Ț"})

MODERN_WORDS = {
    "atît": "atât", "Atît": "Atât", "ATÎT": "ATÂT",
    "încît": "încât", "Încît": "Încât", "ÎNCÎT": "ÎNCÂT",
    "sînt": "sunt", "Sînt": "Sunt", "SÎNT": "SUNT",
    "sîntem": "suntem", "Sîntem": "Suntem", "SÎNTEM": "SUNTEM",
    "sînteți": "sunteți", "Sînteți": "Sunteți", "SÎNTEȚI": "SUNTEȚI",
    "sînteti": "sunteți", "Sînteti": "Sunteți",
    "vecinic": "veșnic", "Vecinic": "Veșnic",
    "vecinică": "veșnică", "Vecinică": "Veșnică",
    "vecinici": "veșnici", "Vecinici": "Veșnici",
    "vecinice": "veșnice", "Vecinice": "Veșnice",
    "vecinicia": "veșnicia", "Vecinicia": "Veșnicia",
    "veciniciei": "veșniciei", "Veciniciei": "Veșniciei",
    "Iisus": "Isus", "Cristos": "Hristos", "Christos": "Hristos",
}

CANONICAL_EXPECTATIONS = {
    "jesus": ("Isus",),
    "christ": ("Hristos",),
    "god": ("Dumneze",),
    "holy spirit": ("Duhul Sfânt", "Duh Sfânt"),
    "lord": ("Domn",),
    "resurrection": ("învier",),
    "eternal": ("veșnic",),
    "baptiz": ("botez",),
    "gospel": ("Evanghel",),
}

@dataclass
class TranslationItem:
    key: str
    book_id: str
    chapter: int
    number: int
    source: str
    existing: str | None
    benchmark_texts: list[str]
    kind: str = "verse"


def write_json(path: Path, data: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def normalize_space(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip()


def modernize_romanian(value: str) -> str:
    value = unicodedata.normalize("NFC", value.translate(FORBIDDEN_SEDILLA))
    value = value.replace("–", "—")
    for old, new in MODERN_WORDS.items():
        value = re.sub(rf"\b{re.escape(old)}\b", new, value)
    value = re.sub(r"\bIsus\s+Cristos\b", "Isus Hristos", value)
    value = re.sub(r"\bCristos\s+Isus\b", "Hristos Isus", value)
    value = value.replace("singurul și unicul Său Fiu", "singurul Său Fiu")
    value = value.replace("singurul şi unicul Său Fiu", "singurul Său Fiu")
    value = value.replace("viața eternă", "viața veșnică")
    value = value.replace("viaţă eternă", "viață veșnică")
    value = value.replace("Evanghelia bună", "Evanghelia")
    value = normalize_space(value)
    value = re.sub(r"\s+([,.;:!?])", r"\1", value)
    value = re.sub(r"([„«(])\s+", r"\1", value)
    value = re.sub(r"\s+([”»)])", r"\1", value)
    return unicodedata.normalize("NFC", value)


def clean_source_for_model(value: str) -> str:
    value = value.replace("Yahweh", "the LORD")
    return normalize_space(value)


def locked_text(
    source_data: dict[str, Any],
    lock_id: str,
    book_id: str,
    chapter: int,
    verse: int,
) -> str:
    refs = validator.source_references_for_target(
        lock_id, book_id, chapter, verse, source_data["rules"]
    )
    return normalize_space(
        " ".join(
            source_data["texts"][lock_id][ref]
            for ref in refs
            if ref in source_data["texts"][lock_id]
        )
    )


def translate_marian(
    texts: list[str],
    model_name: str,
    revision: str,
    *,
    prefix: str = "",
    batch_size: int = 16,
) -> list[str]:
    if not texts:
        return []
    import torch
    from transformers import MarianMTModel, MarianTokenizer

    tokenizer = MarianTokenizer.from_pretrained(model_name, revision=revision)
    model = MarianMTModel.from_pretrained(model_name, revision=revision)
    model.eval()
    outputs: list[str] = []
    with torch.inference_mode():
        for start in range(0, len(texts), batch_size):
            chunk = [prefix + text for text in texts[start : start + batch_size]]
            batch = tokenizer(
                chunk,
                return_tensors="pt",
                padding=True,
                truncation=True,
                max_length=512,
            )
            generated = model.generate(
                **batch,
                max_new_tokens=384,
                num_beams=5,
                early_stopping=True,
                renormalize_logits=True,
            )
            outputs.extend(tokenizer.batch_decode(generated, skip_special_tokens=True))
    del model, tokenizer
    gc.collect()
    return [modernize_romanian(value) for value in outputs]


def encode_multilingual(texts: list[str]) -> list[list[float]]:
    from sentence_transformers import SentenceTransformer

    model = SentenceTransformer(EMBEDDING_MODEL)
    vectors = model.encode(
        texts,
        batch_size=64,
        normalize_embeddings=True,
        show_progress_bar=True,
    )
    result = vectors.tolist()
    del model
    gc.collect()
    return result


def cosine(a: list[float], b: list[float]) -> float:
    return sum(x * y for x, y in zip(a, b))


def normalized_tokens(value: str) -> set[str]:
    return set(validator.normalize_for_comparison(value).split())


def lexical_overlap(candidate: str, benchmarks: list[str]) -> float:
    cand = normalized_tokens(candidate)
    if not cand:
        return 0.0
    scores: list[float] = []
    for benchmark in benchmarks:
        other = normalized_tokens(benchmark)
        union = cand | other
        scores.append(len(cand & other) / max(1, len(union)))
    return max(scores, default=0.0)


def length_score(candidate: str, benchmarks: list[str]) -> float:
    lengths = sorted(max(1, len(validator.normalize_for_comparison(value).split())) for value in benchmarks)
    expected = lengths[len(lengths) // 2]
    actual = max(1, len(validator.normalize_for_comparison(candidate).split()))
    ratio = actual / expected
    return max(0.0, 1.0 - abs(math.log(ratio)))


def quality_penalty(source: str, candidate: str) -> float:
    penalty = 0.0
    if not candidate or PLACEHOLDER.search(candidate):
        return 1.0
    if re.search(r"(.)\1\1\1", candidate.lower()):
        penalty += 0.25
    if re.search(r"\b\w+ăę\b", candidate.lower()):
        penalty += 0.5
    if len(candidate.split()) < 2 and len(source.split()) > 6:
        penalty += 0.5
    lower_source = source.lower()
    for needle, expected_values in CANONICAL_EXPECTATIONS.items():
        if needle in lower_source and not any(value.lower() in candidate.lower() for value in expected_values):
            penalty += 0.055
    source_digits = set(re.findall(r"\d+", source))
    candidate_digits = set(re.findall(r"\d+", candidate))
    if source_digits != candidate_digits:
        penalty += 0.2
    if any(marker in candidate for marker in ("ş", "ţ", "Ş", "Ţ")):
        penalty += 0.2
    return min(1.0, penalty)


def candidate_score(
    item: TranslationItem,
    candidate: str,
    semantic: float,
    label: str,
) 