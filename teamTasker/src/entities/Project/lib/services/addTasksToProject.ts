import { createAsyncThunk } from "@reduxjs/toolkit";
import {ProjectSchema, TaskFetchData, ThunkConfig} from "src/schemas/config.ts";
import axios from "axios";

interface AddTasksToProjectData {
    projectId: string;
    taskList: TaskFetchData[];
}

interface AddTasksResponseSchema{
    projectId: string,
    project: ProjectSchema;
}


export const addTasksToProject = createAsyncThunk<AddTasksResponseSchema, AddTasksToProjectData, ThunkConfig<string>>(
    "project/addTasksToProject",
    async (data: AddTasksToProjectData, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;

        if (!data || !data.projectId || !data.taskList) {
            return rejectWithValue("Invalid data for adding tasks to project");
        }

        try {
            const response = await axios.post(
                `http://localhost:4000/api/addTasksToProject/${data.projectId}`,
                {
                    tasks: data.taskList,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (!response || response.status !== 200) {
                throw new Error("Invalid response from the server");
            }

            // Assuming the actual data returned by the server is the updated project
            const responseData: AddTasksResponseSchema = {
                project: response.data,
                projectId: data.projectId
            };
            console.log(responseData)

            return responseData;
        } catch (error) {
            // You can console.log(error) to get more details about the error
            return rejectWithValue("Something went wrong in projects thunk");
        }
    }
);
