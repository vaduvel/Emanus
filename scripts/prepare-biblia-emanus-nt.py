#!/usr/bin/env python3
"""Prepare the locked NT registry, chapter skeletons, and local translation workbooks."""

from __future__ import annotations

import argparse
import hashlib
import importlib.util
import json
import zipfile
from pathlib import Path
from types import ModuleType
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs" / "data" / "biblia-emanus"
SOURCES = DATA / "sources"
NT_SNAPSHOT = SOURCES / "nt-sblgnt-1.2.zip"
VERSIFICATION = DATA / "nt-versification.json"
SBL_COMMIT = "c4d241a9c1c479a55b989ba35a4976c1d0b8052c"

SBL_NAMES = {
    "MAT": "Matt", "MRK": "Mark", "LUK": "Luke", "JHN": "John",
    "ACT": "Acts", "ROM": "Rom", "1CO": "1Cor", "2CO": "2Cor",
    "GAL": "Gal", "EPH": "Eph", "PHP": "Phil", "COL": "Col",
    "1TH": "1Thess", "2TH": "2Thess", "1TI": "1Tim", "2TI": "2Tim",
    "TIT": "Titus", "PHM": "Phlm", "HEB": "Heb", "JAS": "Jas",
    "1PE": "1Pet", "2PE": "2Pet", "1JN": "1John", "2JN": "2John",
    "3JN": "3John", "JUD": "Jude", "REV": "Rev",
}

MATERIAL_VARIANTS = {
    "MAT.1": [25], "MAT.5": [22], "MAT.6": [13], "MAT.19": [9],
    "MAT.24": [36], "MRK.1": [1], "MRK.16": [9], "LUK.2": [14],
    "LUK.22": [43], "LUK.23": [34], "JHN.1": [18], "JHN.7": [53],
    "JHN.20": [31], "ACT.19": [40], "ACT.20": [28], "ROM.5": [1],
    "ROM.8": [1], "ROM.9": [5], "ROM.16": [25], "1CO.11": [24],
    "1CO.14": [34], "2CO.13": [12], "GAL.2": [20], "EPH.1": [1],
    "PHP.2": [6], "COL.1": [14], "1TH.2": [7], "1TI.3": [16],
    "HEB.2": [9], "HEB.10": [34], "JAS.2": [20], "1PE.3": [15],
    "2PE.3": [10], "1JN.5": [7], "JUD.1": [5], "REV.1": [8],
    "REV.13": [1], "REV.22": [14], "3JN.1": [14],
}


def load_module(name: str, path: Path) -> ModuleType:
    spec = importlib.util.spec_from_file_location(name, path)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Nu pot încărca {path}")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def read_json(path: Path) -> dict[str, Any]:
    value = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(value, dict):
        raise RuntimeError(f"{path} nu conține un obiect JSON")
    return value


def write_json(path: Path, value: Any, *, compact: bool = True) -> None:
    rendered = json.dumps(
        value,
        ensure_ascii=False,
        sort_keys=False,
        separators=(",", ":") if compact else None,
        indent=None if compact else 2,
    )
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(rendered + "\n", encoding="utf-8")


def sha256_bytes(value: bytes) -> str:
    return hashlib.sha256(value).hexdigest()


def reference(value: str) -> tuple[str, int, int]:
    book, cv = value.split()
    chapter, verse = map(int, cv.split(":"))
    return book, chapter, verse


def cv(value: tuple[int, int]) -> str:
    return f"{value[0]}:{value[1]}"


def add_explicit_rules(old_rules: list[dict[str, Any]]) -> list[dict[str, Any]]:
    return [
        *old_rules,
        {
            "id": "SBL-ACT-19-40-41", "sourceLockId": "SBLGNT-ACT", "bookId": "ACT",
            "mapping": "split", "targetReferences": ["19:40", "19:41"],
            "sourceReferences": ["19:40"],
        },
        {
            "id": "SBL-2CO-13-12-13", "sourceLockId": "SBLGNT-2CO", "bookId": "2CO",
            "mapping": "split", "targetReferences": ["13:12", "13:13"],
            "sourceReferences": ["13:12"],
        },
        {
            "id": "SBL-2CO-13-14", "sourceLockId": "SBLGNT-2CO", "bookId": "2CO",
            "mapping": "pairwise", "targetReferences": ["13:14"],
            "sourceReferences": ["13:13"],
        },
        {
            "id": "SBL-3JN-1-14", "sourceLockId": "SBLGNT-3JN", "bookId": "3JN",
            "mapping": "combine", "targetReferences": ["1:14"],
            "sourceReferences": ["1:14", "1:15"],
        },
        {
            "id": "SBL-REV-13-1", "sourceLockId": "SBLGNT-REV", "bookId": "REV",
            "mapping": "combine", "targetReferences": ["13:1"],
            "sourceReferences": ["12:18", "13:1"],
        },
        {
            "id": "WEBP-ROM-DOXOLOGY", "sourceLockId": "WEBP-ROM", "bookId": "ROM",
            "mapping": "pairwise", "targetReferences": ["16:25", "16:26", "16:27"],
            "sourceReferences": ["14:24", "14:25", "14:26"],
        },
    ]


def target_chapters(versification: dict[str, Any]) -> dict[str, dict[int, list[int]]]:
    return {
        book["id"]: {
            chapter["number"]: chapter["verseNumbers"] for chapter in book["chapters"]
        }
        for book in versification["books"]
    }


def build_lock_and_ledger(
    validator: ModuleType,
    versification: dict[str, Any],
    archive: zipfile.ZipFile,
    internal_manifest: dict[str, Any],
) -> tuple[dict[str, Any], dict[str, Any], dict[str, dict[tuple[int, int], str]]]:
    old_lock = read_json(DATA / "source-lock.json")
    old_ledger = read_json(DATA / "source-ledger.json")
    nt_snapshot_hash = validator.sha256_file(NT_SNAPSHOT)
    records = {record["path"]: record for record in internal_manifest["files"]}

    upstream = json.loads(json.dumps(old_lock["upstreamArtifacts"]))
    old_languages = {"engwebp": "en", "hboWLC": "he", "ronbtf": "ro", "ron1924": "ro-Cyrl"}
    for source_id, record in upstream.items():
        record.update({
            "language": old_languages[source_id], "snapshotId": "ot-legacy",
            "archiveEmbedded": False,
        })
    upstream.update({
        "sblgnt": {
            "url": f"https://github.com/LogosBible/SBLGNT/archive/{SBL_COMMIT}.tar.gz",
            "archiveDate": "2026-08-04", "sha256": internal_manifest["upstreams"]["sblgnt"]["archiveSha256"],
            "license": "CC BY 4.0", "language": "el", "version": "1.2", "commit": SBL_COMMIT,
            "snapshotId": "nt", "archiveEmbedded": True, "archivePath": "upstream/sblgnt.tar.gz",
        },
        "engwebp-nt": {
            "url": "https://ebible.org/Scriptures/engwebp_usfm.zip", "archiveDate": "2026-07-28",
            "sha256": internal_manifest["upstreams"]["webp"]["archiveSha256"], "license": "Public Domain",
            "language": "en", "snapshotId": "nt", "archiveEmbedded": True,
            "archivePath": "upstream/engwebp_usfm.zip",
        },
        "grctr": {
            "url": "https://ebible.org/Scriptures/grctr_usfm.zip", "archiveDate": "2026-08-04",
            "sha256": internal_manifest["upstreams"]["tr"]["archiveSha256"], "license": "Public Domain",
            "language": "el", "textFamily": "Textus Receptus", "snapshotId": "nt",
            "archiveEmbedded": True, "archivePath": "upstream/grctr_usfm.zip",
        },
        "ronbtf-nt": {
            "url": "https://ebible.org/Scriptures/ronbtf_usfm.zip", "archiveDate": "2026-06-11",
            "sha256": internal_manifest["upstreams"]["btf"]["archiveSha256"], "license": "Public Domain",
            "language": "ro", "snapshotId": "nt", "archiveEmbedded": True,
            "archivePath": "upstream/ronbtf_usfm.zip",
        },
        "ron1924-nt": {
            "url": "https://ebible.org/Scriptures/ron1924_usfm.zip", "archiveDate": "2026-06-11",
            "sha256": internal_manifest["upstreams"]["cornilescu1924"]["archiveSha256"], "license": "Public Domain",
            "language": "ro-Cyrl", "snapshotId": "nt", "archiveEmbedded": True,
            "archivePath": "upstream/ron1924_usfm.zip",
        },
        "ronbl": {
            "url": "https://ebible.org/Scriptures/ronbl_usfm.zip", "archiveDate": "2026-08-04",
            "sha256": internal_manifest["upstreams"]["biblia_libera"]["archiveSha256"], "license": "Public Domain",
            "language": "ro", "snapshotId": "nt", "archiveEmbedded": True,
            "archivePath": "upstream/ronbl_usfm.zip",
        },
    })

    books = json.loads(json.dumps(old_lock["books"]))
    files = json.loads(json.dumps(old_lock["files"]))
    for record in files.values():
        record["snapshotId"] = "ot-legacy"
        record["format"] = "usfm"
    texts: dict[str, dict[tuple[int, int], str]] = {}
    legacy_snapshot_path = DATA / old_lock["snapshot"]["path"]
    with zipfile.ZipFile(legacy_snapshot_path) as old_archive:
        for lock_id, record in files.items():
            texts[lock_id] = validator.parse_locked_source(
                old_archive.read(record["archivePath"]), lock_id, record
            )

    chapters = target_chapters(versification)
    for book_id in chapters:
        benchmark_ids = [f"BTF-{book_id}", f"BL-{book_id}"] if book_id == "JHN" else [f"CORNILESCU1924-{book_id}", f"BTF-{book_id}"]
        books[book_id] = {
            "name": validator.BOOK_NAMES[book_id], "order": validator.BOOK_ORDER[book_id],
            "testament": "NT", "baseLockId": f"WEBP-{book_id}",
            "originalLockId": f"SBLGNT-{book_id}",
            "supplementalOriginalLockIds": [f"TR-{book_id}"],
            "benchmarkLockIds": benchmark_ids,
            "externalBenchmarkIds": ["CORNILESCU-1924", "NTR"] if book_id == "JHN" else ["NTR"],
        }
        specifications = [
            (f"WEBP-{book_id}", f"webp/{book_id}.usfm", "en", "base", "engwebp-nt", None, None, "usfm"),
            (f"SBLGNT-{book_id}", f"sblgnt/text/{book_id}.txt", "el", "original", "sblgnt", None, None, "sblgnt-plaintext"),
            (f"TR-{book_id}", f"tr/{book_id}.usfm", "el", "original-supplement", "grctr", None, None, "usfm"),
            (f"BTF-{book_id}", f"btf/{book_id}.usfm", "ro", "benchmark", "ronbtf-nt", "BTF", "fidela", "usfm"),
        ]
        if book_id == "JHN":
            specifications.append((f"BL-{book_id}", f"biblia-libera/{book_id}.usfm", "ro", "benchmark", "ronbl", "BIBLIA-LIBERA", "libera", "usfm"))
        else:
            specifications.append((f"CORNILESCU1924-{book_id}", f"cornilescu1924/{book_id}.usfm", "ro-Cyrl", "benchmark", "ron1924-nt", "CORNILESCU-1924", "cornilescu", "usfm"))
        for lock_id, path, language, role, source_id, benchmark_id, family, source_format in specifications:
            record = {
                "bookId": book_id, "language": language, "role": role,
                "archivePath": path, "sha256": records[path]["sha256"],
                "sourceId": source_id, "snapshotId": "nt", "format": source_format,
            }
            if source_format == "usfm":
                record["allowEmptyVerses"] = True
            if benchmark_id:
                record.update({"benchmarkId": benchmark_id, "family": family})
            files[lock_id] = record
            texts[lock_id] = validator.parse_locked_source(archive.read(path), lock_id, record)

    rules = add_explicit_rules(old_lock["versificationRules"])
    targets: dict[str, set[tuple[int, int]]] = {}
    for chapter_id, ledger_record in old_ledger["chapters"].items():
        old_book_id, old_chapter_text = chapter_id.split(".")
        old_chapter = int(old_chapter_text)
        old_numbers = ledger_record.get("verseNumbers") or list(
            range(1, ledger_record["expectedVerses"] + 1)
        )
        targets.setdefault(old_book_id, set()).update(
            (old_chapter, verse) for verse in old_numbers
        )
    for book_id, book_chapters in chapters.items():
        targets[book_id] = {
            (chapter, verse)
            for chapter, numbers in book_chapters.items()
            for verse in numbers
        }
    for lock_id, record in files.items():
        if record["bookId"] not in targets:
            continue
        book_targets = targets[record["bookId"]]
        mapped = {
            source_ref
            for target in book_targets
            for source_ref in validator.source_references_for_target(
                lock_id, record["bookId"], *target, rules
            )
        }
        missing = sorted(
            target for target in book_targets
            if not all(source_ref in texts[lock_id] for source_ref in validator.source_references_for_target(lock_id, record["bookId"], *target, rules))
        )
        extra = sorted(set(texts[lock_id]) - mapped)
        record["missingTargetReferences"] = [cv(item) for item in missing]
        record["extraSourceReferences"] = [cv(item) for item in extra]

    used_paths = {
        *(record["archivePath"] for record in upstream.values() if record.get("archiveEmbedded")),
        *(record["archivePath"] for record in files.values() if record.get("snapshotId") == "nt"),
    }
    artifacts: dict[str, dict[str, Any]] = {}
    for path, record in records.items():
        if path in used_paths:
            continue
        artifact_id = "NT-" + path.replace("/", "-").replace(".", "-").upper()
        artifacts[artifact_id] = {"snapshotId": "nt", "archivePath": path, "sha256": record["sha256"]}
    manifest_raw = archive.read("manifest.json")
    artifacts["NT-INTERNAL-MANIFEST"] = {
        "snapshotId": "nt", "archivePath": "manifest.json", "sha256": sha256_bytes(manifest_raw)
    }

    lock = {
        "schemaVersion": 3, "engineVersion": "3.0.0", "translation": "BE", "capturedOn": "2026-08-04",
        "snapshots": {
            "ot-legacy": old_lock["snapshot"],
            "nt": {"path": "sources/nt-sblgnt-1.2.zip", "sha256": nt_snapshot_hash},
        },
        "books": dict(sorted(books.items(), key=lambda item: item[1]["order"])),
        "upstreamArtifacts": upstream, "files": files, "artifacts": artifacts,
        "versificationRules": rules,
        "automatedThresholds": old_lock["automatedThresholds"],
    }

    absent_by_chapter: dict[str, list[int]] = {}
    for item in versification["referencesWithoutMainText"]:
        book, chapter, verse = reference(item["reference"])
        absent_by_chapter.setdefault(f"{book}.{chapter}", []).append(verse)
    statuses_by_chapter: dict[str, list[dict[str, Any]]] = {}
    alternate_chapters: set[str] = set()
    for passage in versification["textualPassages"]:
        if passage["numbered"]:
            grouped: dict[str, list[int]] = {}
            for value in passage["references"]:
                book, chapter, verse = reference(value)
                grouped.setdefault(f"{book}.{chapter}", []).append(verse)
            for chapter_id, numbers in grouped.items():
                statuses_by_chapter.setdefault(chapter_id, []).append({
                    "passageId": passage["id"], "status": passage["textualStatus"],
                    "verseNumbers": numbers,
                })
        elif passage.get("anchorAfter"):
            book, chapter, _verse = reference(passage["anchorAfter"])
            alternate_chapters.add(f"{book}.{chapter}")

    ledger_chapters = json.loads(json.dumps(old_ledger["chapters"]))
    for book in versification["books"]:
        book_id = book["id"]
        for chapter in book["chapters"]:
            number = chapter["number"]
            chapter_id = f"{book_id}.{number}"
            variants = [f"{chapter_id}.{verse}" for verse in MATERIAL_VARIANTS.get(chapter_id, [])]
            rule_ids = [
                rule["id"] for rule in rules if rule["bookId"] == book_id and (
                    rule.get("targetChapter") == number
                    or any(int(value.split(":")[0]) == number for value in rule.get("targetReferences", []))
                )
            ]
            ledger_chapters[chapter_id] = {
                "expectedVerses": len(chapter["verseNumbers"]),
                "verseNumbers": chapter["verseNumbers"],
                "referenceNoteNumbers": absent_by_chapter.get(chapter_id, []),
                "englishUrl": f"https://ebible.org/engwebp/{book_id}{number:02d}.htm",
                "greekUrl": f"https://github.com/LogosBible/SBLGNT/blob/{SBL_COMMIT}/data/sblgnt/text/{SBL_NAMES[book_id]}.txt",
                "textualVariantReview": variants,
                "textualStatuses": statuses_by_chapter.get(chapter_id, []),
                "alternateEnding": chapter_id in alternate_chapters,
                "versificationRuleIds": rule_ids,
            }
    ledger = {
        **old_ledger,
        "verifiedOn": "2026-08-04",
        "policy": {**old_ledger["policy"], "newTestamentBase": "SBLGNT 1.2", "newTestamentSupplementalWitness": "Textus Receptus"},
        "chapters": dict(sorted(ledger_chapters.items(), key=lambda item: (validator.BOOK_ORDER[item[0].split('.')[0]], int(item[0].split('.')[1])))),
    }
    return lock, ledger, texts


def chapter_skeleton(
    validator: ModuleType,
    book_id: str,
    chapter: int,
    ledger_record: dict[str, Any],
    book: dict[str, Any],
) -> dict[str, Any]:
    benchmarks = [
        {"id": "BTF", "family": "fidela", "mode": "comparison-only", "referenceUrl": f"https://ebible.org/ronbtf/{book_id}{chapter:02d}.htm"},
    ]
    if book_id == "JHN":
        benchmarks.extend([
            {"id": "BIBLIA-LIBERA", "family": "libera", "mode": "comparison-only", "referenceUrl": f"https://ebible.org/ronbl/{book_id}{chapter:02d}.htm"},
            {"id": "CORNILESCU-1924", "family": "cornilescu", "mode": "comparison-only", "referenceUrl": f"https://www.biblia.ro/vdc/nt/ioan/{chapter}/"},
        ])
    else:
        benchmarks.append({"id": "CORNILESCU-1924", "family": "cornilescu", "mode": "comparison-only", "referenceUrl": f"https://ebible.org/ron1924/{book_id}{chapter:02d}.htm"})
    benchmarks.append({"id": "NTR", "family": "biblica", "mode": "comparison-only", "referenceUrl": f"https://www.bible.com/ro/bible/126/{book_id}.{chapter}.NTR"})
    statuses = {number: item["status"] for item in ledger_record.get("textualStatuses", []) for number in item["verseNumbers"]}
    verses = [
        {"number": number, "text": "DE TRADUS", **({"textualStatus": statuses[number]} if number in statuses else {})}
        for number in ledger_record["verseNumbers"]
    ]
    notes = [
        {
            "verse": int(verse_id.rsplit(".", 1)[1]), "term": "DE VERIFICAT ÎN GREACĂ",
            "decision": "DE DOCUMENTAT", "reason": "DE DOCUMENTAT DIN APARATUL CRITIC",
            "reviewRequired": True, "resolutionStatus": "pending",
        }
        for verse_id in ledger_record.get("textualVariantReview", [])
    ]
    return {
        "translation": "BE", "bookId": book_id, "bookName": validator.BOOK_NAMES[book_id],
        "chapter": chapter, "status": "in_review", "public": False,
        "source": {
            "english": {"version": "WEBU-Protestant", "passageUrl": ledger_record["englishUrl"], "license": "Public Domain", "lockId": book["baseLockId"]},
            "greek": {
                "version": "SBLGNT-1.2", "commit": SBL_COMMIT, "passageUrl": ledger_record["greekUrl"],
                "license": "CC BY 4.0", "lockId": book["originalLockId"],
                "supplementalWitnesses": [{"lockId": book["supplementalOriginalLockIds"][0], "language": "greacă", "role": "textual-witness"}],
            },
        },
        "review": {key: "pending" for key in validator.AUTOMATED_REVIEW_KEYS},
        "benchmark": {
            "translationsConsulted": benchmarks, "exactTextCopied": False,
            "fullProtectedTextsStored": False,
            "checks": {key: "pending" for key in validator.BENCHMARK_CHECK_KEYS},
            "observations": [],
        },
        "audit": {
            "schemaVersion": 2, "completedOn": "2026-08-04",
            "verseCoverage": {
                "expected": len(ledger_record["verseNumbers"]), "reviewed": 0,
                "continuous": ledger_record["verseNumbers"] == list(range(1, max(ledger_record["verseNumbers"]) + 1)),
                "verseNumbersSha256": "sha256:" + hashlib.sha256(",".join(map(str, ledger_record["verseNumbers"])).encode("ascii")).hexdigest(),
            },
            "sourceLanguage": {"language": "greacă koine", "text": "SBLGNT 1.2 + aparat; Textus Receptus ca martor suplimentar", "result": "pending", "scope": "DE DOCUMENTAT"},
            "romanianLanguage": {"result": "pending", "changesApplied": []},
            "theologicalContext": {"result": "pending", "principles": []},
            "omissionAddition": {"result": "pending", "omissions": 0, "additions": 0},
            "copyrightDistance": {"result": "pending", "method": "redactare independentă din SBLGNT și WEB Protestant Edition; etaloanele românești sunt numai verificare"},
            "criticalIssues": {"result": "pending", "open": 1},
        },
        "verses": verses, "editorialNotes": notes,
        "referenceNotes": [
            {"number": number, "status": "not-in-critical-main-text", "reason": "DE DOCUMENTAT", "greekWitnesses": "DE DOCUMENTAT", "displayNote": "DE DOCUMENTAT", "traditionalReading": "DE TRADUS DIN MARTORUL TR", "resolutionStatus": "pending"}
            for number in ledger_record.get("referenceNoteNumbers", [])
        ],
        "alternateEndings": ([{"status": "alternate-unnumbered", "text": "DE TRADUS", "sourceNote": "DE DOCUMENTAT", "resolutionStatus": "pending"}] if ledger_record.get("alternateEnding") else []),
    }


def build_workbooks(
    validator: ModuleType,
    output: Path,
    versification: dict[str, Any],
    lock: dict[str, Any],
    ledger: dict[str, Any],
    texts: dict[str, dict[tuple[int, int], str]],
    archive: zipfile.ZipFile,
) -> None:
    output.mkdir(parents=True, exist_ok=True)
    for book in versification["books"]:
        book_id = book["id"]
        lock_book = lock["books"][book_id]
        chapter_rows = []
        apparatus = archive.read(f"sblgnt/apparatus/text/{book_id}.txt").decode("utf-8")
        for chapter in book["chapters"]:
            number = chapter["number"]
            rows = []
            for verse in chapter["verseNumbers"]:
                target = (number, verse)
                def source_text(lock_id: str) -> str | None:
                    refs = validator.source_references_for_target(lock_id, book_id, *target, lock["versificationRules"])
                    values = [texts[lock_id].get(item) for item in refs]
                    return " ".join(value for value in values if value) or None
                rows.append({
                    "number": verse,
                    "greekSblgnt": source_text(lock_book["originalLockId"]),
                    "greekTextusReceptus": source_text(lock_book["supplementalOriginalLockIds"][0]),
                    "englishWebProtestant": source_text(lock_book["baseLockId"]),
                    "romanianBenchmarks": {lock_id: source_text(lock_id) for lock_id in lock_book["benchmarkLockIds"]},
                })
            chapter_rows.append({
                "chapter": number, "ledger": ledger["chapters"][f"{book_id}.{number}"],
                "verses": rows,
            })
        write_json(output / f"{book_id}.json", {
            "bookId": book_id, "bookName": validator.BOOK_NAMES[book_id],
            "instructions": "Redactează independent în română din SBLGNT și WEB; TR și etaloanele românești sunt numai martori/verificare. Nu copia secvențe extinse.",
            "chapters": chapter_rows, "criticalApparatus": apparatus,
        }, compact=False)


def update_manifest(validator: ModuleType, ledger: dict[str, Any]) -> None:
    manifest = read_json(DATA / "manifest.json")
    manifest["newTestamentVersification"] = "nt-versification.json"
    benchmarks = manifest["sources"]["romanianBenchmarks"]
    if not any(item["id"] == "BIBLIA-LIBERA" for item in benchmarks):
        benchmarks.insert(2, {"id": "BIBLIA-LIBERA", "name": "Biblia Liberă", "family": "libera", "url": "https://ebible.org/ronbl/", "license": "Public Domain", "pinned": True, "mode": "comparison-only"})
    checks = manifest["automatedPublicationGate"]["requiredChecks"]
    for check in ("nt-versification-integrity", "critical-apparatus-coverage"):
        if check not in checks:
            checks.append(check)
    manifest["reviewRequirements"] = checks.copy()
    chapter_ids = list(ledger["chapters"])
    total_verses = sum(record["expectedVerses"] for record in ledger["chapters"].values())
    manifest["draftedChapters"] = chapter_ids
    manifest["progress"].update({"chaptersDrafted": len(chapter_ids), "versesDrafted": total_verses})
    manifest["newTestament"] = {"books": 27, "chapters": 260, "verses": 7941, "status": "in_review", "public": False}
    write_json(DATA / "manifest.json", manifest)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--workbook-dir", type=Path, default=Path("/tmp/emanus-nt-workbooks"))
    parser.add_argument("--no-write-data", action="store_true")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    validator = load_module("biblia_emanus_validator", ROOT / "scripts" / "check-biblia-emanus.py")
    versification = read_json(VERSIFICATION)
    with zipfile.ZipFile(NT_SNAPSHOT) as archive:
        internal_manifest = json.loads(archive.read("manifest.json"))
        lock, ledger, texts = build_lock_and_ledger(validator, versification, archive, internal_manifest)
        build_workbooks(validator, args.workbook_dir, versification, lock, ledger, texts, archive)
    if not args.no_write_data:
        write_json(DATA / "source-lock.json", lock)
        write_json(DATA / "source-ledger.json", ledger)
        for book_id, book in lock["books"].items():
            if book["testament"] != "NT":
                continue
            for chapter_id, record in ledger["chapters"].items():
                if not chapter_id.startswith(book_id + "."):
                    continue
                chapter = int(chapter_id.split(".")[1])
                path = DATA / f"{chapter_id}.json"
                if not path.exists():
                    write_json(path, chapter_skeleton(validator, book_id, chapter, record, book))
        update_manifest(validator, ledger)
    print(f"[biblia-emanus-nt-prepare] OK: registre și workbooks în {args.workbook_dir}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
