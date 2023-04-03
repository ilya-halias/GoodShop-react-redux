import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addInBasket, getBasket } from "../api";
import { Good, GoodInBasket, LOAD_STATUSES } from "../../types";

const SLICE_NAME = "cart";

export const fetchGetBasket = createAsyncThunk(
  `${SLICE_NAME}/fetchGetBasket`,
  getBasket
);

export const fetchAddGoodInBasket = createAsyncThunk(
  `${SLICE_NAME}/fetchAddGoodInBasket`,
  async (body: { good?: Good; count?: number; id?: string }, thunkAPI) => {
    const response = await addInBasket(body);
    thunkAPI.dispatch(fetchGetBasket());
    return response;
  }
);

export interface State {
  goodInBasket: GoodInBasket[];
  commonCount: number;
  loadStatus: LOAD_STATUSES;
}

const initialState: State = {
  goodInBasket: [],
  loadStatus: LOAD_STATUSES.UNKNOWN,
  commonCount: 0,
};

export const { reducer, actions } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGetBasket.pending, (store) => {
      store.loadStatus = LOAD_STATUSES.LOADING;
    });
    builder.addCase(fetchGetBasket.rejected, (store) => {
      store.loadStatus = LOAD_STATUSES.ERROR;
    });
    builder.addCase(fetchGetBasket.fulfilled, (store, action) => {
      store.loadStatus = LOAD_STATUSES.LOADED;
      store.commonCount = store.goodInBasket.reduce(
        (acc, obj) => acc + obj.count,
        0
      );
      store.goodInBasket = action.payload;
    });
    builder.addCase(fetchAddGoodInBasket.pending, (state) => {
      state.loadStatus = LOAD_STATUSES.LOADING
    })
    builder.addCase(fetchAddGoodInBasket.rejected, (state) => {
      state.loadStatus = LOAD_STATUSES.ERROR
    })
    builder.addCase(fetchAddGoodInBasket.fulfilled, (state, action) => {
      state.goodInBasket = action.payload

      state.loadStatus = LOAD_STATUSES.LOADED
    })
  },
});
