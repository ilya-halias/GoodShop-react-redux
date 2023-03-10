import {Category} from "../types";
import {v4 as uuidv4} from 'uuid';


export const categories: Category[] = [
    {id: uuidv4(), label: 'Продукты', type: 'products'},
    {id: uuidv4(), label: 'Косметика, парфюмерия', type: 'cosmetics'},
    {id: uuidv4(), label: 'Развлечения, творчество', type: 'fun'},
    {id: uuidv4(), label: 'Сувениры, галантерея', type: 'souvenirs'},
    {id: uuidv4(), label: 'Техника, электроника', type: 'appliances'},
    {id: uuidv4(), label: 'Дом, сад, зоотовары', type: 'home'},
    {id: uuidv4(), label: 'Книги', type: 'books'},
    {id: uuidv4(), label: 'Детям и мамам', type: 'children'},
    {id: uuidv4(), label: 'Канцтовары, учеба', type: 'office'},
    {id: uuidv4(), label: 'Туризм, отдых, спорт', type: 'sport'},
    {id: uuidv4(), label: 'Здоровье, медтехника', type: 'health'},
]
