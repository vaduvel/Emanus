#!/usr/bin/env python3
"""Audit a Qumran shard while distinguishing readable text from lacunae."""
from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path
from typing import Any

import numpy as np
from huggingface_hub import HfApi
from sentence_transformers import SentenceTransformer

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "docs" / "data" / "biblia-emanus-qumran-source"
CANDIDATES = ROOT / "docs" / "data" / "biblia-emanus-qumran-romanian-candidates"
OUT = ROOT / "docs" / "data" / "biblia-emanus-qumran-audited"
REPORT = ROOT / "docs" / "biblia-emanus" / "PR40-QUMRAN-ROMANIAN-AUDIT.json"
MODEL_ID = "sentence-transformers/LaBSE"
INSUFFICIENT = "[… fragment prea deteriorat pentru o traducere sigură …]"
HEBREW_CHAR = re.compile(r"[\u0590-\u05ff]")
HEBREW_WORD = re.compile(r"[\u0590-\u05ff]+")
ENGLISH_TOKEN = re.compile(r"\b(?:the|and|that|which|with|from|unto|shall|lord|god|king|people)\b", re.I)
EDITORIALLY_UNTRANSLATABLE_FRAGMENTS = {
    ("4Q531", "f6"),
    ("4Q531", "f18"),
}


def sha_text(value: str) -> str:
    return hashlib.sha256(value.encode("utf-8")).hexdigest()


def line_key(line: dict[str, Any]) -> tuple[str, str]:
    return str(line["fragment"]), str(line["line"])


def clean_source(value: str) -> str:
    return " ".join(HEBREW_WORD.findall(value))


def repeated(value: str) -> bool:
    words = re.findall(r"\w+", value.lower(), flags=re.UNICODE)
    if len(words) < 10:
        return False
    bigrams = list(zip(words, words[1:]))
    return len(set(bigrams)) / max(len(bigrams), 1) < 0.48


def main() -> None:
    source_paths = sorted(path for path in SOURCE.glob("*.json") if not path.name.endswith(".manifest.json"))
    candidate_paths = sorted(CANDIDATES.glob("*.json"))
    if len(source_paths) != 20:
        raise SystemExit(f"Expected 20 source witnesses, got {len(source_paths)}")
    if not candidate_paths:
        raise SystemExit("No Qumran candidate witnesses in shard")

    all_sources = {path.stem: json.loads(path.read_text(encoding="utf-8")) for path in source_paths}
    candidates = {path.stem: json.loads(path.read_text(encoding="utf-8")) for path in candidate_paths}
    unknown = sorted(set(candidates) - set(all_sources))
    if unknown:
        raise SystemExit(f"Candidate witnesses absent from source corpus: {unknown}")
    sources = {witness: all_sources[witness] for witness in candidates}

    deterministic: list[dict[str, Any]] = []
    warnings: list[dict[str, Any]] = []
    fragments_for_semantics: list[dict[str, Any]] = []

    for witness in sorted(candidates):
        source_doc = sources[witness]
        candidate = candidates[witness]
        source_lines = {
            (str(fragment["fragment"]), str(line["line"])): line
            for fragment in source_doc["fragments"]
            for line in fragment["lines"]
        }
        candidate_lines = {line_key(line): line for line in candidate["lines"]}
        if set(source_lines) != set(candidate_lines):
            deterministic.append({"witness": witness, "code": "LINE_COORDINATE_SET_MISMATCH"})
            continue

        grouped: dict[str, dict[str, Any]] = {}
        for key in sorted(source_lines):
            source = source_lines[key]
            target = candidate_lines[key]
            reference = f"{witness}:{key[0]}:{key[1]}"
            codes: list[str] = []
            if target.get("diplomatic", "") != source.get("diplomatic", ""):
                codes.append("DIPLOMATIC_SOURCE_CHANGED")
            if target.get("normalized", "") != source.get("normalized", ""):
                codes.append("NORMALIZED_SOURCE_CHANGED")
            if target.get("transliteration", "") != source.get("transliterationNormalized", ""):
                codes.append("TRANSLITERATION_CHANGED")
            romanian = str(target.get("romanian", "")).strip()
            lexical_words = HEBREW_WORD.findall(str(source.get("normalized") or ""))
            if source.get("isTotalLacuna"):
                if romanian != "[…]" or target.get("translationAllowed") is not False:
                    codes.append("TOTAL_LACUNA_WAS_INVENTED_OR_TRANSLATED")
            elif (witness, key[0]) in EDITORIALLY_UNTRANSLATABLE_FRAGMENTS:
                if romanian != INSUFFICIENT or target.get("translationAllowed") is not False:
                    codes.append("EDITORIALLY_UNTRANSLATABLE_FRAGMENT_WAS_RECONSTRUCTED")
                warnings.append(
                    {
                        "reference": reference,
                        "code": "NO_CONTINUOUS_TRANSLATABLE_SYNTAX",
                        "displayRequirement": "Show source transcription and transliteration; do not supply reconstructed Romanian prose.",
                    }
                )
            elif len(lexical_words) < 3:
                if romanian != INSUFFICIENT or target.get("translationAllowed") is not False:
                    codes.append("INSUFFICIENT_SOURCE_WAS_TRANSLATED_OR_RECONSTRUCTED")
                warnings.append({"reference": reference, "code": "INSUFFICIENT_READABLE_SOURCE"})
            else:
                if not romanian:
                    codes.append("EMPTY_TRANSLATION")
                if HEBREW_CHAR.search(romanian):
                    codes.append("SOURCE_SCRIPT_RESIDUE")
                if ENGLISH_TOKEN.search(romanian):
                    codes.append("ENGLISH_RESIDUE")
                if "#" in romanian or "ε" in romanian:
                    codes.append("SOURCE_DAMAGE_MARKER_LEAKED_INTO_TRANSLATION")
                ratio = len(romanian.split()) / max(len(lexical_words), 1)
                if ratio < 0.18:
                    codes.append("SUSPICIOUSLY_SHORT")
                elif ratio > 5.0:
                    codes.append("SUSPICIOUSLY_LONG")
                if repeated(romanian):
                    codes.append("DEGENERATE_REPETITION")
                group = grouped.setdefault(
                    key[0],
                    {"source": [], "target": [], "aramaic": False, "readableWords": 0},
                )
                group["source"].append(clean_source(str(source.get("normalized") or "")))
                group["target"].append(romanian)
                group["readableWords"] += len(lexical_words)
                if source.get("language") == "a":
                    group["aramaic"] = True
                    warnings.append(
                        {
                            "reference": reference,
                            "code": "ARAMAIC_TRANSLATION_IS_PROVISIONAL",
                            "displayRequirement": "Show normalized source and transliteration beside Romanian.",
                        }
                    )
            if codes:
                deterministic.append({"reference": reference, "codes": sorted(set(codes))})

        for fragment_id, values in grouped.items():
            if values["readableWords"] < 8:
                warnings.append(
                    {
                        "witness": witness,
                        "fragment": fragment_id,
                        "code": "FRAGMENT_TOO_SHORT_FOR_RELIABLE_EMBEDDING_AUDIT",
                        "readableWords": values["readableWords"],
                    }
                )
                continue
            fragments_for_semantics.append(
                {
                    "witness": witness,
                    "fragment": fragment_id,
                    "source": " ".join(values["source"]),
                    "target": " ".join(values["target"]),
                    "containsAramaic": values["aramaic"],
                }
            )

    revision = str(HfApi().model_info(MODEL_ID).sha)
    model = SentenceTransformer(MODEL_ID, revision=revision)
    if fragments_for_semantics:
        source_vectors = model.encode(
            [row["source"] for row in fragments_for_semantics],
            batch_size=32,
            normalize_embeddings=True,
            show_progress_bar=True,
        )
        target_vectors = model.encode(
            [row["target"] for row in fragments_for_semantics],
            batch_size=32,
            normalize_embeddings=True,
            show_progress_bar=True,
        )
        scores = [float(np.dot(source, target)) for source, target in zip(source_vectors, target_vectors)]
    else:
        scores = []

    semantic: list[dict[str, Any]] = []
    for row, score in zip(fragments_for_semantics, scores):
        record = {
            "witness": row["witness"],
            "fragment": row["fragment"],
            "score": round(score, 6),
            "containsAramaic": row["containsAramaic"],
        }
        if score < 0.23:
            record["code"] = "LOW_FRAGMENT_SEMANTIC_SCORE"
            semantic.append(record)
        elif score < 0.36:
            record["code"] = "BORDERLINE_FRAGMENT_SEMANTIC_SCORE"
            warnings.append(record)

    pending_gates: list[dict[str, Any]] = []
    for witness, document in candidates.items():
        required_next_gate = str(
            document.get("audit", {}).get("requiredNextGate") or ""
        ).strip()
        if required_next_gate:
            pending_gates.append(
                {
                    "witness": witness,
                    "code": "REQUIRED_NEXT_GATE_NOT_SATISFIED",
                    "requiredNextGate": required_next_gate,
                }
            )

    blockers = [*deterministic, *semantic, *pending_gates]
    OUT.mkdir(parents=True, exist_ok=True)
    for old in OUT.glob("*.json"):
        old.unlink()
    for witness, document in candidates.items():
        witness_blockers = [
            item for item in blockers
            if item.get("witness") == witness or str(item.get("reference", "")).startswith(f"{witness}:")
        ]
        document["status"] = "published-research" if not witness_blockers else "in_review"
        document["public"] = not witness_blockers
        document["runtimeEnabled"] = not witness_blockers
        document.setdefault("audit", {}).update(
            {
                "semanticModel": {"id": MODEL_ID, "revision": revision},
                "blockingIssueCount": len(witness_blockers),
                "publicationBlocked": bool(witness_blockers),
                "researchEditionWarningRequired": True,
                "lacunaPolicy": "No Romanian reconstruction when the surviving source does not preserve continuous translatable syntax.",
                "editoriallyUntranslatableFragments": sorted(
                    f"{selected_witness}:{fragment}"
                    for selected_witness, fragment in EDITORIALLY_UNTRANSLATABLE_FRAGMENTS
                ),
                "textDigest": sha_text("\n".join(str(line["romanian"]) for line in document["lines"])),
            }
        )
        (OUT / f"{witness}.json").write_text(
            json.dumps(document, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )

    report = {
        "schemaVersion": 3,
        "selectedWitnesses": sorted(candidates),
        "semanticModel": {"id": MODEL_ID, "revision": revision},
        "summary": {
            "witnesses": len(candidates),
            "fragmentsReviewed": len(fragments_for_semantics),
            "minimumFragmentScore": round(min(scores), 6) if scores else None,
            "averageFragmentScore": round(float(np.mean(scores)), 6) if scores else None,
            "blockers": len(blockers),
            "pendingRequiredGates": len(pending_gates),
            "warnings": len(warnings),
            "publicationReadyAsParallelResearchEdition": not blockers,
        },
        "blockers": blockers,
        "warnings": warnings,
    }
    REPORT.parent.mkdir(parents=True, exist_ok=True)
    REPORT.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(report["summary"], ensure_ascii=False, indent=2))
    if blockers:
        raise SystemExit(f"Qumran shard audit has {len(blockers)} blockers")


if __name__ == "__main__":
    main()
