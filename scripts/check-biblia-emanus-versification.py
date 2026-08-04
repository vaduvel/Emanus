#!/usr/bin/env python3
from __future__ import annotations

import argparse
import hashlib
import json
import sys
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_MANIFEST = ROOT / "docs" / "data" / "biblia-emanus" / "nt-versification.json"
EXPECTED_HASH = "b6075143d545a48d8dcc7417de413c9bae1f26d55c475956f9d02e96d451089e"
EXPECTED_TEXT_VERSES = 7_941
EXPECTED_REFERENCE_SLOTS = 7_957

BOOKS: tuple[tuple[str, str, tuple[int, ...]], ...] = (
    ("MAT", "Matei", (25, 23, 17, 25, 48, 34, 29, 34, 38, 42, 30, 50, 58, 36, 39, 28, 27, 35, 30, 34, 46, 46, 39, 51, 46, 75, 66, 20)),
    ("MRK", "Marcu", (45, 28, 35, 41, 43, 56, 37, 38, 50, 52, 33, 44, 37, 72, 47, 20)),
    ("LUK", "Luca", (80, 52, 38, 44, 39, 49, 50, 56, 62, 42, 54, 59, 35, 35, 32, 31, 37, 43, 48, 47, 38, 71, 56, 53)),
    ("JHN", "Ioan", (51, 25, 36, 54, 47, 71, 53, 59, 41, 42, 57, 50, 38, 31, 27, 33, 26, 40, 42, 31, 25)),
    ("ACT", "Faptele Apostolilor", (26, 47, 26, 37, 42, 15, 60, 40, 43, 48, 30, 25, 52, 28, 41, 40, 34, 28, 41, 38, 40, 30, 35, 27, 27, 32, 44, 31)),
    ("ROM", "Romani", (32, 29, 31, 25, 21, 23, 25, 39, 33, 21, 36, 21, 14, 23, 33, 27)),
    ("1CO", "1 Corinteni", (31, 16, 23, 21, 13, 20, 40, 13, 27, 33, 34, 31, 13, 40, 58, 24)),
    ("2CO", "2 Corinteni", (24, 17, 18, 18, 21, 18, 16, 24, 15, 18, 33, 21, 14)),
    ("GAL", "Galateni", (24, 21, 29, 31, 26, 18)),
    ("EPH", "Efeseni", (23, 22, 21, 32, 33, 24)),
    ("PHP", "Filipeni", (30, 30, 21, 23)),
    ("COL", "Coloseni", (29, 23, 25, 18)),
    ("1TH", "1 Tesaloniceni", (10, 20, 13, 18, 28)),
    ("2TH", "2 Tesaloniceni", (12, 17, 18)),
    ("1TI", "1 Timotei", (20, 15, 16, 16, 25, 21)),
    ("2TI", "2 Timotei", (18, 26, 17, 22)),
    ("TIT", "Tit", (16, 15, 15)),
    ("PHM", "Filimon", (25,)),
    ("HEB", "Evrei", (14, 18, 19, 16, 14, 20, 28, 13, 28, 39, 40, 29, 25)),
    ("JAS", "Iacov", (27, 26, 18, 17, 20)),
    ("1PE", "1 Petru", (25, 25, 22, 19, 14)),
    ("2PE", "2 Petru", (21, 22, 18)),
    ("1JN", "1 Ioan", (10, 29, 24, 21, 21)),
    ("2JN", "2 Ioan", (13,)),
    ("3JN", "3 Ioan", (14,)),
    ("JUD", "Iuda", (25,)),
    ("REV", "Apocalipsa", (20, 29, 22, 11, 14, 17, 17, 13, 21, 11, 19, 17, 18, 20, 8, 21, 18, 24, 21, 15, 27, 21)),
)

REFERENCES_WITHOUT_MAIN_TEXT = (
    "MAT 17:21",
    "MAT 18:11",
    "MAT 23:14",
    "MRK 7:16",
    "MRK 9:44",
    "MRK 9:46",
    "MRK 11:26",
    "MRK 15:28",
    "LUK 17:36",
    "LUK 23:17",
    "JHN 5:4",
    "ACT 8:37",
    "ACT 15:34",
    "ACT 24:7",
    "ACT 28:29",
    "ROM 16:24",
)

EXPECTED_MAPPINGS: dict[str, tuple[str, tuple[tuple[str, tuple[tuple[str, str, str], ...]], ...]]] = {
    "ACT-19-40-41": (
        "split",
        (
            ("ACT 19:40", (("SBLGNT-1.2-main", "ACT 19:40", "first-part"),)),
            ("ACT 19:41", (("SBLGNT-1.2-main", "ACT 19:40", "final-sentence"),)),
        ),
    ),
    "ROM-16-25-27": (
        "apparatus-restoration",
        (
            ("ROM 16:25", (("SBLGNT-1.2-apparatus", "ROM 16:25-27", "verse-25"),)),
            ("ROM 16:26", (("SBLGNT-1.2-apparatus", "ROM 16:25-27", "verse-26"),)),
            ("ROM 16:27", (("SBLGNT-1.2-apparatus", "ROM 16:25-27", "verse-27"),)),
        ),
    ),
    "2CO-13-12-14": (
        "split-and-shift",
        (
            ("2CO 13:12", (("SBLGNT-1.2-main", "2CO 13:12", "first-sentence"),)),
            ("2CO 13:13", (("SBLGNT-1.2-main", "2CO 13:12", "second-sentence"),)),
            ("2CO 13:14", (("SBLGNT-1.2-main", "2CO 13:13", "whole"),)),
        ),
    ),
    "3JN-1-14": (
        "combine",
        (
            (
                "3JN 1:14",
                (
                    ("SBLGNT-1.2-main", "3JN 1:14", "whole"),
                    ("SBLGNT-1.2-main", "3JN 1:15", "whole"),
                ),
            ),
        ),
    ),
    "REV-13-1": (
        "combine-cross-chapter",
        (
            (
                "REV 13:1",
                (
                    ("SBLGNT-1.2-main", "REV 12:18", "whole"),
                    ("SBLGNT-1.2-main", "REV 13:1", "whole"),
                ),
            ),
        ),
    ),
}


class ValidationError(ValueError):
    pass


def require(condition: bool, message: str) -> None:
    if not condition:
        raise ValidationError(message)


def require_exact_keys(value: dict[str, Any], expected: set[str], context: str) -> None:
    actual = set(value)
    require(actual == expected, f"{context}: chei invalide; lipsesc={sorted(expected - actual)}, extra={sorted(actual - expected)}")


def load_json(path: Path) -> dict[str, Any]:
    try:
        value = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, UnicodeError, json.JSONDecodeError) as error:
        raise ValidationError(f"{path}: JSON inaccesibil sau invalid: {error}") from error
    require(isinstance(value, dict), f"{path}: rădăcina trebuie să fie obiect JSON")
    return value


def expected_reference_data() -> tuple[list[str], dict[str, list[list[int]]]]:
    absent = set(REFERENCES_WITHOUT_MAIN_TEXT)
    references: list[str] = []
    numbers_by_book: dict[str, list[list[int]]] = {}
    for book_id, _name, chapter_maxima in BOOKS:
        chapters: list[list[int]] = []
        for chapter, maximum in enumerate(chapter_maxima, start=1):
            numbers = [
                verse
                for verse in range(1, maximum + 1)
                if f"{book_id} {chapter}:{verse}" not in absent
            ]
            chapters.append(numbers)
            references.extend(f"{book_id} {chapter}:{verse}" for verse in numbers)
        numbers_by_book[book_id] = chapters
    return references, numbers_by_book


def validate_root(data: dict[str, Any]) -> None:
    require_exact_keys(
        data,
        {
            "schemaVersion",
            "id",
            "canon",
            "numbering",
            "sourceAlignment",
            "totals",
            "targetReferenceSet",
            "books",
            "referencesWithoutMainText",
            "mappings",
            "textualPassages",
        },
        "manifest",
    )
    require(data["schemaVersion"] == 1, "manifest.schemaVersion trebuie să fie 1")
    require(data["id"] == "biblia-emanus-nt-versification", "manifest.id invalid")
    require(data["canon"] == "protestant-new-testament-27", "manifest.canon invalid")

    numbering = data["numbering"]
    require(isinstance(numbering, dict), "numbering trebuie să fie obiect")
    require_exact_keys(numbering, {"public", "internalAudit", "policy"}, "numbering")
    require(numbering.get("public") == "romanian-protestant-traditional", "numerotarea publică trebuie să fie cea românească uzuală")
    require(numbering.get("internalAudit") == "SBLGNT-1.2", "stratul intern trebuie să fie SBLGNT 1.2")
    require(isinstance(numbering.get("policy"), str) and len(numbering["policy"].strip()) >= 30, "numbering.policy trebuie documentată")

    source = data["sourceAlignment"]
    require(isinstance(source, dict), "sourceAlignment trebuie să fie obiect")
    require_exact_keys(source, {"primaryGreek", "supplementalGreek"}, "sourceAlignment")
    primary = source["primaryGreek"]
    supplemental = source["supplementalGreek"]
    require(isinstance(primary, dict), "sourceAlignment.primaryGreek trebuie să fie obiect")
    require(isinstance(supplemental, dict), "sourceAlignment.supplementalGreek trebuie să fie obiect")
    require_exact_keys(primary, {"id", "version", "commit", "role", "license"}, "sourceAlignment.primaryGreek")
    require_exact_keys(supplemental, {"id", "role", "license"}, "sourceAlignment.supplementalGreek")
    require(
        primary
        == {
            "id": "SBLGNT",
            "version": "1.2",
            "commit": "c4d241a9c1c479a55b989ba35a4976c1d0b8052c",
            "role": "original-language-primary",
            "license": "CC-BY-4.0",
        },
        "sourceAlignment.primaryGreek nu este fixată exact la SBLGNT 1.2",
    )
    require(
        supplemental
        == {
            "id": "Textus-Receptus",
            "role": "variant-witness-only",
            "license": "Public Domain",
        },
        "sourceAlignment.supplementalGreek trebuie limitată la martorul de variante",
    )


def validate_books(data: dict[str, Any]) -> list[str]:
    books = data["books"]
    require(isinstance(books, list), "books trebuie să fie listă")
    require(len(books) == 27, "books trebuie să conțină exact 27 de cărți")

    expected_refs, expected_numbers = expected_reference_data()
    actual_refs: list[str] = []
    chapter_total = 0

    for index, (actual, expected) in enumerate(zip(books, BOOKS, strict=True)):
        book_id, name, chapter_maxima = expected
        context = f"books[{index}]"
        require(isinstance(actual, dict), f"{context} trebuie să fie obiect")
        require_exact_keys(actual, {"id", "name", "chapters"}, context)
        require(actual["id"] == book_id, f"{context}.id trebuie să fie {book_id}")
        require(actual["name"] == name, f"{context}.name trebuie să fie {name}")
        chapters = actual["chapters"]
        require(isinstance(chapters, list), f"{context}.chapters trebuie să fie listă")
        require(len(chapters) == len(chapter_maxima), f"{book_id}: număr greșit de capitole")
        chapter_total += len(chapters)

        for chapter_index, chapter in enumerate(chapters, start=1):
            chapter_context = f"{book_id}.{chapter_index}"
            require(isinstance(chapter, dict), f"{chapter_context} trebuie să fie obiect")
            require_exact_keys(chapter, {"number", "verseNumbers"}, chapter_context)
            require(chapter["number"] == chapter_index, f"{chapter_context}: număr de capitol invalid")
            expected_verses = expected_numbers[book_id][chapter_index - 1]
            require(chapter["verseNumbers"] == expected_verses, f"{chapter_context}: lista verseNumbers nu este exactă")
            actual_refs.extend(f"{book_id} {chapter_index}:{verse}" for verse in chapter["verseNumbers"])

    require(chapter_total == 260, f"canonul trebuie să aibă 260 capitole, nu {chapter_total}")
    require(actual_refs == expected_refs, "setul sau ordinea referințelor nu corespunde canonului țintă")
    return actual_refs


def validate_totals_and_hash(data: dict[str, Any], references: list[str]) -> str:
    totals = data["totals"]
    require(
        totals == {
            "books": 27,
            "chapters": 260,
            "publicReferenceSlots": EXPECTED_REFERENCE_SLOTS,
            "versesWithMainText": EXPECTED_TEXT_VERSES,
            "referencesWithoutMainText": 16,
        },
        "totals nu conține exact valorile canonice",
    )
    require(len(references) == EXPECTED_TEXT_VERSES, f"sunt {len(references)} versete cu text, nu {EXPECTED_TEXT_VERSES}")
    serialized = "".join(f"{reference}\n" for reference in references).encode("utf-8")
    digest = hashlib.sha256(serialized).hexdigest()
    require(digest == EXPECTED_HASH, f"hash intern neașteptat: {digest}")

    target = data["targetReferenceSet"]
    require(
        target == {
            "algorithm": "sha256",
            "encoding": "utf-8",
            "serialization": "BOOK C:V\\n",
            "sha256": EXPECTED_HASH,
        },
        "targetReferenceSet este invalid",
    )
    return digest


def validate_absent_references(data: dict[str, Any]) -> None:
    notes = data["referencesWithoutMainText"]
    require(isinstance(notes, list) and len(notes) == 16, "referencesWithoutMainText trebuie să aibă 16 intrări")
    actual_refs: list[str] = []
    for index, note in enumerate(notes):
        context = f"referencesWithoutMainText[{index}]"
        require(isinstance(note, dict), f"{context} trebuie să fie obiect")
        require_exact_keys(
            note,
            {"reference", "mainText", "publicNumberReserved", "lookupBehavior", "traditionalReadingPlacement", "reason"},
            context,
        )
        actual_refs.append(note["reference"])
        require(note["mainText"] is False, f"{context}.mainText trebuie să fie false")
        require(note["publicNumberReserved"] is True, f"{context}.publicNumberReserved trebuie să fie true")
        require(note["lookupBehavior"] == "critical-note", f"{context}.lookupBehavior invalid")
        require(note["traditionalReadingPlacement"] == "critical-note-only", f"{context}.traditionalReadingPlacement invalid")
        require(isinstance(note["reason"], str) and len(note["reason"].strip()) >= 30, f"{context}.reason este insuficient")
    require(tuple(actual_refs) == REFERENCES_WITHOUT_MAIN_TEXT, "cele 16 referințe fără text principal nu sunt exacte sau ordonate canonic")


def normalize_mapping(mapping: dict[str, Any], context: str) -> tuple[str, tuple[tuple[str, tuple[tuple[str, str, str], ...]], ...]]:
    require_exact_keys(mapping, {"id", "operation", "parts", "reason"}, context)
    require(isinstance(mapping["reason"], str) and len(mapping["reason"].strip()) >= 30, f"{context}.reason este insuficient")
    parts = mapping["parts"]
    require(isinstance(parts, list) and parts, f"{context}.parts trebuie să fie listă nevidă")
    normalized_parts: list[tuple[str, tuple[tuple[str, str, str], ...]]] = []
    for part_index, part in enumerate(parts):
        part_context = f"{context}.parts[{part_index}]"
        require(isinstance(part, dict), f"{part_context} trebuie să fie obiect")
        require_exact_keys(part, {"target", "sourceParts"}, part_context)
        sources = part["sourceParts"]
        require(isinstance(sources, list) and sources, f"{part_context}.sourceParts trebuie să fie listă nevidă")
        normalized_sources: list[tuple[str, str, str]] = []
        for source_index, source in enumerate(sources):
            source_context = f"{part_context}.sourceParts[{source_index}]"
            require(isinstance(source, dict), f"{source_context} trebuie să fie obiect")
            require_exact_keys(source, {"corpus", "reference", "segment"}, source_context)
            normalized_sources.append((source["corpus"], source["reference"], source["segment"]))
        normalized_parts.append((part["target"], tuple(normalized_sources)))
    return mapping["operation"], tuple(normalized_parts)


def validate_mappings(data: dict[str, Any]) -> None:
    mappings = data["mappings"]
    require(isinstance(mappings, list), "mappings trebuie să fie listă")
    require([item.get("id") for item in mappings if isinstance(item, dict)] == list(EXPECTED_MAPPINGS), "mappings trebuie să aibă exact cele cinci reguli, în ordinea stabilită")
    for index, mapping in enumerate(mappings):
        require(isinstance(mapping, dict), f"mappings[{index}] trebuie să fie obiect")
        mapping_id = mapping.get("id")
        require(mapping_id in EXPECTED_MAPPINGS, f"mappings[{index}].id necunoscut")
        require(normalize_mapping(mapping, f"mappings[{index}]") == EXPECTED_MAPPINGS[mapping_id], f"mapping {mapping_id} nu este exact")


def validate_textual_passages(data: dict[str, Any]) -> None:
    passages = data["textualPassages"]
    require(isinstance(passages, list) and len(passages) == 3, "textualPassages trebuie să conțină exact trei intrări")
    expected = {
        "MRK-16-9-20": {
            "references": [f"MRK 16:{verse}" for verse in range(9, 21)],
            "anchorAfter": None,
            "textualStatus": "double-bracketed",
            "numbered": True,
            "publication": "main-text-with-visible-critical-note",
        },
        "JHN-7-53-8-11": {
            "references": ["JHN 7:53", *[f"JHN 8:{verse}" for verse in range(1, 12)]],
            "anchorAfter": None,
            "textualStatus": "double-bracketed",
            "numbered": True,
            "publication": "main-text-with-visible-critical-note",
        },
        "MRK-16-SHORTER-ENDING": {
            "references": [],
            "anchorAfter": "MRK 16:8",
            "textualStatus": "alternate-ending",
            "numbered": False,
            "publication": "critical-note-only",
        },
    }
    require([item.get("id") for item in passages if isinstance(item, dict)] == list(expected), "ordinea pasajelor textuale este invalidă")
    for index, passage in enumerate(passages):
        context = f"textualPassages[{index}]"
        require(isinstance(passage, dict), f"{context} trebuie să fie obiect")
        require_exact_keys(passage, {"id", "references", "anchorAfter", "textualStatus", "numbered", "publication", "reason"}, context)
        passage_id = passage["id"]
        require(passage_id in expected, f"{context}.id necunoscut")
        for key, value in expected[passage_id].items():
            require(passage[key] == value, f"{context}.{key} nu este exact")
        require(isinstance(passage["reason"], str) and len(passage["reason"].strip()) >= 30, f"{context}.reason este insuficient")


def reject_biblical_text_fields(value: Any, path: str = "manifest") -> None:
    forbidden = {"text", "versetext", "biblicaltext", "readingtext", "traditionalreadingtext"}
    if isinstance(value, dict):
        for key, child in value.items():
            require(key.lower() not in forbidden, f"{path}.{key}: manifestul de versificație nu poate stoca text biblic")
            reject_biblical_text_fields(child, f"{path}.{key}")
    elif isinstance(value, list):
        for index, child in enumerate(value):
            reject_biblical_text_fields(child, f"{path}[{index}]")


def validate_manifest(data: dict[str, Any]) -> str:
    validate_root(data)
    reject_biblical_text_fields(data)
    references = validate_books(data)
    digest = validate_totals_and_hash(data, references)
    validate_absent_references(data)
    validate_mappings(data)
    validate_textual_passages(data)
    return digest


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Validează manifestul de versificație pentru Noul Testament Biblia Emanus.")
    parser.add_argument("manifest", nargs="?", type=Path, default=DEFAULT_MANIFEST)
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    try:
        digest = validate_manifest(load_json(args.manifest))
    except ValidationError as error:
        print(f"[biblia-emanus-versification] EȘEC: {error}", file=sys.stderr)
        return 1
    print(f"[biblia-emanus-versification] OK: 27 cărți, 260 capitole, 7.941 versete, sha256={digest}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
