import {useState} from "react";
import styles from "./UserLogin.module.scss";
import {Button, Input} from "src/shared";
import {useAppDispatch} from "src/hooks/storeHooks.ts";
import {userLogin} from "src/entities/User/lib/services/userLogin.ts";
import {useNavigate} from "react-router-dom";



export const UserLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const handleClick = async () => {
        const userPayload = {
            username: username,
            password: password
        };
        await dispatch(userLogin(userPayload));

        if(username !== "" && password !== "") navigate("/")
        else {
            setPassword("");
            setUsername("");
        }
    }

    return (
        <div className={styles.regForm}>
            <h1>Log in</h1>
            <div className={styles.username}>
                <Input
                    placeholder={"Type your username"}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type={"text"}
                />
            </div>
            <div className={styles.password}>
                <Input
                    placeholder={"Type your password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={"password"}
                />
            </div>
            <Button onClick={handleClick}>Log in</Button>
            <p>If you not registered</p>
            <Button onClick={() => navigate("/authorization/singIn")}>
                Sign in
            </Button>
        </div>
    );
};


