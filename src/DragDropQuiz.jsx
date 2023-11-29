import React, { useState, useCallback, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ItemType = {
  WORD: 'word',
};

function DraggableWord({ name }) {
  const [, drag] = useDrag(() => ({
    type: ItemType.WORD,
    item: { name },
  }), [name]);

  return (
    <div ref={drag} style={{ margin: '5px', padding: '5px', border: '1px solid black', display: 'inline-block' }}>
      {name}
    </div>
  );
}

function DropZone({ onDrop, children }) {
  const [, drop] = useDrop(() => ({
    accept: ItemType.WORD,
    drop: (item) => onDrop(item),
  }));

  return (
    <div ref={drop} style={{ width: '400px', minHeight: '50px', border: '1px dashed grey', margin: '10px', padding: '10px' }}>
      {children}
    </div>
  );
}

export default function DragDropQuiz() {
    const [userInput, setUserInput] = useState([]);
    const [isCorrect, setIsCorrect] = useState(null);
    const [shuffledWords, setShuffledWords] = useState([]);
    const correctAnswer = 'The cat is on the cushion'; // 正解の文章

    // 単語をランダムに並べ替える関数
    const shuffleArray = (array) => {
        let shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    // コンポーネントがマウントされた時に単語をシャッフル
    useEffect(() => {
        setShuffledWords(shuffleArray(correctAnswer.split(' ')));
    }, []);

    const handleDrop = useCallback((item) => {
        setUserInput((currentInput) => [...currentInput, item.name]);
    }, []);

    const handleUndo = () => {
        setUserInput((currentInput) => currentInput.slice(0, -1));
    };

    const handleSubmit = () => {
        if (userInput.join(' ').toLowerCase() === correctAnswer.toLowerCase()) {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div style={{ margin: '10px' }}>
                <div>聞こえた通りに文章を作成してください</div>
                <div>
                    {/* 画像表示場所 */}
                    <img src="/image/catIsOnTheCushion.png" alt="description_of_image" />
                </div>
                <div style={{ margin: '10px' }}>
                    <button onClick={() => new Audio('/sound/catIsOnTheCushion.mp3').play()}>音声を再生</button>
                </div>
                <DropZone onDrop={handleDrop}>
                    {userInput.map((word, index) => (
                        <span key={index}>{word} </span>
                    ))}
                </DropZone>
                {/* '1つ戻る' ボタン */}
                <button 
                    onClick={handleUndo} 
                    disabled={userInput.length === 0} 
                    style={{ marginLeft: '10px' }}
                >
                    1つ戻る
                </button>
                <div>
                    {shuffledWords.map((word, index) => (
                        <DraggableWord key={index} name={word} />
                    ))}
                </div>
                <div style={{ margin: '10px' }}>
                    <button onClick={handleSubmit}>回答する</button>
                </div>
                <div>
                    {isCorrect === true && <span>正解！</span>}
                    {isCorrect === false && <span>不正解！正解：{correctAnswer}</span>}
                </div>
            </div>
        </DndProvider>
    );
}
