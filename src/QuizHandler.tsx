import React, { useState, useEffect, ReactElement } from "react";
import VisualPareChallenge from "./VisualPareChallenge";
import DragDropChallenge from "./DragDropChallenge";
import VisualSoundQuiz from "./VisualSoundQuiz";
import TranslateQuiz from "./TranslateQuiz";
import SoundWords from "./SoundWords";
import * as style from './QuizHandler.css.ts'; // スタイルのインポート

const QuizHandler: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [currentQuizNumber, setCurrentQuizNumber] = useState<number>(1);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [wrongAnswers, setWrongAnswers] = useState<number>(0);
  const [quizzes, setQuizzes] = useState<ReactElement[]>([]);
  const progressPercentage = (correctAnswers / 15) * 100;
  const [hearts, setHearts] = useState(3); 

  useEffect(() => {
    const quizComponents: ReactElement[] = [
      <VisualPareChallenge onAnswer={() => handleAnswer(true)} key="visualPare" />,
      <DragDropChallenge onAnswer={() => handleAnswer(true)} key="dragDrop" />,
      <VisualSoundQuiz onAnswer={() => handleAnswer(true)} key="visualSound" />,
      <TranslateQuiz onAnswer={() => handleAnswer(true)} key="translate" />,
      <SoundWords onAnswer={() => handleAnswer(true)} key="soundWords" />
    ];

    const extendedQuizzes = Array(3).fill(null).flatMap(() => {
      return [...quizComponents].sort(() => Math.random() - 0.5);
    });

    setQuizzes(extendedQuizzes);
  }, []);

  const handleAnswer = (isCorrect: boolean) => {
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    
    if (isCorrect) {
      // 正解の場合、正解数を増やす
      setCorrectAnswers(prev => prev + 1);
    } else {
      // 不正解の場合、ハートの数を減らす
      setHearts(prev => prev - 1);
    }
  
    // 問題番号は常に増やす
    setCurrentQuizNumber(prevNumber => prevNumber + 1);
  };

  // const handleAnswer = (isCorrect: boolean) => {
  //   if (isCorrect) {
  //     setCorrectAnswers(prev => prev + 1);
  //   } else {
  //     setWrongAnswers((prev) => prev + 1);
  //   }
  //   setCurrentQuestionIndex(prevIndex => prevIndex + 1);
  //   setCurrentQuizNumber(prevNumber => prevNumber + 1);
  // };

  return (
    <div>
      <h2>クイズ {currentQuizNumber} / 15</h2>
      <div className={style.progressAndHearts}>
        <div className={style.progressBarBackground}>
          <div className={style.progressMarks}>
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className={style.mark}></div>
            ))}
          </div>
          <div className={style.progressBar} style={{ width: `${progressPercentage}%` }}></div>
        </div>

        <div className={style.hearts}>
  {Array(hearts).fill(null).map((_, index) => (
    <span key={index} className={style.heart}>❤️</span>
  ))}
</div>
      </div>
      <div>正解数: {correctAnswers} / 15</div>
      {quizzes.length > 0 && quizzes[currentQuestionIndex]}
    </div>
  );
}

export default QuizHandler;
