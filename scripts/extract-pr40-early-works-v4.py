#!/usr/bin/env python3
"""Extract all four early works from pinned, source-verifiable transcriptions.

Jubilees is parsed from CCEL's ordered verse lists. The Ethiopic Didascalia
uses a commit-pinned JSON transcription of Harden's public-domain 1920 edition,
because the ERTale OCR witness interleaves body text with the two-column
critical apparatus. The noisy ERTale page and its SHA-256 remain recorded as a
secondary witness; the text used for translation is the clean pinned chapter.
"""
from __future__ import annotations

import html as html_module
import importlib.util
import json
import re
from pathlib import Path
from typing import Any

from bs4 import BeautifulSoup, NavigableString, Tag

SCRIPT = Path(__file__).with_name("extract-pr40-early-works.py")
spec = importlib.util.spec_from_file_location("early_source_v1", SCRIPT)
if spec is None or spec.loader is None:
    raise SystemExit(f"Cannot load {SCRIPT}")
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)

module.WORKS["JUB"]["url"] = (
    "https://www.ccel.org/c/charles/otpseudepig/jubilee/{chapter}.htm"
)

DIDASCALIA_MIRROR_REPOSITORY = "https://github.com/JWJeffery/PrayerAppNew"
DIDASCALIA_MIRROR_COMMIT = "4e5e39f4fb98f3d2b9556ba3eaf23ce4d2891486"
DIDASCALIA_MIRROR_PATH = "data/bible/ET/didaskaliaET.json"
DIDASCALIA_MIRROR_URL = (
    "https://raw.githubusercontent.com/JWJeffery/PrayerAppNew/"
    f"{DIDASCALIA_MIRROR_COMMIT}/{DIDASCALIA_MIRROR_PATH}"
)
DIDASCALIA_BLOB_URL = (
    f"{DIDASCALIA_MIRROR_REPOSITORY}/blob/{DIDASCALIA_MIRROR_COMMIT}/"
    f"{DIDASCALIA_MIRROR_PATH}"
)
DIDASCALIA_APPARATUS = re.compile(
    r"(?:\b(?:P|A|AC|Eth\.?|Platt|MS|MSS)\s+"
    r"(?:adds?|omits?|reads?|has|is\s+unintelligible)\b|"
    r"THE\s+ETHIOPIC\s+DIDASCALIA|"
    r"\b(?:right\s+reading|preceding\s+words|manuscript\s+ends)\b)",
    re.I,
)
DIDASCALIA_FORBIDDEN_GLYPHS = set("�\x00§®©")

_original_fetch = module.fetch
_didascalia_cache: tuple[dict[int, str], str] | None = None
_didascalia_raw_witnesses: dict[int, dict[str, str]] = {}


def _own_text(item: Tag) -> str:
    clone_soup = BeautifulSoup(str(item), "html.parser")
    clone = clone_soup.find("li")
    if not isinstance(clone, Tag):
        return ""
    for nested in list(clone.find_all("li")):
        if nested is not clone:
            nested.decompose()
    parts: list[str] = []
    for node in clone.descendants:
        if isinstance(node, NavigableString):
            parts.append(str(node))
    return module.clean(" ".join(parts))


def _list_units(ordered: Tag) -> list[str]:
    units: list[str] = []
    for item in ordered.find_all("li"):
        text = _own_text(item)
        if text:
            units.append(text)
    return units


def _load_didascalia() -> tuple[dict[int, str], str]:
    global _didascalia_cache
    if _didascalia_cache is not None:
        return _didascalia_cache

    raw, source_hash = _original_fetch(DIDASCALIA_MIRROR_URL)
    try:
        payload = json.loads(raw)
    except json.JSONDecodeError as error:
        raise RuntimeError(f"Pinned Didascalia JSON is invalid: {error}") from error

    meta = payload.get("meta")
    if not isinstance(meta, dict):
        raise RuntimeError("Pinned Didascalia JSON lacks metadata")
    if meta.get("copyright") != "Public Domain":
        raise RuntimeError("Pinned Didascalia transcription must declare Public Domain")
    if "Harden" not in str(meta.get("version", "")) or "1920" not in str(meta.get("version", "")):
        raise RuntimeError("Pinned Didascalia transcription is not Harden 1920")

    raw_chapters = payload.get("chapters")
    if not isinstance(raw_chapters, list) or len(raw_chapters) != 43:
        raise RuntimeError("Pinned Didascalia transcription must contain 43 chapters")

    chapters: dict[int, str] = {}
    for record in raw_chapters:
        if not isinstance(record, dict):
            raise RuntimeError("Pinned Didascalia chapter record is malformed")
        chapter = int(record.get("num", 0))
        verses = record.get("verses")
        if chapter < 1 or chapter > 43 or chapter in chapters:
            raise RuntimeError(f"Pinned Didascalia chapter number is invalid: {chapter}")
        if not isinstance(verses, list) or len(verses) != 1:
            raise RuntimeError(f"Didascalia {chapter}: expected one prose source unit")
        verse = verses[0]
        if not isinstance(verse, dict) or int(verse.get("num", 0)) != 1:
            raise RuntimeError(f"Didascalia {chapter}: source unit number must be 1")
        text = module.clean(str(verse.get("text", "")))
        if len(text.split()) < 40:
            raise RuntimeError(f"Didascalia {chapter}: clean transcription is implausibly short")
        marker = DIDASCALIA_APPARATUS.search(text)
        if marker:
            raise RuntimeError(
                f"Didascalia {chapter}: critical-apparatus residue {marker.group(0)!r}"
            )
        if any(character in text for character in DIDASCALIA_FORBIDDEN_GLYPHS):
            raise RuntimeError(f"Didascalia {chapter}: invalid OCR glyph in clean transcription")
        chapters[chapter] = text

    if sorted(chapters) != list(range(1, 44)):
        raise RuntimeError("Pinned Didascalia transcription chapter coverage is incomplete")
    _didascalia_cache = chapters, source_hash
    return _didascalia_cache


def _didascalia_html(chapter: int, text: str) -> str:
    return "\n".join(
        (
            "<html><body>",
            f"<h1>Chapter {chapter}</h1>",
            f"<p>1 {html_module.escape(text)}</p>",
            "</body></html>",
        )
    )


def fetch(url: str) -> tuple[str, str]:
    if "/didascalia/" in url:
        chapter_match = re.search(r"/([0-9]+)/?(?:$|[?#])", url)
        if not chapter_match:
            raise RuntimeError(f"Cannot derive Didascalia chapter from {url}")
        chapter = int(chapter_match.group(1))
        raw_html, raw_hash = _original_fetch(url)
        del raw_html
        _didascalia_raw_witnesses[chapter] = {"url": url, "sha256": raw_hash}
        chapters, clean_hash = _load_didascalia()
        text = chapters.get(chapter)
        if text is None:
            raise RuntimeError(f"Pinned Didascalia transcription lacks chapter {chapter}")
        return _didascalia_html(chapter, text), clean_hash

    raw_html, source_hash = _original_fetch(url)
    if "/jubilee/" not in url:
        return raw_html, source_hash

    chapter_match = re.search(r"/([0-9]+)\.htm(?:$|[?#])", url)
    if not chapter_match:
        raise RuntimeError(f"Cannot derive Jubilees chapter from {url}")
    chapter = int(chapter_match.group(1))

    soup = BeautifulSoup(raw_html, "html.parser")
    heading = next(
        (
            node
            for node in soup.find_all(re.compile(r"^h[1-6]$"))
            if module.heading_chapter(node.get_text(" ", strip=True)) == chapter
        ),
        None,
    )
    ordered = heading.find_next("ol") if isinstance(heading, Tag) else None
    units = _list_units(ordered) if isinstance(ordered, Tag) else []

    if not units:
        candidates = [node for node in soup.find_all("ol") if isinstance(node, Tag)]
        ranked = sorted(
            ((_list_units(node), node) for node in candidates),
            key=lambda pair: len(pair[0]),
            reverse=True,
        )
        if ranked and ranked[0][0]:
            units = ranked[0][0]

    if not units:
        raise RuntimeError(f"Jubilees {chapter}: ordered verse list contains no units")

    synthetic = ["<html><body>", f"<h1>Chapter {chapter}</h1>"]
    synthetic.extend(
        f"<p>{number} {html_module.escape(text)}</p>"
        for number, text in enumerate(units, start=1)
    )
    synthetic.append("</body></html>")
    return "\n".join(synthetic), source_hash


def _postprocess_didascalia_provenance() -> None:
    _chapters, clean_hash = _load_didascalia()
    for chapter in range(1, 44):
        path = module.OUT / f"DID.{chapter}.json"
        document = json.loads(path.read_text(encoding="utf-8"))
        witness = _didascalia_raw_witnesses.get(chapter)
        if witness is None:
            raise RuntimeError(f"Didascalia {chapter}: raw OCR witness was not recorded")
        source = document["source"]
        source.update(
            {
                "pageUrl": f"{DIDASCALIA_BLOB_URL}#chapter-{chapter}",
                "pageSha256": clean_hash,
                "transcriptionRole": (
                    "commit-pinned clean transcription of public-domain Harden 1920; "
                    "ERTale OCR retained only as an independently hashed secondary witness"
                ),
                "cleanTranscription": {
                    "repository": DIDASCALIA_MIRROR_REPOSITORY,
                    "commit": DIDASCALIA_MIRROR_COMMIT,
                    "path": DIDASCALIA_MIRROR_PATH,
                    "sha256": clean_hash,
                    "chapter": chapter,
                },
                "rawOcrWitness": witness,
            }
        )
        path.write_text(
            json.dumps(document, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )

    report = json.loads(module.REPORT.read_text(encoding="utf-8"))
    didascalia = report["works"]["DID"]
    didascalia["cleanTranscription"] = {
        "repository": DIDASCALIA_MIRROR_REPOSITORY,
        "commit": DIDASCALIA_MIRROR_COMMIT,
        "path": DIDASCALIA_MIRROR_PATH,
        "sha256": clean_hash,
        "underlyingEdition": "J. M. Harden, The Ethiopic Didascalia, 1920",
        "underlyingLicense": "Public Domain",
    }
    for chapter in range(1, 44):
        witness = _didascalia_raw_witnesses[chapter]
        didascalia["sourcePages"][str(chapter)] = {
            "url": f"{DIDASCALIA_BLOB_URL}#chapter-{chapter}",
            "sha256": clean_hash,
            "rawOcrWitness": witness,
            "supplementalSources": [],
        }
    module.REPORT.write_text(
        json.dumps(report, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


module.fetch = fetch
module.main()
_postprocess_didascalia_provenance()
