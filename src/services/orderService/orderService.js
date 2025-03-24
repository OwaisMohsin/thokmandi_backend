const orderRepository = require("../../repositories/orderRepository/orderRepository");
const {
  generateUniqueString,
} = require("../../utils/generateUniqueOrderReference");
const AppError = require("../../utils/AppError");
const { Role } = require("@prisma/client");

exports.createOrder = async (userId, data) => {
  try {
    const uniqueOrderNumber = generateUniqueString();
    const orderData = {
      orderNumber: uniqueOrderNumber,
      total: data.total,
      user: { connect: { id: userId } },
    };
    const order = await orderRepository.createNewOrder(orderData);

    const itemsByVendor = {};
    for (const item of data.items) {
      if (!itemsByVendor[item.vendorId]) {
        itemsByVendor[item.vendorId] = [];
      }
      itemsByVendor[item.vendorId].push(item);
    }

    for (const vendorId in itemsByVendor) {
      const vendorOrderData = {
        orderNumber: `${order.orderNumber}-${userId}`,
        order: { connect: { id: order.id } },
        vendor: { connect: { id: Number(vendorId) } },
      };

      const vendorOrder = await orderRepository.createNewVendorOrder(
        vendorOrderData
      );

      // Add all items for this vendor
      for (const orderItem of itemsByVendor[vendorId]) {
        const item = {
          order: { connect: { id: order.id } },
          product: { connect: { id: orderItem.productId } },
          quantity: orderItem.quantity,
          vendorOrder: { connect: { id: vendorOrder.id } },
        };
        await orderRepository.addOrderItem(item);
      }
    }

    return order;
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

exports.fetchAllVendorOrders = async (vendor) => {
  try {
    if (vendor.role === Role.BUYER) {
      throw new AppError(
        "You done have permissions to access vendor orders",
        403
      );
    }
    return await orderRepository.getAllVendorOrders(vendor.id);
  } catch (error) {
    throw error;
  }
};
