#!/usr/bin/env python3
"""Build the deterministic Biblia Emanus New Testament source snapshot."""

from __future__ import annotations

import argparse
from collections import Counter
from dataclasses import dataclass
import hashlib
import json
import os
from pathlib import Path, PurePosixPath
import re
import stat
import sys
import tarfile
import tempfile
import xml.etree.ElementTree as ElementTree
import zipfile


SBLGNT_COMMIT = "c4d241a9c1c479a55b989ba35a4976c1d0b8052c"
SBLGNT_VERSION = "1.2"
SBLGNT_ROOT = f"SBLGNT-{SBLGNT_COMMIT}"
MANIFEST_PATH = "manifest.json"
ZIP_TIMESTAMP = (1980, 1, 1, 0, 0, 0)
ZIP_FILE_MODE = stat.S_IFREG | 0o644
ZIP_COMMENT_PREFIX = "manifest-sha256:"


UPSTREAM_SHA256 = {
    "sblgnt": "cc1715f3501a23ae68817559ef9f891cd4520cf9bb4ef6b7a6f606d1917bcf40",
    "webp": "9b4330ba6baf9bd5fa8ea63a8ff255c9ab326da8c843f0355c23734e61ee6276",
    "tr": "9277bc7fd6ad3c78c0a99656e369ea5af294886cb3df23313822c0a34513d4ff",
    "btf": "69dbdd9c09e7cdd88db4d4ab95ffa572be861b680bf1c7fd5718f127a8910e26",
    "cornilescu1924": "9c999dc1722c2e376e64e6506b95846b0b3e4622731cfc550c7e661455f6e3f4",
    "biblia_libera": "c691fa528cdaa50db913943d0a9b011bccadb8b4d0165f5756a7706b8d575239",
}


@dataclass(frozen=True)
class BookSpec:
    book_id: str
    sbl_name: str
    chapters: int
    ebible_number: int
    tr_number: int


NT_BOOKS = (
    BookSpec("MAT", "Matt", 28, 70, 46),
    BookSpec("MRK", "Mark", 16, 71, 47),
    BookSpec("LUK", "Luke", 24, 72, 48),
    BookSpec("JHN", "John", 21, 73, 49),
    BookSpec("ACT", "Acts", 28, 74, 50),
    BookSpec("ROM", "Rom", 16, 75, 51),
    BookSpec("1CO", "1Cor", 16, 76, 52),
    BookSpec("2CO", "2Cor", 13, 77, 53),
    BookSpec("GAL", "Gal", 6, 78, 54),
    BookSpec("EPH", "Eph", 6, 79, 55),
    BookSpec("PHP", "Phil", 4, 80, 56),
    BookSpec("COL", "Col", 4, 81, 57),
    BookSpec("1TH", "1Thess", 5, 82, 58),
    BookSpec("2TH", "2Thess", 3, 83, 59),
    BookSpec("1TI", "1Tim", 6, 84, 60),
    BookSpec("2TI", "2Tim", 4, 85, 61),
    BookSpec("TIT", "Titus", 3, 86, 62),
    BookSpec("PHM", "Phlm", 1, 87, 63),
    BookSpec("HEB", "Heb", 13, 88, 64),
    BookSpec("JAS", "Jas", 5, 89, 65),
    BookSpec("1PE", "1Pet", 5, 90, 66),
    BookSpec("2PE", "2Pet", 3, 91, 67),
    BookSpec("1JN", "1John", 5, 92, 68),
    BookSpec("2JN", "2John", 1, 93, 69),
    BookSpec("3JN", "3John", 1, 94, 70),
    BookSpec("JUD", "Jude", 1, 95, 71),
    BookSpec("REV", "Rev", 22, 96, 72),
)


class SnapshotError(RuntimeError):
    """Raised when an input or generated snapshot violates the contract."""


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def canonical_json(data: object) -> bytes:
    return (
        json.dumps(data, ensure_ascii=False, sort_keys=True, separators=(",", ":"))
        + "\n"
    ).encode("utf-8")


def validate_archive_path(name: str, *, archive: str, is_directory: bool) -> None:
    if not name or "\x00" in name or "\\" in name:
        raise SnapshotError(f"{archive}: unsafe archive path {name!r}")

    candidate = name[:-1] if is_directory and name.endswith("/") else name
    if not candidate or candidate.startswith("/") or re.match(r"^[A-Za-z]:", candidate):
        raise SnapshotError(f"{archive}: unsafe archive path {name!r}")

    parts = candidate.split("/")
    if any(part in {"", ".", ".."} for part in parts):
        raise SnapshotError(f"{archive}: unsafe archive path {name!r}")

    parsed = PurePosixPath(candidate)
    if parsed.is_absolute() or str(parsed) != candidate:
        raise SnapshotError(f"{archive}: unsafe archive path {name!r}")


def verify_upstream(path: Path, source_id: str) -> None:
    if not path.is_file():
        raise SnapshotError(f"{source_id}: input is not a regular file: {path}")
    actual = sha256_file(path)
    expected = UPSTREAM_SHA256[source_id]
    if actual != expected:
        raise SnapshotError(
            f"{source_id}: SHA256 mismatch for {path}; expected {expected}, got {actual}"
        )


def inspect_zip(path: Path, source_id: str) -> tuple[zipfile.ZipFile, dict[str, zipfile.ZipInfo]]:
    try:
        archive = zipfile.ZipFile(path, "r")
    except (OSError, zipfile.BadZipFile) as error:
        raise SnapshotError(f"{source_id}: cannot open ZIP {path}: {error}") from error

    try:
        infos = archive.infolist()
        duplicates = sorted(
            name for name, count in Counter(info.filename for info in infos).items() if count > 1
        )
        if duplicates:
            raise SnapshotError(f"{source_id}: duplicate ZIP entries: {duplicates}")

        for info in infos:
            validate_archive_path(
                info.filename, archive=source_id, is_directory=info.is_dir()
            )
            unix_mode = (info.external_attr >> 16) & 0xFFFF
            if stat.S_ISLNK(unix_mode):
                raise SnapshotError(f"{source_id}: symbolic link is not allowed: {info.filename}")
            if info.flag_bits & 0x1:
                raise SnapshotError(f"{source_id}: encrypted entry is not allowed: {info.filename}")
        return archive, {info.filename: info for info in infos}
    except Exception:
        archive.close()
        raise


def inspect_sbl_tar(path: Path) -> tuple[tarfile.TarFile, dict[str, tarfile.TarInfo]]:
    try:
        archive = tarfile.open(path, "r:gz")
    except (OSError, tarfile.TarError) as error:
        raise SnapshotError(f"sblgnt: cannot open tar.gz {path}: {error}") from error

    try:
        members = archive.getmembers()
        duplicates = sorted(
            name for name, count in Counter(member.name for member in members).items() if count > 1
        )
        if duplicates:
            raise SnapshotError(f"sblgnt: duplicate tar entries: {duplicates}")

        expected_prefix = f"{SBLGNT_ROOT}/"
        for member in members:
            validate_archive_path(
                member.name, archive="sblgnt", is_directory=member.isdir()
            )
            if member.name != SBLGNT_ROOT and not member.name.startswith(expected_prefix):
                raise SnapshotError(
                    f"sblgnt: entry is outside pinned commit root {SBLGNT_ROOT}: {member.name}"
                )
            if not (member.isfile() or member.isdir()):
                raise SnapshotError(
                    f"sblgnt: links and special entries are not allowed: {member.name}"
                )
        return archive, {member.name: member for member in members}
    except Exception:
        archive.close()
        raise


def read_zip_member(
    archive: zipfile.ZipFile,
    inventory: dict[str, zipfile.ZipInfo],
    member_name: str,
    source_id: str,
) -> bytes:
    info = inventory.get(member_name)
    if info is None or info.is_dir():
        raise SnapshotError(f"{source_id}: required file is missing: {member_name}")
    try:
        return archive.read(info)
    except (OSError, RuntimeError, zipfile.BadZipFile) as error:
        raise SnapshotError(f"{source_id}: cannot read {member_name}: {error}") from error


def read_tar_member(
    archive: tarfile.TarFile,
    inventory: dict[str, tarfile.TarInfo],
    member_name: str,
) -> bytes:
    member = inventory.get(member_name)
    if member is None or not member.isfile():
        raise SnapshotError(f"sblgnt: required file is missing: {member_name}")
    handle = archive.extractfile(member)
    if handle is None:
        raise SnapshotError(f"sblgnt: cannot read required file: {member_name}")
    return handle.read()


def decode_utf8(data: bytes, source_id: str, member_name: str) -> str:
    try:
        return data.decode("utf-8-sig")
    except UnicodeDecodeError as error:
        raise SnapshotError(
            f"{source_id}: required text file is not UTF-8: {member_name}"
        ) from error


def validate_usfm(
    data: bytes,
    *,
    source_id: str,
    member_name: str,
    book: BookSpec,
    allowed_missing_chapters: frozenset[int] = frozenset(),
) -> None:
    text = decode_utf8(data, source_id, member_name)
    id_match = re.search(r"(?m)^\\id\s+([0-9A-Z]{3})\b", text)
    if id_match is None or id_match.group(1) != book.book_id:
        actual = id_match.group(1) if id_match else "missing"
        raise SnapshotError(
            f"{source_id}: {member_name} has USFM id {actual}, expected {book.book_id}"
        )

    chapter_markers = [
        int(value) for value in re.findall(r"(?m)^\\c\s+(\d+)\b", text)
    ]
    duplicates = sorted(
        chapter for chapter, count in Counter(chapter_markers).items() if count > 1
    )
    if duplicates:
        raise SnapshotError(
            f"{source_id}: {member_name} has duplicate chapter markers: {duplicates}"
        )

    expected = set(range(1, book.chapters + 1)) - set(allowed_missing_chapters)
    actual = set(chapter_markers)
    if actual != expected:
        missing = sorted(expected - actual)
        unexpected = sorted(actual - expected)
        raise SnapshotError(
            f"{source_id}: {member_name} chapter inventory mismatch; "
            f"missing={missing}, unexpected={unexpected}"
        )


def validate_sbl_text(data: bytes, member_name: str, book: BookSpec) -> None:
    text = decode_utf8(data, "sblgnt", member_name)
    reference_pattern = re.compile(
        rf"(?m)^{re.escape(book.sbl_name)}\s+(\d+):(\d+)\t[^\n]+$"
    )
    references = [
        (int(chapter), int(verse))
        for chapter, verse in reference_pattern.findall(text)
    ]
    if not references:
        raise SnapshotError(f"sblgnt: no verse text found in {member_name}")
    duplicates = sorted(
        reference for reference, count in Counter(references).items() if count > 1
    )
    if duplicates:
        raise SnapshotError(f"sblgnt: duplicate verse references in {member_name}: {duplicates}")

    chapters = {chapter for chapter, _verse in references}
    expected = set(range(1, book.chapters + 1))
    if chapters != expected:
        raise SnapshotError(
            f"sblgnt: {member_name} chapter inventory mismatch; "
            f"missing={sorted(expected - chapters)}, unexpected={sorted(chapters - expected)}"
        )


def validate_sbl_apparatus(
    text_data: bytes,
    xml_data: bytes,
    *,
    text_member: str,
    xml_member: str,
) -> None:
    text = decode_utf8(text_data, "sblgnt", text_member)
    headings = re.findall(r"(?m)^([^\t\n]+\s+\d+:\d+)\s*$", text)
    if not headings:
        raise SnapshotError(f"sblgnt: apparatus text has no verse headings: {text_member}")

    try:
        root = ElementTree.fromstring(xml_data)
    except ElementTree.ParseError as error:
        raise SnapshotError(f"sblgnt: invalid apparatus XML {xml_member}: {error}") from error
    if root.tag != "book":
        raise SnapshotError(f"sblgnt: unexpected XML root in {xml_member}: {root.tag}")

    xml_headings = [(element.text or "").strip() for element in root.findall("verse")]
    if headings != xml_headings:
        raise SnapshotError(
            f"sblgnt: apparatus text/XML verse inventory differs for {text_member}"
        )


def add_payload(
    payload: dict[str, bytes],
    records: list[dict[str, object]],
    *,
    output_path: str,
    data: bytes,
    source_id: str,
    source_path: str,
    kind: str,
    book_id: str | None = None,
) -> None:
    if output_path in payload:
        raise SnapshotError(f"internal duplicate snapshot path: {output_path}")
    payload[output_path] = data
    record: dict[str, object] = {
        "kind": kind,
        "path": output_path,
        "sha256": sha256_bytes(data),
        "size": len(data),
        "sourceId": source_id,
        "sourcePath": source_path,
    }
    if book_id is not None:
        record["bookId"] = book_id
    records.append(record)


def collect_sblgnt(
    path: Path, payload: dict[str, bytes], records: list[dict[str, object]]
) -> None:
    archive, inventory = inspect_sbl_tar(path)
    try:
        metadata = {
            "About.md": read_tar_member(archive, inventory, f"{SBLGNT_ROOT}/About.md"),
            "LICENSE": read_tar_member(archive, inventory, f"{SBLGNT_ROOT}/LICENSE"),
            "README.md": read_tar_member(archive, inventory, f"{SBLGNT_ROOT}/README.md"),
        }
        readme = decode_utf8(metadata["README.md"], "sblgnt", "README.md")
        license_text = decode_utf8(metadata["LICENSE"], "sblgnt", "LICENSE")
        if f"<td>v{SBLGNT_VERSION}</td>" not in readme:
            raise SnapshotError(
                f"sblgnt: README does not declare pinned version v{SBLGNT_VERSION}"
            )
        if "Creative Commons Attribution 4.0 International License" not in readme:
            raise SnapshotError("sblgnt: README does not declare CC BY 4.0")
        if "Attribution 4.0 International" not in license_text:
            raise SnapshotError("sblgnt: LICENSE is not CC BY 4.0")

        for name, data in metadata.items():
            source_path = f"{SBLGNT_ROOT}/{name}"
            add_payload(
                payload,
                records,
                output_path=f"sblgnt/metadata/{name}",
                data=data,
                source_id="sblgnt",
                source_path=source_path,
                kind="metadata",
            )

        for book in NT_BOOKS:
            main_path = f"{SBLGNT_ROOT}/data/sblgnt/text/{book.sbl_name}.txt"
            apparatus_text_path = (
                f"{SBLGNT_ROOT}/data/sblgntapp/text/{book.sbl_name}.txt"
            )
            apparatus_xml_path = (
                f"{SBLGNT_ROOT}/data/sblgntapp/xml/{book.sbl_name}.xml"
            )
            main = read_tar_member(archive, inventory, main_path)
            apparatus_text = read_tar_member(archive, inventory, apparatus_text_path)
            apparatus_xml = read_tar_member(archive, inventory, apparatus_xml_path)

            validate_sbl_text(main, main_path, book)
            validate_sbl_apparatus(
                apparatus_text,
                apparatus_xml,
                text_member=apparatus_text_path,
                xml_member=apparatus_xml_path,
            )
            add_payload(
                payload,
                records,
                output_path=f"sblgnt/text/{book.book_id}.txt",
                data=main,
                source_id="sblgnt",
                source_path=main_path,
                kind="greek-critical-text",
                book_id=book.book_id,
            )
            add_payload(
                payload,
                records,
                output_path=f"sblgnt/apparatus/text/{book.book_id}.txt",
                data=apparatus_text,
                source_id="sblgnt",
                source_path=apparatus_text_path,
                kind="critical-apparatus-text",
                book_id=book.book_id,
            )
            add_payload(
                payload,
                records,
                output_path=f"sblgnt/apparatus/xml/{book.book_id}.xml",
                data=apparatus_xml,
                source_id="sblgnt",
                source_path=apparatus_xml_path,
                kind="critical-apparatus-xml",
                book_id=book.book_id,
            )
    finally:
        archive.close()


def collect_usfm_source(
    path: Path,
    *,
    source_id: str,
    filename_suffix: str,
    output_directory: str,
    payload: dict[str, bytes],
    records: list[dict[str, object]],
) -> None:
    archive, inventory = inspect_zip(path, source_id)
    try:
        for book in NT_BOOKS:
            number = (
                book.tr_number
                if source_id in {"tr", "biblia_libera"}
                else book.ebible_number
            )
            member_name = f"{number:02d}-{book.book_id}{filename_suffix}.usfm"
            data = read_zip_member(archive, inventory, member_name, source_id)
            allowed_missing = (
                frozenset({11})
                if source_id == "cornilescu1924" and book.book_id == "JHN"
                else frozenset()
            )
            validate_usfm(
                data,
                source_id=source_id,
                member_name=member_name,
                book=book,
                allowed_missing_chapters=allowed_missing,
            )
            add_payload(
                payload,
                records,
                output_path=f"{output_directory}/{book.book_id}.usfm",
                data=data,
                source_id=source_id,
                source_path=member_name,
                kind="usfm",
                book_id=book.book_id,
            )
    finally:
        archive.close()


def build_manifest(records: list[dict[str, object]]) -> dict[str, object]:
    files = sorted(records, key=lambda record: str(record["path"]))
    return {
        "schemaVersion": 1,
        "snapshotId": "biblia-emanus-new-testament-sources",
        "canon": "protestant-new-testament-27",
        "determinism": {
            "compression": "stored",
            "entryOrder": "lexicographic",
            "fileMode": "0644",
            "timestamp": "1980-01-01T00:00:00Z",
        },
        "integrity": {
            "algorithm": "sha256",
            "manifestAuthentication": "ZIP comment contains SHA256 of manifest.json",
            "scope": "Every ZIP payload entry except manifest.json; self-hash is stored in the ZIP comment to avoid a recursive manifest.",
        },
        "upstreams": {
            "sblgnt": {
                "archiveName": "sblgnt.tar.gz",
                "archiveSha256": UPSTREAM_SHA256["sblgnt"],
                "commit": SBLGNT_COMMIT,
                "license": "CC BY 4.0",
                "version": SBLGNT_VERSION,
            },
            "webp": {
                "archiveName": "engwebp_usfm.zip",
                "archiveSha256": UPSTREAM_SHA256["webp"],
                "license": "Public Domain",
            },
            "tr": {
                "archiveName": "grctr_usfm.zip",
                "archiveSha256": UPSTREAM_SHA256["tr"],
                "license": "Public Domain",
            },
            "btf": {
                "archiveName": "ronbtf_usfm.zip",
                "archiveSha256": UPSTREAM_SHA256["btf"],
                "license": "Public Domain",
            },
            "cornilescu1924": {
                "archiveName": "ron1924_usfm.zip",
                "archiveSha256": UPSTREAM_SHA256["cornilescu1924"],
                "license": "Public Domain",
            },
            "biblia_libera": {
                "archiveName": "ronbl_usfm.zip",
                "archiveSha256": UPSTREAM_SHA256["biblia_libera"],
                "license": "Public Domain",
            },
        },
        "books": [
            {"bookId": book.book_id, "chapters": book.chapters} for book in NT_BOOKS
        ],
        "knownLacunae": [
            {
                "sourceId": "cornilescu1924",
                "bookId": "JHN",
                "missingChapters": [11],
                "evidence": "The pinned ron1924 USFM file jumps from chapter 10 to chapter 12.",
                "policy": "Recorded as an upstream lacuna; no text is synthesized or substituted.",
            }
        ],
        "files": files,
        "statistics": {
            "books": len(NT_BOOKS),
            "chapters": sum(book.chapters for book in NT_BOOKS),
            "payloadEntries": len(files),
            "payloadBytes": sum(int(record["size"]) for record in files),
        },
    }


def zip_info(path: str) -> zipfile.ZipInfo:
    info = zipfile.ZipInfo(path, ZIP_TIMESTAMP)
    info.compress_type = zipfile.ZIP_STORED
    info.create_system = 3
    info.external_attr = ZIP_FILE_MODE << 16
    info.extra = b""
    info.comment = b""
    return info


def write_snapshot(output: Path, payload: dict[str, bytes], manifest: dict[str, object]) -> None:
    manifest_data = canonical_json(manifest)
    entries = dict(payload)
    entries[MANIFEST_PATH] = manifest_data
    output.parent.mkdir(parents=True, exist_ok=True)

    temporary_name: str | None = None
    try:
        with tempfile.NamedTemporaryFile(
            mode="wb", prefix=f".{output.name}.", suffix=".tmp", dir=output.parent, delete=False
        ) as temporary:
            temporary_name = temporary.name
        with zipfile.ZipFile(temporary_name, "w", allowZip64=True) as archive:
            archive.comment = (
                ZIP_COMMENT_PREFIX + sha256_bytes(manifest_data)
            ).encode("ascii")
            for path in sorted(entries):
                archive.writestr(zip_info(path), entries[path])
        os.replace(temporary_name, output)
        os.chmod(output, 0o644)
        temporary_name = None
    finally:
        if temporary_name is not None:
            try:
                os.unlink(temporary_name)
            except FileNotFoundError:
                pass


def self_check(path: Path) -> dict[str, object]:
    try:
        with zipfile.ZipFile(path, "r") as archive:
            infos = archive.infolist()
            names = [info.filename for info in infos]
            if names != sorted(names):
                raise SnapshotError("self-check: ZIP entries are not lexicographically sorted")
            duplicates = sorted(
                name for name, count in Counter(names).items() if count > 1
            )
            if duplicates:
                raise SnapshotError(f"self-check: duplicate ZIP entries: {duplicates}")
            if MANIFEST_PATH not in names:
                raise SnapshotError("self-check: manifest.json is missing")

            for info in infos:
                validate_archive_path(
                    info.filename, archive="snapshot", is_directory=info.is_dir()
                )
                if info.is_dir():
                    raise SnapshotError(
                        f"self-check: directory entry is not allowed: {info.filename}"
                    )
                if info.date_time != ZIP_TIMESTAMP:
                    raise SnapshotError(
                        f"self-check: non-deterministic timestamp on {info.filename}"
                    )
                if info.compress_type != zipfile.ZIP_STORED:
                    raise SnapshotError(
                        f"self-check: unexpected compression on {info.filename}"
                    )
                if info.create_system != 3:
                    raise SnapshotError(
                        f"self-check: non-Unix create_system on {info.filename}"
                    )
                mode = (info.external_attr >> 16) & 0xFFFF
                if mode != ZIP_FILE_MODE:
                    raise SnapshotError(
                        f"self-check: unexpected mode on {info.filename}: {mode:o}"
                    )

            manifest_data = archive.read(MANIFEST_PATH)
            expected_comment = (
                ZIP_COMMENT_PREFIX + sha256_bytes(manifest_data)
            ).encode("ascii")
            if archive.comment != expected_comment:
                raise SnapshotError("self-check: manifest SHA256 ZIP comment mismatch")
            try:
                manifest = json.loads(manifest_data)
            except (UnicodeDecodeError, json.JSONDecodeError) as error:
                raise SnapshotError(f"self-check: invalid manifest JSON: {error}") from error
            if canonical_json(manifest) != manifest_data:
                raise SnapshotError("self-check: manifest JSON is not canonical")

            file_records = manifest.get("files")
            if not isinstance(file_records, list):
                raise SnapshotError("self-check: manifest files must be an array")
            expected_names = {MANIFEST_PATH}
            for record in file_records:
                if not isinstance(record, dict):
                    raise SnapshotError("self-check: invalid manifest file record")
                entry_path = record.get("path")
                expected_hash = record.get("sha256")
                expected_size = record.get("size")
                if not isinstance(entry_path, str) or entry_path == MANIFEST_PATH:
                    raise SnapshotError("self-check: invalid payload path in manifest")
                if entry_path in expected_names:
                    raise SnapshotError(
                        f"self-check: duplicate payload path in manifest: {entry_path}"
                    )
                expected_names.add(entry_path)
                if entry_path not in names:
                    raise SnapshotError(
                        f"self-check: manifest payload is missing from ZIP: {entry_path}"
                    )
                data = archive.read(entry_path)
                if expected_hash != sha256_bytes(data):
                    raise SnapshotError(f"self-check: SHA256 mismatch for {entry_path}")
                if expected_size != len(data):
                    raise SnapshotError(f"self-check: size mismatch for {entry_path}")
            if set(names) != expected_names:
                raise SnapshotError(
                    f"self-check: unmanifested ZIP entries: {sorted(set(names) - expected_names)}"
                )
            if manifest.get("knownLacunae") != [
                {
                    "sourceId": "cornilescu1924",
                    "bookId": "JHN",
                    "missingChapters": [11],
                    "evidence": "The pinned ron1924 USFM file jumps from chapter 10 to chapter 12.",
                    "policy": "Recorded as an upstream lacuna; no text is synthesized or substituted.",
                }
            ]:
                raise SnapshotError("self-check: Cornilescu John 11 lacuna is not declared exactly")
            return manifest
    except (OSError, zipfile.BadZipFile) as error:
        raise SnapshotError(f"self-check: cannot reopen {path}: {error}") from error


def build(args: argparse.Namespace) -> tuple[str, dict[str, object]]:
    inputs = {
        "sblgnt": args.sblgnt,
        "webp": args.webp,
        "tr": args.tr,
        "btf": args.btf,
        "cornilescu1924": args.cornilescu,
        "biblia_libera": args.biblia_libera,
    }
    output = args.output
    output_resolved = output.resolve()
    for source_id, path in inputs.items():
        if path.resolve() == output_resolved:
            raise SnapshotError(f"output must not overwrite input source {source_id}: {path}")
        verify_upstream(path, source_id)

    payload: dict[str, bytes] = {}
    records: list[dict[str, object]] = []
    upstream_names = {
        "sblgnt": "sblgnt.tar.gz",
        "webp": "engwebp_usfm.zip",
        "tr": "grctr_usfm.zip",
        "btf": "ronbtf_usfm.zip",
        "cornilescu1924": "ron1924_usfm.zip",
        "biblia_libera": "ronbl_usfm.zip",
    }
    for source_id, path in inputs.items():
        add_payload(
            payload,
            records,
            output_path=f"upstream/{upstream_names[source_id]}",
            data=path.read_bytes(),
            source_id=source_id,
            source_path=path.name,
            kind="upstream-archive",
        )
    collect_sblgnt(args.sblgnt, payload, records)
    collect_usfm_source(
        args.webp,
        source_id="webp",
        filename_suffix="engwebp",
        output_directory="webp",
        payload=payload,
        records=records,
    )
    collect_usfm_source(
        args.tr,
        source_id="tr",
        filename_suffix="grctr",
        output_directory="tr",
        payload=payload,
        records=records,
    )
    collect_usfm_source(
        args.biblia_libera,
        source_id="biblia_libera",
        filename_suffix="ronbl",
        output_directory="biblia-libera",
        payload=payload,
        records=records,
    )
    collect_usfm_source(
        args.btf,
        source_id="btf",
        filename_suffix="ronbtf",
        output_directory="btf",
        payload=payload,
        records=records,
    )
    collect_usfm_source(
        args.cornilescu,
        source_id="cornilescu1924",
        filename_suffix="ron1924",
        output_directory="cornilescu1924",
        payload=payload,
        records=records,
    )

    manifest = build_manifest(records)
    write_snapshot(output, payload, manifest)
    checked_manifest = self_check(output)
    return sha256_file(output), checked_manifest


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description=(
            "Build a deterministic ZIP snapshot containing the pinned SBLGNT 1.2, "
            "WEB Protestant Edition, Textus Receptus, BTF, Cornilescu 1924, "
            "and Biblia Liberă New Testament sources."
        )
    )
    parser.add_argument("--sblgnt", type=Path, required=True, help="pinned SBLGNT tar.gz")
    parser.add_argument("--webp", type=Path, required=True, help="engwebp_usfm.zip")
    parser.add_argument("--tr", type=Path, required=True, help="grctr_usfm.zip")
    parser.add_argument("--btf", type=Path, required=True, help="ronbtf_usfm.zip")
    parser.add_argument(
        "--cornilescu", type=Path, required=True, help="ron1924_usfm.zip"
    )
    parser.add_argument(
        "--biblia-libera", dest="biblia_libera", type=Path, required=True,
        help="ronbl_usfm.zip",
    )
    parser.add_argument("--output", type=Path, required=True, help="snapshot ZIP to create")
    return parser.parse_args(argv)


def main(argv: list[str] | None = None) -> int:
    args = parse_args(argv)
    try:
        snapshot_hash, manifest = build(args)
    except SnapshotError as error:
        print(f"error: {error}", file=sys.stderr)
        return 2

    statistics = manifest["statistics"]
    print(f"snapshot: {args.output}")
    print(f"sha256: {snapshot_hash}")
    print(
        "inventory: "
        f"{statistics['books']} books, {statistics['chapters']} chapters, "
        f"{statistics['payloadEntries']} payload entries"
    )
    print(
        "known lacuna: ron1924 JHN 11 is absent upstream and was recorded; "
        "no text was synthesized"
    )
    print("self-check: passed")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
