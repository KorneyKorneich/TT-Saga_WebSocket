import styles from "src/pages/TaskCreatePage/TaskCreatePage.module.scss";
import { Button, Input, Popup } from "src/shared";
import { useState } from "react";
import { useAppDispatch } from "src/hooks/storeHooks.ts";
import { Flags, SubTask, TaskFetchData } from "src/schemas/config.ts";
import { useParams } from "react-router";
import { addTasksToProject } from "src/entities/Project/lib/services/addTasksToProject.ts";
import { useNavigate } from "react-router-dom";
import { getTasksByProjectId } from "src/entities/Project/lib/services/getTasksByProjectId.ts";

export const TaskCreatePage = () => {
    // const [taskList, setTaskList] = useState<TaskFetchData[]>([]);

    const [task, setTask] = useState<TaskFetchData>({
        taskName: "",
        projectId: "",
        flag: Flags.TODO,
        description: "",
        subTasks: [
            { _id: Date.now().toString(), todo: "" }, // Первая задача
        ]
    });
    const [isPopup, setIsPopup] = useState(false);
    const dispatch = useAppDispatch();
    const { projectId } = useParams();
    const navigate = useNavigate();

    if (!projectId) {
        return null
    }

    const handleClick = async () => {
        await dispatch(addTasksToProject({ projectId, task }));
        console.log(projectId);
        await dispatch(getTasksByProjectId(projectId))
        navigate(`/workspace/${projectId}`)
    };

    // const handleTaskNameChange = (
    //     e: React.ChangeEvent<HTMLInputElement>,
    //     index: number
    // ) => {
    //     const updatedTaskList = taskList?.map((task, i) => {
    //         if (i === index) {
    //             // Updating taskName only for the specified task
    //             return {
    //                 ...task,
    //                 taskName: e.target.value,
    //             };
    //         }
    //         return task;
    //     });
    //
    //     setTaskList(updatedTaskList || []);
    // };

    return (
        <>
            <Popup
                isPopupOpen={isPopup}
                closeModal={() => setIsPopup(false)}
            >
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

                        <Button
                            onClick={() => {
                                setTask(prevState => ({
                                    ...prevState,
                                    subTasks: [
                                        ...(prevState.subTasks) as [],
                                        { _id: Date.now().toString(), todo: "" }
                                    ]
                                }));
                            }}
                        >
                            + Subtask
                        </Button>
                    </div>
                    <Button className={styles.submitButton} onClick={handleClick}>
                        Add tasks to the project
                    </Button>
                </div>
            </Popup>

            {/*    <div className={styles.createTasks}>*/}
            {/*        <h1>Add tasks to your project</h1>*/}
            {/*        <p>Tasks</p>*/}
            {/*        <div id={"taskList"} className={styles.tasks}>*/}
            {/*            {taskList &&*/}
            {/*                taskList.map((el, index) => (*/}
            {/*                    <Input*/}
            {/*                        className={styles.task}*/}
            {/*                        key={index}*/}
            {/*                        value={el.taskName}*/}
            {/*                        onChange={(e) => handleTaskNameChange(e, index)}*/}
            {/*                        placeholder={"e.g. Create cool web-app"}*/}
            {/*                    />*/}
            {/*                ))}*/}
            {/*        </div>*/}
            <Button
                // onClick={() => {
                //     setTaskList((prevTasks) => [
                //         ...prevTasks,
                //         {
                //             projectId: projectId, // Make sure to provide the correct project ID
                //             flag: Flags.TODO,
                //             taskName: "",
                //             description: "",
                //         },
                //     ]);
                // }}
                onClick={() => setIsPopup(true)}
            >
                + Task
            </Button>


            {/*    </div>*/}
        </>

    );
};
