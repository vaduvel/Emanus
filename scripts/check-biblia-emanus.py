#!/usr/bin/env python3
"""Validate Biblia Emanus provenance, source snapshots, and publication gates."""

from __future__ import annotations

import hashlib
import json
import re
import sys
import unicodedata
import zipfile
from datetime import date
from difflib import SequenceMatcher
from pathlib import Path
from statistics import median
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "docs" / "data" / "biblia-emanus"
MANIFEST_PATH = DATA_DIR / "manifest.json"
SHA256_PATTERN = re.compile(r"^[0-9a-f]{64}$")
ISO_DATE_PATTERN = re.compile(r"^20[0-9]{2}-[01][0-9]-[0-3][0-9]$")
ALLOWED_STATUSES = {"draft", "in_review", "approved", "published"}
ALLOWED_REVIEW_VALUES = {"pending", "approved", "changes_requested"}
ALLOWED_NOTE_RESOLUTION_VALUES = {"pending", "needs_ai_review", "resolved"}
ROMANIAN_DIACRITICS = set("ăâîșțĂÂÎȘȚ")
FORBIDDEN_SEDILLA = set("şţŞŢ")
LEGACY_REVIEW_KEYS = {"romanianLanguage", "theologicalContext", "finalApproval"}
LEGACY_SOURCE_KEYS = {"sourceLanguage", "biblicalHebrew", "biblicalGreek"}
AUTOMATED_REVIEW_KEYS = {
    "aiSourceLanguage",
    "aiRomanianLanguage",
    "aiTheologicalContext",
    "omissionAddition",
    "benchmarkComparison",
    "copyrightDistance",
    "criticalIssues",
}
BENCHMARK_CHECK_KEYS = {
    "omissions",
    "additions",
    "meaning",
    "romanianNaturalness",
    "theologicalNeutrality",
    "copyrightSimilarity",
}
BOOK_NAMES = {
    "GEN": "Geneza", "EXO": "Exodul", "LEV": "Leviticul", "NUM": "Numeri",
    "DEU": "Deuteronomul", "JOS": "Iosua", "JDG": "Judecători", "RUT": "Rut",
    "1SA": "1 Samuel", "2SA": "2 Samuel", "1KI": "1 Regi", "2KI": "2 Regi",
    "1CH": "1 Cronici", "2CH": "2 Cronici", "EZR": "Ezra", "NEH": "Neemia",
    "EST": "Estera", "JOB": "Iov", "PSA": "Psalmii", "PRO": "Proverbele",
    "ECC": "Eclesiastul", "SNG": "Cântarea Cântărilor", "ISA": "Isaia",
    "JER": "Ieremia", "LAM": "Plângerile", "EZK": "Ezechiel", "DAN": "Daniel",
    "HOS": "Osea", "JOL": "Ioel", "AMO": "Amos", "OBA": "Obadia", "JON": "Iona",
    "MIC": "Mica", "NAM": "Naum", "HAB": "Habacuc", "ZEP": "Țefania",
    "HAG": "Hagai", "ZEC": "Zaharia", "MAL": "Maleahi", "MAT": "Matei",
    "MRK": "Marcu", "LUK": "Luca", "JHN": "Ioan", "ACT": "Faptele Apostolilor",
    "ROM": "Romani", "1CO": "1 Corinteni", "2CO": "2 Corinteni", "GAL": "Galateni",
    "EPH": "Efeseni", "PHP": "Filipeni", "COL": "Coloseni",
    "1TH": "1 Tesaloniceni", "2TH": "2 Tesaloniceni", "1TI": "1 Timotei",
    "2TI": "2 Timotei", "TIT": "Tit", "PHM": "Filimon", "HEB": "Evrei",
    "JAS": "Iacov", "1PE": "1 Petru", "2PE": "2 Petru", "1JN": "1 Ioan",
    "2JN": "2 Ioan", "3JN": "3 Ioan", "JUD": "Iuda", "REV": "Apocalipsa",
}
BOOK_ORDER = {book_id: index for index, book_id in enumerate(BOOK_NAMES, start=1)}
CHAPTER_ID_PATTERN = re.compile(r"^[A-Z0-9]{3}\.([1-9][0-9]*)$")
VERSE_ID_PATTERN = re.compile(r"^([A-Z0-9]{3})\.([1-9][0-9]*)\.([1-9][0-9]*)$")
USFM_CHAPTER_PATTERN = re.compile(r"^\\c\s+([1-9][0-9]*)\b")
USFM_VERSE_PATTERN = re.compile(r"^\\v\s+([1-9][0-9]*)(?:-[1-9][0-9]*)?\b")
USFM_VERSE_TEXT_PATTERN = re.compile(
    r"^\\v\s+([1-9][0-9]*)(?:-[1-9][0-9]*)?\s*(.*)$"
)
SBLGNT_VERSE_TEXT_PATTERN = re.compile(
    r"^[1-3]?[A-Za-z]+\s+([1-9][0-9]*):([1-9][0-9]*)\t(.+)$"
)
SOURCE_REFERENCE_PATTERN = re.compile(r"^([1-9][0-9]*):([1-9][0-9]*)$")
SBLGNT_COMMIT = "c4d241a9c1c479a55b989ba35a4976c1d0b8052c"
LEGACY_ENGINE_VERSION = "2.0.0"
NT_ENGINE_VERSION = "3.0.0"
NT_CHAPTER_COUNTS = {
    "MAT": 28, "MRK": 16, "LUK": 24, "JHN": 21, "ACT": 28, "ROM": 16,
    "1CO": 16, "2CO": 13, "GAL": 6, "EPH": 6, "PHP": 4, "COL": 4,
    "1TH": 5, "2TH": 3, "1TI": 6, "2TI": 4, "TIT": 3, "PHM": 1,
    "HEB": 13, "JAS": 5, "1PE": 5, "2PE": 3, "1JN": 5, "2JN": 1,
    "3JN": 1, "JUD": 1, "REV": 22,
}
FIXED_AUTOMATED_THRESHOLDS = {
    "minimumLengthRatio": 0.35,
    "maximumLengthRatio": 1.75,
    "minimumWordsForTokenOverlap": 8,
    "minimumRomanianTokenOverlap": 0.14,
    "maximumChapterSequenceSimilarity": 0.94,
}
FORBIDDEN_EDITORIAL_MARKERS = re.compile(
    r"(?:\bDE (?:TRADUS|DOCUMENTAT|VERIFICAT)\b|\b(?:TODO|TBD|FIXME)\b|<placeholder>)"
)


class ValidationError(Exception):
    pass


def fail(message: str) -> None:
    raise ValidationError(message)


def validate_iso_date(value: Any, owner: str) -> str:
    rendered = str(value)
    if not ISO_DATE_PATTERN.match(rendered):
        fail(f"{owner}: data trebuie să fie ISO YYYY-MM-DD")
    try:
        parsed = date.fromisoformat(rendered)
    except ValueError:
        fail(f"{owner}: data calendaristică este invalidă")
    if parsed.isoformat() != rendered:
        fail(f"{owner}: data nu este canonică")
    return rendered


def load_json(path: Path) -> dict[str, Any]:
    try:
        raw = path.read_text(encoding="utf-8")
    except FileNotFoundError:
        fail(f"Lipsește fișierul: {path.relative_to(ROOT)}")
    if raw.startswith("\ufeff"):
        fail(f"{path.name}: BOM UTF-8 nepermis")
    if unicodedata.normalize("NFC", raw) != raw:
        fail(f"{path.name}: conținutul nu este normalizat Unicode NFC")
    try:
        value = json.loads(raw)
    except json.JSONDecodeError as error:
        fail(f"{path.name}: JSON invalid la linia {error.lineno}: {error.msg}")
    if not isinstance(value, dict):
        fail(f"{path.name}: rădăcina trebuie să fie un obiect JSON")
    return value


def validate_no_editorial_placeholders(value: Any, owner: str = "chapter") -> None:
    """Reject unresolved production markers anywhere in a chapter payload."""
    if isinstance(value, dict):
        for key, child in value.items():
            validate_no_editorial_placeholders(child, f"{owner}.{key}")
        return
    if isinstance(value, list):
        for index, child in enumerate(value):
            validate_no_editorial_placeholders(child, f"{owner}[{index}]")
        return
    if isinstance(value, str):
        match = FORBIDDEN_EDITORIAL_MARKERS.search(value)
        if match:
            fail(f"{owner}: marcaj editorial nerezolvat {match.group(0)!r}")


def sha256_bytes(value: bytes) -> str:
    return hashlib.sha256(value).hexdigest()


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def validate_relative_file(owner: str, relative_name: Any) -> Path:
    if not isinstance(relative_name, str) or not relative_name.strip():
        fail(f"{owner}: lipsește calea fișierului")
    path = (DATA_DIR / relative_name).resolve()
    try:
        path.relative_to(DATA_DIR.resolve())
    except ValueError:
        fail(f"{owner}: calea trebuie să rămână în docs/data/biblia-emanus")
    if not path.is_file():
        fail(f"{owner}: fișierul {relative_name} lipsește")
    return path


def validate_manifest(manifest: dict[str, Any]) -> dict[str, Path]:
    expected = {
        "id": "biblia-emanus",
        "abbreviation": "BE",
        "language": "ro",
        "canon": "protestant-66",
        "status": "draft",
        "publicationBlock": "automated-audit-required",
        "licenseDecision": "CC BY 4.0",
    }
    for key, value in expected.items():
        if manifest.get(key) != value:
            fail(f"manifest.json: {key} trebuie să fie {value!r}")
    if not isinstance(manifest.get("public"), bool):
        fail("manifest.json: public trebuie să fie boolean")

    required_files = {
        "sourceLedger": "source-ledger.json",
        "sourceLock": "source-lock.json",
        "onomastics": "onomastics.json",
    }
    paths: dict[str, Path] = {}
    for key, expected_name in required_files.items():
        if manifest.get(key) != expected_name:
            fail(f"manifest.json: {key} trebuie să fie {expected_name}")
        paths[key] = validate_relative_file("manifest.json", expected_name)
    versification_name = manifest.get("newTestamentVersification")
    if versification_name is not None:
        if versification_name != "nt-versification.json":
            fail("manifest.json: newTestamentVersification trebuie să fie nt-versification.json")
        paths["newTestamentVersification"] = validate_relative_file(
            "manifest.json", versification_name
        )

    method = manifest.get("translationMethod")
    if not isinstance(method, dict):
        fail("manifest.json: lipsește translationMethod")
    expected_method = {
        "baseText": "World English Bible Updated, Protestant Edition",
        "aiOutputIsDraftOnly": False,
        "aiMayPublishAfterAutomatedAudit": True,
        "benchmarkIsVerificationNotSource": True,
        "romanianDiacriticsRequired": True,
        "unicodeNormalization": "NFC",
    }
    for key, value in expected_method.items():
        if method.get(key) != value:
            fail(f"manifest.json: translationMethod.{key} trebuie să fie {value!r}")

    gate = manifest.get("automatedPublicationGate")
    if not isinstance(gate, dict):
        fail("manifest.json: lipsește automatedPublicationGate")
    expected_gate = {
        "humanApprovalRequired": False,
        "publishWhenAllChecksApproved": True,
        "minimumRomanianBenchmarks": 3,
        "exactMatchRequired": False,
    }
    for key, value in expected_gate.items():
        if gate.get(key) != value:
            fail(f"manifest.json: automatedPublicationGate.{key} trebuie să fie {value!r}")
    families = gate.get("requiredBenchmarkFamilies")
    if not isinstance(families, list) or "cornilescu" not in families:
        fail("manifest.json: comparația trebuie să includă familia Cornilescu")
    required_checks = gate.get("requiredChecks")
    mandatory_checks = {
        "source-snapshot-integrity",
        "source-versification-coverage",
        "pinned-romanian-benchmark-comparison",
        "deterministic-verse-integrity",
        "audit-text-digest",
    }
    if not isinstance(required_checks, list) or not mandatory_checks.issubset(required_checks):
        fail("manifest.json: lista requiredChecks este incompletă")
    policy_document = gate.get("policyDocument")
    if policy_document != "../../biblia-emanus/AUTOMATED-PUBLICATION.md":
        fail("manifest.json: policyDocument nu corespunde politicii aprobate")
    if not (DATA_DIR / policy_document).resolve().is_file():
        fail("manifest.json: documentul politicii de publicare lipsește")

    sources = manifest.get("sources")
    if not isinstance(sources, dict):
        fail("manifest.json: lipsesc sursele")
    english = sources.get("english")
    old_testament = sources.get("oldTestament")
    new_testament = sources.get("newTestament")
    if not all(isinstance(value, dict) for value in (english, old_testament, new_testament)):
        fail("manifest.json: sursele trebuie documentate complet")
    if english.get("id") != "engwebp" or english.get("license") != "Public Domain":
        fail("manifest.json: baza engleză trebuie să fie engwebp, Public Domain")
    if english.get("url") != "https://ebible.org/engwebp/":
        fail("manifest.json: URL-ul bazei engleze este invalid")
    if "nu va fi numit World English Bible" not in str(english.get("trademarkNotice", "")):
        fail("manifest.json: lipsește protecția mărcii World English Bible")
    if old_testament.get("id") != "WLC-OSHB":
        fail("manifest.json: sursa ebraică trebuie să fie WLC-OSHB")
    if old_testament.get("textLicense") != "Public Domain":
        fail("manifest.json: licența textului WLC trebuie documentată")
    if new_testament.get("id") != "SBLGNT" or new_testament.get("license") != "CC BY 4.0":
        fail("manifest.json: sursa greacă trebuie să fie SBLGNT, CC BY 4.0")
    romanian_benchmarks = sources.get("romanianBenchmarks")
    if not isinstance(romanian_benchmarks, list) or len(romanian_benchmarks) not in {3, 4}:
        fail("manifest.json: trebuie declarate trei sau patru etaloane românești")
    benchmark_ids = {item.get("id") for item in romanian_benchmarks if isinstance(item, dict)}
    if not {"CORNILESCU-1924", "BTF", "NTR"}.issubset(benchmark_ids):
        fail("manifest.json: etaloanele românești declarate sunt incorecte")
    if benchmark_ids.difference({"CORNILESCU-1924", "BTF", "BIBLIA-LIBERA", "NTR"}):
        fail("manifest.json: există un etalon românesc neaprobat")
    for item in romanian_benchmarks:
        if not isinstance(item, dict) or item.get("mode") != "comparison-only":
            fail("manifest.json: fiecare etalon românesc trebuie folosit comparison-only")
        if item.get("id") in {"CORNILESCU-1924", "BTF", "BIBLIA-LIBERA"}:
            if item.get("license") != "Public Domain" or item.get("pinned") is not True:
                fail(f"manifest.json: etalonul {item.get('id')} trebuie fixat și public-domain")
        elif item.get("fullTextStored") is not False:
            fail("manifest.json: textul integral NTR nu poate fi stocat")

    license_data = manifest.get("license")
    if not isinstance(license_data, dict):
        fail("manifest.json: lipsește licența traducerii")
    if license_data.get("id") != "CC-BY-4.0":
        fail("manifest.json: licența trebuie să fie CC-BY-4.0")
    if license_data.get("attributionRequired") is not True:
        fail("manifest.json: atribuirea trebuie să fie obligatorie")
    attributions = license_data.get("attributions")
    if not isinstance(attributions, list) or len(attributions) < 4:
        fail("manifest.json: lipsesc atribuirile obligatorii")

    return paths


def validate_ledger(
    ledger: dict[str, Any],
    source_data: dict[str, Any],
) -> dict[str, dict[str, Any]]:
    if ledger.get("schemaVersion") != 1 or ledger.get("translation") != "BE":
        fail("source-ledger.json: schemă sau traducere invalidă")
    policy = ledger.get("policy")
    if not isinstance(policy, dict):
        fail("source-ledger.json: lipsește policy")
    required_policy = {
        "englishLicense": "Public Domain",
        "oldTestamentTextLicense": "Public Domain",
        "requireExactChapterUrls": True,
        "requireCanonicalVerseCount": True,
        "sourceLanguageReviewStillRequired": True,
        "requirePinnedSourceSnapshot": True,
        "requireVersificationMapping": True,
    }
    for key, value in required_policy.items():
        if policy.get(key) != value:
            fail(f"source-ledger.json: policy.{key} trebuie să fie {value!r}")
    if ledger.get("sourceLock") != "source-lock.json":
        fail("source-ledger.json: sourceLock trebuie să fie source-lock.json")

    chapters = ledger.get("chapters")
    if not isinstance(chapters, dict) or not chapters:
        fail("source-ledger.json: lista chapters este goală")
    normalized: dict[str, dict[str, Any]] = {}
    for chapter_id, record in chapters.items():
        if not isinstance(chapter_id, str) or not CHAPTER_ID_PATTERN.match(chapter_id):
            fail(f"source-ledger.json: identificator invalid {chapter_id!r}")
        if not isinstance(record, dict):
            fail(f"source-ledger.json: {chapter_id} trebuie să fie obiect")
        book_id, chapter_text = chapter_id.split(".")
        if book_id not in source_data["books"]:
            fail(f"source-ledger.json: {book_id} lipsește din source-lock.json")
        testament = source_data["books"][book_id]["testament"]
        verse_numbers = record.get("verseNumbers")
        expected_verses = record.get("expectedVerses")
        if testament == "NT":
            if (
                not isinstance(verse_numbers, list)
                or not verse_numbers
                or any(not isinstance(value, int) or value < 1 for value in verse_numbers)
                or verse_numbers != sorted(set(verse_numbers))
            ):
                fail(f"source-ledger.json: verseNumbers invalid pentru {chapter_id}")
            if expected_verses != len(verse_numbers):
                fail(f"source-ledger.json: expectedVerses trebuie derivat din verseNumbers pentru {chapter_id}")
            reference_note_numbers = record.get("referenceNoteNumbers", [])
            if (
                not isinstance(reference_note_numbers, list)
                or any(not isinstance(value, int) or value < 1 for value in reference_note_numbers)
                or reference_note_numbers != sorted(set(reference_note_numbers))
                or set(reference_note_numbers).intersection(verse_numbers)
            ):
                fail(f"source-ledger.json: referenceNoteNumbers invalid pentru {chapter_id}")
            textual_statuses = record.get("textualStatuses", [])
            if not isinstance(textual_statuses, list):
                fail(f"source-ledger.json: textualStatuses invalid pentru {chapter_id}")
            covered_status_numbers: set[int] = set()
            for status_index, textual_status in enumerate(textual_statuses, start=1):
                if not isinstance(textual_status, dict):
                    fail(f"source-ledger.json: statut textual invalid {chapter_id}#{status_index}")
                numbers = textual_status.get("verseNumbers")
                if (
                    textual_status.get("status") != "double-bracketed"
                    or not isinstance(numbers, list)
                    or not numbers
                    or any(number not in verse_numbers for number in numbers)
                    or covered_status_numbers.intersection(numbers)
                ):
                    fail(f"source-ledger.json: interval textual invalid {chapter_id}#{status_index}")
                covered_status_numbers.update(numbers)
        else:
            if not isinstance(expected_verses, int) or expected_verses < 1:
                fail(f"source-ledger.json: expectedVerses invalid pentru {chapter_id}")
            if verse_numbers is not None and verse_numbers != list(range(1, expected_verses + 1)):
                fail(f"source-ledger.json: verseNumbers OT nu corespunde pentru {chapter_id}")
            verse_numbers = list(range(1, expected_verses + 1))
        record["verseNumbers"] = verse_numbers
        if not str(record.get("englishUrl", "")).startswith("https://ebible.org/engwebp/"):
            fail(f"source-ledger.json: englishUrl invalid pentru {chapter_id}")
        source_url_key = "hebrewUrl" if testament == "OT" else "greekUrl"
        source_url = str(record.get(source_url_key, ""))
        source_url_valid = (
            source_url.startswith("https://ebible.org/hboWLC/")
            if testament == "OT"
            else source_url.startswith(
                f"https://github.com/LogosBible/SBLGNT/blob/{SBLGNT_COMMIT}/"
            )
        )
        if not source_url_valid:
            fail(f"source-ledger.json: {source_url_key} invalid pentru {chapter_id}")
        variants = record.get("textualVariantReview", [])
        if not isinstance(variants, list):
            fail(f"source-ledger.json: textualVariantReview invalid pentru {chapter_id}")
        for verse_id in variants:
            match = VERSE_ID_PATTERN.match(str(verse_id))
            if not match or ".".join(match.groups()[:2]) != chapter_id:
                fail(f"source-ledger.json: varianta {verse_id!r} nu aparține de {chapter_id}")
            if int(match.group(3)) not in verse_numbers:
                fail(f"source-ledger.json: verset inexistent în {verse_id}")
        expected_rule_ids = [
            rule["id"]
            for rule in source_data["rules"]
            if rule["bookId"] == book_id
            and (
                rule.get("targetChapter") == int(chapter_text)
                or any(
                    int(reference.split(":", 1)[0]) == int(chapter_text)
                    for reference in rule.get("targetReferences", [])
                )
            )
        ]
        actual_rule_ids = record.get("versificationRuleIds", [])
        if actual_rule_ids != expected_rule_ids:
            fail(f"source-ledger.json: reguli de versificație incorecte pentru {chapter_id}")
        normalized[chapter_id] = record
    return normalized


def strip_usfm_text(value: str) -> str:
    value = re.sub(r"\\(?:f|x)\s.*?\\(?:f|x)\*", " ", value)
    value = re.sub(r"\\w\s+([^|\\]+)(?:\|[^\\]*)?\\w\*", r"\1", value)
    value = re.sub(r"\\[+a-zA-Z0-9-]+\*?", " ", value)
    value = re.sub(r"\|\S+", " ", value)
    return re.sub(r"\s+", " ", value).strip()


def parse_usfm_verses(
    raw: bytes,
    label: str,
    *,
    allow_empty: bool = False,
) -> dict[tuple[int, int], str]:
    try:
        text = raw.decode("utf-8-sig")
    except UnicodeDecodeError:
        fail(f"source-lock.json: {label} nu este UTF-8")
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
                fail(f"source-lock.json: {label} are verset înainte de capitol")
            reference = (chapter, int(verse_match.group(1)))
            if reference in verses:
                fail(f"source-lock.json: referință duplicată {reference} în {label}")
            verse_text = strip_usfm_text(verse_match.group(2))
            if not verse_text:
                if allow_empty:
                    current_reference = None
                    continue
                fail(f"source-lock.json: text gol la {label} {reference[0]}:{reference[1]}")
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
        fail(f"source-lock.json: {label} nu conține versete")
    return verses


def parse_sblgnt_verses(raw: bytes, label: str) -> dict[tuple[int, int], str]:
    try:
        text = raw.decode("utf-8-sig")
    except UnicodeDecodeError:
        fail(f"source-lock.json: {label} nu este UTF-8")
    verses: dict[tuple[int, int], str] = {}
    for line in text.splitlines():
        match = SBLGNT_VERSE_TEXT_PATTERN.match(line)
        if not match:
            continue
        reference = (int(match.group(1)), int(match.group(2)))
        if reference in verses:
            fail(f"source-lock.json: referință duplicată {reference} în {label}")
        verse_text = match.group(3).strip()
        if not verse_text:
            fail(f"source-lock.json: text gol la {label} {reference[0]}:{reference[1]}")
        verses[reference] = verse_text
    if not verses:
        fail(f"source-lock.json: {label} nu conține versete SBLGNT")
    return verses


def parse_source_references(owner: str, values: Any) -> set[tuple[int, int]]:
    if values is None:
        return set()
    if not isinstance(values, list):
        fail(f"source-lock.json: {owner} trebuie să fie listă")
    references: set[tuple[int, int]] = set()
    for value in values:
        match = SOURCE_REFERENCE_PATTERN.match(str(value))
        if not match:
            fail(f"source-lock.json: referință invalidă {value!r} în {owner}")
        reference = (int(match.group(1)), int(match.group(2)))
        if reference in references:
            fail(f"source-lock.json: referință duplicată {value!r} în {owner}")
        references.add(reference)
    return references


def parse_locked_source(
    raw: bytes,
    label: str,
    record: dict[str, Any],
) -> dict[tuple[int, int], str]:
    source_format = record.get("format", "usfm")
    if source_format == "usfm":
        return parse_usfm_verses(
            raw,
            label,
            allow_empty=record.get("allowEmptyVerses") is True,
        )
    if source_format == "sblgnt-plaintext":
        return parse_sblgnt_verses(raw, label)
    fail(f"source-lock.json: format necunoscut pentru {label}: {source_format!r}")


def validate_source_lock(lock: dict[str, Any]) -> dict[str, Any]:
    schema_version = lock.get("schemaVersion")
    if schema_version not in {2, 3} or lock.get("translation") != "BE":
        fail("source-lock.json: schemă sau traducere invalidă")
    expected_engine = NT_ENGINE_VERSION if schema_version == 3 else LEGACY_ENGINE_VERSION
    if lock.get("engineVersion") != expected_engine:
        fail(f"source-lock.json: engineVersion trebuie să fie {expected_engine}")
    validate_iso_date(lock.get("capturedOn"), "source-lock.json capturedOn")

    snapshots = lock.get("snapshots") if schema_version == 3 else {"legacy": lock.get("snapshot")}
    if not isinstance(snapshots, dict) or not snapshots:
        fail("source-lock.json: lipsesc snapshoturile")
    snapshot_paths: dict[str, Path] = {}
    snapshot_hashes: dict[str, str] = {}
    for snapshot_id, snapshot in snapshots.items():
        if not isinstance(snapshot_id, str) or not snapshot_id or not isinstance(snapshot, dict):
            fail("source-lock.json: snapshot invalid")
        snapshot_path = validate_relative_file(
            f"source-lock.json snapshot {snapshot_id}", snapshot.get("path")
        )
        snapshot_hash = snapshot.get("sha256")
        if not isinstance(snapshot_hash, str) or not SHA256_PATTERN.match(snapshot_hash):
            fail(f"source-lock.json: hash invalid pentru snapshotul {snapshot_id}")
        if sha256_file(snapshot_path) != snapshot_hash:
            fail(f"source-lock.json: hash-ul snapshotului {snapshot_id} nu corespunde")
        snapshot_paths[snapshot_id] = snapshot_path
        snapshot_hashes[snapshot_id] = snapshot_hash

    upstream = lock.get("upstreamArtifacts")
    if not isinstance(upstream, dict) or len(upstream) < 4:
        fail("source-lock.json: lipsesc arhivele upstream și etaloanele românești")
    for source_id, record in upstream.items():
        if not isinstance(record, dict):
            fail(f"source-lock.json: upstream {source_id} invalid")
        if not str(record.get("url", "")).startswith("https://"):
            fail(f"source-lock.json: URL upstream invalid pentru {source_id}")
        validate_iso_date(record.get("archiveDate"), f"source-lock.json {source_id}.archiveDate")
        if not SHA256_PATTERN.match(str(record.get("sha256", ""))):
            fail(f"source-lock.json: hash upstream invalid pentru {source_id}")
        if schema_version == 3:
            if record.get("language") not in {"en", "he", "el", "ro", "ro-Cyrl"}:
                fail(f"source-lock.json: limba upstream este invalidă pentru {source_id}")
            if record.get("snapshotId") not in snapshots:
                fail(f"source-lock.json: snapshot upstream invalid pentru {source_id}")
            embedded = record.get("archiveEmbedded")
            if embedded not in {True, False}:
                fail(f"source-lock.json: archiveEmbedded lipsește pentru {source_id}")
            if embedded is False and record.get("snapshotId") != "ot-legacy":
                fail(f"source-lock.json: numai snapshotul OT moștenit poate declara arhiva neîncorporată")
            if embedded is True:
                archive_path = record.get("archivePath")
                if not isinstance(archive_path, str) or archive_path.startswith("/") or ".." in Path(archive_path).parts:
                    fail(f"source-lock.json: archivePath upstream invalid pentru {source_id}")

    books = lock.get("books")
    if not isinstance(books, dict) or not books:
        fail("source-lock.json: books trebuie să fie un obiect nevid")
    for book_id, book in books.items():
        if book_id not in BOOK_NAMES or not isinstance(book, dict):
            fail(f"source-lock.json: carte invalidă {book_id!r}")
        if book.get("name") != BOOK_NAMES[book_id]:
            fail(f"source-lock.json: numele cărții {book_id} este invalid")
        if book.get("testament") not in {"OT", "NT"}:
            fail(f"source-lock.json: testament invalid pentru {book_id}")
        if not isinstance(book.get("order"), int) or book["order"] < 1:
            fail(f"source-lock.json: order invalid pentru {book_id}")
        benchmark_ids = book.get("benchmarkLockIds")
        external_ids = book.get("externalBenchmarkIds")
        if not isinstance(benchmark_ids, list) or len(benchmark_ids) < 2:
            fail(f"source-lock.json: {book_id} cere minimum două etaloane fixate")
        if not isinstance(external_ids, list) or not external_ids:
            fail(f"source-lock.json: {book_id} cere minimum un etalon extern")

    files = lock.get("files")
    if not isinstance(files, dict) or not files:
        fail("source-lock.json: lista fișierelor fixate este goală")

    artifacts = lock.get("artifacts", {})
    if not isinstance(artifacts, dict):
        fail("source-lock.json: artifacts trebuie să fie obiect")
    expected_names_by_snapshot: dict[str, set[str]] = {
        snapshot_id: set() for snapshot_id in snapshots
    }
    if schema_version == 3:
        for source_id, record in upstream.items():
            if record.get("archiveEmbedded") is True:
                expected_names_by_snapshot[record["snapshotId"]].add(record["archivePath"])

    texts: dict[str, dict[tuple[int, int], str]] = {}
    for lock_id, record in files.items():
            if not isinstance(record, dict):
                fail(f"source-lock.json: înregistrare invalidă pentru {lock_id}")
            snapshot_id = record.get("snapshotId", "legacy")
            if snapshot_id not in snapshots:
                fail(f"source-lock.json: snapshotId invalid pentru {lock_id}")
            archive_path = record.get("archivePath")
            if not isinstance(archive_path, str) or archive_path.startswith("/") or ".." in Path(archive_path).parts:
                fail(f"source-lock.json: archivePath invalid pentru {lock_id}")
            expected_names_by_snapshot[snapshot_id].add(archive_path)
            if record.get("bookId") not in books:
                fail(f"source-lock.json: bookId este invalid pentru {lock_id}")
            if record.get("language") not in {"en", "he", "el", "ro", "ro-Cyrl"}:
                fail(f"source-lock.json: limba este invalidă pentru {lock_id}")
            if record.get("role") not in {"base", "original", "original-supplement", "benchmark"}:
                fail(f"source-lock.json: rolul este invalid pentru {lock_id}")
            source_id = record.get("sourceId")
            if source_id not in upstream:
                fail(f"source-lock.json: sourceId invalid pentru {lock_id}")
            if schema_version == 3 and record.get("language") != upstream[source_id].get("language"):
                fail(f"source-lock.json: limba lui {lock_id} nu corespunde sursei upstream")
            parse_source_references(f"{lock_id}.missingTargetReferences", record.get("missingTargetReferences"))
            parse_source_references(f"{lock_id}.extraSourceReferences", record.get("extraSourceReferences"))

    for artifact_id, record in artifacts.items():
        if not isinstance(record, dict):
            fail(f"source-lock.json: artifact invalid pentru {artifact_id}")
        snapshot_id = record.get("snapshotId")
        if snapshot_id not in snapshots:
            fail(f"source-lock.json: snapshot invalid pentru artifactul {artifact_id}")
        archive_path = record.get("archivePath")
        if not isinstance(archive_path, str) or archive_path.startswith("/") or ".." in Path(archive_path).parts:
            fail(f"source-lock.json: archivePath invalid pentru artifactul {artifact_id}")
        if not SHA256_PATTERN.match(str(record.get("sha256", ""))):
            fail(f"source-lock.json: hash invalid pentru artifactul {artifact_id}")
        expected_names_by_snapshot[snapshot_id].add(archive_path)

    for snapshot_id, snapshot_path in snapshot_paths.items():
        with zipfile.ZipFile(snapshot_path) as archive:
            archive_names = set(archive.namelist())
            expected_names = expected_names_by_snapshot[snapshot_id]
            if archive_names != expected_names:
                missing = sorted(expected_names - archive_names)[:5]
                extra = sorted(archive_names - expected_names)[:5]
                fail(
                    f"source-lock.json: inventar invalid în snapshotul {snapshot_id}; "
                    f"lipsesc={missing}, extra={extra}"
                )
            for source_id, record in upstream.items():
                if record.get("snapshotId") == snapshot_id and record.get("archiveEmbedded") is True:
                    raw = archive.read(record["archivePath"])
                    if sha256_bytes(raw) != record["sha256"]:
                        fail(f"source-lock.json: arhiva upstream {source_id} nu corespunde hashului")
            for lock_id, record in files.items():
                if record.get("snapshotId", "legacy") != snapshot_id:
                    continue
                raw = archive.read(record["archivePath"])
                if sha256_bytes(raw) != record.get("sha256"):
                    fail(f"source-lock.json: hash invalid pentru {lock_id}")
                texts[lock_id] = parse_locked_source(raw, lock_id, record)
            for artifact_id, record in artifacts.items():
                if record.get("snapshotId") != snapshot_id:
                    continue
                if sha256_bytes(archive.read(record["archivePath"])) != record["sha256"]:
                    fail(f"source-lock.json: hash invalid pentru artifactul {artifact_id}")

    rules = lock.get("versificationRules")
    if not isinstance(rules, list):
        fail("source-lock.json: versificationRules trebuie să fie listă")
    rule_ids: set[str] = set()
    for index, rule in enumerate(rules, start=1):
        if not isinstance(rule, dict):
            fail(f"source-lock.json: regula de versificație {index} este invalidă")
        rule_id = rule.get("id")
        if not isinstance(rule_id, str) or not rule_id or rule_id in rule_ids:
            fail(f"source-lock.json: id invalid pentru regula {index}")
        rule_ids.add(rule_id)
        source_lock_id = rule.get("sourceLockId")
        if source_lock_id not in files or files[source_lock_id].get("role") not in {
            "base", "original", "original-supplement", "benchmark"
        }:
            fail(f"source-lock.json: sursă invalidă în regula {rule_id}")
        if rule.get("bookId") not in books or files[source_lock_id].get("bookId") != rule["bookId"]:
            fail(f"source-lock.json: carte invalidă în regula {rule_id}")
        if "targetReferences" in rule or "sourceReferences" in rule:
            targets = rule.get("targetReferences")
            sources = rule.get("sourceReferences")
            mapping = rule.get("mapping")
            if (
                not isinstance(targets, list)
                or not targets
                or not isinstance(sources, list)
                or not sources
                or mapping not in {"split", "combine", "pairwise"}
            ):
                fail(f"source-lock.json: mapare explicită invalidă în regula {rule_id}")
            parse_source_references(f"regula {rule_id}.targetReferences", targets)
            parse_source_references(f"regula {rule_id}.sourceReferences", sources)
            if mapping == "split" and len(sources) != 1:
                fail(f"source-lock.json: regula split {rule_id} cere o singură sursă")
            if mapping == "combine" and len(targets) != 1:
                fail(f"source-lock.json: regula combine {rule_id} cere o singură țintă")
            if mapping == "pairwise" and len(targets) != len(sources):
                fail(f"source-lock.json: regula pairwise {rule_id} cere liste egale")
        else:
            integer_keys = (
                "targetChapter",
                "targetStartVerse",
                "targetEndVerse",
                "sourceChapter",
                "sourceStartVerse",
            )
            if any(not isinstance(rule.get(key), int) or rule[key] < 1 for key in integer_keys):
                fail(f"source-lock.json: interval invalid în regula {rule_id}")
            if rule["targetEndVerse"] < rule["targetStartVerse"]:
                fail(f"source-lock.json: interval inversat în regula {rule_id}")
    for book_id, book in books.items():
        base_id = book.get("baseLockId")
        original_id = book.get("originalLockId")
        supplemental_ids = book.get("supplementalOriginalLockIds", [])
        if base_id not in files or files[base_id].get("role") != "base":
            fail(f"source-lock.json: baza fixată lipsește pentru {book_id}")
        if original_id not in files or files[original_id].get("role") != "original":
            fail(f"source-lock.json: originalul fixat lipsește pentru {book_id}")
        if not isinstance(supplemental_ids, list) or any(
            lock_id not in files or files[lock_id].get("role") != "original-supplement"
            for lock_id in supplemental_ids
        ):
            fail(f"source-lock.json: martorii greci suplimentari sunt invalizi pentru {book_id}")
        required_ids = [base_id, original_id, *supplemental_ids, *book["benchmarkLockIds"]]
        if any(lock_id not in files for lock_id in required_ids):
            fail(f"source-lock.json: surse incomplete pentru {book_id}")
        if any(files[lock_id].get("bookId") != book_id for lock_id in required_ids):
            fail(f"source-lock.json: o sursă este legată de cartea greșită pentru {book_id}")
        if any(files[lock_id].get("role") != "benchmark" for lock_id in book["benchmarkLockIds"]):
            fail(f"source-lock.json: etalon invalid pentru {book_id}")
        snapshot_ids = {files[lock_id].get("snapshotId", "legacy") for lock_id in required_ids}
        if len(snapshot_ids) != 1:
            fail(f"source-lock.json: sursele cărții {book_id} trebuie sigilate împreună")
        if book["testament"] == "NT":
            original_file = files[original_id]
            original_upstream = upstream[original_file["sourceId"]]
            if (
                original_file.get("language") != "el"
                or original_file.get("format") != "sblgnt-plaintext"
                or original_upstream.get("version") != "1.2"
                or original_upstream.get("commit") != SBLGNT_COMMIT
                or original_upstream.get("license") != "CC BY 4.0"
            ):
                fail(f"source-lock.json: {book_id} cere SBLGNT 1.2 fixat la commitul oficial")
            if not supplemental_ids or not any(
                upstream[files[lock_id]["sourceId"]].get("textFamily") == "Textus Receptus"
                and upstream[files[lock_id]["sourceId"]].get("license") == "Public Domain"
                for lock_id in supplemental_ids
            ):
                fail(f"source-lock.json: {book_id} cere un martor grec TR public-domain")

    thresholds = lock.get("automatedThresholds")
    if thresholds != FIXED_AUTOMATED_THRESHOLDS:
        fail("source-lock.json: pragurile motorului sunt fixe și nu pot fi relaxate")

    return {
        "books": books,
        "files": files,
        "texts": texts,
        "references": {lock_id: set(verses) for lock_id, verses in texts.items()},
        "rules": rules,
        "ruleIds": rule_ids,
        "thresholds": thresholds,
        "artifacts": artifacts,
        "snapshotSha256": next(iter(snapshot_hashes.values())) if len(snapshot_hashes) == 1 else None,
        "snapshotSha256ByBook": {
            book_id: snapshot_hashes[files[book["baseLockId"]].get("snapshotId", "legacy")]
            for book_id, book in books.items()
        },
        "snapshotIdsByBook": {
            book_id: files[book["baseLockId"]].get("snapshotId", "legacy")
            for book_id, book in books.items()
        },
    }


def source_references_for_target(
    source_lock_id: str,
    book_id: str,
    chapter: int,
    verse: int,
    rules: list[dict[str, Any]],
) -> tuple[tuple[int, int], ...]:
    matching = [
        rule
        for rule in rules
        if rule["sourceLockId"] == source_lock_id
        and rule["bookId"] == book_id
        and (
            (
                "targetReferences" in rule
                and f"{chapter}:{verse}" in rule["targetReferences"]
            )
            or (
                "targetReferences" not in rule
                and rule["targetChapter"] == chapter
                and rule["targetStartVerse"] <= verse <= rule["targetEndVerse"]
            )
        )
    ]
    if len(matching) > 1:
        fail(f"source-lock.json: reguli suprapuse pentru {book_id}.{chapter}.{verse}")
    if not matching:
        return ((chapter, verse),)
    rule = matching[0]
    if "targetReferences" in rule:
        target_index = rule["targetReferences"].index(f"{chapter}:{verse}")
        mapping = rule.get("mapping")
        source_references = tuple(
            tuple(map(int, reference.split(":")))
            for reference in rule["sourceReferences"]
        )
        if mapping == "split":
            return source_references
        if mapping == "combine":
            return source_references
        if mapping == "pairwise":
            return (source_references[target_index],)
        fail(f"source-lock.json: mapping necunoscut în regula {rule['id']}")
    offset = verse - rule["targetStartVerse"]
    return ((rule["sourceChapter"], rule["sourceStartVerse"] + offset),)


def source_reference_for_target(
    source_lock_id: str,
    book_id: str,
    chapter: int,
    verse: int,
    rules: list[dict[str, Any]],
) -> tuple[int, int]:
    """Compatibility helper for legacy one-to-one versification tests."""
    references = source_references_for_target(
        source_lock_id, book_id, chapter, verse, rules
    )
    if len(references) != 1:
        fail(f"source-lock.json: maparea pentru {book_id}.{chapter}.{verse} nu este unu-la-unu")
    return references[0]


def validate_source_coverage(
    ledger_chapters: dict[str, dict[str, Any]],
    source_data: dict[str, Any],
) -> None:
    references = source_data["references"]
    books = source_data["books"]
    files = source_data["files"]
    rules = source_data["rules"]
    targets_by_book: dict[str, set[tuple[int, int]]] = {
        book_id: set() for book_id in books
    }
    for chapter_id, record in ledger_chapters.items():
        book_id, chapter_text = chapter_id.split(".")
        chapter = int(chapter_text)
        for verse in record["verseNumbers"]:
            targets_by_book[book_id].add((chapter, verse))

    for lock_id, source_references in references.items():
        record = files[lock_id]
        book_id = record["bookId"]
        target_references = targets_by_book[book_id]
        mapped_references = {
            source_reference
            for chapter, verse in target_references
            for source_reference in source_references_for_target(
                lock_id, book_id, chapter, verse, rules
            )
        }
        actual_missing_targets = {
            target
            for target in target_references
            if not all(
                source_reference in source_references
                for source_reference in source_references_for_target(
                    lock_id, book_id, *target, rules
                )
            )
        }
        actual_extra_sources = source_references - mapped_references
        declared_missing = parse_source_references(
            f"{lock_id}.missingTargetReferences", record.get("missingTargetReferences")
        )
        declared_extra = parse_source_references(
            f"{lock_id}.extraSourceReferences", record.get("extraSourceReferences")
        )
        if actual_missing_targets != declared_missing:
            fail(
                f"source-lock.json: lipsurile declarate nu corespund pentru {lock_id}; "
                f"calculate={sorted(actual_missing_targets)[:8]}, "
                f"declarate={sorted(declared_missing)[:8]}"
            )
        if actual_extra_sources != declared_extra:
            fail(
                f"source-lock.json: referințele suplimentare nu corespund pentru {lock_id}; "
                f"calculate={sorted(actual_extra_sources)[:8]}, "
                f"declarate={sorted(declared_extra)[:8]}"
            )
        if record["role"] == "benchmark" and declared_missing:
            fail(f"source-lock.json: etalonul fixat {lock_id} nu poate avea versete lipsă")

    for book_id, target_references in targets_by_book.items():
        book = books[book_id]
        original_ids = [
            book["originalLockId"],
            *book.get("supplementalOriginalLockIds", []),
        ]
        for target in target_references:
            if not any(
                all(
                    source_reference in references[lock_id]
                    for source_reference in source_references_for_target(
                        lock_id, book_id, *target, rules
                    )
                )
                for lock_id in original_ids
            ):
                fail(
                    f"source-lock.json: {book_id} {target[0]}:{target[1]} "
                    "nu este acoperit de niciun martor în limba originală"
                )


def chapter_text_digest(data: dict[str, Any]) -> str:
    canonical = "\n".join(f"{verse['number']}\t{verse['text']}" for verse in data["verses"])
    return "sha256:" + hashlib.sha256(canonical.encode("utf-8")).hexdigest()


def chapter_content_digest(data: dict[str, Any]) -> str:
    protected = {
        key: data.get(key)
        for key in (
            "translation",
            "bookId",
            "bookName",
            "chapter",
            "source",
            "review",
            "benchmark",
            "verses",
            "editorialNotes",
            "referenceNotes",
            "alternateEndings",
        )
    }
    canonical = json.dumps(
        protected,
        ensure_ascii=False,
        sort_keys=True,
        separators=(",", ":"),
    )
    return "sha256:" + hashlib.sha256(canonical.encode("utf-8")).hexdigest()


CYRILLIC_ROMANIAN = str.maketrans(
    {
        "а": "a", "б": "b", "в": "v", "г": "g", "д": "d", "е": "e",
        "ж": "j", "з": "z", "и": "i", "й": "i", "к": "c", "л": "l",
        "м": "m", "н": "n", "о": "o", "п": "p", "р": "r", "с": "s",
        "т": "t", "у": "u", "ф": "f", "х": "h", "ц": "ț", "ч": "c",
        "ш": "ș", "ы": "î", "ь": "", "э": "ă", "ю": "iu", "я": "ea",
        "ӂ": "g", "А": "A", "Б": "B", "В": "V", "Г": "G", "Д": "D",
        "Е": "E", "Ж": "J", "З": "Z", "И": "I", "Й": "I", "К": "C",
        "Л": "L", "М": "M", "Н": "N", "О": "O", "П": "P", "Р": "R",
        "С": "S", "Т": "T", "У": "U", "Ф": "F", "Х": "H", "Ц": "Ț",
        "Ч": "C", "Ш": "Ș", "Ы": "Î", "Э": "Ă", "Ю": "Iu", "Я": "Ea",
        "Ӂ": "G",
    }
)


def normalize_for_comparison(value: str) -> str:
    value = value.translate(CYRILLIC_ROMANIAN).lower()
    value = unicodedata.normalize("NFKD", value)
    value = "".join(character for character in value if not unicodedata.combining(character))
    return " ".join(re.findall(r"[^\W\d_]+", value, flags=re.UNICODE))


def validate_automated_audit(
    path: Path,
    data: dict[str, Any],
    status: str,
    source_snapshot_hash: str,
    expected_verses: int,
    pinned_benchmark_count: int,
    external_benchmark_count: int,
    testament: str | None = None,
    verse_numbers: list[int] | None = None,
) -> None:
    if status not in {"approved", "published"}:
        return
    audit = data.get("audit")
    expected_schema = 2 if testament == "NT" else 1
    if not isinstance(audit, dict) or audit.get("schemaVersion") != expected_schema:
        fail(f"{path.name}: lipsește auditul AI complet")
    expected_engine = NT_ENGINE_VERSION if testament == "NT" else LEGACY_ENGINE_VERSION
    if audit.get("engineVersion") != expected_engine or audit.get("reviewLevel") != "ai-complete":
        fail(f"{path.name}: auditul nu a fost încheiat de motorul curent")
    validate_iso_date(audit.get("completedOn"), f"{path.name} audit.completedOn")
    reviewer = audit.get("reviewAgent")
    if not isinstance(reviewer, dict) or reviewer.get("type") != "ai":
        fail(f"{path.name}: auditul semantic trebuie executat de un agent AI")
    if not isinstance(reviewer.get("engine"), str) or not reviewer["engine"].strip():
        fail(f"{path.name}: motorul AI nu este identificat")
    if reviewer.get("method") != "verse-by-verse-source-and-benchmark":
        fail(f"{path.name}: metoda auditului AI este invalidă")
    if audit.get("textDigest") != chapter_text_digest(data):
        fail(f"{path.name}: auditul AI nu corespunde textului curent")
    if expected_schema == 2 and audit.get("contentDigest") != chapter_content_digest(data):
        fail(f"{path.name}: auditul AI nu corespunde notelor și deciziilor editoriale")
    if audit.get("sourceSnapshotSha256") != source_snapshot_hash:
        fail(f"{path.name}: auditul AI nu corespunde snapshotului curent")

    expected_numbers = verse_numbers or list(range(1, expected_verses + 1))
    expected_coverage = {
        "expected": expected_verses,
        "reviewed": expected_verses,
        "continuous": expected_numbers == list(range(1, max(expected_numbers) + 1)),
    }
    if testament == "NT":
        expected_coverage["verseNumbersSha256"] = "sha256:" + hashlib.sha256(
            ",".join(map(str, expected_numbers)).encode("ascii")
        ).hexdigest()
    coverage = audit.get("verseCoverage")
    if not isinstance(coverage, dict) or coverage != expected_coverage:
        fail(f"{path.name}: acoperirea auditului verset cu verset este incompletă")
    source_review = audit.get("sourceLanguage")
    if not isinstance(source_review, dict) or source_review.get("result") != "approved":
        fail(f"{path.name}: revizia AI din limba-sursă nu este aprobată")
    if not isinstance(source_review.get("scope"), str) or not source_review["scope"].strip():
        fail(f"{path.name}: revizia limbii-sursă nu are domeniu documentat")
    if testament == "NT" and (
        source_review.get("language") != "greacă koine"
        or source_review.get("text") != "SBLGNT 1.2 + aparat; Textus Receptus ca martor suplimentar"
    ):
        fail(f"{path.name}: auditul NT nu identifică exact sursele grecești")
    if testament == "OT" and source_review.get("language") != "ebraică biblică":
        fail(f"{path.name}: auditul OT nu identifică limba ebraică")
    romanian_review = audit.get("romanianLanguage")
    if not isinstance(romanian_review, dict) or romanian_review.get("result") != "approved":
        fail(f"{path.name}: revizia AI a limbii române nu este aprobată")
    changes = romanian_review.get("changesApplied")
    if not isinstance(changes, list) or not changes or not all(
        isinstance(item, str) and item.strip() for item in changes
    ):
        fail(f"{path.name}: revizia românească nu are decizii documentate")
    theological = audit.get("theologicalContext")
    if not isinstance(theological, dict) or theological.get("result") != "approved":
        fail(f"{path.name}: revizia teologică și canonică nu este aprobată")
    principles = theological.get("principles")
    if not isinstance(principles, list) or not principles or not all(
        isinstance(item, str) and item.strip() for item in principles
    ):
        fail(f"{path.name}: revizia teologică nu are principii documentate")
    omission = audit.get("omissionAddition")
    if not isinstance(omission, dict) or omission.get("result") != "approved":
        fail(f"{path.name}: controlul omisiunilor și adaosurilor nu este aprobat")
    if omission.get("omissions") != 0 or omission.get("additions") != 0:
        fail(f"{path.name}: auditul declară omisiuni sau adaosuri")
    copyright_review = audit.get("copyrightDistance")
    if not isinstance(copyright_review, dict) or copyright_review.get("result") != "approved":
        fail(f"{path.name}: controlul distanței de copyright nu este aprobat")
    if not isinstance(copyright_review.get("method"), str) or not copyright_review["method"].strip():
        fail(f"{path.name}: controlul copyright nu are metodă documentată")
    critical = audit.get("criticalIssues")
    if not isinstance(critical, dict) or critical.get("result") != "approved" or critical.get("open") != 0:
        fail(f"{path.name}: există probleme critice deschise")
    benchmark_evidence = audit.get("benchmarkEvidence")
    expected_evidence = {
        "pinnedBenchmarks": pinned_benchmark_count,
        "externalBenchmarks": external_benchmark_count,
        "result": "approved",
    }
    if benchmark_evidence != expected_evidence:
        fail(f"{path.name}: dovada triangulării românești este incompletă")


def validate_onomastics(data: dict[str, Any]) -> list[str]:
    if data.get("schemaVersion") != 1 or data.get("translation") != "BE":
        fail("onomastics.json: schemă sau traducere invalidă")
    entries = data.get("entries")
    if not isinstance(entries, list) or not entries:
        fail("onomastics.json: entries trebuie să fie o listă nevidă")
    forbidden: list[str] = []
    canonical_names: set[str] = set()
    for index, entry in enumerate(entries, start=1):
        if not isinstance(entry, dict):
            fail(f"onomastics.json: intrarea {index} este invalidă")
        canonical = entry.get("canonical")
        forms = entry.get("forbiddenForms")
        if not isinstance(canonical, str) or not canonical.strip() or canonical in canonical_names:
            fail(f"onomastics.json: nume canonic invalid la intrarea {index}")
        if not isinstance(forms, list) or not forms or not all(isinstance(item, str) and item for item in forms):
            fail(f"onomastics.json: forbiddenForms invalid la intrarea {index}")
        canonical_names.add(canonical)
        forbidden.extend(forms)
    if len(forbidden) != len(set(forbidden)):
        fail("onomastics.json: forme interzise duplicate")
    return forbidden


def validate_review(path: Path, review: Any, status: str) -> None:
    if not isinstance(review, dict):
        fail(f"{path.name}: lipsește obiectul review")
    if status in {"draft", "in_review"}:
        legacy_source = LEGACY_SOURCE_KEYS.intersection(review)
        legacy_valid = LEGACY_REVIEW_KEYS.issubset(review) and len(legacy_source) == 1
        automated_valid = AUTOMATED_REVIEW_KEYS.issubset(review)
        if not legacy_valid and not automated_valid:
            fail(f"{path.name}: schema de review pentru ciornă este incompletă")
        keys = (LEGACY_REVIEW_KEYS | legacy_source) if legacy_valid else AUTOMATED_REVIEW_KEYS
    else:
        if not AUTOMATED_REVIEW_KEYS.issubset(review):
            missing = sorted(AUTOMATED_REVIEW_KEYS.difference(review))
            fail(f"{path.name}: publicarea automată cere review-urile: {', '.join(missing)}")
        keys = AUTOMATED_REVIEW_KEYS
    for key in keys:
        if review.get(key) not in ALLOWED_REVIEW_VALUES:
            fail(f"{path.name}: valoare review invalidă pentru {key}")
    if status in {"approved", "published"} and any(review[key] != "approved" for key in keys):
        fail(f"{path.name}: un capitol {status} cere toate controalele AI aprobate")


def validate_benchmark(
    path: Path,
    benchmark: Any,
    status: str,
    minimum: int,
    book_id: str,
    source_data: dict[str, Any],
) -> None:
    if status not in {"approved", "published"}:
        return
    if not isinstance(benchmark, dict):
        fail(f"{path.name}: lipsește benchmark pentru publicarea automată")
    translations = benchmark.get("translationsConsulted")
    if not isinstance(translations, list) or len(translations) < minimum:
        fail(f"{path.name}: sunt necesare minimum {minimum} traduceri românești")
    ids: set[str] = set()
    families: set[str] = set()
    for index, item in enumerate(translations, start=1):
        if not isinstance(item, dict):
            fail(f"{path.name}: benchmarkul {index} trebuie să fie obiect")
        translation_id = item.get("id")
        family = item.get("family")
        mode = item.get("mode")
        reference_url = item.get("referenceUrl")
        if not isinstance(translation_id, str) or not translation_id.strip():
            fail(f"{path.name}: benchmarkul {index} nu are id")
        if not isinstance(family, str) or not family.strip():
            fail(f"{path.name}: benchmarkul {index} nu are family")
        if mode != "comparison-only":
            fail(f"{path.name}: benchmarkul {translation_id} trebuie folosit comparison-only")
        if not isinstance(reference_url, str) or not reference_url.startswith("https://"):
            fail(f"{path.name}: benchmarkul {translation_id} nu are URL HTTPS")
        ids.add(translation_id)
        families.add(family.lower())
    if len(ids) < minimum:
        fail(f"{path.name}: benchmarkurile trebuie să fie distincte")
    if "cornilescu" not in families:
        fail(f"{path.name}: benchmarkul trebuie să includă familia Cornilescu")
    book = source_data["books"][book_id]
    files = source_data["files"]
    expected_ids = {
        files[lock_id]["benchmarkId"] for lock_id in book["benchmarkLockIds"]
    } | set(book["externalBenchmarkIds"])
    if ids != expected_ids:
        fail(
            f"{path.name}: etaloanele trebuie să fie exact "
            f"{', '.join(sorted(expected_ids))}"
        )
    if benchmark.get("exactTextCopied") is not False:
        fail(f"{path.name}: exactTextCopied trebuie să fie false")
    if benchmark.get("fullProtectedTextsStored") is not False:
        fail(f"{path.name}: textele protejate nu pot fi stocate integral")
    checks = benchmark.get("checks")
    if not isinstance(checks, dict):
        fail(f"{path.name}: lipsesc verificările benchmarkului")
    missing = BENCHMARK_CHECK_KEYS.difference(checks)
    if missing:
        fail(f"{path.name}: lipsesc verificările benchmark: {', '.join(sorted(missing))}")
    if any(checks[key] != "approved" for key in BENCHMARK_CHECK_KEYS):
        fail(f"{path.name}: toate verificările benchmark trebuie aprobate")


def validate_pinned_benchmark_comparison(
    path: Path,
    data: dict[str, Any],
    source_data: dict[str, Any],
) -> int:
    book_id = data["bookId"]
    chapter = data["chapter"]
    book = source_data["books"][book_id]
    lock_ids = book["benchmarkLockIds"]
    thresholds = source_data["thresholds"]
    minimum_words = int(thresholds["minimumWordsForTokenOverlap"])
    chapter_texts: dict[str, list[str]] = {lock_id: [] for lock_id in lock_ids}
    emanus_chapter: list[str] = []

    for verse in data["verses"]:
        reference = (chapter, verse["number"])
        emanus = normalize_for_comparison(verse["text"])
        benchmark_texts = [
            normalize_for_comparison(source_data["texts"][lock_id][reference])
            for lock_id in lock_ids
        ]
        benchmark_lengths = [len(text.split()) for text in benchmark_texts]
        expected_length = median(benchmark_lengths)
        length_ratio = len(emanus.split()) / expected_length
        if not thresholds["minimumLengthRatio"] <= length_ratio <= thresholds["maximumLengthRatio"]:
            fail(
                f"{path.name}: lungime suspectă la versetul {verse['number']} "
                f"(raport {length_ratio:.2f})"
            )
        if len(emanus.split()) >= minimum_words:
            emanus_tokens = set(emanus.split())
            overlaps = []
            for benchmark_text in benchmark_texts:
                benchmark_tokens = set(benchmark_text.split())
                union = emanus_tokens | benchmark_tokens
                overlaps.append(len(emanus_tokens & benchmark_tokens) / max(1, len(union)))
            if max(overlaps) < thresholds["minimumRomanianTokenOverlap"]:
                fail(
                    f"{path.name}: convergență lexicală prea mică la versetul "
                    f"{verse['number']} ({max(overlaps):.2f})"
                )
        emanus_chapter.append(emanus)
        for lock_id, benchmark_text in zip(lock_ids, benchmark_texts):
            chapter_texts[lock_id].append(benchmark_text)

    normalized_emanus = " ".join(emanus_chapter)
    for lock_id, values in chapter_texts.items():
        similarity = SequenceMatcher(None, normalized_emanus, " ".join(values)).ratio()
        if similarity > thresholds["maximumChapterSequenceSimilarity"]:
            fail(
                f"{path.name}: similaritate prea mare cu {lock_id} "
                f"({similarity:.3f}); verifică redactarea independentă"
            )
    return len(data["verses"])


def validate_editorial_notes(
    path: Path,
    notes: Any,
    verse_numbers: list[int] | int,
    textual_variants: list[str],
    status: str,
) -> int:
    if isinstance(verse_numbers, int):
        verse_numbers = list(range(1, verse_numbers + 1))
    if not isinstance(notes, list):
        fail(f"{path.name}: editorialNotes trebuie să fie o listă")
    noted_verses: set[int] = set()
    for index, note in enumerate(notes, start=1):
        if not isinstance(note, dict):
            fail(f"{path.name}: nota editorială {index} nu este obiect")
        verse = note.get("verse")
        if not isinstance(verse, int) or verse not in verse_numbers:
            fail(f"{path.name}: verset invalid în nota editorială {index}")
        if not isinstance(note.get("term"), str) or not note["term"].strip():
            fail(f"{path.name}: lipsește termenul în nota editorială {index}")
        if not isinstance(note.get("decision"), str) or not note["decision"].strip():
            fail(f"{path.name}: lipsește decizia în nota editorială {index}")
        alternatives = note.get("alternatives")
        if alternatives is not None:
            if not isinstance(alternatives, list) or not all(
                isinstance(value, str) and value.strip() for value in alternatives
            ):
                fail(f"{path.name}: alternatives invalid în nota {index}")
            if note.get("reviewRequired") is not True:
                fail(f"{path.name}: nota {index} cu alternative trebuie marcată reviewRequired")
        if note.get("reviewRequired") is True:
            resolution_status = note.get("resolutionStatus")
            if resolution_status not in ALLOWED_NOTE_RESOLUTION_VALUES:
                fail(f"{path.name}: resolutionStatus invalid în nota {index}")
            if resolution_status == "resolved" and (
                not isinstance(note.get("resolutionReason"), str)
                or not note["resolutionReason"].strip()
            ):
                fail(f"{path.name}: nota {index} rezolvată nu are motivare")
        if status in {"approved", "published"} and note.get("reviewRequired") is True:
            if note.get("resolutionStatus") != "resolved":
                fail(f"{path.name}: nota {index} trebuie rezolvată înainte de publicare")
            if not isinstance(note.get("resolutionReason"), str) or not note["resolutionReason"].strip():
                fail(f"{path.name}: nota {index} nu are motivarea rezoluției")
        noted_verses.add(verse)

    for verse_id in textual_variants:
        verse_number = int(verse_id.rsplit(".", 1)[1])
        if verse_number not in noted_verses:
            fail(f"{path.name}: varianta textuală {verse_id} nu are notă editorială")
    return len(notes)


def validate_reference_notes(
    path: Path,
    notes: Any,
    expected_numbers: list[int],
    reference_note_numbers: list[int],
    status: str,
) -> int:
    if notes is None:
        notes = []
    if not isinstance(notes, list):
        fail(f"{path.name}: referenceNotes trebuie să fie o listă")
    actual_numbers: list[int] = []
    for index, note in enumerate(notes, start=1):
        if not isinstance(note, dict):
            fail(f"{path.name}: nota critică {index} nu este obiect")
        number = note.get("number")
        if not isinstance(number, int) or number in expected_numbers:
            fail(f"{path.name}: referință critică invalidă la nota {index}")
        if note.get("status") != "not-in-critical-main-text":
            fail(f"{path.name}: statut critic invalid la referința {number}")
        for key in ("reason", "greekWitnesses", "displayNote"):
            if not isinstance(note.get(key), str) or not note[key].strip():
                fail(f"{path.name}: {key} lipsește la referința critică {number}")
        traditional = note.get("traditionalReading")
        if traditional is not None and (
            not isinstance(traditional, str) or not traditional.strip()
        ):
            fail(f"{path.name}: citirea tradițională este invalidă la referința {number}")
        if status in {"approved", "published"} and note.get("resolutionStatus") != "resolved":
            fail(f"{path.name}: referința critică {number} nu este rezolvată")
        actual_numbers.append(number)
    if actual_numbers != reference_note_numbers:
        fail(f"{path.name}: referințele critice nu corespund registrului")
    return len(notes)


def validate_textual_statuses(
    path: Path,
    verses: list[dict[str, Any]],
    expected_statuses: list[dict[str, Any]],
) -> None:
    expected: dict[int, str] = {
        number: record["status"]
        for record in expected_statuses
        for number in record["verseNumbers"]
    }
    for verse in verses:
        number = verse["number"]
        actual = verse.get("textualStatus")
        if number in expected:
            if actual != expected[number]:
                fail(f"{path.name}: statutul textual lipsește la versetul {number}")
        elif actual is not None:
            fail(f"{path.name}: statut textual neașteptat la versetul {number}")


def validate_alternate_endings(
    path: Path,
    endings: Any,
    expected: bool,
    status: str,
) -> int:
    if endings is None:
        endings = []
    if not isinstance(endings, list):
        fail(f"{path.name}: alternateEndings trebuie să fie listă")
    if expected != bool(endings):
        fail(f"{path.name}: finalul alternativ nu corespunde registrului")
    for index, ending in enumerate(endings, start=1):
        if not isinstance(ending, dict):
            fail(f"{path.name}: final alternativ invalid la poziția {index}")
        if ending.get("status") != "alternate-unnumbered":
            fail(f"{path.name}: statut invalid pentru finalul alternativ")
        if not isinstance(ending.get("text"), str) or not ending["text"].strip():
            fail(f"{path.name}: finalul alternativ nu are text")
        if not isinstance(ending.get("sourceNote"), str) or not ending["sourceNote"].strip():
            fail(f"{path.name}: finalul alternativ nu are proveniență")
        if status in {"approved", "published"} and ending.get("resolutionStatus") != "resolved":
            fail(f"{path.name}: finalul alternativ nu este rezolvat")
    return len(endings)


def validate_chapter(
    path: Path,
    data: dict[str, Any],
    manifest: dict[str, Any],
    ledger_chapters: dict[str, dict[str, Any]],
    source_data: dict[str, Any],
    forbidden_names: list[str],
) -> tuple[str, int, int, str, int]:
    status_hint = data.get("status")
    if status_hint in {"approved", "published"}:
        validate_no_editorial_placeholders(data, path.name)
    if data.get("translation") != "BE":
        fail(f"{path.name}: translation trebuie să fie BE")
    book_id = data.get("bookId")
    chapter = data.get("chapter")
    if not isinstance(book_id, str) or book_id not in source_data["books"]:
        fail(f"{path.name}: bookId necunoscut sau neînregistrat")
    book = source_data["books"][book_id]
    if data.get("bookName") != book["name"]:
        fail(f"{path.name}: bookName nu corespunde lui {book_id}")
    if not isinstance(chapter, int) or chapter < 1:
        fail(f"{path.name}: chapter invalid")
    if path.name != f"{book_id}.{chapter}.json":
        fail(f"{path.name}: numele fișierului nu corespunde capitolului")
    chapter_id = f"{book_id}.{chapter}"
    ledger_record = ledger_chapters.get(chapter_id)
    if ledger_record is None:
        fail(f"{path.name}: lipsește în source-ledger.json")

    status = data.get("status")
    if status not in ALLOWED_STATUSES:
        fail(f"{path.name}: status invalid")
    if data.get("public") != (status == "published"):
        fail(f"{path.name}: public trebuie să fie adevărat numai pentru published")

    validate_review(path, data.get("review"), status)
    gate = manifest["automatedPublicationGate"]
    validate_benchmark(
        path,
        data.get("benchmark"),
        status,
        gate["minimumRomanianBenchmarks"],
        book_id,
        source_data,
    )

    source = data.get("source")
    if not isinstance(source, dict):
        fail(f"{path.name}: lipsește source")
    english = source.get("english")
    hebrew = source.get("hebrew")
    greek = source.get("greek")
    if not isinstance(english, dict):
        fail(f"{path.name}: fiecare capitol cere sursa engleză fixată")
    if book["testament"] == "OT" and not isinstance(hebrew, dict):
        fail(f"{path.name}: Vechiul Testament cere sursa ebraică")
    if book["testament"] == "NT" and not isinstance(greek, dict):
        fail(f"{path.name}: Noul Testament cere sursa greacă SBLGNT")
    if book["testament"] == "OT" and "greek" in source:
        fail(f"{path.name}: un capitol din Vechiul Testament nu poate declara sursă greacă")
    if book["testament"] == "NT" and "hebrew" in source:
        fail(f"{path.name}: un capitol din Noul Testament nu poate declara sursă ebraică")
    if english.get("version") != "WEBU-Protestant" or english.get("license") != "Public Domain":
        fail(f"{path.name}: sursa engleză este invalidă")
    if english.get("lockId") != book["baseLockId"]:
        fail(f"{path.name}: lockId englez nu corespunde snapshotului")
    if english.get("passageUrl") != ledger_record.get("englishUrl"):
        fail(f"{path.name}: URL-ul englez nu corespunde registrului")
    if book["testament"] == "OT":
        if hebrew.get("version") != "WLC-OSHB" or hebrew.get("textLicense") != "Public Domain":
            fail(f"{path.name}: sursa ebraică este invalidă")
        if hebrew.get("lockId") != book["originalLockId"]:
            fail(f"{path.name}: lockId ebraic nu corespunde snapshotului")
        if hebrew.get("passageUrl") != ledger_record.get("hebrewUrl"):
            fail(f"{path.name}: URL-ul ebraic nu corespunde registrului")
    else:
        if (
            greek.get("version") != "SBLGNT-1.2"
            or greek.get("commit") != SBLGNT_COMMIT
            or greek.get("license") != "CC BY 4.0"
            or greek.get("lockId") != book["originalLockId"]
            or greek.get("passageUrl") != ledger_record.get("greekUrl")
        ):
            fail(f"{path.name}: sursa greacă SBLGNT nu corespunde snapshotului fixat")
        supplemental = greek.get("supplementalWitnesses")
        expected_supplemental = book.get("supplementalOriginalLockIds", [])
        if not isinstance(supplemental, list) or [
            item.get("lockId") if isinstance(item, dict) else None for item in supplemental
        ] != expected_supplemental:
            fail(f"{path.name}: martorii greci suplimentari nu corespund registrului")
        for item in supplemental:
            if item.get("language") != "greacă" or item.get("role") != "textual-witness":
                fail(f"{path.name}: martor grec suplimentar invalid")

    expected_verses = ledger_record["expectedVerses"]
    expected_numbers = ledger_record["verseNumbers"]
    verses = data.get("verses")
    if not isinstance(verses, list) or len(verses) != expected_verses:
        fail(f"{path.name}: numărul versetelor nu corespunde registrului")
    actual_numbers: list[int] = []
    combined_text: list[str] = []
    for index, verse in enumerate(verses, start=1):
        if not isinstance(verse, dict):
            fail(f"{path.name}: versetul {index} nu este obiect")
        number = verse.get("number")
        text = verse.get("text")
        if not isinstance(number, int):
            fail(f"{path.name}: număr invalid la poziția {index}")
        if not isinstance(text, str) or not text.strip() or text != text.strip():
            fail(f"{path.name}: text invalid la versetul {number}")
        if unicodedata.normalize("NFC", text) != text:
            fail(f"{path.name}: versetul {number} nu este Unicode NFC")
        if any(character in FORBIDDEN_SEDILLA for character in text):
            fail(f"{path.name}: diacritice cu sedilă la versetul {number}")
        if "\ufffd" in text or '"' in text:
            fail(f"{path.name}: caracter deteriorat sau ghilimele ASCII la versetul {number}")
        folded_text = text.casefold()
        for forbidden_name in forbidden_names:
            if forbidden_name.casefold() in folded_text:
                fail(
                    f"{path.name}: forma onomastică interzisă {forbidden_name!r} "
                    f"la versetul {number}"
                )
        actual_numbers.append(number)
        combined_text.append(text)
    if actual_numbers != expected_numbers:
        fail(f"{path.name}: numerele versetelor nu corespund exact registrului")
    validate_textual_statuses(
        path,
        verses,
        ledger_record.get("textualStatuses", []),
    )

    full_text = " ".join(combined_text)
    placeholder_draft = (
        status in {"draft", "in_review"}
        and any(FORBIDDEN_EDITORIAL_MARKERS.search(value) for value in combined_text)
    )
    if not placeholder_draft and not ROMANIAN_DIACRITICS.intersection(full_text):
        fail(f"{path.name}: textul nu conține diacritice românești")
    if full_text.count("„") != full_text.count("”"):
        fail(f"{path.name}: ghilimelele românești sunt neechilibrate")
    if full_text.count("«") != full_text.count("»"):
        fail(f"{path.name}: ghilimelele interioare sunt neechilibrate")
    quote_pairs = {"„": "”", "«": "»"}
    closing_quotes = set(quote_pairs.values())
    quote_stack: list[str] = []
    for character in full_text:
        if character in quote_pairs:
            quote_stack.append(quote_pairs[character])
        elif character in closing_quotes:
            if not quote_stack or quote_stack.pop() != character:
                fail(f"{path.name}: ghilimelele sunt încrucișate sau închise greșit")
    if quote_stack:
        fail(f"{path.name}: ghilimelele nu sunt închise")

    note_count = validate_editorial_notes(
        path,
        data.get("editorialNotes"),
        expected_numbers,
        ledger_record.get("textualVariantReview", []),
        status,
    )
    note_count += validate_reference_notes(
        path,
        data.get("referenceNotes"),
        expected_numbers,
        ledger_record.get("referenceNoteNumbers", []),
        status,
    )
    note_count += validate_alternate_endings(
        path,
        data.get("alternateEndings"),
        ledger_record.get("alternateEnding") is True,
        status,
    )
    compared_verses = (
        0
        if status in {"draft", "in_review"}
        else validate_pinned_benchmark_comparison(path, data, source_data)
    )
    validate_automated_audit(
        path,
        data,
        status,
        source_data["snapshotSha256ByBook"][book_id],
        expected_verses,
        len(book["benchmarkLockIds"]),
        len(book["externalBenchmarkIds"]),
        book["testament"],
        expected_numbers,
    )
    return chapter_id, expected_verses, note_count, status, compared_verses


def chapter_sort_key(path: Path) -> tuple[int, int]:
    try:
        book_id, chapter_text = path.stem.rsplit(".", 1)
        return BOOK_ORDER.get(book_id, 999), int(chapter_text)
    except (ValueError, TypeError):
        return 999, 999


def main() -> int:
    try:
        manifest = load_json(MANIFEST_PATH)
        paths = validate_manifest(manifest)
        source_data = validate_source_lock(load_json(paths["sourceLock"]))
        ledger_chapters = validate_ledger(load_json(paths["sourceLedger"]), source_data)
        forbidden_names = validate_onomastics(load_json(paths["onomastics"]))
        validate_source_coverage(ledger_chapters, source_data)
        excluded = {
            "manifest.json",
            "nt-versification.json",
            *(path.name for path in paths.values()),
        }
        chapter_paths = sorted(
            (path for path in DATA_DIR.glob("*.json") if path.name not in excluded),
            key=chapter_sort_key,
        )
        if not chapter_paths:
            fail("Nu există capitole Biblia Emanus")
        validated = [
            validate_chapter(
                path,
                load_json(path),
                manifest,
                ledger_chapters,
                source_data,
                forbidden_names,
            )
            for path in chapter_paths
        ]
        chapter_ids = [item[0] for item in validated]
        if manifest.get("draftedChapters") != chapter_ids:
            fail("manifest.json: draftedChapters nu corespunde exact fișierelor")
        if list(ledger_chapters) != chapter_ids:
            fail("source-ledger.json: capitolele nu corespund exact fișierelor")

        progress = manifest.get("progress")
        if not isinstance(progress, dict):
            fail("manifest.json: lipsește progress")
        if progress.get("chaptersDrafted") != len(chapter_ids):
            fail("manifest.json: chaptersDrafted nu corespunde fișierelor")
        total_verses = sum(item[1] for item in validated)
        if progress.get("versesDrafted") != total_verses:
            fail("manifest.json: versesDrafted nu corespunde fișierelor")
        approved_count = sum(
            1 for _, _, _, status, _ in validated if status in {"approved", "published"}
        )
        published_count = sum(1 for _, _, _, status, _ in validated if status == "published")
        if progress.get("chaptersApproved") != approved_count:
            fail("manifest.json: chaptersApproved nu corespunde statusurilor")
        if progress.get("chaptersPublished") != published_count:
            fail("manifest.json: chaptersPublished nu corespunde statusurilor")
        if manifest.get("public") != (published_count > 0):
            fail("manifest.json: public trebuie să reflecte existența capitolelor publicate")

        nt_books_present = set(source_data["books"]).intersection(NT_CHAPTER_COUNTS)
        if nt_books_present:
            if nt_books_present != set(NT_CHAPTER_COUNTS):
                fail("source-lock.json: Noul Testament trebuie livrat într-un singur corpus complet")
            expected_nt_chapters = {
                f"{book_id}.{chapter}"
                for book_id, count in NT_CHAPTER_COUNTS.items()
                for chapter in range(1, count + 1)
            }
            actual_nt = {chapter_id for chapter_id in chapter_ids if chapter_id.split(".")[0] in NT_CHAPTER_COUNTS}
            if actual_nt != expected_nt_chapters:
                fail("manifest.json: Noul Testament nu conține exact cele 27 de cărți și 260 de capitole")
            nt_status = manifest.get("newTestament")
            nt_validated = [item for item in validated if item[0] in expected_nt_chapters]
            nt_verses = sum(item[1] for item in nt_validated)
            nt_all_published = all(item[3] == "published" for item in nt_validated)
            expected_nt_status = {
                "books": 27,
                "chapters": 260,
                "verses": nt_verses,
                "status": "published" if nt_all_published else "in_review",
                "public": nt_all_published,
            }
            if nt_status != expected_nt_status:
                fail("manifest.json: starea Noului Testament nu corespunde corpusului validat")

    except ValidationError as error:
        print(f"[biblia-emanus] EROARE: {error}", file=sys.stderr)
        return 1

    total_verses = sum(item[1] for item in validated)
    total_notes = sum(item[2] for item in validated)
    total_comparisons = sum(item[4] for item in validated)
    print(
        f"[biblia-emanus] OK: {len(validated)} capitole, {total_verses} versete, "
        f"{total_notes} note, {total_comparisons} comparații verset-cu-verset; "
        "snapshoturile, versificația, etaloanele românești și poarta automată sunt valide."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
