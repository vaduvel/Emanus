// Nivelul Mentor (docs/00-DIRECTIE): un utilizator matur poate însoți alți frați.
// Eligibilitatea se calculează din starea de joc (nivel + module absolvite / certificate).
// Funcție pură și testabilă — persistența doar o apelează.
import type { GamState } from "./domain.js"

// Tipate explicit ca `number`, nu ca literali: altfel TypeScript considera
// comparatiile de mai jos imposibile (TS2367) si build-ul cadea.
export const MENTOR_MIN_LEVEL: number = 5
export const MENTOR_MIN_CERTIFICATES: number = 1

export interface MentorStatus {
  isMentor: boolean
  level: number
  minLevel: number
  certificates: number
  minCertificates: number
  /** Progres spre eligibilitatea de mentor, 0..100. */
  progressPercent: number
  levelsRemaining: number
  certificatesRemaining: number
}

export function mentorStatus(gam: GamState): MentorStatus {
  const level = gam.level
  const certificates = gam.certificateIds.length
  const levelsRemaining = Math.max(0, MENTOR_MIN_LEVEL - level)
  const certificatesRemaining = Math.max(0, MENTOR_MIN_CERTIFICATES - certificates)
  const isMentor = levelsRemaining === 0 && certificatesRemaining === 0
  const levelProgress = MENTOR_MIN_LEVEL <= 0 ? 1 : Math.min(1, level / MENTOR_MIN_LEVEL)
  const certProgress =
    MENTOR_MIN_CERTIFICATES <= 0 ? 1 : Math.min(1, certificates / MENTOR_MIN_CERTIFICATES)
  const progressPercent = Math.round(((levelProgress + certProgress) / 2) * 100)
  return {
    isMentor,
    level,
    minLevel: MENTOR_MIN_LEVEL,
    certificates,
    minCertificates: MENTOR_MIN_CERTIFICATES,
    progressPercent,
    levelsRemaining,
    certificatesRemaining,
  }
}
