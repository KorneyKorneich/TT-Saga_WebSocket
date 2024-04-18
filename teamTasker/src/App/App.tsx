import styles from "./App.module.scss"
import { useTheme } from "src/App/providers/ThemeProvider/lib/useTheme.ts";
import { useAppDispatch } from "src/hooks/storeHooks.ts";
import { useEffect } from "react";
import { userAuth } from "src/entities/User/lib/services/userAuth.ts";
import Header from "src/layout/Header/Header.tsx";
import WithSidebar from "src/layout/withSidebar/WithSidebar.tsx";
import { useSelector } from "react-redux";
import { getIsLoading } from "src/entities/Project/lib/selectors/getIsLoading.ts";
// import { useSelector } from "react-redux";
// import { getIsAuth } from "src/entities/User";
// import { useNavigate } from "react-router-dom";

function App() {
    const Theme = useTheme();
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getIsLoading);

    useEffect(() => {
        dispatch(userAuth());
        //TODO landing?

        // if (isAuth) {
        //     navigate("workspace")
        // } else {
        //     navigate("auth/login");
        // }

    }, []);


    return (
        <div className={`${styles.app} ${Theme.theme} ${isLoading ? styles.loading : ""}`}>
            <Header/>
            <WithSidebar/>
        </div>
    )
}

export default App;
