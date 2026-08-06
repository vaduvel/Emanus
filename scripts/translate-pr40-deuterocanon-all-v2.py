#!/usr/bin/env python3
"""Generate and refine selected deuterocanonical Romanian candidates.

The first pass uses OPUS-MT tc-big. A second independent OPUS-MT candidate,
a pinned public-domain historical candidate where available, and the same
multilingual semantic model used by the publication audit are then used for
best-candidate selection. Set ``PR40_BOOKS`` for parallel CI shards.
"""
from __future__ import annotations

import importlib.util
import os
import subprocess
import sys
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

batch_size = "20"
for index, argument in enumerate(sys.argv):
    if argument == "--batch-size" and index + 1 < len(sys.argv):
        batch_size = sys.argv[index + 1]
subprocess.run(
    [
        sys.executable,
        str(Path(__file__).with_name("refine-pr40-translation-candidates.py")),
        "--collection",
        "deuterocanon",
        "--batch-size",
        batch_size,
    ],
    check=True,
)
