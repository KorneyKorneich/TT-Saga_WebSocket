import styles from "./TaskDetailsPopup.module.scss"
import { Status } from "src/schemas/config.ts";
import { ChangeEvent } from "react";
import DeleteIcon from "src/shared/assets/delete_icon.svg?react"
import { useAppDispatch } from "src/hooks/storeHooks.ts";
import { deleteTaskById } from "src/entities/Project/lib/services/deleteTaskById.ts";
import { getTasksByProjectId } from "src/entities/Project/lib/services/getTasksByProjectId.ts";
import SVGComponent from "src/shared/SVGComponent/SVGComponent.tsx";
import Dropdown from "src/shared/DropDown/DropDown.tsx";
import { SubTask, TaskSchema } from "src/entities/Project/lib/schema/schema.ts";
import Button, { ButtonStyles } from "src/shared/Button/Button.tsx";

interface TaskDetailsProps {
    taskDetails: TaskSchema
    setTaskDetails: (updatedTask: TaskSchema) => void;
    setIsChanged: (option: boolean) => void
    setIsPopup?: (option: boolean) => void
}

export const TaskDetailsPopup = (props: TaskDetailsProps) => {

    const { taskDetails, setTaskDetails, setIsChanged, setIsPopup } = props;
    const dispatch = useAppDispatch();

    function handleTaskFlagChange(e: ChangeEvent<HTMLSelectElement>) {
        const updatedTask: TaskSchema = {
            ...taskDetails,
            status: e.target.value as Status
        }
        setTaskDetails(updatedTask);
        setIsChanged(true);
    }

    function handleSubtaskStatusChange(elementId: string) {
        if (!taskDetails || !taskDetails.subTasks) return;

        const subtaskIndex = taskDetails.subTasks.findIndex((el: SubTask) => el._id === elementId);
        if (subtaskIndex === -1) return;

        const updatedSubtasksList = [...taskDetails.subTasks];
        updatedSubtasksList[subtaskIndex] = {
            ...updatedSubtasksList[subtaskIndex],
            isDone: !updatedSubtasksList[subtaskIndex].isDone
        };

        const updatedTask = {
            ...taskDetails,
            subTasks: updatedSubtasksList
        };
        setIsChanged(true);
        setTaskDetails(updatedTask)
    }

    const handleTaskDelete = async () => {
        await dispatch(deleteTaskById({
            projectId: taskDetails.projectId,
            taskId: taskDetails._id
        }));
        await dispatch(getTasksByProjectId(taskDetails.projectId));
        if (setIsPopup) {
            setIsPopup(false);
        }
    }

    const handlePopupClose = () => {
        if (setIsPopup) {
            setIsPopup(false);
        }
    }

    const renderTaskDetails = () => {
        return (
            <>
                <div className={styles.task_header}>
                    <h3 className={styles.task_title}>{taskDetails && taskDetails.taskName}</h3>
                    <div className={styles.task_delete} onClick={handleTaskDelete}>
                        <SVGComponent size={25} color={"#ECEDF1"}>
                            <DeleteIcon/>
                        </SVGComponent>
                    </div>

                </div>
                <div className={styles.task_details}>
                    <div className={styles.task_description}>
                        <p>
                            {taskDetails?.description}
                        </p>
                    </div>
                    <h5>Subtasks</h5>
                    <div className={styles.task_subtasks}>
                        {taskDetails?.subTasks && taskDetails.subTasks.map((el: SubTask) => {
                            return (
                                <div className={styles.subtask} key={el._id}>
                                    <label className={el.isDone ? `${styles.task_done}` : ""}>
                                        <input onChange={() => handleSubtaskStatusChange(el._id)}
                                               checked={el.isDone}
                                               type={"checkbox"}
                                               name={el._id}/>
                                        {el.todo}
                                    </label>
                                </div>
                            )
                        })}
                    </div>
                    <div className={styles.status}>
                        <p>Status</p>
                        <Dropdown taskStatus={taskDetails.status} handleStatusSelect={(e) => handleTaskFlagChange(e)}/>
                    </div>
                    <div className={styles.controls}>
                        <Button className={styles.close_btn} buttonStyle={ButtonStyles.OUTLINE}
                                onClick={handlePopupClose}>Close</Button>

                        {/*<Button className={styles.submit_changes}>Save changes</Button>*/}
                    </div>

                </div>
            </>
        )
    }
//TODO: create copy of project with changes, after save apply them to the project
    return (
        renderTaskDetails()
    )

}
