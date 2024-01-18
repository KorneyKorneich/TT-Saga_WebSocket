import styles from "./Sidebar.module.scss"
import {ProjectSchema} from "src/entities/Project/lib/types/project.ts";
import {useSelector} from "react-redux";
import {getState} from "src/entities/Project/lib/selectors/getState.ts";
import {useAppDispatch} from "src/hooks/storeHooks.ts";
import {getProjectById} from "src/entities/Project/lib/services/getProjectById.ts";
import {getId} from "src/entities/User";
import {useEffect} from "react";
import {Button} from "src/shared";


export const Sidebar =  () => {
    const state = useSelector(getState);
    const dispatch = useAppDispatch()
    const userId = useSelector(getId);
    console.log(userId)

    const handleClick = () => {
        console.log(state);
    }

    return (
        <div className={styles.wrapper}>
            <Button onClick={handleClick}>Show state</Button>
            {/*{ projectsList && projectsList.map((el) => {*/}
            {/*    return(*/}
            {/*        <div>*/}
            {/*            {el.title}*/}
            {/*        </div>*/}
            {/*    )*/}
            {/*})}*/}
        </div>
    );
};




