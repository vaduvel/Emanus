#!/usr/bin/env python3
"""Promote one freshly re-audited OT candidate into canonical Biblia Emanus.

This pipeline is intentionally separate from the historical candidate approvals.
It accepts only a complete `docs/biblia-explicata/ot-reaudit/<BOOK>/reviews`
bundle, verifies that the current WEBU/WLC text still matches the committed
fresh packet verse-for-verse, applies only reviewed `proposedRo` changes, then
materializes canonical BE chapter files and source evidence.

For now only books with identity WEBU<->WLC versification are promotable here.
Books with moved Masoretic chapter boundaries must receive an explicit mapping
approval before this script is extended to accept them.
"""
from __future__ import annotations

import argparse
import hashlib
import importlib.util
import json
import unicodedata
import zipfile
from collections import Counter
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs/data/biblia-emanus"
CANDIDATES = ROOT / "docs/data/biblia-emanus-candidates"
REAUDIT = ROOT / "docs/biblia-explicata/ot-reaudit"
COMPLETED_ON = "2026-08-08"

BOOKS: dict[str, dict[str, Any]] = {
    "JDG": {"name": "Judecători", "order": 7, "chapters": 21, "verses": 618},
}


def fail(message: str) -> None:
    raise SystemExit(f"Reviewed OT promotion failed: {message}")


def load_json(path: Path) -> dict[str, Any]:
    if not path.is_file():
        fail(f"lipsește {path.relative_to(ROOT)}")
    value = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(value, dict):
        fail(f"{path.relative_to(ROOT)} nu este obiect JSON")
    return value


def write_json(path: Path, value: dict[str, Any], *, minified: bool = False) -> None:
    def nfc(item: Any) -> Any:
        if isinstance(item, str):
            return unicodedata.normalize("NFC", item)
        if isinstance(item, list):
            return [nfc(v) for v in item]
        if isinstance(item, dict):
            return {nfc(k): nfc(v) for k, v in item.items()}
        return item

    value = nfc(value)
    text = (
        json.dumps(value, ensure_ascii=False, separators=(",", ":"))
        if minified
        else json.dumps(value, ensure_ascii=False, indent=2)
    )
    path.write_text(unicodedata.normalize("NFC", text) + "\n", encoding="utf-8")


def load_base_module():
    path = ROOT / "scripts/promote-minor-prophet-to-biblia-emanus.py"
    spec = importlib.util.spec_from_file_location("emanus_minor_promotion_base", path)
    if spec is None or spec.loader is None:
        fail("nu pot încărca infrastructura de promovare existentă")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def packet_rows(packet: dict[str, Any], label: str) -> dict[tuple[int, int], str]:
    result: dict[tuple[int, int], str] = {}
    for chapter in packet.get("chapters", []):
        for row in chapter.get("verses", []):
            if label == "WEBU":
                ref = str(row.get("productRef", ""))
                text = row.get("WEBU")
            else:
                ref = str(row.get("WLCRef", ""))
                text = row.get("WLC")
            parts = ref.split(":")
            if len(parts) != 2 or not isinstance(text, str):
                fail(f"packet {label} incomplet la {ref!r}")
            key = (int(parts[0]), int(parts[1]))
            if key in result:
                fail(f"packet {label}: referință duplicată {ref}")
            result[key] = text
    return result


def review_bundle(code: str, config: dict[str, Any], packet: dict[str, Any]):
    result: dict[int, tuple[list[str], dict[str, Any]]] = {}
    severity: Counter[str] = Counter()
    corrected = 0
    approved_total = 0

    if packet.get("status") != "fresh-source-semantic-review-pending":
        fail(f"{code}: status packet neașteptat {packet.get('status')!r}")
    totals = packet.get("totals") or {}
    if totals.get("chapters") != config["chapters"] or totals.get("verses") != config["verses"]:
        fail(f"{code}: totalurile packetului nu corespund configurației")
    versification = packet.get("versification") or {}
    if versification.get("approval") != "identity" or versification.get("mappedRefs") != 0:
        fail(f"{code}: promovarea cere versificație identity; maparea trebuie aprobată separat")

    packet_chapters = {int(item["chapter"]): item for item in packet.get("chapters", [])}
    for chapter in range(1, int(config["chapters"]) + 1):
        chapter_packet = packet_chapters.get(chapter)
        if not isinstance(chapter_packet, dict):
            fail(f"{code} {chapter}: lipsește din packet")
        verse_count = int(chapter_packet.get("verseCount", 0))
        review = load_json(REAUDIT / code / "reviews" / f"{chapter:03d}.json")
        if review.get("bookId") != code or review.get("chapter") != chapter:
            fail(f"{code} review {chapter:03d}: identificare invalidă")
        if review.get("status") != "fresh-semantic-review-complete":
            fail(f"{code} review {chapter:03d}: status incomplet")
        if review.get("reviewedVerses") != verse_count:
            fail(f"{code} review {chapter:03d}: reviewedVerses != {verse_count}")

        approved = review.get("approvedAsIs")
        changes = review.get("changes")
        if not isinstance(approved, list) or not isinstance(changes, list):
            fail(f"{code} review {chapter:03d}: approvedAsIs/changes invalide")
        approved_set = {int(v) for v in approved}
        changed: set[int] = set()
        for item in changes:
            if not isinstance(item, dict):
                fail(f"{code} {chapter}: change invalid")
            verse = item.get("verse")
            sev = item.get("severity")
            proposed = item.get("proposedRo")
            issue = item.get("issue")
            if not isinstance(verse, int) or verse in changed:
                fail(f"{code} {chapter}: change verse invalid/duplicat")
            if sev not in {"critical", "material", "minor"}:
                fail(f"{code} {chapter}:{verse}: severity invalid")
            if not isinstance(proposed, str) or not proposed.strip():
                fail(f"{code} {chapter}:{verse}: proposedRo gol")
            if not isinstance(issue, str) or not issue.strip():
                fail(f"{code} {chapter}:{verse}: issue gol")
            changed.add(verse)
            severity[str(sev)] += 1

        expected = set(range(1, verse_count + 1))
        if approved_set & changed or approved_set | changed != expected:
            fail(f"{code} review {chapter:03d}: coverage semantic invalid")

        candidate = load_json(CANDIDATES / f"{code}.{chapter}.json")
        verses = candidate.get("verses")
        if not isinstance(verses, list) or len(verses) != verse_count:
            fail(f"{code}.{chapter}: candidatul nu are {verse_count} versete")
        packet_texts = {
            int(row["verse"]): str(row["candidateRo"]).strip()
            for row in chapter_packet.get("verses", [])
        }
        texts: list[str] = []
        for expected_verse, verse_obj in enumerate(verses, start=1):
            if not isinstance(verse_obj, dict) or verse_obj.get("number") != expected_verse:
                fail(f"{code}.{chapter}:{expected_verse}: candidat invalid")
            text = str(verse_obj.get("text", "")).strip()
            if not text:
                fail(f"{code}.{chapter}:{expected_verse}: text gol")
            if packet_texts.get(expected_verse) != text:
                fail(f"{code}.{chapter}:{expected_verse}: candidatul s-a schimbat după fresh packet")
            texts.append(text)
        for item in changes:
            texts[int(item["verse"]) - 1] = str(item["proposedRo"]).strip()

        result[chapter] = (texts, review)
        corrected += len(changes)
        approved_total += len(approved)

    if corrected + approved_total != int(config["verses"]):
        fail(f"{code}: review total {corrected + approved_total} != {config['verses']}")
    return result, severity, corrected, approved_total


def build_snapshot(base, validator, code: str, config: dict[str, Any], packet: dict[str, Any], archives: dict[str, Path]):
    extracted: dict[str, bytes] = {}
    parsed: dict[str, dict[tuple[int, int], str]] = {}
    for key, path in archives.items():
        if not path.is_file():
            fail(f"lipsește arhiva {key}: {path}")
        with zipfile.ZipFile(path) as archive:
            member = base.find_member(archive, code)
            raw = archive.read(member)
        extracted[key] = raw
        parsed[key] = validator.parse_usfm_verses(raw, f"{code}-{key}")

    expected_webu = packet_rows(packet, "WEBU")
    expected_wlc = packet_rows(packet, "WLC")
    for key, expected in (("webu", expected_webu), ("wlc", expected_wlc)):
        actual = parsed[key]
        missing = sorted(set(expected) - set(actual))
        extra = sorted(set(actual) - set(expected))
        changed = sorted(ref for ref in set(actual) & set(expected) if actual[ref] != expected[ref])
        if missing or extra or changed:
            fail(
                f"{code}: {key.upper()} s-a schimbat după fresh review; "
                f"missing={missing}, extra={extra}, changed={changed}"
            )

    target_refs = sorted(parsed["webu"])
    wlc_refs = sorted(parsed["wlc"])
    if target_refs != wlc_refs:
        fail(f"{code}: identity versification nu mai este adevărată")
    if len(target_refs) != int(config["verses"]):
        fail(f"{code}: source verse total {len(target_refs)} != {config['verses']}")
    for benchmark in ("btf", "cornilescu"):
        if sorted(parsed[benchmark]) != target_refs:
            fail(f"{code}: {benchmark} nu urmează versificația produsului")

    snapshot_id = f"ot-{code.lower()}-{COMPLETED_ON}"
    snapshot_rel = f"sources/{snapshot_id}-usfm.zip"
    snapshot_path = DATA / snapshot_rel
    payloads: dict[str, bytes] = {}
    for key, meta in base.SOURCE_META.items():
        payloads[f"upstream/{meta['prefix']}_usfm.zip"] = archives[key].read_bytes()
        payloads[f"{meta['snapshotDir']}/{code}.usfm"] = extracted[key]
    snapshot_path.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(snapshot_path, "w") as out:
        for name in sorted(payloads):
            out.writestr(base.normalized_zip_info(name), payloads[name])
    snapshot_sha = hashlib.sha256(snapshot_path.read_bytes()).hexdigest()
    return snapshot_sha, snapshot_id, snapshot_rel, extracted, target_refs, wlc_refs


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--book", required=True, choices=sorted(BOOKS))
    parser.add_argument("--webu-zip", type=Path, required=True)
    parser.add_argument("--wlc-zip", type=Path, required=True)
    parser.add_argument("--btf-zip", type=Path, required=True)
    parser.add_argument("--cornilescu-zip", type=Path, required=True)
    args = parser.parse_args()

    code = args.book
    config = BOOKS[code]
    base = load_base_module()
    validator = base.load_validator()
    packet = load_json(REAUDIT / f"{code}-FRESH-SOURCE-REAUDIT.json")
    reviews, severity, corrected, approved = review_bundle(code, config, packet)
    archives = {
        "webu": args.webu_zip,
        "wlc": args.wlc_zip,
        "btf": args.btf_zip,
        "cornilescu": args.cornilescu_zip,
    }
    snapshot_sha, snapshot_id, snapshot_rel, extracted, target_refs, wlc_refs = build_snapshot(
        base, validator, code, config, packet, archives
    )

    source_lock = load_json(DATA / "source-lock.json")
    ledger = load_json(DATA / "source-ledger.json")
    manifest = load_json(DATA / "manifest.json")
    rule_id = base.update_source_lock(
        source_lock, code, config, archives, extracted, snapshot_sha, snapshot_id, snapshot_rel, target_refs, wlc_refs
    )
    base.update_ledger(ledger, validator, code, config, target_refs, rule_id)

    for chapter, (texts, review) in reviews.items():
        payload = base.chapter_payload(validator, code, config, chapter, texts, review, snapshot_sha)
        payload["audit"]["theologicalContext"]["principles"] = [
            "Vorbitorii, referenții, numele cultice, cifrele și succesiunea narațiunii sunt păstrate conform textului-sursă, fără explicații doctrinare introduse în traducere.",
            "Violența, abuzul, răpirea, idolatria și acțiunile personajelor sunt redate descriptiv și nu sunt transformate prin traducere în aprobări sau norme moderne.",
            "Unde există o variantă textuală relevantă, textul canonic urmează WLC-OSHB conform politicii Biblia Emanus, iar varianta este documentată editorial.",
        ]
        payload["audit"]["textDigest"] = validator.chapter_text_digest(payload)
        write_json(DATA / f"{code}.{chapter}.json", payload)

    base.update_manifest(manifest, validator)
    write_json(DATA / "source-lock.json", source_lock, minified=True)
    write_json(DATA / "source-ledger.json", ledger, minified=True)
    write_json(DATA / "manifest.json", manifest, minified=True)
    summary = {
        "schemaVersion": 1,
        "bookId": code,
        "bookName": config["name"],
        "status": "fresh-semantic-review-complete-and-materialized",
        "completedOn": COMPLETED_ON,
        "chapters": config["chapters"],
        "verses": config["verses"],
        "correctedVerses": corrected,
        "approvedAsIs": approved,
        "severity": dict(severity),
        "sourceSnapshot": {"path": snapshot_rel, "sha256": snapshot_sha},
        "inheritedApprovalsAccepted": False,
        "versification": packet.get("versification"),
    }
    write_json(REAUDIT / f"{code}-SEMANTIC-REVIEW-SUMMARY.json", summary)
    print(
        f"{config['name']} BE canonical candidate materialized: {config['chapters']} chapters / "
        f"{config['verses']} verses; {corrected} corrected / {approved} approved as-is; "
        f"severity={dict(severity)}; snapshot={snapshot_sha}"
    )


if __name__ == "__main__":
    main()
