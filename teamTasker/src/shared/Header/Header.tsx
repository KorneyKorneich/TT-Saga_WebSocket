import styles from "./Header.module.css";
import Logo from "../assets/kanban-logo.svg?react"
import {Button, SVG} from "src/shared";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {getIsAuth} from "src/entities/User";
import {getCurrentProject} from "src/entities/Project";

export const Header = () => {
    const isAuth = useSelector(getIsAuth);
    // const username = useSelector(getUsername);
    const navigate = useNavigate();
    // const dispatch = useAppDispatch();
    // const userId = useSelector(getId);
    // const state = useSelector(getState);
    const currentURL = window.location.pathname;
    const currentProject = useSelector(getCurrentProject);


    // const onProjectFetch = () => {
    //     dispatch(getProjectById(userId)).then((res) => {
    //         console.log(res);
    //     })
    // }
    //
    // const handleClick = () => {
    //     console.log(state.projects);
    // }

    // const onProjectCreate = () => {
    //
    // }
    //TODO: При регистрации удалить из хедера все кнопки и поставить лого в центр
    return (
        <div className={styles.header}>
            <div className={styles.logo} onClick={() => navigate("/")}>
                <SVG size={40}>
                    <Logo/>
                </SVG>
                <h1>TeamTasker</h1>
            </div>
            {!isAuth &&
                <Button className={styles.link} onClick={() => navigate("/authorization/login")}>
                    Login
                </Button>

            }
            {isAuth && !currentURL.includes("workspace") &&
                <>
                    {/*<div className={styles.authedPanel}>*/}
                    {/*    <span>Hello {username}!</span>*/}
                    {/*    <Button className={styles.createNew} onClick={onProjectFetch}>*/}
                    {/*        + show projects*/}
                    {/*    </Button>*/}
                    {/*</div>*/}
                    {/*<div className={styles.authedPanel}>*/}
                    {/*    <Button className={styles.createNew} onClick={handleClick}>*/}
                    {/*        + show state*/}
                    {/*    </Button>*/}
                    {/*</div>*/}
                    <div className={styles.authedPanel}>
                        <Button className={styles.createNew} onClick={() => navigate('/workspace')}>
                            To workspace
                        </Button>
                    </div>
                </>
            }
            {currentURL.includes("workspace/") &&
                <div className={styles.authedPanel}>
                    {currentProject.title}
                </div>
            }
        </div>
    );
};

