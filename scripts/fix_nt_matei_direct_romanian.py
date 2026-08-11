#!/usr/bin/env python3
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path.cwd()
WORK = ROOT / "docs/data/biblia-explicata/nt-semantic-review-work"

TARGETS = {
    "matei-1-1-17": ("intre", "între"),
    "matei-6-9-13": ("intre", "între"),
    "matei-8-5-13": ("intre", "între"),
    "matei-9-18-26": ("afara", "afară"),
    "matei-11-1-15": ("intre", "între"),
    "matei-13-1-23": ("intre", "între"),
    "matei-14-22-33": ("intre", "între"),
    "matei-23-13-22": ("intre", "între"),
    "matei-24-1-14": ("afara", "afară"),
}

seen: set[str] = set()
changed = 0
files_changed = 0
for path in sorted(WORK.glob("01-matei-wave2-wip*.json")):
    payload = json.loads(path.read_text(encoding="utf-8"))
    decisions = payload.get("decisions")
    if not isinstance(decisions, dict):
        continue
    dirty = False
    for unit_id, (before, after) in TARGETS.items():
        if unit_id not in decisions:
            continue
        if unit_id in seen:
            raise SystemExit(f"[Matei reviewed Romanian fix] duplicate target {unit_id}")
        seen.add(unit_id)
        decision = decisions[unit_id]
        if decision.get("action") != "rewrite":
            raise SystemExit(f"[Matei reviewed Romanian fix] {unit_id} is not a rewrite decision")
        text = decision.get("revisedTeaching")
        if not isinstance(text, str):
            raise SystemExit(f"[Matei reviewed Romanian fix] {unit_id} revisedTeaching missing")
        matches = len(re.findall(rf"(?<!\w){re.escape(before)}(?!\w)", text, flags=re.UNICODE))
        if matches == 1:
            decision["revisedTeaching"] = re.sub(
                rf"(?<!\w){re.escape(before)}(?!\w)", after, text, count=1, flags=re.UNICODE
            )
            changed += 1
            dirty = True
        elif matches == 0 and re.search(rf"(?<!\w){re.escape(after)}(?!\w)", text, flags=re.UNICODE):
            # Idempotent reruns are allowed only when the reviewed correction is already present.
            pass
        else:
            raise SystemExit(
                f"[Matei reviewed Romanian fix] {unit_id}: expected exactly one '{before}' or an already-correct '{after}', found {matches} old occurrences"
            )
    if dirty:
        path.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        files_changed += 1

missing = sorted(set(TARGETS) - seen)
if missing:
    raise SystemExit(f"[Matei reviewed Romanian fix] missing target decisions: {missing}")
if changed not in (0, len(TARGETS)):
    raise SystemExit(
        f"[Matei reviewed Romanian fix] partial normalization is not allowed: {changed}/{len(TARGETS)} replacements"
    )

print(
    f"Matei reviewed Romanian normalization: {len(TARGETS)} reviewed targets verified; "
    f"{changed} replacements across {files_changed} WIP files."
)
