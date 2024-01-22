import styles from "./Sidebar.module.scss"
import {ProjectSchema} from "src/entities/Project/lib/types/project.ts";
import {useSelector} from "react-redux";
import {getState} from "src/entities/Project/lib/selectors/getState.ts";
import {useAppDispatch} from "src/hooks/storeHooks.ts";
import {getProjectById} from "src/entities/Project/lib/services/getProjectById.ts";
import {getId, getIsAuth} from "src/entities/User";
import {memo, useEffect} from "react";
import {Button} from "src/shared";
import {getProjects} from "src/entities/Project/lib/selectors/getProjects.ts";
import {Link} from "react-router-dom";


export const Sidebar =  memo(() => {
    const state = useSelector(getState);
    const dispatch = useAppDispatch()
    const userId = useSelector(getId);
    const isAuth = useSelector(getIsAuth);
    const projects = useSelector(getProjects);

    console.log(userId)



    // const [projects, setProjects] = useState<ProjectSchema[]>([]);

    useEffect(() => {
       dispatch(getProjectById(userId));
    }, [isAuth]);
    const handleClick = () => {
        console.log(state);
    }

    console.log(projects)

    return (
        <div className={styles.wrapper}>
            <Button onClick={handleClick}>Show state</Button>
            { projects && projects.map((el) => {
                return(
                    <div>
                        <Link key={el.id} to={`workspace/${el._id}`}>
                            {el.text}
                        </Link>
                    </div>

                )
            })}
        </div>
    );
});




