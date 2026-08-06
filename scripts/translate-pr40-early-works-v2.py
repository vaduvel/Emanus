#!/usr/bin/env python3
"""Generate and refine early-work candidates with two independent passes."""
from __future__ import annotations

import importlib.util
import subprocess
import sys
from pathlib import Path

SCRIPT = Path(__file__).with_name("translate-pr40-early-works.py")
spec = importlib.util.spec_from_file_location("pr40_early_translation_big", SCRIPT)
if spec is None or spec.loader is None:
    raise SystemExit(f"Cannot load {SCRIPT}")
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)
module.MODEL_ID = "Helsinki-NLP/opus-mt-tc-big-en-ro"
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
        "early",
        "--batch-size",
        batch_size,
    ],
    check=True,
)
