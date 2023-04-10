import { Formik, Field } from "formik";
import * as yup from "yup";
import css from "./registration.module.css";
import { Input, Button, Switch, Radio, RadioChangeEvent } from "antd";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getCategorySelector } from "../../store";
import { fetchCategories } from "../../store/slices/sliceCategory";
import { registrationData, registrationFields } from "./validation";
import { registrationUserData } from "../../store/slices/sliceUser";
import { useNavigate } from "react-router-dom";

export const Registration = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const categories = useAppSelector(getCategorySelector);

  return (
    <div className={css.wrapperRegistration}>
      <Formik
        initialValues={registrationData.initialValues}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={(values, { resetForm }) => {
          const data = Object.keys(values).reduce((acc: {}, key: string) => {
            if (registrationFields.includes(key)) {
              // @ts-ignore
              acc[key] = values[key];
            }
            return acc;
          }, {});
          dispatch(
            registrationUserData({
              ...data,
              login: values.email,
              secret: { type: values.secretQuestion, answer: values.reply },
            })
          );
          resetForm();
          navigate("/login") ;
        }}
        validationSchema={registrationData.validation}
      >
        {({ values, errors, handleSubmit, handleChange, setFieldValue }) => (
          <form onSubmit={handleSubmit} >
            <div className={css.form}>
              {registrationData.fields.map((field) => (
                <div key={field.name} className={css.informationBlock}>
                  {field.label && (
                    <label className={css.label} htmlFor={field.name}>{field.label}</label>
                  )}

                  <Input
                    className={css[field.css]}
                    type={field.type}
                    name={field.name}
                    onChange={handleChange}
                    value={values[field.name]}
                  />
                  {errors[field.name] && (
                    <p className={css.error}>{errors[field.name]}</p>
                  )}
                </div>
              ))}
            </div>
            <div className={css.gender}>
              <label className={css.label} htmlFor={"gender"}> Ваш пол</label> <br />
              <Radio.Group
                onChange={handleChange}
                value={values.gender}
                name={"gender"}
              >
                <Radio className={css.radioGender} value={1}>Мужской</Radio>
                <Radio className={css.radioGender} value={2}>Женский</Radio>
              </Radio.Group>
            </div>
            <div className={css.interests}>
              <label className={css.labelInterests}>Выберите любимые категории</label>
              <br />
              <div id={css.interestsList}>
                <>
                  {categories.map((category) => (
                    <label className={css.categoriesLabel} key={category.id}>
                      <Field
                        type="checkbox"
                        name="interests"
                        value={category.label}
                        onChange={handleChange}gjl
                      />
                      <span className={css.checkboxLabel}>
                        {category.label}
                      </span>
                    </label>
                  ))}
                </>
              </div>
              {errors.interests && (
                <p className={css.error}>{errors.interests}</p>
              )}
            </div>

            <div className={css.isSubscribe}>
              <label className={css.labelSubscribe} htmlFor={"isSubscribe"}> Подписаться на новости </label>
              <Switch
                checked={values.isSubscribe}
                className={css.switchButton}
                onChange={(value) => setFieldValue("isSubscribe", value)}
              />
            </div>

            <div className={css.bornAt}>
              <label className={css.labelbornAt} htmlFor={"bornAt"}> Дата рождения</label> <br />
              <Input
                className={css.input}
                type={"date"}
                name={"bornAt"}
                onChange={handleChange}
                value={values.bornAt}
                min="1930-01-01"
              />
            </div>

            {registrationData.fieldsChecking.map((field) => (
              <div key={field.name}>
                {field.name === "reply" ? (
                  values.secretQuestion && (
                    <div className={css.informationBlock}>
                      {field.label && (
                        <label className={css.label} htmlFor={field.name}>{field.label}</label>
                      )}
                      <Input
                        className={css[field.css]}
                        type={field.type}
                        name={field.name}
                        onChange={handleChange}
                        value={values[field.name]}
                      />
                      {errors[field.name] && (
                        <p className={css.error}>{errors[field.name]}</p>
                      )}
                    </div>
                  )
                ) : (
                  <div className={css.informationBlock}>
                    {field.label && (
                      <label className={css.label} htmlFor={field.name}>{field.label}</label>
                    )}
                    <Input
                      className={css[field.css]}
                      type={field.type}
                      name={field.name}
                      onChange={handleChange}
                      value={values[field.name]}
                    />
                    {errors[field.name] && (
                      <p className={css.error}>{errors[field.name]}</p>
                    )}
                  </div>
                )}
              </div>
            ))}

            <div className={css.buttonSubmitForm}>
              <Button className={css.registrationBtn} htmlType="submit">
                Зарегистрироваться
              </Button>
                <Button className={css.registrationBtn} onClick={()=>navigate("/")}> Отмена</Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
