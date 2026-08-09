#!/usr/bin/env python3
"""Correct compact-review findings that falsely asserted an absent feature."""
from __future__ import annotations

import argparse
import importlib.util
import json
import sys
from pathlib import Path

GATE_PATH = Path(__file__).with_name("check-biblia-emanus-ot-source-evidence.py")
spec = importlib.util.spec_from_file_location("ot_evidence_gate", GATE_PATH)
assert spec and spec.loader
gate = importlib.util.module_from_spec(spec)
sys.modules[spec.name] = gate
spec.loader.exec_module(gate)


def normalize(record: dict[str, object]) -> bool:
    review = record.get("review")
    if not isinstance(review, dict) or "compact-semantic-v1" not in str(review.get("reviewerId", "")):
        return False
    checks = record.get("checks")
    if not isinstance(checks, dict):
        raise ValueError(f"{record.get('reference')}: checks invalid")
    changed = False
    for name in ("names", "numbers", "negations"):
        check = checks.get(name)
        if not isinstance(check, dict):
            raise ValueError(f"{record.get('reference')}: control {name} invalid")
        if check.get("verdict") == "approved" and check.get("finding") == "not_present":
            check["finding"] = "preserved"
            changed = True
    if changed:
        review["reviewerId"] = str(review["reviewerId"]).replace(
            "compact-semantic-v1", "compact-semantic-v2"
        )
        record["recordSha256"] = gate.record_digest(record)
    return changed


def main() -> int:
    parser = argparse.ArgumentParser(description="Normalizează dovezile compacte VT fără a inventa absențe.")
    parser.add_argument("path", nargs="+", type=Path)
    args = parser.parse_args()
    try:
        changed = 0
        for path in args.path:
            records = [json.loads(line) for line in path.read_text(encoding="utf-8").splitlines() if line.strip()]
            path_changed = sum(normalize(record) for record in records)
            if path_changed:
                path.write_text(
                    "".join(json.dumps(record, ensure_ascii=False, sort_keys=True) + "\n" for record in records),
                    encoding="utf-8",
                )
            changed += path_changed
    except (OSError, ValueError, json.JSONDecodeError) as error:
        print(f"[normalize-ot-compact-evidence] EROARE: {error}", file=sys.stderr)
        return 1
    print(f"[normalize-ot-compact-evidence] OK: {changed} recorduri corectate")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
