import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import AuthCard from "../../components/auth/AuthCard";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button/Button";

import { registerSchema } from "../../validations/auth.schema";
import { registerUser } from "../../services/auth.service";

const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onTouched",
  });

  const onSubmit = async (formData) => {
    try {
      setLoading(true);

      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      const response = await registerUser(payload);

      toast.success(
        response?.message || "Registration successful! Redirecting to login...",
      );

      reset();

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Registration failed. Please try again.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const onError = () => {
    toast.warn("Please check the highlighted fields.");
  };

  return (
    <AuthCard
      title="Create Account"
      subtitle="Register to access the AI Customer Support Platform"
    >
      <form
        className="auth-form"
        noValidate
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <Input
          label="Full Name"
          name="name"
          placeholder="Enter your full name"
          register={register}
          error={errors.name}
          required
          fullWidth
        />

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
          placeholder="Create a password"
          autoComplete="new-password"
          register={register}
          error={errors.password}
          infoTooltip="Use at least 8 characters with uppercase, lowercase, number and special character."
          required
          fullWidth
        />

        <Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          autoComplete="new-password"
          register={register}
          error={errors.confirmPassword}
          required
          fullWidth
        />

        <Button type="submit" loading={loading} fullWidth>
          Create Account
        </Button>
      </form>

      <div className="auth-form__footer">
        <p>
          Already have an account?
          <Link to="/login">Sign In</Link>
        </p>
      </div>
    </AuthCard>
  );
};

export default Register;
