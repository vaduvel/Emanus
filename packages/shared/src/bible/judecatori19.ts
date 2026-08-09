import { judecatoriChapter, teaching } from "./judecatoriHelpers.js"
import { judecatoriStatus } from "./judecatoriPublication.js"

/* Judecători 19 — text Biblia Emanus; explicație originală Emanus după cercetarea textului și a transcrierii Through The Bible. */
export const JUDECATORI_19 = judecatoriChapter({
  number: 19,
  title: "Judecători 19 — Ghibea: femeia abandonată și societatea în care fiecare făcea ce-i plăcea",
  summary:
    "Un levit pleacă să-și aducă înapoi concubina și este primit în casa tatălui ei. Pe drumul spre casă, grupul înnoptează la Ghibea. Oamenii cetății cer să-l abuzeze pe levit, iar gazda și levitul oferă femeile în locul lui. Concubina este violată toată noaptea, moare la prag, iar trupul ei este apoi tăiat și trimis semințiilor lui Israel.",
  literaryContext:
    "Capitolul este centrul întunecat al epilogului. Formula lipsei unui împărat nu explică doar dezordinea politică, ci absența domniei lui Dumnezeu în conștiință. Narațiunea folosește ecouri din Sodoma pentru a arăta că răul canaanit a ajuns în interiorul lui Israel.",
  historicalContext:
    "Ospitalitatea proteja călătorul vulnerabil, dar aici este pervertită: bărbații încearcă să-și protejeze onoarea oferind femeile mulțimii. Concubina avea un statut social mai fragil decât o soție principală, însă textul nu diminuează umanitatea sau suferința ei. Trimiterea bucăților trupului este un apel șocant la mobilizare națională.",
  units: [
    {
      verses: [1, 10],
      heading: "O relație vulnerabilă și o întoarcere întârziată de ospăț",
      teaching: teaching(
        "Textul relatează ruptura dintre levit și concubină fără să ofere suficiente date pentru a transforma femeia în vinovatul principal. Variantele textuale și traducerile diferă asupra motivului plecării ei; cert este că se întoarce la casa tatălui și că levitul vine să-i vorbească inimii.",
        "Tatăl femeii îl primește repetat și prelungește ospățul. Ospitalitatea pare caldă, dar întârzierile îi împing pe călători să plece târziu și să ajungă vulnerabili pe drum.",
        "Narațiunea avertizează că politețea și ritualul social nu sunt suficiente pentru a proteja persoana vulnerabilă. Adevărata grijă trebuie să țină seama și de siguranță, timp și puterea inegală din relație.",
      ),
      crossRefs: ["Geneza 34:1-7", "Deuteronom 22:25-27", "1 Petru 3:7"],
      forYourHeart:
        "Nu folosi lipsa detaliilor ca să acuzi persoana care va suferi. Când o relație este fragilă, ascultă, caută siguranță și nu confunda împăcarea formală cu vindecarea reală.",
    },
    {
      verses: [11, 21],
      heading: "Israelitul caută adăpost între frați și găsește o cetate fără ospitalitate",
      teaching: teaching(
        "Levitul refuză să rămână într-o cetate străină și alege Ghibea, convins că între copiii lui Israel va fi mai sigur. Ironia este devastatoare: cetatea legământului va reproduce răul asociat Sodomei.",
        "Nimeni nu îi primește până când vine un bătrân originar din Efraim. El oferă hrană și protecție, însă ospitalitatea casei va fi pusă imediat sub amenințarea mulțimii.",
        "Apartenența religioasă și etnică nu garantează siguranța. O comunitate trebuie judecată și după felul în care protejează străinul, femeia și persoana fără putere, nu numai după numele pe care îl poartă.",
      ),
      crossRefs: ["Geneza 19:1-11", "Levitic 19:33-34", "Evrei 13:1-2"],
      forYourHeart:
        "Este comunitatea ta sigură pentru omul vulnerabil sau doar familiară pentru cei puternici? Credința se verifică și prin proceduri, limite și oameni pregătiți să protejeze.",
    },
    {
      verses: [22, 30],
      heading: "Violența sexuală, abandonul și trupul folosit din nou după moarte",
      teaching: teaching(
        "Mulțimea cere să-l abuzeze pe levit. Gazda răspunde oferind fiica sa și concubina. Levitul o împinge pe femeie afară, iar ea este violată și chinuită toată noaptea. Nici ospitalitatea, nici onoarea masculină, nici frica nu justifică oferirea unei persoane vulnerabile violenței.",
        "Dimineața, femeia cade la ușă cu mâinile pe prag. Levitul îi spune să se ridice, fără ca textul să consemneze grijă, plâns sau încercare de ajutor. Apoi îi ia trupul și îl taie pentru a mobiliza Israelul. Femeia este folosită de bărbați în viață și transformată în mesaj după moarte.",
        "Scriptura nu poruncește aceste fapte; le expune ca dovadă a prăbușirii unei societăți în care fiecare decide singur ce este drept. Victima nu poartă vina abuzului. Citirea credincioasă trebuie să-i păstreze demnitatea și să condamne agresorii, abandonul și sistemul care a făcut-o dispensabilă.",
      ),
      words: [
        {
          original: "נְבָלָה",
          transliteration: "nevala",
          language: "ebraica",
          meaning:
            "faptă infamă, nebunie morală sau ticăloșie care rupe ordinea comunității. Termenul numește răul grav; nu îl diminuează și nu mută vina asupra victimei.",
        },
      ],
      crossRefs: ["2 Samuel 13:12-20", "Psalmul 82:3-4", "Efeseni 5:11-13"],
      forYourHeart:
        "Dacă ai trecut prin violență sexuală sau abuz, nu este vina ta și nu trebuie să porți singur această povară. Caută un loc sigur, sprijin medical, psihologic, juridic și oameni de încredere care nu te vor obliga la tăcere sau întoarcere în pericol.",
    },
  ],
  prayer:
    "Dumnezeule al dreptății, ne plecăm înaintea durerii pe care acest capitol o expune.\n\nApără persoanele vulnerabile, descoperă agresorii și sistemele care îi protejează și oprește folosirea onoarei, familiei sau religiei pentru a sacrifica victimele.\n\nDă comunităților noastre proceduri, curaj și oameni care cred, protejează și însoțesc victima.\n\nVindecă pe cei răniți și învață-ne să rostim adevărul fără să mutăm vina asupra lor. Amin.",
  status: judecatoriStatus(19),
})
