#!/usr/bin/env python3
from __future__ import annotations

import importlib.util
import json
import os
import time
import urllib.error
import urllib.request
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
WORKER_PATH = ROOT / 'scripts' / 'nt_final_editorial_worker.py'
OLLAMA_URL = os.environ.get('NT_FINAL_OLLAMA_URL', 'http://127.0.0.1:11434/api/chat')
OLLAMA_MODEL = os.environ.get('NT_FINAL_OLLAMA_MODEL', 'qwen3:8b')
OLLAMA_TIMEOUT = int(os.environ.get('NT_FINAL_OLLAMA_TIMEOUT', '900'))
OLLAMA_CONTEXT = int(os.environ.get('NT_FINAL_OLLAMA_CONTEXT', '32768'))

OUTPUT_SCHEMA = {
    'type': 'object',
    'properties': {
        'verses': {
            'type': 'array',
            'items': {
                'type': 'object',
                'properties': {
                    'reference': {'type': 'string'},
                    'sourceAnchor': {'type': 'string'},
                    'targetAnchor': {'type': 'string'},
                    'sourceRationale': {'type': 'string'},
                    'romanianRationale': {'type': 'string'},
                    'semanticRationale': {'type': 'string'},
                    'issue': {'type': 'string'},
                },
                'required': [
                    'reference',
                    'sourceAnchor',
                    'targetAnchor',
                    'sourceRationale',
                    'romanianRationale',
                    'semanticRationale',
                ],
            },
        },
    },
    'required': ['verses'],
}


def load_worker():
    spec = importlib.util.spec_from_file_location('nt_final_editorial_worker_impl', WORKER_PATH)
    if spec is None or spec.loader is None:
        raise RuntimeError(f'Nu pot încărca {WORKER_PATH}')
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def ollama_call_model(payload: dict[str, Any], token: str, retries: int = 2) -> dict[str, Any]:
    messages = payload.get('messages')
    if not isinstance(messages, list):
        raise RuntimeError('Payload fără messages')

    request_payload = {
        'model': OLLAMA_MODEL,
        'messages': messages,
        'stream': False,
        'format': OUTPUT_SCHEMA,
        'think': False,
        'keep_alive': '15m',
        'options': {
            'temperature': 0,
            'seed': 42,
            'num_ctx': OLLAMA_CONTEXT,
        },
    }
    body = json.dumps(request_payload, ensure_ascii=False).encode('utf-8')
    last = 'eroare necunoscută'
    for attempt in range(1, retries + 1):
        try:
            req = urllib.request.Request(
                OLLAMA_URL,
                data=body,
                method='POST',
                headers={'Content-Type': 'application/json'},
            )
            with urllib.request.urlopen(req, timeout=OLLAMA_TIMEOUT) as response:
                data = json.loads(response.read().decode('utf-8'))
            content = data.get('message', {}).get('content')
            if not isinstance(content, str) or not content.strip():
                raise RuntimeError(f'Ollama nu a întors content: {str(data)[-2000:]}')
            result = json.loads(content)
            if not isinstance(result, dict):
                raise RuntimeError('Ollama nu a întors obiect JSON')
            usage = (
                f"prompt={data.get('prompt_eval_count', '?')} "
                f"completion={data.get('eval_count', '?')}"
            )
            print(f'[nt-final-ollama] {OLLAMA_MODEL} {usage}', flush=True)
            return result
        except (urllib.error.URLError, TimeoutError, json.JSONDecodeError, RuntimeError) as exc:
            last = repr(exc)
            if attempt < retries:
                time.sleep(2 ** attempt)
    raise RuntimeError(f'Ollama ({OLLAMA_MODEL}) a eșuat după {retries} încercări: {last}')


# Adapter name consumed by the existing selective-salvage chunker.
copilot_call_model = ollama_call_model


def main() -> int:
    worker = load_worker()
    worker.call_model = ollama_call_model
    return int(worker.main())


if __name__ == '__main__':
    raise SystemExit(main())
