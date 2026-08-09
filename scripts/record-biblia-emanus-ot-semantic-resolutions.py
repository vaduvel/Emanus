#!/usr/bin/env python3
"""Record direct source-review decisions for the current OT screening queue."""

from __future__ import annotations

import hashlib
import json
from datetime import date
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs" / "data" / "biblia-emanus"
SCREENING = DATA / "ot-semantic-screening.jsonl"
OUTPUT = DATA / "ot-semantic-review-resolutions.jsonl"

RATIONALES = {
    "1CH.1.12": "Lista etnonimelor și propoziția despre originea filistenilor corespund integral WLC/OSHB și WEBU.",
    "JOB.37.8": "Animalul intră în ascunzătoare și rămâne în vizuină; cele două acțiuni ebraice sunt păstrate.",
    "PSA.107.37": "Textul reparat păstrează semănarea, plantarea și producerea rodului îmbelșugat, fără recoltarea adăugată anterior.",
    "GEN.5.18": "Numele Iared și Enoh, numărul 162 și relația de paternitate sunt toate păstrate.",
    "EZK.45.10": "Cumpăna, efa și batul sunt enumerate separat și toate trei sunt calificate drept drepte.",
    "JOB.21.10": "Vigoarea taurului, fătarea vacii și absența avortului spontan sunt păstrate fără inversări.",
    "PSA.78.46": "Holdele, rodul muncii și cele două insecte devoratoare sunt păstrate în paralelismul versetului.",
    "DEU.17.4": "Textul reparat păstrează informarea, auzirea, cercetarea atentă și condiția că fapta este certă.",
    "NUM.33.29": "Plecarea din Mitca și tăbărârea la Hașmona corespund exact itinerarului ebraic.",
    "1CH.24.29": "Chis și Ierahmeel sunt păstrați în aceeași relație genealogică din textul ebraic.",
    "DAN.5.27": "Cântărirea în cumpănă și verdictul de lipsă sunt ambele prezente; formula aramaică este explicată.",
    "PSA.119.15": "Meditarea la porunci și contemplarea cărărilor lui Dumnezeu sunt păstrate ca două acțiuni distincte.",
    "1CH.26.23": "Cele patru clanuri levitice sunt prezente în ordinea WLC/OSHB, fără omisiuni.",
    "NEH.10.12": "Cele trei nume din lista de semnatari sunt transliterate și ordonate conform sursei.",
    "EXO.25.14": "Drugii, verigile, laturile chivotului și scopul purtării chivotului sunt toate explicite.",
    "NEH.11.26": "Ieșua, Molada și Bet-Palet sunt păstrate în ordinea și funcția listei geografice.",
    "PRO.14.18": "Nebunia moștenită de cei simpli contrastează corect cu știința celor chibzuiți.",
    "ZEC.4.3": "Cei doi măslini și pozițiile lor la dreapta și la stânga vasului sunt păstrate complet.",
    "PSA.36.8": "Belșugul Casei și șuvoiul desfătărilor sunt păstrate în cele două imagini poetice ebraice.",
    "EXO.37.5": "Drugii introduși în verigi pentru purtarea chivotului corespund integral sursei.",
    "NUM.28.30": "Țapul unic și scopul ispășirii pentru popor sunt păstrate fără adaosuri.",
    "LEV.14.56": "Umflătura, erupția și pata sunt toate prezente în enumerarea afecțiunilor.",
    "GEN.15.19": "Cheniții, cheniziții și cadmoniții sunt păstrați în ordinea listei ebraice.",
    "2CH.5.8": "Aripile heruvimilor acoperă locul, chivotul și drugii deasupra, conform sursei.",
    "DEU.28.17": "Coșul și covata sunt ambele prezente și sunt supuse aceluiași blestem.",
    "LEV.11.17": "Cele trei păsări sunt păstrate; scorul mic provine din identificările zoologice și nu din omisiune.",
    "PRO.14.4": "Ieslea goală fără boi contrastează corect cu belșugul produs prin puterea boului.",
    "PSA.12.7": "Păzirea și apărarea de generația prezentă sunt păstrate, inclusiv durata veșnică.",
    "GEN.5.25": "Metusala, cei 187 de ani și nașterea lui Lameh sunt toate păstrate.",
    "1CH.1.14": "Iebusiții, amoriții și ghirgasiții sunt păstrați în ordinea textului ebraic.",
    "PSA.119.96": "Limita oricărei desăvârșiri contrastează corect cu întinderea fără margini a poruncii.",
    "GEN.5.23": "Totalul de 365 de ani al vieții lui Enoh este redat fără schimbarea numărului.",
    "LEV.11.14": "Gaia și șoimul după soiurile lui păstrează cele două categorii și clasificarea pe soiuri.",
    "PRO.8.9": "Claritatea cuvintelor pentru cel priceput și dreptatea lor pentru cei cunoscători sunt păstrate.",
    "NUM.33.17": "Plecarea din Chibrot-Hataava și tăbărârea la Hațerot corespund itinerarului.",
    "PSA.22.5": "Strigătul, izbăvirea, încrederea și absența rușinii sunt toate păstrate.",
    "JOB.32.22": "Incapacitatea de a linguși și consecința din partea Ziditorului sunt păstrate în relație cauzală.",
    "1KI.8.7": "Aripile heruvimilor acoperă locul chivotului, chivotul și drugii lui, fără omisiuni.",
    "PRO.24.6": "Călăuzirea chibzuită în luptă și biruința prin mulți sfetnici sunt păstrate.",
    "JOB.41.29": "Ghioaga socotită pai și râsul la vuietul suliței păstrează ambele imagini ebraice.",
    "NEH.12.11": "Succesiunea Ioiada, Ionatan și Iadua este păstrată fără schimbarea relațiilor genealogice.",
    "JER.10.15": "Nimicnicia, lucrarea înșelătoare, pedeapsa și pieirea sunt toate prezente.",
    "NEH.12.10": "Succesiunea Iosua, Ioiachim, Eliașib și Ioiada este completă și în ordinea sursei.",
    "PSA.89.31": "Încălcarea orânduirilor și nepăzirea poruncilor sunt păstrate ca două condiții paralele.",
    "NUM.33.34": "Plecarea din Iotbata și tăbărârea la Abrona corespund exact itinerarului.",
    "PSA.83.5": "Unitatea sfatului și încheierea legământului împotriva lui Dumnezeu sunt păstrate.",
    "PSA.71.1": "Refugiul în DOMNUL și cererea de a nu rămâne de rușine sunt păstrate, inclusiv durata.",
}

CORRECTED = {"LEV.11.17", "DEU.17.4", "JOB.41.29", "PSA.107.37"}


def sha256(path: Path) -> str:
    return "sha256:" + hashlib.sha256(path.read_bytes()).hexdigest()


def main() -> None:
    records = [json.loads(line) for line in SCREENING.read_text(encoding="utf-8").splitlines()]
    queue = [record for record in records if record["classification"] == "review"]
    references = {record["reference"] for record in queue}
    if references != set(RATIONALES):
        missing = sorted(references - set(RATIONALES))
        stale = sorted(set(RATIONALES) - references)
        raise SystemExit(f"Coada semantică s-a schimbat; lipsă={missing}, stale={stale}")

    decisions = []
    for record in queue:
        reference = record["reference"]
        decisions.append({
            "reference": reference,
            "screeningBindingSha256": record["bindingSha256"],
            "screeningScore": record["webuSimilarity"],
            "decision": "approved-after-direct-source-review",
            "outcome": "corrected-and-rechecked" if reference in CORRECTED else "source-aligned",
            "rationale": f"{reference}: {RATIONALES[reference]}",
        })

    artifact = {
        "schemaVersion": 1,
        "recordType": "ot-semantic-review-resolutions",
        "generatedAt": date.today().isoformat(),
        "screeningArtifactSha256": sha256(SCREENING),
        "review": {
            "reviewerId": "codex-direct-source-review-2026-08-09",
            "method": "direct-romanian-wlc-oshb-webu-side-by-side-review",
        },
        "decisions": decisions,
    }
    OUTPUT.write_text(json.dumps(artifact, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"resolved": len(decisions), "corrected": len(CORRECTED)}, sort_keys=True))


if __name__ == "__main__":
    main()
