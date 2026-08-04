# Poarta automată de publicare — Biblia Emanus

Biblia Emanus nu cere aprobarea umană a fiecărui capitol. Un capitol poate deveni `published` numai după un audit AI complet și după verificările deterministe executate din surse fixate.

## Autoritatea textului

Textul ebraic sau grecesc este autoritatea principală. WEB Protestant Edition este baza de segmentare și prima punte de lucru. Traducerile românești sunt etaloane comparative, nu sursa formulării.

Un etalon mai scurt nu justifică scurtarea originalului. Toate propozițiile, repetițiile, binecuvântările, blestemele și ambiguitățile prezente în original trebuie păstrate sau explicate editorial. Motorul reunește liniile poetice și continuările USFM înainte de comparație.

## Procesul obligatoriu

1. Sursele WEB Protestant Edition și WLC/SBLGNT sunt fixate într-un snapshot cu SHA-256.
2. AI redactează independent traducerea românească.
3. AI verifică fiecare verset în limba-sursă și documentează domeniul reviziei.
4. AI verifică limba română, terminologia, numele și continuitatea discursului.
5. AI verifică implicațiile teologice și canonice fără a elimina ambiguitățile reale.
6. Sensul este triangulat cu minimum trei etaloane românești, inclusiv unul din familia Cornilescu.
7. Motorul recalculează acoperirea, versificația, raporturile de lungime, convergența lexicală, omisiunile evidente și riscul de copiere sistematică.
8. Toate variantele și notele `reviewRequired` trebuie să fie `resolved` cu motivare.
9. Auditul este legat de textul exact și de snapshotul exact prin SHA-256.
10. CI reexecută toate controalele la fiecare schimbare.

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

Schimbarea unui singur caracter din text invalidează sigiliul și blochează CI până la refacerea auditului.

## Comenzi

```bash
pnpm check:biblia-emanus
pnpm test:biblia-emanus
pnpm seal:biblia-emanus --check --book GEN
pnpm seal:biblia-emanus --book GEN --engine "Numele agentului AI"
```

Utilitarul de sigilare nu inventează revizia semantică. El publică numai capitolele care au deja decizii AI complete și care trec toate controalele recalculate.

## Regula de publicare

Manifestul păstrează:

```json
{
  "humanApprovalRequired": false,
  "publishWhenAllChecksApproved": true
}
```

După trecerea tuturor porților, capitolul devine:

```json
{
  "status": "published",
  "public": true
}
```

## Licență

Biblia Emanus este publicată sub `CC BY 4.0`, cu atribuirile surselor declarate în manifest.
