# Benchmark archive drift policy

Pentru promovarea textului Biblia Emanus în VT:

- WEBU și WLC sunt surse autoritative pentru traducere și rămân hard-pinned.
- BTF și Cornilescu 1924 sunt benchmark-uri `comparison-only`, nu surse de autoritate pentru formularea traducerii.
- Dacă ZIP-ul unui benchmark se schimbă, payload-ul USFM curent al cărții este recapturat în snapshotul determinist al acelei promovări.
- Benchmark-ul trebuie în continuare să se parseze corect și să urmeze versificația produsului; în caz contrar promovarea eșuează.
- Hash-ul exact al arhivei și hash-ul fișierului per-carte folosit sunt păstrate în `source-lock`/snapshot.
- Nicio formulare din benchmark nu este copiată automat în Biblia Emanus.

Această regulă separă driftul de ambalare al unui etalon de comparație de driftul real al sursei biblice. WEBU/WLC rămân gate-uri dure; benchmark-urile rămân dovezi reproductibile de comparație.
