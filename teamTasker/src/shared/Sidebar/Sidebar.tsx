import styles from './Sidebar.module.scss'
import Logo from '../assets/kanban-logo.svg?react'
import {SVG} from "src/shared";

export const Sidebar = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.logo}>
                <SVG size={40}>
                    <Logo />
                </SVG>
                <h1>TeamTasker</h1>
            </div>
        </div>
    );
};




