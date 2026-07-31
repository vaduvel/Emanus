#!/usr/bin/env python3
"""Strange la un loc toate cuvintele in limba originala din Biblia explicata.

Scrie un raport cu fiecare cuvant, unde apare si ce spunem despre el, ca sa
poata fi cercetate toate deodata. Nu schimba nimic in continut.
"""
import re
from pathlib import Path

BIBLE = Path("packages/shared/src/bible")
RAPORT = Path("docs/24-cuvinte-in-limba-originala.md")

UNITATE = re.compile(
    r'id:\s*"(geneza-[\d-]+)"(.*?)(?=id:\s*"geneza-|\Z)', re.DOTALL
)
CUVANT = re.compile(
    r'original:\s*"((?:[^"\\]|\\.)*)"\s*,\s*'
    r'transliteration:\s*"((?:[^"\\]|\\.)*)"\s*,\s*'
    r'language:\s*"((?:[^"\\]|\\.)*)"\s*,\s*'
    r'meaning:\s*"((?:[^"\\]|\\.)*)"',
    re.DOTALL,
)


def main():
    randuri = []
    numar = 0

    for capitol in range(1, 51):
        nume = "geneza.ts" if capitol == 1 else "geneza%d.ts" % capitol
        cale = BIBLE / nume
        if not cale.exists():
            continue
        continut = cale.read_text(encoding="utf-8")
        gasite = []
        for unitate_id, corp in UNITATE.findall(continut):
            for original, translit, limba, inteles in CUVANT.findall(corp):
                numar += 1
                gasite.append(
                    "| %s | %s | *%s* | %s | %s |"
                    % (
                        unitate_id.replace("geneza-", ""),
                        original,
                        translit,
                        limba,
                        inteles.replace("|", "\\|").replace("\\n", " "),
                    )
                )
        if gasite:
            randuri.append("\n## Geneza %d\n" % capitol)
            randuri.append("| Unitatea | Cuvantul | Transliterare | Limba | Ce spunem |")
            randuri.append("| --- | --- | --- | --- | --- |")
            randuri.extend(gasite)

    RAPORT.parent.mkdir(parents=True, exist_ok=True)
    RAPORT.write_text(
        "# Cuvintele in limba originala din Geneza\n\n"
        "Raport scris de `scripts/list-bible-words.py`. Nu schimba nimic in continut.\n"
        "Este lista tuturor afirmatiilor noastre despre ebraica, stranse la un loc,\n"
        "ca sa poata fi cercetate una cate una si scoase cele care nu se confirma.\n\n"
        "- Cuvinte in total: %d\n" % numar
        + "\n".join(randuri)
        + "\n",
        encoding="utf-8",
    )
    print("Cuvinte: %d" % numar)


if __name__ == "__main__":
    main()
