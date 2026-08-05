#!/usr/bin/env python3
"""Audit English-source Romanian candidates for semantic and textual integrity."""
from __future__ import annotations

import argparse
import hashlib
import importlib.util
import json
import re
from collections import defaultdict
from pathlib import Path
from typing import Any

import numpy as np
from huggingface_hub import HfApi
from sentence_transformers import SentenceTransformer

ROOT = Path(__file__).resolve().parents[1]
MODEL_ID = "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2"
ENGLISH_TOKEN = re.compile(
    r"\b(?:the|and|that|which|with|from|unto|shall|were|was|this|these|their|lord|god|said|king|people)\b",
    re.I,
)
PLACEHOLDER = re.compile(r"(?:TODO|TBD|placeholder|text revizuit|martor istoric|păstrat în suluri)", re.I)
QUOTE_PAIRS = (("„", "”"), ("«", "»"))


def normalized(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip()


def numeric_tokens(value: str) -> list[str]:
    return re.findall(r"\d+(?:[.,]\d+)?", value)


def deterministic_codes(source: str, target: str) -> list[str]:
    codes: list[str] = []
    if not target:
        return ["EMPTY_TRANSLATION"]
    if PLACEHOLDER.search(target):
        codes.append("PLACEHOLDER")
    if ENGLISH_TOKEN.search(target):
        codes.append("ENGLISH_RESIDUE")
    if numeric_tokens(source) != numeric_tokens(target):
        codes.append("NUMBER_TOKEN_CHANGE")
    source_words = len(source.split())
    target_words = len(target.split())
    ratio = target_words / max(source_words, 1)
    if ratio < 0.42:
        codes.append("SUSPICIOUSLY_SHORT")
    elif ratio > 2.25:
        codes.append("SUSPICIOUSLY_LONG")
    for left, right in QUOTE_PAIRS:
        if target.count(left) != target.count(right):
            codes.append("UNBALANCED_ROMANIAN_QUOTES")
    if "�" in target or "\x00" in target:
        codes.append("INVALID_CHARACTER")
    return codes


def sha_text(value: str) -> str:
    return hashlib.sha256(value.encode("utf-8")).hexdigest()


def load_deuterocanon_sources() -> tuple[dict[tuple[str, int, int], str], dict[str, dict[tuple[str, int, int], str]]]:
    script = ROOT / "scripts" / "translate-pr40-deuterocanon-missing.py"
    spec = importlib.util.spec_from_file_location("deut_source_parser", script)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Cannot load {script}")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    module.CACHE.mkdir(parents=True, exist_ok=True)
    paths: dict[str, Path] = {}
    for source_id, url in module.SOURCE_URLS.items():
        destination = module.CACHE / f"{source_id}.zip"
        module.download(url, destination)
        paths[source_id] = destination
    witnesses = {source_id: module.parse_usfm_zip(path) for source_id, path in paths.items()}
    return witnesses["eng-webbe"], {key: value for key, value in witnesses.items() if key.startswith("grc")}


def collect_early_sources(directory: Path) -> dict[tuple[str, int, int], str]:
    result: dict[tuple[str, int, int], str] = {}
    for path in sorted(directory.glob("*.json")):
        document = json.loads(path.read_text(encoding="utf-8"))
        if document.get("status") != "source_verified":
            raise RuntimeError(f"Unverified source document: {path.name}")
        for verse in document.get("verses", []):
            result[(document["bookId"], int(document["chapter"]), int(verse["number"]))] = normalized(str(verse["text"]))
    return result


def cosine_pairs(model: SentenceTransformer, sources: list[str], targets: list[str], batch_size: int) -> list[float]:
    source_vectors = model.encode(sources, batch_size=batch_size, normalize_embeddings=True, show_progress_bar=True)
    target_vectors = model.encode(targets, batch_size=batch_size, normalize_embeddings=True, show_progress_bar=True)
    return [float(np.dot(source, target)) for source, target in zip(source_vectors, target_vectors)]


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--collection", choices=("deuterocanon", "early"), required=True)
    parser.add_argument("--batch-size", type=int, default=64)
    args = parser.parse_args()

    if args.collection == "deuterocanon":
        candidate_dir = ROOT / "docs" / "data" / "biblia-emanus-deuterocanon-new-translation"
        output_dir = ROOT / "docs" / "data" / "biblia-emanus-deuterocanon-audited"
        report_path = ROOT / "docs" / "biblia-emanus" / "PR40-DEUTEROCANON-SEMANTIC-AUDIT.json"
        source_map, greek_witnesses = load_deuterocanon_sources()
    else:
        candidate_dir = ROOT / "docs" / "data" / "biblia-emanus-early-romanian-candidates"
        output_dir = ROOT / "docs" / "data" / "biblia-emanus-early-audited"
        report_path = ROOT / "docs" / "biblia-emanus" / "PR40-EARLY-WORKS-SEMANTIC-AUDIT.json"
        source_dir = ROOT / "docs" / "data" / "biblia-emanus-early-source-candidates"
        source_map = collect_early_sources(source_dir)
        greek_witnesses = {}

    candidate_paths = sorted(candidate_dir.glob("*.json"))
    if not candidate_paths:
        raise SystemExit(f"No {args.collection} candidate files")

    rows: list[dict[str, Any]] = []
    documents: dict[str, dict[str, Any]] = {}
    for path in candidate_paths:
        document = json.loads(path.read_text(encoding="utf-8"))
        documents[path.name] = document
        numbers = [int(verse["number"]) for verse in document.get("verses", [])]
        if numbers != list(range(1, max(numbers, default=0) + 1)):
            raise RuntimeError(f"{path.name}: non-continuous candidate numbering")
        for verse in document.get("verses", []):
            reference = (document["bookId"], int(document["chapter"]), int(verse["number"]))
            source = source_map.get(reference)
            if source is None:
                raise RuntimeError(f"No source text for {reference}")
            rows.append(
                {
                    "file": path.name,
                    "bookId": reference[0],
                    "chapter": reference[1],
                    "verse": reference[2],
                    "reference": f"{reference[0]}.{reference[1]}:{reference[2]}",
                    "source": source,
                    "target": normalized(str(verse["text"])),
                }
            )

    revision = str(HfApi().model_info(MODEL_ID).sha)
    model = SentenceTransformer(MODEL_ID, revision=revision)
    scores = cosine_pairs(
        model,
        [row["source"] for row in rows],
        [row["target"] for row in rows],
        args.batch_size,
    )

    blockers: list[dict[str, Any]] = []
    warnings: list[dict[str, Any]] = []
    per_file: dict[str, list[dict[str, Any]]] = defaultdict(list)
    for row, score in zip(rows, scores):
        codes = deterministic_codes(row["source"], row["target"])
        if score < 0.46:
            codes.append("LOW_CROSS_LINGUAL_SEMANTIC_SCORE")
        elif score < 0.56:
            warnings.append({"reference": row["reference"], "code": "BORDERLINE_SEMANTIC_SCORE", "score": round(score, 6)})
        if args.collection == "deuterocanon":
            ref = (row["bookId"], row["chapter"], row["verse"])
            coverage = {name: ref in witness for name, witness in greek_witnesses.items()}
            if not any(coverage.values()):
                codes.append("NO_GREEK_WITNESS_COVERAGE")
            row["greekCoverage"] = coverage
        record = {
            "reference": row["reference"],
            "score": round(score, 6),
            "source": row["source"],
            "target": row["target"],
            "codes": sorted(set(codes)),
        }
        if "greekCoverage" in row:
            record["greekCoverage"] = row["greekCoverage"]
        per_file[row["file"]].append(record)
        if codes:
            blockers.append(record)

    output_dir.mkdir(parents=True, exist_ok=True)
    for old in output_dir.glob("*.json"):
        old.unlink()
    for filename, document in documents.items():
        reviews = per_file[filename]
        chapter_blockers = [item for item in reviews if item["codes"]]
        document["status"] = "published" if not chapter_blockers else "in_review"
        document["public"] = not chapter_blockers
        document["runtimeEnabled"] = not chapter_blockers
        document.setdefault("audit", {}).update(
            {
                "semanticModel": {"id": MODEL_ID, "revision": revision},
                "semanticReviewedUnits": len(reviews),
                "semanticMinimumScore": round(min(item["score"] for item in reviews), 6),
                "blockingIssueCount": len(chapter_blockers),
                "publicationBlocked": bool(chapter_blockers),
                "textDigest": sha_text("\n".join(verse["text"] for verse in document["verses"])),
            }
        )
        (output_dir / filename).write_text(json.dumps(document, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    report = {
        "schemaVersion": 1,
        "collection": args.collection,
        "semanticModel": {"id": MODEL_ID, "revision": revision},
        "summary": {
            "files": len(documents),
            "units": len(rows),
            "minimumScore": round(min(scores), 6),
            "averageScore": round(float(np.mean(scores)), 6),
            "blockers": len(blockers),
            "warnings": len(warnings),
            "publicationReady": not blockers,
        },
        "blockers": blockers,
        "warnings": warnings,
    }
    report_path.parent.mkdir(parents=True, exist_ok=True)
    report_path.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(report["summary"], ensure_ascii=False, indent=2))
    if blockers:
        raise SystemExit(f"{args.collection} semantic audit has {len(blockers)} blockers")


if __name__ == "__main__":
    main()
