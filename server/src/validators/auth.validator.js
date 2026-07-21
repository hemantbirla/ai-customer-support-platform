import { z } from "zod";

/**
 * Password Rules
 * - Minimum 8 characters
 * - Maximum 100 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - At least one special character
 */
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(100, "Password cannot exceed 100 characters")
  .superRefine((password, ctx) => {
    if (!/[A-Z]/.test(password)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password must contain at least one uppercase letter",
      });
    }

    if (!/[a-z]/.test(password)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password must contain at least one lowercase letter",
      });
    }

    if (!/[0-9]/.test(password)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password must contain at least one number",
      });
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password must contain at least one special character",
      });
    }
  });

export const registerSchema = z.object({
  body: z
    .object({
      name: z
        .string()
        .trim()
        .min(3, "Name must be at least 3 characters")
        .max(50, "Name cannot exceed 50 characters"),

      email: z
        .string()
        .email("Invalid email address")
        .transform((email) => email.trim().toLowerCase()),

      password: passwordSchema,
    })
    .strict(),

  query: z.object({}).optional(),

  params: z.object({}).optional(),
});

export const loginSchema = z.object({
  body: z
    .object({
      email: z
        .string()
        .email("Invalid email address")
        .transform((email) => email.trim().toLowerCase()),

      password: z.string().min(1, "Password is required"),
    })
    .strict(),

  query: z.object({}).optional(),

  params: z.object({}).optional(),
});

export const updateProfileSchema = z.object({
  body: z
    .object({
      name: z
        .string()
        .trim()
        .min(3, "Name must be at least 3 characters")
        .max(50, "Name cannot exceed 50 characters")
        .optional(),

      avatar: z.string().trim().url("Avatar must be a valid URL").optional(),
    })
    .strict(),

  query: z.object({}).optional(),

  params: z.object({}).optional(),
});
