const asyncHandler = require("../../utils/asyncHandler");
const orderService = require("../../services/orderService/orderService");

exports.updateOrder = asyncHandler(async (req, res) => {
  const orderId = req.params.orderId;
  const data = req.body;
  const order = await orderService.updateOrderStatus(orderId, data);
  return res.status(200).json({
    status: true,
    message: "Order updated successfully",
    data: { order },
  });
});

exports.deleteOrder = asyncHandler(async (req, res) => {
  const orderId = req.params.orderId;
  console.log("ID is",orderId);
  
  await orderService.deleteSingleOrder(orderId);
  return res
    .status(200)
    .json({ status: true, message: "Order deleted sucessfully" });
});
