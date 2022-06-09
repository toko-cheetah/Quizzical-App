import React from "react";
import { nanoid } from "nanoid";

export default function Questions({
  question,
  correctAnswer,
  incorrectAnswers,
  correctId,
}) {
  const answersArray = [...incorrectAnswers];
  const randomNumber = Math.floor(Math.random() * answersArray.length);
  answersArray.splice(randomNumber, 0, correctAnswer);

  const answers = answersArray.map((item) => (
    <button
      key={nanoid()}
      onClick={selected}
      value={item}
      id={correctId(item)}
      marked=""
    >
      {item
        .slice(0, -1)
        .replaceAll(
          /&#039;|&rsquo;|&amp;|\//g,
          (replace) =>
            ({ "&#039;": "'", "&rsquo;": "'", "&amp;": "&", "/": " / " }[
              replace
            ])
        )}
    </button>
  ));

  function selected(event) {
    const ev = event.target;
    ev.marked = ev.marked ? undefined : true;
    ev.style.background = ev.marked ? "#D6DBF5" : "inherit";

    answersArray.map((item) => {
      const el = document.getElementById(correctId(item));
      return (
        item !== ev.value &&
        ((el.style.background = "inherit"), (el.marked = undefined))
      );
    });
  }

  return (
    <div className="questions">
      <h3>{question}</h3>
      <div className="answers">{answers}</div>
    </div>
  );
}
