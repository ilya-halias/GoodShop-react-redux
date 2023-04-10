import {Footer, Header,  MainPage, NotFound, CategoryPage, ProductCard} from "./common";
import {Route, Routes} from "react-router-dom"
import css from "../styles.module.css"
import {Registration} from "./registration";
import {LoginPage} from "./loginPage";
import {useAppSelector} from "../store/hooks";
import {GoodsPage} from "./goodsPage";
import {Basket} from "./basket"



export const App = () => {



    return (
        <>
            <Header/>
            <Routes>
                <Route path="" element={<MainPage/>}/>
                <Route path={"/registration"} element={<Registration/>}/>
                <Route path={"/login"} element={<LoginPage/>}/>
                <Route path={"/basket"} element={<Basket/>}/>
                <Route path={"/product/:id"} element={<ProductCard/>}/>
                <Route path={"/categories/:category"} element={<CategoryPage/>}/>
                <Route path={"/goods"} element={<GoodsPage/>}/>
                <Route path="*" element={<NotFound/>}/>

            </Routes>
            <Footer/>
        </>

    )
}


