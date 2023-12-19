// import {ProjectSchema} from "src/schemas/config.ts";

export interface UserSchema{
    id: string,
    username: string;
    token?: string;
    isAuth?: boolean;
    // projectList?: ProjectSchema[]
}

export interface UserSliceSchema {
    data: UserSchema;
    isLoading: boolean;
    error?: string;
}


export interface UserRegistrationData {
    username: string,
    password: string
}