#!/usr/bin/env python3
"""Rulează validatorul complet Biblia Emanus numai peste fișiere de capitol.

`check-biblia-emanus.py` conține validările canonice și rămâne sursa de adevăr.
Acest entrypoint restrânge doar `DATA_DIR.glob("*.json")` la forma canonică
`BOOK.CHAPTER.json`, astfel încât source-lock-uri auxiliare și alte artefacte
JSON din același director să nu fie interpretate drept capitole biblice.
"""

from __future__ import annotations

import importlib.util
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
VALIDATOR_PATH = ROOT / "scripts/check-biblia-emanus.py"
CHAPTER_FILE = re.compile(r"^[A-Z0-9]{3}\.[1-9][0-9]*\.json$")


def load_validator():
    spec = importlib.util.spec_from_file_location("biblia_emanus_validator", VALIDATOR_PATH)
    if spec is None or spec.loader is None:
        raise SystemExit("Nu pot încărca scripts/check-biblia-emanus.py")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def main() -> int:
    validator = load_validator()
    base_path_type = type(Path())

    class CanonicalDataDir(base_path_type):
        def glob(self, pattern: str):  # type: ignore[override]
            paths = super().glob(pattern)
            if pattern != "*.json":
                yield from paths
                return
            yield from (path for path in paths if CHAPTER_FILE.fullmatch(path.name))

    validator.DATA_DIR = CanonicalDataDir(str(validator.DATA_DIR))
    return int(validator.main())


if __name__ == "__main__":
    raise SystemExit(main())
