import {configureStore} from '@reduxjs/toolkit'
import {reducer as categoryReducer} from "./slices/sliceCategory";
import {reducer as productReducer} from "./slices/sliceProducts";
import {reducer as popularCategoriesReducer} from "./slices/slicePopularCategory";
import {reducer as alertsReducer} from "./slices/sliceAlert";
import {reducer as userReducer} from "./slices/sliceUser";
import {reducer as loginReducer} from "./slices/sliceLogin";
import {reducer as basketReducer} from "./slices/sliceGetBasket";


export * from "./selector"


export const store = configureStore({
    reducer: {
        categories: categoryReducer,
        products: productReducer,
        popularCategories: popularCategoriesReducer,
        alerts: alertsReducer,
        user: userReducer,
        login: loginReducer,
        basket: basketReducer
    },
});


export type RootStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
