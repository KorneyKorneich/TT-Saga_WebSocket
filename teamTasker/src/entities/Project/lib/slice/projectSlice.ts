import {createSlice} from "@reduxjs/toolkit";
import {ProjectSliceSchema} from "../types/project.ts";
import {getProjectById} from "src/entities/Project/lib/services/getProjectById.ts";



const initialState: ProjectSliceSchema = {
    projects:[],
    isLoading: true,
    error: undefined,
}



export const projectsSlice = createSlice({
    name: "projectSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProjectById.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(getProjectById.fulfilled, (state, action) => {
                state.isLoading = false;
                console.log(action.payload)
                state.projects = action.payload;
                state.error = undefined
            })
            .addCase(getProjectById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                console.log("записал ошибку")
            });

        // Handling userLogin actions
    //     builder
    //         .addCase(userLogin.pending, (state) => {
    //             state.isLoading = true;
    //         })
    //         .addCase(userLogin.fulfilled, (state, action) => {
    //             state.isLoading = false;
    //             state.data.username = action.payload.username;
    //             state.data.id = action.payload.id;
    //             state.error = undefined
    //             state.data.isAuth = true;
    //         })
    //         .addCase(userLogin.rejected, (state, action) => {
    //             state.isLoading = false;
    //             state.error = action.payload as string;
    //         });
    //
    //     builder
    //         .addCase(userAuth.pending, (state) => {
    //             state.isLoading = true;
    //         })
    //         .addCase(userAuth.fulfilled, (state, action) => {
    //             state.isLoading = false;
    //             state.data.username = action.payload.username;
    //             state.data.isAuth = true;
    //             state.data.id = action.payload.id;
    //             state.error = undefined
    //         })
    //         .addCase(userAuth.rejected, (state, action) => {
    //             state.isLoading = false;
    //             state.error = action.payload as string;
    //         });
    },

})

export const { actions: projectsActions } = projectsSlice;
export const { reducer: projectsReducer } = projectsSlice;
