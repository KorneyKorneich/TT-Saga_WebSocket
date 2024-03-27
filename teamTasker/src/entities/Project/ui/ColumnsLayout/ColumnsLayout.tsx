import TaskColumn from "src/shared/TaskColumn/TaskColumn.tsx";
import { Status } from "src/schemas/config.ts";
import { useEffect, useState } from "react";
import { TaskSchema } from "src/entities/Project/lib/schema/schema.ts";
import { useSelector } from "react-redux";
import { getCurrentProject } from "src/entities/Project";
import styles from "src/entities/Project/ui/Project.module.scss";
import { closestCorners, DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { TaskCard } from "src/entities/Project/ui/TaskCard/TaskCard.tsx";
import { arrayMove } from "@dnd-kit/sortable";
import { DragEndEvent, DragOverEvent, DragStartEvent } from "@dnd-kit/core";
import { useAppDispatch } from "src/hooks/storeHooks.ts";
import { updateTask } from "src/entities/Project/lib/services/updateTask.ts";
import { swapTasks } from "src/entities/Project/lib/services/swapTasks.ts";


export interface ColumnLayoutProps {
    openModal: (id: string) => void
}

export interface tasksType {
    [key: string]: TaskSchema[]; // Индексная сигнатура, позволяющая использовать строки в качестве ключей
}


export const ColumnsLayout = (props: ColumnLayoutProps) => {
    const { openModal } = props;

    const project = useSelector(getCurrentProject);

    const [tasks, setTasks] = useState<tasksType>({
        [Status.TODO]: [],
        [Status.IN_PROGRESS]: [],
        [Status.DONE]: [],
    });

    const [activeId, setActiveId] = useState<string>("");

    const dispatch = useAppDispatch();

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    )

    const updateTasks = () => {
        const updatedTasks: tasksType = {
            [Status.TODO]: [],
            [Status.IN_PROGRESS]: [],
            [Status.DONE]: [],
        };

        // Проверка на существование project и его свойства taskList
        if (project && Array.isArray(project.taskList)) {
            // Сортировка задач в каждом статусе по renderIndex
            project.taskList.forEach(el => {
                switch (el.status) {
                    case Status.TODO:
                        updatedTasks[Status.TODO].push(el);
                        break;
                    case Status.IN_PROGRESS:
                        updatedTasks[Status.IN_PROGRESS].push(el);
                        break;
                    case Status.DONE:
                        updatedTasks[Status.DONE].push(el);
                        break;
                }
            });
        }

        // Сортировка задач в каждом статусе по renderIndex
        Object.keys(updatedTasks).forEach(status => {
            updatedTasks[status as Status] = updatedTasks[status as Status].sort((a, b) => {
                return (a.renderIndex || 0) - (b.renderIndex || 0);
            });
        });

        return updatedTasks;
    };


    function findContainer(id: string) {
        if (id in tasks) {
            return id;
        }

        return Object.keys(tasks).find((key) => tasks[key].some((task) => task._id === id));
    }


    function handleDragStart(event: DragStartEvent) {
        const { active } = event;
        const { id } = active;

        setActiveId(String(id));
    }

    function handleDragOver(event: DragOverEvent) {
        const { active, over } = event;
        const { id } = active;
        if (!over) {
            return;
        }

        const overId = over.id; // Assuming over is not null

        // Find the containers
        const activeContainer = findContainer(String(id));
        const overContainer = findContainer(String(overId));

        console.log(overContainer)


        if (
            !activeContainer ||
            !overContainer ||
            activeContainer === overContainer
        ) {
            return;
        }

        setTasks(prevTasks => {
            const updatedTasks = { ...prevTasks };

            // Find the task to move
            const taskToMove = updatedTasks[activeContainer].find(task => task._id === id);

            if (taskToMove) {
                // Remove the task from the active container
                updatedTasks[activeContainer] = updatedTasks[activeContainer].filter(task => task._id !== id);

                // Create a new task object with the updated status
                const updatedTask = { ...taskToMove, status: overContainer };

                // Add the updated task to the over container
                updatedTasks[overContainer] = [...updatedTasks[overContainer], updatedTask];
            }

            return updatedTasks;
        });
    }


    async function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        const { id } = active;
        if (!over) {
            return;
        }
        const { id: overId } = over;

        const activeContainer = findContainer(String(id));
        const overContainer = findContainer(String(overId));


        if (
            !activeContainer ||
            !overContainer ||
            activeContainer !== overContainer
        ) {
            return;
        }

        const activeIndex = tasks[activeContainer].findIndex(task => task._id === String(active.id));
        const overIndex = tasks[overContainer].findIndex(task => task._id === String(overId));

        setTasks((prevTasks) => {
            const updatedTasks = { ...prevTasks };

            // Find the task to move
            const taskToMove = { ...updatedTasks[activeContainer][activeIndex] };
            const taskToReplace = { ...updatedTasks[overContainer][overIndex] };

            if (taskToMove && taskToReplace) {
                updatedTasks[activeContainer][activeIndex] = { ...taskToReplace, renderIndex: taskToMove.renderIndex };
                updatedTasks[overContainer][overIndex] = { ...taskToMove, renderIndex: taskToReplace.renderIndex };
            }

            return updatedTasks;
        });

        if (activeContainer === overContainer) {
            // If tasks are moved within the same column, update renderIndex for all tasks in that column
            setTasks((prevTasks) => {
                const updatedTasks = { ...prevTasks };

                // Update renderIndex for all tasks in the active container
                updatedTasks[activeContainer] = updatedTasks[activeContainer].map((task, index) => ({
                    ...task,
                    renderIndex: index
                }));
  
                return updatedTasks;
            });

        }

        const activeTask = tasks[activeContainer][activeIndex];
        const overTask = tasks[overContainer][overIndex];
        console.log(activeTask);

        if (overTask && activeTask && project._id) {
            await dispatch(
                swapTasks({
                    activeTask: activeTask,
                    overTask: overTask
                })
            );
        }


        // if (activeTask) {
        //     await dispatch(updateTask(activeTask));
        // }
        // if (overTask) {
        //     await dispatch(updateTask(overTask));
        // }


        setActiveId("");
    }


    useEffect(() => {
        if (project && project.taskList) { // Добавляем проверку на существование project и его свойства taskList
            setTasks(updateTasks());
        }
    }, [project]);


    return (
        <>
            <div className={styles.columns}>
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCorners}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDragEnd={handleDragEnd}
                >
                    <TaskColumn
                        tasks={tasks[Status.TODO]}
                        id={Status.TODO}
                        status={Status.TODO}
                        openModal={openModal}
                    />

                    <TaskColumn
                        tasks={tasks[Status.IN_PROGRESS]}
                        id={Status.IN_PROGRESS}
                        status={Status.IN_PROGRESS}
                        openModal={openModal}
                    />

                    <TaskColumn
                        tasks={tasks[Status.DONE]}
                        id={Status.DONE}
                        status={Status.DONE}
                        openModal={openModal}
                    />
                    <DragOverlay>{activeId ?
                        <TaskCard
                            task={Array.isArray(project.taskList) ? project.taskList.find((el) => el._id === activeId) : null}/> : null}</DragOverlay>
                </DndContext>
            </div>
        </>
    )
}
