# Revizie manuala VT - valul 10

- Interval numerotat: versetele 9001-10000 din VT
- Prima referinta a valului: `1KI.8.15`
- Ultima referinta a valului: `2KI.17.16`
- Referinte cu text corectat in acest checkout: 75
- Data reviziei: 2026-08-09
- Revizor: Codex, comparatie directa locala

## Metoda

Fiecare verset din interval a fost citit in romana si comparat local cu payload-urile blocate din WLC-OSHB si WEBU. Au fost aplicate numai corectii pentru omisiuni, adaugiri, sens schimbat, gramatica romaneasca evident corupta si ghilimele structurale. Nu s-au introdus comentarii teologice si nu s-a urmarit uniformizarea stilistica.

## Corectii reprezentative

- `1KI.22.20,30,35`: propozitie omisa, deghizarea lui Ahab si pozitia lui Ahab in car.
- `2KI.1.4,10`: actiunea lui Ilie si coborarea focului omise.
- `2KI.2.2,4,6,20,22,25`: actiuni omise, atribuirea gresita a cuvantului si ghilimele orfane.
- `2KI.3.21,23,27`: formulari romanesti deformate si ghilimele orfane.
- `2KI.4.4,6,10,30`: intrarea in odaie, oprirea untdelemnului, odaia pe acoperis si urmarea femeii omise sau deformate.
- `2KI.5.12,26`: plecarea lui Naaman omisa si `inima` tradusa gresit ca `duh`.
- `2KI.6.9,18,19,27`: sirienii care coboara, orbirea, ducerea la Samaria si sensul intrebarii despre ajutor.
- `2KI.7.13`, `2KI.8.11`, `2KI.9.3,8,13,15`, `2KI.10.1,12,19,27`: completari si corectii de sens verificate in sursa.
- `2KI.11.14,16`, `2KI.12.10,18`, `2KI.13.11`, `2KI.14.7,9`, `2KI.15.12`, `2KI.16.10,12,15`, `2KI.17.7`: corectii de referinta, actiune, citat si diferenta dintre frica si inchinare.

## Dovezi regenerate

Pentru cele 75 de referinte schimbate au fost recalculati hash-urile romanesti, payload-urile WLC/WEBU, `bindingSha256` si, pentru dovezile de sursa, `recordSha256`. Manifestul nu a fost promovat: VT ramane `in_review` pana cand poarta de publicare decide separat.

## Verificare

Portile complete trebuie rulate dupa acest raport:

```text
python3 scripts/check-biblia-emanus.py
python3 scripts/check-biblia-emanus-romanian-quality.py --testament OT
python3 scripts/check-biblia-emanus-ot-semantic-screening.py
python3 scripts/check-biblia-emanus-ot-source-evidence.py
python3 scripts/check-biblia-emanus-ot-publication-gate.py
```
