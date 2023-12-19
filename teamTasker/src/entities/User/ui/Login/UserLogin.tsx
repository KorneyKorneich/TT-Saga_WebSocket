import {useState} from 'react';
import styles from './UserLogin.module.scss';
import {Button, Input} from "src/shared";
import {useAppDispatch} from "src/hooks/storeHooks.ts";
import {userLogin} from "src/entities/User/lib/services/userLogin.ts";
import {useNavigate} from "react-router-dom";



export const UserLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const handleClick = async () => {
        const userPayload = {
            username: username,
            password: password
        };
        await dispatch(userLogin(userPayload));
        setPassword('');
        setUsername('');
        navigate('/')
    }

    return (
        <div className={styles.regForm}>
            <h1>Registration</h1>
            <div className={styles.username}>
                <Input
                    placeholder={'Type your username'}
                    value={username}
                    setValue={setUsername}
                    type={'text'}
                />
            </div>
            <div className={styles.password}>
                <Input
                    placeholder={'Type your password'}
                    value={password}
                    setValue={setPassword}
                    type={'password'}
                />
            </div>
            <Button onClick={handleClick}>Log in</Button>
        </div>
    );
};


