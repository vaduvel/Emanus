#!/usr/bin/env python3
"""Colationeaza textul biblic din packages/shared/src/bible cu o sursa publica.

Sursa: wordproject.org, textul Cornilescu in alfabet latin, capitol cu capitol.
Scriptul nu schimba nimic in continut. Scrie doar un raport, ca sa stim exact
ce unitati trebuie recitite si indreptate cu mana.
"""
import difflib
import re
import unicodedata
import urllib.request
from pathlib import Path

SURSA = "https://www.wordproject.org/bibles/ro/01/%d.htm"
BIBLE = Path("packages/shared/src/bible")
RAPORT = Path("docs/22-colationare-geneza.md")
PRAG = 0.90

UNITATE = re.compile(
    r'id:\s*"geneza-(\d+)-(\d+)-(\d+)".*?text:\s*"((?:[^"\\]|\\.)*)"',
    re.DOTALL,
)


def curata(text: str) -> str:
    """Aduce doua texte la o forma in care se pot compara cinstit."""
    text = unicodedata.normalize("NFD", text)
    text = "".join(c for c in text if unicodedata.category(c) != "Mn")
    text = text.lower()
    # ortografia veche fata de cea de azi
    text = text.replace("sint", "sunt").replace("mint", "mant").replace("vint", "vant")
    text = re.sub(r"[^a-z ]+", " ", text)
    return re.sub(r"\s+", " ", text).strip()


def dezescapeaza(text: str) -> str:
    return text.replace('\\"', '"').replace("\\n", "\n").replace("\\\\", "\\")


def adu_capitolul(numar: int) -> dict:
    cerere = urllib.request.Request(
        SURSA % numar, headers={"User-Agent": "Emanus/1.0"}
    )
    with urllib.request.urlopen(cerere, timeout=30) as raspuns:
        pagina = raspuns.read().decode("utf-8", errors="replace")
    corp = re.sub(r"(?is)<(script|style).*?</\1>", " ", pagina)
    corp = re.sub(r"(?s)<[^>]+>", " ", corp)
    corp = corp.replace("&nbsp;", " ").replace("&quot;", '"').replace("&amp;", "&")
    taiere = re.search(r"Capitol\s+%d\b" % numar, corp)
    if taiere:
        corp = corp[taiere.end():]
    oprire = re.search(r"(?i)(pagina principal|copyright|chapter\s+\d)", corp)
    if oprire:
        corp = corp[: oprire.start()]
    bucati = re.split(r"\s(\d{1,3})\s", " " + corp + " ")
    versete = {}
    if bucati and bucati[0].strip():
        versete[1] = bucati[0].strip()
    for i in range(1, len(bucati) - 1, 2):
        try:
            numar_verset = int(bucati[i])
        except ValueError:
            continue
        versete[numar_verset] = bucati[i + 1].strip()
    return versete


def main() -> None:
    rapoarte = []
    nepotriviri = 0
    prescurtate = 0
    total = 0

    for capitol in range(1, 51):
        nume = "geneza.ts" if capitol == 1 else "geneza%d.ts" % capitol
        cale = BIBLE / nume
        if not cale.exists():
            rapoarte.append("- Geneza %d: lipseste fisierul `%s`." % (capitol, nume))
            continue
        unitati = UNITATE.findall(cale.read_text(encoding="utf-8"))
        if not unitati:
            rapoarte.append("- Geneza %d: nu s-a putut citi nici o unitate." % capitol)
            continue
        try:
            versete = adu_capitolul(capitol)
        except Exception as eroare:  # noqa: BLE001
            rapoarte.append(
                "- Geneza %d: sursa nu a putut fi adusa (%s)." % (capitol, eroare)
            )
            continue
        for numar_cap, de_la, pana_la, textul_nostru in unitati:
            total += 1
            de_la, pana_la = int(de_la), int(pana_la)
            al_nostru = dezescapeaza(textul_nostru)
            asteptat = " ".join(
                versete.get(v, "") for v in range(de_la, pana_la + 1)
            ).strip()
            if not asteptat:
                rapoarte.append(
                    "- Geneza %s:%d-%d — versetele nu s-au gasit in sursa."
                    % (numar_cap, de_la, pana_la)
                )
                nepotriviri += 1
                continue
            potrivire = difflib.SequenceMatcher(
                None, curata(al_nostru), curata(asteptat)
            ).ratio()
            if "..." in al_nostru:
                prescurtate += 1
                eticheta = "prescurtat"
            elif potrivire >= PRAG:
                continue
            else:
                nepotriviri += 1
                eticheta = "nepotrivire"
            rapoarte.append(
                "- Geneza %s:%d-%d — %s, potrivire %.2f"
                % (numar_cap, de_la, pana_la, eticheta, potrivire)
            )

    RAPORT.parent.mkdir(parents=True, exist_ok=True)
    RAPORT.write_text(
        "# Colationarea Genezei cu textul Cornilescu\n\n"
        "Raport scris de `scripts/collate-bible.py`. Nu schimba nimic in continut.\n"
        "Compara textul biblic din fiecare unitate cu sursa publica, dupa ce scoate\n"
        "diacriticele si semnele de punctuatie, ca sa nu se opreasca la fleacuri.\n\n"
        "- Unitati cercetate: %d\n" % total
        + "- Unitati cu text prescurtat (au puncte de suspensie): %d\n" % prescurtate
        + "- Unitati care nu se potrivesc sub pragul %.2f: %d\n\n" % (PRAG, nepotriviri)
        + "## Ce trebuie recitit\n\n"
        + ("\n".join(rapoarte) if rapoarte else "Nimic.")
        + "\n",
        encoding="utf-8",
    )
    print(
        "Cercetate %d unitati. Nepotriviri: %d. Prescurtate: %d."
        % (total, nepotriviri, prescurtate)
    )


if __name__ == "__main__":
    main()
