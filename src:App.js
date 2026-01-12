import React, { useState } from "react";
import ExamApp from "./ExamApp";
import Flashcards from "./Flashcards";
import { examQuestions } from "./examQuestions";

function App() {
  const [view, setView] = useState("exam");
  const [numQuestions, setNumQuestions] = useState(25);

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 20 }}>
      <h1 style={{ textAlign: "center" }}>Massachusetts Life Insurance App</h1>

      <div style={{ textAlign:"center", marginBottom:20 }}>
        <button onClick={() => setView("exam")} style={{ margin:5 }}>Exam Simulator</button>
        <button onClick={() => setView("flashcards")} style={{ margin:5 }}>Flashcards</button>
        <label style={{ marginLeft: 20 }}>
          Number of Questions:{" "}
          <select value={numQuestions} onChange={e => setNumQuestions(Number(e.target.value))}>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={75}>75</option>
            <option value={100}>100+</option>
          </select>
        </label>
      </div>

      {view === "exam" ? <ExamApp numQuestions={numQuestions} timePerQuestion={60} /> : <Flashcards questions={examQuestions} />}
    </div>
  );
}

export default App;