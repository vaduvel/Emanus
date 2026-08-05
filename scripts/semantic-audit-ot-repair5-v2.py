#!/usr/bin/env python3
"""Multilingual semantic screening using the complete shared USFM parser."""
from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path
from statistics import mean, median
from typing import Any

import numpy as np
from sentence_transformers import SentenceTransformer

from ot_repair5_common import parse_usfm_zip

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs" / "data" / "biblia-emanus-candidates"
SOURCE = DATA / "sources" / "eng-webbe_usfm.zip"
OUT = ROOT / "docs" / "biblia-emanus"
MODEL_NAME = "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2"


def pct(values: list[float], q: float) -> float:
    return float(np.percentile(np.asarray(values, dtype=np.float32), q)) if values else 0.0


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--batch-size", type=int, default=128)
    args = parser.parse_args()
    source = parse_usfm_zip(SOURCE)
    pairs: list[dict[str, Any]] = []
    for file in sorted(DATA.glob("*.json")):
        if file.name == "manifest.json":
            continue
        doc = json.loads(file.read_text(encoding="utf-8"))
        if doc.get("status") != "in_review" or doc.get("public") is not False:
            continue
        book = str(doc.get("bookId", ""))
        chapter = int(doc.get("chapter", doc.get("chapterNumber", 0)))
        for verse in doc.get("verses", []):
            number = int(verse.get("number", 0))
            english = source.get((book, chapter, number))
            romanian = str(verse.get("text", "")).strip()
            if english and romanian:
                pairs.append({
                    "reference": f"{book}.{chapter}:{number}",
                    "bookId": book,
                    "romanian": romanian,
                    "english": english,
                })
    if not pairs:
        raise SystemExit("No aligned pairs")

    model = SentenceTransformer(MODEL_NAME)
    ro = model.encode([p["romanian"] for p in pairs], batch_size=args.batch_size, normalize_embeddings=True, show_progress_bar=True)
    en = model.encode([p["english"] for p in pairs], batch_size=args.batch_size, normalize_embeddings=True, show_progress_bar=True)
    scores = np.sum(ro * en, axis=1)
    per_book: dict[str, list[float]] = {}
    for pair, value in zip(pairs, scores):
        score = float(value)
        pair["score"] = round(score, 6)
        per_book.setdefault(pair["bookId"], []).append(score)
    values = [float(v) for v in scores]
    book_stats = {
        book: {
            "verses": len(items), "min": round(min(items), 6), "p01": round(pct(items, 1), 6),
            "p05": round(pct(items, 5), 6), "median": round(median(items), 6), "mean": round(mean(items), 6),
        }
        for book, items in sorted(per_book.items())
    }
    weakest = sorted(pairs, key=lambda p: p["score"])
    report = {
        "schemaVersion": 2,
        "model": MODEL_NAME,
        "screeningOnly": True,
        "sourceSha256": hashlib.sha256(SOURCE.read_bytes()).hexdigest(),
        "alignedVerses": len(pairs),
        "distribution": {
            "min": round(min(values), 6), "p01": round(pct(values, 1), 6), "p05": round(pct(values, 5), 6),
            "p10": round(pct(values, 10), 6), "median": round(median(values), 6), "mean": round(mean(values), 6),
            "p95": round(pct(values, 95), 6),
        },
        "books": book_stats,
        "weakest": weakest[:1200],
    }
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "OT-REPAIR5-SEMANTIC-AUDIT.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    lines = [
        "# OT Repair 5 — semantic screening v2", "",
        f"- Model: `{MODEL_NAME}`", f"- Alinieri: **{len(pairs)}**",
        f"- Minim: **{report['distribution']['min']}**", f"- P01: **{report['distribution']['p01']}**",
        f"- Mediană: **{report['distribution']['median']}**", "",
        "> Screening בלבד: un scor mic cere verificare textuală și nu dovedește singur o eroare.", "",
        "## Cele mai slabe 500",
    ]
    for item in weakest[:500]:
        lines += [
            f"- `{item['reference']}` — **{item['score']}**",
            f"  - RO: {item['romanian']}",
            f"  - EN: {item['english']}",
        ]
    (OUT / "OT-REPAIR5-SEMANTIC-AUDIT.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(json.dumps(report["distribution"], indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
