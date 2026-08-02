# 22 — Siguranță, safeguarding și limitele Emanus

**Status:** politică activă. Orice lecție, ecran sau funcție nouă se verifică împotriva acestui document.

## 1. Propoziția care stă la vedere

**Emanus nu înlocuiește medicul, psihologul, poliția sau 112.**

Aplicația însoțește, explică Scriptura și oferă pași de reflecție. Nu tratează, nu diagnostichează și nu investighează situații de abuz.

## 2. Ce nu facem niciodată

- Nu diagnosticăm omul prin cele șapte camere. Ele sunt uși editoriale, nu profil psihologic.
- Nu spunem că anxietatea, depresia, insomnia, boala sau epuizarea dovedesc automat lipsă de credință ori un păcat anume.
- Nu promitem vindecare, minune, însănătoșire sau un rezultat garantat.
- Nu cerem victimei să contacteze, să confrunte sau să se întoarcă la persoana care i-a făcut rău.
- Nu confundăm iertarea cu împăcarea, încrederea, retragerea plângerii sau renunțarea la limite.
- Nu folosim un număr de ajutor până când nu este confirmat dintr-o sursă oficială.
- Nu punem explicația Emanus pe același plan cu textul Scripturii.
- Nu afișăm ca adevăr sigur o interpretare, o etimologie, o afirmație medicală sau istorică fără măsura potrivită.

## 3. Avertismentul separat înaintea lecțiilor grele

Lecțiile despre abuz, violență, agresiune sexuală, dependență, autovătămare, depresie profundă și alte răni sensibile primesc, înaintea primului pas, un ecran separat:

> Ce urmează atinge [subiectul]. Poți opri oricând și poți reveni. Dacă ești în pericol sau te gândești să îți faci rău, cere ajutor acum.

Acțiuni:

- **Continuă**
- **Am nevoie de ajutor acum**

Configurația activă este în `apps/web/src/lessonSafety.ts`. Numerele nu se copiază manual în fiecare lecție; sunt citite din registrul canonic.

## 4. Registrul canonic al resurselor pentru România

Sursa tehnică unică: `packages/shared/src/crisis.ts`.

| Situație | Număr | Disponibilitate afișată |
| --- | --- | --- |
| Pericol imediat | **112** | 24/7 |
| Abuz, neglijare sau violență asupra unui copil | **119** | 24/7 |
| Telefonul Copilului | **116 111** | luni–vineri, 10:00–20:00 |
| Sprijin emoțional | **116 123** | conform disponibilității serviciului |
| Violență domestică, trafic de persoane și discriminare | **0800 500 333** | 24/7 |

Pentru alcool, droguri sau jocuri de noroc, Emanus îndrumă spre medic și servicii specializate locale. Nu afișează un TelVerde național neconfirmat.

Reguli pentru ecranul de criză:

1. Numerele apar înaintea oricărui verset sau comentariu.
2. Nu cerem omului să descrie ce s-a întâmplat.
3. În pericol imediat, mesajul este simplu: **sună la 112 acum**.
4. Resursele se verifică periodic și se modifică numai în registrul canonic.

## 5. Iertarea nu anulează dreptatea

Politica pentru toate lecțiile despre familie, neiertare, biserică și abuz:

- **Iertarea** înseamnă renunțarea la răzbunarea personală și predarea judecății lui Dumnezeu.
- **Împăcarea** cere două persoane, adevăr, pocăință și schimbare reală.
- **Încrederea** se reconstruiește în timp și nu este datorată automat.
- **Limitele** pot rămâne necesare după iertare.
- **Poliția, protecția copilului, medicul și instanța** nu sunt o negare a iertării.
- Întoarcerea într-un loc periculos nu este o dovadă de credință sau ascultare.

## 6. Minori și persoane vulnerabile

- Nu servim minorilor automat lecții pentru adulți despre avort, infidelitate sau sexualitate explicită.
- Pentru un copil aflat în pericol: `119` sau `112`.
- `116 111` se afișează împreună cu programul, nu ca serviciu 24/7.
- Nu cerem adresă, școală, fotografii, numele părinților ori alte date care nu sunt necesare.
- Nu există mesagerie privată între utilizatori.
- Comunitatea și mentoratul nu se lansează fără moderare umană, raportare, verificarea adulților și reguli speciale pentru minori.

## 7. Confidențialitatea scrierilor

Jurnalul, rugăciunile și notele sunt private, dar textul afișat depinde de configurația reală:

- fără cloud: se păstrează numai pe dispozitiv;
- cu backup: se păstrează pe dispozitiv și în copia privată asociată contului.

Nu mai folosim promisiunea hardcodată „nu pleacă niciodată de pe telefon”. Mesajul activ este generat de `apps/web/src/privacy.ts`.

Nimeni din echipa pastorală nu primește automat acces la jurnal. Întrebările trimise prin „Întreabă” sunt un flux separat, explicit.

Ștergerea locală a unei rugăciuni sau intrări trebuie reflectată și în cloud; altfel conținutul ar putea reapărea pe alt dispozitiv.

## 8. Ce măsurăm

Produsul nou nu măsoară valoarea spirituală a omului:

- fără XP;
- fără nivel;
- fără streak;
- fără radar spiritual;
- fără clasament;
- fără procent de sfințire.

Progresul tehnic poate reține numai locul în drum sau curs, pentru continuitatea experienței. Absența schimbă tonul, nu scorul.

Engine-ul vechi este izolat prin `@emanus/shared/legacy`; aplicația web nouă nu are voie să importe simbolurile lui.

## 9. Biblia explicată și starea `in_review`

Scriptura este autoritatea finală. Explicația Emanus este o lucrare omenească și poate fi corectată.

- `draft`: nu este conținut de parcurs și rămâne ascuns.
- `in_review`: este vizibil în aplicație contului proprietarului cu rol `admin`, pentru testare în experiența reală.
- `published`: este vizibil publicului.

Daniel Văduva este reviewerul uman final înainte de lansare. El parcurge conținutul ca primul utilizator și decide dacă trece la `published`.

Aprobarea nu înseamnă infailibilitate. Înseamnă că textul a fost citit, comparat cu Scriptura și asumat înainte de publicare.

Registrul și criteriile auditului sunt în `docs/40-audit-biblic-si-editorial.md`.

## 10. Drepturi de autor

- Materialele secundare sunt surse de cercetare, nu texte de copiat.
- Conținutul Emanus trebuie formulat original.
- Materialul Mohler cu drepturi neclarificate nu este expus în runtime.
- RCCV nu este declarată domeniu public pentru România. Lansarea publică a textului biblic cere clarificarea și permisiunea titularului drepturilor.
- Numele unui predicator sau autor nu este folosit ca autoritate doctrinară finală; fiecare afirmație se cântărește prin Scriptură.

## 11. Înainte de comunitate, mentorat și creatori

Aceste zone rămân blocate până există:

1. responsabil uman identificat;
2. reguli publice;
3. raportare și retragere rapidă;
4. moderare reală;
5. interdicția solicitării de bani și a sfatului medical/juridic prezentat drept profesional;
6. verificarea mentorilor și regula a doi adulți pentru minori;
7. validare biblică, de siguranță și de drepturi pentru fiecare curs de creator.

## 12. Checklist înaintea unei lecții

- [ ] Pasajul spune în context ceea ce afirmă lecția.
- [ ] Interpretarea este marcată drept interpretare.
- [ ] Nu sunt inventate gândurile personajelor biblice.
- [ ] Nu este lărgită o promisiune dincolo de destinatarii ei.
- [ ] Nu este folosită o etimologie ca dovadă a doctrinei.
- [ ] Nu este diagnosticat spiritual un simptom medical.
- [ ] Nu este pusă vină suplimentară pe victimă.
- [ ] Iertarea rămâne distinctă de împăcare, încredere și consecințe.
- [ ] Lecția sensibilă are safety gate și resursele corecte.
- [ ] Mesajul despre stocarea datelor este adevărat pentru configurația curentă.
- [ ] Textul este original sau drepturile sunt clare.
- [ ] Omul poate distinge Scriptura de explicația Emanus.
- [ ] Există un pas concret, fără promisiune de rezultat garantat.
