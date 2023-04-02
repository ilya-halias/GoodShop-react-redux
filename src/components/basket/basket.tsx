
import css from "./basket.module.css"
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {useEffect} from "react";
import {fetchAddGoodInBasket, fetchGetBasket} from "../../store/slices/sliceGetBasket";
import {GoodInBasket} from "../../types";
import {getBasketSelector, getCommonCount} from "../../store";
import {Image, Button} from "antd";
import {PlusOutlined, MinusOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

export const Basket = () => {

    const dispatch = useAppDispatch()
    const commonCount = useSelector(getCommonCount);

    useEffect(()=>{
        dispatch(fetchGetBasket())
    }, [dispatch])

    const goodInBasket: GoodInBasket[] = useAppSelector(getBasketSelector)


    const addGoodOne = (good: GoodInBasket) => {
        dispatch(fetchAddGoodInBasket({...good, count: good.count + 1}))
    }

    const deleteGoodOne = (good: GoodInBasket) => {
        dispatch(fetchAddGoodInBasket({...good, count: good.count - 1}))
    }
        if(commonCount >= 1) {
            return (
                <div className={css.basket}>
                    <ul>
                        {goodInBasket.map((good) => (
                            <li key={good.id} className={css.goodInBasket}>
                                <Image src={good.good.img} style={{width: 250, height:300}}/>
                                <Link to={`/good/${good.good.id}`}>
                                    <p style={{fontSize: 20}}>{good.good.label}</p>

                                </Link>

                                <div className={css.groupCount}>
                                    <Button onClick={() => addGoodOne(good)} shape={"circle"} icon={<PlusOutlined/>}/>
                                    <p className={css.count}>{good.count} </p>
                                    <Button onClick={() => deleteGoodOne(good)} shape={"circle"}
                                            icon={<MinusOutlined/>}/>
                                </div>

                                <p style={{fontSize: 20}}>{good.count * Number(good.good.price)}</p>

                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    {
        return(
            <div>
        <h2> В данный момент корзина пуста, добавте товар в корзину  </h2>
                <span> Перейдите в главное меню по ссылке:<Link to=" ">Вернуться на главную</Link></span>
            </div>
    )
    }
}
