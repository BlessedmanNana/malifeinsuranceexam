import React, { useState, useEffect } from "react";
import { examQuestions } from "./examQuestions";

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

const ExamApp = ({ numQuestions = 25, timePerQuestion = 60 }) => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timePerQuestion);
  const [answersLog, setAnswersLog] = useState([]);

  useEffect(() => {
    const shuffled = shuffle(examQuestions);
    setQuestions(shuffled.slice(0, numQuestions));
  }, [numQuestions]);

  useEffect(() => {
    if (showResult || reviewMode) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleNext();
          return timePerQuestion;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [currentIndex, showResult, reviewMode]);

  const handleNext = () => {
    const current = questions[currentIndex];
    const isCorrect = selected === current.correct;
    if (isCorrect) setScore(prev => prev + 1);

    setAnswersLog(prev => [
      ...prev,
      {
        question: current.question,
        options: current.options,
        selected,
        correct: current.correct,
        explanation: current.explanation
      }
    ]);

    setSelected(null);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setTimeLeft(timePerQuestion);
    } else {
      setShowResult(true);
    }
  };

  if (reviewMode)
    return (
      <div style={{ maxWidth: 700, margin: "auto" }}>
        <h2>Review Mode</h2>
        {answersLog.map((item, idx) => (
          <div key={idx} style={{ marginBottom: 20, borderBottom: "1px solid #ccc" }}>
            <p><strong>Q{idx + 1}: {item.question}</strong></p>
            {item.options.map((opt, i) => (
              <p key={i} style={{ color: i === item.correct ? "green" : i === item.selected ? "red" : "black" }}>
                {opt} {i === item.correct ? "✅" : i === item.selected ? "❌" : ""}
              </p>
            ))}
            <p><em>{item.explanation}</em></p>
          </div>
        ))}
        <button onClick={() => window.location.reload()}>Restart</button>
      </div>
    );

  if (showResult)
    return (
      <div style={{ maxWidth: 700, margin: "auto" }}>
        <h2>Exam Complete!</h2>
        <p>Score: {score} / {questions.length}</p>
        <p>Percentage: {(score / questions.length * 100).toFixed(2)}%</p>
        <button onClick={() => setReviewMode(true)}>Review Answers</button>
        <button onClick={() => window.location.reload()}>Restart Exam</button>
      </div>
    );

  const current = questions[currentIndex];

  return (
    <div style={{ maxWidth: 700, margin: "auto" }}>
      <h3>Question {currentIndex + 1} / {questions.length}</h3>
      <p><strong>Time Left: {timeLeft}s</strong></p>
      <p>{current.question}</p>
      {current.options.map((opt, idx) => (
        <button key={idx} style={{ display:"block", margin:5, width:"100%", backgroundColor: selected===idx?"#90ee90":"#f0f0f0" }}
                onClick={() => setSelected(idx)}>
          {opt}
        </button>
      ))}
      {selected !== null && (
        <div>
          <p>{selected === current.correct ? "Correct ✅" : `Incorrect ❌ (Correct: ${current.options[current.correct]})`}</p>
          <p><em>{current.explanation}</em></p>
          <button onClick={handleNext}>Next</button>
        </div>
      )}
    </div>
  );
};

export default ExamApp;