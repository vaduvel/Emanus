import { samuel1Chapter, teaching } from "./samuel1Helpers.js"
import { samuel1Passage } from "./samuel1Text.js"
import { SAMUEL1_STATUSES } from "./samuel1Publication.js"

export const SAMUEL1_25 = samuel1Chapter({
  number: 25,
  title: "1 Samuel 25 — Abigail oprește răzbunarea lui David",
  summary: "După moartea lui Samuel, David cere hrană de la Nabal, care îl insultă și refuză. David pornește să-i ucidă casa, dar Abigail vine cu daruri, își asumă mijlocirea și îl oprește de la vărsare de sânge. DOMNUL îl lovește pe Nabal, iar David o ia pe Abigail de soție.",
  literaryContext: "Capitolul arată că David, deși îl cruțase pe Saul, poate fi atras spre răzbunare când este insultat personal. Transcriptul Poonen nu dezvoltă separat episodul; explicația rămâne aproape de mișcarea narațiunii.",
  historicalContext: "David și oamenii lui protejaseră păstorii lui Nabal în pustiu. Cererea de hrană este făcută într-o zi de sărbătoare a tunderii oilor.",
  units: [
    {
      id: "1-samuel-25-1-13",
      ref: "1 Samuel 25:1-13",
      heading: "Insulta lui Nabal aprinde dorința de răzbunare",
      text: samuel1Passage(25, 1, 13),
      teaching: teaching(
        "David cere cu respect hrană pentru oamenii săi și amintește protecția oferită păstorilor.",
        "Nabal răspunde prin dispreț și îl prezintă pe David ca pe un rob fugit. David pornește imediat cu sabia, hotărât să distrugă toată casa.",
        "Capitolul arată că o biruință anterioară asupra răzbunării nu înseamnă că ispita a dispărut. De data aceasta, David are nevoie ca altcineva să-l oprească.",
      ),
      words: [
        {
          original: "נָבָל",
          transliteration: "naval",
          language: "ebraica",
          meaning: "nebun, lipsit de discernământ moral. Abigail spune că numele lui Nabal se potrivește purtării lui.",
        },
      ],
      crossRefs: ["Proverbe 12:16"],
      forYourHeart: "Nu lua o insultă drept permisiune pentru a produce o pagubă mult mai mare decât răul primit.",
    },
    {
      id: "1-samuel-25-14-35",
      ref: "1 Samuel 25:14-35",
      heading: "Abigail vorbește înainte ca David să verse sânge",
      text: samuel1Passage(25, 14, 35),
      teaching: teaching(
        "Abigail acționează repede, aduce hrană și îl întâmpină pe David cu smerenie și cuvinte care îi reamintesc chemarea lui.",
        "Ea îi spune că DOMNUL îl păzește pentru conducere și că vărsarea de sânge pentru răzbunare i-ar deveni pricină de remușcare.",
        "David recunoaște că Dumnezeu a trimis-o și binecuvântează discernământul care l-a oprit. Omul înțelept primește mustrarea înainte ca fapta să devină ireparabilă.",
      ),
      crossRefs: ["Proverbe 15:1"],
      forYourHeart: "Primește omul care te oprește de la o faptă pe care mai târziu ai regreta-o.",
    },
    {
      id: "1-samuel-25-36-44",
      ref: "1 Samuel 25:36-44",
      heading: "David lasă judecata în mâna DOMNULUI",
      text: samuel1Passage(25, 36, 44),
      teaching: teaching(
        "Abigail îi spune lui Nabal ce s-a întâmplat după ce acesta se trezește, iar inima lui este lovită de teamă. După zece zile, DOMNUL îl lovește și moare.",
        "David recunoaște că Dumnezeu i-a apărat cauza și l-a păzit de rău. El nu mai trebuie să împlinească prin sabie ceea ce dorise în mânie.",
        "Capitolul încheie și cu schimbări în familia lui David, relatate fără a transforma toate practicile epocii în model pentru căsătoria creștină.",
      ),
      crossRefs: ["1 Samuel 24:12"],
      forYourHeart: "Lasă timp lui Dumnezeu să judece. Răzbunarea grăbită te poate face vinovat înainte ca dreptatea să vină.",
    },
  ],
  prayer: "Doamne, oprește-ne când mânia ne împinge spre răzbunare.\n\nDă-ne smerenia de a primi mustrarea și înțelepciunea de a lăsa judecata în mâna Ta. Amin.",
  status: SAMUEL1_STATUSES[25],
})

export const SAMUEL1_26 = samuel1Chapter({
  number: 26,
  title: "1 Samuel 26 — David îl cruță din nou pe Saul",
  summary: "Saul îl urmărește iar pe David. David și Abișai intră noaptea în tabăra regelui și îl găsesc adormit, cu sulița lângă cap. Abișai cere voie să-l ucidă, dar David refuză și ia numai sulița și ulciorul. De la distanță, el dovedește din nou că nu urmărește viața lui Saul.",
  literaryContext: "Capitolul repetă și întărește lecția din capitolul 24. Poonen amintește că David a avut mai multe ocazii să-l omoare pe Saul și nu a făcut-o.",
  historicalContext: "Urmărirea are loc în pustia Zif. Somnul adânc căzut peste tabără îi permite lui David să ajungă lângă Saul fără luptă.",
  units: [
    {
      id: "1-samuel-26-1-25",
      ref: "1 Samuel 26:1-25",
      heading: "David refuză a doua oară să grăbească împărăția prin sânge",
      text: samuel1Passage(26, 1, 25),
      teaching: teaching(
        "Abișai vede sulița și cere să-l lovească pe Saul o singură dată. David refuză, spunând că DOMNUL Însuși poate hotărî ziua și felul sfârșitului lui.",
        "El ia sulița și ulciorul ca dovadă că ar fi putut ucide, apoi îl mustră pe Abner pentru lipsa pazei și îi vorbește lui Saul de la distanță.",
        "David afirmă că, după cum a cruțat viața regelui, dorește ca propria viață să fie prețuită înaintea DOMNULUI. El nu cere ca Saul să-i fie dator, ci își pune siguranța în mâna lui Dumnezeu.",
      ),
      words: [
        {
          original: "מְשִׁיחַ יְהוָה",
          transliteration: "meșiah YHWH",
          language: "ebraica",
          meaning: "unsul DOMNULUI. Repetarea expresiei subliniază motivul pentru care David refuză uciderea, chiar când împrejurarea pare să-i ofere puterea.",
        },
      ],
      crossRefs: ["1 Samuel 24:6-12"],
      forYourHeart: "Integritatea nu se dovedește o singură dată. Aceeași ispită poate reveni și cere aceeași ascultare.",
    },
  ],
  prayer: "Doamne, dă-ne integritate repetată, nu numai o singură biruință.\n\nPăzește-ne să nu grăbim prin rău ceea ce credem că ne-ai promis și ține viața noastră în mâna Ta. Amin.",
  status: SAMUEL1_STATUSES[26],
})

export const SAMUEL1_27 = samuel1Chapter({
  number: 27,
  title: "1 Samuel 27 — David locuiește între filisteni",
  summary: "David spune în inima lui că într-o zi va cădea în mâna lui Saul și se mută la Achiș, împăratul Gatului. Primește Țiclagul și întreprinde raiduri, dar îi oferă lui Achiș o imagine înșelătoare despre țintele sale. Saul încetează să-l urmărească.",
  literaryContext: "Capitolul relatează o perioadă ambiguă din fuga lui David. Transcriptul Poonen nu o dezvoltă separat, așa că explicația nu transformă strategiile lui David în porunci sau modele morale.",
  historicalContext: "David se mută cu șase sute de oameni și familiile lor în teritoriul filistean. Achiș îi oferă Țiclagul, care devine baza lui.",
  units: [
    {
      id: "1-samuel-27-1-12",
      ref: "1 Samuel 27:1-12",
      heading: "Frica îl împinge pe David spre o alianță complicată",
      text: samuel1Passage(27, 1, 12),
      teaching: teaching(
        "David spune în inima lui că va pieri în cele din urmă prin mâna lui Saul, deși fusese păzit în mod repetat. El caută siguranță în teritoriul filistean.",
        "Mutarea oprește urmărirea lui Saul, dar îl introduce într-o viață de raiduri și relatări înșelătoare către Achiș.",
        "Textul consemnează această perioadă fără a declara că fiecare tactică a lui David este aprobată. Anii de formare includ și decizii luate sub oboseală și frică.",
      ),
      crossRefs: ["Psalmul 56:3-4"],
      forYourHeart: "După multe încercări, oboseala poate face frica să vorbească mai tare decât memoria ajutorului lui Dumnezeu. Oprește-te înainte să-ți construiești siguranța pe compromis.",
    },
  ],
  prayer: "Doamne, când încercarea se prelungește, păzește-ne de deciziile conduse numai de frică.\n\nAmintește-ne ajutorul Tău și dă-ne lumină în situațiile complicate. Amin.",
  status: SAMUEL1_STATUSES[27],
})

export const SAMUEL1_28 = samuel1Chapter({
  number: 28,
  title: "1 Samuel 28 — Saul caută un medium după ce nu mai ascultase de Dumnezeu",
  summary: "Filistenii se adună pentru război, iar Saul se teme. DOMNUL nu-i răspunde, iar el caută noaptea o femeie care cheamă morții, deși el însuși alungase asemenea practici. Femeia îl vede pe Samuel, iar mesajul primit confirmă judecata și înfrângerea apropiată.",
  literaryContext: "Capitolul arată una dintre ultimele trepte ale coborârii lui Saul. Poonen o include în seria care pornește de la pierderea ungerii și trece prin gelozie, violență și căutarea unui medium.",
  historicalContext: "Legea lui Israel interzicea chemarea morților și practicile de medium. Saul caută în ascuns tocmai ceea ce trebuia să îndepărteze din țară.",
  units: [
    {
      id: "1-samuel-28-1-6",
      ref: "1 Samuel 28:1-6",
      heading: "Saul cere răspuns după ani în care a respins cuvântul",
      text: samuel1Passage(28, 1, 6),
      teaching: teaching(
        "Saul vede tabăra filisteană și este cuprins de frică. El Îl întreabă pe DOMNUL, dar nu primește răspuns prin mijloacele cunoscute.",
        "Capitolul nu prezintă tăcerea lui Dumnezeu ca arbitrară; ea vine după respingerea repetată a cuvântului rostit prin Samuel.",
        "Poonen așază această tăcere în declinul unui om care a pierdut ungerea, dar a continuat să păstreze poziția.",
      ),
      crossRefs: ["1 Samuel 15:22-29"],
      forYourHeart: "Nu amâna ascultarea până când cauți cu disperare un răspuns în criză. Primește cuvântul când Dumnezeu îl trimite.",
    },
    {
      id: "1-samuel-28-7-25",
      ref: "1 Samuel 28:7-25",
      heading: "Mediumul de la En-Dor nu oferă o cale legitimă spre Dumnezeu",
      text: samuel1Passage(28, 7, 25),
      teaching: teaching(
        "Saul se deghizează și caută un medium, încălcând porunca pe care trebuia să o apere.",
        "Narațiunea spune că femeia l-a văzut pe Samuel și redă mesajul de judecată. Creștinii au discutat felul exact al acestei apariții, dar textul nu oferă practica drept metodă de călăuzire și nu autorizează contactarea morților.",
        "Mesajul nu îi oferă lui Saul o scăpare ocultă, ci repetă adevărul pe care îl primise deja: împărăția fusese ruptă de la el din cauza neascultării.",
      ),
      words: [
        {
          original: "אוֹב",
          transliteration: "ov",
          language: "ebraica",
          meaning: "medium sau duh consultat prin practici de chemare a morților. Legea interzice această practică; termenul nu desemnează o cale aprobată de revelație.",
        },
      ],
      crossRefs: ["Levitic 19:31", "Deuteronom 18:10-12"],
      forYourHeart: "Nu căuta prin ocultism răspunsul pe care refuzul ascultării l-a făcut dureros. Întoarce-te la adevărul deja dat de Dumnezeu.",
    },
  ],
  prayer: "Doamne, păzește-ne de a respinge glasul Tău și apoi de a căuta lumină în întuneric.\n\nDă-ne ascultare la vreme și ține-ne departe de orice practică ocultă. Amin.",
  status: SAMUEL1_STATUSES[28],
})
