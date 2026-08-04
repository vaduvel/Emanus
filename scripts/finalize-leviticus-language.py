#!/usr/bin/env python3
from __future__ import annotations
import json
import re
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs" / "data" / "biblia-emanus"

LEV2 = {
1: "„Când cineva aduce DOMNULUI un dar de cereale, darul lui să fie din făină fină. Să toarne ulei peste el și să pună tămâie pe el.",
2: "Să-l aducă fiilor lui Aaron, preoții. Preotul să ia un pumn din făina fină și din ulei, împreună cu toată tămâia, și să ardă pe altar partea de aducere-aminte, ca jertfă mistuită de foc, o mireasmă plăcută DOMNULUI.",
3: "Ce rămâne din darul de cereale să fie al lui Aaron și al fiilor lui; este o parte preasfântă din jertfele mistuite de foc ale DOMNULUI.",
4: "Dacă aduci un dar de cereale copt în cuptor, să fie din turte de făină fină fără aluat, frământate cu ulei, sau din foițe fără aluat, unse cu ulei.",
5: "Dacă darul tău este un dar de cereale pregătit pe plită, să fie din făină fină fără aluat, frământată cu ulei.",
6: "Să-l rupi în bucăți și să torni ulei peste el; este un dar de cereale.",
7: "Dacă darul tău este un dar de cereale pregătit într-o tigaie, să fie făcut din făină fină cu ulei.",
8: "Să aduci DOMNULUI darul de cereale făcut din aceste lucruri, să-l înfățișezi preotului, iar el să-l aducă la altar.",
9: "Preotul să ia din darul de cereale partea de aducere-aminte și să o ardă pe altar ca jertfă mistuită de foc, o mireasmă plăcută DOMNULUI.",
10: "Ce rămâne din darul de cereale să fie al lui Aaron și al fiilor lui; este o parte preasfântă din jertfele mistuite de foc ale DOMNULUI.",
11: "Niciun dar de cereale pe care îl aduceți DOMNULUI să nu fie pregătit cu aluat dospit, căci nu trebuie să ardeți pe altar nici aluat dospit, nici miere ca jertfă mistuită de foc pentru DOMNUL.",
12: "Le puteți aduce DOMNULUI ca dar din primele roade, dar să nu fie înălțate pe altar ca mireasmă plăcută.",
13: "Să sărezi cu sare fiecare dar de cereale. Să nu lași să lipsească din darul tău de cereale sarea legământului Dumnezeului tău. Împreună cu toate darurile tale să aduci sare.",
14: "Dacă aduci DOMNULUI un dar de cereale din primele roade, să aduci spice proaspete prăjite la foc, boabe zdrobite din grâne noi.",
15: "Să torni ulei peste el și să pui tămâie peste el; este un dar de cereale.",
16: "Preotul să ardă ca aducere-aminte o parte din boabele zdrobite și din ulei, împreună cu toată tămâia; este o jertfă mistuită de foc pentru DOMNUL.”",
}

for path in sorted(DATA.glob("LEV.*.json")):
    data = json.loads(path.read_text(encoding="utf-8"))
    chapter = data["chapter"]
    for verse in data["verses"]:
        text = verse["text"]
        for old, new in [
            ("DOMNULui", "DOMNULUI"),
            ("DOMNULUi", "DOMNULUI"),
            ("darurilor de mâncare", "darurilor de cereale"),
            ("darului de mâncare", "darului de cereale"),
            ("darul de mâncare", "darul de cereale"),
            ("daruri de mâncare", "daruri de cereale"),
            ("dar de mâncare", "dar de cereale"),
        ]:
            text = text.replace(old, new)
        verse["text"] = unicodedata.normalize("NFC", text)
        if chapter == 2:
            verse["text"] = LEV2[verse["number"]]
    for note in data.get("editorialNotes", []):
        if note.get("term") == "minhah" or "dar de mâncare" in str(note.get("decision", "")):
            note["decision"] = str(note.get("decision", "dar de cereale")).replace("dar de mâncare", "dar de cereale")
    full = " ".join(v["text"] for v in data["verses"])
    opens, closes = full.count("„"), full.count("”")
    if opens == closes + 1:
        data["verses"][-1]["text"] += "”"
    elif opens != closes:
        raise SystemExit(f"{path.name}: ghilimele dezechilibrate {opens}/{closes}")
    raw = json.dumps(data, ensure_ascii=False, indent=2) + "\n"
    path.write_text(unicodedata.normalize("NFC", raw), encoding="utf-8")

for path in sorted(DATA.glob("LEV.*.json")):
    data = json.loads(path.read_text(encoding="utf-8"))
    for verse in data["verses"]:
        text = verse["text"]
        banned = [
            "o dar de", "este o dar", "DOMNULui", "DOMNULUi",
            "jertfă de ardere de tot", "jertfa de ardere de tot",
            "The LORD", "the LORD", "text revizuit în limba română",
            " să pleceing", "ghepardul de zid",
        ]
        hits = [token for token in banned if token in text]
        if hits:
            raise SystemExit(f"{path.name}:{verse['number']}: formulări interzise {hits}: {text}")
    full = " ".join(v["text"] for v in data["verses"])
    if full.count("„") != full.count("”"):
        raise SystemExit(f"{path.name}: ghilimele încă dezechilibrate")

print("Leviticul: acorduri, terminologie, ghilimele și contaminare verificate.")
