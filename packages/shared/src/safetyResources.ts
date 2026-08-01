export const CRISIS_INTENTS = [
  "suicide",
  "violence",
  "child",
  "drugs",
  "gambling",
] as const

export type CrisisIntent = (typeof CRISIS_INTENTS)[number]

export interface CrisisResource {
  id: string
  intents: CrisisIntent[]
  dial: string
  phone: string
  label: string
  availability: string
  note: string
  sourceLabel: string
  sourceUrl: string
  email?: string
}

const ALL_INTENTS: CrisisIntent[] = [...CRISIS_INTENTS]

/**
 * Resurse pentru România. Programul este declarat numai când sursa îl publică.
 * La orice pericol imediat, 112 rămâne prima resursă.
 */
export const SAFETY_RESOURCES: CrisisResource[] = [
  {
    id: "112",
    intents: ALL_INTENTS,
    dial: "112",
    phone: "112",
    label: "Urgențe: ambulanță și poliție",
    availability: "Non-stop și gratuit",
    note: "Sună acum dacă viața ta sau a altcuiva este în pericol imediat.",
    sourceLabel: "Serviciul de Telecomunicații Speciale",
    sourceUrl: "https://www.112.ro/",
  },
  {
    id: "116123",
    intents: ["suicide"],
    dial: "116123",
    phone: "116 123",
    label: "Linie de sprijin psihologic",
    availability: "Apel gratuit; verifică disponibilitatea la apel",
    note: "Pentru singurătate, criză psihologică sau gânduri de suicid. Dacă nu se conectează ori pericolul este imediat, sună la 112.",
    sourceLabel: "Registrul ANCOM al numerelor 116",
    sourceUrl: "https://www.ancom.ro/reglementare-ro/numerotatie-ro/registrul-numerelor-scurte-armonizate-pentru-servicii-cu-caracter-social-de-forma-116-xyz/",
  },
  {
    id: "antisuicid",
    intents: ["suicide"],
    dial: "0800801200",
    phone: "0800 801 200",
    label: "TelVerde Antisuicid",
    availability: "Vineri–duminică, 16:00–04:00",
    note: "Sprijin pentru adulți. În afara programului sau la pericol imediat, sună la 112.",
    email: "sos@antisuicid.ro",
    sourceLabel: "Findahelpline, verificat de linie",
    sourceUrl: "https://findahelpline.com/organizations/telverde-antisuicid?expand=true",
  },
  {
    id: "119",
    intents: ["child"],
    dial: "119",
    phone: "119",
    label: "Numărul unic național pentru copii",
    availability: "Apel gratuit",
    note: "Pentru sesizarea abuzului, neglijării, exploatării sau violenței asupra unui copil.",
    sourceLabel: "Catalogul serviciilor publice",
    sourceUrl: "https://serviciipublice.gov.ro/serviciu/numarul-unic-national-pentru-copii-119",
  },
  {
    id: "116111",
    intents: ["child"],
    dial: "116111",
    phone: "116 111",
    label: "Telefonul Copilului",
    availability: "Luni–vineri, 08:00–20:00",
    note: "Consiliere gratuită pentru copii și adolescenți.",
    sourceLabel: "Asociația Telefonul Copilului",
    sourceUrl: "https://bedrugfree.116111.ro/cum-te-ajutam/",
  },
  {
    id: "anes",
    intents: ["violence"],
    dial: "0800500333",
    phone: "0800 500 333",
    label: "Linie națională pentru violență domestică",
    availability: "Non-stop și gratuit",
    note: "Sprijin pentru violență domestică, trafic de persoane și discriminare pe criteriul de sex.",
    sourceLabel: "Agenția Națională pentru Egalitatea de Șanse",
    sourceUrl: "https://anes.gov.ro/call-center/",
  },
  {
    id: "antidrog",
    intents: ["drugs"],
    dial: "0800870070",
    phone: "0800 870 070",
    label: "TelVerde pentru consum și dependență de droguri",
    availability: "Servicii gratuite și confidențiale; programul poate varia",
    note: "Informare, evaluare, consiliere și orientare spre asistență specializată. La supradoză sau pericol imediat, sună la 112.",
    sourceLabel: "Instituția Prefectului Galați / MAI",
    sourceUrl: "https://gl.prefectura.mai.gov.ro/wp-content/uploads/sites/46/2025/01/comunicat-24-ian-2025.pdf",
  },
  {
    id: "gambling",
    intents: ["gambling"],
    dial: "0800800099",
    phone: "0800 800 099",
    label: "Programul privat Joc Responsabil",
    availability: "Luni–vineri, 10:00–18:00",
    note: "Consiliere pentru probleme legate de jocurile de noroc și orientare către psihologi.",
    sourceLabel: "Asociația Joc Responsabil",
    sourceUrl: "https://jocresponsabil.ro/primeste-ajutor/",
  },
]

/** Setul scurt folosit când moderarea detectează o postare cu risc generic. */
export const CRISIS_RESOURCES = SAFETY_RESOURCES.filter((resource) =>
  ["112", "116123", "116111"].includes(resource.id),
)
