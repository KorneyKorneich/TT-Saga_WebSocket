import { ProjectSliceSchema } from "src/entities/Project/lib/schema/schema.ts";
import { UserSliceSchema } from "src/entities/User/lib/schema/schema.ts";

export interface stateSchema {
    user: UserSliceSchema,
    projects: ProjectSliceSchema,

}

export interface ThunkConfig<T> {
    // dispatch: AppDispatch
    state: stateSchema
    rejectValue: T
}

export enum Status {
    TODO = "todo",
    IN_PROGRESS = "in_progress",
    DONE = "done",
}


// export const BACK_URL = "https://teamtasker-server.onrender.com";
export const BACK_URL = "http://localhost:4000";
