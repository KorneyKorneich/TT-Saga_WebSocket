import { createAsyncThunk } from "@reduxjs/toolkit";
import { BACK_URL, ThunkConfig } from "src/schemas/config.ts";
import axios from "axios";
import { ProjectFetchData, ProjectSchema } from "src/entities/Project/lib/schema/schema.ts";


export const createProject = createAsyncThunk<ProjectSchema, ProjectFetchData, ThunkConfig<string>>(
    "project/createProject",
    async (projectInfo: ProjectFetchData, thunkAPI) => {
        const {
            rejectWithValue,
        } = thunkAPI;

        if (!projectInfo) {
            return rejectWithValue("No id to find any projects");
        }
        try {

            const response = await axios.post(`${BACK_URL}/api/createProject`, projectInfo,
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
            if (!response) {
                throw new Error();
            }
            const data: ProjectSchema = response.data;
            return data;

        } catch (e) {
            return rejectWithValue("Something went wrong in projects thunk")
        }
    }
)
