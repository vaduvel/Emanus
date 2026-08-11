#!/usr/bin/env python3
from __future__ import annotations

import importlib.util
import json
import re
import shutil
from collections import defaultdict
from pathlib import Path

ROOT = Path.cwd()
DATA = ROOT / "docs/data/biblia-explicata"
COVERAGE = DATA / "nt-direct-transcript-coverage.json"
INDEX = DATA / "nt-semantic-review-index.json"
LEDGER = DATA / "nt-semantic-review-ledger.json"
MAPPING = DATA / "nt-transcript-episode-mapping.json"
FINAL = DATA / "nt-final-source-first"
REPO_OUT = DATA / "nt-semantic-transcript-representations"
ART_ROOT = Path("/tmp/nt-semantic-bulk")
ART_TRANSCRIPTS = ART_ROOT / "transcripts"
ART_BOOKS = ART_ROOT / "books"
TARGET_BOOKS = {"matei", "apocalipsa"}
EXPECTED_UNITS = {"matei": 125, "apocalipsa": 53}
EXPECTED_TOTAL = 178
EXPECTED_UNIQUE_TRANSCRIPTS = 41


def fail(message: str) -> None:
    raise SystemExit(f"[addressable wave2 export] {message}")


if not COVERAGE.exists():
    fail("direct transcript coverage missing")
coverage = json.loads(COVERAGE.read_text(encoding="utf-8"))
if coverage.get("schema") != "emanus-nt-direct-transcript-coverage-v3":
    fail(f"unexpected coverage schema {coverage.get('schema')}")

worker_path = ROOT / "scripts/nt_semantic_copilot_worker.py"
spec = importlib.util.spec_from_file_location("emanus_semantic_wave2_export", worker_path)
if spec is None or spec.loader is None:
    fail("cannot load semantic transcript extractor")
worker = importlib.util.module_from_spec(spec)
spec.loader.exec_module(worker)

if ART_ROOT.exists():
    shutil.rmtree(ART_ROOT)
ART_TRANSCRIPTS.mkdir(parents=True, exist_ok=True)
ART_BOOKS.mkdir(parents=True, exist_ok=True)
REPO_OUT.mkdir(parents=True, exist_ok=True)

by_url: dict[str, dict] = {}
addressable_units: dict[str, set[str]] = defaultdict(set)

for entry in coverage.get("entries", []):
    book_id = entry.get("bookId")
    if book_id not in TARGET_BOOKS:
        continue
    urls = []
    reps = entry.get("transcriptRepresentations")
    if isinstance(reps, list):
        for rep in reps:
            url = rep.get("transcriptRepresentationUrl") if isinstance(rep, dict) else None
            if isinstance(url, str) and url.startswith("https://"):
                urls.append((url, rep.get("transcriptTitle"), rep.get("transcriptRange")))
    single_url = entry.get("transcriptRepresentationUrl")
    if not urls and isinstance(single_url, str) and single_url.startswith("https://"):
        urls.append((single_url, entry.get("transcriptTitle"), entry.get("transcriptRange")))
    if not urls:
        continue

    unit_id = entry.get("unitId")
    if not isinstance(unit_id, str) or not unit_id:
        fail(f"{book_id}: addressable entry without unitId")
    official_url = entry.get("officialSourceUrl")
    if not isinstance(official_url, str) or not official_url.startswith("https://"):
        fail(f"{unit_id}: official source URL missing")
    verification = entry.get("verification")
    if verification not in {"catalogue-range-contains-entire-unit", "catalogue-multi-range-contiguous-covers-unit"}:
        fail(f"{unit_id}: unexpected direct coverage verification {verification}")

    addressable_units[book_id].add(unit_id)
    for url, title, transcript_range in urls:
        slot = by_url.setdefault(
            url,
            {
                "officialSourceUrls": set(),
                "units": {},
            },
        )
        slot["officialSourceUrls"].add(official_url)
        slot["units"][unit_id] = {
            "bookId": book_id,
            "chapter": entry.get("chapter"),
            "unitId": unit_id,
            "ref": entry.get("ref"),
            "transcriptTitle": title,
            "transcriptRange": transcript_range,
            "coverageEvidenceSha256": entry.get("coverageEvidenceSha256"),
            "verification": verification,
            "officialSourceUrl": official_url,
            "officialSourceResolution": entry.get("officialSourceResolution"),
        }

for book_id, expected in EXPECTED_UNITS.items():
    actual = len(addressable_units.get(book_id, set()))
    if actual != expected:
        fail(f"{book_id}: expected {expected} direct-addressable units, found {actual}")
actual_total = sum(len(v) for v in addressable_units.values())
if actual_total != EXPECTED_TOTAL:
    fail(f"expected {EXPECTED_TOTAL} direct-addressable units, found {actual_total}")
if len(by_url) != EXPECTED_UNIQUE_TRANSCRIPTS:
    fail(f"expected {EXPECTED_UNIQUE_TRANSCRIPTS} unique transcript URLs, found {len(by_url)}")

manifest = []
for serial, url in enumerate(sorted(by_url), start=1):
    text = worker.extract_transcript(url)
    transcript_sha = worker.sha256(text)
    slug = re.sub(r"[^a-z0-9]+", "-", url.lower()).strip("-")[-100:]
    filename = f"wave2-{serial:03d}-{slug}.json"
    slot = by_url[url]
    units = [slot["units"][unit_id] for unit_id in sorted(slot["units"])]
    payload = {
        "schema": "emanus-nt-semantic-transcript-representation-v1",
        "wave": "matei-apocalipsa-direct-addressable",
        "transcriptUrl": url,
        "transcriptSha256": transcript_sha,
        "wordCount": len(text.split()),
        "officialSourceUrls": sorted(slot["officialSourceUrls"]),
        "units": units,
        "text": text,
    }
    encoded = json.dumps(payload, ensure_ascii=False, indent=2) + "\n"
    (REPO_OUT / filename).write_text(encoded, encoding="utf-8")
    (ART_TRANSCRIPTS / filename).write_text(encoded, encoding="utf-8")
    manifest.append(
        {
            "file": filename,
            "transcriptUrl": url,
            "transcriptSha256": transcript_sha,
            "wordCount": len(text.split()),
            "unitCount": len(units),
            "books": sorted({unit["bookId"] for unit in units}),
        }
    )
    print(filename, transcript_sha, len(text.split()), len(units))

(ART_ROOT / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
for source in (INDEX, LEDGER, COVERAGE):
    if source.exists():
        shutil.copy2(source, ART_ROOT / source.name)
if MAPPING.exists():
    shutil.copy2(MAPPING, ART_ROOT / MAPPING.name)

found_books = set()
for path in sorted(FINAL.glob("*.json")):
    book = json.loads(path.read_text(encoding="utf-8"))
    if book.get("id") in TARGET_BOOKS:
        shutil.copy2(path, ART_BOOKS / path.name)
        found_books.add(book["id"])
if found_books != TARGET_BOOKS:
    fail(f"expected final source-first books {sorted(TARGET_BOOKS)}, found {sorted(found_books)}")

print(
    "Addressable wave2 export: "
    f"{EXPECTED_TOTAL} units / {len(by_url)} exact transcript representations "
    f"({EXPECTED_UNITS['matei']} Matei + {EXPECTED_UNITS['apocalipsa']} Apocalipsa)."
)
