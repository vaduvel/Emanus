# Integrarea motorului Biblia Emanus 2.0

Această ramură extinde motorul de audit 2.0 de la Geneza și Iosua la Exodul, Leviticul, Numeri și Deuteronomul.

## Rezultat final

- 6 cărți: Geneza, Exodul, Leviticul, Numeri, Deuteronomul și Iosua;
- 211 capitole publicate;
- 6.510 versete sigilate;
- 1.255 de note editoriale;
- comparație deterministă pentru fiecare verset;
- 9 teste negative și de integritate;
- snapshot unic `sources/ot-gen-deu-jos-usfm.zip`;
- SHA-256 snapshot: `045966ba6331fee2d556cb219e4afe4122d027f69971f7f8e4a1e2f7b4595847`.

## Surse fixate

Snapshotul conține pentru fiecare dintre cele șase cărți:

- WEBU, ca bază public-domain și punte de segmentare;
- WLC, ca autoritate ebraică;
- Cornilescu 1924 și BTF, ca etaloane românești fixate;
- NTR rămâne extern, exclusiv `comparison-only`.

Fiecare capitol are audit semantic AI, digest SHA-256 al textului, identificarea motorului și legătura cu snapshotul exact. Orice schimbare a textului invalidează sigiliul.

## Diferențe de versificație

Motorul păstrează 18 mapări explicite între versificația țintă și WLC. Pentru Numeri 26:1 este înregistrată separat referința suplimentară WLC Numeri 25:19, deoarece propoziția respectivă deschide versetul 26:1 în versificația țintă. Nicio referință ebraică nu este eliminată pentru a forța egalitatea numerică.

## Corecție produsă de audit

Scanarea tuturor celor 6.510 versete a găsit o singură formulare sub pragul lexical: Exodul 37:14. Textul a fost corectat după ebraică la „locașuri pentru drugi”, iar scanarea completă nu mai raportează nicio abatere deterministă.

Instrumentele și workflow-urile temporare au fost eliminate. Ramura păstrează numai datele, snapshotul, documentația, validatorul și testele permanente.
