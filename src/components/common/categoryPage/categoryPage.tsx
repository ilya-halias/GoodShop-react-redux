import { Category, Good, LOAD_STATUSES } from "../../../types";
import {Link, useParams} from "react-router-dom";
import { GoodCategory } from "../goodCategory";

import {
  getCategorySelector,
  getLoadStatusCategories,
  getLoadStatusProducts,
  getProductsSelector,
} from "../../../store";
import { fetchCategories } from "../../../store/slices/sliceCategory";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { Loader } from "../loader";

import { getProducts } from "../../../store/api";
import { fetchProducts } from "../../../store/slices/sliceProducts";

export const CategoryPage = () => {
  const dispatch = useAppDispatch();
  const { category } = useParams();
  const loadStatusProducts = useAppSelector(getLoadStatusProducts);
  const categories = useAppSelector(getCategorySelector);
  const products = useAppSelector(getProductsSelector);

  useEffect(() => {
    dispatch(fetchCategories());
    window.scrollTo(0, 0)
  }, []);

  const sort = useMemo(() => {
    if(category) {
      return categories.find((item) => item.type === category);
    }
  }, [category, categories]);


  useEffect(() => {
    if (sort) {
      dispatch(fetchProducts({ categoryTypeIds: sort.id }));
    }
  }, [sort]);

  if (products && sort) {
    return (
        <>
      <GoodCategory items={products} type={sort.type} label={sort.label} />
            </>
    );
  }
  {
    return <> <Loader isLoading={loadStatusProducts === LOAD_STATUSES.LOADING}/>
        && <h2> Категория не найдена, перейдите в главное меню по ссылке:<Link to=" ">Вернуться на главную</Link></h2>
    </>  }  ;

};
