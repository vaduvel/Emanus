// Carduri pentru tăcerea lui Dumnezeu: „de ce a îngăduit” și „mă rog și nu simt
// nimic” (docs/41 §3).
//
// REGULA (docs/00-DIRECTIE §7, D-005): fiecare `body` este parafraza unui
// verset REAL, iar `verseRef` apare pe card, la vedere.
//
// REGULĂ DE TON, cea mai grea din tot fișierul (docs/41 §6.4): aici NU se dă
// răspuns la „de ce”. Dumnezeu nu i-a dat lui Iov unul. Cardul nu încearcă să
// fie mai lămuritor decât Scriptura. Jumătate din carduri se scriu din Psalmii
// de plângere și din Habacuc, ca omul să vadă că întrebarea lui e deja în
// Cartea lui Dumnezeu — și că nu a fost mustrat cine a pus-o.
//
// Ce NU se scrie niciodată aici: „totul se întâmplă cu un rost”, „Dumnezeu avea
// nevoie de el în cer”, „dacă ai fi avut destulă credință”. Niciuna din cele
// trei nu e din Biblie și toate trei rup omul de Dumnezeu.
//
// `verseText` este fraza-cheie, nu versetul întreg (docs/39).
// DE COLAȚIONAT: versetele nu au trecut încă prin citirea de om (docs/41 §6.6).
import type { MessageCard } from "./messageCards.js"

/** De ce a îngăduit Dumnezeu. */
export const CARDS_DE_CE: MessageCard[] = [
  {
    id: "msg_pentru_ce_m_ai_parasit",
    title: "Ce îți spune Dumnezeu astăzi, din Cuvântul Său:",
    body: "«Pentru ce m-ai părăsit?» Strigătul acesta a fost strigat și de pe cruce.",
    verseRef: "Psalmul 22:1",
    verseText: "Dumnezeule! Dumnezeule! Pentru ce m-ai părăsit?",
    axis: "emotional_peace",
    needs: ["de_ce", "rugaciune_fara_raspuns", "doliu"],
    background: "pergament-umbra",
  },
  {
    id: "msg_pana_cand_voi_striga",
    title: "Ce îți spune Dumnezeu astăzi, din Cuvântul Său:",
    body: "Habacuc a strigat «până când?» Și nu a fost mustrat pentru asta.",
    verseRef: "Habacuc 1:2",
    verseText: "Până când voi striga către Tine, Doamne, fără s-ascultoș ti?",
    axis: "living_faith",
    needs: ["de_ce", "rugaciune_fara_raspuns"],
    background: "pergament-umbra",
  },
  {
    id: "msg_iov_nu_a_primit_explicatie",
    title: "Ce îți spune Dumnezeu astăzi, din Cuvântul Său:",
    body: "Iov nu a primit o lămurire. A primit o întâlnire.",
    verseRef: "Iov 42:5",
    verseText: "Urechea mea auzise vorbindu-se de Tine, dar acum ochiul meu Te-a văzut.",
    axis: "living_faith",
    needs: ["de_ce"],
    background: "pergament",
  },
  {
    id: "msg_gandurile_Mele_nu_sunt",
    title: "Dumnezeu ți-a spus deja:",
    body: "Gândurile Mele nu sunt gândurile voastre și căile Mele nu sunt căile voastre.",
    verseRef: "Isaia 55:8-9",
    verseText: "Căci gândurile Mele nu sunt gândurile voastre și căile voastre nu sunt căile Mele.",
    axis: "living_faith",
    needs: ["de_ce", "fara_directie"],
    background: "pergament",
  },
  {
    id: "msg_lucrurile_ascunse",
    title: "Dumnezeu ți-a spus deja:",
    body: "Lucrurile ascunse sunt ale Mele. Cele descoperite sunt ale tale.",
    verseRef: "Deuteronomul 29:29",
    verseText: "Lucrurile ascunse sunt ale Domnului Dumnezeului nostru, iar lucrurile descoperite sunt ale noastre.",
    axis: "living_faith",
    needs: ["de_ce"],
    background: "pergament",
  },
  {
    id: "msg_nici_omul_nici_parintii",
    title: "Ce îți spune Dumnezeu astăzi, din Cuvântul Său:",
    body: "Nu tot ce doare este pedeapsă. Nu căuta vinovatul acolo unde nu este.",
    verseRef: "Ioan 9:3",
    verseText: "N-a păcătuit nici omul acesta, nici părinții lui.",
    axis: "freedom",
    needs: ["de_ce", "boala", "vinovat"],
    background: "pergament",
  },
  {
    id: "msg_turnul_din_siloam",
    title: "Ce îți spune Dumnezeu astăzi, din Cuvântul Său:",
    body: "Cei peste care a căzut turnul nu erau mai vinovați. Am spus-o limpede.",
    verseRef: "Luca 13:4-5",
    verseText: "Credeți că au fost mai păcătoși decât toți ceilalți oameni? Eu vă spun: nu.",
    axis: "freedom",
    needs: ["de_ce", "doliu"],
    background: "pergament",
  },
  {
    id: "msg_judecatile_nepatrunse",
    title: "Dumnezeu ți-a spus deja:",
    body: "Judecățile Mele sunt nepătrunse și căile Mele, de nepătruns.",
    verseRef: "Romani 11:33",
    verseText: "Cât de nepătrunse sunt judecățile Lui și cât de nențelese sunt căile Lui!",
    axis: "living_faith",
    needs: ["de_ce"],
    background: "pergament",
  },
  {
    id: "msg_ca_intr_o_oglinda",
    title: "Dumnezeu ți-a spus deja:",
    body: "Acum vezi ca într-o oglindă, în chip întunecos. Atunci vei cunoaște deplin.",
    verseRef: "1 Corinteni 13:12",
    verseText: "Acum vedem ca într-o oglindă, în chip întunecos; dar atunci vom vedea față în față.",
    axis: "living_faith",
    needs: ["de_ce", "in_asteptare"],
    background: "pergament",
  },
  {
    id: "msg_domnul_a_dat_domnul_a_luat",
    title: "Ce îți spune Dumnezeu astăzi, din Cuvântul Său:",
    body: "Poți spune, ca Iov: Domnul a dat, Domnul a luat.",
    verseRef: "Iov 1:21",
    verseText: "Domnul a dat și Domnul a luat, binecuvântat fie Numele Domnului!",
    axis: "character",
    needs: ["de_ce", "doliu"],
    background: "pergament-umbra",
  },
]

/** Mă rog și nu simt nimic. */
export const CARDS_RUGACIUNE_FARA_RASPUNS: MessageCard[] = [
  {
    id: "msg_psalmul_care_se_termina_in_intuneric",
    title: "Ce îți spune Dumnezeu astăzi, din Cuvântul Său:",
    body: "Este un psalm care se sfârșește în întuneric. E tot în Cartea Mea.",
    verseRef: "Psalmul 88:14",
    verseText: "Pentru ce, Doamne, lepezi sufletul meu? Pentru ce Îți ascunzi Fața de mine?",
    axis: "emotional_peace",
    needs: ["rugaciune_fara_raspuns", "singur"],
    background: "pergament-umbra",
  },
  {
    id: "msg_din_ziua_dintai",
    title: "Dumnezeu ți-a spus deja:",
    body: "Cuvintele tale au fost ascultate din ziua dintâi. Întârzierea n-a fost tăcere.",
    verseRef: "Daniel 10:12",
    verseText: "Cuvintele tale au fost ascultate din cea dintâi zi.",
    axis: "living_faith",
    needs: ["rugaciune_fara_raspuns", "in_asteptare"],
    background: "pergament-cald",
  },
  {
    id: "msg_suspine_negraite",
    title: "Dumnezeu ți-a spus deja:",
    body: "Când nu știi cum să te rogi, Duhul mijlocește pentru tine cu suspine negrăite.",
    verseRef: "Romani 8:26",
    verseText: "Însăși Duhul mijlocește pentru noi cu suspine negrăite.",
    axis: "living_faith",
    needs: ["rugaciune_fara_raspuns", "obosit"],
    background: "pergament-cald",
  },
  {
    id: "msg_sa_se_roage_necurmat",
    title: "Dumnezeu ți-a spus deja:",
    body: "Roagă-te necurmat și nu te lăsa.",
    verseRef: "Luca 18:1",
    verseText: "Trebuie să se roage necurmat și să nu se lase.",
    axis: "living_faith",
    needs: ["rugaciune_fara_raspuns", "in_asteptare"],
    background: "pergament",
  },
  {
    id: "msg_cand_strigi_aud",
    title: "Dumnezeu ți-a spus deja:",
    body: "Când strigi, aud. Și te scap din toate necazurile tale.",
    verseRef: "Psalmul 34:17",
    verseText: "Când strigă cei fără prihană, Domnul aude și-i scapă din toate necazurile lor.",
    axis: "emotional_peace",
    needs: ["rugaciune_fara_raspuns", "speriat"],
    background: "pergament",
  },
  {
    id: "msg_si_Eu_astept",
    title: "Dumnezeu ți-a spus deja:",
    body: "Și Eu aștept. Aștept să Mă milostivesc de tine.",
    verseRef: "Isaia 30:18",
    verseText: "Totuși Domnul așteaptă să Se milostivească de voi.",
    axis: "living_faith",
    needs: ["rugaciune_fara_raspuns", "in_asteptare"],
    background: "pergament-cald",
  },
  {
    id: "msg_paharul_acesta",
    title: "Ce îți spune Dumnezeu astăzi, din Cuvântul Său:",
    body: "Am cerut și Eu ca paharul să treacă. Răspunsul n-a fost cel cerut.",
    verseRef: "Matei 26:39",
    verseText: "Tată, dacă este cu putință, depărtează de la Mine paharul acesta!",
    axis: "emotional_peace",
    needs: ["rugaciune_fara_raspuns", "de_ce"],
    background: "pergament-umbra",
  },
  {
    id: "msg_de_trei_ori_am_rugat",
    title: "Ce îți spune Dumnezeu astăzi, din Cuvântul Său:",
    body: "Pavel a cerut de trei ori. A primit alt răspuns — nu niciun răspuns.",
    verseRef: "2 Corinteni 12:8-9",
    verseText: "De trei ori am rugat pe Domnul să mi-l ia... Harul Meu îți este de ajuns.",
    axis: "character",
    needs: ["rugaciune_fara_raspuns", "boala"],
    background: "pergament",
  },
  {
    id: "msg_s_a_plecat_spre_mine",
    title: "Ce îți spune Dumnezeu astăzi, din Cuvântul Său:",
    body: "Am așteptat cu răbdare — și El S-a plecat spre mine.",
    verseRef: "Psalmul 40:1",
    verseText: "Îmi pusesem nădejdea în Domnul, și El S-a plecat spre mine, mi-a ascultat strigătele.",
    axis: "living_faith",
    needs: ["rugaciune_fara_raspuns", "in_asteptare"],
    background: "pergament",
  },
  {
    id: "msg_nespus_mai_mult",
    title: "Dumnezeu ți-a spus deja:",
    body: "Pot să fac nespus mai mult decât ceri sau gândești.",
    verseRef: "Efeseni 3:20",
    verseText: "Iar a Celui ce poate să facă nespus mai mult decât cerem sau gândim.",
    axis: "living_faith",
    needs: ["rugaciune_fara_raspuns", "in_asteptare"],
    background: "pergament-cald",
  },
]

export const MESSAGE_CARDS_TACERE: MessageCard[] = [
  ...CARDS_DE_CE,
  ...CARDS_RUGACIUNE_FARA_RASPUNS,
]
