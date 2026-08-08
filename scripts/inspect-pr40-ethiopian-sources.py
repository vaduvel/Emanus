#!/usr/bin/env python3
"""Pin and diagnose chapter structures in four public-domain early works.

OCR editions do not share one heading convention. This audit records strict
headings plus broad candidate lines and their contexts. It does not create
chapters or translation text; ambiguous structures remain blocked.
"""
from __future__ import annotations

import hashlib
import json
import re
import shutil
import urllib.request
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
CACHE = ROOT / ".cache" / "pr40-ethiopian-sources"
OUT = ROOT / "docs" / "biblia-emanus" / "PR40-ETHIOPIAN-SOURCE-INVENTORY.json"

SOURCES: dict[str, dict[str, str]] = {
    "ENO": {
        "name": "1 Enoh",
        "edition": "R. H. Charles, The Book of Enoch, 1917",
        "url": "https://www.gutenberg.org/cache/epub/77935/pg77935.txt",
        "license": "Public Domain",
        "expectedChapters": "108",
    },
    "JUB": {
        "name": "Jubileele",
        "edition": "R. H. Charles, The Book of Jubilees, 1902",
        "url": "https://archive.org/download/bookofjubileesor00char/bookofjubileesor00char_djvu.txt",
        "license": "Public Domain",
        "expectedChapters": "50",
    },
    "DID": {
        "name": "Didascalia etiopiană",
        "edition": "J. M. Harden, The Ethiopic Didascalia, 1920",
        "url": "https://archive.org/download/cu31924096083336/cu31924096083336_djvu.txt",
        "license": "Public Domain",
        "expectedChapters": "43",
    },
    "4BA": {
        "name": "4 Baruh / Restul cuvintelor lui Baruh",
        "edition": "J. Rendel Harris, The Rest of the Words of Baruch, 1889",
        "url": "https://archive.org/download/restofwordsofbar00harruoft/restofwordsofbar00harruoft_djvu.txt",
        "license": "Public Domain",
        "expectedChapters": "9",
    },
}

STRICT_PATTERNS = [
    ("chapter-word", re.compile(r"^\s*CHAPTER\s+([IVXLCDM]+|[0-9]+)\.?\s*$", re.I)),
    ("chapter-abbrev", re.compile(r"^\s*CHAP(?:TER)?\.\s*([IVXLCDM]+|[0-9]+)\.?\s*$", re.I)),
    ("roman-standalone", re.compile(r"^\s*([IVXLCDM]+)\.\s*$")),
    ("roman-inline-verse-one", re.compile(r"^\s*([IVXLCDM]+)\.\s+(?:\([^)]{0,200}\)\s*)?1\.\s+.+$", re.I)),
    ("arabic-inline-verse-one", re.compile(r"^\s*([0-9]{1,3})\.\s+(?:\([^)]{0,200}\)\s*)?1\.\s+.+$", re.I)),
]
BROAD_PATTERNS = [
    re.compile(r"\bCHAP(?:TER)?\b", re.I),
    re.compile(r"^\s*[IVXLCDM]{1,12}\.\s+.+$", re.I),
    re.compile(r"^\s*[0-9]{1,3}\.\s+1\.\s+.+$", re.I),
    re.compile(r"\b(?:ENOCH|JUBILEES|DIDASCALIA|BARUCH|JEREMIAH)\b", re.I),
    re.compile(r"\b(?:CONTENTS|TABLE OF CONTENTS|TRANSLATION|TEXT)\b", re.I),
]


def download(url: str, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    request = urllib.request.Request(url, headers={"User-Agent": "EmanusSourceAudit/3.0"})
    with urllib.request.urlopen(request, timeout=180) as response, path.open("wb") as handle:
        shutil.copyfileobj(response, handle)


def clean_line(value: str) -> str:
    return re.sub(r"\s+", " ", value.replace("\ufeff", "")).strip()


def context(lines: list[str], index: int, radius: int = 3) -> list[str]:
    return [
        cleaned
        for value in lines[max(0, index - radius):min(len(lines), index + radius + 1)]
        if (cleaned := clean_line(value))
    ]


def main() -> None:
    CACHE.mkdir(parents=True, exist_ok=True)
    records: dict[str, Any] = {}
    blockers: list[dict[str, str]] = []
    for book_id, metadata in SOURCES.items():
        path = CACHE / f"{book_id}.txt"
        try:
            download(metadata["url"], path)
            raw = path.read_bytes()
            text = raw.decode("utf-8-sig", errors="replace")
        except Exception as error:  # noqa: BLE001
            blockers.append({"bookId": book_id, "code": "DOWNLOAD_FAILED", "message": str(error)})
            continue

        lines = text.splitlines()
        strict: list[dict[str, Any]] = []
        broad: list[dict[str, Any]] = []
        for zero_index, line in enumerate(lines):
            cleaned = clean_line(line)
            if not cleaned:
                continue
            for label, pattern in STRICT_PATTERNS:
                match = pattern.match(cleaned)
                if match:
                    strict.append(
                        {
                            "line": zero_index + 1,
                            "value": cleaned,
                            "capture": match.group(1),
                            "pattern": label,
                            "context": context(lines, zero_index),
                        }
                    )
                    break
            if any(pattern.search(cleaned) for pattern in BROAD_PATTERNS):
                broad.append(
                    {
                        "line": zero_index + 1,
                        "value": cleaned,
                        "context": context(lines, zero_index, 2),
                    }
                )

        start = next(
            (index for index, line in enumerate(lines, start=1) if "START OF THE PROJECT GUTENBERG EBOOK" in line),
            None,
        )
        end = next(
            (index for index, line in enumerate(lines, start=1) if "END OF THE PROJECT GUTENBERG EBOOK" in line),
            None,
        )
        records[book_id] = {
            **metadata,
            "sha256": hashlib.sha256(raw).hexdigest(),
            "bytes": len(raw),
            "lines": len(lines),
            "gutenbergBodyStart": start,
            "gutenbergBodyEnd": end,
            "strictHeadingCount": len(strict),
            "strictHeadingSamples": strict[:500],
            "broadCandidateCount": len(broad),
            "broadCandidateSamples": broad[:1200],
            "nonemptyStart": [cleaned for line in lines if (cleaned := clean_line(line))][:100],
        }
        if not strict:
            blockers.append(
                {
                    "bookId": book_id,
                    "code": "NO_STRICT_STRUCTURE_YET",
                    "message": "Broad OCR candidates were recorded for parser calibration",
                }
            )

    payload = {
        "schemaVersion": 2,
        "purpose": "source-structure-discovery-only",
        "sources": records,
        "summary": {
            "expected": len(SOURCES),
            "downloaded": len(records),
            "blockingIssues": len(blockers),
            "downloadsReady": len(records) == len(SOURCES),
            "structureDiscoveryReady": len(records) == len(SOURCES) and not blockers,
        },
        "blocking": blockers,
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(payload["summary"], ensure_ascii=False, indent=2))
    if len(records) != len(SOURCES):
        raise SystemExit("One or more source editions could not be downloaded")


if __name__ == "__main__":
    main()
