# Audit inițial — corpus Noul Testament

Data: `2026-08-05`

## Inventar verificat direct

- 27 de cărți;
- 260 de capitole;
- 7.941 de versete în schema de versificație SBLGNT;
- 135 de capitole cu text românesc;
- 125 de capitole integral `DE TRADUS`;
- zero capitole mixte;
- toate capitolele NT rămân `in_review`, `public: false`.

Descrierea inițială a PR-ului sursă indica 139/121, dar fișierele efective conțin 135/125. Inventarul din repository este autoritatea pentru progres.

## Reparații structurale aplicate

- normalizare Unicode NFC în `JHN.5` și `ACT.24`;
- nouă defecte de ghilimele reparate în `MAT.5`, `MAT.7`, `MAT.13`, `MAT.20`, `MAT.25`, `MRK.12`, `MRK.14`, `ACT.1` și `ACT.22`;
- sursele VT existente și excepția de versificație Numeri 25:19 / 26:1 păstrate în snapshotul unificat;
- poarta anti-placeholder blochează `approved` și `published`, dar permite inventarierea capitolelor `in_review`.

## Formulări corectate după SBLGNT și WEBU

- `MAT.10.7` — verbul grec `kēryssō` este redat explicit prin „predicați”, iar participiul `poreuomenoi` prin „în timp ce mergeți”;
- `MRK.7.8` — `krateite` este redat prin „țineți cu strășnicie”; extensia TR despre vase și pahare nu este introdusă în textul SBLGNT;
- `MRK.7.22` — lista este aliniată lexical cu SBLGNT, păstrând `moicheiai` — „adultere”, absent din lectura TR a versetului;
- `ACT.2.10` — versetul se încheie la vizitatorii din Roma conform SBLGNT; „iudei și prozeliți” rămâne în 2:11;
- `ACT.13.32` — `euangelizomai` este redat natural prin „vă aducem vestea bună”;
- `1CO.13.7` — repetiția `panta` este păstrată concis: „totul”.

## Diferențe SBLGNT / TR care rămân pentru audit editorial

- `LUK.6.18` — SBLGNT păstrează și propoziția despre cei veniți să asculte și să fie vindecați; TR și etaloanele românești sunt mai scurte;
- `ACT.13.38–39` — SBLGNT distribuie propoziția despre Legea lui Moise între cele două versete diferit față de TR;
- `ACT.15.18` — SBLGNT are lectura scurtă „cunoscute din veac”, în timp ce TR explicitează subiectul și lucrările lui Dumnezeu.

Aceste diferențe nu vor fi „reparate” prin importarea textului TR. Înainte de publicare vor primi note editoriale rezolvate și excepții deterministe limitate exact la versetele afectate.
