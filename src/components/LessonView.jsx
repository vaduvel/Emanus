
import React from "react";
import ziuaInchinareLesson from "../lessons/ziuaInchinare";

const LessonView = () => {
  const lesson = ziuaInchinareLesson.lesson;

  return (
    <div style={{ padding: 24 }}>
      <h1>{lesson.title || "Lecția fără titlu"}</h1>
      {lesson.description && <p>{lesson.description}</p>}

      <div>
        {lesson.steps.map((step, idx) => (
          <div key={idx} style={{ marginBottom: 24 }}>
            {step.type === "botMessage" && (
              <div>
                <strong>Mesaj:</strong> {step.content}
              </div>
            )}
            {step.type === "trueFalse" && (
              <div>
                <strong>{step.prompt}</strong>
                <br />
                <em>Răspuns corect: {step.answer}</em>
              </div>
            )}
            {step.type === "application" && (
              <div style={{ background: "#e0f2f1", padding: 12 }}>
                <strong>Aplicație:</strong> {step.content}
              </div>
            )}
            {step.type === "encouragement" && (
              <div style={{ background: "#fffde7", padding: 12 }}>
                <strong>Încurajare:</strong> {step.content}
              </div>
            )}
            {/* Adaugă și alte tipuri după nevoie */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonView;
