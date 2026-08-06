#!/usr/bin/env python3
"""Shared source parsing and normalization helpers for OT repair 5."""
from __future__ import annotations

import re
import unicodedata
import zipfile
from pathlib import Path

NON_CONTENT_PREFIXES = (
    "\\id", "\\ide", "\\h", "\\toc", "\\mt", "\\imt", "\\is", "\\ip",
    "\\c", "\\cl", "\\cp", "\\s", "\\ms", "\\r", "\\d", "\\b",
    "\\rem", "\\sts", "\\restore", "\\periph",
)


def strip_usfm(text: str) -> str:
    # Notes and cross references are metadata, not verse text.
    text = re.sub(r"\\f\s+.*?\\f\*", " ", text)
    text = re.sub(r"\\x\s+.*?\\x\*", " ", text)

    # Preserve the displayed word but remove lemma/Strong/morphology attributes.
    text = re.sub(r"\\w\s+([^|\\]+)\|[^\\]*?\\w\*", r"\1", text)
    text = re.sub(r"\\w\s+([^\\]+?)\\w\*", r"\1", text)
    text = re.sub(r"\|(?:x-)?(?:strong|lemma|morph|occurrence|occurrences)=[^\\\s]+", " ", text, flags=re.I)
    text = re.sub(r"\b(?:x-)?strong\s*=\s*[\"']?[HG]\d+[\"']?", " ", text, flags=re.I)

    # Alignment and keyword milestones carry machine metadata only.
    text = re.sub(r"\\zaln-s\s+.*?\\\*", " ", text)
    text = re.sub(r"\\zaln-e\\\*", " ", text)
    text = re.sub(r"\\k-s\s+.*?\\\*|\\k-e\\\*", " ", text)

    # Remove remaining character/paragraph markers after their visible content
    # has already been retained on the line.
    text = re.sub(r"\\[a-z0-9+\-]+\*?(?:\s+)?", " ", text, flags=re.I)
    text = re.sub(r"\b[HG]5542\b", " ", text)  # Strong tag for Selah leaked by some USFM exports.
    return re.sub(r"\s+", " ", text).strip()


def parse_usfm_zip(path: Path) -> dict[tuple[str, int, int], str]:
    result: dict[tuple[str, int, int], str] = {}
    with zipfile.ZipFile(path) as zf:
        for name in zf.namelist():
            if name.endswith("/") or not name.lower().endswith((".usfm", ".sfm", ".txt")):
                continue
            raw = zf.read(name).decode("utf-8-sig", errors="replace")
            book_match = re.search(r"^\\id\s+([0-9A-Z]{3})\b", raw, re.M)
            if not book_match:
                continue
            book = book_match.group(1)
            chapter: int | None = None
            current: tuple[str, int, int] | None = None
            for raw_line in raw.splitlines():
                line = raw_line.strip()
                if not line:
                    continue
                cm = re.match(r"^\\c\s+(\d+)", line)
                if cm:
                    chapter = int(cm.group(1))
                    current = None
                    continue
                vm = re.match(r"^\\v\s+([0-9]+)(?:[-a-z0-9]*)\s*(.*)", line, re.I)
                if vm and chapter is not None:
                    current = (book, chapter, int(vm.group(1)))
                    content = strip_usfm(vm.group(2))
                    if current in result and content:
                        result[current] = (result[current] + " " + content).strip()
                    else:
                        result[current] = content
                    continue
                if current is None or line.startswith(NON_CONTENT_PREFIXES):
                    continue
                content = strip_usfm(line)
                if content:
                    result[current] = (result.get(current, "") + " " + content).strip()
    return result


def normalize_text(text: str) -> str:
    text = unicodedata.normalize("NFC", text).lower()
    text = re.sub(r"[^a-zăâîșț0-9]+", " ", text)
    return re.sub(r"\s+", " ", text).strip()


def numeric_tokens(text: str) -> list[str]:
    return re.findall(r"\d+", text)


def book_sequences(source: dict[tuple[str, int, int], str]) -> dict[str, list[tuple[tuple[str, int, int], str]]]:
    output: dict[str, list[tuple[tuple[str, int, int], str]]] = {}
    for key, value in sorted(source.items()):
        output.setdefault(key[0], []).append((key, value))
    return output
