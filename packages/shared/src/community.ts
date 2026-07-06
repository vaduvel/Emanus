// Tipuri pentru comunitate (workbook §16.5). Vederea include autorul (anonim).
export interface CommunityAuthor {
  anonName: string
  avatar: string
}

// Un post obișnuit vs. o cerere de rugăciune (docs/00-DIRECTIE: comunitate care se roagă).
export type CommunityPostKind = "post" | "prayer_request"

export interface CommunityPostView {
  id: string
  userId: string
  author: CommunityAuthor
  categoryId: string
  body: string
  /** Tipul postului. Cererile de rugăciune apar în feed ca „[user] a cerut rugăciune”. */
  kind: CommunityPostKind
  /** Câte persoane s-au rugat (cumulativ). Relevant pentru prayer_request. */
  prayCount: number
  createdAt: string
  status: "visible" | "pending" | "removed"
}

export const MAX_POST_LENGTH = 500
