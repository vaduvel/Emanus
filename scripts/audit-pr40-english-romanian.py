#!/usr/bin/env python3
"""Audit source-backed Romanian candidates for semantic and textual integrity."""
from __future__ import annotations

import argparse
import hashlib
import importlib.util
import json
import re
from collections import Counter, defaultdict
from pathlib import Path
from typing import Any

import numpy as np
from huggingface_hub import HfApi
from sentence_transformers import SentenceTransformer

ROOT = Path(__file__).resolve().parents[1]
MODEL_ID = "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2"
ENGLISH_TOKEN = re.compile(r"\b(?:the|and|that|which|with|from|unto|shall|were|was|this|these|their|lord|god|said|king|people)\b", re.I)
PLACEHOLDER = re.compile(r"(?:TODO|TBD|placeholder|text revizuit|martor istoric|păstrat în suluri)", re.I)
DANGLING_END = re.compile(r"\b(?:și|iar|sau|cu|de|din|la|pe|prin|pentru|către|dintre|nici|un|o|al|a|ai|ale)\s*[.!?…»”]?$", re.I)


def normalized(value: str) -> str:
    value = value.replace("ş", "ș").replace("Ş", "Ș").replace("ţ", "ț").replace("Ţ", "Ț")
    return re.sub(r"\s+", " ", value).strip()


def numeric_tokens(value: str) -> list[str]:
    return re.findall(r"\d+(?:[.,]\d+)?", value)


def source_quote_signature(value: str) -> tuple[int, int]:
    return value.count("“") + value.count("«"), value.count("”") + value.count("»")


def target_quote_signature(value: str) -> tuple[int, int]:
    return value.count("„") + value.count("«") + value.count("“"), value.count("”") + value.count("»")


def repeated_ngram(value: str, n: int = 3) -> bool:
    words = re.findall(r"[\wăâîșțĂÂÎȘȚ]+", value.lower())
    if len(words) < n * 3:
        return False
    grams = [tuple(words[index:index + n]) for index in range(len(words) - n + 1)]
    return max(Counter(grams).values(), default=0) >= 3


def deterministic_codes(source: str, target: str) -> list[str]:
    codes: list[str] = []
    if not target: return ["EMPTY_TRANSLATION"]
    if PLACEHOLDER.search(target): codes.append("PLACEHOLDER")
    if ENGLISH_TOKEN.search(target): codes.append("ENGLISH_RESIDUE")
    if numeric_tokens(source) != numeric_tokens(target): codes.append("NUMBER_TOKEN_CHANGE")
    if source_quote_signature(source) != target_quote_signature(target): codes.append("QUOTE_STRUCTURE_CHANGE")
    ratio = len(target.split()) / max(len(source.split()), 1)
    if ratio < 0.46: codes.append("SUSPICIOUSLY_SHORT")
    elif ratio > 2.10: codes.append("SUSPICIOUSLY_LONG")
    words = re.findall(r"[\wăâîșțĂÂÎȘȚ]+", target.lower())
    if len(words) >= 8 and max(Counter(words).values(), default=0) / len(words) > 0.38: codes.append("TOKEN_REPETITION")
    if repeated_ngram(target): codes.append("NGRAM_REPETITION")
    if DANGLING_END.search(target): codes.append("DANGLING_END")
    if re.search(r"\b([a-zăâîșț]{1,5})\s+\1\b", target.lower()): codes.append("DUPLICATED_SHORT_WORD")
    if "�" in target or "\x00" in target: codes.append("INVALID_CHARACTER")
    return sorted(set(codes))


def sha_text(value: str) -> str: return hashlib.sha256(value.encode("utf-8")).hexdigest()


def load_deuterocanon_sources():
    script = ROOT / "scripts" / "translate-pr40-deuterocanon-missing.py"
    spec = importlib.util.spec_from_file_location("deut_source_parser", script)
    if spec is None or spec.loader is None: raise RuntimeError(f"Cannot load {script}")
    module = importlib.util.module_from_spec(spec); spec.loader.exec_module(module)
    module.CACHE.mkdir(parents=True, exist_ok=True)
    paths = {}
    for source_id, url in module.SOURCE_URLS.items():
        destination = module.CACHE / f"{source_id}.zip"; module.download(url, destination); paths[source_id] = destination
    witnesses = {source_id: module.parse_usfm_zip(path) for source_id, path in paths.items()}
    return witnesses["eng-webbe"], {key: value for key, value in witnesses.items() if key.startswith("grc")}


def collect_early_sources(directory: Path):
    result = {}
    for path in sorted(directory.glob("*.json")):
        document = json.loads(path.read_text(encoding="utf-8"))
        if document.get("status") != "source_verified": raise RuntimeError(f"Unverified source document: {path.name}")
        for verse in document.get("verses", []): result[(document["bookId"], int(document["chapter"]), int(verse["number"]))] = normalized(str(verse["text"]))
    return result


def greek_candidates(reference):
    book, chapter, verse = reference; result = [reference]
    if book == "BAR" and chapter == 6: result.append(("LJE", 1, verse))
    if book == "PS2": result.append(("PSA", 151, verse))
    if book == "ESG" and chapter == 4 and 18 <= verse <= 28: result.append(("ESG", 13, verse - 10))
    if book == "ESG" and chapter == 4 and 29 <= verse <= 47: result.append(("ESG", 14, verse - 28))
    return result


def greek_coverage(reference, witnesses):
    coverage = {}; subverse_warning = False
    for name, witness in witnesses.items():
        matched = next((candidate for candidate in greek_candidates(reference) if candidate in witness), None)
        book_present = any(key[0] == reference[0] for key in witness)
        mode = "exact-or-explicit-map" if matched else "none"
        if matched is None and reference[0] == "ESG" and book_present: mode = "book-present-subverse-alignment-required"; subverse_warning = True
        coverage[name] = {"covered": matched is not None, "reference": list(matched) if matched else None, "mode": mode}
    return coverage, subverse_warning


def cosine_pairs(model, sources, targets, batch_size):
    a = model.encode(sources, batch_size=batch_size, normalize_embeddings=True, show_progress_bar=True)
    b = model.encode(targets, batch_size=batch_size, normalize_embeddings=True, show_progress_bar=True)
    return [float(np.dot(x, y)) for x, y in zip(a, b)]


def main() -> None:
    parser = argparse.ArgumentParser(); parser.add_argument("--collection", choices=("deuterocanon", "early"), required=True); parser.add_argument("--batch-size", type=int, default=64); args = parser.parse_args()
    if args.collection == "deuterocanon":
        candidate_dir = ROOT / "docs" / "data" / "biblia-emanus-deuterocanon-new-translation"; output_dir = ROOT / "docs" / "data" / "biblia-emanus-deuterocanon-audited"; report_path = ROOT / "docs" / "biblia-emanus" / "PR40-DEUTEROCANON-SEMANTIC-AUDIT.json"; source_map, greek_witnesses = load_deuterocanon_sources()
    else:
        candidate_dir = ROOT / "docs" / "data" / "biblia-emanus-early-romanian-candidates"; output_dir = ROOT / "docs" / "data" / "biblia-emanus-early-audited"; report_path = ROOT / "docs" / "biblia-emanus" / "PR40-EARLY-WORKS-SEMANTIC-AUDIT.json"; source_map = collect_early_sources(ROOT / "docs" / "data" / "biblia-emanus-early-source-candidates"); greek_witnesses = {}
    candidate_paths = sorted(candidate_dir.glob("*.json"))
    if not candidate_paths: raise SystemExit(f"No {args.collection} candidate files")
    rows = []; documents = {}; source_numbers = defaultdict(list)
    for book, chapter, verse in source_map: source_numbers[(book, chapter)].append(verse)
    for key in source_numbers: source_numbers[key] = sorted(set(source_numbers[key]))
    for path in candidate_paths:
        document = json.loads(path.read_text(encoding="utf-8")); documents[path.name] = document; book = str(document["bookId"]); chapter = int(document["chapter"])
        numbers = [int(v["number"]) for v in document.get("verses", [])]; expected = source_numbers.get((book, chapter))
        if expected is None: raise RuntimeError(f"{path.name}: source chapter does not exist")
        if numbers != expected: raise RuntimeError(f"{path.name}: candidate/source numbering mismatch: {numbers[:12]} != {expected[:12]}")
        for verse in document.get("verses", []):
            ref = (book, chapter, int(verse["number"])); source = source_map.get(ref)
            if source is None: raise RuntimeError(f"No source text for {ref}")
            rows.append({"file": path.name, "bookId": book, "chapter": chapter, "verse": ref[2], "reference": f"{book}.{chapter}:{ref[2]}", "source": source, "target": normalized(str(verse["text"]))})
    revision = str(HfApi().model_info(MODEL_ID).sha); model = SentenceTransformer(MODEL_ID, revision=revision); scores = cosine_pairs(model, [r["source"] for r in rows], [r["target"] for r in rows], args.batch_size)
    blockers = []; warnings = []; per_file = defaultdict(list)
    for row, score in zip(rows, scores):
        codes = deterministic_codes(row["source"], row["target"])
        if score < 0.50: codes.append("LOW_CROSS_LINGUAL_SEMANTIC_SCORE")
        elif score < 0.58: warnings.append({"reference": row["reference"], "code": "BORDERLINE_SEMANTIC_SCORE", "score": round(score, 6)})
        coverage_record = None
        if args.collection == "deuterocanon":
            ref = (row["bookId"], row["chapter"], row["verse"]); coverage_record, subverse_warning = greek_coverage(ref, greek_witnesses)
            if not any(v["covered"] for v in coverage_record.values()):
                if subverse_warning: warnings.append({"reference": row["reference"], "code": "GREEK_WITNESS_REQUIRES_SUBVERSE_ALIGNMENT", "coverage": coverage_record})
                else: codes.append("NO_GREEK_WITNESS_COVERAGE")
        record = {"reference": row["reference"], "score": round(score, 6), "source": row["source"], "target": row["target"], "codes": sorted(set(codes))}
        if coverage_record is not None: record["greekCoverage"] = coverage_record
        per_file[row["file"]].append(record)
        if codes: blockers.append(record)
    output_dir.mkdir(parents=True, exist_ok=True)
    for old in output_dir.glob("*.json"): old.unlink()
    for filename, document in documents.items():
        reviews = per_file[filename]; chapter_blockers = [item for item in reviews if item["codes"]]
        document["status"] = "published" if not chapter_blockers else "in_review"; document["public"] = not chapter_blockers; document["runtimeEnabled"] = not chapter_blockers
        document.setdefault("audit", {}).update({"semanticModel": {"id": MODEL_ID, "revision": revision}, "semanticReviewedUnits": len(reviews), "semanticMinimumScore": round(min(item["score"] for item in reviews), 6), "blockingIssueCount": len(chapter_blockers), "publicationBlocked": bool(chapter_blockers), "textDigest": sha_text("\n".join(v["text"] for v in document["verses"]))})
        (output_dir / filename).write_text(json.dumps(document, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    report = {"schemaVersion": 2, "collection": args.collection, "semanticModel": {"id": MODEL_ID, "revision": revision}, "summary": {"files": len(documents), "units": len(rows), "minimumScore": round(min(scores), 6), "averageScore": round(float(np.mean(scores)), 6), "blockers": len(blockers), "warnings": len(warnings), "publicationReady": not blockers}, "blockers": blockers, "warnings": warnings}
    report_path.parent.mkdir(parents=True, exist_ok=True); report_path.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"); print(json.dumps(report["summary"], ensure_ascii=False, indent=2))
    if blockers: raise SystemExit(f"{args.collection} semantic audit has {len(blockers)} blockers")


if __name__ == "__main__": main()
