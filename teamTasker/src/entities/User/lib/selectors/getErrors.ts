import { stateSchema } from "src/schemas/config.ts";

export const getErrors = (state: stateSchema) => state.user.error
