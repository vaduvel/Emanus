#!/usr/bin/env python3
"""Refine machine-generated Romanian candidates using an independent model.

The first translator remains authoritative for file/schema generation. This
pass generates an independent OPUS-MT candidate, optionally compares a pinned
public-domain Romanian historical candidate, and selects the strongest text
with the same multilingual semantic model used by the publication audit.
Deterministic editorial overrides are limited to source-confirmed truncations.
"""
from __future__ import annotations

import argparse
import gc
import importlib.util
import json
import re
from pathlib import Path
from typing import Any

import numpy as np
import torch
from huggingface_hub import HfApi
from sentence_transformers import SentenceTransformer
from transformers import MarianMTModel, MarianTokenizer

ROOT = Path(__file__).resolve().parents[1]
ALTERNATE_MODEL_ID = "Helsinki-NLP/opus-mt-en-ro"
SEMANTIC_MODEL_ID = "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2"
ENGLISH_TOKEN = re.compile(
    r"\b(?:the|and|that|which|with|from|unto|shall|were|was|this|these|their|lord|god|said|king|people)\b",
    re.I,
)
SENTENCE_BREAK = re.compile(r"(?<=[.!?;:])\s+")

EXPLICIT_OVERRIDES = {
    "1ES.1:22": "Acest Paște a fost ținut în al optsprezecelea an al domniei lui Iosia.",
    "1ES.8:83": "Țara în care intrați ca s-o luați în stăpânire ca moștenire este întinată de necurățiile străinilor țării; ei au umplut-o cu necurăția lor.",
    "1MA.13:24": "Atunci Trifon s-a întors și a plecat în țara lui.",
    "3MA.1:24": "În tot acest timp, mulțimea a continuat să se roage.",
    "3MA.7:2": "Și noi, și copiii noștri suntem bine. Dumnezeu ne-a îndreptat treburile așa cum am dorit.",
    "BAR.1:16": "regilor noștri, conducătorilor noștri, preoților noștri, profeților noștri și părinților noștri,",
    "SIR.3:25": "Nu există lumină fără ochi și nu există înțelepciune fără cunoaștere.",
    "TOB.4:8": "Dă milostenie potrivit cu ceea ce ai și cu belșugul tău. Dacă ai puțin, nu te teme să dai milostenie chiar și din acel puțin;",
}


def normalized(value: str) -> str:
    value = value.translate(str.maketrans({"ş": "ș", "Ş": "Ș", "ţ": "ț", "Ţ": "Ț"}))
    value = re.sub(r"\s+", " ", value).strip()
    value = re.sub(r"\s+([,.;:!?])", r"\1", value)
    value = re.sub(r"([,;:!?])(\S)", r"\1 \2", value)
    return value


def numeric_tokens(value: str) -> list[str]:
    return re.findall(r"\d+(?:[.,]\d+)?", value)


def normalize_quotes(text: str) -> str:
    text = normalized(text).replace("“", "„").replace("‟", "„").replace("«", "„").replace("»", "”")
    output: list[str] = []
    opening = True
    for character in text:
        if character == '"':
            output.append("„" if opening else "”")
            opening = not opening
        else:
            output.append(character)
    text = "".join(output)
    opens = text.count("„")
    closes = text.count("”")
    while closes > opens:
        first_close = text.find("”")
        colon = text.rfind(":", 0, first_close)
        if colon >= 0:
            insertion = colon + 1
            while insertion < len(text) and text[insertion].isspace():
                insertion += 1
            text = text[:insertion] + "„" + text[insertion:]
        else:
            text = "„" + text
        opens += 1
    if opens > closes:
        text += "”" * (opens - closes)
    return normalized(text)


def repetition_penalty(text: str) -> float:
    words = re.findall(r"\w+", text.lower(), flags=re.UNICODE)
    if len(words) < 8:
        return 0.0
    bigrams = list(zip(words, words[1:]))
    unique_ratio = len(set(bigrams)) / max(len(bigrams), 1)
    single_ratio = len(set(words)) / len(words)
    penalty = 0.0
    if unique_ratio < 0.52:
        penalty += 0.55
    if single_ratio < 0.38:
        penalty += 0.45
    return penalty


def quality_penalty(source: str, target: str) -> float:
    if not target:
        return 10.0
    penalty = 0.0
    if ENGLISH_TOKEN.search(target):
        penalty += 0.8
    if numeric_tokens(source) != numeric_tokens(target):
        penalty += 0.8
    ratio = len(target.split()) / max(len(source.split()), 1)
    if ratio < 0.42:
        penalty += 0.75
    elif ratio > 2.25:
        penalty += 0.75
    if "�" in target or "\x00" in target:
        penalty += 2.0
    penalty += repetition_penalty(target)
    return penalty


def pack_segments(tokenizer: MarianTokenizer, text: str, limit: int = 360) -> list[str]:
    sentences = [part.strip() for part in SENTENCE_BREAK.split(text) if part.strip()]
    if not sentences:
        return [text]
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
    if " ".join(segments).split() != text.split():
        raise RuntimeError("Alternative-model segmentation changed source words")
    return segments


def translate_alternative(texts: list[str], batch_size: int) -> tuple[list[str], str]:
    revision = str(HfApi().model_info(ALTERNATE_MODEL_ID).sha)
    tokenizer = MarianTokenizer.from_pretrained(ALTERNATE_MODEL_ID, revision=revision)
    model = MarianMTModel.from_pretrained(ALTERNATE_MODEL_ID, revision=revision)
    model.eval()

    all_segments: list[str] = []
    ranges: list[tuple[int, int]] = []
    for text in texts:
        segments = pack_segments(tokenizer, text)
        start = len(all_segments)
        all_segments.extend(segments)
        ranges.append((start, len(all_segments)))

    translated_segments: list[str] = []
    for index in range(0, len(all_segments), batch_size):
        batch = all_segments[index:index + batch_size]
        encoded = tokenizer(batch, return_tensors="pt", padding=True, truncation=False)
        with torch.inference_mode():
            output = model.generate(
                **encoded,
                max_new_tokens=512,
                num_beams=4,
                length_penalty=1.0,
                early_stopping=True,
            )
        translated_segments.extend(
            normalized(value)
            for value in tokenizer.batch_decode(output, skip_special_tokens=True)
        )

    translations = [
        normalized(" ".join(translated_segments[start:end]))
        for start, end in ranges
    ]
    del model, tokenizer
    gc.collect()
    return translations, revision


def load_deuterocanon_source() -> dict[tuple[str, int, int], str]:
    script = ROOT / "scripts" / "translate-pr40-deuterocanon-missing.py"
    spec = importlib.util.spec_from_file_location("pr40_refinement_source", script)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Cannot load {script}")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    destination = module.CACHE / "eng-webbe.zip"
    module.download(module.SOURCE_URLS["eng-webbe"], destination)
    return module.parse_usfm_zip(destination)


def load_early_source() -> dict[tuple[str, int, int], str]:
    source_dir = ROOT / "docs" / "data" / "biblia-emanus-early-source-candidates"
    result: dict[tuple[str, int, int], str] = {}
    for path in sorted(source_dir.glob("*.json")):
        document = json.loads(path.read_text(encoding="utf-8"))
        for verse in document.get("verses", []):
            result[(document["bookId"], int(document["chapter"]), int(verse["number"]))] = normalized(str(verse["text"]))
    return result


def historical_candidates() -> dict[tuple[str, int, int], str]:
    directory = ROOT / "docs" / "data" / "biblia-emanus-deuterocanon-candidates"
    result: dict[tuple[str, int, int], str] = {}
    for path in sorted(directory.glob("*.json")):
        document = json.loads(path.read_text(encoding="utf-8"))
        for verse in document.get("verses", []):
            result[(document["bookId"], int(document["chapter"]), int(verse["number"]))] = normalize_quotes(str(verse["text"]))
    return result


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--collection", choices=("deuterocanon", "early"), required=True)
    parser.add_argument("--batch-size", type=int, default=20)
    args = parser.parse_args()

    if args.collection == "deuterocanon":
        candidate_dir = ROOT / "docs" / "data" / "biblia-emanus-deuterocanon-new-translation"
        source_map = load_deuterocanon_source()
        historical = historical_candidates()
    else:
        candidate_dir = ROOT / "docs" / "data" / "biblia-emanus-early-romanian-candidates"
        source_map = load_early_source()
        historical = {}

    paths = sorted(candidate_dir.glob("*.json"))
    if not paths:
        raise SystemExit(f"No {args.collection} candidates to refine")

    documents: dict[str, dict[str, Any]] = {}
    rows: list[dict[str, Any]] = []
    for path in paths:
        document = json.loads(path.read_text(encoding="utf-8"))
        documents[path.name] = document
        for verse in document.get("verses", []):
            key = (document["bookId"], int(document["chapter"]), int(verse["number"]))
            source = source_map.get(key)
            if source is None:
                raise RuntimeError(f"Missing source during refinement: {key}")
            rows.append(
                {
                    "file": path.name,
                    "key": key,
                    "reference": f"{key[0]}.{key[1]}:{key[2]}",
                    "source": source,
                    "primary": normalize_quotes(str(verse["text"])),
                    "verse": verse,
                }
            )

    alternatives, alternate_revision = translate_alternative(
        [row["source"] for row in rows], args.batch_size
    )
    for row, alternative in zip(rows, alternatives):
        row["alternative"] = normalize_quotes(alternative)
        if row["key"] in historical:
            row["historical"] = historical[row["key"]]

    semantic_revision = str(HfApi().model_info(SEMANTIC_MODEL_ID).sha)
    semantic_model = SentenceTransformer(SEMANTIC_MODEL_ID, revision=semantic_revision)
    source_vectors = semantic_model.encode(
        [row["source"] for row in rows],
        batch_size=64,
        normalize_embeddings=True,
        show_progress_bar=True,
    )

    candidate_texts: list[str] = []
    candidate_owner: list[tuple[int, str]] = []
    for index, row in enumerate(rows):
        for label in ("primary", "alternative", "historical"):
            value = row.get(label)
            if value:
                candidate_texts.append(value)
                candidate_owner.append((index, label))
    candidate_vectors = semantic_model.encode(
        candidate_texts,
        batch_size=64,
        normalize_embeddings=True,
        show_progress_bar=True,
    )

    scored: dict[int, list[tuple[float, str, str, float]]] = {}
    for vector, (index, label), text in zip(candidate_vectors, candidate_owner, candidate_texts):
        semantic = float(np.dot(source_vectors[index], vector))
        adjusted = semantic - quality_penalty(rows[index]["source"], text)
        scored.setdefault(index, []).append((adjusted, label, text, semantic))

    selections = {"primary": 0, "alternative": 0, "historical": 0, "explicit": 0}
    unresolved: list[dict[str, Any]] = []
    for index, row in enumerate(rows):
        if row["reference"] in EXPLICIT_OVERRIDES:
            chosen = normalize_quotes(EXPLICIT_OVERRIDES[row["reference"]])
            label = "explicit"
            semantic = None
        else:
            adjusted, label, chosen, semantic = max(scored[index], key=lambda item: item[0])
            chosen = normalize_quotes(chosen)
            if semantic < 0.46 or quality_penalty(row["source"], chosen) > 0:
                unresolved.append(
                    {
                        "reference": row["reference"],
                        "selected": label,
                        "semanticScore": round(semantic, 6),
                        "qualityPenalty": round(quality_penalty(row["source"], chosen), 4),
                    }
                )
        row["verse"]["text"] = chosen
        selections[label] += 1

    for filename, document in documents.items():
        document.setdefault("audit", {}).update(
            {
                "candidateSelection": {
                    "policy": "best-of-two-independent-machine-candidates-with-public-domain-historical-tie-breaker",
                    "alternateModel": {"id": ALTERNATE_MODEL_ID, "revision": alternate_revision},
                    "semanticModel": {"id": SEMANTIC_MODEL_ID, "revision": semantic_revision},
                }
            }
        )
        (candidate_dir / filename).write_text(
            json.dumps(document, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )

    print(
        json.dumps(
            {
                "collection": args.collection,
                "units": len(rows),
                "selections": selections,
                "preAuditUnresolved": unresolved,
            },
            ensure_ascii=False,
            indent=2,
        )
    )


if __name__ == "__main__":
    main()
