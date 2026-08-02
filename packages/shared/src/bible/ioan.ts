import type { BibleBook } from "./types.js"

/*
 * Ioan, explicata verset cu verset.
 *
 * Textul biblic: Cornilescu 1924, editia originala (domeniu public).
 * Explicatia: scrisa in intregime pentru Emanus. Nu se copiaza formularea
 * niciunui autor. Cercetam din surse, dar propozitiile sunt ale noastre.
 *
 * Sursa video principala pentru aceasta carte: Zac Poonen, verse by verse.
 * Allen Nolan ramane sursa secundara, mai ales in locurile despre Cuvantul.
 *
 * Registrul este cel aprobat: asezat, bisericesc, de amvon. Fara jargon.
 *
 * Fisierul acesta deschide baza cartii. Capitolele se vor adauga pe rand,
 * iar cartea va fi legata in `index.ts` numai dupa ce primul val este gata.
 */

export const IOAN: BibleBook = {
  id: "ioan",
  name: "Ioan",
  testament: "nt",
  order: 43,
  blurb:
    "Evanghelia dupa Ioan arata, cu o limpezime deosebita, cine este Domnul Isus: Cuvantul facut trup, Fiul lui Dumnezeu, Mielul lui Dumnezeu, Painea vietii, Lumina lumii, Usa oilor, Pastorul cel bun, Invierea si Viata, Calea, Adevarul si Viata, Vita cea adevarata. Dintre cele patru Evanghelii, aceasta se opreste cel mai mult asupra tainelor persoanei Lui si asupra semnelor prin care slava Lui se face vazuta.\n\nIoan nu strange doar intamplari, ci le alege si le aseaza cu grija, ca sa ne duca la o singura marturisire: Isus este Hristosul, Fiul lui Dumnezeu, si crezand sa avem viata in Numele Lui. Cartea merge de la marturia lui Ioan Botezatorul la cruce, la mormantul gol si la restaurarea lui Petru, iar pe tot drumul acesta se aude aceeasi chemare: vino si vezi, ramai, crede, urmeaza.\n\nIn scrierea acestei carti se cere multa masura, pentru ca Ioan vorbeste despre nasterea din Dumnezeu, despre viata vesnica, despre lucrarea Duhului Sfant, despre unirea cu Hristos si despre dragostea Tatalui. Tocmai de aceea, fiecare capitol va ramane `in_review` pana la citirea finala umana.",
  chapters: [],
}
