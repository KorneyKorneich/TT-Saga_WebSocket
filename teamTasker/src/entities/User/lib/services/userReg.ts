import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { BACK_URL, UserRegistrationData, UserSchema } from "src/schemas/config.ts";

export const userReg = createAsyncThunk<UserSchema, UserRegistrationData>(
    "user/userReg",
    async (userdata: UserRegistrationData, thunkAPI) => {
        const {
            rejectWithValue,
        } = thunkAPI;

        if (userdata.username === "" || userdata.password === "") {
            console.log("err")
            return rejectWithValue("No username or password");
        }
        try {
            console.log(userdata)
            const response = await axios.post(`${BACK_URL}/api/registration`, userdata);
            if (!response) {
                throw new Error();
            }
            const data: UserSchema = await response.data;
            if (!data.token) {
                return rejectWithValue("Incorrect login")
            }
            localStorage.setItem("token", data.token);
            console.log(localStorage.getItem("token"))
            console.log(data);
            return data;
        } catch (e) {
            return rejectWithValue("This user is already exist")
        }

    }
)
