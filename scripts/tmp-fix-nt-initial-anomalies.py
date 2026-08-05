#!/usr/bin/env python3
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs/data/biblia-emanus"
DOCS = ROOT / "docs/biblia-emanus"

CORRECTIONS = {
    ("MAT.10", 7): (
        "Pe drum, proclamați: «Împărăția cerurilor s-a apropiat!»",
        "În timp ce mergeți, predicați, spunând: «Împărăția cerurilor s-a apropiat!»",
    ),
    ("MRK.7", 8): (
        "Lăsând porunca lui Dumnezeu, țineți tradiția oamenilor.”",
        "Lăsând deoparte porunca lui Dumnezeu, țineți cu strășnicie tradiția oamenilor.”",
    ),
    ("MRK.7", 22): (
        "adulterele, lăcomiile, răutățile, înșelăciunea, desfrânarea, ochiul rău, blasfemia, trufia și nechibzuința.",
        "adultere, lăcomii, răutăți, înșelăciune, desfrânare, un ochi rău, blasfemie, mândrie și nebunie.",
    ),
    ("ACT.2", 10): (
        "ai Frigiei și Pamfiliei, ai Egiptului și ai părților Libiei dinspre Cirena, precum și romanii aflați aici,",
        "Frigia și Pamfilia, Egiptul și părțile Libiei dinspre Cirena, precum și vizitatorii din Roma,",
    ),
    ("ACT.13", 32): (
        "Iar noi vă vestim Evanghelia promisiunii făcute strămoșilor:",
        "Iar noi vă aducem vestea bună despre promisiunea făcută părinților:",
    ),
    ("1CO.13", 7): (
        "le acoperă pe toate, le crede pe toate, le speră pe toate, le îndură pe toate.",
        "acoperă totul, crede totul, speră totul și îndură totul.",
    ),
}


def main() -> int:
    for (chapter_id, verse_number), (expected, replacement) in CORRECTIONS.items():
        path = DATA / f"{chapter_id}.json"
        data = json.loads(path.read_text(encoding="utf-8"))
        verse = next((item for item in data["verses"] if item["number"] == verse_number), None)
        if verse is None:
            raise RuntimeError(f"{chapter_id}.{verse_number}: versetul lipsește")
        if verse["text"] != expected:
            raise RuntimeError(
                f"{chapter_id}.{verse_number}: textul nu corespunde reviziei așteptate: {verse['text']!r}"
            )
        verse["text"] = replacement
        path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"[nt-initial-audit] corrected {chapter_id}.{verse_number}")

    report = """# Audit inițial — corpus Noul Testament

Data: `2026-08-05`

## Inventar verificat direct

- 27 de cărți;
- 260 de capitole;
- 7.941 de versete în schema de versificație SBLGNT;
- 135 de capitole cu text românesc;
- 125 de capitole integral `DE TRADUS`;
- zero capitole mixte;
- toate capitolele NT rămân `in_review`, `public: false`.

Descrierea inițială a PR-ului sursă indica 139/121, dar fișierele efective conțin 135/125. Inventarul din repository este autoritatea pentru progres.

## Reparații structurale aplicate

- normalizare Unicode NFC în `JHN.5` și `ACT.24`;
- nouă defecte de ghilimele reparate în `MAT.5`, `MAT.7`, `MAT.13`, `MAT.20`, `MAT.25`, `MRK.12`, `MRK.14`, `ACT.1` și `ACT.22`;
- sursele VT existente și excepția de versificație Numeri 25:19 / 26:1 păstrate în snapshotul unificat;
- poarta anti-placeholder blochează `approved` și `published`, dar permite inventarierea capitolelor `in_review`.

## Formulări corectate după SBLGNT și WEBU

- `MAT.10.7` — verbul grec `kēryssō` este redat explicit prin „predicați”, iar participiul `poreuomenoi` prin „în timp ce mergeți”;
- `MRK.7.8` — `krateite` este redat prin „țineți cu strășnicie”; extensia TR despre vase și pahare nu este introdusă în textul SBLGNT;
- `MRK.7.22` — lista este aliniată lexical cu SBLGNT, păstrând `moicheiai` — „adultere”, absent din lectura TR a versetului;
- `ACT.2.10` — versetul se încheie la vizitatorii din Roma conform SBLGNT; „iudei și prozeliți” rămâne în 2:11;
- `ACT.13.32` — `euangelizomai` este redat natural prin „vă aducem vestea bună”;
- `1CO.13.7` — repetiția `panta` este păstrată concis: „totul”.

## Diferențe SBLGNT / TR care rămân pentru audit editorial

- `LUK.6.18` — SBLGNT păstrează și propoziția despre cei veniți să asculte și să fie vindecați; TR și etaloanele românești sunt mai scurte;
- `ACT.13.38–39` — SBLGNT distribuie propoziția despre Legea lui Moise între cele două versete diferit față de TR;
- `ACT.15.18` — SBLGNT are lectura scurtă „cunoscute din veac”, în timp ce TR explicitează subiectul și lucrările lui Dumnezeu.

Aceste diferențe nu vor fi „reparate” prin importarea textului TR. Înainte de publicare vor primi note editoriale rezolvate și excepții deterministe limitate exact la versetele afectate.
"""
    DOCS.mkdir(parents=True, exist_ok=True)
    (DOCS / "NT-INITIAL-AUDIT.md").write_text(report, encoding="utf-8")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
