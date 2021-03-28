import * as Yup from "yup";

export const signUpValidationSchema = Yup.object({
  name: Yup.string().required("User name is required"),
  email: Yup.string()
    .email()
    .matches(
      /^(?=.*[a-zA-Z0-9])[a-zA-Z0-9!@#$%&*.]{7,}$/,
      "Please enter a valid email!"
    )
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const loginValidationSchema = Yup.object({
  email: Yup.string().email("*Email is invalid").required("Email is required"),
  password: Yup.string().required("*Password is required"),
});
