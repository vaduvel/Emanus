#!/usr/bin/env python3
from __future__ import annotations

import copy
import hashlib
import json
from pathlib import Path

ROOT = Path.cwd()
SPEC = ROOT / "docs/data/biblia-explicata/nt-semantic-review-spec/06-romani.json"
BOOK = ROOT / "docs/data/biblia-explicata/nt-final-source-first/06-romani.json"
EXPECTED_REVIEW_CONTENT_SHA = "sha256:c5c9254c0fd699b54015a2f4ea36834202f5f3e299bbe704dd2cd9e761ce2715"
TARGET = "romani-11-17-24"
REVIEWED_SHA = "sha256:02d10182bb5f6a348506fed6ba9929d1b809697fefebe77f61d0ac14102051c8"
CURRENT_SHA = "sha256:e22c02e9c4f0aba2a479d9a7afbc31dbe9b6c8324969f902efc25bfe4ed9dc0e"
REVIEWED_TEACHING = "Neamurile sunt ca ramuri de măslin sălbatic altoite între ramurile naturale. Ele participă la seva rădăcinii, dar nu au motiv să se laude împotriva celor tăiați.\n\n„stai prin credință. Nu fi trufaș, ci teme-te” Bunătatea și asprimea lui Dumnezeu trebuie ținute împreună. Dumnezeu este puternic să altoiască din nou; de aceea atitudinea corectă este smerenia și speranța, nu disprețul."
CURRENT_TEACHING = "Neamurile sunt ca ramuri de măslin sălbatic altoite între ramurile naturale. Ele participă la seva rădăcinii, dar nu au motiv să se laude împotriva celor tăiați.\n\n„Stai prin credință; nu te îngâmfa, ci teme-te.” Bunătatea și asprimea lui Dumnezeu trebuie ținute împreună. Dumnezeu este puternic să altoiască din nou; de aceea atitudinea corectă este smerenia și speranța, nu disprețul."


def fail(message: str) -> None:
    raise SystemExit(f"[Romans wave1 quote snapshot fix] {message}")


def canonical(value) -> str:
    return json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":"))


def sha(value: str) -> str:
    return "sha256:" + hashlib.sha256(value.encode("utf-8")).hexdigest()


def snapshot(unit: dict, teaching: str | None = None) -> str:
    return json.dumps(
        {
            "heading": str(unit.get("heading") or ""),
            "teaching": str(unit.get("teaching") if teaching is None else teaching),
            "forYourHeart": str(unit.get("forYourHeart") or ""),
        },
        ensure_ascii=False,
        separators=(",", ":"),
    )


if not SPEC.exists() or not BOOK.exists():
    fail("review spec or current Romans book missing")
spec = json.loads(SPEC.read_text(encoding="utf-8"))
book = json.loads(BOOK.read_text(encoding="utf-8"))
if spec.get("bookId") != "romani" or book.get("id") != "romani":
    fail("unexpected book")
decisions = spec.get("decisions") or {}
units = {u["id"]: u for c in book.get("chapters", []) for u in c.get("units", [])}
if len(decisions) != 68 or set(decisions) != set(units):
    fail("expected exactly the same 68 reviewed/current Romans units")

review_content = copy.deepcopy(spec)
for item in review_content["decisions"].values():
    item.pop("expectedCurrentSnapshotSha256", None)
if sha(canonical(review_content)) != EXPECTED_REVIEW_CONTENT_SHA:
    fail("frozen Romans review content changed beyond snapshot hashes")

for unit_id, unit in units.items():
    if unit_id == TARGET:
        continue
    actual = sha(snapshot(unit))
    expected = decisions[unit_id].get("expectedCurrentSnapshotSha256")
    if actual != expected:
        fail(f"{unit_id}: unexpected additional presemantic drift; {actual} != {expected}")

item = decisions[TARGET]
unit = units[TARGET]
if item.get("action") != "keep":
    fail("target review is no longer keep")
if item.get("expectedCurrentSnapshotSha256") not in {REVIEWED_SHA, CURRENT_SHA}:
    fail("target stored snapshot is neither reviewed predecessor nor known normalized successor")
if unit.get("teaching") != CURRENT_TEACHING:
    fail("target current teaching differs from the exact manually reconciled normalized quote")
if sha(snapshot(unit)) != CURRENT_SHA:
    fail("target current snapshot hash differs from known normalized successor")
if sha(snapshot(unit, teaching=REVIEWED_TEACHING)) != REVIEWED_SHA:
    fail("target exact reviewed predecessor no longer proves the original review hash")

changed = item.get("expectedCurrentSnapshotSha256") != CURRENT_SHA
item["expectedCurrentSnapshotSha256"] = CURRENT_SHA
SPEC.write_text(json.dumps(spec, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"Romans wave1 quote snapshot fix: {'rebound' if changed else 'verified'} 1 exact quote-normalization snapshot; all other 67 reviewed snapshots unchanged.")
