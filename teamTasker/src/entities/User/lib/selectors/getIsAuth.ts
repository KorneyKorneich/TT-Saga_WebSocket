import { stateSchema } from "src/schemas/config.ts";

export const getIsAuth = (state: stateSchema) => state.user.data.isAuth
