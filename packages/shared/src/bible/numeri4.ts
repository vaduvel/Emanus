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

export const NUMERI_4 = numeriChapter({
  number: 4,
  title: "Numeri 4 — Cum se poartă lucrurile sfinte prin pustie",
  summary:
    "Capitolul rânduiește cu de-amănuntul cum se împachetează și se poartă fiecare piesa a Cortului atunci când tabăra pornește la drum: Aaron și fiii lui acoperă mai întâi lucrurile preasfinte, apoi vin chehatiții să le poarte fără să le atingă sau să le privească. Urmează slujba gherșoniților și a merariților, apoi numărătoarea propriu-zisă a bărbaților între treizeci și cincizeci de ani din cele trei familii: opt mii cinci sute optzeci în total.",
  literaryContext:
    "Dacă în capitolul al treilea familiile lui Levi fuseseră doar numite și așezate în tabără, capitolul al patrulea coboară la amănuntul concret al slujbei fiecăreia: ce se acoperă, cu ce, în ce ordine, cine poartă ce. Vârsta de numărare se schimbă față de capitolul trei — nu de la o lună, ci de la treizeci la cincizeci de ani — pentru că aici nu se numără apartenența de naștere, ci puterea trupească necesară pentru a purta întreg Cortul prin pustie.",
  historicalContext:
    "Un Cort care trebuia demontat, împachetat și purtat la fiecare popas cerea o organizare militară de precizie, nu doar o înțelegere religioasă. Fiecare piesa avea greutatea, forma și fragilitatea ei; unele cădeau în sarcina unei singure familii, altele în a alteia, după cum erau covoare ușoare, mobilier sfânt sau lemnărie grea. Amenințarea cu moartea pentru cel care atingea sau privea lucrurile preasfinte fără acoperire nu era o exagerare retorică; capitole ulterioare (precum 2 Samuel 6:6-7, cu Uza) arată cât de reală era această primejdie.",
  units: [
    {
      id: "numeri-4-1-4",
      ref: "Numeri 4:1-4",
      heading: "Chehatiții: de la treizeci la cincizeci de ani, pentru lucrurile preasfinte",
      text: numeriPassage(4, 1, 4),
      teaching: teaching(
        "Numărătoarea din acest capitol se deosebește limpede de cea din capitolul trei: acolo se numărau toți bărbații de la o lună în sus, ca semn al apartenenței; aici se numără doar cei între treizeci și cincizeci de ani, vârsta puterii depline a trupului. Slujba de purtare a Cortului cerea putere, nu doar apartenență.",
        "Textul numește limpede sarcina chehatiților: „lucrurile preasfinte”. Din cele trei familii ale lui Levi, tocmai cea mai numeroasă este însărcinată cu ce este mai aproape de sfințenia lui Dumnezeu. Nu este o întâmplare că unitatea următoare va arăta cu câtă grijă trebuiau acoperite aceste lucruri înainte ca ei să le poată atinge.",
      ),
      words: [
        {
          original: "קֹדֶשׁ הַקֳָשִׁים",
          transliteration: "kodeș hakodashim",
          language: "ebraica",
          meaning:
            "lucrurile preasfinte, sfânta sfântelor. Denumește chivotul, masa, sfeșnicul și altarele — lucrurile cele mai apropiate de prezența DOMNULUI, care nu puteau fi văzute sau atinse direct de nimeni în afara preoților.",
        },
      ],
      crossRefs: ["Numeri 3:27-31", "Exod 30:29", "Levitic 21:22"],
      forYourHeart:
        "Puterea pe care o ai într-o vârstă anume nu ți-o dai singur; ea este dată pentru o slujbă anume, la timpul ei.",
    },
    {
      id: "numeri-4-5-14",
      ref: "Numeri 4:5-14",
      heading: "Aaron acoperă mai întâi: chivotul, masa, sfeșnicul, altarele",
      text: numeriPassage(4, 5, 14),
      teaching: teaching(
        "Înainte ca oricine altcineva să se apropie, Aaron și fiii lui trebuie să intre primii și să acopere fiecare lucru sfânt: chivotul, sub perdeaua de despărțire și o învelitoare de piele, apoi masa pâinilor, sfeșnicul, altarul de aur și, la urmă, altarul de arama de la curte. Fiecare are pânza și învelitoarea ei proprie: albastră pentru cele din Lăcaș, purpurie pentru altarul de jertfă.",
        "Ordinea aceasta arată o rânduială strănsă: nimeni nu ajunge la lucrurile sfinte direct. Între lucrul sfânt și cel ce-l poartă stă întotdeauna o acoperire pusă de mâna preotului. Această acoperire nu ascunde sfințenia din dispreț, ci o ocrotește pentru cel care nu ar putea sta înaintea ei direct.",
        "Chiar și grija cea mai mică — curițarea cenușii altarului înainte de a-l acoperi — este scrisă în text. Nimic din ce privește apropierea de sfințenie nu este lăsat la voia întâmplării sau a grăbii.",
      ),
      words: [
        {
          original: "פָּרֹכֶת",
          transliteration: "parohțet",
          language: "ebraica",
          meaning:
            "perdeaua de despărțire dintre Sfânta și Sfânta Sfântelor. Această perdea devine acum și învelitoarea de călătorie a chivotului, semn că despărțirea de sfințenie rămâne păstrată și pe drum, nu doar în popas.",
        },
      ],
      crossRefs: ["Exod 26:31-34", "Exod 25:23-30", "Exod 27:1-8"],
      forYourHeart:
        "Nu tot ce este sfânt trebuie expus privirii tuturor. Uneori grija cea mai mare pentru lucrurile sfinte înseamnă tocmai să le acoperi cu cinste.",
    },
    {
      id: "numeri-4-15-16",
      ref: "Numeri 4:15-16",
      heading: "Să poarte, dar să nu atingă",
      text: numeriPassage(4, 15, 16),
      teaching: teaching(
        "Abia după ce Aaron și fiii lui termină de acoperit tot, chehatiții pot veni să poarte. Textul spune limpede: „să nu se atingă de lucrurile sfinte, ca să nu moară”. Nu este o interdicție fără rost; este granița dintre viață și moarte pentru cei care se apropie prea mult de sfințenia neacoperită.",
        "În aceeași unitate, textul amintește ce stă în grija lui Eleazar: uleiul pentru lumină, tămâia, ofranda perpetuă, uleiul de ungere și supravegherea întregului Cort. Lucrurile de folosință zilnică, spre deosebire de cele preasfinte, rămân în grija directă a unui singur om, cu numele lui rostit anume.",
      ),
      words: [
        {
          original: "וְלֹא־יָמֻתוּ",
          transliteration: "velo-iamutu",
          language: "ebraica",
          meaning:
            "și să nu moară. Formula aceasta apare de mai multe ori în legătură cu chehatiții; sfințenia neacoperită nu este doar interzisă la atingere, ci mortală pentru cel neascultător.",
        },
      ],
      crossRefs: ["2 Samuel 6:6-7", "Numeri 4:20", "Levitic 16:2"],
      forYourHeart:
        "A purta ceva sfânt nu înseamnă a-l stăpâni după plac; înseamnă a-l duce cu teamă și cinste, exact așa cum a fost rânduit.",
    },
    {
      id: "numeri-4-17-20",
      ref: "Numeri 4:17-20",
      heading: "Nici măcar o clipă să nu privească",
      text: numeriPassage(4, 17, 20),
      teaching: teaching(
        "DOMNUL le dă lui Moise și lui Aaron o grijă aparte: „nu lăsați ca seminția familiilor chehatiților să fie nimicită”. Nu este o amenințare rece; este o grijă părintească pentru un popor întreg de oameni puși să slujească chiar lângă ce este mai primejdios de apropiat.",
        "Soluția nu este depărtarea chehatiților de slujbă, ci rânduirea preoțească așezată între ei și lucrurile sfinte: „Aaron și fiii lui să intre și să-i rânduiască”. Și totuși, chiar și așa, rămâne limita ultimă: „să nu intre să privească lucrurile sfinte nici măcar o clipă”. Nu doar atingerea, ci și privirea neautorizată este oprită.",
        "Ia aminte că grija aceasta nu vine dintr-o răceală legalistă, ci din dorința lui Dumnezeu ca poporul Său să trăiască: „faceți așa pentru ei, ca să trăiască și să nu moară”. Rânduiala nu este împotriva omului; este pentru viața lui.",
      ),
      words: [
        {
          original: "כְבַלַּעַ",
          transliteration: "kevala",
          language: "ebraica",
          meaning:
            "nici măcar pentru o clipă, în timp ce se înghite. Expresia arată cât de scurtă poate fi o privire neautorizată și totuși cât de gravă înaintea sfințeniei lui Dumnezeu.",
        },
      ],
      crossRefs: ["Exod 33:20", "1 Samuel 6:19", "Numeri 18:3"],
      forYourHeart:
        "Rânduielile lui Dumnezeu nu sunt puse ca să-ți îngrădească viața, ci ca să o păstreze. Privește-le ca pe o grijă, nu ca pe o povară.",
    },
    {
      id: "numeri-4-21-28",
      ref: "Numeri 4:21-28",
      heading: "Gherșoniții: covoarele și învelitorile, sub Itamar",
      text: numeriPassage(4, 21, 28),
      teaching: teaching(
        "Aceeași vârstă de numărare — treizeci până la cincizeci de ani — se aplică și familiilor gherșoniților, cu o slujbă diferită de a chehatiților: nu lucrurile preasfinte, ci covoarele Cortului, învelitorile lui, perdelele și pânzele curții.",
        "Un amănunt nou apare aici: „toată slujba fiilor gherșoniților va fi sub porunca lui Aaron și a fiilor lui”, iar însărcinarea lor concretă este pusă „sub supravegherea lui Itamar, fiul preotului Aaron”. Fiecare familie de leviți are un supraveghetor numit: Eleazar peste chehatiți, Itamar peste gherșoniți și merariți. Râspunderea nu rămâne difuză; are un nume la fiecare capăt.",
      ),
      words: [
        {
          original: "מַשָׂא",
          transliteration: "masa",
          language: "ebraica",
          meaning:
            "sarcină, povară de purtat. Cuvântul denumește atât greutatea fizică a covoarelor purtate de gherșoniți, cât și însăși răspunderea slujbei încredințate.",
        },
      ],
      crossRefs: ["Numeri 3:21-26", "Exod 26:1-14", "1 Cronici 6:39-43"],
      forYourHeart:
        "Fiecare slujbă, mare sau mică, are nevoie de o răspundere numită. Cine te supraveghează în slujba pe care o porți, și pe cine supraveghezi tu?",
    },
    {
      id: "numeri-4-29-33",
      ref: "Numeri 4:29-33",
      heading: "Merariții: scândurile și stâlpii, numiți pe nume",
      text: numeriPassage(4, 29, 33),
      teaching: teaching(
        "Familia lui Merari primește aceeași vârstă de numărare și sarcina cea mai grea din punct de vedere fizic: scândurile Cortului, drugii, stâlpii, picioarele, atât ale Lăcașului cât și ale curții dimprejur.",
        "Un amănunt neobișnuit încheie unitatea: „veți rândui pe nume uneltele pe care le au de purtat”. Nu doar oamenii sunt numiți pe nume în capitolele acestea, ci și lucrurile pe care le poartă. Fiecare scândură, fiecare stâlp avea locul lui știut, iar cel care o purta știa exact ce anume duce.",
      ),
      words: [
        {
          original: "בְשֵׁמות",
          transliteration: "beșemot",
          language: "ebraica",
          meaning:
            "pe nume. Chiar și uneltele de purtat, nu doar oamenii, erau rânduite pe nume — semn al grijii amănunțite pentru fiecare parte a Cortului, oricât de simplă.",
        },
      ],
      crossRefs: ["Numeri 3:33-37", "Exod 26:15-30", "Exod 27:9-19"],
      forYourHeart:
        "Dumnezeu nu privește lucrarea ta în genere; o vede amănunțit, pe nume, exact așa cum era fiecare scândură numită în grija cui trebuia s-o poarte.",
    },
    {
      id: "numeri-4-34-45",
      ref: "Numeri 4:34-45",
      heading: "Numărătoarea reală: 2750, 2630, 3200",
      text: numeriPassage(4, 34, 45),
      teaching: teaching(
        "După ce fiecare slujbă a fost descrisă în amănunt, vine și numărătoarea reală, făcută de Moise, Aaron și căpeteniile adunării împreună: chehatiții — două mii șapte sute cincizeci; gherșoniții — două mii șase sute treizeci; merariții — trei mii două sute.",
        "Observă că familia chehatiților, cea mai numeroasă la numărătoarea de la o lună în sus din capitolul trei (opt mii șase sute), rămâne acum cea mai puțin numeroasă dintre cele trei la vârsta de treizeci până la cincizeci de ani (două mii șapte sute cincizeci), iar merariții, cei mai puțin numeroși acolo, sunt acum cei mai numeroși. Vârsta și puterea nu urmează același tipar ca mărimea generală a unei familii.",
        "De trei ori se repetă aceeași formulă de încheiere pentru fiecare familie: numărătorile s-au făcut „după porunca DOMNULUI dată prin Moise”. Ascultarea nu se declară o singură dată pentru întregul capitol, ci se confirmă la fiecare pas în parte.",
      ),
      words: [],
      crossRefs: ["Numeri 3:14-39", "Numeri 26:57-62"],
      forYourHeart:
        "Rolul tău în lucrarea lui Dumnezeu nu se măsoară după cât de mare este familia sau grupul din care faci parte, ci după chemarea concretă pe care o porți.",
    },
    {
      id: "numeri-4-46-49",
      ref: "Numeri 4:46-49",
      heading: "Opt mii cinci sute optzeci, fiecare la slujba lui",
      text: numeriPassage(4, 46, 49),
      teaching: teaching(
        "Capitolul se încheie cu totalul general al celor numărați între treizeci și cincizeci de ani, din toate cele trei familii ale lui Levi: opt mii cinci sute optzeci de bărbați, toți „la slujire și la purtarea sarcinilor în Cortul Întâlnirii”.",
        "Ultima propoziție a capitolului este și cea mai importantă: „au fost numărați fiecare la slujba lui și la sarcina lui”. Numărul mare nu înseamnă o masă uniformă de oameni; înseamnă opt mii cinci sute optzeci de slăjitori, fiecare cu o slujbă anume, cu un loc anume, cu o răspundere anume.",
        "Când tabăra pornea la drum, nu se mișca o mulțime dezorganizată, ci un întreg trup rânduit, în care fiecare mădular știa exact ce poartă, cum poartă și cui răspunde. Capitolul acesta, atât de plin de amănunte, este de fapt o pildă despre cum arată o slujire ordonată în jurul sfințeniei lui Dumnezeu.",
      ),
      words: [
        {
          original: "אִישׁ עַל־פִּי עֲבֹדָתֵּוֹ וְעַל־מַשָּׂאוֹ",
          transliteration: "iș al-pi avodato veal-masao",
          language: "ebraica",
          meaning:
            "fiecare la slujba lui și la sarcina lui. Formula de încheiere arată că numărul total al leviților nu șterge identitatea slujbei fiecăruia în parte.",
        },
      ],
      crossRefs: ["1 Corinteni 12:4-7", "Numeri 1:54", "Numeri 2:34"],
      forYourHeart:
        "Trupul lui Dumnezeu se mișcă împreună, dar niciodată anonim: fiecare este chemat la slujba lui și la sarcina lui.",
    },
  ],
  prayer:
    "Doamne, Tu ai rânduit cu grijă fiecare pas al purtării lucrurilor sfinte prin pustie; învață-ne să nu ne apropiem de sfințenia Ta cu ușurință sau fără cinste.\n\nDă-ne să primim rânduielile Tale ca pe o grijă pentru viața noastră, nu ca pe o povară nedorită.\n\nÎnvață-ne să ne purtăm slujba, oricât de mică sau de grea ar fi, cu aceeași credincioșie cu care merariții purtau scândurile și chehatiții chivotul acoperit.\n\nȘi ține-ne aminte că fiecare dintre noi este chemat la slujba lui și la sarcina lui, în trupul pe care Tu Îl zidești. Amin.",
  status: NUMERI_STATUSES[4],
})
