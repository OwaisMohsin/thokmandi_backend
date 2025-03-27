const prisma = require("../../config/db");

exports.addItemToWishlist = async (data) => {
  return await prisma.wishlist.create({
    data,
  });
};

exports.checkExistence = async (userId, productId) => {
  return await prisma.wishlist.findFirst({
    where: {
      AND: [
        {
          userId: Number(userId),
        },
        { productId: Number(productId) },
      ],
    },
  });
};

exports.getWishlistItems = async (userId) => {
  return await prisma.wishlist.findMany({
    where: {
      userId: Number(userId),
    },
    include: {
      product: {
        select: {
          shortDescription: true,
          price: true,
          title: true,
          discountedPrice: true,
          image: true,
        },
      },
    },
  });
};

exports.getWishlistItemById = async (userId, id) => {
  return await prisma.wishlist.findFirst({
    where: {
      AND: [{ id: Number(id) }, { userId: Number(userId) }],
    },
  });
};

exports.deleteItemById = async (id) => {
  return await prisma.wishlist.delete({
    where: {
      id: Number(id),
    },
  });
};
