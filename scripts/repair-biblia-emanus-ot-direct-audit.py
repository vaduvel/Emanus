#!/usr/bin/env python3
"""Apply source-confirmed OT repairs from the direct WLC/WEBU audit.

Every repair asserts the inherited verse before writing. This makes the pass
safe to rerun and prevents a later text change from receiving a stale repair.
"""

from __future__ import annotations

import hashlib
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs" / "data" / "biblia-emanus"
REPORT = ROOT / "docs" / "biblia-emanus" / "OT-DIRECT-AUDIT-REPAIRS.json"

REPAIRS: dict[str, tuple[str, str, str]] = {
    "DEU.3.11": (
        "(Căci numai Og, împăratul Basanului, mai rămăsese din restul refaimiților. Iată, patul lui de fier este la Raba fiilor lui Amon. Lungimea lui este de douăzeci de coți, iar lățimea de opt coți, după cotul unui om.)",
        "(Căci numai Og, împăratul Basanului, mai rămăsese din restul refaimiților. Iată, patul lui este un pat de fier. Nu se află el la Raba fiilor lui Amon? Lungimea lui este de nouă coți, iar lățimea de patru coți, după cotul unui om.)",
        "Întrebarea negativă și numerele nouă/patru sunt explicite în WLC și WEBU.",
    ),
    "NUM.9.1": (
        "DOMNUL i-a vorbit lui Moise în pustia Sinai, în primul an de la ieșirea lor din țara Egiptului, în luna întâi, spunând:",
        "DOMNUL i-a vorbit lui Moise în pustia Sinai, în luna întâi a celui de-al doilea an de la ieșirea lor din țara Egiptului, spunând:",
        "Anul este al doilea, iar luna este întâi; ordinea anterioară schimba ordinalul.",
    ),
    "NUM.10.21": (
        "Au pornit chehatiții purtând Sfântul Lăcaș; iar celelalte lucruri ale Cortului se ridicau până la sosirea lor.",
        "Au pornit chehatiții, purtând Sfântul Lăcaș; iar ceilalți au ridicat Cortul înainte de sosirea lor.",
        "Verbul ebraic activ are ca obiect Cortul; subiectul nu este Cortul însuși.",
    ),
    "JOB.1.5": (
        "Și, după ce treceau zilele de ospăț, Iov chema și sfințea pe fiii săi: se scula dis-de-dimineață și aducea pentru fiecare din ei câte o ardere de tot. Căci zicea Iov: „Poate că fiii mei au păcătuit și au supărat pe Dumnezeu în inima lor.”",
        "Și, după ce treceau zilele de ospăț, Iov chema și sfințea pe fiii săi: se scula dis-de-dimineață și aducea pentru fiecare din ei câte o ardere de tot. Căci zicea Iov: „Poate că fiii mei au păcătuit și au supărat pe Dumnezeu în inima lor.” Așa făcea Iov întotdeauna.",
        "Clauza finală afirmă continuitatea practicii lui Iov.",
    ),
    "JOB.1.12": (
        "DOMNUL a zis Satanei: „Iată, îți dau pe mână tot ce are, numai asupra lui să nu întinzi mâna.”",
        "DOMNUL a zis Satanei: „Iată, îți dau pe mână tot ce are, numai asupra lui să nu întinzi mâna.” Atunci Satana a ieșit dinaintea DOMNULUI.",
        "Ieșirea Satanei dinaintea DOMNULUI fusese omisă.",
    ),
    "JOB.2.10": (
        "Dar Iov i-a răspuns: „Vorbești ca o femeie nebună. Ce! primim de la Dumnezeu binele, și să nu primim și răul?”",
        "Dar Iov i-a răspuns: „Vorbești ca o femeie nebună. Ce! Primim de la Dumnezeu binele, și să nu primim și răul?” În toate acestea, Iov n-a păcătuit cu buzele lui.",
        "Verdictul explicit despre buzele lui Iov fusese omis.",
    ),
    "JOB.4.6": (
        "Nădejdea ta, nu-i neprihănirea ta?",
        "Nu este oare teama ta de Dumnezeu încrederea ta și integritatea căilor tale, nădejdea ta?",
        "Versetul păstrează două întrebări și leagă evlavia de încredere, integritatea de nădejde.",
    ),
    "JOB.9.5": (
        "El mută deodată munții și-i răstoarnă în mânia Sa.",
        "El mută munții fără ca ei să știe și-i răstoarnă în mânia Sa.",
        "Negația despre munți a fost omisă.",
    ),
    "JOB.9.13": (
        "Dumnezeu nu-Și întoarce mânia; sub El se pleacă toți sprijinitorii mândriei.",
        "Dumnezeu nu-Și întoarce mânia; sub El se pleacă ajutoarele lui Rahav.",
        "Numele Rahav nu trebuie înlocuit cu o abstracție editorială.",
    ),
    "JOB.10.21": (
        "înainte de a mă duce, ca să nu mă mai întorc,",
        "înainte de a mă duce, ca să nu mă mai întorc, în țara întunericului și a umbrei morții;",
        "Destinația explicită a plecării fusese omisă.",
    ),
    "JOB.11.6": (
        "și de ți-ar descoperi tainele înțelepciunii Lui, ale înțelepciunii Lui nemărginite, ai vedea atunci că nu-ți răsplătește totuși după fărădelegea ta.",
        "și de ți-ar descoperi tainele înțelepciunii, căci înțelepciunea adevărată are două laturi! Să știi, dar, că Dumnezeu îți cere mai puțin decât merită fărădelegea ta.",
        "Construcția ebraică păstrează dubla latură a înțelepciunii și concluzia despre fărădelege.",
    ),
    "JOB.15.31": (
        "Dacă se încrede în rău, se înșală, căci răul îi va fi răsplata.",
        "Să nu se încreadă în deșertăciune, înșelându-se, căci deșertăciunea îi va fi răsplata.",
        "Prohibitivul și obiectul deșertăciunii au fost schimbate.",
    ),
    "JOB.26.12": (
        "Prin puterea Lui tulbură marea, prin priceperea Lui îi sfărâmă furia.",
        "Prin puterea Lui stârnește marea, iar prin priceperea Lui îl zdrobește pe Rahav.",
        "Rahav este numit explicit în a doua propoziție.",
    ),
    "JOB.31.40": (
        "„atunci să crească spini din el în loc de grâu, și neghină în loc de orz!”",
        "„atunci să crească spini din el în loc de grâu, și neghină în loc de orz!” Aici se sfârșesc cuvintele lui Iov.",
        "Colofonul explicit al cuvintelor lui Iov fusese omis.",
    ),
    "JOB.32.2": (
        "Atunci s-a aprins de mânie Elihu, fiul lui Baracheel din Buz, din familia lui Ram. El s-a aprins de mânie împotriva lui Iov, pentru că zicea că este fără vină înaintea lui Dumnezeu.",
        "Atunci s-a aprins de mânie Elihu, fiul lui Baracheel din Buz, din familia lui Ram. Mânia lui s-a aprins împotriva lui Iov, pentru că se îndreptățea pe sine mai mult decât pe Dumnezeu.",
        "Comparativul față de Dumnezeu fusese redus la o afirmație diferită.",
    ),
    "JOB.33.23": (
        "Dar dacă se găsește un înger mijlocitor pentru el, unul din miile acelea care vestesc omului calea pe care trebuie s-o urmeze,",
        "Dar dacă se găsește lângă el un înger, un mijlocitor, unul dintr-o mie, ca să-i arate omului ce este drept pentru el,",
        "Numărul este unul dintr-o mie și mesajul este ceea ce este drept.",
    ),
    "JOB.36.21": (
        "Ferește-te să faci rău, căci suferința te îndeamnă la rău.",
        "Păzește-te, nu te întoarce spre nelegiuire, căci pe aceasta ai ales-o mai degrabă decât suferința.",
        "Sursa afirmă alegerea nelegiuirii, nu că suferința o produce.",
    ),
    "PSA.10.15": (
        "Zdrobește brațul celui rău, pedepsește-i fărădelegile, ca să piară din ochii Tăi!",
        "Zdrobește brațul celui rău; cercetează răutatea celui nelegiuit până când nu mai găsești nimic.",
        "A doua cerere este despre cercetarea răutății, nu o formulare editorială de pedeapsă.",
    ),
    "PSA.22.21": (
        "Scapă-mă din gura leului și scoate-mă din coarnele bivolului!",
        "Scapă-mă din gura leului! Da, m-ai izbăvit din coarnele bivolilor.",
        "Al doilea verb este la acțiune împlinită în WLC.",
    ),
    "PSA.32.5": (
        "Atunci Ți-am mărturisit păcatul meu și nu mi-am ascuns fărădelegea. Am zis: „Îmi voi mărturisi DOMNULUI fărădelegile!”",
        "Atunci Ți-am mărturisit păcatul meu și nu mi-am ascuns fărădelegea. Am zis: „Îmi voi mărturisi DOMNULUI fărădelegile!” Și Tu ai iertat vina păcatului meu. – (Oprire)",
        "Iertarea și marca Selah fuseseră omise.",
    ),
    "PSA.50.10": (
        "Căci ale Mele sunt toate dobitoacele pădurilor, toate fiarele munților cu miile lor.",
        "Căci ale Mele sunt toate dobitoacele pădurilor și vitele de pe o mie de dealuri.",
        "Mia califică dealurile, nu numărul fiarelor.",
    ),
    "PSA.64.6": (
        "Pun la cale nelegiuiri și zic: „Iată-ne gata, planul este făcut!”",
        "Pun la cale nelegiuiri și zic: „Iată-ne gata, planul este făcut!” Lăuntrul omului și inima lui sunt adânci.",
        "Clauza despre lăuntrul și inima omului fusese omisă.",
    ),
    "PSA.64.9": (
        "Toți oamenii sunt cuprinși de frică și mărturisesc: „Iată ce a făcut Dumnezeu”",
        "Toți oamenii sunt cuprinși de frică, vestesc lucrarea lui Dumnezeu și cugetă cu înțelepciune la ceea ce a făcut El.",
        "Versetul cere și cugetarea înțeleaptă la lucrarea lui Dumnezeu.",
    ),
    "PSA.74.12": (
        "Totuși, Dumnezeu este Împăratul meu, care din vremuri străvechi dă izbăviri în mijlocul acestei țări.",
        "Totuși, Dumnezeu este Împăratul meu din vremuri străvechi, Cel ce lucrează izbăviri pe tot pământul.",
        "Pământul nu este restrâns la această țară.",
    ),
    "PSA.87.4": (
        "Eu pomenesc Egiptul și Babilonul printre cei ce Mă cunosc; iată, țara filistenilor, Tirul cu Etiopia: „În Sion s-au născut.”",
        "Eu pomenesc Rahav și Babilonul printre cei ce Mă cunosc; iată, țara filistenilor, Tirul cu Etiopia: „În Sion s-au născut.”",
        "Numele Rahav nu este echivalat în textul de bază cu Egiptul.",
    ),
    "PSA.89.10": (
        "Tu ai zdrobit Egiptul ca pe un hoit, ai risipit pe vrăjmașii Tăi prin puterea brațului Tău.",
        "Tu ai zdrobit Rahav ca pe un hoit și ai risipit pe vrăjmașii Tăi prin puterea brațului Tău.",
        "Numele Rahav este explicit în WLC.",
    ),
    "PSA.94.18": (
        "Ori de câte ori zic: „Mi se clatină piciorul!”",
        "Când ziceam: „Mi se clatină piciorul!”, bunătatea Ta, DOAMNE, mă sprijinea.",
        "Sprijinul DOMNULUI era omis.",
    ),
    "PSA.96.10": (
        "Spuneți printre neamuri: „DOMNUL împărățește! De aceea lumea este tare și nu se clatină.”",
        "Spuneți printre neamuri: „DOMNUL împărățește! Lumea este tare și nu se clatină. El va judeca popoarele cu nepărtinire.”",
        "Judecarea popoarelor cu nepărtinire era omisă.",
    ),
    "PSA.119.29": (
        "Depărtează-mă de calea necredincioșiei, către Tine, și dă-mi îndurarea Ta, ca să urmez Legea Ta!",
        "Depărtează de la mine calea minciunii și, prin harul Tău, dă-mi Legea Ta!",
        "Adaosurile editoriale au fost eliminate, păstrând cererea din WLC.",
    ),
    "PRO.3.28": (
        "Nu zice aproapelui tău: „Du-te și vino iarăși; îți voi da mâine!”",
        "Nu zice aproapelui tău: „Du-te și vino iarăși; îți voi da mâine!”, când ai lucrul acela lângă tine.",
        "Condiția finală fusese omisă.",
    ),
    "PRO.22.20": (
        "N-am așternut eu oare în scris pentru tine sfaturi și cugetări,",
        "Nu ți-am scris eu treizeci de cuvinte alese, cu sfaturi și cunoștință,",
        "WEBU și lectura WLC fixată redau numărul treizeci.",
    ),
    "ECC.4.8": (
        "un om este singur singurel, n-are nici fiu, nici frate, și totuși munca lui n-are sfârșit, ochii nu i se satură niciodată de bogății și nu se gândește: „Pentru cine muncesc eu și-mi lipsesc sufletul de plăceri?”",
        "un om este singur singurel, n-are nici fiu, nici frate, și totuși munca lui n-are sfârșit, ochii nu i se satură niciodată de bogății și nu se gândește: „Pentru cine muncesc eu și-mi lipsesc sufletul de plăceri?” Și aceasta este deșertăciune și o îndeletnicire rea.",
        "Concluzia explicită despre deșertăciune fusese omisă.",
    ),
    "ECC.7.10": (
        "Nu zice: „Cum se face că zilele de mai înainte erau mai bune decât acestea?”",
        "Nu zice: „Cum se face că zilele de mai înainte erau mai bune decât acestea?”, căci nu din înțelepciune întrebi despre lucrul acesta.",
        "Motivația finală fusese omisă.",
    ),
    "ECC.7.23": (
        "Toate acestea le-am cercetat cu înțelepciune. Am zis: „Mă voi înțelepți.”",
        "Toate acestea le-am cercetat cu înțelepciune. Am zis: „Mă voi înțelepți”, dar înțelepciunea era departe de mine.",
        "Concluzia despre depărtarea înțelepciunii fusese omisă.",
    ),
}


def digest(verses: list[dict[str, object]]) -> str:
    payload = "\n".join(f"{verse['number']}\t{verse['text']}" for verse in verses)
    return "sha256:" + hashlib.sha256(payload.encode("utf-8")).hexdigest()


def main() -> None:
    documents: dict[Path, dict[str, object]] = {}
    changes: list[dict[str, str]] = []
    touched_paths: set[Path] = set()
    mismatches: list[str] = []
    for reference, (expected, replacement, reason) in REPAIRS.items():
        book, chapter, number = reference.split(".")
        path = DATA / f"{book}.{chapter}.json"
        touched_paths.add(path)
        document = documents.setdefault(path, json.loads(path.read_text(encoding="utf-8")))
        verse = next(item for item in document["verses"] if item["number"] == int(number))
        if verse["text"] == replacement:
            continue
        if verse["text"] != expected:
            mismatches.append(reference)
            continue
        verse["text"] = replacement
        changes.append({"reference": reference, "previous": expected, "replacement": replacement, "reason": reason})

    if mismatches:
        raise RuntimeError("textul de bază nu mai corespunde auditului direct: " + ", ".join(mismatches))

    for path in touched_paths:
        document = documents[path]
        audit = document.setdefault("audit", {})
        audit["textDigest"] = digest(document["verses"])
        history = audit.setdefault("repairHistory", [])
        if not any(item.get("id") == "ot-direct-wlc-webu-audit-2026-08-08" for item in history):
            history.append({
                "id": "ot-direct-wlc-webu-audit-2026-08-08",
                "scope": "corecții confirmate direct în WLC/OSHB și WEBU fixate",
                "verseNumbers": sorted(int(reference.split(".")[-1]) for reference in REPAIRS if path.name == ".".join(reference.split(".")[:2]) + ".json"),
            })
        path.write_text(json.dumps(document, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    report_changes = [
        {"reference": reference, "previous": expected, "replacement": replacement, "reason": reason}
        for reference, (expected, replacement, reason) in REPAIRS.items()
    ]
    REPORT.write_text(json.dumps({
        "repairPass": "ot-direct-wlc-webu-audit-2026-08-08",
        "count": len(report_changes),
        "changes": report_changes,
    }, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"changedVerses": [item["reference"] for item in changes]}, ensure_ascii=False))


if __name__ == "__main__":
    main()
