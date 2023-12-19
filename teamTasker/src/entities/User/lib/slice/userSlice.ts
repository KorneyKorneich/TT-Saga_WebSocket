import {createSlice} from '@reduxjs/toolkit';
import {userReg} from "src/entities/User/lib/services/userReg.ts";
import {UserSliceSchema} from "src/entities/User/lib/types/user.ts";
import {userLogin} from "src/entities/User/lib/services/userLogin.ts";
import {userAuth} from "src/entities/User/lib/services/userAuth.ts";



const initialState: UserSliceSchema = {
    data:{
        id: '',
        username: '',
        isAuth: false,
    },
    isLoading: true,
    error: undefined
}



export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userReg.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(userReg.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data.username = action.payload.username;
                state.data.id = action.payload.id;
                state.error = undefined
            })
            .addCase(userReg.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });

        // Handling userLogin actions
        builder
            .addCase(userLogin.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data.username = action.payload.username;
                state.data.id = action.payload.id;
                state.error = undefined
                state.data.isAuth = true;
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });

        builder
            .addCase(userAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(userAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data.username = action.payload.username;
                state.data.isAuth = true;
                state.data.id = action.payload.id;
                state.error = undefined
                console.log(action.payload);
            })
            .addCase(userAuth.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },

})

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
