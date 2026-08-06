import { judecatoriChapter, teaching } from "./judecatoriHelpers.js"
import { judecatoriStatus } from "./judecatoriPublication.js"

/*
 * Judecători 1, explicat pe unități de sens.
 *
 * Textul biblic vine din Biblia Emanus. Explicația este redactată original
 * pentru Emanus după cercetarea textului și a transcrierii Through The Bible.
 */
export const JUDECATORI_1 = judecatoriChapter({
  number: 1,
  title: "Judecători 1 — Biruințe începute și ascultare neterminată",
  summary:
    "După moartea lui Iosua, semințiile continuă cucerirea țării, dar capitolul se schimbă treptat dintr-o istorie a biruinței într-o listă a compromisului. Iuda înaintează, Caleb și Otniel rămân exemple de credincioșie, însă celelalte seminții nu îi izgonesc pe locuitorii țării. Ceea ce este tolerat astăzi va deveni robie în capitolele următoare.",
  literaryContext:
    "Judecători începe acolo unde se încheie Iosua, dar tonul este diferit. Primele versete încă păstrează limbajul cuceririi și al promisiunii, în timp ce a doua jumătate repetă apăsător formula «n-a izgonit». Capitolul pregătește explicația teologică din Judecători 2: Israel nu a căzut dintr-odată, ci a lăsat neterminată ascultarea pe care Dumnezeu i-o încredințase.",
  historicalContext:
    "Semințiile își ocupă teritoriile după moartea lui Iosua, într-o perioadă fără conducător central. Carele de fier ale cetăților din câmpie ofereau un avantaj militar real, dar textul nu le prezintă ca o limită a puterii lui Dumnezeu. În lumea antică, supunerea populațiilor la bir era mai profitabilă decât izgonirea lor; tocmai această alegere pragmatică arată cum ascultarea a fost înlocuită de interes.",
  units: [
    {
      verses: [1, 7],
      heading: "Iuda întreabă, pornește și vede dreptatea întoarsă asupra lui Adoni-Bezec",
      teaching: teaching(
        "Cartea începe bine: după moartea lui Iosua, poporul întreabă pe DOMNUL. Lipsa unui conducător nu trebuie să însemne lipsa călăuzirii; Dumnezeu rămâne prezent și răspunde limpede.",
        "Iuda îl cheamă pe Simeon să lupte împreună cu el. Ajutorul frățesc nu înlocuiește porunca lui Dumnezeu, ci o slujește. Ascultarea nu este individualism, iar unitatea nu înseamnă că nimeni nu mai poartă răspunderea chemării primite.",
        "Adoni-Bezec recunoaște în propria pedeapsă ceea ce făcuse altora. Textul nu ne invită să imităm cruzimea, ci ne obligă să vedem că puterea folosită fără milă ajunge sub judecată. Omul care transformase șaptezeci de împărați în trofee ajunge el însuși lipsit de putere.",
      ),
      crossRefs: ["Iosua 15:1-12", "Galateni 6:7", "Matei 7:2"],
      forYourHeart:
        "Când începe o etapă nouă și omul pe care te sprijineai nu mai este, prima întrebare nu este «cine ne va conduce?», ci «ce spune DOMNUL acum?». Ascultarea începe prin a-L întreba și continuă prin a face ceea ce a spus.",
    },
    {
      verses: [8, 15],
      heading: "Caleb, Otniel și Acsa: o familie care cere și lucrează pentru moștenire",
      teaching: teaching(
        "În mijlocul unui capitol care va ajunge să vorbească despre compromis, casa lui Caleb păstrează duhul credinței din Iosua. Otniel nu primește cetatea fără luptă, iar Acsa nu se mulțumește cu un pământ care nu poate rodi.",
        "Cererea ei pentru izvoarele de sus și de jos nu este lăcomie, ci înțelegerea faptului că darul trebuie să poată aduce viață. Ea vede lipsa, o numește și cere cu îndrăzneală ceea ce este necesar.",
        "Transcrierea Poonen așază accentul pe oamenii care Îl cunosc pe Dumnezeu și îi întăresc și pe alții. Otniel va deveni primul judecător al lui Israel; aici îl vedem înainte de slujirea publică, credincios într-o însărcinare concretă și legat de o familie care trăiește din promisiune.",
      ),
      crossRefs: ["Iosua 15:13-19", "Judecători 3:7-11", "Iacov 1:5-6"],
      forYourHeart:
        "Nu te rușina să ceri lui Dumnezeu izvoare pentru locul în care te-a așezat. Un dar primit fără resursele necesare poate rămâne sterp; credința vede nevoia și o aduce înaintea Tatălui.",
    },
    {
      verses: [16, 26],
      heading: "Biruința continuă, dar apar primele limite acceptate",
      teaching: teaching(
        "Iuda și Simeon înaintează împreună, iar casa lui Iosif cucerește Betelul. DOMNUL este cu ei; problema cărții nu este retragerea lui Dumnezeu, ci micșorarea ascultării omului.",
        "Versetul 19 a fost citit adesea ca și cum carele de fier ar fi fost mai puternice decât DOMNUL. Dar restul Scripturii arată că Dumnezeu a biruit și armate cu care de fier. Formularea scoate la iveală neputința lui Iuda de a duce ascultarea până la capăt, nu lipsa puterii divine.",
        "Omul cruțat la Betel își întemeiază mai târziu o altă cetate numită Luz. Cetatea veche este cucerită, dar numele și continuitatea ei sunt mutate în alt loc. Uneori răul nu dispare; doar își schimbă adresa atunci când este tratat numai exterior.",
      ),
      crossRefs: ["Iosua 17:16-18", "Judecători 4:3", "2 Corinteni 10:3-5"],
      forYourHeart:
        "Nu numi imposibil ceea ce Dumnezeu ți-a poruncit doar pentru că opoziția are «care de fier». Întreabă-te cinstit dacă limita este în puterea Lui sau în hotărârea ta de a asculta până la capăt.",
    },
    {
      verses: [27, 36],
      heading: "«N-a izgonit»: compromisul devine modelul tuturor semințiilor",
      teaching: teaching(
        "Ultima parte a capitolului repetă aceeași propoziție despre Manase, Efraim, Zabulon, Așer și Neftali: nu i-au izgonit. Repetiția nu este un detaliu administrativ, ci verdictul spiritual al capitolului.",
        "Când Israel devine mai puternic, nu termină ceea ce primise poruncă să facă, ci îi pune pe canaaniți la bir. Compromisul capătă justificare economică: ceea ce trebuia îndepărtat devine folositor. Păcatul tolerat este adesea păstrat tocmai pentru că aduce un avantaj.",
        "La Dan, situația este și mai gravă: amoriții îi împing pe munte și nu îi lasă să coboare. Poporul chemat să stăpânească țara ajunge restrâns de cei pe care nu i-a înfruntat. Aceasta pregătește ciclurile descrise de Poonen în transcriere: abatere, robie, strigăt, izbăvire și o nouă abatere.",
      ),
      words: [
        {
          original: "יָרַשׁ",
          transliteration: "iaraș",
          language: "ebraica",
          meaning:
            "a lua în stăpânire, a moșteni, dar și a izgoni pe ocupant. În Judecători 1, moștenirea nu este doar primirea unui teritoriu, ci îndepărtarea a ceea ce împiedică ascultarea deplină.",
        },
      ],
      crossRefs: ["Numeri 33:55", "Judecători 2:1-3", "Romani 6:12-14"],
      forYourHeart:
        "Lucrul pe care îl păstrezi pentru că îți este folositor poate deveni lucrul care te stăpânește. Nu negocia cu ceea ce Dumnezeu ți-a arătat că trebuie părăsit.",
    },
  ],
  prayer:
    "Doamne, păzește-ne de ascultarea începută și lăsată neterminată.\n\nArată-ne compromisurile pe care le-am numit imposibilități sau avantaje și dă-ne credință să nu păstrăm ceea ce ne va robi.\n\nÎnvață-ne să Te întrebăm, să lucrăm împreună cu frații noștri și să cerem izvoarele de care avem nevoie.\n\nFă-ne oameni care Te cunosc și care merg până la capăt în ceea ce le-ai încredințat. Amin.",
  status: judecatoriStatus(1),
})
