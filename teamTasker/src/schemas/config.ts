export interface UserSchema {
    id: string,
    username: string;
    token?: string;
    isAuth?: boolean;
    projectList?: ProjectSchema[]
}

export interface UserSliceSchema {
    data: UserSchema;
    isLoading: boolean;
    error?: string;
}

export interface UserRegistrationData {
    username: string,
    password: string
}

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

export interface ProjectSchema {
    _id?: string;
    title: string;
    taskList: TaskSchema[];
    creatorId?: string;
}

export interface ProjectSliceSchema {
    projects: ProjectSchema[];
    currentProject: ProjectSchema;
    isLoading: boolean;
    error?: string;
}

export interface TaskSchema {
    _id: string,
    projectId: string,
    flag: Status,
    taskName: string,
    description?: string,
    subTasks?: SubTask[],
}


export interface SubTask {
    _id: string,
    todo: string,
    isDone: boolean;
}

export interface ProjectFetchData {
    title?: string,
    creatorId?: string,
    taskList: TaskSchema[]
}

export interface TaskFetchData {
    projectId: string,
    flag: Status,
    taskName: string,
    description?: string,
    subTasks?: SubTask[],
}

// export const BACK_URL = "https://teamtasker-server.onrender.com";
export const BACK_URL = "http://localhost:4000";
