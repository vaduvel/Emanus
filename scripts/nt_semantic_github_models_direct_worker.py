#!/usr/bin/env python3
from __future__ import annotations

import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
WORKER = ROOT / "scripts/nt_semantic_github_models_worker.py"

spec = importlib.util.spec_from_file_location("emanus_github_models_semantic", WORKER)
if spec is None or spec.loader is None:
    raise RuntimeError("Cannot load GitHub Models semantic worker")
worker = importlib.util.module_from_spec(spec)
spec.loader.exec_module(worker)

if __name__ == "__main__":
    raise SystemExit(worker.base.main())
