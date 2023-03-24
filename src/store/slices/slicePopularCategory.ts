import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {Category, Good, LOAD_STATUSES} from "../../types";
import { getPopularCategories} from "../api";

const SLICE_NAME = "popularCategories";

export const fetchPopularCategories = createAsyncThunk(SLICE_NAME, getPopularCategories);

export interface PopularGoodsStore {
    loadStatus: string,
    popular: {category: Category;
    items: Good[]}[]
}

const initialState: PopularGoodsStore = {
    loadStatus: LOAD_STATUSES.UNKNOWN,
    popular: [{items: [],
    category: {    id: "string",
        type: "string",
        label: "string"
    }}]}
;
export const { reducer, actions } = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPopularCategories.pending, (state, action) => {
            state.loadStatus = LOAD_STATUSES.LOADING;
        });
        builder.addCase(fetchPopularCategories.rejected, (state, action) => {
            state.loadStatus = LOAD_STATUSES.UNKNOWN;
        });
        builder.addCase(fetchPopularCategories.fulfilled, (state, action) => {
            state.loadStatus = LOAD_STATUSES.LOADED;
            state.popular = action.payload

        });
    },
});

