import { stateSchema } from "src/schemas/config.ts";

export const getIsLoading = (state: stateSchema) => state.projects.isLoading;
