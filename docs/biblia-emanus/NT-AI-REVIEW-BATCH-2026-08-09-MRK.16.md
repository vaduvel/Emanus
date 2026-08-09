# Revizie AI, lot Marcu 16

Statut: `in_review` — **nu este aprobare de publicare**.

Data: `2026-08-09`

Reviewer: `GPT-5.6 Sol` (`ai`; rulare: `emanus-nt-editorial-2026-08-09-mrk-16-gpt56sol-a71c`)

## Surse consultate și statutul finalului

Marcu 16:1–8 a fost reverificat direct față de SBLGNT 1.2 la commitul fixat `c4d241a9c1c479a55b989ba35a4976c1d0b8052c` și aparatul aferent. După 16:8, SBLGNT păstrează **două forme între paranteze duble**: finalul scurt nenumerotat și finalul lung 16:9–20.

Dovezile nu sunt reduse la formula „mai vechi = automat corect”. Codex Sinaiticus și Codex Vaticanus se încheie la 16:8. În schimb, finalul lung 16:9–20 este prezent în numeroși martori ulteriori importanți, inclusiv Alexandrinus, și este cunoscut foarte devreme: Ireneu citează explicit Marcu 16:19 în *Against Heresies* 3.10.5, în secolul II. Finalul scurt are o tradiție manuscrisă separată; Codex Regius (L) păstrează atât finalul scurt, cât și pe cel lung cu note care arată conștientizarea variantelor.

Prin urmare, corpul JSON păstrează 16:9–20 cu `textualStatus: "double-bracketed"`, iar finalul scurt în `alternateEndings`. Niciuna dintre forme nu este contopită cu 16:8 și nici nu este prezentată ca autograf cert.

CORNILESCU-1924, BTF și NTR nu au fost consultate în această rulare; `consultedInBatch: false` pentru toate trei. Nu s-a copiat o traducere românească.

## Decizii pe verset

| Referință BE | Ancoră SBLGNT verificată | Decizie |
| --- | --- | --- |
| MRK.16.1 | `Καὶ διαγενομένου τοῦ σαββάτου ... ἠγόρασαν ἀρώματα` | Verificat direct; sensul și relațiile sintactice ale formei SBLGNT sunt păstrate. |
| MRK.16.2 | `λίαν πρωῒ ... ἀνατείλαντος τοῦ ἡλίου` | Se păstrează „foarte devreme” împreună cu faptul că soarele răsărise. |
| MRK.16.3 | `Τίς ἀποκυλίσει ... τὸν λίθον` | Verificat direct; sensul și relațiile sintactice ale formei SBLGNT sunt păstrate. |
| MRK.16.4 | `ἀναβλέψασαι ... ἀποκεκύλισται ὁ λίθος` | Verificat direct; sensul și relațiile sintactice ale formei SBLGNT sunt păstrate. |
| MRK.16.5 | `νεανίσκον ... στολὴν λευκήν ... ἐξεθαμβήθησαν` | Verificat direct; sensul și relațiile sintactice ale formei SBLGNT sunt păstrate. |
| MRK.16.6 | `Ἰησοῦν ... τὸν ἐσταυρωμένον· ἠγέρθη` | ἠγέρθη este redat pasiv „A fost înviat”. |
| MRK.16.7 | `εἴπατε ... τοῖς μαθηταῖς ... καὶ τῷ Πέτρῳ` | Verificat direct; sensul și relațiile sintactice ale formei SBLGNT sunt păstrate. |
| MRK.16.8 | `τρόμος καὶ ἔκστασις ... οὐδενὶ οὐδὲν ... ἐφοβοῦντο γάρ` | Aici se încheie secvența critică principală; finalurile alternative rămân marcate separat. |
| MRK.16.9 | `⟦Ἀναστὰς δὲ πρωῒ ... Μαρίᾳ τῇ Μαγδαληνῇ` | Începutul finalului lung este păstrat cu statut `double-bracketed`, nu ca text necontestat. |
| MRK.16.10 | `ἀπήγγειλεν ... πενθοῦσι καὶ κλαίουσιν` | Verificat direct; sensul și relațiile sintactice ale formei SBLGNT sunt păstrate. |
| MRK.16.11 | `ὅτι ζῇ ... ἠπίστησαν` | Verificat direct; sensul și relațiile sintactice ale formei SBLGNT sunt păstrate. |
| MRK.16.12 | `ἐν ἑτέρᾳ μορφῇ ... πορευομένοις εἰς ἀγρόν` | Nu se introduce Emaus; `εἰς ἀγρόν` rămâne simplu „spre câmp”. |
| MRK.16.13 | `ἀπήγγειλαν τοῖς λοιποῖς ... οὐδὲ ... ἐπίστευσαν` | Verificat direct; sensul și relațiile sintactice ale formei SBLGNT sunt păstrate. |
| MRK.16.14 | `τοῖς ἕνδεκα ... ὠνείδισεν ... ἀπιστίαν ... σκληροκαρδίαν` | Verificat direct; sensul și relațiile sintactice ale formei SBLGNT sunt păstrate. |
| MRK.16.15 | `Πορευθέντες ... κηρύξατε τὸ εὐαγγέλιον πάσῃ τῇ κτίσει` | Verificat direct; sensul și relațiile sintactice ale formei SBLGNT sunt păstrate. |
| MRK.16.16 | `ὁ πιστεύσας καὶ βαπτισθεὶς ... ὁ δὲ ἀπιστήσας` | Condamnarea este legată de necredință; nu se adaugă „și nu este botezat”. |
| MRK.16.17 | `σημεῖα ... γλώσσαις λαλήσουσιν καιναῖς` | Păstrăm `καιναῖς` — „limbi noi” — conform SBLGNT/NA28/RP. |
| MRK.16.18 | `ὄφεις ἀροῦσιν ... θανάσιμόν ... ἀρρώστους` | SBLGNT are `ὄφεις` fără „cu mâinile”; diferența față de NA28 este explicită. |
| MRK.16.19 | `ὁ ... κύριος Ἰησοῦς ... ἀνελήμφθη ... ἐκ δεξιῶν` | Păstrăm `Ἰησοῦς` — „Domnul Isus”; RP îl omite. |
| MRK.16.20 | `ἐκήρυξαν πανταχοῦ ... συνεργοῦντος ... σημείων⟧` | Finalul lung se oprește fără `Ἀμήν`; RP adaugă Amin. |

## Variante și alegeri editoriale cu impact

- **16:8 — punctul de ruptură:** Sinaiticus și Vaticanus se încheie aici; textul principal păstrează finalul abrupt `ἐφοβοῦντο γάρ`.
- **Finalul scurt:** SBLGNT îl păstrează nenumerotat, între paranteze duble; este stocat separat în `alternateEndings`.
- **16:9–20 — finalul lung:** este stocat integral, dar fiecare verset are `textualStatus: "double-bracketed"`. Faptul că este absent din א/B nu anulează vechimea tradiției sale: 16:19 este citat explicit de Ireneu în secolul II.
- **16:12:** `εἰς ἀγρόν` nu este armonizat cu Luca prin numele „Emaus”.
- **16:16:** a doua clauză are numai `ὁ δὲ ἀπιστήσας`; nu se adaugă doctrinar o condiție despre nebotezare.
- **16:17:** SBLGNT/NA28/RP au `καιναῖς` — „limbi noi”; WH/Treg îl omit.
- **16:18:** SBLGNT selectează `ὄφεις ἀροῦσιν`, fără `καὶ ἐν ταῖς χερσὶν`; WH/Treg/NA28 au expresia mai lungă. Este un loc unde SBLGNT nu urmează NA28.
- **16:19:** SBLGNT/WH/Treg/NA28 au `κύριος Ἰησοῦς`; RP omite `Ἰησοῦς`.
- **16:20:** SBLGNT/WH/Treg/NA28 se încheie la `σημείων`; RP adaugă `Ἀμήν`.

## Integritate

- `verseCoverage`: `20/20`, continuu; 16:9–20 sunt marcate `double-bracketed`.
- `verseNumbersSha256`: `sha256:ce02aec498756856567446a2f4cb35b219ea726d81089769eddd1499c99ba95f`
- `textDigest`: `sha256:6889e1eda222399efa239a53381642aa49c48468c5b754958b9017d91f7aa13b`
- `contentDigest`: `sha256:c34e26751805da7e55025b873f2de42a627d4941fa14e4003da75f48765e0932`
- `status`: `in_review`
- `public`: `false`
- Nicio aprobare umană și nicio publicare nu sunt declarate.
