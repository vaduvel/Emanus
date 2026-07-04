// Tipuri pentru comunitate (workbook §16.5). Vederea include autorul (anonim).
export interface CommunityAuthor {
  anonName: string
  avatar: string
}

export interface CommunityPostView {
  id: string
  userId: string
  author: CommunityAuthor
  categoryId: string
  body: string
  createdAt: string
  status: "visible" | "pending" | "removed"
}

export const MAX_POST_LENGTH = 500
