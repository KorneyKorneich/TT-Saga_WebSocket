import { memo, useEffect, useState } from "react";
import styles from "./SingIn.module.scss";
import { useAppDispatch } from "src/hooks/storeHooks.ts";
import { userReg } from "src/entities/User/lib/services/userReg.ts";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getErrors } from "src/entities/User/lib/selectors/getErrors.ts";
import { userAuth } from "src/entities/User/lib/services/userAuth.ts";
import Input from "src/shared/Input/ui/Input.tsx";
import Button from "src/shared/Button/Button.tsx";


export const SingIn = memo(() => {


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
        if (error) {
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
            <Button onClick={handleClick}>
                Sign in
            </Button>
        </div>
    );

});

export default SingIn;
