import React, { useState } from 'react';

export default function VisualSoundQuiz() {
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
  const buttonStyle = isSelected ? { backgroundColor: 'lightgreen' } : {};

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
    setSelectedButton(label);
    setIsCorrect(null); // 選択されたときは正解か不正解かをリセット
  };

  const handleSubmit = () => {
    setIsCorrect(selectedAnswer === 'apple'); // 回答として選ばれたラベルがappleであれば、isCorrectをtrueに、そうでなければFalseをセットする。
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <ImageDisplay imageUrl='/image/apple.png' />
      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        <AudioButton
          audioSrc='/sound/apple.mp3'
          label="apple"
          number="1"
          onSelect={handleAudioSelect}
          isSelected={selectedButton === 'apple'}
        />
        <AudioButton
          audioSrc='/sound/banana.mp3'
          label="banana"
          number="2"
          onSelect={handleAudioSelect}
          isSelected={selectedButton === 'banana'}
        />
      </div>
      <CharacterSpeechBubble/>
      <AnswerButton onSubmit={handleSubmit} isSelected={selectedButton !== ''} />
      {isCorrect !== null && (//isCorrectがnullでなければ、&&以降を示す。
        <div style={{ marginTop: '10px' }}>
          {isCorrect ? '正解！' : '不正解。再挑戦してください。'} {/*isCorrectがtrueなら正解！、trueじゃないなら不正解と示す */}
        </div>
      )}
    </div>
  );
}
