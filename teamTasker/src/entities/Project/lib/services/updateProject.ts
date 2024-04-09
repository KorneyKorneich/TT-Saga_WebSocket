import { createAsyncThunk } from "@reduxjs/toolkit";
import { BACK_URL, ThunkConfig } from "src/schemas/config.ts";
import axios from "axios";
import { ProjectSchema } from "src/entities/Project/lib/schema/schema.ts";

export const updateProject = createAsyncThunk<ProjectSchema, ProjectSchema, ThunkConfig<string>>(
    "project/updateProject",
    async (projectInfo: ProjectSchema, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        if (!projectInfo) return rejectWithValue("There is no project");

        try {


            const response = await axios.patch(`${BACK_URL}/api/updateProject/${projectInfo._id}`,
                projectInfo,
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

            if (!response) {
                throw new Error();
            }
            const data: ProjectSchema = response.data;
            console.log(data);
            return data;
        } catch (e) {
            return rejectWithValue("Something went wrong in projects thunk")
        }
    }
)
