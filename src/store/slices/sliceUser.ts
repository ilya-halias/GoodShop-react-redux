import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {Category, Good, LOAD_STATUSES} from "../../types";
import { postUserData} from "../api";

const SLICE_NAME = "user";

export const registrationUserData = createAsyncThunk(`${SLICE_NAME}/registrationUserData`, postUserData);

export interface PostUserProps {
    loadStatus: string,
    token: string,
    userData: any
}

const initialState: PostUserProps = {
    loadStatus: LOAD_STATUSES.UNKNOWN,
    token: "",
    userData: null
    }
;
export const { reducer, actions } = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(registrationUserData.pending, (state, action) => {
            state.loadStatus = LOAD_STATUSES.LOADING;
        });
        builder.addCase(registrationUserData.rejected, (state, action) => {
            state.loadStatus = LOAD_STATUSES.ERROR;
        });
        builder.addCase(registrationUserData.fulfilled, (state, action) => {
            state.loadStatus = LOAD_STATUSES.LOADED;
            console.log(action.payload)

        });
    },
});

