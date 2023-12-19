import { configureStore } from '@reduxjs/toolkit'
import {projectReducer} from "src/features";
import {userReducer} from "src/entities/User/lib/slice/userSlice.ts";

export const store = configureStore({
    reducer: {
        project: projectReducer,
        user: userReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
