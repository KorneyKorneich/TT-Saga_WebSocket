import styles from "./Project.module.scss"
import { Button, TaskCard } from "src/shared";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch } from "src/hooks/storeHooks.ts";
import { getTasksByProjectId } from "src/entities/Project/lib/services/getTasksByProjectId.ts";
import { useSelector } from "react-redux";
import { getCurrentProject } from "src/entities/Project";
import { Flags, TaskSchema } from "src/schemas/config.ts";
import { setCurrentProject } from "src/entities/Project/lib/slice/projectSlice.ts";
import { Popup } from "src/shared/Popup/ui/Popup.tsx";
import { updateProject } from "src/entities/Project/lib/services/updateProject.ts";

export const Project = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const project = useSelector(getCurrentProject);

    const [isChanged, setIsChanged] = useState(false);
    const [isPopup, setIsPopup] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
    const [taskDetails, setTaskDetails] = useState<TaskSchema | null>({
        _id: "",
        taskName: "",
        flag: Flags.TODO,
        projectId: ""
    });

    const closeModal = async () => {
        if (taskDetails && isChanged) {
            console.log(taskDetails);
            await dispatch(updateProject(taskDetails));
        }
        console.log(project)
        setIsChanged(false);
        setSelectedTaskId(null);
        setIsPopup(false);
        setTaskDetails(null);
    }

    const openModal = (taskId: string) => {
        setSelectedTaskId(taskId);
        const selectedTask = project?.taskList.findIndex((el) => el._id === taskId);
        if (selectedTask !== undefined && selectedTask !== -1) {
            setTaskDetails(project?.taskList[selectedTask]);
            setIsPopup(true);
        }
    }


    function handleSubtaskStatusChange(elementId: string) {
        if (!taskDetails || !taskDetails.subTasks) return;

        const subtaskIndex = taskDetails.subTasks.findIndex((el) => el._id === elementId);
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

    useEffect(() => {
        if (projectId != null) {
            dispatch(getTasksByProjectId(projectId))
            dispatch(setCurrentProject(projectId))
        }
    }, [projectId, dispatch]);

    return (
        <div className={styles.projectPage}>
            <div className={styles.columns}>
                <TaskCard flag={Flags.TODO} openModal={openModal}/>
                <TaskCard flag={Flags.IN_PROGRESS} openModal={openModal}/>
                <TaskCard flag={Flags.DONE} openModal={openModal}/>
            </div>
            <Button onClick={() => navigate(`/addTasksToProject/${projectId}`)}>+ Task</Button>

            <Popup
                isPopupOpen={isPopup}
                selectedTaskId={selectedTaskId || undefined}
                closeModal={closeModal}
            >
                <h3 className={styles.task_title}>{taskDetails && taskDetails.taskName}</h3>
                <div className={styles.task_details}>
                    <div className={styles.task_description}>
                        <p>
                            {taskDetails?.description}
                        </p>
                    </div>
                    <h5>Subtasks</h5>
                    <div className={styles.task_subtasks}>
                        {taskDetails?.subTasks && taskDetails.subTasks.map((el) => {
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
                </div>
            </Popup>
        </div>

    )
}
