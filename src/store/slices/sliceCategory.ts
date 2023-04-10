import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category, LOAD_STATUSES } from "../../types";
import { getCategories } from "../api";

const SLICE_NAME = "categories";

export const fetchCategories = createAsyncThunk(`${SLICE_NAME}/fetchCategories`, getCategories);

export interface GoodsStore {
  loadStatus: LOAD_STATUSES;
  categories: Category[];
}

const initialState: GoodsStore = {
  loadStatus: LOAD_STATUSES.UNKNOWN,
  categories: [],
};
export const { reducer, actions } = createSlice({
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
      state.loadStatus = LOAD_STATUSES.LOADED;
      state.categories = action.payload.categories

        });
  },
});

