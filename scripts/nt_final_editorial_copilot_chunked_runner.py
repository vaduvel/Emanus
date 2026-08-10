#!/usr/bin/env python3
from __future__ import annotations

import importlib.util
import json
import os
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
WORKER_PATH = ROOT / 'scripts' / 'nt_final_editorial_worker.py'
COPILOT_RUNNER_PATH = ROOT / 'scripts' / 'nt_final_editorial_copilot_runner.py'
CHUNK_SIZE = int(os.environ.get('NT_FINAL_CHUNK_SIZE', '5'))
CHUNK_ATTEMPTS = int(os.environ.get('NT_FINAL_CHUNK_ATTEMPTS', '4'))

MATERIAL_CRITERION = '''
CRITERIU IMPORTANT PENTRU `issue`:
- marchează `issue` numai dacă textul românesc NU poate reda în mod rezonabil sensul textului grec ori conține o omisiune/adăugire/deplasare semantică materială;
- existența unei alternative lexicale sau stilistice posibile NU este, singură, defect material;
- nu coborî ori ridica artificial forța lexicală doar pentru că un sinonim ar fi posibil;
- dacă semnalezi `issue`, explică precis de ce lectura actuală nu este defensabilă din greaca furnizată.
'''.strip()


def load_module(path: Path, name: str):
    spec = importlib.util.spec_from_file_location(name, path)
    if spec is None or spec.loader is None:
        raise RuntimeError(f'Nu pot încărca {path}')
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def _material_errors(errors: list[str]) -> list[str]:
    return [error for error in errors if 'modelul a semnalat problemă materială' in error]


def chunked_call_model(worker, copilot_runner, payload: dict[str, Any], token: str, retries: int = 3) -> dict[str, Any]:
    messages = payload.get('messages')
    if not isinstance(messages, list):
        raise RuntimeError('Payload fără messages')

    user_index = None
    user_content = None
    for index in range(len(messages) - 1, -1, -1):
        item = messages[index]
        if isinstance(item, dict) and item.get('role') == 'user' and isinstance(item.get('content'), str):
            user_index = index
            user_content = item['content']
            break
    if user_index is None or user_content is None:
        raise RuntimeError('Nu găsesc mesajul user din payload')

    begin_marker = 'DATE CAPITOL:\n'
    end_marker = '\n\nETALOANE ROMÂNEȘTI EXTERNE'
    begin = user_content.find(begin_marker)
    if begin < 0:
        return copilot_runner.copilot_call_model(payload, token, retries)
    begin += len(begin_marker)
    end = user_content.find(end_marker, begin)
    if end < 0:
        return copilot_runner.copilot_call_model(payload, token, retries)

    rows = json.loads(user_content[begin:end])
    if not isinstance(rows, list) or not rows:
        raise RuntimeError('DATE CAPITOL nu conține lista de versete')

    combined: list[dict[str, Any]] = []
    for offset in range(0, len(rows), CHUNK_SIZE):
        chunk = rows[offset:offset + CHUNK_SIZE]
        chunk_json = json.dumps(chunk, ensure_ascii=False, separators=(',', ':'))
        local_feedback = ''
        accepted: list[dict[str, Any]] | None = None

        for attempt in range(1, CHUNK_ATTEMPTS + 1):
            chunk_content = user_content[:begin] + chunk_json + user_content[end:]
            chunk_content += '\n\n' + MATERIAL_CRITERION
            if local_feedback:
                chunk_content += (
                    '\n\nFEEDBACK DE VALIDARE PENTRU ACEST LOT — repară exact aceste probleme, '
                    'fără să modifici sau să inventezi textul sursă:\n' + local_feedback
                )

            chunk_messages = [dict(item) if isinstance(item, dict) else item for item in messages]
            chunk_messages[user_index] = dict(chunk_messages[user_index])
            chunk_messages[user_index]['content'] = chunk_content
            chunk_payload = dict(payload)
            chunk_payload['messages'] = chunk_messages

            result = copilot_runner.copilot_call_model(chunk_payload, token, retries=2)
            verses = result.get('verses') if isinstance(result, dict) else None
            if not isinstance(verses, list) or len(verses) != len(chunk):
                errors = [
                    f'lotul trebuie să aibă exact {len(chunk)} rezultate, primit '
                    f'{len(verses) if isinstance(verses, list) else "non-list"}'
                ]
            else:
                _validated, errors = worker.validate_model_output(result, chunk)

            if not errors:
                accepted = verses
                print(
                    f'[nt-final-copilot] chunk {offset + 1}-{offset + len(chunk)}/{len(rows)} '
                    f'OK (attempt {attempt})',
                    flush=True,
                )
                break

            material = _material_errors(errors)
            print(
                f'[nt-final-copilot] chunk {offset + 1}-{offset + len(chunk)}/{len(rows)} '
                f'validation retry {attempt}: {"; ".join(errors[:8])}',
                flush=True,
            )

            # Un defect material nu trebuie "convins" să dispară prin retry-uri repetate.
            # Îi permitem o singură re-evaluare independentă ca să separăm fals-pozitivele
            # lexicale/stilistice de defectele reale; dacă persistă, workerul se oprește.
            if material and attempt >= 2:
                raise RuntimeError(
                    f'Chunk {offset + 1}-{offset + len(chunk)}: problemă materială confirmată după re-evaluare: '
                    + '; '.join(material[:4])
                )

            local_feedback = '; '.join(errors[:12])
            if material:
                local_feedback += (
                    '; Re-evaluează independent marcajul issue conform criteriului material de mai sus. '
                    'Nu retrage issue dacă textul chiar nu este defensabil din greaca furnizată.'
                )

        if accepted is None:
            raise RuntimeError(
                f'Chunk {offset + 1}-{offset + len(chunk)} invalid după {CHUNK_ATTEMPTS} încercări: '
                + local_feedback
            )
        combined.extend(accepted)

    return {'verses': combined}


def main() -> int:
    worker = load_module(WORKER_PATH, 'nt_final_editorial_worker_impl')
    copilot_runner = load_module(COPILOT_RUNNER_PATH, 'nt_final_editorial_copilot_impl')
    worker.call_model = lambda payload, token, retries=5: chunked_call_model(
        worker, copilot_runner, payload, token, retries
    )
    return int(worker.main())


if __name__ == '__main__':
    raise SystemExit(main())
