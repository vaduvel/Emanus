import type { Lesson } from "@emanus/shared/domain"
import type { CrisisResourceId } from "@emanus/shared"

export interface LessonSafetyGate {
  topic: string
  message: string
  resources: CrisisResourceId[]
}

const EXACT: Record<string, LessonSafetyGate> = {
  rusine_l5: {
    topic: "mărturisire, rușine și situații care pot include abuz sau avort",
    message: "Nu trebuie să povestești nimănui ceva ce te pune în pericol. Poți opri oricând și poți reveni.",
    resources: ["emergency", "domestic_violence", "emotional_support"],
  },
  rusine_l6: {
    topic: "vinovăție profundă și imposibilitatea de a te ierta",
    message: "Lecția nu înlocuiește sprijinul medical sau psihologic. Dacă te gândești să-ți faci rău, cere ajutor acum.",
    resources: ["emergency", "emotional_support"],
  },
  schimbare_l5: {
    topic: "recădere și dependență",
    message: "Dependența poate necesita ajutor medical și specializat, nu numai o lecție. Poți opri și reveni.",
    resources: ["emergency", "emotional_support"],
  },
  schimbare_l6: {
    topic: "anxietate, depresie și lipsa totală de simțire",
    message: "Aceste stări pot avea cauze medicale. Emanus nu pune un diagnostic și nu înlocuiește medicul sau psihologul.",
    resources: ["emergency", "emotional_support"],
  },
  impreuna_l3: {
    topic: "respingere, control sau violență în familie",
    message: "Iertarea nu cere întoarcerea într-un loc periculos. În pericol imediat, cere ajutor acum.",
    resources: ["emergency", "domestic_violence", "child_protection"],
  },
  impreuna_l4: {
    topic: "abuz și răni produse în biserică",
    message: "Credința nu obligă victima să tacă. Dacă este implicat un copil sau există pericol, folosește resursele de ajutor.",
    resources: ["emergency", "child_protection", "child_helpline"],
  },
  neiertare_l6: {
    topic: "iertare, abuz și limite",
    message: "A ierta nu înseamnă împăcare automată și nu înseamnă întoarcerea în pericol.",
    resources: ["emergency", "domestic_violence", "child_protection"],
  },
}

const PREFIXES: Array<[string, LessonSafetyGate]> = [
  ["siguranta_l", {
    topic: "abuz, control și siguranță",
    message: "Nu trebuie să confrunți singur un agresor și nu trebuie să rămâi într-un loc periculos.",
    resources: ["emergency", "domestic_violence", "child_protection"],
  }],
  ["sexualitate_l", {
    topic: "sexualitate, pornografie, rușine și consimțământ",
    message: "Poți opri oricând. Dacă ceea ce s-a întâmplat nu a fost consimțit sau ești în pericol, cere ajutor.",
    resources: ["emergency", "domestic_violence", "child_protection", "child_helpline"],
  }],
  ["limite_l", {
    topic: "limite și consimțământ",
    message: "O limită nu este lipsă de iubire. În pericol imediat, nu negocia cu pericolul: cere ajutor.",
    resources: ["emergency", "domestic_violence", "child_protection"],
  }],
  ["barbat_lupta_l", {
    topic: "dependență, mânie și lupte interioare",
    message: "Lecția nu înlocuiește tratamentul, consilierea sau intervenția de urgență.",
    resources: ["emergency", "emotional_support"],
  }],
  ["femeie_lupta_l", {
    topic: "anxietate, rușine și lupte interioare",
    message: "Lecția nu înlocuiește medicul sau psihologul. Dacă există pericol, cere ajutor acum.",
    resources: ["emergency", "emotional_support", "domestic_violence"],
  }],
]

export function safetyGateForLesson(lesson: Lesson): LessonSafetyGate | null {
  const exact = EXACT[lesson.id]
  if (exact) return exact
  for (const [prefix, gate] of PREFIXES) if (lesson.id.startsWith(prefix)) return gate
  return null
}
