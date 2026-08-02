import type { BibleBook } from "./types.js"
import { mateiChapter, teaching } from "./mateiHelpers.js"

/*
 * Evanghelia după Matei, explicată pe unități de sens.
 *
 * Textul biblic: Cornilescu 1924, păstrat separat în mateiText.ts.
 * Explicația: scrisă pentru Emanus după cercetarea textului și a surselor
 * declarate în docs/35-plan-scriere-matei.md. Nu se copiază formularea
 * niciunui predicator sau comentator.
 */

const MATEI_1 = mateiChapter({
  number: 1,
  title: "Matei 1 — Fiul lui David, Dumnezeu cu noi",
  summary:
    "Evanghelia se deschide cu neamul Domnului Isus și cu nașterea Lui din fecioară. Cel făgăduit lui Avraam și lui David intră într-o istorie omenească frântă ca să-Și mântuiască poporul de păcate.",
  literaryContext:
    "Matei așază mai întâi rădăcinile și apoi nașterea. Genealogia leagă Noul Testament de făgăduințele Vechiului Testament, iar relatarea despre Iosif arată că venirea lui Mesia este lucrarea lui Dumnezeu, nu izbânda unei familii omenești. Cele două nume din final, Isus și Emanuil, spun împreună ce va face și cine este Pruncul.",
  historicalContext:
    "Pentru un cititor iudeu, expresiile «fiul lui David» și «fiul lui Avraam» purtau greutatea legămintelor: un împărat din casa lui David și o binecuvântare pentru toate neamurile. Logodna iudaică era un legământ juridic serios, iar o sarcină înainte de viața împreună o expunea pe Maria rușinii și primejdiei. În această împrejurare, ascultarea lui Iosif are un preț real.",
  units: [
    {
      verses: [1, 17],
      heading: "Cartea neamului lui Isus Hristos",
      teaching: teaching(
        "Să ne oprim la felul în care începe Noul Testament. Nu începe cu un om care urcă spre Dumnezeu, ci cu Dumnezeu care Își ține făgăduința prin multe generații. Isus este numit mai întâi fiul lui David și fiul lui Avraam. În El se întâlnesc făgăduința Împăratului și făgăduința binecuvântării pentru toate neamurile.",
        "Lista nu ascunde rușinea familiei. Tamar, Rahab, Rut și femeia lui Urie aduc în același șir păcat, străinătate, suferință și har. Împărați credincioși stau lângă împărați răi, iar strămutarea în Babilon taie genealogia ca o rană. Domnul Isus nu intră într-o istorie lustruită. El vine în istoria adevărată a oamenilor ca s-o răscumpere.",
        "Se cuvine să fim cinstiți și cu forma listei. Matei o așază în trei grupe de câte paisprezece și, asemenea genealogiilor biblice, poate trece peste unele generații pentru a arăta linia teologică. Scopul nu este să ofere un registru civil complet, ci să mărturisească: făgăduința nu s-a pierdut nici în împărăție, nici în exil, nici în veacurile de așteptare. Ea ajunge la Hristos.",
      ),
      words: [
        {
          original: "βίβλος γενέσεως",
          transliteration: "biblos geneseos",
          language: "greaca",
          meaning:
            "cartea neamului sau a obârșiei. Expresia face punte spre Geneza și deschide istoria unui nou început.",
        },
        {
          original: "Χριστός",
          transliteration: "Christos",
          language: "greaca",
          meaning:
            "Unsul. Titlul grecesc corespunzător lui Mesia, Împăratul și Mântuitorul făgăduit.",
        },
      ],
      crossRefs: ["Geneza 12:1-3", "2 Samuel 7:12-16", "Rut 4:13-22", "Galateni 3:16"],
      forYourHeart:
        "Poate privești în urmă și vezi o familie amestecată, greșeli, pierderi ori ani în care Dumnezeu părea tăcut. Genealogia aceasta nu spune că răul a fost bun; spune că răul nu a putut opri credincioșia lui Dumnezeu. Hristos nu Se rușinează să intre în istorii care au nevoie de răscumpărare.",
    },
    {
      verses: [18, 25],
      heading: "Isus și Emanuil",
      teaching: teaching(
        "Nașterea Domnului Isus nu este povestită ca o legendă fără cost. Maria se află într-o situație pe care oamenii o puteau judeca aspru, iar Iosif trebuie să aleagă înainte de a înțelege totul. Neprihănirea lui nu se arată prin dorința de a o zdrobi public, ci prin faptul că unește adevărul cu mila. Când Dumnezeu îi vorbește, el ascultă fără să ceară garanții suplimentare.",
        "Îngerul dă Pruncului numele Isus și îi spune rostul: El va mântui pe poporul Lui de păcate. Evanghelia nu micșorează păcatul și nici nu promite numai o îmbunătățire a împrejurărilor. Nevoia cea mai adâncă a omului este împăcarea cu Dumnezeu și eliberarea de stăpânirea păcatului; tocmai pentru aceasta vine Fiul.",
        "Matei așază lângă numele Isus numele Emanuil: Dumnezeu cu noi. Cel care mântuiește nu este un sol trimis de departe. Dumnezeu Însuși vine aproape. Zămislirea din Duhul Sfânt nu spune că Fiul ar fi început atunci să existe, ci că Fiul veșnic a luat cu adevărat fire omenească. Textul cere să păstrăm taina, nu să o umplem cu speculații.",
      ),
      words: [
        {
          original: "Ἰησοῦς",
          transliteration: "Iesous",
          language: "greaca",
          meaning:
            "Isus, forma grecească a numelui Ieșua: Domnul mântuiește. Numele este legat chiar în text de mântuirea de păcate.",
        },
        {
          original: "Ἐμμανουήλ",
          transliteration: "Emmanouel",
          language: "greaca",
          meaning: "Emanuil: Dumnezeu este cu noi.",
        },
      ],
      crossRefs: ["Isaia 7:14", "Luca 1:26-38", "Ioan 1:14", "Filipeni 2:6-8"],
      forYourHeart:
        "Domnul Isus nu a venit doar să-ți facă viața mai ușoară, ci să te mântuiască de păcat și să te aducă în prezența lui Dumnezeu. Nu trebuie să alegi între un Dumnezeu sfânt și un Dumnezeu apropiat: în Emanuil, Sfântul vine aproape ca să mântuiască.",
    },
  ],
  prayer:
    "Doamne Isuse Hristoase, Îți mulțumim că ai intrat în istoria noastră și că nicio rană a trecutului nu a putut opri făgăduința Tatălui. Mântuiește-ne de păcatele noastre, nu doar de urmările lor, și învață-ne să trăim înaintea Ta cu adevăr și cu milă. Rămâi cu noi, Emanuil, și fă ascultarea noastră grabnică precum a lui Iosif. Amin.",
})

export const MATEI: BibleBook = {
  id: "matei",
  name: "Matei",
  testament: "nt",
  order: 40,
  blurb:
    "Evanghelia după Matei Îl arată pe Isus ca Mesia făgăduit, Fiul lui David și Împăratul a cărui domnie nu seamănă cu împărățiile lumii. Cartea leagă mereu viața Lui de Sfânta Scriptură și adună în cinci mari cuvântări învățătura despre Împărăția cerurilor: Predica de pe munte, trimiterea ucenicilor, pildele Împărăției, viața comunității și cuvântarea despre sfârșit.\n\nMatei nu prezintă un Împărat care cucerește prin sabie, ci pe Fiul Omului care slujește, suferă, Își dă viața și învie. De la neamul lui Avraam până la porunca de a face ucenici din toate neamurile, Evanghelia arată cum făgăduința lui Dumnezeu ajunge la întreaga lume.\n\nCititorul nu este chemat doar să afle cine este Isus, ci să-I audă cuvintele și să le împlinească. Harul care primește păcătoși este același har care îi învață să trăiască sub domnia Împăratului.",
  chapters: [MATEI_1],
}
