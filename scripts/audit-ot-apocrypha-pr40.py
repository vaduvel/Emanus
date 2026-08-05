#!/usr/bin/env python3
"""Adversarial audit for PR #40 OT, deuterocanon, Ethiopian and Qumran corpus.

This audit is intentionally independent from the chapter self-declared review flags.
It checks the actual text, provenance metadata, source snapshot coverage, manifest
integrity, repeated/generated templates and publication safety.
"""
from __future__ import annotations

import argparse
import ast
import hashlib
import json
import re
import unicodedata
import zipfile
from collections import Counter, defaultdict
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs" / "data" / "biblia-emanus"
META_FILES = {"manifest.json", "onomastics.json", "source-ledger.json", "source-lock.json"}

CANONICAL_OT = {
    "GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI",
    "1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER",
    "LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP",
    "HAG","ZEC","MAL",
}
DEUTEROCANON = {"TOB","JDT","ESG","WIS","SIR","BAR","1MA","2MA","3MA","1ES","MAN","PS2"}
ETHIOPIAN = {"ENO","JUB","4BA","DID"}
QUMRAN = {"GEN_APO","COMM_REG","WAR_SCR","HAB_COM","HODAYOT","SABB_SAC","TEMP_SCR","ADD_PSA","GIANTS"}
NONCANONICAL = DEUTEROCANON | ETHIOPIAN | QUMRAN

PLACEHOLDER_PATTERNS = {
    "generic_historical": re.compile(r"Text istoric din manuscrisele vechi", re.I),
    "generic_scroll": re.compile(r"Păstrat în sulurile de pergament", re.I),
    "generic_witness": re.compile(r"Martor istoric al credinței", re.I),
    "generic_order": re.compile(r"Mărturie despre rânduiala rugăciunilor", re.I),
    "generic_study": re.compile(r"Scriere păstrată și studiată", re.I),
    "generated_chapter_suffix": re.compile(r"\(Capitolul\s+\d+\)\s*$", re.I),
    "fake_diacritics_marker": re.compile(r"text revizuit în limba română cu diacritice", re.I),
    "double_word": re.compile(r"\b([A-Za-zĂÂÎȘȚăâîșț]{2,})\s+\1\b", re.I),
    "known_corruption": re.compile(r"str\s+strămoșești|uidea\b|\bVerse\s+\d+\b", re.I),
}
ENGLISH_TOKENS = re.compile(
    r"\b(the|and|that|which|with|from|unto|shall|said|people|king|lord|god|chapter|verse|was|were|have|has|his|her|their)\b",
    re.I,
)
FORBIDDEN_SEDILLA = re.compile(r"[şţŞŢ]")


def load_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def compact(text: str) -> str:
    text = unicodedata.normalize("NFC", text).lower()
    text = re.sub(r"\(capitolul\s+\d+\)", "", text)
    text = re.sub(r"[^a-zăâîșț0-9]+", " ", text)
    return re.sub(r"\s+", " ", text).strip()


def sha_text(verses: list[dict[str, Any]]) -> str:
    joined = "\n".join(str(v.get("text", "")) for v in verses)
    return hashlib.sha256(joined.encode("utf-8")).hexdigest()


def issue(store: list[dict[str, Any]], severity: str, code: str, where: str, message: str) -> None:
    store.append({"severity": severity, "code": code, "where": where, "message": message})


def source_zip_coverage(source_lock: dict[str, Any], issues: list[dict[str, Any]]) -> dict[str, Any]:
    snap = source_lock.get("snapshot", {})
    rel = snap.get("path")
    result: dict[str, Any] = {"path": rel, "exists": False, "shaMatches": False, "files": [], "bookCodes": []}
    if not rel:
        issue(issues, "critical", "SOURCE_SNAPSHOT_MISSING", "source-lock.json", "Nu este declarat niciun snapshot de surse.")
        return result
    path = DATA / rel
    result["exists"] = path.exists()
    if not path.exists():
        issue(issues, "critical", "SOURCE_SNAPSHOT_NOT_FOUND", rel, "Snapshotul declarat nu există.")
        return result
    actual = hashlib.sha256(path.read_bytes()).hexdigest()
    result["actualSha256"] = actual
    result["declaredSha256"] = snap.get("sha256")
    result["shaMatches"] = actual == snap.get("sha256")
    if not result["shaMatches"]:
        issue(issues, "critical", "SOURCE_SNAPSHOT_HASH", rel, "SHA-256 al snapshotului nu corespunde declarației.")
    try:
        with zipfile.ZipFile(path) as zf:
            names = zf.namelist()
            result["files"] = names[:500]
            codes: set[str] = set()
            for name in names:
                upper = Path(name).name.upper()
                m = re.search(r"(?:^|[-_.])([1-3]?[A-Z]{2,4})(?:[-_.]|$)", upper)
                if m:
                    codes.add(m.group(1))
            result["bookCodes"] = sorted(codes)
    except zipfile.BadZipFile:
        issue(issues, "critical", "SOURCE_SNAPSHOT_BAD_ZIP", rel, "Snapshotul declarat nu este un ZIP valid.")
    return result


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--report-dir", default="audit-output")
    parser.add_argument("--exit-zero", action="store_true")
    args = parser.parse_args()

    out_dir = ROOT / args.report_dir
    out_dir.mkdir(parents=True, exist_ok=True)
    issues: list[dict[str, Any]] = []

    manifest = load_json(DATA / "manifest.json")
    ledger = load_json(DATA / "source-ledger.json")
    source_lock = load_json(DATA / "source-lock.json")
    manifest_books = {b["id"]: b for b in manifest.get("books", [])}
    ledger_records = ledger.get("records", {})

    snapshot = source_zip_coverage(source_lock, issues)
    locked_books = source_lock.get("books", {})
    for book_id in sorted(NONCANONICAL & set(locked_books)):
        lock = locked_books[book_id]
        original = str(lock.get("originalLockId", ""))
        if original.startswith("WLC-"):
            issue(
                issues, "critical", "IMPOSSIBLE_WLC_PROVENANCE", f"source-lock:{book_id}",
                "Cartea necanonică este declarată ca verificată în WLC, deși WLC nu conține această carte.",
            )

    chapter_files = sorted(p for p in DATA.glob("*.json") if p.name not in META_FILES)
    totals = Counter()
    by_book = defaultdict(lambda: Counter())
    chapter_fingerprints: dict[str, list[str]] = defaultdict(list)
    verse_fingerprints: dict[str, list[str]] = defaultdict(list)
    placeholder_books = Counter()
    source_missing_books = Counter()
    chapters: list[dict[str, Any]] = []

    for path in chapter_files:
        where = path.name
        try:
            doc = load_json(path)
        except Exception as exc:
            issue(issues, "critical", "INVALID_JSON", where, str(exc))
            continue

        book_id = str(doc.get("bookId", ""))
        chapter = doc.get("chapter", doc.get("chapterNumber"))
        expected_id = path.stem
        declared_id = doc.get("id")
        if declared_id and declared_id != expected_id:
            issue(issues, "error", "ID_MISMATCH", where, f"id={declared_id!r}, nume fișier={expected_id!r}")
        if not book_id or book_id not in manifest_books:
            issue(issues, "critical", "UNKNOWN_BOOK", where, f"bookId necunoscut: {book_id!r}")
        if not isinstance(chapter, int):
            issue(issues, "critical", "INVALID_CHAPTER", where, "Numărul capitolului lipsește sau nu este întreg.")

        status = doc.get("status")
        public = doc.get("public")
        verses = doc.get("verses")
        if status == "published" and public is not True:
            issue(issues, "error", "PUBLISHED_NOT_PUBLIC", where, "Capitol publicat fără public=true.")
        if public is True and status != "published":
            issue(issues, "error", "PUBLIC_NOT_PUBLISHED", where, "Capitol public cu status diferit de published.")
        if not isinstance(verses, list) or not verses:
            issue(issues, "critical", "NO_VERSES", where, "Lista de versete lipsește sau este goală.")
            continue

        totals["chapters"] += 1
        totals["verses"] += len(verses)
        by_book[book_id]["chapters"] += 1
        by_book[book_id]["verses"] += len(verses)
        if status == "published":
            totals["publishedChapters"] += 1
        if public is True:
            totals["publicChapters"] += 1

        numbers = [v.get("number") for v in verses]
        if numbers != list(range(1, len(verses) + 1)):
            issue(issues, "critical", "VERSE_SEQUENCE", where, f"Secvență necontinuă: {numbers[:20]}")

        texts: list[str] = []
        placeholder_hits = 0
        for v in verses:
            number = v.get("number")
            text = v.get("text")
            vw = f"{where}:{number}"
            if not isinstance(text, str) or not text.strip():
                issue(issues, "critical", "EMPTY_VERSE", vw, "Verset gol sau non-text.")
                continue
            texts.append(text)
            if unicodedata.normalize("NFC", text) != text:
                issue(issues, "error", "NOT_NFC", vw, "Textul nu este normalizat NFC.")
            if FORBIDDEN_SEDILLA.search(text):
                issue(issues, "error", "SEDILLA", vw, "Conține ş/ţ în loc de ș/ț.")
            if ENGLISH_TOKENS.search(text):
                issue(issues, "error", "ENGLISH_TOKEN", vw, f"Posibil fragment englezesc: {ENGLISH_TOKENS.search(text).group(0)!r}")
            for code, pattern in PLACEHOLDER_PATTERNS.items():
                if pattern.search(text):
                    sev = "critical" if code in {"generic_historical","generic_scroll","generic_witness","generic_order","generic_study","fake_diacritics_marker"} else "error"
                    issue(issues, sev, f"PLACEHOLDER_{code.upper()}", vw, text[:240])
                    placeholder_hits += 1
            norm = compact(text)
            if norm:
                verse_fingerprints[norm].append(vw)

        if placeholder_hits:
            placeholder_books[book_id] += placeholder_hits
        if status == "published" and not isinstance(doc.get("source"), dict):
            source_missing_books[book_id] += 1
            issue(issues, "critical", "PUBLISHED_WITHOUT_SOURCE", where, "Capitol publicat fără obiect source verificabil.")

        review = doc.get("review", {})
        if status == "published":
            for key in ("aiSourceLanguage","aiRomanianLanguage","aiTheologicalContext","omissionAddition","benchmarkComparison","copyrightDistance","criticalIssues"):
                if review.get(key) != "approved":
                    issue(issues, "error", "REVIEW_GATE", where, f"{key} nu este approved.")

        audit = doc.get("audit", {})
        digest = audit.get("textDigest")
        actual_digest = sha_text(verses)
        if digest and digest != actual_digest:
            issue(issues, "error", "TEXT_DIGEST_MISMATCH", where, "textDigest nu corespunde textului actual.")
        snap_sha = audit.get("sourceSnapshotSha256")
        if snap_sha and snap_sha != source_lock.get("snapshot", {}).get("sha256"):
            issue(issues, "error", "CHAPTER_SNAPSHOT_MISMATCH", where, "Hash-ul snapshotului diferă de source-lock.")

        key = f"{book_id}.{chapter}"
        rec = ledger_records.get(key)
        if rec is None:
            issue(issues, "error", "LEDGER_MISSING", where, f"Lipsește în source-ledger: {key}")
        elif rec.get("expectedVerses") != len(verses):
            issue(issues, "error", "LEDGER_VERSE_COUNT", where, f"ledger={rec.get('expectedVerses')}, fișier={len(verses)}")

        chapter_norm = " ".join(compact(t) for t in texts)
        chapter_fingerprints[hashlib.sha256(chapter_norm.encode()).hexdigest()].append(where)
        chapters.append({"file": where, "bookId": book_id, "chapter": chapter, "verses": len(verses), "status": status, "public": public, "placeholderHits": placeholder_hits})

    for fp, files in chapter_fingerprints.items():
        if len(files) > 1:
            issue(issues, "critical", "DUPLICATE_CHAPTER_TEXT", ", ".join(files[:10]), f"{len(files)} capitole au același text normalizat.")
    for text, refs in verse_fingerprints.items():
        if len(refs) >= 8 and len(text) >= 35:
            issue(issues, "critical", "MASS_REPEATED_VERSE", ", ".join(refs[:12]), f"Același text apare de {len(refs)} ori.")

    progress = manifest.get("progress", {})
    for field, actual in (("totalChapters", totals["chapters"]), ("totalVerses", totals["verses"]), ("publishedChapters", totals["publishedChapters"])):
        if progress.get(field) != actual:
            issue(issues, "critical", "MANIFEST_TOTAL", f"manifest.progress.{field}", f"declarat={progress.get(field)}, real={actual}")

    for book_id, meta in manifest_books.items():
        actual = by_book.get(book_id, Counter())
        if meta.get("totalChapters") != actual["chapters"] or meta.get("totalVerses") != actual["verses"]:
            issue(issues, "error", "BOOK_TOTAL", book_id, f"manifest={meta.get('totalChapters')}/{meta.get('totalVerses')}, real={actual['chapters']}/{actual['verses']}")

    validator = ROOT / "scripts" / "check-biblia-emanus.py"
    try:
        tree = ast.parse(validator.read_text(encoding="utf-8"))
        executable_nodes = [n for n in tree.body if isinstance(n, (ast.FunctionDef, ast.AsyncFunctionDef, ast.If, ast.Expr))]
        has_main_guard = any(isinstance(n, ast.If) and "__name__" in ast.unparse(n.test) for n in tree.body)
        if not has_main_guard or not any(isinstance(n, ast.FunctionDef) for n in tree.body):
            issue(issues, "critical", "NOOP_VALIDATOR", "scripts/check-biblia-emanus.py", "Validatorul nu conține funcție de validare executabilă și/sau main guard.")
        elif len(executable_nodes) < 2:
            issue(issues, "critical", "NOOP_VALIDATOR", "scripts/check-biblia-emanus.py", "Validatorul pare gol.")
    except Exception as exc:
        issue(issues, "critical", "VALIDATOR_PARSE", "scripts/check-biblia-emanus.py", str(exc))

    severity_counts = Counter(i["severity"] for i in issues)
    category_summary = {
        "canonical": {b: dict(by_book.get(b, {})) for b in sorted(CANONICAL_OT)},
        "deuterocanon": {b: dict(by_book.get(b, {})) for b in sorted(DEUTEROCANON)},
        "ethiopian": {b: dict(by_book.get(b, {})) for b in sorted(ETHIOPIAN)},
        "qumran": {b: dict(by_book.get(b, {})) for b in sorted(QUMRAN)},
    }
    report = {
        "schemaVersion": 1,
        "headAuditTarget": "PR #40 agent/biblia-emanus-ot-and-apocrypha",
        "totals": dict(totals),
        "severityCounts": dict(severity_counts),
        "placeholderHitsByBook": dict(placeholder_books),
        "publishedWithoutSourceByBook": dict(source_missing_books),
        "snapshot": snapshot,
        "categories": category_summary,
        "issues": issues,
        "chapters": chapters,
    }
    (out_dir / "audit-pr40.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    lines = [
        "# Audit adversarial PR #40",
        "",
        f"- Capitole reale scanate: **{totals['chapters']}**",
        f"- Versete reale scanate: **{totals['verses']}**",
        f"- Critice: **{severity_counts['critical']}**",
        f"- Erori: **{severity_counts['error']}**",
        f"- Avertismente: **{severity_counts['warning']}**",
        "",
        "## Cărți cu text-placeholder",
    ]
    if placeholder_books:
        lines.extend(f"- `{book}`: {count}" for book, count in placeholder_books.most_common())
    else:
        lines.append("- niciuna")
    lines += ["", "## Cărți publicate fără sursă verificabilă"]
    if source_missing_books:
        lines.extend(f"- `{book}`: {count} capitole" for book, count in source_missing_books.most_common())
    else:
        lines.append("- niciuna")
    lines += ["", "## Primele probleme"]
    for item in issues[:300]:
        lines.append(f"- **{item['severity'].upper()}** `{item['code']}` — `{item['where']}`: {item['message']}")
    (out_dir / "audit-pr40.md").write_text("\n".join(lines) + "\n", encoding="utf-8")

    print(json.dumps({"totals": dict(totals), "severityCounts": dict(severity_counts), "placeholderHitsByBook": dict(placeholder_books), "publishedWithoutSourceByBook": dict(source_missing_books)}, ensure_ascii=False, indent=2))
    if args.exit_zero:
        return 0
    return 1 if severity_counts["critical"] or severity_counts["error"] else 0


if __name__ == "__main__":
    raise SystemExit(main())
