#!/usr/bin/env python3
"""Generate and refine early-work candidates with two independent passes."""
from __future__ import annotations

import importlib.util
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCRIPT = Path(__file__).with_name("translate-pr40-early-works.py")
CANDIDATES = ROOT / "docs" / "data" / "biblia-emanus-early-romanian-candidates"
THOUSANDS_WITH_MACHINE_SPACE = re.compile(r"(?<=\d),\s+(?=\d{3}\b)")
EXACT_SOURCE_CONFIRMED_WORDING = {
    "JUB.12:1": "Și s-a întâmplat în a șasea săptămână, în al șaptelea an al ei [1904 A.M.], că Avram i-a spus tatălui său, Terah: «Tată!»",
    "JUB.12:9": "Iar în al patruzecilea jubileu, în a doua săptămână, în al șaptelea an al ei [1925 A.M.], Avram și-a luat o soție, al cărei nume era Sarai, fiica tatălui său, și ea a devenit soția lui.",
    "JUB.12:12": "Iar în al șaizecilea an al vieții lui Avram, adică în a patra săptămână, în al patrulea an al ei [1936 A.M.], Avram s-a sculat noaptea și a ars casa idolilor; a ars tot ce era în casă și nimeni nu a știut.",
    "JUB.12:16": "Iar în a șasea săptămână, în al cincilea an al ei [1951 A.M.], Avram a rămas treaz toată noaptea, la luna nouă a lunii a șaptea, ca să observe stelele de seara până dimineața și să vadă cum va fi anul în privința ploilor; era singur în timp ce stătea și observa.",
    "JUB.29:5": "Iar în al șaptelea an al săptămânii a patra, Iacov și-a îndreptat fața spre Galaad în luna întâi, în ziua a douăzeci și una [2135 A.M.]. Laban l-a urmărit și l-a ajuns pe Iacov în muntele Galaad, în luna a treia, în ziua a treisprezecea.",
    "JUB.36:1": "Iar în al șaselea an al acestei săptămâni [2162 A.M.], Isaac i-a chemat pe cei doi fii ai săi, Esau și Iacov. Ei au venit la el, iar el le-a spus: «Fiii mei, eu merg pe calea părinților mei, spre casa veșnică unde sunt părinții mei.»",
    "JUB.36:21": "Iar Lea, soția lui, a murit în al patrulea an al celei de-a doua săptămâni din al patruzeci și cincilea jubileu [2167 A.M.], iar el a îngropat-o în peștera dublă, lângă Rebeca, mama lui, în stânga mormântului Sarei, mama tatălui său.",
    "JUB.37:1": "Iar în ziua în care a murit Isaac, tatăl lui Iacov și al lui Esau [2162 A.M.], fiii lui Esau au auzit că Isaac îi dăduse fiului său mai mic, Iacov, partea celui întâi-născut și s-au mâniat foarte tare.",
    "JUB.4:33": "Iar în al douăzeci și cincilea jubileu [1205 A.M.], Noe și-a luat o soție, al cărei nume era Emzârâ, fiica lui Râkê'êl, fiica fratelui tatălui său, în primul an al săptămânii a cincea [1207 A.M.]. În al treilea an ea i l-a născut pe Sem, în al cincilea an [1209 A.M.] i l-a născut pe Ham, iar în primul an al săptămânii a șasea [1212 A.M.] i l-a născut pe Iafet.",
    "JUB.46:8": "Iar Iosif a murit în al patruzeci și șaselea jubileu, în a șasea săptămână, în al doilea an; l-au îngropat în țara Egiptului, iar în [2242 A.M.] toți frații lui au murit după el.",
    "JUB.47:1": "Iar în a șaptea săptămână, în al șaptelea an, în al patruzeci și șaptelea jubileu, tatăl tău a ieșit [2303 A.M.] din țara Canaanului; tu te-ai născut în săptămâna a patra, în al șaselea an al ei, în [2330 A.M.], în al patruzeci și optulea jubileu. Acesta a fost timpul necazului peste copiii lui Israel.",
    "JUB.48:14": "Iar toate popoarele pe care le-a adus să-l urmărească pe Israel, Domnul Dumnezeul nostru le-a aruncat în mijlocul mării, în adâncurile abisului, sub copiii lui Israel, așa cum poporul Egiptului își aruncase copiii în râu. El S-a răzbunat pe 1,000,000 dintre ei, iar o mie de bărbați puternici și viguroși au fost nimiciți pentru un singur prunc al copiilor poporului tău pe care îl aruncaseră în râu.",
}


def normalize_numeric_formatting() -> int:
    """Remove MT-inserted spaces inside thousands tokens without changing digits."""
    changed_files = 0
    if not CANDIDATES.is_dir():
        return changed_files
    for path in sorted(CANDIDATES.glob("*.json")):
        document = json.loads(path.read_text(encoding="utf-8"))
        changed = False
        for verse in document.get("verses", []):
            text = verse.get("text")
            if not isinstance(text, str):
                continue
            normalized = THOUSANDS_WITH_MACHINE_SPACE.sub(",", text)
            if normalized != text:
                verse["text"] = normalized
                changed = True
        if changed:
            path.write_text(
                json.dumps(document, ensure_ascii=False, indent=2) + "\n",
                encoding="utf-8",
            )
            changed_files += 1
    return changed_files


def apply_exact_source_confirmed_wording() -> list[str]:
    """Apply reviewed wording after model selection, before semantic audit."""
    applied: list[str] = []
    for reference, wording in EXACT_SOURCE_CONFIRMED_WORDING.items():
        chapter_id, verse_raw = reference.split(":", 1)
        path = CANDIDATES / f"{chapter_id}.json"
        if not path.is_file():
            continue
        verse_number = int(verse_raw)
        document = json.loads(path.read_text(encoding="utf-8"))
        matched = False
        for verse in document.get("verses", []):
            if verse.get("number") == verse_number:
                verse["text"] = wording
                matched = True
                break
        if not matched:
            raise RuntimeError(f"{reference}: verse missing from generated candidate")
        path.write_text(
            json.dumps(document, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
        applied.append(reference)
    return applied


spec = importlib.util.spec_from_file_location("pr40_early_translation_big", SCRIPT)
if spec is None or spec.loader is None:
    raise SystemExit(f"Cannot load {SCRIPT}")
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)
module.MODEL_ID = "Helsinki-NLP/opus-mt-tc-big-en-ro"
module.main()

batch_size = "20"
for index, argument in enumerate(sys.argv):
    if argument == "--batch-size" and index + 1 < len(sys.argv):
        batch_size = sys.argv[index + 1]
subprocess.run(
    [
        sys.executable,
        str(Path(__file__).with_name("refine-pr40-translation-candidates.py")),
        "--collection",
        "early",
        "--batch-size",
        batch_size,
    ],
    check=True,
)
normalized_files = normalize_numeric_formatting()
applied_wordings = apply_exact_source_confirmed_wording()
print(
    json.dumps(
        {
            "normalizedThousandsFiles": normalized_files,
            "sourceConfirmedWordings": applied_wordings,
        },
        ensure_ascii=False,
    )
)
