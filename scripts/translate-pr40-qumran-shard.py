#!/usr/bin/env python3
"""Translate a selected Qumran witness shard using the pinned NLLB pipeline."""
from __future__ import annotations

import argparse
import importlib.util
import json
import os
import re
from pathlib import Path
from typing import Any

from huggingface_hub import HfApi
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer

BASE = Path(__file__).with_name("translate-pr40-qumran-corpus.py")
spec = importlib.util.spec_from_file_location("qumran_translation_base", BASE)
if spec is None or spec.loader is None:
    raise SystemExit(f"Cannot load {BASE}")
base = importlib.util.module_from_spec(spec)
spec.loader.exec_module(base)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--batch-size", type=int, default=28)
    args = parser.parse_args()

    selected_raw = os.environ.get("PR40_WITNESSES", "").strip()
    selected = {item.strip() for item in selected_raw.split(",") if item.strip()}
    if not selected:
        raise SystemExit("PR40_WITNESSES must select at least one witness")

    all_paths = sorted(
        path for path in base.SOURCE.glob("*.json")
        if not path.name.endswith(".manifest.json")
    )
    if len(all_paths) != 20:
        raise SystemExit(f"Expected 20 verified source witnesses, found {len(all_paths)}")
    all_docs = {path.stem: json.loads(path.read_text(encoding="utf-8")) for path in all_paths}
    unknown = sorted(selected - set(all_docs))
    if unknown:
        raise SystemExit(f"Unknown Qumran witnesses: {unknown}")
    source_docs = [all_docs[witness] for witness in sorted(selected)]
    if any(doc.get("status") != "source_verified" for doc in source_docs):
        raise SystemExit("Selected Qumran source corpus is not fully verified")

    revision = str(HfApi().model_info(base.MODEL_ID).sha)
    tokenizer = AutoTokenizer.from_pretrained(
        base.MODEL_ID,
        revision=revision,
        src_lang=base.SOURCE_LANGUAGE,
    )
    model = AutoModelForSeq2SeqLM.from_pretrained(base.MODEL_ID, revision=revision)
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
                            f"Unexplained empty source line {doc['witness']} "
                            f"{fragment['fragment']}:{line['line']}"
                        )
                    row["sourceIndex"] = len(source_texts)
                    source_texts.append(text)
                rows.append(row)

    translations = base.translate(tokenizer, model, source_texts, args.batch_size)
    if len(translations) != len(source_texts):
        raise SystemExit("Qumran translation count mismatch")

    base.OUT.mkdir(parents=True, exist_ok=True)
    for old in base.OUT.glob("*.json"):
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
                method = "NLLB Hebrew-script provisional pass; Aramaic review required"
            else:
                hebrew_lines += 1
                confidence = "machine-draft"
                method = "NLLB Hebrew-to-Romanian first pass"
            codes = []
            if not romanian:
                codes.append("EMPTY_TRANSLATION")
            if base.HEBREW_CHAR.search(romanian):
                codes.append("SOURCE_SCRIPT_RESIDUE")
            if base.ENGLISH_TOKEN.search(romanian):
                codes.append("ENGLISH_RESIDUE")
            source_words = len(
                str(source.get("transliterationNormalized") or source.get("normalized") or "").split()
            )
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
            "schemaVersion": 2,
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
                    "id": base.MODEL_ID,
                    "revision": revision,
                    "license": "CC-BY-NC-4.0",
                    "sourceLanguage": base.SOURCE_LANGUAGE,
                    "targetLanguage": base.TARGET_LANGUAGE,
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
        (base.OUT / f"{witness}.json").write_text(
            json.dumps(document, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )

    report = {
        "schemaVersion": 2,
        "selectedWitnesses": sorted(selected),
        "sourceCommit": source_docs[0]["source"]["commit"],
        "translationModel": {
            "id": base.MODEL_ID,
            "revision": revision,
            "sourceLanguage": base.SOURCE_LANGUAGE,
            "targetLanguage": base.TARGET_LANGUAGE,
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
    base.REPORT.parent.mkdir(parents=True, exist_ok=True)
    base.REPORT.write_text(
        json.dumps(report, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(json.dumps(report["summary"], ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
