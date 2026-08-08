#!/usr/bin/env python3
"""Extract four authentic early works from structured source transcriptions.

No Romanian text from PR #40 is reused. Every downloaded page is hashed, the
complete chapter set is required, navigation is removed, source numbering is
preserved, and editorial gaps are documented rather than silently renumbered.
"""
from __future__ import annotations

import hashlib
import json
import re
import unicodedata
from pathlib import Path
from typing import Any

import requests
from bs4 import BeautifulSoup, Tag

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "docs" / "data" / "biblia-emanus-early-source-candidates"
REPORT = ROOT / "docs" / "biblia-emanus" / "PR40-EARLY-WORKS-EXTRACTION.json"
USER_AGENT = "EmanusSourceAudit/4.1 (+https://github.com/vaduvel/Emanus)"

WORKS: dict[str, dict[str, Any]] = {
    "ENO": {
        "name": "1 Enoh",
        "chapters": 108,
        "url": "https://bible.ertale.com/ethiopiancanon/enoch/{chapter}/",
        "underlyingEdition": "R. H. Charles, The Book of Enoch, 1912/1917",
        "underlyingLicense": "Public Domain",
        "transcriptionRole": "structured mirror of public-domain Charles translation",
        "mode": "numbered-verses",
        "publicationLicense": "CC BY 4.0 for new Romanian translation",
    },
    "JUB": {
        "name": "Jubileele",
        "chapters": 50,
        "url": "https://www.ccel.org/c/charles/otpseudepig/jubilee/{chapter}.htm",
        "underlyingEdition": "R. H. Charles, The Apocrypha and Pseudepigrapha of the Old Testament, 1913",
        "underlyingLicense": "Public Domain",
        "transcriptionRole": "CCEL transcription of public-domain Charles translation",
        "mode": "numbered-verses",
        "publicationLicense": "CC BY 4.0 for new Romanian translation",
    },
    "DID": {
        "name": "Didascalia etiopiană",
        "chapters": 43,
        "url": "https://bible.ertale.com/ethiopiancanon/didascalia/{chapter}/",
        "underlyingEdition": "J. M. Harden, The Ethiopic Didascalia, 1920",
        "underlyingLicense": "Public Domain",
        "transcriptionRole": "structured mirror checked against Harden 1920 scan",
        "mode": "single-prose-unit",
        "publicationLicense": "CC BY 4.0 for new Romanian translation",
    },
    "4BA": {
        "name": "4 Baruh / Paralipomena lui Ieremia",
        "chapters": 9,
        "url": "https://bible.ertale.com/ethiopiancanon/4baruch/{chapter}/",
        "underlyingEdition": "CCAT Kraft–Purintun transcription of the Greek recension",
        "underlyingLicense": "Noncommercial reuse only per source notice",
        "transcriptionRole": "temporary structural and translation witness; Harris 1889 replacement required for unrestricted publication",
        "mode": "numbered-verses",
        "publicationLicense": "CC BY-NC 4.0 provisional research edition",
    },
}

# Kraft–Purintun exposes no unit numbered 4 Baruch 3:9. Keep the edition's
# numbering and record the gap instead of manufacturing or shifting a verse.
DOCUMENTED_SOURCE_GAPS: dict[tuple[str, int], set[int]] = {("4BA", 3): {9}}

# ERTale's Charles mirror accidentally omits the parallel doublet 90:16–18.
# These units are restored verbatim from the public-domain Charles page,
# revision 13274795, and are separately hashed in every output document.
ENOCH_90_SUPPLEMENT_URL = (
    "https://en.wikisource.org/wiki/"
    "The_Book_of_Enoch_(Charles)/Chapter_90?oldid=13274795"
)
ENOCH_90_SUPPLEMENT = {
    16: (
        "All the eagles and vultures and ravens and kites were gathered together, "
        "and there came with them all the sheep of the field, yea, they all came "
        "together, and helped each other to break that horn of the ram."
    ),
    17: (
        "And I saw that man, who wrote the book according to the command of the "
        "Lord, till he opened that book concerning the destruction which those "
        "twelve last shepherds had wrought, and showed that they had destroyed "
        "much more than their predecessors, before the Lord of the sheep."
    ),
    18: (
        "And I saw till the Lord of the sheep came unto them and took in His hand "
        "the staff of His wrath, and smote the earth, and the earth clave asunder, "
        "and all the beasts and all the birds of the heaven fell from among those "
        "sheep, and were swallowed up in the earth and it covered them."
    ),
}
ENOCH_90_SUPPLEMENT_SHA256 = hashlib.sha256(
    json.dumps(ENOCH_90_SUPPLEMENT, sort_keys=True).encode("utf-8")
).hexdigest()

STOP_MARKERS = {
    "books",
    "ethiopian canon",
    "built from public-domain sources.",
    "send feedback or error reports",
    "previous chapter",
    "next chapter",
}
VERSE_RE = re.compile(r"^([1-9][0-9]{0,2})\s*[.)]?\s+(.+)$", re.S)
BARE_NUMBER_RE = re.compile(r"^([1-9][0-9]{0,2})$")


def clean(value: str) -> str:
    value = unicodedata.normalize("NFC", value).replace("\u00a0", " ")
    return re.sub(r"\s+", " ", value).strip()


def fetch(url: str) -> tuple[str, str]:
    response = requests.get(url, headers={"User-Agent": USER_AGENT}, timeout=60)
    response.raise_for_status()
    return response.text, hashlib.sha256(response.content).hexdigest()


def content_root(soup: BeautifulSoup) -> Tag:
    for selector in ("main", "article", "#main", "#content", ".entry-content", ".post-content"):
        node = soup.select_one(selector)
        if isinstance(node, Tag):
            return node
    if isinstance(soup.body, Tag):
        return soup.body
    raise RuntimeError("HTML page has no body/content root")


def visible_lines(html: str) -> list[str]:
    soup = BeautifulSoup(html, "html.parser")
    root = content_root(soup)
    for selector in ("script", "style", "noscript", "nav", "header", "footer", "form", "aside"):
        for node in root.select(selector):
            node.decompose()
    return [line for raw in root.get_text("\n").splitlines() if (line := clean(raw))]


def heading_chapter(line: str) -> int | None:
    folded = clean(line).casefold().strip("[](){} ")
    match = re.fullmatch(r"chapter\s+([0-9]+)\.?", folded)
    return int(match.group(1)) if match else None


def find_text_start(lines: list[str], chapter: int) -> int:
    candidates = [index for index, line in enumerate(lines) if heading_chapter(line) == chapter]
    if not candidates:
        raise RuntimeError(f"chapter heading {chapter!r} not found")

    # CCEL repeats chapter labels in navigation. Select the occurrence whose
    # nearby content actually starts with verse 1, rather than the last label.
    for index in candidates:
        for probe in lines[index + 1 : index + 15]:
            if heading_chapter(probe) is not None:
                break
            match = VERSE_RE.match(probe)
            if (match and int(match.group(1)) == 1) or BARE_NUMBER_RE.fullmatch(probe) == "1":
                return index + 1
    return candidates[0] + 1


def trim_body(lines: list[str], start: int) -> list[str]:
    body: list[str] = []
    for line in lines[start:]:
        folded = line.casefold()
        if folded in STOP_MARKERS:
            break
        if folded.startswith("chapter:") or folded.startswith("from the apocrypha"):
            break
        if heading_chapter(line) is not None:
            break
        if line in {"* * *", "***"}:
            break
        body.append(line)
    while body and (
        body[-1].casefold().startswith("english translation:")
        or body[-1].casefold().startswith("source:")
    ):
        body.pop()
    return body


def parse_numbered(lines: list[str]) -> list[dict[str, Any]]:
    verses: list[dict[str, Any]] = []
    current: dict[str, Any] | None = None
    index = 0
    while index < len(lines):
        line = lines[index]
        bare = BARE_NUMBER_RE.fullmatch(line)
        if bare and index + 1 < len(lines):
            number = int(bare.group(1))
            text = clean(lines[index + 1])
            index += 2
        else:
            match = VERSE_RE.match(line)
            if match:
                number = int(match.group(1))
                text = clean(match.group(2))
                index += 1
            else:
                if current is not None:
                    current["text"] = clean(current["text"] + " " + line)
                index += 1
                continue
        if current is not None:
            verses.append(current)
        current = {"number": number, "text": text}
    if current is not None:
        verses.append(current)
    first_one = next((i for i, verse in enumerate(verses) if verse["number"] == 1), None)
    return verses[first_one:] if first_one is not None else verses


def parse_single(lines: list[str]) -> list[dict[str, Any]]:
    body = clean(" ".join(lines))
    body = re.sub(r"^1\s+", "", body)
    return [{"number": 1, "text": body}] if body else []


def restore_enoch_90(verses: list[dict[str, Any]]) -> tuple[list[dict[str, Any]], list[dict[str, str]]]:
    by_number = {int(verse["number"]): dict(verse) for verse in verses}
    missing = [number for number in ENOCH_90_SUPPLEMENT if number not in by_number]
    for number in missing:
        by_number[number] = {"number": number, "text": ENOCH_90_SUPPLEMENT[number]}
    witnesses: list[dict[str, str]] = []
    if missing:
        witnesses.append(
            {
                "role": "restores omitted Charles parallel doublets 90:16–18",
                "url": ENOCH_90_SUPPLEMENT_URL,
                "sha256": ENOCH_90_SUPPLEMENT_SHA256,
            }
        )
    return [by_number[number] for number in sorted(by_number)], witnesses


def expected_numbers(book_id: str, chapter: int, verses: list[dict[str, Any]]) -> list[int]:
    if not verses:
        return []
    gaps = DOCUMENTED_SOURCE_GAPS.get((book_id, chapter), set())
    maximum = max(int(verse["number"]) for verse in verses)
    return [number for number in range(1, maximum + 1) if number not in gaps]


def validate_verses(book_id: str, chapter: int, verses: list[dict[str, Any]]) -> list[str]:
    if not verses:
        return ["NO_TEXT"]
    issues: list[str] = []
    numbers = [int(verse["number"]) for verse in verses]
    if numbers != expected_numbers(book_id, chapter, verses):
        issues.append("NON_CONTINUOUS_VERSE_NUMBERS")
    if any(not str(verse["text"]).strip() for verse in verses):
        issues.append("EMPTY_VERSE")
    combined = " ".join(str(verse["text"]) for verse in verses)
    if any(marker in combined.casefold() for marker in ("send feedback", "cookie", "privacy policy", "chapter:")):
        issues.append("NAVIGATION_LEAK")
    if len(combined) < 20:
        issues.append("IMPLAUSIBLY_SHORT")
    if book_id == "DID" and len(verses) != 1:
        issues.append("DIDASCALIA_MUST_BE_SINGLE_PROSE_UNIT")
    return issues


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for path in OUT.glob("*.json"):
        path.unlink()

    report: dict[str, Any] = {
        "schemaVersion": 3,
        "documentedSourceGaps": {
            f"{book_id}.{chapter}": sorted(gaps)
            for (book_id, chapter), gaps in DOCUMENTED_SOURCE_GAPS.items()
        },
        "works": {},
        "blocking": [],
    }

    for book_id, metadata in WORKS.items():
        work_record: dict[str, Any] = {
            "name": metadata["name"],
            "expectedChapters": metadata["chapters"],
            "sourcePages": {},
            "chapters": {},
            "publicationLicense": metadata["publicationLicense"],
        }
        for chapter in range(1, metadata["chapters"] + 1):
            url = metadata["url"].format(chapter=chapter)
            supplemental_sources: list[dict[str, str]] = []
            try:
                html, page_hash = fetch(url)
                lines = visible_lines(html)
                start = find_text_start(lines, chapter)
                body = trim_body(lines, start)
                verses = parse_single(body) if metadata["mode"] == "single-prose-unit" else parse_numbered(body)
                if book_id == "ENO" and chapter == 90:
                    verses, supplemental_sources = restore_enoch_90(verses)
                issues = validate_verses(book_id, chapter, verses)
            except Exception as error:  # noqa: BLE001
                page_hash = ""
                verses = []
                issues = [f"EXTRACTION_ERROR:{type(error).__name__}:{error}"]

            work_record["sourcePages"][str(chapter)] = {
                "url": url,
                "sha256": page_hash,
                "supplementalSources": supplemental_sources,
            }
            work_record["chapters"][str(chapter)] = {
                "verseCount": len(verses),
                "numbers": [int(verse["number"]) for verse in verses],
                "documentedGaps": sorted(DOCUMENTED_SOURCE_GAPS.get((book_id, chapter), set())),
                "issues": issues,
            }
            if issues:
                report["blocking"].append({"bookId": book_id, "chapter": chapter, "issues": issues})

            document = {
                "language": "en",
                "bookId": book_id,
                "bookName": metadata["name"],
                "chapter": chapter,
                "collection": "early-jewish-and-christian-writings",
                "status": "source_verified" if not issues else "source_review",
                "public": False,
                "source": {
                    "pageUrl": url,
                    "pageSha256": page_hash,
                    "underlyingEdition": metadata["underlyingEdition"],
                    "underlyingLicense": metadata["underlyingLicense"],
                    "transcriptionRole": metadata["transcriptionRole"],
                    "publicationLicense": metadata["publicationLicense"],
                    "documentedNumberingGaps": sorted(DOCUMENTED_SOURCE_GAPS.get((book_id, chapter), set())),
                    "supplementalSources": supplemental_sources,
                },
                "verses": verses,
                "audit": {"blocking": issues},
            }
            (OUT / f"{book_id}.{chapter}.json").write_text(
                json.dumps(document, ensure_ascii=False, indent=2) + "\n",
                encoding="utf-8",
            )
        report["works"][book_id] = work_record

    report["summary"] = {
        "works": len(WORKS),
        "expectedChapters": sum(item["chapters"] for item in WORKS.values()),
        "createdChapters": len(list(OUT.glob("*.json"))),
        "blockingIssues": len(report["blocking"]),
        "sourceExtractionReady": not report["blocking"],
    }
    REPORT.parent.mkdir(parents=True, exist_ok=True)
    REPORT.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(report["summary"], ensure_ascii=False, indent=2))
    if report["blocking"]:
        raise SystemExit("Early-work source extraction has blocking issues")


if __name__ == "__main__":
    main()
