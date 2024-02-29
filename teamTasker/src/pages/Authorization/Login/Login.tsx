import { memo } from 'react'
import { UserLogin } from "src/entities/User";


export const Login = memo(() => {
    return (
        <div>
            <UserLogin/>
        </div>
    );
});

