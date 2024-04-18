import { ReactNode } from "react";
import styles from "./SortableItem.module.scss"
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TaskSchema } from "src/entities/Project/lib/schema/schema.ts";

export interface DraggableProps {
    children: ReactNode
    task: TaskSchema
}

export function SortableItem(props: DraggableProps) {
    const { task, children } = props

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({
        id: task.renderIndex,
        data: {
            type: "Task",
            task
        }
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };


    return (
        <div ref={setNodeRef} className={styles.task_card_wrapper} style={style} {...listeners} {...attributes}>
            {children}
        </div>
    );
}
