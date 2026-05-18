import z from "zod";

/**
 * CompanySignupSchema
 *
 * Used for validating company signup form data. Enforces strong data integrity and
 * provides clear, professional validation messages for frontend feedback.
 */

const CompanySignupSchema = z.object({
  companyName: z
    .string()
    .min(3, { message: "Company name must be at least 3 characters long." })
    .max(100, { message: "Company name must be at most 100 characters long." })
    .trim(),

  companyEmail: z
    .string()
    .email({ message: "Please enter a valid company email address." })
    .max(254, { message: "Company email address is too long." })
    .trim(),

  companyPhone: z
    .string()
    .min(7, { message: "Please enter a valid phone number." }) // can customize or use regex for stricter rules
    .max(20, { message: "Phone number is too long." })
    .trim(),

  website: z
    .string()
    .url({
      message:
        "Please enter a valid website URL (including http:// or https://).",
    })
    .max(200, { message: "Website URL is too long." })
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

export default CompanySignupSchema;
