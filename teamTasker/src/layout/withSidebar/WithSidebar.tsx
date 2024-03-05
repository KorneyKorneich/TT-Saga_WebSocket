import Sidebar from "src/layout/Sidebar/Sidebar.tsx";
import styles from "./WithSidebar.module.scss";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsAuth } from "src/entities/User";

const WithSidebar = () => {
    const isAuth = useSelector(getIsAuth);
    const location = useLocation();

    return (
        <div className={styles.page}>
            {isAuth && location.pathname.includes("workspace") && <Sidebar/>}
            <div className={styles.pageContent}>
                <Outlet/>
            </div>
        </div>
    )
}

export default WithSidebar;
