#!/usr/bin/env python3
"""Run the generic fresh-reviewed OT promoter for Rut."""
from __future__ import annotations

import importlib.util
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TARGET = ROOT / "scripts/promote-reviewed-ot-book.py"

spec = importlib.util.spec_from_file_location("emanus_reviewed_ot_promoter", TARGET)
if spec is None or spec.loader is None:
    raise SystemExit("Cannot load promote-reviewed-ot-book.py")
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)
module.BOOKS["RUT"] = {"name": "Rut", "order": 8, "chapters": 4, "verses": 85}
sys.argv = [sys.argv[0], "--book", "RUT", *sys.argv[1:]]
module.main()
