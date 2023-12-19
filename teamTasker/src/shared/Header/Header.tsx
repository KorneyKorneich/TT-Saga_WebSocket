import styles from  './Header.module.css';
import Logo from '../assets/kanban-logo.svg?react'
import {SVG} from "src/shared";
export const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <SVG size={40}>
                    <Logo />
                </SVG>
                <h1>TeamTasker</h1>
            </div>
            <button className={styles.createNew}>
                + Create New Project
            </button>
        </div>
    );
};

