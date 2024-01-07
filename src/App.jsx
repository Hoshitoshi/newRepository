import React from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DragDropQuiz from "./DragDropQuiz";
import DragDropChallenge from "./DragDropChallenge";
import Outcome from "./Outcome";
import Quiz from "./Quiz";
import SoundWords from "./SoundWords";
import TranslateQuiz from "./TranslateQuiz";
import VisualPareQuiz from "./VisualPareQuiz";
import VisualSoundQuiz from "./VisualSoundQuiz";
import VisualPareChallenge from "./VisualPareChallenge";
import Container from "./Container";
import QuizHandler from "./QuizHandler";
import { Initial } from "./Initial";
import Home from "./Home";
import Register from "./Register"
import Login from "./Login"
import StageChoice from "./StageChoice"
import LessonChoice from "./LessonChoice"



function App() {
  // ランダムに数字を取り出す関数

  return (
    <Router>
      <Routes>
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/quizHandler" element={<QuizHandler />} />
        {/* <Route path="/result" element={<div>クイズ終了！結果ページへのリンクや内容をここに追加。</div>} /> */}
        <Route path="/outcome" element={<Outcome />} />
        <Route path="/visualPare" element={<VisualPareQuiz />} />
        <Route path="/visualPareChallenge" element={<VisualPareChallenge />} />
        <Route path="/visualSound" element={<VisualSoundQuiz />} />
        <Route path="/soundWords" element={<SoundWords />} />
        <Route path="/dragDropQuiz" element={<DragDropQuiz />} />
        <Route path="/dragDropChallenge" element={<DragDropChallenge />} />
        <Route path="/translateQuiz" element={<TranslateQuiz />} />
        <Route path="/container" element={<Container />} />
        <Route path="/initial" element={<Initial />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/stageChoice" element={<StageChoice />} />
        <Route path="/lessonChoice" element={<LessonChoice />} />
        <Route path="/quizHandler" element={<QuizHandler />} />
        {/* <Route path="/dragDrop" element={<DragDropQuiz/>} /> */}
        <Route
          path="/"
          element={
            // <>
            //   <Link to="/initial">クイズを始める</Link>
            // </>
            <Initial />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
