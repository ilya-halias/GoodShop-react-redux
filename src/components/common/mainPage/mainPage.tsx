
import {MenuGoods} from "../menu";
import {CarouselGoods} from "../carousel";
import {GoodCategory} from "../goodCategory";
import {categories} from "../../../api/mookapi";


export const MainPage = () => {
    return (
        <>

            <MenuGoods />
            <CarouselGoods/>
            {categories.map((category) =>
                <GoodCategory key={category.id} id={category.id} type={category.type} label={category.label}/>)}

        </>

    )
}
