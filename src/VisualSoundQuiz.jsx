import React, { useState } from 'react';


//単語を見てそれに合致する音声を選ぶ問題
export default function VisualSoundQuiz({onAnswer}) {
// 画像を表示するパート
const ImageDisplay = ({ imageUrl }) => {
  return <img src={imageUrl} alt="Learning Object" style={{ maxWidth: '100%' }} />;
};
// 音声ボタンのパート
const AudioButton = ({ audioSrc, label, onSelect, isSelected, number }) => {
  const playSound = () => {
    new Audio(audioSrc).play();
    onSelect(label);
  };
  const buttonStyle = isSelected ? { backgroundColor: 'lightgreen' } : {};
  const iconPath = `/image/sound_icon_${number}.png`; // 画像ファイルのパス

  return (
    <button onClick={playSound} style={buttonStyle}>
      <img src={iconPath} alt={`${label} sound`} />
    </button>
  );
};

// キャラクターと吹き出しのパート
const CharacterSpeechBubble = () => {
  const characterImageUrl = '/image/character.JPG'; // キャラクターの画像URL
  
  const speechText = 'She is such a cute apple!';
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
      <img src={characterImageUrl} alt="Character" style={{ width: '50px', marginRight: '10px' }} />
      <div style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '10px' }}>{speechText}</div>
    </div>
  );
};

// 回答するボタンパート
const AnswerButton = ({ onSubmit, isSelected }) => {
  const buttonStyle = isSelected ? { backgroundColor: 'lightgreen' } : {};//セレクトした状態になると背景色が緑に変わる

  return (
    <button onClick={onSubmit} style={buttonStyle}>
      回答する
    </button>
  );
};
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [selectedButton, setSelectedButton] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);

  const handleAudioSelect = (label) => {
    setSelectedAnswer(label);//選ばれたボタンのラベルを回答としてセット
    setSelectedButton(label);//選択しているボタンの色を管理する。セレクトした側のボタンのラベルがselectedButtonとなり、その結果isSelectedがtrueになる。
    setIsCorrect(null); // 選択されたときは正解か不正解かをリセット
  };

  const handleSubmit = () => {
    // setIsCorrect(selectedAnswer === 'apple'); // 回答として選ばれたラベルがappleであれば、isCorrectをtrueに、そうでなければFalseをセットする。
    // onAnswer(true)
    const correct = selectedAnswer === 'apple';
    setIsCorrect(correct);
    onAnswer(correct); // 正解の場合はtrueを、不正解の場合はfalseを渡す
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      {/* 画像の表示 */}
      <ImageDisplay imageUrl='/image/apple.png' />

      {/* 音声ボタンの表示 */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        <AudioButton
          audioSrc='/sound/apple.mp3'
          label="apple"
          number="1"
          onSelect={handleAudioSelect}//セレクトした側のボタンのラベルがselectedButtonとなり、その結果isSelectedがtrueになる。
          isSelected={selectedButton === 'apple'}//上記の結果からここでtrueを返すかfalseを返すかで、backgroundColorが変わる。
        />
        <AudioButton
          audioSrc='/sound/banana.mp3'
          label="banana"
          number="2"
          onSelect={handleAudioSelect}
          isSelected={selectedButton === 'banana'}
        />
      </div>

      {/* キャラクターが喋ってる部分 */}
      <CharacterSpeechBubble/>

      {/* 回答ボタン*/}
      <AnswerButton onSubmit={handleSubmit} isSelected={selectedButton !== ''} />
      {isCorrect !== null && (//isCorrectがnullでなければ、&&以降を示す。


        <div style={{ marginTop: '10px' }}>
          {isCorrect ? '正解！' : '不正解。再挑戦してください。'} {/*isCorrectがtrueなら正解！、trueじゃないなら不正解と示す */}
        </div>
      )}

    </div>
  );
}

//???isSelectedが定義されていないけど、どういう意味で使ってるの？そして、一旦選択肢を選んで、その後他のものを選んだら、isSelectedはどうしてFalseになるの？
// →isSelectedはpropsとしてつかっており、特に定義は不要。trueかfalseかを返し、それによってselectedButtonの内容を変えている。

// new Audio(audioSrc).play();の使い方を復習する！


//以下、復習。

// import React ,{useState} from react:

// export default function VisualQuiz(){


//   return(
{/* <div>
    //画像
  <img src = "", alt = "" , style= {}/>

    //音声ボタン①
    <div
    onSelect={}

    >{label}
    </div>
    //音声ボタン②

    //回答ボタン
    //正解か不正解かの結果を表示


</div> */}

//   )
// }

