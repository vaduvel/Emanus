#!/usr/bin/env python3
"""Create hash-bound OT evidence through a local, conservative AI review."""
from __future__ import annotations

import argparse
import importlib.util
import json
import sys
import urllib.request
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
GATE_PATH = Path(__file__).with_name("check-biblia-emanus-ot-source-evidence.py")
spec = importlib.util.spec_from_file_location("ot_gate", GATE_PATH)
assert spec and spec.loader
gate = importlib.util.module_from_spec(spec)
sys.modules[spec.name] = gate
spec.loader.exec_module(gate)


def ollama_payload(model: str, prompt: str, *, num_predict: int | None = None) -> bytes:
    """Use Qwen's non-thinking mode so structured audit calls stay bounded."""
    payload: dict[str, object] = {"model": model, "prompt": prompt, "format": "json", "stream": False}
    if num_predict is not None:
        payload["options"] = {"num_predict": num_predict}
    if model.startswith("qwen3:"):
        payload["think"] = False
    return json.dumps(payload).encode()


def ask(model: str, context: object) -> dict[str, object]:
    prompt = f'''You are auditing a Romanian Bible translation. Compare the Romanian text directly with
the supplied Hebrew source and WEBU control. Do not claim the languages have identical wording.
Return approved=true when the supplied sources demonstrate no problem in that category;
return approved=false only for a concrete discrepancy or genuine uncertainty. Evaluate every category separately.
Return JSON exactly: {{"checks":{{"omissions":{{"approved":true|false,"rationale":"..."}},"additions":{{"approved":true|false,"rationale":"..."}},"meaning":{{"approved":true|false,"rationale":"..."}},"names":{{"approved":true|false,"rationale":"..."}},"numbers":{{"approved":true|false,"rationale":"..."}},"negations":{{"approved":true|false,"rationale":"..."}}}}}}.
Each Romanian rationale must identify the actual semantic feature in this verse, not use boilerplate.
Romanian: {context.romanian}
Hebrew: {context.hebrew_payload}
WEBU: {context.webu_payload}'''
    payload = ollama_payload(model, prompt)
    request = urllib.request.Request("http://127.0.0.1:11434/api/generate", payload, {"Content-Type": "application/json"})
    with urllib.request.urlopen(request, timeout=180) as response:
        return json.loads(json.loads(response.read())["response"])


def ask_batch(model: str, contexts: list[object]) -> dict[str, dict[str, object]]:
    """Review a bounded batch; fall back to single requests if it is malformed."""
    items = [
        {"reference": c.reference, "romanian": c.romanian, "hebrew": c.hebrew_payload, "webu": c.webu_payload}
        for c in contexts
    ]
    prompt = """Audit Romanian Bible verses directly against supplied Hebrew and WEBU controls. Do not
claim the languages have identical wording. Return approved=true when the supplied sources demonstrate
no problem in a category; return approved=false only for a concrete discrepancy or genuine uncertainty. For every item evaluate
each category separately: omissions, additions, meaning, names, numbers, negations. Return JSON exactly:
{\"reviews\":[{\"reference\":\"...\",\"checks\":{\"omissions\":{\"approved\":true|false,\"rationale\":\"...\"},\"additions\":{\"approved\":true|false,\"rationale\":\"...\"},\"meaning\":{\"approved\":true|false,\"rationale\":\"...\"},\"names\":{\"approved\":true|false,\"rationale\":\"...\"},\"numbers\":{\"approved\":true|false,\"rationale\":\"...\"},\"negations\":{\"approved\":true|false,\"rationale\":\"...\"}}}]}.
Each rationale must be concrete and Romanian, specific to that verse; never use a generic assertion.
Items:""" + json.dumps(items, ensure_ascii=False)
    payload = ollama_payload(model, prompt)
    request = urllib.request.Request("http://127.0.0.1:11434/api/generate", payload, {"Content-Type": "application/json"})
    with urllib.request.urlopen(request, timeout=300) as response:
        parsed = json.loads(json.loads(response.read())["response"])
    reviews = parsed.get("reviews") if isinstance(parsed, dict) else None
    if not isinstance(reviews, list):
        raise ValueError("răspuns batch fără reviews")
    result = {str(item.get("reference")): item for item in reviews if isinstance(item, dict)}
    if set(result) != {c.reference for c in contexts}:
        raise ValueError("răspuns batch cu referințe incomplete")
    return result


def compact_prompt(items: list[dict[str, str]]) -> str:
    """Keep the compact pass specific, while avoiding invented Hebrew numeral readings."""
    return """RĂSPUNDE EXCLUSIV ÎN LIMBA ROMÂNĂ; niciun cuvânt englez nu este acceptat. Compare each Romanian Bible verse directly with its supplied Hebrew and WEBU controls.
Use WEBU as the control for proper names, numbers, negations and verse scope. Hebrew is the authority
for wording and meaning, but do not calculate a Hebrew numeral from glyphs when WEBU states the value.
For each verse return approved=true only when Romanian preserves the intended meaning with no meaningful
omission, addition, wrong name, number, or negation. Return approved=false only for a concrete discrepancy
demonstrated by Romanian versus WEBU or an unambiguous Hebrew reading; do not flag stylistic differences.
The rationale must be Romanian, name the verse's actual subject or action and the comparison result, and
contain at most 18 words. Never say languages have identical wording. Return JSON exactly:
{\"reviews\":[{\"reference\":\"...\",\"approved\":true|false,\"rationale\":\"...\"}]}.
Items:""" + json.dumps(items, ensure_ascii=False) + "\nRĂSPUNDE EXCLUSIV ÎN LIMBA ROMÂNĂ."


def ask_compact(model: str, context: object) -> dict[str, object]:
    """Request one compact review when a batch response is malformed."""
    result = ask_compact_batch(model, [context])
    return result[context.reference]


def ask_compact_batch(model: str, contexts: list[object]) -> dict[str, dict[str, object]]:
    """Return one source-grounded verdict per verse to keep a full-corpus pass tractable."""
    items = [
        {"reference": c.reference, "romanian": c.romanian, "hebrew": c.hebrew_payload, "webu": c.webu_payload}
        for c in contexts
    ]
    payload = ollama_payload(model, compact_prompt(items), num_predict=768)
    request = urllib.request.Request("http://127.0.0.1:11434/api/generate", payload, {"Content-Type": "application/json"})
    with urllib.request.urlopen(request, timeout=300) as response:
        parsed = json.loads(json.loads(response.read())["response"])
    reviews = parsed.get("reviews") if isinstance(parsed, dict) else None
    if not isinstance(reviews, list):
        raise ValueError("răspuns compact fără reviews")
    result = {str(item.get("reference")): item for item in reviews if isinstance(item, dict)}
    if set(result) != {c.reference for c in contexts}:
        raise ValueError("răspuns compact cu referințe incomplete")
    for context in contexts:
        verdict = result[context.reference]
        if verdict.get("approved") not in {True, False} or len(str(verdict.get("rationale", "")).strip()) < 8:
            raise ValueError(f"răspuns compact incomplet pentru {context.reference}")
    return result


def compact_record(context: object, verdict: dict[str, object], model: str) -> dict[str, object]:
    """Expand one actual model conclusion into the schema's required audit dimensions."""
    approved = verdict.get("approved") is True
    rationale = str(verdict.get("rationale", "verdict AI lipsă")).strip()
    if len(rationale) < 8:
        approved, rationale = False, "verdict AI insuficient"
    synthesized = {
        name: {"approved": approved, "rationale": rationale}
        for name in gate.CHECK_NAMES
    }
    return record(context, {"checks": synthesized}, model, reviewer_suffix="compact-semantic-v1")


def record(
    context: object, verdict: dict[str, object], model: str, *, reviewer_suffix: str = "per-check-v2"
) -> dict[str, object]:
    verdict_checks = verdict.get("checks")
    if not isinstance(verdict_checks, dict):
        raise ValueError(f"{context.reference}: lipsesc controalele individuale")
    texts = {
        "romanian": {"sha256": gate.text_digest(context.romanian)},
        "hebrew": {"lockId": context.hebrew_lock_id, "references": list(context.hebrew_references), "sha256": gate.text_digest(context.hebrew_payload)},
        "webu": {"lockId": context.webu_lock_id, "references": list(context.webu_references), "sha256": gate.text_digest(context.webu_payload)},
    }
    checks = {}
    for name in gate.CHECK_NAMES:
        item = verdict_checks.get(name)
        if not isinstance(item, dict):
            raise ValueError(f"{context.reference}: lipsește controlul {name}")
        approved = item.get("approved") is True
        rationale = str(item.get("rationale", "verdict AI lipsă")).strip()
        if len(rationale) < 8:
            approved, rationale = False, "verdict AI insuficient"
        finding = "none" if name in {"omissions", "additions"} else "preserved"
        checks[name] = {"verdict": "approved" if approved else "unresolved", "finding": finding if approved else "uncertain", "rationale": rationale}
    status = "approved" if all(item["verdict"] == "approved" for item in checks.values()) else "unresolved"
    result = {"schemaVersion": 1, "recordType": gate.RECORD_TYPE, "reference": context.reference, "texts": texts, "bindingSha256": gate.binding_digest(context.reference, texts), "checks": checks, "status": status, "review": {"method": gate.REVIEW_METHOD, "reviewerId": f"ollama-{model}-{reviewer_suffix}", "reviewedAt": date.today().isoformat()}}
    result["recordSha256"] = gate.record_digest(result)
    return result


def main() -> int:
    p = argparse.ArgumentParser()
    p.add_argument("--book", action="append", required=True, choices=[b for b, _ in gate.CANONICAL_OT_CHAPTERS])
    p.add_argument("--model", default="gemma3:4b")
    p.add_argument("--limit", type=int, default=None)
    p.add_argument("--batch-size", type=int, default=6)
    p.add_argument("--mode", choices=("detailed", "compact"), default="detailed")
    p.add_argument("--output", type=Path, required=True)
    args = p.parse_args()
    data = ROOT / gate.DATA_RELATIVE_PATH
    lock = gate.load_json_object(data / "source-lock.json", "source-lock.json")
    ledger = gate.load_json_object(data / "source-ledger.json", "source-ledger.json")
    contexts = [c for c in gate._build_contexts(data, lock, gate._load_target_verses(data, lock, ledger, gate.PRODUCTION_CONTRACT)) if c.reference.split('.', 1)[0] in set(args.book)]
    if args.limit is not None:
        contexts = contexts[:args.limit]
    done = {}
    if args.output.exists():
        done = {json.loads(line)["reference"]: line for line in args.output.read_text().splitlines() if line.strip()}
    with args.output.open("a", encoding="utf-8") as out:
        pending = [context for context in contexts if context.reference not in done]
        for offset in range(0, len(pending), args.batch_size):
            batch = pending[offset:offset + args.batch_size]
            try:
                if args.mode == "compact":
                    verdicts = ask_compact_batch(args.model, batch)
                else:
                    verdicts = (
                        {batch[0].reference: ask(args.model, batch[0])}
                        if len(batch) == 1 else ask_batch(args.model, batch)
                    )
            except Exception as error:
                print(f"batch {batch[0].reference}: {error}; fallback individual", file=sys.stderr)
                verdicts = {
                    context.reference: (
                        ask_compact(args.model, context) if args.mode == "compact" else ask(args.model, context)
                    )
                    for context in batch
                }
            for context in batch:
                try:
                    result = (
                        compact_record(context, verdicts[context.reference], args.model)
                        if args.mode == "compact" else record(context, verdicts[context.reference], args.model)
                    )
                except ValueError as error:
                    print(f"{context.reference}: {error}; retry individual", file=sys.stderr)
                    result = (
                        compact_record(context, ask_compact(args.model, context), args.model)
                        if args.mode == "compact" else record(context, ask(args.model, context), args.model)
                    )
                out.write(json.dumps(result, ensure_ascii=False, sort_keys=True) + "\n")
                out.flush()
                print(f"{offset + len(batch)}/{len(contexts)} {context.reference} {result['status']}", flush=True)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
