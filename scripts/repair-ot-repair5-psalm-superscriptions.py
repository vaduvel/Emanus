#!/usr/bin/env python3
"""Restore Psalm verse 1 where an inherited superscription replaced the verse.

The corrupted PR40 candidate used the Hebrew superscription as Romanian verse 1
in some psalms while retaining WEBBE verse totals. This silently dropped the
actual verse 1. We preserve the superscription separately and restore verse 1
from the pinned public-domain BTF snapshot, recording exact provenance.
"""
from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path

from ot_repair5_common import parse_usfm_zip

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs" / "data" / "biblia-emanus-candidates"
BTF = DATA / "sources" / "ronbtf_usfm.zip"
OUT = ROOT / "docs" / "biblia-emanus" / "OT-REPAIR5-PSALM-SUPERSCRIPTION-REPAIRS.json"


def digest(verses: list[dict]) -> str:
    raw = "\n".join(str(v.get("text", "")) for v in verses)
    return hashlib.sha256(raw.encode("utf-8")).hexdigest()


def is_superscription_only(text: str) -> bool:
    stripped = text.strip()
    if not stripped.startswith("("):
        return False
    first_close = stripped.find(")")
    if first_close < 0:
        return True
    trailing = stripped[first_close + 1 :]
    letters = re.sub(r"[^A-Za-zĂÂÎȘȚăâîșț]", "", trailing)
    return len(letters) < 8


def clean_existing_superscription(value: str) -> str:
    """Keep only the first parenthesized title, never verse text or Selah."""
    stripped = value.strip()
    first_close = stripped.find(")")
    if stripped.startswith("(") and first_close >= 0:
        return stripped[: first_close + 1]
    return stripped


def main() -> None:
    benchmark = parse_usfm_zip(BTF)
    repaired = []
    corrected_metadata = []
    previous_report = {"repaired": []}
    if OUT.exists():
        try:
            previous_report = json.loads(OUT.read_text(encoding="utf-8"))
        except Exception:
            previous_report = {"repaired": []}

    for path in sorted(DATA.glob("PSA.*.json")):
        doc = json.loads(path.read_text(encoding="utf-8"))
        chapter = int(doc.get("chapter", doc.get("chapterNumber", 0)))
        verses = doc.get("verses", [])
        changed = False

        existing = doc.get("superscription")
        if isinstance(existing, str):
            cleaned = clean_existing_superscription(existing)
            if cleaned != existing:
                doc["superscription"] = cleaned
                corrected_metadata.append(f"PSA.{chapter}")
                changed = True

        if verses and int(verses[0].get("number", 0)) == 1:
            old = str(verses[0].get("text", "")).strip()
            if is_superscription_only(old):
                actual = benchmark.get(("PSA", chapter, 1), "").strip()
                if not actual:
                    raise SystemExit(f"BTF Psalm {chapter}:1 missing")
                if actual.startswith("(") and is_superscription_only(actual):
                    raise SystemExit(f"BTF Psalm {chapter}:1 is also superscription-only")

                superscription = old
                if not superscription.endswith(")"):
                    superscription += ")"
                doc["superscription"] = clean_existing_superscription(superscription)
                verses[0]["text"] = actual
                source = doc.setdefault("source", {})
                fallback = source.setdefault("publicDomainFallbackSegments", [])
                fallback = [x for x in fallback if x.get("reference") != f"PSA.{chapter}:1"]
                fallback.append({
                    "reference": f"PSA.{chapter}:1",
                    "source": "ronbtf_usfm.zip",
                    "sourceSha256": hashlib.sha256(BTF.read_bytes()).hexdigest(),
                    "reason": "PR40 superscription replaced the actual first verse; restored from pinned public-domain Romanian benchmark",
                    "exactPublicDomainTextUsed": True,
                })
                source["publicDomainFallbackSegments"] = fallback
                notes = [n for n in doc.get("editorialNotes", []) if n.get("term") != "psalm-superscription-repair"]
                notes.append({
                    "verse": 1,
                    "term": "psalm-superscription-repair",
                    "decision": "Superscrierea a fost mutată în câmpul chapter.superscription, iar versetul 1 real a fost restaurat din BTF public-domain fixată prin hash.",
                    "resolutionStatus": "resolved",
                })
                doc["editorialNotes"] = notes
                repaired.append({
                    "chapter": chapter,
                    "reference": f"PSA.{chapter}:1",
                    "superscription": doc["superscription"],
                    "restoredText": actual,
                })
                changed = True

        if changed:
            audit = doc.setdefault("audit", {})
            audit["textDigest"] = digest(verses)
            audit["psalmSuperscriptionPolicy"] = "separate-chapter-field"
            path.write_text(json.dumps(doc, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    combined = {item["reference"]: item for item in previous_report.get("repaired", [])}
    combined.update({item["reference"]: item for item in repaired})
    payload = {
        "repairPass": "ot-repair5-psalm-superscriptions",
        "source": "BTF public-domain pinned snapshot",
        "count": len(combined),
        "repaired": sorted(combined.values(), key=lambda item: int(item["chapter"])),
        "metadataCorrections": sorted(set(corrected_metadata)),
    }
    OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({
        "newRepairs": len(repaired),
        "totalRepairs": len(combined),
        "metadataCorrections": sorted(set(corrected_metadata)),
    }, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
