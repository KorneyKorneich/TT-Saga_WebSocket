import styles from "src/layout/Header/withNavbar/Navbar.module.scss";
import Button from "src/shared/Button/Button.tsx";
import SVGComponent from "src/shared/SVGComponent/SVGComponent.tsx";
import MoreIcon from "src/shared/assets/more_icon.svg?react";
import { onLogout } from "src/entities/User/lib/slice/userSlice.ts";
import { useSelector } from "react-redux";
import { getCurrentProject } from "src/entities/Project";
import { useAppDispatch } from "src/hooks/storeHooks.ts";
import { getIsAuth } from "src/entities/User";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProjectSchema } from "src/entities/Project/lib/schema/schema.ts";

interface NavbarProps {
    setProjectToDelete: (project: ProjectSchema) => void;
    setIsDeleteProjectPopup: (bool: boolean) => void;
    setIsTaskAddPopup: (bool: boolean) => void;
}

export const Navbar = (props: NavbarProps) => {

    const { setProjectToDelete, setIsDeleteProjectPopup, setIsTaskAddPopup } = props;

    const currentURL = window.location.pathname;
    const currentProject = useSelector(getCurrentProject);
    const dispatch = useAppDispatch();
    const isAuth = useSelector(getIsAuth);
    const navigate = useNavigate();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);


    const handleLogout = () => {
        dispatch(onLogout());
        navigate("/");
    }

    const handleMoreOptions = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    const handleProjectDelete = async (project: ProjectSchema) => {
        if (project) {
            setProjectToDelete(project);
            setIsDeleteProjectPopup(true);
        }
    }

    const renderNavbar = () => {
        return (
            <div className={styles.nav_panel}>
                {isAuth && !currentURL.includes("workspace") && (
                    <div className={styles.workspace_link}>
                        <Button className={styles.createNew} onClick={() => navigate('/workspace')}>
                            To workspace
                        </Button>
                    </div>
                )}

                {!isAuth && (!currentURL.includes("login") && !currentURL.includes("singUp")) && (
                    <Button className={styles.login} onClick={() => navigate("/auth/login")}>
                        Login
                    </Button>
                )}
                {currentURL.includes("workspace/") && (
                    <div className={styles.authedPanel}>
                        <div className={styles.project_title}>{currentProject.title}</div>
                        <div className={styles.nav_right_side}>
                            <Button
                                className={styles.add_task}
                                onClick={() => {
                                    setIsTaskAddPopup(true)
                                }}
                            >
                                Add Task
                            </Button>

                            <div className={styles.more_options} onClick={handleMoreOptions}>
                                <SVGComponent size={25}>
                                    <MoreIcon/>
                                </SVGComponent>
                                <div
                                    className={`${isDropdownOpen ? `${styles.dropdown} ${styles.active}` : `${styles.dropdown}`}`}>
                                    <div
                                        className={`${isDropdownOpen ? `${styles.options} ${styles.active}` : `${styles.options}`}`}>
                                        {currentURL.includes("workspace/") &&
                                            <div className={styles.option}
                                                 onClick={() => handleProjectDelete(currentProject)}>
                                                Delete Project
                                            </div>
                                        }
                                        <div className={styles.option} onClick={handleLogout}>
                                            Log out
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
    return (
        <>
            {renderNavbar()}
        </>

    )
}
