import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext,} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import React from "react";
import { itemTextBox, rightRow } from "./SortableContainer.css";
import { rightRowBox } from "./SortableContainer.css";
import { container } from "./SortableContainer.css";

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
    // <div className="w-[calc(33%-5px)]">
    <div className={container}>
      <h3 >{label}</h3>
      <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
        <div
          ref={setNodeRef}
          // className="w-full border-2 border-gray-500/75 p-5 mt-2 rounded-md"
          className={itemTextBox}
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
