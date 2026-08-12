#!/usr/bin/env python3
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path.cwd()
SPEC = ROOT / "docs/data/biblia-explicata/nt-semantic-review-spec/08-2-corinteni.json"
UNIT_ID = "2-corinteni-6-14-18"
OLD = "În căsătorie, credinciosul nu trebuie să intre deliberat într-o legătură în care partenerul nu Îi aparține lui Hristos; chiar și între credincioși, o inimă hotărâtă pentru Dumnezeu are nevoie de un partener care dorește aceeași direcție."
NEW = "În căsătorie, credinciosul nu trebuie să aleagă deliberat o legătură cu un partener care nu Îi aparține lui Hristos; chiar și între credincioși, o inimă hotărâtă pentru Dumnezeu are nevoie de un partener care dorește aceeași direcție."


def fail(message: str) -> None:
    raise SystemExit(f"[2 Corinthians wave1 Romanian fix] {message}")


if not SPEC.exists():
    fail("review spec missing")
doc = json.loads(SPEC.read_text(encoding="utf-8"))
if doc.get("schema") != "emanus-manual-review-spec-v2" or doc.get("bookId") != "2-corinteni":
    fail("unexpected review spec")
item = (doc.get("decisions") or {}).get(UNIT_ID)
if not isinstance(item, dict) or item.get("action") != "rewrite":
    fail("target reviewed rewrite missing")
teaching = item.get("revisedTeaching")
if not isinstance(teaching, str):
    fail("target revisedTeaching missing")
old_count = teaching.count(OLD)
new_count = teaching.count(NEW)
if old_count == 1 and new_count == 0:
    item["revisedTeaching"] = teaching.replace(OLD, NEW)
    SPEC.write_text(json.dumps(doc, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("2 Corinthians wave1 Romanian fix: normalized one reviewed sentence; source meaning and presemantic snapshot unchanged.")
elif old_count == 0 and new_count == 1:
    print("2 Corinthians wave1 Romanian fix: reviewed sentence already normalized.")
else:
    fail(f"unexpected target sentence state old={old_count} new={new_count}")
