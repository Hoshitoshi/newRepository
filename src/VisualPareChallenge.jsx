import React, { useState, useEffect } from 'react';
import styles from './VisualPare.module.css'; // CSSモジュールのインポート

export default function VisualPareChallenge() {
  const quizData = [
    { id: 1, image: '/image/apple.png', word: 'apple' },
    { id: 2, image: '/image/cherry.png', word: 'cherry' },
    { id: 3, image: '/image/banana.png', word: 'banana' },
  ];

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedWord, setSelectedWord] = useState(null);
  const [correctPairs, setCorrectPairs] = useState([]);
  const [allCorrect, setAllCorrect] = useState(false);
  const [wrongAnswer, setWrongAnswer] = useState(false);
  const [rightAnswer, setRightAnswer] = useState();

  const isCorrectPair = (item, word) => {
    return item && word && item.word === word;
  };

  useEffect(() => {
    if (quizData.length === correctPairs.length) {
      setTimeout(()=>{
        setAllCorrect(true);
      }, 500)
    }
  }, [correctPairs, quizData.length]);

  const handleImageClick = (item) => {
    if (selectedImage && selectedImage.id === item.id) {
      setSelectedImage(null);//単語が何も選ばれていなくて既に選んでいた画像をもう一度クリックした場合
    } else if(!selectedWord){
      setSelectedImage(item);//単語が何も選ばれてなくて画像をクリックした場合
    }else if
    (selectedWord && isCorrectPair(item, selectedWord.word)) {
      setCorrectPairs([...correctPairs, item.id]);//単語が既に選ばれていて、同じ画像をクリックした場合
      setRightAnswer(true)  
      setTimeout(()=>{
          setSelectedImage(null);
            setSelectedWord(null);
          setRightAnswer(null)
        }, 500)
      }else{
        setSelectedImage(item);//単語が既に選ばれていて、不正解の画像をクリックした時
        setWrongAnswer(true)
        setTimeout(()=>{
          setSelectedImage(null);
          setSelectedWord(null);
          setWrongAnswer(null)
        }, 500)//1秒後にリセット
      }
    
  };

  const handleWordClick = (item) => {
    if (selectedWord && selectedWord.id === item.id) {
      setSelectedWord(null);
    } else if (!selectedImage){
      setSelectedWord(item);
    }else if (selectedImage && isCorrectPair(selectedImage, item.word)) {
      setCorrectPairs([...correctPairs, item.id]);
      setRightAnswer(true)  
      setTimeout(()=>{
          setSelectedImage(null);
          setSelectedWord(null);
          setRightAnswer(null)
        }, 500)
      }else{
        setSelectedWord(item);
        setWrongAnswer(true)
        setTimeout(()=>{
          setSelectedImage(null)
          setSelectedWord(null)
          setWrongAnswer(null)
        }, 500)
      }
  };

  const getImageBackgroundColor = (item, imageWord) => {
    if (correctPairs.includes(item.id)) {
      return 'lightblue';
    } else if (selectedImage && selectedImage.id === item.id && !selectedWord) {
      return 'lightgreen';
    }else if (selectedImage && selectedImage.id === item.id && !isCorrectPair(item, selectedWord.word)){
      return'pink';
    }else
    return 'white';
  };

  const getWordBackgroundColor = (item, itemWord) => {
    if (correctPairs.includes(item.id)) {
      return 'lightblue';
    } else if (selectedWord && selectedWord.id === item.id && !selectedImage) {
      return 'lightgreen';
    } else if(selectedWord && selectedWord.id === item.id && !isCorrectPair(selectedImage, item.word)){
      return'pink';
    }else{
      return 'white';
    }
  };

  // const allCorrectMsg = () =>{
  //   return(
  //     setTimeout(()=>{
  //       <p className={styles.correctMessage}>全問正解！！◯</p>
  //     }, 500)
  //   )
  // }

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        {quizData.map(item => (
          <img
            key={item.id}
            src={item.image}
            alt={item.word}
            onClick={() => handleImageClick(item)}
            style={{ backgroundColor: getImageBackgroundColor(item, item.word) }}
            // className={styles.image}
            className={`${styles.image} ${correctPairs.includes(item.id) ? styles.imageDisabled : ''}`}
            disabled={correctPairs.includes(item.id)}
          />
        ))}
      </div>
      <div className={styles.container}>
        {quizData.map(item => (
          <button
            key={item.id}
            onClick={() => handleWordClick(item)}
            style={{ backgroundColor: getWordBackgroundColor(item, item.word) }}
            className={`${styles.button} ${correctPairs.includes(item.id) ? styles.buttonDisabled : ''}`}
            disabled={correctPairs.includes(item.id)}
          >
            {item.word}
          </button>
        ))}
      </div>
      {wrongAnswer? <p>ハズレ！</p>:''}
      {rightAnswer? <p>正解！</p>:""}
      {allCorrect && <p className={styles.correctMessage}>全問正解！！◯</p>}
    </div>
  );
}


// ①画像をクリックすると、lightgreenになる。
// ②他の画像をクリックすると、その画像がlightgreenになり、それ以外の画像はwhiteに戻る。
// →stateを管理し、クリックされたものを追いかけ、それだけをlightgreenにするロジック。
// ③画像がlightgreenにselectされた状態で、単語をクリックし、その時に単語のidが画像と一致していたらlightblueにする。
// →なおかつ、一致していなかったら両方ともpinkにして、不正解✖️、と表示する。
// →１秒間「不正解✖️」と表示された後、その言葉が消えて、クリックされた単語と画像は解除されて両方ともwhiteになる。