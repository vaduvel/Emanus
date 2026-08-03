import { useSyncExternalStore } from "react"
import { getBiblePersonalSnapshot, subscribeBiblePersonal } from "./biblePersonal"

export function useBiblePersonal() {
  return useSyncExternalStore(subscribeBiblePersonal, getBiblePersonalSnapshot)
}
