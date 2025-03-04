const orderRepository = require("../../repositories/orderRepository/orderRepository");
const {
  generateUniqueString,
} = require("../../utils/generateUniqueOrderReference");
const AppError = require("../../utils/AppError");

exports.createOrder = async (userId, data) => {
  try {
    const uniqueOrderNumber = generateUniqueString();
    const orderData = {
      orderNumber: uniqueOrderNumber,
      total: data.total,
      user: { connect: { id: userId } },
    };
    const order = await orderRepository.createNewOrder(orderData);

    for (const orderItem of data.items) {
      const item = {
        order: { connect: { id: order.id } },
        product: { connect: { id: orderItem.productId } },
        quantity: orderItem.quantity,
      };
      await orderRepository.addOrderItem(item);
    }

    return await orderRepository.getOrderById(order.orderNumber);
  } catch (error) {
    throw error;
  }
};

exports.getOrders = async (userId) => {
  try {
    return await orderRepository.getAllOrdersByUserId(userId);
  } catch (error) {
    throw error;
  }
};

exports.getOrder = async (orderId) => {
  try {
    const order = await orderRepository.getOrderById(orderId);
    if (!order) {
      throw new AppError("No order found with provided ID", 404);
    }
    return order;
  } catch (error) {
    throw error;
  }
};

exports.updateOrderStatus = async (orderId, data) => {
  try {
    const order = await orderRepository.getOrderById(orderId);
    if (!order) {
      throw new AppError("No order found with provided ID", 404);
    }
    return await orderRepository.updateOrderById(orderId, data);
  } catch (error) {
    throw error;
  }
};

exports.deleteSingleOrder = async (orderId) => {
  try {
    const order = await orderRepository.getOrderById(orderId);
    if (!order) {
      throw new AppError("No order found with provided ID", 404);
    }
    return await orderRepository.deleteOrderById(orderId);
  } catch (error) {
    throw error;
  }
};
