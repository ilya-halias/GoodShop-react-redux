import { Good } from "../../../types";
import { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import css from "./productcCard.module.css";
import { Button, Image } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchAddGoodInBasket } from "../../../store/slices/sliceGetBasket";
import { getBasket, getProducts } from "../../../store/api";
import { getBasketSelector } from "../../../store";

export const OneProduct: FC<Good> = ({
  description,
  id,
  img,
  label,
  price,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [product, setProduct] = useState<Good[]>([]);
  const [add, setAdd] = useState(false);
  const basket = useAppSelector(getBasketSelector);

  const count = basket.find((item) => item.id === id)?.count ?? 0;
  const addInBasket = () => {
    dispatch(fetchAddGoodInBasket({ good: product[0], count: count + 1 }));
    setAdd(true);
  };

  useEffect(() => {
    if (id) {
      getProducts({ ids: id }).then((data) => setProduct(data.items));
    }
  }, []);

  return (
    <div className={css.card}>
      <div>
        <Image className={css.icon} src={img} alt="icon" width={400} />
      </div>
      <div className={css.info}>
        <h2 className={css.labelCard}>{label}</h2>
        <h3 className={css.descriptionCard}>{description}</h3>
        <h4 className={css.priceCard}>{price}</h4>
        {!add && (
          <Button
            className={css.addInBasket}
            icon={<ShoppingCartOutlined />}
            onClick={addInBasket}
          >
            {" "}
            Добавить в корзину
          </Button>
        )}
        {add && (
          <Button
            className={css.addedInBasket}
            icon={<ShoppingCartOutlined />}
            onClick={() => navigate("/basket")}
          >
            Уже в корзине!
          </Button>
        )}
      </div>
    </div>
  );
};
