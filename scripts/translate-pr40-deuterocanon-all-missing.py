#!/usr/bin/env python3
"""Create one consistent modern Romanian draft for all 12 PR40 works.

The 1914 extraction remains an independent public-domain Romanian witness for
seven works; it is not used as final Emanus wording.
"""
from __future__ import annotations

import importlib.util
from pathlib import Path

SCRIPT = Path(__file__).with_name("translate-pr40-deuterocanon-missing.py")
spec = importlib.util.spec_from_file_location("pr40_deuterocanon_translation", SCRIPT)
if spec is None or spec.loader is None:
    raise SystemExit(f"Cannot load {SCRIPT}")
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)
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
