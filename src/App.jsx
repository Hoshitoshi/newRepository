import React from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DragDropQuiz from "./DragDropQuiz";
import Outcome from "./Outcome";
import Quiz from "./Quiz";
import SoundWords from "./SoundWords";
import TranslateQuiz from "./TranslateQuiz";
import VisualPareQuiz from "./VisualPareQuiz";
import VisualSoundQuiz from "./VisualSoundQuiz";
import VisualPareChallenge from "./VisualPareChallenge";
// import DragDropQuiz from './DragDropQuiz';

function App() {
  // ランダムに数字を取り出す関数

  return (
    <Router>
      <Routes>
        <Route path="/quiz" element={<Quiz />} />
        {/* <Route path="/result" element={<div>クイズ終了！結果ページへのリンクや内容をここに追加。</div>} /> */}
        <Route path="/outcome" element={<Outcome />} />
        <Route path="/visualPare" element={<VisualPareQuiz />} />
        <Route path="/visualPareChallenge" element={<VisualPareChallenge />} />
        <Route path="/visualSound" element={<VisualSoundQuiz />} />
        <Route path="/soundWords" element={<SoundWords />} />
        <Route path="/dragDropQuiz" element={<DragDropQuiz />} />
        <Route path="/translateQuiz" element={<TranslateQuiz />} />
        {/* <Route path="/dragDrop" element={<DragDropQuiz/>} /> */}
        <Route
          path="/"
          element={
            <>
              <Link to="/quiz">クイズを始める</Link>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
