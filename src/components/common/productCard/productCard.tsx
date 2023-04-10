import { CardProps, Good, LOAD_STATUSES } from "../../../types";
import {Link, useParams} from "react-router-dom";
import { Card } from "../card";
import css from "./productcCard.module.css";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getLoadStatusProducts, getProductsSelector } from "../../../store";
import { useEffect, useMemo, useState } from "react";
import { Loader } from "../loader";
import { fetchProducts } from "../../../store/slices/sliceProducts";
import { getProducts } from "../../../store/api";
import { OneProduct } from "./oneProduct";
import { Breadcrumb} from 'antd';

export const ProductCard = () => {
  const goods = useAppSelector(getProductsSelector);
  const dispatch = useAppDispatch();
  const loadStatusProducts = useAppSelector(getLoadStatusProducts);

  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchProducts({ ids: id }));
  }, [id, dispatch]);

  if (loadStatusProducts === LOAD_STATUSES.LOADED) {
    return (
      <div>
        <OneProduct

          id={goods[0].id}
          img={goods[0].img}
          label={goods[0].label}
          price={goods[0].price}
          description={goods[0].description}
          categoryTypeId={goods[0].categoryTypeId}


        />
      </div>
    );
  }
  {
  return <Loader isLoading={loadStatusProducts === LOAD_STATUSES.LOADING} />
  //     &&  <div>  <Breadcrumb className={css.breadcrumb}>
  //       <Breadcrumb.Item>
  //         <Link to="/">
  //           <h2> Продукт не найден, перейдите в главное меню по ссылке:<Link to=" ">Вернуться на главную</Link></h2>
  //
  //         </Link>
  //       </Breadcrumb.Item>
  //     </Breadcrumb>
  // </div>
  }
  }
