import { leviticChapter, teaching } from "./leviticHelpers.js"

/*
 * Cartea Levitic, explicată pe unități de sens.
 *
 * Textul biblic: păstrat separat în leviticText.ts (fișierele leviticTextN.ts).
 * Explicația: scrisă pentru Emanus după cercetarea textului. Nu se copiază
 * formularea niciunui predicator sau comentator.
 */

export const LEVITIC_26 = leviticChapter({
  number: 26,
  title: "Levitic 26 — Două drumuri, și un legământ care nu se rupe",
  summary:
    "Se pun înaintea poporului roadele ascultării și roadele lepădării, într-o urcare treptată a mustrării, de patru ori cu vorba înzecit mai greu. Iar la capătul celei mai negre părți, capitolul nu se încheie cu nimicire, ci cu un cuvânt: Îmi voi aduce aminte de legământul Meu.",
  literaryContext:
    "Ia aminte la cumpăna dintre părți: binecuvântării i se dau vreo unsprezece versete, iar mustrării vreo treizeci. Nu fiindcă Dumnezeu ar avea mai multă plăcere de una decât de alta, ci fiindcă omul se îndreaptă mai greu și are nevoie de vorbe repetate. Și vezi cum se întoarce de patru ori același cuvânt: dacă nici așa nu Mă ascul-tați. Fiecare treaptă este o ușă lăsată deschisă, nu o lovitură dată la întâmplare.",
  historicalContext:
    "Legămintele dintre împărați și popoare, în lumea de atunci, se încheiau tocmai așa: cu binecuvântări pentru cine ține și cu blesteme pentru cine calcă. Israel ar fi cunoscut tiparul. Deosebirea stă în încheiere: niciun împărat al lumii nu își sfârșea legământul cu făgăduința că își va aduce aminte de cel călcat de răzvrătiți. Și istoria a mers pe drumul acesta: robia în Asiria și în Babilon, țara pustiită, și totuși o întoarcere.",
  units: [
    {
      verses: [1, 2],
      heading: "Doi hotare de la care se începe totul",
      teaching: teaching(
        "Înainte de făgăduințe și de mustrări se pun două lucruri: să nu vă faceți chipuri turnate și nici piatră împăpodobită la care să vă plecați, și să păziți zilele Mele de odihnă și să cinstiți locul Meu sfânt. Ia aminte că acestea sunt cele două hotare ale închinării: pe cine, și când.",
        "Și vezi de ce stă chipul turnat întâi. Nu începe căderea unui popor cu fărădelegi pe uliță; începe cu un dumnezeu făcut cu mâna, pe măsura lui. Restul vine după.",
        "Ia seama că alături de oprire stă un dar: ziua de odihnă. Dumnezeu nu cere numai să nu ne închinăm altcuiva; ne dă și o zi în care să ne oprim și să privim la El. Oprirea de la idol și oprirea de la lucru merg împreună.",
        "Și ține minte că idolul nu este numai o statuie. Este orice lucru pus în locul Lui, oricât de curat ar părea. Pavel a numit lăcomia închinare la idoli, iar Ioan își încheie epistola cu vorba: feriți-vă de idoli."
      ),
      words: [
        {
          original: "לא תעשו לכם אלילם",
          transliteration: "lo taasu lahem elilim",
          language: "ebraica",
          meaning:
            "să nu vă faceți idoli. Cuvântul însemnează lucruri de nimic."
        },
        {
          original: "ואבן משכית",
          transliteration: "veeven maskit",
          language: "ebraica",
          meaning:
            "piatră împodobită, lucrată cu chipuri. Frumoasă și totuși oprită."
        },
        {
          original: "ומקדשי תיראו",
          transliteration: "umikdași tirau",
          language: "ebraica",
          meaning:
            "și să cinstiți locul Meu sfânt."
        }
      ],
      crossRefs: ["1 Ioan 5:21", "Coloseni 3:5", "Exod 20:3-4", "Isaia 42:8", "Marcu 2:27"],
      forYourHeart:
        "Căderea nu începe pe uliță; începe cu un dumnezeu făcut pe măsura noastră."
    },
    {
      verses: [3, 13],
      heading: "Ploaia la vreme, și El umblând în mijlocul lor",
      teaching: teaching(
        "Dacă vor umbla în rânduielile Lui, vor avea ploaie la vreme, rod îndestulat, pâine săturată, pace în țară și somn fără frică. Ia aminte că lucrurile făgăduite nu sunt din cele mari și strălucite; sunt ploaia, pâinea și somnul liniștit. Dumnezeu binecuvântează în lucrurile de fiecare zi.",
        "Și vezi unde urcă șirul: nu la belsug, ci la o vorbă mai mare decât toate: voi umbla în mijlocul vostru și voi fi Dumnezeul vostru, iar voi veți fi poporul Meu. Cea mai mare binecuvântare nu este ce primești, ci Cine este cu tine.",
        "Ia seama la vorba din încheiere: v-am rupt legăturile jugului și v-am făcut să umblați cu capul ridicat. Un rob merge cu capul plecat; un fiu merge drept. Dumnezeu nu ne-a scos din Egipt ca să trăim tot cu grumazul îndoit.",
        "Și ține minte că nu este aici o târguială: fă bine și vei fi răsplătit. Aceste făgăduințe s-au dat unei țări și unui popor sub un așezământ anume. Sub Noul Legământ, Domnul nu ne-a făgăduit ploaie la vreme, ci prezența Lui până la sfârșit — și tocmai aceea era și aici partea cea mai bună."
      ),
      words: [
        {
          original: "ונתתי גשמיכם בעתם",
          transliteration: "venatati ghișmeihem beitam",
          language: "ebraica",
          meaning:
            "voi da ploile la vremea lor. Lucruri de fiecare zi."
        },
        {
          original: "ונתתי שלום בארצ",
          transliteration: "venatati șalom baareț",
          language: "ebraica",
          meaning:
            "voi da pace în țară. Somn fără frică."
        },
        {
          original: "והתהלכתי בתוככם",
          transliteration: "vehithalahti betohehem",
          language: "ebraica",
          meaning:
            "voi umbla în mijlocul vostru. Cea mai mare făgăduință din șir."
        },
        {
          original: "ואולך אתכם קוממיות",
          transliteration: "vaoleh etkem komemiut",
          language: "ebraica",
          meaning:
            "v-am făcut să umblați cu capul ridicat, drept."
        }
      ],
      crossRefs: ["Matei 28:20", "2 Corinteni 6:16", "Apocalipsa 21:3", "Romani 8:15", "Ioan 14:23"],
      forYourHeart:
        "Cea mai mare binecuvântare nu este ce primești, ci Cine umblă în mijlocul tău."
    },
    {
      verses: [14, 20],
      heading: "Întâia treaptă: osteneală fără rod",
      teaching: teaching(
        "Dacă nu vor ascultă, va veni spăimântare, boală, semănătură mâncată de vrăjmași și fugă când nu-i fugărește nimeni. Ia aminte la felul mustrării: nu se ia viața, se ia rodul. Semănați și nu culegeți; țarina voastră nu dă rodul.",
        "Și vezi ce înseamnă asta pentru un om: nu lipsește osteneala, lipsește rodul ei. Se muncește și nu se văd roadele; se cere și nu se primește; se aleargă și nu se ajunge. Este cea mai blândă dintre mustrări și cea care se simțe mai târziu.",
        "Ia seama la vorba: vă voi frânge trufia puterii voastre. Nu se ia puterea, se ia trufia din ea. Încrederea în sine este primul lucru pe care Dumnezeu îl scoate din calea unui om, fiindcă sub ea nu încape har.",
        "Și ține minte ce se cade și ce nu se cade citit aici. Nu se poate lua fiecare nereușită din viața unui credincios ca pedeapsă pentru un păcat ascuns; Domnul a spus limpede despre orbul din naștere că nu păcătuise nici el, nici părinții lui. Aici este vorba de un popor sub legământ, mustrat pentru o lepădare știută."
      ),
      words: [
        {
          original: "וזרעתם לריק זרעכם",
          transliteration: "uzratem larik zarhem",
          language: "ebraica",
          meaning:
            "veți semăna în zadar sămânța voastră."
        },
        {
          original: "ושברתי את גאון עזכם",
          transliteration: "veșavarti et gheon uzhem",
          language: "ebraica",
          meaning:
            "voi frânge trufia puterii voastre. Nu puterea, trufia din ea."
        },
        {
          original: "ונסתם ואין רדף אתכם",
          transliteration: "venastem veein rodef etkem",
          language: "ebraica",
          meaning:
            "veți fugi fără să vă alerge nimeni. Frica de dinuntru."
        }
      ],
      crossRefs: ["Ioan 9:2-3", "Hagai 1:6", "Proverbe 16:18", "Iacov 4:6", "Evrei 12:6"],
      forYourHeart:
        "Trufia puterii se frânge întâi, fiindcă sub ea nu încape har."
    },
    {
      verses: [21, 26],
      heading: "Înzecit mai greu: ce se simțe în casă",
      teaching: teaching(
        "Dacă vor umbla tot împotriva Lui, va veni înzecit mai greu: fiare care iau vitele și copiii, sabie, boală în cetăți și o foamete în care zece femei coc într-un singur cuptor și pâinea se dă la cântar. Ia aminte la ce se întâmplă: se mâncă și nu se sătură nimeni.",
        "Și vezi cum se strecă mustrarea până în casă, la pâinea de pe masă. Un popor care nu vrea să asculte când i se vorbește începe să audă prin lucruri care se pipăie. Foamea învață mai mult decât predica, dar costă mai scump.",
        "Ia seama la cuvântul care se întoarce de fiecare dată: dacă umblați împotriva Mea. Nu se pedepsesc aici greșelile din slăbiciune, ci umblarea dinadins împotriva Lui. Dumnezeu deosebește între omul căzut și omul îndrjit.",
        "Și ține minte că înzecit nu înseamnă aici o socoteală exactă; este chipul unei apăsări care crește. Și crește tot în nădejdea unei întoarceri. Dumnezeu nu lovește ca să se răcorească."
      ),
      words: [
        {
          original: "ויספתי עליכם מכה שבע",
          transliteration: "veiasafti aleihem maka șeva",
          language: "ebraica",
          meaning:
            "voi înmulți lovitura de șapte ori. Chipul unei apăsări care crește."
        },
        {
          original: "ואכלתם ולא תשבעו",
          transliteration: "vaahaltem velo tisbau",
          language: "ebraica",
          meaning:
            "veți mânca și nu vă veți sătura."
        },
        {
          original: "במשקל",
          transliteration: "bemișkal",
          language: "ebraica",
          meaning:
            "la cântar. Pâinea se dă cu măsura, semn de foamete grea."
        }
      ],
      crossRefs: ["Amos 4:6-11", "Osea 6:1", "Isaia 55:2", "Hagai 1:9", "Apocalipsa 3:19"],
      forYourHeart:
        "Dumnezeu nu lovește ca să Se răcorească. Lovește în nădejdea unei întoarceri."
    },
    {
      verses: [27, 33],
      heading: "Cetăți pustii și un popor împrăștiat",
      teaching: teaching(
        "Treapta cea mai grea: cetățile ajung pustii, locurile sfinte se pustiesc, jertfele nu se mai primesc, iar poporul se împrăștie printre popoare, cu sabia pe urmele lui. Ia aminte că se spune și lucrul cel mai cumplit: în strmtoare, părinții vor mânca din carnea copiilor lor. Cuvântul acesta s-a împlinit întocmai la împrejmuirea Ierusalimului, și Ieremia l-a plâns.",
        "Și vezi că Dumnezeu nu ascunde spre ce merge lepădarea. Nu i-a lăsat să se mire mai târziu. Le-a spus totul cu sute de ani înainte, ca să nu ajungă acolo.",
        "Ia seama la vorba despre jertfe: nu voi mai mirosi cu plăcere darurile voastre. Se putea aduce jertfă și să nu fie primită. Cel mai greu lucru din capitol nu este foamea, este închinarea care nu mai ajunge nicăieri.",
        "Și ține minte că nici aici nu se spune: vă voi nimici cu totul. Se spune împrăștiere, nu sfârșit. Dumnezeu împrastie și totuși ține socoteala fiecăruia, ca să poată să îi adune iarăși."
      ),
      words: [
        {
          original: "והלכתי עמכם בחמת קרי",
          transliteration: "vehalahti imahem bahamat keri",
          language: "ebraica",
          meaning:
            "voi umbla și Eu împotriva voastră, cu urgie."
        },
        {
          original: "והשמותי את מקדשיכם",
          transliteration: "vahașimoti et mikdeșeihem",
          language: "ebraica",
          meaning:
            "voi pustii locurile voastre sfinte."
        },
        {
          original: "ולא אריח בריח ניחחכם",
          transliteration: "velo ariah bereiah nihohhem",
          language: "ebraica",
          meaning:
            "nu voi mai mirosi cu plăcere darurile voastre."
        },
        {
          original: "ואתכם אזרה בגוים",
          transliteration: "veetkem ezare bagoim",
          language: "ebraica",
          meaning:
            "vă voi împrăștia printre popoare. Împrăștiere, nu sfârșit."
        }
      ],
      crossRefs: ["Plângerile 4:10", "Isaia 1:11-15", "Amos 5:21-22", "2 Împărați 25:8-11", "Ieremia 29:11"],
      forYourHeart:
        "Cel mai greu lucru nu este foamea, ci închinarea care nu mai ajunge nicăieri."
    },
    {
      verses: [34, 39],
      heading: "Țara își ia odihna care nu i s-a dat",
      teaching: teaching(
        "În vremea pustiirii, țara își va lua odihnele pe care nu le-a avut în anii în care poporul a locuit în ea. Ia aminte că se întoarce aici rânduiala din capitolul dinainte: ce nu s-a dat de bunăvoie se ia în alt chip. Dumnezeu își ia odihna la vremea Lui.",
        "Și vezi ce se spune despre cei rămași: le voi da o inimă fricoasă; îi va urmări foaia căzută și vor fugi fără să-i alerge nimeni. Cea mai grea pedeapsă nu vine din afară, ci se cuibărește înuntru. Un om cu inimă speriată nu are odihnă nici în pat.",
        "Ia seama că se spune și pentru ce se pomenește toată această apăsare: pentru fărădelegea lor și a părinților lor. Nu se încarcă nimeni cu vina altuia fără să facă el la fel; Ezechiel a lămurit lucrul limpede. Dar un neam poate moșteni de la părinți drumul, dacă nu se întoarce de pe el.",
        "Și ține minte că aceasta este încă partea întunecată. Cine se oprește de citit aici rămâne cu o închipuire strâmbă despre Dumnezeu. Mai sunt șapte versete."
      ),
      words: [
        {
          original: "אז תרצה הארצ את שבתתיה",
          transliteration: "az tirțe haareț et șabtoteha",
          language: "ebraica",
          meaning:
            "atunci țara își va lua odihnele ei."
        },
        {
          original: "ונתתי להם לב רך",
          transliteration: "venatati lahem lev rah",
          language: "ebraica",
          meaning:
            "le voi da o inimă fricoasă, muiată de teamă."
        },
        {
          original: "קול עלה נדף",
          transliteration: "kol ale nidaf",
          language: "ebraica",
          meaning:
            "sunetul unei foi purtate de vânt. Atât îi va speria."
        }
      ],
      crossRefs: ["2 Cronici 36:20-21", "Ezechiel 18:20", "Proverbe 28:1", "Deuteronomul 28:65-67", "Isaia 26:3"],
      forYourHeart:
        "Cea mai grea apăsare nu vine din afară; se cuibărește în inimă."
    },
    {
      verses: [40, 46],
      heading: "Îmi voi aduce aminte de legământul Meu",
      teaching: teaching(
        "Și acum ia aminte cum se întoarce totul: dacă își vor mărturisi fărădelegea și inima lor netaiată împrejur se va smeri, Îmi voi aduce aminte de legământul cu Iacov, cu Isaac și cu Avraam, și Îmi voi aduce aminte de țară. Nu se cere plată și nu se cere isprăvire; se cere mărturisire.",
        "Și vezi vorba cea mare din versetul 44: chiar și când vor fi în țara vrăjmașilor, nu-i voi lepăda și nu Mă voi scrbi de ei ca să-i nimicesc și să rup legământul Meu cu ei, căci Eu sunt Domnul Dumnezeul lor. Toată negreala celor treizeci de versete dinainte se sparge în cuvântul acesta.",
        "Ia seama unde stă tăria legământului: nu în ținerea lui de către popor, ci în credincioșia Lui. Ei l-au călcat; El nu l-a rupt. De aceea putem sta și noi înaintea Lui: nu fiindcă am ținut, ci fiindcă El nu S-a lepădat.",
        "Și ține minte cum sună lucrul acesta în Noul Legământ: dacă ne mărturisim păcatele, El este credincios și drept ca să ni le ierte. Și Pavel scrie că, dacă suntem necredincioși, El rămâne credincios, căci nu Se poate tăgădui pe Sine. Acesta este capătul capitolului — și nu foametea."
      ),
      words: [
        {
          original: "והתודו את עונם",
          transliteration: "vehitvadu et avonam",
          language: "ebraica",
          meaning:
            "și își vor mărturisi fărădelegea. Singurul lucru cerut."
        },
        {
          original: "ואז יכנע לבבם הערל",
          transliteration: "veaz ikana levavam heharel",
          language: "ebraica",
          meaning:
            "și atunci inima lor netăiată împrejur se va smeri."
        },
        {
          original: "וזכרתי את בריתי",
          transliteration: "vezaharti et beriti",
          language: "ebraica",
          meaning:
            "Și Îmi voi aduce aminte de legământul Meu."
        },
        {
          original: "לא מאסתים ולא געלתים",
          transliteration: "lo meastim velo ghealtim",
          language: "ebraica",
          meaning:
            "nu i-am lepădat și nu M-am scrbit de ei. Vorba cea mare a capitolului."
        }
      ],
      crossRefs: ["1 Ioan 1:9", "2 Timotei 2:13", "Romani 11:1-2", "Neemia 9:31", "Luca 15:20"],
      forYourHeart:
        "Ei l-au călcat; El nu l-a rupt. Acolo stă toată nădejdea noastră."
    }
  ],
  prayer:
    "Doamne, nu vrem alți dumnezei făcuți de mâna noastră; fii Tu Dumnezeul nostru.\n\nDă-ne inimă să ne întoarcem la primul semn, nu la cel din urmă.\n\nFrânge în noi trufia și lasă-ne să umblăm cu capul ridicat ca fii, nu ca robi.\n\nMulțumim că Îți aduci aminte de legământul Tău și că nu Te lepezi de noi. Amin."
})
