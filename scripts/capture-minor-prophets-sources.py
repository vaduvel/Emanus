#!/usr/bin/env python3
"""Capturează determinist sursele WEBU + WLC pentru Osea–Maleahi.

Acest script creează un source-lock NOU. Nu modifică vechiul source-lock și nu
promovează automat niciun text românesc la Biblia Emanus.
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

CAPTURED_ON = "2026-08-07"
WEBU_URL = "https://ebible.org/Scriptures/engwebp_usfm.zip"
WLC_URL = "https://ebible.org/Scriptures/hboWLC_usfm.zip"

# Hash-urile arhivelor descărcate în auditul din 2026-08-07. Acesta este un lock
# nou; NU suprascrie hash-ul WEBU istoric din source-lock-ul vechi.
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
        # eBible numește de regulă fișierele 29-HOSengwebp.usfm etc.
        stem = re.sub(r"^\d+[-_]?", "", base)
        if stem.upper().startswith(code):
            candidates.append(member)
    if len(candidates) != 1:
        raise SystemExit(f"{code}: așteptam exact un fișier USFM, găsite {candidates}")
    return candidates[0]


def normalized_zip_info(name: str) -> zipfile.ZipInfo:
    info = zipfile.ZipInfo(name)
    # ZIP nu acceptă ani <1980. Timestamp fix => snapshot reproductibil byte-for-byte.
    info.date_time = (1980, 1, 1, 0, 0, 0)
    info.compress_type = zipfile.ZIP_DEFLATED
    info.external_attr = 0o100644 << 16
    info.create_system = 3
    return info


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--webu-zip", type=Path, required=True)
    parser.add_argument("--wlc-zip", type=Path, required=True)
    args = parser.parse_args()

    webu_archive_sha = sha256_file(args.webu_zip)
    wlc_archive_sha = sha256_file(args.wlc_zip)
    if webu_archive_sha != EXPECTED_WEBU_ARCHIVE_SHA256:
        raise SystemExit(
            f"WEBU archive drift: {webu_archive_sha} != {EXPECTED_WEBU_ARCHIVE_SHA256}. "
            "Nu actualiza lock-ul automat; inspectează sursa."
        )
    if wlc_archive_sha != EXPECTED_WLC_ARCHIVE_SHA256:
        raise SystemExit(
            f"WLC archive drift: {wlc_archive_sha} != {EXPECTED_WLC_ARCHIVE_SHA256}. "
            "Nu actualiza lock-ul automat; inspectează sursa."
        )

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    LOCK_PATH.parent.mkdir(parents=True, exist_ok=True)

    book_records: list[dict] = []
    payloads: list[tuple[str, bytes]] = []

    with zipfile.ZipFile(args.webu_zip) as webu, zipfile.ZipFile(args.wlc_zip) as wlc:
        for code, name, order in BOOKS:
            web_member = find_member(webu, code)
            wlc_member = find_member(wlc, code)
            web_bytes = webu.read(web_member)
            wlc_bytes = wlc.read(wlc_member)

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
                        "sourceArchiveMember": web_member,
                        "snapshotMember": web_snapshot_name,
                        "sha256": sha256_bytes(web_bytes),
                    },
                    "WLC": {
                        "version": "WLC-OSHB",
                        "sourceArchiveMember": wlc_member,
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
        "schemaVersion": 1,
        "translationTarget": "BE",
        "status": "source-capture-only",
        "capturedOn": CAPTURED_ON,
        "scope": "Osea–Maleahi / 12 profeți mici canonici / 67 capitole",
        "warning": "Acest lock fixează sursele pentru re-audit. Nu certifică singur traducerea românească și nu schimbă textStage.",
        "upstreamArtifacts": {
            "WEBU": {
                "url": WEBU_URL,
                "archiveSha256": webu_archive_sha,
            },
            "WLC": {
                "url": WLC_URL,
                "archiveSha256": wlc_archive_sha,
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
