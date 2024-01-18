import {memo, useEffect, useState} from "react";
import styles from "./UserRegistration.module.scss";
import { Input } from "src/shared";
import { useAppDispatch } from "src/hooks/storeHooks.ts";
import { userReg } from "src/entities/User/lib/services/userReg.ts";
import { Button } from "src/shared/Button/Button.tsx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {getErrors} from "src/entities/User/lib/selectors/getErrors.ts";
import {userAuth} from "src/entities/User/lib/services/userAuth.ts";

export const UserRegistration = memo(() => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    // const state = useSelector(getState);
    const error = useSelector(getErrors);
    const onSuccess = async () => {
        await dispatch(userAuth()).then(() => navigate("/"))
    }

    const handleClick = async () => {

        // console.log('callback, error', error)
        const userPayload = {
            username: username,
            password: password,
        };


        await dispatch(userReg(userPayload)).then((res) => {
            // console.log('dispatch, error', error)
            setPassword("");
            setUsername("");
            console.log(userPayload);
            if (res.meta.requestStatus === "fulfilled") {
                // console.log("he he")
               onSuccess();
            }
        });
}


    useEffect(() => {
        if(error) {
            // alert("not hehe")
            console.log(error)
        }
    }, [error]);

    return (
        <div className={styles.regForm}>
            <h1>Registration</h1>
            <div className={styles.username}>
                <Input
                    placeholder={"Type your username"}
                    value={username}
                    setValue={setUsername}
                    type={"text"}
                />
            </div>
            <div className={styles.password}>
                <Input
                    placeholder={"Type your password"}
                    value={password}
                    setValue={setPassword}
                    type={"password"}
                />
            </div>
            <Button onClick={handleClick}>
                Sign in
            </Button>
        </div>
    );
})
