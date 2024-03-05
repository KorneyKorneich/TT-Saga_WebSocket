import styles from "./TaskColumn.module.scss";
import { Status, TaskSchema } from "src/schemas/config.ts";
import { useSelector } from "react-redux";
import { getCurrentProject } from "src/entities/Project";

interface TaskCardProps {
    status: Status,
    openModal: (id: string) => void
}

export function transformFlagToString(status: Status) {
    return status.replace('_', ' ');
}

const TaskColumn = (props: TaskCardProps) => {

    const {
        openModal,
        // closeModal,
        status
    } = props


    const project = useSelector(getCurrentProject);

    const taskList = project?.taskList?.filter((el) => {
        if (el.flag === status) return el;
    });

    const renderTasks = (taskList: TaskSchema[]) => {
        return (
            taskList?.map((el) => {
                if (el) {
                    return (
                        <div className={styles.task_card} key={el?._id} onClick={() => openModal(el._id)}>
                            <div>{el?.taskName}</div>
                            {
                                el.subTasks?.length ?
                                    <div>{el.subTasks?.filter(subtask => subtask.isDone).length} of {el?.subTasks?.length} subtasks</div>
                                    : null
                            }
                        </div>
                    )
                }
            })
        )
    }

    return (
        <div className={`${styles.column}`}>
            <h6>{transformFlagToString(status)} ({taskList?.length})</h6>
            {renderTasks(taskList)}
        </div>
    )
}

export default TaskColumn;
