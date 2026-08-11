#!/usr/bin/env python3
from __future__ import annotations

import argparse
import hashlib
import importlib.util
import json
import os
import re
import time
import urllib.error
import urllib.request
import zipfile
from html import unescape
from pathlib import Path
from types import ModuleType
from typing import Any, Mapping

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / 'docs' / 'data' / 'biblia-emanus'
MODEL_ENDPOINT = 'https://models.github.ai/inference/chat/completions'
MODEL = os.environ.get('NT_FINAL_MODEL', 'openai/gpt-5')
NTR_VERSION = 126
NTR_BOOK = {
    'MAT':'MAT','MRK':'MRK','LUK':'LUK','JHN':'JHN','ACT':'ACT','ROM':'ROM',
    '1CO':'1CO','2CO':'2CO','GAL':'GAL','EPH':'EPH','PHP':'PHP','COL':'COL',
    '1TH':'1TH','2TH':'2TH','1TI':'1TI','2TI':'2TI','TIT':'TIT','PHM':'PHM',
    'HEB':'HEB','JAS':'JAS','1PE':'1PE','2PE':'2PE','1JN':'1JN','2JN':'2JN',
    '3JN':'3JN','JUD':'JUD','REV':'REV',
}


def load_module(path: Path, name: str) -> ModuleType:
    spec = importlib.util.spec_from_file_location(name, path)
    if spec is None or spec.loader is None:
        raise RuntimeError(f'Nu pot încărca {path}')
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def sha256_text(value: str) -> str:
    return 'sha256:' + hashlib.sha256(value.encode('utf-8')).hexdigest()


def source_text(validator: ModuleType, source_data: Mapping[str, Any], lock_id: str, book_id: str, chapter: int, verse: int) -> tuple[list[str], str]:
    refs = validator.source_references_for_target(lock_id, book_id, chapter, verse, source_data['rules'])
    texts = source_data['texts'][lock_id]
    values = []
    rendered_refs = []
    for ref in refs:
        rendered_refs.append(f'{ref[0]}:{ref[1]}')
        value = texts.get(ref)
        if not isinstance(value, str) or not value:
            raise RuntimeError(f'{book_id}.{chapter}.{verse}: lipsește {lock_id} {ref}')
        values.append(value)
    return rendered_refs, '\n'.join(values)


def original_source_lock(
    validator: ModuleType,
    source_data: Mapping[str, Any],
    book_id: str,
    chapter: int,
    verse: int,
) -> str:
    """Select the primary Greek witness, falling back only when declared missing."""
    book = source_data['books'][book_id]
    candidates = [book['originalLockId'], *book.get('supplementalOriginalLockIds', [])]
    for lock_id in candidates:
        refs = validator.source_references_for_target(lock_id, book_id, chapter, verse, source_data['rules'])
        texts = source_data['texts'][lock_id]
        if all(isinstance(texts.get(ref), str) and texts.get(ref) for ref in refs):
            return lock_id
    raise RuntimeError(f'{book_id}.{chapter}.{verse}: niciun martor grec fixat nu are text')


def source_evidence(validator: ModuleType, source_data: Mapping[str, Any], lock_id: str, book_id: str, chapter: int, verse: int, *, allow_missing: bool = False) -> dict[str, Any]:
    refs = validator.source_references_for_target(lock_id, book_id, chapter, verse, source_data['rules'])
    texts = source_data['texts'][lock_id]
    missing = [ref for ref in refs if not isinstance(texts.get(ref), str) or not texts.get(ref)]
    out: dict[str, Any] = {'lockId': lock_id, 'references': [f'{c}:{v}' for c, v in refs]}
    if missing:
        if not allow_missing:
            raise RuntimeError(f'{book_id}.{chapter}.{verse}: sursa obligatorie {lock_id} are lacună')
        record = source_data['files'][lock_id]
        declared = set(record.get('missingTargetReferences') or [])
        target = f'{chapter}:{verse}'
        if target not in declared:
            raise RuntimeError(f'{book_id}.{chapter}.{verse}: lacuna {lock_id} nu este declarată')
        out['availability'] = 'missing-in-pinned-source'
        out['missingReferences'] = [f'{c}:{v}' for c, v in missing]
    else:
        out['textDigest'] = sha256_text('\n'.join(texts[ref] for ref in refs))
    return out


def fetch_visible_text(url: str, *, label: str, marker: str = '') -> str:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 EmanusEditorialAudit/1.0'})
    try:
        with urllib.request.urlopen(req, timeout=30) as response:
            raw = response.read().decode('utf-8', errors='replace')
    except urllib.error.URLError as exc:
        raise RuntimeError(f'Nu pot consulta {label} la {url}: {exc}') from exc
    raw = re.sub(r'<script\b[^>]*>.*?</script>', ' ', raw, flags=re.I | re.S)
    raw = re.sub(r'<style\b[^>]*>.*?</style>', ' ', raw, flags=re.I | re.S)
    text = re.sub(r'<[^>]+>', ' ', raw)
    text = unescape(text)
    text = re.sub(r'\s+', ' ', text).strip()
    if len(text) < 300 or (marker and marker not in text):
        raise RuntimeError(f'Pagina {label} nu a produs text utilizabil: {url}')
    return text


def fetch_external_benchmarks(book_id: str, chapter: int, benchmark_ids: list[str]) -> dict[str, dict[str, str]]:
    result: dict[str, dict[str, str]] = {}
    for benchmark_id in benchmark_ids:
        if benchmark_id == 'NTR':
            code = NTR_BOOK[book_id]
            url = f'https://www.bible.com/ro/bible/{NTR_VERSION}/{code}.{chapter}.NTR'
            text = fetch_visible_text(url, label='NTR', marker=str(chapter))
        elif benchmark_id == 'CORNILESCU-1924':
            # The NT Cornilescu mirror exposes one HTML page per book, not per chapter.
            url = f'https://ebible.org/ron1924/{book_id}.htm'
            try:
                text = fetch_visible_text(url, label='Cornilescu 1924', marker=str(chapter))
            except RuntimeError:
                # JHN11 and some neighboring pages are absent from the mirror. The pinned
                # public-domain USFM snapshot is the authoritative fallback for this audit.
                archive = ROOT / 'docs' / 'data' / 'biblia-emanus-candidates' / 'sources' / 'ron1924_usfm.zip'
                with zipfile.ZipFile(archive) as bundle:
                    member = next(name for name in bundle.namelist() if name.endswith(f'-{book_id}ron1924.usfm'))
                    text = bundle.read(member).decode('utf-8', errors='replace')
                url = f'https://ebible.org/Scriptures/ron1924_usfm.zip#{member}'
        else:
            raise RuntimeError(f'Etalon extern necunoscut: {benchmark_id}')
        result[benchmark_id] = {'url': url, 'text': text}
    return result


def call_model(payload: dict[str, Any], token: str, retries: int = 5) -> dict[str, Any]:
    body = json.dumps(payload, ensure_ascii=False).encode('utf-8')
    last: Exception | None = None
    for attempt in range(1, retries + 1):
        req = urllib.request.Request(
            MODEL_ENDPOINT,
            data=body,
            method='POST',
            headers={
                'Content-Type': 'application/json',
                'Authorization': f'Bearer {token}',
            },
        )
        try:
            with urllib.request.urlopen(req, timeout=180) as response:
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
        except Exception as exc:
            last = exc
            if attempt == retries:
                break
            time.sleep(min(30, 2 ** attempt))
    raise RuntimeError(f'GitHub Models a eșuat după {retries} încercări: {last}')


def make_prompt(chapter_rows: list[dict[str, Any]], external_texts: Mapping[str, Mapping[str, str]], *, feedback: str = '') -> str:
    data = json.dumps(chapter_rows, ensure_ascii=False, separators=(',', ':'))
    external = json.dumps({key: value['text'] for key, value in external_texts.items()}, ensure_ascii=False, separators=(',', ':'))
    return f'''Ești reviewer editorial pentru o traducere românească nouă a Noului Testament. Verifică FIECARE verset din capitol separat, pe baza textului grec SBLGNT și a etaloanelor furnizate. NTR este doar etalon de comparație; nu copia formulări din el.

Pentru fiecare obiect de intrare returnează exact un obiect cu:
- reference
- sourceAnchor: un fragment GRECESc exact, continuu, care apare literal în câmpul greek; alege o ancoră semantic relevantă, nu doar articol/conjuncție.
- targetAnchor: un fragment românesc exact, continuu, care apare literal în target.
- sourceRationale: o propoziție individuală de minimum 32 caractere care INCLUDE literal sourceAnchor și explică ce valoare gramaticală/lexicală verifici.
- romanianRationale: o propoziție individuală de minimum 32 caractere care INCLUDE literal targetAnchor și explică naturalețea/precizia românei în acest verset.
- semanticRationale: o propoziție individuală de minimum 32 caractere care INCLUDE literal atât sourceAnchor cât și targetAnchor și explică legătura semantică dintre ele.

Reguli stricte:
1. Returnează JSON pur: {{"verses":[...]}} și nimic altceva.
2. Păstrează exact ordinea și numărul versetelor primite; nicio omisiune, nicio intrare în plus.
3. Nu folosi justificări generice sau repetate. Fiecare justificare trebuie să se refere la detaliul acelui verset.
4. Nu afirma că un benchmark spune ceva dacă nu rezultă din datele furnizate.
5. Dacă targetul păstrează corect sensul, explică de ce. Dacă observi o problemă materială, pune și "issue" cu explicația; nu inventa o aprobare.
6. Nu corecta textul aici și nu parafraza NTR în ieșire.

DATE CAPITOL:
{data}

ETALOANE ROMÂNEȘTI EXTERNE (consultare tranzitorie, comparison-only; nu le copia):
{external}

{('FEEDBACK DE VALIDARE DIN ÎNCERCAREA ANTERIOARĂ: ' + feedback) if feedback else ''}
'''


def validate_model_output(result: Mapping[str, Any], rows: list[dict[str, Any]]) -> tuple[list[dict[str, Any]], list[str]]:
    errors: list[str] = []
    items = result.get('verses')
    if not isinstance(items, list):
        return [], ['rădăcina trebuie să conțină verses listă']
    expected_refs = [row['reference'] for row in rows]
    got_refs = [item.get('reference') if isinstance(item, Mapping) else None for item in items]
    if got_refs != expected_refs:
        errors.append(f'referințele nu corespund: expected={expected_refs} got={got_refs}')
    by_ref = {item.get('reference'): item for item in items if isinstance(item, Mapping) and isinstance(item.get('reference'), str)}
    normalized_seen: set[str] = set()
    validated: list[dict[str, Any]] = []
    for row in rows:
        ref = row['reference']
        item = by_ref.get(ref)
        if not isinstance(item, Mapping):
            errors.append(f'{ref}: lipsă rezultat')
            continue
        if item.get('issue'):
            errors.append(f'{ref}: modelul a semnalat problemă materială: {item.get("issue")}')
            continue
        sa = item.get('sourceAnchor')
        ta = item.get('targetAnchor')
        sr = item.get('sourceRationale')
        rr = item.get('romanianRationale')
        sem = item.get('semanticRationale')
        if not isinstance(sa, str) or not re.search(r'[\u0370-\u03ff\u1f00-\u1fff]', sa) or sa.casefold() not in row['greek'].casefold():
            errors.append(f'{ref}: sourceAnchor invalid')
            continue
        if not isinstance(ta, str) or len(ta.strip()) < 2 or ta.casefold() not in row['target'].casefold():
            errors.append(f'{ref}: targetAnchor invalid')
            continue
        local = [('sourceRationale', sr, [sa]), ('romanianRationale', rr, [ta]), ('semanticRationale', sem, [sa, ta])]
        bad = False
        for name, value, anchors in local:
            if not isinstance(value, str) or len(re.sub(r'\s+', ' ', value).strip()) < 32:
                errors.append(f'{ref}: {name} prea scurt')
                bad = True
                continue
            for anchor in anchors:
                if anchor.casefold() not in value.casefold():
                    errors.append(f'{ref}: {name} nu include ancora {anchor!r}')
                    bad = True
            key = re.sub(r'\W+', ' ', value.casefold()).strip()
            if key in normalized_seen:
                errors.append(f'{ref}: {name} duplică o justificare anterioară')
                bad = True
            normalized_seen.add(key)
        if bad:
            continue
        validated.append({
            'reference': ref,
            'decisions': {
                'sourceLanguage': {'sourceAnchor': sa, 'rationale': sr},
                'romanian': {'targetAnchor': ta, 'rationale': rr},
                'semantic': {'sourceAnchor': sa, 'targetAnchor': ta, 'rationale': sem},
            },
        })
    return validated, errors


def chapter_rows(validator: ModuleType, source_data: Mapping[str, Any], book_id: str, chapter: int) -> tuple[list[dict[str, Any]], dict[int, str]]:
    data = validator.load_json(DATA / f'{book_id}.{chapter}.json')
    book = source_data['books'][book_id]
    targets: dict[int, str] = {}
    rows: list[dict[str, Any]] = []
    for verse_item in data['verses']:
        verse = int(verse_item['number'])
        target = verse_item['text']
        targets[verse] = target
        greek_lock_id = original_source_lock(validator, source_data, book_id, chapter, verse)
        _, greek = source_text(validator, source_data, greek_lock_id, book_id, chapter, verse)
        _, webu = source_text(validator, source_data, book['baseLockId'], book_id, chapter, verse)
        benchmarks: dict[str, str | None] = {}
        for lock_id in book['benchmarkLockIds']:
            benchmark_id = source_data['files'][lock_id]['benchmarkId']
            try:
                _, value = source_text(validator, source_data, lock_id, book_id, chapter, verse)
            except RuntimeError:
                value = None
            benchmarks[benchmark_id] = value
        rows.append({
            'reference': f'{book_id}.{chapter}.{verse}',
            'target': target,
            'greek': greek,
            'greekLockId': greek_lock_id,
            'webu': webu,
            'pinnedRomanianBenchmarks': benchmarks,
        })
    return rows, targets


def build_evidence_for_chapter(validator: ModuleType, source_data: Mapping[str, Any], book_id: str, chapter: int, decisions: list[dict[str, Any]], targets: Mapping[int, str], external_texts: Mapping[str, Mapping[str, str]], consulted_on: str) -> list[dict[str, Any]]:
    book = source_data['books'][book_id]
    by_ref = {item['reference']: item['decisions'] for item in decisions}
    out: list[dict[str, Any]] = []
    for verse, target in targets.items():
        ref = f'{book_id}.{chapter}.{verse}'
        benchmarks: dict[str, Any] = {}
        for lock_id in book['benchmarkLockIds']:
            benchmark_id = source_data['files'][lock_id]['benchmarkId']
            record = source_data['files'][lock_id]
            allow_missing = benchmark_id != 'BTF' and bool(record.get('missingTargetReferences'))
            benchmarks[benchmark_id] = source_evidence(
                validator, source_data, lock_id, book_id, chapter, verse, allow_missing=allow_missing
            )
        for benchmark_id in book.get('externalBenchmarkIds', []):
            if benchmark_id not in external_texts:
                raise RuntimeError(f'{ref}: etalonul extern {benchmark_id} nu a fost consultat')
            url = external_texts[benchmark_id]['url']
            benchmarks[benchmark_id] = {
                'references': [f'{chapter}:{verse}'],
                'mode': 'external-comparison-only',
                'referenceUrl': url,
                'consultedOn': consulted_on,
            }
        out.append({
            'reference': ref,
            'textDigest': sha256_text(target),
            'sources': {
            'sblgnt': source_evidence(
                validator,
                source_data,
                original_source_lock(validator, source_data, book_id, chapter, verse),
                book_id,
                chapter,
                verse,
            ),
                'webu': source_evidence(validator, source_data, book['baseLockId'], book_id, chapter, verse),
                'benchmarks': benchmarks,
            },
            'decisions': by_ref[ref],
        })
    return out


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument('--book', required=True)
    parser.add_argument('--chapter', type=int)
    parser.add_argument('--output', type=Path, required=True)
    parser.add_argument('--consulted-on', required=True)
    args = parser.parse_args()

    token = os.environ.get('GITHUB_TOKEN')
    if not token:
        raise RuntimeError('GITHUB_TOKEN lipsește')
    validator = load_module(ROOT / 'scripts' / 'check-biblia-emanus.py', 'be_validator')
    manifest = validator.load_json(validator.MANIFEST_PATH)
    paths = validator.validate_manifest(manifest)
    source_data = validator.validate_source_lock(validator.load_json(paths['sourceLock']))
    ledger = validator.validate_ledger(validator.load_json(paths['sourceLedger']), source_data)
    validator.validate_source_coverage(ledger, source_data)

    book_id = args.book
    chapter_ids = [cid for cid in ledger if cid.startswith(book_id + '.')]
    chapters = sorted(int(cid.split('.')[1]) for cid in chapter_ids)
    if args.chapter is not None:
        if args.chapter not in chapters:
            raise RuntimeError(f'Capitol inexistent: {book_id}.{args.chapter}')
        chapters = [args.chapter]

    all_evidence: list[dict[str, Any]] = []
    for chapter in chapters:
        rows, targets = chapter_rows(validator, source_data, book_id, chapter)
        external_texts = fetch_external_benchmarks(book_id, chapter, list(source_data['books'][book_id].get('externalBenchmarkIds', [])))
        feedback = ''
        decisions: list[dict[str, Any]] = []
        for attempt in range(1, 4):
            prompt = make_prompt(rows, external_texts, feedback=feedback)
            payload = {
                'model': MODEL,
                'messages': [
                    {'role': 'system', 'content': 'Răspunde numai cu JSON valid. Nu omite niciun verset și nu inventa text sursă.'},
                    {'role': 'user', 'content': prompt},
                ],
            }
            result = call_model(payload, token)
            decisions, errors = validate_model_output(result, rows)
            if not errors:
                break
            feedback = '; '.join(errors[:20])
            if attempt == 3:
                raise RuntimeError(f'{book_id}.{chapter}: ieșirea modelului nu trece validarea: {feedback}')
        all_evidence.extend(build_evidence_for_chapter(
            validator, source_data, book_id, chapter, decisions, targets, external_texts, args.consulted_on
        ))
        print(f'[nt-final-worker] {book_id}.{chapter}: {len(rows)}/{len(rows)} versete cu dovadă validată local')

    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps({'book': book_id, 'verses': all_evidence}, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(f'[nt-final-worker] {book_id}: {len(all_evidence)} versete')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
