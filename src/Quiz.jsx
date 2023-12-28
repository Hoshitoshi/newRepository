import React, { useState, useEffect } from "react";
import "./Quiz.css";
import SoundWords from "./SoundWords";

export const quizData = [
  // 以下は具体的な例題です。残りはプレースホルダーとしています。
  {
    question: "日本の首都はどこですか？",
    options: ["大阪", "東京", "名古屋"],
    answer: "東京",
  },
  {
    question: "富士山はどの都道府県にありますか？",
    options: ["山梨県", "長野県", "静岡県"],
    answer: "山梨県",
  },
  {
    question: "2020年のオリンピックはどこで開催されましたか？",
    options: ["ロンドン", "リオデジャネイロ", "東京"],
    answer: "東京",
  },
];

export default function Quiz() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [currentPage, setCurrentPage] = useState('quiz');
  const [questionId, setQuestionId] = useState(1);
  const currentQuestion = quizData[questionId - 1];

  useEffect(() => {
    setSelectedOption(null);
  }, [questionId]);

  const handleAnswer = () => {
    if (selectedOption === currentQuestion.answer) {
      setCorrectAnswers(correctAnswers + 1);
    }

    const nextQuestionId = questionId + 1;
    if (nextQuestionId <= quizData.length) {
      setQuestionId(nextQuestionId);
    } else {
      setCurrentPage('outcome');
    }
  };

  const segmentStyle = (index) => {
    // 正解数と比較するためにindexを0からではなく1から始まるように調整
    const adjustedIndex = index + 1;
  
    // 正解数に対するindexの比率を計算
    const correctRatio = adjustedIndex / quizData.length;
  
    let backgroundColor;
    if (correctRatio <= 0.3) {
      backgroundColor = index < correctAnswers ? 'lightgreen' : 'lightgray'; // 0% - 30%
    } else if (correctRatio <= 0.6) {
      backgroundColor = index < correctAnswers ? 'yellow' : 'lightgray'; // 31% - 60%
    } else {
      backgroundColor = index < correctAnswers ? 'orange' : 'lightgray'; // 61% - 100%
    }
    return { backgroundColor };
  };
  
  if (currentPage === 'quiz') {
    return (
      <div>
        {/* {questionId === 1 && <SoundWords />} */}
        {/* ここにクイズの質問画面のコンテンツが続きます */}
        <h2>{currentQuestion.question}</h2>
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => setSelectedOption(option)}
            style={{ backgroundColor: selectedOption === option ? 'green' : 'initial' }}
            disabled={selectedOption !== null}
          >
            {option}
          </button>
        ))}
        <button
          onClick={handleAnswer}
          style={{ backgroundColor: selectedOption ? 'green' : 'initial' }}
          disabled={selectedOption === null}
        >
          回答する
        </button>
        <div>正解数: {correctAnswers} / {quizData.length}</div>
        <div className="meter-container">
          <div className="meter-bar">
            {[...Array(quizData.length)].map((_, index) => (
              <div key={index} className="meter-segment" style={segmentStyle(index)}></div>
            ))}
          </div>
        </div>
      </div>
    );
  } else if (currentPage === 'outcome') {
    return (
      <div>
        {/* ここに結果画面のコンテンツを記述 */}
        <h2>結果</h2>
        <p>あなたの正解数: {correctAnswers} / {quizData.length}</p>
        {/* 他の結果表示やリセットボタン等をここに追加 */}
      </div>
    );
  }
}


