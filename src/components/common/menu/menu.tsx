import css from "./menu.module.css";
import {categories} from '../../../api/mookapi';
import {Link} from "react-router-dom";
import {GoodCategory} from "../goodCategory";
import {FC} from "react";
import {Category} from "../../../types";

export const MenuGoods = () => {
    return(


            <ul className={css.categories}>
                {categories.map((category) =>(
                    <Link to={`/categories/${category.type}`} key={category.id} className={css.category}>
                        <li> {category.label}</li>
                    </Link>
                    )
                )}

            </ul>

    )
}
