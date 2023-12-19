import {useState} from 'react';
import styles from './UserRegistration.module.scss';
import {Input} from "src/shared";
import {useAppDispatch} from "src/hooks/storeHooks.ts";
import {userReg} from "src/entities/User/lib/services/userReg.ts";
import {Button} from "src/shared/Button/Button.tsx";



export const UserRegistration = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useAppDispatch();

    const handleClick = async () => {
        const userPayload = {
            username: username,
            password: password
        };
        await dispatch(userReg(userPayload));
        setPassword('');
        setUsername('');
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
            <Button onClick={handleClick}>Sing in</Button>
        </div>
    );
};


