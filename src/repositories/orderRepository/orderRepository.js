const prisma = require("../../config/db");

exports.createNewOrder = async (data) => {
  return await prisma.order.create({ data });
};

exports.createNewVendorOrder = async (data) => {
  return await prisma.vendorOrder.create({ data });
};

exports.addOrderItem = async (data) => {
  return await prisma.orderItem.create({ data });
};

exports.getAllVendorOrders = async (vendorId) => {
  return await prisma.vendorOrder.findMany({
    where: {
      vendorId: Number(vendorId),
    },
    include: {
      order: {
        select: {
          user: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      },
      orderItems: {
        select: {
          quantity: true,
          product: {
            select: {
              price: true,
              image: true,
            },
          },
        },
      },
    },
  });
};

// exports.getAllVendorOrders = async (vendorId) => {
//   return await prisma.order.findMany({
//     where: {
//       userId: Number(vendorId),
//     },
//     select:{
//       user:{
//         select:{
//           firstName:true,
//           lastName:true
//         },
//       },
//       vendorOrders:{
//         include:{
//           orderItems:{
//             include:{
//               product:true
//             }
//           }
//         }
//       }
//     }

//   });
// };

exports.getAllOrdersByUserId = async (userId) => {
  return await prisma.order.findMany({
    where: {
      userId: Number(userId),
    },
    include: {
      orderItems: {
        include: {
          product: {
            select: {
              id: true,
              title: true,
              price: true,
              image: true,
              description: true,
            },
          },
        },
      },
    },
  });
};

exports.getOrderById = async (id) => {
  return await prisma.order.findUnique({
    where: {
      orderNumber: id,
    },
    include: {
      orderItems: {
        include: {
          product: {
            select: {
              id: true,
              title: true,
              price: true,
              image: true,
              description: true,
            },
          },
        },
      },
      user: {
        select: {
          address: true,
        },
      },
    },
  });
};

exports.updateOrderById = async (orderId, data) => {
  return await prisma.order.update({
    where: {
      id: Number(orderId),
    },
    data,
  });
};

exports.deleteOrderById = async (id) => {
  return await prisma.order.delete({
    where: {
      orderNumber: id,
    },
  });
};
