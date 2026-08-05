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

export const NUMERI_5 = numeriChapter({
  number: 5,
  title: "Numeri 5 — Curăția taberei, dreptatea față de aproapele și legea geloziei",
  summary:
    "Trei legi, la prima vedere fără legătură, sunt așezate una lângă alta: scoaterea din tabără a celor necurați, restituirea cu adaos a pagubei făcute cuiva, și rânduiala apei amărăciunii pentru soția bănuită de necredincioșie. Toate trei privesc, în feluri diferite, aceeași întrebare: cum rămâne curată o tabără în care locuiește DOMNUL, și cum se rezolvă neîncrederea și vinovăția fără să rămână ascunse.",
  literaryContext:
    "Capitolul vine imediat după rânduiala Cortului din capitolele 3-4, ca o extindere firească: dacă Cortul trebuie păzit de orice atingere necurată, la fel trebuie păzită și tabăra din jurul lui. Cele trei secțiuni — necurăția trupească (1-4), vinovăția față de aproapele (5-10) și bănuiala de necredincioșie (11-31) — sunt legate printr-un singur fir: nimic din ce desparte omul de om sau pe om de Dumnezeu nu poate rămâne ascuns sau nerezolvat în mijlocul poporului.",
  historicalContext:
    "Rânduiala apei amărăciunii, ciudată pentru cititorul modern, era de fapt o cale prin care o femeie bănuită, fără dovezi și fără martori, era scoasă din suspiciunea neîncetată a unui soț gelos și lăsată în mâna judecății lui Dumnezeu, nu a violenței omenești. În multe culturi vecine, o soție bănuită putea fi ucisă fără proces; aici, procesul este public, rânduit de preot, și lasă rezultatul exclusiv în mâna DOMNULUI. Nu exista nicio taină ori otravă în apa amărăciunii; ea nu vătăma pe cea nevinovată.",
  units: [
    {
      id: "numeri-5-1-4",
      ref: "Numeri 5:1-4",
      heading: "Scoaterea din tabără a celor necurați",
      text: numeriPassage(5, 1, 4),
      teaching: teaching(
        "Porunca este scurtă și fără excepție: leprosul, cel cu scurgere și cel necurat din pricina unui mort trebuie scoși din tabără, „fie bărbat, fie femeie”. Motivul nu este disprețul față de bolnav sau față de cel îndoliat, ci un singur adevăr rostit direct: „ca să nu spurce tabăra în mijlocul căreia locuiesc Eu”.",
        "Ia aminte unde pune Dumnezeu temeiul poruncii: nu în igiena taberei, ci în propria Lui locuire acolo. O tabără obișnuită s-ar putea organiza după considerente de sănătate sau de ordine; tabăra lui Israel se organizează după prezența DOMNULUI în mijlocul ei. Curăția aceasta este, mai întâi de toate, o curăție cerută de vecinătatea cu Dumnezeu.",
        "Ascultarea poporului este notată simplu, dar limpede: „Fiii lui Israel au făcut așa”. Fără cârtire, fără excepție, exact cum se va repeta de mai multe ori în capitolele acestea.",
      ),
      words: [
        {
          original: "וְלֹא יְטַמְּאוּ",
          transliteration: "velo ietam'u",
          language: "ebraica",
          meaning:
            "și să nu spurce, să nu întineze. Verbul arată o contaminare care se răspândește, nu doar o stare privată a celui bolnav; de aceea trebuia scos afară din tabără, nu doar izolat în ea.",
        },
      ],
      crossRefs: ["Levitic 13:45-46", "Levitic 15:1-15", "Numeri 19:11-13"],
      forYourHeart:
        "Nu doar ce faci în văzul tuturor afectează comunitatea din jurul tău; și ce porți ascuns poate spurca locul în care Dumnezeu vrea să locuiască.",
    },
    {
      id: "numeri-5-5-10",
      ref: "Numeri 5:5-10",
      heading: "Restituirea pagubei: mărturisire, întoarcere și adaos",
      text: numeriPassage(5, 5, 10),
      teaching: teaching(
        "O nedreptate făcută aproapelui este numită aici, fără ocol, „o abatere împotriva DOMNULUI”. Păcatul împotriva omului nu rămâne doar între oameni; el urcă până la Dumnezeu Însuși, pentru că poruncile privitoare la aproapele sunt tot poruncile Lui.",
        "Calea de îndreptare are trei pași, în ordine: mărturisirea păcatului, restituirea în întregime a pagubei, și adăugarea unei a cincea părți peste ea. Nu este de ajuns să întorci ce ai luat; trebuie să întorci mai mult decât ai luat, ca semn că regreți, nu doar că ai fost prins.",
        "Dacă cel păgubit a murit și nu are rudă apropiată căreia să i se dea despăgubirea, ea nu se pierde, ci ajunge la preot, „pe lângă berbecul ispășirii”. Nicio nedreptate nu rămâne fără urmări doar pentru că cel vătămat nu mai este de față să le ceară.",
      ),
      words: [
        {
          original: "וְהִתְוַדּוּ",
          transliteration: "vehitvadu",
          language: "ebraica",
          meaning:
            "și să mărturisească. Forma verbului arată o recunoaștere rostită deschis, nu doar o părere de rău tăcută; restituirea fără mărturisire ar rămâne incompletă.",
        },
      ],
      crossRefs: ["Levitic 6:1-7", "Luca 19:8", "Exod 22:1"],
      forYourHeart:
        "Dacă porți o pagubă nereparată față de cineva, nu aștepta ca timpul s-o șteargă. Mărturisește, întoarce și adaugă — pasul acesta nu poate fi sărit.",
    },
    {
      id: "numeri-5-11-15",
      ref: "Numeri 5:11-15",
      heading: "Duhul de gelozie și darul de aducere aminte",
      text: numeriPassage(5, 11, 15),
      teaching: teaching(
        "Legea care urmează privește un caz greu: o bănuială de necredincioșie fără martori și fără dovadă, „ascunsă de ochii soțului ei”. Textul recunoaște limpede o realitate omenească dureroasă: un duh de gelozie poate veni peste un bărbat, fie că soția s-a spurcat, fie că nu s-a spurcat deloc.",
        "Darul pe care trebuie să-l aducă bărbatul este el însuși o mărturie a gravității: făină de orz, fără ulei și fără tămâie, hrana cea mai simplă, „un dar de cereale al geloziei... care aduce aminte de nelegiuire”. Nu este un dar de bucurie sau de mulțumire, ci unul care ține deschisă întrebarea nerezolvată.",
        "Observă cu câtă grijă rânduiala apără femeia de o judecată pripită a soțului: nu bărbatul o judecă și o pedepsește după plac, ci o duce înaintea preotului și lasă rezultatul în mâna lui Dumnezeu. Chiar și în bănuiala cea mai grea, rânduiala DOMNULUI oprește violența omenească necontrolată.",
      ),
      words: [
        {
          original: "רוּחַ קִנְאָה",
          transliteration: "ruah kina",
          language: "ebraica",
          meaning:
            "duh de gelozie. Expresia recunoaște gelozia ca pe o realitate copleșitoare, aproape ca un duh care vine peste om, fără să-i îngăduie acestuia să acționeze după propria mânie.",
        },
      ],
      crossRefs: ["Proverbe 6:34-35", "Cântarea Cântărilor 8:6", "Ioan 8:3-11"],
      forYourHeart:
        "Bănuiala neîntemeiată poate copleși inima la fel de tare ca vina reală. Dumnezeu are o cale pentru amândouă, dar calea nu este niciodată judecata pripită.",
    },
    {
      id: "numeri-5-16-22",
      ref: "Numeri 5:16-22",
      heading: "Apa amărăciunii și jurământul înaintea DOMNULUI",
      text: numeriPassage(5, 16, 22),
      teaching: teaching(
        "Ritualul are o simplitate aspră: apă sfântă într-un vas de pământ, amestecată cu țărână de pe podeaua Cortului, părul femeii desfăcut, darul de cereale pus în mâinile ei. Fiecare element o așază „înaintea DOMNULUI”, nu înaintea soțului sau a mulțimii; judecata aceasta nu aparține oamenilor.",
        "Jurământul preotului are două fețe, rostite amândouă cu limpezime: dacă este nevinovată, va fi „neapărat scutită”; dacă este vinovată, blestemul rostit se va împlini întocmai. Femeia răspunde cu propriul ei „Amin, Amin!” — își asumă liber judecata pe care o va aduce apa, nu este forțată la ea.",
        "Ia aminte că nimic din ritual nu are putere magică proprie; apa cu țărână nu vatămă pe nimeni prin ea însăși. Dacă ceva se împlinește, se împlinește pentru că DOMNUL Însuși intervine ca să dea la iveală adevărul ascuns, nu pentru că apa ar avea o putere ei proprie.",
      ),
      words: [
        {
          original: "מֵי הַמָּרִים הַמְאָרֲרִים",
          transliteration: "mei hamarim hameorarim",
          language: "ebraica",
          meaning:
            "apele amărăciunii care aduc blestemul. Numele arată clar rostul apei: nu vindecare, nu curățire rituală obișnuită, ci un mijloc prin care blestemul rostit ajunge, dacă e cazul, la împlinire.",
        },
      ],
      crossRefs: ["Deuteronom 29:19-20", "Evrei 4:13", "1 Corinteni 4:5"],
      forYourHeart:
        "Ce ai ascuns de ochii oamenilor nu rămâne ascuns de DOMNUL. Adevărul, mai devreme sau mai târziu, ajunge la lumină în fața Lui.",
    },
    {
      id: "numeri-5-23-28",
      ref: "Numeri 5:23-28",
      heading: "Blestemul scris, șters în apă și băut",
      text: numeriPassage(5, 23, 28),
      teaching: teaching(
        "Un amănunt aparte al ritualului: preotul scrie blestemele într-o carte, apoi le șterge chiar în apa pe care femeia o va bea. Cuvântul scris devine parte din apa băută — ceea ce fusese rostit ca amenințare ajunge, literalmente, în trupul celei judecate.",
        "Darul de cereale este ars pe altar înainte ca femeia să bea apa, exact ca la orice altă jertfă de aducere aminte. Chiar și în mijlocul unei judecăți atât de personale, rânduiala Cortului nu este ocolită; totul rămâne legat de altar, nu de o practică separată de închinare.",
        "Rezultatul este descris fără ambiguitate: dacă femeia s-a spurcat, semnele fizice vor urma; dacă este curată, „va fi nevinovată și va putea avea copii”. Observă ultima parte: nevinovăția confirmată nu doar șterge bănuiala, ci aduce și o binecuvântare — posibilitatea de a avea copii, exact ce o bănuială neîntemeiată ar fi putut umbri pentru totdeauna.",
      ),
      words: [
        {
          original: "וּמָחָה אֶל־מֵי הַמָּרִים",
          transliteration: "umaha el-mei hamarim",
          language: "ebraica",
          meaning:
            "și să le șteargă în apele amărăciunii. Verbul „a șterge” arată literal dizolvarea cuvintelor scrise ale blestemului chiar în apa care va fi băută, unind cuvântul rostit cu fapta judecății.",
        },
      ],
      crossRefs: ["Apocalipsa 10:9-10", "Ezechiel 2:8-3:3", "Levitic 2:1-3"],
      forYourHeart:
        "Nevinovăția confirmată de Dumnezeu nu doar te scapă de o acuzație; ea deschide din nou calea spre binecuvântarea pe care bănuiala o ținuse închisă.",
    },
    {
      id: "numeri-5-29-31",
      ref: "Numeri 5:29-31",
      heading: "Legea geloziei, încheiată",
      text: numeriPassage(5, 29, 31),
      teaching: teaching(
        "Capitolul se închide cu un rezumat scurt al „legii geloziei”, valabilă atât pentru femeia care s-a abătut cu adevărat, cât și pentru cea bănuită pe nedrept de un duh de gelozie venit peste soțul ei. Aceeași lege slujește dreptății în amândouă cazurile.",
        "Ultimul verset este poate cel mai greu de citit azi: „Bărbatul va fi nevinovat de nelegiuire, dar femeia aceea își va purta nelegiuirea”. Legea nu privește simetric cele două părți în privința urmărilor rituale, dar nici nu lasă loc unei judecăți omenești arbitrare; fiecare parte suportă exact ce rânduiala lui Dumnezeu a stabilit, nu ce ar decide un soț mâniat sau o mulțime pripită.",
        "Citind acest capitol dinspre Evanghelie, se vede o umbră îndepărtată a unui adevăr mai mare: Cel care nu a avut nicio vină a purtat, la cruce, chiar nelegiuirea celor vinovați, ca ei să iasă „neapărat scutiți” de blestemul pe care îl meritau.",
      ),
      words: [
        {
          original: "וְתִשָּׂא אֶת־עֲוֹנָהּ",
          transliteration: "vetisa et-avonah",
          language: "ebraica",
          meaning:
            "și își va purta nelegiuirea. Aceeași expresie ebraică pentru „a purta nelegiuirea” apare în multe alte locuri din Lege, arătând întotdeauna o răspundere personală care nu poate fi transferată altcuiva fără un mijlocitor rânduit de Dumnezeu.",
        },
      ],
      crossRefs: ["Galateni 3:13", "2 Corinteni 5:21", "Isaia 53:4-6"],
      forYourHeart:
        "Ești tu însuți sub o vină nemărturisită, purtată în tăcere? Legea geloziei arată limpede: adevărul iese la lumină înaintea DOMNULUI, mai devreme sau mai târziu.",
    },
  ],
  prayer:
    "Doamne, Tu locuiești în mijlocul poporului Tău și ceri o curăție pe măsura prezenței Tale; curăță tabăra inimii mele de tot ce ar spurca-o.\n\nÎnvață-mă să nu amân mărturisirea și restituirea unei nedreptăți, ci să întorc mai mult decât am luat.\n\nEliberează-mă de bănuiala neîntemeiată și de gelozia care mă face să judec pripit pe cei din jurul meu.\n\nȘi mulțumescu-Ți pentru Cel care a purtat, nevinovat, nelegiuirea mea, ca eu să ies neapărat scutit de blestemul pe care îl meritam. Amin.",
  status: NUMERI_STATUSES[5],
})
