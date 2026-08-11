#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from pathlib import Path

import nt_official_audio_large_semantic_worker as core
import nt_official_audio_semantic_github_models_worker as transcript_core

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs/data/biblia-explicata"

CONFIG = {
    "filipeni": {
        "unitCount": 19,
        "snapshotFile": "11-filipeni-semantic-preedit-snapshots.json",
        "sourceIds": ["filipeni-vbv-01", "filipeni-vbv-02", "filipeni-vbv-03", "filipeni-vbv-04"],
    },
    "coloseni": {
        "unitCount": 22,
        "snapshotFile": "12-coloseni-semantic-preedit-snapshots.json",
        "sourceIds": ["coloseni-vbv-01", "coloseni-vbv-02", "coloseni-vbv-03", "coloseni-vbv-04"],
    },
    "1-tesaloniceni": {
        "unitCount": 23,
        "snapshotFile": "13-1-tesaloniceni-semantic-preedit-snapshots.json",
        "sourceIds": ["1-tesaloniceni-vbv-01", "1-tesaloniceni-vbv-02"],
    },
}


def fail(message: str) -> None:
    raise SystemExit(f"[small official-audio semantic review v2] {message}")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--book", required=True, choices=sorted(CONFIG))
    parser.add_argument("--output", required=True, type=Path)
    parser.add_argument("--reviewed-on", default="2026-08-11")
    args = parser.parse_args()

    config = CONFIG[args.book]
    book = core.find_book(args.book)
    snapshots = core.load(DATA / "nt-semantic-review-work" / config["snapshotFile"])
    if snapshots.get("schema") != "emanus-nt-semantic-book-preedit-snapshots-v1" or snapshots.get("bookId") != args.book:
        fail("bad preedit snapshot artifact")
    if int(snapshots.get("unitCount", -1)) != config["unitCount"] or len(snapshots.get("units", {})) != config["unitCount"]:
        fail("preedit snapshot count drift")

    transcripts = [transcript_core.validate_transcript(source_id, args.book) for source_id in config["sourceIds"]]
    by_source = {source["sourceId"]: source for source in transcripts}
    rows: list[dict] = []
    for chapter in book.get("chapters", []):
        for unit in chapter.get("units", []):
            unit_id = str(unit.get("id") or "")
            frozen = snapshots["units"].get(unit_id)
            if not frozen:
                fail(f"{unit_id}: missing preedit snapshot")
            if int(frozen.get("chapter", -1)) != int(chapter["number"]):
                fail(f"{unit_id}: snapshot chapter drift")
            current = core.snapshot_sha(unit)
            if current != frozen.get("snapshotSha256"):
                fail(f"{unit_id}: preedit snapshot drifted; {current} != {frozen.get('snapshotSha256')}")
            if core.canonical(frozen.get("snapshot")) != core.canonical(core.snapshot_payload(unit)):
                fail(f"{unit_id}: preedit snapshot payload drifted")
            start = (int(chapter["number"]), int(unit.get("verseStart") or 0))
            end = (int(chapter["number"]), int(unit.get("verseEnd") or 0))
            if start[1] <= 0 or end[1] <= 0 or end < start:
                fail(f"{unit_id}: invalid passage coordinates")
            sources = core.coverage_set(transcripts, start, end)
            rows.append({
                "bookId": args.book,
                "chapter": int(chapter["number"]),
                "unitId": unit_id,
                "ref": str(unit.get("ref") or ""),
                "heading": str(unit.get("heading") or ""),
                "teaching": str(unit.get("teaching") or ""),
                "forYourHeart": unit.get("forYourHeart"),
                "unit": unit,
                "preEditSnapshotSha256": current,
                "sources": sources,
            })
    if len(rows) != config["unitCount"]:
        fail(f"expected {config['unitCount']} units, found {len(rows)}")

    groups: dict[tuple[str, ...], list[dict]] = {}
    for row in rows:
        key = tuple(source["sourceId"] for source in row["sources"])
        groups.setdefault(key, []).append(row)

    decisions: list[dict] = []
    for coverage_ids, group in groups.items():
        sources = [by_source[source_id] for source_id in coverage_ids]
        for offset in range(0, len(group), core.BATCH):
            batch = group[offset:offset + core.BATCH]
            first = core.call_model(core.first_prompt(sources, batch))
            first_map = {item.get("unitId"): item for item in first.get("units", []) if isinstance(item, dict)}
            expected = {row["unitId"] for row in batch}
            if set(first_map) != expected:
                fail(f"first reviewer unit set mismatch: {set(first_map)} != {expected}")
            second = core.call_model(core.verify_prompt(sources, batch, first))
            second_map = {item.get("unitId"): item for item in second.get("units", []) if isinstance(item, dict)}
            if set(second_map) != expected:
                fail("verifier unit set mismatch")
            for row in batch:
                result = second_map[row["unitId"]]
                action = result.get("finalAction")
                problems = result.get("problems") or []
                if action == "reject" or problems:
                    fail(f"{row['unitId']}: verifier rejected: {problems or result.get('rationale')}")
                if action not in {"keep", "rewrite"}:
                    fail(f"{row['unitId']}: invalid finalAction {action}")
                rationale = str(result.get("rationale") or "").strip()
                if not rationale:
                    fail(f"{row['unitId']}: empty rationale")
                teaching = row["teaching"]
                final_heart = row["forYourHeart"]
                has_heart = False
                if action == "rewrite":
                    teaching = str(result.get("revisedTeaching") or "").strip()
                    if len(teaching) < 120:
                        fail(f"{row['unitId']}: revisedTeaching too short")
                    if core.FORBIDDEN_READER.search(teaching):
                        fail(f"{row['unitId']}: source attribution leaked into teaching")
                    if "revisedForYourHeart" in result and result.get("revisedForYourHeart") is not None:
                        has_heart = True
                        final_heart = str(result.get("revisedForYourHeart") or "").strip()
                        if final_heart and core.FORBIDDEN_READER.search(final_heart):
                            fail(f"{row['unitId']}: source attribution leaked into forYourHeart")
                reviewed_hash = core.snapshot_sha(row["unit"], teaching, has_heart, final_heart)
                coverage_list = list(coverage_ids)
                decision = {
                    "bookId": args.book,
                    "chapter": row["chapter"],
                    "unitId": row["unitId"],
                    "status": "approved-against-transcript",
                    "action": action,
                    "reviewedPreEditSnapshotSha256": row["preEditSnapshotSha256"],
                    "reviewedTeachingSha256": reviewed_hash,
                    "transcriptEvidence": [core.evidence(source, row["ref"], coverage_list) for source in sources],
                    "rationale": rationale,
                    "reviewer": f"two-pass GitHub Models semantic review against exact persisted official audio transcript set ({core.MODEL})",
                    "reviewedOn": args.reviewed_on,
                }
                if action == "rewrite":
                    decision["revisedTeaching"] = teaching
                    if has_heart:
                        decision["revisedForYourHeart"] = final_heart
                decisions.append(decision)
                print(f"SEMANTIC {args.book} {row['unitId']} {action} coverage={','.join(coverage_ids)}", flush=True)

    if len(decisions) != config["unitCount"] or len({(d['chapter'], d['unitId']) for d in decisions}) != config["unitCount"]:
        fail(f"decision coverage incomplete/duplicate: {len(decisions)}")
    rewrite = sum(d["action"] == "rewrite" for d in decisions)
    keep = sum(d["action"] == "keep" for d in decisions)
    artifact = {
        "schema": "emanus-nt-semantic-review-book-v1",
        "bookId": args.book,
        "reviewMode": "two-pass-exact-persisted-official-audio-transcript-sets",
        "coverage": {
            "bookUnits": config["unitCount"],
            "approvedUnits": config["unitCount"],
            "rewrite": rewrite,
            "keep": keep,
            "officialTranscriptSources": config["sourceIds"],
        },
        "decisions": sorted(decisions, key=lambda d: (d["chapter"], d["unitId"])),
    }
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(artifact, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{args.book}: {len(decisions)}/{config['unitCount']} ({rewrite} rewrite / {keep} keep).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
