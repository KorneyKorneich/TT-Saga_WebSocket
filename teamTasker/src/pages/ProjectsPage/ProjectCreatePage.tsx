import styles from "src/entities/User/ui/Login/UserLogin.module.scss";
import {Button, Input} from "src/shared";
import {useSelector} from "react-redux";
import {useState} from "react";
import {useAppDispatch} from "src/hooks/storeHooks.ts";
import {createProject} from "src/entities/Project/lib/services/createProject.ts";
import {getId} from "src/entities/User";

export const ProjectCreatePage = () => {
    const [projectTitle, setProjectTitle] = useState("");
    const dispatch = useAppDispatch();
    const userId = useSelector(getId);

    const handleClick = () => {
        dispatch(createProject({
            userId,
            projectTitle
        }))
    }

    return (
        <div className={styles.regForm}>
            <h1>Log in</h1>
            <div className={styles.username}>
                <Input
                    placeholder={"Type your username"}
                    value={projectTitle}
                    setValue={setProjectTitle}
                    type={"text"}
                />
            </div>
            <Button onClick={handleClick}>Log in</Button>
        </div>
    );
}
