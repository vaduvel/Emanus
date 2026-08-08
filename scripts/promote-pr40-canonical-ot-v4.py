#!/usr/bin/env python3
"""Run canonical promotion with all source and content fixes composed.

The inherited candidates first receive all audited omission-repair waves,
independent Psalm redrafts, per-verse quote normalization, and Psalm
superscription normalization. The official OSHB remap then supplies Hebrew
verse boundaries, while archive loading excludes non-canonical front matter.
"""
from __future__ import annotations

import hashlib
import importlib.util
import json
import re
import runpy
import shutil
import tempfile
import zipfile
from pathlib import Path
from types import ModuleType
from typing import Any

for repair_name in (
    "apply-pr40-canonical-content-fixes.py",
    "apply-pr40-canonical-content-fixes-wave2.py",
    "apply-pr40-canonical-content-fixes-wave3.py",
    "apply-pr40-canonical-content-fixes-wave4.py",
):
    runpy.run_path(str(Path(__file__).with_name(repair_name)), run_name="__main__")

SCRIPT = Path(__file__).with_name("promote-pr40-canonical-ot-v3.py")
spec = importlib.util.spec_from_file_location("canonical_v3", SCRIPT)
if spec is None or spec.loader is None:
    raise SystemExit(f"Cannot load {SCRIPT}")
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)
_original_build = module.build_remapped_usfm
_original_postprocess = module.postprocess_provenance


class _SourceSpecsWithoutRawBookLocks(dict[str, dict[str, Any]]):
    """Ignore v3's per-book raw-WLC spec while retaining normal specs."""

    def __setitem__(self, key: str, value: dict[str, Any]) -> None:
        if key == "hebrewRaw":
            return
        super().__setitem__(key, value)


def load_base() -> ModuleType:
    base_spec = importlib.util.spec_from_file_location(
        "canonical_promotion_base_filtered",
        module.BASE_SCRIPT,
    )
    if base_spec is None or base_spec.loader is None:
        raise RuntimeError(f"Cannot load {module.BASE_SCRIPT}")
    base = importlib.util.module_from_spec(base_spec)
    base_spec.loader.exec_module(base)

    def archive_books(path: Path) -> dict[str, dict[str, Any]]:
        books: dict[str, dict[str, Any]] = {}
        with zipfile.ZipFile(path) as archive:
            for name in sorted(archive.namelist()):
                if not name.lower().endswith((".usfm", ".sfm")):
                    continue
                raw = archive.read(name)
                text = raw.decode("utf-8-sig")
                match = re.search(r"(?m)^\\id\s+([0-9A-Z]{3})\b", text)
                if not match:
                    continue
                book_id = match.group(1)
                if book_id not in base.CANONICAL:
                    continue
                if book_id in books:
                    raise RuntimeError(f"{path.name}: duplicate canonical book {book_id}")
                books[book_id] = {
                    "name": Path(name).name,
                    "raw": raw,
                    "verses": base.parse_usfm(raw, f"{path.name}:{name}"),
                }
        return books

    base.archive_books = archive_books
    base.SOURCE_SPECS = _SourceSpecsWithoutRawBookLocks(base.SOURCE_SPECS)
    return base


def build_remapped_usfm(output: Path):
    removed: dict[str, list[int]] = {}
    for path in sorted(output.glob("*.json")):
        chapters = json.loads(path.read_text(encoding="utf-8"))
        if not isinstance(chapters, list):
            continue
        if any(not isinstance(chapter, list) for chapter in chapters):
            raise RuntimeError(f"{path.name}: malformed chapter container")

        removed_here: list[int] = []
        while chapters and chapters[-1] == []:
            removed_here.append(len(chapters))
            chapters.pop()
        if any(chapter == [] for chapter in chapters):
            raise RuntimeError(f"{path.name}: interior empty remap chapter")
        if removed_here:
            removed[path.name] = sorted(removed_here)
            path.write_text(json.dumps(chapters, ensure_ascii=False), encoding="utf-8")

    result = _original_build(output)
    result["removedTrailingEmptyChapterContainers"] = removed
    return result


def embed_archive_in_snapshot(snapshot_path: Path, archive_path: Path, member_name: str) -> None:
    """Rebuild a snapshot ZIP deterministically with one additional member."""
    with zipfile.ZipFile(snapshot_path, "r") as source:
        existing = set(source.namelist())
        if member_name in existing:
            if source.read(member_name) != archive_path.read_bytes():
                raise RuntimeError(f"Snapshot already contains different bytes for {member_name}")
            return
        entries = [(info, source.read(info.filename)) for info in source.infolist()]

    with tempfile.NamedTemporaryFile(
        dir=snapshot_path.parent,
        prefix=f".{snapshot_path.name}.",
        suffix=".tmp",
        delete=False,
    ) as handle:
        temporary = Path(handle.name)
    try:
        with zipfile.ZipFile(temporary, "w") as destination:
            for info, payload in entries:
                destination.writestr(info, payload)
            added = zipfile.ZipInfo(member_name, date_time=(1980, 1, 1, 0, 0, 0))
            added.compress_type = zipfile.ZIP_DEFLATED
            added.external_attr = 0o100644 << 16
            added.create_system = 3
            destination.writestr(added, archive_path.read_bytes())
        temporary.replace(snapshot_path)
    finally:
        temporary.unlink(missing_ok=True)


def normalize_promoted_hebrew_sources(base: ModuleType, snapshot_hash: str) -> None:
    """Keep chapter source metadata aligned with the validator and source ledger."""
    ledger_path = module.ACTIVE / "source-ledger.json"
    ledger = json.loads(ledger_path.read_text(encoding="utf-8"))
    chapters = ledger.get("chapters")
    if not isinstance(chapters, dict):
        raise RuntimeError("source-ledger.json lacks chapter records")

    normalized = 0
    for path in sorted(module.ACTIVE.glob("*.json")):
        parts = path.stem.split(".")
        if len(parts) != 2 or not parts[1].isdigit() or parts[0] not in base.CANONICAL:
            continue
        document = json.loads(path.read_text(encoding="utf-8"))
        reference = f"{document.get('bookId')}.{document.get('chapter')}"
        ledger_record = chapters.get(reference)
        if not isinstance(ledger_record, dict) or not ledger_record.get("hebrewUrl"):
            raise RuntimeError(f"Missing Hebrew ledger URL for {reference}")
        hebrew = document.get("source", {}).get("hebrew")
        if not isinstance(hebrew, dict):
            raise RuntimeError(f"Missing Hebrew source metadata for {reference}")

        hebrew["version"] = "WLC-OSHB"
        hebrew["passageUrl"] = str(ledger_record["hebrewUrl"])
        document.setdefault("audit", {})["sourceSnapshotSha256"] = snapshot_hash
        path.write_text(
            json.dumps(document, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
        normalized += 1

    if normalized == 0:
        raise RuntimeError("No promoted canonical chapters were normalized")


def postprocess_provenance(base: ModuleType, provenance: dict[str, Any]) -> None:
    _original_postprocess(base, provenance)
    raw_archive = module.SOURCES / "hboWLC_usfm.zip"
    if not raw_archive.is_file():
        raise RuntimeError(f"Missing raw WLC provenance archive {raw_archive}")

    upstream_dir = module.ACTIVE / "upstream"
    upstream_dir.mkdir(parents=True, exist_ok=True)
    embedded_name = "hboWLC-raw_usfm.zip"
    embedded_member = f"upstream/{embedded_name}"
    embedded_archive = upstream_dir / embedded_name
    shutil.copyfile(raw_archive, embedded_archive)

    lock_path = module.ACTIVE / "source-lock.json"
    lock = json.loads(lock_path.read_text(encoding="utf-8"))
    snapshot = lock.get("snapshots", {}).get(base.SNAPSHOT_ID)
    if not isinstance(snapshot, dict):
        raise RuntimeError(f"Missing snapshot metadata for {base.SNAPSHOT_ID}")
    snapshot_path = module.ACTIVE / str(snapshot["path"])
    embed_archive_in_snapshot(snapshot_path, embedded_archive, embedded_member)
    snapshot_hash = hashlib.sha256(snapshot_path.read_bytes()).hexdigest()
    snapshot["sha256"] = snapshot_hash

    lock.setdefault("upstreamArtifacts", {})["hboWLC-raw-r5"] = {
        "url": "https://ebible.org/Scriptures/hboWLC_usfm.zip",
        "archiveDate": base.TODAY,
        "sha256": hashlib.sha256(embedded_archive.read_bytes()).hexdigest(),
        "language": "he",
        "textLicense": "Public Domain",
        "annotationLicense": "CC BY 4.0",
        "snapshotId": base.SNAPSHOT_ID,
        "archiveEmbedded": True,
        "archivePath": embedded_member,
        "role": "raw-input-to-official-remap",
    }
    lock_path.write_text(
        json.dumps(lock, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    normalize_promoted_hebrew_sources(base, snapshot_hash)


module.load_base = load_base
module.build_remapped_usfm = build_remapped_usfm
module.postprocess_provenance = postprocess_provenance
module.main()
