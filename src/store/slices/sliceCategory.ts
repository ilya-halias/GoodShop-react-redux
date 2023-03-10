
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {Category, LOAD_STATUSES} from "../../types";
import {getCategories, getProducts, } from "../../api";



const SLICE_NAME = "categories";

export const fetchCategories = createAsyncThunk(SLICE_NAME, getCategories)


interface GoodsStore {
    loadStatus: string;
    categories: Category[];
}

const initialState: GoodsStore = {
    loadStatus: LOAD_STATUSES.UNKNOWN,
    categories: []
}
const { reducer, actions } = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.pending, (state, action) => {
            state.loadStatus = LOAD_STATUSES.LOADING;
        });
        builder.addCase(fetchCategories.rejected, (state, action) => {
            state.loadStatus = LOAD_STATUSES.UNKNOWN;
        });
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.loadStatus =LOAD_STATUSES.LOADED;
            state.categories = action.payload;
        })
    }
})
export { reducer }
export const actionsCategories = { fetchCategories }
