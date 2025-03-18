const asyncHandler = require("../../utils/asyncHandler");
const vendorCouponService = require("../../services/vendorCouponService/vendorCouponService");

exports.getAllCoupons = asyncHandler(async (req, res) => {
  const vendorId = req.user.id;
  const coupons = await vendorCouponService.getCoupons(vendorId);
  return res
    .status(200)
    .json({
      status: true,
      message: "Coupons fetched successfully",
      data: { coupons },
    });
});

exports.createCoupon = asyncHandler(async (req, res) => {
  const data = req.body;
  const vendor = req.user;
  const coupon = await vendorCouponService.createNewCoupon(vendor, data);
  return res.status(201).json({
    status: true,
    message: "Coupon created successfully",
    data: { coupon },
  });
});

exports.updateCoupon = asyncHandler(async (req, res) => {
  const couponId = req.params.couponId;
  const vendorId = req.user.id;
  const data = req.body;
  const updatedCoupon = await vendorCouponService.updateSingleCoupon(
    vendorId,
    couponId,
    data
  );
  return res.status(200).json({
    status: true,
    message: "Coupon updated successfully",
    data: {
      coupon: updatedCoupon,
    },
  });
});

exports.deleteCoupon = asyncHandler(async (req, res) => {
  const couponId = req.params.couponId;
  const vendorId = req.user.id;

  await vendorCouponService.deleteSingleCoupon(vendorId, couponId);
  return res
    .status(200)
    .json({ stauts: true, message: "Coupon deleted successfully" });
});
