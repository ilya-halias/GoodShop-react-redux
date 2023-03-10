import {Category, LOAD_STATUSES} from "../../../types";
import {useParams} from "react-router-dom";
import {GoodCategory} from "../goodCategory";
// import {categories} from "../../../api/mookapi";
import {getCategorySelector, getLoadStatusCategories} from "../../../store";
import {actionsCategories, fetchCategories} from "../../../store/slices/sliceCategory";
import {useCallback, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {Loader} from "../loader";


export const Sort = () => {

    const dispatch = useAppDispatch()
    const loadStatusCategories = useAppSelector(getLoadStatusCategories)
    const returnCategories = useCallback(() => dispatch(actionsCategories.fetchCategories() as any), [dispatch])

    useEffect(() => {
        returnCategories()
    }, []);


    const categories = useAppSelector(getCategorySelector)
    const {category} = useParams()


    const sort = categories.find((item: Category) => item.type === category)
    return (
        <div>
            <Loader isLoading={loadStatusCategories === LOAD_STATUSES.LOADING}/>
            {loadStatusCategories === LOAD_STATUSES.LOADED &&
                <div>
                    <GoodCategory type={sort!.type} label={sort!.label} id={sort!.id}/>
                </div>}
        </div>
    )


}
