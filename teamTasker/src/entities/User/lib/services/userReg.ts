import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {UserRegistrationData, UserSchema} from "src/entities/User/lib/types/user.ts";
import {ThunkConfig} from "src/schemas/config.ts";

export const userReg = createAsyncThunk<UserSchema, UserRegistrationData, ThunkConfig<string>>(
    'user/userReg',
    async (userdata: UserRegistrationData, thunkAPI) => {
        const {
            rejectWithValue,
        } = thunkAPI;

        if(!userdata) {
            return rejectWithValue('No userdata');
        }

        try {

            const response = await axios.post('http://localhost:4000/api/registration', userdata);
            if(!response){
                throw new Error();
            }
            const data: UserSchema = await response.data;
            if(!data.token){
                return rejectWithValue('Incorrect login')
            }
            localStorage.setItem('token', data.token);
            console.log(data);
            return data;
        } catch (e) {
            return rejectWithValue('Something went wrong')
        }

    }
)