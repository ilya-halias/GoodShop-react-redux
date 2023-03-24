import { Good } from "../../../types";
import { FC } from "react";
import { Link } from "react-router-dom";
import css from "../card/card.module.css";

export const OneProduct: FC<Good> = ({
  description,
  id,
  img,
  label,
  price,
}) => {
  return (
    <Link to={`/product/${id}`}>
      <div className={css.card}>
        <img className={css.icon} src={img} alt="icon" />
        <p>{label}</p>
        <p>{description}</p>
        <p>{price}</p>
      </div>
    </Link>
  );
};
