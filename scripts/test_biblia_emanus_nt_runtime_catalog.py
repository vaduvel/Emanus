from __future__ import annotations

import copy
import hashlib
import importlib.util
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch


ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location(
    "biblia_emanus_nt_runtime_catalog",
    ROOT / "scripts" / "materialize-biblia-emanus-nt-runtime-catalog.py",
)
assert SPEC is not None and SPEC.loader is not None
catalog = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(catalog)


class BibliaEmanusNtRuntimeCatalogTests(unittest.TestCase):
    editorial_digest = "sha256:" + "a" * 64

    def canonical_approval(self, root: Path) -> catalog.CanonicalEditorialApproval:
        return catalog.CanonicalEditorialApproval(
            corpus_digest=self.editorial_digest,
            approval_path=root / "docs" / "biblia-emanus" / "NT-EDITORIAL-APPROVAL.json",
        )

    def test_repository_catalog_is_approved_and_imports_bound_corpus(self) -> None:
        manifest = catalog.load_json(catalog.MANIFEST_PATH)
        gate = catalog.validate_manifest(manifest)
        rendered = catalog.render_typescript(gate)

        self.assertEqual(gate["status"], "approved")
        self.assertIsNotNone(gate["approval"])
        self.assertIn('from "./bibliaEmanusNt.generated.js"', rendered)
        self.assertIn("buildBibliaEmanusNtBooks", rendered)
        self.assertEqual(catalog.OUTPUT_PATH.read_text(encoding="utf-8"), rendered)
        catalog.validate_no_bypass_imports(gate, catalog.OUTPUT_PATH)

    def test_withheld_catalog_rejects_an_active_approval(self) -> None:
        manifest = catalog.load_json(catalog.MANIFEST_PATH)
        changed = copy.deepcopy(manifest)
        changed["runtimeCatalog"] = {
            "status": "withheld",
            "reason": "Fixture pentru catalog blocat.",
            "approval": {"releaseId": "not-allowed"},
        }

        with self.assertRaisesRegex(catalog.RuntimeCatalogError, "withheld"):
            catalog.validate_manifest(changed)

    def test_missing_canonical_register_blocks_runtime_promotion(self) -> None:
        manifest = copy.deepcopy(catalog.load_json(catalog.MANIFEST_PATH))
        evidence_path = ROOT / "docs" / "biblia-emanus" / "AUTOMATED-PUBLICATION.md"
        manifest["runtimeCatalog"] = {
            "status": "approved",
            "reason": "Încercare de promovare înaintea registrului canonic.",
            "approval": {
                "releaseId": "BE-NT-test",
                "approvedAt": "2026-08-07",
                "approvedBy": ["editor responsabil"],
                "corpusSha256": hashlib.sha256(catalog.CORPUS_PATH.read_bytes()).hexdigest(),
                "editorialCorpusDigest": self.editorial_digest,
                "evidence": [
                    {
                        "kind": "publication-policy",
                        "path": "docs/biblia-emanus/AUTOMATED-PUBLICATION.md",
                        "sha256": hashlib.sha256(evidence_path.read_bytes()).hexdigest(),
                    }
                ],
                "reviewScope": {"books": 27, "chapters": 260, "verses": 7941},
            },
        }

        missing_registry = catalog.RuntimeCatalogError(
            "poarta editorială canonică NT nu permite catalogul runtime: "
            "lipsește registrul de aprobare per-verset"
        )
        with (
            patch.object(
                catalog,
                "validate_canonical_nt_editorial_approval",
                side_effect=missing_registry,
            ),
            patch.object(catalog, "validate_materialized_nt_corpus") as materialization,
        ):
            with self.assertRaisesRegex(
                catalog.RuntimeCatalogError, "registrul de aprobare per-verset"
            ):
                catalog.validate_manifest(manifest)
            materialization.assert_not_called()

    def test_approved_catalog_requires_bound_corpus_and_fixed_evidence(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            corpus = root / "corpus.ts"
            corpus.write_text("export const corpus = 'approved';\n", encoding="utf-8")
            evidence = root / "docs" / "audit.md"
            evidence.parent.mkdir()
            evidence.write_text("audit evidence\n", encoding="utf-8")

            manifest = {
                "schemaVersion": 1,
                "corpusId": "biblia-emanus-nt",
                "runtimeCatalog": {
                    "status": "approved",
                    "reason": "Semnat după auditul editorial complet.",
                    "approval": {
                        "releaseId": "BE-NT-2026-08-07",
                        "approvedAt": "2026-08-07",
                        "approvedBy": ["editor responsabil"],
                        "corpusSha256": hashlib.sha256(corpus.read_bytes()).hexdigest(),
                        "editorialCorpusDigest": self.editorial_digest,
                        "evidence": [
                            {
                                "kind": "verse-by-verse-audit",
                                "path": "docs/audit.md",
                                "sha256": hashlib.sha256(evidence.read_bytes()).hexdigest(),
                            }
                        ],
                        "reviewScope": {"books": 27, "chapters": 260, "verses": 7941},
                    },
                },
            }

            with (
                patch.object(
                    catalog,
                    "validate_canonical_nt_editorial_approval",
                    return_value=self.canonical_approval(root),
                ) as canonical_gate,
                patch.object(catalog, "validate_materialized_nt_corpus") as materialization,
            ):
                gate = catalog.validate_manifest(manifest, root=root, corpus_path=corpus)
                canonical_gate.assert_called_once_with(root)
                materialization.assert_called_once_with(corpus, root=root)
            rendered = catalog.render_typescript(gate)
            self.assertEqual(gate["status"], "approved")
            self.assertIn('from "./bibliaEmanusNt.generated.js"', rendered)
            self.assertIn("buildBibliaEmanusNtBooks", rendered)

            changed = copy.deepcopy(manifest)
            changed["runtimeCatalog"]["approval"]["corpusSha256"] = "0" * 64
            with self.assertRaisesRegex(catalog.RuntimeCatalogError, "nu corespunde corpusului"):
                catalog.validate_manifest(changed, root=root, corpus_path=corpus)

            changed = copy.deepcopy(manifest)
            changed["runtimeCatalog"]["approval"]["reviewScope"]["books"] = True
            with self.assertRaisesRegex(catalog.RuntimeCatalogError, "reviewScope"):
                catalog.validate_manifest(changed, root=root, corpus_path=corpus)

    def test_approved_catalog_rejects_a_digest_different_from_canonical_review(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            corpus = root / "corpus.ts"
            corpus.write_text("export const corpus = 'approved';\n", encoding="utf-8")
            evidence = root / "docs" / "audit.md"
            evidence.parent.mkdir()
            evidence.write_text("audit evidence\n", encoding="utf-8")
            manifest = {
                "schemaVersion": 1,
                "corpusId": "biblia-emanus-nt",
                "runtimeCatalog": {
                    "status": "approved",
                    "reason": "Semnat după auditul editorial complet.",
                    "approval": {
                        "releaseId": "BE-NT-2026-08-07",
                        "approvedAt": "2026-08-07",
                        "approvedBy": ["editor responsabil"],
                        "corpusSha256": hashlib.sha256(corpus.read_bytes()).hexdigest(),
                        "editorialCorpusDigest": "sha256:" + "b" * 64,
                        "evidence": [
                            {
                                "kind": "verse-by-verse-audit",
                                "path": "docs/audit.md",
                                "sha256": hashlib.sha256(evidence.read_bytes()).hexdigest(),
                            }
                        ],
                        "reviewScope": {"books": 27, "chapters": 260, "verses": 7941},
                    },
                },
            }

            with (
                patch.object(
                    catalog,
                    "validate_canonical_nt_editorial_approval",
                    return_value=self.canonical_approval(root),
                ),
                patch.object(catalog, "validate_materialized_nt_corpus") as materialization,
            ):
                with self.assertRaisesRegex(catalog.RuntimeCatalogError, "editorialCorpusDigest"):
                    catalog.validate_manifest(manifest, root=root, corpus_path=corpus)
                materialization.assert_not_called()

    def test_runtime_corpus_must_equal_current_materialization(self) -> None:
        class MaterializerFixture:
            class MaterializationError(Exception):
                pass

            @staticmethod
            def build_payload() -> dict[str, str]:
                return {"fixture": "current"}

            @staticmethod
            def render_typescript(_payload: dict[str, str]) -> str:
                return "current materialization\n"

        with tempfile.TemporaryDirectory() as directory:
            corpus = Path(directory) / "corpus.ts"
            corpus.write_text("manually changed\n", encoding="utf-8")
            with patch.object(catalog, "load_python_module", return_value=MaterializerFixture):
                with self.assertRaisesRegex(catalog.RuntimeCatalogError, "materializarea exactă"):
                    catalog.validate_materialized_nt_corpus(corpus)


if __name__ == "__main__":
    unittest.main()
