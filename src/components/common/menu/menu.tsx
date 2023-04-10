import css from "./menu.module.css";
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {getCategorySelector} from "../../../store";
import {useEffect} from "react";
import {fetchCategories} from "../../../store/slices/sliceCategory";

export const MenuGoods = () => {
    const categories = useAppSelector(getCategorySelector);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    return(
            <ul className={css.categories}>
                {categories.map((category) =>(
                    <Link to={`/categories/${category.type}`} key={category.id} className={css.category}>
                        <li className={css.elementMenu}> {category.label}</li>
                    </Link>
                    )
                )}

            </ul>

    )
}
