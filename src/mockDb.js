// src/mockDb.js

// Echipe (TEAMS)
export const TEAMS = [
  {
    id: 1,
    name: "Familia Vaduva",
    type: "Family",
    members: [1, 3],
    courses: [1, 3]
  },
  {
    id: 2,
    name: "Solo Ancore",
    type: "Single",
    members: [2],
    courses: [2]
  },
  {
    id: 3,
    name: "Kids Club",
    type: "Kids",
    members: [4],
    courses: [4]
  }
];

// Categorii de cursuri
export const COURSE_CATEGORIES = [
  "copii", "adolescent", "single", "sot", "sotie", "parinte", "bunici"
];

// Cursuri (poți adăuga câte vrei!)
export const COURSES = [
  {
    id: 1,
    title: "Studiu Evanghelie după Ioan",
    category: "Adolescent",
    lessons: 10,
    cover: "https://images.unsplash.com/photo-1464983953574-0892a716854b?fit=crop&w=600&q=80",
    icon: "https://cdn-icons-png.flaticon.com/512/616/616494.png",
    description: "Descoperă adevărurile din Evanghelia după Ioan, pas cu pas."
  },
  {
    id: 2,
    title: "Viața lui Isus",
    category: "Copii",
    lessons: 8,
    cover: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?fit=crop&w=600&q=80",
    icon: "https://cdn-icons-png.flaticon.com/512/616/616494.png",
    description: "Explorează viața și minunile Mântuitorului."
  },
  {
    id: 4,
    title: "Pilde pentru copii",
    lessons: 4,
    category: "copii"
  },
  {
    id: 5,
    title: "Puterea rugăciunii în cuplu",
    lessons: 6,
    category: "cuplu"
  },
  {
    id: 6,
    title: "Înțelepciune pentru bunici",
    lessons: 3,
    category: "bunici"
  },
  {
    id: 7,
    title: "Viața de familie - pentru soți",
    lessons: 7,
    category: "sot"
  },
  {
    id: 8,
    title: "Viața de familie - pentru soții",
    lessons: 7,
    category: "sotie"
  }
];

// (Opțional) Poți adăuga și export pentru users și plans dacă le mai folosești
export const USERS = [
  {
    id: 1,
    name: "Daniel Vaduva",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    email: "daniel@example.com",
    plan: "Family",
    teamId: 1,
    notifications: [
      { id: 101, read: false, message: "Bun venit pe platformă!" },
      { id: 102, read: false, message: "Ai un nou studiu biblic programat azi." }
    ],
    progress: [
      { courseId: 1, completed: 7, total: 10 },
      { courseId: 2, completed: 3, total: 8 }
    ]
  },
  // ... alți useri demo
];

// Planuri (pentru referință)
export const PLANS = [
  { key: "Family", label: "Family" },
  { key: "Single", label: "Single" },
  { key: "Couples", label: "Couples" },
  { key: "Kids", label: "Kids" }
];
