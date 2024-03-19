import styles from "./Header.module.scss";
import Logo from "src/shared/assets/kanban-logo.svg?react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { TaskCreationPopup } from "src/popups"
import SVGComponent from "src/shared/SVGComponent/SVGComponent.tsx";
import Popup from "src/shared/Popup/ui/Popup.tsx";
import DeleteProjectPopup from "src/layout/Sidebar/DeleteProjectPopup/DeleteProjectPopup.tsx";
import { Navbar } from "src/layout/Header/withNavbar/Navbar.tsx";
import { ProjectSchema } from "../../entities/Project/lib/schema/schema.ts";

const Header = () => {
    const navigate = useNavigate();


    const [isTaskAddPopup, setIsTaskAddPopup] = useState(false);
    const [isDeleteProjectPopup, setIsDeleteProjectPopup] = useState(false);


    const [projectToDelete, setProjectToDelete] = useState<ProjectSchema>();


    //TODO: При регистрации удалить из хедера все кнопки и поставить лого в центр
    return (
        <>
            <div className={styles.header_wrapper}>
                <div className={styles.header_content}>
                    <div className={styles.logo} onClick={() => navigate("/")}>
                        <SVGComponent size={40}>
                            <Logo/>
                        </SVGComponent>
                        <h1>TeamTasker</h1>
                    </div>

                    <Navbar setProjectToDelete={setProjectToDelete}
                            setIsDeleteProjectPopup={setIsDeleteProjectPopup}
                            setIsTaskAddPopup={setIsTaskAddPopup}/>
                </div>
            </div>

            {isTaskAddPopup && (
                <Popup isPopupOpen={isTaskAddPopup} closeModal={() => setIsTaskAddPopup(false)}>
                    <TaskCreationPopup
                        setIsAddTaskPopup={setIsTaskAddPopup}
                    />
                </Popup>
            )}

            <Popup isPopupOpen={isDeleteProjectPopup} closeModal={() => setIsDeleteProjectPopup(false)}>
                <DeleteProjectPopup setIsPopup={setIsDeleteProjectPopup} projectName={projectToDelete?.title}
                                    projectId={projectToDelete?._id} isPopup={isDeleteProjectPopup}/>
            </Popup>
        </>
    );
};

export default Header;
