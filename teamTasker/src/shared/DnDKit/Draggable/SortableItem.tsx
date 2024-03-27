import { ReactNode } from "react";
import styles from "./SortableItem.module.scss"
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export interface DraggableProps {
    children: ReactNode
    id: string
}

export function SortableItem(props: DraggableProps) {

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id: props.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };


    return (
        <div ref={setNodeRef} className={styles.task_card_wrapper} style={style} {...listeners} {...attributes}>
            {props.children}
        </div>
    );
}
