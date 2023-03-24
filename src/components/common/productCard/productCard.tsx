import { CardProps, Good, LOAD_STATUSES } from "../../../types";
import { useParams } from "react-router-dom";
import { Card } from "../card";
import css from "./productcCard.module.css";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getLoadStatusProducts, getProductsSelector } from "../../../store";
import { useEffect, useMemo, useState } from "react";
import { Loader } from "../loader";
import { fetchProducts } from "../../../store/slices/sliceProducts";
import { getProducts } from "../../../store/api";
import { OneProduct } from "./oneProduct";

export const ProductCard = () => {
  // const [good, setGood] = useState<Good[]>([]);

  const goods = useAppSelector(getProductsSelector);
  console.log(goods);
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
          description={goods[0].description}
          // id={good[0].id}
          img={goods[0].img}
          label={goods[0].label}
          price={goods[0].price}
        />
      </div>
    );
  }
  return <Loader isLoading={loadStatusProducts === LOAD_STATUSES.LOADING} />;
};
