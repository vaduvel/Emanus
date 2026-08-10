#!/usr/bin/env python3
from __future__ import annotations

import importlib.util
import json
import os
import re
import subprocess
import time
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
WORKER_PATH = ROOT / 'scripts' / 'nt_final_editorial_worker.py'
COPILOT_MODEL = os.environ.get('NT_FINAL_COPILOT_MODEL', 'auto')
COPILOT_TIMEOUT = int(os.environ.get('NT_FINAL_COPILOT_TIMEOUT', '240'))


def load_worker():
    spec = importlib.util.spec_from_file_location('nt_final_editorial_worker_impl', WORKER_PATH)
    if spec is None or spec.loader is None:
        raise RuntimeError(f'Nu pot încărca {WORKER_PATH}')
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def extract_json(text: str) -> dict[str, Any]:
    value = text.strip()
    if value.startswith('```'):
        value = re.sub(r'^```(?:json)?\s*', '', value)
        value = re.sub(r'\s*```$', '', value)
    try:
        parsed = json.loads(value)
        if isinstance(parsed, dict):
            return parsed
    except json.JSONDecodeError:
        pass

    start = value.find('{')
    end = value.rfind('}')
    if start >= 0 and end > start:
        parsed = json.loads(value[start:end + 1])
        if isinstance(parsed, dict):
            return parsed
    raise RuntimeError(f'Copilot CLI nu a întors JSON valid; tail={value[-2000:]}')


def copilot_call_model(payload: dict[str, Any], token: str, retries: int = 2) -> dict[str, Any]:
    messages = payload.get('messages')
    if not isinstance(messages, list):
        raise RuntimeError('Payload fără messages')
    parts: list[str] = []
    for message in messages:
        if not isinstance(message, dict):
            continue
        role = str(message.get('role', 'user')).upper()
        content = message.get('content')
        if isinstance(content, str) and content.strip():
            parts.append(f'[{role}]\n{content}')
    prompt = '\n\n'.join(parts)
    if not prompt:
        raise RuntimeError('Prompt gol')

    env = os.environ.copy()
    env['GITHUB_TOKEN'] = token
    env['COPILOT_GITHUB_TOKEN'] = token
    env['NO_COLOR'] = '1'
    command = [
        'copilot',
        '-p', prompt,
        '-s',
        '--no-ask-user',
        '--no-custom-instructions',
        '--no-auto-update',
        '--no-remote',
        '--model', COPILOT_MODEL,
        '--deny-tool=shell',
        '--deny-tool=write',
        '--log-level', 'error',
    ]

    last = 'eroare necunoscută'
    for attempt in range(1, retries + 1):
        try:
            proc = subprocess.run(
                command,
                text=True,
                capture_output=True,
                env=env,
                cwd=ROOT,
                timeout=COPILOT_TIMEOUT,
                check=False,
            )
            if proc.returncode != 0:
                last = f'exit={proc.returncode}; stderr={proc.stderr[-4000:]}; stdout={proc.stdout[-2000:]}'
            else:
                return extract_json(proc.stdout)
        except subprocess.TimeoutExpired as exc:
            stdout = exc.stdout[-2000:] if isinstance(exc.stdout, str) else ''
            stderr = exc.stderr[-4000:] if isinstance(exc.stderr, str) else ''
            last = f'timeout={COPILOT_TIMEOUT}s; stderr={stderr}; stdout={stdout}'
        except Exception as exc:
            last = repr(exc)
        if attempt < retries:
            time.sleep(min(10, 2 ** attempt))

    raise RuntimeError(f'Copilot CLI ({COPILOT_MODEL}) a eșuat după {retries} încercări: {last}')


def main() -> int:
    worker = load_worker()
    worker.call_model = copilot_call_model
    return int(worker.main())


if __name__ == '__main__':
    raise SystemExit(main())
