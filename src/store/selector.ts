import { GoodsStore } from "./slices/sliceCategory";
import { RootStore } from "./index";
import { Store } from "./slices/sliceProducts";
import { PopularGoodsStore } from "./slices/slicePopularCategory";
import { LoginStore } from "./slices/sliceLogin";
import { State } from "./slices/sliceGetBasket";

export const getLoadStatusCategories = (
  store: RootStore
): GoodsStore["loadStatus"] => store.categories.loadStatus;

export const getCategorySelector = (
  store: RootStore
): GoodsStore["categories"] => store.categories.categories;

export const getLoadStatusProducts = (store: RootStore): Store["loadStatus"] =>
  store.products.loadStatus;

export const getProductsSelector = (store: RootStore): Store["data"] =>
  store.products.data;
export const getPopularCategoriesSelector = (
  store: RootStore
): PopularGoodsStore["popular"] => store.popularCategories.popular;
// export const getPopularProductsSelector = (store: RootStore): PopularGoodsStore ['items'] => store.popularCategories.items;
export const getLoadStatusPopularCategories = (
  store: RootStore
): PopularGoodsStore["loadStatus"] => store.popularCategories.loadStatus;

export const getTotalSelector = (store: RootStore): Store["total"] =>
  store.products.total;
export const getIsAuthSelector = (store: RootStore): LoginStore["isAuth"] =>
  store.login.isAuth;
export const getLoginSelector = (store: RootStore): LoginStore["login"] =>
  store.login.login;

export const getBasketSelector = (store: RootStore): State["goodInBasket"] =>
  store.basket.goodInBasket;
export const getCommonCount = (store: RootStore): State["commonCount"] =>
  store.basket.commonCount;

export const getBasketLoadStatus = (store: RootStore): State["loadStatus"] =>
  store.basket.loadStatus;
