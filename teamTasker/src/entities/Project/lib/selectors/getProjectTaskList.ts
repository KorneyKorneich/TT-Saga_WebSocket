import {stateSchema} from "src/schemas/config.ts";

export const getProjectTaskList = (state: stateSchema) => state.project.taskList
