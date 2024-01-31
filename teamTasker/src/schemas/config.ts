import {UserSliceSchema} from "src/entities/User/lib/types/user.ts";



export interface stateSchema {
    user: UserSliceSchema,
    projects: ProjectSliceSchema,

}

export interface ThunkConfig<T> {
    // dispatch: AppDispatch
    state: stateSchema
    rejectValue: T
}
//TODO: Перенести User типы сюда
export enum Flags {
    TODO = "todo",
    IN_PROGRESS = "in_progress",
    DONE = "done",
}

export interface ProjectSchema {
    _id?: string;
    title: string;
    taskList?: TaskSchema[];
    creatorId?: string;
}

export interface ProjectSliceSchema {
    projects: ProjectSchema[];
    isLoading: boolean;
    error?: string;
}

export interface TaskSchema {
    _id: number,
    projectId: string,
    flag: Flags,
    taskName: string,
    description?: string,
    subTasks?: SubTask[],
}


export interface SubTask {
    id: number,
    todo: string
}

export interface ProjectFetchData{
    title?: string,
    creatorId?: string,
    taskList: TaskSchema[]
}

export interface TaskFetchData {
    projectId: string,
    flag: Flags,
    taskName: string,
    description?: string,
    subTasks?: SubTask[],
}
