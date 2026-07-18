import { COURSES, getCourseBySlug } from "./data/courses";

test("platform has seeded courses", () => {
  expect(COURSES.length).toBeGreaterThan(0);
});

test("can resolve a course by slug", () => {
  const course = getCourseBySlug("gods-judgment-good-news-or-bad-news");
  expect(course?.title).toMatch(/God/i);
});
