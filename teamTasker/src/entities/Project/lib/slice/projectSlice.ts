import { createSlice } from "@reduxjs/toolkit";
import { getProjectById } from "src/entities/Project/lib/services/getProjectById.ts";
import { ProjectSliceSchema } from "src/schemas/config.ts";
import { addTasksToProject } from "src/entities/Project/lib/services/addTasksToProject.ts";
import { getTasksByProjectId } from "src/entities/Project/lib/services/getTasksByProjectId.ts";
import { createProject } from "src/entities/Project/lib/services/createProject.ts";


const initialState: ProjectSliceSchema = {
    projects: [],
    currentProject: {
        title: "",
        taskList: [],
    },
    isLoading: true,
    error: undefined,
}


export const projectsSlice = createSlice({
    name: "projectSlice",
    initialState,
    reducers: {
        setCurrentProject: (state, action) => {
            const projectId = action.payload;
            const project = state.projects.findIndex((el) => el._id === projectId);
            if (project !== -1) {
                state.currentProject = state.projects[project];
            }
            // return state;
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(getProjectById.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(getProjectById.fulfilled, (state, action) => {
                state.isLoading = false;
                // console.log(action.payload)
                state.projects = action.payload;
                state.error = undefined
            })
            .addCase(getProjectById.rejected, (state, action) => {
                state.isLoading = false;
                if (action.payload) {
                    state.error = action.payload;
                }

            });

        builder
            .addCase(createProject.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(createProject.fulfilled, (state, action) => {
                state.isLoading = false;
                // console.log(action.payload)
                state.projects.push(action.payload);
                state.error = undefined
            })
            .addCase(createProject.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                console.log("записал ошибку")
            });

        builder
            .addCase(addTasksToProject.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(addTasksToProject.fulfilled, (state, action) => {
                state.isLoading = false;
                // console.log(action.payload)
                const projectIndex = state.projects
                    .findIndex((el) => el._id === action.payload.projectId);
                state.projects[projectIndex] = action.payload.project
                state.currentProject = action.payload.project
                state.error = undefined
            })
            .addCase(addTasksToProject.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                console.log("записал ошибку")
            });

        builder
            .addCase(getTasksByProjectId.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(getTasksByProjectId.fulfilled, (state, action) => {
                state.isLoading = false;
                console.log(action.payload)
                const projectIndex = state.projects.findIndex((el) => el._id === action.payload.projectId);

                if (projectIndex !== -1) {
                    // Нашли проект в массиве
                    state.projects[projectIndex].taskList = action.payload.taskList;
                    state.currentProject = state.projects[projectIndex];
                } else {
                    // Если проект не найден, можно рассмотреть вариант добавления его в массив
                    // state.projects.push(action.payload);
                }
                state.error = undefined
            })
            .addCase(getTasksByProjectId.rejected, (state, action) => {
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

export const { setCurrentProject } = projectsSlice.actions;
export const { reducer: projectsReducer } = projectsSlice;
