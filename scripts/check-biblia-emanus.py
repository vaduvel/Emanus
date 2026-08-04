#!/usr/bin/env python3
"""Validate Biblia Emanus drafts, provenance, verse counts, and publication locks."""

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
BASE_REVIEW_KEYS = {"romanianLanguage", "theologicalContext", "finalApproval"}
SOURCE_REVIEW_KEYS = {"sourceLanguage", "biblicalHebrew", "biblicalGreek"}
BOOK_NAMES = {"GEN": "Geneza"}
BOOK_ORDER = {"GEN": 1}
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
        "public": False,
        "publicationBlock": "human-review-required",
    }
    for key, value in expected.items():
        if manifest.get(key) != value:
            fail(f"manifest.json: {key} trebuie să fie {value!r}")

    ledger_name = manifest.get("sourceLedger")
    if ledger_name != "source-ledger.json":
        fail("manifest.json: sourceLedger trebuie să fie source-ledger.json")
    ledger_path = DATA_DIR / ledger_name

    method = manifest.get("translationMethod")
    if not isinstance(method, dict):
        fail("manifest.json: lipsește translationMethod")
    if method.get("baseText") != "World English Bible Updated, Protestant Edition":
        fail("manifest.json: baza engleză nu corespunde ediției aprobate")
    if method.get("aiOutputIsDraftOnly") is not True:
        fail("manifest.json: orice rezultat AI trebuie marcat doar ca draft")
    if method.get("romanianDiacriticsRequired") is not True:
        fail("manifest.json: diacriticele românești trebuie să fie obligatorii")
    if method.get("unicodeNormalization") != "NFC":
        fail("manifest.json: normalizarea Unicode trebuie să fie NFC")

    sources = manifest.get("sources")
    if not isinstance(sources, dict):
        fail("manifest.json: lipsesc sursele")
    english = sources.get("english")
    if not isinstance(english, dict):
        fail("manifest.json: lipsește baza engleză")
    if english.get("id") != "engwebp":
        fail("manifest.json: id-ul bazei engleze trebuie să fie engwebp")
    if english.get("license") != "Public Domain":
        fail("manifest.json: baza engleză trebuie documentată ca Public Domain")
    if english.get("url") != "https://ebible.org/engwebp/":
        fail("manifest.json: URL-ul bazei engleze trebuie să fie engwebp")
    if "nu va fi numit World English Bible" not in str(
        english.get("trademarkNotice", "")
    ):
        fail("manifest.json: lipsește protecția mărcii World English Bible")

    old_testament = sources.get("oldTestament")
    if not isinstance(old_testament, dict):
        fail("manifest.json: lipsește sursa Vechiului Testament")
    if old_testament.get("id") != "WLC-OSHB":
        fail("manifest.json: sursa ebraică trebuie să fie WLC-OSHB")
    if old_testament.get("textLicense") != "Public Domain":
        fail("manifest.json: licența textului WLC trebuie documentată")

    new_testament = sources.get("newTestament")
    if not isinstance(new_testament, dict):
        fail("manifest.json: lipsește sursa Noului Testament")
    if new_testament.get("id") != "SBLGNT":
        fail("manifest.json: sursa greacă trebuie să fie SBLGNT")
    if new_testament.get("license") != "CC BY 4.0":
        fail("manifest.json: SBLGNT trebuie atribuit sub CC BY 4.0")

    if manifest.get("licenseDecision") != "pending":
        fail("manifest.json: licența rezultatului trebuie să rămână pending")

    return ledger_path


def validate_ledger(ledger: dict[str, Any]) -> dict[str, dict[str, Any]]:
    if ledger.get("schemaVersion") != 1:
        fail("source-ledger.json: schemaVersion trebuie să fie 1")
    if ledger.get("translation") != "BE":
        fail("source-ledger.json: translation trebuie să fie BE")

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
        if not str(record.get("englishUrl", "")).startswith(
            "https://ebible.org/engwebp/"
        ):
            fail(f"source-ledger.json: englishUrl invalid pentru {chapter_id}")
        if not str(record.get("hebrewUrl", "")).startswith(
            "https://ebible.org/hboWLC/"
        ):
            fail(f"source-ledger.json: hebrewUrl invalid pentru {chapter_id}")
        variants = record.get("textualVariantReview", [])
        if not isinstance(variants, list):
            fail(f"source-ledger.json: textualVariantReview invalid pentru {chapter_id}")
        for verse_id in variants:
            match = VERSE_ID_PATTERN.match(str(verse_id))
            if not match or ".".join(match.groups()[:2]) != chapter_id:
                fail(
                    f"source-ledger.json: varianta {verse_id!r} nu aparține de {chapter_id}"
                )
            if int(match.group(3)) > expected_verses:
                fail(f"source-ledger.json: verset inexistent în {verse_id}")
        normalized[chapter_id] = record
    return normalized


def validate_review(path: Path, review: Any, status: str) -> None:
    if not isinstance(review, dict):
        fail(f"{path.name}: lipsește obiectul review")
    missing = BASE_REVIEW_KEYS.difference(review)
    if missing:
        fail(f"{path.name}: lipsesc câmpurile de review: {', '.join(sorted(missing))}")
    source_keys = SOURCE_REVIEW_KEYS.intersection(review)
    if len(source_keys) != 1:
        fail(
            f"{path.name}: trebuie un singur review de limbă-sursă "
            "(sourceLanguage, biblicalHebrew sau biblicalGreek)"
        )
    reviewed_keys = BASE_REVIEW_KEYS | source_keys
    for key in reviewed_keys:
        if review[key] not in ALLOWED_REVIEW_VALUES:
            fail(f"{path.name}: valoare review invalidă pentru {key}")
    if status in {"approved", "published"} and any(
        review[key] != "approved" for key in reviewed_keys
    ):
        fail(f"{path.name}: un capitol {status} cere toate review-urile aprobate")


def validate_editorial_notes(
    path: Path,
    notes: Any,
    expected_verses: int,
    textual_variants: list[str],
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
                fail(
                    f"{path.name}: nota {index} cu alternative trebuie marcată reviewRequired"
                )
        noted_verses.add(verse)

    for verse_id in textual_variants:
        verse_number = int(verse_id.rsplit(".", 1)[1])
        if verse_number not in noted_verses:
            fail(
                f"{path.name}: varianta textuală {verse_id} nu are notă editorială"
            )
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
    expected_name = f"{book_id}.{chapter}.json"
    if path.name != expected_name:
        fail(f"{path.name}: numele corect este {expected_name}")
    chapter_id = f"{book_id}.{chapter}"
    ledger_record = ledger_chapters.get(chapter_id)
    if ledger_record is None:
        fail(f"{path.name}: lipsește în source-ledger.json")

    status = data.get("status")
    if status not in ALLOWED_STATUSES:
        fail(f"{path.name}: status invalid")
    expected_public = status == "published"
    if data.get("public") != expected_public:
        fail(f"{path.name}: public trebuie să fie adevărat numai pentru published")
    if status == "published" and manifest.get("licenseDecision") == "pending":
        fail(f"{path.name}: publicarea este blocată până la alegerea licenței")

    validate_review(path, data.get("review"), status)

    source = data.get("source")
    if not isinstance(source, dict):
        fail(f"{path.name}: lipsește source")
    english = source.get("english")
    hebrew = source.get("hebrew")
    if not isinstance(english, dict) or not isinstance(hebrew, dict):
        fail(f"{path.name}: Geneza cere sursele engleză și ebraică")
    if "greek" in source:
        fail(f"{path.name}: un capitol din Geneza nu poate declara sursă greacă")
    if english.get("version") != "WEBU-Protestant":
        fail(f"{path.name}: versiunea engleză trebuie să fie WEBU-Protestant")
    if english.get("license") != "Public Domain":
        fail(f"{path.name}: sursa engleză trebuie să fie Public Domain")
    if english.get("passageUrl") != ledger_record.get("englishUrl"):
        fail(f"{path.name}: URL-ul englez nu corespunde registrului")
    if hebrew.get("version") != "WLC-OSHB":
        fail(f"{path.name}: versiunea ebraică trebuie să fie WLC-OSHB")
    if hebrew.get("textLicense") != "Public Domain":
        fail(f"{path.name}: textul ebraic trebuie documentat ca Public Domain")
    if hebrew.get("passageUrl") != ledger_record.get("hebrewUrl"):
        fail(f"{path.name}: URL-ul ebraic nu corespunde registrului")

    expected_verses = ledger_record["expectedVerses"]
    verses = data.get("verses")
    if not isinstance(verses, list) or not verses:
        fail(f"{path.name}: lista de versete este goală")
    if len(verses) != expected_verses:
        fail(
            f"{path.name}: sunt {len(verses)} versete, dar registrul cere "
            f"{expected_verses}"
        )

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
        if not isinstance(text, str) or not text.strip():
            fail(f"{path.name}: text gol la versetul {number}")
        if text != text.strip():
            fail(f"{path.name}: spații exterioare la versetul {number}")
        if unicodedata.normalize("NFC", text) != text:
            fail(f"{path.name}: versetul {number} nu este Unicode NFC")
        if any(character in FORBIDDEN_SEDILLA for character in text):
            fail(f"{path.name}: diacritice cu sedilă la versetul {number}")
        if "\ufffd" in text:
            fail(f"{path.name}: caracter Unicode deteriorat la versetul {number}")
        if '"' in text:
            fail(f"{path.name}: folosește ghilimele românești la versetul {number}")
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
            fail(
                "manifest.json: draftedChapters trebuie să corespundă exact fișierelor "
                f"({chapter_ids})"
            )
        if list(ledger_chapters) != chapter_ids:
            fail(
                "source-ledger.json: capitolele trebuie să corespundă exact și în "
                f"aceeași ordine ({chapter_ids})"
            )

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
        if published_count != 0:
            fail("Încă nu este permis niciun capitol publicat")

    except ValidationError as error:
        print(f"[biblia-emanus] EROARE: {error}", file=sys.stderr)
        return 1

    total_verses = sum(item[1] for item in validated)
    total_notes = sum(item[2] for item in validated)
    print(
        f"[biblia-emanus] OK: {len(validated)} capitole, {total_verses} versete, "
        f"{total_notes} note editoriale; diacritice NFC, surse exacte, "
        "număr canonic de versete și blocaje de publicare verificate."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
