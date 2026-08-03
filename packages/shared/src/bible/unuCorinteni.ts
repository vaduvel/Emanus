import type { BibleBook } from "./types.js"
import { teaching, unuCorinteniChapter } from "./unuCorinteniHelpers.js"
import { UNU_CORINTENI_2 } from "./unuCorinteni2.js"
import { UNU_CORINTENI_3 } from "./unuCorinteni3.js"
import { UNU_CORINTENI_4 } from "./unuCorinteni4.js"
import { UNU_CORINTENI_5 } from "./unuCorinteni5.js"
import { UNU_CORINTENI_6 } from "./unuCorinteni6.js"
import { UNU_CORINTENI_7 } from "./unuCorinteni7.js"
import { UNU_CORINTENI_8 } from "./unuCorinteni8.js"
import { UNU_CORINTENI_9 } from "./unuCorinteni9.js"
import { UNU_CORINTENI_10 } from "./unuCorinteni10.js"
import { UNU_CORINTENI_11 } from "./unuCorinteni11.js"
import { UNU_CORINTENI_12 } from "./unuCorinteni12.js"
import { UNU_CORINTENI_13 } from "./unuCorinteni13.js"
import { UNU_CORINTENI_14 } from "./unuCorinteni14.js"
import { UNU_CORINTENI_15 } from "./unuCorinteni15.js"
import { UNU_CORINTENI_16 } from "./unuCorinteni16.js"

const UNU_CORINTENI_1 = unuCorinteniChapter({
  number: 1,
  title: "1 Corinteni 1 — Hristos răstignit, puterea și înțelepciunea lui Dumnezeu",
  summary: "Pavel mulțumește pentru harul primit de corinteni, îi cheamă la unitate și așază crucea lui Hristos deasupra talentului, reputației și înțelepciunii omenești.",
  literaryContext: "Scrisoarea începe prin a numi sfinți niște credincioși încă imaturi. Harul care i-a pus deoparte trebuie să-i conducă acum spre o sfințire reală și spre unitate în jurul lui Hristos.",
  historicalContext: "Corintul era un oraș prosper, competitiv și marcat de retorică, statut social și imoralitate. Biserica preluase o parte din spiritul orașului și se grupa în jurul unor lideri preferați.",
  units: [
    {
      verses: [1, 9],
      heading: "Chemați să fim sfinți și păstrați de Dumnezeu",
      teaching: teaching(
        "Poonen subliniază că sfințirea începe când Dumnezeu ne scoate din întuneric și ne pune deoparte pentru El, dar continuă toată viața. Darurile și cunoștința corintenilor nu dovedeau maturitate; fidelitatea lui Dumnezeu trebuia să-i ducă la asemănarea cu Hristos.",
        "Pavel nu ignoră păcatele lor, însă începe prin a mulțumi pentru lucrarea harului. O inimă sfințită vede binele pe care Dumnezeu l-a început în oameni, fără să numească răul bine.",
      ),
      crossRefs: ["1 Tesaloniceni 5:23-24", "Filipeni 1:6", "Tit 2:11-14"],
      forYourHeart: "Privește mai întâi harul lui Dumnezeu din frații tăi și roagă-te ca acel har să-i ducă la maturitate.",
    },
    {
      verses: [10, 17],
      heading: "Numele lui Hristos, nu taberele noastre",
      teaching: teaching(
        "Diviziunile arătau că liderii deveniseră steaguri de partid. Nici Pavel, nici Apolo și nici Chifa nu fuseseră răstigniți pentru credincioși; numai Hristos este centrul Bisericii.",
        "Slujitorii pot avea daruri diferite, dar botezul, predicarea și lucrarea lor nu trebuie folosite pentru construirea unui cult al personalității. Crucea golește de putere ambiția de a ne face un nume.",
      ),
      crossRefs: ["Ioan 17:20-23", "1 Corinteni 3:4-9", "Galateni 6:14"],
      forYourHeart: "Refuză să-ți clădești identitatea spirituală pe admirația pentru un om; aparții lui Hristos.",
    },
    {
      verses: [18, 25],
      heading: "Cuvântul crucii răstoarnă valorile lumii",
      teaching: teaching(
        "Pentru mintea firească, crucea pare slăbiciune și nebunie. Pentru cel mântuit, ea descoperă puterea prin care Dumnezeu biruie păcatul, mândria și încrederea în sine.",
        "Poonen insistă că lucrarea lui Dumnezeu nu se construiește prin elocvență sau inteligență omenească. Mesajul crucii include nu doar iertarea, ci și chemarea de a muri față de propria voie și de a-L urma pe Isus.",
      ),
      crossRefs: ["Luca 9:23", "Romani 6:6", "2 Corinteni 4:7"],
      forYourHeart: "Întreabă-te unde încerci să reușești prin imagine și abilitate, în loc să accepți calea crucii.",
    },
    {
      verses: [26, 31],
      heading: "Dumnezeu alege ce nu se poate lăuda",
      teaching: teaching(
        "Dumnezeu alege adesea oameni fără prestigiu pentru ca rezultatul să nu poată fi atribuit puterii lor. Aceasta nu glorifică ignoranța, ci zdrobește autosuficiența.",
        "Hristos a devenit pentru noi înțelepciune, dreptate, sfințire și răscumpărare. Tot ce avem înaintea lui Dumnezeu este primit în El; de aceea lauda credinciosului rămâne numai în Domnul.",
      ),
      crossRefs: ["Ieremia 9:23-24", "2 Corinteni 12:9", "Filipeni 3:7-9"],
      forYourHeart: "Mulțumește pentru daruri, dar nu te sprijini pe ele. Fă din Hristos singura ta laudă.",
    }
  ],
  prayer: "Doamne Isuse, păzește-mă de spiritul de partidă și de încrederea în puterea mea. Fă crucea Ta centrul vieții mele și împlinește în mine sfințirea pe care ai început-o. Amin.",
})

export const UNU_CORINTENI: BibleBook = {
  id: "1-corinteni",
  name: "1 Corinteni",
  testament: "nt",
  order: 46,
  blurb: "Crucea lui Hristos formează o Biserică sfântă, unită, plină de daruri și condusă de dragoste, în speranța învierii.",
  chapters: [
    UNU_CORINTENI_1,
    UNU_CORINTENI_2,
    UNU_CORINTENI_3,
    UNU_CORINTENI_4,
    UNU_CORINTENI_5,
    UNU_CORINTENI_6,
    UNU_CORINTENI_7,
    UNU_CORINTENI_8,
    UNU_CORINTENI_9,
    UNU_CORINTENI_10,
    UNU_CORINTENI_11,
    UNU_CORINTENI_12,
    UNU_CORINTENI_13,
    UNU_CORINTENI_14,
    UNU_CORINTENI_15,
    UNU_CORINTENI_16,
  ],
}
