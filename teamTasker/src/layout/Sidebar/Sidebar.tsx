import styles from "./Sidebar.module.scss"
import { useSelector } from "react-redux";
import { useAppDispatch } from "src/hooks/storeHooks.ts";
import { getProjectById } from "src/entities/Project/lib/services/getProjectById.ts";
import { getId, getIsAuth } from "src/entities/User";
import { memo, useEffect } from "react";
import { getProjects } from "src/entities/Project/lib/selectors/getProjects.ts";
import { Link, useNavigate } from "react-router-dom";
import ProjectIcon from "../../shared/assets/project-icon.svg?react"

import { ProjectSchema } from "src/schemas/config.ts";
import SVGComponent from "src/shared/SVGComponent/SVGComponent.tsx";
import Button from "src/shared/Button/Button.tsx";


const Sidebar = memo(() => {
    const dispatch = useAppDispatch()
    const userId = useSelector(getId);
    const isAuth = useSelector(getIsAuth);
    const projects = useSelector(getProjects);
    const navigate = useNavigate();

    const renderProjectsNames = (projectsList: ProjectSchema[]) => {
        return (
            Array.isArray(projectsList) && projectsList.map((el) => {
                return (
                    <div key={el._id} className={styles.projectLink}>
                        <Link className={styles.project} key={el._id} to={`workspace/${el._id}`}>
                            <div className={styles.projectIcon}>
                                <SVGComponent size={20} color={"#ECEDF1"}>
                                    <ProjectIcon/>
                                </SVGComponent>
                            </div>
                            {el.title}
                        </Link>

                    </div>
                )
            })
        )
    }

    useEffect(() => {
        dispatch(getProjectById(userId));
    }, [dispatch, isAuth, userId]);
//TODO: поработать над цветом иконки в разных состояниях ссылки
    return (
        <>
            <div className={styles.wrapper}>
                <h3>Your projects</h3>
                {renderProjectsNames(projects)}
                <div className={styles.newProject}>
                    <Button className={styles.createNew} onClick={() => navigate("/newProject")}>
                        + Create new project
                    </Button>
                </div>
            </div>
        </>
    );
});

export default Sidebar;
