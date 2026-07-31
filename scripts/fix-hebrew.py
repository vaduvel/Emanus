#!/usr/bin/env python3
"""Indreapta afirmatiile despre limba originala din Geneza.

Fiecare indreptare este legata de fisierul ei, ca sa nu se atinga alt loc unde
acelasi cuvant are alt inteles. Ruleaza cu --check ca sa doar verifice.
"""
import sys
from pathlib import Path

BIBLE = Path("packages/shared/src/bible")

# (fisier, vechi, nou, de ce)
INDREPTARI = [
    # Geneza 2:25 vorbeste despre amandoi, la plural: arummim, nu arum.
    # Jocul de cuvinte se face intre arummim (goi) si arum (siret) din 3:1.
    ("geneza2.ts", "\u05e2\u05b8\u05e8\u05d5\u05bc\u05dd", "\u05e2\u05b2\u05e8\u05bb\u05de\u05bc\u05b4\u05d9\u05dd",
     "forma din 2:25 este de plural"),
    ("geneza2.ts", 'transliteration: "arum"', 'transliteration: "arummim"',
     "transliterarea pe potriva formei de plural"),
    ("geneza2.ts", '"gol. Cuvantul suna', '"goi. Cuvantul suna',
     "intelesul urmeaza forma de plural"),
    # Suflarea de viata se spune si despre vietuitoare, la Geneza 7:22.
    ("geneza2.ts",
     "Cuvantul acesta pentru suflare se spune in Scriptura numai despre Dumnezeu si despre om.",
     "Cuvantul acesta pentru suflare se spune mai cu seama despre Dumnezeu si despre om, "
     "desi la Geneza 7:22 se rosteste si despre vietuitoare.",
     "afirmatia dintai era prea larga"),
    ("geneza2.ts", "Sunna aproape la fel cu adama", "Suna aproape la fel cu adama", "greseala de litera"),
    ("geneza2.ts", "Sunna aproape la fel cu is", "Suna aproape la fel cu is", "greseala de litera"),
    # Pluralul sangiuri: intelesul cu urmasii este tilcuire veche, nu text.
    ("geneza4.ts",
     "sangiuri, la plural. Nu numai viata luata, ci si urmasii care nu se vor mai naste.",
     "sangiuri, la plural. Din forma aceasta au inteles tilcuitorii din vechime nu numai "
     "viata luata, ci si urmasii care nu se vor mai naste.",
     "se arata ca este tilcuire, nu spusa a textului"),
    # Scrieri gresite ale cuvantului ebraic
    ("geneza10.ts", "\u05ea\u05d5\u05b9\u05dc\u05b0\u05d3\u05b9\u05d5\u05ea", "\u05ea\u05bc\u05d5\u05b9\u05dc\u05b0\u05d3\u05b9\u05ea",
     "scrierea cuvantului toledot"),
    ("geneza10.ts", "\u05d2\u05b4\u05d1\u05b9\u05bc\u05d5\u05e8", "\u05d2\u05bc\u05b4\u05d1\u05bc\u05d5\u05b9\u05e8",
     "scrierea cuvantului ghibor"),
    ("geneza24.ts", "\u05dc\u05b8\u05e9\u05e2\u05d5\u05bc\u05d7", "\u05dc\u05b8\u05e9\u05c2\u05d5\u05bc\u05d7",
     "literele erau puse in alta ordine"),
    ("geneza44.ts", "\u05e7\u05b0\u05e9\u05d5\u05bc\u05c1\u05e8\u05b8\u05d4", "\u05e7\u05b0\u05e9\u05c1\u05d5\u05bc\u05e8\u05b8\u05d4",
     "semnele erau puse pe litera gresita"),
    # Transliterari nepotrivite intre ele: s in loc de s cu virgulita
    ("geneza35.ts", 'transliteration: "El Sadai"', 'transliteration: "El \u0218adai"', "scriere pe potriva"),
    ("geneza43.ts", 'transliteration: "El Sadai"', 'transliteration: "El \u0218adai"', "scriere pe potriva"),
    ("geneza48.ts", 'transliteration: "El Sadai"', 'transliteration: "El \u0218adai"', "scriere pe potriva"),
    ("geneza37.ts", 'transliteration: "salom"', 'transliteration: "\u0219alom"', "scriere pe potriva"),
    ("geneza43.ts", 'transliteration: "salom"', 'transliteration: "\u0219alom"', "scriere pe potriva"),
    ("geneza41.ts", 'transliteration: "Menase"', 'transliteration: "Mena\u0219e"', "scriere pe potriva"),
    ("geneza49.ts", 'transliteration: "Silo"', 'transliteration: "\u0218ilo"', "scriere pe potriva"),
    ("geneza38.ts", 'transliteration: "Peret"', 'transliteration: "Pere\u021b"', "scriere pe potriva"),
]


def main():
    check = "--check" in sys.argv[1:]
    facute = []
    ramase = []

    for nume, vechi, nou, de_ce in INDREPTARI:
        cale = BIBLE / nume
        if not cale.exists():
            ramase.append("%s: fisierul lipseste" % nume)
            continue
        continut = cale.read_text(encoding="utf-8")
        cate = continut.count(vechi)
        if cate == 0:
            continue
        if cate > 1:
            ramase.append("%s: %r se afla de %d ori, nu se atinge" % (nume, vechi, cate))
            continue
        facute.append("%s — %s" % (nume, de_ce))
        if not check:
            cale.write_text(continut.replace(vechi, nou), encoding="utf-8")

    if ramase:
        for r in ramase:
            print("::warning title=Indreptare nefacuta::%s" % r)

    if check:
        if facute:
            print("Au ramas %d indreptari de facut." % len(facute))
            sys.exit(1)
        print("Nu au ramas indreptari de facut.")
    else:
        print("Indreptate: %d" % len(facute))
        for f in facute:
            print("- %s" % f)


if __name__ == "__main__":
    main()
