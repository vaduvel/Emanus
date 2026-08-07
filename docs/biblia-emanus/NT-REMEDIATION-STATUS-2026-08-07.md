# Statusul remedierii NT — 2026-08-07

## Verdict

Noul Testament a primit remedieri punctuale pentru toate cele 54 de locuri
P0 enumerate în inventarul de bază, dar **nu este aprobat și nu este
publicabil**. Remedierile sunt loturi confirmate de schimbări de text, nu
dovada unei revizii semantice complete sau a unei aprobări editoriale.

Revizia editorială identificată este în curs la AI-ul desemnat. Până în acest
punct au fost revizuite și documentate 556 din cele 7.941 de versete BE
(7,00%), în treizeci de loturi. Aceste jurnale de lucru nu sunt registrul final
per-verset și nu constituie aprobare de publicare.

## Baza verificării

- Comparație: `origin/main` la `2260149cd078d4442a1111e33e74d02567bb6a45`
  față de `HEAD` la `c3d5238876fdc2f14482c2933ad904f6040e8295`.
- Domeniu: cele 27 de cărți, 260 de capitole și 7.941 de versete NT.
- Inventar de bază: `NT-CORPUS-INVENTORY-AUDIT-2026-08-07.md`.

Compararea versetelor enumerate în inventarul de bază arată că textul s-a
schimbat pentru **54 din 54** de referințe: 38 de cazuri de
lipire/trunchiere, 6 de engleză/transliterare și 10 de sens greșit. Această
constatare confirmă numai că toate referințele au fost remediate în loturi
urmăribile în istoric; nu afirmă că fiecare formulare nouă este definitivă
sau aprobată.

## Starea actuală de publicare

| Element | Stare verificată |
| --- | --- |
| Capitole NT | 260 din 260 sunt `in_review` |
| Vizibilitate capitole NT | 260 din 260 au `public: false` |
| Versete NT | 7.941 |
| Coada editorială | 7.941 intrări, toate `pending` |
| Registru de aprobare per-verset | lipsește; există numai schema |
| Catalog runtime | `withheld`, cu `approval: null` |
| Cărți NT expuse de catalogul runtime | listă goală |

Loturile revizuite până acum sunt:

| Lot | Versete BE | Jurnal de revizie |
| --- | ---: | --- |
| `3JN.1` | 14 | `NT-AI-REVIEW-BATCH-2026-08-07-3JN.1.md` |
| `2JN.1` | 13 | `NT-AI-REVIEW-BATCH-2026-08-07-2JN.1.md` |
| `TIT.1` | 16 | `NT-AI-REVIEW-BATCH-2026-08-07-TIT.1.md` |
| `TIT.2` | 15 | `NT-AI-REVIEW-BATCH-2026-08-07-TIT.2.md` |
| `TIT.3` | 15 | `NT-AI-REVIEW-BATCH-2026-08-07-TIT.3.md` |
| `PHM.1` | 25 | `NT-AI-REVIEW-BATCH-2026-08-07-PHM.1.md` |
| `JUD.1` | 25 | `NT-AI-REVIEW-BATCH-2026-08-07-JUD.1.md` |
| `2PE.1` | 21 | `NT-AI-REVIEW-BATCH-2026-08-07-2PE.1.md` |
| `2PE.2` | 22 | `NT-AI-REVIEW-BATCH-2026-08-07-2PE.2.md` |
| `2PE.3` | 18 | `NT-AI-REVIEW-BATCH-2026-08-07-2PE.3.md` |
| `1PE.1` | 25 | `NT-AI-REVIEW-BATCH-2026-08-07-1PE.1.md` |
| `1PE.2` | 25 | `NT-AI-REVIEW-BATCH-2026-08-07-1PE.2.md` |
| `1PE.3` | 22 | `NT-AI-REVIEW-BATCH-2026-08-07-1PE.3.md` |
| `1PE.4` | 19 | `NT-AI-REVIEW-BATCH-2026-08-07-1PE.4.md` |
| `1PE.5` | 14 | `NT-AI-REVIEW-BATCH-2026-08-07-1PE.5.md` |
| `1TH.1` | 10 | `NT-AI-REVIEW-BATCH-2026-08-07-1TH.1.md` |
| `1TH.2` | 20 | `NT-AI-REVIEW-BATCH-2026-08-07-1TH.2.md` |
| `1TH.3` | 13 | `NT-AI-REVIEW-BATCH-2026-08-07-1TH.3.md` |
| `1TH.4` | 18 | `NT-AI-REVIEW-BATCH-2026-08-07-1TH.4.md` |
| `1TH.5` | 28 | `NT-AI-REVIEW-BATCH-2026-08-07-1TH.5.md` |
| `1TI.1` | 20 | `NT-AI-REVIEW-BATCH-2026-08-07-1TI.1.md` |
| `1TI.2` | 15 | `NT-AI-REVIEW-BATCH-2026-08-07-1TI.2.md` |
| `1TI.3` | 16 | `NT-AI-REVIEW-BATCH-2026-08-07-1TI.3.md` |
| `1TI.4` | 16 | `NT-AI-REVIEW-BATCH-2026-08-07-1TI.4.md` |
| `1TI.5` | 25 | `NT-AI-REVIEW-BATCH-2026-08-07-1TI.5.md` |
| `1TI.6` | 21 | `NT-AI-REVIEW-BATCH-2026-08-07-1TI.6.md` |
| `2TH.1` | 12 | `NT-AI-REVIEW-BATCH-2026-08-07-2TH.1.md` |
| `2TH.2` | 17 | `NT-AI-REVIEW-BATCH-2026-08-07-2TH.2.md` |
| `2TH.3` | 18 | `NT-AI-REVIEW-BATCH-2026-08-07-2TH.3.md` |
| `2TI.1` | 18 | `NT-AI-REVIEW-BATCH-2026-08-07-2TI.1.md` |
| **Total** | **556** | **7,00% din NT** |

Fiecare jurnal păstrează ancorele grecești, sursele consultate și deciziile
de redactare, dar nu este un registru de aprobare. Niciunul nu schimbă
starea `pending` a intrărilor din coadă și nici starea de publicare.
În aceste treizeci de loturi, NTR nu a fost consultată; câmpurile
`consultedInBatch` separă acest fapt de lista istorică de etaloane configurate
în schema corpusului.

Starea este verificată de `withhold-biblia-emanus-nt.py --check` și de
generatorul catalogului runtime. Corpusul brut poate rămâne în repository,
dar aplicația nu îl expune cât timp catalogul este `withheld`.

## Reexecutarea inventarului de triere

S-a rulat de două ori, cu rezultate identice:

```sh
python3 scripts/audit-nt-corpus-inventory.py \
  --out /private/tmp/nt-remediation-status-inventory.json \
  --markdown /private/tmp/nt-remediation-status-inventory.md
```

Pentru baza de mai sus, rezultatul actual este:

| Măsură | Rezultat |
| --- | ---: |
| Versete active analizate | 7.941 |
| Versete semnalate pentru triere | 837 |
| Tokenuri probabile `î → â` | 138 |
| Token rar/neacceptat | 334 semnale |
| Token posibil concatenat | 15 semnale |
| Final cu cuvânt funcțional | 227 semnale |
| Ghilimele românești dezechilibrate | 287 semnale |
| Lipsă spațiu după virgulă/punct și virgulă/două puncte | 19 semnale |
| Suprapunere lexicală foarte mică cu toate etaloanele RO | 1 semnal |

Rândurile de mai sus se pot suprapune: cele 883 de semnale pe categorii nu
reprezintă 883 de versete distincte. Inventarul folosește instantaneul fixat
SBLGNT/WEBP și etaloanele românești disponibile numai ca instrumente de
triagere și comparație.

Un semnal nu este, singur, verdict de eroare: numele proprii, compușii,
citatele care trec granița dintre versete și alegerile stilistice pot produce
semnale legitime. Invers, lipsa unui semnal nu dovedește corectitudinea
semantică a unui verset. Prin urmare, aceste cifre nu dovedesc că toate cele
837 de locuri sunt defecte și nici că restul corpusului este curat.

## Ce rămâne de făcut

1. AI-ul desemnat continuă revizia de sursă și de română pentru **fiecare
   dintre cele 7.941 de versete**, nu numai pentru cele 837 de locuri de
   triere. Se continuă cu semnalele cu risc mare și cu variantele textuale;
cele treizeci de loturi documentate nu substituie revizia completă.
2. Se creează registrul per-verset legat de textul exact: referința, digestul
   BE, referințele/digesturile SBLGNT și WEBP, etaloanele românești consultate,
   ancorele relevante, decizia editorială și justificarea individuală.
3. AI-ul desemnat rezolvă și notează explicit variantele textuale, omisiunile,
   registrele românești și orice diferență semantică descoperită. O formulare
   repetată la nivel de capitol nu înlocuiește această dovadă individuală.
4. Se validează registrul complet împotriva corpusului și a snapshoturilor
   fixate; orice schimbare ulterioară a textului invalidează intrările afectate
   și cere reexaminare.
5. Numai după finalizarea acestor pași se poate lua separat o decizie de
   aprobare și de publicare; până atunci capitolele rămân `in_review`, iar
   catalogul runtime rămâne `withheld`.

Acest raport documentează starea de remediere și de blocare a publicării. Nu
este un registru de aprobare, nu substituie revizia per-verset și nu declară
Noul Testament gata de publicare.
