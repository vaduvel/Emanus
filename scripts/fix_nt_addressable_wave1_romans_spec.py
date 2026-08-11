#!/usr/bin/env python3
from __future__ import annotations

import base64
import copy
import gzip
import hashlib
import json
from pathlib import Path

ROOT = Path.cwd()
DATA = ROOT / "docs/data/biblia-explicata"
SPEC = DATA / "nt-semantic-review-spec/06-romani.json"
BOOK = DATA / "nt-final-source-first/06-romani.json"
OUT = DATA / "nt-romans-wave1-presemantic-diagnostic.json"
EXPECTED_REVIEW_CONTENT_SHA = "sha256:c5c9254c0fd699b54015a2f4ea36834202f5f3e299bbe704dd2cd9e761ce2715"
EXPECTED_REVIEWED_SNAPSHOT_MAP_SHA = "sha256:3536c2223ca119820a480b276b42b519ade7ee0757a84fbd52a1a1b07fea4685"
REVIEWED_HASHES_GZIP_B64 = "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"


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


for path in (SPEC, BOOK):
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

review_content = copy.deepcopy(spec)
for item in review_content["decisions"].values():
    item.pop("expectedCurrentSnapshotSha256", None)
actual_review_content_sha = sha(canonical(review_content))
if actual_review_content_sha != EXPECTED_REVIEW_CONTENT_SHA:
    fail(
        "frozen review content changed beyond snapshot hashes; "
        f"{actual_review_content_sha} != {EXPECTED_REVIEW_CONTENT_SHA}"
    )

reviewed_hashes = json.loads(gzip.decompress(base64.b64decode(REVIEWED_HASHES_GZIP_B64)).decode("utf-8"))
if len(reviewed_hashes) != 68 or set(reviewed_hashes) != set(decisions):
    fail("embedded reviewed hash map does not cover exactly the 68 frozen decisions")
actual_reviewed_map_sha = sha(canonical(reviewed_hashes))
if actual_reviewed_map_sha != EXPECTED_REVIEWED_SNAPSHOT_MAP_SHA:
    fail(
        "embedded reviewed hash map corrupted; "
        f"{actual_reviewed_map_sha} != {EXPECTED_REVIEWED_SNAPSHOT_MAP_SHA}"
    )

# Restore the stale spec hashes to the exact manually reviewed corpus. This is not a
# rebind to the current generated text; the current text is checked separately below.
changed = 0
for unit_id, item in decisions.items():
    if item.get("expectedCurrentSnapshotSha256") != reviewed_hashes[unit_id]:
        item["expectedCurrentSnapshotSha256"] = reviewed_hashes[unit_id]
        changed += 1
SPEC.write_text(json.dumps(spec, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

book = json.loads(BOOK.read_text(encoding="utf-8"))
if book.get("id") != "romani":
    fail(f"expected current book romani, got {book.get('id')}")
units = {u["id"]: u for c in book.get("chapters", []) for u in c.get("units", [])}
if len(units) != 68 or set(units) != set(decisions):
    fail("current Romans unit set differs from the 68 manually reviewed units")

findings = []
for unit_id in sorted(units):
    current_sha = snapshot_sha(units[unit_id])
    if current_sha == reviewed_hashes[unit_id]:
        continue
    findings.append(
        {
            "unitId": unit_id,
            "chapter": decisions[unit_id]["chapter"],
            "action": decisions[unit_id]["action"],
            "reviewedSnapshotSha256": reviewed_hashes[unit_id],
            "currentPresemanticSnapshotSha256": current_sha,
            "currentPresemantic": snapshot_payload(units[unit_id]),
        }
    )

report = {
    "schema": "emanus-nt-romans-wave1-presemantic-diagnostic-v1",
    "policy": "Diagnostic only. The spec is restored to exact reviewed hashes; current drift is never approved automatically.",
    "reviewedUnits": 68,
    "specHashesCorrected": changed,
    "driftCount": len(findings),
    "findings": findings,
}
OUT.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"Romans wave1 spec fix: restored {changed}/68 stale hashes to the exact manually reviewed corpus.")
print(f"Romans wave1 reviewed-vs-current diagnostic: {len(findings)} real presemantic drifts / 68 units.")
for finding in findings:
    print(f"- {finding['unitId']}: {finding['reviewedSnapshotSha256']} -> {finding['currentPresemanticSnapshotSha256']}")
raise SystemExit(42 if findings else 0)
