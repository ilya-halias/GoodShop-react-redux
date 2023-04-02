import { useCallback, useEffect, useState } from "react";
import React from "react";
import { Input, Select, Slider, Table, Button } from "antd";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getCategorySelector,
  getIsAuthSelector,
  getLoadStatusProducts,
  getProductsSelector,
  getTotalSelector,
} from "../../store";
import { fetchProducts } from "../../store/slices/sliceProducts";
import { Loader } from "../common";
import { LOAD_STATUSES } from "../../types";
import { fetchCategories } from "../../store/slices/sliceCategory";
import debounce from "lodash/debounce";
import { useNavigate } from "react-router-dom";
import css from "./goodPage.module.css";

export const GoodsPage = () => {
  const isAuth = useAppSelector(getIsAuthSelector);
  const goods = useAppSelector(getProductsSelector);
  const total = useAppSelector(getTotalSelector);
  const categories = useAppSelector(getCategorySelector);

  const optionsCategories = categories?.map((category) => ({
    value: category.id,
    label: category.label,
  }));


  const dispatch = useAppDispatch();
  const loadStatusProducts = useAppSelector(getLoadStatusProducts);
  const { Search } = Input;
  const [params, setParams] = useState({
    page: 1,
    limit: 20,
    offset: 0,
    text: "",
    categoryTypeIds: "1,2,3,4,5,6,7,8,9,10,11",
    minPrice: 0,
    maxPrice: 1000,
    sortBy: "price",
    sortDirection: "asc",
  });
  const fetchProductsDebounced = useCallback(
    debounce((params): void => dispatch(fetchProducts(params) as any), 2_000),
    [params, dispatch]
  );

  useEffect(() => {
    fetchProductsDebounced(params);
  }, [params]);

  // useEffect(() => {
  //   dispatch(fetchProducts(params as any));
  //
  // }, [params]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);


  const dataSource = (goods || []).map((good) => ({ ...good, key: good.id }));
  const columns = [
    {
      title: "img",
      dataIndex: "img",
      render: (img: string) => (
        <img alt="icon" src={img} width={150} height={150} />
      ),
    },
    {
      title: "Label",
      dataIndex: "label",
      key: "label",
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "price",
      dataIndex: "price",
      key: "price",
    },
  ];
  const handlerSearch = (value: string) => {
    setParams((prevParams) => ({ ...prevParams, text: value }));
  };
  const handlerCategory = (value: string) => {
    setParams((prevParams) => ({ ...prevParams, categoryTypeIds: value }));
  };

  const handlerSlider = (values: any) => {
    setParams((prevParams) => ({
      ...prevParams,
      minPrice: values[0],
      maxPrice: values[1],
    }));
    console.log(values);
  };

  const handlerSort = (value: "asc" | "desc") => {
    setParams((prevParams) => ({
      ...prevParams,
      sortDirection: value,
      sortBy: "price",
    }));
  };

  const optionsSort: {value:("asc" | "desc"), label: string }[] = [
    { value: "desc", label: "Сортировать по убыванию цены" },
    { value: "asc", label: "Сортировать по увеличению цены" },
  ];

  const navigate = useNavigate();
  const handleRowClick = (record: any) => {
    navigate(`/product/${record.id}`);
  };
  console.log("params.sortDirection", params.sortDirection);

  const resetParams = () => {
    setParams((prevParams) => ({
      ...prevParams,
      text: "",
      categoryTypeIds: "1,2,3,4,5,6,7,8,9,10,11",
      minPrice: 0,
      maxPrice: 1000,
      sortBy: "price",
      sortDirection: "asc",
      offset: 0,
    }));
  };
  if (loadStatusProducts === LOAD_STATUSES.LOADED) {
    // if(true) {
    return (
      <div>
        {/*{!isAuth && <p className={css.textAdmin}>Вы не вошли как администратор, пожалуйста авторизируйтесь</p>}*/}
        {/*{isAuth &&*/}
        <div>
          <Search
            className={css.searchAdmin}
            onSearch={handlerSearch}
            placeholder="Введте запрос"
          ></Search>
          <div className={css.sort}>
            <Select
              options={optionsCategories}
              onChange={handlerCategory}
              style={{ width: 400 }}
              defaultValue={"Все товары"}
              // value={categories?.map((category) => ( category.label))}
              value={params.categoryTypeIds}
            />
            <Slider
              style={{ width: 400 }}
              onChange={handlerSlider}
              range
              defaultValue={[0, 1000]}
              max={1000}
            />
            <Select
              style={{ width: 400 }}
              onChange={handlerSort}
              options={optionsSort}
              // value={"desc"|| "asc"}
            />
          </div>
          <div className={css.reset}>
            <Button onClick={resetParams}>Сбросить параметры</Button>
          </div>

          <Table
            onRow={(record) => ({
              onClick: () => {
                handleRowClick(record);
              },
            })}
            onChange={({ current, pageSize }) => {
              setParams((prevParams) => ({
                ...prevParams,
                ...(pageSize !== undefined &&
                  current !== undefined && {
                    offset: (current - 1) * pageSize,
                  }),
                ...(pageSize !== undefined && { limit: pageSize }),
              }));
            }}
            pagination={{
              pageSize: params.limit,
              current: params.offset / params.limit + 1,
              pageSizeOptions: [5, 10, 20],
              total,
            }}
            columns={columns}
            dataSource={dataSource}
          />
        </div>
        {/*}*/}
      </div>
    );
  }
  return <Loader isLoading={loadStatusProducts === LOAD_STATUSES.LOADING} />;
};
