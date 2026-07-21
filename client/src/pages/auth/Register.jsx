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

      toast.success(
        response?.message || "Registration successful. Please login.",
      );

      reset();
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="Create Account"
      subtitle="Register to access the AI Customer Support Platform"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="auth-form" noValidate>
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
        />

        <PasswordInput
          label="Confirm Password"
          name="confirmPassword"
          placeholder="Confirm password"
          register={register}
          error={errors.confirmPassword}
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
