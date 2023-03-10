import {Footer, MenuGoods, GoodCategory, Header, CarouselGoods, MainPage, NotFound, Sort, ProductCard} from "./common";
import {Route, Routes} from "react-router-dom"
import css from "../styles.module.css"
import {useEffect} from "react";
import {getProducts} from "../api";


export const App = () => {
    return (
        <>
            <Header/>
            <Routes>
                <Route path="" element={<MainPage/>}/>
                <Route path={"/product/:product"} element={<ProductCard/>}/>
                <Route path={"/categories/:category"} element={<Sort/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
            <Footer/>
        </>

    )
}


