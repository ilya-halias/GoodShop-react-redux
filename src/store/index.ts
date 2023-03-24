import {configureStore} from '@reduxjs/toolkit'
import {reducer as categoryReducer} from "./slices/sliceCategory";
import {reducer as productReducer} from "./slices/sliceProducts";
import {reducer as popularCategoriesReducer} from "./slices/slicePopularCategory";
import {reducer as alertsReducer} from "./slices/sliceAlert";


export * from "./selector"


export const store = configureStore({
    reducer: {
        categories: categoryReducer,
        products: productReducer,
        popularCategories: popularCategoriesReducer,
        alerts: alertsReducer
    },
});


export type RootStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
