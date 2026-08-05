#!/usr/bin/env python3
"""Generate selected deuterocanonical candidates with OPUS-MT tc-big.

Set ``PR40_BOOKS`` to a comma-separated list for parallel CI shards. Without
it, all twelve works are processed.
"""
from __future__ import annotations

import importlib.util
import os
from pathlib import Path

SCRIPT = Path(__file__).with_name("translate-pr40-deuterocanon-missing.py")
spec = importlib.util.spec_from_file_location("pr40_deuterocanon_big", SCRIPT)
if spec is None or spec.loader is None:
    raise SystemExit(f"Cannot load {SCRIPT}")
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)
module.MODEL_ID = "Helsinki-NLP/opus-mt-tc-big-en-ro"
all_targets = {
    "1ES": "3 Ezdra",
    "1MA": "1 Macabei",
    "2MA": "2 Macabei",
    "3MA": "3 Macabei",
    "BAR": "Baruh",
    "ESG": "Adăugirile grecești la Estera",
    "JDT": "Iudita",
    "MAN": "Rugăciunea lui Manase",
    "PS2": "Psalmul 151",
    "SIR": "Înțelepciunea lui Isus, fiul lui Sirah",
    "TOB": "Tobit",
    "WIS": "Înțelepciunea lui Solomon",
}
selected_raw = os.environ.get("PR40_BOOKS", "").strip()
selected = {item.strip() for item in selected_raw.split(",") if item.strip()} if selected_raw else set(all_targets)
unknown = sorted(selected - set(all_targets))
if unknown:
    raise SystemExit(f"Unknown PR40_BOOKS values: {unknown}")
module.TARGETS.clear()
module.TARGETS.update({book_id: all_targets[book_id] for book_id in all_targets if book_id in selected})
if not module.TARGETS:
    raise SystemExit("No deuterocanonical books selected")
module.main()
