#!/usr/bin/env python3
"""Tests for the unresolved canonical OT review-queue generator."""

from __future__ import annotations

import importlib.util
import json
import tempfile
import unittest
from pathlib import Path
from types import ModuleType


SCRIPT_PATH = Path(__file__).with_name("generate-biblia-emanus-ot-review-queue.py")
GATE_TEST_PATH = Path(__file__).with_name("test_biblia_emanus_ot_source_evidence.py")


def load_module(name: str, path: Path) -> ModuleType:
    spec = importlib.util.spec_from_file_location(name, path)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Nu pot încărca {path}")
    module = importlib.util.module_from_spec(spec)
    import sys

    sys.modules[spec.name] = module
    spec.loader.exec_module(module)
    return module


queue = load_module("ot_review_queue", SCRIPT_PATH)
gate_tests = load_module("ot_source_evidence_tests", GATE_TEST_PATH)


class OtReviewQueueTests(unittest.TestCase):
    def test_queue_record_keeps_hash_bound_sources_and_is_unresolved(self) -> None:
        context = queue.gate.VerseContext(
            reference="GEN.1.1",
            romanian="La început.",
            hebrew_lock_id="WLC-GEN",
            hebrew_references=("1:1",),
            hebrew_payload="1:1\tבְּרֵאשִׁית",
            webu_lock_id="WEBU-GEN",
            webu_references=("1:1",),
            webu_payload="1:1\tIn the beginning.",
        )
        record = queue.queue_record(context)

        self.assertEqual(record["status"], "unresolved")
        self.assertEqual(record["reference"], "GEN.1.1")
        self.assertEqual(record["texts"]["hebrew"]["references"], ["1:1"])
        self.assertEqual(
            record["bindingSha256"],
            queue.gate.binding_digest("GEN.1.1", record["texts"]),
        )

    def test_generate_writes_one_record_for_each_fixture_verse(self) -> None:
        fixture = gate_tests.OtSourceEvidenceGateTests("setUp")
        fixture.setUp()
        try:
            queue.gate.PRODUCTION_CONTRACT = fixture.contract
            with tempfile.TemporaryDirectory() as temporary:
                output = Path(temporary) / "queue.jsonl"
                count = queue.generate(fixture.root, output)
                records = [json.loads(line) for line in output.read_text().splitlines()]
            self.assertEqual(count, 2)
            self.assertEqual([record["reference"] for record in records], ["GEN.1.1", "GEN.1.2"])
            self.assertTrue(all(record["status"] == "unresolved" for record in records))
        finally:
            queue.gate.PRODUCTION_CONTRACT = queue.gate.ValidationContract(
                book_chapters=queue.gate.CANONICAL_OT_CHAPTERS,
                expected_verse_count=queue.gate.EXPECTED_OT_VERSE_COUNT,
            )
            fixture.tearDown()


if __name__ == "__main__":
    unittest.main()
