#!/usr/bin/env python3
"""Bootstrap the chunked temporary NT completion pipeline, revision 5."""
import os
from pathlib import Path

OBSOLETE_RUN_IDS = {
    "30985810141",
    "30986574483",
    "30986916015",
    "30987198771",
    "30987944085",
    "30988345490",
}
current_run = os.environ.get("GITHUB_RUN_ID")
if current_run in OBSOLETE_RUN_IDS:
    raise SystemExit(f"Obsolete NT completion run {current_run}; superseded by the latest audit pipeline.")

root = Path(__file__).resolve().parent
parts = sorted(root.glob("tmp-complete-nt.part[0-9][0-9]"))
if len(parts) != 6:
    raise SystemExit(f"Expected 6 pipeline chunks, found {len(parts)}")
source = "\n".join(path.read_text(encoding="utf-8") for path in parts)
compile(source, str(root / "tmp-complete-nt.generated.py"), "exec")
exec(compile(source, str(root / "tmp-complete-nt.generated.py"), "exec"), {"__name__": "__main__", "__file__": str(root / "tmp-complete-nt.generated.py")})
