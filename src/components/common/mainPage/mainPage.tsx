
import {MenuGoods} from "../menu";
import {CarouselGoods} from "../carousel";
import {GoodCategory} from "../goodCategory";

import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {getCategorySelector, getPopularCategoriesSelector, } from "../../../store";
import {useEffect} from "react";
import {fetchPopularCategories} from "../../../store/slices/slicePopularCategory";



export const MainPage = () => {
    const dispatch = useAppDispatch();

    const fetchCategories = () => dispatch(fetchPopularCategories())

    useEffect(()=> {
        fetchCategories()
    },[])

    const popular = useAppSelector(getPopularCategoriesSelector)

    return (
        <>

            <MenuGoods />
            <CarouselGoods/>
            {popular.map((item) =>
                <GoodCategory  key={item.category.id} items={item.items}  type={item.category.type} label={item.category.label} />)}

        </>

    )
}
