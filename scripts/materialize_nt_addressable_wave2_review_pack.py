#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import json
import shutil
from pathlib import Path

ROOT = Path.cwd()
DATA = ROOT / "docs/data/biblia-explicata"
FINAL = DATA / "nt-final-source-first"
REPS = DATA / "nt-semantic-transcript-representations"
COVERAGE = DATA / "nt-direct-transcript-coverage.json"
OUT = DATA / "nt-addressable-wave2-review-pack"
TARGETS = {
    "matei": {"file": "01-matei.json", "direct": 125},
    "apocalipsa": {"file": "27-apocalipsa.json", "direct": 53},
}


def fail(message: str) -> None:
    raise SystemExit(f"[addressable wave2 review pack] {message}")


def sha(value: str) -> str:
    return "sha256:" + hashlib.sha256(value.encode("utf-8")).hexdigest()


def snapshot(unit: dict) -> dict:
    return {
        "heading": str(unit.get("heading") or ""),
        "teaching": str(unit.get("teaching") or ""),
        "forYourHeart": str(unit.get("forYourHeart") or ""),
    }


if not COVERAGE.exists() or not REPS.exists():
    fail("coverage or transcript-representation directory missing")
coverage = json.loads(COVERAGE.read_text(encoding="utf-8"))
entries = [
    e for e in coverage.get("entries", [])
    if e.get("bookId") in TARGETS and e.get("transcriptRepresentationUrl")
]
coverage_by_unit = {e["unitId"]: e for e in entries}

units = {}
all_book_units = {}
for book_id, cfg in TARGETS.items():
    path = FINAL / cfg["file"]
    if not path.exists():
        fail(f"{book_id}: final book missing")
    book = json.loads(path.read_text(encoding="utf-8"))
    if book.get("id") != book_id:
        fail(f"{book_id}: wrong book id")
    by_id = {}
    for chapter in book.get("chapters", []):
        for unit in chapter.get("units", []):
            by_id[unit["id"]] = {
                "bookId": book_id,
                "chapter": int(chapter["number"]),
                "unitId": unit["id"],
                "ref": unit.get("ref"),
                "verseStart": unit.get("verseStart"),
                "verseEnd": unit.get("verseEnd"),
                "snapshot": snapshot(unit),
                "snapshotSha256": sha(json.dumps(snapshot(unit), ensure_ascii=False, separators=(",", ":"))),
                "sourceIds": unit.get("sourceIds", []),
                "sourceAnchors": unit.get("sourceAnchors", []),
            }
    all_book_units[book_id] = by_id
    direct_ids = {unit_id for unit_id, e in coverage_by_unit.items() if e.get("bookId") == book_id}
    if len(direct_ids) != cfg["direct"]:
        fail(f"{book_id}: expected {cfg['direct']} direct-addressable units, found {len(direct_ids)}")
    if not direct_ids.issubset(by_id):
        fail(f"{book_id}: coverage references unknown units")
    for unit_id in direct_ids:
        units[unit_id] = by_id[unit_id]

rep_records = []
for path in sorted(REPS.glob("*.json")):
    rep = json.loads(path.read_text(encoding="utf-8"))
    if rep.get("schema") != "emanus-nt-semantic-transcript-representation-v1":
        continue
    text = rep.get("text")
    if not isinstance(text, str) or not text.strip():
        fail(f"{path.name}: transcript text missing")
    actual_sha = sha(text)
    if actual_sha != rep.get("transcriptSha256"):
        fail(f"{path.name}: transcript SHA mismatch")
    if len(text.split()) != rep.get("wordCount"):
        fail(f"{path.name}: wordCount mismatch")
    mapped = []
    for m in rep.get("units", []):
        unit_id = m.get("unitId")
        if unit_id not in units:
            continue
        cov = coverage_by_unit[unit_id]
        expected_urls = {
            x.get("transcriptRepresentationUrl")
            for x in cov.get("transcriptRepresentations", [])
            if x.get("transcriptRepresentationUrl")
        }
        if cov.get("transcriptRepresentationUrl"):
            expected_urls.add(cov["transcriptRepresentationUrl"])
        if rep.get("transcriptUrl") not in expected_urls:
            continue
        mapped.append({
            **units[unit_id],
            "mappedRef": m.get("ref"),
            "officialSourceUrl": cov.get("officialSourceUrl"),
            "officialSourceResolution": cov.get("officialSourceResolution"),
            "coverageVerification": cov.get("verification"),
        })
    if mapped:
        rep_records.append({
            "sourceRepresentationFile": path.name,
            "transcriptUrl": rep.get("transcriptUrl"),
            "transcriptSha256": rep.get("transcriptSha256"),
            "wordCount": rep.get("wordCount"),
            "text": text,
            "units": mapped,
        })

covered = {u["unitId"] for r in rep_records for u in r["units"]}
missing = sorted(set(units) - covered)
if missing:
    fail(f"{len(missing)} direct units lack persisted exact representation: {', '.join(missing[:10])}")

if OUT.exists():
    shutil.rmtree(OUT)
OUT.mkdir(parents=True)
index = {
    "schema": "emanus-nt-addressable-wave2-review-pack-v1",
    "policy": "Inspection-only artifact. Direct addressability and provenance do not create semantic approval. Every unit must be reviewed sentence-level against the complete transcript text in its pack before a keep/rewrite decision is frozen.",
    "targetUnits": len(units),
    "books": {},
    "representationFiles": 0,
}

for book_id, cfg in TARGETS.items():
    book_dir = OUT / book_id
    book_dir.mkdir(parents=True)
    relevant = []
    for r in rep_records:
        selected = [u for u in r["units"] if u["bookId"] == book_id]
        if selected:
            relevant.append({**r, "units": selected})
    relevant.sort(key=lambda r: (str(r.get("transcriptUrl") or ""), r["sourceRepresentationFile"]))
    entries_out = []
    for i, record in enumerate(relevant, 1):
        name = f"{i:02d}.json"
        rel = f"{book_id}/{name}"
        (book_dir / name).write_text(json.dumps(record, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        entries_out.append({
            "file": rel,
            "transcriptUrl": record["transcriptUrl"],
            "transcriptSha256": record["transcriptSha256"],
            "wordCount": record["wordCount"],
            "unitIds": [u["unitId"] for u in record["units"]],
        })
        index["representationFiles"] += 1
    direct_ids = sorted(unit_id for unit_id, e in coverage_by_unit.items() if e.get("bookId") == book_id)
    pending_ids = sorted(set(all_book_units[book_id]) - set(direct_ids))
    index["books"][book_id] = {
        "directUnits": len(direct_ids),
        "nonDirectUnits": pending_ids,
        "representations": entries_out,
    }

(OUT / "index.json").write_text(json.dumps(index, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"Addressable wave2 review pack: {len(units)} direct units / {index['representationFiles']} complete transcript files; no semantic approvals created.")
