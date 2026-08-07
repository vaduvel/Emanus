from __future__ import annotations

import copy
import hashlib
import importlib.util
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location(
    "biblia_emanus_nt_runtime_catalog",
    ROOT / "scripts" / "materialize-biblia-emanus-nt-runtime-catalog.py",
)
assert SPEC is not None and SPEC.loader is not None
catalog = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(catalog)


class BibliaEmanusNtRuntimeCatalogTests(unittest.TestCase):
    def test_repository_catalog_is_withheld_and_does_not_import_raw_corpus(self) -> None:
        manifest = catalog.load_json(catalog.MANIFEST_PATH)
        gate = catalog.validate_manifest(manifest)
        rendered = catalog.render_typescript(gate)

        self.assertEqual(gate["status"], "withheld")
        self.assertIsNone(gate["approval"])
        self.assertIn("BIBLIA_EMANUS_NT_BOOKS: BibleBook[] = []", rendered)
        self.assertNotIn("bibliaEmanusNt.generated", rendered)
        self.assertEqual(catalog.OUTPUT_PATH.read_text(encoding="utf-8"), rendered)
        catalog.validate_no_bypass_imports(gate, catalog.OUTPUT_PATH)

    def test_withheld_catalog_rejects_an_active_approval(self) -> None:
        manifest = catalog.load_json(catalog.MANIFEST_PATH)
        changed = copy.deepcopy(manifest)
        changed["runtimeCatalog"]["approval"] = {"releaseId": "not-allowed"}

        with self.assertRaisesRegex(catalog.RuntimeCatalogError, "withheld"):
            catalog.validate_manifest(changed)

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

            gate = catalog.validate_manifest(manifest, root=root, corpus_path=corpus)
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


if __name__ == "__main__":
    unittest.main()
