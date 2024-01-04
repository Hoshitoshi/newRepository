import React, { useState, useEffect, ReactElement } from "react";
import VisualPareChallenge from "./VisualPareChallenge";
import DragDropChallenge from "./DragDropChallenge";
import VisualSoundQuiz from "./VisualSoundQuiz";
import TranslateQuiz from "./TranslateQuiz";
import SoundWords from "./SoundWords";
import * as style from './QuizHandler.css.ts'; // スタイルのインポート
import MissedChallenge from "./MissedChallenge.tsx";

const QuizHandler: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [currentQuizNumber, setCurrentQuizNumber] = useState<number>(1);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [quizzes, setQuizzes] = useState<ReactElement[]>([]);
  const progressPercentage = (correctAnswers / 15) * 100;
  const [hearts, setHearts] = useState(3); 
  const [missedChallenge, setMissedChalenge] = useState(false);

  useEffect(() => {
    const quizComponents: ReactElement[] = [
      <VisualPareChallenge onAnswer={(isCorrect) => handleAnswer(isCorrect)} key="visualPare" onNext={handleNext}  />,
      <DragDropChallenge onAnswer={(isCorrect) => handleAnswer(isCorrect)} key="dragDrop" onNext={handleNext} />,
      <VisualSoundQuiz onAnswer={(isCorrect) => handleAnswer(isCorrect)} key="visualSound" onNext={handleNext} />,
      <TranslateQuiz onAnswer={(isCorrect) => handleAnswer(isCorrect)} key="translate" onNext={handleNext} />,
      <SoundWords onAnswer={(isCorrect) => handleAnswer(isCorrect)} key="soundWords" onNext={handleNext} />
    ];

    const extendedQuizzes = Array(3).fill(null).flatMap(() => {
      return [...quizComponents].sort(() => Math.random() - 0.5);
    });

    setQuizzes(extendedQuizzes);
  }, []);

  const handleAnswer = (isCorrect) => {
    
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
    } else {
      setHearts(prev => prev - 1);
    }

  };
  

  const handleNext = () => {
    if(hearts <= 0){
      setMissedChalenge(true);
      return;
    }
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    setCurrentQuizNumber(prevNumber => prevNumber + 1);
  };


  return (
    <>
    {missedChallenge ? (<MissedChallenge/>) : (
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
      {quizzes.length > 0 && React.cloneElement(quizzes[currentQuestionIndex], { onNext: handleNext })}
    </div>
    )}
    </>
  );
}

export default QuizHandler;
