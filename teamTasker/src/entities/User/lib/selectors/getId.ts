import { stateSchema } from "src/schemas/config.ts";

export const getId = (state: stateSchema) => state.user.data.id
