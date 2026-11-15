import {z} from "zod";

// Signup Schema
export const signupSchema = z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters."),
    email: z.email("Enter a valid email address."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(/[0-9]/, "Password must include a number.")
      .regex(/[^A-Za-z0-9]/, "Password must include a symbol."),
    rePassword: z.string(),
    phone: z
      .string()
      .trim()
      .refine((value) => {
        const digits = value.replace(/\D/g, "");
        return (
          /^[+\d\s()-]+$/.test(value) &&
          digits.length >= 10 &&
          digits.length <= 15
        );
      }, "Enter a valid phone number (10–15 digits)."),
    terms: z.boolean().refine(Boolean, "You must agree to continue."),
  })
  .refine((params) => params.password === params.rePassword, {
    path: ["rePassword"],
    message: "Passwords do not match.",
  });

  export type SignupValues = z.infer<typeof signupSchema>;


  // Login Schema
 export const loginSchema = z.object({
  email: z.email("Enter a valid email address."),
  password: z.string().min(1, "Password is required."),
  remember: z.boolean(),
});

  export type LoginValues = z.infer<typeof loginSchema>;