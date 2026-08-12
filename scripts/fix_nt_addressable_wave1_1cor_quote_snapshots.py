#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import json
from pathlib import Path

ROOT = Path.cwd()
SPEC = ROOT / "docs/data/biblia-explicata/nt-semantic-review-spec/07-1-corinteni.json"
BOOK = ROOT / "docs/data/biblia-explicata/nt-final-source-first/07-1-corinteni.json"

PAIRS = {
    "1-corinteni-12-12-21": {
        "reviewedSha": "sha256:4616aa8f3112242d02aa0457ca28665276627a5dfb1f5fa16e644329bfb76fb3",
        "currentSha": "sha256:e06ef50939cf02c992be8f08cbc6d40e5431d710275b310944c628d7fe1e0482",
        "reviewedTeaching": "Originea, statutul și trecutul nu creează trupuri separate. Duhul îi unește pe credincioși cu Hristos și între ei, astfel încât diversitatea nu mai trebuie să producă rivalitate.\n\nMădularul care se simte inferior nu încetează să aparțină trupului, iar cel vizibil nu poate spune altuia «N-am nevoie de tine». Individualismul și cultul unui singur dar contrazic însăși imaginea trupului.",
        "currentTeaching": "Originea, statutul și trecutul nu creează trupuri separate. Duhul îi unește pe credincioși cu Hristos și între ei, astfel încât diversitatea nu mai trebuie să producă rivalitate.\n\nMădularul care se simte inferior nu încetează să aparțină trupului, iar cel vizibil nu poate spune altuia «nu am nevoie de tine». Individualismul și cultul unui singur dar contrazic însăși imaginea trupului.",
    },
    "1-corinteni-14-26-33": {
        "reviewedSha": "sha256:fd5637c0d994591bdc0611366ea21f90fa7148a822ffbd270c568354eab03ca9",
        "currentSha": "sha256:54dd5e405b7b0e638d9b77cb3916b57980200f164835668a9e744d7864686f57",
        "reviewedTeaching": "Unul are o cântare, altul o învățătură sau o descoperire, dar participarea este limitată de ordine. Cei care vorbesc trebuie să lase loc altora, iar comunitatea să judece mesajul.\n\n«duhurile profeților sunt supuse profeților» înseamnă că impulsul spiritual nu anulează autocontrolul. Haosul, întreruperea și presiunea nu pot fi justificate prin afirmația «Dumnezeu m-a făcut să spun».",
        "currentTeaching": "Unul are o cântare, altul o învățătură sau o descoperire, dar participarea este limitată de ordine. Cei care vorbesc trebuie să lase loc altora, iar comunitatea să judece mesajul.\n\n«Duhurile prorocilor sunt supuse prorocilor» înseamnă că impulsul spiritual nu anulează autocontrolul. Haosul, întreruperea și presiunea nu pot fi justificate prin afirmația «Dumnezeu m-a făcut să spun».",
    },
    "1-corinteni-16-13-24": {
        "reviewedSha": "sha256:176a2285a12f4293c5bf7385cd0a09c6ebe59643f3d5f3140118eb4228e1a4a9",
        "currentSha": "sha256:4bb2cd3144d0d8ba746a7f2e4c6c26b41320c7df82e3274cc3c8a8228394d420",
        "reviewedTeaching": "«Vegheați, stați tari în credință, purtați-vă bărbătește, fiți tari» este imediat echilibrat de «tot ce faci să fie făcut în dragoste». Maturitatea creștină unește fermitatea cu blândețea.\n\nCasa lui Ștefana se dedicase slujirii sfinților și trebuia recunoscută. Pavel încheie numind oameni, trimițând afecțiune și reafirmând dragostea lui chiar unei comunități pe care a corectat-o sever.",
        "currentTeaching": "«Vegheați, stați tari, fiți curajoși» este imediat echilibrat de «tot ce faceți să fie făcut în dragoste». Maturitatea creștină unește fermitatea cu blândețea.\n\nCasa lui Ștefana se dedicase slujirii sfinților și trebuia recunoscută. Pavel încheie numind oameni, trimițând afecțiune și reafirmând dragostea lui chiar unei comunități pe care a corectat-o sever.",
    },
}


def fail(message: str) -> None:
    raise SystemExit(f"[1 Corinthians wave1 quote snapshot fix] {message}")


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
    fail("review spec or current book missing")
spec = json.loads(SPEC.read_text(encoding="utf-8"))
book = json.loads(BOOK.read_text(encoding="utf-8"))
if spec.get("bookId") != "1-corinteni" or book.get("id") != "1-corinteni":
    fail("unexpected book")
decisions = spec.get("decisions") or {}
units = {u["id"]: u for c in book.get("chapters", []) for u in c.get("units", [])}

changed = 0
for unit_id, pair in PAIRS.items():
    item = decisions.get(unit_id)
    unit = units.get(unit_id)
    if not item or not unit:
        fail(f"{unit_id}: reviewed decision/current unit missing")
    if item.get("action") != "keep":
        fail(f"{unit_id}: expected keep decision")
    if item.get("expectedCurrentSnapshotSha256") not in {pair["reviewedSha"], pair["currentSha"]}:
        fail(f"{unit_id}: frozen snapshot is neither the reviewed nor normalized known hash")
    if unit.get("teaching") != pair["currentTeaching"]:
        fail(f"{unit_id}: current normalized reader copy differs from the exact manually reconciled text")
    current_sha = sha(snapshot(unit))
    if current_sha != pair["currentSha"]:
        fail(f"{unit_id}: current normalized snapshot hash drifted; {current_sha} != {pair['currentSha']}")

    # Prove the old reviewed hash from the same current heading/application and the
    # exact pre-normalization teaching. This prevents a semantic rebind hidden behind
    # a generic hash replacement.
    reviewed_sha = sha(snapshot(unit, teaching=pair["reviewedTeaching"]))
    if reviewed_sha != pair["reviewedSha"]:
        fail(f"{unit_id}: exact reviewed predecessor no longer proves the stored review hash")

    if item.get("expectedCurrentSnapshotSha256") != pair["currentSha"]:
        item["expectedCurrentSnapshotSha256"] = pair["currentSha"]
        changed += 1

SPEC.write_text(json.dumps(spec, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"1 Corinthians wave1 quote snapshot fix: rebound {changed}/3 exact reviewed quote-normalization snapshots; semantic decisions unchanged.")
