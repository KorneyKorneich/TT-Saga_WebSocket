import { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch } from "src/hooks/storeHooks.ts";
import { deleteProjectById } from "src/entities/Project/lib/services/deleteProjectById.ts";
import { useNavigate } from "react-router-dom";
import styles from "./DeleteProjectPopup.module.scss";
import Button from "src/shared/Button/Button.tsx";
import Input from "src/shared/Input/ui/Input.tsx";

interface DeleteProjectPopupProps {
    projectId?: string
    projectName?: string;
    setIsPopup: (flag: boolean) => void;
    isPopup: boolean
}

const DeleteProjectPopup = (props: DeleteProjectPopupProps) => {

    const { projectName, projectId, setIsPopup, isPopup } = props

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [inputValue, setInputValue] = useState("");

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        if (e.target.value === projectName) {
            setIsButtonDisabled(false);
        } else setIsButtonDisabled(true);
    }

    const handleProjectDelete = async () => {
        if (projectId) {
            await dispatch(deleteProjectById(projectId));
        }
        setIsPopup(false);
        setInputValue("");
        navigate("/workspace");
    }

    useEffect(() => {
        if (!isPopup) {
            setInputValue("")
            setIsButtonDisabled(true);
        }
    }, [isPopup]);

    return (
        <>
            <div className={styles.delete_popup}>
                <h2 className={styles.delete_title}>
                    OMG! You tries to delete a project.
                </h2>
                <p className={styles.delete_description}>Type <q className={styles.project_name}>{projectName}</q> to
                    delete it</p>
                <Input value={inputValue} placeholder={"Type project name here"} onChange={(e) => handleInput(e)}/>
                <Button className={styles.delete_button} onClick={handleProjectDelete}
                        disabled={isButtonDisabled}>Delete {projectName}</Button>
            </div>
        </>
    )
}

export default DeleteProjectPopup;
