const asyncHandler = require("../../utils/asyncHandler");
const orderService = require("../../services/orderService/orderService");

exports.createUserOrder = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const data = req.body;
  const order =  await orderService.createOrder(userId, data);
  return res.status(201).json({
    status: true,
    message: "order created successfully",
    data: { order },
  });
});

exports.getAllOrders = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const orders = await orderService.getOrders(userId);
  if (orders && orders.length > 0) {
    return res.status(200).json({
      status: true,
      message: "Orders found",
      data: { orders },
    });
  }
  return res
    .status(200)
    .json({ status: true, message: "No Data Found", data: { orders: [] } });
});

exports.getSingleOrder = asyncHandler(async (req, res) => {
  const orderId = req.params.orderId;
  const order = await orderService.getOrder(orderId);
  return res
    .status(200)
    .json({ status: true, message: "Order found", data: { order } });
});
