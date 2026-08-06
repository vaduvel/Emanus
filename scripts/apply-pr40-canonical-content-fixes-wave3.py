#!/usr/bin/env python3
"""Independently redraft the three remaining high-similarity Psalms.

The first content-repair wave has already moved Psalm superscriptions into the
dedicated field. This wave therefore validates and replaces only the active
verse text. Every old value is asserted exactly so the transformation cannot
silently run on a different candidate base.
"""
from __future__ import annotations

import hashlib
import json
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs" / "data" / "biblia-emanus-candidates"

CHAPTERS: dict[int, tuple[list[str], list[str]]] = {
    117: (
        [
            "Lăudați pe DOMNUL, toate neamurile, lăudați-L, toate popoarele!",
            "Căci mare este bunătatea Lui față de noi, și credincioșia Lui ține în veci. Lăudați pe DOMNUL!",
        ],
        [
            "Națiunilor toate, slăviți-L pe DOMNUL; popoarelor toate, înălțați-I lauda!",
            "Îndurarea Lui față de noi este puternică, iar adevărul DOMNULUI rămâne pentru totdeauna. Aleluia!",
        ],
    ),
    124: (
        [
            "De n-ar fi fost DOMNUL de partea noastră – să spună Israel acum! –",
            "de n-ar fi fost DOMNUL de partea noastră când s-au ridicat oamenii împotriva noastră,",
            "ne-ar fi înghițit de vii, când li s-a aprins mânia împotriva noastră;",
            "ne-ar fi înecat apele, ar fi trecut râurile peste sufletul nostru;",
            "ar fi trecut peste sufletul nostru valurile năprasnice.",
            "Binecuvântat să fie DOMNUL, care nu ne-a dat pradă dinților lor!",
            "Sufletul ne-a scăpat ca pasărea din lațul păsărarului; lațul s-a rupt, și noi am scăpat.",
            "Ajutorul nostru este în Numele DOMNULUI, care a făcut cerurile și pământul.",
        ],
        [
            "Israel să mărturisească acum: dacă DOMNUL nu ar fi fost alături de noi,",
            "dacă DOMNUL nu ar fi fost alături de noi când oamenii s-au ridicat împotriva noastră,",
            "atunci ne-ar fi înghițit de vii, când mânia lor ardea împotriva noastră;",
            "atunci apele ne-ar fi acoperit, iar șuvoiul ar fi trecut peste sufletul nostru;",
            "da, apele învolburate ar fi trecut peste sufletul nostru.",
            "Binecuvântat este DOMNUL, care nu ne-a lăsat pradă dinților lor!",
            "Sufletul nostru a scăpat asemenea unei păsări din cursa vânătorilor; cursa s-a sfărâmat, iar noi am scăpat.",
            "Sprijinul nostru vine din Numele DOMNULUI, Făcătorul cerului și al pământului.",
        ],
    ),
    125: (
        [
            "Cei ce se încred în DOMNUL sunt ca muntele Sionului care nu se clatină, ci stă întărit pe vecie.",
            "Cum este înconjurat Ierusalimul de munți, așa înconjoară DOMNUL pe poporul Său, de acum și până în veac.",
            "Căci toiagul de cârmuire al răutății nu va rămâne pe moștenirea celor neprihăniți, pentru ca cei neprihăniți să nu întindă mâinile spre nelegiuire.",
            "DOAMNE, varsă-Ți binefacerile peste cei buni și peste cei cu inima fără prihană!",
            "Dar pe cei ce apucă pe căi lăturalnice, să-i nimicească DOMNUL împreună cu cei ce fac rău! Pacea să fie peste Israel!",
        ],
        [
            "Cei care își pun încrederea în DOMNUL seamănă cu muntele Sion: nu poate fi clătinat și rămâne pentru totdeauna.",
            "Așa cum munții înconjoară Ierusalimul, tot astfel DOMNUL Își ocrotește poporul, acum și în veci.",
            "Stăpânirea răutății nu va apăsa mereu peste partea celor drepți, ca nu cumva cei drepți să-și întindă mâinile spre nedreptate.",
            "DOAMNE, fă bine celor buni și celor cu inima dreaptă!",
            "Iar pe cei care se abat pe căi strâmbe, DOMNUL îi va îndepărta împreună cu făptuitorii răului. Pace peste Israel!",
        ],
    ),
}


def digest(verses: list[dict]) -> str:
    return hashlib.sha256(
        "\n".join(str(verse.get("text", "")) for verse in verses).encode("utf-8")
    ).hexdigest()


def main() -> None:
    changed = 0
    for chapter, (expected, replacement) in CHAPTERS.items():
        path = DATA / f"PSA.{chapter}.json"
        document = json.loads(path.read_text(encoding="utf-8"))
        verses = document["verses"]
        actual = [str(verse["text"]) for verse in verses]
        if actual == replacement:
            continue
        if actual != expected:
            raise RuntimeError(
                f"PSA.{chapter}: candidate base changed; expected {expected!r}, found {actual!r}"
            )
        for verse, text in zip(verses, replacement):
            verse["text"] = text
        document.setdefault("audit", {})["textDigest"] = digest(verses)
        rendered = json.dumps(document, ensure_ascii=False, indent=2) + "\n"
        path.write_text(unicodedata.normalize("NFC", rendered), encoding="utf-8")
        changed += 1

    if changed not in {0, len(CHAPTERS)}:
        raise SystemExit(f"Partial independent Psalm redraft: {changed}/{len(CHAPTERS)}")
    print(json.dumps({"independentlyRedraftedPsalmChapters": changed}, ensure_ascii=False))


if __name__ == "__main__":
    main()
