import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { getIsAuth } from "src/entities/User";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: ReactNode
}

export const ProtectedRoute = (props: ProtectedRouteProps) => {

    const {
        children
    } = props;
    console.log(children);
    const isAuth = useSelector(getIsAuth);


    return (
        <>
            {isAuth ? children : <Navigate to={"/"}/>}
        </>
    )
}
