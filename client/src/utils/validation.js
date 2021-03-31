import * as Yup from "yup";

export const signUpValidationSchema = Yup.object({
  name: Yup.string().required("User name is required"),
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const loginValidationSchema = Yup.object({
  email: Yup.string().email("*Email is invalid").required("Email is required"),
  password: Yup.string().required("*Password is required"),
});