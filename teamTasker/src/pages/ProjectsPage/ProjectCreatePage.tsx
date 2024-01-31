import styles from "src/pages/ProjectsPage/ProjectCreatePage.module.scss";
import {Button, Input} from "src/shared";
import {useSelector} from "react-redux";
import {useState} from "react";
import {useAppDispatch} from "src/hooks/storeHooks.ts";
import {createProject} from "src/entities/Project/lib/services/createProject.ts";
import {getId} from "src/entities/User";
import {ProjectFetchData} from "src/schemas/config.ts";
import {useNavigate} from "react-router-dom";

export const ProjectCreatePage = () => {
    const [newProjectData, setNewProjectData] = useState<ProjectFetchData>({
        title: "",
        creatorId: "",
        taskList:[]
    });

    const dispatch = useAppDispatch();
    const userId = useSelector(getId);
    const navigate = useNavigate();

    // const [tasks, setTasks] = useState();
//TODO: сломалось
    const handleClick = async () => {
        console.log(newProjectData)
        await dispatch(createProject({
            creatorId: userId,
            title: newProjectData.title,
            taskList: newProjectData.taskList
        }))
        navigate("/workspace")
    }

    const handleTaskNameChange = (e: React.ChangeEvent<HTMLInputElement>, taskId: number) => {
        const updatedTaskList = newProjectData.taskList?.map(task => {
            if (task._id === taskId) {
                // Обновляем taskName только для нужной задачи
                return {
                    ...task,
                    taskName: e.target.value
                };
            }
            return task;
        });

        setNewProjectData({
            ...newProjectData,
            taskList: updatedTaskList
        });
    };



    //TODO: Через глобальный стейт.
    return (
        <div className={styles.createProject}>
            <h1>Name your future project</h1>
            <div className={styles.username}>
                <Input
                    placeholder={"Type title of your project"}
                    value={newProjectData.title}
                    onChange={(e) => {setNewProjectData({
                        ...newProjectData,
                        title: e.target.value
                    })}}
                    type={"text"}
                />
            </div>
            {/*<p>Tasks</p>*/}
            {/*<div id={'taskList'} className={styles.tasks}>*/}
            {/*    { newProjectData.taskList && newProjectData.taskList.map((el) => {*/}
            {/*        return(*/}
            {/*            <Input*/}
            {/*                className={styles.task}*/}
            {/*                key={el._id}*/}
            {/*                value={el.taskName}*/}
            {/*                onChange={(e) => handleTaskNameChange(e, el._id)}*/}
            {/*                placeholder={"e.g. Create cool web-app"}*/}
            {/*            />*/}
            {/*        )*/}
            {/*    })}*/}
            {/*</div>*/}
            {/*<Button onClick={() => {*/}
            {/*    setNewProjectData({*/}
            {/*        ...newProjectData,*/}
            {/*        taskList: [*/}
            {/*            ...newProjectData.taskList,*/}
            {/*            { _id: new Date().getTime(), flag: Flags.TODO, taskName: "", description: "", subTasks: [] }*/}
            {/*        ]*/}
            {/*    });*/}
            {/*}}>Add task</Button>*/}

            <Button className={styles.submitButton} onClick={handleClick}>Create new project</Button>
        </div>
    );
}