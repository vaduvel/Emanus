#!/usr/bin/env python3
"""Multilingual semantic alignment audit for OT repair5 candidates."""
from __future__ import annotations

import argparse
import hashlib
import json
import re
import zipfile
from pathlib import Path
from statistics import mean, median
from typing import Any

import numpy as np
from sentence_transformers import SentenceTransformer

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs" / "data" / "biblia-emanus-candidates"
SOURCE = DATA / "sources" / "eng-webbe_usfm.zip"
OUT = ROOT / "docs" / "biblia-emanus"
MODEL_NAME = "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2"


def strip_usfm(text: str) -> str:
    text = re.sub(r"\\f\s+.*?\\f\*", " ", text)
    text = re.sub(r"\\x\s+.*?\\x\*", " ", text)
    text = re.sub(r"\\w\s+([^|\\]+).*?\\w\*", r"\1", text)
    text = re.sub(r"\\[a-z0-9+]+\*?", " ", text, flags=re.I)
    return re.sub(r"\s+", " ", text).strip()


def parse_source(path: Path) -> dict[tuple[str, int, int], str]:
    result: dict[tuple[str, int, int], str] = {}
    with zipfile.ZipFile(path) as zf:
        for name in zf.namelist():
            if name.endswith("/") or not name.lower().endswith((".usfm", ".sfm", ".txt")):
                continue
            raw = zf.read(name).decode("utf-8-sig", errors="replace")
            match = re.search(r"^\\id\s+([0-9A-Z]{3})\b", raw, re.M)
            if not match:
                continue
            book = match.group(1)
            chapter = None
            current = None
            for line in raw.splitlines():
                cm = re.match(r"^\\c\s+(\d+)", line)
                if cm:
                    chapter = int(cm.group(1))
                    current = None
                    continue
                vm = re.match(r"^\\v\s+(\d+)(?:[-a-z0-9]*)\s*(.*)", line, re.I)
                if vm and chapter is not None:
                    current = (book, chapter, int(vm.group(1)))
                    result[current] = strip_usfm(vm.group(2))
                elif current and line and not line.startswith("\\"):
                    result[current] = (result[current] + " " + strip_usfm(line)).strip()
    return result


def percentile(values: list[float], q: float) -> float:
    return float(np.percentile(np.asarray(values, dtype=np.float32), q)) if values else 0.0


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--batch-size", type=int, default=128)
    parser.add_argument("--fail-below", type=float, default=None)
    args = parser.parse_args()

    source = parse_source(SOURCE)
    pairs: list[dict[str, Any]] = []
    for file in sorted(DATA.glob("*.json")):
        if file.name == "manifest.json":
            continue
        doc = json.loads(file.read_text(encoding="utf-8"))
        book = str(doc.get("bookId", ""))
        chapter = int(doc.get("chapter", doc.get("chapterNumber", 0)))
        if doc.get("status") != "in_review" or doc.get("public") is not False:
            continue
        for verse in doc.get("verses", []):
            number = int(verse.get("number", 0))
            english = source.get((book, chapter, number))
            if not english:
                continue
            romanian = str(verse.get("text", "")).strip()
            if not romanian:
                continue
            pairs.append({
                "reference": f"{book}.{chapter}:{number}",
                "bookId": book,
                "romanian": romanian,
                "english": english,
            })

    if not pairs:
        raise SystemExit("No aligned pairs found")

    model = SentenceTransformer(MODEL_NAME)
    ro = model.encode(
        [p["romanian"] for p in pairs], batch_size=args.batch_size,
        normalize_embeddings=True, show_progress_bar=True,
    )
    en = model.encode(
        [p["english"] for p in pairs], batch_size=args.batch_size,
        normalize_embeddings=True, show_progress_bar=True,
    )
    scores = np.sum(ro * en, axis=1)

    per_book: dict[str, list[float]] = {}
    for pair, raw_score in zip(pairs, scores):
        score = float(raw_score)
        pair["score"] = round(score, 6)
        per_book.setdefault(pair["bookId"], []).append(score)

    distribution = [float(x) for x in scores]
    book_stats = {
        book: {
            "verses": len(values),
            "min": round(min(values), 6),
            "p01": round(percentile(values, 1), 6),
            "p05": round(percentile(values, 5), 6),
            "median": round(median(values), 6),
            "mean": round(mean(values), 6),
        }
        for book, values in sorted(per_book.items())
    }
    weakest = sorted(pairs, key=lambda p: p["score"])
    summary = {
        "model": MODEL_NAME,
        "modelUse": "screening-only; low scores require textual review and never prove an error alone",
        "sourceSha256": hashlib.sha256(SOURCE.read_bytes()).hexdigest(),
        "alignedVerses": len(pairs),
        "distribution": {
            "min": round(min(distribution), 6),
            "p01": round(percentile(distribution, 1), 6),
            "p05": round(percentile(distribution, 5), 6),
            "p10": round(percentile(distribution, 10), 6),
            "median": round(median(distribution), 6),
            "mean": round(mean(distribution), 6),
            "p95": round(percentile(distribution, 95), 6),
        },
        "books": book_stats,
        "weakest": weakest[:1000],
    }
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "OT-REPAIR5-SEMANTIC-AUDIT.json").write_text(
        json.dumps(summary, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    lines = [
        "# OT Repair 5 — semantic alignment audit",
        "",
        f"- Model: `{MODEL_NAME}`",
        f"- Versete aliniate: **{len(pairs)}**",
        f"- Scor minim: **{summary['distribution']['min']}**",
        f"- P01: **{summary['distribution']['p01']}**",
        f"- Mediană: **{summary['distribution']['median']}**",
        "",
        "> Scorurile sunt numai detector de risc. Un scor mic cere verificare textuală; nu demonstrează singur că versetul este greșit.",
        "",
        "## Cele mai slabe 300 alinieri",
    ]
    for item in weakest[:300]:
        lines += [
            f"- `{item['reference']}` — **{item['score']}**",
            f"  - RO: {item['romanian']}",
            f"  - EN: {item['english']}",
        ]
    (OUT / "OT-REPAIR5-SEMANTIC-AUDIT.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(json.dumps(summary["distribution"], indent=2))
    if args.fail_below is not None and min(distribution) < args.fail_below:
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
