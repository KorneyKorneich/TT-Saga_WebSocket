import {TaskSchema} from "src/schemas/config.ts";
import {UserSchema} from "src/entities/User/lib/types/user.ts";

export interface ProjectSchema {
    id: string;
    title: string;
    taskList: TaskSchema[];
    creator: UserSchema;
}

export interface ProjectSliceSchema {
    projects: ProjectSchema[];
    isLoading: boolean;
    error?: string;

}
