import { createAsyncThunk } from "@reduxjs/toolkit";
import { BACK_URL, ThunkConfig } from "src/schemas/config.ts";
import axios from "axios";
import { TaskSchema } from "src/entities/Project/lib/schema/schema.ts";

export interface swapThunkArg {
    activeTask: TaskSchema,
    overTask: TaskSchema,
}

export interface swapRes {
    taskList: TaskSchema[],
    projectId: string,
}


export const swapTasks = createAsyncThunk<swapRes, swapThunkArg, ThunkConfig<string>>(
    "project/swapTasks",
    async (projectInfo: swapThunkArg, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        if (!projectInfo) return rejectWithValue("There is no project");

        try {
            const response = await axios.patch(`${BACK_URL}/api/swapTasks/${projectInfo.activeTask.projectId}`,
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
