import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import AuthCard from "../../components/auth/AuthCard";
import InputField from "../../components/auth/InputField";
import PasswordInput from "../../components/auth/PasswordInput";
import Button from "../../components/auth/Button";

import { loginSchema } from "../../validations/auth.schema";
import { loginUser } from "../../services/auth.service";

const Login = () => {
  const navigate = useNavigate();
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

      const response = await loginUser(formData);

      toast.success(response?.message || "Login successful! Welcome back.");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      console.error("Login catch error:", error);

      // Prioritize API response message -> fallback string
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Invalid email or password.";

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3500,
      });
    } finally {
      setLoading(false);
    }
  };

  const onError = (formErrors) => {
    // ⚠️ Warn user if they click sign in with empty or invalid fields
    if (formErrors.email || formErrors.password) {
      toast.warn("Please enter a valid email and password.", {
        position: "top-right",
        autoClose: 2500,
      });
    }
  };

  return (
    <AuthCard
      title="Welcome Back"
      subtitle="Sign in to your account to continue"
    >
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="auth-form"
        noValidate
      >
        <InputField
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
          autoComplete="email"
          register={register}
          error={errors.email}
        />

        <PasswordInput
          label="Password"
          name="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          register={register}
          error={errors.password}
          showRequirementsHint={false} // Clean login UI without requirement popup
        />

        <div
          className="auth-form__options"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "1rem",
          }}
        >
          <Link to="/forgot-password" className="auth-link">
            Forgot Password?
          </Link>
        </div>

        <Button type="submit" loading={loading} className="full-width">
          Sign In
        </Button>
      </form>

      <div className="auth-form__footer">
        <p>
          Don't have an account? <Link to="/register">Create Account</Link>
        </p>
      </div>
    </AuthCard>
  );
};

export default Login;
