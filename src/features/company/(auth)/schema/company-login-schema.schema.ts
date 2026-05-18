import z from "zod";

const CompanyLoginSchema = z.object({
  companyEmail: z
    .string()
    .email({ message: "Please enter a valid company email address." })
    .max(254, { message: "Company email address is too long." })
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

export default CompanyLoginSchema;
