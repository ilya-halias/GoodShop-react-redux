import { ChangeEvent, FC} from "react";
import css from "./search.module.css"

interface InputProps {
    value: string;
    disabled?: boolean;
    onChange: (value:string, e: ChangeEvent<HTMLInputElement>)=> void
}

export const InputSearch: FC<InputProps> = ({ value, disabled, onChange}) =>{
    return(

        <input
            className={css.search}
            value={value}
            disabled={disabled}
            onChange={(e)=> onChange(e.target.value, e)}
        />
    )
}


































