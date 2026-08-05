#!/usr/bin/env python3
"""Extract the authentic Romanian 1914 deuterocanon and audit its structure.

Nine PR40 works have a usable public-domain Romanian witness in the Biblia
sinodală 1914 transcription. Three works (3 Ezdra, Baruh and the Greek Esther
additions) are intentionally routed to a separate new-translation pipeline.
Nothing from the fabricated PR40 text is reused.
"""
from __future__ import annotations

import hashlib
import html
import json
import re
import shutil
import unicodedata
import urllib.parse
import urllib.request
import zipfile
from difflib import SequenceMatcher
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "docs" / "data" / "biblia-emanus-deuterocanon-candidates"
REPORT = ROOT / "docs" / "biblia-emanus" / "PR40-DEUTEROCANON-REBUILD-REPORT.json"
CACHE = ROOT / ".cache" / "pr40-deuterocanon"
REPAIR5 = ROOT / "docs" / "data" / "biblia-emanus-candidates"
API = "https://ro.wikisource.org/w/api.php"

BOOKS: dict[str, dict[str, Any]] = {
    "1ES": {"name": "3 Ezdra", "mode": "new-translation"},
    "1MA": {"name": "1 Macabei", "mode": "romanian-1914", "title": "Biblia 1914/1 Macavei"},
    "2MA": {"name": "2 Macabei", "mode": "romanian-1914", "title": "Biblia 1914/2 Macavei"},
    "3MA": {"name": "3 Macabei", "mode": "romanian-1914", "title": "Biblia 1914/3 Macavei"},
    "BAR": {"name": "Baruh", "mode": "new-translation"},
    "ESG": {"name": "Adăugirile grecești la Estera", "mode": "new-translation"},
    "JDT": {"name": "Iudita", "mode": "romanian-1914", "title": "Biblia 1914/Iudita"},
    "MAN": {"name": "Rugăciunea lui Manase", "mode": "verified-repair5", "title": "Biblia 1914/Rugăciunea lui Manasì"},
    "PS2": {"name": "Psalmul 151", "mode": "verified-repair5", "title": "Biblia 1914/Psaltirea"},
    "SIR": {"name": "Înțelepciunea lui Isus, fiul lui Sirah", "mode": "romanian-1914", "title": "Biblia 1914/Sirah"},
    "TOB": {"name": "Tobit", "mode": "romanian-1914", "title": "Biblia 1914/Tovit"},
    "WIS": {"name": "Înțelepciunea lui Solomon", "mode": "romanian-1914", "title": "Biblia 1914/Înțelepciunea lui Solomon"},
}

SOURCE_URLS = {
    "eng-webbe": "https://ebible.org/Scriptures/eng-webbe_usfm.zip",
    "grcbrent": "https://ebible.org/Scriptures/grcbrent_usfm.zip",
    "grclxx": "https://ebible.org/Scriptures/grclxx_usfm.zip",
}

CHAPTER_RE = re.compile(r"(?im)^\s*(?:CAP\.|CAPITOLUL)\s*([0-9]+)\.?\s*$")
INLINE_MARKER_RE = re.compile(
    r"(?<![\d,])([1-9][0-9]{0,2})\.\s+(?=[A-ZĂÂÎȘȚ„«])",
    re.UNICODE,
)
REFERENCE_LINE_RE = re.compile(
    r"^(?:[1-4]\s*)?[A-ZĂÂÎȘȚ][A-Za-zĂÂÎȘȚăâîșț. ]{0,20}\s+[0-9]+\s*,\s*[0-9]",
    re.UNICODE,
)


def request_json(params: dict[str, str]) -> dict[str, Any]:
    query = urllib.parse.urlencode({**params, "format": "json", "formatversion": "2"})
    request = urllib.request.Request(
        f"{API}?{query}", headers={"User-Agent": "EmanusSourceAudit/2.0"}
    )
    with urllib.request.urlopen(request, timeout=60) as response:
        return json.loads(response.read().decode("utf-8"))


def page_extract(title: str) -> tuple[str, int]:
    payload = request_json(
        {
            "action": "query",
            "titles": title,
            "prop": "extracts|revisions",
            "explaintext": "1",
            "exsectionformat": "plain",
            "rvprop": "ids",
            "rvlimit": "1",
        }
    )
    pages = payload.get("query", {}).get("pages", [])
    if not pages or pages[0].get("missing") is True:
        raise RuntimeError(f"Wikisource page missing: {title}")
    page = pages[0]
    extract = html.unescape(str(page.get("extract", ""))).replace("\r\n", "\n")
    revisions = page.get("revisions", [])
    if not extract.strip() or not revisions or not revisions[0].get("revid"):
        raise RuntimeError(f"Wikisource page has no pinned text/revision: {title}")
    return extract, int(revisions[0]["revid"])


def clean_text(value: str) -> str:
    value = unicodedata.normalize("NFC", value).replace("\u00a0", " ")
    value = value.translate(
        str.maketrans(
            {
                "à": "a", "è": "e", "ì": "i", "ò": "o", "ù": "u",
                "À": "A", "È": "E", "Ì": "I", "Ò": "O", "Ù": "U",
            }
        )
    )
    value = re.sub(r"(?<=\w)[’'](?=\w)", "-", value)
    return re.sub(r"\s+", " ", value).strip()


def normalized(value: str) -> str:
    value = unicodedata.normalize("NFKD", clean_text(value).lower())
    return " ".join(
        re.findall(
            r"[^\W\d_]+",
            "".join(character for character in value if not unicodedata.combining(character)),
            flags=re.UNICODE,
        )
    )


def content_blocks(body: str) -> list[str]:
    blocks = [clean_text(block) for block in re.split(r"\n\s*\n+", body) if clean_text(block)]
    if len(blocks) >= 2:
        # Every 1914 chapter begins with an editorial synopsis, followed by verse 1.
        blocks = blocks[1:]
    return [block for block in blocks if not REFERENCE_LINE_RE.match(block)]


def split_inline_verses(body: str) -> list[dict[str, Any]]:
    blocks = content_blocks(body)
    if not blocks:
        return []
    text = clean_text(" ".join(blocks))
    markers: list[tuple[int, int, int]] = []
    expected = 2
    for match in INLINE_MARKER_RE.finditer(text):
        number = int(match.group(1))
        if number != expected:
            continue
        markers.append((number, match.start(), match.end()))
        expected += 1
    verses: list[dict[str, Any]] = []
    first_end = markers[0][1] if markers else len(text)
    first = clean_text(text[:first_end])
    if first:
        verses.append({"number": 1, "text": first})
    for index, (number, _start, content_start) in enumerate(markers):
        content_end = markers[index + 1][1] if index + 1 < len(markers) else len(text)
        verse_text = clean_text(text[content_start:content_end])
        if verse_text:
            verses.append({"number": number, "text": verse_text})
    return verses


def parse_chapters(extract: str) -> dict[int, list[dict[str, Any]]]:
    matches = list(CHAPTER_RE.finditer(extract))
    chapters: dict[int, list[dict[str, Any]]] = {}
    for index, match in enumerate(matches):
        number = int(match.group(1))
        start = match.end()
        end = matches[index + 1].start() if index + 1 < len(matches) else len(extract)
        chapters[number] = split_inline_verses(extract[start:end])
    return chapters


def download(url: str, destination: Path) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    if destination.exists():
        return
    request = urllib.request.Request(url, headers={"User-Agent": "EmanusSourceAudit/2.0"})
    with urllib.request.urlopen(request, timeout=120) as response, destination.open("wb") as handle:
        shutil.copyfileobj(response, handle)


def strip_usfm(value: str) -> str:
    value = re.sub(r"\\(?:f|x)\s.*?\\(?:f|x)\*", " ", value)
    value = re.sub(r"\\w\s+([^|\\]+)(?:\|[^\\]*)?\\w\*", r"\1", value)
    value = re.sub(r"\\[+a-zA-Z0-9-]+\*?", " ", value)
    value = re.sub(r"\|\S+", " ", value)
    return clean_text(value)


def parse_usfm_zip(path: Path) -> dict[tuple[str, int, int], str]:
    result: dict[tuple[str, int, int], str] = {}
    with zipfile.ZipFile(path) as archive:
        for name in archive.namelist():
            if not name.lower().endswith((".usfm", ".sfm")):
                continue
            raw = archive.read(name).decode("utf-8-sig", errors="strict")
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
                        result[current] = clean_text(result.get(current, "") + " " + continuation)
    return result


def digest(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def verify_repair5(book_id: str, extract: str) -> dict[int, list[dict[str, Any]]]:
    path = REPAIR5 / f"{book_id}.1.json"
    if not path.exists():
        raise RuntimeError(f"Verified repair5 candidate missing: {path}")
    document = json.loads(path.read_text(encoding="utf-8"))
    verses = document.get("verses", [])
    candidate_text = normalized(" ".join(str(verse.get("text", "")) for verse in verses))
    if book_id == "PS2":
        match = re.search(r"(?is)PSALMUL\s+NECANONIC\s+151\.?(.+)$", extract)
        witness = normalized(match.group(1) if match else extract)
    else:
        witness = normalized(extract)
    similarity = SequenceMatcher(None, candidate_text, witness).ratio()
    if similarity < 0.62:
        raise RuntimeError(f"{book_id}: repair5 candidate does not converge with 1914 witness ({similarity:.3f})")
    return {1: verses}


def write_chapter(
    book_id: str,
    name: str,
    chapter: int,
    verses: list[dict[str, Any]],
    title: str,
    revision: int,
    source_paths: dict[str, Path],
    witnesses: dict[str, dict[tuple[str, int, int], str]],
) -> dict[str, Any]:
    actual_numbers = [int(verse["number"]) for verse in verses]
    expected_numbers = sorted(
        number
        for source_book, source_chapter, number in witnesses["eng-webbe"]
        if source_book == book_id and source_chapter == chapter
    )
    continuous = actual_numbers == list(range(1, len(actual_numbers) + 1))
    blockers: list[str] = []
    if not verses:
        blockers.append("NO_VERSES")
    if not continuous:
        blockers.append("NON_CONTINUOUS_NUMBERS")
    if any(not clean_text(str(verse.get("text", ""))) for verse in verses):
        blockers.append("EMPTY_TEXT")
    greek_coverage = {
        source_id: sum(
            1 for number in actual_numbers if (book_id, chapter, number) in witness
        )
        for source_id, witness in witnesses.items()
        if source_id.startswith("grc")
    }
    warnings: list[str] = []
    if expected_numbers and actual_numbers != expected_numbers:
        warnings.append("VERSIFICATION_DIFFERS_FROM_ENGLISH_WITNESS")
    document = {
        "translation": "RO1914-N",
        "editionName": "Biblia Sinodală 1914 — ortografie normalizată",
        "bookId": book_id,
        "bookName": name,
        "chapter": chapter,
        "collection": "deuterocanon",
        "status": "in_review",
        "public": False,
        "source": {
            "romanianHistorical": {
                "id": "biblia-1914-wikisource",
                "pageTitle": title,
                "revision": revision,
                "license": "Public Domain",
                "role": "Romanian historical base",
            },
            "english": {
                "id": "eng-webbe",
                "sha256": digest(source_paths["eng-webbe"]),
                "license": "Public Domain",
            },
            "greek": [
                {"id": "grcbrent", "sha256": digest(source_paths["grcbrent"]), "license": "Public Domain"},
                {"id": "grclxx", "sha256": digest(source_paths["grclxx"]), "license": "Public Domain"},
            ],
        },
        "verses": verses,
        "audit": {
            "historicalOrthographyOnly": True,
            "semanticModernizationApplied": False,
            "expectedEnglishVerseNumbers": expected_numbers,
            "actualVerseNumbers": actual_numbers,
            "continuous": continuous,
            "greekCoverage": greek_coverage,
            "blocking": blockers,
            "warnings": warnings,
        },
    }
    (OUT / f"{book_id}.{chapter}.json").write_text(
        json.dumps(document, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    return {
        "verses": len(verses),
        "englishWitnessVerses": len(expected_numbers),
        "continuous": continuous,
        "greekCoverage": greek_coverage,
        "blocking": blockers,
        "warnings": warnings,
    }


def main() -> None:
    CACHE.mkdir(parents=True, exist_ok=True)
    OUT.mkdir(parents=True, exist_ok=True)
    for old in OUT.glob("*.json"):
        old.unlink()

    source_paths: dict[str, Path] = {}
    for source_id, url in SOURCE_URLS.items():
        target = CACHE / f"{source_id}.zip"
        download(url, target)
        source_paths[source_id] = target
    witnesses = {source_id: parse_usfm_zip(path) for source_id, path in source_paths.items()}

    report: dict[str, Any] = {
        "schemaVersion": 2,
        "sourceSnapshots": {
            source_id: {"url": SOURCE_URLS[source_id], "sha256": digest(path)}
            for source_id, path in source_paths.items()
        },
        "books": {},
        "newTranslationRequired": ["1ES", "BAR", "ESG"],
        "blocking": [],
    }

    for book_id, metadata in BOOKS.items():
        if metadata["mode"] == "new-translation":
            report["books"][book_id] = {
                "name": metadata["name"],
                "mode": "new-translation",
                "status": "routed-to-independent-translation-pipeline",
            }
            continue
        title = metadata["title"]
        try:
            extract, revision = page_extract(title)
            if metadata["mode"] == "verified-repair5":
                chapters = verify_repair5(book_id, extract)
            else:
                chapters = parse_chapters(extract)
        except Exception as error:  # noqa: BLE001
            report["blocking"].append({"bookId": book_id, "code": "SOURCE_EXTRACTION_FAILED", "message": str(error)})
            continue

        source_chapters = sorted(
            {chapter for source_book, chapter, _number in witnesses["eng-webbe"] if source_book == book_id}
        )
        parsed_chapters = sorted(chapters)
        book_report: dict[str, Any] = {
            "name": metadata["name"],
            "mode": metadata["mode"],
            "title": title,
            "revision": revision,
            "extractSha256": hashlib.sha256(extract.encode("utf-8")).hexdigest(),
            "parsedChapters": parsed_chapters,
            "englishWitnessChapters": source_chapters,
            "chapters": {},
        }
        if source_chapters and parsed_chapters != source_chapters:
            report["blocking"].append(
                {
                    "bookId": book_id,
                    "code": "CHAPTER_SET_MISMATCH",
                    "parsed": parsed_chapters,
                    "englishWitness": source_chapters,
                }
            )
        for chapter, verses in sorted(chapters.items()):
            result = write_chapter(
                book_id,
                metadata["name"],
                chapter,
                verses,
                title,
                revision,
                source_paths,
                witnesses,
            )
            book_report["chapters"][str(chapter)] = result
            for code in result["blocking"]:
                report["blocking"].append(
                    {"bookId": book_id, "chapter": chapter, "code": code}
                )
        report["books"][book_id] = book_report

    historical_ids = [book_id for book_id, meta in BOOKS.items() if meta["mode"] != "new-translation"]
    extracted_ids = [book_id for book_id in historical_ids if book_id in report["books"] and "chapters" in report["books"][book_id]]
    report["summary"] = {
        "worksInPr40": len(BOOKS),
        "historicalRomanianWorksExpected": len(historical_ids),
        "historicalRomanianWorksExtracted": len(extracted_ids),
        "newTranslationsRequired": len(report["newTranslationRequired"]),
        "chapterFiles": len(list(OUT.glob("*.json"))),
        "blockingIssues": len(report["blocking"]),
        "historicalStageReady": not report["blocking"] and len(extracted_ids) == len(historical_ids),
        "allTwelvePublicationReady": False,
    }
    REPORT.parent.mkdir(parents=True, exist_ok=True)
    REPORT.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(report["summary"], ensure_ascii=False, indent=2))
    if not report["summary"]["historicalStageReady"]:
        raise SystemExit("Historical Romanian deuterocanon still has blocking issues")


if __name__ == "__main__":
    main()
