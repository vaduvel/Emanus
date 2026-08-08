import { numeriChapter, teaching } from "./numeriHelpers.js"
import { numeriPassage } from "./numeriText.js"
import { NUMERI_STATUSES } from "./numeriPublication.js"

/*
 * Cartea Numeri, explicată pe unități de sens.
 *
 * Textul biblic: păstrat separat în numeriText.ts (fișierele numeriTextN.ts).
 * Explicația: scrisă pentru Emanus după cercetarea textului. Nu se copiază
 * formularea niciunui predicator sau comentator.
 */

const textualSource = "Emanus — rezumat textual fără doctrină adăugată"

export const NUMERI_31 = numeriChapter({
  number: 31,
  title: "Numeri 31 — Războiul împotriva Madianului și împărțirea prăzii",
  summary:
    "DOMNUL îi poruncește lui Moise răzbunarea asupra Madianului în legătură cu Baal-Peor. Israel atacă, omoară conducătorii și pe Balaam, ia captivi și pradă, iar apoi Moise dă o poruncă foarte severă privind captivii. Urmează curățirea rituală, împărțirea prăzii și darul adus de căpetenii după constatarea că niciun luptător israelit nu lipsea.",
  literaryContext:
    "Capitolul se leagă explicit de Numeri 25:16-18 și de explicația din 31:16 despre sfatul lui Balaam și abaterea de la Peor. Este una dintre ultimele acțiuni ale lui Moise înainte de moarte și trebuie citit ca narațiune și legislație de război din cadrul istoriei lui Israel, nu ca mandat pentru războaie religioase moderne.",
  historicalContext:
    "Textul aparține lumii războiului antic și conține uciderea unor combatanți și necombatanți, captivi umani și împărțirea oamenilor împreună cu animalele în inventarul prăzii. Explicația Emanus nu va ascunde aceste elemente și nici nu le va transforma în permisiune pentru violență, trafic de persoane sau tratamentul oamenilor ca proprietate în prezent.",
  units: [
    {
      id: "numeri-31-1-2",
      ref: "Numeri 31:1-2",
      heading: "Porunca dată lui Moise înainte de moarte",
      text: numeriPassage(31, 1, 2),
      teaching: teaching(
        "DOMNUL îi spune lui Moise să răzbune pe fiii lui Israel împotriva madianiților și leagă această misiune de apropierea morții lui Moise: după aceea va fi adăugat la poporul său.",
        "Versetele prezintă o poruncă particulară în istoria lui Israel. Ele nu dau cititorului modern autoritatea de a identifica un grup drept «Madian» și de a iniția violență în numele lui Dumnezeu.",
      ),
      explanationKind: "textual-overview",
      explanationSource: textualSource,
      words: [],
      crossRefs: ["Numeri 25:16-18", "Numeri 27:12-14"],
    },
    {
      id: "numeri-31-3-6",
      ref: "Numeri 31:3-6",
      heading: "Câte o mie din fiecare seminție pleacă la luptă",
      text: numeriPassage(31, 3, 6),
      teaching: teaching(
        "Moise transmite porunca sub formularea «răzbunarea DOMNULUI împotriva Madianului». Sunt trimiși câte o mie de oameni din fiecare seminție, douăsprezece mii în total.",
        "Fineas, fiul lui Eleazar, merge cu obiectele sfinte și cu trâmbițele de semnal. Textul arată caracterul religios al acestei acțiuni în Israelul antic; nu oferă un model prin care autoritatea religioasă modernă să sfințească un conflict militar.",
      ),
      explanationKind: "textual-overview",
      explanationSource: textualSource,
      words: [],
      crossRefs: ["Numeri 25:6-13"],
    },
    {
      id: "numeri-31-7-12",
      ref: "Numeri 31:7-12",
      heading: "Regii Madianului și Balaam sunt uciși, iar populația este luată captivă",
      text: numeriPassage(31, 7, 12),
      teaching: teaching(
        "Israel îi omoară pe bărbații Madianului menționați în luptă, inclusiv pe cei cinci regi, iar Balaam este și el ucis cu sabia. Femeile și copiii sunt luați captivi, animalele și bunurile sunt luate ca pradă, iar cetățile și taberele sunt arse.",
        "Narațiunea trebuie redată fără a transforma victoria militară într-o regulă despre felul în care Dumnezeu garantează succesul militar credincioșilor de astăzi.",
      ),
      explanationKind: "textual-overview",
      explanationSource: textualSource,
      words: [],
      crossRefs: ["Numeri 22-25", "Numeri 31:16"],
    },
    {
      id: "numeri-31-13-18",
      ref: "Numeri 31:13-18",
      heading: "Porunca lui Moise privind captivii este redată fără a-i ascunde severitatea",
      text: numeriPassage(31, 13, 18),
      teaching: teaching(
        "Moise se mânie pentru că femeile au fost lăsate vii și amintește că, prin sfatul lui Balaam, femei din acest popor au fost implicate în abaterea lui Israel la Peor. Textul nu spune însă că fiecare femeie adultă capturată fusese personal una dintre participantele de la Peor.",
        "Apoi Moise poruncește uciderea fiecărui copil de parte bărbătească și a fiecărei femei care cunoscuse un bărbat, iar fetele care nu cunoscuseră bărbat sunt cruțate. Este unul dintre cele mai dure pasaje ale cărții. Explicația nu îl va cosmetiza, nu va atribui victimelor o vină pe care textul nu o individualizează și nu îl va transforma în permisiune pentru violență împotriva copiilor, femeilor, civililor sau captivilor în prezent.",
      ),
      explanationKind: "textual-overview",
      explanationSource: textualSource,
      words: [],
      crossRefs: ["Numeri 25:1-18", "Numeri 31:16"],
    },
    {
      id: "numeri-31-19-24",
      ref: "Numeri 31:19-24",
      heading: "Luptătorii și obiectele sunt supuse curățirii rituale",
      text: numeriPassage(31, 19, 24),
      teaching: teaching(
        "Cei care au ucis sau au atins un mort trebuie să rămână șapte zile în afara taberei și să urmeze curățirea prescrisă pentru contactul cu moartea. Hainele și obiectele capturate intră și ele în procedura de curățire.",
        "Eleazar precizează că metalele care rezistă focului trec prin foc și apoi prin apa de curățire, iar celelalte materiale trec prin apă. Accentul pasajului este curățirea rituală după contactul cu moartea și cu prada de război.",
      ),
      explanationKind: "textual-overview",
      explanationSource: textualSource,
      words: [],
      crossRefs: ["Numeri 19:11-22"],
    },
    {
      id: "numeri-31-25-31",
      ref: "Numeri 31:25-31",
      heading: "Prada este împărțită în două jumătăți, cu două cote diferite",
      text: numeriPassage(31, 25, 31),
      teaching: teaching(
        "Prada este numărată și împărțită în două jumătăți egale: una pentru luptători și una pentru restul adunării. Din jumătatea luptătorilor se ia pentru DOMNUL câte unul din cinci sute, dat preotului Eleazar.",
        "Din jumătatea adunării se ia câte unul din cincizeci pentru leviți, după cum precizează versetele următoare. Cota de 1/50 este de zece ori mai mare proporțional decât 1/500; cele două jumătăți de bază sunt egale. Oamenii apar și ei în inventarul prăzii, fapt care trebuie recunoscut ca parte a cadrului antic al textului, nu normalizat ca practică modernă.",
      ),
      explanationKind: "textual-overview",
      explanationSource: textualSource,
      words: [],
      crossRefs: ["Numeri 31:42-47"],
    },
    {
      id: "numeri-31-32-41",
      ref: "Numeri 31:32-41",
      heading: "Inventarul primei jumătăți include animale și persoane captive",
      text: numeriPassage(31, 32, 41),
      teaching: teaching(
        "Textul enumeră 675.000 de oi, 72.000 de vite, 61.000 de măgari și 32.000 de fete care nu cunoscuseră un bărbat. Aceste cifre sunt inventarul oferit de narațiune; din ele singure nu trebuie construită o concluzie sigură despre întreaga economie sau populație a Madianului.",
        "Din jumătatea luptătorilor sunt calculate cotele de 1/500: 675 de oi, 72 de vite, 61 de măgari și 32 de persoane. Faptul că persoane captive sunt incluse în această contabilizare este moral tulburător pentru cititorul modern și nu trebuie ascuns sau transformat într-un precedent pentru tratarea oamenilor ca proprietate.",
      ),
      explanationKind: "textual-overview",
      explanationSource: textualSource,
      words: [],
      crossRefs: [],
    },
    {
      id: "numeri-31-42-47",
      ref: "Numeri 31:42-47",
      heading: "Din jumătatea adunării, una din cincizeci este dată leviților",
      text: numeriPassage(31, 42, 47),
      teaching: teaching(
        "Cealaltă jumătate a prăzii revine adunării. Din ea, Moise ia câte unul din cincizeci dintre oameni și animale și îi dă leviților care îngrijeau Cortul DOMNULUI.",
        "Pasajul descrie distribuirea concretă a prăzii după război; explicația nu o transformă într-o regulă financiară sau într-un model de împărțire a câștigurilor pentru comunitatea creștină.",
      ),
      explanationKind: "textual-overview",
      explanationSource: textualSource,
      words: [],
      crossRefs: ["Numeri 18:21-24"],
    },
    {
      id: "numeri-31-48-52",
      ref: "Numeri 31:48-52",
      heading: "Căpeteniile constată că nu lipsește niciun luptător și aduc aur",
      text: numeriPassage(31, 48, 52),
      teaching: teaching(
        "Căpeteniile raportează lui Moise că, după numărătoare, nu lipsește niciunul dintre oamenii aflați sub comanda lor. Ei aduc obiecte de aur luate în război ca dar înaintea DOMNULUI, folosind limbajul ispășirii pentru sufletele lor.",
        "Textul consemnează atât absența pierderilor israelite, cât și darul adus; nu spune că fiecare război purtat de poporul lui Dumnezeu va avea același rezultat și nu oferă o promisiune modernă de protecție militară fără pierderi.",
      ),
      explanationKind: "textual-overview",
      explanationSource: textualSource,
      words: [],
      crossRefs: [],
    },
    {
      id: "numeri-31-53-54",
      ref: "Numeri 31:53-54",
      heading: "Aurul este dus în Cort ca aducere aminte înaintea DOMNULUI",
      text: numeriPassage(31, 53, 54),
      teaching: teaching(
        "Ultimele versete observă că oamenii de război luaseră pradă fiecare pentru sine, iar Moise și Eleazar duc aurul căpeteniilor în Cortul Întâlnirii ca aducere aminte pentru Israel înaintea DOMNULUI.",
        "Aici se încheie narațiunea fără ca Emanus să transforme războiul, prada sau capturarea oamenilor într-un model pentru viața creștină modernă.",
      ),
      explanationKind: "textual-overview",
      explanationSource: textualSource,
      words: [],
      crossRefs: ["Exod 30:16"],
    },
  ],
  prayer:
    "Doamne, dă-ne cinste față de Scriptură ca să nu ascundem pasajele grele și nici să nu le folosim pentru a justifica răul. Dă-ne discernământ să deosebim poruncile istorice date Israelului de chemarea noastră de astăzi și păzește-ne de a transforma violența, captivitatea sau puterea asupra celui vulnerabil în virtute spirituală. Amin.",
  status: NUMERI_STATUSES[31],
})
