import { configureStore } from '@reduxjs/toolkit'
import {reducer} from "./slices/sliceCategory";
import {reducer as productReducer} from "./slices/sliceProducts";
export * from "./selector"



export const store = configureStore({
       reducer: {
        categories: reducer,
        products: productReducer,
    },
});


export type RootStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
