import type { Lesson } from "../domain.js"
import { PILDE_FIUL_PART_A } from "./pildeFiul.js"

/*
 * Pildele lui Iisus — Cursul 3: „Cum trăiește un fiu", fișele 4-5.
 * (docs/16-modul-pilde.md §Cursul 3)
 *
 * Fișa 4 (casa pe stâncă): NU se scrie ca promisiune că omul credincios
 * scapă de furtuni. Ambele case sunt lovite de aceeași ploaie.
 * Fișa 5 (smochinul): NU se scrie ca amenințare cu tăierea. Punctul e
 * vierul care cere încă un an și se oferă să sape.
 */

export const pildaCasaStanca: Lesson = {
  id: "pilda_casa_stanca",
  courseId: "parables_c3_fiul",
  order: 4,
  title: "Casa pe stâncă",
  estMinutes: 10,
  anchorRefs: ["Matei 7:24-27", "Matei 7:25"],
  memoryVerseRef: "Matei 7:25",
  steps: [
    {
      id: "f4_1",
      type: "hook",
      order: 1,
      bubbles: [
        { from: "guide", text: "Doi oameni, două case. Una pe stâncă, una pe nămol. Am învățat-o ca pe un cântec de copii și, tocmai de asta, i-am ratat cel mai important amănunt." },
        { from: "guide", text: "Citește încet ce urmează și vezi ce se întâmplă cu amândouă casele." },
      ],
    },
    {
      id: "f4_2",
      type: "scripture",
      order: 2,
      scripture: {
        text: "A dat ploaia, au venit șuvoaiele, au suflat vânturile și au bătut în casa aceea, dar ea nu s-a prăbușit, pentru că avea temelia zidită pe stâncă.",
        ref: "Matei 7:25",
      },
      bubbles: [
        { from: "guide", text: "Ai văzut? Ploaia, șuvoaiele și vântul vin și peste casa de pe stâncă. Cuvânt cu cuvânt, aceeași furtună, în amândouă propozițiile." },
      ],
    },
    {
      id: "f4_3",
      type: "truth_simple",
      order: 3,
      bubbles: [
        { from: "guide", text: "Punctul principal: ambele case au fost lovite de aceeași furtună. Diferența nu a fost vremea, ci ce era dedesubt." },
        { from: "guide", text: "Și încă ceva de context: în țara aceea, cele două case arătau identic din stradă. Se clădea la fel. Nisipul din vale era chiar loc bun de construit — vara. Deosebirea se vedea o singură dată pe an, când venea apa." },
      ],
    },
    {
      id: "f4_4",
      type: "name_struggle",
      order: 4,
      bubbles: [
        { from: "guide", text: "Cui i-a fost spusă: e ultimul lucru din Predica de pe munte, spus mulțimii care ascultase tot. Iisus încheie trei capitole de învățătură cu întrebarea: și acum ce faci cu ce ai auzit?" },
        { from: "guide", text: "Stânca, în text, nu e o idee abstractă. E „cine aude cuvintele Mele și le face”. Nu „cine le știe”." },
      ],
    },
    {
      id: "f4_5",
      type: "world_vs_truth",
      order: 5,
      bubbles: [
        { from: "guide", text: "Citirea greșită, și cea mai crudă dintre toate: „cine ascultă de Dumnezeu nu are furtuni; dacă ai necazuri, undeva ai greșit”." },
        { from: "guide", text: "Textul spune exact invers. Ploaia vine și peste stâncă. Boala, șomajul, moartea cuiva drag, trădările — nu sunt dovada că ai clădit rău." },
        { from: "guide", text: "Promisiunea nu e că nu te udă. Promisiunea e că nu te prăbușești." },
      ],
    },
    {
      id: "f4_6",
      type: "choice",
      order: 6,
      choice: {
        prompt: "Cum e vremea la tine acum?",
        options: [
          { id: "f4c_a", label: "Plouă tare. Sunt în mijlocul unei furtuni." },
          { id: "f4c_b", label: "E liniște și știu că nu am temelie." },
          { id: "f4c_c", label: "A trecut o furtună și încă strâng dărâmăturile." },
        ],
      },
    },
    {
      id: "f4_7",
      type: "how_god_helps",
      order: 7,
      bubbles: [
        { from: "guide", text: "Dacă plouă tare: nu e momentul să te întrebi ce ai greșit. Furtuna nu e o notă. Iar dacă stai în picioare cu greu, dar stai, ai deja răspunsul la întrebarea despre temelie." },
        { from: "guide", text: "Dacă e liniște: e cel mai bun moment din viață ca să sapi. Temelia nu se pune în furtună, se pune pe vreme bună — în zilele obișnuite, în care faci ce ai auzit." },
        { from: "guide", text: "Dacă strângi dărâmături: pilda nu-ți spune să reconstruiești singur, și nu spune că e prea târziu. O casă căzută se ridică din nou, în alt loc." },
      ],
    },
    {
      id: "f4_8",
      type: "step",
      order: 8,
      bubbles: [
        { from: "guide", text: "Un singur lucru azi: ia un lucru pe care îl știi de mult din Scriptură și pe care nu l-ai făcut niciodată. Cel mai mic dintre ele. Fă-l azi." },
        { from: "guide", text: "Așa se sapă — nu prin încă o lecție, ci prin trecerea unui singur lucru de la știut la făcut." },
      ],
    },
    {
      id: "f4_9",
      type: "quiz",
      order: 9,
      quiz: {
        question: "Ce se întâmplă cu casa clădită pe stâncă?",
        options: [
          { text: "Nu e atinsă de furtună", correct: false },
          { text: "E lovită de aceeași furtună, dar nu se prăbușește", correct: true },
          { text: "Furtuna o ocolește dacă stăpânul se roagă", correct: false },
        ],
        explanation:
          "Matei 7:25. Aceeași ploaie, aceleași șuvoaie, același vânt. Diferența e numai dedesubt.",
      },
    },
    {
      id: "f4_10",
      type: "how_god_helps",
      order: 10,
      bubbles: [
        { from: "guide", text: "Limita cinstită: pilda nu spune că o casă pe stâncă nu suferă pagube și nu ne spune de ce vin furtunile. Nu explicăm aici de ce a permis Dumnezeu ce ți s-a întâmplat — nu știm." },
        { from: "guide", text: "Și nu ne dă dreptul să ne uităm la o casă căzută și să tragem concluzia că omul acela n-a avut temelie." },
      ],
    },
    {
      id: "f4_11",
      type: "memory_verse",
      order: 11,
      scripture: {
        text: "A dat ploaia, au venit șuvoaiele... dar ea nu s-a prăbușit, pentru că avea temelia zidită pe stâncă.",
        ref: "Matei 7:25",
      },
    },
  ],
}

export const pildaSmochinul: Lesson = {
  id: "pilda_smochinul",
  courseId: "parables_c3_fiul",
  order: 5,
  title: "Smochinul neroditor",
  estMinutes: 10,
  anchorRefs: ["Luca 13:6-9", "Luca 13:8", "Romani 8:34"],
  memoryVerseRef: "Luca 13:8",
  steps: [
    {
      id: "f5_1",
      type: "hook",
      order: 1,
      bubbles: [
        { from: "guide", text: "Un om avea un smochin în vie. Trei ani, niciun rod. Spune să fie tăiat, ca să nu mai secetuiască pământul degeaba." },
        { from: "guide", text: "Pilda asta a fost folosită mult ca să sperie oameni. Hai să vedem cine vorbește ultimul în ea." },
      ],
    },
    {
      id: "f5_2",
      type: "scripture",
      order: 2,
      scripture: {
        text: "Doamne, lasă-l și anul acesta; îl voi săpa în jur și-i voi pune gunoi la rădăcină. Poate că de acum înainte va face rod.",
        ref: "Luca 13:8-9",
      },
      bubbles: [
        { from: "guide", text: "Ultimul cuvânt din pildă nu e „taie-l”. E o cerere de amânare, făcută de cineva care se oferă să muncească el la rădăcină." },
      ],
    },
    {
      id: "f5_3",
      type: "name_struggle",
      order: 3,
      bubbles: [
        { from: "guide", text: "Cui i-a fost spusă: unor oameni care veniseră să-I spună despre o nenorocire — niște galișeni omorâți — și care voiau, de fapt, să afle dacă aceia fuseseră mai păcătoși decât ei." },
        { from: "guide", text: "Deci pilda vine ca răspuns la o întrebare despre alții. Și răspunsul mută discuția de la „ei ce-au meritat” la „tu ce faci cu timpul care ți s-a dat”." },
      ],
    },
    {
      id: "f5_4",
      type: "truth_simple",
      order: 4,
      bubbles: [
        { from: "guide", text: "Punctul principal: vierul cere încă un an și se oferă să sape în jurul copacului. Răbdarea nu e pasivă — vine cu lucru la rădăcină." },
        { from: "guide", text: "Două propoziții de context: un smochin cerea vreo trei ani până să rodească, deci cei trei ani din pildă erau deja peste termen. Nimeni de la fața locului nu i-ar fi dat dreptate vierului." },
      ],
    },
    {
      id: "f5_5",
      type: "world_vs_truth",
      order: 5,
      bubbles: [
        { from: "guide", text: "Citirea greșită, cea care a lăsat oameni cu frică în piept: „Dumnezeu își pierde răbdarea; încă un an și te taie”." },
        { from: "guide", text: "Uită-te încă o dată la text: în pildă există cineva care mijlocește pentru mai mult timp. Nu ești singur în fața unei sentințe — e Cineva care vorbește pentru tine și care se oferă să lucreze la pământul tău." },
      ],
    },
    {
      id: "f5_6",
      type: "scripture",
      order: 6,
      scripture: {
        text: "Cine îi va osândi? Hristos a murit! Ba mai mult, El a și înviat, stă la dreapta lui Dumnezeu și mijlocește pentru noi!",
        ref: "Romani 8:34",
      },
      bubbles: [
        { from: "guide", text: "Același cuvânt: mijlocește. Vierul din pildă nu e o invenție a noastră — e felul în care Scriptura vorbește, în mai multe locuri, despre ce face Iisus acum." },
      ],
    },
    {
      id: "f5_7",
      type: "choice",
      order: 7,
      choice: {
        prompt: "Cum ți se pare viața ta în ultimul an?",
        options: [
          { id: "f5c_a", label: "Fără rod. Și mi-e teamă că s-a terminat timpul." },
          { id: "f5c_b", label: "Mă străduiesc și tot nu se vede nimic." },
          { id: "f5c_c", label: "Nu mă gândeam la mine, ci la altcineva din familie." },
        ],
      },
    },
    {
      id: "f5_8",
      type: "how_god_helps",
      order: 8,
      bubbles: [
        { from: "guide", text: "Dacă ți-e teamă că s-a terminat timpul: faptul că ești aici, azi, e chiar anul cerut de vier. Nu ți se cere să faci rod prin încordare. Ți se sapă în jur." },
        { from: "guide", text: "Dacă te străduiești și nu se vede nimic: un copac nu face rod pentru că e certat. Face când i se lucrează rădăcina — și rădăcina e ce se întâmplă între tine și El, nu ce se vede din stradă." },
        { from: "guide", text: "Dacă te gândeai la altcineva: pilda îți arată ce poți face și tu. Cere încă un an pentru omul acela și oferă-te să sapi — adică să fii blând, să nu-l tai tu din viața ta." },
      ],
    },
    {
      id: "f5_9",
      type: "quiz",
      order: 9,
      quiz: {
        question: "Cum se încheie pilda?",
        options: [
          { text: "Cu tăierea copacului", correct: false },
          { text: "Cu cererea vierului de încă un an și cu oferta lui de a săpa", correct: true },
          { text: "Cu rodul apărut în același an", correct: false },
        ],
        explanation:
          "Luca 13:8-9. Nu ni se spune nici ce a răspuns stăpânul, nici ce a făcut copacul.",
      },
    },
    {
      id: "f5_10",
      type: "how_god_helps",
      order: 10,
      bubbles: [
        { from: "guide", text: "Limita cinstită: pilda lasă o tensiune și tensiunea rămâne. Nu ni se spune ce s-a întâmplat la finalul anului. Nu spune că nu există niciodată un capăt, și nici că știm când e." },
        { from: "guide", text: "Ce știm e cine mijlocește. Și că timpul de acum e răspunsul la o cerere făcută pentru tine, nu o îngăduință din nepăsare." },
      ],
    },
    {
      id: "f5_11",
      type: "prayer",
      order: 11,
      bubbles: [
        { from: "guide", text: "Roagă-te scurt, cu cuvintele tale: „Doamne, sapă în jurul meu. Nu știu să fac rod prin puterea mea.”" },
      ],
    },
    {
      id: "f5_12",
      type: "memory_verse",
      order: 12,
      scripture: {
        text: "Doamne, lasă-l și anul acesta; îl voi săpa în jur și-i voi pune gunoi la rădăcină.",
        ref: "Luca 13:8",
      },
    },
  ],
}

/** Cursul 3 întreg, în ordine. */
export const PILDE_FIUL_LESSONS: Lesson[] = [
  ...PILDE_FIUL_PART_A,
  pildaCasaStanca,
  pildaSmochinul,
]
