import React, { useState, useEffect } from 'react';
import styles from './VisualPare.module.css'; // CSSモジュールのインポート

export default function VisualPareQuiz() {
  const quizData = [
    { id: 1, image: '/image/apple.png', word: 'apple' },
    { id: 2, image: '/image/cherry.png', word: 'cherry' },
    { id: 3, image: '/image/banana.png', word: 'banana' },
  ];

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedWord, setSelectedWord] = useState(null);
  const [correctPairs, setCorrectPairs] = useState([]);
  const [allCorrect, setAllCorrect] = useState(false);

  const isCorrectPair = (image, word) => {
    return image && word && image.word === word;
  };//ここで、imageはプロパティとして引数を受けているのに対し、wordはwordだけを引数と受けている、という違いがあることに注意。

  useEffect(() => {
    if (quizData.length === correctPairs.length) {
      setAllCorrect(true);
    }
  }, [correctPairs, quizData.length]);

  const handleImageClick = (item) => {
    if (selectedImage && selectedImage.id === item.id) {
      setSelectedImage(null);
    } else {
      setSelectedImage(item);
      if (selectedWord && isCorrectPair(item, selectedWord)) {
        setCorrectPairs([...correctPairs, item.id]);
        setSelectedWord(null);
      }
    }
  };

  const handleWordClick = (word) => {
    if (selectedWord === word) {
      setSelectedWord(null);
    } else {
      setSelectedWord(word);
      if (selectedImage && isCorrectPair(selectedImage, word)) {
        setCorrectPairs([...correctPairs, selectedImage.id]);
        setSelectedWord(null);
      }
    }
  };

  const getImageBackgroundColor = (imageId) => {
    if (correctPairs.includes(imageId)) {
      return 'lightblue';
    } else if (selectedImage && selectedImage.id === imageId && !selectedWord) {
      return 'lightgreen';
    }
    return 'white';
  };

  const getWordBackgroundColor = (imageId, word) => {
    if (correctPairs.includes(imageId)) {
      return 'lightblue';
    } else if (selectedWord && word === selectedWord) {
      return 'lightgreen';
    }
    return 'white';
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        {quizData.map(item => (
          <img
            key={item.id}
            src={item.image}
            alt={item.word}
            onClick={() => handleImageClick(item)}
            style={{ backgroundColor: getImageBackgroundColor(item.id) }}
            className={styles.image}
            disabled={correctPairs.includes(item.id)}
          />
        ))}
      </div>
      <div className={styles.container}>
        {quizData.map(item => (
          <button
            key={item.id}
            style={{ backgroundColor: getWordBackgroundColor(item.id, item.word) }}
            onClick={() => handleWordClick(item.word)}
            className={`${styles.button} ${correctPairs.includes(item.id) ? styles.buttonDisabled : ''}`}
            disabled={correctPairs.includes(item.id)}
          >
            {item.word}
          </button>
        ))}
      </div>
      {allCorrect && <p className={styles.correctMessage}>正解！！◯</p>}
    </div>
  );
}


// ①画像をクリックすると、lightgreenになる。
// ②他の画像をクリックすると、その画像がlightgreenになり、それ以外の画像はwhiteに戻る。
// →stateを管理し、クリックされたものを追いかけ、それだけをlightgreenにするロジック。
// ③画像がlightgreenにselectされた状態で、単語をクリックし、その時に単語のidが画像と一致していたらlightblueにする。
// →なおかつ、一致していなかったら両方ともpinkにして、不正解✖️、と表示する。
// →１秒間「不正解✖️」と表示された後、その言葉が消えて、クリックされた単語と画像は解除されて両方ともwhiteになる。