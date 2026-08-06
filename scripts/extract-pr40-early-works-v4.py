#!/usr/bin/env python3
"""Extract all four early works with robust CCEL Jubilees unit boundaries.

CCEL's Charles transcription encodes each Jubilees chapter as an ordered list.
Some pages expose a malformed or differently nested chapter heading, so the
chapter-specific URL is authoritative and the first non-empty ordered list is
used as a verified fallback. Source bytes and hashes remain unchanged.
"""
from __future__ import annotations

import html as html_module
import importlib.util
import re
from pathlib import Path

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
_original_fetch = module.fetch


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


def fetch(url: str) -> tuple[str, str]:
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


module.fetch = fetch
module.main()
