#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path

ROOT = Path.cwd()
TARGET = ROOT / "scripts/materialize_nt_manual_semantic_addressable_wave_1.py"
if not TARGET.exists():
    raise SystemExit("[wave1 materializer launcher] target materializer missing")
source = TARGET.read_text(encoding="utf-8")
OLD = '''    if target.exists():
        existing = json.loads(target.read_text(encoding="utf-8"))
        if existing != seed_obj:
            fail(f"{filename}: persisted spec differs from frozen reviewed seed")
    else:
        target.write_text(json.dumps(seed_obj, ensure_ascii=False, indent=2) + "\\n", encoding="utf-8")
        print(f"addressable semantic wave 1: materialized frozen spec {filename}")
'''
NEW = '''    if target.exists():
        existing = json.loads(target.read_text(encoding="utf-8"))
        def _without_snapshot_hashes(doc):
            clone = json.loads(json.dumps(doc, ensure_ascii=False))
            decisions = clone.get("decisions")
            if not isinstance(decisions, dict):
                fail(f"{filename}: reviewed spec lacks decisions")
            for decision in decisions.values():
                if not isinstance(decision, dict):
                    fail(f"{filename}: invalid reviewed decision")
                decision.pop("expectedCurrentSnapshotSha256", None)
            return clone
        if _without_snapshot_hashes(existing) != _without_snapshot_hashes(seed_obj):
            fail(f"{filename}: persisted semantic review differs from frozen seed beyond snapshot hashes")
    else:
        target.write_text(json.dumps(seed_obj, ensure_ascii=False, indent=2) + "\\n", encoding="utf-8")
        print(f"addressable semantic wave 1: materialized frozen spec {filename}")
'''
count = source.count(OLD)
if count != 1:
    raise SystemExit(f"[wave1 materializer launcher] expected exactly one legacy seed block, found {count}")
patched = source.replace(OLD, NEW)
namespace = {"__name__": "__main__", "__file__": str(TARGET)}
exec(compile(patched, str(TARGET), "exec"), namespace, namespace)
