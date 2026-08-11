#!/usr/bin/env python3
from __future__ import annotations

import copy
import hashlib
import json
import subprocess
from pathlib import Path

ROOT = Path.cwd()
DATA = ROOT / "docs/data/biblia-explicata"
SPEC = DATA / "nt-semantic-review-spec/06-romani.json"
BOOK = DATA / "nt-final-source-first/06-romani.json"
OUT = DATA / "nt-romans-wave1-presemantic-diagnostic.json"
REVIEW_COMMIT = "0da7e90a05c3cd878d0e11472589b8fa9b37d621"
REVIEW_SPEC_PATH = "docs/data/biblia-explicata/nt-semantic-review-spec/06-romani.json"


def fail(message: str) -> None:
    raise SystemExit(f"[Romans wave1 review anchor] {message}")


def stable_without_snapshot_hashes(spec: dict) -> str:
    value = copy.deepcopy(spec)
    for item in (value.get("decisions") or {}).values():
        item.pop("expectedCurrentSnapshotSha256", None)
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


def git_show_json(commit: str, path: str) -> dict:
    try:
        raw = subprocess.check_output(
            ["git", "show", f"{commit}:{path}"],
            cwd=ROOT,
            text=True,
            encoding="utf-8",
        )
    except subprocess.CalledProcessError as exc:
        fail(f"cannot load review anchor {commit}:{path} ({exc.returncode})")
    return json.loads(raw)


if not SPEC.exists() or not BOOK.exists():
    fail("current Romans spec or book is missing")

current_spec = json.loads(SPEC.read_text(encoding="utf-8"))
review_spec = git_show_json(REVIEW_COMMIT, REVIEW_SPEC_PATH)

for label, spec in (("current", current_spec), ("review-anchor", review_spec)):
    if spec.get("schema") != "emanus-manual-review-spec-v2" or spec.get("bookId") != "romani":
        fail(f"{label} spec has unexpected schema/book")
    decisions = spec.get("decisions")
    if not isinstance(decisions, dict) or len(decisions) != 68:
        fail(f"{label} spec must contain exactly 68 decisions")
    if sum(1 for x in decisions.values() if x.get("action") == "rewrite") != 3:
        fail(f"{label} spec must contain exactly 3 rewrites")
    if sum(1 for x in decisions.values() if x.get("action") == "keep") != 65:
        fail(f"{label} spec must contain exactly 65 keeps")

if stable_without_snapshot_hashes(current_spec) != stable_without_snapshot_hashes(review_spec):
    fail("current Romans decisions/rationales/rewrite text differ from the original reviewed spec; refusing hash repair")

review_decisions = review_spec["decisions"]
current_decisions = current_spec["decisions"]
review_hashes = {unit_id: item.get("expectedCurrentSnapshotSha256") for unit_id, item in review_decisions.items()}
if any(not isinstance(value, str) or not value.startswith("sha256:") for value in review_hashes.values()):
    fail("review anchor contains invalid snapshot hashes")

changed = 0
for unit_id, item in current_decisions.items():
    expected = review_hashes[unit_id]
    if item.get("expectedCurrentSnapshotSha256") != expected:
        item["expectedCurrentSnapshotSha256"] = expected
        changed += 1
SPEC.write_text(json.dumps(current_spec, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

book = json.loads(BOOK.read_text(encoding="utf-8"))
if book.get("id") != "romani":
    fail(f"expected current book romani, got {book.get('id')}")
units = {u["id"]: u for c in book.get("chapters", []) for u in c.get("units", [])}
if len(units) != 68 or set(units) != set(current_decisions):
    fail("current Romans unit set differs from the original 68 reviewed units")

findings = []
for unit_id in sorted(units):
    current_hash = snapshot_sha(units[unit_id])
    reviewed_hash = review_hashes[unit_id]
    if current_hash == reviewed_hash:
        continue
    findings.append({
        "unitId": unit_id,
        "chapter": current_decisions[unit_id]["chapter"],
        "action": current_decisions[unit_id]["action"],
        "reviewedSnapshotSha256": reviewed_hash,
        "currentPresemanticSnapshotSha256": current_hash,
        "currentPresemantic": snapshot_payload(units[unit_id]),
    })

report = {
    "schema": "emanus-nt-romans-wave1-presemantic-diagnostic-v2",
    "policy": "The original review spec is loaded directly from the immutable review commit. Decision content must be byte-equivalent after canonicalization. Snapshot hashes are restored only from that review anchor; current generated copy is never rebound automatically.",
    "reviewCommit": REVIEW_COMMIT,
    "reviewedUnits": 68,
    "specHashesRestored": changed,
    "driftCount": len(findings),
    "findings": findings,
}
OUT.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"Romans wave1 review anchor: restored {changed}/68 snapshot hashes from {REVIEW_COMMIT[:8]}.")
print(f"Romans reviewed-vs-current diagnostic: {len(findings)} real snapshot drifts / 68 units.")
for finding in findings:
    print(f"- {finding['unitId']}: {finding['reviewedSnapshotSha256']} -> {finding['currentPresemanticSnapshotSha256']}")
raise SystemExit(42 if findings else 0)
