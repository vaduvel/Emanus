import { iosuaChapter, teaching } from "./iosuaHelpers.js"
import { iosuaPassage } from "./iosuaText.js"
import { IOSUA_STATUSES } from "./iosuaPublication.js"

export const IOSUA_16 = iosuaChapter({
  number: 16,
  title: "Iosua 16 — Teritoriul lui Efraim",
  summary:
    "Capitolul descrie hotarul moștenirii comune a fiilor lui Iosif, apoi se concentrează pe teritoriul seminției lui Efraim, notele finale amintind că nici Efraim n-a izgonit pe deplin pe canaaniții din Ghezer.",
  literaryContext:
    "Capitolele 16 și 17 formează o unitate, tratate împreună pentru că descriu moștenirea fiilor lui Iosif — Efraim și Manase — două seminții ieșite dintr-un singur strămoș, care primesc totuși teritorii separate.",
  historicalContext:
    "Efraim, deși mai mic decât Manase ca origine (fiul mai mic al lui Iosif), va deveni mai târziu seminția dominantă a regatului de nord, atât de mult încât numele său va ajunge sinonim cu întregul regat al lui Israel în scrierile profetice.",
  units: [
    {
      id: "iosua-16-1-10",
      ref: "Iosua 16:1-10",
      heading: "Hotarul fiilor lui Iosif și teritoriul lui Efraim",
      text: iosuaPassage(16, 1, 10),
      teaching: teaching(
        "Hotarul general al fiilor lui Iosif pornește de la Iordan, lângă Ierihon, și urcă spre muntele Betel, arătând că această moștenire comună acoperă o parte esențială, centrală, a țării Canaanului.",
        "Teritoriul specific al lui Efraim este apoi delimitat în interiorul acestei moșteniri comune, arătând că împărțirea nu se face doar între seminții, ci și în interiorul familiilor extinse, cu grijă pentru fiecare ramură.",
        "Textul încheie cu aceeași mărturisire onestă văzută și la Iuda: „n-au izgonit pe canaaniții care locuiau la Ghezer, așa că canaaniții au locuit în mijlocul lui Efraim până în ziua de azi, dar au fost puși să plătească un bir”. Cucerirea incompletă devine, din nou, o realitate acceptată în text, nu ascunsă.",
      ),
      crossRefs: ["Geneza 48:5", "Judecători 1:29"],
      forYourHeart:
        "Chiar și în moștenirile primite împreună cu alții, Dumnezeu are grijă de detaliile specifice fiecărei familii și fiecărei ramuri.",
    },
  ],
  prayer:
    "Doamne, mulțumim că în moștenirea comună a familiei credinței, Tu ai grijă și de partea fiecăruia în parte.\n\nÎnvață-ne să recunoaștem cu sinceritate, ca și Efraim, zonele încă necucerite din viața noastră.\n\nDă-ne perseverență să nu ne mulțumim cu un bir plătit de vrăjmaș, ci să continuăm lupta până la biruință deplină.\n\nȘi mulțumim că promisiunile Tale rămân sigure, chiar când împlinirea lor este încă parțială. Amin.",
  status: IOSUA_STATUSES[16],
})
