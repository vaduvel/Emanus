#!/usr/bin/env python3
"""Source-backed audit for the isolated OT/deuterocanon candidate corpus."""
from __future__ import annotations

import argparse
import hashlib
import json
import re
import unicodedata
import zipfile
from collections import Counter, defaultdict
from difflib import SequenceMatcher
from pathlib import Path
from statistics import mean
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs" / "data" / "biblia-emanus-candidates"
SOURCES = DATA / "sources"
REPORT_DIR = ROOT / "docs" / "biblia-emanus"

CANONICAL = {
    "JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB",
    "PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO",
    "OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL",
}
DEUTERO = {"TOB","JDT","ESG","WIS","SIR","BAR","1MA","2MA","3MA","1ES","MAN","PS2"}

BOOK_ALIASES = {
    "JDG": "JDG", "RUT": "RUT", "1SA": "1SA", "2SA": "2SA", "1KI": "1KI", "2KI": "2KI",
    "1CH": "1CH", "2CH": "2CH", "EZR": "EZR", "NEH": "NEH", "EST": "EST", "JOB": "JOB",
    "PSA": "PSA", "PRO": "PRO", "ECC": "ECC", "SNG": "SNG", "ISA": "ISA", "JER": "JER",
    "LAM": "LAM", "EZK": "EZK", "DAN": "DAN", "HOS": "HOS", "JOL": "JOL", "AMO": "AMO",
    "OBA": "OBA", "JON": "JON", "MIC": "MIC", "NAM": "NAM", "HAB": "HAB", "ZEP": "ZEP",
    "HAG": "HAG", "ZEC": "ZEC", "MAL": "MAL", "TOB": "TOB", "JDT": "JDT", "ESG": "ESG",
    "WIS": "WIS", "SIR": "SIR", "BAR": "BAR", "1MA": "1MA", "2MA": "2MA", "3MA": "3MA",
    "1ES": "1ES", "MAN": "MAN", "PS2": "PS2",
}

TRUE_PLACEHOLDERS = [
    re.compile(r"Text istoric din manuscrisele vechi", re.I),
    re.compile(r"Păstrat în sulurile de pergament", re.I),
    re.compile(r"Martor istoric al credinței", re.I),
    re.compile(r"Mărturie despre rânduiala rugăciunilor", re.I),
    re.compile(r"Scriere păstrată și studiată", re.I),
    re.compile(r"text revizuit în limba română cu diacritice", re.I),
    re.compile(r"\(Capitolul\s+\d+\)\s*$", re.I),
]
ENGLISH = re.compile(r"\b(the|and|which|with|from|unto|shall|chapter|verse|people|king|said|was|were|have|their)\b", re.I)
CORRUPTION = re.compile(r"\bstr\s+strămoșești\b|\buidea\b|\bVerse\s+\d+\b", re.I)
SEDILLA = re.compile(r"[şţŞŢ]")
MARKER = re.compile(r"\\(?:f|x)\b.*?\\(?:f|x)\*|\\w\s+([^|\\]+).*?\\w\*|\\[a-z0-9+]+\*?", re.I)


def load(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def normal(text: str) -> str:
    text = unicodedata.normalize("NFC", text).lower()
    text = text.replace("domnul", "domnul")
    text = re.sub(r"[^a-zăâîșț0-9]+", " ", text)
    return re.sub(r"\s+", " ", text).strip()


def strip_usfm(text: str) -> str:
    text = re.sub(r"\\f\s+.*?\\f\*", " ", text)
    text = re.sub(r"\\x\s+.*?\\x\*", " ", text)
    text = re.sub(r"\\w\s+([^|\\]+).*?\\w\*", r"\1", text)
    text = re.sub(r"\\[a-z0-9+]+\*?", " ", text, flags=re.I)
    return re.sub(r"\s+", " ", text).strip()


def parse_usfm_zip(path: Path) -> dict[tuple[str, int, int], str]:
    result: dict[tuple[str, int, int], str] = {}
    with zipfile.ZipFile(path) as zf:
        for name in zf.namelist():
            if name.endswith("/") or not name.lower().endswith((".usfm", ".sfm", ".txt")):
                continue
            raw = zf.read(name).decode("utf-8-sig", errors="replace")
            book_match = re.search(r"^\\id\s+([0-9A-Z]{3})\b", raw, re.M)
            if not book_match:
                continue
            book = BOOK_ALIASES.get(book_match.group(1), book_match.group(1))
            chapter: int | None = None
            current: tuple[str, int, int] | None = None
            for line in raw.splitlines():
                cm = re.match(r"^\\c\s+(\d+)", line)
                if cm:
                    chapter = int(cm.group(1))
                    current = None
                    continue
                vm = re.match(r"^\\v\s+([0-9]+)(?:[-a-z0-9]*)\s*(.*)", line, re.I)
                if vm and chapter is not None:
                    verse = int(vm.group(1))
                    current = (book, chapter, verse)
                    result[current] = strip_usfm(vm.group(2))
                    continue
                if current and line and not line.startswith("\\"):
                    result[current] = (result[current] + " " + strip_usfm(line)).strip()
    return result


def verify_sha_sums() -> list[str]:
    problems: list[str] = []
    sums = SOURCES / "SHA256SUMS"
    if not sums.exists():
        return ["SHA256SUMS missing"]
    for line in sums.read_text(encoding="utf-8").splitlines():
        if not line.strip():
            continue
        expected, filename = line.split(maxsplit=1)
        file = SOURCES / Path(filename).name
        if not file.exists():
            problems.append(f"missing:{file.name}")
            continue
        actual = hashlib.sha256(file.read_bytes()).hexdigest()
        if actual != expected:
            problems.append(f"hash:{file.name}:{expected}:{actual}")
    return problems


def digits(text: str) -> list[str]:
    return re.findall(r"\d+", text)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--fail", action="store_true")
    args = parser.parse_args()

    required = {
        "webbe": SOURCES / "eng-webbe_usfm.zip",
        "wlc": SOURCES / "hebwlc_usfm.zip",
        "btf": SOURCES / "ronbtf_usfm.zip",
    }
    missing = [name for name, path in required.items() if not path.exists()]
    if missing:
        raise SystemExit(f"Missing sources: {missing}")

    source_hash_problems = verify_sha_sums()
    web = parse_usfm_zip(required["webbe"])
    wlc = parse_usfm_zip(required["wlc"])
    btf = parse_usfm_zip(required["btf"])

    issues: list[dict[str, Any]] = []
    stats: dict[str, dict[str, Any]] = defaultdict(lambda: {
        "chapters": 0, "verses": 0, "sourceMissing": 0, "wlcMissing": 0, "btfMissing": 0,
        "placeholders": 0, "english": 0, "corruptions": 0, "lengthOutliers": 0,
        "numberMismatches": 0, "highBtfSimilarity": 0, "btfSimilarities": [],
    })

    def add(severity: str, code: str, where: str, message: str) -> None:
        issues.append({"severity": severity, "code": code, "where": where, "message": message})

    for problem in source_hash_problems:
        add("critical", "SOURCE_HASH", "sources", problem)

    files = sorted(DATA.glob("*.json"))
    for file in files:
        if file.name == "manifest.json":
            continue
        doc = load(file)
        book = str(doc.get("bookId", ""))
        if book not in CANONICAL | DEUTERO:
            continue
        chapter = int(doc.get("chapter", doc.get("chapterNumber", 0)))
        if doc.get("status") != "in_review" or doc.get("public") is not False:
            add("critical", "ISOLATION", file.name, "Candidate must remain in_review/public=false")
        verses = doc.get("verses", [])
        stats[book]["chapters"] += 1
        stats[book]["verses"] += len(verses)
        if [v.get("number") for v in verses] != list(range(1, len(verses) + 1)):
            add("critical", "VERSE_SEQUENCE", file.name, "Non-contiguous candidate verse sequence")
        for verse in verses:
            number = int(verse.get("number", 0))
            where = f"{book}.{chapter}:{number}"
            text = str(verse.get("text", "")).strip()
            key = (book, chapter, number)
            source = web.get(key)
            if not source:
                stats[book]["sourceMissing"] += 1
                add("critical", "WEB_SOURCE_MISSING", where, "No WEBBE source verse at same reference")
            if book in CANONICAL and not wlc.get(key):
                stats[book]["wlcMissing"] += 1
                add("error", "WLC_SOURCE_MISSING", where, "No WLC verse at same reference; may require versification mapping")
            benchmark = btf.get(key) if book in CANONICAL else None
            if book in CANONICAL and not benchmark:
                stats[book]["btfMissing"] += 1
                add("error", "BTF_MISSING", where, "No BTF benchmark at same reference")

            if not text:
                add("critical", "EMPTY", where, "Empty candidate verse")
                continue
            if unicodedata.normalize("NFC", text) != text:
                add("error", "NFC", where, "Not NFC-normalized")
            if SEDILLA.search(text):
                add("error", "SEDILLA", where, "Uses ş/ţ instead of ș/ț")
            if any(p.search(text) for p in TRUE_PLACEHOLDERS):
                stats[book]["placeholders"] += 1
                add("critical", "PLACEHOLDER", where, text[:220])
            if ENGLISH.search(text):
                stats[book]["english"] += 1
                add("error", "ENGLISH", where, text[:220])
            if CORRUPTION.search(text):
                stats[book]["corruptions"] += 1
                add("error", "CORRUPTION", where, text[:220])
            repeated = re.search(r"\b([A-Za-zĂÂÎȘȚăâîșț]{3,})\s+\1\b", text, re.I)
            if repeated:
                add("error", "DUPLICATE_WORD", where, repeated.group(0))
            if text.count("„") != text.count("”") or text.count("«") != text.count("»"):
                add("error", "QUOTES", where, "Unbalanced Romanian quotation marks")

            if source:
                ratio = len(normal(text)) / max(1, len(normal(source)))
                if ratio < 0.32 or ratio > 3.2:
                    stats[book]["lengthOutliers"] += 1
                    add("error", "LENGTH_RATIO", where, f"Romanian/English normalized length ratio={ratio:.2f}")
                source_digits = digits(source)
                target_digits = digits(text)
                if source_digits != target_digits:
                    stats[book]["numberMismatches"] += 1
                    add("error", "NUMBERS", where, f"source={source_digits}, target={target_digits}")

            if benchmark:
                sim = SequenceMatcher(None, normal(text), normal(benchmark)).ratio()
                stats[book]["btfSimilarities"].append(sim)
                if sim >= 0.965:
                    stats[book]["highBtfSimilarity"] += 1

    severity = Counter(i["severity"] for i in issues)
    book_report: dict[str, Any] = {}
    for book, value in sorted(stats.items()):
        sims = value.pop("btfSimilarities")
        value["meanBtfSimilarity"] = round(mean(sims), 4) if sims else None
        value["highBtfSimilarityPercent"] = round(100 * value["highBtfSimilarity"] / max(1, value["verses"]), 2)
        book_report[book] = value

    report = {
        "schemaVersion": 1,
        "sources": {
            name: {"path": str(path.relative_to(ROOT)), "sha256": hashlib.sha256(path.read_bytes()).hexdigest()}
            for name, path in required.items()
        },
        "severityCounts": dict(severity),
        "books": book_report,
        "issues": issues,
    }
    REPORT_DIR.mkdir(parents=True, exist_ok=True)
    (REPORT_DIR / "OT-REPAIR5-CANDIDATE-AUDIT.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    lines = [
        "# OT Repair 5 — candidate audit",
        "",
        f"- Critice: **{severity['critical']}**",
        f"- Erori: **{severity['error']}**",
        "",
        "## Rezultat pe cărți",
    ]
    for book, value in book_report.items():
        lines.append(
            f"- `{book}` — {value['chapters']} cap. / {value['verses']} vers.; "
            f"WEB lipsă {value['sourceMissing']}; WLC lipsă {value['wlcMissing']}; "
            f"placeholder {value['placeholders']}; coruperi {value['corruptions']}; "
            f"similaritate medie BTF {value['meanBtfSimilarity']}"
        )
    lines += ["", "## Primele probleme"]
    for item in issues[:500]:
        lines.append(f"- **{item['severity'].upper()}** `{item['code']}` — `{item['where']}`: {item['message']}")
    (REPORT_DIR / "OT-REPAIR5-CANDIDATE-AUDIT.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(json.dumps({"severityCounts": dict(severity), "books": book_report}, ensure_ascii=False, indent=2))
    if args.fail and (severity["critical"] or severity["error"]):
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
