#!/usr/bin/env python3
"""Audit de migrare pentru candidații vechi Osea–Maleahi din schema BE v2.

Nu promovează nimic. Verifică egalitatea dintre candidatul BE istoric și textul
editorial materializat pentru cărțile încă selectate și inspectează proveniența
WEBU/WLC.

Un hash diferit al ZIP-ului upstream nu este tratat ca schimbare de text dacă
payload-urile USFM ale cărților auditate rămân byte-identical cu source-lock-ul
fresh per carte. Astfel distingem driftul de ambalare/metadata de schimbarea
reală a Scripturii-sursă.

După promovarea individuală a unei cărți (de exemplu HOS), aceasta poate fi
exclusă explicit cu `--exclude-book HOS`.
"""

from __future__ import annotations

import argparse
import ast
import hashlib
import json
import re
import subprocess
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
GENERATED = ROOT / "packages/shared/src/bible/generated/vtCanonicalText"
FRESH_LOCK = ROOT / "docs/data/biblia-emanus/minor-prophets-source-lock.json"

BOOKS = [
    ("osea", "HOS", "Osea", 14),
    ("ioel", "JOL", "Ioel", 3),
    ("amos", "AMO", "Amos", 9),
    ("obadia", "OBA", "Obadia", 1),
    ("iona", "JON", "Iona", 4),
    ("mica", "MIC", "Mica", 7),
    ("naum", "NAM", "Naum", 3),
    ("habacuc", "HAB", "Habacuc", 3),
    ("tefania", "ZEP", "Țefania", 3),
    ("hagai", "HAG", "Hagai", 2),
    ("zaharia", "ZEC", "Zaharia", 14),
    ("maleahi", "MAL", "Maleahi", 4),
]

APPROVED_FIELDS = (
    "aiSourceLanguage",
    "aiRomanianLanguage",
    "aiTheologicalContext",
    "omissionAddition",
    "benchmarkComparison",
    "copyrightDistance",
    "criticalIssues",
)

HEX64 = re.compile(r"^[0-9a-f]{64}$")
TS_ARRAY = re.compile(r"^\s*(\d+): \[$")
TS_STRING = re.compile(r"^\s*(\"(?:\\.|[^\"\\])*\"),$")


def git_show(ref: str, path: str) -> str:
    proc = subprocess.run(
        ["git", "show", f"{ref}:{path}"],
        cwd=ROOT,
        text=True,
        capture_output=True,
    )
    if proc.returncode != 0:
        raise SystemExit(f"Nu pot citi {ref}:{path}\n{proc.stderr}")
    return proc.stdout


def sha256_file(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as fh:
        for chunk in iter(lambda: fh.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def parse_generated(path: Path) -> dict[int, list[str]]:
    chapters: dict[int, list[str]] = {}
    current: int | None = None
    for raw_line in path.read_text(encoding="utf-8").splitlines():
        start = TS_ARRAY.match(raw_line)
        if start:
            current = int(start.group(1))
            chapters[current] = []
            continue
        if current is not None and raw_line.strip() == "],":
            current = None
            continue
        if current is not None:
            match = TS_STRING.match(raw_line)
            if not match:
                raise SystemExit(f"{path}: linie TS neașteptată în capitolul {current}: {raw_line!r}")
            chapters[current].append(ast.literal_eval(match.group(1)))
    return chapters


def find_usfm_member(archive: zipfile.ZipFile, code: str) -> str:
    candidates = []
    for member in archive.namelist():
        base = Path(member).name
        if not base.lower().endswith((".usfm", ".sfm")):
            continue
        stem = re.sub(r"^\d+[-_]?", "", base)
        if stem.upper().startswith(code):
            candidates.append(member)
    if len(candidates) != 1:
        raise SystemExit(f"{code}: așteptam exact un USFM în arhivă, găsite {candidates}")
    return candidates[0]


def member_sha256(archive: zipfile.ZipFile, member: str) -> str:
    return hashlib.sha256(archive.read(member)).hexdigest()


def validate_candidate(raw: dict, code: str, chapter: int) -> list[str]:
    raw_chapter = raw.get("chapter", raw.get("chapterNumber"))
    if raw.get("bookId") != code or raw_chapter != chapter:
        raise SystemExit(f"{code}.{chapter}: identificare invalidă")
    if raw.get("status") != "published" or raw.get("public") is not True:
        raise SystemExit(f"{code}.{chapter}: nu este published/public")

    review = raw.get("review") or {}
    missing = [field for field in APPROVED_FIELDS if review.get(field) != "approved"]
    if missing:
        raise SystemExit(f"{code}.{chapter}: review neaprobat: {', '.join(missing)}")

    audit = raw.get("audit") or {}
    if audit.get("reviewLevel") != "ai-complete":
        raise SystemExit(f"{code}.{chapter}: reviewLevel != ai-complete")
    source_language = audit.get("sourceLanguage") or {}
    if source_language.get("text") != "WLC-OSHB" or source_language.get("result") != "approved":
        raise SystemExit(f"{code}.{chapter}: audit WLC-OSHB incomplet")
    benchmark = audit.get("benchmarkEvidence") or {}
    if benchmark.get("result") != "approved" or benchmark.get("pinnedBenchmarks", 0) < 2:
        raise SystemExit(f"{code}.{chapter}: benchmark evidence incomplet")
    digest = audit.get("textDigest")
    digest_value = digest.removeprefix("sha256:") if isinstance(digest, str) else ""
    if not HEX64.fullmatch(digest_value):
        raise SystemExit(f"{code}.{chapter}: textDigest invalid")

    verses = raw.get("verses")
    if not isinstance(verses, list) or not verses:
        raise SystemExit(f"{code}.{chapter}: lipsesc versetele")
    texts: list[str] = []
    for expected, verse in enumerate(verses, start=1):
        if verse.get("number") != expected:
            raise SystemExit(f"{code}.{chapter}:{expected}: numerotare discontinuă")
        text = verse.get("text")
        if not isinstance(text, str) or not text.strip():
            raise SystemExit(f"{code}.{chapter}:{expected}: text gol")
        texts.append(text.strip())

    coverage = audit.get("verseCoverage") or {}
    if coverage.get("expected") != len(texts) or coverage.get("reviewed") != len(texts):
        raise SystemExit(f"{code}.{chapter}: coverage audit nu corespunde textului")
    if coverage.get("coveragePercent") not in (None, 100):
        raise SystemExit(f"{code}.{chapter}: coveragePercent != 100")
    return texts


def fresh_source_hashes() -> dict[tuple[str, str], str]:
    if not FRESH_LOCK.is_file():
        raise SystemExit(f"Lipsește fresh source lock: {FRESH_LOCK}")
    raw = json.loads(FRESH_LOCK.read_text(encoding="utf-8"))
    hashes: dict[tuple[str, str], str] = {}
    for book in raw.get("books", []):
        code = book.get("bookId")
        if not isinstance(code, str):
            continue
        for source in ("WEBU", "WLC"):
            digest = (book.get(source) or {}).get("sha256")
            if isinstance(digest, str) and HEX64.fullmatch(digest):
                hashes[(source, code)] = digest
    return hashes


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--source-ref", required=True)
    parser.add_argument("--webu-zip", type=Path, required=True)
    parser.add_argument("--wlc-zip", type=Path, required=True)
    parser.add_argument(
        "--exclude-book",
        action="append",
        default=[],
        help="Exclude un bookId USFM deja promovat (poate fi repetat), de exemplu HOS.",
    )
    args = parser.parse_args()

    excluded = {str(code).upper() for code in args.exclude_book}
    known_codes = {code for _file_id, code, _name, _chapters in BOOKS}
    unknown_excluded = excluded - known_codes
    if unknown_excluded:
        raise SystemExit(f"--exclude-book necunoscut: {', '.join(sorted(unknown_excluded))}")
    selected_books = [book for book in BOOKS if book[1] not in excluded]
    if not selected_books:
        raise SystemExit("Nu a rămas nicio carte pentru auditul legacy")

    manifest = json.loads(git_show(args.source_ref, "docs/data/biblia-emanus/manifest.json"))
    legacy_lock = json.loads(git_show(args.source_ref, "docs/data/biblia-emanus/source-lock.json"))
    fresh_hash = fresh_source_hashes()

    if manifest.get("translation") != "BE" or manifest.get("name") != "Biblia Emanus":
        raise SystemExit("Manifestul sursă nu declară Biblia Emanus / BE")
    if legacy_lock.get("translation") != "BE":
        raise SystemExit("source-lock legacy nu declară translation=BE")

    upstream = legacy_lock.get("upstreamArtifacts") or {}
    legacy_expected_web = (upstream.get("engwebp") or {}).get("sha256")
    legacy_expected_wlc = (upstream.get("hboWLC") or {}).get("sha256")
    actual_web = sha256_file(args.webu_zip)
    actual_wlc = sha256_file(args.wlc_zip)

    manifest_books = {book["id"]: book for book in manifest.get("books", []) if isinstance(book, dict) and "id" in book}
    report = {
        "translation": "BE",
        "sourceBranch": args.source_ref,
        "scope": {
            "includedBooks": [code for _file_id, code, _name, _chapters in selected_books],
            "excludedPromotedBooks": sorted(excluded),
        },
        "promotionEligible": False,
        "archivePins": {
            "WEBU": {
                "legacyExpectedSha256": legacy_expected_web,
                "actualSha256": actual_web,
                "legacyZipMatches": actual_web == legacy_expected_web,
                "eligibilityRule": "per-book fresh USFM hash",
            },
            "WLC": {
                "legacyExpectedSha256": legacy_expected_wlc,
                "actualSha256": actual_wlc,
                "legacyZipMatches": actual_wlc == legacy_expected_wlc,
                "eligibilityRule": "per-book fresh USFM hash",
            },
        },
        "books": [],
    }

    total_chapters = 0
    total_verses = 0
    source_mismatches: list[str] = []
    with zipfile.ZipFile(args.webu_zip) as web_zip, zipfile.ZipFile(args.wlc_zip) as wlc_zip:
        for file_id, code, name, chapter_count in selected_books:
            manifest_book = manifest_books.get(code)
            if not manifest_book:
                raise SystemExit(f"{code}: lipsește din manifest")
            if manifest_book.get("status") != "published" or manifest_book.get("category") != "Vechiul Testament Protocanonic":
                raise SystemExit(f"{code}: manifestul nu îl marchează protocanonic/published")
            if manifest_book.get("totalChapters") != chapter_count:
                raise SystemExit(f"{code}: număr capitole manifest invalid")

            generated = parse_generated(GENERATED / f"{file_id}Text.ts")
            if sorted(generated) != list(range(1, chapter_count + 1)):
                raise SystemExit(f"{code}: fișierul materializat nu are toate capitolele")

            book_verses = 0
            snapshots = set()
            digests = []
            for chapter in range(1, chapter_count + 1):
                raw = json.loads(git_show(args.source_ref, f"docs/data/biblia-emanus/{code}.{chapter}.json"))
                texts = validate_candidate(raw, code, chapter)
                if generated[chapter] != texts:
                    raise SystemExit(f"{code}.{chapter}: textul materializat diferă de JSON-ul BE revizuit")
                snapshots.add((raw.get("audit") or {}).get("sourceSnapshotSha256"))
                digests.append((raw.get("audit") or {}).get("textDigest"))
                book_verses += len(texts)

            if book_verses != manifest_book.get("totalVerses"):
                raise SystemExit(f"{code}: total versete {book_verses} != manifest {manifest_book.get('totalVerses')}")

            web_member = find_usfm_member(web_zip, code)
            wlc_member = find_usfm_member(wlc_zip, code)
            current_web_sha = member_sha256(web_zip, web_member)
            current_wlc_sha = member_sha256(wlc_zip, wlc_member)
            expected_web_sha = fresh_hash.get(("WEBU", code))
            expected_wlc_sha = fresh_hash.get(("WLC", code))
            web_match = current_web_sha == expected_web_sha
            wlc_match = current_wlc_sha == expected_wlc_sha
            if not web_match:
                source_mismatches.append(f"{code}:WEBU")
            if not wlc_match:
                source_mismatches.append(f"{code}:WLC")

            report["books"].append({
                "bookId": code,
                "name": name,
                "chapters": chapter_count,
                "verses": book_verses,
                "legacyAuditSnapshots": sorted(x for x in snapshots if isinstance(x, str)),
                "chapterTextDigests": digests,
                "currentWEBU": {
                    "member": web_member,
                    "sha256": current_web_sha,
                    "freshLockedSha256": expected_web_sha,
                    "matchesFreshLock": web_match,
                },
                "currentWLC": {
                    "member": wlc_member,
                    "sha256": current_wlc_sha,
                    "freshLockedSha256": expected_wlc_sha,
                    "matchesFreshLock": wlc_match,
                },
            })
            total_chapters += chapter_count
            total_verses += book_verses
            status = "source-identical" if web_match and wlc_match else "SOURCE-MISMATCH"
            print(f"OK {code}: {chapter_count} capitole / {book_verses} versete / text identic / audit complet / {status}")

    expected_chapters = sum(book[3] for book in selected_books)
    if total_chapters != expected_chapters:
        raise SystemExit(f"Așteptam {expected_chapters} capitole, găsite {total_chapters}")

    report["totals"] = {
        "books": len(selected_books),
        "chapters": total_chapters,
        "verses": total_verses,
    }
    report["promotionEligible"] = not source_mismatches
    report["sourceMismatches"] = source_mismatches
    report["blockingReason"] = (
        None
        if report["promotionEligible"]
        else "Cel puțin un payload USFM curent diferă de hash-ul per-carte din fresh source-lock; re-auditul trebuie oprit."
    )

    out = ROOT / "docs/biblia-explicata/MINOR-PROPHETS-BE-CANDIDATE-AUDIT.json"
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    status = "ELIGIBIL" if report["promotionEligible"] else "BLOCAT DE SOURCE-CONTENT"
    print(
        f"AUDIT CONTENT OK: {len(selected_books)}/{len(selected_books)} cărți, "
        f"{total_chapters}/{expected_chapters} capitole, {total_verses} versete; "
        f"promovare legacy: {status}. Raport: {out}"
    )


if __name__ == "__main__":
    main()
