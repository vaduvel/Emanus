#!/usr/bin/env python3
from __future__ import annotations

import json
import re
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs" / "data" / "biblia-emanus"

GLOBAL = {
    "Cuvîntul": "Cuvântul",
    "cuvîntul": "cuvântul",
    "dupăce": "după ce",
    "Dupăce": "După ce",
    "s'o": "s-o",
    "S'o": "S-o",
    "mîntuirii": "mântuirii",
    "zicînd": "zicând",
    "vînturilor": "vânturilor",
    "frecîndu-le": "frecându-le",
    "mîncat": "mâncat",
    "mîni": "mâini",
}

EXACT = {
    "1PE.1.25": "dar Cuvântul Domnului rămâne în veac. Acesta este Cuvântul Evangheliei care v-a fost vestit.",
    "2PE.3.5": "Căci ei uită înadins că cerurile existau din vechime și că pământul s-a format din apă și prin apă, prin Cuvântul lui Dumnezeu,",
    "2TH.3.1": "În cele din urmă, fraților, rugați-vă pentru noi, ca Cuvântul Domnului să se răspândească repede și să fie glorificat, așa cum este și la voi,",
    "ACT.8.4": "Așadar, cei care fuseseră împrăștiați mergeau din loc în loc vestind Cuvântul.",
    "EPH.4.19": "Ei, devenind insensibili, s-au dedat desfrânării, ca să săvârșească cu lăcomie orice fel de necurăție.",
    "EPH.5.26": "ca s-o sfințească, după ce a curățit-o prin spălarea cu apă, prin Cuvânt,",
    "EPH.6.17": "Luați coiful mântuirii și sabia Duhului, care este Cuvântul lui Dumnezeu.",
    "JAS.1.23": "Căci, dacă cineva este ascultător al Cuvântului, dar nu și împlinitor, seamănă cu un om care își privește chipul firesc într-o oglindă;",
    "JHN.7.19": "Nu v-a dat Moise Legea? Și totuși niciunul dintre voi nu păzește Legea. De ce căutați să Mă ucideți?",
    "LUK.6.1": "Într-o zi de Sabat, Isus trecea prin lanurile de grâu. Ucenicii Lui smulgeau spice, le frecau în mâini și le mâncau.",
    "LUK.8.25": "El le-a spus: „Unde vă este credința?” Ei, cuprinși de teamă și uimire, își spuneau unii altora: „Cine este Acesta, de poruncește chiar și vânturilor și apei, iar ele Îl ascultă?”",
    "REV.1.2": "care a mărturisit despre Cuvântul lui Dumnezeu și despre mărturia lui Isus Hristos, despre toate lucrurile pe care le-a văzut.",
    "REV.6.9": "Când a deschis pecetea a cincea, am văzut sub altar sufletele celor uciși din cauza Cuvântului lui Dumnezeu și a mărturiei pe care o ținuseră.",
    "ROM.9.6": "Dar nu ca și cum Cuvântul lui Dumnezeu ar fi dat greș. Căci nu toți cei din Israel sunt Israel;",
}

changed = []
for path in sorted(DATA.glob("*.json")):
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except Exception:
        continue
    book = data.get("bookId")
    chapter = data.get("chapter")
    if not book or not isinstance(chapter, int) or not isinstance(data.get("verses"), list):
        continue
    dirty = False
    for verse in data["verses"]:
        ref = f"{book}.{chapter}.{verse.get('number')}"
        before = str(verse.get("text", ""))
        after = EXACT.get(ref, before)
        for old, new in GLOBAL.items():
            after = after.replace(old, new).replace(old.replace("'", "’"), new)
        after = unicodedata.normalize("NFC", re.sub(r"\s{2,}", " ", after).strip())
        if after != before:
            verse["text"] = after
            changed.append({"ref": ref, "before": before, "after": after})
            dirty = True
    if dirty:
        path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

out = ROOT / "tmp-nt-repair"
out.mkdir(exist_ok=True)
(out / "residual-decisions.json").write_text(json.dumps(changed, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(json.dumps({"residualChanged": len(changed)}, ensure_ascii=False))
