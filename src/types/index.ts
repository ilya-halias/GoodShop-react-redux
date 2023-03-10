export interface Category {
    id: string;
    type: string;
    label: string;
}

export interface Good {
    categoryTypeId: string;
    description: string;
    id: string;
    img: string;
    label: string;
    price: string;
}

export interface GoodInBasket {
    good: Good;
    count: number; // кол-во товаров в корзине
    id: string; // id товара
}

export interface GoodsSearch {
    ids: string; // выбрать по id, exmaple ids=1,2,3
    categoryTypeIds: string; // выбрать по id категория, example categoryTypeIds=1,2,3
    minPrice: number; // выбрать с ценой не более максимально указанной
    maxPrice: number; // выбрать с ценой не менее минимально указанной
    text: string; // выбрать по содержанию указанной подстроки в названии
    limit: number; // количество возвращаемых товаров, по умолчанию 20
    offset: number; // смещение относительно начала.
    sortBy: keyof Good; // по какому полю бек сортирует товары, по умолчанию по id
    sortDirection: 'asc' | 'desc'; // как сортировать asc - по возрастанию desc - по убыванию, по умолчанию asc
}

export interface CardProps{
    img: string;
    label: string;
    price: string;
    description: string;
}

export enum LOAD_STATUSES {
    LOADED = "LOADED",
    LOADING = "LOADING",
    ERROR = "ERROR",
    UNKNOWN = "UNKNOWN"
}
