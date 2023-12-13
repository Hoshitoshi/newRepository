import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import React from "react";
import { rightRow } from "./SortableContainer.css";


// import styles from './Sortable.module.css'; // CSSモジュールのインポート

const SortableContainer = ({
  id,
  items,
  label,
}: {
  id: string;
  items: string[];
  label: string;
}) => {
  const { setNodeRef } = useDroppable({
    id,
  });
  return (
    <div className={rightRow}>
      <h3 className={rightRow}>{label}</h3>
      <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
        <div
          ref={setNodeRef}
          className={rightRow}
          // className="w-full border-2 border-gray-500/75 p-5 mt-2 rounded-md"
        >
          {items.map((id: string) => (
            <SortableItem key={id} id={id} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default SortableContainer;
