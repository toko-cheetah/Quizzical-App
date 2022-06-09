import React from "react";

export default function Start({ start }) {
  return (
    <div id="start">
      <h1>Quizzical</h1>

      <p>5 Questions / Category: General / Difficulty: Hard</p>

      <button id="start-quiz" onClick={start}>
        Start quiz
      </button>
    </div>
  );
}
