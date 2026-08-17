import { iosuaChapter, teaching } from "./iosuaHelpers.js"
import { iosuaPassage } from "./iosuaText.js"
import { IOSUA_STATUSES } from "./iosuaPublication.js"

export const IOSUA_9 = iosuaChapter({
  number: 9,
  title: "Iosua 9 — Înșelăciunea gabaoniților",
  summary:
    "Văzând biruințele lui Israel, locuitorii Gabaonului recurg la o v ic le șug: se îmbracă în haine vechi și pretind că vin de departe, pentru a încheia un legământ de pace. Iosua și căpeteniile cad în cursă fără să întrebe pe DOMNUL, dar legământul jurat este respectat, iar gabaoniții devin tăietori de lemne și purtători de apă.",
  literaryContext:
    "După două victorii militare clare (Ierihon, Ai), acest capitol arată o altă față a cuceririi: nu toate popoarele Canaanului sunt învinse prin sabie, unele supraviețuiesc prin viclenie și integrare. Este și un avertisment despre pericolul deciziilor rapide, luate fără a întreba pe DOMNUL.",
  historicalContext:
    "Gabaon era o cetate importantă din regiunea centrală a Canaanului; legământul încheiat aici va avea consecințe directe în capitolul 10, când Israel este obligat să apere Gabaonul de o coaliție de regi amoriți.",
  units: [
    {
      id: "iosua-9-1-15",
      ref: "Iosua 9:1-15",
      heading: "Viclenia gabaoniților și legământul încheiat prea grăbit",
      text: iosuaPassage(9, 1, 15),
      teaching: teaching(
        "Auzind despre căderea Ierihonului și a cetății Ai, mai mulți împărați canaaniți se unesc să lupte împotriva lui Israel — dar locuitorii Gabaonului aleg o cale diferită: „au lucrat cu vicleșug”, alegând negocierea în locul confruntării armate.",
        "Se deghizează elaborat: saci vechi pe măgari, burdufuri de vin crăpate și legate, încălțăminte și haine peticite, pâine uscată și măcinată, pretenând că au venit de la mare distanță pentru a cere un legământ de pace, invocând faima DOMNULUI, Dumnezeul lui Israel.",
        "Textul spune răspicat cauza greșelii: „oamenii lui Israel au primit din merindele lor și n-au întrebat pe DOMNUL. Iosua a făcut pace cu ei”. Absența rugăciunii și a căutării voii lui Dumnezeu, nu lipsa de înțelepciune omenească, este rădăcina greșelii.",
      ),
      crossRefs: ["Iosua 1:8", "Proverbe 3:5-6"],
      forYourHeart:
        "Deciziile care par înțelepte din punct de vedere omenesc pot fi totuși greșite dacă sunt luate fără a căuta mai întâi fața lui Dumnezeu.",
    },
    {
      id: "iosua-9-16-27",
      ref: "Iosua 9:16-27",
      heading: "Descoperirea înșelăciunii și statutul gabaoniților",
      text: iosuaPassage(9, 16, 27),
      teaching: teaching(
        "După trei zile, adevărul iese la iveală: gabaoniții locuiau de fapt în apropiere. Adunarea cârtește împotriva căpeteniilor, dar acestea răspund: „le-am jurat pe DOMNUL, Dumnezeul lui Israel, și acum nu putem să ne atingem de ei”. Cuvântul dat în numele DOMNULUI rămâne obligatoriu chiar și când a fost obținut prin înșelăciune.",
        "Ca soluție intermădiară, căpeteniile hotărăsc să-i lase în viață, dar îi fac tăietori de lemne și purtători de apă pentru întreaga adunare și pentru altarul DOMNULUI. Astfel se păstrează atât jurământul, cât și o formă de dreptate pentru viclenia lor.",
        "Iosua îi mustră direct pe gabaoniți pentru minciuna lor, dar ei răspund cu sinceritate: au acționat din frică pentru viața lor, știind despre porunca nimicirii popoarelor Canaanului. Textul încheie notând că acești oameni au rămas în această slujbă „până în ziua de azi”.",
      ),
      crossRefs: ["Deuteronom 20:10-11", "2 Samuel 21:1-2"],
      forYourHeart:
        "Un jurământ făcut în numele lui Dumnezeu rămâne obligatoriu, chiar și atunci când descoperim ulterior că am fost înșelați la încheierea lui.",
    },
  ],
  prayer:
    "Doamne, învață-ne să Te întrebăm mai întâi pe Tine, înainte de a lua decizii importante, oricât de limpezi ni s-ar părea faptele.\n\nDă-ne discernământ în fața viclene, și smerenie să recunoaștem când am fost înșelați.\n\nÎnvață-ne să ne ținem cuvântul dat, chiar și atunci când ține de un legământ încheiat în grabă.\n\nȘi mulțumim că harul Tău găsește întotdeauna o cale să împace dreptatea cu credincioșia legământului. Amin.",
  status: IOSUA_STATUSES[9],
})
