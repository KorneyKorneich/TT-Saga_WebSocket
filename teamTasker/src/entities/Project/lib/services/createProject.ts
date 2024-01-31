import {createAsyncThunk} from "@reduxjs/toolkit";
import {ProjectFetchData, ProjectSchema, ThunkConfig} from "src/schemas/config.ts";
import axios from "axios";



export const createProject = createAsyncThunk<ProjectSchema, ProjectFetchData, ThunkConfig<string>>(
    "project/createProject",
    async ( projectInfo: ProjectFetchData, thunkAPI)=> {
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
            console.log(response.data)
            const data: ProjectSchema = response.data;
            console.log(data);
            return data;

        }catch (e) {
            return rejectWithValue("Something went wrong in projects thunk")
        }
    }
)
