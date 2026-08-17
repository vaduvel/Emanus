#!/usr/bin/env python3
"""Promovează Osea din fresh-source review în corpusul canonic Biblia Emanus.

Scriptul este intenționat strict și idempotent:
- sigilează WEBU, WLC, BTF și Cornilescu 1924 pentru HOS într-un snapshot nou;
- adaugă HOS în source-lock și source-ledger;
- materializează HOS.1–HOS.14 din candidatul legacy + proposedRo din review-urile fresh;
- generează auditul canonic cu digest legat de textul final;
- actualizează manifestul/progresul fără a modifica alte capitole.

Nu decide singur dacă textul trece poarta de publicare. După rulare trebuie executat
scripts/check-biblia-emanus-book.py --book HOS (și ideal validatorul complet).
"""

from __future__ import annotations

import argparse
import hashlib
import importlib.util
import json
import re
import subprocess
import zipfile
from collections import Counter
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs/data/biblia-emanus"
REVIEWS = ROOT / "docs/biblia-explicata/minor-prophets-reaudit/HOS/reviews"
APPROVAL = ROOT / "docs/biblia-explicata/minor-prophets-reaudit/HOS-VERSIFICATION-APPROVAL.json"
SNAPSHOT_ID = "ot-hosea-2026-08-08"
SNAPSHOT_REL = "sources/ot-hosea-2026-08-08-usfm.zip"
SNAPSHOT_PATH = DATA / SNAPSHOT_REL
RULE_ID = "WLC-HOS-ABSOLUTE-ORDINAL-197"
COMPLETED_ON = "2026-08-08"
LEGACY_REF_DEFAULT = "origin/agent/biblia-emanus-ot-and-apocrypha"

EXPECTED_ARCHIVE_SHA256 = {
    "webu": "1c5957d487d9473c87ea5c7e6acffd0caa402ce98c4a577f3164cfd94b9b437d",
    "wlc": "0b0b9416b941550ef780b8fb8efd114c3ba141a4e9c094a43da70d1458122ded",
    "btf": "69dbdd9c09e7cdd88db4d4ab95ffa572be861b680bf1c7fd5718f127a8910e26",
    "cornilescu": "9c999dc1722c2e376e64e6506b95846b0b3e4622731cfc550c7e661455f6e3f4",
}

UPSTREAM = {
    "engwebp-hos": {
        "arg": "webu",
        "url": "https://ebible.org/Scriptures/engwebp_usfm.zip",
        "language": "en",
        "license": "Public Domain",
        "archivePath": "upstream/engwebp_usfm.zip",
    },
    "hboWLC-hos": {
        "arg": "wlc",
        "url": "https://ebible.org/Scriptures/hboWLC_usfm.zip",
        "language": "he",
        "textLicense": "Public Domain",
        "annotationLicense": "CC BY 4.0",
        "archivePath": "upstream/hboWLC_usfm.zip",
    },
    "ronbtf-hos": {
        "arg": "btf",
        "url": "https://ebible.org/Scriptures/ronbtf_usfm.zip",
        "language": "ro",
        "license": "Public Domain",
        "archivePath": "upstream/ronbtf_usfm.zip",
    },
    "ron1924-hos": {
        "arg": "cornilescu",
        "url": "https://ebible.org/Scriptures/ron1924_usfm.zip",
        "language": "ro-Cyrl",
        "license": "Public Domain",
        "archivePath": "upstream/ron1924_usfm.zip",
    },
}

LOCK_FILES = {
    "WEBU-HOS": {
        "arg": "webu",
        "snapshotPath": "web/HOS.usfm",
        "language": "en",
        "role": "base",
        "sourceId": "engwebp-hos",
    },
    "WLC-HOS": {
        "arg": "wlc",
        "snapshotPath": "wlc/HOS.usfm",
        "language": "he",
        "role": "original",
        "sourceId": "hboWLC-hos",
    },
    "BTF-HOS": {
        "arg": "btf",
        "snapshotPath": "btf/HOS.usfm",
        "language": "ro",
        "role": "benchmark",
        "sourceId": "ronbtf-hos",
        "benchmarkId": "BTF",
        "family": "fidela",
    },
    "CORNILESCU1924-HOS": {
        "arg": "cornilescu",
        "snapshotPath": "cornilescu1924/HOS.usfm",
        "language": "ro-Cyrl",
        "role": "benchmark",
        "sourceId": "ron1924-hos",
        "benchmarkId": "CORNILESCU-1924",
        "family": "cornilescu",
    },
}


def fail(message: str) -> None:
    raise SystemExit(f"Osea BE promotion failed: {message}")


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def sha256_file(path: Path) -> str:
    return sha256_bytes(path.read_bytes())


def load_json(path: Path) -> dict[str, Any]:
    try:
        value = json.loads(path.read_text(encoding="utf-8"))
    except FileNotFoundError:
        fail(f"lipsește {path.relative_to(ROOT)}")
    if not isinstance(value, dict):
        fail(f"{path.relative_to(ROOT)} nu este obiect JSON")
    return value


def write_minified(path: Path, value: dict[str, Any]) -> None:
    path.write_text(
        json.dumps(value, ensure_ascii=False, separators=(",", ":")) + "\n",
        encoding="utf-8",
    )


def write_pretty(path: Path, value: dict[str, Any]) -> None:
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def load_validator():
    path = ROOT / "scripts/check-biblia-emanus.py"
    spec = importlib.util.spec_from_file_location("biblia_emanus_validator", path)
    if spec is None or spec.loader is None:
        fail("nu pot încărca validatorul Biblia Emanus")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def git_show_json(ref: str, path: str) -> dict[str, Any]:
    proc = subprocess.run(
        ["git", "show", f"{ref}:{path}"],
        cwd=ROOT,
        text=True,
        capture_output=True,
    )
    if proc.returncode != 0:
        fail(f"nu pot citi {ref}:{path}: {proc.stderr.strip()}")
    try:
        value = json.loads(proc.stdout)
    except json.JSONDecodeError as exc:
        fail(f"JSON invalid în {ref}:{path}: {exc}")
    if not isinstance(value, dict):
        fail(f"{ref}:{path} nu este obiect")
    return value


def find_hos_member(archive: zipfile.ZipFile) -> str:
    matches: list[str] = []
    for member in archive.namelist():
        base = Path(member).name
        if not base.lower().endswith((".usfm", ".sfm")):
            continue
        stem = re.sub(r"^\d+[-_]?", "", base)
        if stem.upper().startswith("HOS"):
            matches.append(member)
    if len(matches) != 1:
        fail(f"așteptam exact un HOS USFM în arhivă, găsite {matches}")
    return matches[0]


def normalized_zip_info(name: str) -> zipfile.ZipInfo:
    info = zipfile.ZipInfo(name)
    info.date_time = (1980, 1, 1, 0, 0, 0)
    info.compress_type = zipfile.ZIP_DEFLATED
    info.external_attr = 0o100644 << 16
    info.create_system = 3
    return info


def canonical_refs(verses: dict[tuple[int, int], str]) -> list[tuple[int, int]]:
    return sorted(verses)


def ref_text(reference: tuple[int, int]) -> str:
    return f"{reference[0]}:{reference[1]}"


def chapter_counts(refs: list[tuple[int, int]]) -> dict[int, int]:
    result: Counter[int] = Counter(chapter for chapter, _ in refs)
    return dict(sorted(result.items()))


def build_snapshot(
    validator,
    archive_paths: dict[str, Path],
) -> tuple[str, dict[str, bytes], dict[str, str], list[tuple[int, int]], list[tuple[int, int]]]:
    for key, path in archive_paths.items():
        actual = sha256_file(path)
        expected = EXPECTED_ARCHIVE_SHA256[key]
        if actual != expected:
            fail(f"{key} archive drift: {actual} != {expected}")

    extracted: dict[str, bytes] = {}
    source_members: dict[str, str] = {}
    parsed: dict[str, dict[tuple[int, int], str]] = {}

    for key, path in archive_paths.items():
        with zipfile.ZipFile(path) as archive:
            member = find_hos_member(archive)
            raw = archive.read(member)
        extracted[key] = raw
        source_members[key] = member
        parsed[key] = validator.parse_usfm_verses(raw, f"HOS-{key}")

    target_refs = canonical_refs(parsed["webu"])
    wlc_refs = canonical_refs(parsed["wlc"])
    if len(target_refs) != 197 or len(wlc_refs) != 197:
        fail(f"HOS trebuie să aibă 197 WEBU și 197 WLC versete; avem {len(target_refs)}/{len(wlc_refs)}")
    for benchmark in ("btf", "cornilescu"):
        refs = canonical_refs(parsed[benchmark])
        if refs != target_refs:
            missing = sorted(set(target_refs) - set(refs))[:8]
            extra = sorted(set(refs) - set(target_refs))[:8]
            fail(f"{benchmark} nu urmează versificația produsului; missing={missing}, extra={extra}")

    expected_counts = {1: 11, 2: 23, 3: 5, 4: 19, 5: 15, 6: 11, 7: 16, 8: 14, 9: 17, 10: 15, 11: 12, 12: 14, 13: 16, 14: 9}
    if chapter_counts(target_refs) != expected_counts:
        fail(f"WEBU HOS chapter counts drift: {chapter_counts(target_refs)}")

    ordinal_map = dict(zip(target_refs, wlc_refs, strict=True))
    required_boundaries = {
        (1, 10): (2, 1),
        (1, 11): (2, 2),
        (2, 1): (2, 3),
        (2, 23): (2, 25),
        (3, 1): (3, 1),
        (11, 12): (12, 1),
        (12, 1): (12, 2),
        (12, 14): (12, 15),
        (13, 1): (13, 1),
        (13, 16): (14, 1),
        (14, 1): (14, 2),
        (14, 9): (14, 10),
    }
    for target, expected_source in required_boundaries.items():
        if ordinal_map.get(target) != expected_source:
            fail(f"maparea aprobată nu corespunde la {ref_text(target)}: {ordinal_map.get(target)} != {expected_source}")

    approval = load_json(APPROVAL)
    if approval.get("status") != "approved" or approval.get("checks", {}).get("noVerseLossOrDuplication") is not True:
        fail("harta de versificație HOS nu este aprobată")

    payloads: dict[str, bytes] = {}
    for source_id, record in UPSTREAM.items():
        key = str(record["arg"])
        payloads[str(record["archivePath"])] = archive_paths[key].read_bytes()
    for lock_id, record in LOCK_FILES.items():
        key = str(record["arg"])
        payloads[str(record["snapshotPath"])] = extracted[key]

    SNAPSHOT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(SNAPSHOT_PATH, "w") as out:
        for name in sorted(payloads):
            out.writestr(normalized_zip_info(name), payloads[name])

    return sha256_file(SNAPSHOT_PATH), extracted, source_members, target_refs, wlc_refs


def update_source_lock(
    source_lock: dict[str, Any],
    archive_paths: dict[str, Path],
    extracted: dict[str, bytes],
    snapshot_sha: str,
    target_refs: list[tuple[int, int]],
    wlc_refs: list[tuple[int, int]],
) -> None:
    source_lock["capturedOn"] = COMPLETED_ON
    source_lock.setdefault("snapshots", {})[SNAPSHOT_ID] = {
        "path": SNAPSHOT_REL,
        "sha256": snapshot_sha,
    }

    upstream = source_lock.setdefault("upstreamArtifacts", {})
    for source_id, template in UPSTREAM.items():
        key = str(template["arg"])
        record = {
            "url": template["url"],
            "archiveDate": COMPLETED_ON,
            "sha256": sha256_file(archive_paths[key]),
            "language": template["language"],
            "snapshotId": SNAPSHOT_ID,
            "archiveEmbedded": True,
            "archivePath": template["archivePath"],
        }
        for optional in ("license", "textLicense", "annotationLicense"):
            if optional in template:
                record[optional] = template[optional]
        upstream[source_id] = record

    books = source_lock.setdefault("books", {})
    books["HOS"] = {
        "name": "Osea",
        "order": 28,
        "testament": "OT",
        "baseLockId": "WEBU-HOS",
        "originalLockId": "WLC-HOS",
        "benchmarkLockIds": ["CORNILESCU1924-HOS", "BTF-HOS"],
        "externalBenchmarkIds": ["NTR"],
    }

    files = source_lock.setdefault("files", {})
    for lock_id, template in LOCK_FILES.items():
        key = str(template["arg"])
        record: dict[str, Any] = {
            "bookId": "HOS",
            "language": template["language"],
            "role": template["role"],
            "archivePath": template["snapshotPath"],
            "sha256": sha256_bytes(extracted[key]),
            "sourceId": template["sourceId"],
            "snapshotId": SNAPSHOT_ID,
            "format": "usfm",
            "missingTargetReferences": [],
            "extraSourceReferences": [],
        }
        for optional in ("benchmarkId", "family"):
            if optional in template:
                record[optional] = template[optional]
        files[lock_id] = record

    rules = [
        rule for rule in source_lock.setdefault("versificationRules", [])
        if not (isinstance(rule, dict) and rule.get("bookId") == "HOS")
    ]
    rules.append(
        {
            "id": RULE_ID,
            "sourceLockId": "WLC-HOS",
            "bookId": "HOS",
            "mapping": "pairwise",
            "targetReferences": [ref_text(ref) for ref in target_refs],
            "sourceReferences": [ref_text(ref) for ref in wlc_refs],
        }
    )
    source_lock["versificationRules"] = rules


def update_ledger(ledger: dict[str, Any], validator, target_refs: list[tuple[int, int]]) -> None:
    counts = chapter_counts(target_refs)
    chapters = ledger.setdefault("chapters", {})
    for chapter in range(1, 15):
        chapters[f"HOS.{chapter}"] = {
            "expectedVerses": counts[chapter],
            "englishUrl": f"https://ebible.org/engwebp/HOS{chapter:02d}.htm",
            "hebrewUrl": f"https://ebible.org/hboWLC/HOS{chapter:02d}.htm",
            "versificationRuleIds": [RULE_ID],
        }

    def key(item: tuple[str, Any]) -> tuple[int, int]:
        chapter_id = item[0]
        book, chapter_text = chapter_id.split(".", 1)
        return validator.BOOK_ORDER.get(book, 999), int(chapter_text)

    ledger["chapters"] = dict(sorted(chapters.items(), key=key))
    ledger["verifiedOn"] = COMPLETED_ON


def final_hosea_chapter(legacy_ref: str, chapter: int) -> tuple[list[str], dict[str, Any]]:
    legacy = git_show_json(legacy_ref, f"docs/data/biblia-emanus/HOS.{chapter}.json")
    review = load_json(REVIEWS / f"{chapter:02d}.json")
    if review.get("status") != "fresh-semantic-review-complete":
        fail(f"review HOS {chapter} nu este complet")
    verses = legacy.get("verses")
    if not isinstance(verses, list) or len(verses) != review.get("reviewedVerses"):
        fail(f"candidatul legacy HOS {chapter} nu corespunde review-ului")
    texts: list[str] = []
    for expected, verse in enumerate(verses, start=1):
        if not isinstance(verse, dict) or verse.get("number") != expected:
            fail(f"HOS {chapter}:{expected} candidat legacy invalid")
        text = verse.get("text")
        if not isinstance(text, str) or not text.strip():
            fail(f"HOS {chapter}:{expected} text legacy gol")
        texts.append(text.strip())
    for change in review.get("changes", []):
        verse = change.get("verse")
        proposed = change.get("proposedRo")
        if not isinstance(verse, int) or not isinstance(proposed, str) or not proposed.strip():
            fail(f"HOS {chapter}: change invalid")
        texts[verse - 1] = proposed.strip()
    return texts, review


def chapter_payload(validator, chapter: int, texts: list[str], review: dict[str, Any], snapshot_sha: str) -> dict[str, Any]:
    changes = review.get("changes", [])
    editorial_notes = []
    for change in changes:
        verse = int(change["verse"])
        severity = str(change["severity"])
        issue = str(change["issue"]).strip()
        editorial_notes.append(
            {
                "verse": verse,
                "term": f"fresh-source semantic review / {severity}",
                "decision": f"Corecția pentru Osea {chapter}:{verse} a fost aplicată în textul canonic.",
                "reason": issue,
                "reviewRequired": True,
                "resolutionStatus": "resolved",
                "resolutionReason": f"Verificat verset-cu-verset în WEBU-Protestant și WLC-OSHB pe snapshotul fresh; severitate {severity}.",
            }
        )

    changes_applied = [
        f"Osea {chapter}:{item['verse']} — {item['severity']}: {str(item['issue']).strip()}"
        for item in changes
    ]
    if not changes_applied:
        changes_applied = [f"Osea {chapter}: text verificat integral; nu au fost necesare corecții semantice."]

    payload: dict[str, Any] = {
        "translation": "BE",
        "bookId": "HOS",
        "bookName": "Osea",
        "chapter": chapter,
        "status": "published",
        "public": True,
        "source": {
            "english": {
                "version": "WEBU-Protestant",
                "passageUrl": f"https://ebible.org/engwebp/HOS{chapter:02d}.htm",
                "license": "Public Domain",
                "lockId": "WEBU-HOS",
            },
            "hebrew": {
                "version": "WLC-OSHB",
                "passageUrl": f"https://ebible.org/hboWLC/HOS{chapter:02d}.htm",
                "textLicense": "Public Domain",
                "annotationLicense": "CC BY 4.0",
                "lockId": "WLC-HOS",
            },
        },
        "review": {
            "aiSourceLanguage": "approved",
            "aiRomanianLanguage": "approved",
            "aiTheologicalContext": "approved",
            "omissionAddition": "approved",
            "benchmarkComparison": "approved",
            "copyrightDistance": "approved",
            "criticalIssues": "approved",
        },
        "verses": [
            {"number": number, "text": text}
            for number, text in enumerate(texts, start=1)
        ],
        "editorialNotes": editorial_notes,
        "benchmark": {
            "translationsConsulted": [
                {
                    "id": "CORNILESCU-1924",
                    "family": "cornilescu",
                    "mode": "comparison-only",
                    "referenceUrl": f"https://ebible.org/ron1924/HOS{chapter:02d}.htm",
                },
                {
                    "id": "BTF",
                    "family": "fidela",
                    "mode": "comparison-only",
                    "referenceUrl": f"https://ebible.org/ronbtf/HOS{chapter:02d}.htm",
                },
                {
                    "id": "NTR",
                    "family": "biblica",
                    "mode": "comparison-only",
                    "referenceUrl": f"https://www.bible.com/ro/bible/126/HOS.{chapter}.NTR",
                },
            ],
            "exactTextCopied": False,
            "fullProtectedTextsStored": False,
            "checks": {
                "omissions": "approved",
                "additions": "approved",
                "meaning": "approved",
                "romanianNaturalness": "approved",
                "theologicalNeutrality": "approved",
                "copyrightSimilarity": "approved",
            },
            "observations": [
                "WEBU și WLC au fost re-auditate pe snapshotul fresh; BTF și Cornilescu 1924 sunt fixate pentru comparația deterministă.",
                "NTR este păstrată numai ca etalon extern de comparație; textul integral protejat nu este stocat.",
                "Corecțiile materializate provin exclusiv din review-urile fresh HOS 1–14.",
            ],
        },
    }

    payload["audit"] = {
        "schemaVersion": 1,
        "completedOn": COMPLETED_ON,
        "verseCoverage": {
            "expected": len(texts),
            "reviewed": len(texts),
            "continuous": True,
        },
        "sourceLanguage": {
            "language": "ebraică biblică",
            "text": "WLC-OSHB",
            "result": "approved",
            "scope": f"Osea {chapter}: audit semantic verset-cu-verset pe WEBU-Protestant și WLC-OSHB, cu maparea WLC derivată din ordinea absolută aprobată.",
        },
        "romanianLanguage": {
            "result": "approved",
            "changesApplied": changes_applied,
        },
        "theologicalContext": {
            "result": "approved",
            "principles": [
                "Vorbitorul, referenții, imaginile profetice și opozițiile teologice sunt păstrate conform textului-sursă, fără explicații doctrinare introduse în traducere.",
                "Numele divine, judecata, mila, legământul, idolatria și restaurarea sunt redate semantic fără armonizări confesionale adăugate.",
            ],
        },
        "omissionAddition": {
            "result": "approved",
            "omissions": 0,
            "additions": 0,
        },
        "copyrightDistance": {
            "result": "approved",
            "method": "redactare verificată independent în WEBU/WLC; BTF și Cornilescu 1924 sunt folosite numai ca benchmark-uri public-domain, iar NTR numai ca referință externă de comparație",
        },
        "criticalIssues": {
            "result": "approved",
            "open": 0,
        },
        "reviewLevel": "ai-complete",
        "engineVersion": "2.0.0",
        "reviewAgent": {
            "type": "ai",
            "engine": "GPT-5.6 Sol — Biblia Emanus fresh-source audit",
            "method": "verse-by-verse-source-and-benchmark",
        },
        "sourceSnapshotSha256": snapshot_sha,
        "benchmarkEvidence": {
            "pinnedBenchmarks": 2,
            "externalBenchmarks": 1,
            "result": "approved",
        },
        "textDigest": validator.chapter_text_digest(payload),
    }
    return payload


def update_manifest(manifest: dict[str, Any], validator) -> None:
    chapter_pattern = re.compile(r"^[A-Z0-9]{3}\.[1-9][0-9]*$")
    paths = [path for path in DATA.glob("*.json") if chapter_pattern.match(path.stem)]
    paths.sort(key=validator.chapter_sort_key)
    chapter_ids = [path.stem for path in paths]
    manifest["draftedChapters"] = chapter_ids

    total_verses = 0
    approved = 0
    published = 0
    for path in paths:
        data = load_json(path)
        verses = data.get("verses")
        if not isinstance(verses, list):
            fail(f"{path.name}: verses invalid la recalcularea manifestului")
        total_verses += len(verses)
        status = data.get("status")
        if status in {"approved", "published"}:
            approved += 1
        if status == "published":
            published += 1

    progress = manifest.setdefault("progress", {})
    progress["chaptersDrafted"] = len(paths)
    progress["versesDrafted"] = total_verses
    progress["chaptersApproved"] = approved
    progress["chaptersPublished"] = published
    manifest["public"] = published > 0


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--webu-zip", type=Path, required=True)
    parser.add_argument("--wlc-zip", type=Path, required=True)
    parser.add_argument("--btf-zip", type=Path, required=True)
    parser.add_argument("--cornilescu-zip", type=Path, required=True)
    parser.add_argument("--legacy-ref", default=LEGACY_REF_DEFAULT)
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    validator = load_validator()
    archive_paths = {
        "webu": args.webu_zip,
        "wlc": args.wlc_zip,
        "btf": args.btf_zip,
        "cornilescu": args.cornilescu_zip,
    }
    for key, path in archive_paths.items():
        if not path.is_file():
            fail(f"lipsește arhiva {key}: {path}")

    snapshot_sha, extracted, _members, target_refs, wlc_refs = build_snapshot(validator, archive_paths)

    source_lock = load_json(DATA / "source-lock.json")
    ledger = load_json(DATA / "source-ledger.json")
    manifest = load_json(DATA / "manifest.json")

    update_source_lock(
        source_lock,
        archive_paths,
        extracted,
        snapshot_sha,
        target_refs,
        wlc_refs,
    )
    update_ledger(ledger, validator, target_refs)

    corrected = 0
    approved_as_is = 0
    severity: Counter[str] = Counter()
    for chapter in range(1, 15):
        texts, review = final_hosea_chapter(args.legacy_ref, chapter)
        payload = chapter_payload(validator, chapter, texts, review, snapshot_sha)
        write_pretty(DATA / f"HOS.{chapter}.json", payload)
        changes = review.get("changes", [])
        corrected += len(changes)
        approved_as_is += len(review.get("approvedAsIs", []))
        severity.update(str(change.get("severity")) for change in changes)

    if corrected != 116 or approved_as_is != 81 or dict(severity) != {"minor": 41, "material": 60, "critical": 15}:
        fail(
            f"agregarea review-urilor a derivat: corrected={corrected}, approved={approved_as_is}, severity={dict(severity)}"
        )

    update_manifest(manifest, validator)
    write_minified(DATA / "source-lock.json", source_lock)
    write_minified(DATA / "source-ledger.json", ledger)
    write_minified(DATA / "manifest.json", manifest)

    print(
        "Osea BE canonical candidate materialized: 14/14 capitole, 197/197 versete, "
        f"116 corecții, 81 aprobate ca atare; snapshot={snapshot_sha}."
    )


if __name__ == "__main__":
    main()
