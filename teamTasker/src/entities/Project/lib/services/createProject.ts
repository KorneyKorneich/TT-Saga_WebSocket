import {createAsyncThunk} from "@reduxjs/toolkit";
import {ProjectSchema} from "../types/project.ts";
import {ThunkConfig} from "src/schemas/config.ts";
import axios from "axios";

interface createProjectTypes{
    userId: string,
    projectTitle: string
}

export const createProject = createAsyncThunk<ProjectSchema, createProjectTypes, ThunkConfig<string>>(
    "project/createProject",
    async ( projectInfo: createProjectTypes, thunkAPI)=> {
        const {
            rejectWithValue,
        } = thunkAPI;

        if(!projectInfo) {
            return rejectWithValue("No id to find any projects");
        }
        try {
            console.log(projectInfo);

            const response = await axios.post("http://localhost:4000/api/createProject", projectInfo,
                {headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}});
            console.log(response)
            if(!response){
                throw new Error();
            }

            const data: ProjectSchema = response.data;
            console.log(data);
            return data;

        }catch (e) {
            return rejectWithValue("Something went wrong in projects thunk")
        }
    }
)
