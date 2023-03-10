
import {RootStore} from "./index";


export const getLoadStatusCategories = (store: RootStore) => store.categories.loadStatus;

export const getCategorySelector = (store: RootStore) => store.categories.categories;

export const getLoadStatusProducts = (store: RootStore) => store.products.loadStatus;

export const getProductsSelector = (store: RootStore) => store.products.data;
