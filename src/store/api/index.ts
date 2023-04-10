import { Category, Good, GoodInBasket } from "../../types";

const BASE_URL = "http://localhost:3000";

const getData = (url: string, params = {}) => {
  const searchParams = new URLSearchParams({ ...params });
  const fullUrl = new URL(url, BASE_URL);

  fullUrl.search = searchParams.toString();

  return fetch(fullUrl, {  headers: {
      "Content-Type": "application/json", Authorization: ` Bearer ${token}`
    },}).then((data) => {

    if (data.ok) {
      return data.json();
    }
    throw new Error("oops");
  });
};

let token = "";
const postData = (url: string, body: any) => {
  const fullUrl = new URL(url, BASE_URL);
  return fetch(fullUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", Authorization: ` Bearer ${token}`
    },
    body: JSON.stringify(body),
  })
    .then((data) => {
      if (data.ok) {
        return data.json();
      }
      else if (data.status === 404){
        localStorage.setItem("error", '404')
      }
    })
    .then((response) => {
      token = response.token;
      return response;
    });
};

const postBasket = (url: string, body: Record<string, unknown>) => {
  return fetch(new URL(url, BASE_URL), {
    method: "PUT",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" ,  Authorization: ` Bearer ${token}` },
  }).then((data) => {
    if (data.ok) {
      return data.json();
    }
    throw new Error("oops");
  });
};
export const getBasket = (): Promise<GoodInBasket[]> => getData("api/cart");

export const addInBasket = (body: {
  good?: Good;
  count?: number;
  id?: string;
}): Promise<GoodInBasket[]> => postBasket("/api/cart", body);

export const getCategories = (): Promise<{ categories: Category[] }> =>
  getData("/api/categories");

export const postUserData = (body: any): Promise<any> =>
  postData("/api/registration", body);

export const loginPostData = (credentials: {
  login: string;
  password: string;
}): Promise<{ login: string; token: string; status?: string }> =>
  postData("/api/login", credentials);


export const getPopularCategories = (): Promise<
  { category: Category; items: Good[] }[]
> => getData("/api/popular_categories");
export const getProducts = (params?: {
  categoryTypeIds?: string;
  ids?: string;
  page?: number;
  limit?: number;
  offset?: number;
  text?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: keyof Good; // по какому полю бек сортирует товары, по умолчанию по id
  sortDirection?: "asc" | "desc";
}): Promise<{
  items: Good[];
  total: number;
}> => getData("/api/goods", params);
