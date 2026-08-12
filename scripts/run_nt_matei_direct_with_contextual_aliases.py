#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import json
import subprocess
import sys
import tempfile
import unicodedata
from pathlib import Path

ROOT = Path.cwd()
DATA = ROOT / "docs/data/biblia-explicata"
SOURCE = ROOT / "scripts/materialize_nt_manual_semantic_matei_direct.py"
BOOK = DATA / "nt-final-source-first/01-matei.json"
PACK_UNITS = DATA / "nt-addressable-wave2-review-pack/matei/units"
WORK = DATA / "nt-semantic-review-work"
EXPECTED_FILES = [
    "01-matei-wave2-wip.json",
    *[f"01-matei-wave2-wip-{i:02d}.json" for i in range(2, 23)],
]


def fail(message: str) -> None:
    raise SystemExit(f"[Matei direct contextual alias runner] {message}")


def sha(value: str) -> str:
    return "sha256:" + hashlib.sha256(value.encode("utf-8")).hexdigest()


def snapshot(unit: dict) -> dict:
    return {
        "heading": str(unit.get("heading") or ""),
        "teaching": str(unit.get("teaching") or ""),
        "forYourHeart": str(unit.get("forYourHeart") or ""),
    }


def snapshot_sha(payload: dict) -> str:
    return sha(json.dumps(payload, ensure_ascii=False, separators=(",", ":")))


def strip_diacritics(value: str) -> str:
    value = unicodedata.normalize("NFD", str(value))
    value = "".join(ch for ch in value if unicodedata.category(ch) != "Mn")
    return value.replace("ş", "s").replace("Ş", "S").replace("ţ", "t").replace("Ţ", "T")


def find_unit(book: dict, unit_id: str) -> dict:
    for chapter in book.get("chapters", []):
        for unit in chapter.get("units", []):
            if unit.get("id") == unit_id:
                return unit
    fail(f"missing unit {unit_id}")


book = json.loads(BOOK.read_text(encoding="utf-8"))
review_decisions: dict[str, dict] = {}
for filename in EXPECTED_FILES:
    payload = json.loads((WORK / filename).read_text(encoding="utf-8"))
    for unit_id, decision in (payload.get("decisions") or {}).items():
        if unit_id in review_decisions:
            fail(f"duplicate WIP decision {unit_id}")
        review_decisions[unit_id] = decision
aliases: dict[str, set[str]] = {}
changes: list[dict] = []
for inspection_path in sorted(PACK_UNITS.glob("matei-*.json")):
    inspection = json.loads(inspection_path.read_text(encoding="utf-8"))
    if inspection.get("schema") != "emanus-nt-addressable-wave2-unit-inspection-v1":
        fail(f"{inspection_path.name}: bad inspection schema")
    unit_id = str(inspection.get("unitId") or "")
    reviewed = inspection.get("snapshot")
    reviewed_sha = str(inspection.get("snapshotSha256") or "")
    if not isinstance(reviewed, dict) or snapshot_sha(reviewed) != reviewed_sha:
        fail(f"{unit_id}: inspection snapshot payload/SHA drift")
    current_payload = snapshot(find_unit(book, unit_id))
    current_sha = snapshot_sha(current_payload)
    if current_sha == reviewed_sha:
        # The WIP decision may point at the pre-inspection snapshot, while the
        # persisted inspection pack is the authoritative input for the direct
        # review. Accept that exact, hash-verified inspection snapshot only.
        decision = review_decisions.get(unit_id)
        if isinstance(decision, dict) and current_sha != str(
            decision.get("expectedCurrentSnapshotSha256") or ""
        ):
            aliases.setdefault(unit_id, set()).add(current_sha)
            changes.append({
                "unitId": unit_id,
                "reviewed": reviewed_sha,
                "current": current_sha,
                "kind": "exact-inspection-snapshot",
            })
        continue
    # Fail closed: aliases are allowed only for a full diacritics-only match or
    # for a snapshot that exactly equals the frozen approved rewrite. Any
    # other added, removed, reordered, or reworded content remains fatal.
    reviewed_canon = json.dumps(reviewed, ensure_ascii=False, separators=(",", ":"))
    current_canon = json.dumps(current_payload, ensure_ascii=False, separators=(",", ":"))
    if strip_diacritics(reviewed_canon) != strip_diacritics(current_canon):
        # A promotion may already contain the exact approved rewrite. Accept
        # it only when the current snapshot is reconstructed from the frozen
        # WIP decision, never through a broad hash exception.
        decision = review_decisions.get(unit_id)
        approved_payload = None
        if isinstance(decision, dict) and decision.get("action") == "rewrite":
            approved_payload = {
                "heading": current_payload["heading"],
                "teaching": str(decision.get("revisedTeaching") or ""),
                "forYourHeart": str(
                    decision.get("revisedForYourHeart")
                    if "revisedForYourHeart" in decision
                    else current_payload["forYourHeart"]
                ),
            }
        if approved_payload is None or approved_payload != current_payload:
            fail(
                f"{unit_id}: current snapshot differs from reviewed inspection by more than "
                f"diacritics and is not the exact frozen approved rewrite; "
                f"reviewed={reviewed_sha} current={current_sha}"
            )
        aliases.setdefault(unit_id, set()).add(current_sha)
        changes.append({
            "unitId": unit_id,
            "reviewed": reviewed_sha,
            "current": current_sha,
            "kind": "exact-approved-rewrite-already-materialized",
        })
        continue
    aliases.setdefault(unit_id, set()).add(current_sha)
    changes.append({
        "unitId": unit_id,
        "reviewed": reviewed_sha,
        "current": current_sha,
        "kind": "diacritics-only",
    })

source = SOURCE.read_text(encoding="utf-8")
needle = '''    current_sha = snapshot_sha(unit)\n    if current_sha != spec["expectedCurrentSnapshotSha256"]:\n        fail(f"{unit_id}: reviewed current snapshot drifted; {current_sha} != {spec['expectedCurrentSnapshotSha256']}")\n'''
replacement = '''    current_sha = snapshot_sha(unit)\n    contextual_aliases = CONTEXTUAL_PRESEMANTIC_ALIASES.get(unit_id, set())\n    if current_sha != spec["expectedCurrentSnapshotSha256"] and current_sha not in contextual_aliases:\n        fail(f"{unit_id}: reviewed current snapshot drifted; {current_sha} != {spec['expectedCurrentSnapshotSha256']} and is not an approved contextual alias")\n'''
if source.count(needle) != 1:
    fail("materializer snapshot guard changed; refusing to patch it implicitly")

inspection_needle = "    if inspection.get(\"snapshotSha256\") != current_sha:\n        fail(f\"{unit_id}: inspection snapshot differs from current final source-first copy\")\n    if canonical(inspection.get(\"snapshot\")) != canonical(snapshot_payload(unit)):\n        fail(f\"{unit_id}: inspection snapshot payload differs from current unit\")\n"
inspection_replacement = "    if inspection.get(\"snapshotSha256\") != current_sha and current_sha not in contextual_aliases:\n        fail(f\"{unit_id}: inspection snapshot differs from current final source-first copy\")\n    if canonical(inspection.get(\"snapshot\")) != canonical(snapshot_payload(unit)) and current_sha not in contextual_aliases:\n        fail(f\"{unit_id}: inspection snapshot payload differs from current unit\")\n"
if source.count(inspection_needle) != 1:
    fail("materializer inspection snapshot guard changed; refusing to patch it implicitly")

literal = repr(aliases)
insertion_anchor = 'FORBIDDEN_READER_ATTRIBUTION = re.compile(r"\\b(?:Poonen|CFC|SermonIndex)\\b", re.I)\n'
if source.count(insertion_anchor) != 1:
    fail("materializer attribution anchor changed")
source = source.replace(
    insertion_anchor,
    insertion_anchor + f"CONTEXTUAL_PRESEMANTIC_ALIASES = {literal}\n",
    1,
)
source = source.replace(needle, replacement, 1)
source = source.replace(inspection_needle, inspection_replacement, 1)

with tempfile.NamedTemporaryFile("w", suffix=".py", prefix="matei-direct-contextual-", delete=False, encoding="utf-8") as handle:
    handle.write(source)
    temp_path = Path(handle.name)

try:
    result = subprocess.run([sys.executable, str(temp_path)], cwd=ROOT)
finally:
    temp_path.unlink(missing_ok=True)

if result.returncode != 0:
    raise SystemExit(result.returncode)
print(f"Matei direct contextual aliases verified: {len(changes)} approved snapshot transition(s); frozen semantic snapshots preserved.")
for item in changes:
    print(f"MATEI_CONTEXTUAL_ALIAS {item['kind']} {item['unitId']} {item['reviewed']} -> {item['current']}")
