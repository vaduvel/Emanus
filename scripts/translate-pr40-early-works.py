#!/usr/bin/env python3
"""Generate source-backed Romanian candidates for selected early works.

The verified English source corpus must already exist. Long prose units are
segmented by tokenizer length, translated independently, and reassembled into
the original source unit. Set ``PR40_BOOKS`` for parallel CI shards.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
from pathlib import Path
from typing import Any

import torch
from huggingface_hub import HfApi
from transformers import MarianMTModel, MarianTokenizer

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "docs" / "data" / "biblia-emanus-early-source-candidates"
OUT = ROOT / "docs" / "data" / "biblia-emanus-early-romanian-candidates"
REPORT = ROOT / "docs" / "biblia-emanus" / "PR40-EARLY-WORKS-ROMANIAN-DRAFT.json"
MODEL_ID = "Helsinki-NLP/opus-mt-en-ro"
BOOK_NAMES = {
    "ENO": "1 Enoh",
    "JUB": "Jubileele",
    "DID": "Didascalia etiopiană",
    "4BA": "4 Baruh / Paralipomena lui Ieremia",
}
ENGLISH_TOKEN = re.compile(
    r"\b(?:the|and|that|which|with|from|unto|shall|were|was|this|these|their|lord|god|said|king|people)\b",
    re.I,
)
PLACEHOLDER = re.compile(r"(?:TODO|TBD|placeholder|text revizuit|martor istoric|păstrat în suluri)", re.I)
SENTENCE_BREAK = re.compile(r"(?<=[.!?;:])\s+")


def sha_text(value: str) -> str:
    return hashlib.sha256(value.encode("utf-8")).hexdigest()


def numeric_tokens(value: str) -> list[str]:
    return re.findall(r"\d+(?:[.,]\d+)?", value)


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
        words = sentence.split()
        part = ""
        for word in words:
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
    source_words = text.split()
    segment_words = " ".join(segments).split()
    if not segments or source_words != segment_words:
        raise RuntimeError("Tokenizer segmentation changed source words")
    return segments


def batches(values: list[str], size: int) -> list[list[str]]:
    return [values[index:index + size] for index in range(0, len(values), size)]


def translate_segments(
    tokenizer: MarianTokenizer,
    model: MarianMTModel,
    values: list[str],
    batch_size: int,
) -> list[str]:
    translated: list[str] = []
    for batch in batches(values, batch_size):
        encoded = tokenizer(batch, return_tensors="pt", padding=True, truncation=False)
        with torch.inference_mode():
            output = model.generate(
                **encoded,
                max_new_tokens=512,
                num_beams=4,
                length_penalty=1.0,
                early_stopping=True,
            )
        translated.extend(
            re.sub(r"\s+", " ", value).strip()
            for value in tokenizer.batch_decode(output, skip_special_tokens=True)
        )
    return translated


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--batch-size", type=int, default=20)
    args = parser.parse_args()

    source_paths = sorted(SOURCE.glob("*.json"))
    expected = 210
    if len(source_paths) != expected:
        raise SystemExit(f"Expected {expected} verified source chapters, found {len(source_paths)}")

    all_source_docs = [json.loads(path.read_text(encoding="utf-8")) for path in source_paths]
    blocking_sources = [
        f"{doc.get('bookId')}.{doc.get('chapter')}"
        for doc in all_source_docs
        if doc.get("status") != "source_verified" or doc.get("audit", {}).get("blocking")
    ]
    if blocking_sources:
        raise SystemExit(f"Source extraction is not clean: {blocking_sources[:20]}")

    selected_raw = os.environ.get("PR40_BOOKS", "").strip()
    selected = {item.strip() for item in selected_raw.split(",") if item.strip()} if selected_raw else set(BOOK_NAMES)
    unknown = sorted(selected - set(BOOK_NAMES))
    if unknown:
        raise SystemExit(f"Unknown PR40_BOOKS values: {unknown}")
    source_docs = [doc for doc in all_source_docs if doc.get("bookId") in selected]
    if not source_docs:
        raise SystemExit("No early works selected")
    selected_expected = sum(1 for doc in all_source_docs if doc.get("bookId") in selected)
    if len(source_docs) != selected_expected:
        raise SystemExit("Selected source chapter count mismatch")

    model_info = HfApi().model_info(MODEL_ID)
    revision = str(model_info.sha)
    tokenizer = MarianTokenizer.from_pretrained(MODEL_ID, revision=revision)
    model = MarianMTModel.from_pretrained(MODEL_ID, revision=revision)
    model.eval()

    rows: list[dict[str, Any]] = []
    all_segments: list[str] = []
    for doc in source_docs:
        for verse in doc["verses"]:
            english = str(verse["text"]).strip()
            segments = pack_segments(tokenizer, english)
            start = len(all_segments)
            all_segments.extend(segments)
            rows.append(
                {
                    "bookId": doc["bookId"],
                    "chapter": int(doc["chapter"]),
                    "number": int(verse["number"]),
                    "english": english,
                    "segments": segments,
                    "segmentStart": start,
                    "segmentEnd": len(all_segments),
                    "source": doc["source"],
                }
            )

    translated_segments = translate_segments(tokenizer, model, all_segments, args.batch_size)
    if len(translated_segments) != len(all_segments):
        raise SystemExit("Translation segment count mismatch")

    issues: list[dict[str, Any]] = []
    by_chapter: dict[tuple[str, int], list[dict[str, Any]]] = {}
    for row in rows:
        parts = translated_segments[row["segmentStart"]:row["segmentEnd"]]
        romanian = re.sub(r"\s+", " ", " ".join(parts)).strip()
        codes: list[str] = []
        if not romanian:
            codes.append("EMPTY_TRANSLATION")
        if PLACEHOLDER.search(romanian):
            codes.append("PLACEHOLDER")
        if ENGLISH_TOKEN.search(romanian):
            codes.append("ENGLISH_RESIDUE")
        if numeric_tokens(row["english"]) != numeric_tokens(romanian):
            codes.append("NUMBER_TOKEN_CHANGE")
        source_words = len(row["english"].split())
        target_words = len(romanian.split())
        ratio = target_words / max(source_words, 1)
        if ratio < 0.45:
            codes.append("SUSPICIOUSLY_SHORT")
        elif ratio > 2.1:
            codes.append("SUSPICIOUSLY_LONG")
        reference = f"{row['bookId']}.{row['chapter']}:{row['number']}"
        if codes:
            issues.append(
                {
                    "reference": reference,
                    "codes": codes,
                    "english": row["english"],
                    "romanian": romanian,
                    "lengthRatio": round(ratio, 4),
                }
            )
        by_chapter.setdefault((row["bookId"], row["chapter"]), []).append(
            {
                "number": row["number"],
                "text": romanian,
                "sourceEnglishDigest": sha_text(row["english"]),
                "segmentCount": len(row["segments"]),
            }
        )

    OUT.mkdir(parents=True, exist_ok=True)
    for old in OUT.glob("*.json"):
        old.unlink()
    chapter_count = 0
    unit_count = 0
    for (book_id, chapter), verses in sorted(by_chapter.items()):
        source_doc = next(
            doc for doc in source_docs
            if doc["bookId"] == book_id and int(doc["chapter"]) == chapter
        )
        chapter_issues = [item for item in issues if item["reference"].startswith(f"{book_id}.{chapter}:")]
        document = {
            "translation": "BE-EARLY-DRAFT",
            "bookId": book_id,
            "bookName": BOOK_NAMES[book_id],
            "chapter": chapter,
            "collection": "early-jewish-and-christian-writings",
            "status": "in_review",
            "public": False,
            "runtimeEnabled": False,
            "publicationLicense": source_doc["source"]["publicationLicense"],
            "source": {
                **source_doc["source"],
                "sourceTextDigest": sha_text("\n".join(str(item["text"]) for item in source_doc["verses"])),
                "translationModel": {
                    "id": MODEL_ID,
                    "revision": revision,
                    "license": "CC BY 4.0",
                    "role": "first-pass candidate only",
                },
            },
            "verses": [{"number": item["number"], "text": item["text"]} for item in verses],
            "audit": {
                "sourceUnits": len(source_doc["verses"]),
                "translatedUnits": len(verses),
                "firstPassIssueCount": len(chapter_issues),
                "publicationBlocked": True,
                "requiredNextGate": "multilingual-semantic-and-editorial-review",
            },
        }
        (OUT / f"{book_id}.{chapter}.json").write_text(
            json.dumps(document, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
        chapter_count += 1
        unit_count += len(verses)

    report = {
        "schemaVersion": 2,
        "selectedBooks": sorted(selected),
        "translationModel": {"id": MODEL_ID, "revision": revision, "license": "CC BY 4.0"},
        "summary": {
            "books": len({book_id for book_id, _chapter in by_chapter}),
            "chapters": chapter_count,
            "sourceUnits": len(rows),
            "segments": len(all_segments),
            "translatedUnits": unit_count,
            "firstPassIssues": len(issues),
            "publicationReady": False,
        },
        "issues": issues,
    }
    REPORT.parent.mkdir(parents=True, exist_ok=True)
    REPORT.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(report["summary"], ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
