import css from "./login.module.css";
import { Input, Button, Result } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loginThunk } from "../../store/slices/sliceLogin";
import { getIsAuthSelector } from "../../store";
import { Error } from "../error";
import { log } from "util";
import {useState} from "react";

export const LoginPage = () => {
  const navigate = useNavigate();
  const isAuth = useAppSelector(getIsAuthSelector);
  const dispatch = useAppDispatch();
  const exit = () => {
    localStorage.setItem("error", "");
    window.location.reload();
  };
  const [login, setLogin] = useState(true)

  const validationsSchema = yup.object().shape({
    login: yup
      .string()
      .typeError("Должно быть строкой")
      .required("Обязательно"),
    password: yup
      .string()
      .typeError("Должно быть строкой")
      .required("Обязательно"),
  });

  //   const error = localStorage.getItem("error")
  //
  // if (error === "404" ){
  //     return (
  //         <div>
  //         <p> Не верный логин или пароль, попробуйте еще раз</p>
  //         <button onClick={exit}> Попробовать еще раз </button>
  //         </div>
  //     )
  // }


  return (
    <>
      {!login ? (
          <Result
              status="error"
              title="Вы ввели не правильный логин или пароль"
              extra={[

                <Button key="buy" onClick={()=> {
                  setLogin(true)
                  navigate("/login")}}>
                  Попробуйте снова </Button>,
              ]}
          />
      ) : (
        <div>
          <Formik
            initialValues={{
              login: "",
              password: "",
            }}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={(values, { resetForm }) => {
              dispatch(
                loginThunk({ login: values.login, password: values.password })
              ).then((data) => {

                if (data.payload === undefined) {
                  setLogin(false)
                }
              });
              resetForm();
            }}
            validationSchema={validationsSchema}
          >
            {({
              values,
              errors,
              handleSubmit,
              handleChange,
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                <>
                  <label className={css.label} htmlFor={"login"}>Логин</label>

                  <Input
                    className={css.login}
                    type={"text"}
                    name={"login"}
                    onChange={handleChange}
                    value={values.login}
                  />
                  {errors.login && <p className={css.error}>{errors.login}</p>}
                  <label className={css.label}  htmlFor={"password"}>Пароль</label>

                  <Input
                    className={css.password}
                    type={"password"}
                    name={"password"}
                    onChange={handleChange}
                    value={values.password}
                  />
                  {errors.password && (
                    <p className={css.error}>{errors.password}</p>
                  )}

                  <Button className={css.button} htmlType={"submit"}>Войти</Button>

                  {isAuth && navigate("/")}

                  <br />
                  <Link to={"/registration"}>
                    <Button className={css.button}>Зарегистрироваться</Button>
                  </Link>
                </>
              </form>
            )}
          </Formik>
        </div>
      )}
    </>
  );
};
