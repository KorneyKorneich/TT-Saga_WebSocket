import { useDroppable } from '@dnd-kit/core';
import { ReactNode } from "react";
import styles from "./Droppable.module.scss"

export interface DroppableProps {
    children: ReactNode;
    id: string
}

export function Droppable(props: DroppableProps) {
    const { isOver, setNodeRef } = useDroppable({
        id: 'droppable',
    });


    return (
        <div ref={setNodeRef} className={isOver ? `${styles.dropArea}` : ""}>
            {props.children}
        </div>
    );
}

//TODO: ids in droppable and draggable
