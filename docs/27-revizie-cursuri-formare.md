# Revizia cursurilor de formare, suferință și dependențe

Ultima actualizare: 1 august 2026

## Ce a intrat în catalog

| Curs | Lecții | Stare runtime | Protecție specială |
| --- | ---: | --- | --- |
| Pocăință, mărturisire și reparare | 6 | live | adevăr datorat fără expunere publică; reparare fără acces forțat la victimă |
| Providență, boală, disciplină și suferință | 6 | live | cauzalitate afirmată numai când textul sau faptele o stabilesc |
| Cum citesc Biblia în context | 6 | live | gen, context, descriere/poruncă și interpretare/aplicație |
| Duhul Sfânt și viața credinciosului | 6 | live | pozițiile disputate sunt numite, nu ascunse |
| Botezul, Cina și apartenența la Biserică | 6 | live | credobaptism, pedobaptism și pozițiile despre Cină sunt prezentate fără caricatură |
| Psalmii ca școală de rugăciune | 6 | live | plângere, mărturisire, mulțumire, dreptate și așteptare |
| Alcool: adevăr, tratament și trezvie | 6 | live | poartă de siguranță la fiecare lecție |
| Droguri: din robie spre viață | 6 | live | poartă de siguranță la fiecare lecție |
| Jocuri de noroc: oprește pierderea | 6 | live | poartă de siguranță la fiecare lecție |
| Doliu după pierderea prin sinucidere | 5 | planned, blocat | `requiredReviews: ["pastoral", "clinical"]`, fără aprobări și fără lecții publice |

`live` în acest tabel înseamnă conectat tehnic și trecut prin verificările
automate. Nu înseamnă că un revizor uman a aprobat fiecare formulare.

## Standard editorial aplicat

1. Păcatul cunoscut este numit direct, fără eufemism și fără mutarea vinei.
2. Pocăința include oprire, mărturisire către persoanele potrivite, reparare și
   acceptarea consecințelor; nu cumpără iertarea ori refacerea relației.
3. Boala sau tragedia nu devin automat dovada unui păcat ascuns. Când legătura
   dintre faptă și consecință este cunoscută, lecția nu o numește simplă
   încercare; când nu este cunoscută, nu o inventează.
4. Ramurile răspund diferit alegerii omului. Nu sunt trei etichete care duc la
   același paragraf.
5. Fiecare curs live nou cere cel puțin o alegere, un test de înțelegere, un
   răspuns scris și un pas practic. Cursurile-cheie se încheie și cu o
   declarație formulată de utilizator, nu cu o bifă automată.
6. Textele despre abuz, infracțiune și dependență nu cer contact nesigur și nu
   ascund răspunderea față de victimă sau autorități sub secret pastoral.

## Puncte doctrinare care cer lectură umană

- **Providență:** se verifică împreună `Ioan 9`, `Iov 42`, `Luca 13`,
  `1 Corinteni 11`, `Ioan 5` și `Evrei 12`, ca să nu fie eliminată nici
  disciplina, nici limita diagnosticului omenesc.
- **Duhul Sfânt:** reprezentarea cesaționistă și continuționistă trebuie
  confirmată de revizori care își recunosc reciproc descrierea.
- **Botez și Cină:** credobaptiștii, pedobaptiștii și tradițiile sacramentale
  trebuie să-și recunoască poziția în rezumat înaintea lansării publice finale.
- **Psalmi:** parafrazele trebuie colationate cu traducerea biblică aleasă, iar
  psalmii de judecată trebuie să rămână separați de răzbunarea personală.
- **Pocăință:** orice mărturisire care poate crea risc juridic, clinic sau de
  siguranță se planifică împreună cu oamenii competenți; aplicația nu dă
  instrucțiuni individuale pentru contactarea victimei.

## Puncte clinice verificate și limite

- Oprirea bruscă a alcoolului după consum greu și prelungit poate deveni
  periculoasă pentru viață; de aceea cursul cere evaluare medicală și nu oferă
  o schemă de sevraj. Sursă: [NIAAA — Understanding Alcohol Use Disorder](https://www.niaaa.nih.gov/publications/brochures-and-fact-sheets/understanding-alcohol-use-disorder).
- La suspiciunea de supradoză, cursul cere apelarea serviciului de urgență și
  rămânerea cu persoana, nu așteptarea sau ascunderea situației. Sursă:
  [CDC — Lifesaving Naloxone](https://www.cdc.gov/stop-overdose/response/index.html).
- Doliul prin sinucidere poate cere sprijin specializat; un text automat nu
  substituie evaluarea și îngrijirea umană. Surse:
  [WHO — Suicide](https://www.emro.who.int/mhps/suicide.html) și
  [WHO — Starting a support group for survivors of suicide loss](https://www.who.int/publications/b/81216).

Aceste surse justifică numai regulile generale de siguranță. Ele nu reprezintă
revizia clinică a celor cinci lecții draft și nu deblochează acel curs.

## Condiția de publicare a cursului despre sinucidere

Publicarea cere toate cele de mai jos:

1. revizor pastoral identificat și aprobare consemnată;
2. revizor clinic cu experiență relevantă și aprobare consemnată;
3. verificarea limbajului despre vină, responsabilitate și verdict veșnic;
4. verificarea fiecărui îndemn de criză și a resurselor românești actuale;
5. test cu utilizatori îndoliați, moderat de un profesionist, fără colectarea
   detaliilor grafice;
6. abia apoi `approvedReviews: ["pastoral", "clinical"]`, `state: "live"` și
   adăugarea celor cinci ID-uri în manifestul public.

Niciun agent, script sau rezultat CI nu poate completa aprobările în numele
acestor oameni.

## Livrare tehnică

- Manifestul inclus în aplicație conține numai rezumatele și ordinea publică.
- Lecția completă se cere întâi din Supabase, apoi din API și cache.
- Fallback-ul local se încarcă dinamic pe grupul cursului, nu ca un singur
  pachet cu toate cele 318 lecții.
- `scripts/check-library-loaders.mjs` compară în CI fiecare loader cu sursa
  runtime și oprește release-ul dacă lipsește ori se schimbă un ID.
- Modulele locale de conținut sunt excluse din precache-ul PWA; numai lecțiile
  deschise ajung în cache-ul offline al utilizatorului.
