import { CATEGORY_CONFIGS, teensM1C1 } from "@emanus/shared"
import { PrismaClient } from "@prisma/client"

// Populează Supabase cu categoriile (din config) + conținutul seed (adolescenți M1 C1).
// Idempotent (upsert): se poate rula de mai multe ori.
const prisma = new PrismaClient()

async function main() {
  for (const c of Object.values(CATEGORY_CONFIGS)) {
    await prisma.category.upsert({
      where: { id: c.id as any },
      update: { name: c.name, ageRange: c.ageRange, dominantFormat: c.dominantFormat, config: c.config as any },
      create: { id: c.id as any, name: c.name, ageRange: c.ageRange, dominantFormat: c.dominantFormat, config: c.config as any },
    })
  }

  const { module: mod, course, lessons } = teensM1C1

  await prisma.module.upsert({
    where: { id: mod.id },
    update: { categoryId: mod.categoryId as any, order: mod.order, title: mod.title, axis: mod.axis as any, unlockRule: (mod.unlockRule ?? null) as any },
    create: { id: mod.id, categoryId: mod.categoryId as any, order: mod.order, title: mod.title, axis: mod.axis as any, unlockRule: (mod.unlockRule ?? null) as any },
  })

  await prisma.course.upsert({
    where: { id: course.id },
    update: { moduleId: course.moduleId, order: course.order, title: course.title, struggle: course.struggle, truth: course.truth },
    create: { id: course.id, moduleId: course.moduleId, order: course.order, title: course.title, struggle: course.struggle, truth: course.truth },
  })

  for (const l of lessons) {
    await prisma.lesson.upsert({
      where: { id: l.id },
      update: { courseId: l.courseId, order: l.order, title: l.title, estMinutes: l.estMinutes, anchorRefs: l.anchorRefs, memoryVerseRef: l.memoryVerseRef, badgeId: l.badgeId ?? null, steps: l.steps as any },
      create: { id: l.id, courseId: l.courseId, order: l.order, title: l.title, estMinutes: l.estMinutes, anchorRefs: l.anchorRefs, memoryVerseRef: l.memoryVerseRef, badgeId: l.badgeId ?? null, steps: l.steps as any },
    })
  }

  console.log("Seed complet: 7 categorii + adolescenți M1 C1 (6 lecții).")
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
