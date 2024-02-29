import { stateSchema } from "src/schemas/config.ts";

export const getTaskDetails = (state: stateSchema, taskId: string) => {
    const taskData = state.projects.currentProject.taskList.findIndex((el) => el._id === taskId);
    return state.projects.currentProject.taskList[taskData];
}
