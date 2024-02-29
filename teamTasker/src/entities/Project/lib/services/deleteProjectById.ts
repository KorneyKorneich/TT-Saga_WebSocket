import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "src/schemas/config.ts";
import axios from "axios";


export const deleteProjectById = createAsyncThunk<string, string, ThunkConfig<string>>(
    "project/deleteProjectById",
    async (projectId: string, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;

        if (!projectId) {
            return rejectWithValue("Invalid data for adding tasks to project");
        }


        try {
            const response = await axios.delete(
                `http://localhost:4000/api/deleteProject/${projectId}`,
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

            const data: string = response.data;
            return data;

        } catch (error) {
            // You can console.log(error) to get more details about the error
            return rejectWithValue("Something went wrong in projects thunk");
        }
    }
);
