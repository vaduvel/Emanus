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

import { JUDECATORI_EXPLAINED } from "./judecatoriOverlay.js"
import { IMPARATI2_EXPLAINED } from "./imparati2Overlay.js"
import { CRONICI1_EXPLAINED } from "./cronici1Overlay.js"
import { CRONICI2_EXPLAINED } from "./cronici2Overlay.js"
import { EZRA_EXPLAINED } from "./ezraOverlay.js"
import { NEEMIA_EXPLAINED } from "./neemiaOverlay.js"
import { ESTERA_EXPLAINED } from "./esteraOverlay.js"
import { IOV_EXPLAINED } from "./iovOverlay.js"
import { PSALMI_EXPLAINED } from "./psalmiOverlay.js"
import { PROVERBE_EXPLAINED } from "./proverbeOverlay.js"
import { ECLESIASTUL_EXPLAINED } from "./eclesiastulOverlay.js"
import { CANTAREA_CANTARILOR_EXPLAINED } from "./cantareaCantarilorOverlay.js"
import { ISAIA_EXPLAINED } from "./isaiaOverlay.js"
import { IEREMIA_EXPLAINED } from "./ieremiaOverlay.js"
import { PLANGERILE_EXPLAINED } from "./plangerileOverlay.js"
import { EZECHIEL_EXPLAINED } from "./ezechielOverlay.js"
import { DANIEL_EXPLAINED } from "./danielOverlay.js"
import { OSEA_EXPLAINED } from "./oseaOverlay.js"
import { IOEL_EXPLAINED } from "./ioelOverlay.js"
import { AMOS_EXPLAINED } from "./amosOverlay.js"
import { OBADIA_EXPLAINED } from "./obadiaOverlay.js"
import { IONA_EXPLAINED } from "./ionaOverlay.js"
import { MICA_EXPLAINED } from "./micaOverlay.js"
import { NAUM_EXPLAINED } from "./naumOverlay.js"
import { HABACUC_EXPLAINED } from "./habacucOverlay.js"
import { TEFANIA_EXPLAINED } from "./tefaniaOverlay.js"
import { HAGAI_EXPLAINED } from "./hagaiOverlay.js"
import { ZAHARIA_EXPLAINED } from "./zahariaOverlay.js"
import { MALEAHI_EXPLAINED } from "./maleahiOverlay.js"

export const VT_EXPLAINED_OVERLAYS = [
  JUDECATORI_EXPLAINED,
  IMPARATI2_EXPLAINED,
  CRONICI1_EXPLAINED,
  CRONICI2_EXPLAINED,
  EZRA_EXPLAINED,
  NEEMIA_EXPLAINED,
  ESTERA_EXPLAINED,
  IOV_EXPLAINED,
  PSALMI_EXPLAINED,
  PROVERBE_EXPLAINED,
  ECLESIASTUL_EXPLAINED,
  CANTAREA_CANTARILOR_EXPLAINED,
  ISAIA_EXPLAINED,
  IEREMIA_EXPLAINED,
  PLANGERILE_EXPLAINED,
  EZECHIEL_EXPLAINED,
  DANIEL_EXPLAINED,
  OSEA_EXPLAINED,
  IOEL_EXPLAINED,
  AMOS_EXPLAINED,
  OBADIA_EXPLAINED,
  IONA_EXPLAINED,
  MICA_EXPLAINED,
  NAUM_EXPLAINED,
  HABACUC_EXPLAINED,
  TEFANIA_EXPLAINED,
  HAGAI_EXPLAINED,
  ZAHARIA_EXPLAINED,
  MALEAHI_EXPLAINED,
] as const

if (VT_EXPLAINED_OVERLAYS.length !== 29) {
  throw new Error(`[Biblia explicată VT] se așteptau 29 de cărți overlay, găsite ${VT_EXPLAINED_OVERLAYS.length}.`)
}
