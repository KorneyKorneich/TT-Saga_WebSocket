import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {ProjectSchema} from "src/schemas/config.ts";
import axios from "axios";
import * as https from "https";



const initialState: ProjectSchema = {
    id: 0,
    text: ''
}

export const fetchProjects = createAsyncThunk(
    'projects/fetchProjects',
    async () => {
        const response = await axios.get('http://localhost:4000/api/getProjects', {
            headers:{
                'Authorisation': '' //TODO: add token to header
            }
        });

        const data = await response.data;

        console.log(data)
    }
)

export const projectSlice = createSlice({
    name: 'projectSlice',
    initialState,
    reducers: {

    },
})

// Action creators are generated for each case reducer function
// export const {  } = projectSlice.actions

export const { actions: projectActions } = projectSlice;
export const { reducer: projectReducer } = projectSlice;
