import React, { useState } from "react";

const Flashcards = ({ questions }) => {
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const current = questions[index];

  const nextCard = () => {
    setShowAnswer(false);
    setIndex((prev) => (prev + 1) % questions.length);
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", textAlign: "center", padding: 20 }}>
      <h2>Flashcards</h2>
      <div style={{ border: "1px solid #ccc", padding: 20, borderRadius: 8 }}>
        <p><strong>Q:</strong> {current.question}</p>
        {showAnswer && <p><strong>Answer:</strong> {current.options[current.correct]}</p>}
      </div>
      <button onClick={() => setShowAnswer(!showAnswer)} style={{ margin: 10 }}>
        {showAnswer ? "Hide Answer" : "Show Answer"}
      </button>
      <button onClick={nextCard} style={{ margin: 10 }}>Next Card</button>
    </div>
  );
};

export default Flashcards;