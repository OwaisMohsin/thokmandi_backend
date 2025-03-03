const prisma = require("../../config/db");

exports.createStore = async (data) => {
  return await prisma.store.create({
    data,
  });
};

exports.getStoreById = async (id) => {
  return await prisma.store.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      Address: true,
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
    where:{
      storeStatus:"pending"
    },
    include:{
      address:true,
      user:true
    }
  })
}
