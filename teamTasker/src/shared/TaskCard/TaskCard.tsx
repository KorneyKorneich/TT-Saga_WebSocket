import styles from "./TaskCard.module.scss";
import { Flags } from "src/schemas/config.ts";
import { useSelector } from "react-redux";
import { getCurrentProject } from "src/entities/Project";

interface TaskCardProps {
    flag: Flags,
    openModal: (id: string) => void
}

export const TaskCard = (props: TaskCardProps) => {

    const {
        openModal,
        // closeModal,
        flag
    } = props


    const project = useSelector(getCurrentProject);

    function transformFlagToString(flag: Flags) {
        return flag.replace('_', ' ');
    }

    const taskList = project?.taskList?.filter((el) => {
        if (el.flag === flag) return el;
    });

    return (
        <div className={`${styles.column}`}>
            <h6>{transformFlagToString(flag)} ({taskList?.length})</h6>
            {taskList && taskList?.map((el) => {
                if (el) {
                    return (
                        <div className={styles.task_card} key={el?._id} onClick={() => openModal(el._id)}>
                            <div>{el?.taskName}</div>
                            <div>{el.subTasks?.filter(subtask => subtask.isDone).length} of {el?.subTasks?.length} subtasks</div>
                        </div>
                    )
                }
            })}
        </div>
    )
}
