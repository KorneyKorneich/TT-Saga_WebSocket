import { stateSchema } from "src/schemas/config.ts";

export const getUsername = (state: stateSchema) => state.user.data.username
