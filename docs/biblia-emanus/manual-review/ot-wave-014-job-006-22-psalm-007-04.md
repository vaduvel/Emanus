# Biblia Emanus - revizie manuala VT, valul 14

- Interval ordinal: 13001-14000
- Referinta initiala: JOB.8.8
- Referinta finala: PSA.7.4
- Versete citite integral: 1000
- Versete cu text corectat: 167
- Data reviziei: 2026-08-09
- Metoda: comparatie directa verset cu verset intre romana, WEBU si WLC/OSHB local fixat
- Manifest: `oldTestament.status=in_review`, `oldTestament.public=false`

## Rezultatul reviziei

Am parcurs fiecare verset din interval, nu doar versetele cu scor semantic mic. Corectiile au vizat diferente verificabile de sens, elemente omise sau adaugate, imagini poetice deformate, termeni concreti si ghilimele dezechilibrate. Nu am schimbat versetele doar pentru preferinte de stil si nu am urmarit copierea unei traduceri romanesti.

Corectiile sunt in fisierele JSON ale cartilor Iov si Psalmii, iar artefactele de sursa si screening au fost actualizate doar pentru referintele schimbate.

## Limita auditului

Modelul ML semantic nu a fost rerulat: mediul nu are dependenta `sentence_transformers`. Randurile de screening au fost doar relegate la hashurile textelor actuale, fara recalcularea scorurilor. Artefactul semantic este auxiliar si nu este prezentat ca dovada noua. Dovada acestui val este revizia directa manuala, impreuna cu sursele locale fixate WLC/OSHB si WEBU.

## Verificari

- `python3 scripts/check-biblia-emanus.py` - OK.
- `python3 scripts/check-biblia-emanus-romanian-quality.py --testament OT` - OK, 0 probleme.
- `python3 scripts/check-biblia-emanus-ot-semantic-screening.py` - OK; screeningul nu este dovada de publicare.
- `python3 scripts/check-biblia-emanus-ot-source-evidence.py` - OK, 23145 dovezi per-verset.
- `python3 scripts/check-biblia-emanus-ot-publication-gate.py` - OK; VT ramane `in_review`.
- Parse JSON/JSONL si `git diff --check` - OK.

Acest raport nu promoveaza VT la publicare. Urmatorul val incepe la ordinalul 14001.

## Referinte corectate

JOB.10.17`, `JOB.12.17`, `JOB.12.18`, `JOB.12.19`, `JOB.12.23`, `JOB.12.5`, `JOB.14.11`, `JOB.15.10`, `JOB.15.34`, `JOB.16.15`, `JOB.16.7`, `JOB.16.8`, `JOB.17.10`, `JOB.18.3`, `JOB.18.7`, `JOB.19.26`, `JOB.20.10`, `JOB.20.17`, `JOB.20.23`, `JOB.21.16`, `JOB.21.19`, `JOB.22.13`, `JOB.22.16`, `JOB.22.18`, `JOB.22.20`, `JOB.22.29`, `JOB.22.7`, `JOB.23.12`, `JOB.23.13`, `JOB.23.14`, `JOB.23.17`, `JOB.23.2`, `JOB.23.7`, `JOB.24.1`, `JOB.24.11`, `JOB.24.16`, `JOB.24.17`, `JOB.24.18`, `JOB.24.22`, `JOB.24.23`, `JOB.26.13`, `JOB.27.11`, `JOB.27.13`, `JOB.27.15`, `JOB.27.19`, `JOB.27.2`, `JOB.27.22`, `JOB.28.17`, `JOB.28.18`, `JOB.28.2`, `JOB.28.27`, `JOB.28.4`, `JOB.29.14`, `JOB.29.18`, `JOB.29.19`, `JOB.29.22`, `JOB.29.23`, `JOB.29.24`, `JOB.29.25`, `JOB.29.4`, `JOB.29.6`, `JOB.29.8`, `JOB.30.11`, `JOB.30.14`, `JOB.30.18`, `JOB.30.20`, `JOB.30.21`, `JOB.30.22`, `JOB.30.23`, `JOB.30.27`, `JOB.30.30`, `JOB.30.4`, `JOB.30.8`, `JOB.31.1`, `JOB.31.10`, `JOB.31.14`, `JOB.31.23`, `JOB.31.33`, `JOB.31.35`, `JOB.31.39`, `JOB.31.4`, `JOB.31.6`, `JOB.31.8`, `JOB.32.13`, `JOB.32.21`, `JOB.32.8`, `JOB.32.9`, `JOB.33.11`, `JOB.33.14`, `JOB.33.16`, `JOB.33.17`, `JOB.33.18`, `JOB.33.2`, `JOB.33.21`, `JOB.33.22`, `JOB.33.23`, `JOB.33.26`, `JOB.33.27`, `JOB.34.24`, `JOB.34.27`, `JOB.34.28`, `JOB.34.29`, `JOB.34.31`, `JOB.34.33`, `JOB.34.37`, `JOB.34.6`, `JOB.35.15`, `JOB.35.2`, `JOB.36.12`, `JOB.36.17`, `JOB.36.18`, `JOB.36.19`, `JOB.36.21`, `JOB.36.23`, `JOB.36.24`, `JOB.36.29`, `JOB.36.3`, `JOB.36.32`, `JOB.36.33`, `JOB.36.4`, `JOB.37.13`, `JOB.37.19`, `JOB.37.20`, `JOB.37.3`, `JOB.37.4`, `JOB.37.9`, `JOB.38.32`, `JOB.38.36`, `JOB.39.25`, `JOB.39.6`, `JOB.40.14`, `JOB.40.19`, `JOB.40.2`, `JOB.40.23`, `JOB.40.24`, `JOB.40.7`, `JOB.40.8`, `JOB.41.15`, `JOB.41.17`, `JOB.41.2`, `JOB.41.20`, `JOB.41.26`, `JOB.41.30`, `JOB.41.33`, `JOB.41.34`, `JOB.41.6`, `JOB.41.7`, `JOB.41.8`, `JOB.42.3`, `JOB.42.4`, `JOB.42.9`, `JOB.8.8`, `JOB.8.9`, `JOB.9.19`, `JOB.9.24`, `PSA.1.3`, `PSA.2.6`, `PSA.3.2`, `PSA.3.7`, `PSA.4.4`, `PSA.4.8`, `PSA.5.1`, `PSA.5.10`, `PSA.5.5`, `PSA.5.8`, `PSA.6.7`, `PSA.7.4
