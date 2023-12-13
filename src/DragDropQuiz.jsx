import React, { useState, useCallback, useEffect, useRef } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ItemType = {
  WORD: 'word',
};

function DraggableWord({ name, index, moveCard }) {
  const ref = useRef(null);

  // ドラッグ機能の設定
  const [, drag] = useDrag(() => ({
    type: ItemType.WORD,
    item: { name, index },
  }), [name, index]);

  // ドロップ機能の設定
  const [, drop] = useDrop({
    accept: ItemType.WORD,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // 同じアイテムを置き換えないようにする
      if (dragIndex === hoverIndex) {
        return;
      }

      // スクリーン上の四角形を決定する
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // アイテムの縦の中心を取得
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // マウスの位置を決定する
      const clientOffset = monitor.getClientOffset();
      // 上部からのピクセルを取得
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // マウスがアイテムの高さの半分を超えたときのみ移動する
      // 下向きのドラッグでは、カーソルが50%以下のときのみ移動
      // 上向きのドラッグでは、カーソルが50%以上のときのみ移動
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // 実際に行動を実行する
      moveCard(dragIndex, hoverIndex);
      // 注：ここではモニターアイテムを変更している
      // 通常は変更を避けるべきだが、パフォーマンスのためここでは許容
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <div ref={ref} style={{ 
        margin: '5px', 
        padding: '5px', 
        border: '1px solid black', 
        display: 'inline-block',
      }}>
      {name}
    </div>
  );
}

function DropZone({ onDrop, moveCard, children }) {
  const [, drop] = useDrop({
    accept: ItemType.WORD,
    drop(item, monitor) {
      const didDrop = monitor.didDrop();
      if (didDrop && !item.index) {
        return;
      }
      onDrop(item);
    },
  });

  return (
    <div ref={drop} style={{ width: '100%', minHeight: '50px', border: '1px dashed grey', margin: '10px', padding: '10px', backgroundColor: '#f0f0f0' }}>
      {children}
    </div>
  );
}

export default function DragDropQuiz() {
    const [userInput, setUserInput] = useState([]);
    const [isCorrect, setIsCorrect] = useState(null);
    const [shuffledWords, setShuffledWords] = useState([]);
    const correctAnswer = 'The cat is on the cushion';

    // 単語をシャッフルする
    useEffect(() => {
        setShuffledWords(shuffleArray(correctAnswer.split(' ')));
    }, []);

    // カードの移動処理
    const moveCard = useCallback((dragIndex, hoverIndex) => {
        const dragCard = userInput[dragIndex];
        setUserInput((prevInput) => {
          const updatedInput = [...prevInput];
          updatedInput.splice(dragIndex, 1);
          updatedInput.splice(hoverIndex, 0, dragCard);
          return updatedInput;
        });
    }, [userInput]);

    // ドロップ時の処理
    const handleDrop = useCallback((item) => {
        if (!userInput.includes(item.name)) {
          setUserInput((currentInput) => [...currentInput, item.name]);
        }
    }, [userInput]);

    // 一つ戻る処理
    const handleUndo = () => {
        setUserInput((currentInput) => currentInput.slice(0, -1));
    };

    // 提出処理
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
                    <img src="/image/catIsOnTheCushion.png" alt="A cat sitting on a cushion" style={{ maxWidth: '100%', height: 'auto' }} />
                </div>
                <div style={{ margin: '10px' }}>
                    <button onClick={() => new Audio('/sound/catIsOnTheCushion.mp3').play()}>音声を再生</button>
                </div>
                <DropZone onDrop={handleDrop} moveCard={moveCard}>
                    {userInput.map((word, index) => (
                        <DraggableWord key={index} name={word} index={index} moveCard={moveCard} />
                    ))}
                </DropZone>
                <button onClick={handleUndo} disabled={userInput.length === 0} style={{ marginLeft: '10px' }}>
                    1つ戻る
                </button>
                <div>
                    {shuffledWords.map((word, index) => {
                        if (!userInput.includes(word)) {
                            return <DraggableWord key={index} name={word} index={undefined} moveCard={moveCard} />;
                        }
                        return null;
                    })}
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

// 配列をシャッフルする関数
function shuffleArray(array) {
  let shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
