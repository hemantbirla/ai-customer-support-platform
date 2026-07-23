import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import AuthCard from "../../components/auth/AuthCard";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button/Button";

import { loginSchema } from "../../validations/auth.schema";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onTouched",
  });

  const onSubmit = async (formData) => {
    try {
      setLoading(true);

      const response = await login(formData);

      toast.success(
        response?.data?.message || "Login successful! Welcome back.",
      );

      navigate("/dashboard", {
        replace: true,
      });
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Invalid email or password.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const onError = () => {
    toast.warn("Please enter a valid email and password.");
  };

  return (
    <AuthCard
      title="Welcome Back"
      subtitle="Sign in to your account to continue"
    >
      <form
        className="auth-form"
        noValidate
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <Input
          label="Email Address"
          name="email"
          type="email"
          placeholder="Enter your email"
          autoComplete="email"
          register={register}
          error={errors.email}
          required
          fullWidth
        />

        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          register={register}
          error={errors.password}
          required
          fullWidth
        />

        <div className="auth-form__actions">
          <Link to="/forgot-password" className="auth-form__forgot-password">
            Forgot Password?
          </Link>
        </div>

        <Button type="submit" loading={loading} fullWidth>
          Sign In
        </Button>
      </form>

      <div className="auth-form__footer">
        <p>
          Don't have an account?
          <Link to="/register">Create Account</Link>
        </p>
      </div>
    </AuthCard>
  );
};

export default Login;
