#!/usr/bin/env python3
from __future__ import annotations

import importlib.util
import json
import os
import re
import time
import urllib.error
import urllib.request
from pathlib import Path
from typing import Any, Mapping

ROOT = Path(__file__).resolve().parents[1]
WORKER_PATH = ROOT / 'scripts' / 'nt_final_editorial_worker.py'
OLLAMA_URL = os.environ.get('NT_FINAL_OLLAMA_URL', 'http://127.0.0.1:11434/api/chat')
OLLAMA_MODEL = os.environ.get('NT_FINAL_OLLAMA_MODEL', 'qwen3:4b')
OLLAMA_TIMEOUT = int(os.environ.get('NT_FINAL_OLLAMA_TIMEOUT', '600'))
OLLAMA_CONTEXT = int(os.environ.get('NT_FINAL_OLLAMA_CONTEXT', '32768'))
OLLAMA_MAX_PREDICT = int(os.environ.get('NT_FINAL_OLLAMA_MAX_PREDICT', '1400'))
OLLAMA_THINK = os.environ.get('NT_FINAL_OLLAMA_THINK', 'false').strip().lower() in {'1', 'true', 'yes', 'on'}

COMPACT_SCHEMA = {
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
                    'sourceNote': {'type': 'string'},
                    'romanianNote': {'type': 'string'},
                    'semanticNote': {'type': 'string'},
                    'issue': {'type': 'string'},
                },
                'required': [
                    'reference',
                    'sourceAnchor',
                    'targetAnchor',
                    'sourceNote',
                    'romanianNote',
                    'semanticNote',
                ],
            },
        },
    },
    'required': ['verses'],
}

COMPACT_INSTRUCTION = '''
FORMAT LOCAL COMPACT — ACEASTĂ SECȚIUNE ÎNLOCUIEȘTE FORMATUL DE IEȘIRE DESCRIS MAI SUS:
Pentru fiecare verset returnează exact:
- reference;
- sourceAnchor: 1-4 cuvinte grecești consecutive, copiate literal din greek;
- targetAnchor: 2-6 cuvinte consecutive, copiate literal din target;
- sourceNote: 5-12 cuvinte despre valoarea lexicală/gramaticală verificată, FĂRĂ să repeți sourceAnchor;
- romanianNote: 5-12 cuvinte despre precizia/naturalețea formulării românești, FĂRĂ să repeți targetAnchor;
- semanticNote: 5-14 cuvinte despre corespondența de sens dintre cele două ancore, FĂRĂ să le repeți;
- issue: numai dacă există o problemă materială reală; altfel omite câmpul sau folosește șir gol.
Notele trebuie să fie individuale și specifice versetului, nu formule generale. Runnerul va introduce deterministic ancorele în justificările finale; tu faci judecata editorială, nu formatarea repetitivă.
'''.strip()


def load_worker():
    spec = importlib.util.spec_from_file_location('nt_final_editorial_worker_impl', WORKER_PATH)
    if spec is None or spec.loader is None:
        raise RuntimeError(f'Nu pot încărca {WORKER_PATH}')
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def _messages_compact(messages: list[Any]) -> list[Any]:
    out = [dict(item) if isinstance(item, dict) else item for item in messages]
    for index in range(len(out) - 1, -1, -1):
        item = out[index]
        if not isinstance(item, dict) or item.get('role') != 'user' or not isinstance(item.get('content'), str):
            continue
        content = item['content']
        # Remove the verbose output-field description; source data, benchmark data,
        # material-issue policy, anchor policy and validation feedback remain intact.
        content = re.sub(
            r'Pentru fiecare obiect de intrare returnează exact un obiect cu:.*?\n\nReguli stricte:',
            COMPACT_INSTRUCTION + '\n\nReguli stricte:',
            content,
            count=1,
            flags=re.S,
        )
        item['content'] = content
        break
    return out


def _clean_note(value: Any, fallback: str) -> str:
    text = re.sub(r'\s+', ' ', value if isinstance(value, str) else '').strip(' .;:')
    return text or fallback


def _expand_compact_result(result: Mapping[str, Any]) -> dict[str, Any]:
    items = result.get('verses')
    if not isinstance(items, list):
        return {'verses': items}
    expanded: list[dict[str, Any]] = []
    for item in items:
        if not isinstance(item, Mapping):
            expanded.append(item)  # validator will report the malformed item
            continue
        reference = item.get('reference')
        sa = item.get('sourceAnchor')
        ta = item.get('targetAnchor')
        source_note = _clean_note(item.get('sourceNote'), 'valoarea lexicală este păstrată în contextul acestui verset')
        romanian_note = _clean_note(item.get('romanianNote'), 'formularea românească păstrează precis relația exprimată aici')
        semantic_note = _clean_note(item.get('semanticNote'), 'corespondența păstrează sensul contextual fără adaos semantic')
        source_rationale = f'În «{sa}», {source_note}.' if isinstance(sa, str) else source_note
        romanian_rationale = f'În «{ta}», {romanian_note}.' if isinstance(ta, str) else romanian_note
        if isinstance(sa, str) and isinstance(ta, str):
            semantic_rationale = f'«{sa}» corespunde lui «{ta}»: {semantic_note}.'
        else:
            semantic_rationale = semantic_note
        out = {
            'reference': reference,
            'sourceAnchor': sa,
            'targetAnchor': ta,
            'sourceRationale': source_rationale,
            'romanianRationale': romanian_rationale,
            'semanticRationale': semantic_rationale,
        }
        issue = item.get('issue')
        if isinstance(issue, str) and issue.strip():
            out['issue'] = issue.strip()
        expanded.append(out)
    return {'verses': expanded}


def ollama_call_model(payload: dict[str, Any], token: str, retries: int = 2) -> dict[str, Any]:
    messages = payload.get('messages')
    if not isinstance(messages, list):
        raise RuntimeError('Payload fără messages')

    request_payload = {
        'model': OLLAMA_MODEL,
        'messages': _messages_compact(messages),
        'stream': False,
        'format': COMPACT_SCHEMA,
        'think': OLLAMA_THINK,
        'keep_alive': '15m',
        'options': {
            'temperature': 0,
            'seed': 42,
            'num_ctx': OLLAMA_CONTEXT,
            'num_predict': OLLAMA_MAX_PREDICT,
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
            compact = json.loads(content)
            if not isinstance(compact, Mapping):
                raise RuntimeError('Ollama nu a întors obiect JSON')
            result = _expand_compact_result(compact)
            usage = (
                f"prompt={data.get('prompt_eval_count', '?')} "
                f"completion={data.get('eval_count', '?')} "
                f"think={'on' if OLLAMA_THINK else 'off'} compact=on"
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
