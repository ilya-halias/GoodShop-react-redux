import {FC} from "react"
import {CardProps, Good} from "../../../types";
import css from "./card.module.css"
import {Link} from "react-router-dom";

export const Card: FC<Good> = ({ id , categoryTypeId, img, price,label,description}) => {
    return(
        <Link to={`/product/${id}`}>
            <div className={css.card}>
                <img className={css.icon} src={img} alt="icon"/>
                <p >{label}</p>
                <p>{description}</p>
                <p>{price}</p>
            </div>
        </Link>
    )
}
