const vendorCouponRepository = require("../../repositories/vendorCouponRepository/vendorCouponRepository");
const userRepository = require("../../repositories/UserRepository/userRepository");
const AppError = require("../../utils/AppError");
const { Role } = require("@prisma/client");


exports.createNewCoupon = async (vendor, data) => {
  const vendorId = vendor.id;
  if (vendor.role !== Role.VENDOR) {
    throw new AppError("Only vendor can create coupons", 403);
  }
  try {
    const couponData = {
      ...data,
      vendor: { connect: { id: Number(vendorId) } },
    };
    return await vendorCouponRepository.createCoupon(couponData);
  } catch (error) {
    throw error;
  }
};

exports.getCoupons = async (vendorId) => {
  try {
    const vendor = await userRepository.getVendorbyId(vendorId);
    if (!vendor) {
      throw new AppError("No vendor exist with provided ID", 404);
    }
    return await vendorCouponRepository.getCouponsByVendor(vendorId);
  } catch (error) {
    throw error;
  }
};

exports.updateSingleCoupon = async (vendorId, couponId, data) => {
  try {
    const coupon = await vendorCouponRepository.getCouponById(couponId);
    if (!coupon) {
      throw new AppError("No coupon exist with provded ID", 404);
    }

    const currentVendorHasCoupon =
      await vendorCouponRepository.getSingleCouponByVendorId(
        vendorId,
        couponId
      );
    if (!currentVendorHasCoupon) {
      throw new AppError("You dont have permission to update this", 403);
    }

    const couponData = {
      ...data,
      ...(data.couponStatus)
    }

    return await vendorCouponRepository.updateCouponById(couponId, data);
  } catch (error) {
    throw error;
  }
};

exports.deleteSingleCoupon = async (vendorId, couponId) => {
  try {
    const coupon = await vendorCouponRepository.getCouponById(couponId);
    if (!coupon) {
      throw new AppError("No coupon exist with provded ID", 404);
    }

    const currentVendorHasCoupon =
      await vendorCouponRepository.getSingleCouponByVendorId(
        vendorId,
        couponId
      );
    if (!currentVendorHasCoupon) {
      throw new AppError("You dont have permission to delete this", 403);
    }
    return await vendorCouponRepository.deleteCouponById(couponId);
  } catch (error) {
    throw error;
  }
};
