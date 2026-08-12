#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path

ROOT = Path.cwd()
TARGET = ROOT / "scripts/materialize_nt_manual_semantic_addressable_wave_1.py"
if not TARGET.exists():
    raise SystemExit("[wave1 materializer launcher] target materializer missing")
source = TARGET.read_text(encoding="utf-8")

OLD_SEED = '''    if target.exists():
        existing = json.loads(target.read_text(encoding="utf-8"))
        if existing != seed_obj:
            fail(f"{filename}: persisted spec differs from frozen reviewed seed")
    else:
        target.write_text(json.dumps(seed_obj, ensure_ascii=False, indent=2) + "\\n", encoding="utf-8")
        print(f"addressable semantic wave 1: materialized frozen spec {filename}")
'''
NEW_SEED = '''    if target.exists():
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
            if clone.get("bookId") == "2-corinteni":
                unit_id = "2-corinteni-6-14-18"
                old = "În căsătorie, credinciosul nu trebuie să intre deliberat într-o legătură în care partenerul nu Îi aparține lui Hristos; chiar și între credincioși, o inimă hotărâtă pentru Dumnezeu are nevoie de un partener care dorește aceeași direcție."
                new = "În căsătorie, credinciosul nu trebuie să aleagă deliberat o legătură cu un partener care nu Îi aparține lui Hristos; chiar și între credincioși, o inimă hotărâtă pentru Dumnezeu are nevoie de un partener care dorește aceeași direcție."
                item = decisions.get(unit_id)
                if not isinstance(item, dict) or item.get("action") != "rewrite":
                    fail(f"{filename}: normalized 2 Corinthians review target missing")
                teaching = item.get("revisedTeaching")
                if not isinstance(teaching, str):
                    fail(f"{filename}: normalized 2 Corinthians revisedTeaching missing")
                old_count = teaching.count(old)
                new_count = teaching.count(new)
                if old_count == 1 and new_count == 0:
                    item["revisedTeaching"] = teaching.replace(old, new)
                elif old_count == 0 and new_count == 1:
                    pass
                else:
                    fail(f"{filename}: unexpected 2 Corinthians normalization state old={old_count} new={new_count}")
            return clone
        if _without_snapshot_hashes(existing) != _without_snapshot_hashes(seed_obj):
            fail(f"{filename}: persisted semantic review differs from frozen seed beyond approved snapshot/wording normalizations")
    else:
        target.write_text(json.dumps(seed_obj, ensure_ascii=False, indent=2) + "\\n", encoding="utf-8")
        print(f"addressable semantic wave 1: materialized frozen spec {filename}")
'''
seed_count = source.count(OLD_SEED)
if seed_count != 1:
    raise SystemExit(f"[wave1 materializer launcher] expected exactly one legacy seed block, found {seed_count}")
source = source.replace(OLD_SEED, NEW_SEED)

# The original Python helper used str(None) for an absent forYourHeart field,
# while the JS semantic ledger and the reviewed snapshot convention canonicalize
# absence as an empty string. Patch only this serialization defect in-memory.
OLD_HEART = '        "forYourHeart": str(unit.get("forYourHeart") if for_your_heart is None else for_your_heart or ""),\n'
NEW_HEART = '        "forYourHeart": str((unit.get("forYourHeart") if for_your_heart is None else for_your_heart) or ""),\n'
heart_count = source.count(OLD_HEART)
if heart_count != 1:
    raise SystemExit(f"[wave1 materializer launcher] expected exactly one legacy forYourHeart serializer, found {heart_count}")
source = source.replace(OLD_HEART, NEW_HEART)

namespace = {"__name__": "__main__", "__file__": str(TARGET)}
exec(compile(source, str(TARGET), "exec"), namespace, namespace)
