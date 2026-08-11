#!/usr/bin/env python3
from __future__ import annotations

import argparse
import importlib.util
import json
import os
import subprocess
import tempfile
from pathlib import Path
from types import ModuleType
from typing import Any, Mapping

ROOT = Path(__file__).resolve().parents[1]
WORKER_PATH = ROOT / "scripts" / "nt_final_editorial_worker.py"
VALIDATOR_PATH = ROOT / "scripts" / "check-biblia-emanus.py"
DEFAULT_CODEX = Path("/Applications/ChatGPT.app/Contents/Resources/codex")


def load_module(path: Path, name: str) -> ModuleType:
    spec = importlib.util.spec_from_file_location(name, path)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Nu pot incarca {path}")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def output_schema(count: int) -> dict[str, Any]:
    item_properties = {
        "reference": {"type": "string"},
        "sourceAnchor": {"type": "string"},
        "targetAnchor": {"type": "string"},
        "sourceRationale": {"type": "string"},
        "romanianRationale": {"type": "string"},
        "semanticRationale": {"type": "string"},
        "issue": {"type": ["string", "null"]},
        "suggestedText": {"type": ["string", "null"]},
    }
    return {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "type": "object",
        "additionalProperties": False,
        "required": ["verses"],
        "properties": {
            "verses": {
                "type": "array",
                "minItems": count,
                "maxItems": count,
                "items": {
                    "type": "object",
                    "additionalProperties": False,
                    "required": list(item_properties),
                    "properties": item_properties,
                },
            }
        },
    }


def compact_prompt(worker: ModuleType, rows: list[dict[str, Any]], external: Mapping[str, Mapping[str, str]]) -> str:
    base = worker.make_prompt(rows, external)
    return base + """

CERINTA FINALA FAIL-CLOSED:
- include mereu campurile issue si suggestedText;
- pune null in ambele numai daca textul romanesc este fidel semantic, complet si natural;
- daca exista omisiune, adaos, negatie, raport sintactic, sens lexical sau romana material gresita,
  issue descrie precis defectul, iar suggestedText contine versetul complet corectat independent;
- o preferinta pur stilistica nu este issue;
- nu aproba din inertie si nu copia etaloanele romanesti.
- ghilimelele pot incepe intr-un verset si se pot inchide in altul; foloseste contextBefore,
  contextAfter si quoteDepthBefore/quoteDepthAfterCurrent inainte sa semnalezi punctuatia;
- succesiunea »” poate fi corecta atunci cand prima ghilimea inchide citatul interior, iar a doua
  inchide discursul exterior. Nu cere inchiderea la capatul fiecarui verset.
"""


def enrich_quote_context(rows: list[dict[str, Any]]) -> None:
    outer_depth = 0
    inner_depth = 0
    for index, row in enumerate(rows):
        row["contextBefore"] = [
            {"reference": item["reference"], "target": item["target"]}
            for item in rows[max(0, index - 2):index]
        ]
        row["contextAfter"] = [
            {"reference": item["reference"], "target": item["target"]}
            for item in rows[index + 1:index + 3]
        ]
        row["quoteDepthBefore"] = {"outer": outer_depth, "inner": inner_depth}
        target = row["target"]
        outer_depth += target.count("„") - target.count("”")
        inner_depth += target.count("«") - target.count("»")
        row["quoteDepthAfterCurrent"] = {"outer": outer_depth, "inner": inner_depth}


def review_chunk(
    worker: ModuleType,
    rows: list[dict[str, Any]],
    external: Mapping[str, Mapping[str, str]],
    *,
    model: str,
    effort: str,
    codex: Path,
    retries: int,
) -> tuple[list[dict[str, Any]], list[dict[str, Any]]]:
    prompt = compact_prompt(worker, rows, external)
    last_error: RuntimeError | None = None
    for attempt in range(retries + 1):
        result = call_codex(prompt, output_schema(len(rows)), model=model, effort=effort, codex=codex)
        try:
            return validate_review(worker, result, rows)
        except RuntimeError as error:
            last_error = error
            if attempt == retries:
                break
            prompt += f"""

IESIREA ANTERIOARA A FOST RESPINSA DE VALIDATOR:
{error}
Refa toate randurile in aceeasi ordine. sourceAnchor trebuie copiat caracter cu caracter din
campul source al versetului sau lasat ca fragment grec exact, iar targetAnchor trebuie copiat
caracter cu caracter din target. Nu parafraza ancorele.
"""
    assert last_error is not None
    raise last_error


def call_codex(prompt: str, schema: Mapping[str, Any], *, model: str, effort: str, codex: Path) -> dict[str, Any]:
    if not codex.exists():
        raise RuntimeError(f"Codex CLI nu exista la {codex}")
    with tempfile.TemporaryDirectory(prefix="emanus-nt-codex-") as tmp:
        tmp_path = Path(tmp)
        schema_path = tmp_path / "schema.json"
        output_path = tmp_path / "output.json"
        schema_path.write_text(json.dumps(schema, ensure_ascii=False), encoding="utf-8")
        command = [
            str(codex), "exec", "--ephemeral", "--ignore-user-config", "--ignore-rules",
            "-m", model, "-c", f'model_reasoning_effort="{effort}"', "-s", "read-only",
            "--output-schema", str(schema_path), "-o", str(output_path), "-",
        ]
        completed = subprocess.run(
            command,
            cwd=ROOT,
            input=prompt,
            text=True,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.PIPE,
            timeout=900,
            check=False,
        )
        if completed.returncode != 0:
            tail = "\n".join(completed.stderr.splitlines()[-30:])
            raise RuntimeError(f"Codex CLI a iesit cu {completed.returncode}:\n{tail}")
        if not output_path.exists():
            raise RuntimeError("Codex CLI nu a produs fisierul JSON")
        return json.loads(output_path.read_text(encoding="utf-8"))


def validate_review(
    worker: ModuleType,
    result: Mapping[str, Any],
    rows: list[dict[str, Any]],
) -> tuple[list[dict[str, Any]], list[dict[str, Any]]]:
    items = result.get("verses")
    if not isinstance(items, list):
        raise RuntimeError("Iesirea Codex nu contine verses[]")
    expected = [row["reference"] for row in rows]
    received = [item.get("reference") if isinstance(item, Mapping) else None for item in items]
    if received != expected:
        raise RuntimeError(f"Ordinea/referintele nu corespund: expected={expected}, got={received}")

    row_by_ref = {row["reference"]: row for row in rows}
    approved: list[dict[str, Any]] = []
    issues: list[dict[str, Any]] = []
    for raw in items:
        item = dict(raw)
        ref = item["reference"]
        issue = item.get("issue")
        if issue:
            suggestion = item.get("suggestedText")
            if not isinstance(suggestion, str) or not suggestion.strip() or suggestion.strip() == row_by_ref[ref]["target"].strip():
                raise RuntimeError(f"{ref}: issue fara suggestedText utilizabil")
            issues.append({
                "reference": ref,
                "currentText": row_by_ref[ref]["target"],
                "issue": issue,
                "suggestedText": suggestion,
                "sourceAnchor": item.get("sourceAnchor"),
                "semanticRationale": item.get("semanticRationale"),
            })
            continue

        sanitized = {key: value for key, value in item.items() if key not in {"issue", "suggestedText"}}
        validated, errors = worker.validate_model_output({"verses": [sanitized]}, [row_by_ref[ref]])
        if errors or len(validated) != 1:
            raise RuntimeError(f"{ref}: dovada Codex invalida: {'; '.join(errors)}")
        approved.extend(validated)
    return approved, issues


def write_checkpoint(
    output: Path,
    issues_output: Path,
    book: str,
    evidence_by_ref: Mapping[str, dict[str, Any]],
    issues_by_ref: Mapping[str, dict[str, Any]],
    total: int,
) -> None:
    def order(reference: str) -> tuple[int, int]:
        _book, chapter, verse = reference.split(".")
        return int(chapter), int(verse)

    evidence = [evidence_by_ref[ref] for ref in sorted(evidence_by_ref, key=order)]
    issues = [issues_by_ref[ref] for ref in sorted(issues_by_ref, key=order)]
    output.parent.mkdir(parents=True, exist_ok=True)
    issues_output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps({"book": book, "verses": evidence}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    issues_output.write_text(json.dumps({
        "book": book,
        "status": "blocked" if issues else ("clean" if len(evidence) == total else "in_progress"),
        "total": total,
        "reviewed": len(evidence) + len(issues),
        "approved": len(evidence),
        "issues": issues,
    }, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--book", required=True)
    parser.add_argument("--chapter", type=int)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--issues-output", type=Path, required=True)
    parser.add_argument("--consulted-on", required=True)
    parser.add_argument("--chunk-size", type=int, default=int(os.environ.get("NT_FINAL_CODEX_CHUNK_SIZE", "25")))
    parser.add_argument("--model", default=os.environ.get("NT_FINAL_CODEX_MODEL", "gpt-5.6-sol"))
    parser.add_argument("--effort", default=os.environ.get("NT_FINAL_CODEX_EFFORT", "high"))
    parser.add_argument("--codex", type=Path, default=Path(os.environ.get("CODEX_CLI_PATH", DEFAULT_CODEX)))
    parser.add_argument("--resume", action="store_true")
    parser.add_argument("--retries", type=int, default=2)
    args = parser.parse_args()

    validator = load_module(VALIDATOR_PATH, "be_validator")
    worker = load_module(WORKER_PATH, "nt_final_worker")
    manifest = validator.load_json(validator.MANIFEST_PATH)
    paths = validator.validate_manifest(manifest)
    source_data = validator.validate_source_lock(validator.load_json(paths["sourceLock"]))
    ledger = validator.validate_ledger(validator.load_json(paths["sourceLedger"]), source_data)
    validator.validate_source_coverage(ledger, source_data)

    chapter_ids = [chapter_id for chapter_id in ledger if chapter_id.startswith(args.book + ".")]
    chapters = sorted(int(chapter_id.split(".")[1]) for chapter_id in chapter_ids)
    if args.chapter is not None:
        if args.chapter not in chapters:
            raise RuntimeError(f"Capitol inexistent: {args.book}.{args.chapter}")
        chapters = [args.chapter]

    total = sum(len(validator.load_json(ROOT / "docs" / "data" / "biblia-emanus" / f"{chapter_id}.json")["verses"]) for chapter_id in chapter_ids)
    if args.chapter is not None:
        total = len(validator.load_json(ROOT / "docs" / "data" / "biblia-emanus" / f"{args.book}.{args.chapter}.json")["verses"])

    evidence_by_ref: dict[str, dict[str, Any]] = {}
    issues_by_ref: dict[str, dict[str, Any]] = {}
    if args.resume and args.output.exists():
        existing = json.loads(args.output.read_text(encoding="utf-8"))
        evidence_by_ref = {item["reference"]: item for item in existing.get("verses", [])}
    if args.resume and args.issues_output.exists():
        existing = json.loads(args.issues_output.read_text(encoding="utf-8"))
        issues_by_ref = {item["reference"]: item for item in existing.get("issues", [])}

    for chapter in chapters:
        rows, targets = worker.chapter_rows(validator, source_data, args.book, chapter)
        enrich_quote_context(rows)
        pending: list[dict[str, Any]] = []
        for row in rows:
            ref = row["reference"]
            approved = evidence_by_ref.get(ref)
            if approved and approved.get("textDigest") == worker.sha256_text(row["target"]):
                continue
            issue = issues_by_ref.get(ref)
            if issue and issue.get("currentText") == row["target"]:
                continue
            evidence_by_ref.pop(ref, None)
            issues_by_ref.pop(ref, None)
            pending.append(row)
        if not pending:
            print(f"[nt-final-codex] {args.book}.{chapter}: checkpoint curent, nimic de refacut", flush=True)
            continue

        external = worker.fetch_external_benchmarks(
            args.book, chapter, list(source_data["books"][args.book].get("externalBenchmarkIds", []))
        )
        for start in range(0, len(pending), args.chunk_size):
            chunk = pending[start:start + args.chunk_size]
            approved, issues = review_chunk(
                worker, chunk, external,
                model=args.model, effort=args.effort, codex=args.codex, retries=args.retries,
            )
            approved_refs = {item["reference"] for item in approved}
            approved_targets = {
                verse: text for verse, text in targets.items()
                if f"{args.book}.{chapter}.{verse}" in approved_refs
            }
            if approved_targets:
                built = worker.build_evidence_for_chapter(
                    validator, source_data, args.book, chapter, approved,
                    approved_targets, external, args.consulted_on,
                )
                evidence_by_ref.update({item["reference"]: item for item in built})
            for issue in issues:
                issues_by_ref[issue["reference"]] = issue
                evidence_by_ref.pop(issue["reference"], None)
            write_checkpoint(args.output, args.issues_output, args.book, evidence_by_ref, issues_by_ref, total)
            print(
                f"[nt-final-codex] {args.book}.{chapter} {start + 1}-{start + len(chunk)}/{len(pending)}: "
                f"{len(approved)} aprobate, {len(issues)} probleme",
                flush=True,
            )

    write_checkpoint(args.output, args.issues_output, args.book, evidence_by_ref, issues_by_ref, total)
    print(f"[nt-final-codex] {args.book}: {len(evidence_by_ref) + len(issues_by_ref)} revizuite / {len(evidence_by_ref)} aprobate / {len(issues_by_ref)} probleme")
    return 2 if issues_by_ref else (0 if len(evidence_by_ref) == total else 3)


if __name__ == "__main__":
    raise SystemExit(main())
