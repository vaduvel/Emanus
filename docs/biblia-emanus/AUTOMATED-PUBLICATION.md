# Poarta automată de publicare — Biblia Emanus

Un audit AI la nivel de capitol nu este, singur, dovada unei revizii semantice verset-cu-verset. Pentru Noul Testament, un capitol nu poate deveni `published` numai pe baza unor metadate AI sau a unor declarații repetate între capitole.

Noul Testament cere registrul `NT-EDITORIAL-APPROVAL.json`: o dovadă individuală pentru fiecare verset cu text principal, legată de textul românesc exact, de SBLGNT, WEBU și etaloanele românești fixate. Registrul trebuie aprobat de un reviewer editorial identificat: uman sau AI, iar un reviewer AI trebuie să declare sistemul și identificatorul rulării. Lipsa, incompletitudinea, un digest inconsistent sau justificările șablonate blochează validatorul, sigilarea și materializarea pentru aplicație.

## Autoritatea textului

Textul ebraic sau grecesc este autoritatea principală. WEBU este baza de segmentare și prima punte de lucru. Traducerile românești sunt etaloane comparative, nu sursa formulării.

Un etalon mai scurt nu justifică scurtarea originalului. Toate propozițiile, repetițiile, binecuvântările, blestemele și ambiguitățile prezente în original trebuie păstrate sau explicate editorial. Motorul reunește liniile poetice și continuările USFM înainte de comparație.

## Procesul obligatoriu

1. Sursele WEBU și WLC/SBLGNT sunt fixate într-un snapshot cu SHA-256.
2. AI redactează independent traducerea românească.
3. AI poate propune și verifica fiecare verset în limba-sursă, dar rezultatul rămâne ciornă până la revizia editorială individuală.
4. AI verifică limba română, terminologia, numele și continuitatea discursului.
5. AI verifică implicațiile teologice și canonice fără a elimina ambiguitățile reale.
6. Sensul este triangulat cu minimum trei etaloane românești, inclusiv unul din familia Cornilescu.
7. Motorul recalculează acoperirea, versificația, raporturile de lungime, convergența lexicală, omisiunile evidente și riscul de copiere sistematică.
8. Toate variantele și notele `reviewRequired` trebuie să fie `resolved` cu motivare.
9. Pentru fiecare verset NT, registrul editorial fixează referințele și digesturile SBLGNT/WEBU/etaloanelor, ancorele grecești și românești, plus justificarea individuală a deciziei.
10. Registrul este legat de textul exact și de snapshoturile exacte prin SHA-256; o modificare a textului invalidează aprobarea.
11. CI reexecută toate controalele la fiecare schimbare.

## Etaloane

Pentru Geneza și Iosua, snapshotul conține:

- Cornilescu 1924, domeniu public, folosit ca etalon din familia Cornilescu;
- Biblia Traducerea Fidela, domeniu public;
- NTR, consultată extern numai pentru comparație, fără stocarea textului protejat.

Potrivirea exactă cu un etalon nu este cerută. Convergența sensului trebuie justificată de original, iar formularea Bibliei Emanus trebuie să rămână independentă.

## Ce verifică sigiliul

Un capitol `approved` sau `published` trebuie să conțină:

- acoperire integrală verset cu verset;
- audit AI din limba-sursă, de limba română și teologic;
- zero omisiuni, adaosuri și probleme critice declarate;
- dovada etaloanelor fixate și externe;
- `textDigest` calculat din numărul și textul fiecărui verset;
- hashul snapshotului-sursă;
- identificarea agentului AI și a metodei de audit.

Pentru Noul Testament, acestea sunt condiții necesare, nu suficiente. În plus, trebuie să existe exact o intrare de aprobare editorială pentru fiecare verset cu text principal. O intrare conține digestul textului publicat, maparea și digesturile surselor fixate disponibile, consultațiile externe cerute de `source-lock.json`, ancorele verificabile și justificări individuale. Justificările duplicate sau declarațiile generale nu sunt acceptate ca substitut.

Schimbarea unui singur caracter din text invalidează sigiliul și blochează CI până la refacerea auditului.

### Lacună într-un etalon fixat

Un etalon românesc fixat, altul decât BTF, poate avea o lacună declarată în
snapshot. În acel caz, intrarea per-verset nu inventează un digest pentru text
care nu există. Ea folosește exact această formă:

```json
{
  "lockId": "CORNILESCU1924-JHN",
  "references": ["11:1"],
  "availability": "missing-in-pinned-source",
  "missingReferences": ["11:1"]
}
```

Poarta acceptă această formă numai când toate condițiile sunt adevărate:

- `lockId` este un etalon fixat non-BTF;
- `references` este exact maparea fixată pentru verset;
- `missingReferences` este exact lista referințelor fără text în snapshot;
- lacuna este declarată pentru ținta respectivă în `source-lock.json`.

Nu se acceptă `textDigest` în această formă. Dacă snapshotul are text,
`availability: "missing-in-pinned-source"` este respins. Regula nu relaxează
niciodată SBLGNT, WEBU sau BTF: acestea trebuie să aibă text fixat și digest
verificabil pentru fiecare referință mapată.

În snapshotul actual, artefactul brut Cornilescu 1924 nu are cele 57 de
versete din Ioan 11. Pentru JHN, `source-lock.json` folosește BTF și Biblia
Liberă drept etaloane fixate, iar Cornilescu este etalon extern; coada de
revizie nu pretinde un digest Cornilescu pentru acea lacună. Dacă un viitor
snapshot fixează Cornilescu ca etalon pentru o țintă lacunară, forma de mai sus
este singura declarație admisă. Coada este o listă de lucru, nu o aprobare.

## Comenzi

```bash
pnpm check:biblia-emanus
pnpm test:biblia-emanus
pnpm seal:biblia-emanus --check --book GEN
pnpm seal:biblia-emanus --book GEN --engine "Numele agentului AI"
```

Utilitarul de sigilare nu inventează revizia semantică. El publică numai capitolele care au deja decizii AI complete și care trec toate controalele recalculate.

## Regula de publicare

Pentru un reviewer AI, configurația porții poate declara:

```json
{
  "newTestamentEditorialApproval": {
    "required": true,
    "reviewerType": "ai",
    "method": "verse-by-verse-source-and-romanian-benchmark"
  }
}
```

Pentru `reviewerType: "ai"`, fiecare registru aprobat trebuie să conțină și
`reviewerSystem` și `reviewerRunId` nevid în obiectul `approval`. Acestea
identifică rularea care își asumă urma per-verset; nu transformă procesul AI
într-o garanție teologică, academică sau confesională.

După trecerea tuturor porților, inclusiv registrul editorial individual, capitolul devine:

```json
{
  "status": "published",
  "public": true
}
```

Poarta nu pretinde că demonstrează infailibilitatea teologică a unei traduceri. Ea demonstrează doar trasabilitatea și completitudinea procesului editorial declarat; evaluarea academică sau confesională externă rămâne distinctă.

## Licență

Biblia Emanus este publicată sub `CC BY 4.0`, cu atribuirile surselor declarate în manifest.
