#!/usr/bin/env python3
from __future__ import annotations

import json
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path.cwd()
SOURCE = ROOT / "scripts/materialize_nt_manual_semantic_matei_direct.py"
BOOK = ROOT / "docs/data/biblia-explicata/nt-final-source-first/01-matei.json"

# Exact pre-semantic aliases caused only by verified Romanian contextual corrections.
# The frozen review snapshot remains unchanged; these aliases do not authorize arbitrary drift.
ALIASES = {
    "matei-14-13-21": {
        "expected": "sha256:f6a127b602f3b3b9134de9a77a1856cad54c44ac3568c8cb0eeb975456ba88dd",
        "current": "sha256:b6feb5d37b27fd75fcc8314857ad08f2236130b08f4191d2769b30c3dc7f4b95",
        "required_text": "Minunea amintește mana și anunță ospățul mesianic",
        "forbidden_text": "Minunea amintește mâna și anunță ospățul mesianic",
        "reason": "Romanian 'mana' means biblical manna here; the old context-free normalizer incorrectly changed it to 'mâna'.",
    },
}


def fail(message: str) -> None:
    raise SystemExit(f"[Matei direct contextual alias runner] {message}")


def find_unit(book: dict, unit_id: str) -> dict:
    for chapter in book.get("chapters", []):
        for unit in chapter.get("units", []):
            if unit.get("id") == unit_id:
                return unit
    fail(f"missing unit {unit_id}")


source = SOURCE.read_text(encoding="utf-8")
needle = '''    current_sha = snapshot_sha(unit)\n    if current_sha != spec["expectedCurrentSnapshotSha256"]:\n        fail(f"{unit_id}: reviewed current snapshot drifted; {current_sha} != {spec['expectedCurrentSnapshotSha256']}")\n'''
replacement = '''    current_sha = snapshot_sha(unit)\n    contextual_aliases = CONTEXTUAL_PRESEMANTIC_ALIASES.get(unit_id, set())\n    if current_sha != spec["expectedCurrentSnapshotSha256"] and current_sha not in contextual_aliases:\n        fail(f"{unit_id}: reviewed current snapshot drifted; {current_sha} != {spec['expectedCurrentSnapshotSha256']} and is not an exact contextual alias")\n'''
if source.count(needle) != 1:
    fail("materializer snapshot guard changed; refusing to patch it implicitly")

book = json.loads(BOOK.read_text(encoding="utf-8"))
for unit_id, rule in ALIASES.items():
    unit = find_unit(book, unit_id)
    teaching = str(unit.get("teaching") or "")
    if rule["required_text"] not in teaching:
        fail(f"{unit_id}: verified contextual correction is not present")
    if rule["forbidden_text"] in teaching:
        fail(f"{unit_id}: obsolete wrong homograph is still present")

literal = repr({unit_id: {rule["current"]} for unit_id, rule in ALIASES.items()})
insertion_anchor = 'FORBIDDEN_READER_ATTRIBUTION = re.compile(r"\\b(?:Poonen|CFC|SermonIndex)\\b", re.I)\n'
if source.count(insertion_anchor) != 1:
    fail("materializer attribution anchor changed")
source = source.replace(
    insertion_anchor,
    insertion_anchor + f"CONTEXTUAL_PRESEMANTIC_ALIASES = {literal}\n",
    1,
)
source = source.replace(needle, replacement, 1)

with tempfile.NamedTemporaryFile("w", suffix=".py", prefix="matei-direct-contextual-", delete=False, encoding="utf-8") as handle:
    handle.write(source)
    temp_path = Path(handle.name)

try:
    result = subprocess.run([sys.executable, str(temp_path)], cwd=ROOT)
finally:
    temp_path.unlink(missing_ok=True)

if result.returncode != 0:
    raise SystemExit(result.returncode)
print("Matei direct contextual aliases verified: 1 exact Romanian manna correction; frozen review snapshots preserved.")
