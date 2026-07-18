import { ziuaInchinareLesson } from "../lessons/ziuaInchinare";

export const LESSON_SCRIPTS = {
  ziuaInchinare: ziuaInchinareLesson,
};

export function getLessonScript(scriptKey) {
  if (!scriptKey) {
    return [];
  }

  return LESSON_SCRIPTS[scriptKey] || [];
}
