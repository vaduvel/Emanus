import { deuteronomChapter, teaching } from "./deuteronomHelpers.js"
import { deuteronomPassage } from "./deuteronomText.js"
import { DEUTERONOM_STATUSES } from "./deuteronomPublication.js"

const CANONICAL_SOURCE =
  "Emanus canonical exegesis — Deuteronom 24 + biblical cross-references; Zac Poonen, Through The Bible: Deuteronomy identifies the section without developing it in detail"

export const DEUTERONOM_24 = deuteronomChapter({
  number: 24,
  title: "Deuteronom 24 — Împietrirea inimii, dreptatea și omul vulnerabil",
  summary:
    "Capitolul trece de la o căsătorie ruptă la un soț proaspăt căsătorit, de la zălog și răpire la plata zilierului, apoi la răspunderea personală și la grija pentru străin, orfan și văduvă. Nu este o listă fără legătură: puterea unuia asupra altuia primește limite, iar Israel este chemat mereu să-și amintească faptul că el însuși fusese rob și fusese răscumpărat.",
  literaryContext:
    "Poonen menționează aici legile despre divorț, dar nu dezvoltă capitolul verset cu verset. Pentru vv. 1–4 avem însă interpretarea explicită a Domnului Isus în Matei 19 și Marcu 10. Restul explicației urmărește textul și trimiterile canonice directe, fără a pune în gura lui Poonen afirmații pe care transcriptul nu le conține.",
  historicalContext:
    "Rânduielile sunt legi ale Israelului antic, dar mai multe își declară singure motivația morală: să nu iei mijlocul de trai ca zălog, să nu răpești un om, să nu asuprești lucrătorul sărac, să nu strâmbi dreptul celui vulnerabil și să-ți amintești că ai fost rob în Egipt. În cazul divorțului, nu inventăm scopul documentului ca și cum textul ar spune că a fost instituit pentru «protecția femeii»; citim cazul juridic așa cum este și apoi lăsăm interpretarea lui Isus să stabilească sensul teologic al îngăduinței.",
  units: [
    {
      id: "deuteronom-24-1-4",
      ref: "Deuteronom 24:1-4",
      heading: "Moise reglementează ruptura; Isus ne duce înapoi la început",
      text: deuteronomPassage(24, 1, 4),
      teaching: teaching(
        "Versetele 1–4 nu poruncesc unui bărbat să divorțeze. Ele pornesc de la cazul în care el îi scrie femeii un document de despărțire, ea devine soția altui bărbat, iar a doua căsătorie se încheie. În acea situație precisă, primul soț nu are voie să o ia din nou de soție. Interdicția finală este porunca directă a unității.",
        "Când fariseii Îl întreabă pe Isus despre «cartea de despărțire», El citește chiar această tradiție juridică și refuză să o transforme în idealul lui Dumnezeu pentru căsătorie. «Din pricina împietririi inimii voastre» a îngăduit Moise despărțirea, spune El, «dar de la început n-a fost așa». Așadar legea reglementează o lume în care legămintele sunt rupte; Geneza 1–2 arată ținta creației.",
        "Această distincție trebuie păstrată. Nu spunem că tot ce este reglementat în lege este prin aceasta declarat ideal. Și nu folosim Deuteronom 24 ca armă împotriva celui abandonat sau trădat: Isus mută discuția de la tehnica legală a despărțirii la fidelitatea inimii înaintea lui Dumnezeu.",
        "În același timp, nu inventăm din text motive istorice pe care el nu le formulează. Documentul este prezent în caz; motivul teologic sigur pe care îl avem pentru îngăduința divorțului vine din cuvintele lui Isus: împietrirea inimii omului.",
      ),
      explanationKind: "exposition",
      explanationSource: CANONICAL_SOURCE,
      crossRefs: ["Matei 19:3-9", "Marcu 10:2-12", "Geneza 2:24", "Maleahi 2:14-16"],
      forYourHeart:
        "Nu întreba numai «ce îmi permite regula?». Întreabă: este inima mea moale înaintea lui Dumnezeu și credincioasă legământului?",
    },
    {
      id: "deuteronom-24-5-9",
      ref: "Deuteronom 24:5-9",
      heading: "O soție de bucurat, o viață de neconfiscat",
      text: deuteronomPassage(24, 5, 9),
      teaching: teaching(
        "Bărbatul proaspăt căsătorit este scutit un an de război și de alte sarcini publice, iar textul spune de ce: să rămână acasă și să-și bucure soția. Căsătoria nu este tratată ca un detaliu privat care trebuie strivit de orice obligație publică. Legea îi dă timp bărbatului să-și zidească noua casă și îi spune explicit să aducă bucurie femeii cu care s-a căsătorit.",
        "Apoi Dumnezeu pune o limită creditorului: nu lua ca zălog râșnița sau piatra de deasupra ei, pentru că aceasta înseamnă să iei «viața» ca zălog. Nu orice lucru pe care ai puterea juridică să-l iei este legitim de luat. Datoria nu îți dă dreptul să tai mijlocul prin care omul își câștigă pâinea.",
        "Versetul 7 revine cu severitate la răpirea unui om: cine își răpește fratele, îl tratează ca marfă sau îl vinde trebuie judecat. Biblia nu numește comerțul cu oameni o simplă problemă economică; îl pune între relele care trebuie scoase din mijlocul poporului.",
        "Versetele despre boala de piele trimit poporul la instrucțiunile date preoților și la cazul Mariei. Aici nu inventăm o teologie a fiecărei boli. Punctul declarat este ascultarea atentă de porunca dată și memoria unui caz concret din drumul prin pustiu.",
      ),
      explanationKind: "exposition",
      explanationSource: CANONICAL_SOURCE,
      crossRefs: ["Deuteronom 20:7", "Exod 21:16", "Numeri 12:1-15", "1 Timotei 5:8"],
      forYourHeart:
        "Dumnezeu nu-ți dă autoritate ca să iei viața omului din mâna lui. Folosești puterea ta ca să zidești sau ca să strângi?",
    },
    {
      id: "deuteronom-24-10-15",
      ref: "Deuteronom 24:10-15",
      heading: "Nu intra peste omul dator și nu ține salariul celui sărac",
      text: deuteronomPassage(24, 10, 15),
      teaching: teaching(
        "Creditorul trebuie să rămână afară; datornicul este cel care aduce zălogul. Chiar când cineva îți datorează, casa lui nu devine spațiul peste care intri după bunul plac. Iar dacă omul este sărac și haina dată ca zălog îi este învelitoare pentru noapte, haina trebuie întoarsă până la apus.",
        "Observă ce spune textul despre acest gest: omul se va culca în haina lui și te va binecuvânta, iar aceasta va fi socotită dreptate înaintea DOMNULUI. Dumnezeu vede nu doar dacă datoria există, ci și felul în care creditorul se poartă cu omul aflat sub puterea lui.",
        "Apoi vine lucrătorul sărac. Să nu-l asuprești, fie că este dintre frații tăi, fie că este străin. Plata lui trebuie dată în ziua aceea, înainte de apus, fiindcă își pune sufletul în ea. Dacă îl lași fără plata de care depinde și el strigă către DOMNUL, textul spune că vina va fi asupra ta.",
        "Iacov reia aceeași imagine cu o severitate care nu trebuie îndulcită: plata oprită lucrătorilor «strigă», iar strigătele au ajuns la urechile Domnului oștirilor. A reține salariul celui vulnerabil nu este o șmecherie de cash-flow înaintea lui Dumnezeu; este păcat care strigă.",
      ),
      explanationKind: "exposition",
      explanationSource: CANONICAL_SOURCE,
      crossRefs: ["Levitic 19:13", "Iacov 5:4", "Proverbe 3:27-28", "Matei 7:12"],
      forYourHeart:
        "Datorezi cuiva bani, salariu sau o plată pe care ai putea-o face acum? Nu numi prudență ceea ce Dumnezeu numește asuprire.",
    },
    {
      id: "deuteronom-24-16-18",
      ref: "Deuteronom 24:16-18",
      heading: "Fiecare pentru păcatul lui — și dreptate pentru cel fără putere",
      text: deuteronomPassage(24, 16, 18),
      teaching: teaching(
        "Versetul 16 trasează o limită juridică limpede: părinții să nu fie omorâți pentru copiii lor și copiii să nu fie omorâți pentru părinți; fiecare să răspundă pentru propriul păcat. Nu trebuie folosit versetul ca și cum ar nega faptul că păcatul unui om poate avea consecințe asupra familiei lui. El interzice pedeapsa penală substitutivă în cazul formulat aici.",
        "Apoi vin străinul, orfanul și văduva — oameni cu puțină putere într-o societate de clan. Să nu le strâmbi dreptul și să nu iei haina văduvei ca zălog. Dumnezeu nu Își măsoară dreptatea după câtă influență are omul în fața ta.",
        "Motivul este repetat: «adu-ți aminte că ai fost rob în Egipt și că DOMNUL Dumnezeul tău te-a răscumpărat». Harul primit devine obligație morală față de omul slab. Israel nu are voie să uite cum arată neputința tocmai după ce Dumnezeu l-a scos din ea.",
      ),
      explanationKind: "exposition",
      explanationSource: CANONICAL_SOURCE,
      crossRefs: ["2 Împărați 14:6", "Ezechiel 18:20", "Exod 22:21-24", "Iacov 1:27"],
      forYourHeart:
        "Când ai putere asupra unuia care nu se poate apăra, îți amintești cum S-a purtat Dumnezeu cu tine când tu erai cel fără putere?",
    },
    {
      id: "deuteronom-24-19-22",
      ref: "Deuteronom 24:19-22",
      heading: "Nu culege până la ultimul bob",
      text: deuteronomPassage(24, 19, 22),
      teaching: teaching(
        "La seceriș, la măslini și la vie apare aceeași poruncă în trei forme: nu te întoarce să storci totul până la capăt. Snopul uitat, măslinele rămase și strugurii de după cules sunt lăsați străinului, orfanului și văduvei.",
        "Aceasta nu este doar generozitate după ce proprietarul și-a strâns tot ce poate. Legea îi cere să lase în însăși practica muncii lui un loc prin care cel vulnerabil să poată primi. Cartea Rut arată cum această rânduială devine hrană reală pentru două văduve, nu o idee abstractă.",
        "Nu transformăm trei reguli agricole într-un program economic modern obligatoriu în fiecare detaliu. Dar nici nu golim principiul până nu mai cere nimic: omul lui Dumnezeu nu trăiește după întrebarea «cât de mult pot păstra pentru mine?», ci lasă loc concret în rodul lui pentru cel care nu are.",
        "Și din nou motivul este memoria robiei. Omul care uită de unde l-a scos Dumnezeu va ajunge să creadă că tot rodul este numai al lui și că cel lipsit îl deranjează. Omul care își amintește răscumpărarea lasă margine pentru altul.",
      ),
      explanationKind: "exposition",
      explanationSource: CANONICAL_SOURCE,
      crossRefs: ["Levitic 19:9-10", "Rut 2:2-23", "2 Corinteni 9:6-8", "Proverbe 19:17"],
      forYourHeart:
        "Ai în bugetul, timpul și munca ta o «margine» lăsată pentru cel care nu-ți poate întoarce binele?",
    },
  ],
  prayer:
    "Doamne, păzește-ne de inimă împietrită în familie, de putere folosită împotriva celui slab și de bani ținuți când altul depinde de ei. Fă-ne să ne amintim cum ne-ai răscumpărat și să lăsăm loc în viața noastră pentru străin, orfan, văduvă și lucrătorul care așteaptă plata lui. Amin.",
  status: DEUTERONOM_STATUSES[24],
})