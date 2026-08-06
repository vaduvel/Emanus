#!/usr/bin/env python3
"""Repair degenerate Qumran machine output without inventing lost text."""
from __future__ import annotations

import argparse
import gc
import json
import re
from pathlib import Path
from typing import Any

import torch
from huggingface_hub import HfApi
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "docs" / "data" / "biblia-emanus-qumran-source"
CANDIDATES = ROOT / "docs" / "data" / "biblia-emanus-qumran-romanian-candidates"
MODEL_ID = "facebook/nllb-200-distilled-600M"
SOURCE_LANGUAGE = "heb_Hebr"
TARGET_LANGUAGE = "ron_Latn"
INSUFFICIENT = "[… fragment prea deteriorat pentru o traducere sigură …]"
HEBREW_WORD = re.compile(r"[\u0590-\u05ff]+")

# These fragments preserve isolated Aramaic words but not enough continuous
# syntax for a defensible Romanian rendering. The transcription stays visible;
# no reconstruction is attempted.
EDITORIALLY_UNTRANSLATABLE_FRAGMENTS = {
    ("4Q531", "f6"),
    ("4Q531", "f18"),
}

OVERRIDES = {
    "1Q20:5:25": "Și cu Lameh, fiul său, a vorbit în taină […].",
    "1Q20:10:15": "[…] am vărsat sângele lor la temelia altarului, am ars toată carnea lor pe altar și am dat a treia parte fiilor lui Șepanina.",
    "1Q20:22:9": "În timpul nopții i-a lovit și i-a zdrobit; el i-a urmărit, iar ei toți fugeau dinaintea lui.",
    "1QpHab:6:7": "punând hrana lor peste toate popoarele, an după an.",
    "1QHa:15:17": "potrivit învățăturilor Tale și adevărului Tău, ca să-mi îndrepți pașii pe cărările dreptății și să umblu înaintea Ta în hotarul […].",
    "1QHa:16:5": "Îți mulțumesc, Doamne, că m-ai așezat lângă un izvor curgător în pământ uscat și lângă un izvor de apă într-un ținut arid, care udă […].",
    "1QM:19:5": "În piețele tale sunt argint și aur, în palatele tale. Sioane, bucură-te foarte, și să se veselească toate cetățile lui Iuda. Deschide […].",
}


def clean_source(value: str) -> str:
    return re.sub(r"\s+", " ", " ".join(HEBREW_WORD.findall(value))).strip()


def recoverable_words(value: str) -> int:
    return len(HEBREW_WORD.findall(value))


def repeated(value: str) -> bool:
    words = re.findall(r"\w+", value.lower(), flags=re.UNICODE)
    if len(words) < 10:
        return False
    bigrams = list(zip(words, words[1:]))
    return len(set(bigrams)) / max(len(bigrams), 1) < 0.48


def needs_repair(source: str, target: str) -> bool:
    lexical = recoverable_words(source)
    if not target or "#" in target or "ε" in target or repeated(target):
        return True
    ratio = len(target.split()) / max(lexical, 1)
    return ratio < 0.25 or ratio > 4.0


def batches(values: list[str], size: int) -> list[list[str]]:
    return [values[index:index + size] for index in range(0, len(values), size)]


def mark_untranslatable(line: dict[str, Any], reason: str) -> None:
    line["romanian"] = INSUFFICIENT
    line["translationAllowed"] = False
    line["translationMethod"] = reason
    line["translationConfidence"] = "not-translatable"


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--batch-size", type=int, default=24)
    args = parser.parse_args()

    source_docs = {
        path.stem: json.loads(path.read_text(encoding="utf-8"))
        for path in SOURCE.glob("*.json")
        if not path.name.endswith(".manifest.json")
    }
    candidate_paths = sorted(CANDIDATES.glob("*.json"))
    if not candidate_paths:
        raise SystemExit("No Qumran candidates to refine")

    rows: list[dict[str, Any]] = []
    documents: dict[str, dict[str, Any]] = {}
    for path in candidate_paths:
        document = json.loads(path.read_text(encoding="utf-8"))
        documents[path.name] = document
        witness = str(document["witness"])
        source_doc = source_docs[witness]
        source_lines = {
            (str(fragment["fragment"]), str(line["line"])): line
            for fragment in source_doc["fragments"]
            for line in fragment["lines"]
        }
        for line in document["lines"]:
            key = (str(line["fragment"]), str(line["line"]))
            source = source_lines[key]
            reference = f"{witness}:{key[0]}:{key[1]}"
            if source.get("isTotalLacuna"):
                continue
            if (witness, key[0]) in EDITORIALLY_UNTRANSLATABLE_FRAGMENTS:
                mark_untranslatable(
                    line,
                    "editorial fragment-level decision: isolated words do not preserve continuous translatable syntax",
                )
                continue
            lexical = recoverable_words(str(source.get("normalized") or ""))
            if reference in OVERRIDES:
                line["romanian"] = OVERRIDES[reference]
                line["translationAllowed"] = True
                line["translationMethod"] = "source-confirmed editorial correction"
                line["translationConfidence"] = "editorially-corrected"
                continue
            if lexical < 3:
                mark_untranslatable(line, "insufficient readable source; no reconstruction attempted")
                continue
            target = str(line.get("romanian") or "").strip()
            if needs_repair(str(source.get("normalized") or ""), target):
                rows.append(
                    {
                        "reference": reference,
                        "line": line,
                        "source": clean_source(str(source.get("normalized") or "")),
                    }
                )

    if rows:
        revision = str(HfApi().model_info(MODEL_ID).sha)
        tokenizer = AutoTokenizer.from_pretrained(MODEL_ID, revision=revision, src_lang=SOURCE_LANGUAGE)
        model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_ID, revision=revision)
        model.eval()
        translations: list[str] = []
        forced_bos = tokenizer.convert_tokens_to_ids(TARGET_LANGUAGE)
        for batch in batches([row["source"] for row in rows], args.batch_size):
            encoded = tokenizer(batch, return_tensors="pt", padding=True, truncation=True, max_length=512)
            with torch.inference_mode():
                output = model.generate(
                    **encoded,
                    forced_bos_token_id=forced_bos,
                    max_new_tokens=192,
                    num_beams=5,
                    no_repeat_ngram_size=3,
                    repetition_penalty=1.18,
                    early_stopping=True,
                )
            translations.extend(
                re.sub(r"\s+", " ", value).strip()
                for value in tokenizer.batch_decode(output, skip_special_tokens=True)
            )
        for row, translation in zip(rows, translations):
            row["line"]["romanian"] = translation
            row["line"]["translationAllowed"] = True
            row["line"]["translationMethod"] = "NLLB cleaned-source corrective pass"
            row["line"]["translationConfidence"] = "machine-draft-corrected"
        del model, tokenizer
        gc.collect()
    else:
        revision = None

    unresolved: list[dict[str, Any]] = []
    for filename, document in documents.items():
        for line in document["lines"]:
            if line.get("isTotalLacuna") or line.get("romanian") == INSUFFICIENT:
                continue
            source_doc = source_docs[document["witness"]]
            source = next(
                source_line
                for fragment in source_doc["fragments"]
                if str(fragment["fragment"]) == str(line["fragment"])
                for source_line in fragment["lines"]
                if str(source_line["line"]) == str(line["line"])
            )
            if needs_repair(str(source.get("normalized") or ""), str(line.get("romanian") or "")):
                unresolved.append(
                    {
                        "reference": f"{document['witness']}:{line['fragment']}:{line['line']}",
                        "romanian": line.get("romanian"),
                    }
                )
        document.setdefault("audit", {}).update(
            {
                "correctivePass": {
                    "model": {"id": MODEL_ID, "revision": revision},
                    "insufficientTextMarker": INSUFFICIENT,
                    "editoriallyUntranslatableFragments": sorted(
                        f"{witness}:{fragment}"
                        for witness, fragment in EDITORIALLY_UNTRANSLATABLE_FRAGMENTS
                    ),
                    "policy": "translate only recoverable continuous source; never reconstruct lacunae",
                }
            }
        )
        (CANDIDATES / filename).write_text(
            json.dumps(document, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )

    print(json.dumps({"correctedLines": len(rows), "unresolved": unresolved}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
