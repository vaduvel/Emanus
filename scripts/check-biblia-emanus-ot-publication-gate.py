#!/usr/bin/env python3
"""Run the strict OT evidence gate whenever the Old Testament is publishable.

The corpus-wide validator ensures chapter and manifest statuses agree. This
wrapper binds the separate per-verse evidence gate to that status, so a future
status-only promotion cannot bypass the 23,145 direct source comparisons.
"""

from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "docs" / "data" / "biblia-emanus" / "manifest.json"
CHECKS = (
    ("check-biblia-emanus-romanian-quality.py", "--testament", "OT"),
    ("check-biblia-emanus-ot-semantic-screening.py",),
    ("check-biblia-emanus-ot-semantic-resolutions.py",),
    ("check-biblia-emanus-ot-source-evidence.py",),
)


def main() -> int:
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    testament = manifest.get("oldTestament")
    if not isinstance(testament, dict):
        print("[ot-publication-gate] EROARE: manifestul nu conține oldTestament", file=sys.stderr)
        return 1

    for command in CHECKS:
        result = subprocess.run(
            [sys.executable, str(ROOT / "scripts" / command[0]), *command[1:]],
            cwd=ROOT,
            check=False,
        )
        if result.returncode != 0:
            print(
                f"[ot-publication-gate] EROARE: controlul {command[0]} a eșuat",
                file=sys.stderr,
            )
            return result.returncode

    status = testament.get("status")
    public = testament.get("public")
    if status != "published":
        print(
            "[ot-publication-gate] VT rămâne in_review, dar toate dovezile "
            "obligatorii sunt curente și valide."
        )
        return 0
    if public is not True:
        print("[ot-publication-gate] EROARE: VT published trebuie să fie public", file=sys.stderr)
        return 1

    print("[ot-publication-gate] OK: VT publicat cu toate porțile obligatorii active.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
