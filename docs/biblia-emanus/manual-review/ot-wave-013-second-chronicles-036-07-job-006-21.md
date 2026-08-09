# Biblia Emanus - revizie manuala VT, valul 13

- Interval ordinal: 12001-13000
- Referinta initiala: 2CH.36.7
- Referinta finala: JOB.6.21
- Versete citite integral: 1000
- Versete cu text corectat: 59
- Data reviziei: 2026-08-09
- Metoda: comparatie directa verset cu verset intre romana, WEBU si WLC/OSHB local fixat
- Manifest: `oldTestament.status=in_review`, `oldTestament.public=false`

## Rezultatul reviziei

Am parcurs fiecare verset din interval, nu doar versetele cu scor semantic mic. Corectiile au vizat diferente verificabile de sens, nume proprii, imagini poetice, numere, elemente omise si adaosuri produse de formularea anterioara. Nu am schimbat versetele doar pentru preferinte de stil sau pentru a copia Cornilescu.

Versetele corectate:

`2CH.36.15`, `2CH.36.19`, `EZR.1.3`, `EZR.2.6`, `EZR.2.36`, `EZR.2.59`, `EZR.2.63`, `EZR.2.70`, `EZR.6.16`, `NEH.3.1`, `NEH.3.7`, `NEH.3.8`, `NEH.3.26`, `NEH.3.27`, `NEH.3.31`, `NEH.4.8`, `NEH.4.9`, `NEH.4.12`, `NEH.4.13`, `NEH.5.10`, `NEH.5.13`, `NEH.6.16`, `NEH.7.61`, `NEH.7.65`, `NEH.7.73`, `NEH.8.1`, `NEH.8.13`, `NEH.8.18`, `NEH.9.3`, `NEH.9.10`, `NEH.9.18`, `NEH.9.29`, `NEH.10.29`, `NEH.11.3`, `NEH.11.4`, `NEH.11.5`, `NEH.11.6`, `NEH.11.11`, `NEH.11.21`, `NEH.11.36`, `NEH.12.24`, `NEH.12.39`, `NEH.13.6`, `EST.1.6`, `EST.2.12`, `EST.2.18`, `EST.8.16`, `EST.10.2`, `JOB.1.4`, `JOB.2.8`, `JOB.3.22`, `JOB.4.19`, `JOB.4.21`, `JOB.5.5`, `JOB.5.11`, `JOB.5.24`, `JOB.6.10`, `JOB.6.13`, `JOB.6.16`.

Exemple de corectii importante:

- `2CH.36.15` reda acum trimiterea timpurie a solilor, nu o formulare administrativa neclara.
- `2CH.36.19` separa palatele arse de vasele de pret nimicite.
- `NEH.3.1`, `NEH.12.39` si alte versete folosesc `Hammeah`, iar `NEH.3.26`, `NEH.3.27`, `NEH.11.21` pastreaza numele `Ofel`.
- `NEH.3.8` si `NEH.3.31` redau `goldsmiths` ca `aurari`, nu `argintari`.
- `NEH.5.10` si `NEH.5.13` pastreaza respectiv camata si imaginea casei si muncii omului.
- `NEH.8.1`, `NEH.8.18` si `NEH.9.3` elimina repetarea sau schimbarea subiectului si pastreaza actiunea din text.
- `NEH.9.18`, `NEH.9.29` si `NEH.10.29` pastreaza elemente omise: batjocurile, marturia impotriva poporului si blestemul din legamant.
- `EST.2.18` reda proclamarea unei sarbatori, nu reducerea birurilor.
- `EST.8.16` pastreaza imaginea biblica `lumina, bucurie, veselie si slava`.
- `JOB.1.4`, `JOB.4.19`, `JOB.4.21`, `JOB.5.5`, `JOB.6.10`, `JOB.6.13` si `JOB.6.16` repara imagini si termeni concreti din textul sursa.

## Artefacte si verificari

Pentru cele 59 de versete modificate au fost recalculate `texts.romanian.sha256`, `bindingSha256` si `recordSha256` in `ot-source-evidence.jsonl`. Randurile corespunzatoare din `ot-semantic-screening.jsonl` au fost relegate la hashurile actuale, fara recalcularea scorurilor.

Modelul ML semantic nu a fost rerulat: mediul nu are dependenta `sentence_transformers`. Artefactul semantic este auxiliar si nu este prezentat ca dovada noua. Dovada folosita pentru acest val este revizia directa manuala, impreuna cu sursele locale fixate WLC/OSHB si WEBU.

Verificari executate dupa revizie:

- `python3 scripts/check-biblia-emanus.py` - OK, 1189 capitole si 31086 versete.
- `python3 scripts/check-biblia-emanus-romanian-quality.py --testament OT` - OK, 929 capitole, 23145 versete, 0 probleme.
- `python3 scripts/check-biblia-emanus-ot-semantic-screening.py` - OK, 23145 versete legate de surse; screeningul nu este dovada de publicare.
- `python3 scripts/check-biblia-emanus-ot-source-evidence.py` - OK, 23145 dovezi per-verset.
- `python3 scripts/check-biblia-emanus-ot-publication-gate.py` - OK; VT ramane `in_review`.
- Parse JSON/JSONL si `git diff --check` - OK.

Acest raport nu promoveaza VT la publicare. Urmatorul val incepe la ordinalul 13001.
