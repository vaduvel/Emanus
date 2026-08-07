from __future__ import annotations

import copy
import importlib.util
import io
import json
import sys
import tempfile
import unittest
from contextlib import redirect_stdout
from pathlib import Path
from unittest.mock import patch


ROOT = Path(__file__).resolve().parents[1]


def load_module(name: str, path: Path):
    spec = importlib.util.spec_from_file_location(name, path)
    assert spec is not None and spec.loader is not None
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module


gate = load_module("nt_editorial_gate_test", ROOT / "scripts" / "nt_editorial_gate.py")
quality_checker = load_module(
    "biblia_emanus_romanian_quality_test",
    ROOT / "scripts" / "check-biblia-emanus-romanian-quality.py",
)


def fixture_context() -> tuple[dict, dict, dict]:
    chapters = {
        "MAT.1": {
            "bookId": "MAT",
            "chapter": 1,
            "verses": [
                {"number": 1, "text": "Cartea lui Isus este aici."},
                {"number": 2, "text": "Iacov l-a născut pe Iosif."},
            ],
            # This deliberately resembles the legacy chapter-level AI audit.
            # The gate must not accept it without the external per-verse record.
            "audit": {
                "reviewLevel": "ai-complete",
                "sourceLanguage": {"scope": "Toate versetele au fost verificate."},
            },
        }
    }
    source_data = {
        "books": {
            "MAT": {
                "order": 40,
                "testament": "NT",
                "baseLockId": "WEBP-MAT",
                "originalLockId": "SBLGNT-MAT",
                "benchmarkLockIds": ["CORNILESCU1924-MAT", "BTF-MAT"],
                "externalBenchmarkIds": ["NTR"],
            }
        },
        "files": {
            "CORNILESCU1924-MAT": {"benchmarkId": "CORNILESCU-1924"},
            "BTF-MAT": {"benchmarkId": "BTF"},
        },
        "texts": {
            "SBLGNT-MAT": {
                (1, 1): "Βίβλος λέγει Ἰησοῦ",
                (1, 2): "Ἰάκωβος λέγει Ἰωσήφ",
            },
            "WEBP-MAT": {
                (1, 1): "The book says Jesus is here.",
                (1, 2): "Jacob begat Joseph.",
            },
            "CORNILESCU1924-MAT": {
                (1, 1): "Картя луй Исус есте аич.",
                (1, 2): "Иаков л-а нэскут пе Иосиф.",
            },
            "BTF-MAT": {
                (1, 1): "Cartea lui Isus este aici.",
                (1, 2): "Iacov l-a născut pe Iosif.",
            },
        },
    }
    source_data = gate.bind_source_reference_mapper(
        source_data,
        lambda _lock_id, _book_id, chapter, verse: ((chapter, verse),),
    )
    ledger = {"MAT.1": {"verseNumbers": [1, 2]}}
    return chapters, source_data, ledger


def locked_evidence(source_data: dict, lock_id: str, verse: int) -> dict:
    text = source_data["texts"][lock_id][(1, verse)]
    return {
        "lockId": lock_id,
        "references": [f"1:{verse}"],
        "textDigest": gate.sha256_text(text),
    }


def valid_approval(chapters: dict, source_data: dict) -> dict:
    entries = []
    for verse_data in chapters["MAT.1"]["verses"]:
        verse = verse_data["number"]
        target = verse_data["text"]
        greek_anchor = "λέγει"
        target_anchor = "Cartea" if verse == 1 else "Iacov"
        segment_label = "primul segment" if verse == 1 else "al doilea segment"
        entries.append(
            {
                "reference": f"MAT.1.{verse}",
                "textDigest": gate.sha256_text(target),
                "sources": {
                    "sblgnt": locked_evidence(source_data, "SBLGNT-MAT", verse),
                    "webu": locked_evidence(source_data, "WEBP-MAT", verse),
                    "benchmarks": {
                        "CORNILESCU-1924": locked_evidence(
                            source_data, "CORNILESCU1924-MAT", verse
                        ),
                        "BTF": locked_evidence(source_data, "BTF-MAT", verse),
                        "NTR": {
                            "references": [f"1:{verse}"],
                            "mode": "external-comparison-only",
                            "referenceUrl": "https://example.test/ntr/MAT/1",
                            "consultedOn": "2026-08-07",
                        },
                    },
                },
                "decisions": {
                    "sourceLanguage": {
                        "sourceAnchor": greek_anchor,
                        "rationale": (
                            f"Ancora grecească {greek_anchor} a fost verificată direct "
                            f"în SBLGNT pentru {segment_label}, nu doar prin metadate."
                        ),
                    },
                    "romanian": {
                        "targetAnchor": target_anchor,
                        "rationale": (
                            f"Formularea românească {target_anchor} este verificată în "
                            f"contextul sintactic particular al versetului {verse}."
                        ),
                    },
                    "semantic": {
                        "sourceAnchor": greek_anchor,
                        "targetAnchor": target_anchor,
                        "rationale": (
                            f"Legătura dintre {greek_anchor} și {target_anchor} este "
                            f"motivată pentru sensul concret al versetului {verse}."
                        ),
                    },
                },
            }
        )
    texts = {
        f"MAT.1.{item['number']}": item["text"]
        for item in chapters["MAT.1"]["verses"]
    }
    return {
        "schemaVersion": 1,
        "status": "approved",
        "approvedOn": "2026-08-07",
        "corpusDigest": gate.nt_corpus_digest(texts, source_data),
        "approval": {
            "reviewerId": "editorial-fixture",
            "reviewerType": "human",
            "reviewerRole": "editorial-reviewer",
            "method": "verse-by-verse-source-and-romanian-benchmark",
            "declaration": (
                "Am revizuit individual fiecare verset din acest fixture în sursele "
                "fixate și am verificat justificările atașate fiecărei decizii."
            ),
        },
        "verses": entries,
    }


def confirmed_corruption_fixture() -> dict[str, dict]:
    """The six confirmed incidents, isolated from the live corpus state."""
    return {
        "EPH.2": {
            "bookId": "EPH",
            "chapter": 2,
            "verses": [{
                "number": 11,
                "text": (
                    "De aceea,-vă că, odată ce voi, Neamurile în trup, care "
                    "numitenecircumcizie„ prin ceea ce secircumcizie”"
                ),
            }],
        },
        "LUK.11": {
            "bookId": "LUK",
            "chapter": 11,
            "verses": [{
                "number": 33,
                "text": "ca cei care vin în poate vedea lumina.",
            }],
        },
        "ROM.14": {
            "bookId": "ROM",
            "chapter": 14,
            "verses": [{
                "number": 13,
                "text": "să nu ne mai judecăm unii pe, ci mai degrabă să judecăm.",
            }],
        },
        "JHN.7": {
            "bookId": "JHN",
            "chapter": 7,
            "verses": [{
                "number": 22,
                "text": "în ziua de Sabat vă circumcizia un băiat.",
            }],
        },
        "MAT.3": {
            "bookId": "MAT",
            "chapter": 3,
            "verses": [{
                "number": 12,
                "text": "Furculița lui este în mâna lui și își va curăți aria.",
            }],
        },
        "MAT.4": {
            "bookId": "MAT",
            "chapter": 4,
            "verses": [{
                "number": 24,
                "text": "oameni chinuiți de lună și paralizați.",
            }],
        },
    }
class NewTestamentEditorialGateTests(unittest.TestCase):
    def test_editorial_register_schema_is_valid_json(self) -> None:
        schema = json.loads(
            (ROOT / "docs" / "biblia-emanus" / "NT-EDITORIAL-APPROVAL.schema.json").read_text(
                encoding="utf-8"
            )
        )
        self.assertEqual(schema["$schema"], "https://json-schema.org/draft/2020-12/schema")
        self.assertEqual(schema["properties"]["verses"]["minItems"], 7941)

    def test_known_publication_corruptions_are_regressions(self) -> None:
        findings = {
            (item.reference, item.code)
            for item in gate.scan_nt_quality(confirmed_corruption_fixture())
        }
        self.assertTrue(
            {
                ("EPH.2.11", "punctuation-hyphen-corruption"),
                ("LUK.11.33", "broken-syntax"),
                ("ROM.14.13", "truncated-object"),
                ("JHN.7.22", "noun-used-as-verb"),
                ("MAT.3.12", "winnowing-tool"),
                ("MAT.4.24", "lunar-affliction-calque"),
            }.issubset(findings)
        )

    def test_standalone_romanian_quality_command_fails_on_all_six_confirmed_cases(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            data_dir = Path(directory)
            for chapter_id, chapter in confirmed_corruption_fixture().items():
                (data_dir / f"{chapter_id}.json").write_text(
                    json.dumps(chapter, ensure_ascii=False), encoding="utf-8"
                )
            output = io.StringIO()
            with patch.object(quality_checker, "DATA", data_dir), redirect_stdout(output):
                result = quality_checker.main()
        rendered = output.getvalue()
        self.assertEqual(result, 1)
        for reference in ("EPH.2.11", "LUK.11.33", "ROM.14.13", "JHN.7.22", "MAT.3.12", "MAT.4.24"):
            with self.subTest(reference=reference):
                self.assertIn(reference, rendered)

    def test_chapter_level_ai_metadata_cannot_substitute_for_register(self) -> None:
        chapters, source_data, ledger = fixture_context()
        with tempfile.TemporaryDirectory() as directory:
            approval_path = Path(directory) / "NT-EDITORIAL-APPROVAL.json"
            with self.assertRaisesRegex(gate.EditorialGateError, "metadatele de audit AI"):
                gate.validate_nt_editorial_approval(
                    Path(directory) / "docs" / "data" / "biblia-emanus",
                    source_data,
                    ledger,
                    chapters,
                    approval_path,
                )

    def test_valid_per_verse_evidence_is_source_bound(self) -> None:
        chapters, source_data, ledger = fixture_context()
        approval = valid_approval(chapters, source_data)
        with tempfile.TemporaryDirectory() as directory:
            approval_path = Path(directory) / "NT-EDITORIAL-APPROVAL.json"
            approval_path.write_text(json.dumps(approval, ensure_ascii=False), encoding="utf-8")
            summary = gate.validate_nt_editorial_approval(
                Path(directory) / "docs" / "data" / "biblia-emanus",
                source_data,
                ledger,
                chapters,
                approval_path,
            )
        self.assertEqual(summary.verses, 2)
        self.assertTrue(summary.corpus_digest.startswith("sha256:"))

    def test_source_digest_mismatch_blocks_approval(self) -> None:
        chapters, source_data, ledger = fixture_context()
        approval = valid_approval(chapters, source_data)
        approval["verses"][0]["sources"]["sblgnt"]["textDigest"] = "sha256:" + "0" * 64
        with tempfile.TemporaryDirectory() as directory:
            approval_path = Path(directory) / "NT-EDITORIAL-APPROVAL.json"
            approval_path.write_text(json.dumps(approval, ensure_ascii=False), encoding="utf-8")
            with self.assertRaisesRegex(gate.EditorialGateError, "digestul textului nu corespunde"):
                gate.validate_nt_editorial_approval(
                    Path(directory) / "docs" / "data" / "biblia-emanus",
                    source_data,
                    ledger,
                    chapters,
                    approval_path,
                )

    def test_duplicate_rationale_is_not_a_verse_by_verse_audit(self) -> None:
        chapters, source_data, ledger = fixture_context()
        approval = valid_approval(chapters, source_data)
        approval["verses"][1]["decisions"]["sourceLanguage"]["rationale"] = copy.deepcopy(
            approval["verses"][0]["decisions"]["sourceLanguage"]["rationale"]
        )
        with tempfile.TemporaryDirectory() as directory:
            approval_path = Path(directory) / "NT-EDITORIAL-APPROVAL.json"
            approval_path.write_text(json.dumps(approval, ensure_ascii=False), encoding="utf-8")
            with self.assertRaisesRegex(gate.EditorialGateError, "justificări identice"):
                gate.validate_nt_editorial_approval(
                    Path(directory) / "docs" / "data" / "biblia-emanus",
                    source_data,
                    ledger,
                    chapters,
                    approval_path,
                )


if __name__ == "__main__":
    unittest.main()
