import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Good, LOAD_STATUSES} from "../../types";

import {getProducts} from "../api";

const SLICE_NAME = "products";
export const fetchProducts = createAsyncThunk(`${SLICE_NAME}/fetchProducts`, getProducts)
export interface Store {
  data: Good[];
  loadStatus: LOAD_STATUSES;
  total: number

}

const initialState: Store = {
  loadStatus: LOAD_STATUSES.UNKNOWN,
  data: [],
  total: 1,

};

export const { reducer, actions } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (store) => {
      store.loadStatus = LOAD_STATUSES.LOADING;
    });
    builder.addCase(fetchProducts.fulfilled, (store, action) => {
      store.loadStatus = LOAD_STATUSES.LOADED;

      store.data = action.payload ? action.payload.items : store.data ;
      store.total = action.payload ? action.payload.total : store.total;

    });
    builder.addCase(fetchProducts.rejected, (store) => {
      store.loadStatus = LOAD_STATUSES.ERROR;
    });
  },
});
