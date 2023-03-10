import {CardProps} from "../../../types";
import {useParams} from "react-router-dom";
import api from "../../../api/api.json"
import {Card} from "../card";
import css from "./productcCard.module.css"

export const ProductCard = () => {

    const {product} = useParams()
    const sort = api.find((item: CardProps)=> item.label === product)
    return (
        <div className={css.product_card}>
            <Card  label={sort!.label} img={sort!.img} description={sort!.description} price={sort!.price} />
        </div>
    )
}
