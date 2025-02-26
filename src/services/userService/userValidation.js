const { z } = require("zod");
const AppError = require("../../utils/AppError");

const updateUserProfileSchema = z.object({
  // firstName: z
  //   .string()
  //   .min(2, "First name must be at least 2 characters")
  //   .max(50, "First name is too long")
  //   .optional(),
  // lastName: z
  //   .string()
  //   .min(2, "Last name must be at least 2 characters")
  //   .max(50, "Last name is too long")
  //   .optional(),
  // userName: z
  //   .string()
  //   .min(3, "Username must be at least 3 characters")
  //   .max(30, "Username is too long")
  //   .optional(),
});

const validateUpdateUserProfile = (data) => {
  const result = updateUserProfileSchema.safeParse(data);
  if (!result.success) {
    const errors = result.error.issues.map((issue) => issue.message).join(", ");
    throw new AppError(errors, 400);
  }
};



const addressSchema = z.object({
  shopName: z.string().min(1, "Shop name is required"),
  country: z.string().min(1, "Country is required"),
  apartment: z.string().optional(),
  street: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  zipCode: z.string().min(1, "Zip code is required"),
  province: z.string().optional(),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number can't exceed 15 digits"),
  addressType: z.string().min(1, "Address type is required"),
});

const validateAddressData = (data) => {
  const result = addressSchema.safeParse(data);
  if (!result.success) {
    const errors = result.error.issues.map((issue) => issue.message).join(", ");
    throw new AppError(errors, 400);
  }
};

module.exports = { validateUpdateUserProfile, validateAddressData };
