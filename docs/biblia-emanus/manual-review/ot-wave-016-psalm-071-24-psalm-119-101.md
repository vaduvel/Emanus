# Biblia Emanus - revizie manuala VT, valul 16

- Interval ordinal: 15001-16000
- Referinta initiala: PSA.71.24
- Referinta finala: PSA.119.101
- Versete citite integral: 1000
- Versete cu text corectat: 66
- Data reviziei: 2026-08-09
- Metoda: comparatie directa verset cu verset intre romana, WEBU si WLC/OSHB local fixat
- Manifest: `oldTestament.status=in_review`, `oldTestament.public=false`

## Rezultatul reviziei

Am parcurs fiecare verset din interval, nu doar versetele cu scor semantic mic. Corectiile au vizat diferente verificabile de sens, persoane si timpuri verbale schimbate, omisiuni sau adaosuri, imagini poetice deformate si ghilimele dezechilibrate. Nu am schimbat versetele doar pentru preferinte de stil.

Au fost corectate versete din Psalmii 72-119. Exemple de diferente reparate: „puterea lor este tare” nu „trupul incarcat de grasime” (PSA.73.4), leviatanul dat ca hrana poporului (PSA.74.14), coarnele celor rai si ale celui neprihanit (PSA.75.10), soarta celor ce-L urasc pe DOMNUL (PSA.81.15), dreptatea care pregateste calea (PSA.85.13), neprihanirea si cornul celui drept (PSA.112.9), „am crezut, de aceea am zis” (PSA.116.10), precum si demonstrativele si pronumele pentru Sion (PSA.87.4-5).

Artefactele de sursa au fost actualizate numai pentru cele 66 de referinte schimbate. Restul textului din val a ramas neschimbat dupa lectura directa.

## Limita auditului

Modelul ML semantic nu a fost rerulat: mediul nu are dependenta `sentence_transformers`. Randurile de screening au fost doar relegate la hashurile textelor actuale, fara recalcularea scorurilor. Artefactul semantic este auxiliar si nu este prezentat ca dovada noua. Dovada acestui val este revizia directa manuala, impreuna cu sursele locale fixate WLC/OSHB si WEBU.

## Verificari

- `python3 scripts/check-biblia-emanus.py` - OK.
- `python3 scripts/check-biblia-emanus-romanian-quality.py --testament OT` - OK, 0 probleme.
- `python3 scripts/check-biblia-emanus-ot-semantic-screening.py` - OK; screeningul nu este dovada de publicare.
- `python3 scripts/check-biblia-emanus-ot-source-evidence.py` - OK, 23145 dovezi per-verset.
- `python3 scripts/check-biblia-emanus-ot-publication-gate.py` - OK; VT ramane `in_review`.
- Parse JSON/JSONL si `git diff --check` - OK.

Acest raport nu promoveaza VT la publicare. Urmatorul val incepe la ordinalul 16001.
