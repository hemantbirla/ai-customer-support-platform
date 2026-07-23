import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import AuthCard from "../../components/auth/AuthCard";
import InputField from "../../components/auth/InputField";
import PasswordInput from "../../components/auth/PasswordInput";
import Button from "../../components/auth/Button";

import { registerSchema } from "../../validations/auth.schema";
import { registerUser } from "../../services/auth.service";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
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

      // 🚀 Registration Success Toast Alert
      toast.success(
        response?.message ||
          "🎉 Registration successful! Redirecting to login...",
        { position: "top-right", autoClose: 3000 },
      );

      reset();

      // Delay slightly so the user sees the success popup before redirect
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      // ❌ Registration Error Toast Alert
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Registration failed. Please try again.";

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  const onError = (formErrors) => {
    // Alert user if required fields or password criteria are missing on click
    toast.warn("Please check the form for errors.", {
      position: "top-right",
      autoClose: 2500,
    });
  };

  return (
    <AuthCard
      title="Create Account"
      subtitle="Register to access the AI Customer Support Platform"
    >
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="auth-form"
        noValidate
      >
        <InputField
          label="Full Name"
          name="name"
          type="text"
          placeholder="Enter your full name"
          register={register}
          error={errors.name}
        />

        <InputField
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
          register={register}
          error={errors.email}
        />

        <PasswordInput
          label="Password"
          name="password"
          placeholder="Create password"
          register={register}
          error={errors.password}
          showRequirementsHint={true}
        />

        <PasswordInput
          label="Confirm Password"
          name="confirmPassword"
          placeholder="Confirm password"
          register={register}
          error={errors.confirmPassword}
          showRequirementsHint={false}
        />

        <Button type="submit" loading={loading} className="full-width">
          Create Account
        </Button>
      </form>

      <div className="auth-form__footer">
        <p>
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </AuthCard>
  );
};

export default Register;
