import { createAsyncThunk } from "@reduxjs/toolkit";
import { TaskSchema } from "src/schemas/config.ts";
import axios from "axios";

export interface TaskResponseSchema {
    taskList: TaskSchema[];
    projectId: string;
}

export const getTasksByProjectId = createAsyncThunk<TaskResponseSchema, string>(
    "project/getTasksByProjectId",
    async (projectId, thunkAPI) => {
        const {
            rejectWithValue,
        } = thunkAPI;

        if (!projectId) {
            return rejectWithValue("No id to find any projects");
        }
        try {
            const response = await axios.get(`http://localhost:4000/api/getTasks/${projectId}`,
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

            if (!response.data) {
                throw new Error();
            }

            const data: TaskResponseSchema = {
                taskList: response.data,
                projectId: projectId
            };
            console.log(data)
            return data;

        } catch (e) {
            return rejectWithValue("Something went wrong in projects thunk")
        }
    }
)
