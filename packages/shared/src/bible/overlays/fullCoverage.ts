import { assertVerseCompleteOverlay, completeOverlayCoverage } from "../completeOverlay.js"
import { VT_HISTORICAL_FULL } from "../vtFullNarrativesHistorical.js"
import { VT_WISDOM_FULL } from "../vtFullNarrativesWisdom.js"
import { VT_MAJOR_PROPHETS_FULL } from "../vtFullNarrativesMajorProphets.js"
import { VT_MINOR_PROPHETS_FULL } from "../vtFullNarrativesMinorProphets.js"

import { JUDECATORI_EXPLAINED as JUDECATORI_BASE } from "./judecatoriOverlay.js"
import { reviewJudecatoriExplanations } from "./judecatoriExplanationReview.js"
import { reviewJudecatoriLeadership } from "./judecatoriLeadershipReview.js"
import { restoreEsteraPoonenFidelity, restoreJudecatoriPoonenFidelity } from "./historicalPoonenFidelityReview.js"
import { IMPARATI2_EXPLAINED as IMPARATI2_BASE } from "./imparati2Overlay.js"
import { reviewImparati2Explanations } from "./imparati2ExplanationReview.js"
import { CRONICI1_EXPLAINED as CRONICI1_BASE } from "./cronici1Overlay.js"
import { CRONICI2_EXPLAINED as CRONICI2_BASE } from "./cronici2Overlay.js"
import { EZRA_EXPLAINED as EZRA_BASE } from "./ezraOverlay.js"
import { NEEMIA_EXPLAINED as NEEMIA_BASE } from "./neemiaOverlay.js"
import { ESTERA_EXPLAINED as ESTERA_BASE } from "./esteraOverlay.js"
import { IOV_EDITORIAL_EXPLAINED as IOV_BASE } from "./iovEditorialOverlay.js"
import { PSALMI_EDITORIAL_EXPLAINED as PSALMI_BASE } from "./psalmiEditorialOverlay.js"
import { PROVERBE_EDITORIAL_EXPLAINED as PROVERBE_BASE } from "./proverbeEditorialOverlay.js"
import { ECLESIASTUL_EDITORIAL_EXPLAINED as ECLESIASTUL_BASE } from "./eclesiastulEditorialOverlay.js"
import { CANTAREA_EDITORIAL_EXPLAINED as CANTAREA_BASE } from "./cantareaEditorialOverlay.js"
import { ISAIA_EDITORIAL_EXPLAINED as ISAIA_BASE } from "./isaiaEditorialOverlay.js"
import { IEREMIA_EDITORIAL_EXPLAINED as IEREMIA_BASE } from "./ieremiaEditorialOverlay.js"
import { PLANGERILE_EDITORIAL_EXPLAINED as PLANGERILE_BASE } from "./plangerileEditorialOverlay.js"
import { EZECHIEL_EDITORIAL_EXPLAINED as EZECHIEL_BASE } from "./ezechielEditorialOverlay.js"
import { DANIEL_EDITORIAL_EXPLAINED as DANIEL_BASE } from "./danielEditorialOverlay.js"
import { OSEA_EXPLAINED as OSEA_BASE } from "./oseaOverlay.js"
import { IOEL_EXPLAINED as IOEL_BASE } from "./ioelOverlay.js"
import { AMOS_EXPLAINED as AMOS_BASE } from "./amosOverlay.js"
import { OBADIA_EXPLAINED as OBADIA_BASE } from "./obadiaOverlay.js"
import { IONA_EXPLAINED as IONA_BASE } from "./ionaOverlay.js"
import { MICA_EXPLAINED as MICA_BASE } from "./micaOverlay.js"
import { NAUM_EXPLAINED as NAUM_BASE } from "./naumOverlay.js"
import { HABACUC_EXPLAINED as HABACUC_BASE } from "./habacucOverlay.js"
import { TEFANIA_EXPLAINED as TEFANIA_BASE } from "./tefaniaOverlay.js"
import { HAGAI_EXPLAINED as HAGAI_BASE } from "./hagaiOverlay.js"
import { ZAHARIA_EXPLAINED as ZAHARIA_BASE } from "./zahariaOverlay.js"
import { MALEAHI_EXPLAINED as MALEAHI_BASE } from "./maleahiOverlay.js"
import { guardOverlayPublicAttribution } from "./publicCopyAttributionGuard.js"
import { applyUltraFinalSourceFirstReview } from "./ultraFinalSourceFirstReview.js"
import { applyFinalTextualGapCorrections } from "./finalTextualGapCorrections.js"
import { applyVerifiedUltraFinalPoonenOverrides } from "./verifiedUltraFinalPoonenOverrides.js"

function full(
  base: Parameters<typeof completeOverlayCoverage>[0],
  data: {
    verseCounts: Readonly<Record<number, number>>
    narratives: Readonly<Record<number, { title: string; summary: string }>>
  },
) {
  const empty = base.chapters.filter((chapter) => chapter.units.length === 0)
  if (empty.length) {
    throw new Error(
      `[Biblia explicată VT] ${base.name} mai are capitole fără explicație directă: ${empty
        .map((chapter) => chapter.number)
        .join(", ")}.`,
    )
  }

  const completed = completeOverlayCoverage(base, data.verseCounts, data.narratives)
  const sourceFirstReviewed = applyUltraFinalSourceFirstReview(completed)
  const textualGapsCorrected = applyFinalTextualGapCorrections(sourceFirstReviewed)
  const sourceVerified = applyVerifiedUltraFinalPoonenOverrides(textualGapsCorrected)
  const reviewed = assertVerseCompleteOverlay(sourceVerified, data.verseCounts)
  const readerSafe = guardOverlayPublicAttribution(reviewed)

  // Acesta este statusul stratului explicativ, nu al traducerii biblice.
  // Reader-ul decide separat dacă textul biblic asociat este încă provizoriu.
  return {
    ...readerSafe,
    status: "published" as const,
  }
}

export const JUDECATORI_FULL = full(
  restoreJudecatoriPoonenFidelity(
    reviewJudecatoriLeadership(reviewJudecatoriExplanations(JUDECATORI_BASE)),
  ),
  VT_HISTORICAL_FULL.judecatori,
)
export const IMPARATI2_FULL = full(reviewImparati2Explanations(IMPARATI2_BASE), VT_HISTORICAL_FULL.imparati2)
export const CRONICI1_FULL = full(CRONICI1_BASE, VT_HISTORICAL_FULL.cronici1)
export const CRONICI2_FULL = full(CRONICI2_BASE, VT_HISTORICAL_FULL.cronici2)
export const EZRA_FULL = full(EZRA_BASE, VT_HISTORICAL_FULL.ezra)
export const NEEMIA_FULL = full(NEEMIA_BASE, VT_HISTORICAL_FULL.neemia)
export const ESTERA_FULL = full(restoreEsteraPoonenFidelity(ESTERA_BASE), VT_HISTORICAL_FULL.estera)

export const IOV_FULL = full(IOV_BASE, VT_WISDOM_FULL.iov)
export const PSALMI_FULL = full(PSALMI_BASE, VT_WISDOM_FULL.psalmi)
export const PROVERBE_FULL = full(PROVERBE_BASE, VT_WISDOM_FULL.proverbe)
export const ECLESIASTUL_FULL = full(ECLESIASTUL_BASE, VT_WISDOM_FULL.eclesiastul)
export const CANTAREA_CANTARILOR_FULL = full(CANTAREA_BASE, VT_WISDOM_FULL.cantarea)

export const ISAIA_FULL = full(ISAIA_BASE, VT_MAJOR_PROPHETS_FULL.isaia)
export const IEREMIA_FULL = full(IEREMIA_BASE, VT_MAJOR_PROPHETS_FULL.ieremia)
export const PLANGERILE_FULL = full(PLANGERILE_BASE, VT_MAJOR_PROPHETS_FULL.plangerile)
export const EZECHIEL_FULL = full(EZECHIEL_BASE, VT_MAJOR_PROPHETS_FULL.ezechiel)
export const DANIEL_FULL = full(DANIEL_BASE, VT_MAJOR_PROPHETS_FULL.daniel)

export const OSEA_FULL = full(OSEA_BASE, VT_MINOR_PROPHETS_FULL.osea)
export const IOEL_FULL = full(IOEL_BASE, VT_MINOR_PROPHETS_FULL.ioel)
export const AMOS_FULL = full(AMOS_BASE, VT_MINOR_PROPHETS_FULL.amos)
export const OBADIA_FULL = full(OBADIA_BASE, VT_MINOR_PROPHETS_FULL.obadia)
export const IONA_FULL = full(IONA_BASE, VT_MINOR_PROPHETS_FULL.iona)
export const MICA_FULL = full(MICA_BASE, VT_MINOR_PROPHETS_FULL.mica)
export const NAUM_FULL = full(NAUM_BASE, VT_MINOR_PROPHETS_FULL.naum)
export const HABACUC_FULL = full(HABACUC_BASE, VT_MINOR_PROPHETS_FULL.habacuc)
export const TEFANIA_FULL = full(TEFANIA_BASE, VT_MINOR_PROPHETS_FULL.tefania)
export const HAGAI_FULL = full(HAGAI_BASE, VT_MINOR_PROPHETS_FULL.hagai)
export const ZAHARIA_FULL = full(ZAHARIA_BASE, VT_MINOR_PROPHETS_FULL.zaharia)
export const MALEAHI_FULL = full(MALEAHI_BASE, VT_MINOR_PROPHETS_FULL.maleahi)

export const VT_EXPLAINED_FULL_OVERLAYS = [
  JUDECATORI_FULL,
  IMPARATI2_FULL,
  CRONICI1_FULL,
  CRONICI2_FULL,
  EZRA_FULL,
  NEEMIA_FULL,
  ESTERA_FULL,
  IOV_FULL,
  PSALMI_FULL,
  PROVERBE_FULL,
  ECLESIASTUL_FULL,
  CANTAREA_CANTARILOR_FULL,
  ISAIA_FULL,
  IEREMIA_FULL,
  PLANGERILE_FULL,
  EZECHIEL_FULL,
  DANIEL_FULL,
  OSEA_FULL,
  IOEL_FULL,
  AMOS_FULL,
  OBADIA_FULL,
  IONA_FULL,
  MICA_FULL,
  NAUM_FULL,
  HABACUC_FULL,
  TEFANIA_FULL,
  HAGAI_FULL,
  ZAHARIA_FULL,
  MALEAHI_FULL,
] as const

if (VT_EXPLAINED_FULL_OVERLAYS.length !== 29) {
  throw new Error(`[Biblia explicată VT] se așteptau 29 de overlay-uri complete, găsite ${VT_EXPLAINED_FULL_OVERLAYS.length}.`)
}

VT_EXPLAINED_FULL_OVERLAYS.forEach((book) => {
  if (book.coverageMode !== "full") {
    throw new Error(`[Biblia explicată VT] ${book.name} nu este marcată full.`)
  }
  if (book.status !== "published") {
    throw new Error(`[Biblia explicată VT] ${book.name} nu are explicația aprobată pentru publicare.`)
  }
})
