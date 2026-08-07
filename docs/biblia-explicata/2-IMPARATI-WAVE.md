# Biblia explicată — valul 2 Împărați

## Stare

- Carte: **2 Împărați**
- Capitole: **25 / 25**
- Stare editorială: `in_review`
- Ramură: `agent/biblia-explicata-vt-2-imparati`
- Bază: `agent/biblia-explicata-vt-1-imparati`

## Arhitectură

De la acest val, explicația este un **overlay** peste Biblia Emanus. Nu se mai duplică textul fiecărui verset în modulul explicației.

- text canonic: Biblia Emanus, `bookId = 2KI`;
- explicație: `packages/shared/src/bible/overlays/imparati2Overlay.ts`;
- transcript: `.research/poonen-through-the-bible-OT/transcripts/kings-2.txt`;
- lexic ebraic: WLC-OSHB, numai când un termen este decisiv.

Fiecare unitate păstrează capitolul și intervalul de versete. Interfața finală trebuie să rezolve textul din Biblia Emanus după această referință.

## Regula editorială

1. Doctrina și aplicațiile urmăresc transcriptul Poonen.
2. Când transcriptul nu dezvoltă un capitol, overlay-ul rămâne la rezumatul narativ al Bibliei Emanus, fără doctrină adăugată.
3. Afirmațiile sensibile sau deplasate sunt limitate ori clarificate prin textul biblic.
4. Notele ebraice sunt separate de Poonen și sunt folosite doar pentru clarificare lexicală.
5. Toate unitățile rămân `in_review` până la revizia editorială.

## Fire Poonen păstrate

- contrastul dintre focul lui Ilie și duhul noului legământ;
- perseverența lui Elisei și dorința pentru o îndoită măsură;
- slujirea umilă: Elisei «turna apă pe mâinile lui Ilie»;
- Naaman, smerenia și Ghehazi, banii;
- prorocia care avertizează înainte de atac;
- cei patru leproși și vestea bună;
- căderea Izabelei, fără a transforma numele ei într-o etichetă misogină;
- robia lui Israel și formula «se temeau de DOMNUL și slujeau dumnezeilor lor»;
- Ezechia și distrugerea șarpelui de aramă devenit idol;
- rugăciunea lui Ezechia înaintea Asiriei;
- cei cincisprezece ani și nașterea lui Manase;
- Babilonul și finalul cărții: Ilie urcă, poporul coboară în robie.

## Note ebraice

Sunt incluse numai unde schimbă lectura, de exemplu:

- `פִּי־שְׁנַיִם` (`pi-șenayim`) — «parte dublă», 2 Împărați 2:9;
- `נְחֻשְׁתָּן` (`Nehushtan`) — numele șarpelui de aramă redus la statutul unui obiect de bronz, 2 Împărați 18:4.

## Validare

```bash
python3 scripts/check-2-imparati-overlay.py
```

Poarta verifică 25/25 capitole, legătura la `2KI`, existența transcriptului și controalele editoriale principale.
