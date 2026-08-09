#!/usr/bin/env python3
"""Validate per-verse source evidence for the canonical Old Testament.

This gate validates evidence; it does not generate semantic verdicts. Source
coverage, chapter audit claims, and source availability cannot substitute for
an approved, hash-bound record for every canonical OT verse.
"""

from __future__ import annotations

import argparse
import gzip
import hashlib
import json
import re
import sys
import unicodedata
import zipfile
from dataclasses import dataclass
from datetime import date
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
DATA_RELATIVE_PATH = Path("docs/data/biblia-emanus")
DEFAULT_EVIDENCE_NAME = "ot-source-evidence.jsonl.gz"

CANONICAL_OT_CHAPTERS: tuple[tuple[str, int], ...] = (
    ("GEN", 50), ("EXO", 40), ("LEV", 27), ("NUM", 36), ("DEU", 34),
    ("JOS", 24), ("JDG", 21), ("RUT", 4), ("1SA", 31), ("2SA", 24),
    ("1KI", 22), ("2KI", 25), ("1CH", 29), ("2CH", 36), ("EZR", 10),
    ("NEH", 13), ("EST", 10), ("JOB", 42), ("PSA", 150), ("PRO", 31),
    ("ECC", 12), ("SNG", 8), ("ISA", 66), ("JER", 52), ("LAM", 5),
    ("EZK", 48), ("DAN", 12), ("HOS", 14), ("JOL", 3), ("AMO", 9),
    ("OBA", 1), ("JON", 4), ("MIC", 7), ("NAM", 3), ("HAB", 3),
    ("ZEP", 3), ("HAG", 2), ("ZEC", 14), ("MAL", 4),
)
EXPECTED_OT_CHAPTER_COUNT = 929
EXPECTED_OT_VERSE_COUNT = 23_145

REFERENCE_PATTERN = re.compile(r"^([A-Z0-9]{3})\.([1-9][0-9]*)\.([1-9][0-9]*)$")
SOURCE_REFERENCE_PATTERN = re.compile(r"^([1-9][0-9]*):([1-9][0-9]*)$")
SHA256_PATTERN = re.compile(r"^sha256:[0-9a-f]{64}$")
RAW_SHA256_PATTERN = re.compile(r"^[0-9a-f]{64}$")
ISO_DATE_PATTERN = re.compile(r"^20[0-9]{2}-[01][0-9]-[0-3][0-9]$")
USFM_CHAPTER_PATTERN = re.compile(r"^\\c\s+([1-9][0-9]*)\b")
USFM_VERSE_TEXT_PATTERN = re.compile(
    r"^\\v\s+([1-9][0-9]*)(?:-[1-9][0-9]*)?\s*(.*)$"
)

RECORD_TYPE = "ot-verse-source-evidence"
REVIEW_METHOD = "direct-per-verse-hebrew-webu-romanian-comparison"
CHECK_NAMES = ("omissions", "additions", "meaning", "names", "numbers", "negations")
APPROVED_FINDINGS = {
    "omissions": {"none"},
    "additions": {"none"},
    "meaning": {"preserved"},
    "names": {"preserved", "not_present"},
    "numbers": {"preserved", "not_present"},
    "negations": {"preserved", "not_present"},
}
UNRESOLVED_FINDINGS = {"issue", "uncertain"}
# These local evaluators failed the controlled calibration artifacts in
# docs/biblia-emanus. Their output may remain useful for triage, never as the
# semantic proof required to publish Scripture.
DISQUALIFIED_REVIEWER_PREFIXES = (
    "agent-manual-fallback-v1",
    "ollama-qwen2.5:14b-",
    "ollama-qwen3:8b-",
    "ollama-gemma3:",
    "ollama-gemma4:e2b-",
)
GENERIC_RATIONALES = {
    "Sensul teologic și semantic este tradus fidel.",
}


class ValidationError(Exception):
    """Raised when publication evidence is incomplete or stale."""


@dataclass(frozen=True)
class ValidationContract:
    """Closed-canon contract; tests may instantiate a smaller fixture contract."""

    book_chapters: tuple[tuple[str, int], ...]
    expected_verse_count: int

    @property
    def expected_chapter_count(self) -> int:
        return sum(chapters for _, chapters in self.book_chapters)


@dataclass(frozen=True)
class VerseContext:
    reference: str
    romanian: str
    hebrew_lock_id: str
    hebrew_references: tuple[str, ...]
    hebrew_payload: str
    webu_lock_id: str
    webu_references: tuple[str, ...]
    webu_payload: str


@dataclass(frozen=True)
class ValidationStats:
    books: int
    chapters: int
    verses: int


PRODUCTION_CONTRACT = ValidationContract(
    book_chapters=CANONICAL_OT_CHAPTERS,
    expected_verse_count=EXPECTED_OT_VERSE_COUNT,
)


def fail(message: str) -> None:
    raise ValidationError(message)


def sha256_bytes(value: bytes) -> str:
    return hashlib.sha256(value).hexdigest()


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def text_digest(value: str) -> str:
    return "sha256:" + sha256_bytes(value.encode("utf-8"))


def canonical_json(value: Any) -> str:
    return json.dumps(
        value,
        ensure_ascii=False,
        sort_keys=True,
        separators=(",", ":"),
    )


def binding_digest(reference: str, texts: dict[str, Any]) -> str:
    return text_digest(canonical_json({"reference": reference, "texts": texts}))


def record_digest(record: dict[str, Any]) -> str:
    protected = dict(record)
    protected.pop("recordSha256", None)
    return text_digest(canonical_json(protected))


def _reject_duplicate_json_keys(pairs: list[tuple[str, Any]]) -> dict[str, Any]:
    value: dict[str, Any] = {}
    for key, child in pairs:
        if key in value:
            fail(f"cheie JSON duplicată: {key}")
        value[key] = child
    return value


def load_json_object(path: Path, owner: str) -> dict[str, Any]:
    try:
        raw = path.read_text(encoding="utf-8")
    except FileNotFoundError:
        fail(f"lipsește {owner}: {path}")
    except UnicodeDecodeError:
        fail(f"{owner}: fișierul nu este UTF-8")
    if raw.startswith("\ufeff"):
        fail(f"{owner}: BOM UTF-8 nepermis")
    if unicodedata.normalize("NFC", raw) != raw:
        fail(f"{owner}: conținutul nu este Unicode NFC")
    try:
        value = json.loads(raw, object_pairs_hook=_reject_duplicate_json_keys)
    except json.JSONDecodeError as error:
        fail(f"{owner}: JSON invalid la linia {error.lineno}: {error.msg}")
    if not isinstance(value, dict):
        fail(f"{owner}: rădăcina trebuie să fie obiect JSON")
    return value


def require_exact_keys(value: dict[str, Any], expected: set[str], owner: str) -> None:
    actual = set(value)
    if actual != expected:
        missing = sorted(expected - actual)
        extra = sorted(actual - expected)
        fail(f"{owner}: câmpuri invalide; lipsă={missing}, suplimentare={extra}")


def require_sha256(value: Any, owner: str, *, prefixed: bool = True) -> str:
    pattern = SHA256_PATTERN if prefixed else RAW_SHA256_PATTERN
    if not isinstance(value, str) or not pattern.fullmatch(value):
        prefix = "sha256:" if prefixed else ""
        fail(f"{owner}: hash invalid; este necesar {prefix}<64 hex lowercase>")
    return value


def require_iso_date(value: Any, owner: str) -> str:
    if not isinstance(value, str) or not ISO_DATE_PATTERN.fullmatch(value):
        fail(f"{owner}: data trebuie să fie ISO YYYY-MM-DD")
    try:
        parsed = date.fromisoformat(value)
    except ValueError:
        fail(f"{owner}: data calendaristică este invalidă")
    if parsed.isoformat() != value:
        fail(f"{owner}: data nu este canonică")
    return value


def safe_data_path(data_dir: Path, relative_path: Any, owner: str) -> Path:
    if not isinstance(relative_path, str) or not relative_path.strip():
        fail(f"{owner}: cale lipsă")
    path = (data_dir / relative_path).resolve()
    try:
        path.relative_to(data_dir.resolve())
    except ValueError:
        fail(f"{owner}: calea iese din directorul corpusului")
    return path


def strip_usfm_text(value: str) -> str:
    value = re.sub(r"\\(?:f|x)\s.*?\\(?:f|x)\*", " ", value)
    value = re.sub(r"\\w\s+([^|\\]+)(?:\|[^\\]*)?\\w\*", r"\1", value)
    value = re.sub(r"\\[+a-zA-Z0-9-]+\*?", " ", value)
    value = re.sub(r"\|\S+", " ", value)
    return re.sub(r"\s+", " ", value).strip()


def parse_usfm_verses(raw: bytes, owner: str) -> dict[tuple[int, int], str]:
    try:
        text = raw.decode("utf-8-sig")
    except UnicodeDecodeError:
        fail(f"{owner}: sursa USFM nu este UTF-8")
    chapter: int | None = None
    current_reference: tuple[int, int] | None = None
    verses: dict[tuple[int, int], str] = {}
    continuation_pattern = re.compile(
        r"^\\(?:p|m|q[0-9]*|qm[0-9]*|li[0-9]*|pi[0-9]*|pc|pr|cls|nb|b)(?:\s|$)"
    )
    for line in text.splitlines():
        chapter_match = USFM_CHAPTER_PATTERN.match(line)
        if chapter_match:
            chapter = int(chapter_match.group(1))
            current_reference = None
            continue
        verse_match = USFM_VERSE_TEXT_PATTERN.match(line)
        if verse_match:
            if chapter is None:
                fail(f"{owner}: verset înainte de capitol")
            reference = (chapter, int(verse_match.group(1)))
            if reference in verses:
                fail(f"{owner}: referință USFM duplicată {reference}")
            verse_text = strip_usfm_text(verse_match.group(2))
            if not verse_text:
                fail(f"{owner}: text gol la {reference[0]}:{reference[1]}")
            verses[reference] = verse_text
            current_reference = reference
            continue
        if current_reference is not None and continuation_pattern.match(line):
            continuation = strip_usfm_text(line)
            if continuation:
                verses[current_reference] += " " + continuation
        elif current_reference is not None and line and not line.startswith("\\"):
            continuation = strip_usfm_text(line)
            if continuation:
                verses[current_reference] += " " + continuation
    if not verses:
        fail(f"{owner}: sursa USFM nu conține versete")
    return verses


def parse_source_reference(value: Any, owner: str) -> tuple[int, int]:
    if not isinstance(value, str):
        fail(f"{owner}: referința sursei trebuie să fie text")
    match = SOURCE_REFERENCE_PATTERN.fullmatch(value)
    if not match:
        fail(f"{owner}: referință sursă invalidă {value!r}")
    return int(match.group(1)), int(match.group(2))


def source_references_for_target(
    lock_id: str,
    book_id: str,
    chapter: int,
    verse: int,
    rules: list[Any],
) -> tuple[tuple[int, int], ...]:
    matching: list[dict[str, Any]] = []
    target = f"{chapter}:{verse}"
    for raw_rule in rules:
        if not isinstance(raw_rule, dict):
            fail("source-lock.json: regulă de versificație invalidă")
        if raw_rule.get("sourceLockId") != lock_id or raw_rule.get("bookId") != book_id:
            continue
        explicit_targets = raw_rule.get("targetReferences")
        if explicit_targets is not None:
            if not isinstance(explicit_targets, list):
                fail(f"source-lock.json: targetReferences invalid în {raw_rule.get('id')}")
            if target in explicit_targets:
                matching.append(raw_rule)
            continue
        try:
            if (
                raw_rule.get("targetChapter") == chapter
                and int(raw_rule.get("targetStartVerse")) <= verse
                and verse <= int(raw_rule.get("targetEndVerse"))
            ):
                matching.append(raw_rule)
        except (TypeError, ValueError):
            fail(f"source-lock.json: interval invalid în {raw_rule.get('id')}")
    if len(matching) > 1:
        fail(f"source-lock.json: reguli suprapuse pentru {book_id}.{chapter}.{verse}")
    if not matching:
        return ((chapter, verse),)

    rule = matching[0]
    explicit_targets = rule.get("targetReferences")
    if explicit_targets is not None:
        source_values = rule.get("sourceReferences")
        if not isinstance(source_values, list) or not source_values:
            fail(f"source-lock.json: sourceReferences lipsă în {rule.get('id')}")
        source_references = tuple(
            parse_source_reference(value, f"source-lock.json {rule.get('id')}")
            for value in source_values
        )
        mapping = rule.get("mapping")
        if mapping in {"split", "combine"}:
            return source_references
        if mapping == "pairwise":
            if len(explicit_targets) != len(source_references):
                fail(f"source-lock.json: mapare pairwise inegală în {rule.get('id')}")
            return (source_references[explicit_targets.index(target)],)
        fail(f"source-lock.json: mapping necunoscut în {rule.get('id')}")

    try:
        offset = verse - int(rule["targetStartVerse"])
        return ((int(rule["sourceChapter"]), int(rule["sourceStartVerse"]) + offset),)
    except (KeyError, TypeError, ValueError):
        fail(f"source-lock.json: mapare de interval invalidă în {rule.get('id')}")


class SourceStore:
    """Resolve and verify pinned USFM members without network access."""

    def __init__(self, data_dir: Path, source_lock: dict[str, Any]) -> None:
        self.data_dir = data_dir
        self.source_lock = source_lock
        self._snapshot_paths: dict[str, Path] = {}
        self._texts: dict[str, dict[tuple[int, int], str]] = {}

    def _snapshot_path(self, snapshot_id: str) -> Path:
        if snapshot_id in self._snapshot_paths:
            return self._snapshot_paths[snapshot_id]
        snapshots = self.source_lock.get("snapshots")
        if not isinstance(snapshots, dict) or not isinstance(snapshots.get(snapshot_id), dict):
            fail(f"source-lock.json: snapshot necunoscut {snapshot_id}")
        snapshot = snapshots[snapshot_id]
        path = safe_data_path(
            self.data_dir,
            snapshot.get("path"),
            f"source-lock.json snapshot {snapshot_id}",
        )
        if not path.is_file():
            fail(f"source-lock.json: arhiva snapshot lipsește: {path}")
        expected_hash = require_sha256(
            snapshot.get("sha256"),
            f"source-lock.json snapshot {snapshot_id}",
            prefixed=False,
        )
        if sha256_file(path) != expected_hash:
            fail(f"source-lock.json: hash snapshot stale pentru {snapshot_id}")
        if not zipfile.is_zipfile(path):
            fail(f"source-lock.json: snapshotul {snapshot_id} nu este ZIP")
        self._snapshot_paths[snapshot_id] = path
        return path

    def load(self, lock_id: str, book_id: str, role: str, language: str) -> dict[tuple[int, int], str]:
        if lock_id in self._texts:
            return self._texts[lock_id]
        files = self.source_lock.get("files")
        if not isinstance(files, dict) or not isinstance(files.get(lock_id), dict):
            fail(f"source-lock.json: fișier fixat lipsă pentru {lock_id}")
        record = files[lock_id]
        if record.get("bookId") != book_id:
            fail(f"source-lock.json: {lock_id} este legat de cartea greșită")
        if record.get("role") != role or record.get("language") != language:
            fail(f"source-lock.json: rol sau limbă invalidă pentru {lock_id}")
        if record.get("format") != "usfm":
            fail(f"source-lock.json: {lock_id} nu este USFM")
        snapshot_id = record.get("snapshotId")
        if not isinstance(snapshot_id, str):
            fail(f"source-lock.json: snapshotId invalid pentru {lock_id}")
        archive_path = record.get("archivePath")
        if (
            not isinstance(archive_path, str)
            or not archive_path
            or archive_path.startswith("/")
            or ".." in Path(archive_path).parts
        ):
            fail(f"source-lock.json: archivePath invalid pentru {lock_id}")
        expected_member_hash = require_sha256(
            record.get("sha256"),
            f"source-lock.json {lock_id}",
            prefixed=False,
        )
        snapshot_path = self._snapshot_path(snapshot_id)
        try:
            with zipfile.ZipFile(snapshot_path) as archive:
                raw = archive.read(archive_path)
        except KeyError:
            fail(f"source-lock.json: {archive_path} lipsește din snapshotul {snapshot_id}")
        except zipfile.BadZipFile:
            fail(f"source-lock.json: snapshot corupt {snapshot_id}")
        if sha256_bytes(raw) != expected_member_hash:
            fail(f"source-lock.json: hash membru stale pentru {lock_id}")
        texts = parse_usfm_verses(raw, f"source-lock.json {lock_id}")
        self._texts[lock_id] = texts
        return texts


def load_evidence_records(path: Path) -> list[dict[str, Any]]:
    try:
        payload = path.read_bytes()
    except FileNotFoundError:
        fail(
            f"lipsește artefactul per-verset {path}; acoperirea WLC/OSHB și auditul "
            "capitolelor nu reprezintă dovadă semantică"
        )
    except OSError as error:
        fail(f"artefactul de dovadă nu poate fi citit: {error}")
    if path.suffix == ".gz":
        try:
            payload = gzip.decompress(payload)
        except (gzip.BadGzipFile, EOFError, OSError):
            fail("artefactul gzip de dovadă este corupt")
    try:
        raw = payload.decode("utf-8")
    except UnicodeDecodeError:
        fail("artefactul de dovadă nu este UTF-8")
    if raw.startswith("\ufeff"):
        fail("artefactul de dovadă are BOM UTF-8")
    if unicodedata.normalize("NFC", raw) != raw:
        fail("artefactul de dovadă nu este Unicode NFC")
    lines = raw.splitlines()
    if not lines:
        fail("artefactul de dovadă este gol")
    records: list[dict[str, Any]] = []
    for line_number, line in enumerate(lines, start=1):
        if not line.strip():
            fail(f"artefactul de dovadă: linie goală la {line_number}")
        try:
            record = json.loads(line, object_pairs_hook=_reject_duplicate_json_keys)
        except json.JSONDecodeError as error:
            fail(f"artefactul de dovadă: JSON invalid la linia {line_number}: {error.msg}")
        if not isinstance(record, dict):
            fail(f"artefactul de dovadă: linia {line_number} nu este obiect JSON")
        records.append(record)
    return records


def _expected_chapter_ids(contract: ValidationContract) -> list[str]:
    return [
        f"{book_id}.{chapter}"
        for book_id, chapter_count in contract.book_chapters
        for chapter in range(1, chapter_count + 1)
    ]


def _load_target_verses(
    data_dir: Path,
    source_lock: dict[str, Any],
    ledger: dict[str, Any],
    contract: ValidationContract,
) -> list[tuple[str, str, int, int]]:
    books = source_lock.get("books")
    if not isinstance(books, dict):
        fail("source-lock.json: books lipsește")
    expected_books = [book_id for book_id, _ in contract.book_chapters]
    actual_ot_books = {
        book_id for book_id, book in books.items()
        if isinstance(book, dict) and book.get("testament") == "OT"
    }
    if actual_ot_books != set(expected_books):
        fail(
            "source-lock.json: canonul VT nu corespunde contractului; "
            f"lipsă={sorted(set(expected_books) - actual_ot_books)}, "
            f"suplimentare={sorted(actual_ot_books - set(expected_books))}"
        )
    for order, book_id in enumerate(expected_books, start=1):
        book = books[book_id]
        if book.get("order") != order:
            fail(f"source-lock.json: ordinea canonică este invalidă pentru {book_id}")

    ledger_chapters = ledger.get("chapters")
    if not isinstance(ledger_chapters, dict):
        fail("source-ledger.json: chapters lipsește")
    expected_chapters = _expected_chapter_ids(contract)
    actual_chapters = {
        chapter_id for chapter_id in ledger_chapters
        if isinstance(chapter_id, str) and chapter_id.split(".", 1)[0] in set(expected_books)
    }
    if actual_chapters != set(expected_chapters):
        fail(
            "source-ledger.json: capitolele VT nu corespund contractului; "
            f"lipsă={sorted(set(expected_chapters) - actual_chapters)[:8]}, "
            f"suplimentare={sorted(actual_chapters - set(expected_chapters))[:8]}"
        )

    targets: list[tuple[str, str, int, int]] = []
    for chapter_id in expected_chapters:
        book_id, chapter_text = chapter_id.split(".")
        chapter = int(chapter_text)
        ledger_record = ledger_chapters[chapter_id]
        if not isinstance(ledger_record, dict):
            fail(f"source-ledger.json: {chapter_id} nu este obiect")
        expected_verses = ledger_record.get("expectedVerses")
        if not isinstance(expected_verses, int) or expected_verses < 1:
            fail(f"source-ledger.json: expectedVerses invalid pentru {chapter_id}")
        verse_numbers = ledger_record.get("verseNumbers")
        if verse_numbers is None:
            verse_numbers = list(range(1, expected_verses + 1))
        if (
            not isinstance(verse_numbers, list)
            or len(verse_numbers) != expected_verses
            or any(not isinstance(number, int) or number < 1 for number in verse_numbers)
            or len(set(verse_numbers)) != len(verse_numbers)
            or verse_numbers != sorted(verse_numbers)
        ):
            fail(f"source-ledger.json: verseNumbers invalid pentru {chapter_id}")

        chapter_path = data_dir / f"{chapter_id}.json"
        chapter_data = load_json_object(chapter_path, chapter_path.name)
        if (
            chapter_data.get("translation") != "BE"
            or chapter_data.get("bookId") != book_id
            or chapter_data.get("chapter") != chapter
        ):
            fail(f"{chapter_path.name}: identitatea capitolului este invalidă")
        verses = chapter_data.get("verses")
        if not isinstance(verses, list):
            fail(f"{chapter_path.name}: verses trebuie să fie listă")
        actual_numbers: list[int] = []
        text_by_number: dict[int, str] = {}
        for item in verses:
            if not isinstance(item, dict):
                fail(f"{chapter_path.name}: verset invalid")
            number = item.get("number")
            text = item.get("text")
            if not isinstance(number, int) or number < 1 or number in text_by_number:
                fail(f"{chapter_path.name}: număr de verset invalid sau duplicat")
            if not isinstance(text, str) or not text.strip() or text != text.strip():
                fail(f"{chapter_path.name}: text invalid la versetul {number}")
            if unicodedata.normalize("NFC", text) != text:
                fail(f"{chapter_path.name}: text non-NFC la versetul {number}")
            actual_numbers.append(number)
            text_by_number[number] = text
        if actual_numbers != verse_numbers:
            fail(f"{chapter_path.name}: versetele nu corespund source-ledger.json")
        for verse in verse_numbers:
            reference = f"{book_id}.{chapter}.{verse}"
            targets.append((reference, text_by_number[verse], chapter, verse))

    if len(expected_chapters) != contract.expected_chapter_count:
        fail("contract intern invalid pentru numărul de capitole")
    if len(targets) != contract.expected_verse_count:
        fail(
            f"corpusul VT are {len(targets)} versete, dar contractul cere "
            f"{contract.expected_verse_count}"
        )
    return targets


def _source_payload(
    source_texts: dict[tuple[int, int], str],
    references: tuple[tuple[int, int], ...],
    owner: str,
) -> tuple[tuple[str, ...], str]:
    rendered_references: list[str] = []
    rows: list[str] = []
    for chapter, verse in references:
        reference = f"{chapter}:{verse}"
        text = source_texts.get((chapter, verse))
        if text is None:
            fail(f"{owner}: sursa fixată nu acoperă {reference}")
        rendered_references.append(reference)
        rows.append(f"{reference}\t{text}")
    return tuple(rendered_references), "\n".join(rows)


def _build_contexts(
    data_dir: Path,
    source_lock: dict[str, Any],
    targets: list[tuple[str, str, int, int]],
) -> list[VerseContext]:
    books = source_lock["books"]
    rules = source_lock.get("versificationRules")
    if not isinstance(rules, list):
        fail("source-lock.json: versificationRules trebuie să fie listă")
    store = SourceStore(data_dir, source_lock)
    source_cache: dict[str, tuple[str, dict[tuple[int, int], str], str, dict[tuple[int, int], str]]] = {}
    contexts: list[VerseContext] = []
    for reference, romanian, chapter, verse in targets:
        book_id = reference.split(".", 1)[0]
        if book_id not in source_cache:
            book = books[book_id]
            webu_lock_id = book.get("baseLockId")
            hebrew_lock_id = book.get("originalLockId")
            if not isinstance(webu_lock_id, str) or not isinstance(hebrew_lock_id, str):
                fail(f"source-lock.json: lock-uri sursă lipsă pentru {book_id}")
            webu_texts = store.load(webu_lock_id, book_id, "base", "en")
            hebrew_texts = store.load(hebrew_lock_id, book_id, "original", "he")
            source_cache[book_id] = (
                webu_lock_id,
                webu_texts,
                hebrew_lock_id,
                hebrew_texts,
            )
        webu_lock_id, webu_texts, hebrew_lock_id, hebrew_texts = source_cache[book_id]
        webu_refs = source_references_for_target(
            webu_lock_id, book_id, chapter, verse, rules
        )
        hebrew_refs = source_references_for_target(
            hebrew_lock_id, book_id, chapter, verse, rules
        )
        rendered_webu_refs, webu_payload = _source_payload(
            webu_texts, webu_refs, f"{reference} WEBU"
        )
        rendered_hebrew_refs, hebrew_payload = _source_payload(
            hebrew_texts, hebrew_refs, f"{reference} WLC/OSHB"
        )
        contexts.append(
            VerseContext(
                reference=reference,
                romanian=romanian,
                hebrew_lock_id=hebrew_lock_id,
                hebrew_references=rendered_hebrew_refs,
                hebrew_payload=hebrew_payload,
                webu_lock_id=webu_lock_id,
                webu_references=rendered_webu_refs,
                webu_payload=webu_payload,
            )
        )
    return contexts


def validate_record(record: dict[str, Any], context: VerseContext, line_number: int) -> None:
    owner = f"dovada {context.reference} (linia {line_number})"
    require_exact_keys(
        record,
        {
            "schemaVersion", "recordType", "reference", "texts",
            "bindingSha256", "checks", "status", "review", "recordSha256",
        },
        owner,
    )
    if record.get("schemaVersion") != 1 or record.get("recordType") != RECORD_TYPE:
        fail(f"{owner}: schema sau recordType invalid")
    if record.get("reference") != context.reference:
        fail(f"{owner}: referința nu corespunde versetului așteptat")

    texts = record.get("texts")
    if not isinstance(texts, dict):
        fail(f"{owner}: texts trebuie să fie obiect")
    require_exact_keys(texts, {"romanian", "hebrew", "webu"}, f"{owner}.texts")
    romanian = texts.get("romanian")
    if not isinstance(romanian, dict):
        fail(f"{owner}.texts.romanian trebuie să fie obiect")
    require_exact_keys(romanian, {"sha256"}, f"{owner}.texts.romanian")
    expected_romanian_hash = text_digest(context.romanian)
    require_sha256(romanian.get("sha256"), f"{owner}.texts.romanian.sha256")
    if romanian.get("sha256") != expected_romanian_hash:
        fail(f"{owner}: hash românesc stale")

    for name, expected_lock_id, expected_references, expected_payload in (
        ("hebrew", context.hebrew_lock_id, context.hebrew_references, context.hebrew_payload),
        ("webu", context.webu_lock_id, context.webu_references, context.webu_payload),
    ):
        source = texts.get(name)
        if not isinstance(source, dict):
            fail(f"{owner}.texts.{name} trebuie să fie obiect")
        require_exact_keys(source, {"lockId", "references", "sha256"}, f"{owner}.texts.{name}")
        if source.get("lockId") != expected_lock_id:
            fail(f"{owner}: lockId {name} nu corespunde source-lock.json")
        if source.get("references") != list(expected_references):
            fail(f"{owner}: referințele {name} nu corespund versificației fixate")
        require_sha256(source.get("sha256"), f"{owner}.texts.{name}.sha256")
        if source.get("sha256") != text_digest(expected_payload):
            label = "ebraic" if name == "hebrew" else "WEBU"
            fail(f"{owner}: hash {label} stale")

    require_sha256(record.get("bindingSha256"), f"{owner}.bindingSha256")
    if record.get("bindingSha256") != binding_digest(context.reference, texts):
        fail(f"{owner}: bindingSha256 stale")

    checks = record.get("checks")
    if not isinstance(checks, dict):
        fail(f"{owner}: checks trebuie să fie obiect")
    require_exact_keys(checks, set(CHECK_NAMES), f"{owner}.checks")
    for check_name in CHECK_NAMES:
        check = checks.get(check_name)
        check_owner = f"{owner}.checks.{check_name}"
        if not isinstance(check, dict):
            fail(f"{check_owner}: verdictul trebuie să fie obiect")
        require_exact_keys(check, {"verdict", "finding", "rationale"}, check_owner)
        verdict = check.get("verdict")
        finding = check.get("finding")
        rationale = check.get("rationale")
        if verdict not in {"approved", "unresolved"}:
            fail(f"{check_owner}: verdict invalid")
        if finding not in APPROVED_FINDINGS[check_name] | UNRESOLVED_FINDINGS:
            fail(f"{check_owner}: finding invalid")
        if not isinstance(rationale, str) or len(rationale.strip()) < 8:
            fail(f"{check_owner}: rationale concret lipsește")
        if rationale != rationale.strip():
            fail(f"{check_owner}: rationale are spații exterioare")
        if rationale in GENERIC_RATIONALES or not rationale.startswith(context.reference + ":"):
            fail(f"{check_owner}: rationale generic sau nelegat de referință")
        if verdict == "unresolved":
            fail(f"{check_owner}: verdict unresolved")
        if finding not in APPROVED_FINDINGS[check_name]:
            fail(f"{check_owner}: finding nerezolvat nu poate fi approved")

    status = record.get("status")
    if status not in {"approved", "unresolved"}:
        fail(f"{owner}: status invalid")
    if status == "unresolved":
        fail(f"{owner}: status unresolved")

    review = record.get("review")
    if not isinstance(review, dict):
        fail(f"{owner}: review trebuie să fie obiect")
    require_exact_keys(review, {"method", "reviewerId", "reviewedAt"}, f"{owner}.review")
    if review.get("method") != REVIEW_METHOD:
        fail(
            f"{owner}: review.method trebuie să dovedească comparația directă per-verset; "
            "coverage-only și auditul auto-declarat nu sunt acceptate"
        )
    reviewer_id = review.get("reviewerId")
    if (
        not isinstance(reviewer_id, str)
        or len(reviewer_id.strip()) < 3
        or reviewer_id != reviewer_id.strip()
        or reviewer_id.lower() in {"unknown", "coverage", "auto", "self-declared-audit"}
    ):
        fail(f"{owner}: reviewerId verificabil lipsește")
    if reviewer_id.startswith(DISQUALIFIED_REVIEWER_PREFIXES):
        fail(
            f"{owner}: evaluatorul local nu a trecut calibrarea controlată și nu poate "
            "constitui dovadă de publicare"
        )
    require_iso_date(review.get("reviewedAt"), f"{owner}.review.reviewedAt")

    require_sha256(record.get("recordSha256"), f"{owner}.recordSha256")
    if record.get("recordSha256") != record_digest(record):
        fail(f"{owner}: recordSha256 stale")


def _validate_repository(
    root: Path,
    evidence_path: Path | None,
    contract: ValidationContract,
) -> ValidationStats:
    root = root.resolve()
    data_dir = root / DATA_RELATIVE_PATH
    source_lock = load_json_object(data_dir / "source-lock.json", "source-lock.json")
    ledger = load_json_object(data_dir / "source-ledger.json", "source-ledger.json")
    targets = _load_target_verses(data_dir, source_lock, ledger, contract)
    contexts = _build_contexts(data_dir, source_lock, targets)

    resolved_evidence = evidence_path or data_dir / DEFAULT_EVIDENCE_NAME
    if not resolved_evidence.is_absolute():
        resolved_evidence = root / resolved_evidence
    records = load_evidence_records(resolved_evidence)
    if len(records) != contract.expected_verse_count:
        fail(
            f"artefactul are {len(records)} recorduri per-verset; sunt obligatorii "
            f"{contract.expected_verse_count}"
        )

    expected_references = [context.reference for context in contexts]
    seen: set[str] = set()
    actual_references: list[str] = []
    for line_number, record in enumerate(records, start=1):
        reference = record.get("reference")
        if not isinstance(reference, str) or not REFERENCE_PATTERN.fullmatch(reference):
            fail(
                f"artefactul de dovadă: linia {line_number} nu are referință per-verset; "
                "verdicturile la nivel de capitol sunt interzise"
            )
        if reference in seen:
            fail(f"artefactul de dovadă: referință duplicată {reference}")
        seen.add(reference)
        actual_references.append(reference)
    if set(actual_references) != set(expected_references):
        missing = [ref for ref in expected_references if ref not in seen]
        extra = [ref for ref in actual_references if ref not in set(expected_references)]
        fail(
            "artefactul nu acoperă exact canonul VT; "
            f"lipsă={missing[:8]}, suplimentare={extra[:8]}"
        )
    if actual_references != expected_references:
        fail("artefactul de dovadă nu respectă ordinea canonică per-verset")

    for line_number, (record, context) in enumerate(zip(records, contexts), start=1):
        validate_record(record, context, line_number)

    return ValidationStats(
        books=len(contract.book_chapters),
        chapters=contract.expected_chapter_count,
        verses=contract.expected_verse_count,
    )


def validate_repository(root: Path, evidence_path: Path | None = None) -> ValidationStats:
    """Run the non-configurable production contract: 39 books, 23,145 verses."""

    if len(CANONICAL_OT_CHAPTERS) != 39:
        fail("contract intern invalid: canonul VT trebuie să aibă 39 de cărți")
    if PRODUCTION_CONTRACT.expected_chapter_count != EXPECTED_OT_CHAPTER_COUNT:
        fail("contract intern invalid: VT trebuie să aibă 929 de capitole")
    return _validate_repository(root, evidence_path, PRODUCTION_CONTRACT)


def parse_args(argv: list[str]) -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Verifică dovada semantică per-verset pentru VT canonic."
    )
    parser.add_argument(
        "--root",
        type=Path,
        default=ROOT,
        help="Rădăcina repository-ului (implicit: repository-ul curent al scriptului).",
    )
    parser.add_argument(
        "--evidence",
        type=Path,
        default=None,
        help=(
            "Calea artefactului JSONL; implicit "
            "docs/data/biblia-emanus/ot-source-evidence.jsonl.gz."
        ),
    )
    return parser.parse_args(argv)


def main(argv: list[str] | None = None) -> int:
    args = parse_args(sys.argv[1:] if argv is None else argv)
    try:
        stats = validate_repository(args.root, args.evidence)
    except ValidationError as error:
        print(f"[ot-source-evidence] EROARE: {error}", file=sys.stderr)
        return 1
    print(
        "[ot-source-evidence] OK: "
        f"{stats.books} cărți, {stats.chapters} capitole, {stats.verses} versete "
        "cu surse fixate și dovadă semantică per-verset aprobată."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
