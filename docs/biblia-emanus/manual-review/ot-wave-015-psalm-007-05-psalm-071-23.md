# Biblia Emanus - revizie manuala VT, valul 15

- Interval ordinal: 14001-15000
- Referinta initiala: PSA.7.5
- Referinta finala: PSA.71.23
- Versete citite integral: 1000
- Versete cu text corectat: 180
- Data reviziei: 2026-08-09
- Metoda: comparatie directa verset cu verset intre romana, WEBU si WLC/OSHB local fixat
- Manifest: `oldTestament.status=in_review`, `oldTestament.public=false`

## Rezultatul reviziei

Am parcurs fiecare verset din interval, nu doar versetele cu scor semantic mic. Corectiile au vizat diferente verificabile de sens, persoane si timpuri verbale schimbate, omisiuni sau adaosuri, imagini poetice deformate si ghilimele dezechilibrate. Nu am schimbat versetele doar pentru preferinte de stil.

In acest val au fost corectate versete din Psalmii 7-71. Artefactele de sursa au fost actualizate numai pentru cele 180 de referinte schimbate; restul textului valului a ramas neschimbat dupa lectura directa.

## Limita auditului

Modelul ML semantic nu a fost rerulat: mediul nu are dependenta `sentence_transformers`. Randurile de screening au fost doar relegate la hashurile textelor actuale, fara recalcularea scorurilor. Artefactul semantic este auxiliar si nu este prezentat ca dovada noua. Dovada acestui val este revizia directa manuala, impreuna cu sursele locale fixate WLC/OSHB si WEBU.

## Verificari

- `python3 scripts/check-biblia-emanus.py` - OK.
- `python3 scripts/check-biblia-emanus-romanian-quality.py --testament OT` - OK, 0 probleme.
- `python3 scripts/check-biblia-emanus-ot-semantic-screening.py` - OK; screeningul nu este dovada de publicare.
- `python3 scripts/check-biblia-emanus-ot-source-evidence.py` - OK, 23145 dovezi per-verset.
- `python3 scripts/check-biblia-emanus-ot-publication-gate.py` - OK; VT ramane `in_review`.
- Parse JSON/JSONL si `git diff --check` - OK.

Acest raport nu promoveaza VT la publicare. Urmatorul val incepe la ordinalul 15001.
