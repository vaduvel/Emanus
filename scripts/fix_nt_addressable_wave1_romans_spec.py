#!/usr/bin/env python3
from __future__ import annotations

import copy
import hashlib
import json
from pathlib import Path

ROOT = Path.cwd()
DATA = ROOT / "docs/data/biblia-explicata"
SPEC = DATA / "nt-semantic-review-spec/06-romani.json"
BOOK = DATA / "nt-final-source-first/06-romani.json"
BASE_DIAGNOSTIC = DATA / "nt-addressable-wave1-presemantic-diagnostic.json"
OUT = DATA / "nt-romans-wave1-presemantic-diagnostic.json"
EXPECTED_REVIEW_CONTENT_SHA = "sha256:c5c9254c0fd699b54015a2f4ea36834202f5f3e299bbe704dd2cd9e761ce2715"
EXPECTED_REVIEWED_SNAPSHOT_MAP_SHA = "sha256:3536c2223ca119820a480b276b42b519ade7ee0757a84fbd52a1a1b07fea4685"


def fail(message: str) -> None:
    raise SystemExit(f"[Romans wave1 spec fix] {message}")


def canonical(value) -> str:
    return json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":"))


def sha(value: str) -> str:
    return "sha256:" + hashlib.sha256(value.encode("utf-8")).hexdigest()


def snapshot_payload(unit: dict) -> dict:
    return {
        "heading": str(unit.get("heading") or ""),
        "teaching": str(unit.get("teaching") or ""),
        "forYourHeart": str(unit.get("forYourHeart") or ""),
    }


def snapshot_sha(unit: dict) -> str:
    return sha(json.dumps(snapshot_payload(unit), ensure_ascii=False, separators=(",", ":")))


for path in (SPEC, BOOK, BASE_DIAGNOSTIC):
    if not path.exists():
        fail(f"missing {path.relative_to(ROOT)}")

spec = json.loads(SPEC.read_text(encoding="utf-8"))
if spec.get("schema") != "emanus-manual-review-spec-v2" or spec.get("bookId") != "romani":
    fail("unexpected Romans review spec")
decisions = spec.get("decisions")
if not isinstance(decisions, dict) or len(decisions) != 68:
    fail("expected exactly 68 frozen Romans decisions")
if sum(1 for item in decisions.values() if item.get("action") == "rewrite") != 3:
    fail("expected exactly 3 Romans rewrites")
if sum(1 for item in decisions.values() if item.get("action") == "keep") != 65:
    fail("expected exactly 65 Romans keeps")

# The manually reviewed decision content is immutable here. Only snapshot hashes may
# be repaired, and only against the exact reviewed corpus captured by the earlier
# fail-closed diagnostic.
review_content = copy.deepcopy(spec)
for item in review_content["decisions"].values():
    item.pop("expectedCurrentSnapshotSha256", None)
actual_review_content_sha = sha(canonical(review_content))
if actual_review_content_sha != EXPECTED_REVIEW_CONTENT_SHA:
    fail(
        "frozen review content changed beyond snapshot hashes; "
        f"{actual_review_content_sha} != {EXPECTED_REVIEW_CONTENT_SHA}"
    )

base = json.loads(BASE_DIAGNOSTIC.read_text(encoding="utf-8"))
if base.get("schema") != "emanus-nt-addressable-wave1-presemantic-diagnostic-v1":
    fail("unexpected base diagnostic schema")
romans_findings = [f for f in base.get("findings", []) if f.get("bookId") == "romani"]
if len(romans_findings) != 68:
    fail(f"expected 68 Romans reviewed snapshots in base diagnostic, found {len(romans_findings)}")
reviewed_hashes = {f["unitId"]: f["presemanticSnapshotSha256"] for f in romans_findings}
reviewed_payloads = {f["unitId"]: f["presemantic"] for f in romans_findings}
if set(reviewed_hashes) != set(decisions):
    fail("base diagnostic Romans unit set differs from frozen review spec")
actual_reviewed_map_sha = sha(canonical(reviewed_hashes))
if actual_reviewed_map_sha != EXPECTED_REVIEWED_SNAPSHOT_MAP_SHA:
    fail(
        "base diagnostic no longer proves the exact manually reviewed Romans corpus; "
        f"{actual_reviewed_map_sha} != {EXPECTED_REVIEWED_SNAPSHOT_MAP_SHA}"
    )

# Correct the stale hashes in the persisted review spec to the exact reviewed corpus.
changed = 0
for unit_id, item in decisions.items():
    expected = reviewed_hashes[unit_id]
    if item.get("expectedCurrentSnapshotSha256") != expected:
        item["expectedCurrentSnapshotSha256"] = expected
        changed += 1
SPEC.write_text(json.dumps(spec, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

book = json.loads(BOOK.read_text(encoding="utf-8"))
if book.get("id") != "romani":
    fail(f"expected current book romani, got {book.get('id')}")
units = {u["id"]: u for c in book.get("chapters", []) for u in c.get("units", [])}
if len(units) != 68 or set(units) != set(decisions):
    fail("current Romans unit set differs from the 68 manually reviewed units")

current_hashes = {unit_id: snapshot_sha(units[unit_id]) for unit_id in sorted(units)}
drifts = []
for unit_id in sorted(units):
    if current_hashes[unit_id] == reviewed_hashes[unit_id]:
        continue
    drifts.append(
        {
            "unitId": unit_id,
            "chapter": decisions[unit_id]["chapter"],
            "action": decisions[unit_id]["action"],
            "reviewedSnapshotSha256": reviewed_hashes[unit_id],
            "currentPresemanticSnapshotSha256": current_hashes[unit_id],
            "reviewed": reviewed_payloads[unit_id],
            "currentPresemantic": snapshot_payload(units[unit_id]),
        }
    )

report = {
    "schema": "emanus-nt-romans-wave1-presemantic-diagnostic-v1",
    "policy": "Diagnostic only. Snapshot hashes were restored to the exact manually reviewed corpus; no drifted current unit is approved without manual reconciliation.",
    "reviewedUnits": 68,
    "specHashesCorrected": changed,
    "driftCount": len(drifts),
    "findings": drifts,
}
OUT.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

print(f"Romans wave1 spec fix: restored {changed}/68 stale hashes to the exact reviewed corpus.")
print(f"Romans wave1 reviewed-vs-current diagnostic: {len(drifts)} real presemantic drifts / 68 units.")
for finding in drifts:
    print(
        "- " + finding["unitId"] + ": "
        + finding["reviewedSnapshotSha256"] + " -> "
        + finding["currentPresemanticSnapshotSha256"]
    )
raise SystemExit(42 if drifts else 0)
