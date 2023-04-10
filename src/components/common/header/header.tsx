import Oz from "../../../img/Oz.png";
import { Input, Button, Select, Form } from "antd";
import css from "./header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { InputSearch } from "./search";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  getCommonCount,
  getIsAuthSelector,
  getLoginSelector,
  getProductsSelector,
} from "../../../store";
import debounce from "lodash/debounce";
import {useSelector} from "react-redux";

export const Header = () => {
  const isAuth = useAppSelector(getIsAuthSelector);
  const loginName = useAppSelector(getLoginSelector);
  const navigate = useNavigate()

  const commonCount = useSelector(getCommonCount);
  const exit = () => {
    localStorage.setItem("user", "");
    window.location.reload();
  };

  return (
    <div>
      <header className={css.header}>
        <Link to="">
          <img className={css.logo} src={Oz} alt="logo" />
        </Link>
        <div className={css.inputSearch}>
          <InputSearch />
        </div>

        {isAuth && <Button onClick={exit} className={css.login}>Выйти</Button>}
        {isAuth && <span> {loginName}</span>}
        {!isAuth && <Link to={"/login"}>
          <Button className={css.login}  >Войти </Button>
        </Link>}

        <Link to="/basket" className={css.basket}>
          Корзина
        </Link>
        {commonCount >= 1 && <span className={css.commonCount}>{commonCount}</span>}
        {loginName === "admin" && <Button onClick={()=>navigate(("/goods"))}>Все товары</Button>}
      </header>
    </div>
  );
};
