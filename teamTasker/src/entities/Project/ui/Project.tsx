import styles from "./Project.module.scss"
import {Button} from "src/shared";
import {useParams} from "react-router";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useAppDispatch} from "src/hooks/storeHooks.ts";
import {getTasksByProjectId} from "src/entities/Project/lib/services/getTasksByProjectId.ts";
import {useSelector} from "react-redux";
import {getProjects} from "src/entities/Project/lib/selectors/getProjects.ts";

export const Project = () => {
    const {projectId} = useParams()
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const projects = useSelector(getProjects);
    // const handler = () => {
    //
    // }


    useEffect(() => {
        dispatch(getTasksByProjectId(projectId))
    }, [projectId]);
    return(
        <div className={styles.projectPage}>
            <div>Project {projectId}</div>
            <Button onClick={() => navigate(`/addTasksToProject/${projectId}`)}>+ Task</Button>
            <div>
                {projects && projects.map((el) => {
                    if (el._id === projectId){
                        return (
                            <div key={el._id}>
                                {el.taskList?.map((task) => {
                                    return(
                                        <div key={task._id}>
                                            {task?.taskName}
                                        </div>
                                    )
                                })}

                            </div>
                        )
                    }
                })}
            </div>
        </div>

)
}
