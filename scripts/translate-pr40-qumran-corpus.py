#!/usr/bin/env python3
"""Generate a Romanian research translation for the authentic Qumran corpus.

The original diplomatic text, normalized text, transliteration, coordinates,
and lacunae remain authoritative. Hebrew and Aramaic are processed separately;
Aramaic output is explicitly provisional and cannot be presented without the
source panel. Completely lost lines remain ``[…]`` and are never translated.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import re
from pathlib import Path
from typing import Any

import torch
from huggingface_hub import HfApi
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "docs" / "data" / "biblia-emanus-qumran-source"
OUT = ROOT / "docs" / "data" / "biblia-emanus-qumran-romanian-candidates"
REPORT = ROOT / "docs" / "biblia-emanus" / "PR40-QUMRAN-ROMANIAN-DRAFT.json"
MODEL_ID = "facebook/nllb-200-distilled-600M"
SOURCE_LANGUAGE = "heb_Hebr"
TARGET_LANGUAGE = "ron_Latn"
HEBREW_CHAR = re.compile(r"[\u0590-\u05ff]")
ROMANIAN_CHAR = re.compile(r"[ăâîșțĂÂÎȘȚ]")
ENGLISH_TOKEN = re.compile(r"\b(?:the|and|that|which|with|from|unto|shall|lord|god|king|people)\b", re.I)


def sha_text(value: str) -> str:
    return hashlib.sha256(value.encode("utf-8")).hexdigest()


def batches(values: list[str], size: int) -> list[list[str]]:
    return [values[index:index + size] for index in range(0, len(values), size)]


def translate(
    tokenizer: Any,
    model: Any,
    values: list[str],
    batch_size: int,
) -> list[str]:
    translated: list[str] = []
    forced_bos = tokenizer.convert_tokens_to_ids(TARGET_LANGUAGE)
    for batch in batches(values, batch_size):
        encoded = tokenizer(
            batch,
            return_tensors="pt",
            padding=True,
            truncation=True,
            max_length=512,
        )
        with torch.inference_mode():
            output = model.generate(
                **encoded,
                forced_bos_token_id=forced_bos,
                max_new_tokens=256,
                num_beams=5,
                early_stopping=True,
            )
        translated.extend(
            re.sub(r"\s+", " ", value).strip()
            for value in tokenizer.batch_decode(output, skip_special_tokens=True)
        )
    return translated


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--batch-size", type=int, default=28)
    args = parser.parse_args()

    witness_paths = sorted(
        path for path in SOURCE.glob("*.json")
        if not path.name.endswith(".manifest.json")
    )
    if len(witness_paths) != 20:
        raise SystemExit(f"Expected 20 source witnesses, found {len(witness_paths)}")
    source_docs = [json.loads(path.read_text(encoding="utf-8")) for path in witness_paths]
    if any(doc.get("status") != "source_verified" for doc in source_docs):
        raise SystemExit("Qumran source corpus is not fully verified")

    model_info = HfApi().model_info(MODEL_ID)
    revision = str(model_info.sha)
    tokenizer = AutoTokenizer.from_pretrained(MODEL_ID, revision=revision, src_lang=SOURCE_LANGUAGE)
    model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_ID, revision=revision)
    model.eval()

    rows: list[dict[str, Any]] = []
    source_texts: list[str] = []
    for doc in source_docs:
        for fragment in doc["fragments"]:
            for line in fragment["lines"]:
                row = {
                    "witness": doc["witness"],
                    "collectionId": doc["collectionId"],
                    "fragment": fragment["fragment"],
                    "line": line["line"],
                    "source": line,
                    "sourceIndex": None,
                }
                if not line.get("isTotalLacuna"):
                    text = str(line.get("normalized") or line.get("diplomatic") or "").strip()
                    if not text:
                        raise SystemExit(
                            f"Unexplained empty source line {doc['witness']} {fragment['fragment']}:{line['line']}"
                        )
                    row["sourceIndex"] = len(source_texts)
                    source_texts.append(text)
                rows.append(row)

    translations = translate(tokenizer, model, source_texts, args.batch_size)
    if len(translations) != len(source_texts):
        raise SystemExit("Qumran translation count mismatch")

    OUT.mkdir(parents=True, exist_ok=True)
    for old in OUT.glob("*.json"):
        old.unlink()

    issues: list[dict[str, Any]] = []
    by_witness: dict[str, list[dict[str, Any]]] = {}
    aramaic_lines = 0
    hebrew_lines = 0
    lacunae = 0
    for row in rows:
        source = row["source"]
        reference = f"{row['witness']}:{row['fragment']}:{row['line']}"
        if source.get("isTotalLacuna"):
            romanian = "[…]"
            confidence = "not-applicable"
            method = "total-manuscript-lacuna"
            codes: list[str] = []
            lacunae += 1
        else:
            romanian = translations[int(row["sourceIndex"])]
            is_aramaic = source.get("language") == "a"
            if is_aramaic:
                aramaic_lines += 1
                confidence = "low-provisional"
                method = "NLLB Hebrew-script provisional pass; Aramaic editorial review required"
            else:
                hebrew_lines += 1
                confidence = "machine-draft"
                method = "NLLB Hebrew-to-Romanian first pass"
            codes = []
            if not romanian:
                codes.append("EMPTY_TRANSLATION")
            if HEBREW_CHAR.search(romanian):
                codes.append("SOURCE_SCRIPT_RESIDUE")
            if ENGLISH_TOKEN.search(romanian):
                codes.append("ENGLISH_RESIDUE")
            source_words = len(str(source.get("transliterationNormalized") or source.get("normalized") or "").split())
            target_words = len(romanian.split())
            ratio = target_words / max(source_words, 1)
            if ratio < 0.25:
                codes.append("SUSPICIOUSLY_SHORT")
            if ratio > 4.0:
                codes.append("SUSPICIOUSLY_LONG")
            if is_aramaic:
                codes.append("ARAMAIC_EDITORIAL_REVIEW_REQUIRED")
            if codes:
                issues.append(
                    {
                        "reference": reference,
                        "codes": codes,
                        "sourceNormalized": source.get("normalized"),
                        "transliteration": source.get("transliterationNormalized"),
                        "romanian": romanian,
                    }
                )
        by_witness.setdefault(row["witness"], []).append(
            {
                "collectionId": row["collectionId"],
                "fragment": row["fragment"],
                "line": row["line"],
                "diplomatic": source.get("diplomatic", ""),
                "normalized": source.get("normalized", ""),
                "transliteration": source.get("transliterationNormalized", ""),
                "romanian": romanian,
                "isTotalLacuna": bool(source.get("isTotalLacuna")),
                "translationAllowed": bool(source.get("translationAllowed")),
                "translationMethod": method,
                "translationConfidence": confidence,
            }
        )

    for doc in source_docs:
        witness = doc["witness"]
        lines = by_witness[witness]
        document = {
            "schemaVersion": 1,
            "collectionId": doc["collectionId"],
            "witness": witness,
            "status": "in_review",
            "public": False,
            "runtimeEnabled": False,
            "publicationForm": "parallel-fragment-research-edition",
            "license": "CC BY-NC 4.0 for derived Romanian research edition",
            "source": {
                **doc["source"],
                "sourceDigest": doc["sourceDigest"],
                "normalizedDigest": doc["normalizedDigest"],
                "translationModel": {
                    "id": MODEL_ID,
                    "revision": revision,
                    "license": "CC-BY-NC-4.0",
                    "sourceLanguage": SOURCE_LANGUAGE,
                    "targetLanguage": TARGET_LANGUAGE,
                    "role": "first-pass candidate only",
                },
            },
            "lines": lines,
            "audit": {
                "sourceLineCount": doc["lineCount"],
                "translatedOrLacunaCount": len(lines),
                "publicationBlocked": True,
                "requiredNextGate": "source-language-editorial-and-multimodel-review",
            },
        }
        (OUT / f"{witness}.json").write_text(
            json.dumps(document, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )

    report = {
        "schemaVersion": 1,
        "sourceCommit": source_docs[0]["source"]["commit"],
        "translationModel": {
            "id": MODEL_ID,
            "revision": revision,
            "sourceLanguage": SOURCE_LANGUAGE,
            "targetLanguage": TARGET_LANGUAGE,
        },
        "summary": {
            "collections": len({doc["collectionId"] for doc in source_docs}),
            "witnesses": len(source_docs),
            "lines": len(rows),
            "hebrewLines": hebrew_lines,
            "aramaicLines": aramaic_lines,
            "totalLacunae": lacunae,
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
