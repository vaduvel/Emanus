#!/usr/bin/env python3
"""Generate selected early-work Romanian candidates with two independent models."""
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
BASE_SCRIPT = Path(__file__).with_name("translate-pr40-early-works.py")
spec = importlib.util.spec_from_file_location("early_base", BASE_SCRIPT)
if spec is None or spec.loader is None: raise SystemExit(f"Cannot load {BASE_SCRIPT}")
base = importlib.util.module_from_spec(spec); spec.loader.exec_module(base)
SOURCE = ROOT / "docs" / "data" / "biblia-emanus-early-source-candidates"
OUT = ROOT / "docs" / "data" / "biblia-emanus-early-romanian-candidates"
REPORT = ROOT / "docs" / "biblia-emanus" / "PR40-EARLY-WORKS-ROMANIAN-DRAFT.json"
PRIMARY_MODEL_ID = "Helsinki-NLP/opus-mt-tc-big-en-ro"
SECONDARY_MODEL_ID = "Helsinki-NLP/opus-mt-en-ro"
SEMANTIC_MODEL_ID = "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2"
BOOK_NAMES = {"ENO": "1 Enoh", "JUB": "Jubileele", "DID": "Didascalia etiopiană", "4BA": "4 Baruh / Paralipomena lui Ieremia"}
ENGLISH_TOKEN = re.compile(r"\b(?:the|and|that|which|with|from|unto|shall|were|was|this|these|their|lord|god|said|king|people)\b", re.I)
PLACEHOLDER = re.compile(r"(?:TODO|TBD|placeholder|text revizuit|martor istoric|păstrat în suluri)", re.I)
DANGLING_END = re.compile(r"\b(?:și|iar|sau|cu|de|din|la|pe|prin|pentru|către|dintre|nici|un|o|al|a|ai|ale)\s*[.!?…»”]?$", re.I)


def selected_books() -> set[str]:
    raw = os.environ.get("PR40_BOOKS", "").strip(); selected = {item.strip() for item in raw.split(",") if item.strip()} if raw else set(BOOK_NAMES)
    unknown = sorted(selected - set(BOOK_NAMES))
    if unknown: raise SystemExit(f"Unknown PR40_BOOKS values: {unknown}")
    if not selected: raise SystemExit("No early works selected")
    return selected


def normalize_romanian(value: str) -> str:
    value = value.replace("ş", "ș").replace("Ş", "Ș").replace("ţ", "ț").replace("Ţ", "Ț").replace("“", "„")
    value = re.sub(r"\s+([,.;:!?])", r"\1", value); value = re.sub(r"([,.;:!?])(?=[^\s”»)])", r"\1 ", value)
    return re.sub(r"\s+", " ", value).strip()


def numeric_tokens(value: str) -> list[str]: return re.findall(r"\d+(?:[.,]\d+)?", value)


def repeated_ngram(value: str, n: int = 3) -> bool:
    words = re.findall(r"[\wăâîșțĂÂÎȘȚ]+", value.lower())
    if len(words) < n * 3: return False
    grams = [tuple(words[index:index + n]) for index in range(len(words) - n + 1)]
    return max(Counter(grams).values(), default=0) >= 3


def deterministic_codes(source: str, target: str) -> list[str]:
    codes = []
    if not target: return ["EMPTY_TRANSLATION"]
    if PLACEHOLDER.search(target): codes.append("PLACEHOLDER")
    if ENGLISH_TOKEN.search(target): codes.append("ENGLISH_RESIDUE")
    if numeric_tokens(source) != numeric_tokens(target): codes.append("NUMBER_TOKEN_CHANGE")
    ratio = len(target.split()) / max(len(source.split()), 1)
    if ratio < 0.46: codes.append("SUSPICIOUSLY_SHORT")
    elif ratio > 2.15: codes.append("SUSPICIOUSLY_LONG")
    words = re.findall(r"[\wăâîșțĂÂÎȘȚ]+", target.lower())
    if len(words) >= 8 and max(Counter(words).values(), default=0) / len(words) > 0.38: codes.append("TOKEN_REPETITION")
    if repeated_ngram(target): codes.append("NGRAM_REPETITION")
    if DANGLING_END.search(target): codes.append("DANGLING_END")
    if re.search(r"\b([a-zăâîșț]{1,5})\s+\1\b", target.lower()): codes.append("DUPLICATED_SHORT_WORD")
    if "�" in target or "\x00" in target: codes.append("INVALID_CHARACTER")
    return sorted(set(codes))


def translate_model(model_id: str, revision: str, segments: list[str], batch_size: int) -> list[str]:
    tokenizer = MarianTokenizer.from_pretrained(model_id, revision=revision); model = MarianMTModel.from_pretrained(model_id, revision=revision); model.eval(); translated = []
    for index in range(0, len(segments), batch_size):
        batch = segments[index:index + batch_size]; encoded = tokenizer(batch, return_tensors="pt", padding=True, truncation=False)
        with torch.inference_mode(): output = model.generate(**encoded, max_new_tokens=512, num_beams=5, length_penalty=1.0, early_stopping=True)
        translated.extend(normalize_romanian(value) for value in tokenizer.batch_decode(output, skip_special_tokens=True))
    del model, tokenizer; gc.collect(); return translated


def model_license(info: Any) -> str:
    card = getattr(info, "card_data", None); value = getattr(card, "license", None) if card is not None else None
    return str(value) if value else "model-card-license"


def selection_key(source: str, target: str, semantic: float):
    codes = deterministic_codes(source, target); ratio = len(target.split()) / max(len(source.split()), 1)
    return (1 if not codes else 0, semantic - 0.12 * len(codes), -abs(math.log(max(ratio, 0.01))), len(target))


def sha_text(value: str) -> str: return hashlib.sha256(value.encode("utf-8")).hexdigest()


def main() -> None:
    import argparse
    parser = argparse.ArgumentParser(); parser.add_argument("--batch-size", type=int, default=14); args = parser.parse_args(); selected = selected_books()
    source_paths = sorted(SOURCE.glob("*.json"))
    if len(source_paths) != 210: raise SystemExit(f"Expected 210 verified source chapters, found {len(source_paths)}")
    all_docs = [json.loads(path.read_text(encoding="utf-8")) for path in source_paths]
    unverified = [f"{doc.get('bookId')}.{doc.get('chapter')}" for doc in all_docs if doc.get("status") != "source_verified" or doc.get("audit", {}).get("blocking")]
    if unverified: raise SystemExit(f"Source extraction is not clean: {unverified[:20]}")
    source_docs = [doc for doc in all_docs if doc.get("bookId") in selected]
    if {doc["bookId"] for doc in source_docs} != selected: raise SystemExit("Selected early-work source set is incomplete")
    api = HfApi(); infos = {mid: api.model_info(mid) for mid in (PRIMARY_MODEL_ID, SECONDARY_MODEL_ID, SEMANTIC_MODEL_ID)}
    segmenter = MarianTokenizer.from_pretrained(PRIMARY_MODEL_ID, revision=str(infos[PRIMARY_MODEL_ID].sha)); rows = []; all_segments = []
    for doc in source_docs:
        for verse in doc["verses"]:
            english = str(verse["text"]).strip(); segments = base.pack_segments(segmenter, english); start = len(all_segments); all_segments.extend(segments)
            rows.append({"bookId": doc["bookId"], "chapter": int(doc["chapter"]), "number": int(verse["number"]), "english": english, "segmentStart": start, "segmentEnd": len(all_segments)})
    del segmenter
    primary_segments = translate_model(PRIMARY_MODEL_ID, str(infos[PRIMARY_MODEL_ID].sha), all_segments, args.batch_size)
    secondary_segments = translate_model(SECONDARY_MODEL_ID, str(infos[SECONDARY_MODEL_ID].sha), all_segments, args.batch_size)
    if len(primary_segments) != len(all_segments) or len(secondary_segments) != len(all_segments): raise SystemExit("Translation segment count mismatch")
    primary = []; secondary = []
    for row in rows:
        start, end = row["segmentStart"], row["segmentEnd"]; primary.append(normalize_romanian(" ".join(primary_segments[start:end]))); secondary.append(normalize_romanian(" ".join(secondary_segments[start:end])))
    semantic_model = SentenceTransformer(SEMANTIC_MODEL_ID, revision=str(infos[SEMANTIC_MODEL_ID].sha))
    source_vectors = semantic_model.encode([r["english"] for r in rows], batch_size=64, normalize_embeddings=True, show_progress_bar=True)
    primary_vectors = semantic_model.encode(primary, batch_size=64, normalize_embeddings=True, show_progress_bar=True); secondary_vectors = semantic_model.encode(secondary, batch_size=64, normalize_embeddings=True, show_progress_bar=True)
    primary_scores = [float(np.dot(a, b)) for a, b in zip(source_vectors, primary_vectors)]; secondary_scores = [float(np.dot(a, b)) for a, b in zip(source_vectors, secondary_vectors)]
    issues = []; selected_counts = Counter(); by_chapter = {}
    for row, first, second, fs, ss in zip(rows, primary, secondary, primary_scores, secondary_scores):
        if selection_key(row["english"], second, ss) > selection_key(row["english"], first, fs): chosen, score, model_id = second, ss, SECONDARY_MODEL_ID
        else: chosen, score, model_id = first, fs, PRIMARY_MODEL_ID
        selected_counts[model_id] += 1; codes = deterministic_codes(row["english"], chosen)
        if score < 0.50: codes.append("LOW_CROSS_LINGUAL_SEMANTIC_SCORE")
        reference = f"{row['bookId']}.{row['chapter']}:{row['number']}"
        if codes: issues.append({"reference": reference, "codes": sorted(set(codes)), "english": row["english"], "selectedRomanian": chosen, "selectedModel": model_id, "selectedScore": round(score, 6), "alternativeRomanian": second if model_id == PRIMARY_MODEL_ID else first, "alternativeScore": round(ss if model_id == PRIMARY_MODEL_ID else fs, 6)})
        by_chapter.setdefault((row["bookId"], row["chapter"]), []).append({"number": row["number"], "text": chosen})
    models = {mid: {"id": mid, "revision": str(infos[mid].sha), "license": model_license(infos[mid])} for mid in (PRIMARY_MODEL_ID, SECONDARY_MODEL_ID, SEMANTIC_MODEL_ID)}
    OUT.mkdir(parents=True, exist_ok=True)
    for old in OUT.glob("*.json"): old.unlink()
    chapter_count = unit_count = 0
    for (book_id, chapter), verses in sorted(by_chapter.items()):
        source_doc = next(doc for doc in source_docs if doc["bookId"] == book_id and int(doc["chapter"]) == chapter); chapter_issues = [i for i in issues if i["reference"].startswith(f"{book_id}.{chapter}:")]
        document = {"translation": "BE-EARLY-DUAL-DRAFT", "bookId": book_id, "bookName": BOOK_NAMES[book_id], "chapter": chapter, "collection": "early-jewish-and-christian-writings", "status": "in_review", "public": False, "runtimeEnabled": False, "publicationLicense": source_doc["source"]["publicationLicense"], "source": {**source_doc["source"], "sourceTextDigest": sha_text("\n".join(str(item["text"]) for item in source_doc["verses"])), "translationModels": [models[PRIMARY_MODEL_ID], models[SECONDARY_MODEL_ID]], "selectionModel": models[SEMANTIC_MODEL_ID]}, "verses": verses, "audit": {"sourceUnits": len(source_doc["verses"]), "translatedUnits": len(verses), "firstPassIssueCount": len(chapter_issues), "publicationBlocked": True, "candidateSelection": "two-model deterministic-and-semantic"}}
        (OUT / f"{book_id}.{chapter}.json").write_text(json.dumps(document, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"); chapter_count += 1; unit_count += len(verses)
    report = {"schemaVersion": 2, "selectedBooks": sorted(selected), "models": models, "selectionCounts": dict(selected_counts), "summary": {"books": len(selected), "chapters": chapter_count, "sourceUnits": len(rows), "segments": len(all_segments), "translatedUnits": unit_count, "firstPassIssues": len(issues), "publicationReady": False}, "issues": issues}
    REPORT.parent.mkdir(parents=True, exist_ok=True); REPORT.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"); print(json.dumps(report["summary"] | {"selectionCounts": dict(selected_counts)}, ensure_ascii=False, indent=2))


if __name__ == "__main__": main()
