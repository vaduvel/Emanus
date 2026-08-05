#!/usr/bin/env python3
"""Deterministic publication audit v4 for the canonical OT candidates."""
from __future__ import annotations

import argparse
import hashlib
import json
import re
import unicodedata
from collections import Counter, defaultdict
from difflib import SequenceMatcher
from pathlib import Path
from statistics import mean
from typing import Any

from ot_repair5_common import book_sequences, normalize_text, numeric_tokens, parse_usfm_zip

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs" / "data" / "biblia-emanus-candidates"
SOURCES = DATA / "sources"
OUT = ROOT / "docs" / "biblia-emanus"
CANONICAL = {
    "JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB",
    "PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO",
    "OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL",
}
PLACEHOLDER = re.compile(
    r"Text istoric din manuscrisele vechi|Păstrat în sulurile|Martor istoric al credinței|"
    r"Mărturie despre rânduiala|Scriere păstrată și studiată|text revizuit în limba română|"
    r"În ziua aceea, din \d?\s*\w+ capitolul \d+",
    re.I,
)
ENGLISH = re.compile(r"\b(the|and|which|with|from|unto|shall|chapter|people|king|said|was|were|their)\b", re.I)
CORRUPTION = re.compile(r"\buidea\b|str\s+strămoșești|\bVerse\s+\d+\b|\bIșit-am\b", re.I)
SEDILLA = re.compile(r"[şţŞŢ]")


def load(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def sha(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def expected_digest(verses: list[dict[str, Any]]) -> str:
    return hashlib.sha256("\n".join(str(v.get("text", "")) for v in verses).encode("utf-8")).hexdigest()


def excerpt(text: str, limit: int = 500) -> str:
    return text if len(text) <= limit else text[:limit] + "…"


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--fail", action="store_true")
    args = parser.parse_args()
    source_paths = {
        "english": SOURCES / "engwebp_usfm.zip",
        "hebrew": SOURCES / "hboWLC_usfm.zip",
        "romanianBtf": SOURCES / "ronbtf_usfm.zip",
        "romanianCornilescu1924": SOURCES / "ron1924_usfm.zip",
    }
    issues: list[dict[str, Any]] = []

    def add(level: str, code: str, ref: str, message: str, evidence: dict[str, Any] | None = None) -> None:
        item: dict[str, Any] = {"severity": level, "code": code, "reference": ref, "message": message}
        if evidence:
            item["evidence"] = evidence
        issues.append(item)

    manifest = load(DATA / "manifest.json")
    manifest_sources = manifest.get("sources", {})
    for name, path in source_paths.items():
        if not path.exists():
            add("critical", "SOURCE_MISSING", name, str(path))
            continue
        declared = manifest_sources.get(name, {}).get("sha256")
        actual = sha(path)
        if declared != actual:
            add("critical", "SOURCE_HASH", name, f"declared={declared}, actual={actual}")

    if any(item["code"] == "SOURCE_MISSING" for item in issues):
        raise SystemExit("Pinned source missing")

    web = parse_usfm_zip(source_paths["english"])
    wlc = parse_usfm_zip(source_paths["hebrew"])
    btf = parse_usfm_zip(source_paths["romanianBtf"])
    cornilescu = parse_usfm_zip(source_paths["romanianCornilescu1924"])
    web_books = book_sequences(web)
    wlc_books = book_sequences(wlc)
    btf_books = book_sequences(btf)
    corn_books = book_sequences(cornilescu)

    stats: dict[str, dict[str, Any]] = defaultdict(lambda: {
        "chapters": 0, "verses": 0, "webMissing": 0, "wlcReferenceMappings": 0,
        "wlcBookCountDifference": 0, "btfReferenceMappings": 0, "cornilescuReferenceMappings": 0,
        "placeholders": 0, "languageErrors": 0, "numberMismatches": 0, "lengthOutliers": 0,
        "btfSimilarity": [], "cornilescuSimilarity": [], "uniqueTexts": set(), "maxRepeat": 0,
    })
    candidate_by_book: dict[str, list[tuple[str, str]]] = defaultdict(list)

    for path in sorted(DATA.glob("*.json")):
        if path.name == "manifest.json":
            continue
        doc = load(path)
        book = str(doc.get("bookId", ""))
        if book not in CANONICAL:
            continue
        chapter = int(doc.get("chapter", doc.get("chapterNumber", 0)))
        verses = doc.get("verses", [])
        stats[book]["chapters"] += 1
        stats[book]["verses"] += len(verses)
        if doc.get("status") != "in_review" or doc.get("public") is not False:
            add("critical", "ISOLATION", path.name, "must remain in_review/public=false")
        if [v.get("number") for v in verses] != list(range(1, len(verses) + 1)):
            add("critical", "VERSE_SEQUENCE", path.name, "non-contiguous verse sequence")
        if doc.get("audit", {}).get("textDigest") != expected_digest(verses):
            add("error", "DIGEST", path.name, "candidate digest mismatch")

        for verse in verses:
            number = int(verse.get("number", 0))
            ref = f"{book}.{chapter}:{number}"
            text = str(verse.get("text", "")).strip()
            candidate_by_book[book].append((ref, text))
            if not text:
                add("critical", "EMPTY", ref, "empty verse")
                continue
            if unicodedata.normalize("NFC", text) != text:
                add("error", "NFC", ref, "not NFC")
            if SEDILLA.search(text) or ENGLISH.search(text) or CORRUPTION.search(text):
                stats[book]["languageErrors"] += 1
                add("error", "LANGUAGE", ref, excerpt(text))
            if PLACEHOLDER.search(text):
                stats[book]["placeholders"] += 1
                add("critical", "PLACEHOLDER", ref, excerpt(text))
            if text.count("„") != text.count("”") or text.count("«") != text.count("»"):
                stats[book]["languageErrors"] += 1
                add("error", "QUOTES", ref, "unbalanced quotes", {"romanian": text})

            source = web.get((book, chapter, number))
            benchmark = btf.get((book, chapter, number))
            corn = cornilescu.get((book, chapter, number))
            if source is None:
                stats[book]["webMissing"] += 1
                add("critical", "WEB_REFERENCE", ref, "missing engwebp reference")
            else:
                target_norm = normalize_text(text)
                source_norm = normalize_text(source)
                ratio = len(target_norm) / max(1, len(source_norm))
                if ratio < 0.28 or ratio > 3.8:
                    stats[book]["lengthOutliers"] += 1
                    add(
                        "error", "LENGTH", ref, f"ratio={ratio:.3f}",
                        {"romanian": text, "engwebp": source, "btf": benchmark, "cornilescu1924": corn},
                    )
                if numeric_tokens(text) != numeric_tokens(source):
                    stats[book]["numberMismatches"] += 1
                    add(
                        "error", "NUMBERS", ref,
                        f"RO={numeric_tokens(text)} EN={numeric_tokens(source)}",
                        {"romanian": text, "engwebp": source, "btf": benchmark, "cornilescu1924": corn},
                    )

            if (book, chapter, number) not in wlc:
                stats[book]["wlcReferenceMappings"] += 1
            if benchmark is None:
                stats[book]["btfReferenceMappings"] += 1
            else:
                stats[book]["btfSimilarity"].append(
                    SequenceMatcher(None, normalize_text(text), normalize_text(benchmark)).ratio()
                )
            if corn is None:
                stats[book]["cornilescuReferenceMappings"] += 1
            else:
                stats[book]["cornilescuSimilarity"].append(
                    SequenceMatcher(None, normalize_text(text), normalize_text(corn)).ratio()
                )

    for book, rows in candidate_by_book.items():
        counts = Counter(normalize_text(text) for _, text in rows if text)
        stats[book]["uniqueTexts"] = len(counts)
        stats[book]["maxRepeat"] = counts.most_common(1)[0][1] if counts else 0
        if len(counts) / max(1, len(rows)) < 0.90:
            add("critical", "MASS_REPETITION", book, f"unique={len(counts)}, verses={len(rows)}")
        candidate_count = len(rows)
        wlc_count = len(wlc_books.get(book, []))
        btf_count = len(btf_books.get(book, []))
        corn_count = len(corn_books.get(book, []))
        if candidate_count != wlc_count:
            stats[book]["wlcBookCountDifference"] = candidate_count - wlc_count
            add(
                "warning", "WLC_VERSIFICATION_MAP_REQUIRED", book,
                f"candidate={candidate_count}, WLC={wlc_count}; document chapter/verse mapping before promotion",
            )
        if candidate_count != btf_count:
            add("error", "BTF_BOOK_TOTAL", book, f"candidate={candidate_count}, BTF={btf_count}")
        if candidate_count != corn_count:
            add("error", "CORNILESCU_BOOK_TOTAL", book, f"candidate={candidate_count}, Cornilescu={corn_count}")
        if candidate_count != len(web_books.get(book, [])):
            add("critical", "WEB_BOOK_TOTAL", book, f"candidate={candidate_count}, engwebp={len(web_books.get(book, []))}")

    level_counts = Counter(item["severity"] for item in issues)
    book_output: dict[str, Any] = {}
    for book, value in sorted(stats.items()):
        btf_scores = value.pop("btfSimilarity")
        corn_scores = value.pop("cornilescuSimilarity")
        unique = value.pop("uniqueTexts")
        value["uniqueTexts"] = unique
        value["meanBtfSimilarity"] = round(mean(btf_scores), 4) if btf_scores else None
        value["highBtfSimilarityPercent"] = round(
            100 * sum(score >= 0.965 for score in btf_scores) / max(1, len(btf_scores)), 2
        ) if btf_scores else None
        value["meanCornilescuSimilarity"] = round(mean(corn_scores), 4) if corn_scores else None
        value["highCornilescuSimilarityPercent"] = round(
            100 * sum(score >= 0.965 for score in corn_scores) / max(1, len(corn_scores)), 2
        ) if corn_scores else None
        book_output[book] = value

    report = {
        "schemaVersion": 4,
        "scope": "33 remaining canonical Old Testament books",
        "severityCounts": dict(level_counts),
        "sources": {name: sha(path) for name, path in source_paths.items()},
        "books": book_output,
        "issues": issues,
    }
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "OT-REPAIR5-DETERMINISTIC-AUDIT.json").write_text(
        json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    lines = [
        "# OT Repair 5 — deterministic audit v4", "",
        f"- Critice: **{level_counts['critical']}**",
        f"- Erori: **{level_counts['error']}**",
        f"- Avertismente de mapare: **{level_counts['warning']}**", "", "## Cărți",
    ]
    for book, value in book_output.items():
        lines.append(
            f"- `{book}` — {value['chapters']} cap. / {value['verses']} vers.; "
            f"WEB lipsă {value['webMissing']}; mapări WLC {value['wlcReferenceMappings']}; "
            f"limbă {value['languageErrors']}; numere {value['numberMismatches']}; "
            f"lungime {value['lengthOutliers']}; BTF {value['meanBtfSimilarity']}; "
            f"Cornilescu {value['meanCornilescuSimilarity']}"
        )
    lines += ["", "## Probleme și mapări"]
    for item in issues[:1200]:
        lines.append(f"- **{item['severity'].upper()}** `{item['code']}` — `{item['reference']}`: {item['message']}")
        evidence = item.get("evidence")
        if evidence:
            for label, value in evidence.items():
                if value:
                    lines.append(f"  - {label.upper()}: {value}")
    (OUT / "OT-REPAIR5-DETERMINISTIC-AUDIT.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(json.dumps({"severityCounts": dict(level_counts), "books": book_output}, ensure_ascii=False, indent=2))
    return 1 if args.fail and (level_counts["critical"] or level_counts["error"]) else 0


if __name__ == "__main__":
    raise SystemExit(main())
