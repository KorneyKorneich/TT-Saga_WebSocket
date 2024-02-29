import { stateSchema } from "src/schemas/config.ts";

export const getProjects = (state: stateSchema) => state.projects.projects
