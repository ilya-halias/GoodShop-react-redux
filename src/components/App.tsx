import {Footer, Header,  MainPage, NotFound, CategoryPage, ProductCard} from "./common";
import {Route, Routes} from "react-router-dom"
import css from "../styles.module.css"
import {Registration} from "./registration";
import {LoginPage} from "./loginPage";
import {useAppSelector} from "../store/hooks";



export const App = () => {
    const alerts = useAppSelector(state => state.alerts.data)
    const variant = {
        success: {color: 'green', text: 'Ура!'}
    }
    return (
        <>
            <Header/>
            <Routes>
                <Route path="" element={<MainPage/>}/>
                <Route path={"/registration"} element={<Registration/>}/>
                <Route path={"/login"} element={<LoginPage/>}/>
                <Route path={"/product/:id"} element={<ProductCard/>}/>
                <Route path={"/categories/:category"} element={<CategoryPage/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
            {alerts.length > 0 && alerts.map((item)=> <p key={item} style={{position: 'fixed', top: 0, fontSize: '20px', color: 'red'}}>{item}</p>)}
            <Footer/>
        </>

    )
}


