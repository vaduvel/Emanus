# Biblia explicată — valul Judecători

## Stare

- Carte: **Judecători**
- Ordine VT: 7, după Iosua
- Capitole: **21 / 21**
- Versete Biblia Emanus: **618 / 618**
- Unități explicate: **78**
- Stare editorială: toate capitolele `in_review`
- Catalog: cartea este introdusă în `BIBLE_BOOKS` numai după completarea tuturor capitolelor

## Surse

### Text biblic

Textul afișat este Biblia Emanus, copiat fără reformulare din:

`packages/shared/src/bible/data/judecatori/JDG.1.json` — `JDG.21.json`

Fișierele păstrează textul, numerotarea și auditul sursei Biblia Emanus. Explicația nu duplică și nu modifică versetele.

### Cercetare pentru explicație

Transcriere de lucru:

`.research/poonen-through-the-bible-OT/judges-ruth.txt`

Sursa audio: seria oficială *Through The Bible* de Zac Poonen. Transcrierea este material de cercetare, nu text publicat în lecții. Formularea explicației, a contextelor, a aplicațiilor și a rugăciunilor este originală Emanus.

## Structură editorială

Fiecare capitol conține:

1. titlu;
2. rezumat;
3. context literar;
4. context istoric;
5. unități continue care acoperă toate versetele o singură dată;
6. explicație;
7. trimiteri biblice;
8. aplicație „Pentru inima ta”;
9. studii de cuvinte unde sunt necesare;
10. rugăciune finală;
11. statut editorial explicit.

## Firul cărții

- 1–2: ascultarea neterminată și generația care nu-L cunoștea pe DOMNUL;
- 3–5: Otniel, Ehud, Șamgar, Debora, Barac și Iael;
- 6–8: chemarea, biruința și declinul lui Ghedeon;
- 9–12: Abimelec, idolatria repetată, Iefta și războiul frățesc;
- 13–16: chemarea, darul și prăbușirea lui Samson;
- 17–18: religia privată a lui Mica și idolatria instituționalizată în Dan;
- 19–21: violență sexuală, război civil, masacru, răpire și verdictul «fiecare făcea ce era drept în ochii lui».

## Protecții editoriale

- Narațiunile de război sunt descrise în contextul lor și nu sunt transformate în permisiune pentru violență modernă.
- Jurământul lui Iefta nu este prezentat ca cerut sau aprobat de Dumnezeu; fiica lui nu este învinovățită.
- Puterea lui Samson nu este tratată ca dovadă a maturității caracterului.
- Moartea lui Samson nu este oferită ca model pentru sinucidere, terorism sau atac asupra civililor.
- Concubina din Judecători 19 este numită victimă; vina rămâne asupra agresorilor și a celor care au abandonat-o.
- Masacrul din Iabeș-Galaad și răpirea fetelor din Șilo sunt expuse ca degradare morală, nu ca modele de căsătorie sau rezolvare a conflictului.
- Pentru abuz și violență sexuală, aplicația indică siguranță și ajutor medical, psihologic, juridic și comunitar competent.

## Validare

Comandă:

```bash
pnpm check:judecatori
```

Poarta verifică:

- existența și continuitatea celor 21 de surse JSON;
- numerotarea celor 618 versete;
- existența tuturor capitolelor explicate;
- acoperirea continuă prin 78 de unități;
- statusul `in_review` pentru fiecare capitol;
- asamblarea cărții și includerea în catalog;
- prezența protecțiilor editoriale pentru pasajele sensibile.
