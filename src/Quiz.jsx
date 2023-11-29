import React, { useState } from "react";
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
  // 以下はプレースホルダーの問題です。実際の問題に置き換えてください。
  {
    question: "問題4",
    options: ["選択肢1", "選択肢2", "選択肢3"],
    answer: "選択肢1",
  },
  {
    question: "問題5",
    options: ["選択肢1", "選択肢2", "選択肢3"],
    answer: "選択肢1",
  },
  {
    question: "問題6",
    options: ["選択肢1", "選択肢2", "選択肢3"],
    answer: "選択肢1",
  },
  {
    question: "問題7",
    options: ["選択肢1", "選択肢2", "選択肢3"],
    answer: "選択肢1",
  },
  {
    question: "問題8",
    options: ["選択肢1", "選択肢2", "選択肢3"],
    answer: "選択肢1",
  },
  {
    question: "問題9",
    options: ["選択肢1", "選択肢2", "選択肢3"],
    answer: "選択肢1",
  },
  {
    question: "問題10",
    options: ["選択肢1", "選択肢2", "選択肢3"],
    answer: "選択肢1",
  },
  {
    question: "問題11",
    options: ["選択肢1", "選択肢2", "選択肢3"],
    answer: "選択肢1",
  },
  {
    question: "問題12",
    options: ["選択肢1", "選択肢2", "選択肢3"],
    answer: "選択肢1",
  },
  {
    question: "問題13",
    options: ["選択肢1", "選択肢2", "選択肢3"],
    answer: "選択肢1",
  },
  {
    question: "問題14",
    options: ["選択肢1", "選択肢2", "選択肢3"],
    answer: "選択肢1",
  },
  // ... 以下同様に問題を追加 ...
  {
    question: "問題15",
    options: ["選択肢1", "選択肢2", "選択肢3"],
    answer: "選択肢1",
  },
];

export default function Quiz() {
  // ランダムに数字を取り出すコード。useEffectをつかう。
  const quizNumber = 1;

  //   // どの選択肢が選ばれているかを保持している
  //   const [selectedOption, setSelectedOption] = useState(null);

  //   // 正解した数を保持している
  //   const [correctAnswers, setCorrectAnswers] = useState(0);

  //   const navigate = useNavigate();
  //   const { questionId } = useParams();
  //   const location = useLocation();

  //   useEffect(() => {
  //     setSelectedOption(null);
  //     // correctAnswers とメーター値のリセットを削除
  //   }, [location.pathname]);

  //   const handleAnswer = () => {
  //     if (selectedOption === currentQuestion.answer) {
  //       setCorrectAnswers(correctAnswers + 1);
  //     }

  //     const nextQuestionId = parseInt(questionId, 10) + 1;
  //     if (nextQuestionId <= quizData.length) {
  //       navigate(`/quiz/${nextQuestionId}`);
  //     } else {
  //       navigate('/outcome', { state: { correctAnswers } });
  //     }
  //   };
  // // ここでは、quizDataの何番目のクイズかを示している。
  //   const currentQuestion = quizData[parseInt(questionId, 10) - 1];

  //   const isAnswerButtonDisabled = selectedOption === null;

  //   const segmentStyle = (index) => ({
  //     backgroundColor: index < correctAnswers ? 'lightgreen' : 'lightgray',
  //   });
  const [correctCount, setCorrectCount] = useState(0);

  return (
    <div>
      {quizNumber === 1 && <SoundWords />}
      {/* <MetarCount count={correctCount} />  */}
      {/* MetarCountに、正回数の数だけ塗るようにコードを組む */}

      {/* <h2>{currentQuestion.question}</h2>
      {currentQuestion.options.map((option, index) => (
        <button
          key={index}
          onClick={() => setSelectedOption(option)}
          style={{ backgroundColor: selectedOption === option ? 'green' : 'initial' }}
          disabled={selectedOption !== null} // すでに選択肢を選んだ場合は無効化
        >
          {option}
        </button>
      ))}
      <button
        onClick={handleAnswer}
        style={{ backgroundColor: selectedOption ? 'green' : 'initial' }}
        disabled={isAnswerButtonDisabled}
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
      </div> */}
    </div>
  );
}
