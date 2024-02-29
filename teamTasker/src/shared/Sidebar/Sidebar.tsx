import styles from "./Sidebar.module.scss"
import { useSelector } from "react-redux";
import { useAppDispatch } from "src/hooks/storeHooks.ts";
import { getProjectById } from "src/entities/Project/lib/services/getProjectById.ts";
import { getId, getIsAuth } from "src/entities/User";
import { memo, useEffect } from "react";
import { getProjects } from "src/entities/Project/lib/selectors/getProjects.ts";
import { Link, useNavigate } from "react-router-dom";
import { Button, SVG } from "src/shared";
import ProjectIcon from "../assets/project-icon.svg?react"
import DeleteIcon from "../assets/delete_icon.svg?react"
import { deleteProjectById } from "src/entities/Project/lib/services/deleteProjectById.ts";


export const Sidebar = memo(() => {
    const dispatch = useAppDispatch()
    const userId = useSelector(getId);
    const isAuth = useSelector(getIsAuth);
    const projects = useSelector(getProjects);
    const navigate = useNavigate();

    const handleProjectDelete = async (id: string | undefined) => {
        if (id) {
            await dispatch(deleteProjectById(id));
            // dispatch(getProjectById(userId));
            //todo как не отправлять лишних запросов, а поменять проекты ответом от первой функции
        }
    }


    useEffect(() => {
        dispatch(getProjectById(userId));
    }, [isAuth]);
//TODO: поработать над цветом иконки в разных состояниях ссылки
    return (
        <>
            <div className={styles.wrapper}>
                <h3>Your projects</h3>
                {Array.isArray(projects) && projects.map((el) => {
                    return (
                        <div key={el._id} className={styles.projectLink}>
                            <Link className={styles.project} key={el._id} to={`workspace/${el._id}`}>
                                <div className={styles.projectIcon}>
                                    <SVG size={20} color={"#ECEDF1"}>
                                        <ProjectIcon/>
                                    </SVG>
                                </div>
                                {el.title}
                            </Link>
                            <div className={styles.project_delete} onClick={() => handleProjectDelete(el._id)}>
                                <SVG size={25} color={"#ECEDF1"}>
                                    <DeleteIcon/>
                                </SVG>
                            </div>
                        </div>
                    )
                })}
                <div className={styles.newProject}>
                    <Button className={styles.createNew} onClick={() => navigate("/newProject")}>
                        + Create new project
                    </Button>
                </div>
            </div>
        </>
    );
});




