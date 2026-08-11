#!/usr/bin/env python3
from pathlib import Path

path = Path("scripts/materialize_nt_manual_semantic_matei_direct.py")
source = path.read_text(encoding="utf-8")
old = "EXPECTED_REWRITES = 90\nEXPECTED_KEEPS = 35"
new = "EXPECTED_REWRITES = 89\nEXPECTED_KEEPS = 36"

if new in source and old not in source:
    print("Matei direct review totals already corrected: 89 rewrite / 36 keep.")
elif source.count(old) == 1:
    source = source.replace(old, new)
    path.write_text(source, encoding="utf-8")
    print("Matei direct review totals corrected: 89 rewrite / 36 keep; decisions unchanged.")
else:
    raise SystemExit("[Matei direct count fix] expected exactly one frozen 90/35 invariant or an already-corrected 89/36 invariant")
