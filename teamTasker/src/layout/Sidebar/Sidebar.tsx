import styles from "./Sidebar.module.scss"
import { useSelector } from "react-redux";
import { useAppDispatch } from "src/hooks/storeHooks.ts";
import { getProjectById } from "src/entities/Project/lib/services/getProjectById.ts";
import { getId, getIsAuth } from "src/entities/User";
import { memo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProjectIcon from "../../shared/assets/project-icon.svg?react"
import SVGComponent from "src/shared/SVGComponent/SVGComponent.tsx";
import Button from "src/shared/Button/Button.tsx";
import { ProjectSchema } from "src/entities/Project/lib/schema/schema.ts";
import { getCurrentProject } from "src/entities/Project";
import { Virtuoso } from "react-virtuoso";
import { getProjects } from "src/entities/Project/lib/selectors/getProjects.ts";


const Sidebar = memo(() => {
    const dispatch = useAppDispatch()
    const userId = useSelector(getId);
    const isAuth = useSelector(getIsAuth);
    const currentProject = useSelector(getCurrentProject);
    const projects = useSelector(getProjects);

    const ScrollSeekPlaceholder = () => {
        return (
            <div className={styles.project_skeleton_wrapper}>
                <div className={styles.project_logo_skeleton}></div>
                <div className={styles.project_name_skeleton}></div>
            </div>
        )
    }

    const navigate = useNavigate();

    const renderProjectsNames = (projectsList: ProjectSchema[]) => {
        return (
            Array.isArray(projectsList) &&
            <Virtuoso
                style={{
                    height: "86%"
                }}
                className={styles.customVirtuoso}
                data={projects}
                totalCount={projects.length}
                components={{ ScrollSeekPlaceholder }}
                scrollSeekConfiguration={{
                    enter: (velocity) => Math.abs(velocity) > 50,
                    exit: (velocity) => {
                        return Math.abs(velocity) < 10;
                    },
                }}
                itemContent={(_index, user) => {
                    return (
                        <div key={user._id} className={styles.projectLink}>
                            <Link
                                className={user._id === currentProject._id ? `${styles.selected_project}` : `${styles.project}`}
                                key={user._id} to={`workspace/${user._id}`}>
                                <div className={styles.projectIcon}>
                                    <SVGComponent size={20} color={"#ECEDF1"}>
                                        <ProjectIcon/>
                                    </SVGComponent>
                                </div>
                                {user.title}
                            </Link>
                        </div>
                    )
                }}
            />
        );
    };

    useEffect(() => {
        dispatch(getProjectById(userId));
    }, [dispatch, isAuth, userId]);

    return (
        <>
            <div className={styles.wrapper}>
                <h3>Your projects</h3>
                <div className={styles.newProject}>
                    <Button className={styles.create_new} onClick={() => navigate("/newProject")}>
                        + Create new project
                    </Button>
                </div>
                {renderProjectsNames(projects)}
            </div>
        </>
    );
});

export default Sidebar;
