import { FC } from "react";
import css from "./loader.module.css";

interface LoaderProps {
    isLoading: boolean;
}

export const Loader: FC<LoaderProps> = ({ isLoading }) =>
    isLoading ? (
        <div className={css.lds_circle}>
            <div></div>
        </div>
    ) : null;
