import {Category, Good} from "../../types";

const BASE_URL = "http://localhost:3000";

const getData = (url: string,params = {}) => {
    const searchParams = new URLSearchParams({...params} )
    const fullUrl = new URL(url, BASE_URL);

    fullUrl.search = searchParams.toString();

    return fetch(fullUrl).then((data) => {
        if (data.ok) {
            return data.json();
        }
        throw new Error('oops');
    });
};
const postData = (url: string,body: any) => {
    const fullUrl = new URL(url, BASE_URL);
    return fetch(fullUrl, {
        method: "POST",
        // headers: {
        //     "Content-Type": "application/json",
        // },
        body: JSON.stringify(body),
    }).then((data) => {
        if (data.ok) {
        }
        throw new Error('oops');
    });
};

export const getCategories = ( ): Promise< { categories: Category[] }> =>
    getData("/api/categories");

export const getPopularCategories = ( ): Promise<  { category: Category; items: Good[] }[]> =>
    getData("/api/popular_categories");
export const getProducts = (params?: {categoryTypeIds?: string,  ids?: string}): Promise<{ items: Good[]; total: number;   }> =>
    getData("/api/goods",params);




