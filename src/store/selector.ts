import {GoodsStore} from "./slices/sliceCategory"
import {RootStore} from "./index";
import {Store} from "./slices/sliceProducts";
import {PopularGoodsStore} from "./slices/slicePopularCategory";


export const getLoadStatusCategories = (store: RootStore): GoodsStore ['loadStatus'] => store.categories.loadStatus;

export const getCategorySelector = (store: RootStore): GoodsStore['categories'] => store.categories.categories;

export const getLoadStatusProducts = (store: RootStore):Store ['loadStatus']  => store.products.loadStatus;

export const getProductsSelector = (store: RootStore): Store ['data'] => store.products.data;
export const getPopularCategoriesSelector = (store: RootStore): PopularGoodsStore ['popular'] => store.popularCategories.popular;
// export const getPopularProductsSelector = (store: RootStore): PopularGoodsStore ['items'] => store.popularCategories.items;
export const getLoadStatusPopularCategories = (store: RootStore): PopularGoodsStore ['loadStatus'] => store.popularCategories.loadStatus;
