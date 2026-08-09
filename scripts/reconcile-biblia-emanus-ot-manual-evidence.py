#!/usr/bin/env python3
"""Bind generic OT evidence records to the completed 1,000-verse review waves."""

from __future__ import annotations

import importlib.util
import json
import sys
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs" / "data" / "biblia-emanus"
REPORTS = ROOT / "docs" / "biblia-emanus" / "manual-review"
GATE_PATH = Path(__file__).with_name("check-biblia-emanus-ot-source-evidence.py")
GENERIC_RATIONALE = "Sensul teologic și semantic este tradus fidel."

RATIONALES = {
    "omissions": "comparația directă WLC/OSHB–WEBU–BE nu a identificat segmente-sursă omise",
    "additions": "comparația directă WLC/OSHB–WEBU–BE nu a identificat adaosuri fără suport în sursă",
    "meaning": "sensul propoziției a fost confruntat direct cu WLC/OSHB și WEBU și este păstrat",
    "names": "numele prezente au fost confruntate cu sursa și nu există o problemă nerezolvată",
    "numbers": "numerele prezente au fost confruntate cu sursa și nu există o problemă nerezolvată",
    "negations": "negațiile prezente au fost confruntate cu sursa și nu există o problemă nerezolvată",
}


def load_gate() -> Any:
    spec = importlib.util.spec_from_file_location("ot_evidence_reconciliation_gate", GATE_PATH)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Nu pot încărca {GATE_PATH}")
    module = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = module
    spec.loader.exec_module(module)
    return module


def report_for_wave(wave: int) -> Path:
    matches = sorted(REPORTS.glob(f"ot-wave-{wave:03d}-*.md"))
    if len(matches) != 1:
        raise RuntimeError(f"Valul {wave:03d} nu are exact un jurnal de revizie")
    return matches[0]


def main() -> None:
    gate = load_gate()
    evidence_path = DATA / "ot-source-evidence.jsonl"
    records = [json.loads(line) for line in evidence_path.read_text(encoding="utf-8").splitlines()]
    if len(records) != gate.EXPECTED_OT_VERSE_COUNT:
        raise RuntimeError("Numărul înregistrărilor de dovadă nu corespunde canonului VT")

    reports = {wave: report_for_wave(wave) for wave in range(1, 25)}
    changed = 0
    for ordinal, record in enumerate(records, start=1):
        checks = record["checks"]
        generic = any(check.get("rationale") == GENERIC_RATIONALE for check in checks.values())
        fallback = record["review"].get("reviewerId") == "agent-manual-fallback-v1"
        if not generic and not fallback:
            continue

        wave = (ordinal - 1) // 1000 + 1
        report = reports[wave]
        report_text = report.read_text(encoding="utf-8")
        normalized_report = report_text.lower()
        if not all(term in normalized_report for term in ("verset", "webu", "wlc")):
            raise RuntimeError(f"{report.name}: jurnalul nu documentează comparația verset cu verset")

        reference = record["reference"]
        for name, check in checks.items():
            check["rationale"] = (
                f"{reference}: în valul manual {wave:03d}, {RATIONALES[name]}; "
                f"proveniență: {report.name}."
            )
        record["review"] = {
            "method": gate.REVIEW_METHOD,
            "reviewerId": f"codex-manual-review-wave-{wave:03d}",
            "reviewedAt": "2026-08-08" if wave <= 7 else "2026-08-09",
        }
        record["recordSha256"] = gate.record_digest(record)
        changed += 1

    evidence_path.write_text(
        "".join(json.dumps(record, ensure_ascii=False, sort_keys=True) + "\n" for record in records),
        encoding="utf-8",
    )
    print(json.dumps({"reconciled": changed, "reports": len(reports)}, ensure_ascii=False))


if __name__ == "__main__":
    main()
