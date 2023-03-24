import css from "./login.module.css";
import { Input, Button } from "antd";
import {Link} from "react-router-dom";


export const LoginPage = () => {

    return (
        <div>
            <label>Логин</label>
            <Input type={"text"}></Input>
            <label>Пароль</label>
            <Input type={"password"}></Input>
            <Button>Войти</Button><br/>
            <Link to={"/registration"}>
            <Button>Зарегистрироваться</Button>
            </Link>
        </div>
    )
}
