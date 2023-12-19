import {UserSchema, UserSliceSchema} from "src/entities/User/lib/types/user.ts";
import {AppDispatch} from "src/App/providers/storeProvider/store.ts";


export interface stateSchema {
    user: UserSliceSchema,
    project: ProjectSchema,

}

export interface ThunkConfig<T> {
    dispatch: AppDispatch
    state: stateSchema
    rejectValue: T
}


export enum Flags {
    TODO = 'todo',
    IN_PROGRESS = 'in_progress',
    DONE = 'done',
}





export interface ProjectSchema {
    id: number,
    text: string
    // taskList: TaskSchema[];
    // creator: UserSchema
}

export interface TaskSchema {
    id: number,
    flag: Flags,
    taskName: string,
    description: string,
    subTasks: SubTask[],
}

export interface SubTask {
    id: number,
    todo: string
}