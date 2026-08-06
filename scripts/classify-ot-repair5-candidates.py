#!/usr/bin/env python3
"""Classify candidate books by repetition and template fabrication risk."""
from __future__ import annotations

import json
import re
import unicodedata
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs" / "data" / "biblia-emanus-candidates"
OUT = ROOT / "docs" / "biblia-emanus"


def norm(text: str) -> str:
    text = unicodedata.normalize("NFC", text).lower()
    text = re.sub(r"\b(?:capitolul|capitol)\s+\d+\b", " ", text)
    text = re.sub(r"\b(?:1|2|3)\s+(?:ezdra|macabei|samuel|împărați|cronici)\b", " ", text)
    text = re.sub(r"[^a-zăâîșț]+", " ", text)
    return re.sub(r"\s+", " ", text).strip()


def main() -> None:
    per_book: dict[str, list[tuple[str, str]]] = defaultdict(list)
    for path in sorted(DATA.glob("*.json")):
        if path.name == "manifest.json":
            continue
        doc = json.loads(path.read_text(encoding="utf-8"))
        book = str(doc.get("bookId", ""))
        chapter = doc.get("chapter", doc.get("chapterNumber"))
        for verse in doc.get("verses", []):
            ref = f"{book}.{chapter}:{verse.get('number')}"
            per_book[book].append((ref, norm(str(verse.get("text", "")))))

    result = {}
    fabricated = []
    for book, rows in sorted(per_book.items()):
        counts = Counter(text for _, text in rows if text)
        verses = len(rows)
        unique = len(counts)
        max_text, max_count = counts.most_common(1)[0] if counts else ("", 0)
        repeated_verses = sum(count for count in counts.values() if count >= 3)
        unique_ratio = unique / max(1, verses)
        repeated_ratio = repeated_verses / max(1, verses)
        status = "plausible"
        reasons = []
        if unique_ratio < 0.65:
            status = "fabricated"
            reasons.append(f"uniqueRatio={unique_ratio:.3f}")
        if max_count >= 8:
            status = "fabricated"
            reasons.append(f"maxExactRepeat={max_count}")
        if repeated_ratio >= 0.20:
            status = "fabricated"
            reasons.append(f"repeatedRatio={repeated_ratio:.3f}")
        if status == "fabricated":
            fabricated.append(book)
        examples = []
        if max_count >= 3:
            examples = [ref for ref, text in rows if text == max_text][:12]
        result[book] = {
            "verses": verses,
            "uniqueTexts": unique,
            "uniqueRatio": round(unique_ratio, 4),
            "repeatedVerseRatio": round(repeated_ratio, 4),
            "maxExactRepeat": max_count,
            "mostRepeatedText": max_text[:300],
            "exampleReferences": examples,
            "classification": status,
            "reasons": reasons,
        }

    payload = {"schemaVersion": 1, "fabricatedBooks": fabricated, "books": result}
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "OT-REPAIR5-CANDIDATE-CLASSIFICATION.json").write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    lines = ["# OT Repair 5 — candidate classification", "", "## Cărți clasificate ca fabricate"]
    lines.extend(f"- `{book}` — {', '.join(result[book]['reasons'])}" for book in fabricated)
    lines += ["", "## Toate cărțile"]
    for book, item in result.items():
        lines.append(
            f"- `{book}` — **{item['classification']}**; unique {item['uniqueRatio']}; "
            f"max repeat {item['maxExactRepeat']}; repeated ratio {item['repeatedVerseRatio']}"
        )
    (OUT / "OT-REPAIR5-CANDIDATE-CLASSIFICATION.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(json.dumps({"fabricatedBooks": fabricated, "bookCount": len(result)}, ensure_ascii=False))


if __name__ == "__main__":
    main()
