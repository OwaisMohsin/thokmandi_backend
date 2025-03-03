const prisma = require("../../config/db");

exports.getCartByUserId = async (userId) => {
  return await prisma.cart.findUnique({
    where: {
      userId: Number(userId),
    },
  });
};

exports.getUserCart = async (userId) => {
  return await prisma.cart.findFirst({
    where: {
      userId: Number(userId),
    },
    include: {
      items: {
        include: {
          product: {
            select: {
              image: true,
              title: true,
            },
          },
        },
      },
    },
  });
};

exports.createCart = async (userId) => {
  return await prisma.cart.create({
    data: {
      user: { connect: { id: Number(userId) } },
    },
  });
};

exports.addCartItem = async (data) => {
  return await prisma.cartItem.create({ data });
};

exports.deleteCartItem = async (id) => {
  return await prisma.cartItem.delete({
    where: {
      id: Number(id),
    },
  });
};

exports.getCartItemByUserAndProduct = async (cartId, productId) => {
  return await prisma.cartItem.findFirst({
    where: {
      AND: [{ cartId }, { productId }],
    },
  });
};

exports.updateCartItem = async (id, newQuantity) => {
  return await prisma.cartItem.update({
    where: {
      id,
    },
    data: {
      quantity: {
        increment: newQuantity,
      },
    },
  });
};

exports.updateItemQuantityById = async (id, newQuantity) => {
  return await prisma.cartItem.update({
    where: {
      id: Number(id),
    },
    data: {
      quantity: Number(newQuantity),
    },
  });
};

exports.deleteAllCartItems = async (id) => {
  return await prisma.cartItem.deleteMany({
    where: {
      cartId: Number(id),
    },
  });
};
