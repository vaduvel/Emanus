#!/usr/bin/env python3
"""Bootstrap the chunked temporary NT completion pipeline."""
from pathlib import Path

root = Path(__file__).resolve().parent
parts = sorted(root.glob("tmp-complete-nt.part[0-9][0-9]"))
if len(parts) != 6:
    raise SystemExit(f"Expected 6 pipeline chunks, found {len(parts)}")
source = "".join(path.read_text(encoding="utf-8") for path in parts)
compile(source, str(root / "tmp-complete-nt.generated.py"), "exec")
exec(compile(source, str(root / "tmp-complete-nt.generated.py"), "exec"), {"__name__": "__main__", "__file__": str(root / "tmp-complete-nt.generated.py")})
