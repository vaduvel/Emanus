# Revizie manuala VT - valul 11

- Interval numerotat: versetele 10001-11000 din VT
- Prima referinta a valului: `2KI.17.17`
- Ultima referinta a valului: `1CH.23.16`
- Referinte cu text corectat in acest checkout: 129
- Data reviziei: 2026-08-09
- Revizor: Codex, comparatie directa locala

## Metoda

Fiecare verset din interval a fost citit in romana si comparat local cu payload-urile blocate din WLC-OSHB si WEBU. Au fost aplicate numai corectii pentru omisiuni, adaugiri, sens schimbat, gramatica romaneasca evident corupta, nume sau numere gresite si marcaje structurale artificiale. Nu s-au introdus comentarii teologice si nu s-a urmarit uniformizarea stilistica.

## Corectii reprezentative

- `2KI.17.32-34`: distinctia dintre frica de DOMNUL si inchinarea la DOMNUL a fost pastrata corect.
- `2KI.18.6,8`, `2KI.19.4,9`, `2KI.20.3,4,12,19`, `2KI.21.9`, `2KI.22.4`, `2KI.23.1,3,11,17,29`, `2KI.25.4,14,17,19`: actiuni, referinte, obiecte si propozitii omise sau deformate au fost corectate dupa WLC/WEBU.
- `1CH.1-4`: genealogii, nume, relatii de rudenie si formularea despre fiii lui Caleb au fost aliniate cu sursa.
- `1CH.7.12,17,25,32`, `1CH.8.8,25,27,29,32`, `1CH.9.18,35,38,41`: nume, relatii de familie si propozitii deformate au fost reparate fara completari neconfirmate; in `1CH.8.29` a fost eliminat numele Ieiel, absent din WLC pentru acel verset.
- `1CH.10.3`, `1CH.11.22,25,47`, `1CH.12.8,21`, `1CH.13.9`, `1CH.14.11`: actiuni, descrieri si propozitii lipsa au fost aduse in acord cu textul-sursa.
- `1CH.15.11,13,22`, `1CH.16.15,18,21,38`, `1CH.17.17,24`, `1CH.18.6,13`, `1CH.19.3,18`, `1CH.21.15,22`, `1CH.22.14`, `1CH.23.11,13`: sensul actiunilor si completitudinea versetelor au fost verificate direct in ebraica si WEBU.
- 51 de marcaje `–` fara corespondent in WLC/WEBU au fost eliminate din interval, inclusiv marcaje la final de verset si separatori introdusi in genealogii.

## Dovezi regenerate

Pentru cele 129 de referinte schimbate au fost recalculati hash-urile romanesti, payload-urile WLC/WEBU, `bindingSha256` si, pentru dovezile de sursa, `recordSha256`. Manifestul nu a fost promovat: VT ramane `in_review` pana cand poarta de publicare decide separat.

## Verificare

Portile complete trebuie rulate dupa acest raport:

```text
python3 scripts/check-biblia-emanus.py
python3 scripts/check-biblia-emanus-romanian-quality.py --testament OT
python3 scripts/check-biblia-emanus-ot-semantic-screening.py
python3 scripts/check-biblia-emanus-ot-source-evidence.py
python3 scripts/check-biblia-emanus-ot-publication-gate.py
```
