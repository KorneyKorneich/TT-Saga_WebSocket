import {stateSchema} from "src/schemas/config.ts";

export const getProjectTitle = (state: stateSchema) => state.project.title
