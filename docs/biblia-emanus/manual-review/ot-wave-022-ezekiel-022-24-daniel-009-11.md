# Revizie manuala VT - valul 22

- Interval ordinal: `21001-22000`
- Interval biblic: `EZK.22.24-DAN.9.11`
- Versete citite direct: `1000`
- Referinte schimbate in acest val: `41`
- Urmatorul ordinal: `22001`

## Metoda

Am citit fiecare verset din interval si l-am comparat direct cu sursele locale fixate pentru Biblia Emanus: WLC/OSHB pentru ebraica si WEBU pentru martorul englez. Ebraica a avut prioritate atunci cand o formulare engleza folosea o alegere lexicala diferita. Am schimbat textul numai cand formularea romana pierdea sensul, omitea un nume sau un element, schimba subiectul actiunii, avea o eroare gramaticala clara sau folosea o imagine contrazisa de sursa.

Nu am generat dovezi semantice noi si nu am folosit un model extern. Dupa corectarea textului, artefactele JSONL au fost regenerate numai pentru cele 41 de referinte schimbate, pentru ca hash-urile sa corespunda textului actual.

## Corectii reprezentative

- `EZK.22.25`, `EZK.23.23`, `EZK.24.13`: au fost reparate identificarea prorocilor, numele Pekod, Soa si Coa si formula despre necuratie si nelegiuire.
- `EZK.26.2`, `EZK.26.4`, `EZK.26.6`, `EZK.26.8`, `EZK.26.17`: au fost corectate punctuatia, subiectul actiunii, fiicele Tirului si acordul pentru cetatea personificata.
- `EZK.27.3`, `EZK.27.28`, `EZK.30.4`, `EZK.30.5`, `EZK.30.16`, `EZK.30.18`: au fost corectate intrarile marii, pasunile, multimea Egiptului, oamenii amestecati, vrajmasii Nofului si fiicele Egiptului.
- `EZK.32.5`, `EZK.32.20`, `EZK.34.2`, `EZK.34.16`, `EZK.34.21`, `EZK.34.31`: au fost reparate „inaltimea”, forma fara destinatar gresit a sabiei, termenul adaugat „sufletesti”, judecata oilor grase si puternice, oile bolnave si omisiunea „sunteti oameni”.
- `EZK.36.12`, `EZK.36.36`, `EZK.37.23`, `EZK.38.7`, `EZK.38.8`, `EZK.38.14`: au fost corectate lipsirea de copii, forma verbala, „locuintele”, „straja”, cercetarea lui Gog si intrebarea din text.
- `EZK.40.14`, `EZK.40.43`, `EZK.40.44`, `EZK.43.21`, `EZK.44.16`: au fost reparate descrieri arhitecturale, carnea de pe mese, orientarea celei de-a doua odai, acordul verbal si „randuiala Mea”.
- `DAN.2.43`, `DAN.4.19`, `DAN.5.24`, `DAN.6.18`, `DAN.8.3`, `DAN.8.5`, `DAN.8.12`, `DAN.8.13`, `DAN.8.21`, `DAN.8.23`: au fost corectate samanta oamenilor, starea lui Daniel, partea mainii, instrumentele muzicale, pozitia berbecului, atingerea pamantului, nelegiuirea, tapul ca imparat si descrierea imparatului cu fata apriga si priceput in enigme.

## Validare

Au trecut cu exit `0`:

```text
python3 scripts/check-biblia-emanus.py
python3 scripts/check-biblia-emanus-romanian-quality.py --testament OT
python3 scripts/check-biblia-emanus-ot-semantic-screening.py
python3 scripts/check-biblia-emanus-ot-source-evidence.py
python3 scripts/check-biblia-emanus-ot-publication-gate.py
```

Rezultatul calitatii romanesti este `0 probleme`. Poarta de publicare este verde procedural, dar manifestul ramane intentionat `in_review`; acest val nu autorizeaza publicarea automata.
