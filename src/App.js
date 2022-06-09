import React, { useState, useEffect } from "react";
import "./App.css";
import Start from "./components/Start";
import Questions from "./components/Questions";
import { nanoid } from "nanoid";

export default function App() {
  const [questionsData, setQuestionsData] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [startGame, setStartGame] = useState(false);
  const [check, setCheck] = useState(false);
  const [score, setScore] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    try {
      fetch(
        "https://opentdb.com/api.php?amount=5&category=9&difficulty=hard&type=multiple"
      )
        .then((res) => res.json())
        .then((data) => setQuestionsData(data.results));
    } catch {
      alert("Something went wrong! Please, refresh the page!");
    }
  }, [count]);

  useEffect(() => {
    setQuestions(() => {
      return questionsData.map((obj, index) => {
        return (
          <Questions
            key={nanoid()}
            question={obj.question.replaceAll(
              /&#039;|&quot;/g,
              (replace) => ({ "&#039;": "'", "&quot;": '"' }[replace])
            )}
            correctAnswer={obj.correct_answer + index}
            incorrectAnswers={obj.incorrect_answers.map((item) => item + index)}
            correctId={correctId}
          />
        );
      });
    });
  }, [questionsData]);

  function checkAnswers() {
    trueFalse(setCheck);

    questionsData.map((obj, index) => {
      let markedCount = 0;

      const correct = document.getElementById(
        correctId(obj.correct_answer + index)
      );
      correct.style.background = "#94D7A2";
      correct.disabled = true;
      setScore((prev) => (correct.marked ? prev + 1 : prev));
      correct.marked && markedCount++;

      obj.incorrect_answers.map((item) => {
        const incorrect = document.getElementById(correctId(item + index));
        incorrect.style.opacity = 0.5;
        incorrect.style.background = incorrect.marked && "#F8BCBC";
        incorrect.disabled = true;
        return incorrect.marked && markedCount++;
      });

      return !markedCount && (correct.style.opacity = 0.5);
    });
  }

  function playAgain() {
    return (
      setQuestionsData([]),
      setCount((prev) => prev + 1),
      trueFalse(setCheck),
      setScore(0)
    );
  }

  function trueFalse(state) {
    return state((prev) => !prev);
  }

  function correctId(el) {
    return `id-${el.replace(/\s|\W/g, "").toLowerCase()}`;
  }

  return (
    <div id="app">
      {startGame ? (
        <div>
          {questions}

          {check ? (
            <div>
              <span id="score">You scored {score}/5 correct answers</span>
              <button className="check-restart" onClick={playAgain}>
                Play again
              </button>
            </div>
          ) : (
            <button className="check-restart" onClick={checkAnswers}>
              Check answers
            </button>
          )}
        </div>
      ) : (
        <Start start={() => trueFalse(setStartGame)} />
      )}
    </div>
  );
}
