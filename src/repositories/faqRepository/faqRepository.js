const prisma = require("../../config/db");

exports.getAllFaqs = async () => {
  return await prisma.faq.findMany();
};

exports.create = async (data) => {
  return await prisma.faq.create({
    data,
  });
};

exports.index = async (id) => {
  return await prisma.faq.findUnique({
    where: {
      id: Number(id),
    },
  });
};

exports.update = async (id, data) => {
  return await prisma.faq.update({
    where: {
      id: Number(id),
    },
    data,
  });
};

exports.delete = async (id) => {
  return await prisma.faq.delete({
    where: {
      id: Number(id),
    },
  });
};
