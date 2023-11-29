import React, { useState, useRef } from 'react';

export default function SoundWords(){
    const [selectedOption, setSelectedOption] = useState(null);
    const [answerResult, setAnswerResult] = useState(""); // 回答の結果を保存する状態
    const audioRef = useRef(null);

    const correctAnswer = "Cherry"; // 正解を設定
    const options = ["Cherry", "Friends"];

    // 音声を再生する関数
    const playAudio = () => {
        audioRef.current.play();
    };

    // 選択肢が選ばれた時の処理
    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    // 回答するボタンが押された時の処理
    const handleSubmit = () => {
        if (selectedOption) {
            if (selectedOption === correctAnswer) {
                setAnswerResult("正解！");
            } else {
                setAnswerResult("不正解");
            }
        }
    };

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
                        style={{ backgroundColor: selectedOption === option ? 'lightgreen' : 'white' }}
                        onClick={() => handleOptionClick(option)}
                    >
                        {option}
                    </button>
                ))}
            </div>
            <div className="submit-button">
                <button
                    style={{ backgroundColor: selectedOption ? 'lightgreen' : 'white' }}
                    onClick={handleSubmit}
                >
                    回答する
                </button>
            </div>
            {answerResult && <div className="answer-result">{answerResult}</div>}
        </div>
    );
};
