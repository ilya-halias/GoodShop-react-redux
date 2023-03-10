import {Card} from "../card";
import css from "./goods.module.css"
import {Category, Good} from "../../../types";
import {FC, useCallback, useEffect} from "react";
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import { getProductsSelector} from "../../../store";
import {actionsCategories} from "../../../store/slices/sliceProducts";

export const GoodCategory: FC<Category> = ({type, label, id}) => {

    const dispatch = useAppDispatch()
    const products = useAppSelector(getProductsSelector)

    const returnProducts = useCallback(() => dispatch(actionsCategories.fetchProducts() as any), [dispatch])

    useEffect(() => {
        returnProducts();
        window.scrollTo(0, 0)
    }, [])


    return (


        <div className={css.wrapper}>
            <Link to={`/categories/${type}`}>
                <h2 className={css.title}>{label}</h2>
            </Link>

            <ul className={css.products}>
                {products
                    .filter((card: any) => card.categoryTypeId === type)
                    .map((card => <li key={card.id}>< Card img={card.img} label={card.label} price={card.price}
                                                           description={card.description}/></li>))}
            </ul>

        </div>
    )

}
