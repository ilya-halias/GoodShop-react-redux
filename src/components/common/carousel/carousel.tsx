import books from "../../../img/books.jpg"
import selection from "../../../img/selection.jpg"
import textbook from "../../../img/textbooks.jpg"
import css from "./carousel.module.css"
import {Carousel} from "antd";
import {Link} from "react-router-dom";
import {FC} from "react";
import {Category} from "../../../types";
import api from "../../../api/api.json"


export const CarouselGoods = () =>{
    return (
            <Carousel autoplay dots={false}>
                <Link to={`/categories/books`}>
                <div className={css.carousel}>
                    <h1 className={css.banner}>Книги </h1>
                    <button className={css.buttonCarousel}>Выбрать товары</button>
                    <img src={books} alt={'books'} className={css.img}/>
                </div>
                </Link>
                <Link to={`/categories/souvenirs`}>
                <div className={css.carousel}>
                    <h1 className={css.banner}>Сувениры, галантерея</h1>
                    <button className={css.buttonCarousel}>Выбрать товары</button>
                    <img src={selection} alt={'selection'} className={css.img}/>
                </div>
                </Link>
                    <Link to={`/categories/children`}>
                <div className={css.carousel}>
                    <h1 className={css.banner}>Детям и мамам</h1>
                    <button className={css.buttonCarousel}>Выбрать товары</button>
                    <img src={textbook} alt={'textbook'} className={css.img}/>
                </div>
                    </Link>
            </Carousel>


    )
}

