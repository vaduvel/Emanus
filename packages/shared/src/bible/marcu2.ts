import { marcuChapter, teaching } from "./marcuHelpers.js"

/*
 * Evanghelia după Marcu, explicată pe unități de sens.
 *
 * Textul biblic: Cornilescu, editia corectata (RCCV), păstrat separat în marcuText.ts.
 * Explicația: scrisă pentru Emanus după cercetarea textului și a surselor
 * declarate în docs/41-plan-scriere-marcu.md. Nu se copiază formularea
 * niciunui predicator sau comentator.
 */

export const MARCU_2 = marcuChapter({
  number: 2,
  title: "Marcu 2 — Iertarea, chemarea și vinul cel nou",
  summary:
    "Capitolul al doilea aduce primele întâlniri ale Domnului cu împotrivirea: iertarea păcatelor slăbănogului coborât prin acoperiș, chemarea lui Levi de la vamă și masa cu vameșii, întrebarea despre post și spicele smulse în Sabat. Pretutindeni se arată același adevăr: neamul cel vechi nu se peticuiește, căci a venit Fiul omului, care are putere să ierte, să cheme și să stăpânească peste Sabat.",
  literaryContext:
    "Capitolul întâi a arătat puterea lui Isus în fapte; capitolul al doilea o arată în cuvinte și în dezbateri. Marcu așază la rând patru întâlniri cu învățătorii neamului vechi — cărturarii și fariseii — și de fiecare dată Isus nu lămurește o regulă, ci întoarce întrebarea la om și la autoritatea Lui. Dialogul se împletește cu pilda: «vinul nou în burdufuri noi». Tot aici apare pentru întâia dată numele «Fiul omului», pe care Domnul și-l va purta până la sfârșitul Evangheliei.",
  historicalContext:
    "Casa în care Se afla Isus era, după toată probabilitatea, casa lui Petru, la Capernaum; acoperișurile se făceau din grinzi, stuf și țigle, și de aceea au putut fi desfăcute. Levi era vameș: cumpăra dreptul de a strânge birurile pentru stăpânirea romană și era socotit de iudei trădător și păcătos. Legea îngăduia celui care trecea prin lan să smulgă spice (Deuteronom 23:25); fariseii însă adunaseră peste porunca Sabatului o mulțime de reguli de purtare, printre care culesul spicelor era numărat ca lucru oprit.",
  units: [
    {
      verses: [1, 12],
      heading: "Păcatele îți sunt iertate",
      teaching: teaching(
        "Isus Se întoarce la Capernaum, și casa Se umple. Patru oameni aduc un slăbănog, nu pot intra prin norod, desfac acoperișul și îl coboară în fața Lui. Marcu spune: «Când le-a văzut Isus credința». Credința se vede — nu din vorbe, ci din stăruință. Cei patru nu s-au oprit la ușa închisă, și Domnul privește la toată osteneala lor. Așa vine la El și azi omul care se roagă pentru altul: Dumnezeu vede ce stăruie, nu ce se arată.",
        "Și primul cuvânt al Domnului nu este despre trup, ci despre păcat: «Fiule, păcatele îți sunt iertate!» Nevoia cea mai adâncă a slăbănogului nu erau picioarele, ci vina. Cărturarii gândesc drept într-o privință: nimeni nu iartă păcatele decât Dumnezeu. Dar Isus le cunoaște gândul și nu se apără cu o teorie: «ca să știți că Fiul omului are putere pe pământ să ierte păcatele». Puterea de a ierta și puterea de a vindeca țin de aceeași autoritate — și tocmai aceasta este vestea bună.",
        "Apoi slăbănogul se scoală, își ia patul și iese afară în fața tuturor; toți rămân uimiți și slăvesc pe Dumnezeu. Dar povestirea aceasta nu este o făgăduință că oricine crede va fi vindecat în trup: vindecarea stă în voia Domnului, și cine suferă poate chema și doctorul, punând totul în mâna Tatălui. Făgăduită tuturor celor ce vin la El este însă iertarea — același cuvânt pe care l-a primit slăbănogul: «Păcatele îți sunt iertate».",
      ),
      words: [
        {
          original: "ἀφίημι",
          transliteration: "aphiemi",
          language: "greaca",
          meaning:
            "dau drumul, las să plece. Iertarea nu înseamnă că păcatul a fost trecut cu vederea, ci că Dumnezeu îl trimite departe și nu mai ține seama de el.",
        },
      ],
      crossRefs: ["Matei 9:1-8", "Luca 5:17-26", "Isaia 43:25"],
      forYourHeart:
        "Slăbănogul a fost iertat înainte de a se scula. Așa e și cu tine: Dumnezeu nu-ți cere să fii curat ca să vii — vino așa cum ești, și întâlnește-te întâi cu iertarea Lui.",
    },
    {
      verses: [13, 17],
      heading: "Chemarea lui Levi",
      teaching: teaching(
        "Isus trece pe la mare și vede la vamă pe Levi, fiul lui Alfeu. Vameșii erau disprețuiți de popor: strângeau birurile pentru stăpânirea romană și, de multe ori, mai puneau și pentru ei. Și totuși Isus Se oprește tocmai acolo și îi spune: «Vino după Mine!» Levi se scoală și merge după El — îndată, ca pescarii de la mare. Vama îi era bună, dar ascultarea a fost mai grabnică decât orice socoteală.",
        "Levi își face o masă și cheamă alți vameși și păcătoși, ca să stea cu Isus. Cărturarii și fariseii întreabă uimiți: «De ce mănâncă El și bea cu vameșii și cu păcătoșii?» Pentru ei, sfințenia însemna să te ferești de oamenii păcătoși. Isus învață altfel: curăția nu se pierde din apropierea celor căzuți, căci lumina nu se întinează când luminează întunericul. Dar întrebarea se întoarce și spre noi: cine se apropie de cine? Dacă mergem la păcătoși ca să-i ridicăm, urmăm pilda Domnului; dacă ei ne coboară pe noi, n-am înțeles încă chemarea.",
        "Apoi vine cuvântul care lămurește totul: «Nu cei sănătoși au trebuință de doctor, ci cei bolnavi. Eu am venit să chem la pocăință nu pe cei neprihăniți, ci pe cei păcătoși.» Boala cea mai grea nu este cea care se vede, ci cea pe care omul nu vrea să o recunoască: cine se crede sănătos nu cere doctorul. De aceea vestea bună este pentru cei care își știu starea — la masa lui Isus mai este loc pentru păcătoși.",
      ),
      words: [
        {
          original: "τελώνης",
          transliteration: "telones",
          language: "greaca",
          meaning:
            "vameș, strângător de biruri. Era omul care culegea impozitele pentru stăpânirea romană și era privit de iudei ca trădător și păcătos.",
        },
      ],
      crossRefs: ["Matei 9:9-13", "Luca 5:27-32", "Luca 15:1-2"],
      forYourHeart:
        "Dacă îți simți păcatul și te temi că ai fi prea departe pentru El, nu ai înțeles încă de ce a venit: doctorul este tocmai pentru cei bolnavi. Privește cine stă la masa Lui și ia-ți loc.",
    },
    {
      verses: [18, 22],
      heading: "Vinul nou în burdufuri noi",
      teaching: teaching(
        "Ucenicii lui Ioan și ai fariseilor postesc, și îl întreabă pe Isus de ce ucenicii Lui nu postesc. Răspunsul Îl aduce pe Mire în mijloc: «Oare pot posti nuntașii câtă vreme este mirele cu ei?» Cu Isus de față, ucenicii au ceva mai bun decât o zi de post: pe Mirele însuși. Domnul nu desființează postul, ci îi arată locul: «Vor veni zile când va fi luat mirele de la ei, și atunci vor posti în ziua aceea». După înălțare, Biserica a postit, căutând pe Dumnezeu din toată inima; formele și vremurile postului le înțeleg și azi creștinii în moduri diferite, dar temeiul rămâne: postul nu este o regulă care arată cine e mai evlavios, ci o căutare a lui Dumnezeu.",
        "Apoi Isus grăiește două pilde. Un petic de postav nou nu se coase la o haină veche, căci rupe și mai rău. Vinul cel nou nu se pune în burdufuri vechi, căci le sparge. Învățătura este una singură: ceea ce aduce Isus nu este o dreptare a vechiului, ci ceva cu totul nou, care cere neam nou. Cine vrea să lipească viața Lui peste felul lui de a trăi, fără să se schimbe, strică și una, și alta.",
        "Vinul cel nou este viața Domnului Isus, dăruită prin Duhul Sfânt — și ea nu încape în vasele vechi, înțepenite de obiceiuri: «vinul nou este pus în burdufuri noi». Credința nu se trăiește ca o îmbunătățire a vieții de dinainte, ci ca o viață nouă, care se primește întreagă și se poartă în vase noi: inimă schimbată, ascultare nouă, căutare nouă.",
      ),
      crossRefs: ["Matei 9:14-17", "Luca 5:33-39", "Ioan 3:29", "Fapte 13:2-3"],
      forYourHeart:
        "Nu căuta să peticuiești viața veche cu credința nouă. Lasă-l pe Domnul să-ți dea și viața, și vasul — și nu te teme să fii om nou, căci așa te-a chemat El.",
    },
    {
      verses: [23, 28],
      heading: "Domn și al Sabatului",
      teaching: teaching(
        "Într-o zi de Sabat, Isus trece prin lanurile de grâu, iar ucenicii, flămânzi, smulg spice și le mănâncă. Legea îngăduia să smulgi spice din lanul vecinului (Deuteronom 23:25); fariseii însă număraseră culesul printre lucrările oprite în Sabat. Întrebarea lor — «Vezi, de ce fac ei ce nu este îngăduit să facă în ziua Sabatului?» — se uită la regulă și uită de om. Este primejdia veche și a noastră: să măsurăm sfințenia altora după litera poruncii, fără să cercetăm inima din spatele ei.",
        "Isus răspunde cu Scriptura: David, flămând, a intrat în casa lui Dumnezeu și a mâncat pâinile pentru punerea înaintea Domnului, care erau numai pentru preoți, și Dumnezeu nu l-a osândit. Poruncile Lui nu au fost date ca să sugrume viața omului, ci ca s-o înalțe; nevoia cea omenească nu desființează Legea, dar lămurește duhul ei.",
        "Și atunci vin cuvintele de încheiere: «Sabatul a fost făcut pentru om, iar nu omul pentru Sabat; așa că Fiul omului este Domn chiar și al Sabatului». Porunca de odihnă este un dar al lui Dumnezeu pentru om, nu o datorie care îl înrobește. Cum se ține azi ziua de odihnă, creștinii o înțeleg în moduri diferite, iar Emanus nu decide pentru tine; vorbește cu biserica ta locală. Dar ceea ce stă temeinic este Cine: Fiul omului este Domn peste Sabat, El dă odihna, și la El se măsoară totul.",
      ),
      crossRefs: ["1 Samuel 21:1-6", "Levitic 24:5-9", "Deuteronom 23:25", "Matei 12:1-8"],
      forYourHeart:
        "Când porunca începe să te sugrume, nu porunca s-a stricat — ai rătăcit omul din ea. Domnul Sabatului este și Domnul zilelor tale: vino la El cu încărcătura, nu cu regula.",
    },
  ],
  prayer:
    "Doamne Isuse, Fiul omului, Îți mulțumim că ai venit să chemi nu pe cei neprihăniți, ci pe cei păcătoși, și că ne-ai chemat de la vamă sau de la mreje la masa Ta. Dă-ne credința care stăruie, ca a celor patru de la acoperiș, și întoarce-ne de la păcat, căci Tu ești Cel care ierți. Ferește-ne de fariseismul care se uită la regulă și uită de om, și umple-ne cu vinul cel nou al Duhului Tău, ca să nu mai peticuim viața veche. Tu ești Domnul Sabatului și Domnul zilelor noastre: odihnește-ne în Tine, acum și în veac. Amin.",
})
