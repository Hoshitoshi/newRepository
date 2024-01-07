//3問間違えたやつ
import React, { useState, useRef } from 'react';
import LessonChoice from './LessonChoice';
import { Link } from 'react-router-dom';

export default function MissedChallenge({}){

    const [goLessonChoice, setGoLessonChoice] = useState(false);  
    const toLessonChoice = () => {
      setGoLessonChoice(true);
    }
  
    return (
      goLessonChoice ? <LessonChoice/> : (
        <div>
          <img src="/image/missedChallenge.png" alt="" />
          <p>惜しい！！</p>
          <p>次こそはきっとクリアできるよ！</p>
          <p>Let's try again!</p>
          <Link to ="/LessonChoice" style={{textDecoration: "none", color:"black"}}>
          <button>次へ</button>
          </Link>
          {/* <button onClick={toLessonChoice}>ホーム</button> */}
        </div>
        )
      );
    }