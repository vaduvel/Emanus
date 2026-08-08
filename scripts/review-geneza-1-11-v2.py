#!/usr/bin/env python3
"""Aplica revizia 1-11 si asupra fragmentelor duplicate, apoi lasa deduplicarea sa lucreze."""

from pathlib import Path
import runpy

DATE = runpy.run_path("scripts/review-geneza-1-11.py")
RADACINA: Path = DATE["RADACINA"]
INDREPTARI = DATE["INDREPTARI"]

# In sursa, aceasta propozitie incepe direct cu „Nu se spune”, nu cu „Sfanta Scriptura”.
vechi_gresit = "Sfanta Scriptura nu spune despre fiii lui si despre nevestele lor ca ar fi fost neprihaniti. Se spune ca au intrat cu el."
vechi_drept = "Nu se spune despre fiii lui si despre nevestele lor ca ar fi fost neprihaniti. Se spune ca au intrat cu el."
INDREPTARI["geneza7.ts"] = [
    (vechi_drept if vechi == vechi_gresit else vechi, nou)
    for vechi, nou in INDREPTARI["geneza7.ts"]
]


def main() -> int:
    nefacute = 0
    schimbari = 0
    for nume, perechi in INDREPTARI.items():
        cale = RADACINA / nume
        text = cale.read_text(encoding="utf-8")
        pentru_fisier = 0
        for vechi, nou in perechi:
            numar = text.count(vechi)
            if numar == 0:
                if nou in text:
                    continue
                print(f"::warning title=Revizie neaplicata::{nume}: potriviri=0: {vechi[:80]}")
                nefacute += 1
                continue
            text = text.replace(vechi, nou)
            schimbari += numar
            pentru_fisier += numar
        if pentru_fisier:
            cale.write_text(text, encoding="utf-8")
            print(f"{nume}: {pentru_fisier} inlocuiri")
    print(f"Total: {schimbari} inlocuiri; neaplicate: {nefacute}")
    return 1 if nefacute else 0


if __name__ == "__main__":
    raise SystemExit(main())
