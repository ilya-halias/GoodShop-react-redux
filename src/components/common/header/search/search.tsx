import React, {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState,
} from "react";
import css from "./search.module.css";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { getLoadStatusProducts, getProductsSelector } from "../../../../store";
import { AutoComplete, Input } from "antd";
import debounce from "lodash/debounce";
import { fetchProducts } from "../../../../store/slices/sliceProducts";
import { Good } from "../../../../types";
import { useNavigate } from "react-router-dom";
import {getProducts} from "../../../../store/api";

export const InputSearch = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [goods, setGoods] = useState<Good[]>([
    {
      categoryTypeId: "",
      description: "",
      id: "",
      img: "",
      label: "",
      price: "",
    },
  ]);
  const [params, setParams] = useState({
    text: "",
  });
    const fetchProductsDebounced = useCallback(debounce((params) => getProducts(params).then(data => setGoods(data.items)), 1500), [])


  useEffect(() => {
    fetchProductsDebounced(params);
  }, [params]);

  const handlerSearchHeader = (value: string) => {
    setParams((prevParams) => ({ ...prevParams, text: value }));
  };

  return (
    <div>
      <AutoComplete
        style={{ width: 1000 }}
        placeholder="Введите название товара..."
        options={(goods || []).map((good) => ({
          key: good.id,
          value: good.label,
          label: good.label,
        }))}
        filterOption={true}
        onSelect={(_, { key }) => navigate(`/product/${key}`)}
        onChange={handlerSearchHeader}

      />
    </div>
  );
};
