import { createAsyncThunk } from "@reduxjs/toolkit";
import { BACK_URL, ThunkConfig } from "src/schemas/config.ts";
import axios from "axios";

interface IDs {
    projectId: string;
    taskId: string;
}

export const deleteTaskById = createAsyncThunk<IDs, IDs, ThunkConfig<string>>(
    "project/deleteTaskById",
    async (IDs: IDs, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;

        if (!IDs) {
            return rejectWithValue("Invalid data for adding tasks to project");
        }

        console.log(IDs)

        try {
            const response = await axios.delete(
                `${BACK_URL}/api/deleteTask/${IDs.projectId}/${IDs.taskId}`,
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
            const responseData: IDs = {
                taskId: IDs.taskId,
                projectId: IDs.projectId
            };

            return responseData;
        } catch (error) {
            // You can console.log(error) to get more details about the error
            return rejectWithValue("Something went wrong in projects thunk");
        }
    }
);
