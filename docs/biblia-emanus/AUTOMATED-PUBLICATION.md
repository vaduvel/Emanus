# Publicarea automată a Bibliei Emanus

Biblia Emanus nu mai cere o aprobare umană obligatorie pentru fiecare capitol. Un capitol poate deveni `published` automat numai după ce trece toate porțile de mai jos.

## Principiul de bază

Textul ebraic sau grecesc rămâne autoritatea principală. World English Bible Updated este baza inițială de lucru. Traducerile românești sunt martori comparativi și nu sunt sursa formulării Bibliei Emanus.

Potrivirea cu o singură traducere românească nu este suficientă. O formulare poate coincide cu un etalon și totuși să moștenească aceeași interpretare, omisiune sau exprimare protejată. De aceea comparația este o triangulare, nu o copiere și nu un test de identitate textuală.

## Porțile obligatorii

1. **Revizie AI din limba-sursă**
   - fiecare verset este verificat din ebraică sau greacă;
   - sunt controlate lexicul, sintaxa, pronumele, timpurile verbale, idiomurile și variantele textuale;
   - prima traducere este tratată ca ipoteză care trebuie infirmată sau confirmată.

2. **Revizie AI de limba română**
   - text natural, corect și reverent;
   - diacritice Unicode `ă`, `â`, `î`, `ș`, `ț`;
   - fără calcuri inutile din engleză;
   - consecvență terminologică și onomastică.

3. **Revizie AI teologică și canonică**
   - traducerea nu introduce o doctrină absentă din original;
   - ambiguitățile reale nu sunt eliminate în tăcere;
   - conexiunile cu restul Scripturii sunt păstrate;
   - narațiunile despre păcat, constrângere sau abuz nu sunt transformate în aprobare morală.

4. **Triangulare cu traduceri românești**
   - minimum trei traduceri românești distincte;
   - cel puțin una din familia Cornilescu, de exemplu VDC sau EDCR;
   - se verifică omisiunile, adaosurile, sensul, terminologia și naturalețea;
   - nu se stochează și nu se reproduce textul integral al edițiilor protejate;
   - diferențele sunt consemnate ca observații, nu prin copierea formulării.

5. **Controlul distanței de copyright**
   - `exactTextCopied` trebuie să fie `false`;
   - formularea este justificată de original și de limba română, nu de dependența de o traducere protejată;
   - coincidențele inevitabile în expresii scurte sau consacrate nu sunt tratate ca sursă de traducere.

6. **Zero probleme critice nerezolvate**
   - orice variantă textuală marcată în registru are o decizie documentată;
   - orice notă cu `reviewRequired: true` are `resolutionStatus: resolved` înainte de publicare;
   - niciun control nu poate rămâne `pending` sau `changes_requested`.

## Regula de publicare

Când toate controalele automate sunt `approved`, benchmarkul conține minimum trei traduceri și toate problemele critice sunt rezolvate, capitolul poate trece direct la:

```json
{
  "status": "published",
  "public": true
}
```

Nu este necesară o aprobare umană separată. Potrivirea exactă cu Cornilescu nu este o condiție și nu este urmărită; fidelitatea față de original și convergența sensului sunt condițiile reale.

## Licență

Biblia Emanus este pregătită pentru publicare sub `CC BY 4.0`, cu atribuirea surselor relevante. Această alegere permite distribuirea, adaptarea și reutilizarea traducerii cu menționarea autorilor și a proiectului.
