#!/usr/bin/env python3
from __future__ import annotations

import importlib.util
import json
import re
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
WORKER_PATH = ROOT / 'scripts' / 'nt_final_editorial_worker.py'
API_VERSION = '2026-03-10'


def load_worker():
    spec = importlib.util.spec_from_file_location('nt_final_editorial_worker_impl', WORKER_PATH)
    if spec is None or spec.loader is None:
        raise RuntimeError(f'Nu pot încărca {WORKER_PATH}')
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def versioned_call_model(worker, payload: dict[str, Any], token: str, retries: int = 5) -> dict[str, Any]:
    request_payload = dict(payload)
    request_payload.setdefault('response_format', {'type': 'json_object'})
    request_payload.setdefault('max_tokens', 30000)
    body = json.dumps(request_payload, ensure_ascii=False).encode('utf-8')
    last = 'eroare necunoscută'

    for attempt in range(1, retries + 1):
        req = urllib.request.Request(
            worker.MODEL_ENDPOINT,
            data=body,
            method='POST',
            headers={
                'Accept': 'application/vnd.github+json',
                'X-GitHub-Api-Version': API_VERSION,
                'Content-Type': 'application/json',
                'Authorization': f'Bearer {token}',
            },
        )
        try:
            with urllib.request.urlopen(req, timeout=240) as response:
                data = json.loads(response.read().decode('utf-8'))
            content = data['choices'][0]['message']['content']
            if isinstance(content, list):
                content = ''.join(part.get('text', '') for part in content if isinstance(part, dict))
            if not isinstance(content, str):
                raise RuntimeError('Modelul nu a întors conținut text')
            content = content.strip()
            if content.startswith('```'):
                content = re.sub(r'^```(?:json)?\s*', '', content)
                content = re.sub(r'\s*```$', '', content)
            return json.loads(content)
        except urllib.error.HTTPError as exc:
            try:
                detail = exc.read().decode('utf-8', errors='replace')[:4000]
            except Exception:
                detail = ''
            last = f'HTTP {exc.code} {exc.reason}; body={detail}'
        except Exception as exc:
            last = repr(exc)

        if attempt < retries:
            time.sleep(min(30, 2 ** attempt))

    raise RuntimeError(f'GitHub Models a eșuat după {retries} încercări: {last}')


def main() -> int:
    worker = load_worker()
    worker.call_model = lambda payload, token, retries=5: versioned_call_model(worker, payload, token, retries)
    return int(worker.main())


if __name__ == '__main__':
    raise SystemExit(main())
