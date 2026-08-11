#!/usr/bin/env python3
from __future__ import annotations

import copy
import hashlib
import json
from pathlib import Path

ROOT = Path.cwd()
SPEC = ROOT / "docs/data/biblia-explicata/nt-semantic-review-spec/06-romani.json"
BOOK = ROOT / "docs/data/biblia-explicata/nt-final-source-first/06-romani.json"
EXPECTED_REVIEW_CONTENT_SHA = "sha256:c5c9254c0fd699b54015a2f4ea36834202f5f3e299bbe704dd2cd9e761ce2715"
EXPECTED_REVIEWED_SNAPSHOT_MAP_SHA = "sha256:3536c2223ca119820a480b276b42b519ade7ee0757a84fbd52a1a1b07fea4685"


def fail(message: str) -> None:
    raise SystemExit(f"[Romans wave1 spec fix] {message}")


def canonical(value) -> str:
    return json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":"))


def sha(value: str) -> str:
    return "sha256:" + hashlib.sha256(value.encode("utf-8")).hexdigest()


def snapshot(unit: dict) -> str:
    return json.dumps(
        {
            "heading": str(unit.get("heading") or ""),
            "teaching": str(unit.get("teaching") or ""),
            "forYourHeart": str(unit.get("forYourHeart") or ""),
        },
        ensure_ascii=False,
        separators=(",", ":"),
    )


if not SPEC.exists() or not BOOK.exists():
    fail("review spec or current book is missing")

spec = json.loads(SPEC.read_text(encoding="utf-8"))
if spec.get("schema") != "emanus-manual-review-spec-v2" or spec.get("bookId") != "romani":
    fail("unexpected Romans review spec")
decisions = spec.get("decisions")
if not isinstance(decisions, dict) or len(decisions) != 68:
    fail(f"expected exactly 68 frozen Romans decisions, found {len(decisions) if isinstance(decisions, dict) else 'invalid'}")
if sum(1 for item in decisions.values() if item.get("action") == "rewrite") != 3:
    fail("expected exactly 3 Romans rewrites")
if sum(1 for item in decisions.values() if item.get("action") == "keep") != 65:
    fail("expected exactly 65 Romans keeps")

review_content = copy.deepcopy(spec)
for item in review_content["decisions"].values():
    item.pop("expectedCurrentSnapshotSha256", None)
actual_review_content_sha = sha(canonical(review_content))
if actual_review_content_sha != EXPECTED_REVIEW_CONTENT_SHA:
    fail(
        "frozen review content changed beyond snapshot hashes; "
        f"{actual_review_content_sha} != {EXPECTED_REVIEW_CONTENT_SHA}"
    )

book = json.loads(BOOK.read_text(encoding="utf-8"))
if book.get("id") != "romani":
    fail(f"expected current book romani, got {book.get('id')}")
units = {
    unit["id"]: unit
    for chapter in book.get("chapters", [])
    for unit in chapter.get("units", [])
}
if len(units) != 68 or set(units) != set(decisions):
    fail("current Romans unit set differs from the 68 manually reviewed units")

snapshot_map = {unit_id: sha(snapshot(units[unit_id])) for unit_id in sorted(units)}
actual_snapshot_map_sha = sha(canonical(snapshot_map))
if actual_snapshot_map_sha != EXPECTED_REVIEWED_SNAPSHOT_MAP_SHA:
    fail(
        "current presemantic Romans reader copy is not the exact manually reviewed corpus; "
        f"{actual_snapshot_map_sha} != {EXPECTED_REVIEWED_SNAPSHOT_MAP_SHA}"
    )

changed = 0
for unit_id, item in decisions.items():
    expected = snapshot_map[unit_id]
    if item.get("expectedCurrentSnapshotSha256") != expected:
        item["expectedCurrentSnapshotSha256"] = expected
        changed += 1

SPEC.write_text(json.dumps(spec, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(
    "Romans wave1 spec fix: aligned "
    f"{changed}/68 snapshot hashes to the exact manually reviewed corpus; review decisions unchanged."
)
