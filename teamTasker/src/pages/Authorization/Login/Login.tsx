import React from 'react';
import style from './Login.module.scss'
import {memo} from 'react'
import {UserLogin} from "src/entities/User";

interface LoginProps {
    className?: string;
}


export const Login = memo(() => {
    return (
        <div>
            <UserLogin />
        </div>
    );
});

