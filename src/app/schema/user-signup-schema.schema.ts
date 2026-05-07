import z from "zod";

/**
 * UserSignupSchema
 *
 * Used for validating user signup form data. Enforces strong data integrity and
 * provides clear, professional validation messages for frontend feedback.
 */

const UserSignupSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(100, { message: "Name must be at most 100 characters long." })
    .trim(),

  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long." })
    .max(30, { message: "Username must be no more than 30 characters." })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username may only contain letters, numbers, and underscores.",
    })
    .trim(),

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

export default UserSignupSchema;
