import styles from "./TaskColumn.module.scss";
import { Status } from "src/schemas/config.ts";
import { TaskSchema } from "src/entities/Project/lib/schema/schema.ts";
import { TaskCard } from "src/entities/Project/ui/TaskCard/TaskCard.tsx";
import {
    SortableContext,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";


interface TaskCardProps {
    openModal: (id: string) => void,
    status: Status,
    id: string,
    tasks: TaskSchema[]

}

export function transformFlagToString(status: Status) {
    return status.replace('_', ' ');
}

const TaskColumn = (props: TaskCardProps) => {

    const {
        openModal,
        // closeModal,
        id,
        tasks,
        status
    } = props


    const renderTasks = (tasks: TaskSchema[]) => {
        return (
            tasks?.map((el) => {
                if (el) {
                    return <TaskCard key={el._id} openModal={openModal} task={el}/>
                }
            })
        )
    }


    const { setNodeRef } = useDroppable({
        id
    });

    return (
        <SortableContext
            id={id}
            items={tasks?.map((el) => el.renderIndex)}
            strategy={verticalListSortingStrategy}
        >
            <div ref={setNodeRef} className={`${styles.column}`}>
                <h6>{transformFlagToString(status)} ({tasks?.length})</h6>
                <div className={styles.task_list}>
                    {renderTasks(tasks)}
                </div>
            </div>
        </SortableContext>
    )
}

export default TaskColumn;
