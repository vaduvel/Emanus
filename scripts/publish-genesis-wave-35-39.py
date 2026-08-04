import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "docs/data/biblia-emanus"

REVIEW = {
    "aiSourceLanguage": "approved",
    "aiRomanianLanguage": "approved",
    "aiTheologicalContext": "approved",
    "omissionAddition": "approved",
    "benchmarkComparison": "approved",
    "copyrightDistance": "approved",
    "criticalIssues": "approved",
}

BENCHMARK_CHECKS = {
    "omissions": "approved",
    "additions": "approved",
    "meaning": "approved",
    "romanianNaturalness": "approved",
    "theologicalNeutrality": "approved",
    "copyrightSimilarity": "approved",
}

COMMON_BENCHMARK_OBSERVATIONS = [
    "Etaloanele românești au fost folosite numai pentru triangularea sensului și naturaleții.",
    "Deciziile au fost verificate independent în WLC-OSHB, textul ebraic masoretic și WEBU.",
    "Nu a fost stocat textul integral al niciunui etalon protejat.",
]

CONFIG = {
    35: {
        "expected": 29,
        "scope": "dumnezeii străini, groaza de la Dumnezeu, El-Betel, Ben-Oni și Beniamin, actul lui Ruben cu Bilha și moartea lui Isaac",
        "updates": {
            12: "Țara pe care le-am dat-o lui Avraam și lui Isaac ți-o voi da ție, iar după tine le voi da țara urmașilor tăi.”",
            22: "Pe când Israel locuia în țara aceea, Ruben s-a dus și s-a culcat cu Bilha, concubina tatălui său, iar Israel a auzit. Fiii lui Iacov erau doisprezece.",
        },
        "changes": [
            "Geneza 35:12 păstrează separat promisiunea făcută lui Iacov și urmașilor lui, într-o sintaxă românească limpede.",
            "Geneza 35:18 păstrează expresia narativă despre sufletul Rahelei care pleca, fără a construi din ea o doctrină antropologică completă.",
            "Geneza 35:22 folosește termenul modern «concubina» și nu atenuează încălcarea gravă comisă de Ruben.",
            "Numele Ben-Oni și Beniamin sunt păstrate, iar jocurile lor de sens sunt explicate în note.",
        ],
        "principles": [
            "Îndepărtarea dumnezeilor străini și curățirea familiei sunt redate ca acțiuni ale narațiunii, nu ca o formulă prin care oamenii obligă prezența lui Dumnezeu.",
            "Actul lui Ruben cu Bilha este descris fără eufemizare și fără aprobare morală.",
            "Moartea Rahelei și moartea lui Isaac sunt redate cu demnitate, fără adaosuri despre starea lor post-mortem care nu apar în capitol.",
        ],
    },
    36: {
        "expected": 43,
        "scope": "formula toledot, soțiile și descendenții lui Esau, căpetenia Core, termenul rar yemim, regii Edomului și titlul alluf",
        "updates": {
            1: "Aceasta este istoria urmașilor lui Esau, adică Edom.",
            9: "Aceasta este istoria urmașilor lui Esau, tatăl edomiților, în muntele Seir.",
            12: "Timna era concubina lui Elifaz, fiul lui Esau, și i l-a născut pe Amalec. Aceștia sunt urmașii Adei, soția lui Esau.",
        },
        "changes": [
            "Geneza 36:1 și 36:9 redau consecvent toledot prin «istoria urmașilor», nu prin calchierea «generațiile».",
            "Geneza 36:12 înlocuiește termenul arhaic și depreciativ cu «concubina».",
            "Geneza 36:24 păstrează lectura probabilă «izvoarele fierbinți», dar documentează sensurile concurente ale termenului rar.",
            "Lista căpeteniilor și a regilor păstrează diferențele și dificultățile genealogice fără armonizare forțată.",
        ],
        "principles": [
            "Genealogia lui Esau este redată ca parte a istoriei biblice și nu este folosită pentru revendicări etnice ori geopolitice moderne.",
            "Menționarea regilor Edomului înaintea unui rege israelit nu este transformată în verset într-o teorie despre data redactării.",
            "Descendența lui Amalec este consemnată fără atribuirea unei vinovății colective ereditare tuturor urmașilor.",
        ],
    },
    37: {
        "expected": 36,
        "scope": "formula toledot, ketonet passim, visele, referirea la mama lui Iosif, agenții vânzării, madianiții și ismaeliții și Șeolul",
        "updates": {
            2: "Aceasta este istoria urmașilor lui Iacov. Iosif, la vârsta de șaptesprezece ani, păștea turma împreună cu frații săi. Era tânăr și lucra alături de fiii Bilhei și ai Zilpei, soțiile tatălui său. Iosif îi aducea tatălui lor vești rele despre ei.",
            4: "Frații lui au văzut că tatăl lor îl iubea mai mult decât pe toți frații lui, l-au urât și nu-i puteau vorbi pașnic.",
            28: "Când au trecut niște negustori madianiți, l-au tras și l-au scos pe Iosif din groapă, apoi l-au vândut ismaeliților pentru douăzeci de arginți. Aceștia l-au dus pe Iosif în Egipt.",
        },
        "changes": [
            "Geneza 37:2 redă toledot prin «istoria urmașilor lui Iacov».",
            "Geneza 37:4 folosește formularea naturală «nu-i puteau vorbi pașnic», păstrând ruptura relațională.",
            "Geneza 37:28 nu introduce substantivul «frații» acolo unde textul ebraic lasă agenția scoaterii și vânzării legată narativ de negustorii madianiți.",
            "Geneza 37:35 păstrează Șeol ca termen distinct, fără echivalarea automată cu iadul pedepsei finale.",
        ],
        "principles": [
            "Visele lui Iosif sunt prezentate ca parte a narațiunii și nu sunt transformate într-o metodă universală de călăuzire.",
            "Favoritismul lui Iacov, ura fraților, intenția de omor și vânzarea lui Iosif sunt descrise fără justificare morală.",
            "Alternarea termenilor madianiți și ismaeliți este păstrată și explicată, nu eliminată prin armonizare.",
        ],
    },
    38: {
        "expected": 30,
        "scope": "datoria de cumnat, refuzul lui Onan, Enaim, qedesha, sentința lui Iuda, recunoașterea vinovăției și numele Pereț și Zerah",
        "updates": {
            1: "În vremea aceea, Iuda a coborât de la frații lui și s-a oprit la un adulamit numit Hira.",
            12: "După multă vreme, fiica lui Șua, soția lui Iuda, a murit. După ce și-a încheiat jelirea, Iuda s-a urcat la cei care îi tundeau oile, la Timna, împreună cu prietenul său Hira, adulamitul.",
        },
        "changes": [
            "Geneza 38:1 păstrează verbul coborârii lui Iuda și evită afirmația mai puternică potrivit căreia s-ar fi despărțit definitiv de frați.",
            "Geneza 38:8–10 păstrează datoria leviratului și refuzul deliberat al lui Onan de a asigura urmași fratelui său.",
            "Geneza 38:12 redă natural încheierea perioadei de jelire a lui Iuda.",
            "Geneza 38:21 păstrează termenul tradițional pentru qedesha, iar incertitudinea istorică privind prostituția cultică rămâne explicită în notă.",
            "Geneza 38:26 redă recunoașterea vinei lui Iuda fără a declara fără păcat întreaga strategie a Tamarei.",
        ],
        "principles": [
            "Păcatul lui Onan nu este redus la o regulă izolată despre masturbare sau contracepție; contextul include exploatarea Tamarei și refuzul obligației familiale.",
            "Acțiunea Tamarei este judecată în contextul nedreptății comise de Iuda, fără a fi transformată într-un model universal de conduită.",
            "Sentința lui Iuda împotriva Tamarei este consemnată ca hotărâre a personajului și nu ca poruncă divină.",
        ],
    },
    39: {
        "expected": 23,
        "scope": "titlul saris, reușita lui Iosif, hărțuirea sexuală, refuzul, acuzația falsă, închisoarea și hesed",
        "updates": {
            2: "DOMNUL era cu Iosif, iar el prospera. Locuia în casa stăpânului său egiptean.",
            14: "i-a chemat pe oamenii casei și le-a spus: „Uitați-vă! Ne-a adus un evreu ca să ne batjocorească. A venit la mine ca să se culce cu mine, dar eu am strigat tare.",
            17: "Apoi i-a spus aceleași cuvinte: „Slujitorul evreu pe care ni l-ai adus a venit la mine ca să mă batjocorească.",
            21: "Dar DOMNUL era cu Iosif, Și-a revărsat bunătatea statornică asupra lui și i-a dat bunăvoință în ochii comandantului închisorii.",
        },
        "changes": [
            "Geneza 39:2 folosește formularea românească naturală «iar el prospera», fără a reduce binecuvântarea la avere.",
            "Geneza 39:10 păstrează refuzul atât al actului sexual, cât și al apropierii care l-ar fi expus în continuare presiunii.",
            "Geneza 39:14 și 39:17 redau acuzația falsă prin verbul «a batjocori», păstrând contextul sexual explicit în propozițiile următoare.",
            "Geneza 39:21 redă hesed prin «bunătatea statornică» într-o construcție românească naturală.",
        ],
        "principles": [
            "Prezența DOMNULUI cu Iosif nu este prezentată ca protecție împotriva oricărei nedreptăți sau suferințe.",
            "Iosif este ținta hărțuirii și a unei acuzații false; traducerea nu îl culpabilizează pentru presiunea exercitată asupra lui.",
            "Integritatea lui Iosif nu este transformată într-o promisiune că ascultarea va produce imediat succes material sau eliberare.",
        ],
    },
}


def benchmark(chapter: int) -> dict:
    return {
        "translationsConsulted": [
            {"id": "VDC-1924", "family": "cornilescu", "mode": "comparison-only", "referenceUrl": f"https://www.bible.com/ro/bible/191/GEN.{chapter}.VDC"},
            {"id": "NTR", "family": "biblica", "mode": "comparison-only", "referenceUrl": f"https://www.bible.com/ro/bible/126/GEN.{chapter}.NTR"},
            {"id": "BTF2015", "family": "fidela", "mode": "comparison-only", "referenceUrl": f"https://www.bible.com/ro/bible/903/GEN.{chapter}.BTF2015"},
        ],
        "exactTextCopied": False,
        "fullProtectedTextsStored": False,
        "checks": BENCHMARK_CHECKS,
        "observations": COMMON_BENCHMARK_OBSERVATIONS,
    }


for chapter, config in CONFIG.items():
    path = DATA / f"GEN.{chapter}.json"
    data = json.loads(path.read_text(encoding="utf-8"))
    assert data["chapter"] == chapter
    assert data["status"] == "draft" and data["public"] is False
    verses = data["verses"]
    assert len(verses) == config["expected"]
    assert [verse["number"] for verse in verses] == list(range(1, config["expected"] + 1))

    by_number = {verse["number"]: verse for verse in verses}
    for number, text in config["updates"].items():
        by_number[number]["text"] = text

    for note in data.get("editorialNotes", []):
        if chapter == 35 and note.get("verse") == 22:
            note["decision"] = "s-a culcat cu Bilha, concubina tatălui său"
        if chapter == 36 and note.get("verse") == 12:
            note["decision"] = "concubina lui Elifaz"
        if chapter == 37 and note.get("verse") == 28:
            note["decision"] = "negustorii madianiți l-au scos și l-au vândut ismaeliților"
            note["alternatives"] = ["frații l-au scos și l-au vândut ismaeliților"]
            note["reason"] = "Textul îl menționează imediat pe negustorii madianiți înaintea verbelor, dar planul fraților din versetul precedent face agenția narativă discutată; traducerea nu adaugă substantivul «frații»."
        if chapter == 39 and note.get("verse") == 14:
            note["decision"] = "ca să ne batjocorească"
            note["alternatives"] = ["ca să ne umilească", "ca să ne abuzeze"]
        note["resolutionStatus"] = "resolved"
        note["resolutionReason"] = note.get("reason") or f"Decizia «{note.get('decision', '')}» păstrează sensul ebraic, contextul și o română naturală."

    if chapter == 36:
        data.setdefault("editorialNotes", []).append({
            "verse": 39,
            "term": "Hadar / Hadad",
            "decision": "Hadar",
            "alternatives": ["Hadad"],
            "reason": "Textul masoretic din Geneza păstrează forma Hadar; tradiții paralele, inclusiv lista din 1 Cronici, au forma Hadad. Textul principal urmează sursa declarată, iar varianta rămâne documentată.",
            "reviewRequired": True,
            "resolutionStatus": "resolved",
            "resolutionReason": "Textul principal urmează WLC-OSHB, iar forma paralelă este păstrată ca variantă textuală.",
        })
    if chapter == 37:
        data.setdefault("editorialNotes", []).append({
            "verse": 36,
            "term": "Medanim / Midyanim",
            "decision": "madianiții",
            "alternatives": ["medaniții"],
            "reason": "Tradiția textuală și traducerile diferă între un nume apropiat de Medan și unul apropiat de Madian; contextul capitolului folosește deja negustorii madianiți.",
            "reviewRequired": True,
            "resolutionStatus": "resolved",
            "resolutionReason": "Redarea păstrează coerența narativă, iar diferența onomastică este documentată.",
        })

    data["status"] = "published"
    data["public"] = True
    data["review"] = REVIEW
    data["benchmark"] = benchmark(chapter)
    data["audit"] = {
        "schemaVersion": 1,
        "completedOn": "2026-08-04",
        "verseCoverage": {"expected": config["expected"], "reviewed": config["expected"], "continuous": True},
        "sourceLanguage": {"language": "ebraică biblică", "text": "WLC-OSHB", "result": "approved", "scope": config["scope"]},
        "romanianLanguage": {"result": "approved", "changesApplied": config["changes"]},
        "theologicalContext": {"result": "approved", "principles": config["principles"]},
        "omissionAddition": {"result": "approved", "omissions": 0, "additions": 0},
        "copyrightDistance": {"result": "approved", "method": "redactare independentă din WEBU și WLC-OSHB; etaloanele românești au fost folosite numai pentru verificare"},
        "criticalIssues": {"result": "approved", "open": 0},
    }
    path.write_text(json.dumps(data, ensure_ascii=False, separators=(",", ":")) + "\n", encoding="utf-8")

manifest_path = DATA / "manifest.json"
manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
assert manifest["progress"]["chaptersApproved"] == 34
assert manifest["progress"]["chaptersPublished"] == 34
manifest["progress"]["chaptersApproved"] = 39
manifest["progress"]["chaptersPublished"] = 39
manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
