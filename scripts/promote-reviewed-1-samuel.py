#!/usr/bin/env python3
"""Promote the fully reviewed 1 Samuel candidate into canonical Biblia Emanus.

1 Samuel cannot use the generic identity-versification promoter because WEBU
has 810 product verses while WLC has 811 Masoretic verse references. The
mapping is already reviewed in 1SA-VERSIFICATION-APPROVAL.json. This script
accepts only that committed map, rechecks the current source text against the
fresh packet, consumes every WLC reference exactly once, applies only reviewed
Romanian corrections, and materializes the canonical book.
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
CODE = "1SA"
CONFIG: dict[str, Any] = {"name": "1 Samuel", "order": 9, "chapters": 31, "verses": 810}
EXPECTED_WLC_VERSES = 811
COMPLETED_ON = "2026-08-08"


def fail(message: str) -> None:
    raise SystemExit(f"1 Samuel BE promotion failed: {message}")


def load_module(path: Path, name: str):
    spec = importlib.util.spec_from_file_location(name, path)
    if spec is None or spec.loader is None:
        fail(f"nu pot încărca {path.relative_to(ROOT)}")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


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


def ref_text(ref: tuple[int, int]) -> str:
    return f"{ref[0]}:{ref[1]}"


def explicit_refs(chapter: int, verse: int) -> list[tuple[int, int]]:
    if chapter == 20 and verse == 42:
        return [(20, 42), (21, 1)]
    if chapter == 21:
        return [(21, verse + 1)]
    if chapter == 23 and verse == 29:
        return [(24, 1)]
    if chapter == 24:
        return [(24, verse + 1)]
    return [(chapter, verse)]


def validate_versification_approval(packet: dict[str, Any]) -> None:
    approval = load_json(REAUDIT / "1SA-VERSIFICATION-APPROVAL.json")
    if approval.get("bookId") != CODE:
        fail("approval-ul de versificație are bookId greșit")
    if approval.get("status") != "explicit-versification-map-approved":
        fail("maparea WLC nu este aprobată explicit")
    totals = approval.get("totals") or {}
    if totals.get("productVerses") != CONFIG["verses"] or totals.get("WEBUVerses") != CONFIG["verses"]:
        fail("totalurile WEBU/product din approval sunt invalide")
    if totals.get("WLCVerses") != EXPECTED_WLC_VERSES:
        fail("totalul WLC din approval este invalid")

    packet_v = packet.get("versification") or {}
    if packet_v.get("WLCAlignment") != "explicit-book-versification-map":
        fail("fresh packet nu folosește maparea explicită")
    if packet_v.get("approval") != "explicit-map-source-verified":
        fail("fresh packet nu are maparea source-verified")
    if packet_v.get("mappedRefs") != 39:
        fail(f"fresh packet are {packet_v.get('mappedRefs')} referințe mapate, se așteptau 39")

    packet_mappings = {
        str(item.get("productRef")): str(item.get("WLCRef"))
        for item in packet_v.get("mappings", [])
        if isinstance(item, dict)
    }
    expected_mappings: dict[str, str] = {}
    for chapter in range(1, CONFIG["chapters"] + 1):
        chapter_packet = next(
            (item for item in packet.get("chapters", []) if int(item.get("chapter", 0)) == chapter),
            None,
        )
        if not isinstance(chapter_packet, dict):
            fail(f"fresh packet fără capitolul {chapter}")
        for row in chapter_packet.get("verses", []):
            verse = int(row.get("verse", 0))
            product_ref = f"{chapter}:{verse}"
            source_ref = "+".join(ref_text(ref) for ref in explicit_refs(chapter, verse))
            if source_ref != product_ref:
                expected_mappings[product_ref] = source_ref
    if packet_mappings != expected_mappings:
        fail("maparea din fresh packet nu corespunde exact hărții aprobate pentru 1 Samuel")


def review_bundle(packet: dict[str, Any]):
    totals = packet.get("totals") or {}
    if packet.get("status") != "fresh-source-semantic-review-pending":
        fail(f"status fresh packet neașteptat: {packet.get('status')!r}")
    if totals.get("chapters") != CONFIG["chapters"] or totals.get("verses") != CONFIG["verses"]:
        fail("totalurile fresh packet nu corespund cărții")
    if totals.get("WEBUVerses") != CONFIG["verses"]:
        fail("total WEBU invalid în fresh packet")
    if totals.get("WLCVerses") != EXPECTED_WLC_VERSES or totals.get("WLCRefsConsumed") != EXPECTED_WLC_VERSES:
        fail("fresh packet nu dovedește consumarea completă a celor 811 referințe WLC")

    packet_chapters = {int(item["chapter"]): item for item in packet.get("chapters", [])}
    result: dict[int, tuple[list[str], dict[str, Any]]] = {}
    severity: Counter[str] = Counter()
    corrected = 0
    approved_total = 0

    for chapter in range(1, CONFIG["chapters"] + 1):
        chapter_packet = packet_chapters.get(chapter)
        if not isinstance(chapter_packet, dict):
            fail(f"lipsește capitolul {chapter} din fresh packet")
        verse_count = int(chapter_packet.get("verseCount", 0))
        review = load_json(REAUDIT / CODE / "reviews" / f"{chapter:03d}.json")
        if review.get("bookId") != CODE or review.get("chapter") != chapter:
            fail(f"review {chapter:03d}: identificare invalidă")
        if review.get("status") != "fresh-semantic-review-complete":
            fail(f"review {chapter:03d}: status incomplet")
        if review.get("reviewedVerses") != verse_count:
            fail(f"review {chapter:03d}: reviewedVerses != {verse_count}")

        approved = review.get("approvedAsIs")
        changes = review.get("changes")
        if not isinstance(approved, list) or not isinstance(changes, list):
            fail(f"review {chapter:03d}: approvedAsIs/changes invalide")
        approved_set = {int(v) for v in approved}
        changed: set[int] = set()
        for item in changes:
            if not isinstance(item, dict):
                fail(f"{chapter}: change invalid")
            verse = item.get("verse")
            sev = item.get("severity")
            proposed = item.get("proposedRo")
            issue = item.get("issue")
            if not isinstance(verse, int) or verse in changed:
                fail(f"{chapter}: change verse invalid/duplicat")
            if sev not in {"critical", "material", "minor"}:
                fail(f"{chapter}:{verse}: severity invalid")
            if not isinstance(proposed, str) or not proposed.strip():
                fail(f"{chapter}:{verse}: proposedRo gol")
            if not isinstance(issue, str) or not issue.strip():
                fail(f"{chapter}:{verse}: issue gol")
            changed.add(verse)
            severity[str(sev)] += 1

        expected = set(range(1, verse_count + 1))
        if approved_set & changed or approved_set | changed != expected:
            fail(f"review {chapter:03d}: coverage semantic invalid")

        candidate = load_json(CANDIDATES / f"{CODE}.{chapter}.json")
        verses = candidate.get("verses")
        if not isinstance(verses, list) or len(verses) != verse_count:
            fail(f"{CODE}.{chapter}: candidatul nu are {verse_count} versete")
        packet_texts = {
            int(row["verse"]): str(row["candidateRo"]).strip()
            for row in chapter_packet.get("verses", [])
        }
        texts: list[str] = []
        for expected_verse, verse_obj in enumerate(verses, start=1):
            if not isinstance(verse_obj, dict) or verse_obj.get("number") != expected_verse:
                fail(f"{CODE}.{chapter}:{expected_verse}: candidat invalid")
            text = str(verse_obj.get("text", "")).strip()
            if not text:
                fail(f"{CODE}.{chapter}:{expected_verse}: text gol")
            if packet_texts.get(expected_verse) != text:
                fail(f"{CODE}.{chapter}:{expected_verse}: candidatul s-a schimbat după fresh packet")
            texts.append(text)
        for item in changes:
            texts[int(item["verse"]) - 1] = str(item["proposedRo"]).strip()

        result[chapter] = (texts, review)
        corrected += len(changes)
        approved_total += len(approved)

    if corrected + approved_total != CONFIG["verses"]:
        fail(f"review total {corrected + approved_total} != {CONFIG['verses']}")
    return result, severity, corrected, approved_total


def build_snapshot(minor, validator, packet: dict[str, Any], archives: dict[str, Path]):
    extracted: dict[str, bytes] = {}
    parsed: dict[str, dict[tuple[int, int], str]] = {}
    for key, path in archives.items():
        if not path.is_file():
            fail(f"lipsește arhiva {key}: {path}")
        with zipfile.ZipFile(path) as archive:
            member = minor.find_member(archive, CODE)
            raw = archive.read(member)
        extracted[key] = raw
        parsed[key] = validator.parse_usfm_verses(raw, f"{CODE}-{key}")

    webu = parsed["webu"]
    wlc = parsed["wlc"]
    if len(webu) != CONFIG["verses"]:
        fail(f"WEBU curent are {len(webu)}/{CONFIG['verses']} versete")
    if len(wlc) != EXPECTED_WLC_VERSES:
        fail(f"WLC curent are {len(wlc)}/{EXPECTED_WLC_VERSES} referințe")
    for benchmark in ("btf", "cornilescu"):
        if sorted(parsed[benchmark]) != sorted(webu):
            fail(f"{benchmark} nu urmează versificația WEBU/product")

    used_wlc: list[tuple[int, int]] = []
    mapped_rows: dict[str, str] = {}
    for chapter_packet in packet.get("chapters", []):
        chapter = int(chapter_packet["chapter"])
        for row in chapter_packet.get("verses", []):
            verse = int(row["verse"])
            product = (chapter, verse)
            product_ref = ref_text(product)
            if webu.get(product) != str(row.get("WEBU", "")):
                fail(f"WEBU s-a schimbat după review la {product_ref}")

            refs = explicit_refs(chapter, verse)
            expected_ref = "+".join(ref_text(ref) for ref in refs)
            if str(row.get("WLCRef", "")) != expected_ref:
                fail(f"WLCRef din packet diferă de maparea aprobată la {product_ref}")
            missing = [ref for ref in refs if ref not in wlc]
            if missing:
                fail(f"WLC curent nu conține {missing} pentru {product_ref}")
            current_wlc = " ".join(wlc[ref].strip() for ref in refs if wlc[ref].strip())
            if current_wlc != str(row.get("WLC", "")):
                fail(f"WLC s-a schimbat după review la {product_ref}")
            used_wlc.extend(refs)
            if expected_ref != product_ref:
                mapped_rows[product_ref] = expected_ref

    if len(used_wlc) != EXPECTED_WLC_VERSES or len(set(used_wlc)) != EXPECTED_WLC_VERSES:
        fail("maparea WLC reutilizează sau pierde referințe")
    if set(used_wlc) != set(wlc):
        missing = sorted(set(wlc) - set(used_wlc))
        extra = sorted(set(used_wlc) - set(wlc))
        fail(f"maparea WLC nu este exhaustivă; missing={missing}, extra={extra}")

    packet_mappings = {
        str(item.get("productRef")): str(item.get("WLCRef"))
        for item in (packet.get("versification", {}).get("mappings") or [])
        if isinstance(item, dict)
    }
    if mapped_rows != packet_mappings:
        fail("maparea reconstruită din sursa curentă diferă de fresh packet")

    snapshot_id = f"ot-1sa-{COMPLETED_ON}"
    snapshot_rel = f"sources/{snapshot_id}-usfm.zip"
    snapshot_path = DATA / snapshot_rel
    payloads: dict[str, bytes] = {}
    for key, meta in minor.SOURCE_META.items():
        payloads[f"upstream/{meta['prefix']}_usfm.zip"] = archives[key].read_bytes()
        payloads[f"{meta['snapshotDir']}/{CODE}.usfm"] = extracted[key]
    snapshot_path.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(snapshot_path, "w") as out:
        for name in sorted(payloads):
            out.writestr(minor.normalized_zip_info(name), payloads[name])
    snapshot_sha = hashlib.sha256(snapshot_path.read_bytes()).hexdigest()
    return snapshot_sha, snapshot_id, snapshot_rel, extracted, sorted(webu), sorted(wlc), mapped_rows


def source_rule_bundle(target_refs: list[tuple[int, int]]) -> tuple[list[dict[str, Any]], dict[int, list[str]]]:
    normal_targets = [ref for ref in target_refs if explicit_refs(*ref) == [ref]]
    normal_id = "WLC-1SA-PAIRWISE-NORMAL"
    combine_id = "WLC-1SA-COMBINE-20-42"
    chapter21_id = "WLC-1SA-SHIFT-21"
    verse2329_id = "WLC-1SA-SHIFT-23-29"
    chapter24_id = "WLC-1SA-SHIFT-24"

    rules: list[dict[str, Any]] = [
        {
            "id": normal_id,
            "bookId": CODE,
            "mapping": "pairwise",
            "targetReferences": [ref_text(ref) for ref in normal_targets],
            "sourceReferences": [ref_text(ref) for ref in normal_targets],
        },
        {
            "id": combine_id,
            "bookId": CODE,
            "mapping": "combine",
            "targetReferences": ["20:42"],
            "sourceReferences": ["20:42", "21:1"],
        },
        {
            "id": chapter21_id,
            "bookId": CODE,
            "mapping": "pairwise",
            "targetReferences": [f"21:{verse}" for verse in range(1, 16)],
            "sourceReferences": [f"21:{verse}" for verse in range(2, 17)],
        },
        {
            "id": verse2329_id,
            "bookId": CODE,
            "mapping": "pairwise",
            "targetReferences": ["23:29"],
            "sourceReferences": ["24:1"],
        },
        {
            "id": chapter24_id,
            "bookId": CODE,
            "mapping": "pairwise",
            "targetReferences": [f"24:{verse}" for verse in range(1, 23)],
            "sourceReferences": [f"24:{verse}" for verse in range(2, 24)],
        },
    ]
    ledger_rules: dict[int, list[str]] = {}
    for chapter in range(1, CONFIG["chapters"] + 1):
        if chapter == 20:
            ledger_rules[chapter] = [normal_id, combine_id]
        elif chapter == 21:
            ledger_rules[chapter] = [chapter21_id]
        elif chapter == 23:
            ledger_rules[chapter] = [normal_id, verse2329_id]
        elif chapter == 24:
            ledger_rules[chapter] = [chapter24_id]
        else:
            ledger_rules[chapter] = [normal_id]
    return rules, ledger_rules


def update_source_lock(minor, source_lock: dict[str, Any], archives: dict[str, Path], extracted: dict[str, bytes], snapshot_sha: str, snapshot_id: str, snapshot_rel: str, target_refs: list[tuple[int, int]], wlc_refs: list[tuple[int, int]]) -> dict[int, list[str]]:
    source_lock["capturedOn"] = COMPLETED_ON
    source_lock.setdefault("snapshots", {})[snapshot_id] = {"path": snapshot_rel, "sha256": snapshot_sha}
    upstream = source_lock.setdefault("upstreamArtifacts", {})
    source_ids: dict[str, str] = {}
    lock_ids: dict[str, str] = {}

    for key, meta in minor.SOURCE_META.items():
        source_id = f"{meta['prefix']}-{CODE.lower()}"
        source_ids[key] = source_id
        record: dict[str, Any] = {
            "url": meta["url"],
            "archiveDate": COMPLETED_ON,
            "sha256": hashlib.sha256(archives[key].read_bytes()).hexdigest(),
            "language": meta["language"],
            "snapshotId": snapshot_id,
            "archiveEmbedded": True,
            "archivePath": f"upstream/{meta['prefix']}_usfm.zip",
        }
        for optional in ("license", "textLicense", "annotationLicense"):
            if optional in meta:
                record[optional] = meta[optional]
        upstream[source_id] = record
        lock_name = {"webu": "WEBU", "wlc": "WLC", "btf": "BTF", "cornilescu": "CORNILESCU1924"}[key]
        lock_ids[key] = f"{lock_name}-{CODE}"

    source_lock.setdefault("books", {})[CODE] = {
        "name": CONFIG["name"],
        "order": CONFIG["order"],
        "testament": "OT",
        "baseLockId": lock_ids["webu"],
        "originalLockId": lock_ids["wlc"],
        "benchmarkLockIds": [lock_ids["cornilescu"], lock_ids["btf"]],
        "externalBenchmarkIds": ["NTR"],
    }
    files = source_lock.setdefault("files", {})
    for key, meta in minor.SOURCE_META.items():
        record: dict[str, Any] = {
            "bookId": CODE,
            "language": meta["language"],
            "role": "base" if key == "webu" else "original" if key == "wlc" else "benchmark",
            "archivePath": f"{meta['snapshotDir']}/{CODE}.usfm",
            "sha256": hashlib.sha256(extracted[key]).hexdigest(),
            "sourceId": source_ids[key],
            "snapshotId": snapshot_id,
            "format": "usfm",
            "missingTargetReferences": [],
            "extraSourceReferences": [],
        }
        if key == "btf":
            record.update({"benchmarkId": "BTF", "family": "fidela"})
        if key == "cornilescu":
            record.update({"benchmarkId": "CORNILESCU-1924", "family": "cornilescu"})
        files[lock_ids[key]] = record

    new_rules, ledger_rules = source_rule_bundle(target_refs)
    rules = [
        rule for rule in source_lock.setdefault("versificationRules", [])
        if not (isinstance(rule, dict) and rule.get("bookId") == CODE)
    ]
    for rule in new_rules:
        rule["sourceLockId"] = lock_ids["wlc"]
        rules.append(rule)
    source_lock["versificationRules"] = rules

    represented_targets: set[str] = set()
    represented_sources: list[str] = []
    for rule in new_rules:
        represented_targets.update(rule["targetReferences"])
        represented_sources.extend(rule["sourceReferences"])
    if represented_targets != {ref_text(ref) for ref in target_refs}:
        fail("regulile source-lock nu acoperă exact cele 810 referințe produs")
    if len(represented_sources) != EXPECTED_WLC_VERSES or len(set(represented_sources)) != EXPECTED_WLC_VERSES:
        fail("regulile source-lock nu consumă exact o dată cele 811 referințe WLC")
    if set(represented_sources) != {ref_text(ref) for ref in wlc_refs}:
        fail("regulile source-lock nu corespund inventarului WLC curent")
    return ledger_rules


def update_ledger(ledger: dict[str, Any], validator, target_refs: list[tuple[int, int]], ledger_rules: dict[int, list[str]]) -> None:
    counts = Counter(chapter for chapter, _verse in target_refs)
    chapters = ledger.setdefault("chapters", {})
    for chapter in range(1, CONFIG["chapters"] + 1):
        chapters[f"{CODE}.{chapter}"] = {
            "expectedVerses": int(counts[chapter]),
            "englishUrl": f"https://ebible.org/engwebp/{CODE}{chapter:02d}.htm",
            "hebrewUrl": f"https://ebible.org/hboWLC/{CODE}{chapter:02d}.htm",
            "versificationRuleIds": ledger_rules[chapter],
        }

    def key(item: tuple[str, Any]) -> tuple[int, int]:
        book, chapter_text = item[0].split(".", 1)
        return validator.BOOK_ORDER.get(book, 999), int(chapter_text)

    ledger["chapters"] = dict(sorted(chapters.items(), key=key))
    ledger["verifiedOn"] = COMPLETED_ON


def write_summary(severity: Counter[str], corrected: int, approved: int, snapshot_rel: str, snapshot_sha: str) -> None:
    summary = {
        "schemaVersion": 1,
        "bookId": CODE,
        "bookName": CONFIG["name"],
        "status": "fresh-semantic-review-complete-and-materialized",
        "completedOn": COMPLETED_ON,
        "sourcePacket": "docs/biblia-explicata/ot-reaudit/1SA-FRESH-SOURCE-REAUDIT.json",
        "versificationApproval": "docs/biblia-explicata/ot-reaudit/1SA-VERSIFICATION-APPROVAL.json",
        "reviewDirectory": "docs/biblia-explicata/ot-reaudit/1SA/reviews",
        "totals": {
            "chapters": CONFIG["chapters"],
            "verses": CONFIG["verses"],
            "WLCSourceReferences": EXPECTED_WLC_VERSES,
            "approvedAsIs": approved,
            "correctedVerses": corrected,
            "severity": {
                "critical": severity.get("critical", 0),
                "material": severity.get("material", 0),
                "minor": severity.get("minor", 0),
            },
        },
        "canonicalPublication": {
            "chapterPattern": "docs/data/biblia-emanus/1SA.{1..31}.json",
            "snapshot": f"docs/data/biblia-emanus/{snapshot_rel}",
            "snapshotSha256": snapshot_sha,
            "textStage": "biblia-emanus",
            "translationLabel": "Biblia Emanus",
            "published": True,
            "public": True,
            "canonicalGate": "pending-external-validator",
        },
        "promotion": {
            "candidateReady": True,
            "promotionEligible": True,
            "promotionStatus": "materialized-awaiting-canonical-gate",
            "reason": "31/31 fresh semantic reviews complete; explicit 810→811 WLC map revalidated against current sources.",
        },
    }
    write_json(REAUDIT / "1SA-SEMANTIC-REVIEW-SUMMARY.json", summary)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--webu-zip", type=Path, required=True)
    parser.add_argument("--wlc-zip", type=Path, required=True)
    parser.add_argument("--btf-zip", type=Path, required=True)
    parser.add_argument("--cornilescu-zip", type=Path, required=True)
    args = parser.parse_args()

    generic = load_module(ROOT / "scripts/promote-reviewed-ot-book.py", "emanus_reviewed_ot")
    minor = generic.load_base_module()
    validator = minor.load_validator()
    packet = load_json(REAUDIT / "1SA-FRESH-SOURCE-REAUDIT.json")
    validate_versification_approval(packet)
    reviews, severity, corrected, approved = review_bundle(packet)

    archives = {
        "webu": args.webu_zip,
        "wlc": args.wlc_zip,
        "btf": args.btf_zip,
        "cornilescu": args.cornilescu_zip,
    }
    snapshot_sha, snapshot_id, snapshot_rel, extracted, target_refs, wlc_refs, _mapped_rows = build_snapshot(
        minor, validator, packet, archives
    )

    source_lock = load_json(DATA / "source-lock.json")
    ledger = load_json(DATA / "source-ledger.json")
    manifest = load_json(DATA / "manifest.json")
    ledger_rules = update_source_lock(
        minor, source_lock, archives, extracted, snapshot_sha, snapshot_id, snapshot_rel,
        target_refs, wlc_refs,
    )
    update_ledger(ledger, validator, target_refs, ledger_rules)

    for chapter, (texts, review) in reviews.items():
        payload = minor.chapter_payload(validator, CODE, CONFIG, chapter, texts, review, snapshot_sha)
        payload["audit"]["theologicalContext"]["principles"] = [
            "Vorbitorii, referenții, numele divine, cifrele și succesiunea narațiunii sunt păstrate conform textului-sursă, fără explicații doctrinare introduse în traducere.",
            "Violența, abuzul, războiul, ocultismul și moartea sunt redate descriptiv, fără cosmetizare și fără a fi transformate prin traducere în norme moderne.",
            "Maparea WEBU→WLC pentru limitele 20/21 și 23/24 este exclusiv o reconciliere de numerotare; nu adaugă și nu elimină text ebraic.",
        ]
        payload["audit"]["textDigest"] = validator.chapter_text_digest(payload)
        write_json(DATA / f"{CODE}.{chapter}.json", payload)

    minor.update_manifest(manifest, validator)
    write_json(DATA / "source-lock.json", source_lock, minified=True)
    write_json(DATA / "source-ledger.json", ledger, minified=True)
    write_json(DATA / "manifest.json", manifest, minified=True)
    write_summary(severity, corrected, approved, snapshot_rel, snapshot_sha)
    print(
        f"1 Samuel materialized: 31/31 chapters, 810/810 product verses, "
        f"811/811 WLC refs consumed exactly once; {corrected} corrected / {approved} approved as-is; "
        f"severity={dict(severity)}; snapshot={snapshot_sha}"
    )


if __name__ == "__main__":
    main()
