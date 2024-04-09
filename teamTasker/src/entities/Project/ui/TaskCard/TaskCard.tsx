import styles from "./TaskCard.module.scss";
import { TaskSchema } from "src/entities/Project/lib/schema/schema.ts";
import { SortableItem } from "src/shared/DnDKit/Draggable/SortableItem.tsx";

export interface TaskCardProps {
    openModal?: (id: string) => void
    task: TaskSchema | null
    id?: string
}

export const TaskCard = (props: TaskCardProps) => {

    const { task, openModal } = props;
    if (task === null) return null;
    return (
        <SortableItem id={task._id} key={task?._id}>
            <div className={styles.task_card} key={task?._id} onClick={() => openModal ? openModal(task._id) : null}>
                <div>{task?.taskName}</div>
                {
                    task.subTasks?.length ?
                        <div>{task.subTasks?.filter(subtask => subtask.isDone).length} of {task?.subTasks?.length} subtasks</div>
                        : null
                }
            </div>
        </SortableItem>
    )
}
