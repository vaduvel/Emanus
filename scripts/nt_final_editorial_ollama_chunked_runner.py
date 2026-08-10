#!/usr/bin/env python3
from __future__ import annotations

import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
WORKER_PATH = ROOT / 'scripts' / 'nt_final_editorial_worker.py'
CHUNKER_PATH = ROOT / 'scripts' / 'nt_final_editorial_copilot_chunked_runner.py'
OLLAMA_RUNNER_PATH = ROOT / 'scripts' / 'nt_final_editorial_ollama_runner.py'


def load_module(path: Path, name: str):
    spec = importlib.util.spec_from_file_location(name, path)
    if spec is None or spec.loader is None:
        raise RuntimeError(f'Nu pot încărca {path}')
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def main() -> int:
    worker = load_module(WORKER_PATH, 'nt_final_editorial_worker_impl')
    chunker = load_module(CHUNKER_PATH, 'nt_final_editorial_chunker_impl')
    ollama = load_module(OLLAMA_RUNNER_PATH, 'nt_final_editorial_ollama_impl')
    worker.call_model = lambda payload, token, retries=5: chunker.chunked_call_model(
        worker, ollama, payload, token, retries
    )
    return int(worker.main())


if __name__ == '__main__':
    raise SystemExit(main())
