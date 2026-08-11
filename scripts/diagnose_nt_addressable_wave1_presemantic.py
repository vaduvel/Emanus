#!/usr/bin/env python3
from __future__ import annotations

import ast
import base64
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


def sha(value: str) -> str:
    return "sha256:" + hashlib.sha256(value.encode("utf-8")).hexdigest()


def snapshot(unit: dict) -> str:
    return json.dumps({
        "heading": str(unit.get("heading") or ""),
        "teaching": str(unit.get("teaching") or ""),
        "forYourHeart": str(unit.get("forYourHeart") or ""),
    }, ensure_ascii=False, separators=(",", ":"))


def literal_assignment(name: str):
    tree = ast.parse(MATERIALIZER.read_text(encoding="utf-8"))
    for node in tree.body:
        if isinstance(node, ast.Assign):
            for target in node.targets:
                if isinstance(target, ast.Name) and target.id == name:
                    return ast.literal_eval(node.value)
    raise SystemExit(f"[wave1 diagnostic] could not read {name} from materializer")


seeds = literal_assignment("SEEDS")
books_cfg = literal_assignment("BOOKS")
SPECS.mkdir(parents=True, exist_ok=True)
for filename, encoded in seeds.items():
    target = SPECS / filename
    seed_obj = json.loads(gzip.decompress(base64.b64decode(encoded)).decode("utf-8"))
    if target.exists():
        existing = json.loads(target.read_text(encoding="utf-8"))
        if existing != seed_obj:
            raise SystemExit(f"[wave1 diagnostic] {filename}: persisted spec differs from frozen reviewed seed")
    else:
        target.write_text(json.dumps(seed_obj, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

findings = []
for book_id, cfg in books_cfg.items():
    book = json.loads((FINAL / cfg["file"]).read_text(encoding="utf-8"))
    spec = json.loads((SPECS / cfg["file"]).read_text(encoding="utf-8"))["decisions"]
    units = {u["id"]: u for c in book.get("chapters", []) for u in c.get("units", [])}
    if set(units) != set(spec):
        raise SystemExit(f"[wave1 diagnostic] {book_id}: unit set differs from frozen spec")
    for unit_id, item in spec.items():
        unit = units[unit_id]
        current = sha(snapshot(unit))
        expected = item["expectedCurrentSnapshotSha256"]
        if current != expected:
            findings.append({
                "bookId": book_id,
                "chapter": item["chapter"],
                "unitId": unit_id,
                "ref": unit.get("ref"),
                "action": item["action"],
                "reviewedSnapshotSha256": expected,
                "presemanticSnapshotSha256": current,
                "presemantic": {
                    "heading": unit.get("heading", ""),
                    "teaching": unit.get("teaching", ""),
                    "forYourHeart": unit.get("forYourHeart", ""),
                },
            })

report = {
    "schema": "emanus-nt-addressable-wave1-presemantic-diagnostic-v1",
    "policy": "Diagnostic only. No semantic approval is created from this file. A drift must be manually reconciled before expectedCurrentSnapshotSha256 is rebound.",
    "reviewedUnits": sum(cfg["units"] for cfg in books_cfg.values()),
    "driftCount": len(findings),
    "findings": findings,
}
OUT.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"Addressable wave 1 presemantic diagnostic: {len(findings)} snapshot drifts / {report['reviewedUnits']} reviewed units.")
raise SystemExit(42 if findings else 0)
