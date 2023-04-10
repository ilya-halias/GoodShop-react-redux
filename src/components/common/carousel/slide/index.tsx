
import books from "../../../../img/books.jpg";
import {Link} from "react-router-dom";
import selection from "../../../../img/selection.jpg";
import textbook from "../../../../img/textbooks.jpg";
import css from "../carousel.module.css";
import {Card} from "../../card";
import {FC} from "react";

interface SlideProps {
    id: string;
    label: string;
    img: any;
    alt: string;
    btn: string;
    type: string

}

export const Slide: FC<SlideProps> = ({btn,img,id,label,alt, type}) =>{
    return(
        <div className={css.carousel}>
        <h1 className={css.banner}>{label} </h1>
            <button className={css.buttonCarousel}><Link to={`/categories/${type}`}>{btn}</Link></button>
    <img src={img} alt={alt} className={css.img}/>
    </div>
    )

}

