import styles from  './Header.module.css';
import Logo from '../assets/kanban-logo.svg?react'
import {SVG} from "src/shared";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {getIsAuth, getUsername} from "src/entities/User";
export const Header = () => {
    const isAuth = useSelector(getIsAuth);
    const username = useSelector(getUsername);
    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <SVG size={40}>
                    <Logo />
                </SVG>
                <h1>TeamTasker</h1>
            </div>
            {!isAuth &&
                <Link to={'/authorization/singIn'} >Sing In</Link>
            }
            {isAuth && <span>Hello {username}!</span>}
            <button className={styles.createNew}>
                + Create New Project
            </button>
        </div>
    );
};

