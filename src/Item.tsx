import { UniqueIdentifier } from "@dnd-kit/core";
import React from "react";
import { itemText} from "./SortableContainer.css";

const Item = ({ id }: { id: UniqueIdentifier }) => {
  return (
    <div className={itemText}>
      {id}
    </div>
  );
};
export default Item;
