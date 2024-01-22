import {TaskSchema} from "src/schemas/config.ts";
import {UserSchema} from "src/entities/User/lib/types/user.ts";

export interface ProjectSchema {
    _id: string;
    text: string;
    taskList: TaskSchema[];
    creator: UserSchema;
}

export interface ProjectSliceSchema {
    projects: ProjectSchema[];
    isLoading: boolean;
    error?: string;

}
