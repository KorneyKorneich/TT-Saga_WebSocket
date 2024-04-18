import { createAsyncThunk } from "@reduxjs/toolkit";
import { BACK_URL, ThunkConfig } from "src/schemas/config.ts";
import axios from "axios";
import { TaskSchema } from "src/entities/Project/lib/schema/schema.ts";


export interface swapReq {
    projectId: string,
    taskList: TaskSchema[]
}

export interface swapRes {
    projectId: string,
    taskList: TaskSchema[]
}


export const swapTasks = createAsyncThunk<swapRes, swapReq, ThunkConfig<string>>(
    "project/swapTasks",
    async (projectInfo: swapReq, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        if (!projectInfo) return rejectWithValue("There is no project");
        console.log(projectInfo);

        try {
            const response = await axios.patch(`${BACK_URL}/api/swapTasks/${projectInfo.projectId}`,
                projectInfo,
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
            console.log(response);

            if (!response) {
                throw new Error();
            }
            const data: swapRes = response.data;
            console.log(data);
            return data;
        } catch (e) {
            return rejectWithValue("Something went wrong in projects thunk")
        }
    }
)
