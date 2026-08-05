#!/usr/bin/env python3
"""Rebuild the 12 PR40 deuterocanonical works from authentic public-domain sources.

The Romanian base is Biblia sinodală 1914 from Romanian Wikisource. English
and Greek public-domain USFM editions are pinned as structural and semantic
witnesses. Output remains in_review until all count and text gates pass.
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
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "docs" / "data" / "biblia-emanus-deuterocanon-candidates"
REPORT = ROOT / "docs" / "biblia-emanus" / "PR40-DEUTEROCANON-REBUILD-REPORT.json"
CACHE = ROOT / ".cache" / "pr40-deuterocanon"
API = "https://ro.wikisource.org/w/api.php"

BOOKS: dict[str, dict[str, Any]] = {
    "1ES": {"name": "3 Ezdra", "aliases": ["a treia a lui ezdra", "cartea a treia a lui esdra", "3 ezdra", "iii ezdra"]},
    "1MA": {"name": "1 Macabei", "aliases": ["intai a macabeilor", "intaia a macabeilor", "1 macabei", "i macabei"]},
    "2MA": {"name": "2 Macabei", "aliases": ["a doua a macabeilor", "2 macabei", "ii macabei"]},
    "3MA": {"name": "3 Macabei", "aliases": ["a treia a macabeilor", "3 macabei", "iii macabei"]},
    "BAR": {"name": "Baruh", "aliases": ["baruh"]},
    "ESG": {"name": "Adăugirile grecești la Estera", "aliases": ["adaosurile la estera", "adaogirile la estera", "adaugirile la estera", "estera greceasca"]},
    "JDT": {"name": "Iudita", "aliases": ["iudita"]},
    "MAN": {"name": "Rugăciunea lui Manase", "aliases": ["rugaciunea lui manase", "manase"]},
    "PS2": {"name": "Psalmul 151", "aliases": ["psalmul 151", "psalm 151"]},
    "SIR": {"name": "Înțelepciunea lui Isus, fiul lui Sirah", "aliases": ["isus sirah", "fiul lui sirah", "ecleziasticul", "sirah"]},
    "TOB": {"name": "Tobit", "aliases": ["tovit", "tobit"]},
    "WIS": {"name": "Înțelepciunea lui Solomon", "aliases": ["intelepciunea lui solomon", "solomon"]},
}

SOURCE_URLS = {
    "eng-webbe": "https://ebible.org/Scriptures/eng-webbe_usfm.zip",
    "grcbrent": "https://ebible.org/Scriptures/grcbrent_usfm.zip",
    "grclxx": "https://ebible.org/Scriptures/grclxx_usfm.zip",
}

CHAPTER_RE = re.compile(r"(?im)^\s*(?:CAP\.|CAPITOLUL)\s*([0-9]+)\.?\s*$")
VERSE_RE = re.compile(r"^\s*([0-9]+)[\.\)]?\s+(.+)$", re.S)


def request_json(params: dict[str, str]) -> dict[str, Any]:
    query = urllib.parse.urlencode({**params, "format": "json", "formatversion": "2"})
    req = urllib.request.Request(f"{API}?{query}", headers={"User-Agent": "EmanusSourceAudit/1.0"})
    with urllib.request.urlopen(req, timeout=60) as response:
        return json.loads(response.read().decode("utf-8"))


def normalize_key(value: str) -> str:
    value = unicodedata.normalize("NFKD", value.lower())
    value = "".join(ch for ch in value if not unicodedata.combining(ch))
    return " ".join(re.findall(r"[a-z0-9]+", value))


def wikilinks() -> list[str]:
    titles: list[str] = []
    params = {
        "action": "query",
        "titles": "Biblia 1914",
        "prop": "links",
        "plnamespace": "0",
        "pllimit": "max",
    }
    while True:
        payload = request_json(params)
        pages = payload.get("query", {}).get("pages", [])
        for page in pages:
            for item in page.get("links", []):
                title = str(item.get("title", ""))
                if title.startswith("Biblia 1914/"):
                    titles.append(title)
        continuation = payload.get("continue")
        if not continuation:
            break
        params.update({str(k): str(v) for k, v in continuation.items()})
    return sorted(set(titles))


def match_pages(titles: list[str]) -> tuple[dict[str, str], dict[str, list[str]]]:
    normalized = {title: normalize_key(title.split("/", 1)[-1]) for title in titles}
    matches: dict[str, str] = {}
    candidates: dict[str, list[str]] = {}
    for book_id, meta in BOOKS.items():
        scored: list[tuple[int, str]] = []
        for title, key in normalized.items():
            score = 0
            for alias in meta["aliases"]:
                alias_key = normalize_key(alias)
                if key == alias_key:
                    score = max(score, 1000 + len(alias_key))
                elif alias_key in key:
                    score = max(score, 500 + len(alias_key))
            if score:
                scored.append((score, title))
        scored.sort(reverse=True)
        candidates[book_id] = [title for _, title in scored[:10]]
        if scored:
            matches[book_id] = scored[0][1]
    return matches, candidates


def page_extract(title: str) -> tuple[str, int | None]:
    payload = request_json({
        "action": "query",
        "titles": title,
        "prop": "extracts|revisions",
        "explaintext": "1",
        "exsectionformat": "plain",
        "rvprop": "ids",
        "rvlimit": "1",
    })
    pages = payload.get("query", {}).get("pages", [])
    if not pages:
        raise RuntimeError(f"No Wikisource page for {title}")
    page = pages[0]
    extract = html.unescape(str(page.get("extract", ""))).replace("\r\n", "\n")
    revisions = page.get("revisions", [])
    revision = int(revisions[0]["revid"]) if revisions and revisions[0].get("revid") else None
    return extract, revision


def clean_text(value: str) -> str:
    value = unicodedata.normalize("NFC", value)
    value = value.replace("\u00a0", " ")
    value = value.translate(str.maketrans({"à": "a", "è": "e", "ì": "i", "ò": "o", "ù": "u", "À": "A", "È": "E", "Ì": "I", "Ò": "O", "Ù": "U"}))
    value = re.sub(r"(?<=\w)[’'](?=\w)", "-", value)
    value = re.sub(r"\s+", " ", value).strip()
    return value


def parse_chapters(extract: str) -> dict[int, list[dict[str, Any]]]:
    matches = list(CHAPTER_RE.finditer(extract))
    chapters: dict[int, list[dict[str, Any]]] = {}
    for index, match in enumerate(matches):
        number = int(match.group(1))
        start = match.end()
        end = matches[index + 1].start() if index + 1 < len(matches) else len(extract)
        body = extract[start:end].strip()
        blocks = [clean_text(block) for block in re.split(r"\n\s*\n+", body) if clean_text(block)]
        if not blocks:
            chapters[number] = []
            continue
        # Wikisource places a short chapter synopsis before the actual first verse.
        if len(blocks) >= 2 and not VERSE_RE.match(blocks[0]) and (VERSE_RE.match(blocks[1]) or not re.match(r"^1[\.\)]?\s", blocks[1])):
            blocks = blocks[1:]
        verses: list[dict[str, Any]] = []
        next_number = 1
        for block in blocks:
            verse_match = VERSE_RE.match(block)
            if verse_match:
                verse_number = int(verse_match.group(1))
                text = clean_text(verse_match.group(2))
            else:
                verse_number = next_number
                text = block
            if not text:
                continue
            verses.append({"number": verse_number, "text": text})
            next_number = verse_number + 1
        # Merge continuation blocks accidentally split from the preceding verse.
        merged: list[dict[str, Any]] = []
        for verse in verses:
            if merged and verse["number"] <= merged[-1]["number"]:
                merged[-1]["text"] = clean_text(merged[-1]["text"] + " " + verse["text"])
            else:
                merged.append(verse)
        chapters[number] = merged
    return chapters


def download(url: str, destination: Path) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    if destination.exists():
        return
    req = urllib.request.Request(url, headers={"User-Agent": "EmanusSourceAudit/1.0"})
    with urllib.request.urlopen(req, timeout=120) as response, destination.open("wb") as handle:
        shutil.copyfileobj(response, handle)


def strip_usfm(value: str) -> str:
    value = re.sub(r"\\(?:f|x)\s.*?\\(?:f|x)\*", " ", value)
    value = re.sub(r"\\w\s+([^|\\]+)(?:\|[^\\]*)?\\w\*", r"\1", value)
    value = re.sub(r"\\[+a-zA-Z0-9-]+\*?", " ", value)
    value = re.sub(r"\|\S+", " ", value)
    return re.sub(r"\s+", " ", value).strip()


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
                if current and re.match(r"^\\(?:p|m|q[0-9]*|qm[0-9]*|li[0-9]*|pi[0-9]*|pc|pr|cls|nb)(?:\s|$)", line):
                    continuation = strip_usfm(line)
                    if continuation:
                        result[current] = clean_text(result.get(current, "") + " " + continuation)
    return result


def digest(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


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

    titles = wikilinks()
    page_matches, page_candidates = match_pages(titles)
    report: dict[str, Any] = {
        "schemaVersion": 1,
        "sourceSnapshots": {source_id: {"url": SOURCE_URLS[source_id], "sha256": digest(path)} for source_id, path in source_paths.items()},
        "wikisourceLinkCount": len(titles),
        "pageMatches": page_matches,
        "pageCandidates": page_candidates,
        "books": {},
        "blocking": [],
    }

    for book_id, meta in BOOKS.items():
        title = page_matches.get(book_id)
        if not title:
            report["blocking"].append({"bookId": book_id, "code": "WIKISOURCE_PAGE_NOT_FOUND"})
            continue
        extract, revision = page_extract(title)
        chapters = parse_chapters(extract)
        source_chapters = sorted({chapter for (source_book, chapter, _) in witnesses["eng-webbe"] if source_book == book_id})
        parsed_chapters = sorted(chapters)
        book_report: dict[str, Any] = {
            "title": title,
            "revision": revision,
            "extractSha256": hashlib.sha256(extract.encode("utf-8")).hexdigest(),
            "parsedChapters": parsed_chapters,
            "expectedEnglishChapters": source_chapters,
            "chapters": {},
        }
        if source_chapters and parsed_chapters != source_chapters:
            report["blocking"].append({"bookId": book_id, "code": "CHAPTER_SET_MISMATCH", "parsed": parsed_chapters, "expected": source_chapters})

        for chapter, verses in sorted(chapters.items()):
            expected_numbers = sorted(number for (source_book, source_chapter, number) in witnesses["eng-webbe"] if source_book == book_id and source_chapter == chapter)
            actual_numbers = [int(verse["number"]) for verse in verses]
            continuous = actual_numbers == list(range(1, len(actual_numbers) + 1))
            chapter_blocking: list[str] = []
            if not verses:
                chapter_blocking.append("NO_VERSES")
            if not continuous:
                chapter_blocking.append("NON_CONTINUOUS_NUMBERS")
            if expected_numbers and actual_numbers != expected_numbers:
                chapter_blocking.append("VERSE_NUMBER_MISMATCH")
            greek_coverage = {
                source_id: sum(1 for number in actual_numbers if (book_id, chapter, number) in witness)
                for source_id, witness in witnesses.items()
                if source_id.startswith("grc")
            }
            if chapter_blocking:
                report["blocking"].append({"bookId": book_id, "chapter": chapter, "codes": chapter_blocking, "actualNumbers": actual_numbers, "expectedNumbers": expected_numbers})
            doc = {
                "translation": "RO1914-N",
                "editionName": "Biblia Sinodală 1914 — ortografie normalizată",
                "bookId": book_id,
                "bookName": meta["name"],
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
                    "english": {"id": "eng-webbe", "sha256": digest(source_paths["eng-webbe"]), "license": "Public Domain"},
                    "greek": [
                        {"id": "grcbrent", "sha256": digest(source_paths["grcbrent"]), "license": "Public Domain"},
                        {"id": "grclxx", "sha256": digest(source_paths["grclxx"]), "license": "Public Domain"},
                    ],
                },
                "verses": verses,
                "audit": {
                    "historicalOrthographyOnly": True,
                    "semanticModernizationApplied": False,
                    "expectedVerseNumbers": expected_numbers,
                    "actualVerseNumbers": actual_numbers,
                    "continuous": continuous,
                    "greekCoverage": greek_coverage,
                    "blocking": chapter_blocking,
                },
            }
            (OUT / f"{book_id}.{chapter}.json").write_text(json.dumps(doc, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
            book_report["chapters"][str(chapter)] = {
                "verses": len(verses),
                "expected": len(expected_numbers),
                "continuous": continuous,
                "greekCoverage": greek_coverage,
                "blocking": chapter_blocking,
            }
        report["books"][book_id] = book_report

    report["summary"] = {
        "booksExpected": len(BOOKS),
        "booksParsed": len(report["books"]),
        "chapterFiles": len(list(OUT.glob("*.json"))),
        "blockingIssues": len(report["blocking"]),
        "publicationReady": not report["blocking"],
    }
    REPORT.parent.mkdir(parents=True, exist_ok=True)
    REPORT.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(report["summary"], ensure_ascii=False, indent=2))
    if report["blocking"]:
        raise SystemExit("Deuterocanon extraction has blocking issues; inspect report artifact")


if __name__ == "__main__":
    main()
