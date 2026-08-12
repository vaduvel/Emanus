#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path

ROOT = Path.cwd()
DATA = ROOT / "docs/data/biblia-explicata"
BOOK = DATA / "nt-final-source-first/01-matei.json"
PACK = DATA / "nt-addressable-wave2-review-pack/matei"
WORK = DATA / "nt-semantic-review-work"
SPEC = DATA / "nt-semantic-review-spec/01-matei-direct.json"
OUT = DATA / "nt-semantic-review-manual/01-matei-direct.json"
REVIEWER = "GPT-5.6 Sol manual sentence-level semantic review against complete persisted Matthew transcript representations"
REVIEWED_ON = "2026-08-11"
EXPECTED_FILES = [
    "01-matei-wave2-wip.json",
    *[f"01-matei-wave2-wip-{i:02d}.json" for i in range(2, 23)],
]
EXPECTED_DECISIONS = 125
EXPECTED_REWRITES = 89
EXPECTED_KEEPS = 36
FORBIDDEN_READER_ATTRIBUTION = re.compile(r"\b(?:Poonen|CFC|SermonIndex)\b", re.I)


def fail(message: str) -> None:
    raise SystemExit(f"[Matei direct semantic review] {message}")


def sha(value: str) -> str:
    return "sha256:" + hashlib.sha256(value.encode("utf-8")).hexdigest()


def canonical(value) -> str:
    return json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":"))


def snapshot_payload(unit: dict, teaching: str | None = None, heart_marker=False, heart=None) -> dict:
    if teaching is None:
        teaching = str(unit.get("teaching") or "")
    if heart_marker:
        final_heart = heart
    else:
        final_heart = unit.get("forYourHeart")
    return {
        "heading": str(unit.get("heading") or ""),
        "teaching": str(teaching or ""),
        "forYourHeart": str(final_heart or ""),
    }


def snapshot_sha(unit: dict, teaching: str | None = None, heart_marker=False, heart=None) -> str:
    return sha(json.dumps(snapshot_payload(unit, teaching, heart_marker, heart), ensure_ascii=False, separators=(",", ":")))


def load(path: Path) -> dict:
    if not path.exists():
        fail(f"missing {path.relative_to(ROOT)}")
    return json.loads(path.read_text(encoding="utf-8"))


book = load(BOOK)
if book.get("id") != "matei":
    fail(f"expected matei book, got {book.get('id')}")
units: dict[str, tuple[int, dict]] = {}
for chapter in book.get("chapters", []):
    for unit in chapter.get("units", []):
        unit_id = unit.get("id")
        if unit_id in units:
            fail(f"duplicate final-book unit {unit_id}")
        units[unit_id] = (int(chapter["number"]), unit)

reviews: dict[str, dict] = {}
source_work_files = []
for filename in EXPECTED_FILES:
    path = WORK / filename
    payload = load(path)
    if payload.get("schema") != "emanus-nt-semantic-review-work-v1" or payload.get("bookId") != "matei":
        fail(f"{filename}: unexpected WIP schema/book")
    if payload.get("status") != "work-in-progress-not-ledger-eligible":
        fail(f"{filename}: unexpected status {payload.get('status')}")
    decisions = payload.get("decisions")
    if not isinstance(decisions, dict) or not decisions:
        fail(f"{filename}: decisions missing")
    if int(payload.get("reviewedDirectUnits", -1)) != len(decisions):
        fail(f"{filename}: reviewedDirectUnits does not equal decision count")
    for unit_id, decision in decisions.items():
        if unit_id in reviews:
            fail(f"duplicate WIP decision {unit_id} in {filename}")
        reviews[unit_id] = decision
    source_work_files.append({
        "file": filename,
        "sha256": sha(path.read_text(encoding="utf-8")),
        "decisions": len(decisions),
    })

rewrite_count = sum(1 for item in reviews.values() if item.get("action") == "rewrite")
keep_count = sum(1 for item in reviews.values() if item.get("action") == "keep")
if len(reviews) != EXPECTED_DECISIONS or rewrite_count != EXPECTED_REWRITES or keep_count != EXPECTED_KEEPS:
    fail(
        f"expected frozen {EXPECTED_DECISIONS} decisions ({EXPECTED_REWRITES} rewrite / {EXPECTED_KEEPS} keep), "
        f"got {len(reviews)} ({rewrite_count} rewrite / {keep_count} keep)"
    )

# The direct-addressable unit set is defined by the generated per-unit inspection files.
inspection_paths = sorted((PACK / "units").glob("matei-*.json"))
if len(inspection_paths) != EXPECTED_DECISIONS:
    fail(f"expected {EXPECTED_DECISIONS} direct Matei inspection files, found {len(inspection_paths)}")
inspection_ids = {path.stem for path in inspection_paths}
if set(reviews) != inspection_ids:
    missing = sorted(inspection_ids - set(reviews))
    extra = sorted(set(reviews) - inspection_ids)
    fail(f"WIP/direct unit set mismatch; missing={missing[:5]} extra={extra[:5]}")

spec_decisions = {}
manual_decisions = []
representation_cache: dict[int, dict] = {}

for unit_id in sorted(reviews, key=lambda x: (reviews[x]["chapter"], units[x][1].get("verseStart", 0), x)):
    spec = reviews[unit_id]
    if spec.get("action") not in {"keep", "rewrite"}:
        fail(f"{unit_id}: invalid action {spec.get('action')}")
    if not isinstance(spec.get("chapter"), int):
        fail(f"{unit_id}: chapter missing")
    if not isinstance(spec.get("rationale"), str) or not spec["rationale"].strip():
        fail(f"{unit_id}: rationale missing")
    if not re.fullmatch(r"sha256:[0-9a-f]{64}", str(spec.get("expectedCurrentSnapshotSha256") or "")):
        fail(f"{unit_id}: expectedCurrentSnapshotSha256 invalid")
    if spec["action"] == "rewrite":
        revised = spec.get("revisedTeaching")
        if not isinstance(revised, str) or len(revised.strip()) < 120:
            fail(f"{unit_id}: rewrite lacks substantial revisedTeaching")
        if FORBIDDEN_READER_ATTRIBUTION.search(revised):
            fail(f"{unit_id}: modern source attribution leaked into revised reader copy")
    if "revisedForYourHeart" in spec and spec["revisedForYourHeart"] is not None and not isinstance(spec["revisedForYourHeart"], str):
        fail(f"{unit_id}: revisedForYourHeart has invalid type")

    if unit_id not in units:
        fail(f"{unit_id}: final-book unit missing")
    chapter_no, unit = units[unit_id]
    if chapter_no != spec["chapter"]:
        fail(f"{unit_id}: chapter drift {chapter_no} != {spec['chapter']}")
    current_sha = snapshot_sha(unit)
    if current_sha != spec["expectedCurrentSnapshotSha256"]:
        fail(f"{unit_id}: reviewed current snapshot drifted; {current_sha} != {spec['expectedCurrentSnapshotSha256']}")

    inspection = load(PACK / "units" / f"{unit_id}.json")
    if inspection.get("schema") != "emanus-nt-addressable-wave2-unit-inspection-v1":
        fail(f"{unit_id}: invalid inspection schema")
    if inspection.get("unitId") != unit_id or inspection.get("bookId") != "matei":
        fail(f"{unit_id}: inspection identity drift")
    if inspection.get("snapshotSha256") != current_sha:
        fail(f"{unit_id}: inspection snapshot differs from current final source-first copy")
    if canonical(inspection.get("snapshot")) != canonical(snapshot_payload(unit)):
        fail(f"{unit_id}: inspection snapshot payload differs from current unit")

    transcripts = inspection.get("transcripts")
    if not isinstance(transcripts, list) or not transcripts:
        fail(f"{unit_id}: no complete transcript representations listed")
    transcript_evidence = []
    transcript_refs = []
    seen_transcript_sha = set()
    for transcript_ref in transcripts:
        rep_no = transcript_ref.get("representation")
        if not isinstance(rep_no, int):
            fail(f"{unit_id}: representation number missing")
        if rep_no not in representation_cache:
            meta = load(PACK / f"{rep_no:02d}" / "meta.json")
            if meta.get("schema") != "emanus-nt-addressable-wave2-representation-meta-v1" or meta.get("bookId") != "matei":
                fail(f"representation {rep_no}: invalid meta")
            chunks = meta.get("chunks")
            if not isinstance(chunks, list) or not chunks:
                fail(f"representation {rep_no}: chunks missing")
            words = []
            expected_start = 1
            for chunk_ref in chunks:
                chunk_path = DATA / "nt-addressable-wave2-review-pack" / chunk_ref["file"]
                chunk = load(chunk_path)
                if chunk.get("schema") != "emanus-nt-addressable-wave2-transcript-chunk-v1":
                    fail(f"representation {rep_no}: invalid chunk schema in {chunk_ref['file']}")
                if chunk.get("transcriptSha256") != meta.get("transcriptSha256"):
                    fail(f"representation {rep_no}: chunk transcript SHA drift")
                if chunk.get("startWord") != expected_start or chunk.get("endWord") != chunk_ref.get("endWord"):
                    fail(f"representation {rep_no}: non-contiguous chunk boundary")
                part = str(chunk.get("text") or "").split()
                if len(part) != chunk["endWord"] - chunk["startWord"] + 1:
                    fail(f"representation {rep_no}: chunk word count drift")
                words.extend(part)
                expected_start = chunk["endWord"] + 1
            if len(words) != meta.get("wordCount"):
                fail(f"representation {rep_no}: reconstructed word count {len(words)} != {meta.get('wordCount')}")
            source_rep_file = meta.get("sourceRepresentationFile")
            if not isinstance(source_rep_file, str) or not source_rep_file:
                fail(f"representation {rep_no}: sourceRepresentationFile missing")
            source_rep = load(DATA / "nt-semantic-transcript-representations" / source_rep_file)
            source_text = str(source_rep.get("text") or "")
            if not source_text:
                fail(f"representation {rep_no}: persistent source representation text missing")
            if source_rep.get("transcriptSha256") != meta.get("transcriptSha256"):
                fail(f"representation {rep_no}: persistent source representation SHA metadata drift")
            if sha(source_text) != meta.get("transcriptSha256"):
                fail(f"representation {rep_no}: persistent source representation text SHA drift")
            source_words = source_text.split()
            if len(source_words) != meta.get("wordCount"):
                fail(f"representation {rep_no}: persistent source word count drift")
            if words != source_words:
                fail(f"representation {rep_no}: chunk sequence no longer reproduces persistent source words")
            representation_cache[rep_no] = meta
        meta = representation_cache[rep_no]
        if transcript_ref.get("transcriptUrl") != meta.get("transcriptUrl"):
            fail(f"{unit_id}: representation {rep_no} transcript URL drift")
        if transcript_ref.get("transcriptSha256") != meta.get("transcriptSha256"):
            fail(f"{unit_id}: representation {rep_no} transcript SHA drift")
        if transcript_ref.get("wordCount") != meta.get("wordCount"):
            fail(f"{unit_id}: representation {rep_no} word count drift")
        mapped_ids = {entry.get("unitId") for entry in meta.get("units", [])}
        if unit_id not in mapped_ids:
            fail(f"{unit_id}: representation {rep_no} no longer maps this unit")
        if meta["transcriptSha256"] in seen_transcript_sha:
            continue
        seen_transcript_sha.add(meta["transcriptSha256"])
        evidence_payload = {
            "officialSourceUrl": inspection.get("officialSourceUrl"),
            "transcriptSourceUrl": meta.get("transcriptUrl"),
            "sourceRange": f"{inspection.get('ref')}; complete persisted Matthew transcript representation {rep_no:02d}",
            "transcriptSha256": meta.get("transcriptSha256"),
        }
        if not isinstance(evidence_payload["officialSourceUrl"], str) or not evidence_payload["officialSourceUrl"].startswith("https://"):
            fail(f"{unit_id}: official source URL invalid")
        if not isinstance(evidence_payload["transcriptSourceUrl"], str) or not evidence_payload["transcriptSourceUrl"].startswith("https://"):
            fail(f"{unit_id}: transcript source URL invalid")
        transcript_evidence.append({
            **evidence_payload,
            "evidenceSha256": sha(canonical(evidence_payload)),
            "reviewedRepresentation": rep_no,
            "reviewedRepresentationWordCount": meta.get("wordCount"),
            "coverageVerification": inspection.get("coverageVerification"),
            "officialSourceResolution": inspection.get("officialSourceResolution"),
        })
        transcript_refs.append({
            "representation": rep_no,
            "transcriptUrl": meta.get("transcriptUrl"),
            "transcriptSha256": meta.get("transcriptSha256"),
            "wordCount": meta.get("wordCount"),
        })

    teaching = spec.get("revisedTeaching") if spec["action"] == "rewrite" else str(unit.get("teaching") or "")
    if FORBIDDEN_READER_ATTRIBUTION.search(teaching):
        fail(f"{unit_id}: modern source attribution present in final reader teaching")
    has_heart_rewrite = "revisedForYourHeart" in spec
    final_heart = spec.get("revisedForYourHeart") if has_heart_rewrite else unit.get("forYourHeart")
    reviewed_sha = snapshot_sha(unit, teaching, has_heart_rewrite, final_heart)

    normalized_spec = {
        "chapter": spec["chapter"],
        "ref": spec.get("ref") or inspection.get("ref"),
        "action": spec["action"],
        "rationale": spec["rationale"],
        "expectedCurrentSnapshotSha256": spec["expectedCurrentSnapshotSha256"],
        "transcriptRepresentations": transcript_refs,
    }
    if spec["action"] == "rewrite":
        normalized_spec["revisedTeaching"] = teaching
    if has_heart_rewrite:
        normalized_spec["revisedForYourHeart"] = final_heart
    spec_decisions[unit_id] = normalized_spec

    decision = {
        "bookId": "matei",
        "chapter": spec["chapter"],
        "unitId": unit_id,
        "status": "approved-against-transcript",
        "action": spec["action"],
        "reviewedTeachingSha256": reviewed_sha,
        "transcriptEvidence": transcript_evidence,
        "rationale": spec["rationale"],
        "reviewer": REVIEWER,
        "reviewedOn": REVIEWED_ON,
    }
    if spec["action"] == "rewrite":
        decision["revisedTeaching"] = teaching
    if has_heart_rewrite:
        decision["revisedForYourHeart"] = final_heart
    manual_decisions.append(decision)

SPEC.parent.mkdir(parents=True, exist_ok=True)
SPEC.write_text(json.dumps({
    "schema": "emanus-manual-review-spec-v2",
    "bookId": "matei",
    "reviewScope": "125 direct-addressable Matthew units reviewed sentence-level against every complete persisted transcript representation mapped to each unit",
    "reviewedOn": REVIEWED_ON,
    "counts": {
        "decisions": len(spec_decisions),
        "rewrite": rewrite_count,
        "keep": keep_count,
    },
    "sourceWorkFiles": source_work_files,
    "decisions": spec_decisions,
}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(json.dumps({
    "schema": "emanus-nt-semantic-review-book-v1",
    "bookId": "matei",
    "reviewMode": "manual-sentence-level-against-complete-persisted-direct-matthew-transcript-representations",
    "decisions": manual_decisions,
}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

print(
    f"Matei direct manual semantic review: {len(manual_decisions)} decisions "
    f"({rewrite_count} rewrite / {keep_count} keep); "
    f"{len(representation_cache)} complete transcript representations reverified."
)
