import type { BibleChapter, BibleUnit } from "./types.js"

const POONEN_2_SAMUEL_SOURCE =
  "Zac Poonen — Through The Bible: 2 Samuel, .research/poonen-through-the-bible-OT/transcripts/samuel-2.txt"

function replaceUnit(chapter: BibleChapter, unitId: string, patch: Partial<BibleUnit>): BibleChapter {
  return {
    ...chapter,
    units: chapter.units.map((unit) => (unit.id === unitId ? { ...unit, ...patch } : unit)),
  }
}

function restoreChapter24(chapter: BibleChapter): BibleChapter {
  let restored = replaceUnit(chapter, "2-samuel-24-1-9", {
    heading: "David numără poporul ca să-și măsoare puterea și nu Îl caută pe DOMNUL",
    teaching: [
      "David avea obiceiul să-L întrebe pe DOMNUL înainte de lupte și de hotărâri importante, iar când Îl căuta primea călăuzire. În două momente mari ale vieții lui însă nu a făcut aceasta: când a văzut-o pe Bat-Șeba și, aici, când a hotărât să numere poporul.",
      "În capitolul 24, David vrea să știe câți oameni are — fie ca să vadă peste cât de mulți este rege, fie ca să vadă cât de puternică este armata lui. În loc să-și pună siguranța în DOMNUL, începe să se uite la puterea pe care o poate măsura.",
      "Ioab îl avertizează să nu facă recensământul, dar David insistă. Tocmai omul care, în alte împrejurări, întreba «Doamne, să merg?» nu Îl întreabă aici pe Dumnezeu. Aceasta este lecția: când omul începe să se sprijine pe numere, putere și resurse, poate lua o hotărâre fără să mai aștepte răspunsul lui Dumnezeu.",
      "După ce numără poporul, inima lui David îl mustră și el recunoaște că a păcătuit. Omul după inima lui Dumnezeu poate greși grav, dar nu își apără păcatul când Dumnezeu îi dă lumină asupra lui.",
    ].join("\n\n"),
    explanationKind: "exposition",
    explanationSource: POONEN_2_SAMUEL_SOURCE,
    crossRefs: ["1 Samuel 23:2-4", "1 Samuel 30:8", "2 Samuel 5:19", "2 Samuel 5:23"],
    forYourHeart:
      "Nu lăsa numărul oamenilor, banii, resursele sau puterea vizibilă să-ți spună cât de sigur ești. Întreabă-L pe Dumnezeu înainte să te sprijini pe ceea ce poți număra.",
  })

  restored = replaceUnit(restored, "2-samuel-24-18-25", {
    heading: "«Nu voi aduce DOMNULUI ceva care nu mă costă nimic»",
    teaching: [
      "David merge la aria lui Aravna ca să aducă jertfă. Aravna îi oferă gratuit locul, boii și lemnul, dar David refuză.",
      "Versetul 24 este unul de ținut minte toată viața: «nu voi aduce DOMNULUI Dumnezeului meu arderi-de-tot care să nu mă coste nimic». Poonen fixează principiul în forma directă: nu voi aduce DOMNULUI ceva care nu mă costă nimic. David nu vrea să numească jertfă un dar al cărui preț îl plătește altcineva.",
      "Slujirea și închinarea adevărată ne costă. Îi dăm lui Dumnezeu din timpul nostru, puterea noastră, banii noștri, confortul nostru și viața noastră, nu doar lucruri care nu ne cer nimic.",
      "Pe acel loc este adusă jertfa și urgia se oprește. Mai târziu locul va fi legat de templu. Cartea se încheie astfel cu un om care, după ce s-a sprijinit pe ceea ce putea număra, ajunge din nou la altar și spune că nu-I va da lui Dumnezeu ceea ce nu îl costă.",
    ].join("\n\n"),
    explanationKind: "exposition",
    explanationSource: POONEN_2_SAMUEL_SOURCE,
    crossRefs: ["1 Cronici 21:18-30", "1 Cronici 22:1", "2 Cronici 3:1"],
    forYourHeart:
      "Nu-I oferi lui Dumnezeu doar ceea ce îți rămâne și nu te costă. Întreabă ce preț real are jertfa pe care o numești slujire.",
  })

  return restored
}

export function restoreSamuel2PoonenFidelity(chapters: BibleChapter[]): BibleChapter[] {
  return chapters.map((chapter) => (chapter.number === 24 ? restoreChapter24(chapter) : chapter))
}
