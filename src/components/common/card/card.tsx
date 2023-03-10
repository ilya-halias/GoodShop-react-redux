import {FC} from "react"
import {CardProps} from "../../../types";
import css from "./card.module.css"
import {Link} from "react-router-dom";

export const Card: FC<CardProps> = ({img, price,label,description}) => {
    return(
        <Link to={`/product/${label}`}>
        <div className={css.card}>
            <img className={css.icon} src={img} alt="icon"/>
            <p >{label}</p>
            <p>{description}</p>
            <p>{price}</p>
        </div>
    </Link>
    )
}
