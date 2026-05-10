import z from "zod";

/**
 * UserLoginSchema
 *
 * Used for validating user login form data. Enforces strong data integrity and
 * provides clear, professional validation messages for frontend feedback.
 */

const UserLoginSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .max(254, { message: "Email address is too long." })
    .trim(),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .max(128, { message: "Password must be no longer than 128 characters." })
    .refine(
      (val) =>
        /[A-Z]/.test(val) && // at least one uppercase
        /[a-z]/.test(val) && // at least one lowercase
        /\d/.test(val) && // at least one digit
        /[^A-Za-z0-9]/.test(val), // at least one special character
      {
        message:
          "Password must include upper and lower case letters, a number, and a special character.",
      },
    ),
});

export default UserLoginSchema;
