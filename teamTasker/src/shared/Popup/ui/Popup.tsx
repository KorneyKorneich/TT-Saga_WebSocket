import styles from "./Popup.module.scss";
import { ReactNode } from "react";

interface PopupProps {
    isPopupOpen: boolean;
    selectedTaskId?: string;
    closeModal: () => void;
    children?: ReactNode;
}

export const Popup = (props: PopupProps) => {
    const {
        isPopupOpen,
        // setPopupStatus,
        children,
        closeModal,
    } = props;


    return (
        <div onClick={closeModal}
             className={`${isPopupOpen ? `${styles.modal} ${styles.active}` : `${styles.modal}`}`}>
            <div onClick={(e) => e.stopPropagation()}
                 className={`${isPopupOpen ? `${styles.modal_content} ${styles.active}` : `${styles.modal_content}`}`}>
                {children}
            </div>
        </div>
    )
};

