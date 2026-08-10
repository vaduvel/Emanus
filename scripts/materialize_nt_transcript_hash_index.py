#!/usr/bin/env python3
from __future__ import annotations

import argparse
import hashlib
import html
import json
import re
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs/data/biblia-explicata"
DIRECT = DATA / "nt-direct-transcript-coverage.json"
EVIDENCE = DATA / "nt-source-evidence.json"


def sha256(text: str) -> str:
    return "sha256:" + hashlib.sha256(text.encode("utf-8")).hexdigest()


def visible_text(raw: str) -> str:
    raw = re.sub(r"<script\b[^>]*>.*?</script>", " ", raw, flags=re.I | re.S)
    raw = re.sub(r"<style\b[^>]*>.*?</style>", " ", raw, flags=re.I | re.S)
    raw = re.sub(r"<br\s*/?>", "\n", raw, flags=re.I)
    raw = re.sub(r"</(?:p|div|li|h[1-6]|section|article)>", "\n", raw, flags=re.I)
    raw = re.sub(r"<[^>]+>", " ", raw)
    raw = html.unescape(raw).replace("\xa0", " ")
    return "\n".join(line for line in (re.sub(r"\s+", " ", line).strip() for line in raw.splitlines()) if line)


def extract(url: str) -> tuple[str, int]:
    req = urllib.request.Request(url, headers={"User-Agent": "Emanus-Editorial-Research/1.0"})
    with urllib.request.urlopen(req, timeout=90) as res:
        page = res.read().decode("utf-8", errors="replace")
    text = visible_text(page)
    start = -1
    for marker in ["Full Transcript", "## Full Transcript"]:
        start = text.find(marker)
        if start >= 0:
            start += len(marker)
            break
    if start < 0:
        raise RuntimeError(f"Full Transcript marker missing: {url}")
    tail = text[start:].lstrip("\n ")
    ends = []
    for marker in ["Sermon Outline", "Key Quotes", "Application Points", "Frequently Asked Questions", "Citation Web Link", "Downloads", "Topics"]:
        idx = tail.find("\n" + marker)
        if idx >= 0:
            ends.append(idx)
    if ends:
        tail = tail[: min(ends)]
    tail = re.sub(r"\n{3,}", "\n\n", tail).strip()
    words = len(tail.split())
    if words < 250:
        raise RuntimeError(f"Transcript too short ({words} words): {url}")
    return tail, words


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--output", required=True, type=Path)
    ap.add_argument("--book")
    args = ap.parse_args()

    direct = json.loads(DIRECT.read_text(encoding="utf-8")) if DIRECT.exists() else {"entries": []}
    evidence = json.loads(EVIDENCE.read_text(encoding="utf-8")) if EVIDENCE.exists() else {"records": []}
    targets: dict[str, dict] = {}

    for item in direct.get("entries", []):
        if args.book and item.get("bookId") != args.book:
            continue
        url = item.get("transcriptRepresentationUrl")
        if not isinstance(url, str) or not url.startswith("https://"):
            continue
        row = targets.setdefault(url, {"transcriptUrl": url, "books": set(), "officialSourceUrls": set(), "sourceRanges": set(), "unitIds": set()})
        row["books"].add(item.get("bookId"))
        row["officialSourceUrls"].add(item.get("officialSourceUrl"))
        row["sourceRanges"].add(item.get("transcriptRange"))
        row["unitIds"].add(item.get("unitId"))

    for rec in evidence.get("records", []):
        url = rec.get("transcriptRepresentationUrl")
        if not isinstance(url, str) or not url.startswith("https://"):
            continue
        row = targets.setdefault(url, {"transcriptUrl": url, "books": set(), "officialSourceUrls": set(), "sourceRanges": set(), "unitIds": set()})
        official = rec.get("officialSeriesUrl") or rec.get("sourceUrl")
        if official:
            row["officialSourceUrls"].add(official)
        if rec.get("locator"):
            row["sourceRanges"].add(rec.get("locator"))

    out = []
    for idx, (url, meta) in enumerate(sorted(targets.items()), 1):
        transcript, words = extract(url)
        out.append({
            "transcriptUrl": url,
            "transcriptSha256": sha256(transcript),
            "wordCount": words,
            "books": sorted(x for x in meta["books"] if x),
            "officialSourceUrls": sorted(x for x in meta["officialSourceUrls"] if x),
            "sourceRanges": sorted(x for x in meta["sourceRanges"] if x),
            "unitIds": sorted(x for x in meta["unitIds"] if x),
        })
        print(f"hashed {idx}/{len(targets)}: {url} ({words} words)", flush=True)

    payload = {
        "schema": "emanus-nt-transcript-hash-index-v1",
        "policy": "Metadata only. Full transcript text is fetched transiently, normalized with the same Full Transcript extractor used by the semantic reviewer, hashed, and discarded. The transcript mirror is representation evidence; official source URLs remain attribution authority.",
        "count": len(out),
        "entries": out,
    }
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
