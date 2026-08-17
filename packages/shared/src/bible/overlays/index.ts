// Overlay-urile de bază rămân exportate pentru trasabilitate editorială și audit Poonen.
export { JUDECATORI_EXPLAINED } from "./judecatoriOverlay.js"
export { IMPARATI2_EXPLAINED } from "./imparati2Overlay.js"
export { CRONICI1_EXPLAINED } from "./cronici1Overlay.js"
export { CRONICI2_EXPLAINED } from "./cronici2Overlay.js"
export { EZRA_EXPLAINED } from "./ezraOverlay.js"
export { NEEMIA_EXPLAINED } from "./neemiaOverlay.js"
export { ESTERA_EXPLAINED } from "./esteraOverlay.js"
export { IOV_EXPLAINED } from "./iovOverlay.js"
export { PSALMI_EXPLAINED } from "./psalmiOverlay.js"
export { PROVERBE_EXPLAINED } from "./proverbeOverlay.js"
export { ECLESIASTUL_EXPLAINED } from "./eclesiastulOverlay.js"
export { CANTAREA_CANTARILOR_EXPLAINED } from "./cantareaCantarilorOverlay.js"
export { ISAIA_EXPLAINED } from "./isaiaOverlay.js"
export { IEREMIA_EXPLAINED } from "./ieremiaOverlay.js"
export { PLANGERILE_EXPLAINED } from "./plangerileOverlay.js"
export { EZECHIEL_EXPLAINED } from "./ezechielOverlay.js"
export { DANIEL_EXPLAINED } from "./danielOverlay.js"
export { OSEA_EXPLAINED } from "./oseaOverlay.js"
export { IOEL_EXPLAINED } from "./ioelOverlay.js"
export { AMOS_EXPLAINED } from "./amosOverlay.js"
export { OBADIA_EXPLAINED } from "./obadiaOverlay.js"
export { IONA_EXPLAINED } from "./ionaOverlay.js"
export { MICA_EXPLAINED } from "./micaOverlay.js"
export { NAUM_EXPLAINED } from "./naumOverlay.js"
export { HABACUC_EXPLAINED } from "./habacucOverlay.js"
export { TEFANIA_EXPLAINED } from "./tefaniaOverlay.js"
export { HAGAI_EXPLAINED } from "./hagaiOverlay.js"
export { ZAHARIA_EXPLAINED } from "./zahariaOverlay.js"
export { MALEAHI_EXPLAINED } from "./maleahiOverlay.js"

// Variantele complete păstrează unitățile doctrinare Poonen și completează strict
// intervalele rămase cu explicație textuală din Biblia Emanus, fără doctrină nouă.
export {
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
  VT_EXPLAINED_FULL_OVERLAYS,
} from "./fullCoverage.js"

import { VT_EXPLAINED_FULL_OVERLAYS } from "./fullCoverage.js"

/**
 * Registry canonic pentru Biblia explicată VT.
 * Toate cele 29 de cărți care folosesc overlay au acoperire completă a
 * intervalelor de versete. Cele 10 cărți legacy-full sunt validate separat.
 */
export const VT_EXPLAINED_OVERLAYS = VT_EXPLAINED_FULL_OVERLAYS

if (VT_EXPLAINED_OVERLAYS.length !== 29) {
  throw new Error(`[Biblia explicată VT] se așteptau 29 de cărți overlay complete, găsite ${VT_EXPLAINED_OVERLAYS.length}.`)
}
