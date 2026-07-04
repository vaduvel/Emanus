import { PrismaClient } from "@prisma/client"

// Singleton Prisma. Conexiunea e lazy — nu lovește DB-ul până la prima interogare.
export const prisma = new PrismaClient()
