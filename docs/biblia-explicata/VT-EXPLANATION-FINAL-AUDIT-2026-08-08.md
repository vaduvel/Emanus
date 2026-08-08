# Vechiul Testament explicat — audit final al explicațiilor

Data: 2026-08-08

## Verdict

**EXPLANATIONS_COMPLETE_IN_REVIEW**

Acest verdict privește numai stratul de explicație. Nu declară traducerea întregului VT gata de publicare și nu schimbă automat statusurile `in_review` în `published`.

## Acoperire

- 39 / 39 de cărți canonice VT sunt prezente în Biblia explicată.
- 929 / 929 de capitole canonice sunt reprezentate în catalogul cititorului.
- 10 cărți folosesc formatul `legacy-full`.
- 29 de cărți folosesc formatul `full-overlay`, total 637 de capitole overlay.
- Pentru overlay-uri, fiecare interval de versete este acoperit de cel puțin o unitate explicativă; nu sunt permise goluri structurale.

## Regula editorială finală

1. Expunerea din materialul editorial principal are prioritate acolo unde acesta dezvoltă pasajul.
2. Nu se cere o rescriere „source-only”. Explicația poate fi completată cu exegeza canonică/generală verificată atunci când aceasta este necesară pentru precizie, context sau pentru a evita o concluzie greșită.
3. Când un pasaj nu este dezvoltat de sursa principală și nu este nevoie de o dezvoltare doctrinară suplimentară, se folosește `textual-overview`: explicație directă a textului, fără aplicație sau studiu lexical inventat.
4. `canonical-exegesis` este permisă pentru explicații generale verificate în textul biblic, trimiteri canonice și, unde este cazul, WLC-OSHB.
5. Interpretările disputate sunt prezentate ca interpretări; sensul istoric și literar explicit al pasajului nu este șters.
6. Cititorul primește explicația direct. Numele autorilor moderni și provenance-ul editorial rămân interne și nu apar în copy-ul explicației.

## Zone cu risc ridicat revizuite

Auditul de conținut și reviziile dedicate au tratat în mod explicit:

- violență, război, judecată și psalmi imprecaționali;
- robie, abuz de putere, violență sexuală și pasaje juridice dificile;
- sexualitate și metafore profetice sexualizate;
- profeție și escatologie, cu separarea textului explicit de schemele interpretative;
- pasaje mesianice și folosirea lor în Noul Testament;
- note ebraice, care trebuie să păstreze `wordSource = WLC-OSHB` sau `lexicalSource = WLC-OSHB` după format;
- corectarea afirmațiilor absolute acolo unde restul canonului cere o formulare mai precisă.

Exemple deja revizuite în mod dedicat includ Deuteronom 22, Numeri 31, Psalmii 22, 32, 51 și 110, Isaia 7, 14 și 53, Ezechiel 16 și 28, Daniel 3, 7, 9, 10 și 12.

## Protecția copy-ului cititorului

Catalogul de publicare:

- elimină atribuirea nominală din blurb, titlu, rezumat, context, rugăciune, heading, `teaching`, `forYourHeart` și sensurile lexicale;
- elimină `explanationSource` înainte de afișare;
- respinge la runtime orice nume modern interzis rămas în câmpurile vizibile;
- detectează și formulări de atribuire rămase incomplete după curățare.

Validatorul `check:vt-publication` verifică acum explicit:

- 39 / 39 cărți VT și 929 / 929 capitole în catalogul cititorului;
- 29 / 29 overlay-uri și 637 / 637 capitole overlay;
- surse `poonen`, `poonen-official`, `canonical-exegesis` și `biblia-emanus` conform rolului lor;
- integritatea ancorelor și a surselor canonice;
- interdicția aplicațiilor și studiilor lexicale inventate în `textual-overview`;
- note ebraice WLC-OSHB;
- zero atribuire nominală în copy-ul cititorului.

## Ce mai rămâne separat

Acoperirea și politica explicațiilor sunt închise la nivel de conținut `in_review`.

Rămân separat de acest verdict:

- finalizarea și aprobarea traducerii Biblia Emanus pentru întregul VT;
- rularea tuturor porților CI/release pe head-ul de integrare;
- ultima lectură editorială umană înainte de schimbarea controlată `in_review` → `published`.
