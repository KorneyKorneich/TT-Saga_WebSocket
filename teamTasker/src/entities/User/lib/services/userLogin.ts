import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UserRegistrationData, UserSchema } from "src/entities/User/lib/types/user.ts";

export const userLogin = createAsyncThunk<UserSchema, UserRegistrationData>(
    "user/userLogin",
    async (userdata: UserRegistrationData, thunkAPI) => {
        const {
            rejectWithValue,
        } = thunkAPI;

        if (!userdata) {
            return rejectWithValue("No userdata");
        }

        try {

            const response = await axios.post("http://localhost:4000/api/login", userdata,
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            if (!response) {
                throw new Error();
            }
            const data: UserSchema = await response.data;
            console.log(data.token)

            if (!data.token) {
                return rejectWithValue("No token")
            }
            localStorage.setItem("token", data.token)
            return data;
        } catch (e) {
            // console.log(e);
            return rejectWithValue("Something went wrong login")
        }

    }
)
