
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {Good, LOAD_STATUSES} from "../../types";
import {getProducts, } from "../../api";




export const fetchProducts = createAsyncThunk("products", getProducts)

export interface Store {
    data: Good[]
    loadStatus: LOAD_STATUSES

}



const initialState: Store = {

    loadStatus: LOAD_STATUSES.UNKNOWN,
    data:  []

}

export const {reducer, actions} = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (store)=>{
            store.loadStatus = LOAD_STATUSES.LOADING
        });
        builder.addCase(fetchProducts.fulfilled, (store, action)=>{
            store.loadStatus = LOAD_STATUSES.LOADED
            store.data = action.payload;

        });
        builder.addCase(fetchProducts.rejected, (store)=>{
            store.loadStatus = LOAD_STATUSES.ERROR

        });

    }

})

export const actionsCategories = { fetchProducts }
