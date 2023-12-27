import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {UserSchema, UserSliceSchema} from "src/entities/User/lib/types/user.ts";
import {ThunkConfig} from "src/schemas/config.ts";

export const userAuth = createAsyncThunk<UserSchema, void, ThunkConfig<string>>(
    'user/userAuth',
    async (_, {rejectWithValue}) => {
        try {

            const response = await axios.get('http://localhost:4000/api/auth',
                {headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}}
            );
            if(!response){
                throw new Error();
            }
            const data: UserSchema = response.data;
            if(!data.token){
                return rejectWithValue('No token')
            }
            localStorage.setItem('token', data.token)
            return data;
        } catch (e) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            // alert(e.response.data.message);
            localStorage.removeItem('token');
            return rejectWithValue('Something went wrong')
        }

    }
)
