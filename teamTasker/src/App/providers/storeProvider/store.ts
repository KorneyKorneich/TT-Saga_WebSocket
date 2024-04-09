import { configureStore } from "@reduxjs/toolkit"
import { userReducer } from "src/entities/User/lib/slice/userSlice.ts";
import { projectsReducer } from "src/entities/Project/lib/slice/projectSlice.ts";

export const store = configureStore({
    reducer: {
        projects: projectsReducer,
        user: userReducer,
    },
})

// Infer the `RootState` and `AppDispatch` schema from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
