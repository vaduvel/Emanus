#!/usr/bin/env python3
"""Generate all twelve deuterocanonical candidates with OPUS-MT tc-big."""
from __future__ import annotations

import importlib.util
from pathlib import Path

SCRIPT = Path(__file__).with_name("translate-pr40-deuterocanon-missing.py")
spec = importlib.util.spec_from_file_location("pr40_deuterocanon_big", SCRIPT)
if spec is None or spec.loader is None:
    raise SystemExit(f"Cannot load {SCRIPT}")
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)
module.MODEL_ID = "Helsinki-NLP/opus-mt-tc-big-en-ro"
module.TARGETS.clear()
module.TARGETS.update(
    {
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
)
module.main()
