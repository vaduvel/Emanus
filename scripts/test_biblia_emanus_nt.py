from __future__ import annotations

import copy
import hashlib
import importlib.util
import io
import json
import tempfile
import unittest
import zipfile
from contextlib import redirect_stderr, redirect_stdout
from pathlib import Path
from unittest.mock import patch


ROOT = Path(__file__).resolve().parents[1]
VALIDATOR_PATH = ROOT / "scripts" / "check-biblia-emanus.py"
VALIDATOR_SPEC = importlib.util.spec_from_file_location(
    "biblia_emanus_nt_validator", VALIDATOR_PATH
)
assert VALIDATOR_SPEC is not None and VALIDATOR_SPEC.loader is not None
validator = importlib.util.module_from_spec(VALIDATOR_SPEC)
VALIDATOR_SPEC.loader.exec_module(validator)

SEAL_PATH = ROOT / "scripts" / "seal-biblia-emanus.py"
SEAL_SPEC = importlib.util.spec_from_file_location("biblia_emanus_nt_seal", SEAL_PATH)
assert SEAL_SPEC is not None and SEAL_SPEC.loader is not None
seal = importlib.util.module_from_spec(SEAL_SPEC)
SEAL_SPEC.loader.exec_module(seal)


EXPECTED_NT_CHAPTER_COUNTS = {
    "MAT": 28,
    "MRK": 16,
    "LUK": 24,
    "JHN": 21,
    "ACT": 28,
    "ROM": 16,
    "1CO": 16,
    "2CO": 13,
    "GAL": 6,
    "EPH": 6,
    "PHP": 4,
    "COL": 4,
    "1TH": 5,
    "2TH": 3,
    "1TI": 6,
    "2TI": 4,
    "TIT": 3,
    "PHM": 1,
    "HEB": 13,
    "JAS": 5,
    "1PE": 5,
    "2PE": 3,
    "1JN": 5,
    "2JN": 1,
    "3JN": 1,
    "JUD": 1,
    "REV": 22,
}

EXPECTED_FIXED_THRESHOLDS = {
    "minimumLengthRatio": 0.35,
    "maximumLengthRatio": 1.75,
    "minimumWordsForTokenOverlap": 8,
    "minimumRomanianTokenOverlap": 0.14,
    "maximumChapterSequenceSimilarity": 0.94,
}

LEDGER_POLICY = {
    "englishLicense": "Public Domain",
    "oldTestamentTextLicense": "Public Domain",
    "requireExactChapterUrls": True,
    "requireCanonicalVerseCount": True,
    "sourceLanguageReviewStillRequired": True,
    "requirePinnedSourceSnapshot": True,
    "requireVersificationMapping": True,
}


def sha256(value: bytes) -> str:
    return hashlib.sha256(value).hexdigest()


def write_zip(path: Path, entries: dict[str, bytes]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(path, "w", compression=zipfile.ZIP_STORED) as archive:
        for name, value in sorted(entries.items()):
            info = zipfile.ZipInfo(name, date_time=(1980, 1, 1, 0, 0, 0))
            info.compress_type = zipfile.ZIP_STORED
            info.external_attr = 0o100644 << 16
            archive.writestr(info, value)


def build_source_lock_fixture(data_dir: Path) -> tuple[dict, dict[str, str]]:
    upstream_payloads = {
        "engwebp": b"fixture-engwebp-archive",
        "hboWLC": b"fixture-wlc-archive",
        "ronbtf": b"fixture-btf-archive",
        "ron1924": b"fixture-cornilescu-archive",
        "sblgnt": b"fixture-sblgnt-archive",
        "grctr": b"fixture-tr-archive",
    }
    source_files = {
        "WEBU-GEN": b"\\id GEN\n\\c 1\n\\v 1 In the beginning.\n",
        "WLC-GEN": "\\id GEN\n\\c 1\n\\v 1 בְּרֵאשִׁית\n".encode(),
        "BTF-GEN": "\\id GEN\n\\c 1\n\\v 1 La început.\n".encode(),
        "CORNILESCU1924-GEN": "\\id GEN\n\\c 1\n\\v 1 Ла ынчепут.\n".encode(),
        "WEBU-MAT": b"\\id MAT\n\\c 1\n\\v 1 The book of the genealogy.\n",
        "SBLGNT-MAT": "Matthew 1:1\tΒίβλος γενέσεως Ἰησοῦ Χριστοῦ\n".encode(),
        "TR-MAT": "\\id MAT\n\\c 1\n\\v 1 Βίβλος γενέσεως Ἰησοῦ Χριστοῦ\n".encode(),
        "BTF-MAT": "\\id MAT\n\\c 1\n\\v 1 Cartea genealogiei.\n".encode(),
        "CORNILESCU1924-MAT": "\\id MAT\n\\c 1\n\\v 1 Картя нямулуй.\n".encode(),
    }
    upstream_paths = {
        "engwebp": "upstream/engwebp.zip",
        "hboWLC": "upstream/hboWLC.zip",
        "ronbtf": "upstream/ronbtf.zip",
        "ron1924": "upstream/ron1924.zip",
        "sblgnt": "upstream/sblgnt.tar.gz",
        "grctr": "upstream/grctr.zip",
    }
    file_paths = {
        "WEBU-GEN": ("ot", "web/GEN.usfm"),
        "WLC-GEN": ("ot", "wlc/GEN.usfm"),
        "BTF-GEN": ("ot", "btf/GEN.usfm"),
        "CORNILESCU1924-GEN": ("ot", "cornilescu/GEN.usfm"),
        "WEBU-MAT": ("nt", "web/MAT.usfm"),
        "SBLGNT-MAT": ("nt", "sblgnt/Matthew.txt"),
        "TR-MAT": ("nt", "tr/MAT.usfm"),
        "BTF-MAT": ("nt", "btf/MAT.usfm"),
        "CORNILESCU1924-MAT": ("nt", "cornilescu/MAT.usfm"),
    }

    ot_entries = {
        upstream_paths[source_id]: payload
        for source_id, payload in upstream_payloads.items()
        if source_id in {"engwebp", "hboWLC", "ronbtf", "ron1924"}
    }
    nt_entries = {
        upstream_paths[source_id]: payload
        for source_id, payload in upstream_payloads.items()
        if source_id in {"sblgnt", "grctr"}
    }
    for lock_id, (snapshot_id, archive_path) in file_paths.items():
        (ot_entries if snapshot_id == "ot" else nt_entries)[archive_path] = source_files[lock_id]

    ot_path = data_dir / "sources" / "ot-fixture.zip"
    nt_path = data_dir / "sources" / "nt-fixture.zip"
    write_zip(ot_path, ot_entries)
    write_zip(nt_path, nt_entries)
    snapshot_hashes = {"ot": sha256(ot_path.read_bytes()), "nt": sha256(nt_path.read_bytes())}

    upstream = {
        "engwebp": {
            "url": "https://ebible.org/Scriptures/engwebp_usfm.zip",
            "archiveDate": "2026-08-04",
            "sha256": sha256(upstream_payloads["engwebp"]),
            "license": "Public Domain",
            "language": "en",
            "snapshotId": "ot",
            "archivePath": upstream_paths["engwebp"],
        },
        "hboWLC": {
            "url": "https://ebible.org/Scriptures/hboWLC_usfm.zip",
            "archiveDate": "2026-08-04",
            "sha256": sha256(upstream_payloads["hboWLC"]),
            "textLicense": "Public Domain",
            "language": "he",
            "snapshotId": "ot",
            "archivePath": upstream_paths["hboWLC"],
        },
        "ronbtf": {
            "url": "https://ebible.org/Scriptures/ronbtf_usfm.zip",
            "archiveDate": "2026-08-04",
            "sha256": sha256(upstream_payloads["ronbtf"]),
            "license": "Public Domain",
            "language": "ro",
            "snapshotId": "ot",
            "archivePath": upstream_paths["ronbtf"],
        },
        "ron1924": {
            "url": "https://ebible.org/Scriptures/ron1924_usfm.zip",
            "archiveDate": "2026-08-04",
            "sha256": sha256(upstream_payloads["ron1924"]),
            "license": "Public Domain",
            "language": "ro-Cyrl",
            "snapshotId": "ot",
            "archivePath": upstream_paths["ron1924"],
        },
        "sblgnt": {
            "url": "https://github.com/LogosBible/SBLGNT",
            "archiveDate": "2026-08-04",
            "sha256": sha256(upstream_payloads["sblgnt"]),
            "license": "CC BY 4.0",
            "language": "el",
            "version": "1.2",
            "commit": validator.SBLGNT_COMMIT,
            "snapshotId": "nt",
            "archivePath": upstream_paths["sblgnt"],
        },
        "grctr": {
            "url": "https://ebible.org/details.php?id=grctr",
            "archiveDate": "2026-08-04",
            "sha256": sha256(upstream_payloads["grctr"]),
            "license": "Public Domain",
            "language": "el",
            "textFamily": "Textus Receptus",
            "snapshotId": "nt",
            "archivePath": upstream_paths["grctr"],
        },
    }
    for record in upstream.values():
        record["archiveEmbedded"] = True

    files = {}
    file_metadata = {
        "WEBU-GEN": ("GEN", "en", "base", "engwebp", None),
        "WLC-GEN": ("GEN", "he", "original", "hboWLC", None),
        "BTF-GEN": ("GEN", "ro", "benchmark", "ronbtf", "BTF"),
        "CORNILESCU1924-GEN": (
            "GEN",
            "ro-Cyrl",
            "benchmark",
            "ron1924",
            "CORNILESCU-1924",
        ),
        "WEBU-MAT": ("MAT", "en", "base", "engwebp", None),
        "SBLGNT-MAT": ("MAT", "el", "original", "sblgnt", None),
        "TR-MAT": ("MAT", "el", "original-supplement", "grctr", None),
        "BTF-MAT": ("MAT", "ro", "benchmark", "ronbtf", "BTF"),
        "CORNILESCU1924-MAT": (
            "MAT",
            "ro-Cyrl",
            "benchmark",
            "ron1924",
            "CORNILESCU-1924",
        ),
    }
    for lock_id, (book_id, language, role, source_id, benchmark_id) in file_metadata.items():
        snapshot_id, archive_path = file_paths[lock_id]
        record = {
            "bookId": book_id,
            "language": language,
            "role": role,
            "sourceId": source_id,
            "snapshotId": snapshot_id,
            "archivePath": archive_path,
            "sha256": sha256(source_files[lock_id]),
        }
        if lock_id == "SBLGNT-MAT":
            record["format"] = "sblgnt-plaintext"
        if benchmark_id is not None:
            record["benchmarkId"] = benchmark_id
            record["family"] = "cornilescu" if "CORNILESCU" in lock_id else "fidela"
        files[lock_id] = record

    lock = {
        "schemaVersion": 3,
        "engineVersion": validator.NT_ENGINE_VERSION,
        "translation": "BE",
        "capturedOn": "2026-08-04",
        "snapshots": {
            "ot": {"path": "sources/ot-fixture.zip", "sha256": snapshot_hashes["ot"]},
            "nt": {"path": "sources/nt-fixture.zip", "sha256": snapshot_hashes["nt"]},
        },
        "books": {
            "GEN": {
                "name": "Geneza",
                "order": 1,
                "testament": "OT",
                "baseLockId": "WEBU-GEN",
                "originalLockId": "WLC-GEN",
                "benchmarkLockIds": ["BTF-GEN", "CORNILESCU1924-GEN"],
                "externalBenchmarkIds": ["NTR"],
            },
            "MAT": {
                "name": "Matei",
                "order": 40,
                "testament": "NT",
                "baseLockId": "WEBU-MAT",
                "originalLockId": "SBLGNT-MAT",
                "supplementalOriginalLockIds": ["TR-MAT"],
                "benchmarkLockIds": ["BTF-MAT", "CORNILESCU1924-MAT"],
                "externalBenchmarkIds": ["NTR"],
            },
        },
        "upstreamArtifacts": upstream,
        "files": files,
        "artifacts": {},
        "versificationRules": [],
        "automatedThresholds": copy.deepcopy(EXPECTED_FIXED_THRESHOLDS),
    }
    return lock, snapshot_hashes


def draft_nt_chapter(text: str, *, include_greek: bool = True) -> tuple[dict, dict, dict, dict]:
    english_url = "https://ebible.org/engwebp/MAT01.htm"
    greek_url = "https://www.sblgnt.com/download/"
    source = {
        "english": {
            "version": "WEBU-Protestant",
            "license": "Public Domain",
            "lockId": "WEBU-MAT",
            "passageUrl": english_url,
        }
    }
    if include_greek:
        source["greek"] = {
            "version": "SBLGNT-1.2",
            "commit": validator.SBLGNT_COMMIT,
            "license": "CC BY 4.0",
            "lockId": "SBLGNT-MAT",
            "passageUrl": greek_url,
            "supplementalWitnesses": [
                {"lockId": "TR-MAT", "language": "greacă", "role": "textual-witness"}
            ],
        }
    data = {
        "translation": "BE",
        "bookId": "MAT",
        "bookName": "Matei",
        "chapter": 1,
        "status": "draft",
        "public": False,
        "review": {
            "biblicalGreek": "pending",
            "romanianLanguage": "pending",
            "theologicalContext": "pending",
            "finalApproval": "pending",
        },
        "source": source,
        "verses": [{"number": 1, "text": text}],
        "editorialNotes": [],
        "referenceNotes": [],
        "alternateEndings": [],
    }
    manifest = {"automatedPublicationGate": {"minimumRomanianBenchmarks": 3}}
    ledger = {
        "MAT.1": {
            "expectedVerses": 1,
            "verseNumbers": [1],
            "referenceNoteNumbers": [],
            "textualStatuses": [],
            "englishUrl": english_url,
            "greekUrl": greek_url,
            "textualVariantReview": [],
            "versificationRuleIds": [],
        }
    }
    source_data = {
        "books": {
            "MAT": {
                "name": "Matei",
                "testament": "NT",
                "baseLockId": "WEBU-MAT",
                "originalLockId": "SBLGNT-MAT",
                "supplementalOriginalLockIds": ["TR-MAT"],
                "benchmarkLockIds": ["BTF-MAT", "CORNILESCU1924-MAT"],
                "externalBenchmarkIds": ["NTR"],
            }
        },
        "files": {},
        "texts": {},
        "thresholds": copy.deepcopy(EXPECTED_FIXED_THRESHOLDS),
        "snapshotSha256ByBook": {"MAT": "a" * 64},
    }
    return data, manifest, ledger, source_data


def approved_nt_audit_fixture() -> dict:
    data = {
        "translation": "BE",
        "bookId": "MAT",
        "bookName": "Matei",
        "chapter": 1,
        "source": {"greek": {"version": "SBLGNT-1.2"}},
        "review": {"aiSourceLanguage": "approved"},
        "benchmark": {"translationsConsulted": ["CORNILESCU-1924", "BTF", "NTR"]},
        "verses": [{"number": 1, "text": "Cartea nașterii lui Isus Hristos."}],
        "editorialNotes": [
            {
                "verse": 1,
                "term": "γενέσεως",
                "decision": "Redat prin «nașterii» în acest context.",
                "reviewRequired": False,
            }
        ],
        "referenceNotes": [],
        "alternateEndings": [],
    }
    data["audit"] = {
        "schemaVersion": 2,
        "engineVersion": validator.NT_ENGINE_VERSION,
        "reviewLevel": "ai-complete",
        "completedOn": "2026-08-04",
        "reviewAgent": {
            "type": "ai",
            "engine": "fixture-engine",
            "method": "verse-by-verse-source-and-benchmark",
        },
        "sourceSnapshotSha256": "a" * 64,
        "verseCoverage": {
            "expected": 1,
            "reviewed": 1,
            "continuous": True,
            "verseNumbersSha256": "sha256:" + sha256(b"1"),
        },
        "sourceLanguage": {
            "result": "approved",
            "scope": "Fiecare verset și fiecare variantă declarată.",
            "language": "greacă koine",
            "text": "SBLGNT 1.2 + aparat; Textus Receptus ca martor suplimentar",
        },
        "romanianLanguage": {
            "result": "approved",
            "changesApplied": ["Ordine românească naturală verificată."],
        },
        "theologicalContext": {
            "result": "approved",
            "principles": ["Sensul grecesc a fost păstrat fără adaos confesional."],
        },
        "omissionAddition": {"result": "approved", "omissions": 0, "additions": 0},
        "copyrightDistance": {
            "result": "approved",
            "method": "Comparație independentă cu etaloanele.",
        },
        "criticalIssues": {"result": "approved", "open": 0},
        "benchmarkEvidence": {
            "pinnedBenchmarks": 2,
            "externalBenchmarks": 1,
            "result": "approved",
        },
    }
    data["audit"]["textDigest"] = validator.chapter_text_digest(data)
    data["audit"]["contentDigest"] = validator.chapter_content_digest(data)
    return data


def ledger_fixture(
    chapter_id: str,
    verse_numbers: list[int],
    textual_variants: list[str],
    *,
    reference_note_numbers: list[int] | None = None,
    textual_statuses: list[dict] | None = None,
) -> tuple[dict, dict]:
    book_id = chapter_id.split(".", 1)[0]
    ledger = {
        "schemaVersion": 1,
        "translation": "BE",
        "policy": copy.deepcopy(LEDGER_POLICY),
        "sourceLock": "source-lock.json",
        "chapters": {
            chapter_id: {
                "expectedVerses": len(verse_numbers),
                "verseNumbers": verse_numbers,
                "referenceNoteNumbers": reference_note_numbers or [],
                "textualStatuses": textual_statuses or [],
                "englishUrl": f"https://ebible.org/engwebp/{book_id}.htm",
                "greekUrl": (
                    f"https://github.com/LogosBible/SBLGNT/blob/"
                    f"{validator.SBLGNT_COMMIT}/data/sblgnt/text/Matt.txt"
                ),
                "textualVariantReview": textual_variants,
                "versificationRuleIds": [],
            }
        },
    }
    source_data = {
        "books": {book_id: {"testament": "NT"}},
        "rules": [],
    }
    return ledger, source_data


class BibliaEmanusNewTestamentTests(unittest.TestCase):
    def test_editorial_placeholders_block_approval(self) -> None:
        data, manifest, ledger, source_data = draft_nt_chapter(
            "Cartea nașterii lui Isus Hristos."
        )
        data["status"] = "approved"
        data["editorialNotes"] = [
            {
                "verse": 1,
                "term": "γενέσεως",
                "decision": "DE DOCUMENTAT din aparatul critic",
                "reviewRequired": True,
                "resolutionStatus": "pending",
            }
        ]
        with self.assertRaisesRegex(
            validator.ValidationError, "marcaj editorial nerezolvat"
        ):
            validator.validate_chapter(
                Path("MAT.1.json"), data, manifest, ledger, source_data, []
            )

    def test_sblgnt_plaintext_parser_preserves_greek_and_rejects_duplicates(self) -> None:
        raw = (
            "Matthew 1:1\tΒίβλος γενέσεως Ἰησοῦ Χριστοῦ\n"
            "Matthew 1:2\tἈβραὰμ ἐγέννησεν τὸν Ἰσαάκ\n"
        ).encode()
        self.assertEqual(
            validator.parse_sblgnt_verses(raw, "MAT fixture"),
            {
                (1, 1): "Βίβλος γενέσεως Ἰησοῦ Χριστοῦ",
                (1, 2): "Ἀβραὰμ ἐγέννησεν τὸν Ἰσαάκ",
            },
        )
        with self.assertRaisesRegex(validator.ValidationError, "referință duplicată"):
            validator.parse_sblgnt_verses(raw + raw.splitlines(keepends=True)[0], "MAT duplicate")

    def test_new_testament_chapter_requires_pinned_greek_source(self) -> None:
        data, manifest, ledger, source_data = draft_nt_chapter(
            "Cartea nașterii lui Isus Hristos.", include_greek=False
        )
        with self.assertRaisesRegex(validator.ValidationError, "cere sursa greacă SBLGNT"):
            validator.validate_chapter(
                Path("MAT.1.json"), data, manifest, ledger, source_data, []
            )

    def test_iso_dates_are_calendar_strict_and_canonical(self) -> None:
        self.assertEqual(validator.validate_iso_date("2028-02-29", "fixture"), "2028-02-29")
        for invalid in ("2026-02-29", "2026-2-01", "2026-13-01", "2026-08-04T00:00:00"):
            with self.subTest(value=invalid):
                with self.assertRaises(validator.ValidationError):
                    validator.validate_iso_date(invalid, "fixture")

    def test_crossed_romanian_quotes_are_rejected_even_when_counts_balance(self) -> None:
        data, manifest, ledger, source_data = draft_nt_chapter(
            "El spune: „Ieși «acum” afară»."
        )
        with self.assertRaisesRegex(
            validator.ValidationError, "ghilimelele sunt încrucișate"
        ):
            validator.validate_chapter(
                Path("MAT.1.json"), data, manifest, ledger, source_data, []
            )

    def test_content_digest_invalidates_editorial_note_changes(self) -> None:
        data = approved_nt_audit_fixture()
        validator.validate_automated_audit(
            Path("MAT.1.json"), data, "published", "a" * 64, 1, 2, 1, "NT"
        )
        changed = copy.deepcopy(data)
        changed["editorialNotes"][0]["decision"] = "Decizia a fost schimbată după sigilare."
        self.assertEqual(changed["audit"]["textDigest"], validator.chapter_text_digest(changed))
        with self.assertRaisesRegex(
            validator.ValidationError, "nu corespunde notelor și deciziilor editoriale"
        ):
            validator.validate_automated_audit(
                Path("MAT.1.json"), changed, "published", "a" * 64, 1, 2, 1, "NT"
            )

    def test_nt_canon_is_exactly_27_books_and_260_chapters(self) -> None:
        self.assertEqual(validator.NT_CHAPTER_COUNTS, EXPECTED_NT_CHAPTER_COUNTS)
        self.assertEqual(len(validator.NT_CHAPTER_COUNTS), 27)
        self.assertEqual(sum(validator.NT_CHAPTER_COUNTS.values()), 260)

        complete_ids = [
            f"{book_id}.{chapter}"
            for book_id, chapters in EXPECTED_NT_CHAPTER_COUNTS.items()
            for chapter in range(1, chapters + 1)
        ]
        result, _, error = self.run_synthetic_nt(complete_ids)
        self.assertEqual(result, 0, error)

        result, _, error = self.run_synthetic_nt(complete_ids[:-1])
        self.assertEqual(result, 1)
        self.assertIn("exact cele 27 de cărți și 260 de capitole", error)

    def test_automated_thresholds_are_fixed_and_cannot_be_relaxed(self) -> None:
        self.assertEqual(validator.FIXED_AUTOMATED_THRESHOLDS, EXPECTED_FIXED_THRESHOLDS)
        with tempfile.TemporaryDirectory() as directory:
            data_dir = Path(directory)
            lock, _ = build_source_lock_fixture(data_dir)
            lock["automatedThresholds"]["minimumRomanianTokenOverlap"] = 0.01
            with patch.object(validator, "DATA_DIR", data_dir):
                with self.assertRaisesRegex(validator.ValidationError, "pragurile.*sunt fixe"):
                    validator.validate_source_lock(lock)

    def test_sblgnt_commit_and_license_are_pinned(self) -> None:
        mutations = {
            "commit": "0" * 40,
            "license": "proprietary",
        }
        for key, value in mutations.items():
            with self.subTest(field=key), tempfile.TemporaryDirectory() as directory:
                data_dir = Path(directory)
                lock, _ = build_source_lock_fixture(data_dir)
                lock["upstreamArtifacts"]["sblgnt"][key] = value
                with patch.object(validator, "DATA_DIR", data_dir):
                    with self.assertRaisesRegex(
                        validator.ValidationError, "cere SBLGNT 1.2 fixat la commitul oficial"
                    ):
                        validator.validate_source_lock(lock)

    def test_nt_requires_public_domain_tr_supplemental_witness(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            data_dir = Path(directory)
            lock, _ = build_source_lock_fixture(data_dir)
            lock["upstreamArtifacts"]["grctr"]["license"] = "unknown"
            with patch.object(validator, "DATA_DIR", data_dir):
                with self.assertRaisesRegex(
                    validator.ValidationError, "cere un martor grec TR public-domain"
                ):
                    validator.validate_source_lock(lock)

    def test_multi_snapshot_lock_returns_hash_for_each_book(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            data_dir = Path(directory)
            lock, expected_hashes = build_source_lock_fixture(data_dir)
            with patch.object(validator, "DATA_DIR", data_dir):
                source_data = validator.validate_source_lock(lock)
            self.assertIsNone(source_data["snapshotSha256"])
            self.assertEqual(source_data["snapshotIdsByBook"], {"GEN": "ot", "MAT": "nt"})
            self.assertEqual(
                source_data["snapshotSha256ByBook"],
                {"GEN": expected_hashes["ot"], "MAT": expected_hashes["nt"]},
            )

            sealed = seal.seal_chapter(
                validator,
                {
                    "translation": "BE",
                    "bookId": "MAT",
                    "bookName": "Matei",
                    "chapter": 1,
                    "source": {},
                    "review": {},
                    "benchmark": {},
                    "verses": [{"number": 1, "text": "Text românesc verificat."}],
                    "editorialNotes": [],
                    "referenceNotes": [],
                    "alternateEndings": [],
                    "audit": {},
                },
                source_data,
                "fixture-engine",
            )
            self.assertEqual(sealed["audit"]["schemaVersion"], 2)
            self.assertEqual(sealed["audit"]["sourceSnapshotSha256"], expected_hashes["nt"])
            self.assertEqual(
                sealed["audit"]["contentDigest"], validator.chapter_content_digest(sealed)
            )

    def test_disputed_passage_status_cannot_be_omitted_from_chapter(self) -> None:
        expected_statuses = [
            {
                "status": "double-bracketed",
                "verseNumbers": list(range(9, 21)),
            }
        ]
        verses = [
            {"number": number, "text": f"Text românesc pentru versetul {number}."}
            for number in range(1, 21)
        ]
        with self.assertRaisesRegex(
            validator.ValidationError, "statutul textual lipsește la versetul 9"
        ):
            validator.validate_textual_statuses(
                Path("MRK.16.json"), verses, expected_statuses
            )
        for verse in verses[8:]:
            verse["textualStatus"] = "double-bracketed"
        validator.validate_textual_statuses(
            Path("MRK.16.json"), verses, expected_statuses
        )

    def test_absent_critical_verse_requires_reference_note_from_ledger(self) -> None:
        verse_numbers = [number for number in range(1, 28) if number != 21]
        ledger, source_data = ledger_fixture(
            "MAT.17",
            verse_numbers,
            [],
            reference_note_numbers=[21],
        )
        normalized = validator.validate_ledger(ledger, source_data)
        self.assertEqual(normalized["MAT.17"]["verseNumbers"], verse_numbers)
        self.assertEqual(normalized["MAT.17"]["referenceNoteNumbers"], [21])

        with self.assertRaisesRegex(
            validator.ValidationError, "referințele critice nu corespund registrului"
        ):
            validator.validate_reference_notes(
                Path("MAT.17.json"), [], verse_numbers, [21], "published"
            )
        note = {
            "number": 21,
            "status": "not-in-critical-main-text",
            "reason": "Numărul nu apare în textul principal SBLGNT.",
            "greekWitnesses": "Citirea tradițională este păstrată de TR.",
            "displayNote": "Verset tradițional absent din textul critic principal.",
            "traditionalReading": "Citirea tradițională este afișată în notă.",
            "resolutionStatus": "resolved",
        }
        self.assertEqual(
            validator.validate_reference_notes(
                Path("MAT.17.json"), [note], verse_numbers, [21], "published"
            ),
            1,
        )

    def test_registered_textual_variant_requires_resolved_editorial_note(self) -> None:
        with self.assertRaisesRegex(validator.ValidationError, "nu are notă editorială"):
            validator.validate_editorial_notes(
                Path("MRK.16.json"), [], list(range(1, 21)), ["MRK.16.9"], "published"
            )
        note = {
            "verse": 9,
            "term": "Finalul lung al Evangheliei după Marcu",
            "decision": "Text păstrat și marcat explicit ca pasaj disputat textual.",
            "alternatives": ["Încheierea la Marcu 16:8"],
            "reviewRequired": True,
            "resolutionStatus": "resolved",
            "resolutionReason": "Martorii și statutul textual sunt documentate în registru.",
        }
        self.assertEqual(
            validator.validate_editorial_notes(
                Path("MRK.16.json"), [note], list(range(1, 21)), ["MRK.16.9"], "published"
            ),
            1,
        )

    def test_explicit_split_combine_and_pairwise_mappings_are_applied(self) -> None:
        split = {
            "id": "ACT-19-40-41-SPLIT",
            "sourceLockId": "SBLGNT-ACT",
            "bookId": "ACT",
            "targetReferences": ["19:40", "19:41"],
            "sourceReferences": ["19:40"],
            "mapping": "split",
        }
        combine = {
            "id": "ROM-16-25-COMBINE",
            "sourceLockId": "SBLGNT-ROM",
            "bookId": "ROM",
            "targetReferences": ["16:25"],
            "sourceReferences": ["14:24", "14:25", "14:26"],
            "mapping": "combine",
        }
        pairwise = {
            "id": "2CO-13-PAIRWISE",
            "sourceLockId": "SBLGNT-2CO",
            "bookId": "2CO",
            "targetReferences": ["13:13", "13:14"],
            "sourceReferences": ["13:12", "13:13"],
            "mapping": "pairwise",
        }
        self.assertEqual(
            validator.source_references_for_target(
                "SBLGNT-ACT", "ACT", 19, 41, [split]
            ),
            ((19, 40),),
        )
        self.assertEqual(
            validator.source_references_for_target(
                "SBLGNT-ROM", "ROM", 16, 25, [combine]
            ),
            ((14, 24), (14, 25), (14, 26)),
        )
        self.assertEqual(
            validator.source_references_for_target(
                "SBLGNT-2CO", "2CO", 13, 14, [pairwise]
            ),
            ((13, 13),),
        )
        with self.assertRaisesRegex(validator.ValidationError, "nu este unu-la-unu"):
            validator.source_reference_for_target(
                "SBLGNT-ROM", "ROM", 16, 25, [combine]
            )

    def test_pinned_benchmark_with_gap_cannot_claim_coverage(self) -> None:
        source_data = {
            "books": {
                "MAT": {
                    "originalLockId": "SBLGNT-MAT",
                    "supplementalOriginalLockIds": ["TR-MAT"],
                }
            },
            "files": {
                "SBLGNT-MAT": {"bookId": "MAT", "role": "original"},
                "TR-MAT": {"bookId": "MAT", "role": "original-supplement"},
                "BTF-MAT": {
                    "bookId": "MAT",
                    "role": "benchmark",
                    "missingTargetReferences": ["1:2"],
                },
            },
            "references": {
                "SBLGNT-MAT": {(1, 1), (1, 2)},
                "TR-MAT": {(1, 1), (1, 2)},
                "BTF-MAT": {(1, 1)},
            },
            "rules": [],
        }
        with self.assertRaisesRegex(
            validator.ValidationError, "etalonul fixat BTF-MAT nu poate avea versete lipsă"
        ):
            validator.validate_source_coverage(
                {"MAT.1": {"expectedVerses": 2, "verseNumbers": [1, 2]}}, source_data
            )

    def run_synthetic_nt(self, chapter_ids: list[str]) -> tuple[int, str, str]:
        with tempfile.TemporaryDirectory() as directory:
            data_dir = Path(directory)
            for chapter_id in chapter_ids:
                (data_dir / f"{chapter_id}.json").write_text("{}\n", encoding="utf-8")

            total = len(chapter_ids)
            manifest_path = data_dir / "manifest.json"
            manifest = {
                "draftedChapters": chapter_ids,
                "progress": {
                    "chaptersDrafted": total,
                    "versesDrafted": total,
                    "chaptersApproved": total,
                    "chaptersPublished": total,
                },
                "public": total > 0,
                "newTestament": {
                    "books": 27,
                    "chapters": 260,
                    "verses": total,
                    "status": "published",
                    "public": True,
                },
            }
            paths = {
                "sourceLock": data_dir / "source-lock.json",
                "sourceLedger": data_dir / "source-ledger.json",
                "onomastics": data_dir / "onomastics.json",
            }
            source_data = {"books": {book_id: {} for book_id in EXPECTED_NT_CHAPTER_COUNTS}}
            ledger = {chapter_id: {} for chapter_id in chapter_ids}

            def fake_load_json(path: Path) -> dict:
                return manifest if path == manifest_path else {}

            def fake_validate_chapter(path: Path, *_args) -> tuple[str, int, int, str, int]:
                return path.stem, 1, 0, "published", 1

            stdout = io.StringIO()
            stderr = io.StringIO()
            with (
                patch.object(validator, "DATA_DIR", data_dir),
                patch.object(validator, "MANIFEST_PATH", manifest_path),
                patch.object(validator, "load_json", side_effect=fake_load_json),
                patch.object(validator, "validate_manifest", return_value=paths),
                patch.object(validator, "validate_source_lock", return_value=source_data),
                patch.object(validator, "validate_ledger", return_value=ledger),
                patch.object(validator, "validate_onomastics", return_value=[]),
                patch.object(validator, "validate_source_coverage", return_value=None),
                patch.object(validator, "validate_chapter", side_effect=fake_validate_chapter),
                redirect_stdout(stdout),
                redirect_stderr(stderr),
            ):
                result = validator.main()
            return result, stdout.getvalue(), stderr.getvalue()


if __name__ == "__main__":
    unittest.main()
