import styles from './App.module.scss'
import { Header, Sidebar } from "../shared";
import { useTheme } from "src/App/providers/ThemeProvider/lib/useTheme.ts";
import { getId, getIsAuth } from "src/entities/User";
import { useAppDispatch } from "src/hooks/storeHooks.ts";
import { useEffect } from "react";
import { userAuth } from "src/entities/User/lib/services/userAuth.ts";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { getProjectById } from "src/entities/Project/lib/services/getProjectById.ts";

function App() {
    const Theme = useTheme();
    const dispatch = useAppDispatch()
    const location = useLocation();


    useEffect(() => {
        dispatch(userAuth())
    }, []);

    const isAuth = useSelector(getIsAuth);
    const userId = useSelector(getId);
    useEffect(() => {
        dispatch(getProjectById(userId));
    }, [dispatch, isAuth, userId]);


    return (
        <div className={`${styles.app} ${Theme.theme}`}>
            <div className={styles.header}>
                <Header/>
            </div>
            <div className={styles.page}>
                {isAuth && location.pathname.includes("workspace") && <Sidebar/>}
                <div className={styles.pageContent}>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default App
