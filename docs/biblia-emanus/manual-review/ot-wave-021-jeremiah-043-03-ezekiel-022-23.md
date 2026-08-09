# Revizie manuala VT - valul 21

- Interval ordinal: `20001-21000`
- Interval biblic: `JER.43.3-EZK.22.23`
- Versete citite direct: `1000`
- Referinte schimbate in acest val: `41`
- Urmatorul ordinal: `21001`

## Metoda

Am citit fiecare verset din interval si l-am comparat direct cu sursele locale fixate pentru Biblia Emanus: WLC/OSHB pentru ebraica si WEBU pentru martorul englez. Am schimbat textul numai cand formularea romana pierdea sensul, introducea un termen gresit, avea o eroare gramaticala clara sau pastra un delimitator de citat incorect.

Nu am generat dovezi semantice noi si nu am folosit un model extern. Dupa corectarea textului, artefactele JSONL au fost regenerate numai pentru cele 41 de referinte schimbate, pentru ca hash-urile sa corespunda textului actual.

## Corectii reprezentative

- `JER.44.30`, `JER.47.5`, `JER.49.1`: au fost corectate acordul gramatical si formele canonice `Ascalon` si `Milcom`.
- `JER.49.8`, `JER.49.20`, `JER.50.15`, `JER.50.31`, `JER.50.45`: au fost reparate imagini si subiecte care schimbau sensul, inclusiv „cei mai mici ai turmei”, genul pentru Babilon si formula „sunt impotriva ta”.
- `JER.51.1`, `JER.51.25`, `JER.51.32`, `JER.51.53`: au fost corectate identificarea `Leb-Camai`, formula judecatii si imaginile despre vaduri, trestie si inaltimea puterii.
- `LAM.3` si `LAM.5`: au fost corectate formularea despre suferinta ochiului, nimicirea vietii, nedreptatea si constructia gramaticala a plangerii.
- `EZK.1`, `EZK.3`, `EZK.5`, `EZK.7`, `EZK.8`, `EZK.11`: au fost reparate imagini profetice, „piatra de poticnire”, „pace”, „nimic de pret” si un delimitator de citat.
- `EZK.13`, `EZK.14`, `EZK.16`, `EZK.17`, `EZK.18`, `EZK.19`, `EZK.20`, `EZK.21`: au fost corectate formulele „sunt impotriva voastra”, „dupa multimea idolilor”, negarea corecta din 16:47, acordul „voi face”, duplicarea din 18:14, „voievozii lui Israel” si imaginile din 20:47 si 21:3, 24.

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
