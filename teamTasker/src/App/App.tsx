import styles from './App.module.scss'
import { useTheme } from "src/App/providers/ThemeProvider/lib/useTheme.ts";
import { useAppDispatch } from "src/hooks/storeHooks.ts";
import { useEffect } from "react";
import { userAuth } from "src/entities/User/lib/services/userAuth.ts";
import Header from "src/layout/Header/Header.tsx";
import WithSidebar from "src/layout/withSidebar/WithSidebar.tsx";

function App() {
    const Theme = useTheme();
    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(userAuth());
    }, []);


    return (
        <div className={`${styles.app} ${Theme.theme}`}>
            <Header/>
            <WithSidebar/>
        </div>
    )
}

export default App
