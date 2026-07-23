import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .required("Email is required."),

  password: yup
    .string()
    .required("Password is required.")
    .min(8, "Password must be at least 8 characters."),
});

export const registerSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required("Full name is required.")
    .min(3, "Name must be at least 3 characters.")
    .max(50, "Name cannot exceed 50 characters."),

  email: yup
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .required("Email is required."),

  password: yup
    .string()
    .required("Password is required.")
    .min(8, "Password must be at least 8 characters.")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
    .matches(/\d/, "Password must contain at least one number.")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character.",
    ),

  confirmPassword: yup
    .string()
    .required("Please confirm your password.")
    .oneOf([yup.ref("password")], "Passwords do not match."),
});
