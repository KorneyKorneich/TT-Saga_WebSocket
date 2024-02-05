import styles from "./Project.module.scss"
import { Button, CustomPopup } from "src/shared";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch } from "src/hooks/storeHooks.ts";
import { getTasksByProjectId } from "src/entities/Project/lib/services/getTasksByProjectId.ts";
import { useSelector } from "react-redux";
import { getCurrentProject } from "src/entities/Project";
import { Flags, stateSchema, TaskSchema } from "src/schemas/config.ts";
import { setCurrentProject } from "src/entities/Project/lib/slice/projectSlice.ts";
import { getTaskDetails } from "src/entities/Project/lib/selectors/getTaskDetails.ts";
import { Popup } from "src/shared/Popup/ui/Popup.tsx";

export const Project = () => {
    const { projectId } = useParams()
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const project = useSelector(getCurrentProject);

    const [isPopup, setIsPopup] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState("");
    const [taskDetails, setTaskDetails] = useState<TaskSchema | null>({
        _id: "",
        taskName: "",
        flag: Flags.TODO,
        projectId: ""
    });


    const closeModal = () => {
        setSelectedTaskId("");
        setTaskDetails(null);
        setIsPopup(false);
    }

    const openModal = (taskId: string) => {
        setSelectedTaskId(taskId);
        const selectedTask = project.taskList.findIndex((el) => el._id === taskId);
        setTaskDetails(project.taskList[selectedTask]);
        setIsPopup(true);
    }


    function transformString(inputString: string) {
        const stringWithCapitalizedFirstLetter = inputString.replace(/^./, (match) => match.toUpperCase());

        return stringWithCapitalizedFirstLetter.replace(/_/g, ' ');

    }

    useEffect(() => {
        if (projectId != null) {
            dispatch(getTasksByProjectId(projectId))
        }
        dispatch(setCurrentProject(projectId))
    }, [projectId]);

    console.log(project);

    return (
        <div className={styles.projectPage}>
            <div className={styles.columns}>
                <div className={styles.todo}>
                    <h6>{transformString(Flags.TODO)}</h6>
                    {project && project.taskList?.map((el) => {
                        if (el.flag === Flags.TODO) {
                            return (
                                <div key={el._id} onClick={() => openModal(el._id)}>
                                    {el.taskName}
                                </div>
                            )
                        }
                    })}
                </div>

                <div className={styles.inProgress}>
                    <h6>{transformString(Flags.IN_PROGRESS)}</h6>
                    {project && project.taskList?.map((el) => {
                        if (el.flag === Flags.IN_PROGRESS) {
                            return (
                                <div key={el._id}>
                                    {el.taskName}
                                </div>
                            )
                        }
                    })}
                </div>
                <div className={styles.done}>
                    <h6>{transformString(Flags.DONE)}</h6>
                    {project && project.taskList?.map((el) => {
                        if (el.flag === Flags.DONE) {
                            return (
                                <div key={el._id}>
                                    {el.taskName}
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
            <Button onClick={() => navigate(`/addTasksToProject/${projectId}`)}>+ Task</Button>

            <Popup
                isPopupOpen={isPopup}
                selectedTaskId={selectedTaskId}
                closeModal={closeModal}
            >
                {taskDetails && taskDetails.taskName}
            </Popup>
        </div>

    )
}
