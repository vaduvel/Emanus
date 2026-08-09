# Biblia Emanus - revizie manuala VT, valul 17

- Interval ordinal: 16001-17000
- Referinta initiala: PSA.119.102
- Referinta finala: PRO.21.15
- Versete citite integral: 1000
- Versete cu text corectat: 346
- Data reviziei: 2026-08-09
- Metoda: comparatie directa verset cu verset intre romana, WEBU si WLC/OSHB local fixat
- Manifest: `oldTestament.status=in_review`, `oldTestament.public=false`

## Rezultatul reviziei

Am parcurs fiecare verset din interval, nu doar versetele cu scor semantic mic. Au fost aplicate 79 de corectii de sens, traducere si gramatica, precum si curatarea a 302 delimitatoare `-` ramase accidental la sfarsitul versetelor.

In Psalmi au fost reparate, intre altele, "jertfele de buna voie" in loc de "simtaminte" (PSA.119.108), fapta de dreptate in locul pazirii Legii (PSA.119.121), "soarta noastra" in loc de "prinsii nostri de razboi" (PSA.126.4), somnul dat preaiubitului in locul painii (PSA.127.2), "boii nostri poarta poveri" in locul viilor roditoare (PSA.144.14) si "tara neprihanirii" in locul unei cai (PSA.143.10).

In Proverbe au fost reparate diferente doctrinare si semantice importante: femeia care a doborat raniti, nu "jertfe" (PRO.7.26), sensul lui "DOMNUL m-a avut" din PRO.8.22, ispășirea pentru pacat (PRO.14.9), dreptul de a socoti pe cineva neprihanit (PRO.17.15), mita vazuta de cel care o da (PRO.17.8), lipsa de ravna fara cunostinta (PRO.19.2), iarna in loc de toamna (PRO.20.4) si nimicirea celor ce lucreaza nelegiuirea (PRO.21.15).

Nu am schimbat versetele doar pentru preferinte de stil. Unde WEBU si WLC/OSHB sustin o formulare diferita, am preferat formularea care pastreaza termenul, agentul, obiectul, negatia si imaginea din sursa, fara sa corectez printr-o doctrina inventata.

Artefactele de sursa au fost actualizate numai pentru cele 1000 de referinte din val, iar screeningul existent a fost doar re-legat la hashurile textelor actuale. Nu s-au generat scoruri ML noi.

## Limita auditului

Modelul ML semantic nu a fost rerulat: mediul nu are dependenta `sentence_transformers`. Randurile de screening au fost doar relegate la hashurile textelor actuale, fara recalcularea scorurilor. Artefactul semantic este auxiliar si nu este prezentat ca dovada noua. Dovada acestui val este revizia directa manuala, impreuna cu sursele locale fixate WLC/OSHB si WEBU.

## Verificari

- `python3 scripts/check-biblia-emanus.py` - OK.
- `python3 scripts/check-biblia-emanus-romanian-quality.py --testament OT` - OK, 0 probleme.
- `python3 scripts/check-biblia-emanus-ot-semantic-screening.py` - OK; screeningul nu este dovada de publicare.
- `python3 scripts/check-biblia-emanus-ot-source-evidence.py` - OK, 23145 dovezi per-verset.
- `python3 scripts/check-biblia-emanus-ot-publication-gate.py` - OK; VT ramane `in_review`.
- Parse JSON/JSONL si `git diff --check` - OK.

Acest raport nu promoveaza VT la publicare. Urmatorul val incepe la ordinalul 17001.
