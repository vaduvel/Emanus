#!/usr/bin/env python3
"""Audit the Romanian Qumran parallel research edition.

Structural fidelity is checked per line. Cross-lingual similarity is evaluated
per fragment because isolated damaged lines are often too short for reliable
embeddings. Aramaic remains visibly provisional but is publishable beside the
source when all structural and semantic safety gates pass.
"""
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
HEBREW_CHAR = re.compile(r"[\u0590-\u05ff]")
ENGLISH_TOKEN = re.compile(r"\b(?:the|and|that|which|with|from|unto|shall|lord|god|king|people)\b", re.I)


def sha_text(value: str) -> str:
    return hashlib.sha256(value.encode("utf-8")).hexdigest()


def line_key(line: dict[str, Any]) -> tuple[str, str]:
    return str(line["fragment"]), str(line["line"])


def main() -> None:
    source_paths = sorted(path for path in SOURCE.glob("*.json") if not path.name.endswith(".manifest.json"))
    candidate_paths = sorted(CANDIDATES.glob("*.json"))
    if len(source_paths) != 20 or len(candidate_paths) != 20:
        raise SystemExit(f"Expected 20 source and 20 candidate witnesses; got {len(source_paths)} and {len(candidate_paths)}")

    source_docs = {path.stem: json.loads(path.read_text(encoding="utf-8")) for path in source_paths}
    candidate_docs = {path.stem: json.loads(path.read_text(encoding="utf-8")) for path in candidate_paths}
    if set(source_docs) != set(candidate_docs):
        raise SystemExit("Qumran source/candidate witness set mismatch")

    deterministic_blockers: list[dict[str, Any]] = []
    warnings: list[dict[str, Any]] = []
    fragment_rows: list[dict[str, Any]] = []

    for witness in sorted(source_docs):
        source_doc = source_docs[witness]
        candidate = candidate_docs[witness]
        source_lines = {
            (str(fragment["fragment"]), str(line["line"])): line
            for fragment in source_doc["fragments"]
            for line in fragment["lines"]
        }
        candidate_lines = {line_key(line): line for line in candidate["lines"]}
        if set(source_lines) != set(candidate_lines):
            deterministic_blockers.append({"witness": witness, "code": "LINE_COORDINATE_SET_MISMATCH"})
            continue

        fragments: dict[str, dict[str, list[str]]] = {}
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
            if source.get("isTotalLacuna"):
                if romanian != "[…]" or target.get("translationAllowed") is not False:
                    codes.append("TOTAL_LACUNA_WAS_INVENTED_OR_TRANSLATED")
            else:
                if not romanian:
                    codes.append("EMPTY_TRANSLATION")
                if HEBREW_CHAR.search(romanian):
                    codes.append("SOURCE_SCRIPT_RESIDUE")
                if ENGLISH_TOKEN.search(romanian):
                    codes.append("ENGLISH_RESIDUE")
                source_words = len(str(source.get("transliterationNormalized") or source.get("normalized") or "").split())
                target_words = len(romanian.split())
                ratio = target_words / max(source_words, 1)
                if ratio < 0.18:
                    codes.append("SUSPICIOUSLY_SHORT")
                elif ratio > 5.0:
                    codes.append("SUSPICIOUSLY_LONG")
                fragment = fragments.setdefault(key[0], {"source": [], "target": [], "aramaic": []})
                fragment["source"].append(str(source.get("normalized") or source.get("diplomatic") or ""))
                fragment["target"].append(romanian)
                if source.get("language") == "a":
                    fragment["aramaic"].append(reference)
                    warnings.append(
                        {
                            "reference": reference,
                            "code": "ARAMAIC_TRANSLATION_IS_PROVISIONAL",
                            "displayRequirement": "Always show normalized source and transliteration beside Romanian.",
                        }
                    )
            if codes:
                deterministic_blockers.append({"reference": reference, "codes": sorted(set(codes))})

        for fragment_id, values in fragments.items():
            fragment_rows.append(
                {
                    "witness": witness,
                    "fragment": fragment_id,
                    "source": " ".join(values["source"]),
                    "target": " ".join(values["target"]),
                    "containsAramaic": bool(values["aramaic"]),
                }
            )

    revision = str(HfApi().model_info(MODEL_ID).sha)
    model = SentenceTransformer(MODEL_ID, revision=revision)
    if fragment_rows:
        source_vectors = model.encode(
            [row["source"] for row in fragment_rows], batch_size=32, normalize_embeddings=True, show_progress_bar=True
        )
        target_vectors = model.encode(
            [row["target"] for row in fragment_rows], batch_size=32, normalize_embeddings=True, show_progress_bar=True
        )
        scores = [float(np.dot(source, target)) for source, target in zip(source_vectors, target_vectors)]
    else:
        scores = []

    semantic_blockers: list[dict[str, Any]] = []
    for row, score in zip(fragment_rows, scores):
        record = {
            "witness": row["witness"],
            "fragment": row["fragment"],
            "score": round(score, 6),
            "containsAramaic": row["containsAramaic"],
        }
        if score < 0.23:
            record["code"] = "LOW_FRAGMENT_SEMANTIC_SCORE"
            semantic_blockers.append(record)
        elif score < 0.36:
            record["code"] = "BORDERLINE_FRAGMENT_SEMANTIC_SCORE"
            warnings.append(record)

    blockers = [*deterministic_blockers, *semantic_blockers]
    OUT.mkdir(parents=True, exist_ok=True)
    for old in OUT.glob("*.json"):
        old.unlink()
    for witness, document in candidate_docs.items():
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
                "textDigest": sha_text("\n".join(str(line["romanian"]) for line in document["lines"])),
            }
        )
        (OUT / f"{witness}.json").write_text(
            json.dumps(document, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )

    report = {
        "schemaVersion": 1,
        "semanticModel": {"id": MODEL_ID, "revision": revision},
        "summary": {
            "witnesses": len(candidate_docs),
            "fragmentsReviewed": len(fragment_rows),
            "minimumFragmentScore": round(min(scores), 6) if scores else None,
            "averageFragmentScore": round(float(np.mean(scores)), 6) if scores else None,
            "blockers": len(blockers),
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
        raise SystemExit(f"Qumran Romanian audit has {len(blockers)} blockers")


if __name__ == "__main__":
    main()
