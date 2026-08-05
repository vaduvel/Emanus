#!/usr/bin/env python3
"""Translate all five deuterocanonical works without a faithful Romanian base."""
from __future__ import annotations

import importlib.util
from pathlib import Path

SCRIPT = Path(__file__).with_name("translate-pr40-deuterocanon-missing.py")
spec = importlib.util.spec_from_file_location("pr40_deuterocanon_translation", SCRIPT)
if spec is None or spec.loader is None:
    raise SystemExit(f"Cannot load {SCRIPT}")
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)
module.TARGETS.update(
    {
        "MAN": "Rugăciunea lui Manase",
        "PS2": "Psalmul 151",
    }
)
module.main()
