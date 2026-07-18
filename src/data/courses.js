export const AUDIENCES = [
  { key: "all", label: "Toate traseele" },
  { key: "copii", label: "Copii" },
  { key: "adolescenti", label: "Adolescenți" },
  { key: "studenti", label: "Studenți" },
  { key: "profesionisti", label: "Profesioniști" },
  { key: "familie", label: "Soț/Soție & Părinți" },
  { key: "bunici", label: "Bunici" },
  { key: "convertiti", label: "Convertiți recent" },
  { key: "cautatori", label: "Căutători" },
];

export const COURSES = [
  {
    id: "gods-judgment-good-news-or-bad-news",
    slug: "gods-judgment-good-news-or-bad-news",
    title: "God’s Judgment: Good News or Bad News?",
    category: "Doctrină biblică",
    audience: "cautatori",
    level: "Foundations",
    priceType: "Free",
    lessonsCount: 4,
    durationMinutes: 26,
    cardImage: "/CoursesImg/img6.jpg",
    heroImage: "/CoursesImg/img7.jpg",
    about:
      "Mulți oameni se tem de judecata lui Dumnezeu. Cursul explică ce este judecata, când are loc și de ce poate fi o veste bună pentru cei care Îl caută sincer pe Hristos.",
    highlights: [
      "Înțelegi natura judecății divine și contextul biblic",
      "Înveți să citești profețiile despre timp fără confuzie",
      "Primești un cadru clar pentru speranță, nu frică",
    ],
    lessons: [
      {
        id: "1",
        title: "An Ancient Prophecy",
        durationMinutes: 7,
        image: "/CoursesImg/img2.jpg",
        locked: false,
        scriptKey: "ziuaInchinare",
      },
      {
        id: "2",
        title: "Calculating the Time",
        durationMinutes: 6,
        image: "/CoursesImg/img3.jpg",
        locked: true,
      },
      {
        id: "3",
        title: "The Messiah Foretold",
        durationMinutes: 4,
        image: "/CoursesImg/img4.jpg",
        locked: true,
      },
      {
        id: "4",
        title: "What Does It Mean for Us?",
        durationMinutes: 9,
        image: "/CoursesImg/img5.jpg",
        locked: true,
      },
    ],
  },
  {
    id: "dumnezeu-mi-a-dat-familia",
    slug: "dumnezeu-mi-a-dat-familia",
    title: "Dumnezeu mi-a dat familia",
    category: "Creștere în familie",
    audience: "copii",
    level: "Kids",
    priceType: "Free",
    lessonsCount: 5,
    durationMinutes: 18,
    cardImage: "/CoursesImg/img1.jpg",
    heroImage: "/CoursesImg/img.jpg",
    about:
      "Un traseu pentru copii despre identitate, ascultare și recunoștință în familie, cu versete, aplicații simple și exerciții practice.",
    highlights: [
      "Copilul înțelege că familia este darul lui Dumnezeu",
      "Aplică adevăruri biblice în situații zilnice",
      "Încurajează comunicarea sănătoasă acasă",
    ],
    lessons: [
      {
        id: "1",
        title: "Familia e un dar",
        durationMinutes: 4,
        image: "/CoursesImg/img1.jpg",
        locked: false,
      },
      {
        id: "2",
        title: "Ascultarea care aduce pace",
        durationMinutes: 4,
        image: "/CoursesImg/img4.jpg",
        locked: true,
      },
      {
        id: "3",
        title: "Mulțumesc și te iert",
        durationMinutes: 3,
        image: "/CoursesImg/img5.jpg",
        locked: true,
      },
      {
        id: "4",
        title: "Tatăl ceresc nu mă lasă singur",
        durationMinutes: 3,
        image: "/CoursesImg/img6.jpg",
        locked: true,
      },
      {
        id: "5",
        title: "Provocarea săptămânii",
        durationMinutes: 4,
        image: "/CoursesImg/img2.jpg",
        locked: true,
      },
    ],
  },
  {
    id: "puterea-rugaciunii-in-cuplu",
    slug: "puterea-rugaciunii-in-cuplu",
    title: "Puterea rugăciunii în cuplu",
    category: "Viață de cuplu",
    audience: "familie",
    level: "Applied",
    priceType: "Free",
    lessonsCount: 6,
    durationMinutes: 32,
    cardImage: "/CoursesImg/img2.jpg",
    heroImage: "/CoursesImg/img6.jpg",
    about:
      "Un parcurs pentru soț și soție despre rugăciune, comunicare, iertare și unitate spirituală în deciziile de zi cu zi.",
    highlights: [
      "Rutine simple de rugăciune în doi",
      "Repararea conflictelor pe principii biblice",
      "Pași practici pentru creștere spirituală în familie",
    ],
    lessons: [
      {
        id: "1",
        title: "Fundația spirituală a familiei",
        durationMinutes: 8,
        image: "/CoursesImg/img2.jpg",
        locked: false,
      },
      {
        id: "2",
        title: "Comunicare curată în cuplu",
        durationMinutes: 6,
        image: "/CoursesImg/img3.jpg",
        locked: true,
      },
      {
        id: "3",
        title: "Iertarea care vindecă",
        durationMinutes: 5,
        image: "/CoursesImg/img4.jpg",
        locked: true,
      },
      {
        id: "4",
        title: "Plan spiritual comun",
        durationMinutes: 5,
        image: "/CoursesImg/img5.jpg",
        locked: true,
      },
      {
        id: "5",
        title: "Roluri și responsabilități",
        durationMinutes: 4,
        image: "/CoursesImg/img6.jpg",
        locked: true,
      },
      {
        id: "6",
        title: "Provocare practică",
        durationMinutes: 4,
        image: "/CoursesImg/img7.jpg",
        locked: true,
      },
    ],
  },
];

export function getCourseBySlug(slug) {
  return COURSES.find((course) => course.slug === slug);
}

export function getAudienceLabel(audienceKey) {
  return AUDIENCES.find((item) => item.key === audienceKey)?.label || "General";
}

export function getLessonById(course, lessonId) {
  return course?.lessons?.find((lesson) => String(lesson.id) === String(lessonId));
}
