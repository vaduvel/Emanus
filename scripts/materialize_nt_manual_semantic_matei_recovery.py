#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path

ROOT = Path.cwd()
DATA = ROOT / "docs/data/biblia-explicata"
BOOK = DATA / "nt-final-source-first/01-matei.json"
WORK = DATA / "nt-semantic-review-work/01-matei-wave2-recovery.json"
OUT = DATA / "nt-semantic-review-manual/01-matei-recovery.json"
TRANSCRIPTS = DATA / "nt-official-transcripts"
REVIEWER = "GPT-5.6 Sol manual sentence-level semantic review against exact official CFC Matthew audio transcripts"
REVIEWED_ON = "2026-08-11"
FORBIDDEN_READER_ATTRIBUTION = re.compile(r"\b(?:Poonen|CFC|SermonIndex)\b", re.I)

TARGETS = {
    "matei-6-16-18": "matei-vbv-09",
    "matei-6-19-24": "matei-vbv-09",
    "matei-6-25-34": "matei-vbv-10",
    "matei-7-1-5": "matei-vbv-10",
}
EXPECTED_SOURCE = {
    "matei-vbv-09": {
        "officialSourceUrl": "https://www.cfcindia.com/verse-by-verse/09matthew-chapter-69-to-chapter-624",
        "officialAudioUrl": "https://www.cfcindia.org/resources/en/study-series/verse-by-verse/nt01-matthew-chapter-6-9-to-chapter-6-24.mp3",
    },
    "matei-vbv-10": {
        "officialSourceUrl": "https://www.cfcindia.com/verse-by-verse/10matthew-chapter-625-to-chapter-712",
        "officialAudioUrl": "https://www.cfcindia.org/resources/en/study-series/verse-by-verse/nt01-matthew-chapter-6-25-to-chapter-7-12.mp3",
    },
}


def fail(message: str) -> None:
    raise SystemExit(f"[Matei semantic recovery] {message}")


def sha(value: str) -> str:
    return "sha256:" + hashlib.sha256(value.encode("utf-8")).hexdigest()


def canonical(value) -> str:
    return json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":"))


def snapshot_payload(unit: dict, teaching: str | None = None, heart_marker: bool = False, heart=None) -> dict:
    if teaching is None:
        teaching = str(unit.get("teaching") or "")
    final_heart = heart if heart_marker else unit.get("forYourHeart")
    return {
        "heading": str(unit.get("heading") or ""),
        "teaching": str(teaching or ""),
        "forYourHeart": str(final_heart or ""),
    }


def snapshot_sha(unit: dict, teaching: str | None = None, heart_marker: bool = False, heart=None) -> str:
    payload = snapshot_payload(unit, teaching, heart_marker, heart)
    return sha(json.dumps(payload, ensure_ascii=False, separators=(",", ":")))


def load(path: Path) -> dict:
    if not path.exists():
        fail(f"missing {path.relative_to(ROOT)}")
    return json.loads(path.read_text(encoding="utf-8"))


def validate_transcript(source_id: str) -> dict:
    path = TRANSCRIPTS / f"{source_id}.json"
    data = load(path)
    expected = EXPECTED_SOURCE[source_id]
    if data.get("schema") != "emanus-nt-official-audio-transcript-v1":
        fail(f"{source_id}: invalid transcript schema")
    if data.get("bookId") != "matei" or data.get("sourceId") != source_id:
        fail(f"{source_id}: identity drift")
    for key, value in expected.items():
        if data.get(key) != value:
            fail(f"{source_id}: {key} drift")
    if not re.fullmatch(r"sha256:[0-9a-f]{64}", str(data.get("officialAudioSha256") or "")):
        fail(f"{source_id}: invalid officialAudioSha256")
    if not re.fullmatch(r"sha256:[0-9a-f]{64}", str(data.get("transcriptSha256") or "")):
        fail(f"{source_id}: invalid transcriptSha256")
    if not isinstance(data.get("wordCount"), int) or data["wordCount"] < 1500:
        fail(f"{source_id}: transcript too short")
    segments = data.get("segments")
    if not isinstance(segments, list) or not segments:
        fail(f"{source_id}: transcript segments missing")
    lines = []
    previous_end = -1.0
    for index, segment in enumerate(segments):
        if not isinstance(segment, dict):
            fail(f"{source_id}: segment {index} invalid")
        start = segment.get("start")
        end = segment.get("end")
        text = " ".join(str(segment.get("text") or "").split()).strip()
        if not isinstance(start, (int, float)) or not isinstance(end, (int, float)) or end < start:
            fail(f"{source_id}: segment {index} timestamps invalid")
        if start + 0.05 < previous_end:
            fail(f"{source_id}: segment {index} overlaps previous segment unexpectedly")
        if not text:
            fail(f"{source_id}: segment {index} text empty")
        previous_end = end
        lines.append(text)
    transcript = "\n".join(lines).strip() + "\n"
    if len(transcript.split()) != data["wordCount"]:
        fail(f"{source_id}: reconstructed word count drift")
    if sha(transcript) != data["transcriptSha256"]:
        fail(f"{source_id}: reconstructed transcript SHA drift")
    return data


book = load(BOOK)
if book.get("id") != "matei":
    fail(f"expected matei book, got {book.get('id')}")
units: dict[str, tuple[int, dict]] = {}
for chapter in book.get("chapters", []):
    for unit in chapter.get("units", []):
        unit_id = unit.get("id")
        if unit_id in units:
            fail(f"duplicate unit {unit_id}")
        units[unit_id] = (int(chapter["number"]), unit)

work = load(WORK)
if work.get("schema") != "emanus-nt-semantic-review-work-v1" or work.get("bookId") != "matei":
    fail("unexpected recovery WIP schema/book")
if work.get("status") != "work-in-progress-not-ledger-eligible":
    fail(f"unexpected recovery WIP status {work.get('status')}")
decisions = work.get("decisions")
if not isinstance(decisions, dict) or set(decisions) != set(TARGETS):
    fail(f"recovery decisions must be exactly {sorted(TARGETS)}")
if int(work.get("reviewedRecoveredUnits", -1)) != 4:
    fail("reviewedRecoveredUnits must equal 4")

transcript_cache = {source_id: validate_transcript(source_id) for source_id in sorted(set(TARGETS.values()))}
manual = []
rewrite_count = 0
keep_count = 0

for unit_id in TARGETS:
    spec = decisions[unit_id]
    if spec.get("action") not in {"keep", "rewrite"}:
        fail(f"{unit_id}: invalid action")
    if not isinstance(spec.get("chapter"), int) or not isinstance(spec.get("rationale"), str) or not spec["rationale"].strip():
        fail(f"{unit_id}: incomplete decision metadata")
    expected_current = str(spec.get("expectedCurrentSnapshotSha256") or "")
    if not re.fullmatch(r"sha256:[0-9a-f]{64}", expected_current):
        fail(f"{unit_id}: invalid expectedCurrentSnapshotSha256")
    if unit_id not in units:
        fail(f"{unit_id}: missing from final book")
    chapter_no, unit = units[unit_id]
    if chapter_no != spec["chapter"]:
        fail(f"{unit_id}: chapter drift")

    if spec["action"] == "rewrite":
        rewrite_count += 1
        teaching = spec.get("revisedTeaching")
        if not isinstance(teaching, str) or len(teaching.strip()) < 120:
            fail(f"{unit_id}: rewrite lacks substantial revisedTeaching")
    else:
        keep_count += 1
        teaching = str(unit.get("teaching") or "")

    has_heart = "revisedForYourHeart" in spec
    final_heart = spec.get("revisedForYourHeart") if has_heart else unit.get("forYourHeart")
    if has_heart and final_heart is not None and not isinstance(final_heart, str):
        fail(f"{unit_id}: revisedForYourHeart invalid")
    if FORBIDDEN_READER_ATTRIBUTION.search(teaching):
        fail(f"{unit_id}: source attribution leaked into reader copy")

    current_hash = snapshot_sha(unit)
    approved_hash = snapshot_sha(unit, teaching, has_heart, final_heart)
    if current_hash not in {expected_current, approved_hash}:
        fail(f"{unit_id}: current snapshot is neither reviewed pre-edit nor exact approved result")

    source_id = TARGETS[unit_id]
    transcript = transcript_cache[source_id]
    evidence_payload = {
        "officialSourceUrl": transcript["officialSourceUrl"],
        "transcriptSourceUrl": transcript["officialAudioUrl"],
        "sourceRange": f"{spec.get('ref')}; exact official CFC audio transcript {source_id}; {transcript.get('sourceRange')}",
        "transcriptSha256": transcript["transcriptSha256"],
    }
    evidence = {
        **evidence_payload,
        "evidenceSha256": sha(canonical(evidence_payload)),
        "officialAudioSha256": transcript["officialAudioSha256"],
        "transcriptionModel": transcript.get("transcriptionModel"),
        "wordCount": transcript["wordCount"],
        "sourceId": source_id,
    }
    decision = {
        "bookId": "matei",
        "chapter": spec["chapter"],
        "unitId": unit_id,
        "status": "approved-against-transcript",
        "action": spec["action"],
        "reviewedTeachingSha256": approved_hash,
        "transcriptEvidence": [evidence],
        "rationale": spec["rationale"],
        "reviewer": REVIEWER,
        "reviewedOn": REVIEWED_ON,
    }
    if spec["action"] == "rewrite":
        decision["revisedTeaching"] = teaching
    if has_heart:
        decision["revisedForYourHeart"] = final_heart
    manual.append(decision)

OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(json.dumps({
    "schema": "emanus-nt-semantic-review-book-v1",
    "bookId": "matei",
    "reviewMode": "manual-sentence-level-official-cfc-audio-recovery",
    "coverage": {
        "bookUnits": 129,
        "approvedRecoveryUnits": 4,
        "rewrite": rewrite_count,
        "keep": keep_count,
        "targetUnits": list(TARGETS),
    },
    "decisions": manual,
}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

print(f"Matei recovery materialized: 4/4 units ({rewrite_count} rewrite / {keep_count} keep).")
