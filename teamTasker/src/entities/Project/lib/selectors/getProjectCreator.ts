import {stateSchema} from "src/schemas/config.ts";

export const getProjectCreator = (state: stateSchema) => state.project.creator;
