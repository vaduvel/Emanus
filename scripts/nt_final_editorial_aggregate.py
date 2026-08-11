#!/usr/bin/env python3
from __future__ import annotations

import argparse
import importlib.util
import json
import sys
from pathlib import Path
from types import ModuleType
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / 'docs' / 'data' / 'biblia-emanus'
APPROVAL = ROOT / 'docs' / 'biblia-emanus' / 'NT-EDITORIAL-APPROVAL.json'
NT_BOOKS = {
    'MAT','MRK','LUK','JHN','ACT','ROM','1CO','2CO','GAL','EPH','PHP','COL','1TH','2TH',
    '1TI','2TI','TIT','PHM','HEB','JAS','1PE','2PE','1JN','2JN','3JN','JUD','REV',
}


def load_module(path: Path, name: str) -> ModuleType:
    spec = importlib.util.spec_from_file_location(name, path)
    if spec is None or spec.loader is None:
        raise RuntimeError(f'Nu pot încărca {path}')
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument('--evidence-dir', type=Path, required=True)
    parser.add_argument('--approved-on', required=True)
    parser.add_argument('--run-id', required=True)
    parser.add_argument('--reviewer-system', default='GitHub Models openai/gpt-5')
    args = parser.parse_args()

    validator = load_module(ROOT / 'scripts' / 'check-biblia-emanus.py', 'be_validator')
    gate = load_module(ROOT / 'scripts' / 'nt_editorial_gate.py', 'nt_editorial_gate')

    manifest = validator.load_json(validator.MANIFEST_PATH)
    paths = validator.validate_manifest(manifest)
    source_data = validator.validate_source_lock(validator.load_json(paths['sourceLock']))
    ledger = validator.validate_ledger(validator.load_json(paths['sourceLedger']), source_data)
    validator.validate_source_coverage(ledger, source_data)

    files = sorted(args.evidence_dir.glob('*.json'))
    if len(files) != 27:
        raise RuntimeError(f'Sunt necesare 27 artefacte de carte, găsite {len(files)}')

    verses: list[dict[str, Any]] = []
    books_seen: set[str] = set()
    for path in files:
        data = json.loads(path.read_text(encoding='utf-8'))
        book = data.get('book')
        items = data.get('verses')
        if book not in NT_BOOKS or book in books_seen or not isinstance(items, list):
            raise RuntimeError(f'Artefact invalid sau duplicat: {path}')
        books_seen.add(book)
        verses.extend(items)
    if books_seen != NT_BOOKS:
        raise RuntimeError(f'Cărți lipsă: {sorted(NT_BOOKS - books_seen)}')
    if len(verses) != 7941:
        raise RuntimeError(f'Registrul intermediar are {len(verses)} versete, nu 7941')

    target_texts: dict[str, str] = {}
    for chapter_id in ledger:
        book_id = chapter_id.split('.', 1)[0]
        if book_id not in NT_BOOKS:
            continue
        chapter = validator.load_json(DATA / f'{chapter_id}.json')
        for item in chapter['verses']:
            target_texts[f"{book_id}.{chapter['chapter']}.{item['number']}"] = item['text']
    if len(target_texts) != 7941:
        raise RuntimeError(f'Corpusul țintă are {len(target_texts)} versete, nu 7941')

    verses.sort(key=lambda item: (
        int(source_data['books'][item['reference'].split('.')[0]]['order']),
        int(item['reference'].split('.')[1]),
        int(item['reference'].split('.')[2]),
    ))
    refs = [item.get('reference') for item in verses]
    if len(set(refs)) != 7941 or set(refs) != set(target_texts):
        raise RuntimeError('Referințele din artefacte nu acoperă exact corpusul NT')

    corpus_digest = gate.nt_corpus_digest(target_texts, source_data)
    approval = {
        'schemaVersion': 1,
        'status': 'approved',
        'approvedOn': args.approved_on,
        'corpusDigest': corpus_digest,
        'approval': {
            'reviewerId': 'emanus-nt-final-editorial-ai',
            'reviewerType': 'ai',
            'reviewerRole': 'editorial-reviewer',
            'reviewerSystem': args.reviewer_system,
            'reviewerRunId': args.run_id,
            'method': 'verse-by-verse-source-and-romanian-benchmark',
            'declaration': (
                'Fiecare verset din registru a fost evaluat individual față de SBLGNT, baza WEBU și '
                'etaloanele românești declarate; validarea automată respinge omisiunile, ancorele inexistente, '
                'justificările duplicate și orice neconcordanță cu textul românesc curent.'
            ),
        },
        'verses': verses,
    }
    APPROVAL.write_text(json.dumps(approval, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

    resolver = lambda lock_id, book_id, chapter, verse: validator.source_references_for_target(
        lock_id, book_id, chapter, verse, source_data['rules']
    )
    bound_source = gate.bind_source_reference_mapper(source_data, resolver)
    chapters = gate._chapter_map_from_disk(DATA)
    summary = gate.validate_nt_editorial_approval(
        DATA, bound_source, ledger, chapters=chapters, approval_path=APPROVAL
    )
    if summary.verses != 7941 or summary.corpus_digest != corpus_digest:
        raise RuntimeError('Rezumatul gate-ului nu corespunde registrului agregat')
    print(f'[nt-final-aggregate] OK: {summary.verses} versete; {summary.corpus_digest}')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
