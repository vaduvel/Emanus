#!/usr/bin/env python3
"""Inspect the exact CCEL Jubilees HTML structure used by the extractor."""
from __future__ import annotations

import hashlib
import json
from pathlib import Path

import requests
from bs4 import BeautifulSoup, Tag

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "docs" / "biblia-emanus" / "CCEL-JUBILEES-HTML-PROBE.json"
URL = "https://www.ccel.org/c/charles/otpseudepig/jubilee/1.htm"

response = requests.get(URL, headers={"User-Agent": "EmanusSourceAudit/4.2"}, timeout=60)
response.raise_for_status()
soup = BeautifulSoup(response.text, "html.parser")

selectors = ["main", "article", "#main", "#content", ".entry-content", ".post-content", "body"]
roots: dict[str, dict] = {}
for selector in selectors:
    node = soup.select_one(selector)
    if not isinstance(node, Tag):
        continue
    direct = []
    for child in node.descendants:
        if not isinstance(child, Tag):
            continue
        text = " ".join(child.get_text(" ", strip=True).split())
        if text and ("Chapter 1" in text or text.startswith("1.") or text == "1"):
            direct.append({
                "tag": child.name,
                "id": child.get("id"),
                "class": child.get("class"),
                "text": text[:1000],
                "html": str(child)[:2000],
            })
        if len(direct) >= 40:
            break
    lines = [" ".join(line.split()) for line in node.get_text("\n").splitlines() if " ".join(line.split())]
    roots[selector] = {
        "lineCount": len(lines),
        "chapterLineIndexes": [i for i, line in enumerate(lines) if "Chapter 1" in line][:20],
        "firstVerseLineIndexes": [i for i, line in enumerate(lines) if line.startswith("1.") or line == "1"][:20],
        "first120Lines": lines[:120],
        "matchingTags": direct,
    }

payload = {
    "url": URL,
    "status": response.status_code,
    "sha256": hashlib.sha256(response.content).hexdigest(),
    "title": soup.title.get_text(" ", strip=True) if soup.title else None,
    "roots": roots,
}
OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(json.dumps({"roots": list(roots), "sha256": payload["sha256"]}, indent=2))
