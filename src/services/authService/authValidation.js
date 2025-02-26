const { z } = require("zod");
const AppError = require("../../utils/AppError");

const userSchema = z.object({

  email: z.string().email("Invalid email format"),
  password: z
    .string({ required_error: "password is required" })
    .min(6, "Password must be at least 6 characters long"),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z
    .string({ required_error: "password is required" })
    .min(6, "Password must be at least 6 characters long"),
});


const validateUserData = (data) => {
  const result = userSchema.safeParse(data);
  if (!result.success) {
    const errors = result.error.issues.map((issue) => issue.message).join(", ");
    throw new AppError(errors, 400);
  }
};

const validateLoginData = (data) => {
  const result = loginSchema.safeParse(data);
  if (!result.success) {
    const errors = result.error.issues.map((issue) => issue.message).join(", ");
    throw new AppError(errors, 400);
  }
};

module.exports = { validateUserData, validateLoginData };
