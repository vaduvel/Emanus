#!/usr/bin/env python3
"""Validate Biblia Emanus draft chapters and editorial safeguards."""

from __future__ import annotations

import json
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


def validate_manifest(manifest: dict[str, Any]) -> None:
    expected = {
        "id": "biblia-emanus",
        "abbreviation": "BE",
        "language": "ro",
        "canon": "protestant-66",
        "public": False,
    }
    for key, value in expected.items():
        if manifest.get(key) != value:
            fail(f"manifest.json: {key} trebuie să fie {value!r}")

    method = manifest.get("translationMethod")
    if not isinstance(method, dict):
        fail("manifest.json: lipsește translationMethod")
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
    if not isinstance(english, dict) or english.get("license") != "Public Domain":
        fail("manifest.json: baza engleză trebuie documentată ca Public Domain")
    if not str(english.get("url", "")).startswith("https://ebible.org/"):
        fail("manifest.json: URL-ul bazei engleze trebuie să fie sursa eBible oficială")
    if "nu va fi numit World English Bible" not in str(english.get("trademarkNotice", "")):
        fail("manifest.json: lipsește protecția mărcii World English Bible")

    old_testament = sources.get("oldTestament")
    if not isinstance(old_testament, dict) or old_testament.get("textLicense") != "Public Domain":
        fail("manifest.json: licența textului WLC trebuie documentată")

    new_testament = sources.get("newTestament")
    if not isinstance(new_testament, dict) or new_testament.get("license") != "CC BY 4.0":
        fail("manifest.json: SBLGNT trebuie atribuit sub CC BY 4.0")


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


def validate_chapter(path: Path, data: dict[str, Any], manifest: dict[str, Any]) -> str:
    if data.get("translation") != "BE":
        fail(f"{path.name}: translation trebuie să fie BE")
    book_id = data.get("bookId")
    chapter = data.get("chapter")
    if not isinstance(book_id, str) or not book_id:
        fail(f"{path.name}: bookId invalid")
    if not isinstance(chapter, int) or chapter < 1:
        fail(f"{path.name}: chapter invalid")
    expected_name = f"{book_id}.{chapter}.json"
    if path.name != expected_name:
        fail(f"{path.name}: numele corect este {expected_name}")

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
    if not isinstance(english, dict):
        fail(f"{path.name}: lipsește pasajul-sursă englez")
    if english.get("license") != "Public Domain":
        fail(f"{path.name}: sursa engleză trebuie să fie Public Domain")
    if not str(english.get("passageUrl", "")).startswith("https://ebible.org/engweb"):
        fail(f"{path.name}: URL WEBU invalid")
    if ("hebrew" in source) == ("greek" in source):
        fail(f"{path.name}: declară exact una dintre sursele ebraică sau greacă")

    verses = data.get("verses")
    if not isinstance(verses, list) or not verses:
        fail(f"{path.name}: lista de versete este goală")
    expected_numbers = list(range(1, len(verses) + 1))
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
        if any(character in FORBIDDEN_SEDILLA for character in text):
            fail(f"{path.name}: diacritice cu sedilă la versetul {number}")
        if "\ufffd" in text:
            fail(f"{path.name}: caracter Unicode deteriorat la versetul {number}")
        actual_numbers.append(number)
        combined_text.append(text)
    if actual_numbers != expected_numbers:
        fail(f"{path.name}: versetele trebuie să fie continue de la 1")

    full_text = " ".join(combined_text)
    if not ROMANIAN_DIACRITICS.intersection(full_text):
        fail(f"{path.name}: textul nu conține diacritice românești")
    if full_text.count("„") != full_text.count("”"):
        fail(f"{path.name}: ghilimelele românești sunt neechilibrate în capitol")

    return f"{book_id}.{chapter}"


def main() -> int:
    try:
        manifest = load_json(MANIFEST_PATH)
        validate_manifest(manifest)
        chapter_paths = sorted(
            path for path in DATA_DIR.glob("*.json") if path.name != "manifest.json"
        )
        if not chapter_paths:
            fail("Nu există capitole Biblia Emanus")
        chapters = [
            validate_chapter(path, load_json(path), manifest) for path in chapter_paths
        ]

        if manifest.get("draftedChapters") != chapters:
            fail(
                "manifest.json: draftedChapters trebuie să corespundă exact fișierelor "
                f"({chapters})"
            )
        progress = manifest.get("progress")
        if not isinstance(progress, dict):
            fail("manifest.json: lipsește progress")
        if progress.get("chaptersDrafted") != len(chapters):
            fail("manifest.json: chaptersDrafted nu corespunde fișierelor")
        if progress.get("chaptersPublished") != 0:
            fail("manifest.json: încă nu este permis niciun capitol publicat")

    except ValidationError as error:
        print(f"[biblia-emanus] EROARE: {error}", file=sys.stderr)
        return 1

    print(
        f"[biblia-emanus] OK: {len(chapters)} capitol(e), "
        "diacritice NFC, surse și blocaje editoriale verificate."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
