# Audit de inventar — corpusul Noului Testament

- Bază auditată: `origin/main` la `2260149cd078d4442a1111e33e74d02567bb6a45`
- Domeniu: cele 27 de cărți, 260 de capitole și 7.941 de versete din `docs/data/biblia-emanus/`
- Tip audit: read-only, reproductibil; nu modifică niciun fișier de corpus

## Verdict

Am confirmat un **minim de 54 de defecte textuale care blochează publicarea**. Acesta este un prag inferior, nu o estimare a tuturor problemelor semantice: include numai locurile pentru care textul activ este vizibil trunchiat, lipit, rămas în engleză/transliterare sau incompatibil cu sensul de bază confirmat de WEBP și de etaloanele românești disponibile.

În plus, scanarea a găsit 153 de tokenuri pentru care forma actuală cu `î` este respinsă de corectorul român, iar aceeași formă cu `â` este acceptată; 370 de versete au cel puțin un token rar/neacceptat care nu apare în niciunul dintre etaloanele românești. Aceste două cifre sunt inventar de triere, nu verdict semantic automat.

## Defecte confirmate (minimum)

Toate rândurile indică fișierul activ `docs/data/biblia-emanus/<CARTE>.<CAPITOL>.json`; textul citat este fragmentul defect din BE. „Confirmare” înseamnă comparație directă cu WEBP și, unde versificarea permite, BTF și Biblia Liberă din snapshotul fixat.

| Categorie | Referință / fișier | Fragment BE defect | Confirmare concisă |
| --- | --- | --- | --- |
| lipire/trunchiere | EPH 2:11 — `EPH.2.json` | `De aceea,-vă ... numitenecircumcizie ... secircumcizie` | lipsesc „amintiți-”, spații și verbe; toate sursele redau „numiți ... circumcizie”. |
| lipire/trunchiere | ACT 14:11 — `ACT.14.json` | `Cânda ... Pavel,-a ridicat glasul` | „Când mulțimea ... și-a ridicat glasul” este distrus sintactic. |
| lipire/trunchiere | JAS 2:18 — `JAS.2.json` | `fapte,-ți voi arăta` | lipsește coordonarea „iar eu/și eu”; ghilimelele sunt inversate. |
| lipire/trunchiere | LUK 23:46 — `LUK.23.json` | `îmi încrediz duhul ... cuvinte,-a dat` | verb trunchiat și pronume/verb pierdut. |
| lipire/trunchiere | JHN 13:12 — `JHN.13.json` | `picioarele,-a pus haina de pe s-a ... tiți` | mai multe cuvinte și litere lipsesc. |
| lipire/trunchiere | JHN 21:7 — `JHN.21.json` | `este Domnul,-a înfășurat` | lipsește „și”; construcția devine negramaticală. |
| lipire/trunchiere | LUK 11:1 — `LUK.11.json` | `Când-a ... Doamne,-ne` | cuvintele „a”/„învață-” au fost pierdute. |
| lipire/trunchiere | LUK 7:39 — `LUK.7.json` | `lucrul acesta,-a spus` | pronumele reflexiv („și-a”) a fost corupt. |
| lipire/trunchiere | LUK 12:33 — `LUK.12.json` | `ce dați ... nevoia.-vă pungi` | obiectul și începutul imperativei sunt trunchiate. |
| lipire/trunchiere | LUK 24:6 — `LUK.24.json` | `a înviat.-vă ce v-a spus` | lipsește „amintiți-”. |
| lipire/trunchiere | JHN 19:14 — `JHN.19.json` | `Ziua Pregătiriilui ... ceasul allea` | două lipiri/trunchieri în informația temporală. |
| lipire/trunchiere | JHN 19:17 — `JHN.19.json` | `numitLocul ... ebraicăGolgota` | cuvinte concatenate și verbul „a ieșit” omis. |
| lipire/trunchiere | TIT 1:11 — `TIT.1.json` | `să le, de dragulului necinstit` | complementul și sintagma „unui câștig” sunt corupte. |
| lipire/trunchiere | LUK 8:39 — `LUK.8.json` | `voi. bază a mers` | subiectul „El” este înlocuit de un cuvânt fără sens contextual. |
| lipire/trunchiere | LUK 16:9 — `nu veții ... corturilee` | două cuvinte trunchiate/lipite. |
| lipire/trunchiere | LUK 21:10 — `împotrivai ... împără` | ambele nume sunt tăiate. |
| lipire/trunchiere | LUK 11:29 — `strînsmile ... Aceasta este o rea` | cuvânt lipit și substantivul „generație” pierdut. |
| lipire/trunchiere | LUK 18:6 — `Ascul ce spune` | imperativul „Ascultați” este tăiat. |
| lipire/trunchiere | LUK 18:35 — `un orb s-a lângă drum, cernd` | verbul principal lipsește. |
| lipire/trunchiere | LUK 23:38 — `o inscrip cu litere, latine ebraice` | „inscripție” și „grecești” sunt pierdute. |
| lipire/trunchiere | LUK 9:14 — `cam cinci mii de.` | substantivul „bărbați/oameni” lipsește. |
| lipire/trunchiere | MAT 26:65 — `marele preot-a sfîat hainele` | forma corectă cere „și-a sfâșiat”. |
| lipire/trunchiere | MAT 26:75 — `Petru-a adus aminte ... a ieșit a plîns` | lipsesc două forme ale lui „și”. |
| lipire/trunchiere | REV 1:7 — `Toate semin pământului` | „semințiile” este trunchiat. |
| lipire/trunchiere | REV 5:5 — `semia ... cartea cele peceți` | două sintagme sunt gramatical incomplete. |
| lipire/trunchiere | HEB 9:2 — `sfenicul, masa pînea ... care se Locul Sfînt` | lipsesc prepoziții și verbul/copula. |
| lipire/trunchiere | HEB 12:6 — `îl pedepse îl pedepse pe fiecare fiu pe care îl` | fraza se termină incomplet și repetă un verb tăiat. |
| lipire/trunchiere | 1TI 1:9 — `nd aceasta ... pentrui de ta șii` | începutul și trei substantive sunt corupte. |
| lipire/trunchiere | JAS 2:16 — `nu le-dat lucrurile` | condiționalul/verbului îi lipsesc caractere. |
| lipire/trunchiere | REV 22:7 — `păz cuvinteleei` | verb și pronume lipite/trunchiate. |
| lipire/trunchiere | REV 8:11 — `esteWormwood` | nume englez lipit de copulă; sursele românești au „pelin”. |
| lipire/trunchiere | LUK 8:49 — `unul din stăpînitorul casei sinagogii` | relația sintactică este ruptă („din casa ...”). |
| lipire/trunchiere | LUK 8:35 — `omul ... îmbrăcați și cu mintea lui` | acordul singular/plural este imposibil. |
| lipire/trunchiere | LUK 11:7 — `Pot să nu te ridici și să-l dau la tine?` | persoanele verbale și obiectul sunt corupte. |
| lipire/trunchiere | LUK 10:4 — `Salut pe nimeni pe drum` | imperativul negativ corect este „Nu salutați pe nimeni”. |
| lipire/trunchiere | REV 14:15 — `trimete secera și secera` | imperativele/posesivul sunt corupte; WEBP are „Send your sickle and reap”. |
| lipire/trunchiere | HEB 9:28 — `nu pentru a face păcatului` | sintagmă negramaticală în locul sensului „fără păcat”. |
| lipire/trunchiere | JHN 10:38 — `Tatăl este în Mine Eu în Tatăl` | lipsește conjuncția care leagă predicatele. |
| engleză/transliterare | REV 17:5 — `REV.17.json` | `Mystery, Babylon the Great, the Mother ...` | întregul titlu rămâne în engleză. |
| engleză/transliterare | JHN 20:5 — `JHN.20.json` | `Stooping și în căutarea în` | fragment englez și rest de frază neinteligibil. |
| engleză/transliterare | JHN 21:11 — `JHN.21.json` | `wi ... plinq ... sutq ... pewti` | transliterare OCR (`q`/`w`) în loc de text românesc. |
| engleză/transliterare | HEB 8:8 — `HEB.8.json` | `Cqci le-a fqcut rqu ... legqmknt ... wi` | transliterare coruptă, nu română publicabilă. |
| engleză/transliterare | REV 21:3 — `REV.21.json` | `Iatq, locuinya ... wi ... knsuw` | transliterare coruptă în mai multe cuvinte. |
| engleză/transliterare | REV 1:11 — `REV.1.json` | `spunând, ا Ceea ce vedeți` | caracter arab străin introdus în text. |
| sens greșit | MAT 3:12 — `MAT.3.json` | `Furculița Lui ... aria` | πτύον este unealta de vânturat; WEBP/BTF/BL converg la „lopată”, nu ustensila de masă. |
| sens greșit | MAT 4:24 — `MAT.4.json` | `oameni chinuiți de lună` | calchiere literală nefirească pentru termenul medical/descrierea persoanelor „lunatice”. |
| sens greșit | JHN 7:22 — `JHN.7.json` | `vă circumcizia un băiat` | verbul trebuie „circumcideți”; textul nu formează propoziție. |
| sens greșit | ROM 14:13 — `ROM.14.json` | `să nu ne mai judecăm unii pe` | complementul este tăiat; sensul normei lipsește. |
| sens greșit | LUK 11:33 — `LUK.11.json` | `cei care vin în poate vedea lumina` | subiectul/verbul sunt corupte. |
| sens greșit | 1PE 4:3 — `1PE.4.json` | `orgii, caruseluri` | „carousings” (petreceri/dezordine) devine „caruseluri”, schimbând sensul. |
| sens greșit | MRK 15:46 — `MRK.15.json` | `l-a rănit în pânza de in` | „înfășurat” este transformat în „rănit”. |
| sens greșit | ACT 27:28 — `ACT.27.json` | `au luat sunete ... stînzi` | „soundings/fathoms” este tradus ca sunete/stânci, nu măsurători/adâncimi. |
| sens greșit | LUK 13:8 — `LUK.13.json` | `am sapat ... fertilizeaza-l` | timpurile/persoanele sunt incompatibile cu cererea grădinarului. |
| sens greșit | LUK 13:26 — `LUK.13.json` | `ai predat pe străzile noastre` | „you taught in our streets” nu poate fi redat prin acest obiect direct. |

## Inventar sistemic, separat de cele 54

| Semnal | Rezultat | Interpretare corectă |
| --- | ---: | --- |
| `[,;:.!?]-` | 10 versete | Toate cele zece sunt fraze românești rupte; BTF și Biblia Liberă au 0 astfel de cazuri. |
| formă neacceptată cu `î`, dar acceptată după `î → â` | 153 tokenuri | Defect ortografic confirmat automat, nu simpla prezență legitimă a unui `î` într-un compus. BTF și Biblia Liberă au 0 la aceeași regulă. |
| token rar/neacceptat, absent din toate cele 3 etaloane românești | 370 versete | Coada de triere pentru revizie umană; include și nume proprii/variante, deci nu se confundă cu un total de erori. |
| token potențial concatenat | 21 versete | Include cazurile evidente de mai sus, dar și compuși corecți; necesită confirmare pe verset. |
| dezechilibru de ghilimele / final cu cuvânt funcțional | 299 / 228 versete | Semnale slabe, deoarece citatele și frazele pot traversa limitele de verset; nu sunt numărate ca defecte confirmate. |

Exemple suplimentare de ortografie demonstrabil nepublicabilă sunt `mîntuirea` (LUK 19:9), `spunînd` (LUK 23:2), `binecuvîn` trunchiat (1PE 3:14), `mâinia` (1TH 2:16), `trimes` (REV 22:6) și pasaje întregi fără diacritice, de exemplu LUK 10:21, JHN 16:21, JHN 21:18, LUK 20:35 și REV 22:15.

## Comparația celor trei etaloane românești fixate

Sunt citite direct din `docs/data/biblia-emanus/sources/nt-sblgnt-1.2.zip`, nu din web:

- **BTF**: are un verset pentru toate cele 7.941 de ținte BE. Include 16 versete suplimentare tradiționale, deci nu trebuie copiat automat în locurile unde SBLGNT are altă versificare/text.
- **Biblia Liberă**: corespunde brut la 7.938 de ținte; ROM 16:25–27 este deja o remapare documentată în `source-lock.json` din ROM 14:24–26, astfel încât poate oferi comparație pentru toate cele 7.941 de ținte după aplicarea regulii existente.
- **Cornilescu 1924**: corespunde brut la 7.884 de ținte. Lacuna de 57 de versete, tot Ioan 11, este deja declarată în manifestul snapshotului. Textul este `ro-Cyrl`, deci nu a fost evaluat cu verificatorul Latin de ortografie.

BTF și Biblia Liberă au fiecare 0 artefacte de tip `,-` și 0 forme neacceptate de regula `î → â` aplicată mai sus. Aceasta este doar o constatare mecanică și de acoperire, **nu** o certificare academică a vreuneia dintre traduceri și nici o recomandare de copiere.

În schema proiectului, toate trei sunt marcate `comparison-only`; licența/proveniența trebuie păstrate separat de orice decizie ulterioară de redactare. O eventuală plasă de siguranță public-domain trebuie să fie documentată verset-cu-verset, să respecte lectura SBLGNT/variantele și să nu fie confundată cu o traducere BE originală.

## Metodologie reproductibilă

Rulați din rădăcina repository-ului:

```sh
python3 scripts/audit-nt-corpus-inventory.py \
  --out /private/tmp/nt-corpus-inventory.json \
  --markdown /private/tmp/nt-corpus-inventory.md
```

Scriptul:

1. încarcă toate capitolele NT publicate și sursele BTF, Biblia Liberă, Cornilescu 1924 și WEBP din snapshotul ZIP fixat;
2. verifică acoperirea versetelor și diferențele de versificare brute;
3. caută lipiri, punctuație-hifen, cuvinte neacceptate, posibile concatenări, extreme de lungime și divergență lexicală;
4. rulează opțional Hunspell românesc prin `spylls` pentru indicatorul ortografic. Auditul de față a folosit dicționarul rospell de la `wooorm/dictionaries`, SHA-256 `c26a9356f598a0ae89e7be650f6bdd9ba70acce66b41d7ab14c0c68639b6ed33`; lipsa acestei dependențe nu modifică citirea surselor sau semnalele structurale;
5. păstrează rezultatele automate drept triere. Lista de 54 de mai sus a fost apoi confirmată manual cu WEBP și cu etaloanele românești disponibile.

Limită importantă: metoda nu poate certifica sensul tuturor celor 7.941 de versete față de SBLGNT. Ea demonstrează însă că afirmația curentă de audit „0 probleme” este falsă și că publicarea trebuie blocată până la revizie semantică verset-cu-verset.
