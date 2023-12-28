import React, { useState, useEffect } from 'react';
import styles from './VisualPare.module.css'; // CSSモジュールのインポート

export default function VisualPareChallenge({ onAnswer }) {
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

  const isCorrectPair = (item, word) => {//itemはquizDataオブジェクトの1つ、wordは事前に選択されていたオブジェクトのwordを受け取っている。
    return item && word && item.word === word;//今回セレクトした単語と、もともと選択されていた単語が一致するとき、trueを返す。
  };

  useEffect(() => {
    if (quizData.length === correctPairs.length) {
      setTimeout(()=>{
        setAllCorrect(true);
        onAnswer(true)
      }, 500)
    }
  }, [correctPairs, quizData.length]);

  const handleImageClick = (item) => {//ここではitemとはquizDataオブジェクトを丸ごと受け取っている。
    if (selectedImage && selectedImage.id === item.id) {
      setSelectedImage(null);//既に画像が選ばれていて、その画像をもう一度クリックした場合
    } else if(!selectedWord){
      setSelectedImage(item);//単語が何も選ばれてなくて画像をクリックした場合。ここも、itemはオブジェクトなので、selectedImageの中身もオブジェクトとなる。
    }else if
    (selectedWord && isCorrectPair(item, selectedWord.word)) {//ここでitemはオブジェクト、selectedWord.wordはオブジェクトの中のwordに該当するもの。つまりappleかbananaかcherry。冒頭のquizDataで定義されている。
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
        }, 500)//0.5秒後に全部リセット
      }
  };

  const handleWordClick = (item) => {
    if (selectedWord && selectedWord.id === item.id) {//画像が選択されておらず、既に単語が選択されていて、その同じ単語をクリックした場合
      setSelectedWord(null);
    } else if (!selectedImage){//画像が選択されておらず、単語も選択されていない時
      setSelectedWord(item);
    }else if (selectedImage && isCorrectPair(selectedImage, item.word)) {//既に画像が選択されていて、同じ意味の単語を選択した時
      setCorrectPairs([...correctPairs, item.id]);
      setRightAnswer(true)  
      setTimeout(()=>{
          setSelectedImage(null);
          setSelectedWord(null);
          setRightAnswer(null)
        }, 500)
      }else{//既に画像が選択されていて、異なる意味の単語を選択した時
        setSelectedWord(item);//これは恐らく背景色をいったん変えるために必要と思われる。
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

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        {quizData.map(item => (
          <img
            key={item.id}
            src={item.image}
            alt={item.word}
            onClick={() => handleImageClick(item)}//ここでは冒頭で定義したquizDataというオブジェクトを受け取っている
            style={{ backgroundColor: getImageBackgroundColor(item, item.word) }}
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


//復習//
//・質問事項：
// includes()の厳密な意味は？
//useEffectの2つの引数について。モニターする項目を2つにする、ということだっけ？
//useStateでオブジェクトを扱うとき、useState({})みたいな書き方はしなくていいの？もしTypeScriptだと書き方はどうなる？
//82行目と84行目のselectedImage.id === item.id って、必要？あってもなくても同じじゃない？
//同じく、93行目と95行目のselectedWord.id === item.id って、いらないんじゃない？
//className={`${styles.image} ${correctPairs.includes(item.id) ? styles.imageDisabled : ''}`}ここの意味の理解！
//特に、ここでは${}がどの様に使われているか理解する。