const prisma = require("../../config/db");

exports.createCoupon = async (data) => {
  return await prisma.vendorCoupon.create({ data });
};

exports.getCouponsByVendor = async (id) => {
  return await prisma.vendorCoupon.findMany({
    where: {
      vendorId: Number(id),
    },
  });
};

exports.getCouponById = async (couponId) => {
  return await prisma.vendorCoupon.findUnique({
    where: {
      id: Number(couponId),
    },
  });
};

exports.getSingleCouponByVendorId = async (vendorId, couponId) => {
  return await prisma.vendorCoupon.findFirst({
    where: {
      id: Number(couponId),
      vendorId: Number(vendorId),
    },
  });
};

exports.updateCouponById = async (couponId, data) => {
  return await prisma.vendorCoupon.update({
    where: {
      id: Number(couponId),
    },
    data,
  });
};

exports.deleteCouponById = async (id) => {
  return await prisma.vendorCoupon.delete({
    where: {
      id: Number(id),
    },
  });
};
