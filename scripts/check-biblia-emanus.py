#!/usr/bin/env python3
"""Permanent Biblia Emanus corpus gate.

PR #40 previously contained only constants in this file, so Python exited with
status 0 without validating any chapter. The real adversarial audit now owns the
publication decision.
"""
from __future__ import annotations

import runpy
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
AUDITOR = ROOT / "scripts" / "audit-ot-apocrypha-pr40.py"

if not AUDITOR.exists():
    raise SystemExit(f"Auditor lipsă: {AUDITOR}")

sys.argv = [str(AUDITOR), "--report-dir", "audit-output"]
runpy.run_path(str(AUDITOR), run_name="__main__")
