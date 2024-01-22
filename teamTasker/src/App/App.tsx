import styles from './App.module.scss'
import {Header, Sidebar} from "../shared";
import {useTheme} from "src/App/providers/ThemeProvider/lib/useTheme.ts";
import {UserRegistration} from "src/entities";
import {getId, getIsAuth, getState, UserLogin} from "src/entities/User";
import {useAppDispatch} from "src/hooks/storeHooks.ts";
import {useEffect} from "react";
import {userAuth} from "src/entities/User/lib/services/userAuth.ts";
import {useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {Outlet} from "react-router-dom";
import {getState as Projects} from "src/entities/Project";
import {LandingPage, SingIn} from "src/pages";
import {userReg} from "src/entities/User/lib/services/userReg.ts";
import {getProjectById} from "src/entities/Project/lib/services/getProjectById.ts";

function App() {
    const Theme = useTheme();
    const dispatch = useAppDispatch()

    const navigate = useNavigate()
    console.log(localStorage.getItem('token'));


    useEffect(() => {
        dispatch(userAuth())

    }, []);
    const isAuth = useSelector(getIsAuth);
    const userId = useSelector(getId);
    useEffect(() => {
        dispatch(getProjectById(userId));
    }, [isAuth]);



    const state = useSelector(getState)
    const stateProjects = useSelector(Projects)
    console.log(stateProjects);
    console.log(state);
    console.log(state.user.data.isAuth);
    console.log(state.user.data.username);

    return (
        <div className={`${styles.app} ${Theme.theme}`}>
            <div className={styles.header}>
                <Header/>
            </div>
            <div className={styles.page}>
                {window.document.location.href.includes("workspace") && <Sidebar />}
                <div className={styles.pageContent}>
                    <Outlet/>
                </div>
            </div>

        </div>
    )
}

export default App
