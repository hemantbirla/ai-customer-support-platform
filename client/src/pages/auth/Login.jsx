import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import AuthCard from "../../components/auth/AuthCard";
import InputField from "../../components/auth/InputField";
import PasswordInput from "../../components/auth/PasswordInput";
import Button from "../../components/auth/Button";

import { loginSchema } from "../../validations/auth.schema";

import "../../styles/auth.css";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    console.log("Login Data:", data);

    // Next commit:
    // await login(data)
  };

  return (
    <AuthCard
      title="Welcome Back 👋"
      subtitle="Sign in to continue to your account."
    >
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <InputField
          label="Email Address"
          name="email"
          type="email"
          placeholder="Enter your email"
          register={register}
          error={errors.email}
        />

        <PasswordInput
          label="Password"
          name="password"
          placeholder="Enter your password"
          register={register}
          error={errors.password}
        />

        <div className="auth-form__actions">
          <Link to="/forgot-password" className="auth-form__forgot-password">
            Forgot Password?
          </Link>
        </div>

        <Button type="submit" fullWidth loading={isSubmitting}>
          Login
        </Button>

        <p className="auth-form__footer">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </AuthCard>
  );
};

export default Login;
