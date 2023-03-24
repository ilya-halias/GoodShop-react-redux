import { Formik, Field } from "formik";
import * as yup from "yup";
import css from "./registration.module.css";
import { Input, Button, Switch, Radio, RadioChangeEvent } from "antd";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getCategorySelector } from "../../store";
import { fetchCategories } from "../../store/slices/sliceCategory";
import { registrationData } from "./validation";

export const Registration = () => {
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
          console.log(values);
          resetForm();
        }}
        validationSchema={registrationData.validation}
      >
        {({ values, errors, handleSubmit, handleChange, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <div className={css.form}>
              {registrationData.fields.map((field) => (
                <div key={field.name} className={css.informationBlock}>
                  {field.label && (
                    <label htmlFor={field.name}>{field.label}</label>
                  )}

                  <Input
                    className={css[field.css]}
                    type={field.type}
                    name={field.name}
                    onChange={handleChange}
                    value={values[field.name]}
                  />
                    {errors[field.name] && <p className={css.error}>{errors[field.name]}</p>}
                </div>
              ))}
            </div>
            <div className={css.gender}>
              <label htmlFor={"gender"}> Ваш пол</label> <br />
              <Radio.Group
                onChange={handleChange}
                value={values.gender}
                name={"gender"}
              >
                <Radio value={1}>Мужской</Radio>
                <Radio value={2}>Женский</Radio>
              </Radio.Group>
            </div>
            <div className={css.favoriteCategories}>
              <span>Выберите любимые категории</span>
              <br />
              <div id={css.favoriteCategoriesList}>
                <>
                  {categories.map((category) => (
                    <label key={category.id}>
                      <Field
                        type="checkbox"
                        name="favoriteCategories"
                        value={category.label}
                        onChange={handleChange}
                      />
                      <span className={css.checkboxLabel}>
                        {category.label}
                      </span>
                    </label>
                  ))}
                </>
              </div>
              {errors.favoriteCategories && (
                <p className={css.error}>{errors.favoriteCategories}</p>
              )}
            </div>

            <div className={css.subscribeNews}>
              <label htmlFor={"subscribeNews"}> Подписаться на новости </label>
              <Switch
                checked={values.subscribeNews}
                className={css.switchButton}
                onChange={(value) => setFieldValue("subscribeNews", value)}
              />
            </div>

            <div className={css.birthDate}>
              <label htmlFor={"birthDate"}> Дата рождения</label> <br />
              <Input
                className={css.input}
                type={"date"}
                name={"birthDate"}
                onChange={handleChange}
                value={values.birthDate}
                min="1930-01-01"
              />
            </div>

            {registrationData.fieldsChecking.map((field) => (
              <div key={field.name}>
                {field.name === "reply" ? (
                  values.secretQuestion && (
                    <div className={css.informationBlock}>
                      {field.label && (
                        <label htmlFor={field.name}>{field.label}</label>
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
                      <label htmlFor={field.name}>{field.label}</label>
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
              <Button className={css.registrationBtn} htmlType="submit" >
                Зарегистрироваться
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
