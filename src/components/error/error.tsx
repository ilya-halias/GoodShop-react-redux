import {Button, Result} from "antd";
import {useNavigate} from "react-router-dom";
import { FC } from "react"

 interface ErrorProps {
    login:boolean
}
export const Error : FC<ErrorProps>= ({login}) => {
    const navigate = useNavigate();
    return (
        <div>
            <Result
                status="error"
                title="Вы ввели не правильный логин или пароль"
                // subTitle="onfiguration takes 1-5 minutes, please wait."
                extra={[

                    <Button key="buy" onClick={()=> {

                        navigate("/login")}}>
                        Попробуйте снова </Button>,
                ]}
            />
        </div>
    )
}
