import * as yup from "yup";

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .typeError("Должно содержать только буквы")
    .required("Обязательное поле")
    .test(
      "len",
      "Должно быть более двух символов",
      (val) => val.toString().length > 2
    ),
  surname: yup
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
    .test("len", "Должно быть не менее 6 символов", (val) => {
      if (val) return val.toString().length >= 6;
    }),
  interests: yup
    .array()
    .test("minSelected", "Выберите минимум 2 значения", (value) => {
      return value && value.filter((val) => val).length >= 2;
    }),
  bornAt: yup.date().min("1930-01-01"),
  reply: yup.string().required("Введите ответ на вопрос"),
});
export const registrationData: DataRegistrationType = {
  fields: [
    { name: "name", label: "Имя", type: "text", css: "input" },
    { name: "surname", label: "Фамилия", type: "text", css: "input" },
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
    name: "",
    surname: "",
    password: "",
    confirmPassword: "",
    email: "",
    gender: 1,
    interests: [],
    isSubscribe: true,
    bornAt: "",
    secretQuestion: "",
    reply: "",
  },
  validation: validationSchema,
};

type InitialValuesDataType = {
  name: string;
  surname: string;
  password: string;
  confirmPassword: string;
  email: string;
  gender: number;
  interests: string[];
  isSubscribe: boolean;
  bornAt: string;
  secretQuestion: string;
  reply: string;
};

type FieldDataType = {
  name:
    | "name"
    | "surname"
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

export const registrationFields = [
  "name",
  "surname",
  "email",
  "password",
  "gender",
  "interests",
  "isSubscribe",
  "bornAt",
];
