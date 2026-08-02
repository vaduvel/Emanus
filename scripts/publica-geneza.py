#!/usr/bin/env python3
"""Publica numai capitolele Genezei aprobate si pazeste starea in CI."""

from __future__ import annotations

import argparse
import re
import sys
from datetime import date
from pathlib import Path

RADACINA = Path(__file__).resolve().parents[1]
BIBLIA = RADACINA / "packages" / "shared" / "src" / "bible"
REGISTRU = RADACINA / "docs" / "25-geneza-revizia-umana.md"

STATUS_RE = re.compile(r'(?P<prefix>status:\s*")(?P<status>draft|in_review|published)(?P<suffix>")')
APROBARE_RE = re.compile(
    r"^- \[x\] Geneza (?P<capitol>\d{1,2}) — aprobat de: (?P<nume>.+?); data: (?P<data>\d{4}-\d{2}-\d{2})\s*$",
    re.MULTILINE,
)


def cale_capitol(numar: int) -> Path:
    return BIBLIA / ("geneza.ts" if numar == 1 else f"geneza{numar}.ts")


def citeste_aprobari() -> dict[int, tuple[str, str]]:
    text = REGISTRU.read_text(encoding="utf-8")
    aprobari: dict[int, tuple[str, str]] = {}
    erori: list[str] = []

    for potrivire in APROBARE_RE.finditer(text):
        capitol = int(potrivire.group("capitol"))
        nume = potrivire.group("nume").strip()
        data_text = potrivire.group("data")
        if not 1 <= capitol <= 50:
            erori.append(f"Capitol in afara Genezei: {capitol}")
            continue
        if capitol in aprobari:
            erori.append(f"Aprobare repetata pentru Geneza {capitol}")
            continue
        if nume.upper() in {"NENUMIT", "NUME", "NECOMPLETAT"}:
            erori.append(f"Lipseste numele celui care aproba Geneza {capitol}")
            continue
        try:
            date.fromisoformat(data_text)
        except ValueError:
            erori.append(f"Data nevalida pentru Geneza {capitol}: {data_text}")
            continue
        aprobari[capitol] = (nume, data_text)

    if erori:
        raise ValueError("\n".join(erori))
    return aprobari


def citeste_status(numar: int) -> str:
    cale = cale_capitol(numar)
    if not cale.exists():
        raise ValueError(f"Lipseste fisierul: {cale.relative_to(RADACINA)}")
    text = cale.read_text(encoding="utf-8")
    potriviri = list(STATUS_RE.finditer(text))
    if len(potriviri) != 1:
        raise ValueError(
            f"{cale.relative_to(RADACINA)} trebuie sa aiba un singur camp status; gasite: {len(potriviri)}"
        )
    return potriviri[0].group("status")


def verifica() -> int:
    try:
        aprobari = citeste_aprobari()
        stari = {numar: citeste_status(numar) for numar in range(1, 51)}
    except ValueError as eroare:
        print(f"EROARE: {eroare}", file=sys.stderr)
        return 1

    erori: list[str] = []
    for numar, status in stari.items():
        aprobat = numar in aprobari
        if status == "published" and not aprobat:
            erori.append(f"Geneza {numar} este published fara aprobare in docs/25")
        if aprobat and status != "published":
            erori.append(f"Geneza {numar} este aprobata in docs/25, dar are status {status}")

    if erori:
        for eroare in erori:
            print(f"EROARE: {eroare}", file=sys.stderr)
        return 1

    publicate = sum(status == "published" for status in stari.values())
    print(f"Poarta Geneza: {publicate}/50 capitole publicate, {len(aprobari)}/50 aprobari consemnate.")
    return 0


def desface_capitole(spec: str) -> list[int]:
    capitole: set[int] = set()
    for bucata in spec.split(","):
        bucata = bucata.strip()
        if not bucata:
            continue
        if "-" in bucata:
            inceput_text, sfarsit_text = bucata.split("-", 1)
            inceput, sfarsit = int(inceput_text), int(sfarsit_text)
            if inceput > sfarsit:
                raise ValueError(f"Interval inversat: {bucata}")
            capitole.update(range(inceput, sfarsit + 1))
        else:
            capitole.add(int(bucata))
    if not capitole or any(numar < 1 or numar > 50 for numar in capitole):
        raise ValueError("Capitolele trebuie sa fie intre 1 si 50")
    return sorted(capitole)


def publica(spec: str) -> int:
    try:
        capitole = desface_capitole(spec)
        aprobari = citeste_aprobari()
    except (ValueError, TypeError) as eroare:
        print(f"EROARE: {eroare}", file=sys.stderr)
        return 1

    fara_aprobare = [numar for numar in capitole if numar not in aprobari]
    if fara_aprobare:
        lista = ", ".join(str(numar) for numar in fara_aprobare)
        print(f"EROARE: lipseste aprobarea din docs/25 pentru capitolele: {lista}", file=sys.stderr)
        return 1

    for numar in capitole:
        cale = cale_capitol(numar)
        text = cale.read_text(encoding="utf-8")
        potriviri = list(STATUS_RE.finditer(text))
        if len(potriviri) != 1:
            print(f"EROARE: status neclar in {cale.relative_to(RADACINA)}", file=sys.stderr)
            return 1
        status = potriviri[0].group("status")
        if status == "published":
            print(f"Geneza {numar}: deja publicata")
            continue
        nou = STATUS_RE.sub(r'\g<prefix>published\g<suffix>', text, count=1)
        cale.write_text(nou, encoding="utf-8")
        print(f"Geneza {numar}: {status} -> published")

    return verifica()


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true", help="Verifica legatura dintre aprobari si statusuri")
    parser.add_argument("--chapters", help='Publica o lista aprobata, de pilda "1-11,15"')
    argumente = parser.parse_args()

    if argumente.check == bool(argumente.chapters):
        parser.error("Alege exact una dintre --check si --chapters")
    return verifica() if argumente.check else publica(argumente.chapters)


if __name__ == "__main__":
    raise SystemExit(main())
