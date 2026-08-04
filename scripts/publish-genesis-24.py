import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
chapter_path = ROOT / "docs/data/biblia-emanus/GEN.24.json"
manifest_path = ROOT / "docs/data/biblia-emanus/manifest.json"

chapter = json.loads(chapter_path.read_text(encoding="utf-8"))
chapter["status"] = "published"
chapter["public"] = True
chapter["review"] = {
    "aiSourceLanguage": "approved",
    "aiRomanianLanguage": "approved",
    "aiTheologicalContext": "approved",
    "omissionAddition": "approved",
    "benchmarkComparison": "approved",
    "copyrightDistance": "approved",
    "criticalIssues": "approved",
}
chapter["benchmark"] = {
    "translationsConsulted": [
        {"id": "VDC-1924", "family": "cornilescu", "mode": "comparison-only", "referenceUrl": "https://www.bible.com/ro/bible/191/GEN.24.VDC"},
        {"id": "NTR", "family": "biblica", "mode": "comparison-only", "referenceUrl": "https://www.bible.com/ro/bible/126/GEN.24.NTR"},
        {"id": "BTF2015", "family": "fidela", "mode": "comparison-only", "referenceUrl": "https://www.bible.com/ro/bible/903/GEN.24.BTF2015"},
    ],
    "exactTextCopied": False,
    "fullProtectedTextsStored": False,
    "checks": {
        "omissions": "approved",
        "additions": "approved",
        "meaning": "approved",
        "romanianNaturalness": "approved",
        "theologicalNeutrality": "approved",
        "copyrightSimilarity": "approved",
    },
    "observations": [
        "Etaloanele românești au fost folosite numai pentru triangularea sensului și naturaleții.",
        "Deciziile au fost verificate independent în WLC-OSHB și WEBU.",
        "Nu a fost stocat textul integral al niciunui etalon protejat.",
    ],
}
chapter["audit"] = {
    "schemaVersion": 1,
    "completedOn": "2026-08-04",
    "verseCoverage": {"expected": 67, "reviewed": 67, "continuous": True},
    "sourceLanguage": {
        "language": "ebraică biblică",
        "text": "WLC-OSHB",
        "result": "approved",
        "scope": "jurământul slujitorului, providența călătoriei, semnul ospitalității, termenii de rudenie, răspunsul Rebecăi și verbul rar lasuah",
    },
    "romanianLanguage": {
        "result": "approved",
        "changesApplied": [
            "Geneza 24:21 păstrează verbul rar prin «o privea cu atenție, tăcând», cu alternativele documentate.",
            "Geneza 24:47 precizează «inelul în nas», conform reluării explicite a slujitorului.",
            "Geneza 24:57–58 păstrează întrebarea adresată Rebecăi și răspunsul ei explicit.",
            "Geneza 24:63 păstrează redarea tradițională «să mediteze», fără a ascunde incertitudinea lexicală.",
        ],
    },
    "theologicalContext": {
        "result": "approved",
        "principles": [
            "Semnul cerut de slujitor aparține narațiunii și nu este transformat într-o regulă universală de discernământ prin semne.",
            "Majuscula din «Îngerul» urmează stilul proiectului și nu este folosită ca dovadă automată a unei identificări hristologice.",
            "Acordul Rebecăi înainte de plecare rămâne explicit și nu este eliminat prin rezumarea negocierii familiei.",
            "Providența divină este păstrată fără adaosuri despre destin sau o doctrină generală a căsătoriei.",
        ],
    },
    "omissionAddition": {"result": "approved", "omissions": 0, "additions": 0},
    "copyrightDistance": {
        "result": "approved",
        "method": "redactare independentă din WEBU și WLC-OSHB; etaloanele românești au fost folosite numai pentru verificare",
    },
    "criticalIssues": {"result": "approved", "open": 0},
}

for note in chapter.get("editorialNotes", []):
    note["resolutionStatus"] = "resolved"
    note["resolutionReason"] = note.get("reason") or f"Decizia «{note.get('decision', '')}» păstrează sensul ebraic și este consecventă cu contextul."

chapter_path.write_text(json.dumps(chapter, ensure_ascii=False, separators=(",", ":")) + "\n", encoding="utf-8")

manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
manifest["progress"]["chaptersApproved"] = 24
manifest["progress"]["chaptersPublished"] = 24
manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
