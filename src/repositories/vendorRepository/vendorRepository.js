const prisma = require("../../config/db");

exports.createStore = async (data) => {
  return await prisma.store.create({
    data,
  });
};


exports.findVendorById = async (id) => {
  return prisma.user.findUnique({
    where:{
      id:Number(id)
    },
    include:{
      store:true
    }
  })
}

exports.getStoreById = async (id) => {
  return await prisma.store.findUnique({
    where: {
      id: Number(id),
    },
  });
};

exports.addAddress = async (data) => {
  return await prisma.address.create({
    data,
  });
};

exports.getAllVendorRequests = async () => {
  return await prisma.store.findMany({
    // where: {
    //   storeStatus: "pending",
    // },
    include: {
      user: {
        include: {
          address: true,
        },
      },
    },
  });
};

exports.updateStoreStatus = async (id, data) => {
  return await prisma.store.update({
    where: {
      id: Number(id),
    },
    data,
  });
};

exports.deleteStoreById = async (id) => {
  return await prisma.store.delete({
    where: {
      id: Number(id),
    },
  });
};
