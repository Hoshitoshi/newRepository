//3問間違えたやつ
import React, { useState, useRef } from 'react';

export default function MissedChallenge({}){

  return(
    <div>
      <img src="/image/missedChallenge.png" alt="" />
      <p>惜しい！！</p>
      <p>次こそはきっとクリアできるよ！</p>
      <p>Let's try again!</p>
      <button>ホーム</button>
    </div>
  )
}