import * as z from "zod";

// ============================================================
// USER
// ============================================================
export const SignupValidation = z.object({
  name: z.string().min(5, { message: "Name must be at least 5 characters." }),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Date of Birth must be in YYYY-MM-DD format.",
  }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "OTP must be at least 6 characters." }),
});

export const SigninValidation = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  otp: z.string().min(6, { message: "OTP must be at least 6 characters." }),
});
