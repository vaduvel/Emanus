#!/usr/bin/env python3
"""Create resumable, source-bound OT evidence with an OpenAI-compatible AI API.

This script deliberately fails closed: a malformed response, a missing API key,
or any uncertainty creates no approved record.  The resulting JSONL still must
pass ``check-biblia-emanus-ot-source-evidence.py`` before publication.
"""

from __future__ import annotations

import argparse
import importlib.util
import json
import os
import sys
import urllib.error
import urllib.request
from datetime import date
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
GATE_PATH = Path(__file__).with_name("check-biblia-emanus-ot-source-evidence.py")
SPEC = importlib.util.spec_from_file_location("ot_evidence_gate", GATE_PATH)
assert SPEC and SPEC.loader
GATE = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = GATE
SPEC.loader.exec_module(GATE)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--book", action="append", required=True, choices=[book for book, _ in GATE.CANONICAL_OT_CHAPTERS])
    parser.add_argument("--output", type=Path, required=True, help="Shard JSONL; existing approved rows are preserved.")
    parser.add_argument("--model", required=True, help="Model identifier accepted by the configured provider.")
    parser.add_argument("--base-url", default=os.environ.get("OPENAI_BASE_URL", "https://api.openai.com/v1"))
    parser.add_argument("--api-key-env", default="OPENAI_API_KEY")
    parser.add_argument("--limit", type=int, help="Maximum number of pending verses; useful for a controlled pilot.")
    parser.add_argument("--timeout", type=int, default=180)
    return parser.parse_args()


def prompt(context: Any) -> str:
    return f"""Ești evaluatorul editorial AI pentru Biblia Emanus. Compară direct textul românesc cu ebraica WLC/OSHB și controlul WEBU. Nu inventa sensuri și nu aproba dacă există incertitudine materială.

Evaluează separat: omissions, additions, meaning, names, numbers, negations.
Pentru fiecare categorie, aprobă doar dacă textul românesc păstrează sensul relevant; altfel marchează false. Fiecare justificare trebuie să fie în română, concretă pentru verset, între 8 și 180 caractere. Nu afirma că limbile au formulare identică.

Răspunde exclusiv cu JSON valid, fără markdown, exact în forma:
{{"checks":{{"omissions":{{"approved":true,"rationale":"..."}},"additions":{{"approved":true,"rationale":"..."}},"meaning":{{"approved":true,"rationale":"..."}},"names":{{"approved":true,"rationale":"..."}},"numbers":{{"approved":true,"rationale":"..."}},"negations":{{"approved":true,"rationale":"..."}}}}}}

Referință: {context.reference}
Română: {context.romanian}
Ebraică WLC/OSHB: {context.hebrew_payload}
WEBU: {context.webu_payload}"""


def call_provider(args: argparse.Namespace, api_key: str, context: Any) -> dict[str, Any]:
    endpoint = args.base_url.rstrip("/") + "/chat/completions"
    payload = {
        "model": args.model,
        "temperature": 0,
        "response_format": {"type": "json_object"},
        "messages": [
            {"role": "system", "content": "Răspunde numai cu obiect JSON valid."},
            {"role": "user", "content": prompt(context)},
        ],
    }
    request = urllib.request.Request(
        endpoint,
        data=json.dumps(payload, ensure_ascii=False).encode("utf-8"),
        headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
    )
    try:
        with urllib.request.urlopen(request, timeout=args.timeout) as response:
            body = json.loads(response.read())
    except urllib.error.HTTPError as error:
        detail = error.read().decode("utf-8", errors="replace")[:500]
        raise RuntimeError(f"provider HTTP {error.code}: {detail}") from error
    except urllib.error.URLError as error:
        raise RuntimeError(f"provider indisponibil: {error.reason}") from error
    try:
        content = body["choices"][0]["message"]["content"]
        parsed = json.loads(content)
    except (KeyError, IndexError, TypeError, json.JSONDecodeError) as error:
        raise RuntimeError("providerul nu a returnat JSON-ul cerut") from error
    if not isinstance(parsed, dict):
        raise RuntimeError("providerul nu a returnat obiect JSON")
    return parsed


def record(context: Any, verdict: dict[str, Any], reviewer_id: str) -> dict[str, Any]:
    supplied = verdict.get("checks")
    if not isinstance(supplied, dict):
        raise RuntimeError(f"{context.reference}: lipsesc controalele")
    texts = {
        "romanian": {"sha256": GATE.text_digest(context.romanian)},
        "hebrew": {"lockId": context.hebrew_lock_id, "references": list(context.hebrew_references), "sha256": GATE.text_digest(context.hebrew_payload)},
        "webu": {"lockId": context.webu_lock_id, "references": list(context.webu_references), "sha256": GATE.text_digest(context.webu_payload)},
    }
    checks: dict[str, dict[str, str]] = {}
    for name in GATE.CHECK_NAMES:
        item = supplied.get(name)
        if not isinstance(item, dict) or item.get("approved") is not True:
            raise RuntimeError(f"{context.reference}: {name} nu este aprobat explicit")
        rationale = item.get("rationale")
        if not isinstance(rationale, str) or not 8 <= len(rationale.strip()) <= 180:
            raise RuntimeError(f"{context.reference}: justificare invalidă pentru {name}")
        checks[name] = {
            "verdict": "approved",
            "finding": "none" if name in {"omissions", "additions"} else "preserved",
            "rationale": rationale.strip(),
        }
    result: dict[str, Any] = {
        "schemaVersion": 1,
        "recordType": GATE.RECORD_TYPE,
        "reference": context.reference,
        "texts": texts,
        "bindingSha256": GATE.binding_digest(context.reference, texts),
        "checks": checks,
        "status": "approved",
        "review": {
            "method": GATE.REVIEW_METHOD,
            "reviewerId": reviewer_id,
            "reviewedAt": date.today().isoformat(),
        },
    }
    result["recordSha256"] = GATE.record_digest(result)
    return result


def existing_references(path: Path) -> set[str]:
    if not path.exists():
        return set()
    references: set[str] = set()
    for line_number, line in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
        if not line.strip():
            continue
        row = json.loads(line)
        reference = row.get("reference") if isinstance(row, dict) else None
        if not isinstance(reference, str) or reference in references:
            raise RuntimeError(f"{path}:{line_number}: shard invalid sau duplicat")
        references.add(reference)
    return references


def main() -> int:
    args = parse_args()
    if args.limit is not None and args.limit < 1:
        raise SystemExit("--limit trebuie să fie pozitiv")
    api_key = os.environ.get(args.api_key_env)
    if not api_key:
        raise SystemExit(f"lipsește cheia API în variabila {args.api_key_env}")
    data = ROOT / GATE.DATA_RELATIVE_PATH
    lock = GATE.load_json_object(data / "source-lock.json", "source-lock.json")
    ledger = GATE.load_json_object(data / "source-ledger.json", "source-ledger.json")
    requested = set(args.book)
    contexts = [
        context for context in GATE._build_contexts(
            data, lock, GATE._load_target_verses(data, lock, ledger, GATE.PRODUCTION_CONTRACT)
        ) if context.reference.split(".", 1)[0] in requested
    ]
    done = existing_references(args.output)
    pending = [context for context in contexts if context.reference not in done]
    if args.limit is not None:
        pending = pending[:args.limit]
    args.output.parent.mkdir(parents=True, exist_ok=True)
    reviewer_id = f"openai-compatible-{args.model}-per-verse-v1"
    with args.output.open("a", encoding="utf-8") as output:
        for index, context in enumerate(pending, 1):
            verdict = call_provider(args, api_key, context)
            result = record(context, verdict, reviewer_id)
            output.write(json.dumps(result, ensure_ascii=False, sort_keys=True) + "\n")
            output.flush()
            print(f"{index}/{len(pending)} {context.reference} approved", flush=True)
    print(f"[ot-openai-review] OK: {len(pending)} versete evaluate; shard={args.output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
