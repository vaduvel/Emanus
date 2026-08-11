#!/usr/bin/env python3
"""Generate the runtime catalog for Biblia Emanus NT behind an editorial gate.

The raw NT materialization is deliberately not imported by the application until
the canonical per-verse editorial approval passes again and binds the exact
current materialization through independent digests.
"""

from __future__ import annotations

import argparse
import datetime as dt
import hashlib
import importlib.util
import json
import sys
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
MANIFEST_PATH = ROOT / "docs" / "biblia-emanus" / "NT-RUNTIME-CATALOG.json"
CORPUS_PATH = ROOT / "packages" / "shared" / "src" / "bible" / "bibliaEmanusNt.generated.ts"
OUTPUT_PATH = ROOT / "packages" / "shared" / "src" / "bible" / "bibliaEmanusNtCatalog.generated.ts"
SHARED_BIBLE_DIR = ROOT / "packages" / "shared" / "src" / "bible"

EXPECTED_SCOPE = {"books": 27, "chapters": 260, "verses": 7941}
HEX_DIGEST_LENGTH = 64


class RuntimeCatalogError(Exception):
    pass


class CanonicalEditorialApproval:
    """Facts the runtime gate receives from the canonical review."""

    __slots__ = ("corpus_digest", "approval_path")

    def __init__(self, corpus_digest: str, approval_path: Path) -> None:
        self.corpus_digest = corpus_digest
        self.approval_path = approval_path


def load_json(path: Path) -> dict[str, Any]:
    try:
        value = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as error:
        raise RuntimeCatalogError(f"Nu pot citi {path}: {error}") from error
    if not isinstance(value, dict):
        raise RuntimeCatalogError(f"{path}: rădăcina trebuie să fie obiect JSON")
    return value


def sha256_file(path: Path) -> str:
    try:
        return hashlib.sha256(path.read_bytes()).hexdigest()
    except OSError as error:
        raise RuntimeCatalogError(f"Nu pot calcula digestul pentru {path}: {error}") from error


def require_string(value: object, label: str) -> str:
    if not isinstance(value, str) or not value.strip():
        raise RuntimeCatalogError(f"{label}: trebuie să fie un şir nevid")
    return value


def require_sha256(value: object, label: str) -> str:
    digest = require_string(value, label)
    if len(digest) != HEX_DIGEST_LENGTH or any(char not in "0123456789abcdef" for char in digest.lower()):
        raise RuntimeCatalogError(f"{label}: trebuie să fie un SHA-256 hexazecimal")
    return digest.lower()


def require_editorial_corpus_digest(value: object, label: str) -> str:
    """Validate the ``sha256:<hex>`` digest emitted by the editorial gate."""
    digest = require_string(value, label)
    prefix = "sha256:"
    if not digest.startswith(prefix):
        raise RuntimeCatalogError(f"{label}: trebuie să fie un digest sha256:<hex>")
    return prefix + require_sha256(digest[len(prefix):], label)


def evidence_path(root: Path, relative_path: str) -> Path:
    candidate = (root / relative_path).resolve()
    try:
        candidate.relative_to(root.resolve())
    except ValueError as error:
        raise RuntimeCatalogError("dovada editorială trebuie să rămână în repository") from error
    if not candidate.is_file():
        raise RuntimeCatalogError(f"dovada editorială lipseşte: {relative_path}")
    return candidate


def validate_review_scope(value: object) -> dict[str, int]:
    if not isinstance(value, dict) or set(value) != set(EXPECTED_SCOPE):
        raise RuntimeCatalogError(
            "approval.reviewScope trebuie să confirme exact 27 cărţi, 260 capitole şi 7941 versete"
        )
    for key, expected in EXPECTED_SCOPE.items():
        actual = value.get(key)
        if type(actual) is not int or actual != expected:
            raise RuntimeCatalogError(
                "approval.reviewScope trebuie să confirme exact 27 cărţi, 260 capitole şi 7941 versete"
            )
    return dict(EXPECTED_SCOPE)


def validate_approval(
    approval: object,
    *,
    root: Path,
    corpus_path: Path,
) -> dict[str, Any]:
    if not isinstance(approval, dict):
        raise RuntimeCatalogError("approval: este obligatoriu pentru un catalog aprobat")

    release_id = require_string(approval.get("releaseId"), "approval.releaseId")
    approved_at = require_string(approval.get("approvedAt"), "approval.approvedAt")
    try:
        dt.date.fromisoformat(approved_at)
    except ValueError as error:
        raise RuntimeCatalogError("approval.approvedAt: trebuie să fie data ISO YYYY-MM-DD") from error

    approved_by = approval.get("approvedBy")
    if not isinstance(approved_by, list) or not approved_by or not all(
        isinstance(reviewer, str) and reviewer.strip() for reviewer in approved_by
    ):
        raise RuntimeCatalogError("approval.approvedBy: este necesar cel puţin un semnatar editorial")

    declared_digest = require_sha256(approval.get("corpusSha256"), "approval.corpusSha256")
    actual_digest = sha256_file(corpus_path)
    if declared_digest != actual_digest:
        raise RuntimeCatalogError(
            "approval.corpusSha256 nu corespunde corpusului materializat; aprobarea nu poate fi reutilizată"
        )
    editorial_corpus_digest = require_editorial_corpus_digest(
        approval.get("editorialCorpusDigest"), "approval.editorialCorpusDigest"
    )

    scope = validate_review_scope(approval.get("reviewScope"))

    evidence = approval.get("evidence")
    if not isinstance(evidence, list) or not evidence:
        raise RuntimeCatalogError("approval.evidence: este necesară cel puţin o dovadă editorială fixată")
    normalized_evidence: list[dict[str, str]] = []
    for index, item in enumerate(evidence):
        if not isinstance(item, dict):
            raise RuntimeCatalogError(f"approval.evidence[{index}]: trebuie să fie obiect")
        kind = require_string(item.get("kind"), f"approval.evidence[{index}].kind")
        relative_path = require_string(item.get("path"), f"approval.evidence[{index}].path")
        declared_evidence_digest = require_sha256(
            item.get("sha256"), f"approval.evidence[{index}].sha256"
        )
        actual_evidence_digest = sha256_file(evidence_path(root, relative_path))
        if declared_evidence_digest != actual_evidence_digest:
            raise RuntimeCatalogError(
                f"approval.evidence[{index}]: digestul nu corespunde fişierului fixat"
            )
        normalized_evidence.append(
            {"kind": kind, "path": relative_path, "sha256": declared_evidence_digest}
        )

    return {
        "releaseId": release_id,
        "approvedAt": approved_at,
        "approvedBy": approved_by,
        "corpusSha256": declared_digest,
        "editorialCorpusDigest": editorial_corpus_digest,
        "evidence": normalized_evidence,
        "reviewScope": scope,
    }


def load_python_module(name: str, path: Path) -> Any:
    spec = importlib.util.spec_from_file_location(name, path)
    if spec is None or spec.loader is None:
        raise RuntimeCatalogError(f"Nu pot încărca {path.name}")
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module


def validate_canonical_nt_editorial_approval(
    root: Path = ROOT,
) -> CanonicalEditorialApproval:
    """Run the sole NT editorial authority against the current source corpus.

    ``NT-RUNTIME-CATALOG.json`` is only a delivery switch.  It is not allowed
    to become an alternate approval registry: a future approved switch must
    re-run the canonical per-verse validator with the source lock, ledger and
    chapter files that are present in this checkout.
    """
    validator = load_python_module(
        "biblia_emanus_validator_for_runtime_catalog",
        root / "scripts" / "check-biblia-emanus.py",
    )
    gate = load_python_module(
        "nt_editorial_gate_for_runtime_catalog",
        root / "scripts" / "nt_editorial_gate.py",
    )
    data_dir = root / "docs" / "data" / "biblia-emanus"
    approval_path = root / "docs" / "biblia-emanus" / "NT-EDITORIAL-APPROVAL.json"
    original_data_dir = validator.DATA_DIR
    original_manifest_path = validator.MANIFEST_PATH
    validator.DATA_DIR = data_dir
    validator.MANIFEST_PATH = data_dir / "manifest.json"
    try:
        manifest = validator.load_json(validator.MANIFEST_PATH)
        paths = validator.validate_manifest(manifest)
        source_data = validator.validate_source_lock(validator.load_json(paths["sourceLock"]))
        ledger = validator.validate_ledger(validator.load_json(paths["sourceLedger"]), source_data)
        validator.validate_source_coverage(ledger, source_data)
        bound_source_data = gate.bind_source_reference_mapper(
            source_data,
            lambda lock_id, book_id, chapter, verse: validator.source_references_for_target(
                lock_id, book_id, chapter, verse, source_data["rules"]
            ),
        )
        summary = gate.validate_nt_editorial_approval(
            data_dir,
            bound_source_data,
            ledger,
            approval_path=approval_path,
        )
    except (validator.ValidationError, gate.EditorialGateError) as error:
        raise RuntimeCatalogError(
            "poarta editorială canonică NT nu permite catalogul runtime: " + str(error)
        ) from error
    finally:
        validator.DATA_DIR = original_data_dir
        validator.MANIFEST_PATH = original_manifest_path

    if summary.approval_path.resolve() != approval_path.resolve():
        raise RuntimeCatalogError(
            "catalogul runtime trebuie să valideze registrul canonic NT-EDITORIAL-APPROVAL.json"
        )
    return CanonicalEditorialApproval(summary.corpus_digest, summary.approval_path)


def validate_materialized_nt_corpus(corpus_path: Path, *, root: Path = ROOT) -> None:
    """Require the imported TypeScript corpus to be today's gated materialization.

    A matching file hash in the runtime manifest is not enough: it could bind
    a manually altered generated file.  Re-rendering from the current chapter
    files links the actual imported bytes to the same canonical editorial gate.
    """
    materializer = load_python_module(
        "materialize_biblia_emanus_nt_for_runtime_catalog",
        root / "scripts" / "materialize-biblia-emanus-nt.py",
    )
    try:
        expected = materializer.render_typescript(materializer.build_payload())
    except materializer.MaterializationError as error:
        raise RuntimeCatalogError(
            "corpusul runtime nu poate fi legat de materializarea editorială canonică: "
            + str(error)
        ) from error
    try:
        actual = corpus_path.read_text(encoding="utf-8")
    except OSError as error:
        raise RuntimeCatalogError(f"Nu pot citi corpusul runtime {corpus_path}: {error}") from error
    if actual != expected:
        raise RuntimeCatalogError(
            "corpusul runtime nu este materializarea exactă a corpusului editorial aprobat"
        )


def validate_manifest(
    manifest: dict[str, Any],
    *,
    root: Path = ROOT,
    corpus_path: Path = CORPUS_PATH,
) -> dict[str, Any]:
    if manifest.get("schemaVersion") != 1:
        raise RuntimeCatalogError("manifestul runtime NT trebuie să aibă schemaVersion 1")
    if manifest.get("corpusId") != "biblia-emanus-nt":
        raise RuntimeCatalogError("manifestul runtime NT are corpusId invalid")

    runtime_catalog = manifest.get("runtimeCatalog")
    if not isinstance(runtime_catalog, dict):
        raise RuntimeCatalogError("manifestul runtime NT nu are runtimeCatalog")
    status = runtime_catalog.get("status")
    reason = require_string(runtime_catalog.get("reason"), "runtimeCatalog.reason")

    if status == "withheld":
        if runtime_catalog.get("approval") is not None:
            raise RuntimeCatalogError("un catalog withheld nu poate păstra o aprobare activă")
        return {"status": "withheld", "reason": reason, "approval": None}
    if status != "approved":
        raise RuntimeCatalogError("runtimeCatalog.status trebuie să fie withheld sau approved")

    approval = validate_approval(runtime_catalog.get("approval"), root=root, corpus_path=corpus_path)
    canonical_approval = validate_canonical_nt_editorial_approval(root)
    if approval["editorialCorpusDigest"] != canonical_approval.corpus_digest:
        raise RuntimeCatalogError(
            "approval.editorialCorpusDigest nu corespunde registrului editorial canonic curent"
        )
    validate_materialized_nt_corpus(corpus_path, root=root)
    return {
        "status": "approved",
        "reason": reason,
        "approval": approval,
    }


def render_typescript(gate: dict[str, Any]) -> str:
    gate_literal = json.dumps(gate, ensure_ascii=False, separators=(",", ":"))
    imports = 'import type { BibliaEmanusNtRuntimeGate, BibleBook } from "./types.js"\n'
    if gate["status"] == "approved":
        imports = (
            'import { BIBLIA_EMANUS_NT_TEXT } from "./bibliaEmanusNt.generated.js"\n'
            'import { buildBibliaEmanusNtBooks } from "./bibliaEmanusNtAdapter.js"\n'
            + imports
        )
        books = "export const BIBLIA_EMANUS_NT_BOOKS: BibleBook[] = buildBibliaEmanusNtBooks(BIBLIA_EMANUS_NT_TEXT)\n"
    else:
        books = "export const BIBLIA_EMANUS_NT_BOOKS: BibleBook[] = []\n"
    return (
        "// Generated by scripts/materialize-biblia-emanus-nt-runtime-catalog.py. Do not edit.\n"
        "// The raw corpus is imported only after canonical per-verse approval and exact materialization checks.\n"
        + imports
        + "\n"
        + "export const BIBLIA_EMANUS_NT_RUNTIME_GATE: BibliaEmanusNtRuntimeGate = "
        + gate_literal
        + "\n"
        + books
    )


def validate_no_bypass_imports(gate: dict[str, Any], output_path: Path) -> None:
    raw_import = "bibliaEmanusNt.generated"
    for path in SHARED_BIBLE_DIR.rglob("*.ts"):
        if path in {CORPUS_PATH, output_path}:
            continue
        if raw_import in path.read_text(encoding="utf-8"):
            raise RuntimeCatalogError(
                f"{path.relative_to(ROOT)} importă direct corpusul NT şi ocoleşte poarta editorială"
            )

    output = output_path.read_text(encoding="utf-8")
    imports_raw_corpus = raw_import in output
    if gate["status"] == "approved" and not imports_raw_corpus:
        raise RuntimeCatalogError("catalogul aprobat nu importă corpusul aprobat")
    if gate["status"] == "withheld" and imports_raw_corpus:
        raise RuntimeCatalogError("catalogul withheld importă corpusul care trebuie ascuns")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--manifest", type=Path, default=MANIFEST_PATH)
    parser.add_argument("--corpus", type=Path, default=CORPUS_PATH)
    parser.add_argument("--output", type=Path, default=OUTPUT_PATH)
    parser.add_argument("--check", action="store_true", help="Verifică artefactul generat şi interzice importurile care ocolesc poarta")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    try:
        gate = validate_manifest(load_json(args.manifest), root=ROOT, corpus_path=args.corpus)
        rendered = render_typescript(gate)
        if args.check:
            if not args.output.is_file() or args.output.read_text(encoding="utf-8") != rendered:
                raise RuntimeCatalogError("catalogul runtime NT generat nu corespunde manifestului editorial")
            validate_no_bypass_imports(gate, args.output)
        else:
            args.output.parent.mkdir(parents=True, exist_ok=True)
            args.output.write_text(rendered, encoding="utf-8")
    except RuntimeCatalogError as error:
        print(f"[biblia-emanus-nt-runtime] EROARE: {error}")
        return 1
    print(f"[biblia-emanus-nt-runtime] OK: catalog {gate['status']}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
