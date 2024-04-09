import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { BACK_URL } from "src/schemas/config.ts";
import { UserSchema } from "src/entities/User/lib/schema/schema.ts";

export const userAuth = createAsyncThunk<UserSchema, void>(
    "user/userAuth",
    async (_, { rejectWithValue }) => {
        try {

            const response = await axios.get(`${BACK_URL}/api/auth`,
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            if (!response) {
                throw new Error();
            }
            const data: UserSchema = response.data;
            if (!data.token) {
                return rejectWithValue("No token")
            }
            localStorage.setItem("token", data.token)
            return data;
        } catch (e) {
            localStorage.removeItem("token");
            return rejectWithValue("Something went wrong")
        }

    }
)
