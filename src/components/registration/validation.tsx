import * as yup from "yup";

const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .typeError("Должно содержать только буквы")
    .required("Обязательное поле")
    .test(
      "len",
      "Должно быть более двух символов",
      (val) => val.toString().length > 2
    ),
  secondName: yup
    .string()
    .typeError("Должна содержать только буквы")
    .test("len", "Должна быть более двух символов", (val) => {
      if (val) return val.toString().length > 2;
    }),
  email: yup
    .string()
    .email("Введите правильный email")
    .required("Обязательное поле"),
  password: yup
    .string()
    .required("Обязательное поле*")
    .test("len", "Должно быть не менее 6 символов", (val) => {
      if (val) return val.toString().length >= 6;
    }),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Пароли не совпадают")
    .required("Обязательное поле")
    .test("len", "Должно быть не менее 6 символов*", (val) => {
      if (val) return val.toString().length >= 6;
    }),
  favoriteCategories: yup
    .array()
    .test("minSelected", "Выберите минимум 2 значения", (value) => {
      return value && value.filter((val) => val).length >= 2;
    }),
  birthDate: yup.date().min("1930-01-01"),
  reply: yup.string().required("Введите ответ на вопрос"),
});
export const registrationData: DataRegistrationType = {
  fields: [
    { name: "firstName", label: "Имя", type: "text", css: "input" },
    { name: "secondName", label: "Фамилия", type: "text", css: "input" },
    { name: "email", label: "Электронная почта", type: "email", css: "input" },
    { name: "password", label: "Пароль", type: "password", css: "input" },
    {
      name: "confirmPassword",
      label: "Подтвердите пароль",
      type: "password",
      css: "input",
    },
  ],
  fieldsChecking: [
    {
      name: "secretQuestion",
      label: " Секретный вопрос для восстановления пароля",
      type: "text",
      css: "input",
    },
    {
      name: "reply",
      label: " Ответ для восстановления пароля",
      type: "text",
      css: "input",
    },
  ],
  initialValues: {
    firstName: "",
    secondName: "",
    password: "",
    confirmPassword: "",
    email: "",
    gender: 1,
    favoriteCategories: [],
    subscribeNews: true,
    birthDate: "",
    secretQuestion: "",
    reply: "",
  },
  validation: validationSchema,
};

type InitialValuesDataType = {
  firstName: string;
  secondName: string;
  password: string;
  confirmPassword: string;
  email: string;
  gender: number;
  favoriteCategories: string[];
  subscribeNews: boolean;
  birthDate: string;
  secretQuestion: string;
  reply: string;
};

type FieldDataType = {
  name:
    | "firstName"
    | "secondName"
    | "password"
    | "confirmPassword"
    | "email"
    | "secretQuestion"
    | "reply";
  label: string;
  type: "text" | "email" | "password";
  css: string;
};

type DataRegistrationType = {
  fields: FieldDataType[];
  fieldsChecking: FieldDataType[];
  initialValues: InitialValuesDataType;
  validation: any;
};
