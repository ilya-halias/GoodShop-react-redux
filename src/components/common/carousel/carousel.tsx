import books from "../../../img/books.jpg"
import selection from "../../../img/selection.jpg"
import textbook from "../../../img/textbooks.jpg"
import css from "./carousel.module.css"
import {Carousel} from "antd";
import {Slide} from "./slide";

const slideArr = [
    {id: "1" ,label: "Книги", img: books , alt: "books", btn: "Выбрать товары", type: "books"},
    {id:"2", label: "Сувениры, галантерея", img: selection, alt: "selection", btn: "Выбрать товары", type: "souvenirs" },
    {id:"3", label: "Детям и мамам", img: textbook, alt: "textbook",  btn: "Выбрать товары", type: "children"}
]
export const CarouselGoods = () =>{
    return (
        <div className={css.carousel}>
            <Carousel autoplay dots={false}>
                {slideArr.map((item )=><Slide key = {item.id} id={item.id} label={item.label} img={item.img} alt={item.img} btn={item.btn} type={item.type}/>)}
            </Carousel>

        </div>
    )
}

