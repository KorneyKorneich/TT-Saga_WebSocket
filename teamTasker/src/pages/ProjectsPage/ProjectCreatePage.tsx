import styles from "src/pages/ProjectsPage/ProjectCreatePage.module.scss";
import { useSelector } from "react-redux";
import { ChangeEvent, useState } from "react";
import { useAppDispatch } from "src/hooks/storeHooks.ts";
import { createProject } from "src/entities/Project/lib/services/createProject.ts";
import { getId } from "src/entities/User";
import { useNavigate } from "react-router-dom";
import Button from "src/shared/Button/Button.tsx";
import Input from "src/shared/Input/ui/Input.tsx";
import { ProjectFetchData } from "src/entities/Project/lib/schema/schema.ts";

const ProjectCreatePage = () => {
    const [newProjectData, setNewProjectData] = useState<ProjectFetchData>({
        title: "",
        creatorId: "",
        taskList: []
    });

    const dispatch = useAppDispatch();
    const userId = useSelector(getId);
    const navigate = useNavigate();

    const handleClick = async () => {
        console.log(newProjectData)
        await dispatch(createProject({
            creatorId: userId,
            title: newProjectData.title,
            taskList: newProjectData.taskList
        }))
        navigate("/workspace")
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {

        setNewProjectData({
            ...newProjectData,
            title: e.target.value
        })

    }

    return (
        <div className={styles.createProject}>
            <h1>Name your future project</h1>
            <div className={styles.username}>
                <Input
                    placeholder={"Type title of your project"}
                    value={newProjectData.title}
                    onChange={(e) => handleInputChange(e)}
                    type={"text"}
                />
            </div>
            <Button className={styles.submitButton} onClick={handleClick}>Create new project</Button>
        </div>
    );
}

export default ProjectCreatePage;
