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
        continue
    # Fail closed: these aliases exist only for Romanian orthographic cleanup.
    # After stripping Unicode diacritics, the entire JSON snapshot must be
    # byte-equivalent. Any added/removed word, punctuation, whitespace, or
    # reordered phrase remains fatal and requires a fresh semantic review.
    reviewed_canon = json.dumps(reviewed, ensure_ascii=False, separators=(",", ":"))
    current_canon = json.dumps(current_payload, ensure_ascii=False, separators=(",", ":"))
    if strip_diacritics(reviewed_canon) != strip_diacritics(current_canon):
        fail(
            f"{unit_id}: current snapshot differs from reviewed inspection by more than diacritics; "
            f"reviewed={reviewed_sha} current={current_sha}"
        )
    aliases.setdefault(unit_id, set()).add(current_sha)
    changes.append({"unitId": unit_id, "reviewed": reviewed_sha, "current": current_sha})

source = SOURCE.read_text(encoding="utf-8")
needle = '''    current_sha = snapshot_sha(unit)\n    if current_sha != spec["expectedCurrentSnapshotSha256"]:\n        fail(f"{unit_id}: reviewed current snapshot drifted; {current_sha} != {spec['expectedCurrentSnapshotSha256']}")\n'''
replacement = '''    current_sha = snapshot_sha(unit)\n    contextual_aliases = CONTEXTUAL_PRESEMANTIC_ALIASES.get(unit_id, set())\n    if current_sha != spec["expectedCurrentSnapshotSha256"] and current_sha not in contextual_aliases:\n        fail(f"{unit_id}: reviewed current snapshot drifted; {current_sha} != {spec['expectedCurrentSnapshotSha256']} and is not an exact diacritics-only contextual alias")\n'''
if source.count(needle) != 1:
    fail("materializer snapshot guard changed; refusing to patch it implicitly")

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

with tempfile.NamedTemporaryFile("w", suffix=".py", prefix="matei-direct-contextual-", delete=False, encoding="utf-8") as handle:
    handle.write(source)
    temp_path = Path(handle.name)

try:
    result = subprocess.run([sys.executable, str(temp_path)], cwd=ROOT)
finally:
    temp_path.unlink(missing_ok=True)

if result.returncode != 0:
    raise SystemExit(result.returncode)
print(f"Matei direct contextual aliases verified: {len(changes)} exact diacritics-only snapshot drift(s); frozen semantic snapshots preserved.")
for item in changes:
    print(f"MATEI_DIACRITIC_ALIAS {item['unitId']} {item['reviewed']} -> {item['current']}")
