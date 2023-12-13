import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import  Container from 'react-bootstrap/Container';
import {
  DndContext,
  closestCenter
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";

import { useState } from 'react';
import SortableItem from "./SortableItem";

export default function DragDropChallenge(){
  const[languages, setLanguages] = useState(["English", "Spanish","Japanese"]);

  return(
<DndContext
  collisionDetection = {closestCenter}
  onDragEnd={handleDragEnd}
>
  <Container className='p-3' style={{"width":"200px"}} >

<h3
style={{"width":"400px"}} align="center">
  The bset programming languages!
  </h3>

<SortableContext
style={{"width":"100px"}} 
items={languages}
strategy={verticalListSortingStrategy}
>

{/* We need components that use the useSortable hook */}
{languages.map(language => <SortableItem key={language} id={language}>

</SortableItem> )}
</SortableContext>

  </Container>

    </DndContext>
  );

    function handleDragEnd(event){
      console.log("Drag end called");
      const {active, over} = event;
      console.log("ACTIVE:"+ active.id )
      console.log("OVER:"+ over.id )

      if(active.id !== over.id){
        setLanguages((items)=>{
          const activeIndex = items.indexOf(active.id);
          const overIndex = items.indexOf(over.id);
          console.log(arrayMove(items, activeIndex, overIndex))
          
          return arrayMove(items, activeIndex, overIndex);
        });
      }
    }


};