import styles from "src/pages/TaskCreatePage/TaskCreatePage.module.scss";
import { Button, Input } from "src/shared";
import { useState } from "react";
import { useAppDispatch } from "src/hooks/storeHooks.ts";
import { Flags, TaskFetchData } from "src/schemas/config.ts";
import { useParams } from "react-router";
import { addTasksToProject } from "src/entities/Project/lib/services/addTasksToProject.ts";
import { useNavigate } from "react-router-dom";
import { getTasksByProjectId } from "src/entities/Project/lib/services/getTasksByProjectId.ts";

export const TaskCreatePage = () => {
    const [taskList, setTaskList] = useState<TaskFetchData[]>([]);
    const dispatch = useAppDispatch();
    const { projectId } = useParams();
    const navigate = useNavigate();

    if (!projectId) {
        return 0
    }

    const handleClick = async () => {
        console.log(projectId, taskList);
        await dispatch(addTasksToProject({ projectId, taskList }));
        console.log(projectId);
        await dispatch(getTasksByProjectId(projectId))
        navigate(`/workspace/${projectId}`)
    };

    const handleTaskNameChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const updatedTaskList = taskList?.map((task, i) => {
            if (i === index) {
                // Updating taskName only for the specified task
                return {
                    ...task,
                    taskName: e.target.value,
                };
            }
            return task;
        });

        setTaskList(updatedTaskList || []);
    };

    return (
        <div className={styles.createTasks}>
            <h1>Add tasks to your project</h1>
            <p>Tasks</p>
            <div id={"taskList"} className={styles.tasks}>
                {taskList &&
                    taskList.map((el, index) => (
                        <Input
                            className={styles.task}
                            key={index}
                            value={el.taskName}
                            onChange={(e) => handleTaskNameChange(e, index)}
                            placeholder={"e.g. Create cool web-app"}
                        />
                    ))}
            </div>
            <Button
                onClick={() => {
                    setTaskList((prevTasks) => [
                        ...prevTasks,
                        {
                            projectId: projectId, // Make sure to provide the correct project ID
                            flag: Flags.TODO,
                            taskName: "",
                            description: "",
                        },
                    ]);
                }}
            >
                + Task
            </Button>

            <Button className={styles.submitButton} onClick={handleClick}>
                Add tasks to the project
            </Button>
        </div>
    );
};
