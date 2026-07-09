// Ritualul zilnic „Timp cu Dumnezeu” (docs/00-DIRECTIE §2, Ritmul zilnic).
// Cuvânt → viața ta → rugăciune → pas. Versetul e ales după axa pe care ești, nu random.
import type { GrowthAxisId } from "./domain.js"

export interface DailyRitual {
  id: string
  axis: GrowthAxisId
  verseText: string
  verseRef: string
  forYourLife: string
  reflectionQuestion: string
  prayer: string
  linkedLessonId?: string
}

export interface DailyView {
  ritual: DailyRitual
  rhythmDays: number
  nextLesson: { lessonId: string; title: string } | null
  graceMessage: string
}

// Câte un ritual pe fiecare axă de creștere; versetul zilei urmează axa ta cea mai fragedă.
export const DAILY_RITUALS: DailyRitual[] = [
  {
    id: "daily_identity",
    axis: "identity",
    verseText: "Te laud că sunt o făptură așa de minunată.",
    verseRef: "Psalm 139:14",
    forYourLife:
      "Azi vei fi tentat să-ți măsori valoarea în reacții, note sau priviri. Dar valoarea ta a fost pusă de Cel care te-a făcut, înainte să dovedești ceva.",
    reflectionQuestion: "Unde cauți azi o aprobare pe care Dumnezeu ți-o dă deja?",
    prayer:
      "Doamne, îmi iau valoarea de la Tine, nu de la ecran. Ajută-mă să trăiesc azi ca un copil iubit. Amin.",
    linkedLessonId: "teens_m1_c1_l1",
  },
  {
    id: "daily_emotional_peace",
    axis: "emotional_peace",
    verseText: "Vă las pacea, vă dau pacea Mea.",
    verseRef: "Ioan 14:27",
    forYourLife:
      "Grija de azi vrea toată atenția ta. Dar pacea nu vine din a controla totul, ci din a preda ce te apasă.",
    reflectionQuestion: "Ce grijă poți să-I dai azi lui Dumnezeu, în loc s-o cari singur?",
    prayer: "Doamne, Îți dau ce mă apasă. Dă-mi pacea Ta, care întrece orice pricepere. Amin.",
    linkedLessonId: "teens_m1_c1_l3",
  },
  {
    id: "daily_relationships",
    axis: "relationships",
    verseText: "Să vă iubiți unii pe alții, cum v-am iubit Eu.",
    verseRef: "Ioan 13:34",
    forYourLife:
      "Azi vei întâlni oameni greu de iubit — poate chiar în casa ta. Iubirea nu e întâi un sentiment, ci o alegere pe care o poți face acum.",
    reflectionQuestion: "Cui poți să-i arăți azi un gest concret de iubire?",
    prayer:
      "Doamne, învață-mă să iubesc cum m-ai iubit Tu. Dă-mi răbdare și un cuvânt bun azi. Amin.",
    linkedLessonId: "teens_m1_c1_l1",
  },
  {
    id: "daily_living_faith",
    axis: "living_faith",
    verseText: "Credința este o încredere neclintită în lucrurile nădăjduite.",
    verseRef: "Evrei 11:1",
    forYourLife:
      "Credința nu înseamnă să simți totul limpede, ci să faci un pas mic de încredere chiar când nu vezi tot drumul.",
    reflectionQuestion: "Ce pas mic de încredere poți face azi, chiar dacă nu vezi rezultatul?",
    prayer: "Doamne, cred; ajută necredinței mele. Merg azi cu Tine, un pas. Amin.",
    linkedLessonId: "teens_m1_c1_l5",
  },
  {
    id: "daily_character",
    axis: "character",
    verseText: "Roada Duhului este dragostea, bucuria, pacea, îndelunga răbdare.",
    verseRef: "Galateni 5:22",
    forYourLife:
      "Caracterul se vede în lucrurile mici, când nu te vede nimeni. Azi ai zeci de ocazii să alegi binele discret.",
    reflectionQuestion: "Într-un moment mic de azi, cum poți alege cinstea în loc de comoditate?",
    prayer:
      "Doamne, crește în mine roada Duhului. Vreau să fiu la fel și când nu mă vede nimeni. Amin.",
    linkedLessonId: "teens_m1_c1_l5",
  },
  {
    id: "daily_freedom",
    axis: "freedom",
    verseText: "Dacă Fiul vă face slobozi, veți fi cu adevărat slobozi.",
    verseRef: "Ioan 8:36",
    forYourLife:
      "Un obicei care te ține prins îți șoptește că nu poți altfel. Dar libertatea începe cu un singur «nu» spus azi, cu ajutorul Lui.",
    reflectionQuestion: "De ce lucru care te ține prins vrei să te elibereze Dumnezeu azi?",
    prayer:
      "Doamne, Tu mă faci liber. Rupe azi lanțul care mă apasă și dă-mi putere pentru un pas. Amin.",
    linkedLessonId: "teens_m1_c1_l1",
  },
]

function dayNumber(date: Date): number {
  return Math.floor(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) / 86400000,
  )
}

/** Ritualul zilei: dacă avem o axă de focus (cea mai fragedă), alegem versetul pe ea; altfel rotim după zi. */
export function dailyRitualForDay(date: Date = new Date(), focusAxis?: GrowthAxisId): DailyRitual {
  const focused = focusAxis ? DAILY_RITUALS.filter((d) => d.axis === focusAxis) : []
  const list = focused.length ? focused : DAILY_RITUALS
  return list[dayNumber(date) % list.length]
}

/** Mesaj de ritm „cu har, nu cu vină” (docs/00-DIRECTIE §3). */
export function graceMessage(rhythmDays: number): string {
  if (rhythmDays <= 0) return "Bine ai venit. Începe azi ritmul tău cu Dumnezeu — un pas mic."
  if (rhythmDays === 1) return "Prima zi în ritm. Frumos că ești aici."
  return `Ești în ritm de ${rhythmDays} zile. Dumnezeu te așteaptă cu har, nu cu vină.`
}
