import {
  LIBRARY_LESSONS,
} from "../packages/shared/dist/library/current.js"
import {
  loadLibraryCourseLessons,
} from "../packages/shared/dist/library/loaders.js"

const expectedByCourse = new Map()
for (const lesson of LIBRARY_LESSONS) {
  const ids = expectedByCourse.get(lesson.courseId) ?? []
  ids.push(lesson.id)
  expectedByCourse.set(lesson.courseId, ids)
}

const errors = []
for (const [courseId, expectedIds] of expectedByCourse) {
  const loaded = await loadLibraryCourseLessons(courseId)
  const actualIds = loaded.map((lesson) => lesson.id)
  if (JSON.stringify(actualIds) !== JSON.stringify(expectedIds)) {
    errors.push(
      `${courseId}: așteptat [${expectedIds.join(", ")}], primit [${actualIds.join(", ")}]`,
    )
  }
}

if (errors.length > 0) {
  console.error("Loader-ele locale ale bibliotecii nu acoperă catalogul:")
  for (const error of errors) console.error(`- ${error}`)
  process.exitCode = 1
} else {
  console.log(
    `Loader-e bibliotecă valide: ${expectedByCourse.size} cursuri, ${LIBRARY_LESSONS.length} lecții.`,
  )
}
