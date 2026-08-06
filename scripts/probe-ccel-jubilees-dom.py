#!/usr/bin/env python3
"""Capture the exact DOM around the CCEL Jubilees chapter body."""
from __future__ import annotations

import hashlib
import json
from pathlib import Path

import requests
from bs4 import BeautifulSoup, Tag, NavigableString

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "docs" / "biblia-emanus" / "CCEL-JUBILEES-DOM-PROBE.json"
RAW = ROOT / "docs" / "biblia-emanus" / "CCEL-JUBILEES-CHAPTER1.html"
URL = "https://www.ccel.org/c/charles/otpseudepig/jubilee/1.htm"

response = requests.get(URL, headers={"User-Agent": "EmanusSourceAudit/5.0"}, timeout=60)
response.raise_for_status()
RAW.parent.mkdir(parents=True, exist_ok=True)
RAW.write_bytes(response.content)
soup = BeautifulSoup(response.text, "html.parser")
heading = next(
    (
        node for node in soup.find_all(["h1", "h2", "h3", "h4", "h5", "h6"])
        if "Chapter 1" in node.get_text(" ", strip=True)
    ),
    None,
)
if not isinstance(heading, Tag):
    raise SystemExit("Chapter 1 heading not found")

records = []
node = heading.next_element
for index in range(500):
    if node is None:
        break
    if isinstance(node, Tag):
        text = " ".join(node.get_text(" ", strip=True).split())
        records.append(
            {
                "index": index,
                "kind": "tag",
                "name": node.name,
                "id": node.get("id"),
                "class": node.get("class"),
                "attrs": {key: value for key, value in node.attrs.items()},
                "ownText": " ".join(
                    str(child).strip() for child in node.children if isinstance(child, NavigableString) and str(child).strip()
                )[:500],
                "allText": text[:1200],
                "html": str(node)[:3000],
            }
        )
    elif isinstance(node, NavigableString):
        text = " ".join(str(node).split())
        if text:
            records.append({"index": index, "kind": "text", "text": text[:1200]})
    if len(records) >= 180:
        break
    node = node.next_element

styles = []
for style in soup.find_all("style"):
    text = style.get_text("\n", strip=True)
    if "counter" in text or "verse" in text.casefold():
        styles.append(text[:10000])

payload = {
    "url": URL,
    "sha256": hashlib.sha256(response.content).hexdigest(),
    "heading": str(heading),
    "records": records,
    "counterStyles": styles,
}
OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(json.dumps({"records": len(records), "styles": len(styles), "sha256": payload["sha256"]}, indent=2))
