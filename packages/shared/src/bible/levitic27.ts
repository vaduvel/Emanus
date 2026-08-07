import { leviticChapter, teaching } from "./leviticHelpers.js"

/*
 * Cartea Levitic, explicată pe unități de sens.
 *
 * Textul biblic: păstrat separat în leviticText.ts (fișierele leviticTextN.ts).
 * Explicația: scrisă pentru Emanus după cercetarea textului. Nu se copiază
 * formularea niciunui predicator sau comentator.
 */

export const LEVITIC_27 = leviticChapter({
  number: 27,
  title: "Levitic 27 — Ce se făgăduiește și cine prețuiește",
  summary:
    "Capitolul de încheiere vorbește despre lucrurile făgăduite lui Dumnezeu de bunăvoie: oameni, vite, case, țarini, întâi născuți și zeciuială. Pentru fiecare se dă o prețuire și o cale de răscumpărare, iar scara coboară mereu până la cel sărac. Cartea se sfârșește nu cu o poruncă grea, ci cu o întrebare pusă inimii: ce dai de la tine, fără să ți se ceară?",
  literaryContext:
    "Ia aminte că nimic din capitolul acesta nu este poruncit. Nimeni nu era ținut să facă o făgăduință. Dar cine o făcea intra sub o rânduială, fiindcă vorba dată lui Dumnezeu nu se ia înapoi cu una cu două. Și vezi așezarea frumoasă față de capitolul dinainte: acolo Dumnezeu Își aduce aminte de legământul Lui, aici omul își ține cuvântul lui.",
  historicalContext:
    "Oamenii făgăduiau adesea ceva la o strâmtorare: o boală, un război, o naștere. Ana a făgăduit copilul, Iacov a făgăduit zeciuiala la Betel, Iefta a făgăduit nechibzuit și s-a legat rău. Prețuirile se socoteau în sicli de argint, după vârstă și putere de muncă, cum se socotea pe atunci o slujbă răscumpărată; nu era un preț pus pe viața omului, ci pe lucrul adus în locul lui.",
  units: [
    {
      verses: [1, 8],
      heading: "Prețuirea, și preotul care coboară prețul",
      teaching: teaching(
        "Când cineva făgăduia Domnului un om, se dădea o prețuire în argint, după vârstă: atât pentru bărbat, atât pentru femeie, atât pentru copil, atât pentru cel bătrân. Ia aminte că nu este prețul unei vieți; este socoteala unei slujbe răscumpărate cu bani, fiindcă omul nu putea rămâne să slujească la cort.",
        "Și vezi versetul care încheie șirul și care este cel mai frumos din capitol: dacă cel care a făgăduit este prea sărac pentru prețuire, să fie dus înaintea preotului, iar preotul îi va pune un preț după puterea mâinii lui. Prețul cobora ca să încapă în mâna săracului.",
        "Ia seama că aceasta este rânduiala care străbate toată cartea: cine nu putea aduce un miel aducea o pasăre, și cine nu putea aduce o pasăre aducea făină. Nimeni nu a fost ținut afară din pricina sărăciei. Dumnezeu nu are o închinare pentru bogați și alta pentru săraci.",
        "Și ține minte că Domnul Iisus a lăudat doi bănuți mai mult decât toate darurile mari, fiindcă femeia aceea dăduse tot ce avea. Dumnezeu nu privește la cât se pune, ci la cât rămâne în mână după ce s-a dat."
      ),
      words: [
        {
          original: "כי יפלא נדר",
          transliteration: "ki iafli neder",
          language: "ebraica",
          meaning: "când cineva face o făgăduință deosebită. De bunăvoie, nu din poruncă."
        },
        {
          original: "בערכך",
          transliteration: "beerkeha",
          language: "ebraica",
          meaning: "după prețuirea ta. O socoteală, nu prețul unei vieți."
        },
        {
          original: "ואם מך הוא מערכך",
          transliteration: "veim mah hu meerkeha",
          language: "ebraica",
          meaning: "iar dacă este prea sărac pentru prețuire."
        },
        {
          original: "על פי אשר תשיג יד",
          transliteration: "al pi așer tasig iad",
          language: "ebraica",
          meaning: "după cât ajunge mâna lui. Prețul cobora la puterea omului."
        }
      ],
      crossRefs: ["Marcu 12:41-44", "Levitic 5:7", "Levitic 12:8", "2 Corinteni 8:12", "Luca 21:2-4"],
      forYourHeart: "Dumnezeu nu privește la cât se pune, ci la cât rămâne în mână după ce s-a dat."
    },
    {
      verses: [9, 13],
      heading: "Ce a fost dat nu se schimbă pe altceva",
      teaching: teaching(
        "Vita făgăduită Domnului nu se mai schimba: nici bună pe rea, nici rea pe bună; iar dacă cineva o schimba totuși, rămâneau sfinte amândouă. Ia aminte la asprimea aceasta: nu se îmblânzea nimeni cu socoteli după ce dăduse cuvântul.",
        "Și vezi împotriva cărui obicei se ridică rânduiala. Omul făgăduiește la strâmtorare cel mai bun animal, iar când trece strâmtorarea începe să caute unul mai slab de aceeași măsură. Dumnezeu a tăiat drumul acesta din capul locului.",
        "Ia seama că pentru vita necurată se putea plăti prețul și încă a cincea parte, dacă omul o voia înapoi. Nu se închidea ușa; dar răscumpărarea costa mai mult decât făgăduința. Este mai ieftin să dai decât să iei înapoi.",
        "Și ține minte cuvântul din Ecclesiastul: mai bine să nu făgăduiești decât să făgăduiești și să nu împlinești. Iar Domnul Iisus ne-a învățat să nu ne legăm cu jurăminte, ci să avem un da care ține și un nu care ține."
      ),
      words: [
        {
          original: "לא יחליפנו ולא ימיר אתו",
          transliteration: "lo iahlifenu velo iamir oto",
          language: "ebraica",
          meaning: "să nu-l schimbe și să nu dea altul în locul lui."
        },
        {
          original: "טוב ברע או רע בטוב",
          transliteration: "tov bera o ra betov",
          language: "ebraica",
          meaning: "bun pe rău sau rău pe bun. Nici într-un fel."
        },
        {
          original: "ויסף חמישיתו עליו",
          transliteration: "veiasaf hamișito alav",
          language: "ebraica",
          meaning: "să mai adauge a cincea parte. Răscumpărarea costă mai mult."
        }
      ],
      crossRefs: ["Ecclesiastul 5:4-5", "Matei 5:33-37", "Psalmul 15:4", "Fapte 5:4", "Maleahi 1:14"],
      forYourHeart: "Este mai ieftin să dai decât să iei înapoi."
    },
    {
      verses: [14, 15],
      heading: "Casa făgăduită",
      teaching: teaching(
        "Cine sfințea Domnului casa lui, preotul o prețuia, și prețuirea aceea rămânea; iar dacă omul voia să și-o răscumpere, adăuga a cincea parte. Ia aminte cine punea prețul: nu stăpânul, ci preotul. Nu ne prețuim singuri darurile.",
        "Și vezi înțelepciunea lucrului. Omul care dă socotește mai mare ce dă, iar cel care ia înapoi socotește mai mic ce ia. De aceea prețul se punea de altcineva.",
        "Ia seama că se putea făgădui și casa, nu numai vita și argintul. Nimic nu era prea mare pentru a fi făgăduit și nimic prea mic. Dar de fiecare dată se făcea limpede, cu socoteală, ca să nu rămână nedumeriri.",
        "Și ține minte că Anania și Safira n-au fost mustrați că au dat puțin, ci că au spus că au dat tot. Țarina era a lor și prețul era al lor; minciuna a fost păcatul. Un dar mic și limpede este mai bun decât unul mare și îmbrăcat în vorbe."
      ),
      words: [
        {
          original: "ואיש כי יקדש את ביתו",
          transliteration: "veiș ki iakdiș et beito",
          language: "ebraica",
          meaning: "când cineva sfințește Domnului casa lui."
        },
        {
          original: "והעריכו הכהן",
          transliteration: "veheșeriho hakohen",
          language: "ebraica",
          meaning: "preotul îi va pune prețul. Nu își prețuiește omul singur darul."
        },
        {
          original: "כן יקום",
          transliteration: "ken iakum",
          language: "ebraica",
          meaning: "așa va rămâne. Prețuirea nu se mai discuta."
        }
      ],
      crossRefs: ["Fapte 5:3-4", "2 Corinteni 9:7", "Matei 6:3-4", "Proverbe 11:24-25", "Luca 19:8"],
      forYourHeart: "Un dar mic și limpede este mai bun decât unul mare și îmbrăcat în vorbe."
    },
    {
      verses: [16, 21],
      heading: "Țarina făgăduită se socotește pe ani",
      teaching: teaching(
        "Țarina din moșia cuiva se prețuia după sămânța care încape în ea, iar socoteala se făcea după câți ani mai rămâneau până la anul de veselie. Ia aminte că se întoarce rânduiala din capitolul dinainte: nu se dă pământul, se dau anii de rod.",
        "Și vezi ce se întâmpla dacă omul nu și-o răscumpăra până la anul de veselie: țarina rămânea a Domnului, ca o țarină osebită, și trecea la preoți. Ce a fost dat Lui nu se întorcea la stăpânul de mai înainte prin trecerea vremii.",
        "Ia seama la felul socotelii: cinstit, limpede, cu numărul anilor în față. Dumnezeu nu Se supără de socoteli. Se supără de socotelile ascunse.",
        "Și ține minte că și noi avem de socotit ceva: cât ne mai rămâne și ce facem cu ce ne rămâne. Învață-ne să ne numărăm bine zilele, s-a rugat Moise. Anii sunt puțini și se cheltuiesc o singură dată."
      ),
      words: [
        {
          original: "לפי זרעו",
          transliteration: "lefi zaro",
          language: "ebraica",
          meaning: "după sămânța care încape în ea. Socoteală după rod."
        },
        {
          original: "על פי השנים הנותרות",
          transliteration: "al pi hașanim hanotarot",
          language: "ebraica",
          meaning: "după anii care mai rămân."
        },
        {
          original: "שדה החרם",
          transliteration: "sde haherem",
          language: "ebraica",
          meaning: "țarină osebită cu totul. Ce a fost dat nu se întoarce."
        }
      ],
      crossRefs: ["Psalmul 90:12", "Levitic 25:15-16", "Numeri 18:14", "Luca 12:20", "Iacov 4:14"],
      forYourHeart: "Dumnezeu nu Se supără de socoteli. Se supără de socotelile ascunse."
    },
    {
      verses: [22, 25],
      heading: "Ce ai cumpărat și ce ai moștenit",
      teaching: teaching(
        "Dacă omul făgăduia o țarină cumpărată, nu din moșia neamului lui, plătea prețuirea chiar în ziua aceea, iar țarina se întorcea la anul de veselie la cel din al cărui neam era. Ia aminte că nu putea făgădui de veci ce nu era al lui de veci.",
        "Și vezi ce ne învață lucrul acesta: putem da lui Dumnezeu numai ce ținem în mână cu adevărat. Nu se face închinare cu ce este al altuia și nu se făgăduiește ce nu avem. David a spus limpede: nu voi aduce Domnului o jertfă care nu mă costă nimic.",
        "Ia seama la vorba de încheiere: toate prețuirile se făceau după siclul locului sfânt, o măsură statornică. Nu socotea fiecare cu cântarul lui. Cine se măsoară cu măsura lui iese totdeauna bine la socoteală.",
        "Și ține minte că Dumnezeu ține o singură măsură pentru toți, și tocmai de aceea putem sta liniștiți înaintea Lui. Un Dumnezeu cu două cântare n-ar fi de încredere."
      ),
      words: [
        {
          original: "שדה מקנתו",
          transliteration: "sde miknato",
          language: "ebraica",
          meaning: "țarina cumpărată de el, nu moșia neamului."
        },
        {
          original: "בשקל הקדש",
          transliteration: "beșekel hakodeș",
          language: "ebraica",
          meaning: "după siclul locului sfânt. O singură măsură pentru toți."
        },
        {
          original: "עשרים גרה יהיה השקל",
          transliteration: "esrim ghera ihie hașekel",
          language: "ebraica",
          meaning: "siclul să fie de douăzeci de ghere. Măsură statornică."
        }
      ],
      crossRefs: ["2 Samuel 24:24", "Levitic 19:36", "Proverbe 20:10", "Romani 2:11", "Iacov 1:17"],
      forYourHeart: "Cine se măsoară cu măsura lui iese totdeauna bine la socoteală."
    },
    {
      verses: [26, 29],
      heading: "Ce era deja al Lui nu se poate făgădui",
      teaching: teaching(
        "Întâiul născut al vitelor nu se putea făgădui, fiindcă era deja al Domnului. Ia aminte cât de limpede este lucrul: nu poți da în dar ceva ce nu-ți aparține. Este o învățătură tăioasă pentru inima care crede că Îl îndatorează pe Dumnezeu.",
        "Și vezi că tot ce respiră este al Lui, și noi îmreună cu tot ce avem. Nu-I dăm niciodată din al nostru; Îi dăm înapoi din al Lui. David a spus la fel când s-a strâns argint pentru Templu: ce este al Tău, ți-am dat.",
        "Ia seama la lucrurile date cu totul, care nu se mai puteau răscumpăra. Erau altceva decât făgăduințele obișnuite: hotărâri de judecată luate asupra unui popor sau a unui lucru sub o rânduială anume, la vremea aceea. Nu se ia versetul 29 ca temei pentru vreo faptă de azi; adunarea nu are sabie, iar Domnul a oprit mâna ucenicilor când au voit să cheme foc.",
        "Și ține minte partea care ne privește: cel dintâi născut al nostru era deja al Lui, și El L-a dat pe Cel întâi Născut al Lui pentru noi. N-am adus noi prețul; a fost adus în locul nostru."
      ),
      words: [
        {
          original: "אך בכור ליהוה",
          transliteration: "ah behor laDomnul",
          language: "ebraica",
          meaning: "întâiul născut este însă al Domnului. Era al Lui dinainte."
        },
        {
          original: "לא יקדיש איש אתו",
          transliteration: "lo iakdiș iș oto",
          language: "ebraica",
          meaning: "nimeni să nu-l închine ca dar al lui."
        },
        {
          original: "כל חרם קדש קדשים הוא ליהוה",
          transliteration: "kol herem kodeș kodașim hu laDomnul",
          language: "ebraica",
          meaning: "tot ce este dat cu totul este preasfânt pentru Domnul."
        }
      ],
      crossRefs: ["1 Cronici 29:14", "Ioan 3:16", "Romani 8:32", "Luca 9:54-56", "Psalmul 50:10-12"],
      forYourHeart: "Nu-I dăm niciodată din al nostru. Îi dăm înapoi din al Lui."
    },
    {
      verses: [30, 34],
      heading: "Zeciuiala este a Domnului, și cartea se încheie",
      teaching: teaching(
        "Toată zeciuiala din pământ, din rodul țarinei și din pomi, este a Domnului; și a zecea parte din cirezi și turme, orice trecea sub toiag. Ia aminte că nu se spune: dați zeciuiala, ci: zeciuiala este a Domnului. Nu se dă ce este al nostru; se pune deoparte ce era al Lui.",
        "Și vezi amănuntul cu toiagul: păstorul număra vitele trecându-le pe sub toiag, și a zecea era osebită, fără să se aleagă între bună și rea. Cine alegea pierdea dreptul de a schimba. Dumnezeu oprește ochiul care caută să dea partea cea mai proastă.",
        "Ia seama cum stă lucrul în Noul Legământ. Nu ni se pune un procent la spinare; ni se cere altceva, mai greu și mai ușor totodată: fiecare să dea cum a hotărât în inima lui, nu cu părere de rău, nici de silă, fiindcă Dumnezeu iubește pe cel care dă cu bucurie. Iar Maleahi a mustrat un popor care aducea partea șchiopătată.",
        "Și ține minte cum se încheie cartea: acestea sunt poruncile pe care le-a dat Domnul lui Moise pentru copiii lui Israel, pe muntele Sinai. A început cu un glas care ieșea din cort, chemând un om să se apropie, și se sfârșește cu un popor care poate să dea de bunăvoie. Aceasta este toată calea: mai întâi El cheamă și face ispășire, apoi noi dăm."
      ),
      words: [
        {
          original: "וכל מעשר הארצ ליהוה הוא",
          transliteration: "vehol maasar haareț laDomnul hu",
          language: "ebraica",
          meaning: "toată zeciuiala pământului este a Domnului. Era a Lui dinainte."
        },
        {
          original: "כל אשר יעבר תחת השבט",
          transliteration: "kol așer iaavor tahat hașavet",
          language: "ebraica",
          meaning: "tot ce trece pe sub toiag. Se număra, nu se alegea."
        },
        {
          original: "לא יבקר בין טוב לרע",
          transliteration: "lo ievaker bein tov lera",
          language: "ebraica",
          meaning: "să nu caute dacă este bună sau rea."
        },
        {
          original: "אלה המצות אשר צוה יהוה את משה",
          transliteration: "ele hamițvot așer țiva Domnul et Moșe",
          language: "ebraica",
          meaning: "acestea sunt poruncile date lui Moise. Vorba de încheiere a cărții."
        }
      ],
      crossRefs: ["2 Corinteni 9:7", "Maleahi 3:8-10", "Matei 23:23", "Levitic 1:1", "Evrei 10:19-22"],
      forYourHeart: "Mai întâi El cheamă și face ispășire; abia apoi dăm noi."
    }
  ],
  prayer:
    "Doamne, învață-ne să spunem puțin și să împlinim tot ce spunem.\n\nScoate din noi obiceiul de a-ți făgădui la nevoie și de a uita la liniște.\n\nMulțumim că prețul cobora până la puterea mâinii celui sărac și că nimeni nu a fost ținut afară din pricina sărăciei.\n\nTot ce avem este al Tău; învață-ne să dăm cu bucurie. Amin."
})
