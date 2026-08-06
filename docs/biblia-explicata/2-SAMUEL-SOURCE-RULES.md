# 2 Samuel — surse și stare

## Stare

- Carte: **2 Samuel**
- Capitole: **24 / 24**
- Versete Biblia Emanus: **695 / 695**
- Unități explicate: **57**
- Stare editorială: toate capitolele `in_review`
- Ramură: `agent/biblia-explicata-vt-2-samuel`
- Bază stivuită: `agent/biblia-explicata-vt-1-samuel`

## Regula de sursă

- Text biblic: Biblia Emanus, `2SA.1.json`–`2SA.24.json`, copiat identic din `agent/biblia-emanus-ot-and-apocrypha`.
- Explicație doctrinară: `.research/poonen-through-the-bible-OT/transcripts/samuel-2.txt`.
- Unde Poonen nu dezvoltă un capitol, explicația rămâne la narațiunea textului și la firul apropiat al transcriptului; nu se adaugă doctrină nouă.
- Afirmațiile imprecise din transcript se verifică în textul biblic înainte de folosire.
- Notele ebraice sunt separate, verificate în WLC-OSHB și folosite numai când termenul este decisiv pentru sens.
- Toate capitolele rămân `in_review`.

## Firele principale preluate din Poonen

- David nu se bucură de moartea lui Saul și își iubește vrăjmașii;
- cere călăuzire repetat și nu copiază mecanic strategia de ieri;
- așteaptă împărăția fără să apuce poziția prin crimă sau manipulare;
- scopul bun al aducerii chivotului nu justifică metoda contrară poruncii;
- nu trebuie disprețuită forma de închinare a altuia și slujitorul trebuie să se întoarcă să-și binecuvânteze casa;
- David pune casa lui Dumnezeu înaintea propriei case și acceptă să pregătească lucrarea pe care altul o va termina;
- Mefiboșet la masa regelui este o imagine a harului;
- căderea cu Bat-Șeba începe prin părăsirea locului datoriei, confort, privire și ignorarea avertismentului;
- Natan spune «Tu ești omul», iar David își recunoaște păcatul fără să-și protejeze imaginea;
- iertarea nu elimină automat consecințele semănate;
- Absalom fură inimile oamenilor pentru a-i atrage după sine;
- încercările din vremea fugii produc rugăciuni și slujire;
- David refuză răzbunarea împotriva lui Șimei și plânge moartea fiului răzvrătit;
- liderul drept conduce în frica lui Dumnezeu și formează oameni cărora le încredințează responsabilitate;
- recensământul exprimă sprijinirea pe număr și putere;
- David refuză să ofere DOMNULUI o jertfă care nu îl costă nimic.

## Corecții ale transcriptului

- Ahitofel este prezentat corect drept **bunicul** Bat-Șebei: Bat-Șeba era fiica lui Eliam, iar Eliam era fiul lui Ahitofel (`2 Samuel 11:3`; `23:34`).
- Sinuciderea lui Ahitofel este în `2 Samuel 17:23`, nu în `16:23`.
- Originea și responsabilitatea în cazul Bat-Șebei sunt formulate după text: David vede, întreabă, trimite și ia; femeia nu este învinovățită pentru folosirea puterii regale.
- Textul despre foamete și gabaoniți este relatat în cadrul vechi al răzbunării de sânge și nu este transformat în permisiune pentru pedepsirea urmașilor.

## Protecții editoriale

- Războaiele regatului nu autorizează violență sau cuceriri religioase moderne.
- Bat-Șeba și Tamar nu sunt învinovățite pentru faptele bărbaților care folosesc puterea și constrângerea.
- Concubinele lui David nu sunt tratate ca obiecte legitime ale conflictului politic.
- Moartea lui Ahitofel nu este model pentru sinucidere.
- Uciderea urmașilor lui Saul la cererea gabaoniților nu este model pentru vină moștenită, linșaj sau sacrificiu omenesc.

## Validare

```bash
pnpm check:2-samuel
```

Poarta verifică cele 24 de surse Biblia Emanus, 695 de versete, 57 de unități continue, registrul editorial, ancorele Poonen și protecțiile pentru violență sexuală, sinucidere, război și pedepsirea urmașilor.
