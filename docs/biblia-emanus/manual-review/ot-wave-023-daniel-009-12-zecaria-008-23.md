# Revizie manuala VT - valul 23

- Interval ordinal: `22001-23000`
- Interval biblic: `DAN.9.12-ZEC.8.23`
- Versete citite direct: `1000`
- Referinte schimbate in acest val: `47`
- Urmatorul ordinal: `23001`

## Metoda

Am citit direct fiecare verset din interval si l-am comparat cu payload-ul local WLC/OSHB si cu WEBU. Nu am folosit un model extern, nu am generat o aprobare artificiala si nu am promovat manifestul. Cand WEBU si forma ebraica au diferit, forma ebraica a fost tratata ca referinta prioritara; unde diferenta era o optiune legitima de traducere, textul a ramas neschimbat.

## Corectii aplicate

Au fost reparate 47 de referinte, intre care:

- Daniel 10:1, 10:16, 11:6, 11:14, 11:16-17, 11:20-22, 12:4: lupta, dureri, bratul si oastea, fiii celor violenti, nimicirea, strangatorul de bir, lingusirile si alergarea inainte si inapoi.
- Osea 8:10 si 11:6: povara imparatului si capetele portilor, in locul unor actori sau obiecte inventate.
- Ioel 2:8, 2:23: randurile care nu se rup si ploaia in masura de dreptate.
- Amos 3:4, 4:6, 6:13, 9:1: gramatica, expresia ebraica a dintilor curati, coarnele si fraza corecta despre capetele tuturor.
- Obadia 1:16: eliminarea adaosului despre paharul maniei.
- Mica 1:5, 2:7-9, 2:12, 3:8, 5:6, 5:14, 6:14: inaltimile lui Iuda, Duhul Domnului, intoarcerea de la razboi, binecuvantarea, Bozra, stapanirea Asiriei, cetatile si verbul pentru a pune deoparte.
- Naum 1:12, 1:14: eliminarea numelui adaugat Ierusalim si corectarea expresiei pentru `vile`.
- Habacuc 1:11, 2:5, 2:15, 3:13-14: vantul, vinul inselator, mania turnata, capul casei celui rau si sulitele proprii.
- Tefania 1:11, 3:4, 3:18: Canaan, proroci ingamfati si cei intristati din pricina sarbatorilor.
- Hagai 1:4, 2:16: casele captusite cu lemn si ortografia `cincizeci`.
- Zaharia 4:2, 5:3, 6:3, 6:11, 6:14, 8:12, 8:21: cele sapte si sapte tevi, cele doua parti ale blestemului, caii puternici, cununile, samanta pacii si forma singulara a raspunsului.

## Artefacte

Dovezile `ot-source-evidence.jsonl` si `ot-semantic-screening.jsonl` au fost regenerate numai pentru cele 47 de referinte schimbate. Nu s-au rescris justificari pentru versetele care nu au fost modificate.

## Validare

- `check-biblia-emanus.py`: OK
- `check-biblia-emanus-romanian-quality.py --testament OT`: 0 probleme
- `check-biblia-emanus-ot-semantic-screening.py`: OK, 23145 versete legate de surse
- `check-biblia-emanus-ot-source-evidence.py`: OK, 23145 versete cu surse fixate
- `check-biblia-emanus-ot-publication-gate.py`: VT ramane `in_review`
- Parse JSON si `git diff --check`: OK

Acest raport confirma lectura directa a valului, nu publicarea VT. Statusul manifestului ramane intentionat `in_review` pana la finalizarea tuturor valurilor si a verificarii finale.
