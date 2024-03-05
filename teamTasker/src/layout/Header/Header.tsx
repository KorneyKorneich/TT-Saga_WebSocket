import styles from "./Header.module.scss";
import Logo from "../../shared/assets/kanban-logo.svg?react"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsAuth } from "src/entities/User";
import { getCurrentProject } from "src/entities/Project";
import { useState } from "react";
import { TaskCreationPopup } from "src/popups"
import { useAppDispatch } from "src/hooks/storeHooks.ts";
import { onLogout } from "src/entities/User/lib/slice/userSlice.ts";
import Button from "src/shared/Button/Button.tsx";
import SVGComponent from "src/shared/SVGComponent/SVGComponent.tsx";
import Popup from "src/shared/Popup/ui/Popup.tsx";

const Header = () => {
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
            <div className={styles.header_wrapper}>
                <div className={styles.header_content}>
                    <div className={styles.logo} onClick={() => navigate("/")}>
                        <SVGComponent size={40}>
                            <Logo/>
                        </SVGComponent>
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

                        {!isAuth && (!currentURL.includes("login") && !currentURL.includes("singUp")) && (
                            <Button className={styles.link} onClick={() => navigate("/auth/login")}>
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
                                            <Button className={styles.logout_button} onClick={handleLogout}>Log
                                                out</Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
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

export default Header;
