#!/usr/bin/env python3
"""Aduce observatiile din studiul lui Allen Nolan pentru Geneza 10.

Din invatatura despre Babel si Nimrod: numele Nimrod, intreita pomenire a
puterii lui, vanatoarea de oameni, cuvantul panim, si asezarea capitolelor 10
si 11 unul peste altul in vreme.
Se ia invatatura, cuvintele sunt ale noastre.
"""

import sys
from pathlib import Path

RADACINA = Path("packages/shared/src/bible")

ANCORA_LIMBI = r"""Apoi ia aminte la vorba care se repeta si aici, si la Ham, si la Sem: dupa tinuturile lor, dupa limba fiecaruia, dupa familiile lor, dupa semintiile lor."""

ADAOS_LIMBI = r"""\n\nSi ia aminte ca vorba aceasta se aude de trei ori in capitolul de fata: la fiii lui Iafet, la fiii lui Ham si la fiii lui Sem. De fiecare data se spune ca aveau limbile lor. Unii au zis ca aici Sfanta Scriptura se loveste de ea insasi, fiindca in capitolul urmator vom citi ca tot pamantul avea o singura limba si aceleasi cuvinte. Sa luam bine seama: nu este nicio lovire. Cele doua capitole nu merg unul dupa altul in vreme. Capitolul de fata sta mai tarziu si numara neamurile asa cum ajunsesera sa fie, cu limbile lor; capitolul urmator se intoarce inapoi si arata ziua in care s-au despartit limbile."""

ANCORA_NIMROD = r"""poate insemna si in fata Lui, sub ochii Lui, cu indrazneala."""

ADAOS_NIMROD = r"""\n\nIa aminte si la numele lui, fiindca numele acesta spune ceva. Nimrod vine de la o radacina care inseamna a se razvrati, a se rascula. Ori l-au chemat asa cei din vremea lui, ori si-a zis el insusi asa; oricum ar fi, numele a ramas in Sfanta Scriptura ca o pecete pusa peste viata lui.\n\nApoi ia aminte cat de des se spune despre el ca era puternic. De trei ori in doua versete: o data ca a inceput sa fie puternic pe pamant, si de doua ori ca era viteaz vanator. Sfanta Scriptura nu risipeste cuvintele. Cand repeta, apasa.\n\nSi acum sa cantarim bine cuvantul vanator. Textul nu spune ce vana. Cei ce citesc cu luare-aminte bagau de seama ca despre fiare nu se pomeneste nimic, si ca omul acesta ajunge imparat peste cetati, nu vestit intre pastori. Vanatorul care ajunge sa domneasca peste noroade nu a vanat dobitoace. A vanat oameni.\n\nIar cuvantul talmacit aici inaintea Domnului este in ebraica panim, adica fata. Poate sa insemne sub privirea Lui, dar poate sa insemne si in fata Lui, adica impotriva Lui, cu obraznicie. Si cine isi aduce aminte de porunca data lui Noe cu putin mai inainte — cine varsa sangele omului, si sangele lui sa fie varsat — vede indata impotriva a ce se ridica omul acesta. Cel dintai stapanitor din lume s-a inaltat calcand tocmai porunca care aparase viata omului."""

ANCORA_CUVINTE = """        {
          original: "שִׁנְעָר","""

ADAOS_CUVINTE = """        {
          original: "נִמְרוֹד",
          transliteration: "Nimrod",
          language: "ebraica",
          meaning:
            "Nimrod; se socoteste ca vine de la radacina marad, a se razvrati, a se rascula."
        },
        {
          original: "פָּנִים",
          transliteration: "panim",
          language: "ebraica",
          meaning:
            "fata, inainte; asezat astfel, poate insemna si a sta in fata cuiva, impotriva lui."
        },
"""

ANCORA_TRIMITERI = """        "Iona 1:2","""

ADAOS_TRIMITERI = """        "Geneza 9:6",
        "Iona 1:2","""

INDREPTARI = [
    (
        "geneza10.ts",
        ANCORA_LIMBI,
        ANCORA_LIMBI + ADAOS_LIMBI,
        "10:5 limbile pomenite de trei ori si asezarea capitolelor 10 si 11 unul peste altul",
    ),
    (
        "geneza10.ts",
        ANCORA_NIMROD,
        ANCORA_NIMROD + ADAOS_NIMROD,
        "10:8-9 numele Nimrod, intreita pomenire a puterii, vanatoarea de oameni, panim",
    ),
    (
        "geneza10.ts",
        ANCORA_CUVINTE,
        ADAOS_CUVINTE + ANCORA_CUVINTE,
        "10:8-9 cuvintele Nimrod si panim",
    ),
    (
        "geneza10.ts",
        ANCORA_TRIMITERI,
        ADAOS_TRIMITERI,
        "10:6-12 trimiterea la Geneza 9:6",
    ),
]


def main() -> int:
    doar_verifica = "--check" in sys.argv
    nefacute = 0

    for fisier, vechi, nou, de_ce in INDREPTARI:
        cale = RADACINA / fisier
        if not cale.exists():
            print(f"::warning title=Fisier lipsa::{fisier}")
            nefacute += 1
            continue

        text = cale.read_text(encoding="utf-8")

        if nou in text:
            print(f"deja facut - {fisier}: {de_ce}")
            continue

        if vechi not in text:
            print(f"::warning title=Indreptare nefacuta::{fisier}: {de_ce}")
            nefacute += 1
            continue

        if text.count(vechi) > 1:
            print(f"::warning title=Potrivire multipla::{fisier}: {de_ce}")
            nefacute += 1
            continue

        if doar_verifica:
            print(f"::warning title=Indreptare neaplicata::{fisier}: {de_ce}")
            nefacute += 1
            continue

        cale.write_text(text.replace(vechi, nou), encoding="utf-8")
        print(f"aplicat - {fisier}: {de_ce}")

    if nefacute:
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
