export interface DoorEntrySelection {
  lessonId: string
  stepId: string
  optionId: string
}

/**
 * Alegerea editorială inițială pentru fiecare ușă.
 * Ușa este o propoziție deja aleasă de om; playerul nu trebuie să o întrebe din nou.
 */
export const DOOR_ENTRY_OPTIONS: Record<string, DoorEntrySelection> = {
  rusine: { lessonId: "rusine_l1", stepId: "r1_3", optionId: "r1c_c" },
  avort: { lessonId: "rusine_l5", stepId: "r5_ownership", optionId: "r5_own_action" },
  infidelitate: { lessonId: "rusine_l5", stepId: "r5_ownership", optionId: "r5_own_action" },
  prea_departe: { lessonId: "rusine_l1", stepId: "r1_3", optionId: "r1c_b" },
  neiertare: { lessonId: "neiertare_o1", stepId: "o1_context", optionId: "o1_context_harm" },
  divort: { lessonId: "neiertare_o1", stepId: "o1_context", optionId: "o1_context_divorce" },
  doliu: { lessonId: "suferinta_l1", stepId: "sf1_focus", optionId: "sf1_loss" },
  boala: { lessonId: "suferinta_l1", stepId: "sf1_focus", optionId: "sf1_illness" },
  de_ce_permis: { lessonId: "suferinta_l1", stepId: "sf1_focus", optionId: "sf1_why" },
  indoiala: { lessonId: "doctrina_l1", stepId: "d1_entry", optionId: "d1_entry_exists" },
  biblia_inventata: { lessonId: "doctrina_l1", stepId: "d1_entry", optionId: "d1_entry_bible" },
  alte_credinte: { lessonId: "doctrina_l1", stepId: "d1_entry", optionId: "d1_entry_beliefs" },
  perete: { lessonId: "aproape_l1", stepId: "a1_3", optionId: "a1c_a" },
  nu_inteleg: { lessonId: "aproape_l1", stepId: "a1_3", optionId: "a1c_c" },
  uscaciune: { lessonId: "aproape_l1", stepId: "a1_3", optionId: "a1c_b" },
  flacara: { lessonId: "aproape_l1", stepId: "a1_3", optionId: "a1c_b" },
  cum_citesc: { lessonId: "aproape_l1", stepId: "a1_3", optionId: "a1c_c" },
  dependenta: { lessonId: "schimbare_l1", stepId: "s1_3", optionId: "s1c_a" },
  anxietate: { lessonId: "schimbare_l1", stepId: "s1_3", optionId: "s1c_b" },
  recadere: { lessonId: "schimbare_l1", stepId: "s1_3", optionId: "s1c_a" },
  pornografie: { lessonId: "schimbare_l1", stepId: "s1_3", optionId: "s1c_a" },
  tristete: { lessonId: "schimbare_l1", stepId: "s1_3", optionId: "s1c_b" },
  furie: { lessonId: "schimbare_l1", stepId: "s1_3", optionId: "s1c_c" },
  merit: { lessonId: "har_l1", stepId: "h1_3", optionId: "h1c_a" },
  obisnuinta: { lessonId: "har_l1", stepId: "h1_3", optionId: "h1c_b" },
  frica_pedeapsa: { lessonId: "har_l1", stepId: "h1_3", optionId: "h1c_c" },
  epuizat_slujire: { lessonId: "har_l1", stepId: "h1_3", optionId: "h1c_d" },
  singuratate: { lessonId: "impreuna_l1", stepId: "im1_3", optionId: "im1c_a" },
  familie_respinge: { lessonId: "impreuna_l1", stepId: "im1_3", optionId: "im1c_b" },
  respins_biserica: { lessonId: "impreuna_l1", stepId: "im1_3", optionId: "im1c_c" },
  nou_venit: { lessonId: "impreuna_l1", stepId: "im1_3", optionId: "im1c_a" },
}
