import type { Lesson, LessonStep } from "../domain.js"

export interface ConversationBranch {
  label: string
  response: string
}

export interface ConversationQuiz {
  question: string
  correct: string
  wrong: [string, string]
  explanation: string
}

export interface ConversationMultiChoice {
  prompt: string
  options: string[]
}

export interface ConversationLessonInput {
  id: string
  courseId: string
  order: number
  title: string
  minutes?: number
  refs: string[]
  memoryRef: string
  memoryText: string
  hook: string[]
  choicePrompt: string
  branches: [ConversationBranch, ConversationBranch, ConversationBranch]
  scriptureRef: string
  scriptureText: string
  truth: string[]
  quiz: ConversationQuiz
  multiChoice?: ConversationMultiChoice
  action: string
  journal: string
  prayer: string
  declaration?: string
}

function guide(...text: string[]) {
  return text.map((line) => ({ from: "guide" as const, text: line }))
}

function optionId(lessonId: string, index: number): string {
  return `${lessonId}__choice_${index + 1}`
}

export function conversationLesson(input: ConversationLessonInput): Lesson {
  const branchSteps: LessonStep[] = input.branches.map((branch, index) => ({
    id: `${input.id}__branch_${index + 1}`,
    type: "how_god_helps",
    order: 201 + index,
    bubbles: guide(branch.response),
  }))
  const steps: LessonStep[] = [
    {
      id: `${input.id}__hook`,
      type: "hook",
      order: 1,
      bubbles: guide(...input.hook),
    },
    {
      id: `${input.id}__choice`,
      type: "choice",
      order: 2,
      choice: {
        prompt: input.choicePrompt,
        options: input.branches.map((branch, index) => ({
          id: optionId(input.id, index),
          label: branch.label,
          branchStepId: branchSteps[index]?.id,
        })),
      },
    },
    ...branchSteps,
    {
      id: `${input.id}__scripture`,
      type: "scripture",
      order: 3,
      scripture: { text: input.scriptureText, ref: input.scriptureRef },
    },
    {
      id: `${input.id}__truth`,
      type: "truth_simple",
      order: 4,
      bubbles: guide(...input.truth),
    },
    {
      id: `${input.id}__quiz`,
      type: "quiz",
      order: 5,
      quiz: {
        question: input.quiz.question,
        options: [
          { text: input.quiz.wrong[0], correct: false },
          { text: input.quiz.correct, correct: true },
          { text: input.quiz.wrong[1], correct: false },
        ],
        explanation: input.quiz.explanation,
      },
    },
  ]

  if (input.multiChoice) {
    steps.push({
      id: `${input.id}__multi`,
      type: "multi_choice",
      order: 6,
      multiChoice: {
        prompt: input.multiChoice.prompt,
        options: input.multiChoice.options.map((label, index) => ({
          id: `${input.id}__multi_${index + 1}`,
          label,
        })),
        minSelections: 1,
        maxSelections: input.multiChoice.options.length,
      },
    })
  }

  steps.push(
    {
      id: `${input.id}__action`,
      type: "step",
      order: 7,
      bubbles: guide(input.action),
    },
    {
      id: `${input.id}__journal`,
      type: "journal",
      order: 8,
      journalPrompt: input.journal,
    },
    {
      id: `${input.id}__prayer`,
      type: "prayer",
      order: 9,
      bubbles: guide(input.prayer),
    },
    {
      id: `${input.id}__memory`,
      type: "memory_verse",
      order: 10,
      scripture: { text: input.memoryText, ref: input.memoryRef },
    },
  )

  if (input.declaration) {
    steps.push({
      id: `${input.id}__declaration`,
      type: "declaration",
      order: 11,
      response: {
        prompt: input.declaration,
        placeholder: "Scrie numai ceea ce poți spune sincer…",
      },
    })
  }

  return {
    id: input.id,
    courseId: input.courseId,
    order: input.order,
    title: input.title,
    estMinutes: input.minutes ?? 12,
    anchorRefs: input.refs,
    memoryVerseRef: input.memoryRef,
    steps,
  }
}
