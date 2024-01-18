import styles from  './Header.module.css';
import Logo from '../assets/kanban-logo.svg?react'
import {Button, SVG} from "src/shared";
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {getIsAuth, getUsername} from "src/entities/User";
export const Header = () => {
    const isAuth = useSelector(getIsAuth);
    const username = useSelector(getUsername);
    const navigate = useNavigate();
    //TODO: При регистрации удалить из хедера все кнопки и поставить лого в центр
    return (
        <div className={styles.header}>
            <div className={styles.logo} onClick={() => navigate('/')}>
                <SVG size={40}>
                    <Logo />
                </SVG>
                <h1>TeamTasker</h1>
            </div>
            {!isAuth &&
                <Button className={styles.link} onClick={() => navigate('/authorization/singIn')}>
                    Sing In
                </Button>

            }
            {isAuth &&
                <div className={styles.authedPanel}>
                    <span>Hello {username}!</span>
                    <button className={styles.createNew}>
                        + Create New Project
                    </button>
                </div>
            }
        </div>
    );
};

