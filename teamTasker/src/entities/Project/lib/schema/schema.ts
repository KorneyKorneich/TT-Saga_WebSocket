import { Status } from "src/schemas/config.ts";

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
