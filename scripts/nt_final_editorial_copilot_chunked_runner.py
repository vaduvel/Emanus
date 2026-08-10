#!/usr/bin/env python3
from __future__ import annotations

import importlib.util
import json
import os
import re
from pathlib import Path
from typing import Any, Mapping

ROOT = Path(__file__).resolve().parents[1]
WORKER_PATH = ROOT / 'scripts' / 'nt_final_editorial_worker.py'
COPILOT_RUNNER_PATH = ROOT / 'scripts' / 'nt_final_editorial_copilot_runner.py'
CHUNK_SIZE = int(os.environ.get('NT_FINAL_CHUNK_SIZE', '25'))
CHUNK_ATTEMPTS = int(os.environ.get('NT_FINAL_CHUNK_ATTEMPTS', '4'))

MATERIAL_CRITERION = '''
CRITERIU IMPORTANT PENTRU `issue`:
- marchează `issue` numai dacă textul românesc NU poate reda în mod rezonabil sensul textului grec ori conține o omisiune/adăugire/deplasare semantică materială;
- existența unei alternative lexicale sau stilistice posibile NU este, singură, defect material;
- nu coborî ori ridica artificial forța lexicală doar pentru că un sinonim ar fi posibil;
- dacă semnalezi `issue`, explică precis de ce lectura actuală nu este defensabilă din greaca furnizată.
'''.strip()

ANCHOR_POLICY = '''
POLITICĂ DE ANCORE PENTRU VALIDARE DETERMINISTĂ:
- `sourceAnchor` trebuie să fie SCURT: de regulă 1-4 cuvinte grecești consecutive, copiate caracter-cu-caracter din `greek`; evită semnele de aparat critic la marginea ancorei dacă poți alege aceleași cuvinte fără ele;
- `targetAnchor` trebuie să fie SCURT: de regulă 2-6 cuvinte consecutive, copiate caracter-cu-caracter din `target`;
- copiază apoi aceleași ancore LITERAL, fără schimbarea punctuației, diacriticelor, majusculelor sau formei cuvintelor, în justificările care le cer;
- nu alege drept ancoră o propoziție întreagă dacă un fragment lexical mai scurt verifică aceeași decizie semantică.
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


def _error_refs(errors: list[str]) -> set[str]:
    refs: set[str] = set()
    for error in errors:
        match = re.match(r'^([1-3]?[A-Z]{2,3}\.\d+\.\d+):', error)
        if match:
            refs.add(match.group(1))
    return refs


def _build_payload(
    messages: list[Any],
    user_index: int,
    user_content: str,
    begin: int,
    end: int,
    rows: list[dict[str, Any]],
    feedback: str,
) -> dict[str, Any]:
    rows_json = json.dumps(rows, ensure_ascii=False, separators=(',', ':'))
    chunk_content = user_content[:begin] + rows_json + user_content[end:]
    chunk_content += '\n\n' + MATERIAL_CRITERION
    chunk_content += '\n\n' + ANCHOR_POLICY
    if feedback:
        chunk_content += (
            '\n\nFEEDBACK DE VALIDARE PENTRU VERSETELE REFĂCUTE — repară exact aceste probleme, '
            'fără să modifici sau să inventezi textul sursă:\n' + feedback
        )
    chunk_messages = [dict(item) if isinstance(item, dict) else item for item in messages]
    chunk_messages[user_index] = dict(chunk_messages[user_index])
    chunk_messages[user_index]['content'] = chunk_content
    return {'messages': chunk_messages}


def _merge_payload(original: Mapping[str, Any], replacement: Mapping[str, Any]) -> dict[str, Any]:
    out = dict(original)
    out.update(replacement)
    return out


def review_chunk_with_salvage(
    worker,
    copilot_runner,
    payload: dict[str, Any],
    token: str,
    messages: list[Any],
    user_index: int,
    user_content: str,
    begin: int,
    end: int,
    chunk: list[dict[str, Any]],
    label: str,
) -> list[dict[str, Any]]:
    rows_by_ref = {row['reference']: row for row in chunk}
    accepted: dict[str, dict[str, Any]] = {}
    pending = list(chunk)
    feedback = ''
    material_counts: dict[str, int] = {}

    for attempt in range(1, CHUNK_ATTEMPTS + 1):
        if not pending:
            break
        partial = _build_payload(messages, user_index, user_content, begin, end, pending, feedback)
        result = copilot_runner.copilot_call_model(_merge_payload(payload, partial), token, retries=2)
        items = result.get('verses') if isinstance(result, dict) else None
        if not isinstance(items, list):
            feedback = f'rădăcina trebuie să conțină verses listă; așteptate {len(pending)} versete'
            print(f'[nt-final-copilot] {label} retry {attempt}: {feedback}', flush=True)
            continue

        by_ref = {
            item.get('reference'): dict(item)
            for item in items
            if isinstance(item, Mapping) and isinstance(item.get('reference'), str)
        }
        next_pending: list[dict[str, Any]] = []
        errors_for_feedback: list[str] = []

        for row in pending:
            ref = row['reference']
            item = by_ref.get(ref)
            if item is None:
                next_pending.append(row)
                errors_for_feedback.append(f'{ref}: lipsă rezultat')
                continue

            _valid, errors = worker.validate_model_output({'verses': [item]}, [row])
            if not errors:
                accepted[ref] = item
                continue

            material = _material_errors(errors)
            if material:
                material_counts[ref] = material_counts.get(ref, 0) + 1
                if material_counts[ref] >= 2:
                    raise RuntimeError(
                        f'{label}: problemă materială confirmată după re-evaluare pentru {ref}: '
                        + '; '.join(material[:2])
                    )
                errors.append(
                    f'{ref}: re-evaluează independent issue; păstrează-l dacă textul nu este defensabil din greacă'
                )
            next_pending.append(row)
            errors_for_feedback.extend(errors)

        newly_accepted = len(pending) - len(next_pending)
        print(
            f'[nt-final-copilot] {label} attempt {attempt}: '
            f'{newly_accepted} noi valide, {len(next_pending)} de refăcut',
            flush=True,
        )
        pending = next_pending
        feedback = '; '.join(errors_for_feedback[:20])

    if pending:
        raise RuntimeError(
            f'{label}: {len(pending)} versete încă invalide după {CHUNK_ATTEMPTS} încercări: {feedback}'
        )

    combined = [accepted[row['reference']] for row in chunk]
    _validated, final_errors = worker.validate_model_output({'verses': combined}, chunk)
    if final_errors:
        # Singleton salvage cannot see duplicate rationales across different verses. If that
        # rare case appears, surface it explicitly instead of silently accepting weak evidence.
        refs = sorted(_error_refs(final_errors))
        raise RuntimeError(
            f'{label}: validarea combinată a eșuat după salvage'
            + (f' pentru {refs}' if refs else '')
            + ': ' + '; '.join(final_errors[:12])
        )
    return combined


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
        label = f'chunk {offset + 1}-{offset + len(chunk)}/{len(rows)}'
        combined.extend(review_chunk_with_salvage(
            worker,
            copilot_runner,
            payload,
            token,
            messages,
            user_index,
            user_content,
            begin,
            end,
            chunk,
            label,
        ))
        print(f'[nt-final-copilot] {label} OK', flush=True)

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
