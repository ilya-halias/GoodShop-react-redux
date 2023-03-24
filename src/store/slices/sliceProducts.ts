import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Good, LOAD_STATUSES} from "../../types";

import {getProducts} from "../api";

const SLICE_NAME = "categories";
export const fetchProducts = createAsyncThunk(SLICE_NAME, getProducts)
export interface Store {
  data: Good[];
  loadStatus: string;
}

const initialState: Store = {
  loadStatus: LOAD_STATUSES.UNKNOWN,
  data: [],
};

export const { reducer, actions } = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (store) => {
      store.loadStatus = LOAD_STATUSES.LOADING;
    });
    builder.addCase(fetchProducts.fulfilled, (store, action) => {
      store.loadStatus = LOAD_STATUSES.LOADED;
      store.data = action.payload ? action.payload.items : store.data ;

    });
    builder.addCase(fetchProducts.rejected, (store) => {
      store.loadStatus = LOAD_STATUSES.ERROR;
    });
  },
});
