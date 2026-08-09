import { judecatoriChapter, teaching } from "./judecatoriHelpers.js"
import { judecatoriStatus } from "./judecatoriPublication.js"

/* Judecători 6 — text Biblia Emanus; explicație originală Emanus după cercetarea textului și a transcrierii Through The Bible. */
export const JUDECATORI_6 = judecatoriChapter({
  number: 6,
  title: "Judecători 6 — Ghedeon: chemat din ascunzătoare, trimis să dărâme altarul",
  summary:
    "Madian pustiește țara, iar Israel se ascunde. Un proroc arată că robia este legată de neascultare. Îngerul DOMNULUI îl cheamă pe Ghedeon, un om temător care treieră în teasc. Înainte de lupta publică, Ghedeon trebuie să dărâme altarul lui Baal din casa tatălui său; apoi Duhul DOMNULUI îl îmbracă și el cere semnul lânii.",
  literaryContext:
    "Capitolele 6–8 alcătuiesc ciclul lui Ghedeon și urmăresc atât ridicarea, cât și declinul lui. Capitolul 6 pune bazele: chemarea, prezența DOMNULUI, curățirea idolatriei din propria casă și slăbiciunea credinței care cere confirmări repetate.",
  historicalContext:
    "Madianiții și aliații lor veneau sezonier cu turmele și cămilele, consumând recolta și lăsând țara fără hrană. Treieratul se făcea de obicei într-un loc deschis și vântos; Ghedeon lucrează într-un teasc, ascuns de prădători. Altarele familiale aveau și rol social, de aceea distrugerea altarului lui Baal implica opoziția întregii comunități.",
  units: [
    {
      verses: [1, 10],
      heading: "Peșteri, recolte pierdute și un proroc care numește cauza",
      teaching: teaching(
        "Israel ajunge să locuiască în ascunzători în propria țară. Madian nu ocupă doar teritoriu, ci distruge rodul muncii, astfel încât poporul trăiește din teamă și lipsă.",
        "Când oamenii strigă, Dumnezeu trimite mai întâi un proroc, nu o armată. Înaintea izbăvirii, adevărul trebuie rostit: DOMNUL îi scosese din Egipt, dar ei nu ascultaseră glasul Lui.",
        "Dumnezeu nu reduce toată suferința la vina victimei; însă în acest caz textul declară legătura legământului dintre idolatria națională și robia care a urmat. A numi păcatul nu anulează mila, ci pregătește întoarcerea.",
      ),
      crossRefs: ["Levitic 26:14-17", "Psalmul 107:10-16", "Ioan 8:31-36"],
      forYourHeart:
        "Când ceri numai schimbarea împrejurărilor, lasă-L pe Dumnezeu să vorbească și despre rădăcina care trebuie schimbată în tine. Adevărul Lui nu vine ca să te zdrobească, ci ca să deschidă drumul libertății.",
    },
    {
      verses: [11, 24],
      heading: "«DOMNUL este cu tine, viteazule»: chemarea care vede ce va face harul",
      teaching: teaching(
        "Ghedeon este găsit ascuns, dar este numit «viteaz». Dumnezeu nu neagă frica prezentă; El vorbește chemarea și viitorul pe care prezența Lui îl poate produce.",
        "Întrebarea lui Ghedeon este cinstită: dacă DOMNUL este cu noi, de ce ni s-au întâmplat toate acestea? Răspunsul nu este o explicație completă a suferinței, ci o însărcinare și o promisiune: «Eu voi fi cu tine».",
        "Ghedeon își vede familia mică și propria poziție neînsemnată. Dumnezeu nu îi spune că evaluarea socială este falsă, ci că prezența Lui este mai hotărâtoare decât evaluarea. Puterea chemării stă în «te trimit Eu» și «voi fi cu tine».",
      ),
      crossRefs: ["Exod 3:11-12", "Isaia 41:10", "2 Corinteni 12:9"],
      forYourHeart:
        "Nu trebuie să te convingi că ești puternic înainte să asculți. Este de ajuns să iei în serios faptul că Cel care te trimite promite să fie cu tine.",
    },
    {
      verses: [25, 32],
      heading: "Prima luptă a lui Ghedeon este în curtea casei sale",
      teaching: teaching(
        "Înainte să înfrunte tabăra madianită, Ghedeon trebuie să dărâme altarul lui Baal și să ridice un altar DOMNULUI. Eliberarea publică începe cu ascultarea privată și cu ruperea idolatriei din locul cel mai apropiat.",
        "Ghedeon ascultă noaptea, pentru că se teme. Textul nu îi laudă frica, dar nici nu disprețuiește ascultarea făcută cu teamă. Curajul poate începe prin a face noaptea ceea ce Dumnezeu a poruncit, până când credința crește.",
        "Ioas răspunde mulțimii că Baal ar trebui să se apere singur dacă este dumnezeu. Un idol care are nevoie de violența oamenilor pentru a fi protejat își dovedește neputința.",
      ),
      crossRefs: ["Deuteronom 12:2-3", "1 Împărați 18:27-29", "Fapte 19:23-27"],
      forYourHeart:
        "Care este altarul din propria curte pe care ai vrea să-l eviți în timp ce visezi la o lucrare mare? Începe cu ascultarea apropiată, chiar dacă încă îți tremură mâinile.",
    },
    {
      verses: [33, 40],
      heading: "Duhul DOMNULUI îl îmbracă pe Ghedeon, iar el cere semnul lânii",
      teaching: teaching(
        "Când vrăjmașii se adună, Duhul DOMNULUI îl îmbracă pe Ghedeon și omul care se ascundea sună din trâmbiță. Imaginea este puternică: Duhul vine peste el ca o haină care îl echipează pentru însărcinare.",
        "Totuși Ghedeon cere semnul lânii de două ori. Dumnezeu Se coboară cu răbdare la slăbiciunea lui, dar episodul nu trebuie transformat într-o metodă obișnuită de a lua decizii prin semne arbitrare. Ghedeon primise deja un cuvânt clar; semnul este concesie pentru frica lui, nu idealul discernământului.",
        "Credința poate coexista pentru o vreme cu tremurul și întrebările. Harul nu îl abandonează pe Ghedeon, dar îl va conduce spre o dependență în care numărul, resursele și semnele nu mai pot primi slava.",
      ),
      words: [
        {
          original: "וְרוּחַ יְהוָה לָבְשָׁה",
          transliteration: "ve-ruah YHWH laveșa",
          language: "ebraica",
          meaning:
            "Duhul DOMNULUI l-a îmbrăcat. Imaginea arată o echipare venită din afara puterii naturale a lui Ghedeon, ca o haină pusă peste el pentru slujire.",
        },
      ],
      crossRefs: ["1 Cronici 12:18", "Luca 24:49", "2 Corinteni 5:7"],
      forYourHeart:
        "Nu construi o viață dependentă de semne repetate când Dumnezeu ți-a vorbit deja prin Cuvânt. Cere-I răbdare pentru slăbiciunea ta și curajul de a merge pe baza prezenței Lui.",
    },
  ],
  prayer:
    "Doamne, scoate-ne din ascunzători și spune adevărul despre idolii care ne țin robi.\n\nÎnvață-ne să ne sprijinim pe «Eu voi fi cu tine», nu pe mărimea noastră.\n\nDă-ne ascultare în propria casă înainte de a căuta o lucrare publică și îmbracă-ne cu Duhul Tău.\n\nAi răbdare cu frica noastră, dar condu-ne dincolo de dependența de semne, spre credință statornică. Amin.",
  status: judecatoriStatus(6),
})
