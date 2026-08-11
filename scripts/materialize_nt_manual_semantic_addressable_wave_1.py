#!/usr/bin/env python3
from __future__ import annotations

import base64
import gzip
import hashlib
import json
import re
from pathlib import Path

ROOT = Path.cwd()
DATA = ROOT / "docs/data/biblia-explicata"
FINAL = DATA / "nt-final-source-first"
SPECS = DATA / "nt-semantic-review-spec"
MANUAL = DATA / "nt-semantic-review-manual"
REPS = DATA / "nt-semantic-transcript-representations"
COVERAGE = DATA / "nt-direct-transcript-coverage.json"
REVIEWER = "GPT-5.6 Sol manual sentence-level semantic review against persisted exact transcript representations with official-source provenance"
REVIEWED_ON = "2026-08-11"

SEEDS = {
    "07-1-corinteni.json": "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",
    "08-2-corinteni.json": "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"
}

BOOKS = {
    "romani": {"file": "06-romani.json", "units": 68, "rewrites": 3, "sourceId": "legacy-poonen-romans"},
    "1-corinteni": {"file": "07-1-corinteni.json", "units": 54, "rewrites": 11, "sourceId": "legacy-poonen-1cor"},
    "2-corinteni": {"file": "08-2-corinteni.json", "units": 41, "rewrites": 5, "sourceId": "legacy-poonen-2cor"},
}


def fail(message: str) -> None:
    raise SystemExit(f"[addressable semantic wave 1] {message}")


def sha(text: str) -> str:
    return "sha256:" + hashlib.sha256(text.encode("utf-8")).hexdigest()


def snapshot(unit: dict, teaching: str | None = None, for_your_heart=None) -> str:
    value = {
        "heading": str(unit.get("heading") or ""),
        "teaching": str(unit.get("teaching") if teaching is None else teaching),
        "forYourHeart": str(unit.get("forYourHeart") if for_your_heart is None else for_your_heart or ""),
    }
    return json.dumps(value, ensure_ascii=False, separators=(",", ":"))


def canonical_evidence(payload: dict) -> str:
    return json.dumps(payload, ensure_ascii=False, sort_keys=True, separators=(",", ":"))


SPECS.mkdir(parents=True, exist_ok=True)
MANUAL.mkdir(parents=True, exist_ok=True)
for filename, encoded in SEEDS.items():
    target = SPECS / filename
    seed = gzip.decompress(base64.b64decode(encoded)).decode("utf-8")
    seed_obj = json.loads(seed)
    if target.exists():
        existing = json.loads(target.read_text(encoding="utf-8"))
        if existing != seed_obj:
            fail(f"{filename}: persisted spec differs from frozen reviewed seed")
    else:
        target.write_text(json.dumps(seed_obj, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"addressable semantic wave 1: materialized frozen spec {filename}")

if not COVERAGE.exists():
    fail("direct transcript coverage missing")
coverage = json.loads(COVERAGE.read_text(encoding="utf-8"))
coverage_by_unit = {e["unitId"]: e for e in coverage.get("entries", []) if e.get("bookId") in BOOKS}

rep_by_unit: dict[str, list[dict]] = {}
rep_count = 0
for path in sorted(REPS.glob("*.json")):
    rep = json.loads(path.read_text(encoding="utf-8"))
    if rep.get("schema") != "emanus-nt-semantic-transcript-representation-v1":
        continue
    text = rep.get("text")
    if not isinstance(text, str) or not text.strip():
        fail(f"{path.name}: transcript text missing")
    actual_sha = sha(text)
    if actual_sha != rep.get("transcriptSha256"):
        fail(f"{path.name}: transcript SHA drifted; {actual_sha} != {rep.get('transcriptSha256')}")
    if len(text.split()) != rep.get("wordCount"):
        fail(f"{path.name}: wordCount drifted")
    relevant = False
    for mapped in rep.get("units", []):
        if mapped.get("bookId") in BOOKS:
            rep_by_unit.setdefault(mapped["unitId"], []).append(rep)
            relevant = True
    if relevant:
        rep_count += 1

if rep_count < 40:
    fail(f"expected persisted transcript representation set, found only {rep_count} files")

for book_id, cfg in BOOKS.items():
    spec_path = SPECS / cfg["file"]
    book_path = FINAL / cfg["file"]
    if not spec_path.exists() or not book_path.exists():
        fail(f"{book_id}: book/spec missing")
    spec_doc = json.loads(spec_path.read_text(encoding="utf-8"))
    if spec_doc.get("schema") != "emanus-manual-review-spec-v2" or spec_doc.get("bookId") != book_id:
        fail(f"{book_id}: unexpected spec schema")
    decisions_spec = spec_doc.get("decisions")
    if not isinstance(decisions_spec, dict):
        fail(f"{book_id}: decisions missing")
    rewrite_count = sum(1 for item in decisions_spec.values() if item.get("action") == "rewrite")
    keep_count = sum(1 for item in decisions_spec.values() if item.get("action") == "keep")
    if len(decisions_spec) != cfg["units"] or rewrite_count != cfg["rewrites"] or keep_count != cfg["units"] - cfg["rewrites"]:
        fail(f"{book_id}: frozen decision counts drifted")

    book = json.loads(book_path.read_text(encoding="utf-8"))
    if book.get("id") != book_id:
        fail(f"{book_id}: wrong book id")
    units: dict[str, tuple[int, dict]] = {}
    for chapter in book.get("chapters", []):
        for unit in chapter.get("units", []):
            units[unit["id"]] = (int(chapter["number"]), unit)
    if len(units) != cfg["units"]:
        fail(f"{book_id}: expected {cfg['units']} current units, found {len(units)}")
    if set(units) != set(decisions_spec):
        fail(f"{book_id}: spec does not cover exactly every current unit")

    output_decisions = []
    for unit_id, item in decisions_spec.items():
        if item.get("action") not in {"keep", "rewrite"}:
            fail(f"{unit_id}: invalid action")
        chapter_num, unit = units[unit_id]
        if int(item.get("chapter", -1)) != chapter_num:
            fail(f"{unit_id}: chapter drift")
        current_sha = sha(snapshot(unit))
        if current_sha != item.get("expectedCurrentSnapshotSha256"):
            fail(f"{unit_id}: reviewed pre-edit snapshot drifted; {current_sha} != {item.get('expectedCurrentSnapshotSha256')}")
        if cfg["sourceId"] not in (unit.get("sourceIds") or []):
            fail(f"{unit_id}: expected sourceId {cfg['sourceId']} missing")
        anchors = [a for a in unit.get("sourceAnchors", []) if a.get("sourceId") == cfg["sourceId"]]
        if not anchors or any(a.get("verificationLevel") != "official-episode-range-registry" for a in anchors):
            fail(f"{unit_id}: official episode-range provenance missing or weakened")

        reps = rep_by_unit.get(unit_id, [])
        if not reps:
            fail(f"{unit_id}: no persisted transcript representation maps to unit")
        cov = coverage_by_unit.get(unit_id)
        if not cov or not isinstance(cov.get("officialSourceUrl"), str) or not cov["officialSourceUrl"].startswith("https://"):
            fail(f"{unit_id}: official source URL missing from direct coverage")
        expected_rep_urls = {x.get("transcriptRepresentationUrl") for x in cov.get("transcriptRepresentations", []) if x.get("transcriptRepresentationUrl")}
        if cov.get("transcriptRepresentationUrl"):
            expected_rep_urls.add(cov["transcriptRepresentationUrl"])
        actual_rep_urls = {r.get("transcriptUrl") for r in reps}
        if expected_rep_urls and not expected_rep_urls.issubset(actual_rep_urls):
            fail(f"{unit_id}: persisted transcript set does not cover deterministic direct mapping")

        evidence = []
        for rep in sorted(reps, key=lambda r: r["transcriptUrl"]):
            mapped = next((m for m in rep.get("units", []) if m.get("unitId") == unit_id and m.get("bookId") == book_id), None)
            if not mapped:
                fail(f"{unit_id}: representation mapping disappeared")
            payload = {
                "officialSourceUrl": cov["officialSourceUrl"],
                "transcriptSourceUrl": rep["transcriptUrl"],
                "sourceRange": mapped.get("ref") or unit.get("ref") or unit_id,
                "transcriptSha256": rep["transcriptSha256"],
            }
            evidence.append({
                **payload,
                "evidenceSha256": sha(canonical_evidence(payload)),
                "reviewedSectionWordCount": rep["wordCount"],
                "transcriptRepresentation": "SermonIndex exact transcript representation of the official-source study; official attribution remains bound separately",
            })

        teaching = item.get("revisedTeaching") if item["action"] == "rewrite" else unit.get("teaching")
        if not isinstance(teaching, str) or len(teaching.strip()) < 80:
            fail(f"{unit_id}: final teaching too short")
        if re.search(r"\b(?:Poonen|CFC|SermonIndex|Word4AllTime)\b", teaching, flags=re.I):
            fail(f"{unit_id}: modern source attribution leaked into reader copy")
        final_for_heart = item.get("revisedForYourHeart", unit.get("forYourHeart"))
        decision = {
            "bookId": book_id,
            "chapter": chapter_num,
            "unitId": unit_id,
            "status": "approved-against-transcript",
            "action": item["action"],
            "reviewedTeachingSha256": sha(snapshot(unit, teaching=teaching, for_your_heart=final_for_heart)),
            "transcriptEvidence": evidence,
            "rationale": item["rationale"],
            "reviewer": REVIEWER,
            "reviewedOn": REVIEWED_ON,
        }
        if item["action"] == "rewrite":
            decision["revisedTeaching"] = teaching
            if "revisedForYourHeart" in item:
                decision["revisedForYourHeart"] = item["revisedForYourHeart"]
        output_decisions.append(decision)

    out = {
        "schema": "emanus-nt-semantic-review-book-v1",
        "bookId": book_id,
        "reviewMode": "manual-sentence-level-against-persisted-exact-transcript-representations-with-official-source-provenance",
        "decisions": output_decisions,
    }
    (MANUAL / cfg["file"]).write_text(json.dumps(out, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{book_id} addressable semantic review: {cfg['units']} decisions ({rewrite_count} rewrite / {keep_count} keep).")

print("Addressable semantic wave 1: 163 hash-bound manual decisions materialized from persisted exact transcript content.")
