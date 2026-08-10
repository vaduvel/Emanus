#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import html
import json
import re
import subprocess
import urllib.request
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs/data/biblia-explicata"
STATUS = DATA / "nt-semantic-manual-review-status.json"
CORPUS = DATA / "nt-final-source-first"
DIRECT = DATA / "nt-direct-transcript-coverage.json"
OUTPUT = DATA / "nt-semantic-manual-current-packet.json"


def sha256(text: str) -> str:
    return "sha256:" + hashlib.sha256(text.encode("utf-8")).hexdigest()


def snapshot(unit: dict[str, Any]) -> str:
    return json.dumps(
        {
            "heading": str(unit.get("heading") or ""),
            "teaching": str(unit.get("teaching") or ""),
            "forYourHeart": str(unit.get("forYourHeart") or ""),
        },
        ensure_ascii=False,
        separators=(",", ":"),
    )


def visible_text(raw: str) -> str:
    raw = re.sub(r"<script\b[^>]*>.*?</script>", " ", raw, flags=re.I | re.S)
    raw = re.sub(r"<style\b[^>]*>.*?</style>", " ", raw, flags=re.I | re.S)
    raw = re.sub(r"<br\s*/?>", "\n", raw, flags=re.I)
    raw = re.sub(r"</(?:p|div|li|h[1-6]|section|article)>", "\n", raw, flags=re.I)
    raw = re.sub(r"<[^>]+>", " ", raw)
    raw = html.unescape(raw).replace("\xa0", " ")
    return "\n".join(line for line in (re.sub(r"\s+", " ", line).strip() for line in raw.splitlines()) if line)


def transcript(url: str) -> tuple[str, int]:
    req = urllib.request.Request(url, headers={"User-Agent": "Emanus-Editorial-Research/1.0"})
    with urllib.request.urlopen(req, timeout=90) as response:
        text = visible_text(response.read().decode("utf-8", errors="replace"))
    start = -1
    for marker in ["Full Transcript", "## Full Transcript"]:
        start = text.find(marker)
        if start >= 0:
            start += len(marker)
            break
    if start < 0:
        raise RuntimeError(f"Full Transcript marker missing: {url}")
    tail = text[start:].lstrip("\n ")
    end_positions = []
    for marker in ["Sermon Outline", "Key Quotes", "Application Points", "Frequently Asked Questions", "Citation Web Link", "Downloads", "Topics"]:
        pos = tail.find("\n" + marker)
        if pos >= 0:
            end_positions.append(pos)
    if end_positions:
        tail = tail[: min(end_positions)]
    tail = re.sub(r"\n{3,}", "\n\n", tail).strip()
    words = len(tail.split())
    if words < 250:
        raise RuntimeError(f"Transcript too short ({words} words): {url}")
    return tail, words


def main() -> int:
    if not STATUS.exists():
        print("Manual semantic packet: status file absent; skip.")
        return 0
    status = json.loads(STATUS.read_text(encoding="utf-8"))
    book_id = str(status.get("currentBook") or "").strip()
    if not book_id:
        print("Manual semantic packet: no currentBook; skip.")
        return 0

    subprocess.run(["node", "scripts/materialize-nt-direct-transcript-coverage.mjs"], cwd=ROOT, check=True)
    direct = json.loads(DIRECT.read_text(encoding="utf-8"))
    direct_entries = [item for item in direct.get("entries", []) if item.get("bookId") == book_id]
    coverage_by_unit = {str(item["unitId"]): item for item in direct_entries}

    book = None
    for path in sorted(CORPUS.glob("*.json")):
        candidate = json.loads(path.read_text(encoding="utf-8"))
        if candidate.get("id") == book_id:
            book = candidate
            break
    if book is None:
        raise RuntimeError(f"Final book not found: {book_id}")

    transcript_cache: dict[str, tuple[str, int]] = {}
    units: list[dict[str, Any]] = []
    for chapter in book.get("chapters", []):
        for unit in chapter.get("units", []):
            if unit.get("sourceFidelity", {}).get("reviewState") == "reviewed-against-raw-transcript":
                continue
            coverage = coverage_by_unit.get(str(unit["id"]))
            evidence = None
            if coverage:
                url = str(coverage["transcriptRepresentationUrl"])
                if url not in transcript_cache:
                    transcript_cache[url] = transcript(url)
                body, word_count = transcript_cache[url]
                payload = {
                    "officialSourceUrl": coverage["officialSourceUrl"],
                    "transcriptSourceUrl": url,
                    "sourceRange": coverage["transcriptRange"],
                    "transcriptSha256": sha256(body),
                }
                evidence = {
                    **payload,
                    "transcriptWordCount": word_count,
                    "evidenceSha256": sha256(json.dumps(payload, ensure_ascii=False, sort_keys=True, separators=(",", ":"))),
                    "coverageEvidenceSha256": coverage["coverageEvidenceSha256"],
                    "verification": coverage["verification"],
                }
            units.append(
                {
                    "bookId": book_id,
                    "chapter": int(chapter["number"]),
                    "unitId": unit["id"],
                    "ref": unit["ref"],
                    "verseStart": unit.get("verseStart"),
                    "verseEnd": unit.get("verseEnd"),
                    "heading": unit.get("heading", ""),
                    "text": unit.get("text", ""),
                    "teaching": unit.get("teaching", ""),
                    "forYourHeart": unit.get("forYourHeart"),
                    "reviewedTeachingSha256": sha256(snapshot(unit)),
                    "sourceReviewState": unit.get("sourceFidelity", {}).get("reviewState"),
                    "transcriptEvidence": [evidence] if evidence else [],
                }
            )

    output = {
        "schema": "emanus-nt-semantic-manual-packet-v1",
        "policy": "Packet for human sentence-level semantic review. Transcript text is fetched transiently and not persisted; only its deterministic hash/word-count and the exact current reader fields are stored. Addressability alone is not approval.",
        "bookId": book_id,
        "unitCount": len(units),
        "transcriptCount": len(transcript_cache),
        "transcriptAddressableUnits": sum(1 for unit in units if unit["transcriptEvidence"]),
        "units": units,
    }
    OUTPUT.write_text(json.dumps(output, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Manual semantic packet {book_id}: {len(units)} units / {output['transcriptAddressableUnits']} addressable / {len(transcript_cache)} transcripts.")
    for url, (body, words) in sorted(transcript_cache.items()):
        print(f"TRANSCRIPT_HASH {sha256(body)} words={words} url={url}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
