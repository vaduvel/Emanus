#!/usr/bin/env python3
"""Apply source-confirmed WLC/WEBU repairs for the Minor Prophets.

Each replacement is guarded by the inherited text.  A changed source document
therefore fails closed instead of being silently overwritten by this audit.
"""

from __future__ import annotations

import hashlib
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs" / "data" / "biblia-emanus"
REPORT = ROOT / "docs" / "biblia-emanus" / "OT-MINOR-PROPHETS-DIRECT-AUDIT-REPAIRS.json"
AUDIT_ID = "ot-minor-prophets-wlc-webu-audit-2026-08-08"

REPAIRS: dict[str, tuple[str, str, str]] = {
    "HOS.2.12": (
        "Îi voi pustii și viile și smochinii, despre care zicea: „Aceasta este plata pe care mi-au dat-o ibovnicii mei!”",
        "Îi voi pustii și viile și smochinii, despre care zicea: „Aceasta este plata pe care mi-au dat-o ibovnicii mei!” Le voi preface într-o pădure, și fiarele câmpului le vor mânca.",
        "WLC și WEBU adaugă pădurea și fiarele câmpului.",
    ),
    "HOS.9.13": (
        "„Efraim, după cum văd, își dă copiii la pradă; și Efraim își va duce singur copiii la cel ce-i va ucide!”",
        "L-am văzut pe Efraim ca pe Tir, sădit într-un loc plăcut; dar Efraim își va duce copiii la ucigaș.",
        "Textul fixat îl compară pe Efraim cu Tirul și păstrează locul plăcut.",
    ),
    "JON.1.7": (
        "Și au zis unul către altul: „Veniți să tragem la sorți, ca să știm din pricina cui a venit peste noi nenorocirea aceasta!”",
        "Și au zis unul către altul: „Veniți să tragem la sorți, ca să știm din pricina cui a venit peste noi nenorocirea aceasta!” Au tras la sorți, și sorțul a căzut pe Iona.",
        "Rezultatul sorților este explicit în WLC și WEBU.",
    ),
    "MIC.2.7": (
        "„Este DOMNUL atât de grabnic la mânie, casa lui Iacov? Acesta este felul Lui de a lucra?”",
        "„Este DOMNUL atât de grabnic la mânie, casa lui Iacov? Acesta este felul Lui de a lucra? Oare cuvintele Mele nu fac bine celui ce umblă drept?”",
        "Întrebarea finală despre cuvintele DOMNULUI fusese omisă.",
    ),
    "MIC.2.11": (
        "Da, dacă ar veni un om cu vânt și minciuni și ar zice: „Îți voi proroci despre vin și despre băuturi tari!”",
        "Da, dacă ar veni un om cu vânt și minciuni și ar zice: „Îți voi proroci despre vin și despre băuturi tari!”, acela ar fi prorocul acestui popor.",
        "Concluzia despre prorocul acestui popor este în WLC și WEBU.",
    ),
    "MIC.4.2": (
        "Neamurile se vor duce cu grămada la el și vor zice: „Veniți, haidem să ne suim la muntele DOMNULUI, la Casa Dumnezeului lui Iacov, ca să ne învețe căile Lui și să umblăm pe cărările Lui!”",
        "Neamurile se vor duce cu grămada la el și vor zice: „Veniți, haidem să ne suim la muntele DOMNULUI, la Casa Dumnezeului lui Iacov, ca să ne învețe căile Lui și să umblăm pe cărările Lui!” Căci din Sion va ieși Legea, și din Ierusalim cuvântul DOMNULUI.",
        "Torah din Sion și cuvântul DOMNULUI din Ierusalim sunt explicite.",
    ),
    "NAM.2.8": (
        "Ninive era odinioară ca un iaz plin de apă… Dar, iată-i că fug!… „Stați! Stați! Opriți-vă!…”",
        "Ninive era odinioară ca un iaz plin de apă, dar locuitorii ei fug. „Stați! Stați!”, strigă ei, dar nimeni nu se uită înapoi.",
        "WLC are două imperative, nu trei, și afirmă că nimeni nu privește înapoi.",
    ),
    "HAB.3.7": (
        "Văd corturile Etiopiei pline de groază, și se cutremură colibele din țara Madianului.",
        "Am văzut corturile lui Cușan în suferință; colibele țării Madianului se cutremurau.",
        "Numele Cușan nu este echivalat editorial cu Etiopia.",
    ),
    "ZEP.3.7": (
        "Ziceam: „Dacă ai voi măcar să te temi de Mine și să ții seama de mustrare! Nu ți-ar fi nimicită locuința și n-ar veni peste tine toate pedepsele cu care te-am amenințat.”",
        "Ziceam: „Dacă ai voi măcar să te temi de Mine și să ții seama de mustrare! Nu ți-ar fi nimicită locuința și n-ar veni peste tine toate pedepsele cu care te-am amenințat.” Dar ei s-au grăbit să-și strice toate faptele.",
        "Clauza finală despre stricarea faptelor fusese omisă.",
    ),
    "ZEC.1.4": (
        "Nu fiți ca părinții voștri, cărora le vorbeau prorocii de mai înainte, zicând: „Așa vorbește DOMNUL oștirilor: „Întoarceți-vă de la căile voastre cele rele, de la faptele voastre cele rele!””",
        "Nu fiți ca părinții voștri, cărora le vorbeau prorocii de mai înainte, zicând: „Așa vorbește DOMNUL oștirilor: «Întoarceți-vă de la căile voastre cele rele, de la faptele voastre cele rele!»” Dar ei n-au ascultat și n-au luat aminte la Mine, zice DOMNUL.",
        "WLC păstrează două negații: n-au ascultat și n-au luat aminte.",
    ),
    "ZEC.6.7": (
        "Cei roșii au ieșit și ei și au cerut să meargă să cutreiere pământul. Îngerul le-a zis: „Duceți-vă de cutreierați pământul!”",
        "Cei puternici au ieșit și au cerut să meargă să cutreiere pământul. El le-a zis: „Duceți-vă de cutreierați pământul!” Și au cutreierat pământul.",
        "WLC identifică ieșirea celor puternici și consemnează împlinirea poruncii.",
    ),
    "ZEC.11.5": (
        "Căci cei ce le cumpără le taie și nu se simt vinovați. Și cel ce le vinde zice: „Binecuvântat să fie DOMNUL, căci mă îmbogățesc!”",
        "Căci cei ce le cumpără le taie și nu se simt vinovați. Și cel ce le vinde zice: „Binecuvântat să fie DOMNUL, căci mă îmbogățesc!” Iar păstorii lor nu au milă de ele.",
        "Clauza despre păstorii fără milă fusese omisă.",
    ),
    "ZEC.11.7": (
        "Atunci m-am apucat să pasc oile de tăiat, în adevăr cele mai ticăloase din turmă. Am luat două toiege: pe unul l-am numit „Îndurare”, iar pe celălalt l-am numit „Legământ”",
        "Atunci m-am apucat să pasc oile de tăiat, în adevăr cele mai ticăloase din turmă. Am luat două toiege: pe unul l-am numit „Îndurare”, iar pe celălalt l-am numit „Legământ”; și am păscut turma.",
        "Afirmația finală că a păscut turma este explicită în WLC și WEBU.",
    ),
    "MAL.2.11": (
        "Iuda s-a arătat necredincios, și în Iuda și la Ierusalim s-a săvârșit o urâciune; fiindcă Iuda a spurcat ce este închinat DOMNULUI, ce iubește DOMNUL, și s-a unit cu fiica unui dumnezeu străin.",
        "Iuda s-a arătat necredincios, și în Israel și la Ierusalim s-a săvârșit o urâciune; fiindcă Iuda a spurcat ce este închinat DOMNULUI, ce iubește DOMNUL, și s-a unit cu fiica unui dumnezeu străin.",
        "WLC și WEBU spun Israel și Ierusalim, nu Iuda de două ori.",
    ),
    "MAL.3.8": (
        "Se cade să înșele un om pe Dumnezeu cum Mă înșelați voi? Dar voi întrebați: „Cu ce Te-am înșelat?”",
        "Se cade să înșele un om pe Dumnezeu cum Mă înșelați voi? Dar voi întrebați: „Cu ce Te-am înșelat?” Cu zeciuielile și darurile.",
        "Răspunsul despre zeciuieli și daruri fusese omis.",
    ),
    "ZEC.14.5": (
        "Veți fugi atunci în valea munților Mei, căci valea dintre munți se va întinde până la Ațel; și veți fugi cum ați fugit de cutremurul de pământ de pe vremea lui Ozia, împăratul lui Iuda. Și atunci va veni DOMNUL Dumnezeul meu, și toți sfinții, împreună cu El!",
        "Veți fugi atunci în valea munților Mei, căci valea dintre munți se va întinde până la Ațel; și veți fugi cum ați fugit de cutremurul de pământ de pe vremea lui Ozia, împăratul lui Iuda. Și atunci va veni DOMNUL Dumnezeul meu, și toți sfinții, împreună cu Tine!",
        "Pronumele ebraic încheie versetul cu «cu tine», nu «cu El».",
    ),
}


def digest(verses: list[dict[str, object]]) -> str:
    payload = "\n".join(f"{verse['number']}\t{verse['text']}" for verse in verses)
    return "sha256:" + hashlib.sha256(payload.encode("utf-8")).hexdigest()


def main() -> None:
    documents: dict[Path, dict[str, object]] = {}
    changed: list[str] = []
    mismatches: list[str] = []
    for reference, (expected, replacement, _reason) in REPAIRS.items():
        book, chapter, number = reference.split(".")
        path = DATA / f"{book}.{chapter}.json"
        document = documents.setdefault(path, json.loads(path.read_text(encoding="utf-8")))
        verse = next(item for item in document["verses"] if item["number"] == int(number))
        if verse["text"] == replacement:
            continue
        if verse["text"] != expected:
            mismatches.append(reference)
            continue
        verse["text"] = replacement
        changed.append(reference)
    if mismatches:
        raise RuntimeError("textul de bază nu mai corespunde auditului: " + ", ".join(mismatches))

    for path, document in documents.items():
        audit = document.setdefault("audit", {})
        audit["textDigest"] = digest(document["verses"])
        history = audit.setdefault("repairHistory", [])
        if not any(item.get("id") == AUDIT_ID for item in history):
            history.append({
                "id": AUDIT_ID,
                "scope": "corecții confirmate direct în WLC/OSHB și WEBU fixate",
                "verseNumbers": sorted(int(reference.split(".")[-1]) for reference in REPAIRS if path.name == ".".join(reference.split(".")[:2]) + ".json"),
            })
        path.write_text(json.dumps(document, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    REPORT.write_text(json.dumps({
        "repairPass": AUDIT_ID,
        "count": len(REPAIRS),
        "changes": [
            {"reference": reference, "previous": old, "replacement": new, "reason": reason}
            for reference, (old, new, reason) in REPAIRS.items()
        ],
    }, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"changedVerses": changed}, ensure_ascii=False))


if __name__ == "__main__":
    main()
