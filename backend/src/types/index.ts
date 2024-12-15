import { z } from "zod";

export const SignupSchema = z.object({
  name: z
    .string()
    .min(5, { message: "Username must be at least 5 characters long" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  dob: z
    .string()
    .refine(
      (value) => {
        const date = new Date(value);
        return !isNaN(date.getTime());
      },
      { message: "Invalid date of birth format" }
    )
    .transform((value) => {
      const date = new Date(value);
      return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }),
});

export const SigninSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});
