#!/usr/bin/env python3
"""Capturează determinist sursele WEBU + WLC pentru Osea–Maleahi.

Acest script creează/actualizează source-lock-ul pentru re-audit. Un hash diferit
al arhivei upstream NU este acceptat orb: când ZIP-ul se schimbă, scriptul
compară payload-ul USFM al fiecăreia dintre cele 12 cărți cu hash-urile deja
pin-uite. Numai un drift de ambalare/metadata, cu conținutul cărților identic
byte-for-byte, poate trece automat.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "docs" / "data" / "biblia-emanus" / "sources"
LOCK_PATH = ROOT / "docs" / "data" / "biblia-emanus" / "minor-prophets-source-lock.json"
SNAPSHOT_PATH = OUT_DIR / "ot-minor-prophets-2026-08-07-usfm.zip"

BOOKS = [
    ("HOS", "Osea", 28),
    ("JOL", "Ioel", 29),
    ("AMO", "Amos", 30),
    ("OBA", "Obadia", 31),
    ("JON", "Iona", 32),
    ("MIC", "Mica", 33),
    ("NAM", "Naum", 34),
    ("HAB", "Habacuc", 35),
    ("ZEP", "Țefania", 36),
    ("HAG", "Hagai", 37),
    ("ZEC", "Zaharia", 38),
    ("MAL", "Maleahi", 39),
]

CAPTURED_ON = "2026-08-08"
WEBU_URL = "https://ebible.org/Scriptures/engwebp_usfm.zip"
WLC_URL = "https://ebible.org/Scriptures/hboWLC_usfm.zip"

EXPECTED_WEBU_ARCHIVE_SHA256 = "1c5957d487d9473c87ea5c7e6acffd0caa402ce98c4a577f3164cfd94b9b437d"
EXPECTED_WLC_ARCHIVE_SHA256 = "da7b33af7a23e0e9fce8a8adf3cb5bcb035a513f44b83865b390c52dc3dd2ce3"


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def sha256_file(path: Path) -> str:
    return sha256_bytes(path.read_bytes())


def find_member(archive: zipfile.ZipFile, code: str) -> str:
    candidates: list[str] = []
    for member in archive.namelist():
        base = Path(member).name
        if not base.lower().endswith((".usfm", ".sfm")):
            continue
        stem = re.sub(r"^\d+[-_]?", "", base)
        if stem.upper().startswith(code):
            candidates.append(member)
    if len(candidates) != 1:
        raise SystemExit(f"{code}: așteptam exact un fișier USFM, găsite {candidates}")
    return candidates[0]


def normalized_zip_info(name: str) -> zipfile.ZipInfo:
    info = zipfile.ZipInfo(name)
    info.date_time = (1980, 1, 1, 0, 0, 0)
    info.compress_type = zipfile.ZIP_DEFLATED
    info.external_attr = 0o100644 << 16
    info.create_system = 3
    return info


def previous_book_hashes() -> dict[tuple[str, str], str]:
    if not LOCK_PATH.is_file():
        return {}
    raw = json.loads(LOCK_PATH.read_text(encoding="utf-8"))
    result: dict[tuple[str, str], str] = {}
    for book in raw.get("books", []):
        code = book.get("bookId")
        if not isinstance(code, str):
            continue
        for source in ("WEBU", "WLC"):
            digest = (book.get(source) or {}).get("sha256")
            if isinstance(digest, str):
                result[(source, code)] = digest
    return result


def extract_books(archive_path: Path, source: str) -> tuple[dict[str, str], dict[str, bytes]]:
    members: dict[str, str] = {}
    payloads: dict[str, bytes] = {}
    with zipfile.ZipFile(archive_path) as archive:
        for code, _name, _order in BOOKS:
            member = find_member(archive, code)
            members[code] = member
            payloads[code] = archive.read(member)
    return members, payloads


def verify_archive_drift(
    source: str,
    actual_archive_sha: str,
    expected_archive_sha: str,
    payloads: dict[str, bytes],
    previous: dict[tuple[str, str], str],
) -> dict:
    if actual_archive_sha == expected_archive_sha:
        return {
            "archiveDrift": False,
            "payloadVerifiedAgainstPreviousLock": True,
            "changedBooks": [],
        }

    missing: list[str] = []
    changed: list[str] = []
    for code, _name, _order in BOOKS:
        expected_book_sha = previous.get((source, code))
        if not expected_book_sha:
            missing.append(code)
            continue
        if sha256_bytes(payloads[code]) != expected_book_sha:
            changed.append(code)

    if missing:
        raise SystemExit(
            f"{source} archive drift: {actual_archive_sha} != {expected_archive_sha}; "
            f"nu există hash pin-uit per carte pentru: {', '.join(missing)}."
        )
    if changed:
        raise SystemExit(
            f"{source} archive drift CU SCHIMBARE DE CONȚINUT: {actual_archive_sha} != {expected_archive_sha}; "
            f"USFM diferit pentru: {', '.join(changed)}. Nu actualiza lock-ul automat."
        )

    print(
        f"{source} archive packaging drift acceptat: {actual_archive_sha} != {expected_archive_sha}; "
        "toate cele 12 payload-uri USFM sunt byte-identical cu lock-ul existent."
    )
    return {
        "archiveDrift": True,
        "payloadVerifiedAgainstPreviousLock": True,
        "changedBooks": [],
        "previousArchiveSha256": expected_archive_sha,
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--webu-zip", type=Path, required=True)
    parser.add_argument("--wlc-zip", type=Path, required=True)
    args = parser.parse_args()

    previous = previous_book_hashes()
    webu_archive_sha = sha256_file(args.webu_zip)
    wlc_archive_sha = sha256_file(args.wlc_zip)

    web_members, web_payloads = extract_books(args.webu_zip, "WEBU")
    wlc_members, wlc_payloads = extract_books(args.wlc_zip, "WLC")

    webu_drift = verify_archive_drift(
        "WEBU", webu_archive_sha, EXPECTED_WEBU_ARCHIVE_SHA256, web_payloads, previous
    )
    wlc_drift = verify_archive_drift(
        "WLC", wlc_archive_sha, EXPECTED_WLC_ARCHIVE_SHA256, wlc_payloads, previous
    )

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    LOCK_PATH.parent.mkdir(parents=True, exist_ok=True)

    book_records: list[dict] = []
    payloads: list[tuple[str, bytes]] = []

    for code, name, order in BOOKS:
        web_bytes = web_payloads[code]
        wlc_bytes = wlc_payloads[code]
        web_snapshot_name = f"webu/{code}.usfm"
        wlc_snapshot_name = f"wlc/{code}.usfm"
        payloads.append((web_snapshot_name, web_bytes))
        payloads.append((wlc_snapshot_name, wlc_bytes))

        book_records.append(
            {
                "bookId": code,
                "name": name,
                "order": order,
                "WEBU": {
                    "version": "WEBU-Protestant",
                    "sourceArchiveMember": web_members[code],
                    "snapshotMember": web_snapshot_name,
                    "sha256": sha256_bytes(web_bytes),
                },
                "WLC": {
                    "version": "WLC-OSHB",
                    "sourceArchiveMember": wlc_members[code],
                    "snapshotMember": wlc_snapshot_name,
                    "sha256": sha256_bytes(wlc_bytes),
                },
            }
        )

    payloads.sort(key=lambda item: item[0])
    with zipfile.ZipFile(SNAPSHOT_PATH, "w") as out:
        for name, data in payloads:
            out.writestr(normalized_zip_info(name), data)

    snapshot_sha = sha256_file(SNAPSHOT_PATH)
    lock = {
        "schemaVersion": 2,
        "translationTarget": "BE",
        "status": "source-capture-only",
        "capturedOn": CAPTURED_ON,
        "scope": "Osea–Maleahi / 12 profeți mici canonici / 67 capitole",
        "warning": "Acest lock fixează sursele pentru re-audit. Nu certifică singur traducerea românească și nu schimbă textStage.",
        "driftPolicy": "Archive hash drift is accepted only when every in-scope USFM book payload remains byte-identical to the previous per-book lock.",
        "upstreamArtifacts": {
            "WEBU": {
                "url": WEBU_URL,
                "archiveSha256": webu_archive_sha,
                **webu_drift,
            },
            "WLC": {
                "url": WLC_URL,
                "archiveSha256": wlc_archive_sha,
                **wlc_drift,
            },
        },
        "snapshot": {
            "path": str(SNAPSHOT_PATH.relative_to(ROOT)).replace("\\", "/"),
            "sha256": snapshot_sha,
            "members": len(payloads),
        },
        "books": book_records,
    }
    LOCK_PATH.write_text(json.dumps(lock, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    print(
        f"Minor prophets source capture OK: 12/12 cărți, {len(payloads)} USFM members; "
        f"snapshot sha256={snapshot_sha}"
    )


if __name__ == "__main__":
    main()
