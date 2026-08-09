#!/usr/bin/env python3
"""Pack the local OT JSONL evidence into a deterministic Git artifact."""
from __future__ import annotations

import argparse
import gzip
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs" / "data" / "biblia-emanus"
DEFAULT_INPUT = DATA / "ot-source-evidence.jsonl"
DEFAULT_OUTPUT = DATA / "ot-source-evidence.jsonl.gz"


def main() -> int:
    parser = argparse.ArgumentParser(description="Comprimă determinist dovada per-verset VT.")
    parser.add_argument("--input", type=Path, default=DEFAULT_INPUT)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    args = parser.parse_args()

    payload = args.input.read_bytes()
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_bytes(gzip.compress(payload, compresslevel=9, mtime=0))
    print(
        "[pack-ot-source-evidence] OK: "
        f"{len(payload)} bytes -> {args.output.stat().st_size} bytes"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
