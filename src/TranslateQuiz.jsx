import React, { useState } from 'react';
import styles from "./TranslateQuiz.module.css";


//日本語の文章を英語に翻訳する問題
function TranslateQuiz({onAnswer, onNext}) {
  // 問題文と正解
  const question = "彼女はケーキを食べています。";
  const correctAnswer = "She is eating a cake.";

  // ステート
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [answered, setAnswered] = useState(false);

  // 解答の検証
  const checkAnswer = () => {
    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
      setFeedback('正解！');
      onAnswer(true)
      setAnswered(true)
    } else {
      setFeedback(`不正解！ 正解：${correctAnswer}`);
      onAnswer(false)
      setAnswered(true)
    }
  };

  return (
    <div className={styles.App}>
      <div className={styles.questionSection}>
        <p>日本語の文を英語に訳してください</p>
        <img src="/image/sheIsEatingCake.png" alt="Question" />
        <div className={styles.characterBubble}>
          <img src="/image/character.JPG" alt="Character" />
          <div className={styles.speechBubble}>{question}</div>
        </div>
      </div>

      <div className={styles.answerSection}>
        <input 
          type="text" 
          value={userAnswer} 
          onChange={(e) => setUserAnswer(e.target.value)} 
        />
      </div>

        {!answered && 
        <button onClick={checkAnswer}>回答する</button>
        }
        {answered &&<div>
      <div className={styles.feedbackSection}>
        {feedback}
      </div>
        <button onClick={onNext}>次へ</button>
        </div>
         }
    </div>
  );
}

export default TranslateQuiz;
