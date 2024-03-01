import { createAsyncThunk } from "@reduxjs/toolkit";
import { BACK_URL, TaskSchema, ThunkConfig } from "src/schemas/config.ts";
import axios from "axios";

export const updateProject = createAsyncThunk<TaskSchema, TaskSchema, ThunkConfig<string>>(
    "project/updateProject",
    async (projectInfo: TaskSchema, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        if (!projectInfo) return rejectWithValue("There is no project");

        try {


            const response = await axios.patch(`${BACK_URL}/api/updateProject/${projectInfo.projectId}`,
                projectInfo,
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

            if (!response) {
                throw new Error();
            }
            const data: TaskSchema = response.data;
            console.log(data);
            return data;
        } catch (e) {
            return rejectWithValue("Something went wrong in projects thunk")
        }
    }
)
