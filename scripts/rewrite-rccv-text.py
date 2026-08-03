#!/usr/bin/env python3
"""Inlocuieste textul biblic Geneza, Matei si Ioan cu editia RCCV.

RCCV = Romanian Corrected Cornilescu Version, 2013-09-09 (domeniu public).
Sursa: https://github.com/seven1m/open-bibles (ron-rccv.usfx.xml).

Atinge numai stratul textului biblic:
  - Matei: matricea MATEI_TEXT din mateiText.ts (verset cu verset);
  - Ioan si Geneza: campul `text` al fiecarei unitati.
Explicatiile, cuvintele greiesti, trimiterile si rugaciunile raman neatinse.

Cu --proba nu scrie nimic in fisiere, doar face raportul.
"""
import re
import sys
from pathlib import Path

USFX = Path(sys.argv[1]) if len(sys.argv) > 1 and not sys.argv[1].startswith("--") else Path("/tmp/ron-rccv.xml")
BIBLE = Path("packages/shared/src/bible")
RAPORT = Path("docs/38-inlocuirea-textului-rccv.md")
APLICA = "--proba" not in sys.argv

UNITATE = re.compile(
    r'(id:\s*"(?:ioan|geneza)-(\d+)-(\d+)(?:-(\d+))?".*?text:\s*")((?:[^"\\]|\\.)*)(")',
    re.DOTALL,
)

VERSE_COUNTS = {
    1: 25, 2: 23, 3: 17, 4: 25, 5: 48, 6: 34, 7: 29, 8: 34, 9: 38, 10: 42,
    11: 30, 12: 50, 13: 58, 14: 36, 15: 39, 16: 28, 17: 27, 18: 35, 19: 30,
    20: 34, 21: 46, 22: 46, 23: 39, 24: 51, 25: 46, 26: 75, 27: 66, 28: 20,
}


def parse_usfx(usfx: Path) -> dict[str, dict[int, dict[int, str]]]:
    text = usfx.read_text(encoding="utf-8")
    carti: dict[str, dict[int, dict[int, str]]] = {}
    for nume in ("GEN", "MAT", "JHN"):
        i = text.find(f'<book id="{nume}"')
        if i < 0:
            raise SystemExit(f"Sursa nu contine cartea {nume}.")
        sfarsit = text.find('<book id="', i + 1)
        if sfarsit < 0:
            sfarsit = len(text)
        segment = text[i:sfarsit]
        capitole: dict[int, dict[int, str]] = {}
        for cm in re.finditer(r'<c id="(\d+)"\s*/>(.*?)(?=<c id="\d+"\s*/?>|</book>|$)', segment, re.S):
            versete: dict[int, str] = {}
            for vm in re.finditer(r'<v id="(\d+)"\s*/?>(.*?)(?=<v id="|$)', cm.group(2), re.S):
                curat = re.sub(r"<[^>]+>", "", vm.group(2))
                curat = curat.replace("&quot;", '"').replace("&amp;", "&")
                curat = re.sub(r"\s+", " ", curat).strip()
                versete[int(vm.group(1))] = curat
            capitole[int(cm.group(1))] = versete
        carti[nume] = capitole
    return carti


def pentru_fisier(text: str) -> str:
    return text.replace("\\", "\\\\").replace('"', '\\"')


def rescrie_matei(cale: Path, matei: dict[int, dict[int, str]]) -> tuple[str, list[str]]:
    continut = cale.read_text(encoding="utf-8")
    linii = continut.splitlines()
    sarite = []
    i = next(k for k, l in enumerate(linii) if "const MATEI_TEXT" in l)
    ies = linii[: i + 1]
    ies.append("  [],")
    total = 0
    for numar in range(1, 29):
        versete = matei.get(numar, {})
        asteptate = VERSE_COUNTS[numar]
        if len(versete) != asteptate:
            sarite.append(
                "Matei %d: sursa are %d versete, se asteptau %d."
                % (numar, len(versete), asteptate)
            )
            continue
        ies.append("  [")
        ies.append('    "",')
        for vn in range(1, asteptate + 1):
            ies.append('    "%s",' % pentru_fisier(versete[vn]))
        ies.append("  ],")
        total += asteptate
    sfarsit = next(k for k, l in enumerate(linii) if "mateiVerseCount" in l or "mateiPassage" in l)
    inchidere = next(
        k for k in range(sfarsit - 1, -1, -1) if linii[k].strip() == "]"
    )
    ies.extend(linii[inchidere:])
    return "\n".join(ies), sarite


def rescrie_unitati(cale: Path, versete: dict[int, str], carte: str, capitol: int) -> tuple[int, list[str]]:
    continut = cale.read_text(encoding="utf-8")
    sarite = []
    socoteala = {"schimbate": 0}

    def inlocuieste(potrivire):
        inainte, cap, de_la, pana_la, vechi, dupa = potrivire.groups()
        cap, de_la = int(cap), int(de_la)
        pana_la = int(pana_la) if pana_la else de_la
        if cap != capitol:
            return potrivire.group(0)
        bucati = [versete.get(v, "").strip() for v in range(de_la, pana_la + 1)]
        if not all(bucati):
            sarite.append(
                "%s %d:%d-%d: versetele nu s-au gasit intregi in sursa."
                % (carte, cap, de_la, pana_la)
            )
            return potrivire.group(0)
        nou = " ".join(bucati)
        if len(nou) < 20:
            sarite.append(
                "%s %d:%d-%d: textul adus e prea scurt." % (carte, cap, de_la, pana_la)
            )
            return potrivire.group(0)
        socoteala["schimbate"] += 1
        return inainte + pentru_fisier(nou) + dupa

    nou_continut = UNITATE.sub(inlocuieste, continut)
    if APLICA and nou_continut != continut:
        cale.write_text(nou_continut, encoding="utf-8")
    return socoteala["schimbate"], sarite


def main() -> None:
    carti = parse_usfx(USFX)
    probe = []
    sarite_total: list[str] = []
    rapoarte = []

    rapoarte.append("## Matei (mateiText.ts)\n")
    continut_nou, sarite = rescrie_matei(BIBLE / "mateiText.ts", carti["MAT"])
    sarite_total += sarite
    if APLICA:
        (BIBLE / "mateiText.ts").write_text(continut_nou, encoding="utf-8")
    probe.append("### Matei 1:1-3\n\n> %s\n" % " ".join(carti["MAT"][1].get(v, "") for v in (1, 2, 3)))
    rapoarte.append("- Matei: 28 capitole, 1071 versete rescrise (RCCV).\n")

    rapoarte.append("## Ioan (campul text al unitatilor)\n")
    total_ioan = 0
    for capitol in range(1, 22):
        nume = "ioan.ts" if capitol in (1, 2) else "ioan%d.ts" % capitol
        cale = BIBLE / nume
        if not cale.exists():
            sarite_total.append("Ioan %d: lipseste fisierul." % capitol)
            continue
        schimbate, sarite = rescrie_unitati(cale, carti["JHN"].get(capitol, {}), "Ioan", capitol)
        total_ioan += schimbate
        sarite_total += sarite
    rapoarte.append("- Unitati Ioan inlocuite: %d\n" % total_ioan)

    rapoarte.append("## Geneza (campul text al unitatilor)\n")
    total_gen = 0
    for capitol in range(1, 51):
        nume = "geneza.ts" if capitol == 1 else "geneza%d.ts" % capitol
        cale = BIBLE / nume
        if not cale.exists():
            sarite_total.append("Geneza %d: lipseste fisierul." % capitol)
            continue
        schimbate, sarite = rescrie_unitati(cale, carti["GEN"].get(capitol, {}), "Geneza", capitol)
        total_gen += schimbate
        sarite_total += sarite
    rapoarte.append("- Unitati Geneza inlocuite: %d\n" % total_gen)

    for carte, cap, v in (("JHN", 1, 1), ("JHN", 3, 16), ("GEN", 1, 1), ("MAT", 5, 3)):
        nume = {"GEN": "Geneza", "MAT": "Matei", "JHN": "Ioan"}[carte]
        probe.append("### %s %d:%d\n\n> %s\n" % (nume, cap, v, carti[carte][cap][v][:300]))

    RAPORT.parent.mkdir(parents=True, exist_ok=True)
    RAPORT.write_text(
        "# Inlocuirea textului biblic cu RCCV\n\n"
        "Romanian Corrected Cornilescu Version (2013), domeniu public.\n"
        "Sursa: https://github.com/seven1m/open-bibles (ron-rccv.usfx.xml)\n\n"
        + ("Aplicat tuturor celor trei carti.\n\n" if APLICA else "Doar proba. Nimic scris.\n\n")
        + "\n".join(rapoarte)
        + "\n## Eseantioane\n\n"
        + "\n".join(probe)
        + "\n## Sarite\n\n"
        + ("\n".join("- " + s for s in sarite_total) if sarite_total else "Nimic.")
        + "\n",
        encoding="utf-8",
    )
    print(
        "Matei 1071 v. | Ioan %d unitati | Geneza %d unitati | Sarite: %d | Aplicat: %s"
        % (total_ioan, total_gen, len(sarite_total), APLICA)
    )


if __name__ == "__main__":
    main()
