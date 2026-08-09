#!/usr/bin/env python3
"""Tests for the canonical OT per-verse source-evidence gate."""

from __future__ import annotations

import copy
import gzip
import hashlib
import importlib.util
import json
import tempfile
import unittest
import zipfile
from pathlib import Path
from types import ModuleType
from typing import Any, Callable


SCRIPT_PATH = Path(__file__).with_name("check-biblia-emanus-ot-source-evidence.py")


def load_gate() -> ModuleType:
    spec = importlib.util.spec_from_file_location("ot_source_evidence_gate", SCRIPT_PATH)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Nu pot încărca {SCRIPT_PATH}")
    module = importlib.util.module_from_spec(spec)
    # dataclasses resolves postponed annotations through sys.modules.
    import sys

    sys.modules[spec.name] = module
    spec.loader.exec_module(module)
    return module


gate = load_gate()


def sha256_bytes(value: bytes) -> str:
    return hashlib.sha256(value).hexdigest()


def digest_text(value: str) -> str:
    return "sha256:" + sha256_bytes(value.encode("utf-8"))


def canonical_json(value: Any) -> str:
    return json.dumps(
        value,
        ensure_ascii=False,
        sort_keys=True,
        separators=(",", ":"),
    )


class OtSourceEvidenceGateTests(unittest.TestCase):
    maxDiff = None

    def setUp(self) -> None:
        self.temporary = tempfile.TemporaryDirectory()
        self.root = Path(self.temporary.name)
        self.data = self.root / "docs" / "data" / "biblia-emanus"
        self.sources = self.data / "sources"
        self.sources.mkdir(parents=True)
        self.evidence_path = self.data / "ot-source-evidence.jsonl"
        self.contract = gate.ValidationContract(
            book_chapters=(("GEN", 1),),
            expected_verse_count=2,
        )

        self.webu_texts = {
            1: "In the beginning, God created the heavens and the earth.",
            2: "The earth was formless and empty.",
        }
        self.hebrew_texts = {
            1: "בְּרֵאשִׁית בָּרָא אֱלֹהִים",
            2: "וְהָאָרֶץ הָיְתָה תֹהוּ וָבֹהוּ",
        }
        self.romanian_texts = {
            1: "La început, Dumnezeu a creat cerurile și pământul.",
            2: "Pământul era fără formă și gol.",
        }
        self.webu_raw = self._usfm(self.webu_texts).encode("utf-8")
        self.hebrew_raw = self._usfm(self.hebrew_texts).encode("utf-8")
        self.snapshot_path = self.sources / "fixture-ot.zip"
        self._write_snapshot(self.webu_raw, self.hebrew_raw)
        self._write_source_lock()
        self._write_ledger()
        self._write_chapter(audit_approved=True)
        self.records = [self._record(verse) for verse in (1, 2)]
        self._write_evidence()

    def tearDown(self) -> None:
        self.temporary.cleanup()

    @staticmethod
    def _usfm(verses: dict[int, str]) -> str:
        rows = ["\\id GEN", "\\c 1"]
        rows.extend(f"\\v {number} {text}" for number, text in verses.items())
        return "\n".join(rows) + "\n"

    def _write_json(self, path: Path, value: Any) -> None:
        path.write_text(
            json.dumps(value, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )

    def _write_snapshot(self, webu_raw: bytes, hebrew_raw: bytes) -> None:
        with zipfile.ZipFile(self.snapshot_path, "w", zipfile.ZIP_DEFLATED) as archive:
            archive.writestr("web/GEN.usfm", webu_raw)
            archive.writestr("wlc/GEN.usfm", hebrew_raw)

    def _source_lock(self) -> dict[str, Any]:
        return json.loads((self.data / "source-lock.json").read_text(encoding="utf-8"))

    def _write_source_lock(self, value: dict[str, Any] | None = None) -> None:
        source_lock = value or {
            "schemaVersion": 3,
            "snapshots": {
                "fixture": {
                    "path": "sources/fixture-ot.zip",
                    "sha256": sha256_bytes(self.snapshot_path.read_bytes()),
                }
            },
            "books": {
                "GEN": {
                    "name": "Geneza",
                    "order": 1,
                    "testament": "OT",
                    "baseLockId": "WEBU-GEN",
                    "originalLockId": "WLC-GEN",
                }
            },
            "files": {
                "WEBU-GEN": {
                    "bookId": "GEN",
                    "language": "en",
                    "role": "base",
                    "archivePath": "web/GEN.usfm",
                    "sha256": sha256_bytes(self.webu_raw),
                    "snapshotId": "fixture",
                    "format": "usfm",
                },
                "WLC-GEN": {
                    "bookId": "GEN",
                    "language": "he",
                    "role": "original",
                    "archivePath": "wlc/GEN.usfm",
                    "sha256": sha256_bytes(self.hebrew_raw),
                    "snapshotId": "fixture",
                    "format": "usfm",
                },
            },
            "versificationRules": [],
        }
        self._write_json(self.data / "source-lock.json", source_lock)

    def _write_ledger(self) -> None:
        self._write_json(
            self.data / "source-ledger.json",
            {
                "schemaVersion": 1,
                "chapters": {
                    "GEN.1": {
                        "expectedVerses": 2,
                        "verseNumbers": [1, 2],
                    }
                },
            },
        )

    def _write_chapter(self, *, audit_approved: bool) -> None:
        result = "approved" if audit_approved else "pending"
        self._write_json(
            self.data / "GEN.1.json",
            {
                "translation": "BE",
                "bookId": "GEN",
                "bookName": "Geneza",
                "chapter": 1,
                "status": "in_review",
                "public": False,
                "audit": {
                    "sourceLanguage": {"result": result},
                    "omissionAddition": {"result": result},
                },
                "verses": [
                    {"number": number, "text": text}
                    for number, text in self.romanian_texts.items()
                ],
            },
        )

    @staticmethod
    def _source_payload(reference: str, text: str) -> str:
        return f"{reference}\t{text}"

    def _record(self, verse: int) -> dict[str, Any]:
        reference = f"GEN.1.{verse}"
        rationale_prefix = f"{reference}: "
        source_reference = f"1:{verse}"
        texts = {
            "romanian": {"sha256": digest_text(self.romanian_texts[verse])},
            "hebrew": {
                "lockId": "WLC-GEN",
                "references": [source_reference],
                "sha256": digest_text(
                    self._source_payload(source_reference, self.hebrew_texts[verse])
                ),
            },
            "webu": {
                "lockId": "WEBU-GEN",
                "references": [source_reference],
                "sha256": digest_text(
                    self._source_payload(source_reference, self.webu_texts[verse])
                ),
            },
        }
        record = {
            "schemaVersion": 1,
            "recordType": "ot-verse-source-evidence",
            "reference": reference,
            "texts": texts,
            "bindingSha256": digest_text(
                canonical_json({"reference": reference, "texts": texts})
            ),
            "checks": {
                "omissions": {
                    "verdict": "approved",
                    "finding": "none",
                    "rationale": rationale_prefix + "Toate componentele sursei sunt reprezentate.",
                },
                "additions": {
                    "verdict": "approved",
                    "finding": "none",
                    "rationale": rationale_prefix + "Textul românesc nu introduce o afirmație nouă.",
                },
                "meaning": {
                    "verdict": "approved",
                    "finding": "preserved",
                    "rationale": rationale_prefix + "Relațiile și afirmația centrală sunt păstrate.",
                },
                "names": {
                    "verdict": "approved",
                    "finding": "preserved" if verse == 1 else "not_present",
                    "rationale": rationale_prefix + (
                        "Numele din sursă este păstrat."
                        if verse == 1
                        else "Versetul nu conține nume proprii."
                    ),
                },
                "numbers": {
                    "verdict": "approved",
                    "finding": "not_present",
                    "rationale": rationale_prefix + "Versetul nu conține valori numerice.",
                },
                "negations": {
                    "verdict": "approved",
                    "finding": "not_present",
                    "rationale": rationale_prefix + "Versetul nu conține o negație semantică.",
                },
            },
            "status": "approved",
            "review": {
                "method": "direct-per-verse-hebrew-webu-romanian-comparison",
                "reviewerId": "fixture-review-001",
                "reviewedAt": "2026-08-07",
            },
        }
        self._seal_record(record)
        return record

    @staticmethod
    def _seal_record(record: dict[str, Any], *, binding: bool = False) -> None:
        if binding:
            record["bindingSha256"] = digest_text(
                canonical_json(
                    {"reference": record["reference"], "texts": record["texts"]}
                )
            )
        protected = copy.deepcopy(record)
        protected.pop("recordSha256", None)
        record["recordSha256"] = digest_text(canonical_json(protected))

    def _write_evidence(self, records: list[dict[str, Any]] | None = None) -> None:
        selected = self.records if records is None else records
        self.evidence_path.write_text(
            "".join(canonical_json(record) + "\n" for record in selected),
            encoding="utf-8",
        )

    def _mutate_record(
        self,
        index: int,
        mutation: Callable[[dict[str, Any]], None],
        *,
        refresh_binding: bool = False,
        refresh_record: bool = True,
    ) -> None:
        mutation(self.records[index])
        if refresh_record:
            self._seal_record(self.records[index], binding=refresh_binding)
        self._write_evidence()

    def _validate(self) -> Any:
        return gate._validate_repository(self.root, self.evidence_path, self.contract)

    def assert_gate_fails(self, pattern: str) -> None:
        with self.assertRaisesRegex(gate.ValidationError, pattern):
            self._validate()

    def test_minimal_positive_fixture_passes(self) -> None:
        stats = self._validate()
        self.assertEqual((stats.books, stats.chapters, stats.verses), (1, 1, 2))

    def test_gzip_evidence_is_supported(self) -> None:
        compressed = self.evidence_path.with_suffix(".jsonl.gz")
        compressed.write_bytes(gzip.compress(self.evidence_path.read_bytes(), mtime=0))
        stats = gate._validate_repository(self.root, compressed, self.contract)
        self.assertEqual((stats.books, stats.chapters, stats.verses), (1, 1, 2))

    def test_production_contract_is_closed_at_39_929_23145(self) -> None:
        self.assertEqual(len(gate.CANONICAL_OT_CHAPTERS), 39)
        self.assertEqual(gate.PRODUCTION_CONTRACT.expected_chapter_count, 929)
        self.assertEqual(gate.EXPECTED_OT_VERSE_COUNT, 23_145)

    def test_source_coverage_and_approved_chapter_audit_do_not_replace_evidence(self) -> None:
        self.evidence_path.unlink()
        self.assert_gate_fails("nu reprezintă dovadă semantică")

    def test_missing_verse_fails(self) -> None:
        self._write_evidence(self.records[:1])
        self.assert_gate_fails("sunt obligatorii 2")

    def test_duplicate_verse_fails(self) -> None:
        self._write_evidence([self.records[0], copy.deepcopy(self.records[0])])
        self.assert_gate_fails("referință duplicată GEN.1.1")

    def test_extra_or_unknown_verse_fails(self) -> None:
        replacement = copy.deepcopy(self.records[1])
        replacement["reference"] = "GEN.1.3"
        self._seal_record(replacement, binding=True)
        self._write_evidence([self.records[0], replacement])
        self.assert_gate_fails("nu acoperă exact canonul VT")

    def test_noncanonical_order_fails(self) -> None:
        self._write_evidence(list(reversed(self.records)))
        self.assert_gate_fails("ordinea canonică")

    def test_chapter_level_verdict_fails(self) -> None:
        replacement = copy.deepcopy(self.records[0])
        replacement["reference"] = "GEN.1"
        self._seal_record(replacement, binding=True)
        self._write_evidence([replacement, self.records[1]])
        self.assert_gate_fails("verdicturile la nivel de capitol sunt interzise")

    def test_stale_romanian_hash_fails_after_chapter_text_changes(self) -> None:
        chapter_path = self.data / "GEN.1.json"
        chapter = json.loads(chapter_path.read_text(encoding="utf-8"))
        chapter["verses"][0]["text"] += " Acum modificat."
        self._write_json(chapter_path, chapter)
        self.assert_gate_fails("hash românesc stale")

    def test_stale_hebrew_hash_fails(self) -> None:
        self._mutate_record(
            0,
            lambda record: record["texts"]["hebrew"].__setitem__("sha256", "sha256:" + "0" * 64),
            refresh_binding=True,
        )
        self.assert_gate_fails("hash ebraic stale")

    def test_stale_webu_hash_fails(self) -> None:
        self._mutate_record(
            0,
            lambda record: record["texts"]["webu"].__setitem__("sha256", "sha256:" + "0" * 64),
            refresh_binding=True,
        )
        self.assert_gate_fails("hash WEBU stale")

    def test_wrong_hebrew_lock_id_fails(self) -> None:
        self._mutate_record(
            0,
            lambda record: record["texts"]["hebrew"].__setitem__("lockId", "WLC-OTHER"),
            refresh_binding=True,
        )
        self.assert_gate_fails("lockId hebrew")

    def test_wrong_source_references_fail(self) -> None:
        self._mutate_record(
            0,
            lambda record: record["texts"]["webu"].__setitem__("references", ["1:2"]),
            refresh_binding=True,
        )
        self.assert_gate_fails("referințele webu")

    def test_stale_binding_hash_fails(self) -> None:
        self._mutate_record(
            0,
            lambda record: record.__setitem__("bindingSha256", "sha256:" + "0" * 64),
        )
        self.assert_gate_fails("bindingSha256 stale")

    def test_stale_record_hash_fails(self) -> None:
        self._mutate_record(
            0,
            lambda record: record["checks"]["meaning"].__setitem__(
                "rationale", "GEN.1.1: Sensul a fost comparat direct și rămâne păstrat."
            ),
            refresh_record=False,
        )
        self.assert_gate_fails("recordSha256 stale")

    def test_each_unresolved_semantic_dimension_fails(self) -> None:
        for check_name in gate.CHECK_NAMES:
            with self.subTest(check=check_name):
                records = copy.deepcopy([self._record(1), self._record(2)])
                check = records[0]["checks"][check_name]
                check.update(
                    verdict="unresolved",
                    finding="uncertain",
                    rationale=f"GEN.1.1: Comparația directă pentru {check_name} a lăsat o problemă nerezolvată.",
                )
                self._seal_record(records[0])
                self._write_evidence(records)
                self.assert_gate_fails(f"checks\\.{check_name}: verdict unresolved")

    def test_top_level_unresolved_status_fails(self) -> None:
        self._mutate_record(
            0,
            lambda record: record.__setitem__("status", "unresolved"),
        )
        self.assert_gate_fails("status unresolved")

    def test_calibration_failed_local_reviewer_cannot_supply_publication_evidence(self) -> None:
        self._mutate_record(
            0,
            lambda record: record["review"].__setitem__(
                "reviewerId", "ollama-qwen3:8b-compact-semantic-v1"
            ),
        )
        self.assert_gate_fails("nu a trecut calibrarea controlată")

    def test_false_positive_local_reviewer_cannot_supply_publication_evidence(self) -> None:
        self._mutate_record(
            0,
            lambda record: record["review"].__setitem__(
                "reviewerId", "ollama-qwen2.5:14b-compact-semantic-v1"
            ),
        )
        self.assert_gate_fails("nu a trecut calibrarea controlată")

    def test_missing_semantic_dimension_fails(self) -> None:
        self._mutate_record(
            0,
            lambda record: record["checks"].pop("negations"),
        )
        self.assert_gate_fails("checks: câmpuri invalide")

    def test_approved_issue_finding_fails(self) -> None:
        self._mutate_record(
            0,
            lambda record: record["checks"]["meaning"].update(
                finding="issue", rationale="GEN.1.1: Există încă o problemă de sens nerezolvată."
            ),
        )
        self.assert_gate_fails("finding nerezolvat nu poate fi approved")

    def test_missing_concrete_rationale_fails(self) -> None:
        self._mutate_record(
            0,
            lambda record: record["checks"]["meaning"].__setitem__("rationale", "ok"),
        )
        self.assert_gate_fails("rationale concret lipsește")

    def test_generic_unbound_rationale_fails(self) -> None:
        self._mutate_record(
            0,
            lambda record: record["checks"]["meaning"].__setitem__(
                "rationale", "Sensul teologic și semantic este tradus fidel."
            ),
        )
        self.assert_gate_fails("rationale generic sau nelegat de referință")

    def test_manual_fallback_reviewer_cannot_supply_publication_evidence(self) -> None:
        self._mutate_record(
            0,
            lambda record: record["review"].__setitem__(
                "reviewerId", "agent-manual-fallback-v1"
            ),
        )
        self.assert_gate_fails("nu a trecut calibrarea controlată")

    def test_coverage_only_review_method_fails(self) -> None:
        self._mutate_record(
            0,
            lambda record: record["review"].__setitem__("method", "coverage-only"),
        )
        self.assert_gate_fails("coverage-only")

    def test_stale_snapshot_hash_fails(self) -> None:
        with zipfile.ZipFile(self.snapshot_path, "a") as archive:
            archive.writestr("untracked.txt", "changed")
        self.assert_gate_fails("hash snapshot stale")

    def test_stale_pinned_member_hash_fails(self) -> None:
        source_lock = self._source_lock()
        source_lock["files"]["WLC-GEN"]["sha256"] = "0" * 64
        self._write_source_lock(source_lock)
        self.assert_gate_fails("hash membru stale")

    def test_missing_source_verse_fails_even_with_approved_evidence(self) -> None:
        reduced_hebrew = self._usfm({1: self.hebrew_texts[1]}).encode("utf-8")
        self._write_snapshot(self.webu_raw, reduced_hebrew)
        source_lock = self._source_lock()
        source_lock["snapshots"]["fixture"]["sha256"] = sha256_bytes(
            self.snapshot_path.read_bytes()
        )
        source_lock["files"]["WLC-GEN"]["sha256"] = sha256_bytes(reduced_hebrew)
        self._write_source_lock(source_lock)
        self.assert_gate_fails("sursa fixată nu acoperă 1:2")

    def test_malformed_jsonl_fails(self) -> None:
        self.evidence_path.write_text("{not-json}\n", encoding="utf-8")
        self.assert_gate_fails("JSON invalid")

    def test_duplicate_json_keys_fail(self) -> None:
        line = canonical_json(self.records[0])
        duplicate = line[:-1] + ',"reference":"GEN.1.1"}'
        self.evidence_path.write_text(duplicate + "\n" + canonical_json(self.records[1]) + "\n", encoding="utf-8")
        self.assert_gate_fails("cheie JSON duplicată: reference")

    def test_wrong_record_schema_fails(self) -> None:
        self._mutate_record(
            0,
            lambda record: record.__setitem__("recordType", "ot-chapter-source-evidence"),
        )
        self.assert_gate_fails("schema sau recordType invalid")


if __name__ == "__main__":
    unittest.main()
