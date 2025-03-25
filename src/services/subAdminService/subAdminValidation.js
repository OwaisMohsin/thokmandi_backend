const { z } = require("zod");
const AppError = require('../../utils/AppError');

const subAdminSchema = z.object({
  firstName: z
    .string({ required_error: "First name is required" })
    .min(3, "First name must be at least 3 characters"),
    
  lastName: z
    .string({ required_error: "Last name is required" })
    .min(2, "Last name must be at least 2 characters"),

  userName: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .optional(),

  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email format"),

  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters"),

  phoneNumber: z
    .string()
    // .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format (must be in E.164 format)")
    .optional()
});


const validateSubAdminData = (data) => {
    const result = subAdminSchema.safeParse(data);
    if (!result.success) {
      const errors = result.error.issues.map((issue) => issue.message).join(", ");
      throw new AppError(errors, 400);
    }
  };

  module.exports = { validateSubAdminData};
