import style from './SingIn.module.scss'
import {memo} from 'react'
import {UserRegistration} from "src/entities";

interface SingInProps {
    className?: string;
}


export const SingIn = memo(() => {

    return (
        <div>
            <UserRegistration />
        </div>
    );
});

