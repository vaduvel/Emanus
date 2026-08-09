# Revizie manuala VT - valul 20

- Interval ordinal: `19001-20000`
- Interval biblic: `JER.2.35-JER.43.2`
- Versete citite direct: `1000`
- Referinte schimbate in acest val: `85`
- Corectii suplimentare impuse de portile structurale/onomastice: `12`
- Total referinte schimbate in commit: `97`
- Urmatorul ordinal: `20001`

## Metoda

Am citit fiecare verset din interval si l-am comparat direct cu sursele locale fixate pentru Biblia Emanus: WLC/OSHB pentru ebraica si WEBU pentru martorul englez. Am schimbat textul numai cand formularea romana pierdea sensul, introducea un termen gresit, avea o eroare gramaticala clara sau pastra un delimitator de citat incorect.

Nu am generat dovezi semantice noi si nu am folosit un model extern. Dupa corectarea textului, artefactele JSONL au fost regenerate numai pentru referintele schimbate, pentru ca hash-urile sa corespunda textului actual.

## Corectii reprezentative

- `JER.3.4`, `JER.3.14`, `JER.17.2`: adresarea, imaginea legamintului si referinta la altarele lui Asera au fost aduse la sensul sursei.
- `JER.4.1`, `JER.5.6`, `JER.6.27`, `JER.8.13`, `JER.9.11`: au fost corectate imagini si termeni concreti, inclusiv „lupul de seara”, „incercator de metale”, „lucrurile pe care li le-am dat” si „locuinta de sacali”.
- `JER.15.11`, `JER.15.19`, `JER.16.7`, `JER.18.17`: au fost corectate sensuri doctrinare sau gramaticale, fara atenuarea judecatii textului.
- `JER.23.30`, `JER.27.7`, `JER.28.8`, `JER.31.21`, `JER.31.22`: au fost reparate subiectul actiunii, continutul profetic si formularea imaginii profetice.
- `JER.32.42`, `JER.33.3`, `JER.36.4`, `JER.38.4`, `JER.39.3`: au fost corectate formulari romanesti care schimbau sau slabeau afirmatia textului.

## Remedieri de integritate detectate de verificari

Portile au identificat si corectii necesare in texte deja existente in checkout:

- au fost echilibrate citatele care traversau versete sau aveau delimitatori duplicati in `ISA.21`, `ISA.22`, `ISA.36`, `ISA.43`, `ISA.44`, `ISA.49`, `ISA.55`, `ISA.65`, `ISA.66`, `JER.4`, `JER.10`, `JER.12`, `JER.14`, `JER.15`, `JER.16`, `JER.18` si `JER.30`;
- `ISA.30.7` a fost normalizat din forma interzisa „Rahab” in forma canonica locala „Rahav”.
- `ISA.65.14` si `ISA.65.21` au primit doua corectii gramaticale clare, detectate in timpul remedierii citatelor.

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
