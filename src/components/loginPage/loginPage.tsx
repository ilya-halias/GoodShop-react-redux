import css from "./login.module.css";
import { Input, Button } from "antd";
import {Link, useNavigate} from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {loginThunk} from "../../store/slices/sliceLogin"
import {getIsAuthSelector} from "../../store";


export const LoginPage = () => {
    const navigate = useNavigate()
    const isAuth = useAppSelector(getIsAuthSelector)
  const dispatch = useAppDispatch();
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
  return (
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
          );
          resetForm();
        }}
        validationSchema={validationsSchema}
      >
        {({ values, errors, handleSubmit, handleChange, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <>
              <label htmlFor={"login"}>Логин</label>

              <Input
                className={css.login}
                type={"text"}
                name={"login"}
                onChange={handleChange}
                value={values.login}
              />
              {errors.login && <p className={css.error}>{errors.login}</p>}
                <label htmlFor={"password"}>Пароль</label>

                <Input
                    className={css.password}
                    type={"password"}
                    name={"password"}
                    onChange={handleChange}
                    value={values.password}
                />
                {errors.password && <p className={css.error}>{errors.password}</p>}

              <Button  htmlType="submit">Войти</Button>

              <br />
              <Link to={"/registration"}>
                <Button>Зарегистрироваться</Button>
              </Link>
            </>
          </form>
        )}
      </Formik>
    </div>
  );
};
