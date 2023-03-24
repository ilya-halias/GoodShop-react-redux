
import Oz from "../../../img/Oz.png"
import {Input, Button,Select, Form} from 'antd';
import css from "./header.module.css"
import {Link} from "react-router-dom";
import {InputSearch} from "./search"
import {Params} from "../../../types"
import {useCallback, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {getProductsSelector} from "../../../store";
import debounce from 'lodash/debounce';

const {Search} = Input;


export const Header = () => {
    const [params, setParams] = useState<Params>({
        q: ''

    })

    const dispatch = useAppDispatch()
    const products = useAppSelector(getProductsSelector)

    // const fetchProductsDebounced = useCallback(debounce((params: Params): void =>
    //     dispatch(fetchProducts(params) as any), 2_000), [dispatch]);

    // useEffect(() => fetchProductsDebounced(params), [params]);

    // useEffect(() =>{
    //     getProductsSelector()
    // }, [params]);

    const updateParams = (nextParams: Params) => {
        setParams(prevState => ({...prevState, ...nextParams}))
    }

    return (
        <header className={css.header}>

            <Link to="">
            <img className={css.logo} src={Oz} alt="logo"/>
            </Link>
            <Search placeholder="Введите запрос" className={css.inputSearch} >

            {/*<InputSearch value={params.q} onChange={(q) => updateParams({q})}/>*/}
            </Search>
            <Link to="/login" ><Button className={css.searchButton}> Войти </Button></Link>

            <Link to="/basket" className={css.basket}>Корзина</Link>


        </header>

    )
}



