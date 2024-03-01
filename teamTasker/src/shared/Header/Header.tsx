import styles from "./Header.module.scss";
import Logo from "../assets/kanban-logo.svg?react"
import { Button, Popup, SVG } from "src/shared";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsAuth } from "src/entities/User";
import { getCurrentProject } from "src/entities/Project";
import { useState } from "react";
import { TaskCreationPopup } from "src/popups"
import { useAppDispatch } from "src/hooks/storeHooks.ts";
import { onLogout } from "src/entities/User/lib/slice/userSlice.ts";

export const Header = () => {
    const isAuth = useSelector(getIsAuth);
    const navigate = useNavigate();
    const currentURL = window.location.pathname;
    const currentProject = useSelector(getCurrentProject);
    const dispatch = useAppDispatch();

    const [isTaskAddPopup, setIsTaskAddPopup] = useState(false);

    const handleLogout = () => {
        dispatch(onLogout());
        navigate("/");
    }

    //TODO: При регистрации удалить из хедера все кнопки и поставить лого в центр
    return (
        <>
            <div className={styles.header}>
                <div className={styles.logo} onClick={() => navigate("/")}>
                    <SVG size={40}>
                        <Logo/>
                    </SVG>
                    <h1>TeamTasker</h1>
                </div>
                <div className={styles.nav_panel}>
                    {isAuth && !currentURL.includes("workspace") && (
                        <div className={styles.workspace_link}>
                            <Button className={styles.createNew} onClick={() => navigate('/workspace')}>
                                To workspace
                            </Button>
                        </div>
                    )}

                    {!isAuth && !currentURL.includes("login") && (
                        <Button className={styles.link} onClick={() => navigate("/authorization/login")}>
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
                                {isAuth && (
                                    <div className={styles.logout}>
                                        <Button className={styles.logout_button} onClick={handleLogout}>Log out</Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {isTaskAddPopup && (
                <Popup isPopupOpen={isTaskAddPopup} closeModal={() => setIsTaskAddPopup(false)}>
                    <TaskCreationPopup
                        setIsAddTaskPopup={setIsTaskAddPopup}
                    />
                </Popup>
            )}
        </>
    );

};

