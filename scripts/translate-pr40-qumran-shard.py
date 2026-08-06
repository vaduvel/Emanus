#!/usr/bin/env python3
"""Translate a selected Qumran shard without inventing unreadable content.

Only Hebrew lines receive an NLLB candidate. Aramaic lines are published as
source-only research data with an explicit Romanian notice. Total lacunae
remain ``[…]``. Hebrew outputs with deterministic hallucination signals are
rejected and represented source-only instead of being called translations.
"""
from __future__ import annotations

import argparse
import importlib.util
import json
import os
import re
from collections import Counter
from pathlib import Path
from typing import Any

from huggingface_hub import HfApi
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer

BASE = Path(__file__).with_name("translate-pr40-qumran-corpus.py")
spec = importlib.util.spec_from_file_location("qumran_translation_base", BASE)
if spec is None or spec.loader is None: raise SystemExit(f"Cannot load {BASE}")
base = importlib.util.module_from_spec(spec); spec.loader.exec_module(base)


def repeated_ngram(value: str, n: int = 3) -> bool:
    words = re.findall(r"[\wăâîșțĂÂÎȘȚ]+", value.lower())
    if len(words) < n * 3: return False
    grams = [tuple(words[index:index + n]) for index in range(len(words) - n + 1)]
    return max(Counter(grams).values(), default=0) >= 3


def reject_codes(source: dict[str, Any], target: str) -> list[str]:
    codes = []
    if not target: return ["EMPTY_TRANSLATION"]
    if base.HEBREW_CHAR.search(target): codes.append("SOURCE_SCRIPT_RESIDUE")
    if base.ENGLISH_TOKEN.search(target): codes.append("ENGLISH_RESIDUE")
    source_words = len(str(source.get("transliterationNormalized") or source.get("normalized") or "").split()); target_words = len(target.split()); ratio = target_words / max(source_words, 1)
    if ratio < 0.18: codes.append("SUSPICIOUSLY_SHORT")
    elif ratio > 4.5: codes.append("SUSPICIOUSLY_LONG")
    words = re.findall(r"[\wăâîșțĂÂÎȘȚ]+", target.lower())
    if len(words) >= 8 and max(Counter(words).values(), default=0) / len(words) > 0.38: codes.append("TOKEN_REPETITION")
    if repeated_ngram(target): codes.append("NGRAM_REPETITION")
    return sorted(set(codes))


def main() -> None:
    parser = argparse.ArgumentParser(); parser.add_argument("--batch-size", type=int, default=28); args = parser.parse_args()
    selected = {item.strip() for item in os.environ.get("PR40_WITNESSES", "").split(",") if item.strip()}
    if not selected: raise SystemExit("PR40_WITNESSES must select at least one witness")
    all_paths = sorted(path for path in base.SOURCE.glob("*.json") if not path.name.endswith(".manifest.json"))
    if len(all_paths) != 20: raise SystemExit(f"Expected 20 verified source witnesses, found {len(all_paths)}")
    all_docs = {path.stem: json.loads(path.read_text(encoding="utf-8")) for path in all_paths}; unknown = sorted(selected - set(all_docs))
    if unknown: raise SystemExit(f"Unknown Qumran witnesses: {unknown}")
    source_docs = [all_docs[witness] for witness in sorted(selected)]
    if any(doc.get("status") != "source_verified" for doc in source_docs): raise SystemExit("Selected Qumran source corpus is not fully verified")
    revision = str(HfApi().model_info(base.MODEL_ID).sha); tokenizer = AutoTokenizer.from_pretrained(base.MODEL_ID, revision=revision, src_lang=base.SOURCE_LANGUAGE); model = AutoModelForSeq2SeqLM.from_pretrained(base.MODEL_ID, revision=revision); model.eval()
    rows = []; hebrew_texts = []
    for doc in source_docs:
        for fragment in doc["fragments"]:
            for line in fragment["lines"]:
                row = {"witness": doc["witness"], "collectionId": doc["collectionId"], "fragment": fragment["fragment"], "line": line["line"], "source": line, "translationIndex": None}
                if not line.get("isTotalLacuna") and line.get("language") != "a":
                    text = str(line.get("normalized") or line.get("diplomatic") or "").strip()
                    if not text: raise SystemExit(f"Unexplained empty Hebrew source line {doc['witness']} {fragment['fragment']}:{line['line']}")
                    row["translationIndex"] = len(hebrew_texts); hebrew_texts.append(text)
                rows.append(row)
    translations = base.translate(tokenizer, model, hebrew_texts, args.batch_size) if hebrew_texts else []
    if len(translations) != len(hebrew_texts): raise SystemExit("Qumran Hebrew translation count mismatch")
    base.OUT.mkdir(parents=True, exist_ok=True)
    for old in base.OUT.glob("*.json"): old.unlink()
    issues = []; by_witness = {}; counts = Counter()
    for row in rows:
        source = row["source"]; reference = f"{row['witness']}:{row['fragment']}:{row['line']}"; notice = None; rejected_candidate = None
        if source.get("isTotalLacuna"):
            romanian = "[…]"; status = "total-lacuna"; confidence = "not-applicable"; method = "total-manuscript-lacuna"
        elif source.get("language") == "a":
            romanian = None; status = "source-only-aramaic"; confidence = "not-translated"; method = "no qualified Aramaic translation model used"; notice = "Linie aramaică netradusă; consultați textul normalizat și transliterarea."; issues.append({"reference": reference, "code": "ARAMAIC_SOURCE_ONLY", "publicationWarning": notice})
        else:
            candidate = re.sub(r"\s+", " ", translations[int(row["translationIndex"])]).strip(); codes = reject_codes(source, candidate)
            if codes:
                romanian = None; rejected_candidate = candidate; status = "source-only-rejected-machine-output"; confidence = "not-translated"; method = "NLLB candidate rejected by deterministic anti-hallucination gate"; notice = "Candidatul automat a fost respins; consultați textul normalizat și transliterarea."; issues.append({"reference": reference, "codes": codes, "rejectedCandidate": candidate, "sourceNormalized": source.get("normalized"), "transliteration": source.get("transliterationNormalized")})
            else:
                romanian = candidate.replace("ş", "ș").replace("Ş", "Ș").replace("ţ", "ț").replace("Ţ", "Ț"); status = "machine-candidate"; confidence = "machine-draft"; method = "NLLB Hebrew-to-Romanian candidate; fragment semantic audit required"
        counts[status] += 1
        by_witness.setdefault(row["witness"], []).append({"collectionId": row["collectionId"], "fragment": row["fragment"], "line": row["line"], "diplomatic": source.get("diplomatic", ""), "normalized": source.get("normalized", ""), "transliteration": source.get("transliterationNormalized", ""), "romanian": romanian, "translationStatus": status, "translationNoticeRo": notice, "rejectedMachineCandidate": rejected_candidate, "isTotalLacuna": bool(source.get("isTotalLacuna")), "translationAllowed": bool(source.get("translationAllowed")), "translationMethod": method, "translationConfidence": confidence})
    for doc in source_docs:
        witness = doc["witness"]; lines = by_witness[witness]
        document = {"schemaVersion": 3, "collectionId": doc["collectionId"], "witness": witness, "status": "in_review", "public": False, "runtimeEnabled": False, "publicationForm": "parallel-fragment-research-edition-with-source-only-lines", "license": "CC BY-NC 4.0 for generated Romanian candidates; source license retained per witness", "source": {**doc["source"], "sourceDigest": doc["sourceDigest"], "normalizedDigest": doc["normalizedDigest"], "translationModel": {"id": base.MODEL_ID, "revision": revision, "license": "CC-BY-NC-4.0", "sourceLanguage": base.SOURCE_LANGUAGE, "targetLanguage": base.TARGET_LANGUAGE, "role": "Hebrew first-pass candidate only; never used for Aramaic"}}, "lines": lines, "audit": {"sourceLineCount": doc["lineCount"], "representedLineCount": len(lines), "publicationBlocked": True, "requiredNextGate": "line-integrity-and-fragment-semantic-review", "sourceOnlyLinesMustDisplayNotice": True}}
        (base.OUT / f"{witness}.json").write_text(json.dumps(document, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    report = {"schemaVersion": 3, "selectedWitnesses": sorted(selected), "sourceCommit": source_docs[0]["source"]["commit"], "translationModel": {"id": base.MODEL_ID, "revision": revision, "sourceLanguage": base.SOURCE_LANGUAGE, "targetLanguage": base.TARGET_LANGUAGE}, "summary": {"collections": len({doc["collectionId"] for doc in source_docs}), "witnesses": len(source_docs), "lines": len(rows), "statusCounts": dict(counts), "publicationReady": False}, "issues": issues}
    base.REPORT.parent.mkdir(parents=True, exist_ok=True); base.REPORT.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"); print(json.dumps(report["summary"], ensure_ascii=False, indent=2))


if __name__ == "__main__": main()
