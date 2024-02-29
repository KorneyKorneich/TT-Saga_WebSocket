import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProjectSchema } from "src/schemas/config.ts";
import axios from "axios";

export const getProjectById = createAsyncThunk<ProjectSchema[], string>(
    "project/getProjectById",
    async (userId, thunkAPI) => {
        const {
            rejectWithValue,
        } = thunkAPI;

        if (!userId) {
            return rejectWithValue("No id to find any projects");
        }
        try {
            const response = await axios.post("http://localhost:4000/api/getProjects", userId,
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

            if (!response.data) {
                throw new Error();
            }

            const data: ProjectSchema[] = response.data;
            console.log(data)
            return data;

        } catch (e) {
            return rejectWithValue("Something went wrong in projects thunk")
        }
    }
)
