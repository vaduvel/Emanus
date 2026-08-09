# Biblia Emanus - revizie directa VT, valul 18

- Interval ordinal: 17001-18000
- Referinta initiala: PRO.21.16
- Referinta finala: ISA.18.2
- Versete citite integral: 1000
- Versete cu text corectat: 276
- Data reviziei: 2026-08-09
- Metoda: comparatie directa verset cu verset intre romana, WEBU si WLC/OSHB local fixat
- Manifest: `oldTestament.status=in_review`, `oldTestament.public=false`

## Rezultatul reviziei

Am parcurs fiecare verset din interval, nu doar versetele marcate anterior. Au fost aplicate 80 de corectii explicite de sens, traducere si gramatica, impreuna cu eliminarea delimitatoarelor ` –` ramase accidental la sfarsitul unor versete din val.

In Eclesiastul au fost corectate, intre altele, functionarii care supravegheaza alti functionari si folosul imparatului din ogor (ECC.5.8-9), „boala rea” (ECC.6.2), rabdarea in duh (ECC.7.8), cei zece conducatori ai cetatii (ECC.7.19), formularea corupta din ECC.7.27, cei veniti din locul sfant (ECC.8.10), nadejdea celui viu (ECC.9.4), blandetea care linisteste jignirile (ECC.10.4) si cuvintele date de un singur Pastor (ECC.12.11).

In Cantarea cantarilor au fost reparate sensuri concrete: dragostea in loc de „dezmierdari” (SNG.1.2), perdelele lui Solomon in loc de covoare (SNG.1.5), mana descrisa afirmativ in SNG.2.6, tamplele in loc de obraz (SNG.4.3), capul ca aurul curat in loc de o cununa (SNG.5.11), prietenul din SNG.5.16, sclipirile de foc din SNG.8.6 si via aflata inaintea vorbitorului din SNG.8.12.

In Isaia au fost reparate mai multe abateri care modificau obiectul sau imaginea sursei: „vedenia” din ISA.1.1 si ISA.2.1, practicile din rasarit si ghicitorii din ISA.2.6, ranile scalpului din ISA.3.17, duhul arderii din ISA.4.4, lipsa de cunostinta din ISA.5.13, leoaica din ISA.5.29, locurile pustii din ISA.6.12, alianta Siriei cu Efraim din ISA.7.2, impartirea cetatii in ISA.7.6, numele profetic din ISA.8.1, Legea din ISA.8.16, asteptarea Domnului din ISA.8.17, sicomorii din ISA.9.10, cei grasi si purtatorul de steag din ISA.10.16-18, untdelemnul ungerii din ISA.10.27, radacina lui Isai cautata de neamuri din ISA.11.10, vantul arzator din ISA.11.15, constelatiile din ISA.13.10, animalele din Babilon din ISA.13.21-22, prizonierii care nu se intorc acasa din ISA.14.17, intaii-nascuti ai saracilor din ISA.14.30, nobilii Moabului din ISA.15.5, turtele de stafide din ISA.16.7, altarele pentru tamaie din ISA.17.8 si zanganitul aripilor din ISA.18.1.

Nu am schimbat versetele doar pentru preferinte de stil. Unde WEBU si WLC/OSHB sustin o formulare diferita, am urmarit termenul, agentul, obiectul, negatia si imaginea din sursa, fara sa adaug explicatii doctrinare in textul biblic.

Artefactele de sursa au fost actualizate numai pentru cele 276 de referinte schimbate. Cele doua JSONL-uri pastreaza exact liniile vechi pentru referintele neschimbate; fiecare linie schimbata are hashurile recalculate pe textul romanesc actual.

## Limita auditului

Modelul ML semantic nu a fost rerulat: mediul nu are dependenta `sentence_transformers`. Screeningul existent a fost doar re-legat la hashurile textelor actuale, fara scoruri ML noi. Dovada acestui val este lectura directa, impreuna cu sursele locale fixate WLC/OSHB si WEBU.

## Verificari

- `python3 scripts/check-biblia-emanus.py` - OK.
- `python3 scripts/check-biblia-emanus-romanian-quality.py --testament OT` - OK, 0 probleme.
- `python3 scripts/check-biblia-emanus-ot-semantic-screening.py` - OK; screeningul nu este dovada de publicare.
- `python3 scripts/check-biblia-emanus-ot-source-evidence.py` - OK, 23145 dovezi per-verset.
- `python3 scripts/check-biblia-emanus-ot-publication-gate.py` - OK; VT ramane `in_review`.
- Parse JSON/JSONL si `git diff --check` - OK.
- Diff-ul textului este limitat la intervalul ordinal 17001-18000; nu exista referinte schimbate in afara valului.

Acest raport nu promoveaza VT la publicare. Urmatorul val incepe la ordinalul 18001.
