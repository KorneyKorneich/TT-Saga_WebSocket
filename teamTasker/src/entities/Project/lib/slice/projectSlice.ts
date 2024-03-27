import { createSlice } from "@reduxjs/toolkit";
import { getProjectById } from "src/entities/Project/lib/services/getProjectById.ts";
import { addTasksToProject } from "src/entities/Project/lib/services/addTasksToProject.ts";
import { getTasksByProjectId } from "src/entities/Project/lib/services/getTasksByProjectId.ts";
import { createProject } from "src/entities/Project/lib/services/createProject.ts";
import { updateProject } from "src/entities/Project/lib/services/updateProject.ts";
import { deleteTaskById } from "src/entities/Project/lib/services/deleteTaskById.ts";
import { deleteProjectById } from "src/entities/Project/lib/services/deleteProjectById.ts";
import { ProjectSliceSchema } from "src/entities/Project/lib/schema/schema.ts";
import { updateTask } from "src/entities/Project/lib/services/updateTask.ts";
import { swapTasks } from "src/entities/Project/lib/services/swapTasks.ts";

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
        },

        updateCurrentProject: (state, action) => {
            const updatedCurrentProject = action.payload;
            if (updatedCurrentProject) state.currentProject = updatedCurrentProject;
            // updateProject(state.currentProject);
        }
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
                    state.error = action.payload as string;
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
                state.error = action.payload as string;
                console.log("записал ошибку")
            });

        builder
            .addCase(updateTask.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.isLoading = false;

                // Найдите индекс проекта в массиве проектов
                const projectId = state.projects.findIndex(el => el._id === action.payload.projectId);

                // Найдите индекс задачи в массиве задач проекта
                const taskId = state.projects[projectId].taskList.findIndex(el => el._id === action.payload._id);

                // Если нашли индексы, обновите задачу
                if (projectId !== -1 && taskId !== -1) {
                    state.projects[projectId].taskList[taskId] = action.payload;
                    state.currentProject = state.projects[projectId];
                }

                state.error = undefined;
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                console.log("записал ошибку")
            });
        builder
            .addCase(swapTasks.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(swapTasks.fulfilled, (state, action) => {
                state.isLoading = false;

                const projectIndex = state.projects.findIndex((project) => project._id === action.payload.projectId);
                if (action.payload) state.projects[projectIndex].taskList = action.payload.taskList;

                state.currentProject = state.projects[projectIndex];

                state.error = undefined;
            })
            .addCase(swapTasks.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                console.log("записал ошибку")
            });


        builder
            .addCase(updateProject.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(updateProject.fulfilled, (state, action) => {
                state.isLoading = false;


                // Найдите индекс проекта в массиве проектов
                const projectId = state.projects.findIndex(el => el._id === action.payload._id);
                //
                // // Найдите индекс задачи в массиве задач проекта
                // const taskId = state.projects[projectId].taskList.findIndex(el => el._id === action.payload._id);
                //
                // // Если нашли индексы, обновите задачу
                if (projectId !== -1) {
                    state.projects[projectId] = action.payload;
                    state.currentProject = action.payload;
                }
                //
                // state.error = undefined;
            })

            .addCase(updateProject.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                console.log("записал ошибку")
            });

        builder
            .addCase(deleteTaskById.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(deleteTaskById.fulfilled, (state, action) => {
                state.isLoading = false;
                console.log(action.payload)
                const projectId = state.projects.findIndex(el => el._id === action.payload.projectId);
                state.projects[projectId].taskList = state.projects[projectId]
                    .taskList.filter(task => task._id !== action.payload.taskId);
                state.currentProject = state.projects[projectId];

                state.error = undefined;

            })

            .addCase(deleteTaskById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                console.log("записал ошибку")
            });

        builder
            .addCase(deleteProjectById.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(deleteProjectById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.projects = state.projects.filter(project => project._id !== action.payload);
                state.error = undefined;

            })

            .addCase(deleteProjectById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                console.log("записал ошибку")
            });
    },
})

export const { setCurrentProject, updateCurrentProject } = projectsSlice.actions;
export const { reducer: projectsReducer } = projectsSlice;
