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

SURSA = "https://www.wordproject.org/bibles/ro/01/{n}.htm"
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
    return (
        text.replace('\\"', '"').replace("\\n", "\n").replace("\\\\", "\\")
    )


def adu_capitolul(numar: int) -> dict[int, str]:
    cerere = urllib.request.Request(
        SURSA.format(n=numar), headers={"User-Agent": "Emanus/1.0"}
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
    versete: dict[int, str] = {}
    if bucati and bucati[0].strip():
        versete[1] = bucati[0].strip()
    for i in range(1, len(bucati) - 1, 2):
        try:
            numar_verset = int(bucati[i])
        except ValueError:
            continue
        versete[numar_verset] = bucati[i + 1].strip()
    return versete


rapoarte: list[str] = []
nepotriviri = 0
prescurtate = 0
total = 0

for capitol in range(1, 51):
    nume = "geneza.ts" if capitol == 1 else f"geneza{capitol}.ts"
    cale = BIBLE / nume
    if not cale.exists():
        rapoarte.append(f"- Geneza {capitol}: lipseste fisierul `{nume}`.")
        continue
    sursa_text = cale.read_text(encoding="utf-8")
    unitati = UNITATE.findall(sursa_text)
    if not unitati:
        rapoarte.append(f"- Geneza {capitol}: nu s-a putut citi nici o unitate.")
        continue
    try:
        versete = adu_capitolul(capitol)
    except Exception as eroare:  # noqa: BLE001
        rapoarte.append(f"- Geneza {capitol}: sursa nu a putut fi adusa ({eroare}).")
        continue
    for _, de_la, pana_la in [(u[0], int(u[1]), int(u[2])) for u in unitati]:
        pass
    for numar_cap, de_la, pana_la, textul_nostru in unitati:
        total += 1
        de_la, pana_la = int(de_la), int(pana_la)
        al_nostru = dezescapeaza(textul_nostru)
        asteptat = " ".join(
            versete.get(v, "") for v in range(de_la, pana_la + 1)
        ).strip()
        if not asteptat:
            rapoarte.append(
                f"- Geneza {numar_cap}:{de_la}-{pana_la} — versetele nu s-au gasit in sursa."
            )
            nepotriviri += 1
            continue
        a, b = curata(al_nostru), curata(asteptat)
        potrivire = difflib.SequenceMatcher(None, a, b).ratio()
        if "..." in al_nostru:
            prescurtate += 1
            eticheta = "prescurtat"
        elif potrivire >= PRAG:
            continue
        else:
            nepotriviri += 1
            eticheta = "nepotrivire"
        rapoarte.append(
            f"- Geneza {numar_cap}:{de_la}-{pana_la} — {eticheta}, potrivire {potrivire:.2f}"
        )

RAPORT.parent.mkdir(parents=True, exist_ok=True)
RAPORT.write_text(
    "# Colationarea Genezei cu textul Cornilescu\n\n"
    "Raport scris de `scripts/collate-bible.py`. Nu schimba nimic in continut.\n"
    "Compara textul biblic din fiecare unitate cu sursa publica, dupa ce scoate\n"
    "diacriticele si semnele de punctuatie, ca sa nu se sperie de fleacuri.\n\n"
    f"- Unitati cercetate: {total}\n"
    f"- Unitati cu text prescurtat (au puncte de suspensie): {prescurtate}\n"
    f"- Unitati care nu se potrivesc sub pragul {PRAG}: {nepotriviri}\n\n"
    "## Ce trebuie recitit\n\n" + ("\n".join(rapoarte) if rapoarte else "Nimic.") + "\n",
    encoding="utf-8",
)
print(f"Cercetate {total} unitati. Nepotriviri: {nepotriviri}. Prescurtate: {prescurtate}.")
