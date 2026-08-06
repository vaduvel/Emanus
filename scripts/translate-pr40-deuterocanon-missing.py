#!/usr/bin/env python3
"""Create source-backed Romanian candidates for 3 Ezdra, Baruh and Greek Esther.

The old PR40 payloads are ignored. Translation starts from the public-domain
WEBBE text and is checked against two public-domain Greek LXX witnesses. The
machine translation is only a candidate and remains blocked until the
semantic-review ledger is empty.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import re
import shutil
import urllib.request
import zipfile
from pathlib import Path
from typing import Any

import torch
from huggingface_hub import HfApi
from transformers import MarianMTModel, MarianTokenizer

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "docs" / "data" / "biblia-emanus-deuterocanon-new-translation"
REPORT = ROOT / "docs" / "biblia-emanus" / "PR40-DEUTEROCANON-NEW-TRANSLATION.json"
CACHE = ROOT / ".cache" / "pr40-deuterocanon-translation"
MODEL_ID = "Helsinki-NLP/opus-mt-en-ro"
TARGETS = {
    "1ES": "3 Ezdra",
    "BAR": "Baruh",
    "ESG": "Adăugirile grecești la Estera",
}
SOURCE_URLS = {
    "eng-webbe": "https://ebible.org/Scriptures/eng-webbe_usfm.zip",
    "grcbrent": "https://ebible.org/Scriptures/grcbrent_usfm.zip",
    "grclxx": "https://ebible.org/Scriptures/grclxx_usfm.zip",
}
ENGLISH_TOKEN = re.compile(r"\b(?:the|and|that|which|with|from|unto|shall|were|was|king|people|lord|god|said)\b", re.I)
PLACEHOLDER = re.compile(r"(?:TODO|TBD|placeholder|text revizuit|martor istoric|păstrat în suluri)", re.I)


def download(url: str, destination: Path) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    if destination.exists():
        return
    request = urllib.request.Request(url, headers={"User-Agent": "EmanusSourceAudit/2.0"})
    with urllib.request.urlopen(request, timeout=120) as response, destination.open("wb") as handle:
        shutil.copyfileobj(response, handle)


def digest(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def strip_usfm(value: str) -> str:
    value = re.sub(r"\\(?:f|x)\s.*?\\(?:f|x)\*", " ", value)
    value = re.sub(r"\\w\s+([^|\\]+)(?:\|[^\\]*)?\\w\*", r"\1", value)
    value = re.sub(r"\\[+a-zA-Z0-9-]+\*?", " ", value)
    value = re.sub(r"\|\S+", " ", value)
    return re.sub(r"\s+", " ", value).strip()


def parse_usfm_zip(path: Path) -> dict[tuple[str, int, int], str]:
    result: dict[tuple[str, int, int], str] = {}
    with zipfile.ZipFile(path) as archive:
        for filename in archive.namelist():
            if not filename.lower().endswith((".usfm", ".sfm")):
                continue
            raw = archive.read(filename).decode("utf-8-sig", errors="strict")
            id_match = re.search(r"(?m)^\\id\s+([0-9A-Z]{3})\b", raw)
            if not id_match:
                continue
            book_id = id_match.group(1)
            chapter: int | None = None
            current: tuple[str, int, int] | None = None
            for line in raw.splitlines():
                chapter_match = re.match(r"^\\c\s+([0-9]+)\b", line)
                if chapter_match:
                    chapter = int(chapter_match.group(1))
                    current = None
                    continue
                verse_match = re.match(r"^\\v\s+([0-9]+)(?:-[0-9]+)?\s*(.*)$", line)
                if verse_match and chapter is not None:
                    current = (book_id, chapter, int(verse_match.group(1)))
                    text = strip_usfm(verse_match.group(2))
                    if text:
                        result[current] = text
                    continue
                if current and re.match(
                    r"^\\(?:p|m|q[0-9]*|qm[0-9]*|li[0-9]*|pi[0-9]*|pc|pr|cls|nb)(?:\s|$)",
                    line,
                ):
                    continuation = strip_usfm(line)
                    if continuation:
                        result[current] = re.sub(r"\s+", " ", result.get(current, "") + " " + continuation).strip()
    return result


def chunks(values: list[str], size: int) -> list[list[str]]:
    return [values[index:index + size] for index in range(0, len(values), size)]


def translate_batch(
    tokenizer: MarianTokenizer,
    model: MarianMTModel,
    texts: list[str],
    batch_size: int,
) -> list[str]:
    translated: list[str] = []
    for batch in chunks(texts, batch_size):
        encoded = tokenizer(
            batch,
            return_tensors="pt",
            padding=True,
            truncation=True,
            max_length=512,
        )
        with torch.inference_mode():
            output = model.generate(
                **encoded,
                max_new_tokens=512,
                num_beams=4,
                length_penalty=1.0,
                early_stopping=True,
            )
        translated.extend(
            re.sub(r"\s+", " ", value).strip()
            for value in tokenizer.batch_decode(output, skip_special_tokens=True)
        )
    return translated


def numeric_tokens(value: str) -> list[str]:
    return re.findall(r"\d+(?:[.,]\d+)?", value)


def main() -> None:
    argument_parser = argparse.ArgumentParser()
    argument_parser.add_argument("--batch-size", type=int, default=24)
    arguments = argument_parser.parse_args()

    CACHE.mkdir(parents=True, exist_ok=True)
    OUT.mkdir(parents=True, exist_ok=True)
    for old in OUT.glob("*.json"):
        old.unlink()

    source_paths: dict[str, Path] = {}
    for source_id, url in SOURCE_URLS.items():
        destination = CACHE / f"{source_id}.zip"
        download(url, destination)
        source_paths[source_id] = destination
    witnesses = {source_id: parse_usfm_zip(path) for source_id, path in source_paths.items()}

    model_info = HfApi().model_info(MODEL_ID)
    revision = str(model_info.sha)
    tokenizer = MarianTokenizer.from_pretrained(MODEL_ID, revision=revision)
    model = MarianMTModel.from_pretrained(MODEL_ID, revision=revision)
    model.eval()

    source_rows: list[dict[str, Any]] = []
    for reference, english in sorted(witnesses["eng-webbe"].items()):
        book_id, chapter, verse = reference
        if book_id not in TARGETS:
            continue
        source_rows.append(
            {
                "bookId": book_id,
                "chapter": chapter,
                "verse": verse,
                "english": english,
            }
        )
    found = {row["bookId"] for row in source_rows}
    missing_books = sorted(set(TARGETS) - found)
    if missing_books:
        raise SystemExit(f"WEBBE source lacks target books: {missing_books}")

    translations = translate_batch(
        tokenizer,
        model,
        [row["english"] for row in source_rows],
        arguments.batch_size,
    )
    if len(translations) != len(source_rows):
        raise SystemExit("Translation count does not equal source verse count")

    issues: list[dict[str, Any]] = []
    books: dict[str, dict[int, list[dict[str, Any]]]] = {}
    for row, romanian in zip(source_rows, translations):
        reference = f"{row['bookId']}.{row['chapter']}:{row['verse']}"
        verse_issues: list[str] = []
        if not romanian:
            verse_issues.append("EMPTY_TRANSLATION")
        if PLACEHOLDER.search(romanian):
            verse_issues.append("PLACEHOLDER")
        if ENGLISH_TOKEN.search(romanian):
            verse_issues.append("ENGLISH_RESIDUE")
        if numeric_tokens(row["english"]) != numeric_tokens(romanian):
            verse_issues.append("NUMBER_TOKEN_CHANGE")
        greek_coverage = {
            source_id: reference_tuple in witness
            for source_id, witness in witnesses.items()
            if source_id.startswith("grc")
            for reference_tuple in [(row["bookId"], row["chapter"], row["verse"])]
        }
        if not any(greek_coverage.values()):
            verse_issues.append("NO_GREEK_REFERENCE_COVERAGE")
        if verse_issues:
            issues.append(
                {
                    "reference": reference,
                    "codes": verse_issues,
                    "english": row["english"],
                    "romanian": romanian,
                    "greekCoverage": greek_coverage,
                }
            )
        books.setdefault(row["bookId"], {}).setdefault(row["chapter"], []).append(
            {
                "number": row["verse"],
                "text": romanian,
                "sourceEnglish": row["english"],
                "greekCoverage": greek_coverage,
            }
        )

    chapter_count = 0
    verse_count = 0
    for book_id, chapters in sorted(books.items()):
        for chapter, verses in sorted(chapters.items()):
            numbers = [verse["number"] for verse in verses]
            chapter_issues = [
                issue for issue in issues if issue["reference"].startswith(f"{book_id}.{chapter}:")
            ]
            document = {
                "translation": "BE-DEUT-DRAFT",
                "bookId": book_id,
                "bookName": TARGETS[book_id],
                "chapter": chapter,
                "collection": "deuterocanon",
                "status": "in_review",
                "public": False,
                "source": {
                    "english": {
                        "id": "eng-webbe",
                        "sha256": digest(source_paths["eng-webbe"]),
                        "license": "Public Domain",
                    },
                    "greek": [
                        {"id": "grcbrent", "sha256": digest(source_paths["grcbrent"]), "license": "Public Domain"},
                        {"id": "grclxx", "sha256": digest(source_paths["grclxx"]), "license": "Public Domain"},
                    ],
                    "translationModel": {
                        "id": MODEL_ID,
                        "revision": revision,
                        "license": "Apache-2.0",
                        "role": "first-pass draft only",
                    },
                },
                "verses": [
                    {"number": verse["number"], "text": verse["text"]}
                    for verse in verses
                ],
                "audit": {
                    "sourceVerseNumbers": numbers,
                    "continuous": numbers == list(range(1, max(numbers) + 1)),
                    "firstPassIssueCount": len(chapter_issues),
                    "publicationBlocked": True,
                },
            }
            (OUT / f"{book_id}.{chapter}.json").write_text(
                json.dumps(document, ensure_ascii=False, indent=2) + "\n",
                encoding="utf-8",
            )
            chapter_count += 1
            verse_count += len(verses)

    report = {
        "schemaVersion": 1,
        "sourceSnapshots": {
            source_id: {"url": SOURCE_URLS[source_id], "sha256": digest(path)}
            for source_id, path in source_paths.items()
        },
        "translationModel": {
            "id": MODEL_ID,
            "revision": revision,
            "license": "Apache-2.0",
        },
        "books": {
            book_id: {
                "chapters": len(chapters),
                "verses": sum(len(verses) for verses in chapters.values()),
            }
            for book_id, chapters in sorted(books.items())
        },
        "summary": {
            "books": len(books),
            "chapters": chapter_count,
            "verses": verse_count,
            "firstPassIssues": len(issues),
            "publicationReady": False,
        },
        "issues": issues,
    }
    REPORT.parent.mkdir(parents=True, exist_ok=True)
    REPORT.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(report["summary"], ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
