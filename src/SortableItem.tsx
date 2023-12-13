import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { UniqueIdentifier } from "@dnd-kit/core";
import Item from "./Item";
import React from "react";
import { itemText, rightRow } from "./SortableContainer.css";

const SortableItem = ({ id }: { id: UniqueIdentifier }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
      {...listeners}
      className={rightRow}
    >
      <Item id={id}/>
    </div>
  );
};

export default SortableItem;
