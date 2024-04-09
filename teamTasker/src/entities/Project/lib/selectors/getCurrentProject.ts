import { stateSchema } from "src/schemas/config.ts";

export const getCurrentProject = (state: stateSchema) => state.projects.currentProject;
