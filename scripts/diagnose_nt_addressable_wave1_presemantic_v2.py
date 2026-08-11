#!/usr/bin/env python3
from __future__ import annotations

import ast
import base64
import copy
import gzip
import hashlib
import json
from pathlib import Path

ROOT = Path.cwd()
DATA = ROOT / "docs/data/biblia-explicata"
FINAL = DATA / "nt-final-source-first"
SPECS = DATA / "nt-semantic-review-spec"
OUT = DATA / "nt-addressable-wave1-presemantic-diagnostic.json"
MATERIALIZER = ROOT / "scripts/materialize_nt_manual_semantic_addressable_wave_1.py"
TWO_COR_UNIT = "2-corinteni-6-14-18"
TWO_COR_OLD = "În căsătorie, credinciosul nu trebuie să intre deliberat într-o legătură în care partenerul nu Îi aparține lui Hristos; chiar și între credincioși, o inimă hotărâtă pentru Dumnezeu are nevoie de un partener care dorește aceeași direcție."
TWO_COR_NEW = "În căsătorie, credinciosul nu trebuie să aleagă deliberat o legătură cu un partener care nu Îi aparține lui Hristos; chiar și între credincioși, o inimă hotărâtă pentru Dumnezeu are nevoie de un partener care dorește aceeași direcție."


def fail(message: str) -> None:
    raise SystemExit(f"[wave1 diagnostic v2] {message}")


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


def literal_assignment(name: str):
    tree = ast.parse(MATERIALIZER.read_text(encoding="utf-8"))
    for node in tree.body:
        if isinstance(node, ast.Assign):
            for target in node.targets:
                if isinstance(target, ast.Name) and target.id == name:
                    return ast.literal_eval(node.value)
    fail(f"could not read {name} from wave 1 materializer")


def without_snapshot_hashes(doc: dict) -> dict:
    clone = copy.deepcopy(doc)
    decisions = clone.get("decisions")
    if not isinstance(decisions, dict):
        fail("review spec lacks decisions object")
    for item in decisions.values():
        if not isinstance(item, dict):
            fail("review decision is not an object")
        item.pop("expectedCurrentSnapshotSha256", None)

    # One post-review Romanian wording change is allowed only as this exact,
    # semantics-preserving sentence replacement. Normalize both the frozen seed
    # and persisted spec to the same canonical reviewed wording before comparing.
    if clone.get("bookId") == "2-corinteni":
        item = decisions.get(TWO_COR_UNIT)
        if not isinstance(item, dict) or item.get("action") != "rewrite":
            fail("2 Corinthians normalized target decision missing")
        teaching = item.get("revisedTeaching")
        if not isinstance(teaching, str):
            fail("2 Corinthians normalized target revisedTeaching missing")
        old_count = teaching.count(TWO_COR_OLD)
        new_count = teaching.count(TWO_COR_NEW)
        if old_count == 1 and new_count == 0:
            item["revisedTeaching"] = teaching.replace(TWO_COR_OLD, TWO_COR_NEW)
        elif old_count == 0 and new_count == 1:
            pass
        else:
            fail(f"unexpected 2 Corinthians Romanian normalization state old={old_count} new={new_count}")
    return clone


seeds = literal_assignment("SEEDS")
books_cfg = literal_assignment("BOOKS")
SPECS.mkdir(parents=True, exist_ok=True)

# 1/2 Corinthians are seeded in the materializer. Their reviewed actions,
# rationales and rewrites are immutable except for the single explicit Romanian
# sentence normalization above. Snapshot hashes are excluded here because four
# exact Bible-quote normalizations were reconciled separately and are proven
# against the current corpus below.
for filename, encoded in seeds.items():
    target = SPECS / filename
    seed_obj = json.loads(gzip.decompress(base64.b64decode(encoded)).decode("utf-8"))
    if target.exists():
        existing = json.loads(target.read_text(encoding="utf-8"))
        if without_snapshot_hashes(existing) != without_snapshot_hashes(seed_obj):
            fail(f"{filename}: reviewed semantic content differs from frozen seed beyond approved snapshot/wording normalizations")
    else:
        target.write_text(json.dumps(seed_obj, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

findings = []
for book_id, cfg in books_cfg.items():
    book_path = FINAL / cfg["file"]
    spec_path = SPECS / cfg["file"]
    if not book_path.exists() or not spec_path.exists():
        fail(f"{book_id}: current book or frozen spec missing")
    book = json.loads(book_path.read_text(encoding="utf-8"))
    spec_doc = json.loads(spec_path.read_text(encoding="utf-8"))
    if book.get("id") != book_id or spec_doc.get("bookId") != book_id:
        fail(f"{book_id}: book/spec identity drift")
    spec = spec_doc.get("decisions")
    if not isinstance(spec, dict):
        fail(f"{book_id}: decisions missing")
    if len(spec) != cfg["units"]:
        fail(f"{book_id}: expected {cfg['units']} frozen decisions, found {len(spec)}")
    if sum(1 for item in spec.values() if item.get("action") == "rewrite") != cfg["rewrites"]:
        fail(f"{book_id}: rewrite count drifted")
    units = {u["id"]: u for c in book.get("chapters", []) for u in c.get("units", [])}
    if set(units) != set(spec):
        fail(f"{book_id}: current units differ from frozen review set")
    for unit_id, item in spec.items():
        expected = item.get("expectedCurrentSnapshotSha256")
        if not isinstance(expected, str) or not expected.startswith("sha256:"):
            fail(f"{unit_id}: frozen snapshot hash missing")
        current = sha(snapshot(units[unit_id]))
        if current != expected:
            findings.append(
                {
                    "bookId": book_id,
                    "chapter": item.get("chapter"),
                    "unitId": unit_id,
                    "ref": units[unit_id].get("ref"),
                    "action": item.get("action"),
                    "reviewedSnapshotSha256": expected,
                    "presemanticSnapshotSha256": current,
                    "presemantic": {
                        "heading": units[unit_id].get("heading", ""),
                        "teaching": units[unit_id].get("teaching", ""),
                        "forYourHeart": units[unit_id].get("forYourHeart", ""),
                    },
                }
            )

report = {
    "schema": "emanus-nt-addressable-wave1-presemantic-diagnostic-v2",
    "policy": "Frozen semantic content is checked against reviewed seeds independently of exact reconciled snapshot hashes; one exact Romanian wording normalization is explicitly whitelisted; every current snapshot must match its stored hash before approval.",
    "reviewedUnits": sum(cfg["units"] for cfg in books_cfg.values()),
    "driftCount": len(findings),
    "findings": findings,
}
OUT.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"Addressable wave 1 presemantic diagnostic v2: {len(findings)} snapshot drifts / {report['reviewedUnits']} reviewed units.")
raise SystemExit(42 if findings else 0)
