import styles from "./TaskCreationPopup.module.scss";
import { Status } from "src/schemas/config.ts";
import { useEffect, useState } from "react";
import { useAppDispatch } from "src/hooks/storeHooks.ts";
import { useParams } from "react-router";
import { addTasksToProject } from "src/entities/Project/lib/services/addTasksToProject.ts";
import { getTasksByProjectId } from "src/entities/Project/lib/services/getTasksByProjectId.ts";
import Input from "src/shared/Input/ui/Input.tsx";
import Button, { ButtonStyles } from "src/shared/Button/Button.tsx";
import { SubTask, TaskFetchData } from "src/entities/Project/lib/schema/schema.ts";
import project from "src/entities/Project/ui/Project.tsx";
import { useSelector } from "react-redux";
import { getCurrentProject } from "src/entities/Project";

interface TaskCreationProps {
    setIsAddTaskPopup: (option: boolean) => void
}

export const TaskCreationPopup = (props: TaskCreationProps) => {
    const { setIsAddTaskPopup } = props;
    const project = useSelector(getCurrentProject);
    const dispatch = useAppDispatch();
    const { projectId } = useParams();

    const [task, setTask] = useState<TaskFetchData>({
        taskName: "",
        projectId: projectId || "",
        status: Status.TODO,
        renderIndex: Date.now(),
        description: "",
        subTasks: [
            { _id: Date.now().toString(), todo: "", isDone: false },
        ]
    });

    useEffect(() => {
        if (!projectId) {
            return;
        }

        // Add project ID to the dependency array of the useEffect to ensure it's triggered when projectId changes
        dispatch(getTasksByProjectId(projectId));
    }, [projectId, dispatch]);

    const handleClick = async () => {
        if (!projectId) {
            // Handle the case where projectId is undefined
            console.error("Project ID is undefined");
            return;
        }

        if (task.taskName === "" && task.description === "") {
            setIsAddTaskPopup(false);
            return;
        }

        if (task.subTasks && task.subTasks[0].todo === "") {
            task.subTasks = [];
        }

        await dispatch(addTasksToProject({ projectId, task }));
        await dispatch(getTasksByProjectId(projectId));


        // Update localStorage with the new task order

        // console.log(project.taskList, project.taskList.length)
        //
        // const newTask = project.taskList[project.taskList.length - 1];
        // console.log(newTask)
        // if (newTask) {
        //     const newTaskId = newTask._id;
        //     const localStorageItem = localStorage.getItem(projectId);
        //     console.log(localStorage.getItem(`${project._id}`));
        //
        //     if (localStorageItem) {
        //         console.log(localStorage.getItem(`${project._id}`));
        //         const taskOrder: string[] = JSON.parse(localStorageItem);
        //         taskOrder.push(newTaskId);
        //         localStorage.setItem(projectId, JSON.stringify(taskOrder));
        //     } else {
        //         console.log(localStorage.getItem(`${project._id}`));
        //         localStorage.setItem(projectId, JSON.stringify([newTaskId]));
        //     }
        // }

        setIsAddTaskPopup(false);
        setTask({
            taskName: "",
            projectId: projectId,
            status: Status.TODO,
            renderIndex: Date.now(),
            description: "",
            subTasks: [{ _id: Date.now().toString(), todo: "", isDone: false }]
        });
    };


    const renderCreationPopup = () => {
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
                            <>
                                {task.subTasks && <Input
                                    key={subtask._id}
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
                            </>
                        )
                    })}
                    <Button buttonStyle={ButtonStyles.OUTLINE} className={styles.add_subtask_button}
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
                        Add Subtask
                    </Button>
                </div>
                <Button className={styles.submit_button} onClick={handleClick}>
                    Add tasks to the project
                </Button>
            </div>
        )
    }

    return (
        <>
            {renderCreationPopup()}
        </>
    )
}
