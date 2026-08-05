#!/usr/bin/env python3
"""Run the 1914 extraction only for the seven source-faithful historical works."""
from __future__ import annotations

import importlib.util
from pathlib import Path

SCRIPT = Path(__file__).with_name("rebuild-pr40-deuterocanon.py")
spec = importlib.util.spec_from_file_location("pr40_deuterocanon", SCRIPT)
if spec is None or spec.loader is None:
    raise SystemExit(f"Cannot load {SCRIPT}")
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)
module.BOOKS["MAN"] = {"name": "Rugăciunea lui Manase", "mode": "new-translation"}
module.BOOKS["PS2"] = {"name": "Psalmul 151", "mode": "new-translation"}
module.main()
