import React, { useState, useEffect } from "react";
import {
  DndContext,
  DragOverlay,
  rectIntersection,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  UniqueIdentifier,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import SortableContainer from "./SortableContainer";
import Item from "./Item";

const DragDropChallenge = ({ onAnswer, onNext }) => {
  // 複数の文章パターンを定義
  const sentencePatterns = [
    "The cat is on the cushion",
    "The cat is dreaming",
    "The cat is smiling on the cushion"
  ];

  // アイテムをシャッフルするヘルパー関数
  const shuffleArray = (array) => {
    let currentIndex = array.length, randomIndex;//ここでは、let currentIndex = array.lengthと、let randomIndex;の二つをまとめて宣言しているだけ。省略した書き方なだけで、それ以上の意味はない。
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  };

  const [items, setItems] = useState({
    container1: [],
    container2: [],
  });

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [answerResult, setAnswerResult] = useState<string | null>(null);
  const [currentSentence, setCurrentSentence] = useState("");

  // 現在の問題文をシャッフルして設定
  useEffect(() => {
    const selectedSentence = sentencePatterns[Math.floor(Math.random() * sentencePatterns.length)];//sentencePatterns配列の[index]番目のアイテムをランダムに決定し、それをselectedSentenceとする。
    setCurrentSentence(selectedSentence);
    setItems({
      container1: [],
      container2: shuffleArray(selectedSentence.split(" ")),//selectedSentenceをシャッフルして、単語を並べ替えて、それをcontainer2に入れる。
    });
  }, []);

  // センサーの定義
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const findContainer = (id) => {
    if (id in items) {
      return id;
    }
    return Object.keys(items).find((key) =>
      items[key].includes(id.toString())
    );
  };
// Object.keys(items)は、itemsというオブジェクトの中のキーを配列として返す、という働きをする(つまり、["Container1","Container1","Container3",]という配列を返す。)
// .find メソッドは、()内の関数が true を返す最初の要素を返します。
// つまり、find()関数の中で条件に合うものの存在を探し、それに対してtrueで返すもの、つまり条件に合うものの1番初めのものを返す働きをする
//items[key].includes(id.toString())は、itemsオブジェクトのキーで構成された配列のうち、idを含むものを探す働きをする。
//言い換えると、「itmesオブジェクトのキーに対応する値に"id"と同じものを含む」という条件を満たす「キー」をreturnする、ということです。
// ちなみに、items[key]となっているのはブラケット記法だから。プロパティの値にアクセスするためにドット記法を使うかブラケット記法を使うかは、以下の通り。
// ドット記法
// 形式: object.property
// 使い方: プロパティ名が静的である場合（すなわち、コードを書く時点でプロパティ名が既知であり、変更されない場合）に使用します。
// 例: items.container1
// ブラケット記法
// 形式: object[key]
// 使い方: プロパティ名が動的である場合、または変数を用いてプロパティにアクセスする場合に使用します。また、プロパティ名にスペースや特殊文字が含まれている場合や、プロパティ名が数値の場合にも使用されます。
// 例: items[key] ここで key は変数です。 

  // まとめると、このfindContainer関数は、自分がコンテナをクリックしてドラッグしようとしているのか、コンテナの中のアイテムをドラッグしようとしているのかを判別する働きをしている。もしコンテナ内のアイテムなら、どのアイテムかをstringで返す、という働きをしている。

  const handleDragStart = (event:DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id);
  };

  // activeは、dnd-kitに特有の、ドラッグされているアイテムに関する情報をもつプロパティで、任意の単語ではない。
  // activeの中には、位置やidなどの情報が含まれており、その中のidにアクセスして、ドラッグされているアイテムはどれか、ということに関するactiveIDを更新している。

  const handleDragOver = (event:DragOverEvent) => {
    const { active, over } = event; //eventオブジェクトからactiveの値とoverの値を取り出してる。const{active}=eventとconst{over}=eventを省略して一つにまとめている。
    const id = active.id.toString();
    const overId = over?.id;

    // overはドラッグ操作をされている時に、そのアイテムの上にある別の要素の情報を含む。
    // const overId = over?.id; は、オプショナルチェーン（Optional Chaining）演算子 ?. を使用しています。この演算子は、JavaScriptにおいて、オブジェクトのプロパティを安全に参照するために使用されます。
    // over は、おそらくイベントオブジェクトの一部で、ドラッグされているアイテムの上にある別の要素（element）に関する情報を持っている可能性があります。このコードでは、over オブジェクトが存在するかどうかを確認し、存在する場合はその id プロパティの値を overId に代入しています。
    // 具体的には、over?.id の部分は以下のように動作：
    
    // もし over が null または undefined であれば、over?.id は undefined を返します。この場合、overId には undefined が代入されます。
    // もし over がオブジェクトで、id プロパティを持っていれば、over?.id は over の id プロパティの値を返します。この場合、overId にはその値が代入されます。
    // この記述は、over が未定義（undefined）またはnullでない場合にのみ id プロパティにアクセスすることを保証し、TypeError を防ぐために使用されます。これにより、コードのロバスト性が向上する。
    if (!overId) return;

    const activeContainer = findContainer(id);
    const overContainer = findContainer(over?.id);

    if (!activeContainer || !overContainer || activeContainer === overContainer) {
      return;
    }

    setItems((prev) => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];
      const activeIndex = activeItems.indexOf(id);
      const overIndex = overItems.indexOf(overId.toString());

      // let newIndex;
      // if (overId in prev) {
      //   newIndex = overItems.length;
      // } else {
      //   const isBelowLastItem = over && overIndex === overItems.length - 1;
      //   const modifier = isBelowLastItem ? 0: -1;
      //   // newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      //   newIndex = overIndex;

      // }
      let newIndex;
      if (overId in prev) {//in演算子はオブジェクトのキーに対して検索をかけるために使うもの
        newIndex = overItems.length; // コンテナの最後に追加
      } else {
    // overIndex は、ドラッグされたアイテムが挿入される位置を示す
        newIndex = overIndex;
      }


      return {
        ...prev,
        [activeContainer]: [...prev[activeContainer].filter((item) => item !== active.id),],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          items[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex),
        ],
      };
    });
  };

  const handleDragEnd = (event:DragEndEvent) => {
    const { active, over } = event;
    const id = active.id.toString();
    const overId = over?.id;

    if (!overId) return;

    const activeContainer = findContainer(id);
    const overContainer = findContainer(over?.id);

    if (!activeContainer || !overContainer || activeContainer !== overContainer) {
      return;
    }

    const activeIndex = items[activeContainer].indexOf(id);
    const overIndex = items[overContainer].indexOf(overId.toString());

    if (activeIndex !== overIndex) {
      setItems((prev) => ({
        ...prev,
        [overContainer]: arrayMove(prev[overContainer], activeIndex, overIndex),
      }));
    }

    setActiveId(null);
  };

  // const handleAnswer = () => {
  //   const isCorrect = items.container1.join(' ') === currentSentence;
  //   setAnswerResult(isCorrect ? "正解！" : "不正解！");
  //   onAnswer(isCorrect)
  // };

  const [answered, setAnswered] = useState(false);

  const handleAnswer = () => {
    const isCorrect = items.container1.join(' ') === currentSentence;
    setAnswerResult(isCorrect ? "正解！" : "不正解！");
    onAnswer(isCorrect);
    setAnswered(true); // 回答後の状態を更新
  };

  // const handleNextQuestion = () => {
  //   // ここで次のクイズに遷移する処理を実装
  //   // 例: onNext() を呼び出す
  //   onNext();
  // };


  return (
    <div>
      <div>
        <div style={{ margin: '10px' }}>
          <div>聞こえた通りに文章を作成してください</div>
          <div>
            {/* 画像表示場所 */}
            <img src="/image/catIsOnTheCushion.png" alt="A cat sitting on a cushion" style={{ maxWidth: '30%', height: 'auto' }} />
          </div>
          <div style={{ margin: '10px' }}>
            <button onClick={() => new Audio('/sound/catIsOnTheCushion.mp3').play()}>音声を再生</button>
          </div>
        </div>
        <DndContext
          sensors={sensors}
          collisionDetection={rectIntersection}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <SortableContainer
            id="container1"
            items={items.container1}
            label="回答欄" />
          <SortableContainer
            id="container2"
            label="問題文"
            items={items.container2} />
          <DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay>
        </DndContext>

        {!answered && (
        <button onClick={handleAnswer}>回答する</button>
      )}
      {answered && (
        <button onClick={onNext}>次へ</button>
      )}
      {answerResult && <div>{answerResult}</div>}

        {/* <button onClick={handleAnswer}>回答する</button>
        {answerResult && <div>{answerResult}</div>} */}
      </div>
    </div>
  );
};

export default DragDropChallenge;


//疑問点
//DragOverlayの働きについて確認
//onDragStart, onDragOver, onDragEndはそれぞれ、dnd-kitのもつ機能なのか、それがどういったものなのかを確認。
//onClick的な感じの理解でいいのだろうか？
//UniqueIdentifierの働きを復習。