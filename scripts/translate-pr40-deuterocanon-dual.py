#!/usr/bin/env python3
"""Generate publication candidates with two independent English→Romanian models.

Every source unit is translated twice. A multilingual semantic model and strict
textual checks choose the stronger candidate. The output remains blocked until
the separate publication audit passes.
"""
from __future__ import annotations

import gc
import hashlib
import importlib.util
import json
import math
import os
import re
from collections import Counter
from pathlib import Path
from typing import Any

import numpy as np
import torch
from huggingface_hub import HfApi
from sentence_transformers import SentenceTransformer
from transformers import MarianMTModel, MarianTokenizer

ROOT = Path(__file__).resolve().parents[1]
BASE_SCRIPT = Path(__file__).with_name("translate-pr40-deuterocanon-missing.py")
spec = importlib.util.spec_from_file_location("deut_base", BASE_SCRIPT)
if spec is None or spec.loader is None:
    raise SystemExit(f"Cannot load {BASE_SCRIPT}")
base = importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)

OUT = ROOT / "docs" / "data" / "biblia-emanus-deuterocanon-new-translation"
REPORT = ROOT / "docs" / "biblia-emanus" / "PR40-DEUTEROCANON-NEW-TRANSLATION.json"
CACHE = ROOT / ".cache" / "pr40-deuterocanon-translation"
PRIMARY_MODEL_ID = "Helsinki-NLP/opus-mt-tc-big-en-ro"
SECONDARY_MODEL_ID = "Helsinki-NLP/opus-mt-en-ro"
SEMANTIC_MODEL_ID = "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2"
ALL_TARGETS = {
    "1ES": "3 Ezdra", "1MA": "1 Macabei", "2MA": "2 Macabei", "3MA": "3 Macabei",
    "BAR": "Baruh", "ESG": "Adăugirile grecești la Estera", "JDT": "Iudita",
    "MAN": "Rugăciunea lui Manase", "PS2": "Psalmul 151",
    "SIR": "Înțelepciunea lui Isus, fiul lui Sirah", "TOB": "Tobit",
    "WIS": "Înțelepciunea lui Solomon",
}
ENGLISH_TOKEN = re.compile(r"\b(?:the|and|that|which|with|from|unto|shall|were|was|this|these|their|lord|god|said|king|people)\b", re.I)
PLACEHOLDER = re.compile(r"(?:TODO|TBD|placeholder|text revizuit|martor istoric|păstrat în suluri)", re.I)
DANGLING_END = re.compile(r"\b(?:și|iar|sau|cu|de|din|la|pe|prin|pentru|către|dintre|nici|un|o|al|a|ai|ale)\s*[.!?…»”]?$", re.I)


def selected_targets() -> dict[str, str]:
    raw = os.environ.get("PR40_BOOKS", "").strip()
    selected = {item.strip() for item in raw.split(",") if item.strip()} if raw else set(ALL_TARGETS)
    unknown = sorted(selected - set(ALL_TARGETS))
    if unknown:
        raise SystemExit(f"Unknown PR40_BOOKS values: {unknown}")
    result = {book: name for book, name in ALL_TARGETS.items() if book in selected}
    if not result:
        raise SystemExit("No deuterocanonical books selected")
    return result


def normalize_romanian(value: str) -> str:
    value = value.replace("ş", "ș").replace("Ş", "Ș").replace("ţ", "ț").replace("Ţ", "Ț")
    value = value.replace("“", "„")
    value = re.sub(r"\s+([,.;:!?])", r"\1", value)
    value = re.sub(r"([,.;:!?])(?=[^\s”»)])", r"\1 ", value)
    return re.sub(r"\s+", " ", value).strip()


def source_quote_signature(value: str) -> tuple[int, int]:
    return value.count("“") + value.count("«"), value.count("”") + value.count("»")


def target_quote_signature(value: str) -> tuple[int, int]:
    return value.count("„") + value.count("«") + value.count("“"), value.count("”") + value.count("»")


def insert_opening_quote(value: str) -> str:
    if not value:
        return "„"
    if ":" in value:
        index = value.rfind(":") + 1
        return value[:index] + " „" + value[index:].lstrip()
    speech = re.search(r"\b(?:a zis|a spus|a scris|a răspuns|a strigat|zicând|spunând|scriind)\s*[,;]?\s*", value, re.I)
    if speech:
        return value[:speech.end()] + "„" + value[speech.end():].lstrip()
    return "„" + value


def align_quotes(source: str, target: str) -> str:
    target = normalize_romanian(target)
    source_open, source_close = source_quote_signature(source)
    if '"' in target:
        output: list[str] = []
        open_used, close_used = target_quote_signature(target)
        for char in target:
            if char != '"':
                output.append(char)
            elif open_used < source_open:
                output.append("„"); open_used += 1
            else:
                output.append("”"); close_used += 1
        target = "".join(output)
    target_open, target_close = target_quote_signature(target)
    while target_open < source_open:
        target = insert_opening_quote(target); target_open += 1
    while target_close < source_close:
        target = target.rstrip() + "”"; target_close += 1
    return normalize_romanian(target)


def numeric_tokens(value: str) -> list[str]:
    return re.findall(r"\d+(?:[.,]\d+)?", value)


def repeated_ngram(value: str, n: int = 3) -> bool:
    words = re.findall(r"[\wăâîșțĂÂÎȘȚ]+", value.lower())
    if len(words) < n * 3:
        return False
    grams = [tuple(words[index:index + n]) for index in range(len(words) - n + 1)]
    return max(Counter(grams).values(), default=0) >= 3


def deterministic_codes(source: str, target: str) -> list[str]:
    codes: list[str] = []
    if not target:
        return ["EMPTY_TRANSLATION"]
    if PLACEHOLDER.search(target): codes.append("PLACEHOLDER")
    if ENGLISH_TOKEN.search(target): codes.append("ENGLISH_RESIDUE")
    if numeric_tokens(source) != numeric_tokens(target): codes.append("NUMBER_TOKEN_CHANGE")
    if source_quote_signature(source) != target_quote_signature(target): codes.append("QUOTE_STRUCTURE_CHANGE")
    ratio = len(target.split()) / max(len(source.split()), 1)
    if ratio < 0.48: codes.append("SUSPICIOUSLY_SHORT")
    elif ratio > 2.0: codes.append("SUSPICIOUSLY_LONG")
    words = re.findall(r"[\wăâîșțĂÂÎȘȚ]+", target.lower())
    if len(words) >= 8 and max(Counter(words).values(), default=0) / len(words) > 0.38: codes.append("TOKEN_REPETITION")
    if repeated_ngram(target): codes.append("NGRAM_REPETITION")
    if DANGLING_END.search(target): codes.append("DANGLING_END")
    if re.search(r"\b([a-zăâîșț]{1,5})\s+\1\b", target.lower()): codes.append("DUPLICATED_SHORT_WORD")
    if "�" in target or "\x00" in target: codes.append("INVALID_CHARACTER")
    return sorted(set(codes))


def translate_model(model_id: str, revision: str, texts: list[str], batch_size: int) -> list[str]:
    tokenizer = MarianTokenizer.from_pretrained(model_id, revision=revision)
    model = MarianMTModel.from_pretrained(model_id, revision=revision)
    model.eval()
    translated: list[str] = []
    for index in range(0, len(texts), batch_size):
        batch = texts[index:index + batch_size]
        encoded = tokenizer(batch, return_tensors="pt", padding=True, truncation=False)
        with torch.inference_mode():
            output = model.generate(**encoded, max_new_tokens=512, num_beams=5, length_penalty=1.0, early_stopping=True)
        translated.extend(tokenizer.batch_decode(output, skip_special_tokens=True))
    del model, tokenizer
    gc.collect()
    return translated


def model_license(info: Any) -> str:
    card = getattr(info, "card_data", None)
    value = getattr(card, "license", None) if card is not None else None
    return str(value) if value else "model-card-license"


def selection_key(source: str, target: str, semantic: float) -> tuple[int, float, float, int]:
    codes = deterministic_codes(source, target)
    ratio = len(target.split()) / max(len(source.split()), 1)
    return (1 if not codes else 0, semantic - 0.12 * len(codes), -abs(math.log(max(ratio, 0.01))), len(target))


def greek_reference_candidates(book: str, chapter: int, verse: int) -> list[tuple[str, int, int]]:
    candidates = [(book, chapter, verse)]
    if book == "BAR" and chapter == 6: candidates.append(("LJE", 1, verse))
    if book == "PS2": candidates.append(("PSA", 151, verse))
    if book == "ESG" and chapter == 4 and 18 <= verse <= 28: candidates.append(("ESG", 13, verse - 10))
    if book == "ESG" and chapter == 4 and 29 <= verse <= 47: candidates.append(("ESG", 14, verse - 28))
    return candidates


def main() -> None:
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--batch-size", type=int, default=16)
    args = parser.parse_args()
    targets = selected_targets()
    CACHE.mkdir(parents=True, exist_ok=True)
    OUT.mkdir(parents=True, exist_ok=True)
    for old in OUT.glob("*.json"): old.unlink()
    source_paths: dict[str, Path] = {}
    for source_id, url in base.SOURCE_URLS.items():
        destination = CACHE / f"{source_id}.zip"
        base.download(url, destination)
        source_paths[source_id] = destination
    witnesses = {source_id: base.parse_usfm_zip(path) for source_id, path in source_paths.items()}
    rows = [
        {"bookId": book, "chapter": chapter, "verse": verse, "english": english}
        for (book, chapter, verse), english in sorted(witnesses["eng-webbe"].items()) if book in targets
    ]
    missing = sorted(set(targets) - {row["bookId"] for row in rows})
    if missing: raise SystemExit(f"WEBBE source lacks target books: {missing}")
    api = HfApi()
    model_infos = {mid: api.model_info(mid) for mid in (PRIMARY_MODEL_ID, SECONDARY_MODEL_ID, SEMANTIC_MODEL_ID)}
    texts = [row["english"] for row in rows]
    primary_raw = translate_model(PRIMARY_MODEL_ID, str(model_infos[PRIMARY_MODEL_ID].sha), texts, args.batch_size)
    secondary_raw = translate_model(SECONDARY_MODEL_ID, str(model_infos[SECONDARY_MODEL_ID].sha), texts, args.batch_size)
    if len(primary_raw) != len(rows) or len(secondary_raw) != len(rows): raise SystemExit("Translation count mismatch")
    primary = [align_quotes(source, target) for source, target in zip(texts, primary_raw)]
    secondary = [align_quotes(source, target) for source, target in zip(texts, secondary_raw)]
    semantic_model = SentenceTransformer(SEMANTIC_MODEL_ID, revision=str(model_infos[SEMANTIC_MODEL_ID].sha))
    source_vectors = semantic_model.encode(texts, batch_size=64, normalize_embeddings=True, show_progress_bar=True)
    primary_vectors = semantic_model.encode(primary, batch_size=64, normalize_embeddings=True, show_progress_bar=True)
    secondary_vectors = semantic_model.encode(secondary, batch_size=64, normalize_embeddings=True, show_progress_bar=True)
    primary_scores = [float(np.dot(a, b)) for a, b in zip(source_vectors, primary_vectors)]
    secondary_scores = [float(np.dot(a, b)) for a, b in zip(source_vectors, secondary_vectors)]
    issues: list[dict[str, Any]] = []
    books: dict[str, dict[int, list[dict[str, Any]]]] = {}
    selected_counts = Counter()
    for row, first, second, first_score, second_score in zip(rows, primary, secondary, primary_scores, secondary_scores):
        if selection_key(row["english"], second, second_score) > selection_key(row["english"], first, first_score):
            selected, selected_score, model_id = second, second_score, SECONDARY_MODEL_ID
        else:
            selected, selected_score, model_id = first, first_score, PRIMARY_MODEL_ID
        selected_counts[model_id] += 1
        codes = deterministic_codes(row["english"], selected)
        if selected_score < 0.50: codes.append("LOW_CROSS_LINGUAL_SEMANTIC_SCORE")
        reference = (row["bookId"], row["chapter"], row["verse"])
        coverage: dict[str, dict[str, Any]] = {}
        for source_id, witness in witnesses.items():
            if not source_id.startswith("grc"): continue
            matched = next((candidate for candidate in greek_reference_candidates(*reference) if candidate in witness), None)
            book_present = any(key[0] == row["bookId"] for key in witness)
            coverage[source_id] = {"covered": matched is not None, "reference": list(matched) if matched else None, "bookPresent": book_present}
        if not any(item["covered"] for item in coverage.values()):
            if row["bookId"] == "ESG" and any(item["bookPresent"] for item in coverage.values()): codes.append("GREEK_WITNESS_REQUIRES_SUBVERSE_ALIGNMENT")
            else: codes.append("NO_GREEK_REFERENCE_COVERAGE")
        codes = sorted(set(codes))
        if codes:
            issues.append({"reference": f"{row['bookId']}.{row['chapter']}:{row['verse']}", "codes": codes, "english": row["english"], "selectedRomanian": selected, "selectedModel": model_id, "selectedScore": round(selected_score, 6), "alternativeRomanian": second if model_id == PRIMARY_MODEL_ID else first, "alternativeScore": round(second_score if model_id == PRIMARY_MODEL_ID else first_score, 6), "greekCoverage": coverage})
        books.setdefault(row["bookId"], {}).setdefault(row["chapter"], []).append({"number": row["verse"], "text": selected, "selection": {"model": model_id, "semanticScore": round(selected_score, 6), "alternativeModel": SECONDARY_MODEL_ID if model_id == PRIMARY_MODEL_ID else PRIMARY_MODEL_ID}})
    models = {mid: {"id": mid, "revision": str(model_infos[mid].sha), "license": model_license(model_infos[mid])} for mid in (PRIMARY_MODEL_ID, SECONDARY_MODEL_ID, SEMANTIC_MODEL_ID)}
    chapter_count = verse_count = 0
    for book, chapters in sorted(books.items()):
        for chapter, verses in sorted(chapters.items()):
            chapter_issues = [item for item in issues if item["reference"].startswith(f"{book}.{chapter}:")]
            document = {"translation": "BE-DEUT-DUAL-DRAFT", "bookId": book, "bookName": targets[book], "chapter": chapter, "collection": "deuterocanon", "status": "in_review", "public": False, "runtimeEnabled": False, "source": {"english": {"id": "eng-webbe", "sha256": base.digest(source_paths["eng-webbe"]), "license": "Public Domain"}, "greek": [{"id": sid, "sha256": base.digest(source_paths[sid]), "license": "Public Domain"} for sid in sorted(source_paths) if sid.startswith("grc")], "translationModels": [models[PRIMARY_MODEL_ID], models[SECONDARY_MODEL_ID]], "selectionModel": models[SEMANTIC_MODEL_ID]}, "verses": [{"number": item["number"], "text": item["text"]} for item in verses], "audit": {"sourceVerseNumbers": [item["number"] for item in verses], "firstPassIssueCount": len(chapter_issues), "publicationBlocked": True, "candidateSelection": "two-model deterministic-and-semantic"}}
            (OUT / f"{book}.{chapter}.json").write_text(json.dumps(document, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
            chapter_count += 1; verse_count += len(verses)
    report = {"schemaVersion": 2, "sourceSnapshots": {sid: {"url": base.SOURCE_URLS[sid], "sha256": base.digest(path)} for sid, path in source_paths.items()}, "models": models, "selectionCounts": dict(selected_counts), "summary": {"books": len(books), "chapters": chapter_count, "verses": verse_count, "firstPassIssues": len(issues), "publicationReady": False}, "issues": issues}
    REPORT.parent.mkdir(parents=True, exist_ok=True)
    REPORT.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(report["summary"] | {"selectionCounts": dict(selected_counts)}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
