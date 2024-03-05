import { ChangeEvent } from 'react';
import styles from "./DropDown.module.scss";
import { Status } from "src/schemas/config.ts";
import { transformFlagToString } from "src/shared/TaskColumn/TaskColumn.tsx";

interface DropdownProps {
    handleStatusSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
    taskStatus: Status;
}

const Dropdown = (props: DropdownProps) => {

    const { handleStatusSelect, taskStatus } = props;

    return (
        <div className={styles.dropdown}>
            <select value={taskStatus} onChange={(e) => {
                handleStatusSelect(e)
            }}>
                <option value={Status.TODO}>
                    {transformFlagToString(Status.TODO)}
                </option>
                <option value={Status.IN_PROGRESS}>
                    {transformFlagToString(Status.IN_PROGRESS)}
                </option>
                <option value={Status.DONE}>
                    {transformFlagToString(Status.DONE)}
                </option>
            </select>
        </div>
    );
};

export default Dropdown;
