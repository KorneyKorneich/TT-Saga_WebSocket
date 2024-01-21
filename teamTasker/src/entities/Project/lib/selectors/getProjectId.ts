import {stateSchema} from "src/schemas/config.ts";

export const getProjectId = (state: stateSchema) => state.projects.id
