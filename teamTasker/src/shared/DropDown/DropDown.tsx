import { ChangeEvent } from 'react';
import styles from "./DropDown.module.scss";
import { Flags } from "src/schemas/config.ts";
import { transformFlagToString } from "src/shared/TaskCard/TaskCard.tsx";

interface DropdownProps {
    handleStatusSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
    taskStatus: Flags;
}

const Dropdown = (props: DropdownProps) => {

    const { handleStatusSelect, taskStatus } = props;

    return (
        <div className={styles.dropdown}>
            <select value={taskStatus} onChange={(e) => {
                handleStatusSelect(e)
            }}>
                <option value={Flags.TODO}>
                    {transformFlagToString(Flags.TODO)}
                </option>
                <option value={Flags.IN_PROGRESS}>
                    {transformFlagToString(Flags.IN_PROGRESS)}
                </option>
                <option value={Flags.DONE}>
                    {transformFlagToString(Flags.DONE)}
                </option>
            </select>
        </div>
    );
};

export default Dropdown;
