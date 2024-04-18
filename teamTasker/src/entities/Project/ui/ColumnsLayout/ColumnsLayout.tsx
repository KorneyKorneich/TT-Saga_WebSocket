import { useEffect, useState } from "react";
import { TaskSchema } from "src/entities/Project/lib/schema/schema.ts";
import { useSelector } from "react-redux";
import { getCurrentProject } from "src/entities/Project";
import styles from "src/entities/Project/ui/Project.module.scss";
import {
    closestCorners,
    DndContext,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
    PointerSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import { TaskCard } from "src/entities/Project/ui/TaskCard/TaskCard.tsx";
import { useAppDispatch } from "src/hooks/storeHooks.ts";
import { arrayMove } from "@dnd-kit/sortable";
import { swapTasks } from "src/entities/Project/lib/services/swapTasks.ts";
import _ from 'lodash';
import TaskColumn from "src/shared/TaskColumn/TaskColumn.tsx";
import { Status } from "src/schemas/config.ts";
import { Loader } from "src/shared/Loader/Loader.tsx";
import { getIsLoading } from "src/entities/Project/lib/selectors/getIsLoading.ts";

export interface ColumnLayoutProps {
    openModal: (id: string) => void,
}

export const ColumnsLayout = (props: ColumnLayoutProps) => {
    const { openModal } = props;
    const project = useSelector(getCurrentProject);
    const [tasks, setTasks] = useState<TaskSchema[]>([]);
    const [activeId, setActiveId] = useState<number>();
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getIsLoading);

    console.log(isLoading);


    const debouncedUpdateTasks = _.debounce((updatedTasks: TaskSchema[]) => {
        if(project._id){
            dispatch(swapTasks({
                projectId: project._id,
                taskList: updatedTasks
            }));
        }
    }, 300);
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    )

    function handleDragStart(event: DragStartEvent) {
        const { active } = event;
        const { id } = active;
        console.log(typeof(id));
        if(typeof(id) === "number"){
            setActiveId(id);
        }else return;
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (typeof (over?.id) === "string") {
            const updatedTasks = [...tasks];
            const activeIndexTask = tasks.find(el => el.renderIndex === active.id);
            setTasks((tasks) => {
                if (activeIndexTask) {
                    const activeIndex = tasks.indexOf(activeIndexTask);
                    updatedTasks[activeIndex] = {
                        ...activeIndexTask,
                        status: over.id as Status
                    };
                    const movedTasks = arrayMove(updatedTasks, activeIndex, activeIndex);
                    localStorage.setItem(`${project._id}`, JSON.stringify(movedTasks.map(el => el._id)))
                    console.log(localStorage.getItem(`${project._id}`));
                    return movedTasks;
                }
                return updatedTasks;
            });
            debouncedUpdateTasks(updatedTasks);
        } else if (typeof (over?.id) === "number") {
            const updatedTasks = [...tasks];
            setTasks((tasks) => {
                const oldIndexTask = tasks.find(el => el.renderIndex === active.id);
                const newIndexTask = tasks.find(el => el.renderIndex === over.id);
                if (oldIndexTask && newIndexTask) {
                    const oldIndex = tasks.indexOf(oldIndexTask);
                    const newIndex = tasks.indexOf(newIndexTask);
                    if (oldIndexTask.status !== newIndexTask.status) {
                        updatedTasks[oldIndex] = {
                            ...oldIndexTask,
                            status: newIndexTask.status,
                        };
                        const movedTasks = arrayMove(updatedTasks, oldIndex, oldIndex - 1);
                        localStorage.setItem(`${project._id}`, JSON.stringify(movedTasks.map(el => el._id)))
                        console.log(localStorage.getItem(`${project._id}`));
                        return movedTasks;
                    }
                    const movedTasks = arrayMove(updatedTasks, oldIndex, newIndex);
                    localStorage.setItem(`${project._id}`, JSON.stringify(movedTasks.map(el => el._id)))
                    console.log(localStorage.getItem(`${project._id}`));
                    return movedTasks;

                } else {
                    return tasks;
                }
            });
            debouncedUpdateTasks(updatedTasks);
        } else {
            return
        }
    }

    useEffect(() => {
        if (!isLoading) {
            const localStorageItemString = localStorage.getItem(`${project._id}`);
            if (localStorageItemString !== null) {
                const localStorageItem: string[] = JSON.parse(localStorageItemString);
                const newTasks: TaskSchema[] = localStorageItem
                    .map((localStorageEl: string) =>
                        project.taskList.find((el) => el._id === localStorageEl)
                    )
                    .filter((el): el is TaskSchema => el !== undefined);
                setTasks(newTasks);
            } else {
                setTasks(project.taskList);
            }
        }
    }, [isLoading, project._id, project.taskList]);

    return (
        <div className={styles.columns}>
            {isLoading ? <Loader/> : null}
            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <TaskColumn
                    key={Status.TODO}
                    tasks={tasks.filter(el => el.status === Status.TODO)}
                    id={Status.TODO}
                    status={Status.TODO}
                    openModal={openModal}
                />
                <TaskColumn
                    key={Status.IN_PROGRESS}
                    tasks={tasks.filter(el => el.status === Status.IN_PROGRESS)}
                    id={Status.IN_PROGRESS}
                    status={Status.IN_PROGRESS}
                    openModal={openModal}
                />
                <TaskColumn
                    key={Status.DONE}
                    tasks={tasks.filter(el => el.status === Status.DONE)}
                    id={Status.DONE}
                    status={Status.DONE}
                    openModal={openModal}
                />
                <DragOverlay>
                    {activeId ?
                        <TaskCard
                            task={Array.isArray(project.taskList) ? project.taskList.find((el) => el.renderIndex === activeId) || null : null}
                        />
                        : null}
                </DragOverlay>
            </DndContext>
        </div>
    );
}
