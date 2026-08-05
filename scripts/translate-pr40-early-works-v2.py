#!/usr/bin/env python3
"""Generate early-work candidates with OPUS-MT tc-big English→Romanian."""
from __future__ import annotations

import importlib.util
from pathlib import Path

SCRIPT = Path(__file__).with_name("translate-pr40-early-works.py")
spec = importlib.util.spec_from_file_location("pr40_early_translation_big", SCRIPT)
if spec is None or spec.loader is None:
    raise SystemExit(f"Cannot load {SCRIPT}")
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)
module.MODEL_ID = "Helsinki-NLP/opus-mt-tc-big-en-ro"
module.main()
