#!/usr/bin/env python3
"""Compatibility entrypoint for the exact early-work extractor.

The publication workflow historically invokes v3. Keep that stable entrypoint
while delegating all extraction to v4, which parses Jubilees directly from the
CCEL ordered-list units and preserves original page hashes.
"""
from __future__ import annotations

import runpy
from pathlib import Path

runpy.run_path(
    str(Path(__file__).with_name("extract-pr40-early-works-v4.py")),
    run_name="__main__",
)
