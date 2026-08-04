import { exodChapter, teaching } from "./exodHelpers.js"

/*
 * Cartea Exod, explicată pe unități de sens.
 *
 * Textul biblic: păstrat separat în exodText.ts (fișierele exodTextN.ts).
 * Explicația: scrisă pentru Emanus după cercetarea textului. Nu se copiază
 * formularea niciunui predicator sau comentator.
 */

export const EXOD_10 = exodChapter({
  number: 10,
  title: "Exod 10 — Lăcustele, întunericul și târguiala dusă până la capăt",
  summary:
    "Grupa a treia de urăciuni începe, și cu ea se apropie sfârșitul. Lăcustele mănâncă tot ce lăsase grindina; întunericul de trei zile acoperă Egiptul, dar în casele poporului lui Dumnezeu este lumină. Între cele două lovituri, Faraon se târguiește de două ori: întâi vrea să plece numai bărbații, apoi primește să plece toți, dar fără vite. Moise nu se învoiește la nimic. Capitolul se încheie cu împăratul care îl alungă: să nu-i mai vadă fața — iar Moise îl ia în cuvânt și pleacă pentru totdeauna.",
  literaryContext:
    "Capitolul deschide grupa a treia (lăcustele, întunericul, iar apoi moartea întâilor născuți), și începe altfel decât celelalte: nu cu porunca de a merge la Faraon, ci cu o lămurire pentru poporul lui Dumnezeu — pentru ca aceste lucruri să fie povestite copiilor și nepoților. Ia aminte că aici se rostogolește pentru întâia oară țelul depărtat al întregii lupte: nu doar scăparea unei generații, ci o povestire care se va spune mai departe. Cele două urăciuni sunt legate de două târguieli, tot mai largi și tot mai viclene, iar la mijloc stă vorba slujitorilor împăratului: omul acesta ne este o cursă. Și întunericul nu vine întâmplător la capăt: lovește în cel mai mare dumnezeu al Egiptului și pregătește noaptea Paștelui, care va veni în capitolul al doisprezecelea.",
  historicalContext:
    "Roiurile de lăcuste erau cunoscute în tot Răsăritul și erau socotite cea mai temută nenorocire pentru semănături: un roi mare lasă pământul gol într-o zi. Vestirea vine tocmai după grindină, când grâul și alacul începeau să crească — adică lovește în singura nădejde rămasă. Vestul și estul din povestire se potrivesc cu ce se știe despre vânturile locului: vântul de la răsărit aduce roiurile dinspre pustie, iar cel de la apus le împingând în mare. Soarele era închinat în Egipt ca cel mai însemnat dintre dumnezei, iar împăratul însuși era socotit fiul lui: trei zile de întuneric înseamnă că dumnezeul cel mai mare al țării și însuși temeiul împărăției au fost închiși în față. Iar cererea împăratului de a lăsa vitele nu era o vorbă goală: fără vite un popor de păstori nu poate nici să plece departe, nici să aducă jertfe, nici să trăiască în pustie — ar fi trebuit să se întoarcă.",
  units: [
    {
      verses: [1, 6],
      heading: "„Ca să povestești copiilor tăi”",
      teaching: teaching(
        "Întâi o vorbă către Moise, nu către împărat: toate acestea se fac și pentru ca să fie povestite copiilor și nepoților. Ia aminte ce fel de țel are Dumnezeu în lucrarea Lui: nu numai să scape un popor din robie, ci să lase o povestire care se spune mai departe. Ceea ce treci tu astăzi nu este numai al tău; este și mărturia pe care o vor auzi cei de după tine.",
        "De aici învățăm un lucru foarte așezat pentru o casă: credința nu se moștenește de la sine, se povestește. Dumnezeu nu a lăsat copiilor un obicei, ci niște întâmplări anume, cu nume și cu ceasuri. Iar părinții care nu spun nimic lasă în urmă copii care nu știu ce a făcut Dumnezeu în casa lor.",
        "Și vezi cum se vestesc lăcustele: vor mânca și ce a rămas de la grindină. Ce nu s-a predat la mila lui Dumnezeu se pierde mai târziu oricum. Faraon a păstrat o recoltă în pământ și o inimă împietrită; le va pierde pe amândouă.",
      ),
      words: [
        {
          original: "ולמען תספר",
          transliteration: "ulemaan tesaper",
          language: "ebraica",
          meaning:
            "pentru ca să povestești. Un țel al lucrării lui Dumnezeu este povestirea ei mai departe, către copii și nepoți.",
        },
        {
          original: "התעללתי",
          transliteration: "hitalalti",
          language: "ebraica",
          meaning:
            "M-am purtat cu putere față de egipteni, i-am dat pe față. Puterea socotită de netrecut a Egiptului se arată neputincioasă.",
        },
      ],
      crossRefs: ["Deuteronom 6:6-7", "Psalmi 78:4-7", "Exod 12:26-27", "Exod 13:8", "Iosua 4:6-7"],
      forYourHeart:
        "Ce treci tu acum nu este numai al tău: este și povestirea pe care o vor auzi copiii tăi. Le-ai spus vreodată ce a făcut Dumnezeu în casa voastră?",
    },
    {
      verses: [7, 11],
      heading: "„Numai bărbații” — târguiala care rupe casa",
      teaching: teaching(
        "Slujitorii împăratului văd limpede ce nu vede stăpânul lor: omul acesta ne este o cursă, țara este prăpădită. Se întâmplă uneori că oamenii din jur înțeleg înaintea celui împietrit ce se petrece cu el; împietrirea îl lasă pe om cel din urmă care află ce se întâmplă în propria lui viață.",
        "Faraon îi chemă înapoi și întreabă: cine anume are să plece? Iar Moise răspunde fără să lase nimic afară: toți, cu copii și cu bătrâni, cu oi și cu boi. Ia aminte că el nu se târguiește niciodată. Cine vorbește în numele lui Dumnezeu nu are voie să facă preț din porunca Lui, oricât de mult s-ar câștiga la început.",
        "Și vine oferta: duceți-vă numai bărbații. În ochii lumii pare o învoială cinstită — la urma urmei, închinarea o fac bărbații, nu? Dar aici este cea mai vicleana lovitură a vrăjmașului: dacă copiii rămân în Egipt, tatăl se întoarce. Cine își lasă casa în robie nu a ieșit din robie. Ia seama la lucrul acesta în zilele noastre: se găsește om care merge singur la biserică și își lasă copiii în lume; și tot se întoarce după ei.",
        "Iar împăratul ghicește bine ce urăște: căutați un lucru rău, zice, și îi alungă dinaintea lui. Nu se luptă cu Dumnezeu în general; se luptă cu copiii. Așa a fost de la începutul cărții, cu pruncii aruncați în râu, și așa este și acum.",
      ),
      words: [
        {
          original: "מוקש",
          transliteration: "mokeș",
          language: "ebraica",
          meaning:
            "cursă, laț de prins vietatea. Așa îl numesc slujitorii pe Moise — văd primejdia înaintea împăratului lor.",
        },
        {
          original: "בנערינו ובזקנינו",
          transliteration: "binearenu uvizkenenu",
          language: "ebraica",
          meaning:
            "cu tinerii noștri și cu bătrânii noștri. Răspunsul lui Moise nu lasă pe nimeni afară: ieșirea este a întregii case.",
        },
      ],
      crossRefs: ["Exod 1:22", "Exod 8:25-28", "Exod 10:24", "Iosua 24:15", "Efeseni 6:4"],
      forYourHeart:
        "„Duceți-vă numai bărbații” — dacă îți lași copiii în Egipt, te întorci după ei. Pe cine din casa ta ai lăsat în urmă când ai pornit spre Dumnezeu?",
    },
    {
      verses: [12, 20],
      heading: "Lăcustele mănâncă ce a mai rămas",
      teaching: teaching(
        "Urăciunea vine prin vânt — prin ceva care nu se poate opri, nu se poate cumpăra și nu se poate închide pe din afară. Un vânt de la răsărit aduce roiul, un vânt de la apus îl duce în mare. Dumnezeu ține în mână și venirea și plecarea necazului: aceleași vânturi ascultă de El.",
        "Și se spune că nu mai fusese și nu va mai fi așa. Țara rămâne goală: verdele s-a stins cu totul. Cine socotea că după grindină a scăpat cu o recoltă vede acum că nu i-a rămas nimic. Nu se cade să îți întemeiezi liniștea pe ce a mai rămas, când pricina necazului nu a fost înlăturată.",
        "Iar Faraon se grăbește acum: cheamă în grabă și mărturisește mai mult decât oricând — am păcătuit împotriva Domnului Dumnezeului vostru și împotriva voastră. Ia aminte însă la ce cere: iertați-mi păcatul numai de data aceasta și luați de la mine moartea aceasta. Nu vrea ieșirea din păcat, vrea ieșirea din pedeapsă. Și încă ceva: cere iertare de la oameni, nu de la Dumnezeu. Cine se împacă numai cu omul și ocolește pe Dumnezeu nu s-a împacat cu nimeni.",
        "Moise se roagă și iarăși lucrul se face întreg: n-a mai rămas o lăcustă. Dumnezeu Își ține cuvântul până la capăt chiar față de un om care nu și-l va ține deloc. Bunătatea Lui nu se măsoară după vrednicia noastră; și tocmai de aceea judecă drept la urmă.",
      ),
      words: [
        {
          original: "רוח קדים",
          transliteration: "ruah kadim",
          language: "ebraica",
          meaning:
            "vânt de la răsărit. Același vânt care va desface marea mai târziu: vânturile ascultă de Dumnezeu, la venire și la plecare.",
        },
        {
          original: "שא נא חטאתי",
          transliteration: "sa na hatati",
          language: "ebraica",
          meaning:
            "iartă-mi, te rog, păcatul. Îi cere lui Moise, nu lui Dumnezeu, și numai ca să fie luată pedeapsa — nu ca să fie schimbată inima.",
        },
      ],
      crossRefs: ["Exod 9:27", "Exod 14:21", "Ioel 1:4", "Ioel 2:25", "Psalmi 51:4", "Luca 15:18"],
      forYourHeart:
        "Faraon a cerut iertare de la oameni și scăpare de pedeapsă, dar nu pe Dumnezeu. Tu ce ceri când te doare: să-ți treacă, sau să fii schimbat?",
    },
    {
      verses: [21, 29],
      heading: "Întuneric care se pipăie, și lumină în casele lor",
      teaching: teaching(
        "Urăciunea a noua vine fără vestire și lovește în cel mai mare dumnezeu al Egiptului: soarele. Împăratul însuși era socotit fiul soarelui — iar acum țara lui stă trei zile în întuneric des, care se pipăie. Dumnezeu nu Se ceartă cu idolii; îi stinge.",
        "Și vezi ce fac oamenii: nimeni nu s-a mișcat din locul lui trei zile. Întunericul acesta nu era numai lipsă de lumină, era o închidere: fiecare închis în casa lui, singur, fără să vadă pe fratele lui. Așa lucrează și întunericul dinlăuntru: te oprește pe loc și te desparte de ai tăi.",
        "Iar în casele poporului lui Dumnezeu era lumină. Nu se spune că aveau candele mai bune. Stăteau în aceeași țară, sub același cer stins, și totuși aveau lumină. Cine este al Lui poate avea lumină în casă când țara întreagă stă în întuneric.",
        "Urmează târguiala din urmă, cea mai apropiată de „da”: duceți-vă toți, cu copii, numai vitele să rămână. Adică: plecați, dar lăsați aici cu ce să trăiți și cu ce să aduceți jertfă. Vrăjmașul, când nu-ți mai poate opri casa, îți cere avutul — ca să fii silit să te întorci. Iar răspunsul lui Moise nu lasă nicio unghie: nu vom ști cu ce avem să slujim Domnului până vom ajunge acolo. Ia aminte și la asta: nu știm dinainte tot ce ne va cere Dumnezeu; de aceea nu putem lăsa nimic în urmă.",
        "Și se rupe: să nu-mi mai vezi fața, zice împăratul; în ziua când o vei vedea, vei muri. Iar Moise îl ia în cuvânt: bine, nu o voi mai vedea. Vine un ceas când stăruința în împotrivire își primește răspunsul, și vorbitul se încheie. Răbdarea lui Dumnezeu este lungă, dar are un capăt; iar după capătul acesta urmează noaptea Paștelui.",
      ),
      words: [
        {
          original: "חשך אפלה",
          transliteration: "hoșeh afela",
          language: "ebraica",
          meaning:
            "întuneric des, gros. Vorbirea ebraică îngrămădește două cuvinte ca să spună un întuneric care se pipăie.",
        },
        {
          original: "היה אור במושבתם",
          transliteration: "haia or bemoșvotam",
          language: "ebraica",
          meaning:
            "era lumină în locuințele lor. Aceeași țară, același cer stins — și totuși lumină în casele celor ai Lui.",
        },
      ],
      crossRefs: ["Exod 8:22", "Exod 12:12", "Isaia 60:2", "Ioan 1:5", "Ioan 8:12", "Evrei 11:27"],
      forYourHeart:
        "În aceeași țară, sub același cer stins, în casele lor era lumină. Nu ai nevoie de altă țară ca să ai lumină în casă — ai nevoie să fii al Lui.",
    },
  ],
  prayer:
    "Doamne, Tu ai vrut ca lucrările Tale să fie povestite copiilor și nepoților. Dă-ne gură să le spunem și viață care să le întărească.\n\nNu ne lăsa să ieșim pe jumătate: nici fără copiii noștri, nici fără ce ne-ai dat să-ți aducem.\n\nPăzește-ne de rugăciunea care cere doar să fie luată pedeapsa și ocolește fața Ta.\n\nIar când țara întreagă stă în întuneric, fă să fie lumină în casele noastre, nu pentru că suntem mai buni, ci pentru că suntem ai Tăi. Amin.",
})
