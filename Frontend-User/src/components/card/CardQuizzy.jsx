import React from "react";

export default function CardQuizzy({ icon, title, content }) {
  return (
    <div className="quiz-card">
      <div className="quiz-card__icon">{icon}</div>
      <div className="quiz-card__title">{title}</div>
      <div className="quiz-card__content">{content}</div>
    </div>
  );
}
