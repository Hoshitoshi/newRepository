  import React from 'react';
  import { useLocation, useNavigate } from 'react-router-dom';
  import { quizData } from './Quiz';
  
  export default function Outcome() {
    const location = useLocation();
    const correctAnswers = location.state && location.state.correctAnswers ? location.state.correctAnswers : 0;
    const navigate = useNavigate(); // useNavigateフックを使用してページ間の遷移を行う
  
    const handleReturnToQuiz = () => {
      // Quiz1に戻るためのリダイレクト
      navigate('/quiz/1');
    };
  
    return (
      <>
        <div className="result">
          <img src="./image/otsukaresama.jpeg" alt="" className='resultPic'/>
        </div>
        <div>正解数: {correctAnswers} / {quizData.length}</div>
        <button onClick={handleReturnToQuiz}>Quiz1に戻る</button>
      </>
    );
  }
  





 