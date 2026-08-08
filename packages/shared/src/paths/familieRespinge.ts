import type { Lesson } from "../domain.js"

/*
 * Ușa „familie_respinge" — două lecții suplimentare în camera 7
 * (path_impreuna).
 *
 * Cui îi scriem
 * ------------
 * Omului pe care ai lui nu îl primesc: fie pentru că a crezut și în casă nu se
 * crede, fie pentru că a crezut altfel decât se crede în casa aceea, fie pur și
 * simplu pentru că nu a fost niciodată acceptat așa cum este. Batjocura la masă,
 * telefonul care nu mai sună, sărbătorile la care nu mai este chemat.
 *
 * Cele două feluri de respingere
 * ------------------------------
 * Lecția 1 le desparte, pentru că nu se tratează la fel:
 *   a) respins pentru credință — aici Scriptura a spus dinainte că se poate
 *      întâmpla, iar omul nu a greșit cu nimic;
 *   b) respins ca om, dinainte de orice credință — aici rana este mai veche și
 *      nu are nicio legătură cu Dumnezeu, deși doare la fel.
 * Cei mai mulți oameni au câte puțin din amândouă și nu știu să le despartă.
 *
 * Ce face și ce nu face setul
 * ---------------------------
 * 1. Nu promite că se vor întoarce și că vor crede. Ar fi o minciună pioasă.
 * 2. Nu îl scutește de porunca cinstirii părinților. Efeseni 6:2 rămâne în
 *    picioare și când părinții sunt nedrepți. Dar cinstire nu înseamnă ascultare
 *    în păcat și nu înseamnă să stai să fii lovit.
 * 3. Nu îl trimite să predice la fiecare masă. 1 Petru 3:15 vorbește despre un
 *    răspuns dat celui care întreabă, nu despre o campanie în familie.
 * 4. Nu înlocuiește familia de sânge cu cea de credință. Le așază alături.
 * 5. Nu folosește puncte, procente sau niveluri (docs/22 §8).
 *
 * De ce Ioan 7:5
 * --------------
 * Pentru că este cel mai scurt și cel mai tăios răspuns la «dacă ai tăi nu te
 * cred, înseamnă că tu ești de vină». Nici frații Lui nu credeau în El. Mai
 * târziu au crezut, dar atunci nu credeau, iar asta nu spunea nimic despre El.
 *
 * Siguranță (docs/22)
 * -------------------
 * Lecția 1 poartă câmpul safety: dacă omul este minor și este dat afară, lovit
 * sau amenințat, se merge la 116 111 sau 112, nu la o lecție despre răbdare.
 *
 * Regula textului biblic
 * ----------------------
 * Toate versetele au fost verificate cuvânt cu cuvânt după Cornilescu 1924.
 * Marcu 10:29-30 a fost scos din pool pentru că nu s-a atestat integral în
 * verificare; locul lui îl ia Matei 12:50. 1 Petru 3:15 este citat de la
 * „Fiți totdeauna gata", ca să nu intre în cod ghilimelele din mijlocul
 * versetului.
 */

export const familieRespingeL1: Lesson = {
  id: "familie_respinge_l1",
  courseId: "path_impreuna",
  order: 31,
  title: "Când ai tăi nu te înțeleg",
  estMinutes: 9,
  anchorRefs: ["Psalmul 27:10", "Ioan 7:5", "Matei 10:36"],
  memoryVerseRef: "Psalmul 27:10",
  safety: {
    topic: "mental_health",
    notice: "Dacă ești dat afară din casă, lovit sau amenințat, aceea nu mai este o neînțelegere în familie și nu se rezolvă cu răbdare. Dacă ești copil sau tânăr, sună la 116 111. În caz de urgență, 112. Pentru sprijin emoțional, 116 123. Nu ești neascultător pentru că ceri ajutor."
  },
  steps: [
    {
      id: "fr1_1",
      type: "check_in",
      order: 1,
      bubbles: [
        { from: "guide", text: "Sunt răni pe care le înțelege toată lumea. Asta nu este una dintre ele." },
        { from: "guide", text: "Din afară pare puțin lucru: niște vorbe la masă, o privire, o tăcere. Pentru tine este casa în care ai crescut." }
      ]
    },
    {
      id: "fr1_2",
      type: "hook",
      order: 2,
      bubbles: [
        { from: "guide", text: "Știi cum se simte, chiar dacă nu ai spus-o niciodată cu voce tare." },
        { from: "guide", text: "Ești la masă cu ei și te simți străin în casa ta. Se vorbește peste tine. Se face o glumă și râd toți. Pleci acasă și în mașină nu spui nimic." },
        { from: "guide", text: "Sau, și mai rău, nici nu te mai cheamă." }
      ]
    },
    {
      id: "fr1_3",
      type: "step",
      order: 3,
      bubbles: [
        { from: "guide", text: "Înainte de orice, desparte două lucruri care ți s-au amestecat." },
        { from: "guide", text: "Unu: te resping pentru credință. Ai început să crezi, s-a schimbat felul în care trăiești, iar ei văd în asta o trădare a familiei." },
        { from: "guide", text: "Doi: te resping ca om, și asta era și înainte de orice credință. Nu ai fost niciodată cel bun. Credința doar le-a dat un motiv nou pentru ceva vechi." },
        { from: "guide", text: "Cei mai mulți oameni au câte puțin din amândouă. Nu se tratează la fel, de aceea le despărțim." },
        { from: "guide", text: "Și încă ceva: dacă ești dat afară, lovit sau amenințat, nu mai vorbim de respingere. Vorbim de siguranță, iar acolo se cere ajutor, nu răbdare." }
      ]
    },
    {
      id: "fr1_4",
      type: "world_vs_truth",
      order: 4,
      bubbles: [
        { from: "guide", text: "Lumea spune: «tă-le legătura, nu îți mai bate capul». Simplu de zis și imposibil de făcut. Sunt ai tăi." },
        { from: "guide", text: "Iar din biserică vine, uneori: «dacă ai fi o mărturie mai bună, s-ar fi întors deja». Adică este vina ta că ei nu cred." },
        { from: "guide", text: "Este o cruzime spusă pios. Nimeni nu poate face pe altcineva să creadă — nici tu, nici cel mai bun predicator din lume." }
      ]
    },
    {
      id: "fr1_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        { from: "guide", text: "Adevărul de astăzi: respingerea lor nu este dovada că tu ai greșit." },
        { from: "guide", text: "Poate ai greșit și tu ceva pe drum, și vom vedea mâine. Dar faptul că ei nu te primesc nu înseamnă, prin el însuși, că tu ești de vină." }
      ]
    },
    {
      id: "fr1_6",
      type: "how_god_helps",
      order: 6,
      bubbles: [
        { from: "guide", text: "Îți arăt trei lucruri din text și te las cu ele." },
        { from: "guide", text: "Întâi: nici frații lui Iisus nu credeau în El, în timp ce El umbla printre ei. Mai târziu au crezut. Dar atunci nu credeau, și asta nu spunea nimic despre El." },
        { from: "guide", text: "Al doilea: ruptura în familie, din pricina credinței, a fost spusă dinainte. Nu este un accident și nu este semn că Dumnezeu a plecat." },
        { from: "guide", text: "Al treilea, și cel mai important: există un verset scris parcă pentru tine, în care se recunoaște că părinții pot părăsi." }
      ]
    },
    {
      id: "fr1_7",
      type: "scripture",
      order: 7,
      scripture: {
        text: "Căci nici frații Lui nu credeau în El.",
        ref: "Ioan 7:5"
      },
      bubbles: [
        { from: "guide", text: "Un singur rând și închide o discuție întreagă. Dacă ai Tăi nu te cred, nu ești într-o companie proastă." }
      ]
    },
    {
      id: "fr1_8",
      type: "scripture",
      order: 8,
      scripture: {
        text: "Și omul va avea de vrăjmași chiar pe cei din casa lui.",
        ref: "Matei 10:36"
      },
      bubbles: [
        { from: "guide", text: "Nu este o dorință a lui Dumnezeu, este o prevestire. Când unul din casă Îl urmează, casa se împarte uneori în două." },
        { from: "guide", text: "Dumnezeu nu s-a mirat de ce ți se întâmplă. A spus-o înainte să se întâmple." }
      ]
    },
    {
      id: "fr1_9",
      type: "scripture",
      order: 9,
      scripture: {
        text: "Căci tatăl meu și mama mea mă părăsesc, dar Domnul mă primește.",
        ref: "Psalmul 27:10"
      },
      bubbles: [
        { from: "guide", text: "Citește-l încă o dată, rar. Nu spune «nu contează că te părăsesc». Recunoaște că se întâmplă — și pune ceva în locul acela." }
      ]
    },
    {
      id: "fr1_10",
      type: "name_struggle",
      order: 10,
      bubbles: [
        { from: "guide", text: "Numește un singur moment. Nu toată istoria, un moment." },
        { from: "guide", text: "Ziua în care ai înțeles că nu mai ești primit ca înainte. Ce s-a spus, cine a spus și unde stăteai." },
        { from: "guide", text: "Rana are nevoie de un chip și de o dată. Așa se poate duce undeva." }
      ]
    },
    {
      id: "fr1_11",
      type: "quiz",
      order: 11,
      quiz: {
        question: "Ce arată faptul că ai tăi nu te primesc?",
        options: [
          { text: "Că nu ai fost o mărturie destul de bună și că vina este a ta", correct: false },
          { text: "Că se poate întâmpla și celui nevinovat; nici frații Lui nu credeau în El", correct: true },
          { text: "Că Dumnezeu S-a depărtat de familia ta și nu mai are ce face", correct: false }
        ],
        explanation: "Ioan 7:5 spune limpede că nici frații Lui nu credeau în El, iar Matei 10:36 spusese dinainte că despicătura poate trece chiar prin casă. Necredința alrom lor nu măsoară credincioșia ta și nu înseamnă că Dumnezeu a renunțat la ei."
      }
    },
    {
      id: "fr1_12",
      type: "memory_verse",
      order: 12,
      scripture: {
        text: "Căci tatăl meu și mama mea mă părăsesc, dar Domnul mă primește.",
        ref: "Psalmul 27:10"
      },
      bubbles: [
        { from: "guide", text: "Două jumătăți, și amândouă sunt adevărate în același timp. Nu o șterge pe prima ca să o crezi pe a doua." }
      ]
    },
    {
      id: "fr1_13",
      type: "prayer",
      order: 13,
      bubbles: [
        { from: "guide", text: "«Doamne, ai mei nu mă primesc și m-am săturat să mă prefac că nu doare. Primește-mă Tu astăzi și ține-mi inima să nu se facă piatră față de ei. Amin.»" }
      ]
    },
    {
      id: "fr1_14",
      type: "journal",
      order: 14,
      journalPrompt: "Scrie momentul acela: ziua, vorbele, cine le-a spus. Apoi scrie dedesubt care dintre cele două feluri de respingere crezi că este, sau cât din fiecare.",
      reward: { xp: 0, axisDeltas: { emotional_peace: 1 } }
    }
  ]
}

export const familieRespingeL2: Lesson = {
  id: "familie_respinge_l2",
  courseId: "path_impreuna",
  order: 32,
  title: "Cum stau lângă ei fără să mă pierd",
  estMinutes: 11,
  anchorRefs: [
    "Efeseni 6:2",
    "Romani 12:18",
    "1 Petru 3:15",
    "Matei 10:37",
    "Matei 12:50"
  ],
  memoryVerseRef: "1 Petru 3:15",
  steps: [
    {
      id: "fr2_1",
      type: "check_in",
      order: 1,
      bubbles: [
        { from: "guide", text: "Ieri am spus ce s-a întâmplat. Astăzi vorbim despre cum stai lângă ei de aici înainte." }
      ]
    },
    {
      id: "fr2_2",
      type: "hook",
      order: 2,
      bubbles: [
        { from: "guide", text: "Sunt două feluri de a greși aici și le-ai încercat probabil pe amândouă." },
        { from: "guide", text: "Unul: te faci mic. Nu mai spui nimic, râzi la glumele despre credința ta, te îndoi ca să nu superi. Pleci acasă gol." },
        { from: "guide", text: "Celălalt: te faci misionar. Predici la fiecare masă, trimiți versete, răspunzi la orice glumă cu o predică. Ei se îndârjesc și mai tare." },
        { from: "guide", text: "Există un al treilea fel, și este cel mai greu: să stai întreg și liniștit." }
      ]
    },
    {
      id: "fr2_3",
      type: "step",
      order: 3,
      bubbles: [
        { from: "guide", text: "Șase lucruri practice. Alege-ți două pentru luna asta, nu toate." },
        { from: "guide", text: "Unu, cinstirea rămâne. Sună-i, ajută-i, du-te când poți. Porunca nu s-a schimbat pentru că ei s-au schimbat." },
        { from: "guide", text: "Doi, cinstirea nu înseamnă ascultare oarbă. Nu ești dator să faci un lucru rău fiindcă ți-o cere un părinte și nu ești dator să stai să fii umilit ore în șir." },
        { from: "guide", text: "Trei, nu predica neîntrebat. Trăiește și răspunde când te întreabă cineva. Atât." },
        { from: "guide", text: "Patru, nu răspunde la batjocură cu batjocură. O propoziție liniștită și mergi mai departe: «pentru mine este important, chiar dacă vouă vi se pare ciudat»." },
        { from: "guide", text: "Cinci, pune limite la vizite, nu ziduri. Două ore, nu două zile. Și pleacă înainte să se strice, nu după." },
        { from: "guide", text: "Șase, nu tot ce se sparge se sparge din vina credinței. Când ai greșit tu — cu mândrie, cu vorbe tari, cu dispreț — cere-ți iertare pentru partea ta, fără să ceri nimic înapoi." }
      ]
    },
    {
      id: "fr2_4",
      type: "world_vs_truth",
      order: 4,
      bubbles: [
        { from: "guide", text: "Se spune, cu versetul în mână: «Iisus a zis că cine iubește pe tată mai mult decât pe El nu este vrednic de El, deci taie legătura»." },
        { from: "guide", text: "Versetul acela vorbește despre ce este pe primul loc atunci când trebuie să alegi între două, nu despre închiderea ușii în nasul mamei tale." },
        { from: "guide", text: "Același Dumnezeu care a spus asta a spus și să îți cinstești părinții. Nu se contrazice; îți dă o ordine." }
      ]
    },
    {
      id: "fr2_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        { from: "guide", text: "Adevărul de astăzi: Îți cinstești părinții și când nu te cinstesc ei pe tine." },
        { from: "guide", text: "Dar cinstire nu înseamnă să dispari ca să le fie lor bine." }
      ]
    },
    {
      id: "fr2_6",
      type: "how_god_helps",
      order: 6,
      bubbles: [
        { from: "guide", text: "Două lucruri pe care Dumnezeu le pune în mâna ta și pe care nu ți le ia nimeni." },
        { from: "guide", text: "Unu: îți dă o familie nouă, care nu o înlocuiește pe cea de sânge, dar te ține în picioare când aceea te lasă jos." },
        { from: "guide", text: "Doi: îți ia de pe umeri răspunderea rezultatului. Pacea depinde de tine doar «pe cât atârnă de voi». Restul nu este partea ta." }
      ]
    },
    {
      id: "fr2_7",
      type: "scripture",
      order: 7,
      scripture: {
        text: "Să cinstești pe tatăl tău și pe mama ta — este cea dintâi poruncă însoțită de o făgăduință",
        ref: "Efeseni 6:2"
      },
      bubbles: [
        { from: "guide", text: "Nu scrie «cinstește-i dacă merită». Din păcate pentru noi, nu scrie așa." }
      ]
    },
    {
      id: "fr2_8",
      type: "scripture",
      order: 8,
      scripture: {
        text: "Dacă este cu putință, întrucât atârnă de voi, trăiți în pace cu toți oamenii.",
        ref: "Romani 12:18"
      },
      bubbles: [
        { from: "guide", text: "Două limitări într-un singur verset: «dacă este cu putință» și «întrucât atârnă de voi»." },
        { from: "guide", text: "Dumnezeu știe că uneori nu atârnă de tine. Nu îți cere să faci pace de unul singur." }
      ]
    },
    {
      id: "fr2_9",
      type: "scripture",
      order: 9,
      scripture: {
        text: "Fiți totdeauna gata să răspundeți oricui vă cere socoteală de nădejdea care este în voi, dar cu blândețe și teamă",
        ref: "1 Petru 3:15"
      },
      bubbles: [
        { from: "guide", text: "«Oricui vă cere.» Deci răspunzi când ești întrebat. Nu înaintea întrebării și nu peste ea." },
        { from: "guide", text: "«Cu blândețe.» Adică tonul face jumătate din răspuns." }
      ]
    },
    {
      id: "fr2_10",
      type: "scripture",
      order: 10,
      scripture: {
        text: "Cine iubește pe tată ori pe mamă mai mult decât pe Mine nu este vrednic de Mine și cine iubește pe fiu ori pe fiică mai mult decât pe Mine nu este vrednic de Mine.",
        ref: "Matei 10:37"
      },
      bubbles: [
        { from: "guide", text: "Este despre ordine, nu despre ură. Când cineva îți cere să alegi între El și ei, Îți cere să Îl alegi pe El — și să îi iubești mai departe și pe ei." }
      ]
    },
    {
      id: "fr2_11",
      type: "scripture",
      order: 11,
      scripture: {
        text: "Căci oricine face voia Tatălui Meu care este în ceruri, acela Îmi este frate, soră și mamă.",
        ref: "Matei 12:50"
      },
      bubbles: [
        { from: "guide", text: "Nu îți șterge familia de sânge. Îți dă una în plus, pentru serile în care cealaltă nu răspunde." }
      ]
    },
    {
      id: "fr2_12",
      type: "name_struggle",
      order: 12,
      bubbles: [
        { from: "guide", text: "Două alegeri, scrise, nu gândite." },
        { from: "guide", text: "Care dintre cele șase lucruri practice îl iei pentru luna asta? Și unde ai greșit tu, dacă ai greșit — cu mândrie, cu vorbe tari, cu dispreț?" },
        { from: "guide", text: "Partea ta o poți repara astăzi. Partea lor nu este a ta." }
      ]
    },
    {
      id: "fr2_13",
      type: "quiz",
      order: 13,
      quiz: {
        question: "Cum se împacă porunca cinstirii părinților cu Matei 10:37?",
        options: [
          { text: "Nu se împacă; cine crede trebuie să taie legătura cu părinții necredincioși", correct: false },
          { text: "Cinstirea rămâne în picioare, iar Matei 10:37 așază ordinea atunci când chiar trebuie să alegi între El și ei", correct: true },
          { text: "Cinstirea era doar pentru Vechiul Testament și nu mai este valabilă", correct: false }
        ],
        explanation: "Efeseni 6:2 reia porunca cinstirii și în Noul Testament, fără să o condiționeze de purtarea părinților. Matei 10:37 nu o anulează; vorbește despre întâietate atunci când ceva ți se cere împotriva Lui. Cinstirea nu înseamnă însă ascultare în păcat și nu înseamnă să rămâi într-un loc în care ești în pericol."
      }
    },
    {
      id: "fr2_14",
      type: "memory_verse",
      order: 14,
      scripture: {
        text: "Fiți totdeauna gata să răspundeți oricui vă cere socoteală de nădejdea care este în voi, dar cu blândețe și teamă",
        ref: "1 Petru 3:15"
      },
      bubbles: [
        { from: "guide", text: "Gata să răspunzi, nu gata să începi. Diferența asta îți poate salva relația cu ai tăi." }
      ]
    },
    {
      id: "fr2_15",
      type: "prayer",
      order: 15,
      bubbles: [
        { from: "guide", text: "«Doamne, învață-mă să îi cinstesc fără să mă pierd pe mine. Ține-mi gura când nu mă întreabă nimeni și dă-mi cuvinte bune când mă întreabă. Ai grijă Tu de ei. Amin.»" }
      ]
    },
    {
      id: "fr2_16",
      type: "journal",
      order: 16,
      journalPrompt: "Scrie cele două lucruri practice pe care le iei luna asta. Apoi scrie o propoziție de cerere de iertare pentru partea ta, dacă ai una — și spune-o în săptămâna asta.",
      reward: { xp: 0, axisDeltas: { relationships: 1 } }
    }
  ]
}

export const FAMILIE_RESPINGE_LESSONS: Lesson[] = [
  familieRespingeL1,
  familieRespingeL2
]

/*
 * Practicile pentru ușa „familie_respinge", aliniate pe index cu lecțiile.
 * Niciuna nu cere o discuție despre credință și niciuna nu cere o împăcare
 * într-o singură zi.
 */
export const FAMILIE_RESPINGE_PRACTICES: string[] = [
  "Astăzi spune-I lui Dumnezeu, cu voce tare, numele fiecăruia dintre ei. Doar numele, fără cereri și fără reproșuri.",
  "Astăzi fă un singur lucru bun pentru unul dintre ei, fără să pomenești nimic despre credință. Un telefon, un drum, un ajutor."
]
