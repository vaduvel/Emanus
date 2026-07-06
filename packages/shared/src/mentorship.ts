// Calendar de mentorat (docs/00-DIRECTIE): mentorii oferă sesiuni, menteii le programează.
// MVP: sloturi demo generate din data curentă + sloturi oferite de mentori;
// rezervările și ofertele se țin în memorie (persistă la login real).

export type MentorSlotStatus = "open" | "booked"

export interface MentorSlot {
  id: string
  mentorName: string
  topic: string
  startsAt: string
  durationMin: number
  status: MentorSlotStatus
  bookedBy?: string
  /** id-ul mentorului care a oferit slotul (dacă e slot propriu, nu demo). */
  offeredBy?: string
}

export interface MentoratView {
  upcoming: MentorSlot[]
  mySessions: MentorSlot[]
  /** Sloturile oferite de utilizatorul curent (ca mentor), pentru gestionare. */
  myOfferedSlots: MentorSlot[]
}

function slotAt(base: Date, dayOffset: number, hour: number, minute: number): string {
  const d = new Date(base)
  d.setDate(d.getDate() + dayOffset)
  d.setHours(hour, minute, 0, 0)
  return d.toISOString()
}

/** Sloturi demo pentru următoarele zile (funcție pură). */
export function buildDemoMentorSlots(base: Date = new Date()): MentorSlot[] {
  const defs: Array<{
    mentorName: string
    topic: string
    day: number
    hour: number
    minute: number
    durationMin: number
  }> = [
    {
      mentorName: "Pastor Andrei",
      topic: "Cum să-ți construiești un timp zilnic cu Dumnezeu",
      day: 1,
      hour: 18,
      minute: 0,
      durationMin: 30,
    },
    {
      mentorName: "Sora Maria",
      topic: "Să treci peste anxietate cu credință",
      day: 2,
      hour: 19,
      minute: 0,
      durationMin: 30,
    },
    {
      mentorName: "Frate David",
      topic: "Iertare și relații vindecate",
      day: 3,
      hour: 17,
      minute: 30,
      durationMin: 45,
    },
    {
      mentorName: "Sora Ana",
      topic: "Identitate: cine ești în Hristos",
      day: 4,
      hour: 18,
      minute: 30,
      durationMin: 30,
    },
    {
      mentorName: "Pastor Andrei",
      topic: "Rugăciune care schimbă inima",
      day: 5,
      hour: 20,
      minute: 0,
      durationMin: 30,
    },
    {
      mentorName: "Frate David",
      topic: "Libertate față de obiceiuri care te trag înapoi",
      day: 6,
      hour: 18,
      minute: 0,
      durationMin: 45,
    },
  ]
  return defs.map((d, i) => ({
    id: `slot-${i + 1}`,
    mentorName: d.mentorName,
    topic: d.topic,
    startsAt: slotAt(base, d.day, d.hour, d.minute),
    durationMin: d.durationMin,
    status: "open" as const,
  }))
}
