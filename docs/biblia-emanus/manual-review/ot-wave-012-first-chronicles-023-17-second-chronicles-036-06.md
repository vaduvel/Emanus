# Revizie manuala VT - valul 12

- Interval numerotat: versetele 11001-12000 din VT
- Prima referinta a valului: `1CH.23.17`
- Ultima referinta a valului: `2CH.36.6`
- Referinte cu text corectat in acest checkout: 108
- Data reviziei: 2026-08-09
- Revizor: Codex, comparatie directa locala

## Metoda

Fiecare dintre cele 1000 de versete a fost citit in romana si comparat direct cu payload-urile blocate din WLC-OSHB si WEBU. Au fost aplicate numai corectii pentru omisiuni, adaugiri, sens schimbat, gramatica romaneasca evident corupta, nume sau obiecte traduse gresit si marcaje structurale artificiale. Nu s-au introdus comentarii teologice si nu s-a urmarit uniformizarea stilistica.

## Corectii reprezentative

- `1CH.23.29`, `2CH.6.12-13`, `2CH.30.16`: actiuni traduse gresit (turte prajite, sedere in locul statului si sedere in locul ingenuncherii) au fost aliniate cu sursa.
- `2CH.1.2,5-6`, `2CH.11.10,13,15`, `2CH.14.3,13`, `2CH.15.15-16`, `2CH.17.11,16`: actiuni, obiecte cultice si relatii de sens au fost corectate dupa WLC/WEBU.
- `2CH.16.14`, `2CH.20.7,37`, `2CH.24.25,27`, `2CH.27.3`, `2CH.29.24`, `2CH.30.20,22`, `2CH.31.18`: focul funerar, prietenia lui Avraam, poverile, Ofelul, jertfa pentru pacat, vindecarea, marturisirea si slujba de incredere au fost verificate direct.
- `2CH.19.3`, `2CH.24.18`, `2CH.31.1`, `2CH.33.3,15,19`, `2CH.34.3,4,7`: termenii pentru Asherah/Aserah au fost separati de idolii si stalpii soarelui; nu mai sunt generalizati ca Astarte.
- Marcajele `–` artificiale din interval au fost eliminate; ghilimelele ramase in citate pe mai multe versete au fost pastrate unde au corespondent textual.

## Dovezi

Pentru cele 108 referinte schimbate au fost recalculati hash-urile romanesti, `bindingSha256` si `recordSha256` din dovezile de sursa. Artefactul de screening semantic a fost re-legat la hash-urile textelor curente, dar modelul ML nu a fost rerulat in acest checkout deoarece dependinta `sentence_transformers` nu este instalata. Screeningul ramane auxiliar si nu este folosit ca dovada de publicare.

Manifestul nu a fost promovat: VT ramane `in_review` pana cand poarta de publicare decide separat.

## Verificare

Toate portile au returnat exit code 0 dupa valul 12:

```text
python3 scripts/check-biblia-emanus.py
python3 scripts/check-biblia-emanus-romanian-quality.py --testament OT
python3 scripts/check-biblia-emanus-ot-semantic-screening.py
python3 scripts/check-biblia-emanus-ot-source-evidence.py
python3 scripts/check-biblia-emanus-ot-publication-gate.py
```

Rezultate: 1189 capitole / 31086 versete / 0 probleme de calitate romaneasca; 23145 versete legate de surse; 60 versete in coada screeningului; poarta de publicare mentine `in_review`.
