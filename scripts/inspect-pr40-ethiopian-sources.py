#!/usr/bin/env python3
"""Pin and inspect public-domain source editions for the four PR40 early works."""
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
    },
    "JUB": {
        "name": "Jubileele",
        "edition": "R. H. Charles, The Book of Jubilees, 1902",
        "url": "https://archive.org/download/bookofjubileesor00char/bookofjubileesor00char_djvu.txt",
        "license": "Public Domain",
    },
    "DID": {
        "name": "Didascalia etiopiană",
        "edition": "J. M. Harden, The Ethiopic Didascalia, 1920",
        "url": "https://archive.org/download/cu31924096083336/cu31924096083336_djvu.txt",
        "license": "Public Domain",
    },
    "4BA": {
        "name": "4 Baruh / Restul cuvintelor lui Baruh",
        "edition": "J. Rendel Harris, The Rest of the Words of Baruch, 1889",
        "url": "https://archive.org/download/restofwordsofbar00harruoft/restofwordsofbar00harruoft_djvu.txt",
        "license": "Public Domain",
    },
}

HEADING_PATTERNS = [
    re.compile(r"^\s*CHAPTER\s+([IVXLCDM]+|[0-9]+)\.?\s*$", re.I),
    re.compile(r"^\s*CHAP(?:TER)?\.\s*([IVXLCDM]+|[0-9]+)\.?\s*$", re.I),
    re.compile(r"^\s*([IVXLCDM]+)\.\s*$"),
    re.compile(r"^\s*Chapter\s+([0-9]+)\b", re.I),
]


def download(url: str, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    request = urllib.request.Request(url, headers={"User-Agent": "EmanusSourceAudit/2.0"})
    with urllib.request.urlopen(request, timeout=180) as response, path.open("wb") as handle:
        shutil.copyfileobj(response, handle)


def clean_line(value: str) -> str:
    return re.sub(r"\s+", " ", value.replace("\ufeff", "")).strip()


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
        headings: list[dict[str, Any]] = []
        for index, line in enumerate(lines, start=1):
            cleaned = clean_line(line)
            for pattern_index, pattern in enumerate(HEADING_PATTERNS):
                match = pattern.match(cleaned)
                if match:
                    headings.append(
                        {
                            "line": index,
                            "value": cleaned,
                            "capture": match.group(1),
                            "pattern": pattern_index,
                            "context": [
                                clean_line(value)
                                for value in lines[max(0, index - 3):min(len(lines), index + 3)]
                                if clean_line(value)
                            ],
                        }
                    )
                    break
        likely_body_start = next(
            (
                index
                for index, line in enumerate(lines, start=1)
                if "START OF THE PROJECT GUTENBERG EBOOK" in line
            ),
            None,
        )
        likely_body_end = next(
            (
                index
                for index, line in enumerate(lines, start=1)
                if "END OF THE PROJECT GUTENBERG EBOOK" in line
            ),
            None,
        )
        records[book_id] = {
            **metadata,
            "sha256": hashlib.sha256(raw).hexdigest(),
            "bytes": len(raw),
            "lines": len(lines),
            "gutenbergBodyStart": likely_body_start,
            "gutenbergBodyEnd": likely_body_end,
            "headingCount": len(headings),
            "headingSamples": headings[:300],
            "nonemptyStart": [clean_line(line) for line in lines if clean_line(line)][:80],
        }
        if not headings:
            blockers.append({"bookId": book_id, "code": "NO_CHAPTER_HEADINGS_DETECTED", "message": metadata["url"]})

    payload = {
        "schemaVersion": 1,
        "sources": records,
        "summary": {
            "expected": len(SOURCES),
            "downloaded": len(records),
            "blockingIssues": len(blockers),
            "structureDiscoveryReady": len(records) == len(SOURCES) and not blockers,
        },
        "blocking": blockers,
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(payload["summary"], ensure_ascii=False, indent=2))
    if blockers:
        raise SystemExit("Inspect source inventory artifact")


if __name__ == "__main__":
    main()
