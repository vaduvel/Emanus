from __future__ import annotations

import copy
import importlib.util
import json
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
VALIDATOR_PATH = ROOT / "scripts" / "check-biblia-emanus.py"
SPEC = importlib.util.spec_from_file_location("biblia_emanus_validator", VALIDATOR_PATH)
assert SPEC is not None and SPEC.loader is not None
validator = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(validator)

SEAL_PATH = ROOT / "scripts" / "seal-biblia-emanus.py"
SEAL_SPEC = importlib.util.spec_from_file_location("biblia_emanus_seal", SEAL_PATH)
assert SEAL_SPEC is not None and SEAL_SPEC.loader is not None
seal = importlib.util.module_from_spec(SEAL_SPEC)
SEAL_SPEC.loader.exec_module(seal)


class BibliaEmanusValidatorTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.manifest = validator.load_json(validator.MANIFEST_PATH)
        cls.paths = validator.validate_manifest(cls.manifest)
        cls.source_data = validator.validate_source_lock(
            validator.load_json(cls.paths["sourceLock"])
        )
        cls.ledger = validator.validate_ledger(
            validator.load_json(cls.paths["sourceLedger"]), cls.source_data
        )

    def test_usfm_poetry_continuations_stay_in_same_verse(self) -> None:
        raw = b"\\c 1\n\\v 1 First line\n\\q1 second line\n\\q2 third line\n"
        verses = validator.parse_usfm_verses(raw, "fixture")
        self.assertEqual(verses[(1, 1)], "First line second line third line")

    def test_note_workflow_does_not_require_human_review(self) -> None:
        self.assertNotIn("needs_human_review", validator.ALLOWED_NOTE_RESOLUTION_VALUES)
        self.assertIn("needs_ai_review", validator.ALLOWED_NOTE_RESOLUTION_VALUES)

    def test_geneza_versification_shift_is_explicit(self) -> None:
        rules = self.source_data["rules"]
        self.assertEqual(
            validator.source_reference_for_target("WLC-GEN", "GEN", 31, 55, rules),
            (32, 1),
        )
        self.assertEqual(
            validator.source_reference_for_target("WLC-GEN", "GEN", 32, 1, rules),
            (32, 2),
        )

    def test_changed_text_invalidates_ai_audit(self) -> None:
        data = validator.load_json(validator.DATA_DIR / "GEN.1.json")
        changed = copy.deepcopy(data)
        changed["verses"][0]["text"] += " Adaos străin."
        with self.assertRaisesRegex(validator.ValidationError, "nu corespunde textului curent"):
            validator.validate_automated_audit(
                validator.DATA_DIR / "GEN.1.json",
                changed,
                "published",
                self.source_data["snapshotSha256"],
                self.ledger["GEN.1"]["expectedVerses"],
                2,
                1,
            )

    def test_unresolved_note_blocks_publication(self) -> None:
        data = validator.load_json(validator.DATA_DIR / "GEN.49.json")
        notes = copy.deepcopy(data["editorialNotes"])
        notes[0]["resolutionStatus"] = "pending"
        with self.assertRaisesRegex(validator.ValidationError, "trebuie rezolvată"):
            validator.validate_editorial_notes(
                validator.DATA_DIR / "GEN.49.json",
                notes,
                self.ledger["GEN.49"]["expectedVerses"],
                self.ledger["GEN.49"].get("textualVariantReview", []),
                "published",
            )

    def test_large_omission_fails_pinned_benchmark_gate(self) -> None:
        data = validator.load_json(validator.DATA_DIR / "GEN.27.json")
        changed = copy.deepcopy(data)
        changed["verses"][28]["text"] = "Popoare să-ți slujească."
        with self.assertRaisesRegex(validator.ValidationError, "lungime suspectă"):
            validator.validate_pinned_benchmark_comparison(
                validator.DATA_DIR / "GEN.27.json", changed, self.source_data
            )

    def test_seal_cannot_invent_missing_semantic_audit(self) -> None:
        with self.assertRaisesRegex(validator.ValidationError, "nu are audit semantic AI"):
            seal.seal_chapter(
                validator,
                {"bookId": "GEN"},
                self.source_data,
                "agent-test",
            )

    def test_published_nt_requires_individual_editorial_register(self) -> None:
        with self.assertRaisesRegex(
            validator.ValidationError, "metadatele de audit AI la nivel de capitol nu sunt suficiente"
        ):
            validator.validate_new_testament_editorial_gate(
                self.source_data,
                self.ledger,
            )

    def test_seal_preserves_compact_json_style(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "chapter.json"
            path.write_text('{"status":"draft"}\n', encoding="utf-8")
            seal.write_json(path, {"status": "published", "public": True})
            rendered = path.read_text(encoding="utf-8")
            self.assertEqual(rendered.count("\n"), 1)
            self.assertEqual(json.loads(rendered), {"status": "published", "public": True})


if __name__ == "__main__":
    unittest.main()
