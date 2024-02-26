import styles from "./Project.module.scss"
import { TaskCard } from "src/shared";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useAppDispatch } from "src/hooks/storeHooks.ts";
import { getTasksByProjectId } from "src/entities/Project/lib/services/getTasksByProjectId.ts";
import { useSelector } from "react-redux";
import { getCurrentProject } from "src/entities/Project";
import { Flags, TaskSchema } from "src/schemas/config.ts";
import { setCurrentProject } from "src/entities/Project/lib/slice/projectSlice.ts";
import { Popup } from "src/shared/Popup/ui/Popup.tsx";
import { updateProject } from "src/entities/Project/lib/services/updateProject.ts";
import { TaskDetailsPopup } from "src/popups/TaskDetailsPopup/TaskDetailsPopup.tsx";

export const Project = () => {

    const { projectId } = useParams();
    const dispatch = useAppDispatch();
    const project = useSelector(getCurrentProject);

    const [isChanged, setIsChanged] = useState(false);
    const [isTaskDetailsPopup, setIsTaskDetailsPopup] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
    const [taskDetails, setTaskDetails] = useState<TaskSchema>({
        _id: "",
        taskName: "",
        flag: Flags.TODO,
        projectId: ""
    });

    const closeDetailsModal = async () => {
        if (taskDetails && isChanged) {
            console.log(taskDetails);
            await dispatch(updateProject(taskDetails));
        }
        setIsChanged(false);
        setSelectedTaskId(null);
        setIsTaskDetailsPopup(false);
        setTaskDetails(
            {
                _id: "",
                taskName: "",
                flag: Flags.TODO,
                projectId: ""
            }
        );
    }

    const openModal = (taskId: string) => {
        setSelectedTaskId(taskId);
        const selectedTask = project?.taskList.findIndex((el) => el._id === taskId);
        if (selectedTask !== undefined && selectedTask !== -1) {
            setTaskDetails(project?.taskList[selectedTask]);
            setIsTaskDetailsPopup(true);
        }
    }
    
    useEffect(() => {
        if (projectId != null) {
            dispatch(getTasksByProjectId(projectId))
            dispatch(setCurrentProject(projectId))
        }
    }, [projectId, dispatch]);

    return (
        <>
            <div className={styles.projectPage}>
                <div className={styles.columns}>
                    <TaskCard flag={Flags.TODO} openModal={openModal}/>
                    <TaskCard flag={Flags.IN_PROGRESS} openModal={openModal}/>
                    <TaskCard flag={Flags.DONE} openModal={openModal}/>
                </div>

                <Popup
                    isPopupOpen={isTaskDetailsPopup}
                    selectedTaskId={selectedTaskId || undefined}
                    closeModal={closeDetailsModal}
                >
                    <TaskDetailsPopup taskDetails={taskDetails} setTaskDetails={setTaskDetails}
                                      setIsChanged={setIsChanged}/>
                </Popup>
            </div>
        </>
    )
}
