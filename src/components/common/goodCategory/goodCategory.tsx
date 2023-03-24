import { Card } from "../card";
import css from "./goods.module.css";
import { Category, Good } from "../../../types";
import { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getProductsSelector } from "../../../store";

interface GoodCategoryProps {
  label: string;
  items: Good[];
  type?: string;
}

export const GoodCategory: FC<GoodCategoryProps> = ({ type, label, items }) => {
  return (
    <div className={css.wrapper}>
      <Link to={`/categories/${type}`}>
        <h2 className={css.title}>{label}</h2>
      </Link>

      <ul className={css.products}>
        {items
          // .filter((card: any) => card.categoryTypeId === type)
          .map((card) => (
            <li key={card.id} className={css.goodCard}>
              <Card
                img={card.img}
                label={card.label}
                categoryTypeId={card.categoryTypeId}
                id={card.id}
                price={card.price}
                description={card.description}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};
