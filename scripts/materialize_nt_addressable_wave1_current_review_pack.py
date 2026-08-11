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
OUT = DATA / "nt-addressable-wave1-current-review-pack"
BOOKS = {
    "romani": {"file": "06-romani.json", "units": 68},
    "1-corinteni": {"file": "07-1-corinteni.json", "units": 54},
    "2-corinteni": {"file": "08-2-corinteni.json", "units": 41},
}


def fail(message: str) -> None:
    raise SystemExit(f"[addressable wave1 current review pack] {message}")


def sha(value: str) -> str:
    return "sha256:" + hashlib.sha256(value.encode("utf-8")).hexdigest()


def snapshot(unit: dict) -> dict:
    return {
        "heading": str(unit.get("heading") or ""),
        "teaching": str(unit.get("teaching") or ""),
        "forYourHeart": str(unit.get("forYourHeart") or ""),
    }


if not COVERAGE.exists() or not REPS.exists():
    fail("coverage or transcript representation directory missing")
coverage = json.loads(COVERAGE.read_text(encoding="utf-8"))
coverage_by_unit = {
    e["unitId"]: e
    for e in coverage.get("entries", [])
    if e.get("bookId") in BOOKS and e.get("unitId")
}

books = {}
units = {}
for book_id, cfg in BOOKS.items():
    path = FINAL / cfg["file"]
    if not path.exists():
        fail(f"{book_id}: final source-first file missing")
    book = json.loads(path.read_text(encoding="utf-8"))
    if book.get("id") != book_id:
        fail(f"{book_id}: wrong id in final source-first file")
    by_id = {}
    for chapter in book.get("chapters", []):
        for unit in chapter.get("units", []):
            by_id[unit["id"]] = {
                "bookId": book_id,
                "chapter": int(chapter["number"]),
                "unitId": unit["id"],
                "ref": unit.get("ref"),
                "snapshot": snapshot(unit),
                "snapshotSha256": sha(json.dumps(snapshot(unit), ensure_ascii=False, separators=(",", ":"))),
            }
    if len(by_id) != cfg["units"]:
        fail(f"{book_id}: expected {cfg['units']} units, found {len(by_id)}")
    books[book_id] = book
    units.update(by_id)

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
        fail(f"{path.name}: transcript SHA drifted")
    if len(text.split()) != rep.get("wordCount"):
        fail(f"{path.name}: transcript word count drifted")

    mapped_units = []
    for mapped in rep.get("units", []):
        unit_id = mapped.get("unitId")
        book_id = mapped.get("bookId")
        if book_id not in BOOKS or unit_id not in units:
            continue
        cov = coverage_by_unit.get(unit_id)
        if not cov:
            fail(f"{unit_id}: direct transcript coverage missing")
        mapped_units.append({
            **units[unit_id],
            "mappedRef": mapped.get("ref"),
            "officialSourceUrl": cov.get("officialSourceUrl"),
            "coverageMode": cov.get("coverageMode"),
        })
    if mapped_units:
        rep_records.append({
            "sourceRepresentationFile": path.name,
            "transcriptUrl": rep.get("transcriptUrl"),
            "transcriptSha256": rep.get("transcriptSha256"),
            "wordCount": rep.get("wordCount"),
            "text": text,
            "units": mapped_units,
        })

covered = {u["unitId"] for rep in rep_records for u in rep["units"]}
missing = sorted(set(units) - covered)
if missing:
    fail(f"{len(missing)} current units have no persisted transcript representation: {', '.join(missing[:8])}")

if OUT.exists():
    shutil.rmtree(OUT)
OUT.mkdir(parents=True)
index = {
    "schema": "emanus-nt-addressable-wave1-current-review-pack-v1",
    "policy": "Inspection artifact only. It does not create semantic approval. Each file binds the current pre-semantic reader-copy snapshot to the complete persisted transcript representation that deterministically covers it.",
    "books": {},
    "reviewedUnitsTarget": len(units),
    "representationFiles": 0,
}

for book_id in BOOKS:
    book_dir = OUT / book_id
    book_dir.mkdir(parents=True)
    relevant = [r for r in rep_records if any(u["bookId"] == book_id for u in r["units"])]
    relevant.sort(key=lambda r: (str(r.get("transcriptUrl") or ""), r["sourceRepresentationFile"]))
    entries = []
    for pos, record in enumerate(relevant, start=1):
        filtered = {**record, "units": [u for u in record["units"] if u["bookId"] == book_id]}
        name = f"{pos:02d}.json"
        rel = f"{book_id}/{name}"
        (book_dir / name).write_text(json.dumps(filtered, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        entries.append({
            "file": rel,
            "transcriptUrl": filtered["transcriptUrl"],
            "transcriptSha256": filtered["transcriptSha256"],
            "wordCount": filtered["wordCount"],
            "unitIds": [u["unitId"] for u in filtered["units"]],
        })
        index["representationFiles"] += 1
    index["books"][book_id] = {
        "units": BOOKS[book_id]["units"],
        "representations": entries,
    }

(OUT / "index.json").write_text(json.dumps(index, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(
    f"Addressable wave1 current review pack: {len(units)} units / "
    f"{index['representationFiles']} complete transcript representation files materialized."
)
