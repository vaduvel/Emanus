# Ghid editorial — Biblia Emanus

## 1. Identitate

Numele de lucru este **Biblia Emanus**. Abrevierea internă este `BE`. Traducerea este destinată citirii gratuite în aplicația Emanus și nu trebuie confundată cu World English Bible sau cu o ediție românească existentă.

## 2. Canonul inițial

Prima ediție urmărește canonul protestant de 66 de cărți. Cărțile deuterocanonice pot fi tratate ulterior într-un proiect separat, fără a modifica ordinea și numerotarea ediției inițiale.

## 3. Metoda de traducere

Traducerea urmărește echilibrul dintre:

- fidelitatea semantică față de text;
- claritatea în limba română actuală;
- păstrarea imaginilor și repetițiilor importante;
- evitarea parafrazei doctrinare;
- evitarea unei române rigide care reproduce mecanic sintaxa engleză.

WEBU este baza de lucru și de segmentare. Pentru Vechiul Testament, sensurile importante se verifică în WLC/OSHB. Pentru Noul Testament, sensurile importante se verifică în SBLGNT. Când sursele diferă textual, diferența se notează editorial și nu este rezolvată în tăcere.

## 4. Reguli pentru limba română

- Se folosesc diacriticele Academiei Române: `ă`, `â`, `î`, `ș`, `ț`.
- Fișierele trebuie păstrate în UTF-8 și normalizare Unicode NFC.
- Se evită formele cu sedilă `ş` și `ţ`.
- Se folosesc ghilimelele românești `„…”`.
- Se preferă fraze clare și naturale, fără arhaisme inutile.
- Se păstrează termenii biblici cunoscuți când sunt corecți și inteligibili.
- Majusculele teologice nu se adaugă automat. Se folosesc consecvent doar după o regulă editorială aprobată.

## 5. Numele lui Dumnezeu

- `Elohim` este redat de regulă prin `Dumnezeu`.
- În prima ediție, tetragrama `YHWH` este redată consecvent prin `DOMNUL`.
- Combinația `YHWH Elohim` este redată prin `DOMNUL Dumnezeu`.
- La prima apariție a tetragramei se explică faptul că textul ebraic conține numele propriu `YHWH`; majusculele din `DOMNUL` marchează această convenție editorială.
- Redarea `DOMNUL` nu afirmă că textul ebraic folosește un simplu titlu și nu elimină din notele editoriale alternative precum `Iahve` sau forma nevocalizată `YHWH`.
- Schimbarea acestei reguli pentru o ediție viitoare cere o decizie editorială globală; nu se alternează arbitrar între `DOMNUL`, `Iahve` și `YHWH` de la un verset la altul.

## 6. Termeni care cer atenție

Exemple:

- `ruach`: duh, suflare sau vânt, în funcție de context;
- `raqia`: întindere, boltă sau firmament;
- `adam`: om, omenire sau numele Adam, în funcție de context;
- `nephesh`: ființă vie, viață sau suflet, fără impunerea automată a unui singur echivalent;
- `sarx`, `psyche`, `pneuma`, `dikaiosyne`: se traduc contextual și se documentează într-un glosar.

## 7. Protecția împotriva copierii

Traducerile românești existente pot fi consultate numai pentru control și detectarea unor posibile erori. Formularea Bibliei Emanus trebuie să fie redactată independent din sursele permise. O coincidență inevitabilă în expresii foarte scurte nu justifică reproducerea sistematică a unei ediții existente.

Comparația cu traducerile românești este o triangulare de sens, nu o sursă de formulare. Pentru fiecare capitol publicat sunt necesare minimum trei etaloane românești distincte, dintre care cel puțin unul din familia Cornilescu. Textele protejate nu se stochează integral în repository.

## 8. Statutul fiecărui capitol

- `draft`: ciornă de traducere; nu apare publicului;
- `in_review`: capitol aflat în auditul AI și în verificările automate;
- `approved`: auditul este complet și sigilat, dar publicarea tehnică nu a fost încă aplicată;
- `published`: capitol public, cu `public: true`.

Un capitol poate deveni `approved` sau `published` numai după ce toate controalele obligatorii sunt `approved`:

- revizia AI din limba-sursă;
- revizia AI de limba română;
- revizia AI teologică și canonică;
- controlul omisiunilor și adaosurilor;
- comparația cu minimum trei traduceri românești;
- controlul distanței de copyright;
- confirmarea că nu există probleme critice nerezolvate.
- verificarea snapshotului și a versificației;
- comparația deterministă cu etaloanele românești fixate;
- sigiliul SHA-256 al textului și al surselor exacte.

Orice notă cu `reviewRequired: true` trebuie să aibă `resolutionStatus: resolved` și o motivare documentată. Orice variantă textuală înscrisă în registrul surselor trebuie să aibă o decizie editorială înainte de publicare.

Aprobarea umană separată nu este obligatorie. Auditul semantic este executat de AI și trebuie să documenteze acoperirea verset cu verset, deciziile românești și principiile teologice. Când toate porțile sunt aprobate și sigiliul corespunde textului curent, capitolul poate trece direct la:

```json
{
  "status": "published",
  "public": true
}
```

Regula completă și schema porții sunt definite în `AUTOMATED-PUBLICATION.md` și în manifestul traducerii.

Etaloanele românești nu au autoritate asupra originalului. Un pasaj nu se scurtează și nu se extinde pentru a semăna cu ele. Dacă liniile poetice sunt împărțite în USFM, toate continuările aceluiași verset sunt reunite înainte de comparație.

## 9. Licența rezultatului

Biblia Emanus este pregătită pentru publicare sub **Creative Commons Attribution 4.0 International (`CC BY 4.0`)**.

Reutilizarea, distribuirea și adaptarea sunt permise cu atribuirea corespunzătoare a proiectului Biblia Emanus și cu păstrarea atribuirilor obligatorii pentru sursele folosite. Licența și atribuirile declarate în `manifest.json` reprezintă regula tehnică aplicată la publicare.
