import {memo, useEffect} from "react";
import styles from "src/App/App.module.scss";
import {Link} from "react-router-dom";
import {Sidebar} from "src/shared";
import {useAppDispatch} from "src/hooks/storeHooks.ts";
import {useSelector} from "react-redux";
import {getState} from "src/entities/User";
import {userAuth} from "src/entities/User/lib/services/userAuth.ts";

export const LandingPage = memo(()=> {

    const dispatch = useAppDispatch();
    const state = useSelector(getState);


    useEffect(() => {
        dispatch(userAuth())
    }, [dispatch]);

    return(
        <>
            <div className={styles.tasks}>Hello</div>
            {state.user.data.isAuth && <div>{state.user.data.username}</div>}
            <Link to={'/authorization/singIn'} >Sing In</Link>
        </>

    )
})
