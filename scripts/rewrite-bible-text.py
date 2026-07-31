#!/usr/bin/env python3
"""Inlocuieste textul biblic din unitatile Genezei cu textul din sursa publica.

Atinge numai campul `text` al fiecarei unitati. Explicatiile, cuvintele
ebraice, trimiterile si rugaciunile raman neatinse.

Cu --proba nu scrie nimic in fisiere, doar face raportul.
"""
import re
import sys
import urllib.request
from pathlib import Path

SURSA = "https://www.wordproject.org/bibles/ro/01/%d.htm"
BIBLE = Path("packages/shared/src/bible")
RAPORT = Path("docs/23-inlocuirea-textului.md")
APLICA = "--proba" not in sys.argv

UNITATE = re.compile(
    r'(id:\s*"geneza-(\d+)-(\d+)-(\d+)".*?text:\s*")((?:[^"\\]|\\.)*)(")',
    re.DOTALL,
)


def adu_capitolul(numar):
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


def imbraca(text):
    """Aduce textul la randuiala casei: ghilimele si cratime asezate."""
    text = text.replace(",,", "\u201e").replace("``", '"').replace("''", '"')
    text = re.sub(r"\s+-(?=[a-z\u0103\u00e2\u00ee\u0219\u021b\u015f\u0163])", "-", text)
    text = re.sub(r"\s+([,.;:!?])", r"\1", text)
    return re.sub(r"\s+", " ", text).strip()


def pentru_fisier(text):
    return text.replace("\\", "\\\\").replace('"', '\\"')


def main():
    probe = []
    schimbate = 0
    sarite = []

    for capitol in range(1, 51):
        nume = "geneza.ts" if capitol == 1 else "geneza%d.ts" % capitol
        cale = BIBLE / nume
        if not cale.exists():
            sarite.append("Geneza %d: lipseste fisierul." % capitol)
            continue
        try:
            versete = adu_capitolul(capitol)
        except Exception as eroare:  # noqa: BLE001
            sarite.append("Geneza %d: sursa nu a putut fi adusa (%s)." % (capitol, eroare))
            continue

        continut = cale.read_text(encoding="utf-8")
        socoteala = {"schimbate": 0}

        def inlocuieste(potrivire):
            inainte, cap, de_la, pana_la, vechi, dupa = potrivire.groups()
            de_la, pana_la = int(de_la), int(pana_la)
            bucati = [versete.get(v, "").strip() for v in range(de_la, pana_la + 1)]
            if not all(bucati):
                sarite.append(
                    "Geneza %s:%d-%d: versetele nu s-au gasit intregi in sursa."
                    % (cap, de_la, pana_la)
                )
                return potrivire.group(0)
            nou = imbraca(" ".join(bucati))
            if len(nou) < 20:
                sarite.append("Geneza %s:%d-%d: textul adus e prea scurt." % (cap, de_la, pana_la))
                return potrivire.group(0)
            socoteala["schimbate"] += 1
            if len(probe) < 4:
                probe.append(
                    "### Geneza %s:%d-%d\n\n> %s\n" % (cap, de_la, pana_la, nou[:600])
                )
            return inainte + pentru_fisier(nou) + dupa

        nou_continut = UNITATE.sub(inlocuieste, continut)
        schimbate += socoteala["schimbate"]
        if APLICA and nou_continut != continut:
            cale.write_text(nou_continut, encoding="utf-8")

    RAPORT.parent.mkdir(parents=True, exist_ok=True)
    RAPORT.write_text(
        "# Inlocuirea textului biblic din sursa\n\n"
        + (
            "Textul biblic al tuturor unitatilor Genezei a fost adus din editia\n"
            "Cornilescu 1924, cu diacriticele si ortografia ei. Nu mai este scris\n"
            "din memorie. Explicatiile au ramas neatinse.\n\n"
            if APLICA
            else "Doar proba. Nu s-a schimbat nimic in continut.\n\n"
        )
        + "- Unitati la care s-a inlocuit textul: %d\n" % schimbate
        + "- Unitati sarite: %d\n\n" % len(sarite)
        + "## Cum arata acum\n\n"
        + ("\n".join(probe) if probe else "Nimic.")
        + "\n\n## Sarite\n\n"
        + ("\n".join("- " + s for s in sarite) if sarite else "Nimic.")
        + "\n",
        encoding="utf-8",
    )
    print("Unitati: %d. Sarite: %d. Aplicat: %s" % (schimbate, len(sarite), APLICA))


if __name__ == "__main__":
    main()
