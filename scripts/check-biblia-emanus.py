#!/usr/bin/env python3
"""Validate Biblia Emanus provenance, drafts, and automated publication gates."""

from __future__ import annotations

import json
import re
import sys
import unicodedata
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "docs" / "data" / "biblia-emanus"
MANIFEST_PATH = DATA_DIR / "manifest.json"
ALLOWED_STATUSES = {"draft", "in_review", "approved", "published"}
ALLOWED_REVIEW_VALUES = {"pending", "approved", "changes_requested"}
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
    "GEN": "Geneza",
    "EXO": "Exodul",
    "LEV": "Leviticul",
    "NUM": "Numeri",
}
BOOK_ORDER = {
    "GEN": 1,
    "EXO": 2,
    "LEV": 3,
    "NUM": 4,
}

CHAPTER_ID_PATTERN = re.compile(r"^[A-Z0-9]{3}\.([1-9][0-9]*)$")
VERSE_ID_PATTERN = re.compile(r"^([A-Z0-9]{3})\.([1-9][0-9]*)\.([1-9][0-9]*)$")


class ValidationError(Exception):
    pass


def fail(message: str) -> None:
    raise ValidationError(message)


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


def validate_manifest(manifest: dict[str, Any]) -> Path:
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

    ledger_name = manifest.get("sourceLedger")
    if ledger_name != "source-ledger.json":
        fail("manifest.json: sourceLedger trebuie să fie source-ledger.json")
    ledger_path = DATA_DIR / ledger_name

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
    if not isinstance(required_checks, list) or len(set(required_checks)) < 7:
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

    return ledger_path


def validate_ledger(ledger: dict[str, Any]) -> dict[str, dict[str, Any]]:
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
    }
    for key, value in required_policy.items():
        if policy.get(key) != value:
            fail(f"source-ledger.json: policy.{key} trebuie să fie {value!r}")

    chapters = ledger.get("chapters")
    if not isinstance(chapters, dict) or not chapters:
        fail("source-ledger.json: lista chapters este goală")
    normalized: dict[str, dict[str, Any]] = {}
    for chapter_id, record in chapters.items():
        if not isinstance(chapter_id, str) or not CHAPTER_ID_PATTERN.match(chapter_id):
            fail(f"source-ledger.json: identificator invalid {chapter_id!r}")
        if not isinstance(record, dict):
            fail(f"source-ledger.json: {chapter_id} trebuie să fie obiect")
        expected_verses = record.get("expectedVerses")
        if not isinstance(expected_verses, int) or expected_verses < 1:
            fail(f"source-ledger.json: expectedVerses invalid pentru {chapter_id}")
        if not str(record.get("englishUrl", "")).startswith("https://ebible.org/engwebp/"):
            fail(f"source-ledger.json: englishUrl invalid pentru {chapter_id}")
        if not str(record.get("hebrewUrl", "")).startswith("https://ebible.org/hboWLC/"):
            fail(f"source-ledger.json: hebrewUrl invalid pentru {chapter_id}")
        variants = record.get("textualVariantReview", [])
        if not isinstance(variants, list):
            fail(f"source-ledger.json: textualVariantReview invalid pentru {chapter_id}")
        for verse_id in variants:
            match = VERSE_ID_PATTERN.match(str(verse_id))
            if not match or ".".join(match.groups()[:2]) != chapter_id:
                fail(f"source-ledger.json: varianta {verse_id!r} nu aparține de {chapter_id}")
            if int(match.group(3)) > expected_verses:
                fail(f"source-ledger.json: verset inexistent în {verse_id}")
        normalized[chapter_id] = record
    return normalized


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


def validate_benchmark(path: Path, benchmark: Any, status: str, minimum: int) -> None:
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
        if not isinstance(translation_id, str) or not translation_id.strip():
            fail(f"{path.name}: benchmarkul {index} nu are id")
        if not isinstance(family, str) or not family.strip():
            fail(f"{path.name}: benchmarkul {index} nu are family")
        if mode != "comparison-only":
            fail(f"{path.name}: benchmarkul {translation_id} trebuie folosit comparison-only")
        ids.add(translation_id)
        families.add(family.lower())
    if len(ids) < minimum:
        fail(f"{path.name}: benchmarkurile trebuie să fie distincte")
    if "cornilescu" not in families:
        fail(f"{path.name}: benchmarkul trebuie să includă familia Cornilescu")
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


def validate_editorial_notes(
    path: Path,
    notes: Any,
    expected_verses: int,
    textual_variants: list[str],
    status: str,
) -> int:
    if not isinstance(notes, list):
        fail(f"{path.name}: editorialNotes trebuie să fie o listă")
    noted_verses: set[int] = set()
    for index, note in enumerate(notes, start=1):
        if not isinstance(note, dict):
            fail(f"{path.name}: nota editorială {index} nu este obiect")
        verse = note.get("verse")
        if not isinstance(verse, int) or not 1 <= verse <= expected_verses:
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


def validate_chapter(
    path: Path,
    data: dict[str, Any],
    manifest: dict[str, Any],
    ledger_chapters: dict[str, dict[str, Any]],
) -> tuple[str, int, int, str]:
    if data.get("translation") != "BE":
        fail(f"{path.name}: translation trebuie să fie BE")
    book_id = data.get("bookId")
    chapter = data.get("chapter")
    if not isinstance(book_id, str) or book_id not in BOOK_NAMES:
        fail(f"{path.name}: bookId necunoscut sau neînregistrat")
    if data.get("bookName") != BOOK_NAMES[book_id]:
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
    validate_benchmark(path, data.get("benchmark"), status, gate["minimumRomanianBenchmarks"])

    source = data.get("source")
    if not isinstance(source, dict):
        fail(f"{path.name}: lipsește source")
    english = source.get("english")
    hebrew = source.get("hebrew")
    if not isinstance(english, dict) or not isinstance(hebrew, dict):
        fail(f"{path.name}: Geneza cere sursele engleză și ebraică")
    if "greek" in source:
        fail(f"{path.name}: un capitol din Geneza nu poate declara sursă greacă")
    if english.get("version") != "WEBU-Protestant" or english.get("license") != "Public Domain":
        fail(f"{path.name}: sursa engleză este invalidă")
    if english.get("passageUrl") != ledger_record.get("englishUrl"):
        fail(f"{path.name}: URL-ul englez nu corespunde registrului")
    if hebrew.get("version") != "WLC-OSHB" or hebrew.get("textLicense") != "Public Domain":
        fail(f"{path.name}: sursa ebraică este invalidă")
    if hebrew.get("passageUrl") != ledger_record.get("hebrewUrl"):
        fail(f"{path.name}: URL-ul ebraic nu corespunde registrului")

    expected_verses = ledger_record["expectedVerses"]
    verses = data.get("verses")
    if not isinstance(verses, list) or len(verses) != expected_verses:
        fail(f"{path.name}: numărul versetelor nu corespunde registrului")
    expected_numbers = list(range(1, expected_verses + 1))
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
        actual_numbers.append(number)
        combined_text.append(text)
    if actual_numbers != expected_numbers:
        fail(f"{path.name}: versetele trebuie să fie continue de la 1")

    full_text = " ".join(combined_text)
    if not ROMANIAN_DIACRITICS.intersection(full_text):
        fail(f"{path.name}: textul nu conține diacritice românești")
    if full_text.count("„") != full_text.count("”"):
        fail(f"{path.name}: ghilimelele românești sunt neechilibrate")
    if full_text.count("«") != full_text.count("»"):
        fail(f"{path.name}: ghilimelele interioare sunt neechilibrate")

    note_count = validate_editorial_notes(
        path,
        data.get("editorialNotes"),
        expected_verses,
        ledger_record.get("textualVariantReview", []),
        status,
    )
    return chapter_id, expected_verses, note_count, status


def chapter_sort_key(path: Path) -> tuple[int, int]:
    try:
        book_id, chapter_text = path.stem.rsplit(".", 1)
        return BOOK_ORDER.get(book_id, 999), int(chapter_text)
    except (ValueError, TypeError):
        return 999, 999


def main() -> int:
    try:
        manifest = load_json(MANIFEST_PATH)
        ledger_path = validate_manifest(manifest)
        ledger_chapters = validate_ledger(load_json(ledger_path))
        excluded = {"manifest.json", ledger_path.name}
        chapter_paths = sorted(
            (path for path in DATA_DIR.glob("*.json") if path.name not in excluded),
            key=chapter_sort_key,
        )
        if not chapter_paths:
            fail("Nu există capitole Biblia Emanus")
        validated = [
            validate_chapter(path, load_json(path), manifest, ledger_chapters)
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
        approved_count = sum(
            1 for _, _, _, status in validated if status in {"approved", "published"}
        )
        published_count = sum(1 for _, _, _, status in validated if status == "published")
        if progress.get("chaptersApproved") != approved_count:
            fail("manifest.json: chaptersApproved nu corespunde statusurilor")
        if progress.get("chaptersPublished") != published_count:
            fail("manifest.json: chaptersPublished nu corespunde statusurilor")
        if manifest.get("public") != (published_count > 0):
            fail("manifest.json: public trebuie să reflecte existența capitolelor publicate")

    except ValidationError as error:
        print(f"[biblia-emanus] EROARE: {error}", file=sys.stderr)
        return 1

    total_verses = sum(item[1] for item in validated)
    total_notes = sum(item[2] for item in validated)
    print(
        f"[biblia-emanus] OK: {len(validated)} capitole, {total_verses} versete, "
        f"{total_notes} note; surse, diacritice și poarta automată de publicare verificate."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
