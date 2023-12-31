//さくらんぼの絵のやつ
import React, { useState, useRef } from 'react';

//音声ボタンを押して、聞こえた音声と同じ単語のボタンを押す問題
export default function SoundWords({onAnswer, onNext}){
    const [selectedOption, setSelectedOption] = useState(null);
    const [answerResult, setAnswerResult] = useState(""); // 回答の結果を保存する状態
    const audioRef = useRef<HTMLAudioElement>(null);
    const [answered, setAnswered] = useState(false);
    const correctAnswer = "Cherry"; // 正解を設定
    const options = ["Cherry", "Berry","Friends"];

    // 音声を再生する関数
    // <audio ref={audioRef} />で、audioRef.currentはそのDOM要素(=audio要素)を直接指し示す。
    // .play()はHTMLMediaElementのメソッドで、音声や動画の再生を開始mする。このメソッドをaudioRef.currentに対して呼び出すことで、参照している<audio>要素の音声ファイルが再生される。
  

    const playAudio = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };
    

    // 選択肢が選ばれた時の処理
    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    // 回答するボタンが押された時の処理
    const handleSubmit = () => {
        // if (selectedOption) {
            if (selectedOption === correctAnswer) {
                setAnswerResult("正解！");
                onAnswer(true)
            } else {
                setAnswerResult("不正解");
                onAnswer(false)
            }
        // }
        setAnswered(true); // 回答後の状態を更新
    };

    // const handleNextQuestion = () => {
    //     // ここで次のクイズに遷移する処理を実装
    //     // 例: onNext() を呼び出す
    //     onNext();
    //   };

    return (
        <div>
            <div className="quiz-question">なんと言っているでしょう？</div>
            <div className="quiz-image">
                {/* ここに画像を表示 */}
                <img src="/image/cherry.png" alt="" />
            </div>
            <div className="quiz-audio">
                <button onClick={playAudio} >
                <img src="/image/sound_icon_1.png" alt=""/>
                </button>
                <audio ref={audioRef} src="/sound/cherry.mp3"></audio>
            </div>
            <div className="quiz-options">
                {options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleOptionClick(option)}
                        style={{ backgroundColor: selectedOption === option ? 'lightgreen' : 'white' }}
                    >
                        {option}
                    </button>
                ))}
            </div>


     <div className="submit-button">
      {!answered && (
           <button
           style={{ backgroundColor: selectedOption ? 'lightgreen' : 'white' }}
           onClick={handleSubmit}
       >回答する
       </button>
      )}
      {answered && (
        <button onClick={onNext}>次へ</button>
      )}
      {answered && <div>{answerResult}</div>}
      </div>
            {/* {answerResult && <div className="answer-result">{answerResult}</div>} */}
</div>
    );
};
