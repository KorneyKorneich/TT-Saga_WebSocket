import styles from "./TaskCreationPopup.module.scss";
import { Button, Input } from "src/shared";
import { Flags, SubTask, TaskFetchData } from "src/schemas/config.ts";
import { useState } from "react";
import { useAppDispatch } from "src/hooks/storeHooks.ts";
import { useParams } from "react-router";
import { addTasksToProject } from "src/entities/Project/lib/services/addTasksToProject.ts";
import { getTasksByProjectId } from "src/entities/Project/lib/services/getTasksByProjectId.ts";

interface TaskCreationProps {
    setIsAddTaskPopup: (option: boolean) => void
}

export const TaskCreationPopup = (props: TaskCreationProps) => {

    const { setIsAddTaskPopup } = props;

    const [task, setTask] = useState<TaskFetchData>({
        taskName: "",
        projectId: "",
        flag: Flags.TODO,
        description: "",
        subTasks: [
            { _id: Date.now().toString(), todo: "", isDone: false }, // Первая задача
        ]
    });

    const dispatch = useAppDispatch();
    const { projectId } = useParams();

    if (!projectId) {
        return null
    }

    const handleClick = async () => {
        if (task.taskName === "" || task.description === "") {
            setIsAddTaskPopup(false);
        } else {
            await dispatch(addTasksToProject({ projectId, task }));
            await dispatch(getTasksByProjectId(projectId))
            setIsAddTaskPopup(false);
        }

    };

    return (
        <div className={styles.createTask}>
            <div className={styles.task_title}>
                <h4>Title</h4>
                <Input placeholder={"Type title here"} value={task?.taskName}
                       onChange={(e) => setTask({
                               ...task,
                               taskName: e.target.value
                           }
                       )}
                />
            </div>
            <div className={styles.task_description}>
                <h4>Description</h4>
                <Input placeholder={"Type description here"} value={task?.description}
                       onChange={(e) => setTask({
                               ...task,
                               description: e.target.value
                           }
                       )}
                />
            </div>
            <div className={styles.task_subtasks}>
                <h4>Subtasks</h4>
                {task.subTasks && task.subTasks.map((subtask, index) => {
                    const subtaskPosition = index; // каждой подзадаче присваивается свой уникальный индекс
                    return (
                        <div key={subtask._id}>
                            {task.subTasks && <Input
                                placeholder={"Type subtask here"}
                                value={task.subTasks[subtaskPosition].todo}
                                onChange={(e) => {
                                    setTask(prevState => {
                                        const updatedSubTasks: SubTask[] = [...(prevState.subTasks) as []]; // Создаем копию массива subTasks
                                        updatedSubTasks[subtaskPosition] = {
                                            ...updatedSubTasks[subtaskPosition],
                                            todo: e.target.value
                                        }; // Обновляем значение todo в нужном объекте в массиве subTasks
                                        return { ...task, subTasks: updatedSubTasks }; // Обновляем состояние task с обновленным массивом subTasks
                                    });
                                }}
                            />}
                        </div>
                    )
                })}

                <Button className={styles.add_subtask_button}
                        onClick={() => {
                            setTask(prevState => ({
                                ...prevState,
                                subTasks: [
                                    ...(prevState.subTasks) as [],
                                    { _id: Date.now().toString(), todo: "", isDone: false }
                                ]
                            }));
                        }}
                >
                    + Subtask
                </Button>
            </div>
            <Button className={styles.submit_button} onClick={handleClick}>
                Add tasks to the project
            </Button>
        </div>
    )
}
