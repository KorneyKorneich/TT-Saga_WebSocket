import styles from "./Header.module.scss";
import Logo from "../assets/kanban-logo.svg?react"
import { Button, Popup, SVG } from "src/shared";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsAuth } from "src/entities/User";
import { getCurrentProject } from "src/entities/Project";
import { useState } from "react";
import { TaskCreationPopup } from "src/popups"

export const Header = () => {
    const isAuth = useSelector(getIsAuth);
    const navigate = useNavigate();
    const currentURL = window.location.pathname;
    const currentProject = useSelector(getCurrentProject);

    const [isTaskAddPopup, setIsTaskAddPopup] = useState(false);

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
                    {!isAuth &&
                        <Button className={styles.link} onClick={() => navigate("/authorization/login")}>
                            Login
                        </Button>

                    }
                    {isAuth && !currentURL.includes("workspace") &&
                        <>
                            <div className={styles.authedPanel}>
                                <Button className={styles.createNew} onClick={() => navigate('/workspace')}>
                                    To workspace
                                </Button>
                            </div>
                        </>
                    }
                    {currentURL.includes("workspace/") &&
                        <div className={styles.authedPanel}>
                            <div>{currentProject.title}</div>
                            <Button
                                onClick={() => {
                                    setIsTaskAddPopup(true)
                                }}
                            >
                                Add Task
                            </Button>
                        </div>
                    }
                </div>

            </div>

            <Popup isPopupOpen={isTaskAddPopup} closeModal={() => setIsTaskAddPopup(false)}>
                <TaskCreationPopup
                    setIsAddTaskPopup={setIsTaskAddPopup}
                />
            </Popup>
        </>
    );
};

