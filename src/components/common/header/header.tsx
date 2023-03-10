
import Oz from "../../../img/Oz.png"
import {Input, Button,} from 'antd';
import css from "./header.module.css"
import {Link} from "react-router-dom";

const {Search} = Input;
export const Header = () => {
    return (
        <header className={css.header}>

            <Link to="">
            <img className={css.logo} src={Oz} alt="logo"/>
            </Link>
            <Search placeholder="Введите запрос" className={css.inputSearch}/>
            <Button className={css.searchButton}> Войти </Button>
            <Link to="/basket" className={css.basket}>Корзина</Link>


        </header>

    )
}

